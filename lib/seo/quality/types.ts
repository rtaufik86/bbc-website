// Quality Gate Score v1A — strategic scoring layer (read-only baseline).
// Pure types, no runtime dependencies.

export type QualityDimensionKey =
  | 'entityPlacement'
  | 'answerFirst'
  | 'interaction'
  | 'taskSuccess'
  | 'trustVisibility'
  | 'serpOptimization'

export type QualityLabel = 'strong' | 'fair' | 'weak'

export interface QualityScore {
  score: number
  label: QualityLabel
  checks: Record<string, boolean>
  notes: string[]
}

export interface QualityResult {
  entityPlacement:    QualityScore
  answerFirst:        QualityScore
  interaction:        QualityScore
  taskSuccess:        QualityScore
  trustVisibility:    QualityScore
  serpOptimization:   QualityScore
  overall:            number
  overallLabel:       QualityLabel
}

// Local input contract — superset of fields available on AuditPage / audit-data.
// Defined here (NOT imported from ControlCenterClient) to avoid circular deps.
export interface QualityAuditPage {
  path?:                       string
  title?:                      string
  description?:                string
  h1Texts?:                    string[]
  h2Texts?:                    string[]
  h3Texts?:                    string[]
  introText?:                  string
  wordCount?:                  number
  pageType?:                   string
  linksOut?:                   Array<{ href?: string; anchor?: string; isMoneyPage?: boolean; isContextual?: boolean }>
  linksIn?:                    Array<{ from?: string; anchor?: string }>
  schemaTypes?:                string[]
  faqs?:                       Array<{ q?: string; a?: string }>
  firstMoneyLinkBefore300?:    boolean
  semanticGraph?:              { primaryEntity?: string }
  titleLength?:                number
  descriptionLength?:          number
  internalLinksTotal?:         number
  internalLinksContextual?:    number
}
