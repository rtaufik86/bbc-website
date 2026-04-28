'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, ArrowLeft, Copy, Sliders, CheckCircle2, XCircle, Globe } from 'lucide-react'
// Signal Engine v1: H1 and schema checks now derived from shared signals.
// Contextual Inbound removed from CrawlAudit scope (belongs to Authority
// Analyzer). CrawlAudit is now a pure technical gate: sitemap, H1, meta,
// schema.
import { computeAllSignals } from '../../../lib/seo/signals'

interface PageAudit {
  path: string; pageType: string; indexability: string; inSitemap: boolean;
  h1Count: number; description: string; schemaTypes: string[]; linksIn: any[];
}
interface Props { auditData: PageAudit[] }

export default function CrawlAuditClient({ auditData }: Props) {
  const [search, setSearch] = useState('')
  const [filterIndex, setFilterIndex] = useState('all')

  const processed = useMemo(() => {
    return auditData.map(p => {
      // Build a minimal SignalInput from the CrawlAudit page shape.
      // h1Texts is synthesized from h1Count (CrawlAudit stores a count, not
      // an array) so the Signal Engine receives the correct H1 count.
      const signals = computeAllSignals({
        url: p.path,
        pageType: p.pageType,
        h1Texts: Array.from({ length: p.h1Count }, (_, i) => `h1-${i}`),
        h2Texts: [],
        bodyText: '',
        linksOut: [],
        linksIn: p.linksIn || [],
        wordCount: 0,
        schemaTypes: p.schemaTypes,
        hasFAQSchema: p.schemaTypes.includes('FAQPage'),
        description: p.description,
        indexability: p.indexability,
      })

      // Technical gate checks. Contextual Inbound is intentionally excluded
      // (it is a linking signal, not a crawl signal -- handled by Authority
      // Analyzer). H1 and Schema are now Signal Engine derived.
      const checks = {
        'In Sitemap':       p.inSitemap,
        'H1 Logic':         signals.h1.count === 1,
        'Meta Description': !!p.description && p.description.length > 30,
        'Schema Presence':  signals.schema.hasSchema,
      }
      const issues = Object.entries(checks).filter(([_, ok]) => !ok).map(([k]) => k)
      // 4 checks x 25pt each = 100 max, 0 min.
      const score = Math.max(0, 100 - (issues.length * 25))
      return { page: p, checks, issues, score }
    })
  }, [auditData])

  const filtered = processed.filter(i => {
    const matchesSearch = i.page.path.toLowerCase().includes(search.toLowerCase())
    const matchesIndex = filterIndex === 'all' || i.page.indexability === filterIndex
    return matchesSearch && matchesIndex
  }).sort((a, b) => a.score - b.score)

  const indexableProcessed = useMemo(
    () => processed.filter(i => i.page.indexability === 'index' && i.page.pageType !== 'utility'),
    [processed]
  )

  const exportCSV = () => {
    const rows = [
      ['Path', 'Indexability', 'Issues'].join(','),
      ...filtered.map(i => [i.page.path, i.page.indexability, `"${i.issues.join('; ')}"`].join(','))
    ]
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'crawl-audit.csv'; a.click()
  }

  const copyData = () => {
    const rows = [
      ['Path', 'Indexability', 'In Sitemap', 'H1 OK', 'Desc OK', 'Schema OK', 'Issues'].join('\t'),
      ...filtered.map(i => [
        i.page.path, i.page.indexability,
        i.checks['In Sitemap']       ? 'Yes' : 'No',
        i.checks['H1 Logic']         ? 'Yes' : 'No',
        i.checks['Meta Description'] ? 'Yes' : 'No',
        i.checks['Schema Presence']  ? 'Yes' : 'No',
        i.issues.join('; ')
      ].join('\t'))
    ]
    navigator.clipboard.writeText(rows.join('\n'))
    alert('Data copied to clipboard (Tab-Separated)')
  }

  const Check = ({ ok }: { ok: boolean }) => ok
    ? <CheckCircle2 size={12} className="text-emerald-400 mx-auto" />
    : <XCircle size={12} className="text-rose-400 mx-auto" />

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <div className="border-b border-slate-800 bg-slate-900 px-8 py-5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Link href="/seo-control-center" className="text-slate-500 hover:text-white transition-colors"><ArrowLeft size={16} /></Link>
            <h1 className="text-xl font-black text-white">Crawl & Indexability Audit</h1>
            <span className="text-[9px] font-black bg-blue-500/15 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full uppercase">Paket B</span>
          </div>
          <p className="text-slate-500 text-xs ml-7">Technical monitor untuk sitemap, H1, meta description, dan schema health. Linking signals ada di Authority Analyzer.</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-3xl font-black text-white">{indexableProcessed.length}</div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Total Pages</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-3xl font-black text-rose-400">{indexableProcessed.filter(i => i.issues.length > 2).length}</div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Critical Issues</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-3xl font-black text-amber-400">{indexableProcessed.filter(i => !i.checks['In Sitemap']).length}</div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Missing Sitemap</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-3xl font-black text-sky-400">{indexableProcessed.filter(i => !i.checks['Schema Presence']).length}</div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Missing Schema</div>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search path..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm" />
          </div>
          <div className="flex gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {['all', 'index', 'noindex'].map(idx => (
              <button key={idx} onClick={() => setFilterIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${filterIndex === idx ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-400'}`}>
                {idx}
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

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 border-b border-slate-800">
               <tr className="text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Page Path</th>
                  <th className="px-4 py-4 text-center">Sitemap</th>
                  <th className="px-4 py-4 text-center">H1</th>
                  <th className="px-4 py-4 text-center">Meta</th>
                  <th className="px-4 py-4 text-center">Schema</th>
                  <th className="px-6 py-4 text-center">Status</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
               {filtered.map(i => (
                 <tr key={i.page.path} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-300">{i.page.path}</td>
                    <td className="px-4 py-4"><Check ok={i.checks['In Sitemap']} /></td>
                    <td className="px-4 py-4"><Check ok={i.checks['H1 Logic']} /></td>
                    <td className="px-4 py-4"><Check ok={i.checks['Meta Description']} /></td>
                    <td className="px-4 py-4"><Check ok={i.checks['Schema Presence']} /></td>
                    <td className="px-6 py-4 text-center">
                       <span className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase tracking-tighter ${i.score >= 75 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : i.score >= 50 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                          {i.score}%
                       </span>
                    </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
