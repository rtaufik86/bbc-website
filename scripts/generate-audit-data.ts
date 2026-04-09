import fs from 'fs';
import path from 'path';
import { PAGE_TYPE_MAP, getPageConfig, isIndexable, getMetadata, getRobotsMetadata } from '../lib/seo/pageTypeMap';

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
}

// Source URLs that will be in sitemap
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
            isContextual: true, // In actual HTML, we assume contextual if inside body
            isMoneyPage: MONEY_PAGES.includes(normalizedHref),
            position
        });
    }
    return links;
}

async function auditFile(route: string): Promise<AuditPage> {
    const config = getPageConfig(route);
    const pageType = config.type;
    
    // FETCH REAL RENDERED HTML FROM LOCALHOST (SSR SOURCE OF TRUTH)
    const LOCAL_HOST = 'http://localhost:3000';
    let content = '';
    try {
        const response = await fetch(`${LOCAL_HOST}${route}`, {
            headers: { 'User-Agent': 'BBC-Audit-Bot/1.0' }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch ${route}: ${response.statusText}`);
        }
        content = await response.text();
    } catch (error) {
        console.error(`[CRITICAL] Render Fetch Error for ${route}:`, (error as Error).message);
        content = `<html><body>Error Rendering Path: ${route}</body></html>`;
    }

    const metadata = getMetadata(route);
    const title = metadata.title || '';
    const description = metadata.description || '';
    const robotsMeta = getRobotsMetadata(route);
    const robots = robotsMeta.index ? 'index, follow' : 'noindex, nofollow';
    // @ts-ignore
    const canonical = metadata.alternates?.canonical || '';

    // HEADINGS (RENDERED Reality)
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

    const imagesTotal = (content.match(/<img[^>]*>/gi) || []).length;
    const missingAltCount = (content.match(/<img(?!.*?alt=['"])[^>]*>/gi) || []).length;

    const schemaTypes: string[] = [];
    const schemaMatches = content.matchAll(/["']@type["']:\s*["'](\w+)["']/g);
    for (const m of schemaMatches) schemaTypes.push(m[1]);

    const introText = cleanContent.substring(0, 300) + '...';
    
    // EXTRACT FAQ FROM RENDERED SCHEMA (THE HIGHEST TRUTH)
    const faqs: any[] = [];
    const faqMatches = content.matchAll(/["']Question["'][\s\S]*?["']name["']:\s*["'](.*?)["'][\s\S]*?["']acceptedAnswer["'][\s\S]*?["']text["']:\s*["'](.*?)["']/g);
    for (const m of faqMatches) {
        faqs.push({ q: m[1], a: m[2].replace(/<[^>]*>/g, '') });
    }

    let status: Status = 'Green';
    if (pageType !== 'utility' && (wordCount < 500 || h1Texts.length !== 1 || !description)) status = 'Yellow';
    if (pageType !== 'utility' && (wordCount < 300 || h1Texts.length === 0 || !title)) status = 'Red';

    return {
        path: route,
        pageType,
        indexability: (pageType === 'utility' || robots.includes('noindex')) ? 'noindex' : 'index',
        title,
        titleLength: title.length,
        description,
        descriptionLength: description.length,
        canonical,
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
        imagesTotal,
        missingAltCount,
        schemaTypes: Array.from(new Set(schemaTypes)),
        inSitemap: sitemapUrls.includes(route),
        relatedContent: content.includes('Related') || content.includes('Terkait'),
        breadcrumb: content.includes('Breadcrumb') || content.includes('nav'),
        firstMoneyLinkBefore300: true, // Placeholder for logic
        crossSiloLinks: 0,
        anchorDistribution: {},
        orphanRisk: false,
        status,
        introText,
        faqs
    };
}

async function run() {
    const routes = Object.keys(PAGE_TYPE_MAP);
    console.log(`[START] Auditing ${routes.length} routes via SSR Render Mode...`);
    
    const auditResults: AuditPage[] = [];
    for (const route of routes) {
        console.log(`[SCAN] ${route}`);
        const result = await auditFile(route);
        auditResults.push(result);
    }

    const output = `import { AuditPage } from './audit-data-types';\n\nexport const auditData: any[] = ${JSON.stringify(auditResults, null, 4)};`;
    fs.writeFileSync(OUTPUT_FILE, output);
    console.log(`[SUCCESS] Audit Data generated successfully at ${OUTPUT_FILE}`);
}

run().catch(console.error);
