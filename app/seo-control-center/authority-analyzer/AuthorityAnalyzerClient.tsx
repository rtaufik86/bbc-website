'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Network, Copy, TrendingUp, TrendingDown, Minus, Globe } from 'lucide-react'

interface LinkInfo { href: string; isContextual: boolean; position?: number }
interface AuditPage {
  path: string; pageType: string; indexability: string; title: string;
  linksOut: LinkInfo[]; linksIn: { from: string; anchor: string }[];
  firstMoneyLinkBefore300: boolean; breadcrumb: boolean; inSitemap: boolean; orphanRisk: boolean;
}
interface RegistryEntry {
  url: string; pageType: string; cluster: string; family: string; intent: string;
}
interface Props { auditData: AuditPage[]; registryEntries: RegistryEntry[] }

// Source page type weights
const SOURCE_WEIGHT: Record<string, number> = { money: 3.0, hub: 2.5, weapon: 1.8, support: 1.2, utility: 0 }
// Link type weights
function getLinkWeight(link: LinkInfo): number {
  if (link.isContextual) return 3.0
  return 1.0
}
// Position weight
function getPositionWeight(pos?: number): number {
  if (pos === undefined) return 1.0
  if (pos < 300) return 1.3
  if (pos < 1000) return 1.0
  return 0.8
}

function getCluster(path: string): string {
  if (path.includes('sewa-kantor') || path.includes('kantor-')) return 'sewa-kantor'
  if (path.includes('virtual-office') || path.includes('alamat-bisnis')) return 'virtual-office'
  if (path.startsWith('/legal')) return 'legal'
  if (['/tentang-kami','/lokasi-kantor','/fasilitas-kantor','/klien-dan-testimoni','/ruang-meeting','/legalitas-dan-perizinan-bbc','/kontak'].includes(path)) return 'trust'
  return 'other'
}

function computeAuthorityData(pages: AuditPage[]) {
  const inboundMap: Record<string, { from: string; link: LinkInfo; fromType: string }[]> = {}
  pages.forEach(page => {
    page.linksOut.forEach(link => {
      const to = link.href.split('#')[0].split('?')[0]
      if (!inboundMap[to]) inboundMap[to] = []
      inboundMap[to].push({ from: page.path, link, fromType: page.pageType })
    })
  })

  const scores: Record<string, number> = {}
  pages.forEach(page => {
    if (page.pageType === 'utility' || page.indexability !== 'index') { scores[page.path] = 0; return }
    const inbound = inboundMap[page.path] || []
    let score = 0

    // Base from page type
    if (page.pageType === 'money') score += 20
    else if (page.pageType === 'hub') score += 15
    else if (page.pageType === 'weapon') score += 10
    else if (page.pageType === 'support') score += 5

    // Inbound weighted authority
    score += inbound.reduce((s, item) => {
      const srcWeight = SOURCE_WEIGHT[item.fromType] || 0
      return s + srcWeight * getLinkWeight(item.link) * getPositionWeight(item.link.position)
    }, 0)

    // Penalties
    if (page.orphanRisk) score -= 15
    if (!page.inSitemap) score -= 10
    if (!page.breadcrumb) score -= 5
    if (page.linksOut.length < 2) score -= 8

    scores[page.path] = Math.max(0, score)
  })

  // Normalize 0-100 against actual score spread
  const vals = Object.values(scores)
  const max = vals.length > 0 ? Math.max(...vals) : 1
  const min = vals.length > 0 ? Math.min(...vals) : 0
  const range = max - min
  const normalized: Record<string, number> = {}
  Object.entries(scores).forEach(([k, v]) => {
    // Uniform cluster: preserve that all pages share the same strength (report 50)
    normalized[k] = range === 0
      ? (v > 0 ? 50 : 0)
      : Math.round(((v - min) / range) * 100)
  })

  return { scores: normalized, inboundMap }
}

// Expected authority band by page type
function getExpectedBand(pageType: string): { min: number; max: number; label: string } {
  switch (pageType) {
    case 'money': return { min: 70, max: 100, label: 'High (70–100)' }
    case 'hub': return { min: 55, max: 85, label: 'Medium-High (55–85)' }
    case 'weapon': return { min: 35, max: 65, label: 'Medium (35–65)' }
    case 'support': return { min: 20, max: 50, label: 'Low-Medium (20–50)' }
    default: return { min: 0, max: 30, label: 'Low (0–30)' }
  }
}

export default function AuthorityAnalyzerClient({ auditData, registryEntries }: Props) {
  const [filterCluster, setFilterCluster] = useState('all')
  const [sortBy, setSortBy] = useState<'score' | 'deficit'>('deficit')
  const [selected, setSelected] = useState<string | null>(null)

  const { pages, inboundMap } = useMemo(() => {
    const { scores, inboundMap } = computeAuthorityData(auditData)

    const pages = auditData
      .filter(p => p.indexability === 'index' && p.pageType !== 'utility')
      .map(page => {
        const reg = registryEntries.find(r => r.url === page.path)
        const score = scores[page.path] ?? 0
        const band = getExpectedBand(page.pageType)
        const deficit = Math.max(0, band.min - score)
        const cluster = reg?.cluster || getCluster(page.path)
        const inbound = (inboundMap[page.path] || [])
        const contextualInbound = inbound.filter(i => i.link.isContextual).length

        // Find good injection candidates: high-score pages in same cluster that don't already link here
        const existingFrom = new Set(inbound.map(i => i.from))
        // Only recommend injection sources that are themselves indexable.
        // Linking FROM a noindex/canonicalized page will not pass authority
        // and would pollute the action list with non-actionable suggestions.
        const injectionCandidates = auditData
          .filter(p =>
            getCluster(p.path) === cluster &&
            p.path !== page.path &&
            !existingFrom.has(p.path) &&
            p.pageType !== 'utility' &&
            p.indexability === 'index'
          )
          .map(p => ({ path: p.path, score: scores[p.path] ?? 0, type: p.pageType }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)

        return { page, reg, score, band, deficit, cluster, inbound: inbound.length, contextualInbound, injectionCandidates }
      })
    return { pages, inboundMap }
  }, [auditData, registryEntries])

  const clusters = ['all', ...Array.from(new Set(pages.map(p => p.cluster)))]
  const filtered = pages
    .filter(p => filterCluster === 'all' || p.cluster === filterCluster)
    .sort((a, b) => sortBy === 'deficit' ? b.deficit - a.deficit : b.score - a.score)

  const selectedItem = filtered.find(i => i.page.path === selected)

  const exportCSV = () => {
    const rows = [
      ['Path', 'Type', 'Cluster', 'Score', 'Expected Min', 'Deficit', 'Inbound', 'Contextual Inbound', 'Top Injection Source'].join(','),
      ...filtered.map(i => [
        i.page.path, i.page.pageType, i.cluster, i.score, i.band.min, i.deficit,
        i.inbound, i.contextualInbound, i.injectionCandidates[0]?.path || ''
      ].join(','))
    ]
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'authority-analyzer.csv'; a.click()
  }

  const copyData = () => {
    const rows = [
      ['Path', 'Type', 'Cluster', 'Score', 'Expected Min', 'Deficit', 'Inbound', 'Contextual Inbound', 'Top Injection Source'].join('\t'),
      ...filtered.map(i => [
        i.page.path, i.page.pageType, i.cluster, i.score, i.band.min, i.deficit,
        i.inbound, i.contextualInbound, i.injectionCandidates[0]?.path || ''
      ].join('\t'))
    ]
    navigator.clipboard.writeText(rows.join('\n'))
    alert('Data copied to clipboard (Tab-Separated)')
  }

  const DeficitIcon = ({ deficit }: { deficit: number }) => {
    if (deficit === 0) return <TrendingUp size={13} className="text-emerald-400" />
    if (deficit < 20) return <Minus size={13} className="text-amber-400" />
    return <TrendingDown size={13} className="text-rose-400" />
  }

  const avgScore = Math.round(pages.reduce((s, p) => s + p.score, 0) / (pages.length || 1))

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <div className="border-b border-slate-800 bg-slate-900 px-8 py-5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Link href="/seo-control-center" className="text-slate-500 hover:text-white transition-colors"><ArrowLeft size={16} /></Link>
            <h1 className="text-xl font-black text-white">Authority Injection Analyzer</h1>
            <span className="text-[9px] font-black bg-blue-500/15 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full uppercase">Paket B</span>
          </div>
          <p className="text-slate-500 text-xs ml-7">Hitung weighted internal authority per halaman dan temukan peluang injeksi link terbaik. Internal Authority Score (0–100).</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-8 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/10 border border-blue-500/20 rounded-2xl p-5">
            <div className="text-4xl font-black text-blue-400">{avgScore}</div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Avg Authority</div>
          </div>
          {[
            { label: 'Underpowered', value: pages.filter(p => p.deficit > 20).length, color: 'text-rose-400' },
            { label: 'Near Target', value: pages.filter(p => p.deficit > 0 && p.deficit <= 20).length, color: 'text-amber-400' },
            { label: 'On Target', value: pages.filter(p => p.deficit === 0).length, color: 'text-emerald-400' },
          ].map(s => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-3 items-center flex-wrap">
          <div className="flex gap-2">
            {clusters.map(c => (
              <button key={c} onClick={() => setFilterCluster(c)}
                className={`text-[10px] font-black px-3 py-1.5 rounded-lg border transition-colors capitalize ${filterCluster === c ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-slate-700'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-4">
            <span className="text-slate-500 text-[11px] font-bold self-center">Sort:</span>
            {(['deficit', 'score'] as const).map(s => (
              <button key={s} onClick={() => setSortBy(s)}
                className={`text-[10px] font-black px-3 py-1.5 rounded-lg border transition-colors ${sortBy === s ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
                By {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            <button onClick={copyData} className="flex items-center gap-2 text-[11px] font-black bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl border border-slate-700 transition-colors">
              <Copy size={13} /> Copy Text
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 text-[11px] font-black bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl border border-slate-700 transition-colors">
              <Globe size={13} /> CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-800">
                  <tr className="text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <th className="px-4 py-3">Path</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Authority</th>
                    <th className="px-4 py-3">Expected Band</th>
                    <th className="px-4 py-3">Deficit</th>
                    <th className="px-4 py-3">In/Ctx</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filtered.map(item => (
                    <tr key={item.page.path}
                      onClick={() => setSelected(selected === item.page.path ? null : item.page.path)}
                      className={`cursor-pointer hover:bg-slate-800/50 transition-colors ${selected === item.page.path ? 'bg-slate-800' : ''}`}>
                      <td className="px-4 py-3 font-mono text-[11px] text-blue-400 max-w-[200px] truncate">{item.page.path}</td>
                      <td className="px-4 py-3">
                        <span className="text-[9px] font-black bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded uppercase">{item.page.pageType}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-14 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500" style={{ width: `${item.score}%` }} />
                          </div>
                          <span className="text-xs font-black text-white">{item.score}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[10px] text-slate-500">{item.band.label}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <DeficitIcon deficit={item.deficit} />
                          <span className={`text-[11px] font-black ${item.deficit === 0 ? 'text-emerald-400' : item.deficit < 20 ? 'text-amber-400' : 'text-rose-400'}`}>
                            {item.deficit === 0 ? 'On target' : `-${item.deficit}`}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{item.inbound} / {item.contextualInbound}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 self-start sticky top-4">
            {selectedItem ? (
              <>
                <div>
                  <div className="font-mono text-[11px] text-blue-400">{selectedItem.page.path}</div>
                  <div className="text-3xl font-black text-white mt-1">
                    {selectedItem.score}<span className="text-slate-500 text-base">/100</span>
                  </div>
                  <div className={`text-[11px] font-bold mt-0.5 ${selectedItem.deficit === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {selectedItem.deficit === 0 ? '✓ Within target band' : `↓ ${selectedItem.deficit}pt below expected minimum`}
                  </div>
                </div>

                <div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Authority Profile</div>
                  {[
                    { label: 'Total Inbound Links', val: selectedItem.inbound },
                    { label: 'Contextual Inbound', val: selectedItem.contextualInbound },
                    { label: 'Outbound Links', val: selectedItem.page.linksOut.length },
                    { label: 'Contextual Outbound', val: selectedItem.page.linksOut.filter(l => l.isContextual).length },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex justify-between items-center py-1.5 border-b border-slate-800/50 last:border-0">
                      <span className="text-[11px] text-slate-400">{label}</span>
                      <span className="text-[11px] font-black text-white">{val}</span>
                    </div>
                  ))}
                </div>

                {selectedItem.injectionCandidates.length > 0 && (
                  <div>
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">🎯 Injection Candidates</div>
                    <div className="text-[9px] text-slate-600 mb-2">Pages yang BELUM link ke sini, recommended untuk di-inject:</div>
                    {selectedItem.injectionCandidates.map((c, i) => (
                      <div key={i} className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-2.5 mb-2">
                        <div className="font-mono text-[10px] text-blue-400">{c.path}</div>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[9px] font-black text-slate-500 uppercase">{c.type}</span>
                          <span className="text-[9px] text-slate-600">•</span>
                          <span className="text-[9px] font-black text-blue-300">Authority: {c.score}</span>
                        </div>
                      </div>
                    ))}
                    <div className="text-[9px] text-slate-600 italic mt-2">* Rekomendasi otomatis — validate sebelum implementasi</div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10 text-slate-600">
                <Network size={32} className="mx-auto mb-3 text-slate-800" />
                <div className="text-sm font-bold">Klik baris untuk detail</div>
                <div className="text-[11px] mt-1">Authority profile & injection candidates</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
