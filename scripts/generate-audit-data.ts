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
}

// Source URLs that will be in sitemap
const sitemapUrls = Object.keys(PAGE_TYPE_MAP).filter(route => isIndexable(route));
const MONEY_PAGES = Object.keys(PAGE_TYPE_MAP).filter(k => PAGE_TYPE_MAP[k].type === 'money');

function extractLinks(content: string): LinkInfo[] {
    const links: LinkInfo[] = [];
    const linkRegex = /<(?:Link|a|InternalLink)[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/(?:Link|a|InternalLink)>/gi;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
        const href = match[1];
        const rawAnchor = match[2].replace(/<[^>]*>/g, '').trim();
        const anchor = rawAnchor || '[IMAGE/ICON]';
        const position = match.index;
        
        // Extend window to 300 chars and detect BOTH JSX tags AND prose inside string props
        const preMatch = content.substring(Math.max(0, match.index - 300), match.index);
        
        // JSX contextual: link directly inside a <p>, <li>, or content-style element
        const inJSXContext = preMatch.includes('<p') || preMatch.includes('<li') || preMatch.includes('<td');
        
        // String-prop contextual: link inside a string with surrounding prose text
        // Detect by checking if the 200 chars before link (stripped of JSX/JS syntax) has 20+ alphabetic words
        const rawTextBefore = preMatch.slice(-200)
            .replace(/<[^>]*>/g, ' ')
            .replace(/[{}'`\[\];:=()]/g, ' ')
            .trim();
        const wordsBefore = rawTextBefore.split(/\s+/).filter(w => /^[a-zA-Z\u00C0-\u024F]{3,}/.test(w));
        const inProseContext = wordsBefore.length >= 5; // at least 5 real words before
        
        const isContextual = inJSXContext || inProseContext;

        const normalizedHref = href.startsWith('/') ? href : (href.includes('bintarobusinesscentre.com') ? new URL(href).pathname : '');

        if (normalizedHref) {
            links.push({ 
                href: normalizedHref, 
                anchor, 
                isContextual,
                isMoneyPage: MONEY_PAGES.includes(normalizedHref),
                position
            });
        }
    }
    return links;
}

function auditFile(filePath: string, relativePath: string): AuditPage {
    const route = relativePath.replace('app', '').replace('/page.tsx', '').replace(/\/page$/, '').replace(/\\/g, '/') || '/';
    const config = getPageConfig(route);
    const pageType = config.type;
    
    // Check for Client component if page is mostly an import
    let content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('Client')) {
        const clientMatch = content.match(/import\s+(\w+)\s+from\s+['"]\.\/(\w+)['"]/);
        if (clientMatch) {
            const clientPath = path.join(path.dirname(filePath), clientMatch[2] + '.tsx');
            if (fs.existsSync(clientPath)) {
                content += '\n' + fs.readFileSync(clientPath, 'utf-8');
            }
        }
    }

    const metadata = getMetadata(route);
    const title = metadata.title || '';
    const description = metadata.description || '';

    const robotsMeta = getRobotsMetadata(route);
    const robots = robotsMeta.index ? 'index, follow' : 'noindex, nofollow';

    // @ts-ignore
    const canonical = metadata.alternates?.canonical || '';

    const words = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(w => w.length > 2);
    const wordCount = words.length;

    // SMARTER HEADING DETECTION FOR TEMPLATES
    const h1Texts: string[] = [];
    const h2Texts: string[] = [];
    const h3Texts: string[] = [];

    // Literal tags (Fallback/Global)
    const h1Matches = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
    const h2Matches = [...content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
    const h3Matches = [...content.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim());

    // ArticleHeader Component
    const articleHeaderMatch = content.match(/<ArticleHeader[^>]*title=\{?['"]?(.*?)['"]?\}?[^>]*\/>/i);
    if (articleHeaderMatch) {
        let titleVal = articleHeaderMatch[1];
        // If passed as a variable like title={title}, try to find the variable declaration
        if (titleVal === 'title') {
            const titleVarMatch = content.match(/const\s+title\s*=\s*(?:`|['"])(.*?)(?:`|['"])/i);
            if (titleVarMatch) titleVal = titleVarMatch[1];
        }
        h1Matches.push(titleVal);
    }

    h1Texts.push(...h1Matches);
    h2Texts.push(...h2Matches);
    h3Texts.push(...h3Matches);

    // If template props are used instead of literal tags:
    if (content.includes('WeaponPageTemplate')) {
        const getPropValue = (prop: string) => {
            const regex = new RegExp(`${prop}:\\s*['"](.*?)['"]`, 'i');
            const match = content.match(regex);
            return match ? match[1] : null;
        };

        const h1Prop = getPropValue('h1');
        if (h1Prop) h1Texts.push(h1Prop);

        ['problem', 'education', 'authority', 'value', 'options', 'faq', 'bottomCTA', 'internalLinks'].forEach(section => {
             // Support both object property (section: {) and component prop (section={{)
             const sectionPattern = new RegExp(`${section}\\s*[:=]\\s*{?\\s*{[\\s\\S]*?title\\s*:\\s*['"](.*?)['"]`, 'i');
             const match = content.match(sectionPattern);
             if (match) h2Texts.push(match[1]);
        });

        // H3 in education items
        const eduItemsMatches = content.match(/items:\s*\[([\s\S]*?)\]/i);
        if (eduItemsMatches) {
            const itemsContent = eduItemsMatches[1];
            const itemTitles = [...itemsContent.matchAll(/title:\s*['"](.*?)['"]/gi)].map(m => m[1]);
            h3Texts.push(...itemTitles);
        }
    }

    const h1Count = [...new Set(h1Texts)].length;
    const h2Count = [...new Set(h2Texts)].length;
    const h3Count = [...new Set(h3Texts)].length;

    // CLEAN CONTENT FOR BETTER POSITION DETECTION (ignore JSON schema, static metadata)
    const cleanContent = content
        .replace(/schemaObject\s*[:=]\s*\{[\s\S]*?\},?/gi, '') 
        .replace(/metadata\s*[:=]\s*\{[\s\S]*?\},?/gi, '')     
        .replace(/<script[\s\S]*?<\/script>/gi, '')          
        .replace(/className=['"].*?['"]/g, '');               

    const linksOut = extractLinks(cleanContent);
    
    // Outbound domains
    const outboundUris = content.match(/href=['"](https?:\/\/.*?)['"]/gi) || [];
    const outboundDomains = [...new Set(outboundUris.map(u => {
        try { 
            const url = u.replace(/href=['"]/, '').replace(/['"]$/, '');
            return new URL(url).hostname; 
        }
        catch { return ''; }
    }).filter(h => h && !h.includes('bintarobusinesscentre.com')))];

    const imagesTotal = (content.match(/<Image|<img/gi) || []).length;
    const missingAltCount = (content.match(/alt=['"]['"]|alt={['"]['"]}/gi) || []).length;

    const schemaTypes = [...new Set(content.match(/@type":\s*['"](.*?)['"]/gi) || [])].map(s => s.replace(/@type":\s*['"]/, '').replace(/['"]$/, ''));

    const relatedContent = content.includes('relatedArticles') || content.includes('Artikel Terkait') || content.includes('RelatedArticles');
    const breadcrumb = content.includes('Breadcrumb') || content.includes('navigasi') || content.includes('WeaponPageTemplate') || content.includes('breadcrumbs: true');

    const firstMoneyLink = linksOut.find(l => l.isMoneyPage);
    const firstMoneyLinkBefore300 = (() => {
        if (!firstMoneyLink) return false;
        // Count words in the cleaned content BEFORE the link position
        const contentBeforeLink = cleanContent.substring(0, firstMoneyLink.position);
        const wordsBeforeLink = contentBeforeLink
            .replace(/<[^>]*>/g, ' ')     // strip tags
            .replace(/[{}'"`]/g, ' ')      // strip JSX chars
            .replace(/\s+/g, ' ')
            .split(' ')
            .filter(w => w.length > 2).length;
        return wordsBeforeLink < 300;
    })();

    const currentSilo = route.includes('sewa-kantor') ? 'sk' : (route.includes('virtual-office') ? 'vo' : 'other');
    const crossSiloLinks = linksOut.filter(l => {
        if (currentSilo === 'sk' && l.href.includes('virtual-office')) return true;
        if (currentSilo === 'vo' && l.href.includes('sewa-kantor')) return true;
        return false;
    }).length;

    const anchorDistribution: Record<string, number> = {};
    linksOut.forEach(l => {
        anchorDistribution[l.anchor] = (anchorDistribution[l.anchor] || 0) + 1;
    });

    const inSitemap = sitemapUrls.some(u => u === route || u === route + '/');
    const indexability = (pageType === 'utility' || robots.includes('noindex')) ? 'noindex' : 'index';

    let status: Status = 'Green';
    if (pageType !== 'utility' && (wordCount < 500 || h1Count !== 1 || !description)) status = 'Yellow';
    if (pageType !== 'utility' && (wordCount < 300 || h1Count === 0 || !title)) status = 'Red';
    if (pageType === 'utility') status = 'Green'; 

    return {
        path: route,
        pageType,
        indexability,
        title,
        titleLength: title.length,
        description,
        descriptionLength: description.length,
        canonical,
        robots,
        wordCount,
        h1Count,
        h1Texts: [...new Set(h1Texts)],
        h2Count,
        h2Texts: [...new Set(h2Texts)],
        h3Count,
        h3Texts: [...new Set(h3Texts)],
        internalLinksTotal: linksOut.length,
        internalLinksContextual: linksOut.filter(l => l.isContextual).length,
        linksOut,
        linksIn: [], 
        outboundLinksTotal: outboundUris.length,
        outboundDomains,
        imagesTotal,
        missingAltCount,
        schemaTypes,
        inSitemap,
        relatedContent,
        breadcrumb,
        firstMoneyLinkBefore300,
        crossSiloLinks,
        anchorDistribution,
        orphanRisk: false,
        status
    };
}

function getAllPages(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllPages(filePath, fileList);
        } else if (file === 'page.tsx') {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const allPageFiles = getAllPages(APP_DIR);
const auditResults: AuditPage[] = allPageFiles.map(f => {
    const relativePath = path.relative(process.cwd(), f).replace(/\\/g, '/');
    return auditFile(f, relativePath);
});

auditResults.forEach(page => {
    const targetPath = page.path;
    auditResults.forEach(sourcePage => {
        sourcePage.linksOut.forEach(link => {
            const normLink = link.href.replace(/\/$/, '') || '/';
            const normTarget = targetPath.replace(/\/$/, '') || '/';
            if (normLink === normTarget && sourcePage.path !== targetPath) {
                page.linksIn.push({
                    from: sourcePage.path,
                    anchor: link.anchor
                });
            }
        });
    });
});

auditResults.forEach(page => {
    if (page.linksIn.length === 0 && page.path !== '/' && page.pageType !== 'utility') {
        page.orphanRisk = true;
        if (page.status === 'Green') page.status = 'Yellow';
    }
});

const outputContent = `export const auditData = ${JSON.stringify(auditResults, null, 4)};`;
fs.writeFileSync(OUTPUT_FILE, outputContent);
console.log(`Audit metrics for ${auditResults.length} routes generated successfully!`);
