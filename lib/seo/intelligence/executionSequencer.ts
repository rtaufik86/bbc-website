/**
 * Execution Sequencer
 *
 * Sorts actions into the correct implementation order and tags each with
 * its numeric execution position so downstream consumers (copy-to-clipboard,
 * HTML export) can render them in dependency order without re-computing.
 *
 * Canonical execution order:
 *   KILL   → 0  (must happen before any content work)
 *   FIX    → 1  (unblock technical issues before writing)
 *   INJECT → 2  (authority injection after structure is clean)
 *   REWRITE→ 3  (content rewrite is the most expensive — do last)
 *
 * Generic over T so that it composes cleanly with optimizeActions<T>.
 */

export const EXECUTION_ORDER: Record<string, number> = {
  KILL:    0,
  FIX:     1,
  INJECT:  2,
  REWRITE: 3,
}

export type SequencedAction<T> = T & {
  executionOrder: number
  executionStep:  number
}

export function sequenceActions<T extends { type: string }>(
  actions: T[],
): SequencedAction<T>[] {
  return [...actions]
    .sort((a, b) =>
      (EXECUTION_ORDER[a.type] ?? 9) - (EXECUTION_ORDER[b.type] ?? 9),
    )
    .map((action, index) => ({
      ...action,
      executionOrder: EXECUTION_ORDER[action.type] ?? 9,
      executionStep:  index + 1,
    }))
}
