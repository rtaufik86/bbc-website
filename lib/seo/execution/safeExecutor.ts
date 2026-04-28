// Auto Execution Engine v0.7 — governed safe executor.
//
// v0.7 adds a governance layer on top of the v0.6 executor:
//
//   - Freeze gate (first): a globally active freeze aborts every call.
//   - Governance gates: eligibility (P0/P1, FIX/INJECT), page protection
//     (money fully protected, hub limited, etc.), HTML safety, link budget.
//   - RunContext: enforces MAX_ACTIONS_PER_PAGE_PER_RUN = 1 in-session and
//     tags every log row with a run_id so auditRun can gather results.
//   - ExecutionMode: 'safe' (auto) or 'manual' (approved). Both paths go
//     through the same guards; the mode field is logged for attribution.
//
// Still in scope:
//   - 24h cooldown resolved from DB when caller doesn't supply lastExecutedAt.
//   - Runtime HTML fetch from current origin when caller omits html.
//   - Double-link guard (keeps idempotency on re-runs).
//   - Original + patched HTML persisted for human review, capped to 500 KB.

import { createClient } from '../../supabase/client'
import {
  GOVERNANCE,
  checkEligibility,
  checkHtmlSafety,
  checkLinkBudget,
  checkPageProtection,
} from './governance'
import type { ExecutionMode, GovernedAction, GovernedPage, Priority } from './governance'
import { getFreezeState } from './freeze'
import type { RunContext } from './runContext'

export type SafeActionType = GovernedAction
export type SafePageType   = GovernedPage
export type SafeStatus     = 'pending_review' | 'skipped' | 'failed'

export interface SafeAction {
  type:           SafeActionType
  priority?:      Priority                         // v0.7: required by eligibility gate
  target?:        { href: string; anchor: string }
  executionStep?: number
}

export interface PageContext {
  path:            string
  pageType:        SafePageType | string
  lastExecutedAt?: number
  html?:           string
}

export interface ExecuteOptions {
  /** 'safe' = auto execution (default). 'manual' = user-approved single run. */
  mode?: ExecutionMode
  /** Optional run context for grouping + per-run page uniqueness. */
  run?:  RunContext
}

export interface SafeExecuteResult {
  ok:      boolean
  reason?: string
  html?:   string
}

// v0.6-carried tuning.
const HTML_FETCH_TIMEOUT_MS = 8000
const HTML_MAX_STORED_CHARS = 500_000
const ANCHOR_STOPWORDS      = new Set([
  'klik di sini', 'disini', 'di sini', 'here', 'click here',
])

// ── LOGGING ─────────────────────────────────────────────────────────────────
// Every log row gets run_id + mode. v0.7 makes this mandatory: spec 11F/H
// says "without logging, the action didn't happen".

interface LogPayload {
  page:           string
  action_type:    SafeActionType
  status:         SafeStatus
  reason:         string
  run_id:         string | null
  mode:           ExecutionMode
  original_html?: string | null
  patched_html?:  string | null
}

function truncate(html: string): string {
  return html.length > HTML_MAX_STORED_CHARS ? html.slice(0, HTML_MAX_STORED_CHARS) : html
}

function logExecution(payload: LogPayload): void {
  const supabase = createClient()
  // Thenable builders only fire when .then() is called. Kept fire-and-forget.
  supabase.from('seo_execution_logs').insert(payload).then(() => {}, () => {})
}

// Helper — builds a consistent log payload + returns the skip/fail result.
function emit(
  status:   SafeStatus,
  reason:   string,
  ctx:      { page: string; action: SafeActionType; runId: string | null; mode: ExecutionMode },
  extras?:  { original_html?: string; patched_html?: string },
): SafeExecuteResult {
  const payload: LogPayload = {
    page:          ctx.page,
    action_type:   ctx.action,
    status,
    reason,
    run_id:        ctx.runId,
    mode:          ctx.mode,
    original_html: extras?.original_html ?? null,
    patched_html:  extras?.patched_html  ?? null,
  }
  logExecution(payload)
  return { ok: status === 'pending_review', reason }
}

// ── DB HELPERS ──────────────────────────────────────────────────────────────

async function fetchLastExecutedAt(path: string): Promise<number | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('seo_execution_logs')
      .select('created_at')
      .eq('page',   path)
      .eq('status', 'pending_review')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    if (error || !data?.created_at) return null
    return new Date(data.created_at).getTime()
  } catch {
    return null
  }
}

async function fetchPageHtml(path: string): Promise<string | null> {
  if (typeof window === 'undefined') return null
  try {
    const url        = `${window.location.origin}${path}`
    const controller = new AbortController()
    const timer      = setTimeout(() => controller.abort(), HTML_FETCH_TIMEOUT_MS)
    const res        = await fetch(url, {
      signal:      controller.signal,
      redirect:    'follow',
      credentials: 'same-origin',
    })
    clearTimeout(timer)
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  }
}

// ── ANCHOR + HTML UTILS ─────────────────────────────────────────────────────

function anchorIsValid(anchor: string): boolean {
  if (!anchor) return false
  const a = anchor.trim().toLowerCase()
  if (a.length < 4) return false
  return !ANCHOR_STOPWORDS.has(a)
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function anchorIsAlreadyLinked(html: string, anchor: string): boolean {
  const safe = escapeRegex(anchor)
  const re   = new RegExp(`<a\\b[^>]*>[^<]*${safe}[^<]*</a>`, 'i')
  return re.test(html)
}

function injectOnce(html: string, href: string, anchor: string): { html: string; inserted: boolean } {
  const safeAnchor = escapeRegex(anchor)
  const re         = new RegExp(`(>[^<]*?)(${safeAnchor})([^<]*?<)`, 'i')
  if (!re.test(html)) return { html, inserted: false }
  const next = html.replace(
    re,
    `$1<a href="${href}" class="text-accent hover:underline">$2</a>$3`,
  )
  return { html: next, inserted: true }
}

// ── MAIN ENTRY ──────────────────────────────────────────────────────────────
/**
 * Execute an action against a page context under v0.7 governance.
 * Every outcome (applied/skipped/failed) persists to seo_execution_logs
 * with run_id + mode. Gate order is deliberate:
 *
 *   1. Freeze state — if active, abort immediately.
 *   2. Eligibility — priority + action type.
 *   3. Page protection — money/utility never, hub no INJECT, etc.
 *   4. Per-run claim — max 1 action per page per run.
 *   5. Cooldown — 24h since last 'pending_review' log.
 *   6. HTML resolve — supplied or runtime-fetched.
 *   7. HTML safety + link budget.
 *   8. Action-specific execution.
 */
export async function safeExecute(
  page:    PageContext,
  action:  SafeAction,
  options: ExecuteOptions = {},
): Promise<SafeExecuteResult> {
  const mode    = options.mode ?? 'safe'
  const runId   = options.run?.runId ?? null
  const logCtx  = { page: page.path, action: action.type, runId, mode }

  // 1. Freeze gate — spec 13. Every call is gated, including manual, so the
  //    freeze is a true circuit breaker and not just an auto-mode pause.
  const freeze = await getFreezeState()
  if (freeze.frozen) {
    return emit('skipped', `frozen:${freeze.reason ?? 'unknown'}`, logCtx)
  }

  // 2. Eligibility (spec 11D)
  const elig = checkEligibility(action.priority ?? 'P3', action.type)
  if (!elig.allow) return emit('skipped', elig.reason, logCtx)

  // 3. Page protection (spec 11C)
  const prot = checkPageProtection(page.pageType, action.type)
  if (!prot.allow) return emit('skipped', prot.reason, logCtx)

  // 4. Per-run uniqueness (spec 11B: max 1 action / page / run). The
  //    run context is optional so ad-hoc callers still work — they just
  //    don't get per-run dedup.
  if (options.run && !options.run.claimPage(page.path)) {
    return emit('skipped', 'page_already_touched_this_run', logCtx)
  }

  // 5. Cooldown — resolve lastExecutedAt from DB if caller didn't supply.
  let resolved: PageContext = page
  if (page.lastExecutedAt == null) {
    const ts = await fetchLastExecutedAt(page.path)
    if (ts != null) resolved = { ...resolved, lastExecutedAt: ts }
  }
  if (
    resolved.lastExecutedAt != null &&
    Date.now() - resolved.lastExecutedAt < GOVERNANCE.COOLDOWN_MS
  ) {
    return emit('skipped', 'cooldown_24h', logCtx)
  }

  // 6. HTML resolve
  let html: string
  if (resolved.html) {
    html = resolved.html
  } else {
    const fetched = await fetchPageHtml(resolved.path)
    if (fetched == null) return emit('failed', 'fetch_failed', logCtx)
    html = fetched
  }

  // 7. HTML safety (spec 11E)
  const safety = checkHtmlSafety(html)
  if (!safety.safe) {
    return emit('failed', safety.reason ?? 'html_unsafe', logCtx)
  }

  // 8. Link budget (INJECT only — FIX doesn't add outbound links)
  if (action.type === 'INJECT') {
    const budget = checkLinkBudget(html)
    if (!budget.ok) {
      return emit('skipped', 'link_budget_exceeded', logCtx)
    }
  }

  // 9. Action-specific flow
  if (action.type === 'INJECT') {
    if (!action.target) {
      return emit('failed', 'missing_target', logCtx)
    }
    if (!anchorIsValid(action.target.anchor)) {
      return emit('skipped', 'invalid_anchor', logCtx)
    }
    if (anchorIsAlreadyLinked(html, action.target.anchor)) {
      return emit('skipped', 'already_linked', logCtx)
    }
    const { html: patched, inserted } = injectOnce(html, action.target.href, action.target.anchor)
    if (!inserted) {
      return emit('skipped', 'no_match', logCtx)
    }
    emit('pending_review', 'injected_once', logCtx, {
      original_html: truncate(html),
      patched_html:  truncate(patched),
    })
    return { ok: true, html: patched }
  }

  if (action.type === 'FIX') {
    if (/<h1[\s>]/i.test(html)) {
      return emit('skipped', 'h1_exists', logCtx)
    }
    if (!/<main[\s>]/i.test(html)) {
      return emit('failed', 'no_main_tag', logCtx)
    }
    const patched = html.replace(
      /<main[^>]*>/i,
      m => `${m}\n<h1 class="sr-only">Halaman</h1>\n`,
    )
    emit('pending_review', 'h1_injected', logCtx, {
      original_html: truncate(html),
      patched_html:  truncate(patched),
    })
    return { ok: true, html: patched }
  }

  // Unreachable under current action union, but keeps the contract total.
  return emit('skipped', 'unsupported_action', logCtx)
}
