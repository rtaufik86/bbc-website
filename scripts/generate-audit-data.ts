import fs from 'fs';
import path from 'path';
import { PAGE_TYPE_MAP, getPageConfig, isIndexable, getMetadata, getRobotsMetadata } from '../lib/seo/pageTypeMap';
import { validateAnchorIntent, getAnchorType, AnchorType } from '../lib/seo/anchorGovernance';
import { analyzeSemantics } from '../lib/seo/semanticGraph';

const APP_DIR = path.join(process.cwd(), 'app');
const OUTPUT_FILE = path.join(APP_DIR, 'web-audit', 'audit-data.ts');

type Status = 'Green' | 'Yellow' | 'Red';

interface LinkInfo {
    href: string;
    anchor: string;
    isContextual: boolean;
    isMoneyPage: boolean;
    position: number;
}

interface AuditPage {
    path: string;
    pageType: string;
    indexability: string;
    title: string;
    titleLength: number;
    description: string;
    descriptionLength: number;
    canonical: string;
    robots: string;
    wordCount: number;
    h1Count: number;
    h1Texts: string[];
    h2Count: number;
    h2Texts: string[];
    h3Count: number;
    h3Texts: string[];
    internalLinksTotal: number;
    internalLinksContextual: number;
    linksOut: LinkInfo[];
    linksIn: Array<{ from: string, anchor: string }>;
    outboundLinksTotal: number;
    outboundDomains: string[];
    imagesTotal: number;
    missingAltCount: number;
    schemaTypes: string[];
    inSitemap: boolean;
    relatedContent: boolean;
    breadcrumb: boolean;
    firstMoneyLinkBefore300: boolean;
    crossSiloLinks: number;
    anchorDistribution: Record<string, number>;
    orphanRisk: boolean;
    status: Status;
    introText?: string;
    faqs?: Array<{ q: string, a: string }>;
    governanceViolations?: string[];
    semanticGraph?: {
        primaryEntity: string;
        entities: string[];
        relationships: string[];
        coverage: number;
    };
}

const sitemapUrls = Object.keys(PAGE_TYPE_MAP).filter(route => isIndexable(route));
const MONEY_PAGES = Object.keys(PAGE_TYPE_MAP).filter(k => PAGE_TYPE_MAP[k].type === 'money');

function extractLinks(content: string): LinkInfo[] {
    const links: LinkInfo[] = [];
    const linkRegex = /<(?:a|Link)[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/(?:a|Link)>/gi;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
        const href = match[1];
        const rawAnchor = match[2].replace(/<[^>]*>/g, '').trim();
        const anchor = rawAnchor || '[IMAGE/ICON]';
        const position = match.index;
        
        const normalizedHref = href.startsWith('/') ? href : `/${href}`;
        
        links.push({ 
            href: normalizedHref, 
            anchor, 
            isContextual: true,
            isMoneyPage: MONEY_PAGES.includes(normalizedHref),
            position
        });
    }
    return links;
}

// Isolates body content so link-position rules don't drown in <head>,
// JSON-LD, scripts, and header/nav. Falls back gracefully if no <main>/
// <article> wrapper is found.
function extractMainContent(html: string): string {
    if (!html) return html;
    const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
    if (mainMatch && mainMatch[1]) return mainMatch[1];
    const articleMatch = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
    if (articleMatch && articleMatch[1]) return articleMatch[1];
    const headerClose = html.match(/<\/header\s*>/i);
    if (headerClose && typeof headerClose.index === 'number') {
        return html.slice(headerClose.index + headerClose[0].length);
    }
    return html;
}

// Header logo <a href="/"> is nav chrome, not a contextual intro link;
// excluded from the G1 first-money-link search so it can't trivially
// satisfy or fail the rule on its own.
function isNavLogoLink(link: LinkInfo): boolean {
    if (link.href !== '/') return false;
    const a = (link.anchor || '').trim().toLowerCase();
    return a === '' || a === 'home' || a === '[image/icon]' || a === 'logo' || a === 'beranda';
}

// Replaces the old `position / 5` heuristic — strips tags from mainHtml up
// to `position` and counts visible words instead of comparing a full-HTML
// char index to a body-word threshold.
function countWordsBeforeLink(mainHtml: string, position: number): number {
    if (!mainHtml || position <= 0) return 0;
    const visible = mainHtml.slice(0, position)
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    if (!visible) return 0;
    return visible.split(/\s+/).filter(w => w.length > 0).length;
}

// Walk a parsed JSON-LD value and yield individual schema "node" objects.
// Handles: single object, top-level array, and `@graph` wrappers (which can
// themselves contain arrays/objects). Used by extractJsonLdSchemas.
function collectJsonLdNodes(value: unknown): Array<Record<string, any>> {
    const out: Array<Record<string, any>> = [];
    if (!value) return out;
    if (Array.isArray(value)) {
        for (const v of value) out.push(...collectJsonLdNodes(v));
        return out;
    }
    if (typeof value === 'object') {
        const obj = value as Record<string, any>;
        if (Array.isArray(obj['@graph'])) {
            for (const v of obj['@graph']) out.push(...collectJsonLdNodes(v));
        } else {
            out.push(obj);
        }
    }
    return out;
}

// Detect Schema.org types from rendered HTML by parsing every
// <script type="application/ld+json"> block. Populates two fields the
// audit pipeline needs but the generator previously left empty:
//   - schemaTypes: deduped list of `@type` values across all blocks
//   - faqs: Q/A pairs harvested from FAQPage nodes' mainEntity
// Null-safe: malformed JSON in any block is skipped, never throws.
function extractJsonLdSchemas(html: string): {
    schemaTypes: string[];
    faqs: Array<{ q: string; a: string }>;
} {
    const types = new Set<string>();
    const faqs: Array<{ q: string; a: string }> = [];
    if (!html) return { schemaTypes: [], faqs: [] };

    const blockRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let match: RegExpExecArray | null;
    while ((match = blockRegex.exec(html)) !== null) {
        const raw = match[1].trim();
        if (!raw) continue;
        let parsed: unknown;
        try {
            parsed = JSON.parse(raw);
        } catch {
            continue; // null-safe: skip malformed blocks
        }
        for (const node of collectJsonLdNodes(parsed)) {
            const t = node['@type'];
            if (typeof t === 'string') types.add(t);
            else if (Array.isArray(t)) t.forEach(x => { if (typeof x === 'string') types.add(x); });

            const isFaq = (typeof t === 'string' && t === 'FAQPage')
                || (Array.isArray(t) && t.includes('FAQPage'));
            if (isFaq && Array.isArray(node.mainEntity)) {
                for (const item of node.mainEntity) {
                    const q = typeof item?.name === 'string' ? item.name : '';
                    const a = typeof item?.acceptedAnswer?.text === 'string' ? item.acceptedAnswer.text : '';
                    if (q || a) faqs.push({ q, a });
                }
            }
        }
    }
    return { schemaTypes: Array.from(types), faqs };
}

// Walk forward from `start` (an opening `{` of an RSC-escaped object) and
// return the index just after its matching `}`. RSC-escaped JSON inside the
// HTML stream uses `\"` (two chars: backslash + quote) for every JSON
// structural quote, so we recognise `\"` as the string-literal toggle and
// treat lone `"` chars as ordinary content. Returns -1 if no balanced match.
function findRscJsonObjectEnd(html: string, start: number): number {
    let depth = 0;
    let inString = false;
    for (let i = start; i < html.length; i++) {
        const ch = html[i];
        if (ch === '\\' && i + 1 < html.length) {
            // RSC-style `\"` toggles JSON string state; other `\X` escapes
            // (e.g. `\\`, `\n`, `«`) just consume the next character(s)
            // without affecting depth.
            if (html[i + 1] === '"') {
                inString = !inString;
                i++;
                continue;
            }
            i++;
            continue;
        }
        if (inString) continue;
        if (ch === '{') depth++;
        else if (ch === '}') {
            depth--;
            if (depth === 0) return i + 1;
        }
    }
    return -1;
}

// Some templates emit JSON-LD via Next.js `<Script>` (next/script) which, for
// `dangerouslySetInnerHTML`, doesn't appear as a plain <script> tag in the
// initial SSR response — the schema string is encoded inside the RSC stream
// payload using one layer of backslash-escaped quotes (e.g. `\"@type\":\"FAQPage\"`).
// This helper finds those embedded objects, decodes both layers (RSC string
// → JSON object), and yields the same `{schemaTypes, faqs}` shape so the
// caller can merge results with the plain-script extraction.
function extractRscEscapedJsonLd(html: string): {
    schemaTypes: string[];
    faqs: Array<{ q: string; a: string }>;
} {
    const types = new Set<string>();
    const faqs: Array<{ q: string; a: string }> = [];
    if (!html) return { schemaTypes: [], faqs: [] };

    // Scan for any object whose first key is `@type`. The marker form
    // `{\"@type\":\"` matches RSC-escaped JSON literally.
    const markerRegex = /\{\\"@type\\":\\"([A-Za-z]+)\\"/g;
    let m: RegExpExecArray | null;
    while ((m = markerRegex.exec(html)) !== null) {
        const start = m.index;
        const end = findRscJsonObjectEnd(html, start);
        if (end < 0) continue;
        const escaped = html.slice(start, end);
        // Two-step decode: first treat the substring as a JSON string literal
        // (strips the outer `\"` → `"`), then JSON.parse the result as an
        // object. Either step throwing means this block isn't a valid
        // JSON-LD object — skip silently.
        let obj: any;
        try {
            const inner = JSON.parse('"' + escaped + '"');
            obj = JSON.parse(inner);
        } catch {
            // advance past this opening so we don't infinite-loop on malformed
            markerRegex.lastIndex = start + 1;
            continue;
        }
        for (const node of collectJsonLdNodes(obj)) {
            const t = node['@type'];
            if (typeof t === 'string') types.add(t);
            else if (Array.isArray(t)) t.forEach(x => { if (typeof x === 'string') types.add(x); });

            const isFaq = (typeof t === 'string' && t === 'FAQPage')
                || (Array.isArray(t) && t.includes('FAQPage'));
            if (isFaq && Array.isArray(node.mainEntity)) {
                for (const item of node.mainEntity) {
                    const q = typeof item?.name === 'string' ? item.name : '';
                    const a = typeof item?.acceptedAnswer?.text === 'string' ? item.acceptedAnswer.text : '';
                    if (q || a) faqs.push({ q, a });
                }
            }
        }
        // Skip past this object so the next iteration doesn't re-match the
        // same opening (e.g. for nested @type values inside the object).
        markerRegex.lastIndex = end;
    }
    return { schemaTypes: Array.from(types), faqs };
}

async function auditFile(route: string): Promise<AuditPage> {
    const config = getPageConfig(route);
    // Homepage override: "/" is registered as `money` in PAGE_TYPE_MAP for
    // metadata purposes, but for audit semantics it must be classified as
    // `homepage` so it doesn't trigger money-page-only P0 link-injection logic.
    const pageType = route === '/' ? 'homepage' : config.type;
    
    // FETCH REAL RENDERED HTML
    const LOCAL_HOST = 'http://localhost:3000';
    let content = '';
    try {
        const response = await fetch(`${LOCAL_HOST}${route}`, {
            headers: { 'User-Agent': 'BBC-Audit-Bot/1.0' }
        });
        if (!response.ok) throw new Error(`Failed to fetch ${route}`);
        content = await response.text();
    } catch (error) {
        content = `<html><body>Error Rendering Path: ${route}</body></html>`;
    }

    const metadata = getMetadata(route);
    const title = metadata.title || '';
    const description = metadata.description || '';
    const robotsMeta = getRobotsMetadata(route);
    const robots = robotsMeta.index ? 'index, follow' : 'noindex, nofollow';

    const h1Texts = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
    const h2Texts = [...content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
    const h3Texts = [...content.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim());

    const linksOut = extractLinks(content);
    
    const cleanContent = content
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    
    const words = cleanContent.split(' ').filter(w => w.length > 2);
    const wordCount = words.length;

    // --- ANCHOR & INTERNAL LINK ENFORCEMENT ENGINE v1 ---
    const violations: string[] = [];
    const distribution: Record<string, number> = {
        location: 0,
        service: 0,
        service_location: 0,
        brand: 0,
        generic: 0,
        descriptive: 0
    };

    // Rule Group B & D Validation
    linksOut.forEach(link => {
        const check = validateAnchorIntent(link.anchor, link.href, pageType);
        if (!check.valid) {
            violations.push(check.error || 'Unknown Mismatch');
        }
        distribution[getAnchorType(link.anchor)]++;
    });

    // Rule Group C & E: Presence & Position
    const firstMoneyLink = linksOut.find(l => l.isMoneyPage);
    const hasMoneyLink = !!firstMoneyLink;

    // G1 (early money link) is computed against MAIN CONTENT only — head,
    // schema dump, scripts, header/nav are stripped first so the threshold
    // reflects body word position rather than full-HTML char offset. Nav
    // logo links are also excluded so the header `<a href="/">` can't
    // satisfy a "contextual intro link" rule.
    const mainContent  = extractMainContent(content);
    const mainLinks    = extractLinks(mainContent);
    const firstMoneyLinkInMain = mainLinks.find(
        l => l.isMoneyPage && !isNavLogoLink(l)
    );
    const firstLinkWordPosInMain = firstMoneyLinkInMain
        ? countWordsBeforeLink(mainContent, firstMoneyLinkInMain.position)
        : 9999;

    if (firstMoneyLinkInMain && firstLinkWordPosInMain > 300) {
        violations.push('HIGH: first_link_position > 300 words (Rule G1)');
    }
    if (!hasMoneyLink && pageType === 'weapon' && wordCount > 300) {
        violations.push('CRITICAL: missing_money_link_in_intro (Rule C1)');
    }
    if (pageType === 'weapon' && !hasMoneyLink) {
        violations.push('CRITICAL: weapon_must_link_to_money (Rule E1)');
    }

    let status: Status = 'Green';
    if (pageType !== 'utility' && (wordCount < 500 || h1Texts.length !== 1 || violations.length > 0)) status = 'Yellow';
    if (pageType !== 'utility' && (wordCount < 300 || h1Texts.length === 0 || violations.filter(v => v.includes('CRITICAL')).length > 0)) status = 'Red';

    // Semantic Intent Discovery (v1)
    const semanticAnalysis = analyzeSemantics(cleanContent);

    // JSON-LD schema detection: two passes.
    //   1. plain <script type="application/ld+json"> blocks (root layout, server-component schemas)
    //   2. RSC-encoded <Script> payload (next/script with dangerouslySetInnerHTML)
    // Without pass #2, FAQ-bearing weapon pages (which emit FAQPage via the
    // template's <Script>) get false-positive no_faq REWRITE actions because
    // the FAQPage object never appears as a real <script> tag in SSR HTML.
    const plainLd = extractJsonLdSchemas(content);
    const rscLd   = extractRscEscapedJsonLd(content);
    const jsonLd  = {
        schemaTypes: Array.from(new Set([...plainLd.schemaTypes, ...rscLd.schemaTypes])),
        faqs:        [...plainLd.faqs, ...rscLd.faqs],
    };

    return {
        path: route,
        pageType,
        indexability: (pageType === 'utility' || robots.includes('noindex')) ? 'noindex' : 'index',
        title,
        titleLength: title.length,
        description,
        descriptionLength: description.length,
        canonical: '',
        robots,
        wordCount,
        h1Count: h1Texts.length,
        h1Texts,
        h2Count: h2Texts.length,
        h2Texts,
        h3Count: h3Texts.length,
        h3Texts,
        internalLinksTotal: linksOut.length,
        internalLinksContextual: linksOut.length,
        linksOut,
        linksIn: [],
        outboundLinksTotal: 0,
        outboundDomains: [],
        imagesTotal: (content.match(/<img[^>]*>/gi) || []).length,
        missingAltCount: (content.match(/<img(?!.*?alt=['"])[^>]*>/gi) || []).length,
        schemaTypes: jsonLd.schemaTypes,
        faqs: jsonLd.faqs,
        inSitemap: sitemapUrls.includes(route),
        relatedContent: content.includes('Related'),
        breadcrumb: content.includes('nav'),
        firstMoneyLinkBefore300: !!firstMoneyLinkInMain && firstLinkWordPosInMain <= 300,
        crossSiloLinks: 0,
        anchorDistribution: distribution,
        orphanRisk: false,
        status,
        introText: cleanContent.substring(0, 300) + '...',
        governanceViolations: violations,
        semanticGraph: {
            primaryEntity: semanticAnalysis.primaryEntity,
            entities: semanticAnalysis.entities,
            relationships: semanticAnalysis.relationships,
            coverage: semanticAnalysis.semanticCoverage
        }
    };
}

// Normalize a raw href harvested from rendered HTML into a canonical
// route path, or null if it does not point to a registered audit route.
// Drops: mailto/tel, hash-only, external (non same-origin) URLs, malformed
// `/https://...` (anchor-governance bug artifact), wa.me/whatsapp, and
// asset paths (/images, /_next, /api). Also strips query+hash and trims
// the trailing slash so "/foo/" and "/foo" map to the same node.
function normalizeInternalHref(href: string): string | null {
    if (!href) return null;
    let h = href.trim();
    if (!h) return null;
    if (h.startsWith('#')) return null;
    if (/^(mailto|tel):/i.test(h)) return null;
    if (/^https?:\/\//i.test(h)) {
        const sameOrigin = h.match(/^https?:\/\/(www\.)?bintarobusinesscentre\.com(\/.*)?$/i);
        if (!sameOrigin) return null;
        h = sameOrigin[2] || '/';
    }
    if (/^\/https?:/i.test(h)) return null;
    if (/^\/(wa\.me|whatsapp)/i.test(h)) return null;
    if (h.startsWith('/images/') || h.startsWith('/_next/') || h.startsWith('/api/')) return null;
    const qIdx = h.indexOf('?');
    if (qIdx >= 0) h = h.slice(0, qIdx);
    const hashIdx = h.indexOf('#');
    if (hashIdx >= 0) h = h.slice(0, hashIdx);
    if (h.length > 1 && h.endsWith('/')) h = h.slice(0, -1);
    if (!h.startsWith('/')) return null;
    return h;
}

async function run() {
    const routes = Object.keys(PAGE_TYPE_MAP);
    console.log(`[START] Enforcement Audit on ${routes.length} routes...`);
    const results: AuditPage[] = [];
    for (const route of routes) {
        console.log(`[AUTO-SCAN] ${route}`);
        const result = await auditFile(route);
        results.push(result);
    }

    // Inverse graph: for every page A → B link in linksOut, push
    // { from: A, anchor } onto B.linksIn. Skips self-links and any href that
    // doesn't normalize to a registered route. This is the inbound signal the
    // SEO Control Center reads (via p.linksIn.length) to compute authority
    // strength and orphan_risk; without this step every page looks orphaned.
    const routeSet = new Set(routes);
    const inboundMap = new Map<string, Array<{ from: string; anchor: string }>>();
    for (const r of results) {
        const source = r.path;
        for (const link of r.linksOut) {
            const target = normalizeInternalHref(link.href);
            if (!target) continue;
            if (target === source) continue;
            if (!routeSet.has(target)) continue;
            const list = inboundMap.get(target);
            const entry = { from: source, anchor: link.anchor || '' };
            if (list) list.push(entry);
            else inboundMap.set(target, [entry]);
        }
    }
    for (const r of results) {
        r.linksIn = inboundMap.get(r.path) ?? [];
    }

    const output = `export const auditData: any[] = ${JSON.stringify(results, null, 4)};`;
    fs.writeFileSync(OUTPUT_FILE, output);
    console.log(`[SUCCESS] Enforcement Data saved to ${OUTPUT_FILE}`);
}

run().catch(console.error);
