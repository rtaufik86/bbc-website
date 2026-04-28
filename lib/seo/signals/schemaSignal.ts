import type { SignalInput, SchemaSignal } from './types'

/**
 * Schema signal: presence and the full list of schema types detected on
 * a page. Consumers may then do type-specific checks against `types`.
 *
 * Pure, deterministic.
 */
export function computeSchemaSignal(input: SignalInput): SchemaSignal {
  return {
    hasSchema: input.schemaTypes.length > 0,
    types: input.schemaTypes,
  }
}
