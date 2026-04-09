/**
 * BBC AUTO INTERNAL LINK INJECTION ENGINE v1
 * (Structural Authority Layer)
 */

import { getAnchorType } from './anchorGovernance';

interface InjectionMetadata {
    entity: string;
    location: string;
    pageType: string;
}

const MONEY_PAGES: Record<string, string> = {
    "virtual-office": "/virtual-office",
    "sewa-kantor": "/sewa-kantor",
    "legal": "/pendirian-pt"
};

const GEO_PAGES: Record<string, string> = {
    "jakarta-selatan": "/virtual-office/alamat-bisnis-jakarta-selatan",
    "bintaro": "/virtual-office/bintaro"
};

/**
 * Memproses teks pasif dan menyuntikkan link secara otomatis berdasarkan aturan SEO
 */
export function injectInternalLinks(html: string, meta: InjectionMetadata): string {
    let processedHtml = html;
    let injectionCount = 0;
    const injectedTargets = new Set<string>();

    const rules = [
        // RULE 1: WEAPON -> MONEY (CRITICAL)
        {
            target: MONEY_PAGES[meta.entity],
            keywords: [/virtual office/i, /sewa kantor/i, /alamat bisnis/i],
            anchor: `${meta.entity === 'virtual-office' ? 'Virtual Office' : 'Sewa Kantor'} Jakarta Selatan`,
            priority: 'high'
        },
        // RULE 2: WEAPON -> GEO
        {
            target: GEO_PAGES[meta.location],
            keywords: [new RegExp(meta.location.replace('-', ' '), 'i'), /lokasi strategis/i],
            anchor: meta.location.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            priority: 'medium'
        },
        // RULE 3: SUPPORT
        {
            target: "/harga-virtual-office",
            keywords: [/harga/i, /biaya/i, /paket/i],
            anchor: "biaya virtual office",
            priority: 'low'
        }
    ];

    for (const rule of rules) {
        if (injectionCount >= 3) break; // SAFETY RULE 1: MAX 3 LINKS
        if (!rule.target || injectedTargets.has(rule.target)) continue; // SAFETY RULE 2: NO DUPLICATE TARGET

        // Mencari keyword pertama yang belum ada di dalam tag HTML lain (untuk menghindari nested links)
        for (const pattern of rule.keywords) {
            const match = processedHtml.match(pattern);
            if (match && match.index !== undefined) {
                // Sederhana: ganti kemunculan pertama keyword dengan link bertipe SEO
                const start = match.index;
                const end = start + match[0].length;
                
                // Cek apakah posisi ini berada di dalam tag <a> yang sudah ada
                const beforeMatch = processedHtml.substring(0, start);
                if (beforeMatch.lastIndexOf('<a') > beforeMatch.lastIndexOf('</a')) {
                    continue; // Skip jika sudah di dalam link
                }

                const linkTag = `<a href="${rule.target}" class="text-primary font-bold hover:underline">${rule.anchor}</a>`;
                
                processedHtml = 
                    processedHtml.substring(0, start) + 
                    linkTag + 
                    processedHtml.substring(end);
                
                injectedTargets.add(rule.target);
                injectionCount++;
                break; // Rule terpenuhi, lanjut ke rule berikutnya
            }
        }
    }

    return processedHtml;
}
