import { BBC_ENTITIES } from './bbcEntities'

type EntityKey = keyof typeof BBC_ENTITIES

export function getEntity(entityKey?: string) {
  if (!entityKey) return null
  return BBC_ENTITIES[entityKey as EntityKey] ?? null
}

// ── v0.7-entity-mapping — input → stable BBC_ENTITIES key resolver ────────
// Decisions and call sites in the wild often hold human-readable labels
// (e.g. "Virtual Office Jakarta Selatan") rather than stable keys. The
// resolver normalizes input and matches against keys, entity names, or
// declared aliases. Never guesses — unknown input returns null so callers
// can decide whether to fall back.

function normalizeEntityInput(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

export function resolveEntityKey(input?: string | null): string | null {
  if (!input) return null

  const normalizedInput = normalizeEntityInput(input)

  // exact key match (avoids cost of normalize loop for the common path)
  if (Object.prototype.hasOwnProperty.call(BBC_ENTITIES, input)) {
    return input
  }

  // normalized key match (handles casing / whitespace variants of the key)
  for (const key of Object.keys(BBC_ENTITIES)) {
    if (normalizeEntityInput(key) === normalizedInput) {
      return key
    }
  }

  // entity name / alias match
  for (const [key, entity] of Object.entries(BBC_ENTITIES)) {
    const candidates: string[] = [
      entity.entity,
      ...((entity as { aliases?: string[] }).aliases ?? []),
    ]
    if (candidates.some(c => normalizeEntityInput(c) === normalizedInput)) {
      return key
    }
  }

  return null
}

export function getEntityByInput(input?: string | null) {
  const key = resolveEntityKey(input)
  return key ? getEntity(key) : null
}

export { validateEntityUsage } from './validate'
export { scoreEntityQuality }  from './score'
