/**
 * BBC ENTITY GRAPH v1
 * (Structural Source of Truth & Authority Map)
 */

export interface PageEntity {
    url: string;
    pageType: "money" | "hub" | "weapon" | "support";
    primaryEntity: string;
    secondaryEntities: string[];
    location?: string;
    intent: "transactional" | "informational" | "navigational";
    relationships: {
        parent?: string;
        children?: string[];
        supports?: string[];
        targets?: string[];
    };
}

export const ENTITY_GRAPH: Record<string, PageEntity> = {
    "/virtual-office": {
        url: "/virtual-office",
        pageType: "money",
        primaryEntity: "virtual office",
        secondaryEntities: ["alamat bisnis", "domisili usaha"],
        intent: "transactional",
        relationships: {
            children: [
                "/virtual-office/jakarta-selatan",
                "/harga-virtual-office"
            ]
        }
    },

    "/virtual-office/jakarta-selatan": {
        url: "/virtual-office/jakarta-selatan",
        pageType: "weapon",
        primaryEntity: "virtual office jakarta selatan",
        secondaryEntities: ["alamat bisnis", "domisili usaha"],
        location: "jakarta selatan",
        intent: "informational",
        relationships: {
            parent: "/virtual-office",
            children: [
                "/virtual-office/alamat-bisnis-jakarta-selatan"
            ]
        }
    },

    "/virtual-office/alamat-bisnis-jakarta-selatan": {
        url: "/virtual-office/alamat-bisnis-jakarta-selatan",
        pageType: "weapon",
        primaryEntity: "alamat bisnis",
        secondaryEntities: [
            "virtual office",
            "domisili usaha",
            "npwp",
            "nib"
        ],
        location: "jakarta selatan",
        intent: "informational",
        relationships: {
            parent: "/virtual-office/jakarta-selatan",
            targets: ["/virtual-office"],
            supports: ["/harga-virtual-office"]
        }
    },

    "/sewa-kantor": {
        url: "/sewa-kantor",
        pageType: "money",
        primaryEntity: "sewa kantor",
        secondaryEntities: ["private office", "ruang kantor"],
        intent: "transactional",
        relationships: {
            children: ["/sewa-kantor/jakarta-selatan"]
        }
    }
};

/**
 * Mengetahui apakah dua halaman mengalami tabrakan entitas (Cannibalization Guard)
 */
export function checkCollision(urlA: string, urlB: string): boolean {
    const pageA = ENTITY_GRAPH[urlA];
    const pageB = ENTITY_GRAPH[urlB];

    if (!pageA || !pageB) return false;

    return (
        pageA.primaryEntity === pageB.primaryEntity &&
        pageA.location === pageB.location
    );
}
