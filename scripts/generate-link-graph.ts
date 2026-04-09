import fs from 'fs';
import path from 'path';
import { auditData } from '../app/web-audit/audit-data';

type LinkGraphNode = {
  path: string
  title: string
  pageType: "homepage" | "money" | "weapon" | "hub" | "support" | "utility"
  cluster: string
  isIndexable: boolean
  inSitemap: boolean
  hasBreadcrumb: boolean
  orphanRisk: boolean
  inboundCount: number
  outboundCount: number
  contextualOutboundCount: number
  crossClusterOutboundCount: number
  contextualInboundCount?: number
  firstMoneyLinkUnder300?: boolean
  authorityScore: number
  status: string
  warnings: string[]
  recommendations: string[]
  _rawScore?: number
  calculationDetails?: {
    baseScore: number;
    hardPenalty: number;
    weightedInbound: number;
    propagationR1: number;
    propagationR2: number;
    propagationR3: number;
  }
}

type LinkGraphEdge = {
  from: string
  to: string
  anchorText: string
  linkType: "contextual" | "cta" | "related" | "breadcrumb" | "nav" | "footer"
  isCrossCluster: boolean
  isToMoneyPage: boolean
  positionBucket?: "early" | "mid" | "late" | "unknown"
}

function getCluster(p: string) {
    if (p.includes('sewa-kantor') || p.includes('kantor-')) return 'sewa-kantor';
    if (p.includes('virtual-office') || p.includes('alamat-bisnis')) return 'virtual-office';
    if (p.startsWith('/legal') || p.includes('pendirian-pt')) return 'legal';
    if (['/tentang-kami', '/lokasi-kantor', '/fasilitas-kantor', '/klien-dan-testimoni', '/ruang-meeting', '/legalitas-dan-perizinan-bbc', '/kontak'].includes(p)) return 'trust';
    return 'other';
}

function getPageType(p: string, inSitemap: boolean): "homepage" | "money" | "weapon" | "hub" | "support" | "utility" {
    if (p === '/' || p === '') return 'homepage';
    if (['/sewa-kantor', '/virtual-office', '/legal'].includes(p)) return 'money';
    if (getCluster(p) === 'trust') return 'support';
    if (p.includes('/admin') || p.includes('auth') || !inSitemap) return 'utility';
    // hubs as main landing pages inside clusters
    if (p === '/sewa-kantor/bintaro' || p === '/sewa-kantor/jakarta-selatan' || p === '/virtual-office/jakarta-selatan') return 'hub';
    return 'weapon';
}

// --- Authority Model v2 Definitions ---
const SOURCE_PAGE_TYPE_WEIGHT: Record<string, number> = {
  homepage: 2.5,
  money: 3.0,
  hub: 2.5,
  weapon: 1.8,
  support: 1.2,
  utility: 0
}

const LINK_TYPE_WEIGHT: Record<string, number> = {
  contextual: 3.0,
  related: 2.0,
  cta: 1.5,
  breadcrumb: 1.2,
  nav: 0.7,
  footer: 0.5
}

const POSITION_WEIGHT: Record<string, number> = {
  early: 1.3,
  mid: 1.0,
  late: 0.8,
  unknown: 1.0
}

function getClusterWeight(fromCluster: string, toCluster: string, isCrossCluster: boolean) {
  if (!isCrossCluster) return 1.2
  return 0.85
}

function getHardPenalty(node: LinkGraphNode): number {
  let p = 0
  if (node.pageType === "weapon" && node.outboundCount < 3) p -= 8
  if (node.pageType === "hub" && node.outboundCount < 4) p -= 10
  if (node.pageType === "money" && node.outboundCount < 5) p -= 8
  if (!node.hasBreadcrumb && node.pageType !== "homepage" && node.pageType !== "utility") p -= 3
  if (!node.inSitemap && node.pageType !== "utility") p -= 10
  return p
}

function getBaseScore(node: LinkGraphNode): number {
  let score = 0
  if (node.pageType === 'utility') return 0;

  score += node.inSitemap ? 4 : -6
  score += node.hasBreadcrumb ? 2 : -3

  if (node.pageType === "money") score += 8
  if (node.pageType === "hub") score += 6
  if (node.pageType === "weapon") score += 4
  if (node.pageType === "support") score += 2
  if (node.pageType === "homepage") score += 5

  if (node.pageType === "weapon") {
    score += node.outboundCount >= 3 ? 3 : -5
    score += node.contextualOutboundCount >= 2 ? 3 : -4
    score += node.firstMoneyLinkUnder300 ? 2 : -2
  }

  if (node.pageType === "hub") {
    score += node.outboundCount >= 4 ? 4 : -6
    score += node.contextualOutboundCount >= 2 ? 2 : -3
  }

  if (node.pageType === "money") {
    score += node.outboundCount >= 5 ? 4 : -5
    score += node.contextualOutboundCount >= 3 ? 3 : -3
  }

  if (node.pageType === "support") {
    score += node.outboundCount >= 3 ? 2 : -2
  }

  if (node.orphanRisk) score -= 12
  if (node.inboundCount === 0 && node.pageType !== "homepage") score -= 10
  
  score += getHardPenalty(node)

  return score
}

function getEdgeContribution(
  fromNode: LinkGraphNode,
  edge: LinkGraphEdge,
  toNode: LinkGraphNode
): number {
  if (fromNode.pageType === 'utility' || toNode.pageType === 'utility') return 0;

  const sourceWeight = SOURCE_PAGE_TYPE_WEIGHT[fromNode.pageType] || 0
  const linkWeight = LINK_TYPE_WEIGHT[edge.linkType] || 0
  const posWeight = POSITION_WEIGHT[edge.positionBucket || "unknown"] || 1
  const clusterWeight = getClusterWeight(fromNode.cluster, toNode.cluster, edge.isCrossCluster)

  return sourceWeight * linkWeight * posWeight * clusterWeight
}

function getWeightedInboundScore(
  node: LinkGraphNode,
  inboundEdges: LinkGraphEdge[],
  nodesByPath: Record<string, LinkGraphNode>
): number {
  return inboundEdges.reduce((sum, edge) => {
    const fromNode = nodesByPath[edge.from]
    if (!fromNode) return sum
    return sum + getEdgeContribution(fromNode, edge, node)
  }, 0)
}

const DAMPING = 0.65

function getEffectiveOutbound(node: LinkGraphNode): number {
  return Math.max(node.outboundCount, 1)
}

function normalizeScores(rawScores: Record<string, number>) {
  const values = Object.values(rawScores)
  const min = Math.min(...values)
  const max = Math.max(...values)

  const normalized: Record<string, number> = {}
  for (const [path, score] of Object.entries(rawScores)) {
    normalized[path] = max === min ? 50 : Math.round(((score - min) / (max - min)) * 100)
  }
  return normalized
}

function computeAuthorityScores(nodes: LinkGraphNode[], edges: LinkGraphEdge[]) {
  const nodesByPath = Object.fromEntries(nodes.map(n => [n.path, n]))
  const inboundMap: Record<string, LinkGraphEdge[]> = {}

  edges.forEach(e => {
    if (!inboundMap[e.to]) inboundMap[e.to] = [];
    inboundMap[e.to].push(e);
  })

  for (const node of nodes) {
      node.calculationDetails = {
          baseScore: getBaseScore(node) - getHardPenalty(node),
          hardPenalty: getHardPenalty(node),
          weightedInbound: getWeightedInboundScore(node, inboundMap[node.path] || [], nodesByPath),
          propagationR1: 0,
          propagationR2: 0,
          propagationR3: 0
      }
  }

  let scores: Record<string, number> = {}
  for (const node of nodes) {
    const inboundEdges = inboundMap[node.path] || []
    scores[node.path] =
      getBaseScore(node) +
      getWeightedInboundScore(node, inboundEdges, nodesByPath)
  }

  for (let i = 0; i < 3; i++) {
    const nextScores: Record<string, number> = {}
    for (const node of nodes) {
      let propagated = 0
      const inboundEdges = inboundMap[node.path] || []

      for (const edge of inboundEdges) {
        const fromNode = nodesByPath[edge.from]
        if (!fromNode) continue

        const edgeWeight = getEdgeContribution(fromNode, edge, node)
        const transfer = (scores[fromNode.path] / getEffectiveOutbound(fromNode)) * edgeWeight
        propagated += transfer
      }

      if(i === 0) node.calculationDetails!.propagationR1 = propagated;
      if(i === 1) node.calculationDetails!.propagationR2 = propagated;
      if(i === 2) node.calculationDetails!.propagationR3 = propagated;

      nextScores[node.path] =
        getBaseScore(node) +
        0.5 * getWeightedInboundScore(node, inboundEdges, nodesByPath) +
        DAMPING * propagated
    }
    scores = nextScores
  }

  for (const node of nodes) {
      if(scores[node.path] !== undefined) {
          node._rawScore = scores[node.path];
      }
  }

  const normalized = normalizeScores(scores)
  
  for (const node of nodes) {
      if(normalized[node.path] !== undefined) {
          node.authorityScore = normalized[node.path];
      }
  }
}
// --- End Authority Model v2 ---

const nodes: LinkGraphNode[] = [];
const edges: LinkGraphEdge[] = [];

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
    
    const orphanRisk = page.orphanRisk || (inboundCount === 0 && page.indexability === 'index');
    
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
        authorityScore: 0, // Computed soon
        status,
        warnings,
        recommendations: []
    });
});

// Run Authority Propagation Model V2
computeAuthorityScores(nodes, edges);

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
