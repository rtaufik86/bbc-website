/**
 * Impact Engine
 *
 * Computes how far a page deviates from the ideal signal profile.
 * Returns a totalGap score and a named band so that downstream engines
 * can make priority decisions without knowing raw signal values.
 *
 * All inputs come from the Signal Engine (AllSignals) so this module
 * has zero page-data dependencies and is fully deterministic.
 */

import type { AllSignals } from '../signals'
import type { ImpactResult, ImpactBand } from './types'

/**
 * FAQ gap contribution varies by page type because FAQ schema has
 * different ranking value for each content tier.
 */
function faqGapFor(pageType: string, hasFAQ: boolean): number {
  if (hasFAQ) return 0
  if (pageType === 'weapon') return 25
  if (pageType === 'hub')    return 15
  if (pageType === 'money')  return 10
  return 0
}

export function computeImpact(signals: AllSignals, pageType: string): ImpactResult {
  const faqGap    = faqGapFor(pageType, signals.faq.hasFAQ)
  const trustGap  = Math.round((1 - Math.min(signals.trust.score, 100) / 100) * 20)
  const entityGap = Math.round((1 - Math.min(signals.entity.score, 100) / 100) * 20)
  const aeoGap    = Math.round((1 - Math.min(signals.aeo.score, 100) / 100) * 20)
  const linkGap   = signals.link.moneyLinks === 0
    ? 15
    : signals.link.earlyLinks === 0 ? 7 : 0

  const totalGap = faqGap + trustGap + entityGap + aeoGap + linkGap

  const band: ImpactBand =
    totalGap >= 70 ? 'critical' :
    totalGap >= 45 ? 'high' :
    totalGap >= 20 ? 'medium' : 'low'

  return {
    totalGap,
    band,
    breakdown: { faqGap, trustGap, entityGap, aeoGap, linkGap },
  }
}
