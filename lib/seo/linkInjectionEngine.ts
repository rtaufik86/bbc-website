/**
 * BBC AUTO INTERNAL LINK INJECTION ENGINE v1
 * (Structural Authority Layer)
 */

import { getAnchorType } from './anchorGovernance';
import { ENTITY_GRAPH } from './entityGraph';

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

interface InjectionRule {
    target: string;
    keywords: RegExp[];
    anchor: string;
    priority: string;
}

/**
 * Memproses teks pasif dan menyuntikkan link secara otomatis berdasarkan BBC Entity Graph
 */
export function injectInternalLinks(html: string, url: string): string {
    const pageConfig = ENTITY_GRAPH[url];
    if (!pageConfig) return html; // No graph config, return raw

    let processedHtml = html;
    let injectionCount = 0;
    const injectedTargets = new Set<string>();

    // BUILD DYNAMIC RULES FROM GRAPH RELATIONSHIPS
    const rules: InjectionRule[] = [];

    // Target Authority (e.g. Weapon -> Money)
    if (pageConfig.relationships.targets) {
        pageConfig.relationships.targets.forEach(targetUrl => {
            const targetConfig = ENTITY_GRAPH[targetUrl];
            if (targetConfig) {
                rules.push({
                    target: targetUrl,
                    keywords: [new RegExp(targetConfig.primaryEntity, 'i')],
                    anchor: targetConfig.primaryEntity.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                    priority: 'high'
                });
            }
        });
    }

    // Support Authority (e.g. Weapon -> Hub/Support)
    if (pageConfig.relationships.supports) {
        pageConfig.relationships.supports.forEach(targetUrl => {
            const targetConfig = ENTITY_GRAPH[targetUrl];
            if (targetConfig) {
                rules.push({
                    target: targetUrl,
                    keywords: [new RegExp(targetConfig.primaryEntity, 'i')],
                    anchor: targetConfig.primaryEntity,
                    priority: 'medium'
                });
            }
        });
    }

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
