import type { SignalInput, FAQSignal } from './types'

/**
 * FAQ signal: single source of truth for whether a page carries FAQPage
 * schema. Explicit `hasFAQSchema` flag wins when provided, otherwise the
 * signal is derived from `schemaTypes`.
 *
 * Pure, deterministic.
 */
export function computeFAQSignal(input: SignalInput): FAQSignal {
  const hasFAQ =
    Boolean(input.hasFAQSchema) || input.schemaTypes.includes('FAQPage')

  return {
    hasFAQ,
    score: hasFAQ ? 100 : 0,
  }
}
