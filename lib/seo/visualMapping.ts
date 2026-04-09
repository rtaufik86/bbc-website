/**
 * BBC VISUAL MAPPING SYSTEM v1
 * Deterministic Visual Engine for SEO Pages
 */

const ENTITY_MAP: Record<string, string> = {
    "virtual-office": "/images/virtual-office/",
    "sewa-kantor": "/images/sewa-kantor/",
    "legal": "/images/legal/",
    "default": "/images/default/"
};

const LOCATION_MAP: Record<string, string> = {
    "jakarta-selatan": "jaksel",
    "bintaro": "bintaro",
    "default": "default"
};

/**
 * Mendapatkan jalur Hero Image secara otomatis
 */
export function getHeroImage(entity: string, location: string): string {
    const entityPath = ENTITY_MAP[entity] || ENTITY_MAP["default"];
    const locSlug = LOCATION_MAP[location] || LOCATION_MAP["default"];
    
    // Final Path: /images/{entity}/{locSlug}/hero.jpg
    return `${entityPath}${locSlug}/hero.jpg`;
}

/**
 * Mendapatkan jalur Section Image berdasarkan ID
 */
export function getSectionImage(sectionId: string): string {
    const SECTION_IMAGE_MAP: Record<string, string> = {
        "legal": "/images/sections/legal.jpg",
        "comparison": "/images/sections/comparison.jpg",
        "benefit": "/images/sections/benefit.jpg",
        "authority": "/images/sections/authority.jpg",
        "definisi": "/images/sections/structure.jpg"
    };

    return SECTION_IMAGE_MAP[sectionId] || "/images/default/section.jpg";
}
