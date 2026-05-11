// Quality Gate v1A — pure scorers. Each dimension is a deterministic
// boolean-check stack converted into a 0-100 score. No side effects, no I/O.
// Intentionally lenient on missing fields — absent data degrades to a check
// failure rather than throwing, so partial AuditPage shapes still score.

import type {
  QualityAuditPage,
  QualityLabel,
  QualityResult,
  QualityScore,
} from './types'

// ── Constants ────────────────────────────────────────────────────────────────

const SERVICE_TERMS = [
  'sewa kantor',
  'virtual office',
  'pendirian pt',
  'kantor siap pakai',
  'serviced office',
  'legalitas',
  'pkp',
  'kbli',
]

const LOCATION_TERMS = [
  'jakarta selatan',
  'bintaro',
  'pesanggrahan',
  'rc veteran',
  'pintu tol veteran',
]

const BRAND_TERMS = [
  'bintaro business centre',
  'bintaro business center',
  'bbc',
]

const GENERIC_OPENERS = [
  'di era',
  'saat ini banyak',
  'solusi terbaik',
  'kami hadir',
  'dalam dunia',
]

const FACILITY_TERMS = [
  'resepsionis',
  'mail handling',
  'gedung',
  '72',
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function lower(s: string | undefined | null): string {
  return (s ?? '').toLowerCase()
}

function containsAny(text: string, needles: string[]): boolean {
  if (!text) return false
  return needles.some(n => text.includes(n))
}

function startsWithAny(text: string, prefixes: string[]): boolean {
  if (!text) return false
  return prefixes.some(p => text.startsWith(p))
}

function pctScore(checks: Record<string, boolean>): number {
  const keys = Object.keys(checks)
  if (keys.length === 0) return 0
  const passed = keys.filter(k => checks[k]).length
  return Math.round((passed / keys.length) * 100)
}

function labelFor(score: number): QualityLabel {
  if (score >= 80) return 'strong'
  if (score >= 60) return 'fair'
  return 'weak'
}

function build(checks: Record<string, boolean>, notes: string[] = []): QualityScore {
  const score = pctScore(checks)
  return { score, label: labelFor(score), checks, notes }
}

// Aggregated visible text used by trust + entity scorers.
function visibleText(p: QualityAuditPage): string {
  const parts: string[] = []
  parts.push(lower(p.introText))
  parts.push(lower((p.h1Texts ?? []).join(' ')))
  parts.push(lower((p.h2Texts ?? []).join(' ')))
  parts.push(lower((p.h3Texts ?? []).join(' ')))
  for (const f of p.faqs ?? []) {
    parts.push(lower(f.q))
    parts.push(lower(f.a))
  }
  return parts.join(' ')
}

// ── A. entityPlacement ───────────────────────────────────────────────────────

function scoreEntityPlacement(p: QualityAuditPage): QualityScore {
  const primary  = lower(p.semanticGraph?.primaryEntity)
  const title    = lower(p.title)
  const h1       = lower((p.h1Texts ?? []).join(' '))
  const intro    = lower(p.introText)
  const hasH1    = (p.h1Texts ?? []).length > 0
  const hasSubH  = (p.h2Texts ?? []).length > 0 || (p.h3Texts ?? []).length > 0
  const hasContextualAnchor = (p.linksOut ?? []).some(l => l.isContextual)
  const schemaCount = (p.schemaTypes ?? []).length

  const checks: Record<string, boolean> = {
    primaryEntityExists:       Boolean(primary && primary !== 'unknown'),
    entityOrServiceInTitle:    (primary !== '' && title.includes(primary)) || containsAny(title, SERVICE_TERMS),
    entityOrServiceInH1:       hasH1 && ((primary !== '' && h1.includes(primary)) || containsAny(h1, SERVICE_TERMS)),
    entityOrServiceInIntro:    (primary !== '' && intro.includes(primary)) || containsAny(intro, SERVICE_TERMS),
    hasSubheadingStructure:    hasSubH,
    hasContextualInternalLink: hasContextualAnchor,
    hasSchema:                 schemaCount > 0,
  }

  return build(checks)
}

// ── B. answerFirst ───────────────────────────────────────────────────────────

function scoreAnswerFirst(p: QualityAuditPage): QualityScore {
  const intro     = lower(p.introText)
  const introLen  = intro.length
  const hasFAQ    = (p.faqs ?? []).length > 0
  const hasH2     = (p.h2Texts ?? []).length > 0
  const wordCount = p.wordCount ?? 0

  const checks: Record<string, boolean> = {
    introExists:                introLen > 0,
    introMinLength:             introLen >= 80,
    introNotGeneric:            introLen > 0 && !startsWithAny(intro, GENERIC_OPENERS),
    introHasServiceOrLocation:  containsAny(intro, SERVICE_TERMS) || containsAny(intro, LOCATION_TERMS) || containsAny(intro, BRAND_TERMS),
    sufficientDepth:            wordCount > 500,
    hasFaqOrH2:                 hasFAQ || hasH2,
  }

  return build(checks)
}

// ── C. interaction ───────────────────────────────────────────────────────────

function scoreInteraction(p: QualityAuditPage): QualityScore {
  const out = p.linksOut ?? []
  const hasContact = out.some(l => {
    const href = lower(l.href)
    return href.includes('wa.me') || href.startsWith('tel:') || href.startsWith('mailto:') || href.includes('/kontak') || href.includes('/#konsultasi') || href.includes('/contact')
  })
  const hasMoneyLink = out.some(l => l.isMoneyPage)
  const isWeapon     = p.pageType === 'weapon'
  const isWeaponLike = isWeapon || p.pageType === 'money'
  const moneyTimingOk = !isWeapon || p.firstMoneyLinkBefore300 === true
  const hasFAQ       = (p.faqs ?? []).length > 0
  const linksTotal   = p.internalLinksTotal      ?? 0
  const linksContext = p.internalLinksContextual ?? 0

  const checks: Record<string, boolean> = {
    hasContactCTA:           hasContact,
    hasMoneyPageLink:        hasMoneyLink,
    moneyLinkTimingOk:       moneyTimingOk,
    hasFaqIfWeaponOrMoney:   isWeaponLike ? hasFAQ : true,
    hasInternalLinks:        linksTotal > 0,
    hasContextualLinks:      linksContext > 0,
  }

  return build(checks)
}

// ── D. taskSuccess ───────────────────────────────────────────────────────────

function scoreTaskSuccess(p: QualityAuditPage): QualityScore {
  const out          = p.linksOut ?? []
  const hasMoney     = out.some(l => l.isMoneyPage)
  const hasContact   = out.some(l => {
    const href = lower(l.href)
    return href.includes('wa.me') || href.startsWith('tel:') || href.startsWith('mailto:') || href.includes('/kontak')
  })
  const isUtilityPath = (p.path ?? '').includes('/admin') || (p.path ?? '').includes('/seo-control-center') || (p.path ?? '').includes('/internal-links') || (p.path ?? '').includes('/web-audit')

  // Per-pageType primary check.
  let typeCheck = false
  switch (p.pageType) {
    case 'money':
      typeCheck = hasContact || out.some(l => /lihat|hubungi|konsultasi|booking|cek|pesan|sewa/i.test(l.anchor ?? ''))
      break
    case 'weapon':
      typeCheck = hasMoney && p.firstMoneyLinkBefore300 === true
      break
    case 'support':
      typeCheck = out.some(l => {
        const href = lower(l.href)
        return href.includes('/sewa-kantor') || href.includes('/virtual-office') || href.includes('/legal') || href.includes('/kontak') || href.includes('/lokasi-kantor')
      })
      break
    case 'homepage':
      typeCheck = hasMoney
      break
    case 'utility':
      typeCheck = isUtilityPath || true // neutral pass — utility pages aren't conversion surfaces
      break
    case 'hub':
      typeCheck = out.length > 1
      break
    default:
      typeCheck = out.length > 0
  }

  const checks: Record<string, boolean> = {
    pageTypeKnown:        Boolean(p.pageType),
    hasOutboundRoute:     out.length > 0,
    pageTypePrimaryCheck: typeCheck,
  }

  return build(checks)
}

// ── E. trustVisibility ───────────────────────────────────────────────────────

function scoreTrustVisibility(p: QualityAuditPage): QualityScore {
  const text   = visibleText(p)
  const schema = (p.schemaTypes ?? []).map(s => lower(s))

  const checks: Record<string, boolean> = {
    mentionsJakartaSelatan:   text.includes('jakarta selatan'),
    mentionsBrand:            containsAny(text, BRAND_TERMS),
    mentionsLegalEntity:      text.includes('pt. ganesha dwipaya bhakti') || text.includes('pt ganesha dwipaya bhakti'),
    mentionsHeritage:         text.includes('2007') || text.includes('sejak 2007'),
    mentionsLandmark:         text.includes('pesanggrahan') || text.includes('rc veteran') || text.includes('pintu tol veteran'),
    hasOrgSchema:             schema.includes('localbusiness') || schema.includes('organization'),
    mentionsFacilityProof:    containsAny(text, FACILITY_TERMS),
  }

  return build(checks)
}

// ── F. serpOptimization ──────────────────────────────────────────────────────

function scoreSerpOptimization(p: QualityAuditPage): QualityScore {
  const title       = p.title ?? ''
  const description = p.description ?? ''
  const titleLen    = p.titleLength       ?? title.length
  const descLen     = p.descriptionLength ?? description.length
  const h1Texts     = p.h1Texts ?? []
  const h1First     = h1Texts[0] ?? ''
  const titleLower  = lower(title)
  const descLower   = lower(description)

  const checks: Record<string, boolean> = {
    titleExists:            title.length > 0,
    titleLengthOk:          titleLen >= 30 && titleLen <= 65,
    descriptionExists:      description.length > 0,
    descriptionLengthOk:    descLen >= 120 && descLen <= 170,
    h1Exists:               h1Texts.length > 0,
    titleH1NotIdentical:    !(title && h1First && title.trim() === h1First.trim()),
    metadataHasContextTerm: containsAny(titleLower, SERVICE_TERMS) || containsAny(titleLower, LOCATION_TERMS) || containsAny(titleLower, BRAND_TERMS) ||
                            containsAny(descLower, SERVICE_TERMS) || containsAny(descLower, LOCATION_TERMS) || containsAny(descLower, BRAND_TERMS),
  }

  return build(checks)
}

// ── Orchestrator ─────────────────────────────────────────────────────────────

export function computeQuality(page: QualityAuditPage): QualityResult {
  const entityPlacement  = scoreEntityPlacement(page)
  const answerFirst      = scoreAnswerFirst(page)
  const interaction      = scoreInteraction(page)
  const taskSuccess      = scoreTaskSuccess(page)
  const trustVisibility  = scoreTrustVisibility(page)
  const serpOptimization = scoreSerpOptimization(page)

  const overall = Math.round(
    (entityPlacement.score +
     answerFirst.score +
     interaction.score +
     taskSuccess.score +
     trustVisibility.score +
     serpOptimization.score) / 6
  )

  return {
    entityPlacement,
    answerFirst,
    interaction,
    taskSuccess,
    trustVisibility,
    serpOptimization,
    overall,
    overallLabel: labelFor(overall),
  }
}
