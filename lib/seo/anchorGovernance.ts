/**
 * BBC ANCHOR GOVERNANCE v1
 * Menjaga konsistensi antara Anchor Text dan Target Destination
 */

export type AnchorType = 'location' | 'service' | 'brand';

interface LinkRule {
    pattern: RegExp;
    validDestinations: string[];
    recommendedTarget: string;
    type: AnchorType;
}

const GOVERNANCE_RULES: LinkRule[] = [
    {
        pattern: /Jakarta Selatan|Jaksel/i,
        validDestinations: ['/virtual-office/jakarta-selatan', '/virtual-office-jakarta-selatan', '/pendirian-pt-jakarta-selatan'],
        recommendedTarget: '/virtual-office/alamat-bisnis-jakarta-selatan', // Dalam konteks ini
        type: 'location'
    },
    {
        pattern: /Virtual Office|Sewa Alamat|Kantor Virtual/i,
        validDestinations: ['/virtual-office'],
        recommendedTarget: '/virtual-office',
        type: 'service'
    },
    {
        pattern: /Sewa Kantor|Private Office|Serviced Office/i,
        validDestinations: ['/sewa-kantor'],
        recommendedTarget: '/sewa-kantor',
        type: 'service'
    }
];

/**
 * Memvalidasi apakah sebuah link melanggar aturan tata kelola
 */
export function validateAnchorLink(anchor: string, href: string): { valid: boolean; error?: string } {
    const rule = GOVERNANCE_RULES.find(r => r.pattern.test(anchor));
    
    if (!rule) return { valid: true }; // No specific rule for this anchor

    const isMatch = rule.validDestinations.some(dest => href.includes(dest));
    
    if (!isMatch) {
        return {
            valid: false,
            error: `ANCHOR MISMATCH: Keyword "${anchor}" (Type: ${rule.type}) tidak boleh diarahkan ke "${href}". Harus diarahkan ke salah satu dari: ${rule.validDestinations.join(', ')}`
        };
    }

    return { valid: true };
}

/**
 * Filter otomatis untuk memastikan link yang di-inject manual tetap aman
 */
export function safeLink(anchor: string, href: string): string {
    const validation = validateAnchorLink(anchor, href);
    if (!validation.valid) {
        console.warn(`[GOVERNANCE] ${validation.error}. Falling back to clean text.`);
        return anchor; // Kembalikan teks tanpa link demi keamanan SEO
    }
    return `<a href="${href}">${anchor}</a>`;
}
