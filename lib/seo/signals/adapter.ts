import type { SignalInput } from './types'

/**
 * Tolerant mapper: turns any tool-local AuditPage shape into a SignalInput.
 *
 * Each tool defines its own (slightly different) AuditPage interface. This
 * helper normalizes them so the Signal Engine can be adopted progressively
 * WITHOUT widening every existing AuditPage interface up front. Missing
 * fields fall back to safe defaults (empty array / empty string / 0) so
 * the engine never throws on a partial audit payload.
 *
 * Pure, deterministic.
 */
export function toSignalInput(p: any): SignalInput {
  const schemaTypes: string[] = Array.isArray(p?.schemaTypes)
    ? p.schemaTypes
    : []

  const linksOut = Array.isArray(p?.linksOut)
    ? p.linksOut.map((l: any) => ({
        href: typeof l?.href === 'string' ? l.href : '',
        anchor: typeof l?.anchor === 'string' ? l.anchor : '',
        isMoney: Boolean(l?.isMoney ?? l?.isMoneyPage),
        position:
          typeof l?.position === 'number' ? l.position : undefined,
      }))
    : []

  const linksIn = Array.isArray(p?.linksIn)
    ? p.linksIn.map((l: any) => ({
        from: typeof l?.from === 'string' ? l.from : '',
        type: typeof l?.type === 'string' ? l.type : undefined,
      }))
    : []

  const introText =
    typeof p?.introText === 'string'
      ? p.introText
      : typeof p?.firstParagraph === 'string'
        ? p.firstParagraph
        : ''

  return {
    url: p?.path || p?.url || '',
    pageType: typeof p?.pageType === 'string' ? p.pageType : '',
    h1Texts: Array.isArray(p?.h1Texts) ? p.h1Texts : [],
    h2Texts: Array.isArray(p?.h2Texts) ? p.h2Texts : [],
    introText,
    bodyText: typeof p?.bodyText === 'string' ? p.bodyText : '',
    linksOut,
    linksIn,
    wordCount: typeof p?.wordCount === 'number' ? p.wordCount : 0,
    schemaTypes,
    hasFAQSchema:
      typeof p?.hasFAQSchema === 'boolean'
        ? p.hasFAQSchema
        : schemaTypes.includes('FAQPage'),
    title: typeof p?.title === 'string' ? p.title : '',
    description: typeof p?.description === 'string' ? p.description : '',
    indexability:
      typeof p?.indexability === 'string' ? p.indexability : 'index',
  }
}
