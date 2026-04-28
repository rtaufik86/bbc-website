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
        schemaTypes: [],
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

async function run() {
    const routes = Object.keys(PAGE_TYPE_MAP);
    console.log(`[START] Enforcement Audit on ${routes.length} routes...`);
    const results = [];
    for (const route of routes) {
        console.log(`[AUTO-SCAN] ${route}`);
        const result = await auditFile(route);
        results.push(result);
    }
    const output = `export const auditData: any[] = ${JSON.stringify(results, null, 4)};`;
    fs.writeFileSync(OUTPUT_FILE, output);
    console.log(`[SUCCESS] Enforcement Data saved to ${OUTPUT_FILE}`);
}

run().catch(console.error);
