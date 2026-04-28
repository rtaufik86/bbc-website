import type { SignalInput, EntitySignal } from './types'

/**
 * Entity signal: coverage of the primary-entity tokens derived from the
 * URL path against headings + metadata. This is a self-contained fallback
 * so every tool can import the Signal Engine without taking a hard
 * dependency on lib/seo/entity-engine.
 *
 * Phase 2 may compose the richer entity engine (computeEntityCoverage)
 * on top of this baseline when the input payload includes the full
 * registry relationships. For now this module guarantees a working
 * signal for every page shape.
 *
 * Pure, deterministic.
 */
export function computeEntitySignal(input: SignalInput): EntitySignal {
  const tokens = (input.url || '')
    .toLowerCase()
    .split(/[\/\-_]+/)
    .filter(t => t.length >= 3)

  if (tokens.length === 0) {
    return { score: 0, covered: false, coverage: [] }
  }

  const haystack = (
    (input.title || '') + ' ' +
    input.h1Texts.join(' ') + ' ' +
    input.h2Texts.join(' ') + ' ' +
    (input.description || '')
  ).toLowerCase()

  const coverage = tokens.filter(t => haystack.includes(t))
  const ratio = coverage.length / tokens.length

  return {
    score: Math.round(ratio * 100),
    covered: ratio >= 0.5,
    coverage,
  }
}
