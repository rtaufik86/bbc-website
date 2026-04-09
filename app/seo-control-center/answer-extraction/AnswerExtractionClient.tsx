'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Copy, Zap, CheckCircle2, XCircle, AlertTriangle, Globe } from 'lucide-react'

interface AuditPage {
  path: string; pageType: string; title: string; description: string; wordCount: number;
  h1Count: number; h1Texts: string[]; h2Count: number; h2Texts: string[]; h3Count: number;
  schemaTypes: string[]; inSitemap: boolean; indexability: string; orphanRisk: boolean;
  linksIn: { from: string }[]; breadcrumb: boolean; status: string; canonical: string;
  firstMoneyLinkBefore300: boolean;
}
interface RegistryEntry {
  url: string; pageType: string; expectedFAQ: boolean; expectedSchema: string[];
  trustSignals: string[]; expectedBehavior: string; expectedContentLength: { min: number; max: number };
}
interface Props { auditData: AuditPage[]; registryEntries: RegistryEntry[] }

const SUMMARY_PATTERNS = ['ringkasan', 'kesimpulan', 'jawaban cepat', 'inti', 'singkatnya', 'poin penting']

function computeAnswerScore(page: AuditPage, reg: RegistryEntry): {
  score: number; breakdown: Record<string, number>; checks: Record<string, boolean>; recommendations: string[]
} {
  let score = 0
  const breakdown: Record<string, number> = {}
  const checks: Record<string, boolean> = {}
  const recommendations: string[] = []

  // 25pt: Direct answer block (wordCount >= min & rich H2 structure)
  const hasDirectAnswer = page.wordCount >= reg.expectedContentLength.min && page.h2Count >= 2
  breakdown['Direct Answer Block'] = hasDirectAnswer ? 25 : page.wordCount >= reg.expectedContentLength.min * 0.7 ? 12 : 0
  checks['Direct Answer Block'] = hasDirectAnswer
  score += breakdown['Direct Answer Block']
  if (!hasDirectAnswer) recommendations.push(`Tambah konten direct answer (min ${reg.expectedContentLength.min} kata, min 2 H2)`)

  // 20pt: FAQ exactness
  const hasFAQ = page.schemaTypes.includes('FAQPage')
  const hasFAQH2 = page.h2Texts.some(h => h.toLowerCase().includes('faq') || h.toLowerCase().includes('pertanyaan'))
  breakdown['FAQ Exactness'] = hasFAQ ? 20 : hasFAQH2 ? 10 : 0
  checks['FAQ Schema'] = hasFAQ
  score += breakdown['FAQ Exactness']
  if (!hasFAQ && reg.expectedFAQ) recommendations.push('Tambah FAQ schema markup (FAQPage)')

  // 15pt: Entity clarity (H1 present and single)
  const h1Good = page.h1Count === 1 && page.h1Texts.length > 0
  breakdown['Entity Clarity (H1)'] = h1Good ? 15 : page.h1Count > 0 ? 7 : 0
  checks['Single H1'] = h1Good
  score += breakdown['Entity Clarity (H1)']
  if (!h1Good) recommendations.push('Pastikan ada tepat 1 H1 yang jelas')

  // 15pt: Trust signals in metadata
  const metaText = (page.title + ' ' + page.description).toLowerCase()
  const trustFound = reg.trustSignals.filter(s => metaText.includes(s.toLowerCase())).length
  breakdown['Trust Signals'] = trustFound >= 2 ? 15 : trustFound === 1 ? 8 : 0
  checks['Trust in Metadata'] = trustFound >= 2
  score += breakdown['Trust Signals']
  if (trustFound < 2) recommendations.push(`Tambah trust signals di title/description (${reg.trustSignals.slice(0,3).join(', ')}...)`)

  // 10pt: Schema coverage
  const hasSchema = page.schemaTypes.length > 0
  const matchesExpected = reg.expectedSchema.some(s => page.schemaTypes.includes(s))
  breakdown['Schema Coverage'] = matchesExpected ? 10 : hasSchema ? 5 : 0
  checks['Has Schema'] = hasSchema
  score += breakdown['Schema Coverage']
  if (!matchesExpected) recommendations.push(`Tambah schema: ${reg.expectedSchema.join(', ')}`)

  // 10pt: Indexable + not orphan
  const wellLinked = !page.orphanRisk && page.linksIn.length > 0
  breakdown['Page Discoverability'] = wellLinked ? 10 : page.indexability === 'index' ? 5 : 0
  checks['Has Inbound Links'] = wellLinked
  score += breakdown['Page Discoverability']
  if (!wellLinked) recommendations.push('Tambah minimal 1 contextual inbound link dari halaman sekluster')

  // 5pt: Freshness markers
  const fresh = page.inSitemap && !!page.canonical
  breakdown['Freshness Markers'] = fresh ? 5 : 0
  checks['In Sitemap + Canonical'] = fresh
  score += breakdown['Freshness Markers']
  if (!fresh) recommendations.push('Pastikan halaman ada di sitemap dan memiliki canonical yang jelas')

  return { score: Math.min(100, score), breakdown, checks, recommendations }
}

export default function AnswerExtractionClient({ auditData, registryEntries }: Props) {
  const [filterMin, setFilterMin] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)

  const pages = useMemo(() => auditData
    .filter(p => p.indexability === 'index')
    .map(page => {
      const reg = registryEntries.find(r => r.url === page.path)
      if (!reg) return null
      const result = computeAnswerScore(page, reg)
      return { page, reg, ...result }
    })
    .filter(Boolean)
    .sort((a, b) => a!.score - b!.score) as NonNullable<ReturnType<typeof computeAnswerScore> & { page: AuditPage; reg: RegistryEntry }>[], [auditData, registryEntries])

  const filtered = pages.filter(p => p.score >= filterMin)
  const selectedItem = filtered.find(i => i.page.path === selected)

  const avgScore = Math.round(pages.reduce((s, p) => s + p.score, 0) / (pages.length || 1))

  const exportCSV = () => {
    const rows = [
      ['Path', 'Score', 'Direct Answer', 'FAQ Schema', 'H1 OK', 'Trust Signals', 'Has Schema', 'Inbound Links', 'Recommendations'].join(','),
      ...filtered.map(i => [
        i.page.path, i.score,
        i.checks['Direct Answer Block'] ? 'Yes' : 'No',
        i.checks['FAQ Schema'] ? 'Yes' : 'No',
        i.checks['Single H1'] ? 'Yes' : 'No',
        i.checks['Trust in Metadata'] ? 'Yes' : 'No',
        i.checks['Has Schema'] ? 'Yes' : 'No',
        i.checks['Has Inbound Links'] ? 'Yes' : 'No',
        `"${i.recommendations.join('; ')}"`
      ].join(','))
    ]
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'answer-extraction.csv'; a.click()
  }

  const copyData = () => {
    const rows = [
      ['Path', 'Score', 'Direct Answer', 'FAQ Schema', 'H1 OK', 'Trust Signals', 'Has Schema', 'Inbound Links', 'Recommendations'].join('\t'),
      ...filtered.map(i => [
        i.page.path, i.score,
        i.checks['Direct Answer Block'] ? 'Yes' : 'No',
        i.checks['FAQ Schema'] ? 'Yes' : 'No',
        i.checks['Single H1'] ? 'Yes' : 'No',
        i.checks['Trust in Metadata'] ? 'Yes' : 'No',
        i.checks['Has Schema'] ? 'Yes' : 'No',
        i.checks['Has Inbound Links'] ? 'Yes' : 'No',
        i.recommendations.join('; ')
      ].join('\t'))
    ]
    navigator.clipboard.writeText(rows.join('\n'))
    alert('Data copied to clipboard (Tab-Separated)')
  }

  const Check = ({ ok }: { ok: boolean }) => ok
    ? <CheckCircle2 size={13} className="text-emerald-400" />
    : <XCircle size={13} className="text-rose-400" />

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <div className="border-b border-slate-800 bg-slate-900 px-8 py-5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Link href="/seo-control-center" className="text-slate-500 hover:text-white transition-colors"><ArrowLeft size={16} /></Link>
            <h1 className="text-xl font-black text-white">Answer Extraction Audit</h1>
            <span className="text-[9px] font-black bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase">Paket A</span>
          </div>
          <p className="text-slate-500 text-xs ml-7">Ukur seberapa siap halaman diambil jawabannya oleh LLM. Answer Extraction Score (0–100).</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-8 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-amber-500/20 to-orange-600/10 border border-amber-500/20 rounded-2xl p-5">
            <div className="text-4xl font-black text-amber-400">{avgScore}</div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Avg Score</div>
          </div>
          {[
            { label: 'Score < 40', value: pages.filter(p => p.score < 40).length, color: 'text-rose-400' },
            { label: 'Has FAQ', value: pages.filter(p => p.checks['FAQ Schema']).length, color: 'text-violet-400' },
            { label: 'Has Trust', value: pages.filter(p => p.checks['Trust in Metadata']).length, color: 'text-emerald-400' },
            { label: 'Has Schema', value: pages.filter(p => p.checks['Has Schema']).length, color: 'text-sky-400' },
          ].map(s => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3">
            <span className="text-slate-500 text-[11px] font-bold">Min Score:</span>
            {[0, 40, 60, 80].map(v => (
              <button key={v} onClick={() => setFilterMin(v)}
                className={`text-[10px] font-black px-3 py-1.5 rounded-lg border transition-colors ${filterMin === v ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-slate-700'}`}>
                {v === 0 ? 'All' : `≥${v}`}
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
          <div className="text-slate-600 text-[11px] font-bold">{filtered.length} pages</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-800">
                  <tr className="text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <th className="px-4 py-3">Path</th>
                    <th className="px-3 py-3 text-center">Direct Ans</th>
                    <th className="px-3 py-3 text-center">FAQ</th>
                    <th className="px-3 py-3 text-center">H1</th>
                    <th className="px-3 py-3 text-center">Trust</th>
                    <th className="px-3 py-3 text-center">Schema</th>
                    <th className="px-4 py-3">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filtered.map(item => (
                    <tr key={item.page.path}
                      onClick={() => setSelected(selected === item.page.path ? null : item.page.path)}
                      className={`cursor-pointer hover:bg-slate-800/50 transition-colors ${selected === item.page.path ? 'bg-slate-800' : ''}`}>
                      <td className="px-4 py-3 font-mono text-[11px] text-amber-400 max-w-[200px] truncate">{item.page.path}</td>
                      <td className="px-3 py-3 text-center"><Check ok={item.checks['Direct Answer Block']} /></td>
                      <td className="px-3 py-3 text-center"><Check ok={item.checks['FAQ Schema']} /></td>
                      <td className="px-3 py-3 text-center"><Check ok={item.checks['Single H1']} /></td>
                      <td className="px-3 py-3 text-center"><Check ok={item.checks['Trust in Metadata']} /></td>
                      <td className="px-3 py-3 text-center"><Check ok={item.checks['Has Schema']} /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-14 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500"
                              style={{ width: `${item.score}%` }} />
                          </div>
                          <span className="text-xs font-black text-white">{item.score}</span>
                        </div>
                      </td>
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
                  <div className="font-mono text-[11px] text-amber-400 mb-1">{selectedItem.page.path}</div>
                  <div className="text-2xl font-black text-white">{selectedItem.score}<span className="text-slate-500 text-base">/100</span></div>
                  <div className="text-slate-500 text-[10px] font-bold uppercase mt-0.5">Answer Extraction Score</div>
                </div>
                <div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Score Breakdown</div>
                  {Object.entries(selectedItem.breakdown).map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-1.5 border-b border-slate-800/50 last:border-0">
                      <span className="text-[10px] text-slate-400">{k}</span>
                      <span className={`text-[10px] font-black ${v > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{v}pt</span>
                    </div>
                  ))}
                </div>
                {selectedItem.recommendations.length > 0 && (
                  <div>
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Recommendations ({selectedItem.recommendations.length})</div>
                    {selectedItem.recommendations.map((r, i) => (
                      <div key={i} className="flex gap-2 text-[11px] text-amber-300 bg-amber-500/5 border border-amber-500/15 rounded-lg p-2 mb-1.5">
                        <Zap size={11} className="text-amber-400 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </div>
                    ))}
                    <div className="text-[9px] text-slate-600 mt-2 italic">* Semua rekomendasi adalah heuristic, bukan fact.</div>
                  </div>
                )}
                <div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Content Stats</div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { label: 'Words', val: selectedItem.page.wordCount },
                      { label: 'H2s', val: selectedItem.page.h2Count },
                      { label: 'Schemas', val: selectedItem.page.schemaTypes.length },
                    ].map(s => (
                      <div key={s.label} className="bg-slate-800 rounded-lg p-2">
                        <div className="text-base font-black text-white">{s.val}</div>
                        <div className="text-[9px] text-slate-500 uppercase">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-10 text-slate-600">
                <Zap size={32} className="mx-auto mb-3 text-slate-800" />
                <div className="text-sm font-bold">Klik baris untuk detail</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
