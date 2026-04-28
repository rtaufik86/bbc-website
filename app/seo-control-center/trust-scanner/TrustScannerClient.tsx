'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck, ShieldAlert, Copy, CheckCircle2, XCircle, Globe, Search, AlertCircle, AlertTriangle } from 'lucide-react'
// Signal Engine v1: shared baseline trust computation used across all
// tools (Decision Engine, Answer Extraction, LLM Scanner, Control Center).
// The Trust Scanner keeps its richer cluster-specific logic (computeTrustScore)
// as the authoritative view for THIS page; the shared `trust` signal is
// attached alongside as the cross-tool canonical reference.
import { computeAllSignals, toSignalInput, computeTrustSignal } from '../../../lib/seo/signals'
import type { AllSignals, TrustSignal as SharedTrustSignal } from '../../../lib/seo/signals'

interface AuditPage {
  path: string; pageType: string; title: string; description: string;
  schemaTypes: string[]; indexability: string; linksOut: { href: string }[];
  linksIn: { from: string }[]; status: string;
  h1Texts?: string[]; h2Texts?: string[]; h3Texts?: string[]; firstParagraph?: string;
}
interface RegistryEntry {
  url: string; pageType: string; cluster: string; entity: string;
  trustSignals: string[]; family: string;
}
interface Props { auditData: AuditPage[]; registryEntries: RegistryEntry[] }

const GLOBAL_TRUST_SIGNALS = [
  { key: 'brand', patterns: ['bintaro business centre', 'BBC', 'bintarobusinesscentre'], label: 'Brand Mention', weight: 20 },
  { key: 'location', patterns: ['jakarta selatan', 'pesanggrahan', 'DKI'], label: 'Location Clarity', weight: 20 },
  { key: 'schema', patterns: [] as string[], label: 'Org/Local Schema', weight: 20, schemaCheck: (s: string[]) => s.some(x => ['Organization', 'LocalBusiness', 'Service'].includes(x)) },
  { key: 'history', patterns: ['2007', 'sejak 2007', 'pt. ganesha', 'ganesha dwipaya'], label: 'History / Legal Entity', weight: 20 },
  { key: 'social', patterns: ['1.800+', '1800', 'klien', 'perusahaan'], label: 'Social Proof', weight: 20 },
]

// Cluster-specific checks
const CLUSTER_CHECKS: Record<string, { pattern: string; label: string }[]> = {
  'virtual-office': [
    { pattern: 'kbli', label: 'KBLI mentioned' },
    { pattern: 'pkp', label: 'PKP context' },
    { pattern: 'domisili', label: 'Domisili mention' },
  ],
  'sewa-kantor': [
    { pattern: 'tol veteran', label: 'Tol Veteran mentioned' },
    { pattern: 'fully furnished', label: 'Fully furnished' },
  ],
  'legal': [
    { pattern: 'notaris', label: 'Notaris mentioned' },
    { pattern: 'akta', label: 'Akta mentioned' },
    { pattern: 'nib', label: 'NIB mentioned' },
  ],
  'trust': [
    { pattern: 'rc veteran', label: 'Address mentioned' },
    { pattern: 'whatsapp', label: 'Contact channel' },
  ],
}

function computeTrustScore(page: AuditPage, reg: RegistryEntry, allLinksOut: string[]): {
  score: number; checks: { label: string; passed: boolean; weight: number }[];
  clusterChecks: { label: string; passed: boolean }[]; missing: string[]
} {
  const trustText = [
    page.title,
    page.description,
    page.h1Texts?.join(' ') || '',
    page.h2Texts?.join(' ') || '',
    page.h3Texts?.join(' ') || '',
    page.firstParagraph || ''
  ].join(' ').toLowerCase()
  const checks = GLOBAL_TRUST_SIGNALS.map(sig => {
    let passed = false
    if (sig.schemaCheck) {
      passed = sig.schemaCheck(page.schemaTypes)
    } else {
        passed = sig.patterns.some(p => trustText.includes(p.toLowerCase()))
    }
    return { label: sig.label, passed, weight: sig.weight }
  })

  const clusterPatterns = CLUSTER_CHECKS[reg.cluster] || []
  const clusterChecks = clusterPatterns.map(cp => ({
    label: cp.label,
    passed: trustText.includes(cp.pattern.toLowerCase())
  }))

  // Global checks contribute 80% of score when cluster checks exist, 100% otherwise
  const globalScore = checks.reduce((s, c) => s + (c.passed ? c.weight : 0), 0)
  const clusterPassed = clusterChecks.filter(c => c.passed).length
  const clusterScore = clusterChecks.length > 0
    ? Math.round((clusterPassed / clusterChecks.length) * 20)
    : 0
  const score = clusterChecks.length > 0
    ? Math.round(globalScore * 0.8) + clusterScore
    : globalScore

  const missing = [
    ...checks.filter(c => !c.passed).map(c => c.label),
    ...clusterChecks.filter(c => !c.passed).map(c => c.label),
  ]

  return { score: Math.min(100, score), checks, clusterChecks, missing }
}

function getScoreColor(score: number) {
  if (score >= 80) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' }
  if (score >= 55) return { text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' }
  return { text: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' }
}

export default function TrustScannerClient({ auditData, registryEntries }: Props) {
  const [filterCluster, setFilterCluster] = useState('all')
  const [selected, setSelected] = useState<string | null>(null)

  const pages = useMemo(() => {
    const allLinksOut = auditData.flatMap(p => p.linksOut.map(l => l.href))
    return auditData
      .filter(p => p.indexability === 'index')
      .map(page => {
        const reg = registryEntries.find(r => r.url === page.path)
        if (!reg) return null
        const result = computeTrustScore(page, reg, allLinksOut)
        // Signal Engine v1: cross-tool canonical trust baseline + full
        // signal bundle. Exposed alongside the richer cluster-specific
        // `result` above; not substituted for it in this phase.
        const signalInput = toSignalInput(page)
        const sharedTrust: SharedTrustSignal = computeTrustSignal(signalInput)
        const signals: AllSignals = computeAllSignals(signalInput)
        return { page, reg, ...result, sharedTrust, signals }
      })
      .filter(Boolean)
      .sort((a, b) => a!.score - b!.score) as NonNullable<ReturnType<typeof computeTrustScore> & { page: AuditPage; reg: RegistryEntry; sharedTrust: SharedTrustSignal; signals: AllSignals }>[]
  }, [auditData, registryEntries])

  const clusters = ['all', ...Array.from(new Set(pages.map(p => p.reg.cluster)))]
  const filtered = pages.filter(p => filterCluster === 'all' || p.reg.cluster === filterCluster)
  const selectedItem = filtered.find(i => i.page.path === selected)
  const avgScore = Math.round(pages.reduce((s, p) => s + p.score, 0) / (pages.length || 1))

  const exportCSV = () => {
    const clusterLabels = Array.from(new Set(filtered.flatMap(i => i.clusterChecks.map(c => c.label))))
    const rows = [
      ['Path', 'Cluster', 'Score', 'Brand', 'Location', 'OrgSchema', 'History', 'SocialProof', ...clusterLabels, 'Missing'].join(','),
      ...filtered.map(i => [
        i.page.path, i.reg.cluster, i.score,
        ...i.checks.map(c => c.passed ? 'Yes' : 'No'),
        ...clusterLabels.map(label => i.clusterChecks.find(c => c.label === label)?.passed ? 'Yes' : 'No'),
        `"${i.missing.join('; ')}"`
      ].join(','))
    ]
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'trust-scanner.csv'; a.click()
  }

  const copyData = () => {
    const clusterLabels = Array.from(new Set(filtered.flatMap(i => i.clusterChecks.map(c => c.label))))
    const rows = [
      ['Path', 'Cluster', 'Score', 'Brand', 'Location', 'OrgSchema', 'History', 'SocialProof', ...clusterLabels, 'Missing'].join('\t'),
      ...filtered.map(i => [
        i.page.path, i.reg.cluster, i.score,
        ...i.checks.map(c => c.passed ? 'Yes' : 'No'),
        ...clusterLabels.map(label => i.clusterChecks.find(c => c.label === label)?.passed ? 'Yes' : 'No'),
        i.missing.join('; ')
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
            <h1 className="text-xl font-black text-white">Trust Signal Scanner</h1>
            <span className="text-[9px] font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">Paket A</span>
          </div>
          <p className="text-slate-500 text-xs ml-7">Ukur konsistensi trust signals (brand, lokasi, history, schema) per halaman. Trust & Verifiability Score (0–100).</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-8 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-600/10 border border-emerald-500/20 rounded-2xl p-5">
            <div className="text-4xl font-black text-emerald-400">{avgScore}</div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Avg Trust Score</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="text-3xl font-black text-emerald-400">{pages.filter(p => p.score >= 80).length}</div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">High Trust (≥80)</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="text-3xl font-black text-amber-400">{pages.filter(p => p.score >= 40 && p.score < 80).length}</div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Medium (40–79)</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="text-3xl font-black text-rose-400">{pages.filter(p => p.score < 40).length}</div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Low Trust (&lt;40)</div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex gap-3 items-center flex-wrap">
          <span className="text-slate-500 text-[11px] font-bold">Cluster:</span>
          {clusters.map(c => (
            <button key={c} onClick={() => setFilterCluster(c)}
              className={`text-[10px] font-black px-3 py-1.5 rounded-lg border transition-colors capitalize ${filterCluster === c ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-slate-700'}`}>
              {c}
            </button>
          ))}
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
                    <th className="px-3 py-3 text-center">Brand</th>
                    <th className="px-3 py-3 text-center">Location</th>
                    <th className="px-3 py-3 text-center">Org/Local Schema</th>
                    <th className="px-3 py-3 text-center">History</th>
                    <th className="px-3 py-3 text-center">Social</th>
                    <th className="px-4 py-3">Trust Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filtered.map(item => {
                    const { text } = getScoreColor(item.score)
                    return (
                      <tr key={item.page.path}
                        onClick={() => setSelected(selected === item.page.path ? null : item.page.path)}
                        className={`cursor-pointer hover:bg-slate-800/50 transition-colors ${selected === item.page.path ? 'bg-slate-800' : ''}`}>
                        <td className="px-4 py-3 font-mono text-[11px] text-emerald-400 max-w-[200px] truncate">{item.page.path}</td>
                        {item.checks.map(c => (
                          <td key={c.label} className="px-3 py-3 text-center"><Check ok={c.passed} /></td>
                        ))}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                              <div className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500" style={{ width: `${item.score}%` }} />
                            </div>
                            <span className={`text-xs font-black ${text}`}>{item.score}</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 self-start sticky top-4">
            {selectedItem ? (
              <>
                <div className="flex items-start gap-3">
                  {selectedItem.score >= 80
                    ? <ShieldCheck size={20} className="text-emerald-400 shrink-0 mt-1" />
                    : <ShieldAlert size={20} className="text-rose-400 shrink-0 mt-1" />}
                  <div>
                    <div className="font-mono text-[11px] text-emerald-400">{selectedItem.page.path}</div>
                    <div className={`text-3xl font-black mt-1 ${getScoreColor(selectedItem.score).text}`}>
                      {selectedItem.score}<span className="text-slate-500 text-base">/100</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Global Trust Checks</div>
                  {selectedItem.checks.map((c, i) => (
                    <div key={i} className={`flex items-center justify-between py-2 border-b border-slate-800/50 last:border-0`}>
                      <div className="flex items-center gap-2">
                        <Check ok={c.passed} />
                        <span className="text-[11px] text-slate-400">{c.label}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-600">{c.weight}pt</span>
                    </div>
                  ))}
                </div>

                {selectedItem.clusterChecks.length > 0 && (
                  <div>
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Cluster-Specific ({selectedItem.reg.cluster})</div>
                    {selectedItem.clusterChecks.map((c, i) => (
                      <div key={i} className="flex items-center gap-2 py-1.5">
                        <Check ok={c.passed} />
                        <span className="text-[11px] text-slate-400">{c.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {selectedItem.missing.length > 0 && (
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-3">
                    <div className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-2">Missing Trust Signals</div>
                    {selectedItem.missing.map((m, i) => (
                      <div key={i} className="text-[11px] text-rose-300 flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 rounded-full bg-rose-500" />
                        {m} — tambahkan ke title atau meta description
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10 text-slate-600">
                <ShieldCheck size={32} className="mx-auto mb-3 text-slate-800" />
                <div className="text-sm font-bold">Klik baris untuk detail</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
