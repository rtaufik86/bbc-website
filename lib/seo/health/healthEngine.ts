import type { HealthResult, HealthIssue } from './types'

export function computeHealth(p: any): HealthResult {
  const issues: HealthIssue[] = []

  // H1 check
  if (!p.h1Count || p.h1Count === 0) {
    issues.push({
      type:     'no_h1',
      severity: 'high',
      message:  'Missing H1 tag',
    })
  }

  // Indexability — not in sitemap is a potential crawl/index blocker
  if (p.inSitemap === false) {
    issues.push({
      type:     'not_indexed',
      severity: 'medium',
      message:  'Page not in sitemap (potential indexing issue)',
    })
  }

  // Thin content
  if (p.wordCount && p.wordCount < 300) {
    issues.push({
      type:     'low_content',
      severity: 'low',
      message:  'Low word count',
    })
  }

  // Score: start at 100, deduct by severity
  let score = 100
  for (const issue of issues) {
    if (issue.severity === 'high')   score -= 30
    if (issue.severity === 'medium') score -= 20
    if (issue.severity === 'low')    score -= 10
  }
  score = Math.max(0, score)

  const status: HealthResult['status'] =
    score < 50 ? 'critical' :
    score < 80 ? 'warning'  : 'healthy'

  return { status, issues, score }
}
