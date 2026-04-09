/**
 * BBC ANCHOR GOVERNANCE v1
 * ANCHOR & INTERNAL LINK ENFORCEMENT ENGINE
 */

export type AnchorType =
  | "location"
  | "service"
  | "service_location"
  | "brand"
  | "generic"
  | "descriptive";

interface LinkRule {
    rule: string;
    condition: string;
    severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
    action: "REWRITE" | "INJECT" | "REMOVE" | "OPTIMIZE";
    owner: "Claude" | "GPT" | "Dev";
}

/**
 * RULE GROUP A — ANCHOR TYPE CLASSIFICATION
 */
export function getAnchorType(text: string): AnchorType {
    const lowerText = text.toLowerCase();
    
    const isLocation = lowerText.includes("jakarta") || lowerText.includes("bintaro") || lowerText.includes("selatan") || lowerText.includes("tangerang");
    const isService = lowerText.includes("virtual office") || lowerText.includes("sewa kantor") || lowerText.includes("pendirian pt") || lowerText.includes("legalitas");
    const isBrand = lowerText.includes("bbc") || lowerText.includes("bintaro business centre");
    const isGeneric = lowerText.includes("klik di sini") || lowerText.includes("baca selengkapnya") || lowerText.includes("ini") || lowerText.includes("ke sini");

    if (isService && isLocation) return "service_location";
    if (isLocation) return "location";
    if (isService) return "service";
    if (isBrand) return "brand";
    if (isGeneric) return "generic";
    
    return "descriptive";
}

/**
 * RULE GROUP B & D — ANCHOR -> DESTINATION VALIDATION
 */
export function validateAnchorIntent(anchor: string, href: string, targetPageType?: string): { valid: boolean; rule?: string; error?: string } {
    const type = getAnchorType(anchor);
    const lowerHref = href.toLowerCase();

    // RULE B1 & D1 — LOCATION MUST POINT TO GEO (NOT SERVICE)
    if (type === "location") {
        const isGeoPage = lowerHref.includes("jakarta") || lowerHref.includes("bintaro") || lowerHref.includes("veteran") || lowerHref.includes("-jaksel");
        const isServiceHub = lowerHref === "/virtual-office" || lowerHref === "/sewa-kantor";
        
        if (isServiceHub) {
            return {
                valid: false,
                rule: "anchor_mismatch_location_to_service",
                error: `CRITICAL: Anchor "${anchor}" (Type: location) diarahkan ke Service Hub "${href}". Target harus Geo Page.`
            };
        }
        if (!isGeoPage) {
            return {
                valid: false,
                rule: "location_anchor_must_point_to_geo",
                error: `HIGH: Anchor "${anchor}" (Type: location) diarahkan ke "${href}" yang bukan Geo Page.`
            };
        }
    }

    // RULE B2 — SERVICE MUST POINT TO SERVICE PAGE
    if (type === "service") {
        const isServicePage = lowerHref.includes("virtual-office") || lowerHref.includes("sewa-kantor") || lowerHref.includes("pt") || lowerHref.includes("cv") || lowerHref.includes("legal");
        if (!isServicePage) {
            return {
                valid: false,
                rule: "service_anchor_must_point_to_service_page",
                error: `HIGH: Anchor "${anchor}" (Type: service) diarahkan ke non-service page "${href}".`
            };
        }
    }

    return { valid: true };
}
