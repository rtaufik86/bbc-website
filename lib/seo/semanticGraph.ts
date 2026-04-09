/**
 * BBC SEMANTIC GRAPH ENGINE v1
 * (Semantic + Intent Layer)
 */

export interface Entity {
    id: string;
    label: string;
    type: 'Service' | 'Location' | 'Requirement' | 'Benefit';
}

export interface Relationship {
    from: string;
    to: string;
    predicate: string; // e.g., "used_for", "part_of", "fulfills"
}

export const ENTITY_KNOWLEDGE_BASE: Entity[] = [
    { id: 'virtual-office', label: 'Virtual Office', type: 'Service' },
    { id: 'domisili-bisnis', label: 'Domisili Bisnis', type: 'Requirement' },
    { id: 'legalitas-pt', label: 'Legalitas PT', type: 'Requirement' },
    { id: 'jakarta-selatan', label: 'Jakarta Selatan', type: 'Location' },
    { id: 'pkp', label: 'Status PKP', type: 'Benefit' },
    { id: 'prestise', label: 'Prestise Bisnis', type: 'Benefit' }
];

export const SEMANTIC_RELATIONSHIPS: Relationship[] = [
    { from: 'virtual-office', to: 'domisili-bisnis', predicate: 'provides' },
    { from: 'virtual-office', to: 'legalitas-pt', predicate: 'supports' },
    { from: 'virtual-office', to: 'jakarta-selatan', predicate: 'located_in' },
    { from: 'domisili-bisnis', to: 'legalitas-pt', predicate: 'required_for' },
    { from: 'virtual-office', to: 'pkp', predicate: 'enables' }
];

/**
 * Menganalisis teks untuk menemukan entitas dan menyimpulkan hubungan semantik
 */
export function analyzeSemantics(text: string) {
    const foundEntities = ENTITY_KNOWLEDGE_BASE.filter(ent => 
        new RegExp(ent.label, 'i').test(text)
    );

    const inferredRelationships = SEMANTIC_RELATIONSHIPS.filter(rel => 
        foundEntities.some(e => e.id === rel.from) && 
        foundEntities.some(e => e.id === rel.to)
    );

    // Hitung Intent Density
    const primaryEntity = foundEntities.length > 0 
        ? foundEntities.sort((a,b) => (text.match(new RegExp(b.label, 'gi'))?.length || 0) - (text.match(new RegExp(a.label, 'gi'))?.length || 0))[0]
        : null;

    return {
        primaryEntity: primaryEntity?.label || 'Unknown',
        entities: foundEntities.map(e => e.label),
        relationships: inferredRelationships.map(r => `${r.from} --(${r.predicate})--> ${r.to}`),
        semanticCoverage: (foundEntities.length / ENTITY_KNOWLEDGE_BASE.length) * 100
    };
}
