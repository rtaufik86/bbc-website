import type { SignalInput, AEOSignal } from './types'

/**
 * AEO (Answer Engine Optimization) signal.
 *   hasDirectAnswer: intro paragraph is substantive (> 200 chars).
 *   hasFAQ:          derived via the shared FAQ rule (explicit flag OR
 *                    schemaTypes contains 'FAQPage').
 *   score:           50 for direct answer + 50 for FAQ.
 *
 * Pure, deterministic. Consumers may use this as a lightweight AEO
 * readiness indicator alongside their richer domain-specific scoring.
 */
export function computeAEOSignal(input: SignalInput): AEOSignal {
  const hasDirectAnswer = Boolean(
    input.introText && input.introText.length > 200
  )
  const hasFAQ =
    Boolean(input.hasFAQSchema) || input.schemaTypes.includes('FAQPage')

  return {
    hasDirectAnswer,
    hasFAQ,
    score: (hasDirectAnswer ? 50 : 0) + (hasFAQ ? 50 : 0),
  }
}
