// BBC SEO Signal Engine v1 - Barrel export
//
// Single source of truth for every shared SEO signal. Downstream tools
// import `computeAllSignals` + `toSignalInput` from here and read from
// the returned `AllSignals` object instead of re-implementing each
// primitive locally. This prevents silent drift between tools.
//
// All sub-modules are pure, deterministic, side-effect free.

export type {
  SignalInput,
  SignalInputLink,
  SignalInputInbound,
  FAQSignal,
  H1Signal,
  LinkSignal,
  TrustSignal,
  SchemaSignal,
  EntitySignal,
  AEOSignal,
  AllSignals,
} from './types'

export { computeFAQSignal } from './faqSignal'
export { computeH1Signal } from './h1Signal'
export { computeLinkSignal } from './linkSignal'
export { computeTrustSignal } from './trustSignal'
export { computeSchemaSignal } from './schemaSignal'
export { computeEntitySignal } from './entitySignal'
export { computeAEOSignal } from './aeoSignal'
export { toSignalInput } from './adapter'

import type { SignalInput, AllSignals } from './types'
import { computeFAQSignal } from './faqSignal'
import { computeH1Signal } from './h1Signal'
import { computeLinkSignal } from './linkSignal'
import { computeTrustSignal } from './trustSignal'
import { computeSchemaSignal } from './schemaSignal'
import { computeEntitySignal } from './entitySignal'
import { computeAEOSignal } from './aeoSignal'

/**
 * Aggregate every shared signal for a single page in one call. Callers
 * can destructure `.faq`, `.h1`, `.link`, `.trust`, `.schema`, `.entity`,
 * `.aeo` and use them directly without touching their legacy scoring.
 */
export function computeAllSignals(input: SignalInput): AllSignals {
  return {
    faq: computeFAQSignal(input),
    h1: computeH1Signal(input),
    link: computeLinkSignal(input),
    trust: computeTrustSignal(input),
    schema: computeSchemaSignal(input),
    entity: computeEntitySignal(input),
    aeo: computeAEOSignal(input),
  }
}
