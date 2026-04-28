/**
 * Opportunity Engine
 *
 * Detects positive-signal opportunities hidden inside the gap between
 * actual signals and ideal signals. Unlike the Priority Engine (which
 * classifies urgency of *problems*), this module surfaces *upside* —
 * quick wins and growth levers the execution team can exploit.
 *
 * Returns opportunities sorted by potentialGain descending so the caller
 * can surface the highest-value opportunities first.
 */

import type { AllSignals } from '../signals'
import type { Opportunity, OpportunityType } from './types'

export function detectOpportunities(
  signals:  AllSignals,
  pageType: string,
): Opportunity[] {
  const opps: Opportunity[] = []

  // FAQ_ADDITION — adding FAQPage schema unlocks rich snippets on weapon/hub
  if (!signals.faq.hasFAQ && ['weapon', 'hub', 'money'].includes(pageType)) {
    opps.push({
      type:          'FAQ_ADDITION',
      potentialGain: pageType === 'weapon' ? 25 : pageType === 'hub' ? 15 : 10,
      description:   'Add FAQPage schema + 3-4 FAQ entries to unlock rich result snippets',
    })
  }

  // TRUST_BOOST — adding KBLI/PKP/Notaris trust signals strengthens E-E-A-T
  if (signals.trust.score < 50) {
    const gain = Math.round(((50 - signals.trust.score) / 50) * 20)
    opps.push({
      type:          'TRUST_BOOST',
      potentialGain: Math.max(1, gain),
      description:   'Add KBLI/PKP/Notaris/lokasi trust signals to improve E-E-A-T score',
    })
  }

  // ENTITY_EXPANSION — improving entity coverage in title/H1/description
  if (!signals.entity.covered) {
    const gain = Math.round((1 - signals.entity.score / 100) * 20)
    opps.push({
      type:          'ENTITY_EXPANSION',
      potentialGain: Math.max(1, gain),
      description:   `Expand entity coverage (current: ${signals.entity.score}%) in title, H1, and meta description`,
    })
  }

  // LINK_INJECTION — money-page link in first 300 words is high-signal
  if (signals.link.moneyLinks === 0) {
    opps.push({
      type:          'LINK_INJECTION',
      potentialGain: 15,
      description:   'Inject a money-page internal link within the first 300 words',
    })
  } else if (signals.link.earlyLinks === 0) {
    opps.push({
      type:          'LINK_INJECTION',
      potentialGain: 7,
      description:   'Move an existing internal link to appear before word 300 for crawler priority',
    })
  }

  // AEO_UPGRADE — direct answer intro + FAQ unlocks AI citation potential
  if (signals.aeo.score < 50) {
    const gain = Math.round((1 - signals.aeo.score / 100) * 20)
    opps.push({
      type:          'AEO_UPGRADE',
      potentialGain: Math.max(1, gain),
      description:   'Add a direct-answer intro (200+ words) + FAQ section for AEO / AI search visibility',
    })
  }

  // Sort by potential gain descending
  return opps.sort((a, b) => b.potentialGain - a.potentialGain)
}
