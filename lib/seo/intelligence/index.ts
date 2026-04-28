/**
 * Intelligence Layer — Public API
 *
 * Single entry-point for the full intelligence pipeline.
 * Aggregates: Impact → Priority → Opportunities → Confidence.
 *
 * Usage:
 *   const intel = computeIntelligence(signals, { pageType, issues, authorityGap, rawPage })
 *   intel.priority.value  // 'P0' | 'P1' | 'P2' | 'P3'
 *   intel.opportunities   // sorted by potentialGain desc
 *   intel.confidence      // score 0-100 + warnings
 *
 * Utility functions (optimizeActions, sequenceActions) are re-exported
 * so callers can import everything from one place.
 */

// --- Local imports (used by computeIntelligence) ---
import { computeImpact }       from './impactEngine'
import { computePriority }     from './priorityEngine'
import { detectOpportunities } from './opportunityEngine'
import { computeConfidence }   from './confidenceEngine'
import type { AllSignals }     from '../signals'
import type { IntelligenceContext, IntelligenceOutput } from './types'

// --- Re-exports: engine functions ---
export { computeImpact }        from './impactEngine'
export { computePriority }      from './priorityEngine'
export { optimizeActions }      from './actionOptimizer'
export { sequenceActions, EXECUTION_ORDER } from './executionSequencer'
export { detectOpportunities }  from './opportunityEngine'
export { computeConfidence }    from './confidenceEngine'

// --- Re-exports: types ---
export type {
  ImpactBand,
  ImpactBreakdown,
  ImpactResult,
  Priority,
  PriorityResult,
  OpportunityType,
  Opportunity,
  ConfidenceLevel,
  ConfidenceResult,
  IntelligenceContext,
  IntelligenceOutput,
} from './types'

export type { SequencedAction } from './executionSequencer'

/**
 * computeIntelligence — master aggregator.
 *
 * All four engines are called in dependency order:
 *   1. impactEngine      (signals + pageType → ImpactResult)
 *   2. priorityEngine    (impact + issues + pageType + authorityGap → PriorityResult)
 *   3. opportunityEngine (signals + pageType → Opportunity[])
 *   4. confidenceEngine  (signals + optional rawPage → ConfidenceResult)
 */
export function computeIntelligence(
  signals: AllSignals,
  context?: IntelligenceContext,
): IntelligenceOutput {
  const pageType     = context?.pageType     ?? 'support'
  const issues       = context?.issues       ?? []
  const authorityGap = context?.authorityGap ?? 0
  const rawPage      = context?.rawPage

  const impact        = computeImpact(signals, pageType)
  const priority      = computePriority(impact, issues, pageType, authorityGap)
  const opportunities = detectOpportunities(signals, pageType)
  const confidence    = computeConfidence(signals, rawPage)

  return { impact, priority, opportunities, confidence }
}
