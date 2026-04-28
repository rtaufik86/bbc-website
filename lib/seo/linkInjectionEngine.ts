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

function escapeRegex(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Memproses teks pasif dan menyuntikkan link secara otomatis berdasarkan BBC Entity Graph
 */
export function injectInternalLinks(html: string, url: string): string {
    const pageConfig = ENTITY_GRAPH[url];
    // NOTE: Link injection only operates on URLs registered in ENTITY_GRAPH.
    // Pages not in the graph (e.g. blog posts, utility pages) are returned as-is.
    // Expand ENTITY_GRAPH in lib/seo/entityGraph.ts to add coverage.
    if (!pageConfig) return html;

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
                    keywords: [new RegExp(escapeRegex(targetConfig.primaryEntity), 'i')],
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
                    keywords: [new RegExp(escapeRegex(targetConfig.primaryEntity), 'i')],
                    anchor: targetConfig.primaryEntity,
                    priority: 'medium'
                });
            }
        });
    }

    for (const rule of rules) {
        if (injectionCount >= 3) break; // SAFETY RULE 1: MAX 3 LINKS
        if (!rule.target || injectedTargets.has(rule.target)) continue; // SAFETY RULE 2: NO DUPLICATE TARGET

        // Find the first match that is NOT inside any HTML tag or inside an
        // existing <a>...</a>. Instead of a blind replace, we iterate all
        // occurrences with a stateful regex so we can skip unsafe positions.
        for (const basePattern of rule.keywords) {
            // Ensure global flag so we can walk through every candidate position
            const pattern = basePattern.global
                ? basePattern
                : new RegExp(basePattern.source, basePattern.flags + 'g');

            let safeStart = -1;
            let safeLen = 0;
            let m: RegExpExecArray | null;

            while ((m = pattern.exec(processedHtml)) !== null) {
                if (m.index === undefined) break;
                const start = m.index;
                const len = m[0].length;
                if (len === 0) { pattern.lastIndex++; continue; }

                // SAFETY: match text itself must not straddle tag boundaries.
                if (m[0].includes('<') || m[0].includes('>')) continue;

                const before = processedHtml.substring(0, start);

                // SAFETY: inside ANY open HTML tag (attribute value, tag name,
                // self-closing marker, comment, etc.). If the last `<` was not
                // closed by a `>` before this position, we are inside markup.
                const lastOpen = before.lastIndexOf('<');
                const lastClose = before.lastIndexOf('>');
                if (lastOpen > lastClose) continue;

                // SAFETY: inside an existing anchor element.
                const lastAOpen = before.lastIndexOf('<a');
                const lastAClose = before.lastIndexOf('</a');
                if (lastAOpen > lastAClose) continue;

                safeStart = start;
                safeLen = len;
                break;
            }

            if (safeStart >= 0) {
                const end = safeStart + safeLen;
                const linkTag = `<a href="${rule.target}" class="text-primary font-bold hover:underline">${rule.anchor}</a>`;
                processedHtml =
                    processedHtml.substring(0, safeStart) +
                    linkTag +
                    processedHtml.substring(end);
                injectedTargets.add(rule.target);
                injectionCount++;
                break; // rule satisfied, move on
            }
        }
    }

    return processedHtml;
}
