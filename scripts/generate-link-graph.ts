import fs from 'fs';
import path from 'path';
import { auditData } from '../app/web-audit/audit-data';

function getCluster(p: string) {
    if (p.startsWith('/sewa-kantor') || p.includes('kantor-')) return 'sewa-kantor';
    if (p.startsWith('/virtual-office') || p.includes('alamat-bisnis')) return 'virtual-office';
    if (p.startsWith('/legal') || p.includes('pendirian-pt')) return 'legal';
    if (['/tentang-kami', '/lokasi-kantor', '/fasilitas-kantor', '/klien-dan-testimoni', '/ruang-meeting', '/legalitas-dan-perizinan-bbc', '/kontak'].includes(p)) return 'trust';
    return 'other';
}

function getPageType(p: string, inSitemap: boolean) {
    if (p === '/' || p === '') return 'homepage';
    if (['/sewa-kantor', '/virtual-office', '/legal'].includes(p)) return 'money';
    if (getCluster(p) === 'trust') return 'support';
    if (p.includes('/admin') || p.includes('auth') || !inSitemap) return 'utility';
    return 'weapon';
}

const nodes: any[] = [];
const edges: any[] = [];

auditData.forEach(page => {
    page.linksOut.forEach(link => {
        const toPath = link.href.split('#')[0].split('?')[0]; 
        
        edges.push({
            from: page.path,
            to: toPath,
            anchorText: link.anchor || '',
            linkType: link.isContextual ? 'contextual' : 'related',
            isCrossCluster: getCluster(page.path) !== getCluster(toPath),
            isToMoneyPage: link.isMoneyPage || false,
            positionBucket: link.position < 300 ? 'early' : link.position < 1000 ? 'mid' : 'late'
        });
    });
});

auditData.forEach(page => {
    const cluster = getCluster(page.path);
    const inSitemap = page.inSitemap || false;
    const pageType = getPageType(page.path, inSitemap);
    
    const nodeEdgesOut = edges.filter(e => e.from === page.path);
    const nodeEdgesIn = edges.filter(e => e.to === page.path);
    
    const outboundCount = nodeEdgesOut.length;
    const inboundCount = nodeEdgesIn.length;
    const contextualOutboundCount = nodeEdgesOut.filter(e => e.linkType === 'contextual').length;
    const crossClusterOutboundCount = nodeEdgesOut.filter(e => e.isCrossCluster).length;
    
    const linksFromMoneyPages = nodeEdgesIn.filter(e => {
        const fromNode = auditData.find(a => a.path === e.from);
        return fromNode && getPageType(fromNode.path, fromNode.inSitemap || false) === 'money';
    }).length;

    const orphanRisk = page.orphanRisk || (inboundCount === 0 && page.indexability === 'index');
    
    let authorityScore = (inboundCount * 2) 
        + (contextualOutboundCount * 1.5)
        + (linksFromMoneyPages * 2)
        + (page.inSitemap ? 2 : 0)
        + (page.breadcrumb ? 1 : 0)
        - (orphanRisk ? 5 : 0)
        - ((pageType === 'weapon' && outboundCount < 3) ? 3 : 0);

    let warnings: string[] = [];

    if (orphanRisk) warnings.push('Orphan Page');
    if (page.indexability === 'index' && inboundCount === 0) warnings.push('Indexable but 0 Inbound Links');
    if (pageType === 'weapon' && outboundCount < 3) warnings.push('Weapon page outbound < 3');
    if (pageType === 'money' && outboundCount < 5) warnings.push('Money page outbound < 5');
    if (!page.inSitemap && page.indexability === 'index') warnings.push('Missing in sitemap');
    if (page.breadcrumb === false && pageType !== 'homepage' && pageType !== 'utility') warnings.push('Missing breadcrumb');
    if (contextualOutboundCount === 0 && pageType !== 'utility') warnings.push('No contextual links');
    if (!page.firstMoneyLinkBefore300 && pageType === 'weapon') warnings.push('First money link not < 300 words');

    let status = 'green';
    if (warnings.some(w => ['Orphan Page', 'Indexable but 0 Inbound Links', 'Weapon page outbound < 3', 'Money page outbound < 5', 'Missing in sitemap', 'Missing breadcrumb'].includes(w))) {
        status = 'red';
    } else if (warnings.length > 0) {
        status = 'yellow';
    }

    nodes.push({
        path: page.path,
        title: page.title || '',
        pageType,
        cluster,
        isIndexable: page.indexability === 'index',
        inSitemap: page.inSitemap,
        hasBreadcrumb: page.breadcrumb || false,
        orphanRisk,
        inboundCount,
        outboundCount,
        contextualOutboundCount,
        crossClusterOutboundCount,
        firstMoneyLinkUnder300: page.firstMoneyLinkBefore300 || false,
        authorityScore,
        status,
        warnings,
        recommendations: [] // Will be populated in pass 2
    });
});

// PASS 2: AUTO RECOMMENDATION ENGINE
nodes.forEach(node => {
    const existingOutbound = edges.filter(e => e.from === node.path).map(e => e.to);

    // Rule 1: Point to Money Page
    const moneyPage = nodes.find(n => n.cluster === node.cluster && n.pageType === 'money');
    if (moneyPage && moneyPage.path !== node.path && !existingOutbound.includes(moneyPage.path) && node.pageType !== 'support' && node.pageType !== 'utility') {
        node.recommendations.push(`🔗 Link to ${moneyPage.path} (Money Page)`);
    }

    // Rule 2: Weapon/Hub distribution
    if (node.pageType === 'weapon' && node.outboundCount < 3) {
        const siblings = nodes.filter(n => n.cluster === node.cluster && n.pageType === 'weapon' && n.path !== node.path && !existingOutbound.includes(n.path));
        siblings.sort((a, b) => b.authorityScore - a.authorityScore);
        if (siblings.length > 0) node.recommendations.push(`🔗 Link to ${siblings[0].path} (Strong Sibling)`);
        if (siblings.length > 1) node.recommendations.push(`🔗 Link to ${siblings[siblings.length - 1].path} (Weak Sibling)`);
    }

    // Rule 3: Money/Hub page should distribute to spokes
    if (node.pageType === 'hub' || node.pageType === 'money') {
        const unlinkedWeapons = nodes.filter(n => n.cluster === node.cluster && n.pageType === 'weapon' && !existingOutbound.includes(n.path));
        unlinkedWeapons.sort((a, b) => a.authorityScore - b.authorityScore); // give links to weak pages
        unlinkedWeapons.slice(0, 2).forEach(w => {
            node.recommendations.push(`🔗 Link to ${w.path} (Boost Weak Weapon)`);
        });
    }

    // Rule 4: Fix Orphans
    if (node.orphanRisk) {
        const potentialSources = nodes.filter(n => n.cluster === node.cluster && n.path !== node.path && n.pageType !== 'utility');
        potentialSources.sort((a, b) => b.authorityScore - a.authorityScore);
        if (potentialSources.length > 0) {
            node.recommendations.push(`🎯 Request inbound link from ${potentialSources[0].path}`);
        }
    }
    
    // Rule 5: Trust Signals
    if (node.pageType === 'money' || node.pageType === 'weapon') {
        const hasTrust = existingOutbound.some(t => {
            const tgt = nodes.find(n => n.path === t);
            return tgt && tgt.cluster === 'trust';
        });
        if (!hasTrust) {
            const trustPage = nodes.find(n => n.cluster === 'trust' && n.path === '/tentang-kami');
            if (trustPage) node.recommendations.push(`🛡️ Link to ${trustPage.path} (Trust Signal)`);
        }
    }
});

const output = { nodes, edges };
const outPath = path.join(process.cwd(), 'public', 'link-graph-data.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));

console.log(`Generated Link Graph data at: ${outPath}`);
console.log(`Nodes: ${nodes.length}, Edges: ${edges.length}`);
