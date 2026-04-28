// Auto Execution Engine v0.7 — Codex-style audit (spec 12).
//
// After a dispatcher run finishes, auditRun(runId) inspects every log row
// that belongs to that run and surfaces up to 5 violations. Scope is
// deliberately narrow:
//   - duplicate_link        INJECT hit an already-linked anchor
//   - anchor_concentration  same anchor repeated on one page within a run
//   - broken_html           patched HTML has nested <a> or missing <main>
//   - rule_violation        a log with a governance-reason failure
//
// Cap = 5 because the point is triage, not exhaustive reporting. If a run
// produces more than 5 issues, the freeze circuit breaker almost certainly
// fires anyway.

import { createClient } from '../../supabase/client'

export type AuditKind =
  | 'duplicate_link'
  | 'anchor_concentration'
  | 'broken_html'
  | 'rule_violation'

export interface AuditIssue {
  kind:    AuditKind
  page:    string
  detail:  string
}

export interface AuditReport {
  runId:     string
  total:     number
  issues:    AuditIssue[]
}

interface LogRow {
  page:          string | null
  action_type:   string | null
  status:        string | null
  reason:        string | null
  original_html: string | null
  patched_html:  string | null
}

const MAX_ISSUES = 5

// Reasons that represent governance-layer refusals (not business logic).
// A log carrying one of these in `reason` should surface as rule_violation.
const RULE_VIOLATION_REASONS = new Set([
  'money_page_protected',
  'utility_page_excluded',
  'rewrite_not_allowed',
  'kill_not_allowed',
  'hub_inject_limited',
  'priority_not_eligible',
  'action_not_eligible',
  'link_budget_exceeded',
  'html_empty',
  'html_too_small',
  'html_nested_anchor_exists',
  'html_unclosed_tag',
  'html_tag_imbalance',
])

function extractInjectedAnchors(patchedHtml: string): string[] {
  // Match anchors created by safeExecutor's injector (class contains
  // text-accent). Captures the anchor text for distribution analysis.
  const re      = /<a\b[^>]*class="[^"]*text-accent[^"]*"[^>]*>([^<]+)<\/a>/gi
  const results: string[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(patchedHtml)) !== null) {
    results.push(m[1].trim().toLowerCase())
  }
  return results
}

export async function auditRun(runId: string): Promise<AuditReport> {
  const report: AuditReport = { runId, total: 0, issues: [] }
  if (!runId) return report

  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('seo_execution_logs')
      .select('page, action_type, status, reason, original_html, patched_html')
      .eq('run_id', runId)
      .order('created_at', { ascending: false })
    if (error || !data) return report

    const rows = data as LogRow[]
    report.total = rows.length

    // Tracks anchors injected *during this run* per page, so repeated
    // anchors inside a single run are the flag we want (not noise from
    // historical patches).
    const anchorsByPage: Record<string, string[]> = {}

    const addIssue = (issue: AuditIssue) => {
      if (report.issues.length < MAX_ISSUES) report.issues.push(issue)
    }

    for (const row of rows) {
      if (report.issues.length >= MAX_ISSUES) break
      const page = row.page ?? '(unknown)'

      // Duplicate link — the injector refused because anchor was already
      // wrapped. Surface it so operators see the double-link signal.
      if (row.status === 'skipped' && row.reason === 'already_linked') {
        addIssue({
          kind:   'duplicate_link',
          page,
          detail: 'INJECT target anchor already carried a link',
        })
      }

      // Rule violations — governance refusals, separate bucket so the UI
      // can render them distinctly from real execution breakage.
      if (row.reason && RULE_VIOLATION_REASONS.has(row.reason)) {
        addIssue({
          kind:   'rule_violation',
          page,
          detail: `Governance gate fired: ${row.reason}`,
        })
      }

      // Broken HTML — either patched HTML introduced a nested anchor
      // (regression) or the page had no <main> to operate on.
      if (row.patched_html && /<a\b[^>]*>[^<]*<a\b/i.test(row.patched_html)) {
        addIssue({
          kind:   'broken_html',
          page,
          detail: 'Patched HTML introduced a nested <a> tag',
        })
      }
      if (row.reason === 'no_main_tag') {
        addIssue({
          kind:   'broken_html',
          page,
          detail: 'Target page missing <main> element',
        })
      }

      // Accumulate newly-injected anchors for post-scan concentration check.
      if (row.patched_html && row.status === 'applied' && row.action_type === 'INJECT') {
        const anchors = extractInjectedAnchors(row.patched_html)
        if (anchors.length > 0) {
          (anchorsByPage[page] ||= []).push(...anchors)
        }
      }
    }

    // Second pass: anchor concentration per page.
    for (const [page, anchors] of Object.entries(anchorsByPage)) {
      if (report.issues.length >= MAX_ISSUES) break
      const counts = new Map<string, number>()
      for (const a of anchors) counts.set(a, (counts.get(a) ?? 0) + 1)
      for (const [anchor, count] of counts) {
        if (count > 1) {
          report.issues.push({
            kind:   'anchor_concentration',
            page,
            detail: `Anchor "${anchor}" injected ${count}× in one run`,
          })
          break   // one concentration flag per page is enough
        }
      }
    }

    return report
  } catch {
    return report
  }
}
