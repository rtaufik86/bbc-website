import type { SignalInput, H1Signal } from './types'

/**
 * H1 signal: count of H1 elements plus a normalized score.
 *   Exactly one H1  -> 100 (ideal)
 *   Zero / multiple -> 50  (signal present but not ideal)
 *
 * Pure, deterministic.
 */
export function computeH1Signal(input: SignalInput): H1Signal {
  const count = input.h1Texts.length
  return {
    count,
    hasH1: count > 0,
    score: count === 1 ? 100 : 50,
  }
}
