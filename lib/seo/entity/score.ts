// Entity Quality Scoring Engine v0.4 — deterministic 0–100 score.
//
// Runs against LLM OUTPUT (rewritten draft body), NOT the prompt.
// Four equally-weighted components (25 each): entity presence,
// attribute coverage, relation usage, context alignment.
//
// v0.4 is intentionally heuristic — no semantic NLP, no embeddings.
// Goal: catch obvious "fake signal" (off-topic / definition-only output)
// before storing/serving. Semantic upgrade is a v0.5+ concern.

export interface EntityScoreBreakdown {
  entity:     number
  attributes: number
  relations:  number
  context:    number
}

export interface EntityScoreResult {
  score:      number
  valid:      boolean
  breakdown?: EntityScoreBreakdown
}

export function scoreEntityQuality(output: string, entityData: any): EntityScoreResult {
  if (!output || !entityData) {
    return { score: 0, valid: false }
  }

  const text = output.toLowerCase()

  let entityScore    = 0
  let attributeScore = 0
  let relationScore  = 0
  let contextScore   = 0

  // ENTITY PRESENCE (25%)
  if (text.includes(entityData.entity.toLowerCase())) {
    entityScore = 25
  }

  // ATTRIBUTE COVERAGE (25%) — 8 points per matched attribute, capped at 25
  const attrMatches = (entityData.attributes || []).filter((attr: string) =>
    text.includes(attr.toLowerCase())
  )
  attributeScore = Math.min(25, attrMatches.length * 8)

  // RELATION USAGE (25%) — at least one supports/compared_to mention
  const relations = [
    ...(entityData.relations?.supports     || []),
    ...(entityData.relations?.compared_to  || []),
  ]
  const relationMatches = relations.filter((rel: string) =>
    text.includes(rel.toLowerCase())
  )
  if (relationMatches.length >= 1) {
    relationScore = 25
  }

  // CONTEXT ALIGNMENT (25%) — simple length heuristic for v0.4.
  // Real semantic alignment is a v0.5+ concern.
  contextScore = output.length > 300 ? 25 : 10

  const total = entityScore + attributeScore + relationScore + contextScore

  return {
    score: total,
    valid: total >= 70,
    breakdown: {
      entity:     entityScore,
      attributes: attributeScore,
      relations:  relationScore,
      context:    contextScore,
    },
  }
}
