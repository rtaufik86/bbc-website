'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Bot, Zap, CheckCircle2, AlertTriangle, Search, Info, Globe, ShieldCheck } from 'lucide-react'
// Signal Engine v1: shared signals attached for AEO / entity / trust
// reference. Existing computeReadyScore() below remains authoritative for
// the per-query citation readiness score.
import { computeAllSignals, toSignalInput } from '../../../lib/seo/signals'
import type { AllSignals } from '../../../lib/seo/signals'

interface AuditPage {
  path: string; pageType: string; title: string; description: string; wordCount: number;
  h1Texts: string[]; h2Texts: string[]; h3Texts: string[];
  schemaTypes: string[]; linksIn: { from: string }[]; inSitemap: boolean; status: string;
  indexability?: string;
}
interface RegistryEntry {
  url: string; cluster: string; queryBank: string[]; entity: string; trustSignals: string[];
}
interface Props {
  auditData: AuditPage[];
  registryEntries: RegistryEntry[];
  queryBankByCluster: Record<string, string[]>;
}

// signals added as 4th param: FAQ + schema now read from Signal Engine.
function computeReadyScore(
  query: string, page: AuditPage, reg: RegistryEntry, signals: AllSignals
): {
  score: number; breakdown: Record<string, number>; missing: string[]
} {
  const q = query.toLowerCase()
  const content = (page.title + ' ' + page.h1Texts.join(' ') + ' ' + page.h2Texts.join(' ') + ' ' + page.h3Texts.join(' ')).toLowerCase()
  const queryTerms = q.split(/\s+/).filter(Boolean).filter(term => term.length > 2)
  const directMatch = queryTerms.some(term => content.includes(term))
  let score = 0
  const breakdown: Record<string, number> = {}
  const missing: string[] = []

  // 25pt: Direct answer block (wordCount > 400 + keyword match)
  const contentOk = page.wordCount >= 400 && directMatch
  breakdown['Direct Content Match'] = contentOk ? 25 : 10
  score += breakdown['Direct Content Match']
  if (!contentOk) missing.push('Halaman terlalu pendek atau keyword utama tidak ada')

  // 20pt: FAQ presence (Signal Engine canonical source)
  const hasFAQ = signals.faq.hasFAQ
  breakdown['FAQ Schema Presence'] = hasFAQ ? 20 : 0
  score += breakdown['FAQ Schema Presence']
  if (!hasFAQ) missing.push('Missing FAQPage schema markup')

  // 15pt: Entity Clarity (H1 match)
  const h1Match = page.h1Texts.some(h => {
    const normalized = h.toLowerCase()
    return queryTerms.some(term => normalized.includes(term))
  })
  breakdown['Entity/H1 Clarity'] = h1Match ? 15 : 5
  score += breakdown['Entity/H1 Clarity']
  if (!h1Match) missing.push('Keyword utama tidak ada di H1')

  // 15pt: Trust signals
  const metaText = (page.title + ' ' + page.description).toLowerCase()
  const hasTrust = reg.trustSignals.some(s => metaText.includes(s.toLowerCase()))
  breakdown['Verifiability (Trust)'] = hasTrust ? 15 : 0
  score += breakdown['Verifiability (Trust)']
  if (!hasTrust) missing.push('Missing trust signals in metadata (location, brand, certs)')

  // 10pt: Schema coverage (Signal Engine schema signal — no raw schemaTypes access)
  const hasOrg = signals.schema.types.some(s => ['Organization', 'LocalBusiness'].includes(s))
  breakdown['Entity Graph Schema'] = hasOrg ? 10 : 0
  score += breakdown['Entity Graph Schema']
  if (!hasOrg) missing.push('Missing Organization/LocalBusiness schema')

  // 10pt: Page Authority (inbound links)
  const linked = page.linksIn.length > 0
  breakdown['Linking Context'] = linked ? 10 : 0
  score += breakdown['Linking Context']
  if (!linked) missing.push('Halaman tidak memiliki inbound link internal')

  // 5pt: Freshness
  const fresh = page.inSitemap
  breakdown['Index Freshness'] = fresh ? 5 : 0
  score += breakdown['Index Freshness']
  if (!fresh) missing.push('Tidak terdaftar di sitemap')

  return { score: Math.min(100, score), breakdown, missing }
}

export default function LLMScannerClient({ auditData, registryEntries, queryBankByCluster }: Props) {
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null)
  
  const allQueries = useMemo(() => {
    return Object.entries(queryBankByCluster).flatMap(([cluster, queries]) => 
      queries.map(q => ({ cluster, query: q }))
    )
  }, [queryBankByCluster])

  const results = useMemo(() => {
    return allQueries.map(({ cluster, query }) => {
      // Find best candidate
      const clusterPages = auditData.filter(p => {
        const r = registryEntries.find(reg => reg.url === p.path)
        return r && r.cluster === cluster && p.indexability !== 'noindex'
      })

      const q = query.toLowerCase()
      const candidates = clusterPages.map(p => {
        let matchScore = 0
        if (p.path.includes(q.replace(/\s+/g, '-'))) matchScore += 40
        if (p.title.toLowerCase().includes(q)) matchScore += 30
        if (p.h1Texts.some(h => h.toLowerCase().includes(q))) matchScore += 20
        return { page: p, matchScore }
      }).sort((a,b) => b.matchScore - a.matchScore)

      const topCandidate = candidates[0]
      const best = topCandidate?.matchScore > 0 ? topCandidate.page : undefined
      const regMatch = best ? registryEntries.find(r => r.url === best.path) : null

      if (!best || !regMatch) return { query, cluster, score: 0, missing: ['No candidate page found'], bestPage: null, signals: undefined as AllSignals | undefined }

      // Signal Engine v1: compute BEFORE computeReadyScore so FAQ + schema
      // signals come from the shared engine (not re-derived from raw schemaTypes).
      const signals = computeAllSignals(toSignalInput(best))
      const { score, missing, breakdown } = computeReadyScore(query, best, regMatch, signals)
      return { query, cluster, score, missing, breakdown, bestPage: best.path, signals }
    }).sort((a,b) => a.score - b.score)
  }, [allQueries, auditData, registryEntries])

  const selectedItem = results.find(r => r.query === selectedQuery)

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-20">
      <div className="border-b border-slate-800 bg-slate-900 px-8 py-5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Link href="/seo-control-center" className="text-slate-500 hover:text-white transition-colors"><ArrowLeft size={16} /></Link>
            <h1 className="text-xl font-black text-white">LLM Presence Scanner</h1>
            <span className="text-[9px] font-black bg-slate-600/30 text-slate-400 border border-slate-500/20 px-2 py-0.5 rounded-full uppercase">Paket C</span>
          </div>
          <p className="text-slate-500 text-xs ml-7">Citation Readiness Simulation. Mengecek seberapa layak halaman kita dijadikan rujukan bagi Answer Engine (AI Search).</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Query Selection */}
          <div className="lg:col-span-4 space-y-3">
             <div className="flex items-center justify-between px-2 mb-2">
                <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Query Readiness List</h2>
                <span className="text-[10px] font-black text-slate-600">{results.length} unique queries</span>
             </div>
             <div className="space-y-2 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                {results.map((r, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedQuery(r.query)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-2 ${selectedQuery === r.query ? 'bg-slate-800 border-slate-700 shadow-xl ring-1 ring-slate-600' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
                  >
                     <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-200 pr-4">{r.query}</span>
                        <div className={`text-xs font-black shrink-0 ${r.score >= 80 ? 'text-emerald-400' : r.score >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                           {r.score}%
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black bg-slate-800 text-slate-500 border border-slate-700 px-1.5 py-0.5 rounded uppercase tracking-tighter">{r.cluster}</span>
                        {r.bestPage && <span className="text-[9px] font-mono text-slate-600 truncate max-w-[150px]">{r.bestPage}</span>}
                     </div>
                  </button>
                ))}
             </div>
          </div>

          {/* Details & Recommendation */}
          <div className="lg:col-span-8 space-y-6">
             {selectedItem ? (
                <>
                   {/* Top Card */}
                   <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                      <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                           <div>
                              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[2px] mb-2 flex items-center gap-2">
                                <Search size={12} className="text-slate-500" /> Target Query Pattern
                              </div>
                              <h3 className="text-3xl font-black text-white tracking-tight leading-tight">&ldquo;{selectedItem.query}&rdquo;</h3>
                           </div>
                           <div className="text-center bg-slate-800 border border-slate-700 p-6 rounded-3xl min-w-[120px]">
                              <div className={`text-5xl font-black mb-1 ${selectedItem.score >= 80 ? 'text-emerald-400' : selectedItem.score >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                                {selectedItem.score}
                              </div>
                              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Readiness Score</div>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-800 pt-8 mt-4">
                           <div className="space-y-6">
                              <div>
                                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 font-mono">
                                    <Globe size={11} className="text-blue-400" /> Citation Candidate
                                 </div>
                                 <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                                    <div className="font-mono text-[11px] text-blue-400 mb-1">{selectedItem.bestPage || 'No candidate'}</div>
                                    <div className="text-[10px] text-slate-500 font-medium italic underline underline-offset-4">
                                       Source candidate for AI citation
                                    </div>
                                 </div>
                              </div>

                              <div>
                                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 font-mono">
                                    <CheckCircle2 size={11} className="text-emerald-400" /> Analysis Breakdown
                                 </div>
                                 <div className="space-y-1">
                                    {selectedItem.breakdown && Object.entries(selectedItem.breakdown).map(([k, v]) => (
                                      <div key={k} className="flex justify-between items-center py-2 px-1 border-b border-slate-800 last:border-0">
                                         <span className="text-[11px] text-slate-400">{k}</span>
                                         <span className={`text-[11px] font-black ${v > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{v}pt</span>
                                      </div>
                                    ))}
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-6">
                              <div>
                                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 font-mono">
                                    <AlertTriangle size={11} className="text-amber-400" /> AEO Readiness Gaps
                                 </div>
                                 <div className="space-y-2">
                                    {selectedItem.missing.map((m, i) => (
                                      <div key={i} className="bg-rose-500/5 border border-rose-500/10 p-3 rounded-xl flex gap-3 text-[11px] text-rose-300">
                                         <span className="text-rose-500 font-black shrink-0 mt-[2px] opacity-60">!</span>
                                         {m}
                                      </div>
                                    ))}
                                    {selectedItem.missing.length === 0 && (
                                      <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl flex gap-3 text-[11px] text-emerald-400 font-bold">
                                         <CheckCircle2 size={12} className="shrink-0 mt-0.5" /> This page is ready for answer extraction.
                                      </div>
                                    )}
                                 </div>
                              </div>

                              <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4">
                                <div className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                   <ShieldCheck size={11} /> Trust Verification
                                </div>
                                <div className="text-[10px] text-slate-400 italic">
                                   LLM merujuk pada brand yang dipercaya. Pastikan Entity Graph metadata tepat agar brand BBC mendapatkan prioritas rujukan untuk query ini.
                                </div>
                              </div>
                           </div>
                        </div>
                      </div>
                   </div>

                   {/* Quick Recommendation Section */}
                   <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Zap className="text-amber-400" size={18} />
                        <h2 className="text-sm font-black text-white">Recommended Strategy for &ldquo;{selectedItem.query}&rdquo;</h2>
                      </div>
                      <div className="space-y-3">
                         <div className="text-[11px] text-slate-400 leading-relaxed">
                            Berdasarkan audit di atas, jika halaman ini ingin muncul sebagai rujukan utama (quote) di ChatGPT/SGE:
                         </div>
                         <ul className="list-disc pl-5 space-y-2 text-[11px] text-slate-300 font-medium">
                            {selectedItem.score < 80 && <li>Tambahkan <strong>Direct Answer block</strong> di 200 kata pertama yang menjawab pertanyaan ini secara spesifik.</li>}
                            {selectedItem.missing.some(m => m.includes('FAQ')) && <li>Inject <strong>FAQ Schema</strong> dengan target query ini sebagai pertanyaannya.</li>}
                            {selectedItem.missing.some(m => m.includes('internal link')) && <li>Cek <strong>Authority Injection Analyzer</strong> dan beri link ke halaman ini dari homepage.</li>}
                            <li>Gunakan pattern <em>&ldquo;[Query] adalah [Definisi] di Jakarta Selatan...&rdquo;</em> untuk mempermudah extraction.</li>
                         </ul>
                      </div>
                   </div>
                </>
             ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-slate-800 rounded-[40px]">
                   <Bot size={48} className="text-slate-800 mb-6" />
                   <h3 className="text-xl font-bold text-slate-600">Select a Query Scanner</h3>
                   <p className="text-slate-500 text-sm max-w-sm mt-2">Pilih query pattern dari daftar di kiri untuk melihat skor kesiapan citation (AEO Readiness).</p>
                </div>
             )}
          </div>
        </div>
      </div>

      <style jsx global>{`
         .custom-scrollbar::-webkit-scrollbar { width: 4px; }
         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
         .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>
    </div>
  )
}
