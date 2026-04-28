// Auto Execution Engine v0.7 — Freeze Circuit Breaker (spec 13).
//
// Two independent triggers flip auto execution OFF globally:
//   1. Error rate > 30 % over last 50 logs (min 5 samples)
//   2. ≥ 2 `already_linked` INJECT attempts over the same window
//
// A freeze persists in seo_execution_freeze_state so it survives reloads and
// applies across every tab. Release is explicit: a new row with
// frozen=false is inserted (we never UPDATE — history matters).
//
// Call order in the dispatcher:
//   getFreezeState() → if frozen, skip whole run
//   ... execute ...
//   evaluateFreezeRisk() → if shouldFreeze, triggerFreeze()

import { createClient } from '../../supabase/client'
import { GOVERNANCE }  from './governance'

export interface FreezeState {
  frozen:       boolean
  reason?:      string
  triggeredAt?: number
}

export interface FreezeRisk {
  rate:         number     // failures / samples
  samples:      number
  duplicates:   number     // count of already_linked INJECTs in lookback window
  shouldFreeze: boolean
  reason?:      string
}

interface FreezeRow {
  frozen:       boolean | null
  reason:       string | null
  triggered_at: string | null
}

interface LogRow {
  status:      string | null
  action_type: string | null
  reason:      string | null
}

// Ensure exactly one `fetch` per call, fire-and-forget on writes, and
// always a concrete FreezeState on reads. Errors are swallowed so the UI
// never crashes on a DB hiccup — absence of a frozen row = not frozen.

export async function getFreezeState(): Promise<FreezeState> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('seo_execution_freeze_state')
      .select('frozen, reason, triggered_at')
      .order('triggered_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    if (error || !data) return { frozen: false }
    const row = data as FreezeRow
    if (row.frozen !== true) return { frozen: false }
    return {
      frozen:      true,
      reason:      row.reason      ?? undefined,
      triggeredAt: row.triggered_at ? new Date(row.triggered_at).getTime() : undefined,
    }
  } catch {
    return { frozen: false }
  }
}

export async function triggerFreeze(reason: string, runId?: string): Promise<FreezeState> {
  try {
    const supabase = createClient()
    supabase
      .from('seo_execution_freeze_state')
      .insert({ frozen: true, reason, run_id: runId ?? null })
      .then(() => {}, () => {})
  } catch {
    /* swallowed */
  }
  return { frozen: true, reason, triggeredAt: Date.now() }
}

export async function releaseFreeze(): Promise<FreezeState> {
  try {
    const supabase = createClient()
    supabase
      .from('seo_execution_freeze_state')
      .insert({ frozen: false, reason: 'released_manually' })
      .then(() => {}, () => {})
  } catch {
    /* swallowed */
  }
  return { frozen: false }
}

/**
 * Inspect the most recent FREEZE_LOOKBACK_LOGS execution logs and report
 * whether the system should freeze. Does NOT mutate state — caller decides
 * whether to act on the recommendation.
 */
export async function evaluateFreezeRisk(): Promise<FreezeRisk> {
  const empty: FreezeRisk = { rate: 0, samples: 0, duplicates: 0, shouldFreeze: false }
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('seo_execution_logs')
      .select('status, action_type, reason')
      .order('created_at', { ascending: false })
      .limit(GOVERNANCE.FREEZE_LOOKBACK_LOGS)
    if (error || !data) return empty

    const rows     = data as LogRow[]
    const samples  = rows.length
    const failures = rows.filter(r => r.status === 'failed').length
    const duplicates = rows.filter(
      r => r.action_type === 'INJECT' && r.reason === 'already_linked',
    ).length
    const rate = samples > 0 ? failures / samples : 0

    if (
      samples >= GOVERNANCE.ERROR_RATE_MIN_SAMPLES &&
      rate    >  GOVERNANCE.ERROR_RATE_THRESHOLD
    ) {
      return { rate, samples, duplicates, shouldFreeze: true, reason: 'error_rate_exceeded' }
    }
    if (duplicates >= GOVERNANCE.DUPLICATE_INJECT_THRESHOLD) {
      return { rate, samples, duplicates, shouldFreeze: true, reason: 'duplicate_injection_detected' }
    }
    return { rate, samples, duplicates, shouldFreeze: false }
  } catch {
    return empty
  }
}
