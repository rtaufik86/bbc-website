'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import {
  ShieldCheck, Search, Network, Zap, BarChart3, Globe, Map, Bot,
  AlertTriangle, CheckCircle2, XCircle, ArrowRight, TrendingUp, Lock, Target
} from 'lucide-react'

interface AuditPage {
  path: string; pageType: string; indexability: string; title: string;
  wordCount: number; h1Count: number; schemaTypes: string[];
  inSitemap: boolean; orphanRisk: boolean; breadcrumb: boolean;
  linksIn: { from: string; anchor: string }[];
  linksOut: { href: string; anchor: string; isContextual: boolean }[];
  status: string; description: string;
}
interface RegistryEntry {
  url: string; pageType: string; cluster: string; angle: string;
  entity: string; intent: string; queryBank: string[];
}
interface Props {
  auditData: AuditPage[]
  registryEntries: RegistryEntry[]
}

const LAYERS = [
  { id: 1, label: 'STRUCTURAL FOUNDATION', domain: 'GPT DOMAIN', color: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10' },
  { id: 2, label: 'CONTENT & AEO READINESS', domain: 'CLAUDE DOMAIN', color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' },
  { id: 3, label: 'TRUST & ENTITY VALIDATION', domain: 'GEMINI DOMAIN', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
  { id: 4, label: 'TECHNICAL SEO & INDEXING', domain: 'DEV DOMAIN', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10' },
  { id: 5, label: 'LINK GRAPH & DISTRIBUTION', domain: 'SYSTEM ENGINE', color: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10' },
]

const TOOLS = [
  // LAYER 1
  {
    id: 'decision-engine', layer: 1, label: 'Decision Engine',
    description: 'Automated task distribution and prioritization engine (v1.0).',
    icon: Target, color: 'from-rose-500 to-orange-600', href: '/seo-control-center/decision-engine',
    metric: (a: AuditPage[]) => `${a.filter(p => p.status === 'Red').length} tasks pending`,
  },
  {
    id: 'entity-audit', layer: 1, label: 'Entity & Angle Audit',
    description: 'Deteksi overlap intent, mismatch angle, dan validasi behavior per page type.',
    icon: Search, color: 'from-violet-500 to-purple-600', href: '/seo-control-center/entity-audit',
    metric: (a: AuditPage[]) => `${a.filter(p => p.pageType !== 'utility').length} pages audited`,
  },
  {
    id: 'intent-map', layer: 1, label: 'Intent Coverage Map',
    description: 'Matrix intent → page coverage. Temukan gap yang belum punya halaman.',
    icon: Map, color: 'from-violet-500 to-purple-600', href: '/seo-control-center/intent-map',
    metric: (_: AuditPage[], r: RegistryEntry[]) => `${r.reduce((s,e) => s + e.queryBank.length, 0)} queries mapped`,
  },
  {
    id: 'authority-analyzer', layer: 1, label: 'Authority Injection Analyzer',
    description: 'Analisis weighted authority flow dan temukan peluang injeksi link internal.',
    icon: Network, color: 'from-violet-500 to-purple-600', href: '/seo-control-center/authority-analyzer',
    metric: (a: AuditPage[]) => `${a.reduce((s,p) => s + p.linksOut.length, 0)} internal links mapped`,
  },
  // LAYER 2
  {
    id: 'answer-extraction', layer: 2, label: 'Answer Extraction Audit',
    description: 'Ukur apakah halaman ditulis dalam format yang mudah diambil oleh LLM.',
    icon: Zap, color: 'from-amber-500 to-orange-600', href: '/seo-control-center/answer-extraction',
    metric: (a: AuditPage[]) => `${a.filter(p => p.schemaTypes.includes('FAQPage')).length} pages with FAQ`,
  },
  {
    id: 'llm-scanner', layer: 2, label: 'LLM Presence Scanner',
    description: 'Simulasi citation readiness untuk ChatGPT/Gemini/Perplexity queries.',
    icon: Bot, color: 'from-amber-500 to-orange-600', href: '/seo-control-center/llm-scanner',
    metric: (_: AuditPage[], r: RegistryEntry[]) => `${r.reduce((s,e) => s + e.queryBank.length, 0)} queries in bank`,
  },
  // LAYER 3
  {
    id: 'trust-scanner', layer: 3, label: 'Trust Signal Scanner',
    description: 'Cek konsistensi trust signal (2007, Jakarta Selatan, address) di seluruh halaman.',
    icon: ShieldCheck, color: 'from-emerald-500 to-teal-600', href: '/seo-control-center/trust-scanner',
    metric: (a: AuditPage[]) => `${a.filter(p => p.schemaTypes.some(s => ['Organization','LocalBusiness'].includes(s))).length} pages with org schema`,
  },
  // LAYER 4
  {
    id: 'crawl-audit', layer: 4, label: 'Crawl & Indexability Audit',
    description: 'Flag canonical mismatch, sitemap issues, orphan pages, dan robots errors.',
    icon: Globe, color: 'from-blue-500 to-indigo-600', href: '/seo-control-center/crawl-audit',
    metric: (a: AuditPage[]) => `${a.filter(p => p.orphanRisk).length} orphan risk pages`,
  },
  {
    id: 'web-audit-legacy', layer: 4, label: 'Full Web Audit',
    description: 'Original technical audit view with complete page-by-page scoring.',
    icon: BarChart3, color: 'from-blue-500 to-indigo-600', href: '/web-audit',
    metric: (a: AuditPage[]) => `${a.length} pages scanned`,
  },
  // LAYER 5
  {
    id: 'link-graph-legacy', layer: 5, label: 'Internal Link Graph',
    description: 'Interactive D3 force-directed graph to visualize your site architecture.',
    icon: Network, color: 'from-rose-500 to-pink-600', href: '/internal-link-graph',
    metric: (a: AuditPage[]) => `${a.reduce((s,p) => s + p.linksOut.length, 0)} total links`,
  },
  {
    id: 'internal-links-legacy', layer: 5, label: 'Internal Link Explorer',
    description: 'Exploration tool for inbound/outbound links per path.',
    icon: Search, color: 'from-rose-500 to-pink-600', href: '/internal-links',
    metric: (a: AuditPage[]) => `${a.reduce((s,p) => s + p.linksIn.length, 0)} inbound connections`,
  },
]

export default function ControlCenterClient({ auditData, registryEntries }: Props) {
  const stats = useMemo(() => {
    const indexable = auditData.filter(p => p.indexability === 'index')
    const orphans = auditData.filter(p => p.orphanRisk)
    const red = auditData.filter(p => p.status === 'Red')
    const yellow = auditData.filter(p => p.status === 'Yellow')
    const green = auditData.filter(p => p.status === 'Green')
    const withFAQ = auditData.filter(p => p.schemaTypes.includes('FAQPage'))
    const withSchema = auditData.filter(p => p.schemaTypes.length > 0)
    const noInbound = auditData.filter(p => p.linksIn.length === 0 && p.indexability === 'index')
    return { indexable, orphans, red, yellow, green, withFAQ, withSchema, noInbound, total: auditData.length }
  }, [auditData])

  const criticalAlerts = useMemo(() => {
    const alerts: { path: string; issue: string; priority: 'critical' | 'warning' }[] = []
    auditData.forEach(p => {
      if (p.orphanRisk) alerts.push({ path: p.path, issue: 'Orphan page — no contextual inbound link', priority: 'critical' })
      if (p.indexability === 'index' && !p.inSitemap) alerts.push({ path: p.path, issue: 'Indexable but missing from sitemap', priority: 'critical' })
      if (p.indexability === 'index' && p.h1Count === 0) alerts.push({ path: p.path, issue: 'Indexable page with no H1', priority: 'critical' })
      if (p.indexability === 'index' && !p.description) alerts.push({ path: p.path, issue: 'Missing meta description', priority: 'warning' })
    })
    return alerts.slice(0, 10)
  }, [auditData])

  const getAction = (p: AuditPage) => {
    if (p.orphanRisk || (p.indexability === 'index' && p.linksIn.length === 0)) return { type: 'INJECT', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' }
    if (p.h1Count === 0 || !p.inSitemap) return { type: 'FIX', class: 'bg-blue-500/10 text-blue-400 border-blue-500/20' }
    if (p.wordCount < 500 || !p.schemaTypes.includes('FAQPage')) return { type: 'REWRITE', class: 'bg-violet-500/10 text-violet-400 border-violet-500/20' }
    return { type: 'OPTIMIZE', class: 'bg-amber-500/10 text-amber-400 border-amber-500/20' }
  }

  const layerStatus = useMemo(() => {
    return LAYERS.map(layer => {
      let status: 'Healthy' | 'Warning' | 'Critical' = 'Healthy'
      let message = ''
      let score = 100

      if (layer.id === 1) { // Structural
        const entityIssues = auditData.filter(p => p.status === 'Red' && p.pageType !== 'utility').length
        score = Math.max(0, 100 - (entityIssues * 8))
        if (score < 40) { status = 'Critical'; message = 'Major intent/angle overlap detected' }
        else if (score < 80) { status = 'Warning'; message = 'Minor angle inconsistencies' }
      }
      else if (layer.id === 2) { // Content
        const faqCover = auditData.filter(p => p.pageType === 'weapon' && p.schemaTypes.includes('FAQPage')).length
        const totalWeapon = auditData.filter(p => p.pageType === 'weapon').length
        score = totalWeapon > 0 ? Math.round((faqCover / totalWeapon) * 100) : 100
        if (score < 30) { status = 'Critical'; message = 'Low AEO readiness (FAQ coverage)' }
        else if (score < 70) { status = 'Warning'; message = 'Medium LLM presence coverage' }
      }
      else if (layer.id === 3) { // Trust
        const orgSchema = auditData.filter(p => p.schemaTypes.some(s => ['Organization','LocalBusiness'].includes(s))).length
        score = Math.min(100, (orgSchema / 5) * 100)
        if (score < 60) { status = 'Critical'; message = 'Weak Entity Trust Signals' }
      }
      else if (layer.id === 4) { // Technical
        const issues = auditData.filter(p => p.indexability === 'index' && (!p.inSitemap || p.h1Count === 0)).length
        score = Math.max(0, 100 - (issues * 10))
        if (score < 50) { status = 'Critical'; message = 'Crawl waste detected' }
        else if (score < 90) { status = 'Warning'; message = 'Minor indexing errors' }
      }
      else if (layer.id === 5) { // Links
        const noInbound = auditData.filter(p => p.linksIn.length === 0 && p.indexability === 'index').length
        score = Math.max(0, 100 - (noInbound * 15))
        if (score < 40) { status = 'Critical'; message = 'Multiple authority bottlenecks' }
        else if (score < 85) { status = 'Warning'; message = 'Isolated pages found' }
      }

      return { ...layer, status, message, score }
    })
  }, [auditData])

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900 px-8 py-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-3 rounded-2xl shadow-xl shadow-violet-500/20">
              <BarChart3 size={28} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-white tracking-tight">SEO CONTROL CENTER</h1>
                <span className="flex items-center gap-1.5 text-[10px] font-black bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full uppercase tracking-widest">
                  <Lock size={10} /> LOCALHOST ONLY
                </span>
              </div>
              <p className="text-slate-400 text-xs font-medium mt-0.5">BBC SEO + AEO Operating System — Architecture-driven decision engine</p>
            </div>
          </div>
          
          {/* Flow Indicator */}
          <div className="hidden xl:flex items-center gap-2 bg-slate-800/50 p-2 rounded-2xl border border-slate-800">
            {layerStatus.map((l, i) => (
              <React.Fragment key={l.id}>
                <div className="flex flex-col items-center px-3">
                   <div className="flex items-center gap-1.5 mb-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${l.status === 'Healthy' ? 'bg-emerald-500' : l.status === 'Warning' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                      <span className="text-[10px] font-black tabular-nums">{l.score}%</span>
                   </div>
                   <div className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{l.id}. {l.label.split(' ')[0]}</div>
                </div>
                {i < layerStatus.length - 1 && <div className="w-[1px] h-6 bg-slate-800 mx-1" />}
              </React.Fragment>
            ))}
          </div>

          <div className="text-right hidden lg:block">
            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Governance</div>
            <div className="text-slate-300 text-sm font-bold">Structural authority: GPT-locked</div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-10 space-y-10">
        {/* Site Health Overview */}
        <section>
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Site Health Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: 'Total Pages', value: stats.total, color: 'text-white' },
              { label: 'Indexable', value: stats.indexable.length, color: 'text-emerald-400' },
              { label: 'Orphan Risk', value: stats.orphans.length, color: stats.orphans.length > 0 ? 'text-rose-400' : 'text-emerald-400' },
              { label: 'Status Red', value: stats.red.length, color: stats.red.length > 0 ? 'text-rose-400' : 'text-emerald-400' },
              { label: 'Status Yellow', value: stats.yellow.length, color: stats.yellow.length > 0 ? 'text-amber-400' : 'text-emerald-400' },
              { label: 'Status Green', value: stats.green.length, color: 'text-emerald-400' },
              { label: 'Has Schema', value: stats.withSchema.length, color: 'text-sky-400' },
              { label: 'Has FAQ', value: stats.withFAQ.length, color: 'text-violet-400' },
            ].map(s => (
              <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tool Suite Cards */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">Execution Layers (Workflow-Based)</h2>
            {layerStatus.map(layer => (
              <div key={layer.id} className="space-y-4">
                <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`text-sm font-black uppercase tracking-widest ${layer.color}`}>LAYER {layer.id} &mdash; {layer.label}</div>
                    <span className="text-[9px] font-black bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full border border-slate-800 uppercase tracking-widest">{layer.domain}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col text-right">
                       <span className={`text-[10px] font-black uppercase tracking-widest ${layer.status === 'Healthy' ? 'text-emerald-400' : layer.status === 'Warning' ? 'text-amber-400' : 'text-rose-400'}`}>{layer.status} ({layer.score}%)</span>
                       <span className="text-[8px] text-slate-600 font-bold tracking-tight">{layer.message}</span>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse shrink-0 ${layer.status === 'Healthy' ? 'bg-emerald-500' : layer.status === 'Warning' ? 'bg-amber-500' : 'bg-rose-400'}`} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4 border-l-2 border-slate-800/50">
                {TOOLS.filter(t => t.layer === layer.id).map(tool => {
                  const Icon = tool.icon
                  return (
                    <Link key={tool.id} href={tool.href} className="group flex items-center gap-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 rounded-2xl p-4 transition-all shadow-sm">
                      <div className={`bg-gradient-to-br ${tool.color} p-2 rounded-xl shadow-lg shrink-0`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs text-white group-hover:text-white uppercase tracking-tight">{tool.label}</div>
                        <div className="text-slate-500 text-[10px] font-medium mt-0.5 line-clamp-1 italic">{tool.description}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-slate-500 text-[10px] font-black tabular-nums">{tool.metric(auditData, registryEntries)}</div>
                        <ArrowRight size={12} className="ml-auto mt-1 text-slate-700 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </Link>
                  )
                })}
                </div>
              </div>
            ))}
          </div>

          {/* Priority Panel */}
          <div className="space-y-6">
            <div>
               <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Priority Intelligence</h2>
               
               {/* CRITICAL BLOCKERS */}
               <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden mb-6">
                  <div className="p-4 bg-rose-500/10 border-b border-rose-500/20 flex items-center gap-2">
                    <XCircle className="text-rose-400" size={16} />
                    <span className="text-xs font-black text-white uppercase tracking-widest">CRITICAL (BLOCKERS)</span>
                  </div>
                  <div className="divide-y divide-slate-800/40 divide-dashed">
                    {criticalAlerts.filter(a => a.priority === 'critical').length === 0 ? (
                      <div className="p-8 text-center text-slate-600 italic text-[11px]">No critical blockers detected.</div>
                    ) : criticalAlerts.filter(a => a.priority === 'critical').map((alert, i) => (
                      <div key={i} className="p-4 hover:bg-slate-800/30 transition-colors">
                        <div className="font-mono text-[10px] text-rose-400 font-bold mb-1 truncate">{alert.path}</div>
                        <div className="text-[10px] text-slate-500 font-medium lowercase italic leading-none">{alert.issue}</div>
                      </div>
                    ))}
                  </div>
               </div>

               {/* OPTIMIZATION */}
               <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                  <div className="p-4 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-2">
                    <Zap className="text-amber-400" size={16} />
                    <span className="text-xs font-black text-white uppercase tracking-widest">OPTIMIZATION</span>
                  </div>
                  <div className="p-5 space-y-6">
                    {/* A. CONTENT DEFICIENCY */}
                    <div className="space-y-3">
                       <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                          <CheckCircle2 size={12} className="text-slate-600" /> A. CONTENT DEFICIENCY
                       </div>
                       <div className="space-y-2">
                          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between">
                            <span>Missing FAQ Expansion</span>
                            <span className="text-amber-400">{auditData.filter(p => !p.schemaTypes.includes('FAQPage') && p.pageType === 'weapon').length} pages</span>
                          </div>
                          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between">
                            <span>Low Word Count (&lt;500)</span>
                            <span className="text-amber-400">{auditData.filter(p => p.wordCount < 500 && p.indexability === 'index').length} pages</span>
                          </div>
                       </div>
                    </div>

                    {/* B. TRUST DEFICIENCY */}
                    <div className="space-y-3">
                       <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                          <ShieldCheck size={12} className="text-slate-600" /> B. TRUST DEFICIENCY
                       </div>
                       <div className="space-y-2">
                          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between">
                            <span>Weak Entity Signals</span>
                            <span className="text-amber-400">{auditData.filter(p => p.schemaTypes.length === 0 && p.indexability === 'index').length} pages</span>
                          </div>
                       </div>
                    </div>
                    
                    <div className="pt-2 border-t border-slate-800">
                       <div className="text-[9px] text-slate-600 italic leading-relaxed">
                          * Prioritaskan regenerasi konten pada weapon pages terlebih dahulu untuk mempercepat indexing.
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Decision Queue */}
            <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-black text-white flex items-center gap-2 uppercase tracking-widest"><TrendingUp size={14} className="text-violet-400" /> Decision Queue</span>
                <Link href="/seo-control-center/decision-engine" className="text-[10px] font-black text-slate-500 hover:text-rose-400 transition-colors uppercase tracking-widest">View All</Link>
              </div>
              <div className="p-5 space-y-3">
                {auditData
                  .filter(p => p.status === 'Red' && p.indexability === 'index')
                  .slice(0, 4)
                  .map(p => {
                    const action = getAction(p)
                    return (
                      <div key={p.path} className="flex items-center gap-3 bg-slate-800/40 border border-slate-800/50 rounded-2xl px-4 py-3 group hover:border-slate-700 transition-all">
                        <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
                        <div className="min-w-0 flex-1">
                           <div className="flex justify-between items-center mb-0.5">
                              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{p.pageType}</span>
                              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase tracking-widest ${action.class}`}>
                                {action.type}
                              </span>
                           </div>
                           <div className="font-mono text-[10px] text-slate-300 truncate">{p.path}</div>
                        </div>
                      </div>
                    )
                  })
                }
                
                <Link href="/seo-control-center/decision-engine" className="flex items-center justify-center gap-2 w-full py-3 bg-slate-950 border border-slate-800 rounded-2xl text-[10px] font-black text-slate-500 hover:text-white transition-all group">
                   GO TO EXECUTION ENGINE <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Governance Notice */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 flex gap-4">
          <Lock size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-amber-400 font-black text-sm mb-1">Governance Rules — READ ONLY SYSTEM</div>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              Semua tool di sini bersifat <strong className="text-slate-300">observability only</strong>. Angle, family, entity, dan intent dari structural registry adalah <strong className="text-slate-300">LOCKED</strong> dan tidak dapat diubah oleh tool manapun. Rekomendasi di setiap tool dilabeli sebagai <em>recommendation</em>, bukan <em>fact</em>. Auto-write ke halaman publik tidak diizinkan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
