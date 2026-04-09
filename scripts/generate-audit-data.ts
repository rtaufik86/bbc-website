import fs from 'fs';
import path from 'path';
import { PAGE_TYPE_MAP, getPageConfig, isIndexable, getMetadata, getRobotsMetadata } from '../lib/seo/pageTypeMap';
import { validateAnchorIntent, getAnchorType, AnchorType } from '../lib/seo/anchorGovernance';

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

async function auditFile(route: string): Promise<AuditPage> {
    const config = getPageConfig(route);
    const pageType = config.type;
    
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
    
    // Estimate word position: char index / 5 (avg word length)
    const firstLinkWordPos = firstMoneyLink ? Math.floor(firstMoneyLink.position / 5) : 9999;

    if (hasMoneyLink && firstLinkWordPos > 300) {
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
        firstMoneyLinkBefore300: hasMoneyLink && firstLinkWordPos <= 300,
        crossSiloLinks: 0,
        anchorDistribution: distribution,
        orphanRisk: false,
        status,
        introText: cleanContent.substring(0, 300) + '...',
        governanceViolations: violations
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
