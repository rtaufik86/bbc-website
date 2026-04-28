/**
 * Confidence Engine
 *
 * Quantifies how much trust we can place in the signals emitted for a
 * given page. Missing or incomplete data causes signals to be unreliable,
 * so the engine deducts from a baseline of 100 and emits human-readable
 * warnings for each gap.
 *
 * Deduction table:
 *   No H1 detected              → -20  (structure signal unreliable)
 *   Missing introText            → -15  (AEO signal incomplete)
 *   Zero entity coverage         → -15  (entity signal unverifiable)
 *   No AEO signals at all        → -20  (answer optimization unknown)
 *   No outbound links            → -15  (link signal absent)
 *
 * Confidence levels:
 *   high   ≥ 70
 *   medium ≥ 40
 *   low    < 40
 */

import type { AllSignals } from '../signals'
import type { ConfidenceResult, ConfidenceLevel } from './types'

export function computeConfidence(
  signals: AllSignals,
  rawPage?: any,
): ConfidenceResult {
  let score = 100
  const warnings: string[] = []

  if (signals.h1.count === 0) {
    score -= 20
    warnings.push('No H1 detected — structure signal unreliable')
  }

  if (!rawPage?.introText) {
    score -= 15
    warnings.push('Missing introText — AEO signal incomplete')
  }

  if (signals.entity.score === 0) {
    score -= 15
    warnings.push('Zero entity coverage — entity signal unverifiable')
  }

  if (signals.aeo.score === 0) {
    score -= 20
    warnings.push('No AEO signals present — answer optimization status unknown')
  }

  if (signals.link.total === 0) {
    score -= 15
    warnings.push('No outbound links detected — link signal absent')
  }

  const bounded = Math.max(0, score)
  const level: ConfidenceLevel =
    bounded >= 70 ? 'high' :
    bounded >= 40 ? 'medium' : 'low'

  return { score: bounded, level, warnings }
}
