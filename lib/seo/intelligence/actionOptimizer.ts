/**
 * Action Optimizer
 *
 * Reduces a raw action list to a clean, non-redundant execution set.
 *
 * Rules (applied in order):
 *   1. KILL supersedes — if any KILL exists, drop all other action types.
 *   2. Deduplicate by type — keep only the first occurrence of each action
 *      type (the first REWRITE naturally "merges" any duplicates because
 *      it carries the richest instruction set built up to that point).
 *   3. Max 3 actions — never overwhelm the execution queue; the highest-
 *      priority actions are already sorted to the front by the time this
 *      runs, so a simple slice is safe.
 *
 * Generic over T so that it works with any action shape that has `type`
 * and `priority` string fields. No mutation — returns a new array.
 */

export function optimizeActions<T extends { type: string; priority: string }>(
  actions: T[],
): T[] {
  if (actions.length === 0) return actions

  // Rule 1: KILL supersedes all other action types
  const kills = actions.filter(a => a.type === 'KILL')
  if (kills.length > 0) return kills

  // Rule 2: Deduplicate by type (first occurrence wins)
  const seen  = new Set<string>()
  const deduped: T[] = []
  for (const action of actions) {
    if (!seen.has(action.type)) {
      seen.add(action.type)
      deduped.push(action)
    }
  }

  // Rule 3: Cap at 3 actions
  return deduped.slice(0, 3)
}
