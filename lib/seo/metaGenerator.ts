import { PageType, getPageConfig, PAGE_TYPE_MAP } from "./pageTypeMap";

export interface MetaInput {
    type: PageType;
    entity: string;
    location?: string;
    modifier?: string;
}

/**
 * MONEY PAGE GENERATOR
 * Objective: Conversion
 * Cluster-aware: legal / virtual-office / generic
 */
function generateMoneyMeta(input: MetaInput) {
    const { entity, location } = input;
    const entityLower = entity.toLowerCase();

    let title: string;
    let description: string;

    if (/\b(pt|cv|pendirian|legal|notaris)\b/.test(entityLower)) {
        // Legal cluster
        title = `${entity} ${location} | Proses Resmi & Legal`;
        description = `${entity} di ${location} dengan proses resmi, cepat, dan sesuai regulasi. Dibantu notaris berpengalaman. Konsultasi gratis tersedia hari ini.`;
    } else if (/\b(virtual|alamat|domisili)\b/.test(entityLower)) {
        // Virtual office / address cluster
        title = `${entity} ${location} Resmi DKI | Alamat Bisnis Legal`;
        description = `${entity} di ${location} dengan alamat bisnis resmi terdaftar DKI Jakarta. Cocok untuk NPWP, NIB, dan domisili usaha. Siap digunakan hari ini.`;
    } else {
        // Generic conversion fallback
        title = `${entity} ${location} Siap Pakai | Survey Hari Ini`;
        description = `${entity} di ${location} dengan fasilitas lengkap dan alamat resmi. Siap digunakan tanpa setup. Konsultasi dan survey tersedia hari ini.`;
    }

    validateMeta('money', title, description);
    return { title, description };
}

/**
 * WEAPON PAGE GENERATOR
 * Objective: SEO acquisition
 */
function generateWeaponMeta(input: MetaInput) {
    const { entity, modifier } = input;
    const title = `${entity}: ${modifier}`;
    const description = `Panduan ${entity.toLowerCase()} yang membahas ${modifier ? modifier.toLowerCase() : 'aspek penting'}. Pelajari faktor, struktur, dan pertimbangan penting sebelum mengambil keputusan.`;
    
    validateMeta('weapon', title, description);
    return { title, description };
}

/**
 * HUB PAGE GENERATOR
 * Objective: Distribution
 */
function generateHubMeta(input: MetaInput) {
    const { entity } = input;
    const title = `${entity}: Panduan & Navigasi Layanan`;
    const description = `Jelajahi ${entity.toLowerCase()} melalui panduan lengkap, pilihan layanan, dan informasi penting untuk membantu Anda memahami opsi yang tersedia.`;
    
    validateMeta('hub', title, description);
    return { title, description };
}

/**
 * SUPPORT PAGE GENERATOR
 */
function generateSupportMeta(input: MetaInput) {
    const { entity } = input;
    const title = `${entity} | Bintaro Business Centre`;
    const description = `${entity} Bintaro Business Centre di Jakarta Selatan. Informasi resmi mengenai layanan, fasilitas, dan operasional perusahaan.`;
    
    return { title, description };
}

/**
 * SYSTEM RULES - Validation Logic
 */
function validateMeta(type: PageType, title: string, description: string) {
    const content = (title + ' ' + description).toLowerCase();
    
    if (type === "weapon") {
        const forbidWords = ["promo", "gratis", "hubungi", "konsultasi"];
        forbidWords.forEach(word => {
            if (content.includes(word)) {
                console.warn(`[SEO Warning] Weapon page contains forbidden word: "${word}"`);
            }
        });
    }
    
    if (type === "money") {
        const forbidWords = ["panduan", "apa itu", "faktor"];
        forbidWords.forEach(word => {
            if (content.includes(word)) {
                console.warn(`[SEO Warning] Money page contains forbidden word: "${word}"`);
            }
        });
    }
    
    if (type === "hub") {
        const forbidWords = ["murah", "harga terbaik", "diskon"];
        forbidWords.forEach(word => {
            if (content.includes(word)) {
                console.warn(`[SEO Warning] Hub page contains forbidden word: "${word}"`);
            }
        });
    }
}

/**
 * MASTER CONTROLLER
 */
export function generateMeta(input: MetaInput) {
    switch (input.type) {
        case "money":
            return generateMoneyMeta(input);
        case "weapon":
            return generateWeaponMeta(input);
        case "hub":
            return generateHubMeta(input);
        case "support":
            return generateSupportMeta(input);
        case "utility":
            return { title: input.entity, description: "" };
        default:
            return { title: input.entity, description: "" };
    }
}

/**
 * MODIFIER ENGINE (ANTI-CANNIBALIZATION)
 */
function getModifierFromPath(path: string) {
    if (path.includes("harga")) return "Struktur Biaya & Variabel";
    if (path.includes("murah")) return "Faktor Harga & Realita Biaya";
    if (path.includes("kantor-siap-pakai")) return "Konsep & Fasilitas";
    if (path.includes("alamat-bisnis")) return "Fungsi & Legalitas";
    
    return "Panduan Lengkap";
}

/**
 * AUTO-INTEGRATION WITH pageTypeMap
 */
export function getMetaByPath(path: string) {
    const config = getPageConfig(path);

    // PRIORITY 1: Precise overrides from PAGE_TYPE_MAP
    if (config.title && config.description) {
        return { 
            title: config.title, 
            description: config.description 
        };
    }

    // PRIORITY 2: Pattern-based overrides (Structural consistency)
    const normalizedPath = path.replace(/\/$/, '') || '/';
    if (normalizedPath.startsWith('/admin')) {
        return { title: 'BBC Admin', description: '' };
    }

    // FALLBACK: Template-based Generation
    const location = path.includes('bintaro') ? 'Bintaro' :
                     path.includes('tangerang') ? 'Tangerang Selatan' :
                     'Jakarta Selatan'
    return generateMeta({
        type: config.type,
        entity: config.entity || "BBC",
        location,
        modifier: getModifierFromPath(path)
    });
}
