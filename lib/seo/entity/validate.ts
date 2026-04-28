export function validateEntityUsage(output: string, entityData: any) {
  if (!output || !entityData) return { valid: true, score: 0 }

  const text = output.toLowerCase()

  let score = 0

  // check entity mention
  if (text.includes(entityData.entity.toLowerCase())) {
    score += 1
  }

  // check attributes
  const attrMatches = entityData.attributes.filter((attr: string) =>
    text.includes(attr.toLowerCase())
  )
  if (attrMatches.length >= 2) {
    score += 1
  }

  // check relations
  const relationMatches = [
    ...(entityData.relations.supports || []),
    ...(entityData.relations.compared_to || [])
  ].filter((rel: string) =>
    text.includes(rel.toLowerCase())
  )

  if (relationMatches.length >= 1) {
    score += 1
  }

  return {
    valid: score >= 2,
    score,
    details: {
      entityMention: text.includes(entityData.entity.toLowerCase()),
      attributeMatches: attrMatches.length,
      relationMatches: relationMatches.length
    }
  }
}
