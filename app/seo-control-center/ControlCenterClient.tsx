'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import {
  ShieldCheck, Search, Network, Zap, BarChart3, Globe, Map, Bot,
  AlertTriangle, CheckCircle2, XCircle, ArrowRight, TrendingUp, Lock
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

const TOOLS = [
  {
    id: 'entity-audit', phase: 'A', label: 'Entity & Angle Audit',
    description: 'Deteksi overlap intent, mismatch angle, dan validasi behavior per page type.',
    icon: Search, color: 'from-violet-500 to-purple-600', href: '/seo-control-center/entity-audit',
    metric: (a: AuditPage[]) => `${a.filter(p => p.pageType !== 'utility').length} pages audited`,
  },
  {
    id: 'answer-extraction', phase: 'A', label: 'Answer Extraction Audit',
    description: 'Ukur apakah halaman ditulis dalam format yang mudah diambil oleh LLM.',
    icon: Zap, color: 'from-amber-500 to-orange-600', href: '/seo-control-center/answer-extraction',
    metric: (a: AuditPage[]) => `${a.filter(p => p.schemaTypes.includes('FAQPage')).length} pages with FAQ`,
  },
  {
    id: 'trust-scanner', phase: 'A', label: 'Trust Signal Scanner',
    description: 'Cek konsistensi trust signal (2007, Jakarta Selatan, address) di seluruh halaman.',
    icon: ShieldCheck, color: 'from-emerald-500 to-teal-600', href: '/seo-control-center/trust-scanner',
    metric: (a: AuditPage[]) => `${a.filter(p => p.schemaTypes.some(s => ['Organization','LocalBusiness'].includes(s))).length} pages with org schema`,
  },
  {
    id: 'authority-analyzer', phase: 'B', label: 'Authority Injection Analyzer',
    description: 'Analisis weighted authority flow dan temukan peluang injeksi link internal.',
    icon: Network, color: 'from-blue-500 to-indigo-600', href: '/seo-control-center/authority-analyzer',
    metric: (a: AuditPage[]) => `${a.reduce((s,p) => s + p.linksOut.length, 0)} internal links mapped`,
  },
  {
    id: 'crawl-audit', phase: 'B', label: 'Crawl & Indexability Audit',
    description: 'Flag canonical mismatch, sitemap issues, orphan pages, dan robots errors.',
    icon: Globe, color: 'from-cyan-500 to-sky-600', href: '/seo-control-center/crawl-audit',
    metric: (a: AuditPage[]) => `${a.filter(p => p.orphanRisk).length} orphan risk pages`,
  },
  {
    id: 'intent-map', phase: 'C', label: 'Intent Coverage Map',
    description: 'Matrix intent → page coverage. Temukan gap yang belum punya halaman.',
    icon: Map, color: 'from-rose-500 to-pink-600', href: '/seo-control-center/intent-map',
    metric: (_: AuditPage[], r: RegistryEntry[]) => `${r.reduce((s,e) => s + e.queryBank.length, 0)} queries mapped`,
  },
  {
    id: 'llm-scanner', phase: 'C', label: 'LLM Presence Scanner',
    description: 'Simulasi citation readiness untuk ChatGPT/Gemini/Perplexity queries.',
    icon: Bot, color: 'from-slate-600 to-gray-700', href: '/seo-control-center/llm-scanner',
    metric: (_: AuditPage[], r: RegistryEntry[]) => `${r.reduce((s,e) => s + e.queryBank.length, 0)} queries in bank`,
  },
  {
    id: 'web-audit-legacy', phase: 'Legacy', label: 'Full Web Audit (Original)',
    description: 'Original technical audit view with complete page-by-page scoring.',
    icon: BarChart3, color: 'from-slate-700 to-slate-800', href: '/web-audit',
    metric: (a: AuditPage[]) => `${a.length} pages scanned`,
  },
  {
    id: 'link-graph-legacy', phase: 'Legacy', label: 'Internal Link Graph (Interactive)',
    description: 'Interactive D3 force-directed graph to visualize your site architecture.',
    icon: Network, color: 'from-slate-700 to-slate-800', href: '/internal-link-graph',
    metric: (a: AuditPage[]) => `${a.reduce((s,p) => s + p.linksOut.length, 0)} total links`,
  },
  {
    id: 'internal-links-legacy', phase: 'Legacy', label: 'Internal Link Explorer',
    description: 'Exploration tool for inbound/outbound links per path.',
    icon: Search, color: 'from-slate-700 to-slate-800', href: '/internal-links',
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

  const phaseColors: Record<string, string> = {
    A: 'bg-violet-100 text-violet-700 border-violet-200',
    B: 'bg-blue-100 text-blue-700 border-blue-200',
    C: 'bg-rose-100 text-rose-700 border-rose-200',
    Legacy: 'bg-slate-100 text-slate-700 border-slate-200',
  }

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
              <p className="text-slate-400 text-xs font-medium mt-0.5">BBC SEO + AEO Observability Stack — Read-only intelligence layer</p>
            </div>
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
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">Complete SEO Suite</h2>
            {['A', 'B', 'C', 'Legacy'].map(phase => (
              <div key={phase} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-widest ${phaseColors[phase]}`}>
                    {phase === 'Legacy' ? 'Core Audit' : `Paket ${phase}`}
                  </span>
                  <span className="text-slate-600 text-[10px] font-bold">
                    {phase === 'A' ? 'Foundation Intelligence' : phase === 'B' ? 'Ranking Control' : phase === 'C' ? 'Answer Engine Expansion' : 'Original Analytics Tools'}
                  </span>
                </div>
                {TOOLS.filter(t => t.phase === phase).map(tool => {
                  const Icon = tool.icon
                  return (
                    <Link key={tool.id} href={tool.href} className="group flex items-center gap-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 rounded-2xl p-4 transition-all">
                      <div className={`bg-gradient-to-br ${tool.color} p-2.5 rounded-xl shadow-lg shrink-0`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-sm text-white group-hover:text-white">{tool.label}</div>
                        <div className="text-slate-500 text-[11px] font-medium mt-0.5 line-clamp-1">{tool.description}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-slate-400 text-[10px] font-bold">{tool.metric(auditData, registryEntries)}</div>
                        <ArrowRight size={14} className="ml-auto mt-1 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Critical Alerts Panel */}
          <div className="space-y-4">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">Critical Alerts</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <span className="text-sm font-black text-white">Priority Issues</span>
                <span className="text-[10px] font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                  {criticalAlerts.filter(a => a.priority === 'critical').length} critical
                </span>
              </div>
              <div className="divide-y divide-slate-800 max-h-[500px] overflow-y-auto">
                {criticalAlerts.length === 0 ? (
                  <div className="p-6 text-center">
                    <CheckCircle2 className="mx-auto text-emerald-500 mb-2" size={24} />
                    <p className="text-slate-400 text-sm font-bold">No critical alerts</p>
                  </div>
                ) : criticalAlerts.map((alert, i) => (
                  <div key={i} className="p-3 hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-start gap-2">
                      {alert.priority === 'critical'
                        ? <XCircle size={14} className="text-rose-400 shrink-0 mt-0.5" />
                        : <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      }
                      <div>
                        <div className="text-[10px] font-black text-slate-300 font-mono">{alert.path}</div>
                        <div className="text-[10px] text-slate-500 font-medium mt-0.5">{alert.issue}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Queue */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <span className="text-sm font-black text-white flex items-center gap-2"><TrendingUp size={14} className="text-violet-400" /> Priority Queue</span>
              </div>
              <div className="p-4 space-y-2">
                <div className="text-[10px] text-slate-500 font-medium">Pages needing urgent attention (orphan + low links):</div>
                {auditData
                  .filter(p => p.status === 'Red' && p.indexability === 'index')
                  .slice(0, 5)
                  .map(p => (
                    <div key={p.path} className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <div className="font-mono text-[10px] text-slate-300 truncate">{p.path}</div>
                      <span className="ml-auto text-[9px] font-black text-slate-500 uppercase shrink-0">{p.pageType}</span>
                    </div>
                  ))
                }
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
