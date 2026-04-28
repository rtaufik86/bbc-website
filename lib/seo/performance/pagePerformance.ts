import { QueryPerformance, PagePerformance } from './types'

export function computePagePerformance(
  mapped: Record<string, QueryPerformance[]>
): Record<string, PagePerformance> {
  const result: Record<string, PagePerformance> = {}

  for (const page in mapped) {
    const rows = mapped[page]

    const totalClicks      = rows.reduce((a, r) => a + r.clicks, 0)
    const totalImpressions = rows.reduce((a, r) => a + r.impressions, 0)
    const avgPosition      = rows.reduce((a, r) => a + r.position, 0) / rows.length

    // Top query by impressions — sort a copy to avoid mutating the input
    const topQuery = [...rows].sort((a, b) => b.impressions - a.impressions)[0]?.query || ''

    result[page] = {
      page,
      avgPosition,
      totalClicks,
      totalImpressions,
      ctr: totalImpressions > 0 ? totalClicks / totalImpressions : 0,
      topQuery,
      trend: 'flat',
    }
  }

  return result
}
