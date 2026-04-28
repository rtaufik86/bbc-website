// Auto Execution Engine v0.7 — per-run scoped state.
//
// A RunContext groups every safeExecute call belonging to one dispatcher
// pass. It carries:
//   - runId: string token written to every log row, used by auditRun
//     to gather results for that specific pass.
//   - touched pages: enforces the hard limit "max 1 action per page per run"
//     without hitting the database for every call.
//
// Session-local only — multi-tab scenarios are covered by the 24h cooldown
// in the DB, not here. This class exists to compress the common case
// (single tab, one dispatcher loop) into O(1) lookups.

export class RunContext {
  readonly runId:     string
  readonly startedAt: number
  private  touched = new Set<string>()

  constructor(runId?: string) {
    this.runId     = runId ?? RunContext.makeId()
    this.startedAt = Date.now()
  }

  /**
   * Mark `path` as the (one and only) page claimed in this run. Returns
   * false when the page was already claimed, signalling the caller should
   * skip with reason `page_already_touched_this_run`.
   */
  claimPage(path: string): boolean {
    if (this.touched.has(path)) return false
    this.touched.add(path)
    return true
  }

  hasPage(path: string): boolean {
    return this.touched.has(path)
  }

  pageCount(): number {
    return this.touched.size
  }

  private static makeId(): string {
    const t = Date.now().toString(36)
    const r = Math.random().toString(36).slice(2, 8)
    return `run_${t}_${r}`
  }
}

export function createRunContext(runId?: string): RunContext {
  return new RunContext(runId)
}
