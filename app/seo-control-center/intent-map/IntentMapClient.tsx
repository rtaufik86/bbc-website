'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Map, CheckCircle2, AlertTriangle, XCircle, Search, HelpCircle } from 'lucide-react'

interface AuditPage {
  path: string; pageType: string; title: string; description: string;
  h1Texts: string[]; h2Texts: string[]; h3Texts: string[];
}
interface RegistryEntry {
  url: string; cluster: string; queryBank: string[]; entity: string;
}
interface Props {
  auditData: AuditPage[];
  registryEntries: RegistryEntry[];
  queryBankByCluster: Record<string, string[]>;
}

type CoverageStatus = 'Excellent' | 'Good' | 'Weak' | 'Missing'

function getCoverageStatus(query: string, pagesInCluster: { page: AuditPage, reg: RegistryEntry }[]): {
  status: CoverageStatus; bestMatch?: string; reason: string 
} {
  const q = query.toLowerCase()
  
  // Find candidates
  const candidates = pagesInCluster.map(p => {
    let score = 0
    const content = (p.page.title + ' ' + p.page.h1Texts.join(' ') + ' ' + p.page.h2Texts.join(' ')).toLowerCase()
    
    if (p.page.path.toLowerCase().includes(q.replace(/\s+/g, '-'))) score += 40
    if (p.page.title.toLowerCase().includes(q)) score += 30
    if (p.page.h1Texts.some(h => h.toLowerCase().includes(q))) score += 20
    if (p.page.h2Texts.some(h => h.toLowerCase().includes(q))) score += 10
    
    return { path: p.page.path, score }
  }).filter(c => c.score > 0).sort((a, b) => b.score - a.score)

  if (candidates.length === 0) return { status: 'Missing', reason: 'Tidak ada halaman yang mengandung keyword ini' }
  
  const top = candidates[0]
  if (top.score >= 70) return { status: 'Excellent', bestMatch: top.path, reason: 'Keyword ditemukan di URL/Title/H1' }
  if (top.score >= 40) return { status: 'Good', bestMatch: top.path, reason: 'Keyword ditemukan di Title atau H1' }
  return { status: 'Weak', bestMatch: top.path, reason: 'Hanya partial match di body/H2 atau subheadings' }
}

export default function IntentMapClient({ auditData, registryEntries, queryBankByCluster }: Props) {
  const [filterCluster, setFilterCluster] = useState('all')

  const mapData = useMemo(() => {
    const results: any[] = []
    
    Object.entries(queryBankByCluster).forEach(([cluster, queries]) => {
      const pagesInCluster = auditData
        .map(p => ({ page: p, reg: registryEntries.find(r => r.url === p.path)! }))
        .filter(p => p.reg && p.reg.cluster === cluster)

      queries.forEach(query => {
        const coverage = getCoverageStatus(query, pagesInCluster)
        results.push({ cluster, query, ...coverage })
      })
    })
    
    return results
  }, [auditData, registryEntries, queryBankByCluster])

  const filtered = mapData.filter(d => filterCluster === 'all' || d.cluster === filterCluster)
  
  const stats = {
    Excellent: filtered.filter(d => d.status === 'Excellent').length,
    Good: filtered.filter(d => d.status === 'Good').length,
    Weak: filtered.filter(d => d.status === 'Weak').length,
    Missing: filtered.filter(d => d.status === 'Missing').length,
  }

  const statusStyle: Record<CoverageStatus, string> = {
    Excellent: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Good: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Weak: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Missing: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <div className="border-b border-slate-800 bg-slate-900 px-8 py-5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Link href="/seo-control-center" className="text-slate-500 hover:text-white transition-colors"><ArrowLeft size={16} /></Link>
            <h1 className="text-xl font-black text-white">Intent Coverage Map</h1>
            <span className="text-[9px] font-black bg-rose-500/15 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-full uppercase">Paket C</span>
          </div>
          <p className="text-slate-500 text-xs ml-7">Matrix Intent → Page Coverage. Identifikasi gap antara query yang diinginkan vs realita konten.</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-8 space-y-8">
        {/* Heatmap Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(['Excellent', 'Good', 'Weak', 'Missing'] as CoverageStatus[]).map(status => (
            <div key={status} className={`p-5 rounded-2xl border ${statusStyle[status]}`}>
              <div className="text-4xl font-black">{stats[status]}</div>
              <div className="text-[10px] font-black uppercase tracking-widest mt-1">{status} Coverage</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 w-fit">
          {['all', ...Object.keys(queryBankByCluster)].map(c => (
            <button key={c} onClick={() => setFilterCluster(c)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${filterCluster === c ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Coverage Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 border-b border-slate-800">
              <tr className="text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <th className="px-6 py-4">Intent Query</th>
                <th className="px-6 py-4">Cluster</th>
                <th className="px-6 py-4">Best Candidate Page</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Reasoning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filtered.map((item, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${item.status === 'Excellent' ? 'bg-emerald-500' : item.status === 'Good' ? 'bg-blue-500' : item.status === 'Weak' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                      <span className="font-bold text-slate-200">{item.query}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">{item.cluster}</td>
                  <td className="px-6 py-4">
                    {item.bestMatch ? (
                      <Link href={item.bestMatch} target="_blank" className="font-mono text-[11px] text-rose-400 hover:underline">
                        {item.bestMatch}
                      </Link>
                    ) : (
                      <span className="text-slate-600 italic text-[11px]">No candidate</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest ${statusStyle[item.status as CoverageStatus]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Missing Intent Strategy */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="text-amber-400" size={20} />
            <h2 className="text-sm font-black text-white">Missing Intent Strategy</h2>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed mb-4">
            Daftar di bawah ini adalah query yang tidak memiliki kecocokan konten sama sekali. Anda sebaiknya mempertimbangkan membuat halaman pendukung (Weapon) untuk query ini:
          </p>
          <div className="flex flex-wrap gap-2">
            {filtered.filter(d => d.status === 'Missing').map((m, i) => (
              <span key={i} className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-[11px] font-medium border border-slate-700">
                {m.query}
              </span>
            ))}
            {filtered.filter(d => d.status === 'Missing').length === 0 && (
              <span className="text-emerald-400 text-xs font-bold font-mono">ALL QUERIES IN BANK ARE COVERED. EXCELLENT WORK.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
