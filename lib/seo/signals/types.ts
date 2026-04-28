// BBC SEO Signal Engine v1 - Shared types
// Pure interfaces consumed by every signal module + every SEO tool.

export interface SignalInputLink {
  href: string
  anchor: string
  isMoney?: boolean
  position?: number
}

export interface SignalInputInbound {
  from: string
  type?: string
}

export interface SignalInput {
  url: string
  pageType: string

  h1Texts: string[]
  h2Texts: string[]
  introText?: string
  bodyText: string

  linksOut: SignalInputLink[]
  linksIn: SignalInputInbound[]

  wordCount: number
  schemaTypes: string[]
  hasFAQSchema?: boolean

  title?: string
  description?: string

  indexability: string
}

export interface FAQSignal {
  hasFAQ: boolean
  score: number
}

export interface H1Signal {
  count: number
  hasH1: boolean
  score: number
}

export interface LinkSignal {
  total: number
  moneyLinks: number
  earlyLinks: number
}

export interface TrustSignal {
  found: string[]
  score: number
}

export interface SchemaSignal {
  hasSchema: boolean
  types: string[]
}

export interface EntitySignal {
  score: number
  covered: boolean
  coverage: string[]
}

export interface AEOSignal {
  hasDirectAnswer: boolean
  hasFAQ: boolean
  score: number
}

export interface AllSignals {
  faq: FAQSignal
  h1: H1Signal
  link: LinkSignal
  trust: TrustSignal
  schema: SchemaSignal
  entity: EntitySignal
  aeo: AEOSignal
}
