/**
 * Priority Engine
 *
 * Maps an ImpactResult + detected issues onto a Priority tier (P0–P3).
 * Precedence rules (first match wins):
 *
 *   P0 — Structural blockers (no_h1, angle_overlap) regardless of impact,
 *         OR critical authority gap on a money page,
 *         OR critical impact band on any page type.
 *
 *   P1 — Content quality issues (thin_content, no_faq) on weapon / hub pages,
 *         OR high impact band.
 *
 *   P2 — Link / authority issues (authority_gap, orphan_risk,
 *         missing_money_link), OR medium impact band.
 *
 *   P3 — Everything else (no critical signals detected).
 */

import type { ImpactResult, Priority, PriorityResult } from './types'

const STRUCTURAL_BLOCKERS = ['no_h1', 'angle_overlap']
const CONTENT_ISSUES      = ['thin_content', 'no_faq']
const LINK_ISSUES         = ['authority_gap', 'orphan_risk', 'missing_money_link']

export function computePriority(
  impact:       ImpactResult,
  issues:       string[],
  pageType:     string,
  authorityGap: number,
): PriorityResult {
  // --- P0 ---
  if (issues.some(i => STRUCTURAL_BLOCKERS.includes(i))) {
    return { value: 'P0', reason: 'Structural blocker detected (no_h1 or angle_overlap)' }
  }
  if (pageType === 'money' && (impact.band === 'critical' || authorityGap > 60)) {
    return { value: 'P0', reason: 'Critical signal gap on money page' }
  }
  if (impact.band === 'critical') {
    return { value: 'P0', reason: 'Critical impact band — immediate intervention required' }
  }

  // --- P1 ---
  if (['weapon', 'hub'].includes(pageType) && issues.some(i => CONTENT_ISSUES.includes(i))) {
    return { value: 'P1', reason: 'Content quality issue on high-value page (weapon/hub)' }
  }
  if (impact.band === 'high') {
    return { value: 'P1', reason: 'High impact band' }
  }

  // --- P2 ---
  if (issues.some(i => LINK_ISSUES.includes(i))) {
    return { value: 'P2', reason: 'Link or authority gap detected' }
  }
  if (impact.band === 'medium') {
    return { value: 'P2', reason: 'Medium impact band' }
  }

  // --- P3 ---
  return { value: 'P3', reason: 'No critical signals — low priority maintenance' }
}
