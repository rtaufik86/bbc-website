export interface QueryPerformance {
  query:       string
  page:        string
  clicks:      number
  impressions: number
  ctr:         number
  position:    number
}

export interface PagePerformance {
  page:             string
  avgPosition:      number
  totalClicks:      number
  totalImpressions: number
  ctr:              number
  topQuery:         string
  trend:            'up' | 'down' | 'flat'
}
