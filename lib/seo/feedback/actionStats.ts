// Action Attribution Engine v1.1 — segmented success rates with confidence.
// Batch 1/4/5 combined: page-type segmentation, fail-weighted success rate,
// and sample-size confidence score. Feeds into ControlCenterClient smart
// filter.

export type ActionType = 'FIX' | 'REWRITE' | 'INJECT' | 'KILL'

export interface ActionContext {
  pageType?:         string
  timeToResultDays?: number
}

export interface ActionResultRow {
  page:           string
  action_type:    string
  page_type?:     string | null
  result:         string | null
  position_delta: number | null
  ctr_delta:      number | null
  weight?:        number | null
  recorded_at?:   string
}

export interface ActionStat {
  type:        ActionType
  pageType:    string
  total:       number
  success:     number
  fail:        number
  successRate: number   // fail-weighted (v1.1): success / (success + fail * 1.5)
  confidence:  number   // 0..1, reaches 1 at 10+ samples
}

const ACTION_TYPES: ActionType[] = ['FIX', 'REWRITE', 'INJECT', 'KILL']

// v1.1 tuning constants
const FAIL_WEIGHT_MULTIPLIER = 1.5
const CONFIDENCE_SATURATION  = 10

function isActionType(t: string): t is ActionType {
  return (ACTION_TYPES as string[]).includes(t)
}

/**
 * Aggregate outcome rows into per-(type, pageType) stats.
 *
 * - 'improved' → success; 'declined' → fail; anything else ignored.
 * - Rows with unknown action_type are dropped so bad data can't poison stats.
 * - Groups keyed by `${action_type}::${page_type || 'unknown'}` so the filter
 *   can match a decision's pageType against the correct segment.
 * - `successRate` is fail-weighted: a REWRITE that fails 2x and succeeds 3x
 *   scores 3 / (3 + 2*1.5) = 0.5 rather than a naive 0.6.
 * - `confidence` caps at 1 once a segment has 10+ samples. Below that, the
 *   caller should soften or bypass the filter (handled in ControlCenterClient).
 */
export function computeActionStats(rows: ActionResultRow[]): ActionStat[] {
  const groups = new Map<string, { type: ActionType; pageType: string; success: number; fail: number }>()

  for (const r of rows) {
    if (!isActionType(r.action_type)) continue
    const pageType = (r.page_type ?? '').trim() || 'unknown'
    const key      = `${r.action_type}::${pageType}`
    let g = groups.get(key)
    if (!g) {
      g = { type: r.action_type, pageType, success: 0, fail: 0 }
      groups.set(key, g)
    }
    if      (r.result === 'improved') g.success++
    else if (r.result === 'declined') g.fail++
  }

  const out: ActionStat[] = []
  for (const g of groups.values()) {
    const total = g.success + g.fail
    if (total <= 0) continue
    const failWeight   = g.fail * FAIL_WEIGHT_MULTIPLIER
    const denominator  = g.success + failWeight
    const successRate  = denominator > 0 ? g.success / denominator : 0
    const confidence   = Math.min(1, total / CONFIDENCE_SATURATION)
    out.push({
      type:        g.type,
      pageType:    g.pageType,
      total,
      success:     g.success,
      fail:        g.fail,
      successRate,
      confidence,
    })
  }
  return out
}
