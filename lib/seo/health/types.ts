export type HealthStatus = 'healthy' | 'warning' | 'critical'

export interface HealthIssue {
  type:
    | 'no_h1'
    | 'not_indexed'
    | 'redirect_issue'
    | 'low_content'
    | 'unknown'
  severity: 'low' | 'medium' | 'high'
  message:  string
}

export interface HealthResult {
  status: HealthStatus
  issues: HealthIssue[]
  score:  number
}
