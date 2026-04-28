/**
 * Intelligence Layer — Shared Type Contracts
 *
 * Canonical definitions for impact bands, priority tiers, opportunity
 * shapes, confidence scoring, and the top-level IntelligenceOutput.
 * Consumed by all modules in this folder and by DecisionEngineClient.
 */

export type Priority = 'P0' | 'P1' | 'P2' | 'P3'

export type ImpactBand = 'critical' | 'high' | 'medium' | 'low'

export interface ImpactBreakdown {
  faqGap:    number  // 0-25 by pageType
  trustGap:  number  // 0-20 proportional to trust deficit
  entityGap: number  // 0-20 proportional to entity coverage gap
  aeoGap:    number  // 0-20 proportional to AEO score deficit
  linkGap:   number  // 0 | 7 | 15 based on money-link presence
}

export interface ImpactResult {
  totalGap:  number
  band:      ImpactBand
  breakdown: ImpactBreakdown
}

export interface PriorityResult {
  value:  Priority
  reason: string
}

export type OpportunityType =
  | 'FAQ_ADDITION'
  | 'TRUST_BOOST'
  | 'ENTITY_EXPANSION'
  | 'LINK_INJECTION'
  | 'AEO_UPGRADE'

export interface Opportunity {
  type:          OpportunityType
  potentialGain: number   // estimated score lift (0-25)
  description:   string
}

export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface ConfidenceResult {
  score:    number          // 0-100
  level:    ConfidenceLevel
  warnings: string[]
}

/** Optional context passed by the caller to enrich intelligence output. */
export interface IntelligenceContext {
  pageType?:    string
  issues?:      string[]
  authorityGap?: number
  rawPage?:     any   // tolerant — used by confidenceEngine only
}

export interface IntelligenceOutput {
  impact:        ImpactResult
  priority:      PriorityResult
  opportunities: Opportunity[]
  confidence:    ConfidenceResult
}
