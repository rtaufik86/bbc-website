// Auto Execution Engine v0.8 — HTML patch diff utility.
//
// Produces a minimal line-based diff between the original HTML snapshot and
// the patched HTML written by safeExecute. The patches produced in v0.7 are
// tiny (a single <a> wrapping or one <h1> tag), so a longest-common-prefix /
// longest-common-suffix approach is sufficient and O(n) on line count —
// avoiding the O(n*m) memory cost of a full LCS on 500 KB documents.
//
// Output shape:
//   added     — lines present only in patched
//   removed   — lines present only in original
//   changed   — pairs of (removed, added) at the same position
//   rows      — aligned side-by-side rows for the UI viewer
//   *Count    — summary counters
//
// Null-safe: empty or missing HTML yields an empty diff (no throw).

export type DiffLineType = 'same' | 'added' | 'removed' | 'changed'

export interface DiffRow {
  type:      DiffLineType
  leftText:  string
  rightText: string
  leftNum:   number | null
  rightNum:  number | null
}

export interface HtmlDiffResult {
  added:        string[]
  removed:      string[]
  changed:      Array<{ from: string; to: string }>
  rows:         DiffRow[]
  addedCount:   number
  removedCount: number
  changedCount: number
}

function splitLines(s: string | null | undefined): string[] {
  if (!s) return []
  return s.split('\n')
}

export function computeHtmlDiff(
  original: string | null | undefined,
  patched:  string | null | undefined,
): HtmlDiffResult {
  const o = splitLines(original)
  const p = splitLines(patched)

  // Longest common prefix.
  let prefix = 0
  while (prefix < o.length && prefix < p.length && o[prefix] === p[prefix]) {
    prefix++
  }

  // Longest common suffix, constrained so prefix and suffix don't overlap.
  let suffix = 0
  while (
    suffix < (o.length - prefix) &&
    suffix < (p.length - prefix) &&
    o[o.length - 1 - suffix] === p[p.length - 1 - suffix]
  ) {
    suffix++
  }

  const removed = o.slice(prefix, o.length - suffix)
  const added   = p.slice(prefix, p.length - suffix)

  const changed: Array<{ from: string; to: string }> = []
  const pairCount = Math.min(removed.length, added.length)
  for (let i = 0; i < pairCount; i++) {
    changed.push({ from: removed[i], to: added[i] })
  }

  const rows: DiffRow[] = []

  for (let i = 0; i < prefix; i++) {
    rows.push({
      type:      'same',
      leftText:  o[i],
      rightText: o[i],
      leftNum:   i + 1,
      rightNum:  i + 1,
    })
  }

  const mid = Math.max(removed.length, added.length)
  for (let i = 0; i < mid; i++) {
    const hasLeft  = i < removed.length
    const hasRight = i < added.length
    const leftNum  = hasLeft  ? prefix + i + 1 : null
    const rightNum = hasRight ? prefix + i + 1 : null
    if (hasLeft && hasRight) {
      rows.push({
        type:      'changed',
        leftText:  removed[i],
        rightText: added[i],
        leftNum,
        rightNum,
      })
    } else if (hasLeft) {
      rows.push({
        type:      'removed',
        leftText:  removed[i],
        rightText: '',
        leftNum,
        rightNum:  null,
      })
    } else {
      rows.push({
        type:      'added',
        leftText:  '',
        rightText: added[i],
        leftNum:   null,
        rightNum,
      })
    }
  }

  for (let i = 0; i < suffix; i++) {
    const oi = o.length - suffix + i
    const pi = p.length - suffix + i
    rows.push({
      type:      'same',
      leftText:  o[oi],
      rightText: p[pi],
      leftNum:   oi + 1,
      rightNum:  pi + 1,
    })
  }

  return {
    added,
    removed,
    changed,
    rows,
    addedCount:   added.length,
    removedCount: removed.length,
    changedCount: changed.length,
  }
}
