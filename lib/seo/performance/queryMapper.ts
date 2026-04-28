import { QueryPerformance } from './types'

export function mapQueriesToPage(data: QueryPerformance[]): Record<string, QueryPerformance[]> {
  const map: Record<string, QueryPerformance[]> = {}

  for (const row of data) {
    if (!map[row.page]) map[row.page] = []
    map[row.page].push(row)
  }

  return map
}
