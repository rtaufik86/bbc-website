export type FeedbackResultType = 'improved' | 'declined' | 'flat' | 'no_data'

export interface PerformanceSnapshot {
  path:             string
  timestamp:        number   // Unix ms
  avgPosition:      number | null
  totalImpressions: number
  totalClicks:      number
  ctr:              number
}

export interface FeedbackDelta {
  positionDelta:   number | null  // negative = improved (lower position number = higher rank)
  impressionDelta: number
  clickDelta:      number
  ctrDelta:        number
}

export interface FeedbackResult {
  result:           FeedbackResultType
  delta:            FeedbackDelta | null
  previousSnapshot: PerformanceSnapshot | null
  message:          string
}
