import type { PerformanceSnapshot, FeedbackResult, FeedbackDelta, FeedbackResultType } from './types'
import type { PagePerformance } from '../performance/types'

// v1.3 thresholds — stability gates applied in computeFeedback.
// POSITION_THRESHOLD: minimum rank shift (in SERP positions) that counts as meaningful.
// CTR_THRESHOLD:      minimum CTR delta (absolute, e.g. 0.02 = 2 percentage points).
const POSITION_THRESHOLD = 3
const CTR_THRESHOLD      = 0.02

/** Build a snapshot from live performance data. */
export function snapshotFromPerformance(
  path: string,
  perf: PagePerformance,
): PerformanceSnapshot {
  return {
    path,
    timestamp:        Date.now(),
    avgPosition:      perf.avgPosition ?? null,
    totalImpressions: perf.totalImpressions,
    totalClicks:      perf.totalClicks,
    ctr:              perf.ctr ?? 0,
  }
}

/**
 * Compare a current snapshot against a previous one and return a FeedbackResult.
 * Returns 'no_data' when either snapshot is absent.
 *
 * Sign convention (preserved from v1.2):
 *   positionDelta = current - previous  → NEGATIVE means rank improved (went from 12 → 8 = -4)
 *   ctrDelta      = current - previous  → POSITIVE means CTR improved
 */
export function computeFeedback(
  current:  PerformanceSnapshot | undefined,
  previous: PerformanceSnapshot | undefined,
): FeedbackResult {
  if (!current || !previous) {
    return {
      result:           'no_data',
      delta:            null,
      previousSnapshot: previous ?? null,
      message:          'Insufficient data for comparison',
    }
  }

  const positionDelta: number | null =
    current.avgPosition != null && previous.avgPosition != null
      ? current.avgPosition - previous.avgPosition
      : null

  const impressionDelta = current.totalImpressions - previous.totalImpressions
  const clickDelta      = current.totalClicks      - previous.totalClicks
  const ctrDelta        = current.ctr              - previous.ctr

  const delta: FeedbackDelta = { positionDelta, impressionDelta, clickDelta, ctrDelta }

  // v1.3 threshold logic — noise filter.
  // Improvement: rank moved up by >= POSITION_THRESHOLD OR CTR gained >= CTR_THRESHOLD.
  // Decline:     rank fell  by >= POSITION_THRESHOLD OR CTR lost   >= CTR_THRESHOLD.
  const improved =
    (positionDelta != null && positionDelta < -POSITION_THRESHOLD) ||
    ctrDelta > CTR_THRESHOLD
  const declined =
    (positionDelta != null && positionDelta > POSITION_THRESHOLD) ||
    ctrDelta < -CTR_THRESHOLD

  let result:  FeedbackResultType
  let message: string

  if (declined) {
    result  = 'declined'
    message = positionDelta != null && positionDelta > POSITION_THRESHOLD
      ? `Position dropped ${positionDelta.toFixed(1)} spots vs baseline`
      : `CTR fell ${(ctrDelta * 100).toFixed(1)} pp vs baseline`
  } else if (improved) {
    result  = 'improved'
    message = positionDelta != null && positionDelta < -POSITION_THRESHOLD
      ? `Position improved ${Math.abs(positionDelta).toFixed(1)} spots vs baseline`
      : `CTR gained ${(ctrDelta * 100).toFixed(1)} pp vs baseline`
  } else {
    result  = 'flat'
    message = 'No meaningful change vs baseline (within threshold)'
  }

  return { result, delta, previousSnapshot: previous, message }
}

/**
 * v1.3 — Window average shape used for 7d-vs-7d comparisons.
 * Lighter than PerformanceSnapshot: totalClicks is optional (persistence
 * layer does not store clicks — only position / ctr / impressions).
 */
export interface WindowAverage {
  path:             string
  avgPosition:      number | null
  totalImpressions: number
  totalClicks:      number
  ctr:              number
}

/**
 * Compare two window averages (e.g. previous 7d vs recent 7d) and return a
 * FeedbackResult. `before` is the older window, `after` is the more recent one.
 * Delegates to computeFeedback after wrapping both averages as snapshots.
 */
export function computeWindowFeedback(
  before: WindowAverage,
  after:  WindowAverage,
): FeedbackResult {
  const now = Date.now()
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000

  const afterSnap: PerformanceSnapshot = {
    path:             after.path,
    timestamp:        now,
    avgPosition:      after.avgPosition,
    totalImpressions: after.totalImpressions,
    totalClicks:      after.totalClicks,
    ctr:              after.ctr,
  }
  const beforeSnap: PerformanceSnapshot = {
    path:             before.path,
    timestamp:        now - sevenDaysMs,
    avgPosition:      before.avgPosition,
    totalImpressions: before.totalImpressions,
    totalClicks:      before.totalClicks,
    ctr:              before.ctr,
  }

  return computeFeedback(afterSnap, beforeSnap)
}
