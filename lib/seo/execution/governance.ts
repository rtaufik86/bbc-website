// Auto Execution Engine v0.7 — Governance Rules
//
// Pure, stateless rule checks. Every guard returns a discriminated result so
// the caller can log the precise reason without inferring intent. No DB
// access, no side effects — that's deliberate: governance is the place where
// hard limits live, and hard limits must be testable in isolation.
//
// Spec mapping (from the 11B/C/D/E blocks of the governance brief):
//   - 11B Hard Limits          → GOVERNANCE constants + checkLinkBudget
//   - 11C Page Protection      → checkPageProtection
//   - 11D Eligibility          → checkEligibility
//   - 11E HTML Safety          → checkHtmlSafety + countOutboundLinks

import { BBC_CONFIG } from '../config/bbcConfig'

const rules = BBC_CONFIG

export type ExecutionMode = 'safe' | 'manual'

export type Priority       = 'P0' | 'P1' | 'P2' | 'P3'
export type GovernedAction = 'FIX' | 'REWRITE' | 'INJECT' | 'KILL'
export type GovernedPage   = 'money' | 'hub' | 'weapon' | 'support' | 'utility'

// ── HARD LIMITS ──────────────────────────────────────────────────────────────
// These numbers are the contract. Change them in one place; every guard picks
// up the new value automatically. Tuning rationale:
//   - MAX_OUTBOUND_LINKS_PER_PAGE = 4 matches the internal-linking rule that
//     caps a single page at ≤4 contextual outbound links.
//   - ERROR_RATE_THRESHOLD = 0.3 is conservative: a healthy loop sits below
//     10 % fail rate, so 30 % represents clear degradation.
//   - ERROR_RATE_MIN_SAMPLES = 5 prevents a single early failure from
//     freezing the system before signal is established.
//   - DUPLICATE_INJECT_THRESHOLD = 2 because one `already_linked` log can be
//     a normal re-run; two in a row almost always means the dispatcher is
//     misinterpreting idempotency.

export const GOVERNANCE = {
  MAX_ACTIONS_PER_PAGE_PER_RUN: rules.execution.maxActionsPerPage,
  MAX_OUTBOUND_LINKS_PER_PAGE:  rules.linking.maxOutbound,
  COOLDOWN_MS:                  rules.execution.cooldownHours * 60 * 60 * 1000,
  ERROR_RATE_THRESHOLD:         0.3,
  ERROR_RATE_MIN_SAMPLES:       5,
  DUPLICATE_INJECT_THRESHOLD:   2,
  FREEZE_LOOKBACK_LOGS:         50,
} as const

// ── GATE RESULTS ────────────────────────────────────────────────────────────

export type GateResult =
  | { allow: true }
  | { allow: false; reason: string }

// ── 11C — PAGE PROTECTION ───────────────────────────────────────────────────
//
// money   → fully protected, no execution at all (including FIX — structural
//           fixes on a money page must be human-reviewed because regression
//           cost is disproportionate).
// hub     → limited: FIX only, no INJECT. Hubs aggregate outbound links by
//           definition; adding more via automation is too risky.
// weapon  → full INJECT + FIX allowed.
// support → allow INJECT + FIX (thin taxonomy, low blast radius).
// utility → never execute; these are dashboards, admin, tools — never public.

export function checkPageProtection(
  pageType: GovernedPage | string,
  actionType: GovernedAction,
): GateResult {
  if (rules.pageProtection.money && pageType === 'money') {
    return { allow: false, reason: 'money_page_protected' }
  }
  if (pageType === 'utility') return { allow: false, reason: 'utility_page_excluded' }

  if (actionType === 'REWRITE') return { allow: false, reason: 'rewrite_not_allowed' }
  if (actionType === 'KILL')    return { allow: false, reason: 'kill_not_allowed' }

  if (pageType === 'hub' && actionType === 'INJECT') {
    return { allow: false, reason: 'hub_inject_limited' }
  }

  return { allow: true }
}

// ── 11D — EXECUTION ELIGIBILITY ─────────────────────────────────────────────
// priority ∈ {P0, P1} AND action ∈ {FIX, INJECT}. Any P2/P3 action is deferred
// to the feedback/attribution loop so we avoid acting on weak signals.

export function checkEligibility(priority: Priority | string, actionType: GovernedAction): GateResult {
  if (!rules.priority.allow.includes(priority)) {
    return { allow: false, reason: 'priority_not_eligible' }
  }
  if (actionType !== 'FIX' && actionType !== 'INJECT') {
    return { allow: false, reason: 'action_not_eligible' }
  }
  return { allow: true }
}

// ── 11E — HTML SAFETY ───────────────────────────────────────────────────────
// Deliberately conservative: if we're not confident the HTML is well-formed,
// we bail. False negatives (skipping a valid page) are cheap; false positives
// (injecting into broken HTML) can propagate broken markup via DB storage and
// mislead later audits.

export interface HtmlSafetyResult {
  safe:    boolean
  reason?: string
}

export function checkHtmlSafety(html: string): HtmlSafetyResult {
  if (!html || typeof html !== 'string')      return { safe: false, reason: 'html_empty' }
  if (html.length < 200)                      return { safe: false, reason: 'html_too_small' }

  // Nested anchor is a hard reject — the double-link guard exists for a
  // reason, and shipping nested <a> tags is invalid HTML.
  if (/<a\b[^>]*>[^<]*<a\b/i.test(html)) {
    return { safe: false, reason: 'html_nested_anchor_exists' }
  }

  // Malformed tag heuristic: unclosed `<` with no matching `>` within 500
  // chars. Catches common truncation / injection corruption.
  if (/<[^>]{500,}$/.test(html)) {
    return { safe: false, reason: 'html_unclosed_tag' }
  }

  // Structural sanity: valid SSR HTML must have a closing </body> or </html>.
  // A truncated or corrupted response will lack these. This is deliberately
  // simpler than tag-counting — regex-based balance checks produce false
  // positives on real Next.js pages (inline SVGs, script-embedded HTML
  // strings, comment nodes all skew the counts unpredictably).
  if (!/<\/body\s*>/i.test(html) && !/<\/html\s*>/i.test(html)) {
    return { safe: false, reason: 'html_missing_structure' }
  }

  return { safe: true }
}

// ── 11B — LINK BUDGET ───────────────────────────────────────────────────────
// Counts contextual outbound <a> tags inside <main>. Scoping to <main>
// excludes header/footer nav links — those aren't the 4-link budget the rule
// is protecting. When <main> is absent, we fall back to whole document (less
// accurate but still a real upper bound).

export function countOutboundLinks(html: string): number {
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)
  const scope     = mainMatch ? mainMatch[1] : html
  const anchors   = scope.match(/<a\b[^>]*href=["'][^"']+["']/gi) || []
  return anchors.length
}

export interface LinkBudgetResult {
  ok:      boolean
  current: number
  max:     number
}

export function checkLinkBudget(html: string): LinkBudgetResult {
  const current = countOutboundLinks(html)
  return {
    ok:      current < GOVERNANCE.MAX_OUTBOUND_LINKS_PER_PAGE,
    current,
    max:     GOVERNANCE.MAX_OUTBOUND_LINKS_PER_PAGE,
  }
}
