// Quality Gate v1A barrel — pure module, browser-safe.
// No server-only imports here, so client components can import freely.

export { computeQuality } from './scorers'
export type {
  QualityAuditPage,
  QualityDimensionKey,
  QualityLabel,
  QualityResult,
  QualityScore,
} from './types'
