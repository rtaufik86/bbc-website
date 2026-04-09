'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { 
  Search, ArrowLeft, Copy, Globe, AlertCircle, AlertTriangle, 
  CheckCircle2, XCircle, Info, Zap, Layout, Target, ShieldCheck, BarChart3,
  Activity, ShieldAlert, Cpu
} from 'lucide-react'

// --- FINAL POLISH CONSTANTS v2.4.3 ---
const INFORMATIONAL_TRIGGERS = ['panduan', 'cara', 'apa itu', 'tutorial', 'pengertian', 'tips', 'mengapa', 'manfaat']
const TRANSACTIONAL_TRIGGERS = ['sewa sekarang', 'pesan', 'harga langsung', 'pilih paket', 'daftar sekarang']
const CONVERSION_ELEMENTS = ['whatsapp', 'hubungi', 'konsultasi', 'booking', 'form', 'sewa virtual']
const UTILITY_PATHS = ['/forgot-password', '/login', '/signup', '/auth', '/admin', '/reset-password', '/404']
const TRUST_TRIGGERS = ['tentang', 'klien', 'testimoni', 'misi', 'visi', 'legalitas', 'profil']

type Severity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Pass'
type PageType = 'homepage' | 'money' | 'weapon' | 'hub' | 'support' | 'utility'
type IssueCategory = 'Technical' | 'Structural' | 'Intent' | 'Overlap' | 'Metadata'
type H1Status = 'Strong Match' | 'Acceptable Match' | 'Drift' | 'Missing'
type IntentLabel = 'distribution' | 'transactional' | 'informational' | 'navigational' | 'trust'

interface AuditPage { path: string; pageType: string; title: string; description: string; h1Texts: string[]; h2Texts: string[]; h3Texts: string[]; firstParagraph?: string; }
interface RegistryEntry { url: string; cluster: string; queryBank: string[]; entity: string; angle: string; intent: string; family: string; }
interface ComponentScore { label: string; score: number; max: number; }
interface V2AuditResult { url: string; pageType: PageType; cluster: string; score: number; severity: Severity; confidence: 'High' | 'Medium' | 'Low'; h1Status: H1Status; isTechnicalBlocker: boolean; registry: { entity: string; angle: string; intent: string; family: string }; actual: { h1: string; title: string; intentLabel: IntentLabel; conversionSignals: string[] }; overlap: { score: number; with: string; reasons: string[]; isHomepageOverlap: boolean }; scoreBreakdown: ComponentScore[]; issues: { category: IssueCategory; text: string }[]; recommendations: string[]; }

function computeV2Audit(page: AuditPage, reg: RegistryEntry, allAudits: {page: AuditPage, reg: RegistryEntry}[]): V2AuditResult {
  const issues: { category: IssueCategory; text: string }[] = []
  const recommendations: string[] = []
  const breakdown: ComponentScore[] = []
  const h1 = page.h1Texts[0] || ''; const h1Lower = h1.toLowerCase()
  const title = page.title.toLowerCase(); const contentBody = ((page.h2Texts.join(' ')) + ' ' + (page.h3Texts.join(' ')) + ' ' + (page.firstParagraph || '')).toLowerCase()
  
  // 0. Page Type & Utility Cleanup
  let activeType: PageType = (page.pageType as PageType) || 'utility'
  if (page.path === '/') activeType = 'homepage'
  if (UTILITY_PATHS.some(u => page.path.startsWith(u))) activeType = 'utility'

  // 1. Technical Blocker Recognition
  const isTechnicalBlocker = h1 === ''
  let currentH1Status: H1Status = 'Drift'; let h1Score = 0

  if (isTechnicalBlocker) { 
    currentH1Status = 'Missing'; h1Score = -50; 
    issues.push({ category: 'Technical', text: 'BLOCKER: No H1 FOUND' }); 
    recommendations.push('fix_rendering_pipeline', 'add_h1') 
  } else {
     const coreKeywords = reg.entity.toLowerCase().split(' ').filter(w => w.length > 3)
     const matchedTokens = coreKeywords.filter(k => h1Lower.includes(k))
     const coverage = matchedTokens.length / coreKeywords.length
     if (coreKeywords.every(k => h1Lower.includes(k))) { currentH1Status = 'Strong Match'; h1Score = 20 } 
     else if (coverage >= 0.5 || (activeType === 'support' && TRUST_TRIGGERS.some(s => h1Lower.includes(s)))) { currentH1Status = 'Acceptable Match'; h1Score = 18 } 
     else { currentH1Status = 'Drift'; h1Score = 5; issues.push({ category: 'Structural', text: 'H1 Drift' }); recommendations.push((activeType === 'support' || activeType === 'hub') ? 'soft_rewrite_h1' : 'hard_rewrite_h1') }
  }
  breakdown.push({ label: 'Header Structure (H1)', score: h1Score, max: 20 })

  // 2. Normalized Intent Intelligence (v2.4.3 Final Standard)
  const signals = CONVERSION_ELEMENTS.filter(s => (title + ' ' + h1Lower + ' ' + contentBody).includes(s)); 
  const transacWords = TRANSACTIONAL_TRIGGERS.some(k => (title + ' ' + h1Lower).includes(k)); 
  const trustSignals = TRUST_TRIGGERS.some(s => (title + ' ' + h1Lower).includes(s));

  let actualIntent: IntentLabel = 'informational'
  if (activeType === 'homepage') actualIntent = 'distribution'
  else if (activeType === 'support' || trustSignals) actualIntent = 'trust'
  else if (activeType === 'hub') actualIntent = 'navigational'
  else if (signals.length >= 2 || transacWords) actualIntent = 'transactional'
  
  let intentMatch = true
  if (activeType === 'money' && actualIntent !== 'transactional') intentMatch = false
  if (activeType === 'weapon' && actualIntent === 'transactional' && signals.length > 3) intentMatch = false
  const intentPts = intentMatch ? 20 : (activeType === 'money' ? 0 : 12)
  breakdown.push({ label: 'Behavior Alignment (Intent)', score: intentPts, max: 20 })

  // 3. Overlap Explanation (Expanded Drivers)
  let overlapScore = 0; let overlapWith = ''; let isHomepageOverlap = false; const overlapReasons: string[] = []
  if (activeType !== 'utility' && !isTechnicalBlocker) {
     allAudits.forEach(target => {
        if (target.page.path === page.path || UTILITY_PATHS.some(u => target.page.path.startsWith(u))) return
        let sim = 0; const otherH1 = (target.page.h1Texts[0] || '').toLowerCase()
        if (h1Lower && otherH1) { const w1 = h1Lower.split(' ').filter(x => x.length > 3); const w2 = otherH1.split(' ').filter(x => x.length > 3); const intersect = w1.filter(x => w2.includes(x)); const union = new Set([...w1, ...w2]); if (union.size > 0) sim += (intersect.length / union.size) * 55 }
        
        const h2_1 = new Set(page.h2Texts.map(h => h.toLowerCase())); const h2_2 = new Set(target.page.h2Texts.map(h => h.toLowerCase())); 
        const sharedH2 = [...h2_1].filter(h => h2_2.has(h)); if (sharedH2.length > 0) sim += Math.min(40, sharedH2.length * 15)
        
        const h3_1 = new Set(page.h3Texts.map(h => h.toLowerCase())); const h3_2 = new Set(target.page.h3Texts.map(h => h.toLowerCase()));
        const sharedH3 = [...h3_1].filter(h => h3_2.has(h)); if (sharedH3.length > 0) sim += Math.min(10, sharedH3.length * 5)

        let mult = target.reg.cluster === reg.cluster ? 1.5 : target.reg.family === reg.family ? 1.2 : 0.4
        if (target.page.path === '/') mult *= 0.5 // Final Homepage Polish

        const final = Math.round(Math.min(95, sim * mult))
        if (final > overlapScore) { 
           overlapScore = final; overlapWith = target.page.path; isHomepageOverlap = (target.page.path === '/');
           if (sharedH2.length > 0) overlapReasons.push('Heading Map Overlap'); 
           if (sharedH3.length > 0) overlapReasons.push('FAQ Pattern Overlap');
           if (sim > 25) overlapReasons.push('Shared Entity Keywords');
           if (page.firstParagraph && target.page.firstParagraph && page.firstParagraph.substring(0, 40) === target.page.firstParagraph.substring(0, 40)) { overlapReasons.push('Shared Intro Sentence'); }
        }
     })
  }

  const overlapPenalty = (isHomepageOverlap || activeType === 'homepage') ? 0 : (overlapScore > 60 ? -35 : overlapScore > 40 ? -20 : overlapScore > 25 ? -10 : 0)
  breakdown.push({ label: 'Collision Penalty (Gated)', score: overlapPenalty, max: 0 })
  if (overlapScore > 45 && !isHomepageOverlap && activeType !== 'homepage') { issues.push({ category: 'Overlap', text: 'Severe Collision Risk' }); recommendations.push('differentiate_angle', 'refactor_intro') }
  const complianceScore = (activeType === 'money' && actualIntent === 'transactional') ? 20 : 15
  breakdown.push({ label: 'Governance Adherence', score: complianceScore, max: 20 }); const metaPts = (page.description && page.description.length > 60) ? 20 : 0; breakdown.push({ label: 'Surface Metadata', score: metaPts, max: 20 })
  const totalScore = Math.max(0, breakdown.reduce((acc, b) => acc + b.score, 0))
  let severity: Severity = 'Pass'
  if (isTechnicalBlocker) severity = 'Critical'
  else if (activeType === 'money' && !intentMatch) severity = 'Critical'
  else if (overlapScore > 60 && !isHomepageOverlap) severity = 'Critical'
  else if (overlapScore > 40 && !isHomepageOverlap) severity = 'High'
  else if (!intentMatch && activeType !== 'support') severity = 'High'
  else if (currentH1Status === 'Drift') severity = 'Medium'
  else if (totalScore < 85) severity = 'Low'

  return { url: page.path, pageType: activeType, cluster: reg.cluster, score: totalScore, severity, confidence: h1 !== '' ? 'High' : 'Medium', h1Status: currentH1Status, isTechnicalBlocker, registry: { entity: reg.entity, angle: reg.angle, intent: reg.intent, family: reg.family }, actual: { h1, title: page.title, intentLabel: actualIntent, conversionSignals: signals }, overlap: { score: overlapScore, with: overlapWith, reasons: [...new Set(overlapReasons)], isHomepageOverlap }, scoreBreakdown: breakdown, issues: issues.slice(0, 4), recommendations: [...new Set(recommendations)] }
}

export default function EntityAuditClient({ auditData, registryEntries }: { auditData: AuditPage[], registryEntries: RegistryEntry[] }) {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null)
  const [filterSeverity, setFilterSeverity] = useState<string>('all')
  const [filterCluster, setFilterCluster] = useState<string>('all')

  const results = useMemo(() => {
    // Unique Data Integrity
    const rMap = new Map<string, AuditPage>()
    auditData.forEach(p => rMap.set(p.path, p))
    const uniquePages = Array.from(rMap.values())

    const dataWithReg = uniquePages.map(p => ({ page: p, reg: registryEntries.find(r => r.url === p.path) || { url: p.path, cluster: 'Global', queryBank: [], entity: '', angle: '', intent: '', family: '' } }))
    return dataWithReg.map(item => computeV2Audit(item.page, item.reg, dataWithReg)).filter(r => r.pageType !== 'utility' && (r.registry.entity || r.url === '/'))
      .sort((a,b) => { const sev: Record<Severity, number> = { Critical: 0, High: 1, Medium: 2, Low: 3, Pass: 4 }; if (sev[a.severity] !== sev[b.severity]) return sev[a.severity] - sev[b.severity]; return a.score - b.score })
  }, [auditData, registryEntries])

  const stats = useMemo(() => {
    const s: Record<string, any> = {}; results.forEach(r => { if (!s[r.cluster]) s[r.cluster] = { name: r.cluster, count: 0, sum: 0, crit: 0 }; s[r.cluster].count++; s[r.cluster].sum += r.score; if (r.severity === 'Critical') s[r.cluster].crit++ }); return Object.values(s)
  }, [results])

  const filtered = results.filter(r => (filterSeverity === 'all' || r.severity === filterSeverity) && (filterCluster === 'all' || r.cluster === filterCluster))
  const selectedItem = results.find(r => r.url === selectedUrl)

  const copyData = () => {
    const headers = ['URL', 'Type', 'Cluster', 'Severity', 'Score', 'H1 Status', 'Intent Label', 'Collision %', 'Collision With', 'Collision Drivers', 'Action Fix'].join('\t')
    const rows = filtered.map(r => [
      r.url, r.pageType, r.cluster, r.isTechnicalBlocker ? 'Technical Blocker' : r.severity, r.score, r.h1Status, r.actual.intentLabel, r.overlap.score, r.overlap.with, r.overlap.reasons.join(', '), r.recommendations.join('; ')
    ].join('\t'))
    navigator.clipboard.writeText([headers, ...rows].join('\n')); alert('Final Polish v2.4.3 Data Copied')
  }

  const sStyle: Record<Severity, string> = { Critical: 'bg-rose-500/15 text-rose-500 border-rose-500/30 font-black', High: 'bg-orange-500/15 text-orange-400 border-orange-500/30 font-black', Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30 font-black', Low: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-black', Pass: 'bg-emerald-500/10 text-emerald-500 border-transparent' }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans p-6 pb-20">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between bg-slate-900/60 p-5 rounded-[28px] border border-slate-800 mb-8 backdrop-blur-md">
         <div className="flex items-center gap-4">
            <Link href="/seo-control-center" className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-sky-400 transition-all"><ArrowLeft size={18} /></Link>
            <div>
               <h1 className="text-lg font-black tracking-tight uppercase">Audit Engine <span className="text-sky-500">v2.4.3</span></h1>
               <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black opacity-60">Final Polish Standard</p>
            </div>
         </div>
         <button onClick={copyData} className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-6 py-2.5 rounded-xl text-[11px] font-black tracking-widest shadow-xl">
           <Copy size={14} /> Copy Master Data
         </button>
      </div>

      <div className="max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
         {stats.map(s => (
           <div key={s.name} onClick={() => setFilterCluster(s.name)} className={`bg-slate-900/40 border ${filterCluster === s.name ? 'border-sky-500 shadow-sky-500/10' : 'border-slate-800'} rounded-3xl p-5 cursor-pointer hover:bg-slate-800/40 transition-all relative overflow-hidden group`}>
              <div className="flex justify-between items-start mb-2 relative z-10">
                 <span className="text-[10px] font-black text-slate-500 uppercase px-2 py-1 bg-slate-800/50 rounded">{s.name}</span>
                 {s.crit > 0 && <AlertCircle size={14} className="text-rose-500 animate-pulse" />}
              </div>
              <div className="text-3xl font-black text-white tabular-nums mb-3 tracking-tighter">{Math.round(s.sum/s.count)}</div>
              <div className="text-[9px] text-slate-400 font-bold uppercase flex justify-between uppercase">
                 <span>{s.count} Node</span>
                 {s.crit > 0 && <span className="text-rose-500">{s.crit} Critical</span>}
              </div>
           </div>
         ))}
      </div>

      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-4">
            <div className="flex gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl w-fit shadow-inner">
               {['all', 'Critical', 'High', 'Medium', 'Pass'].map(sev => (
                  <button key={sev} onClick={() => setFilterSeverity(sev)} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${filterSeverity === sev ? 'bg-slate-700 text-white shadow' : 'text-slate-500'}`}>{sev}</button>
               ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
               <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/40 border-b border-slate-800/50 uppercase text-[9px] font-black text-slate-500 tracking-widest font-mono">
                     <tr>
                        <th className="px-6 py-4">Silo Path node</th>
                        <th className="px-4 py-4">Severity</th>
                        <th className="px-4 py-4">Collision</th>
                        <th className="px-6 py-4 text-center">Score</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                     {filtered.map(r => (
                        <tr key={r.url} onClick={() => setSelectedUrl(r.url)} className={`cursor-pointer transition-all ${selectedUrl === r.url ? 'bg-sky-500/10' : 'hover:bg-slate-800/30'}`}>
                           <td className="px-6 py-5">
                              <div className="font-mono text-[10px] text-slate-300 truncate max-w-[280px] uppercase mb-1 leading-none">{r.url}</div>
                              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border border-slate-700 uppercase tracking-tighter text-slate-500`}>{r.pageType}</span>
                           </td>
                           <td className="px-4 py-5">
                              {r.isTechnicalBlocker ? <span className="text-rose-500 font-black uppercase text-[8px] bg-rose-500/5 px-2 py-1 rounded border border-rose-500/10">Blocker</span> : <span className={`text-[9px] font-black px-2 py-1 rounded-full border tracking-widest uppercase ${sStyle[r.severity]}`}>{r.severity}</span>}
                           </td>
                           <td className="px-4 py-5 font-mono text-[10px] font-black tabular-nums">
                              {r.overlap.isHomepageOverlap && r.url !== '/' ? <span className="text-sky-500 uppercase italic">distribution</span> : <span className={r.overlap.score > 40 ? 'text-rose-500' : 'text-slate-400'}>{r.overlap.score}%</span>}
                           </td>
                           <td className="px-6 py-5 text-center text-lg font-black tabular-nums tracking-tighter">
                              <span className={r.score >= 85 ? 'text-emerald-400' : r.score >= 60 ? 'text-amber-400' : 'text-rose-400'}>{r.score}</span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         <div className="lg:col-span-4 sticky top-6 self-start">
            {selectedItem ? (
               <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-right-4">
                  <div className="relative z-10 flex flex-col items-center text-center mb-8">
                     <div className="text-[9px] font-black text-slate-500 uppercase tracking-[5px] mb-4">Integrity Detail v2.4.3</div>
                     <h4 className="text-2xl font-black text-white leading-tight uppercase tracking-tight mb-2 break-all">{selectedItem.url.split('/').pop() || 'BBC HOME'}</h4>
                     <div className="text-[10px] font-black px-4 py-1.5 bg-slate-800 rounded-full text-slate-500 border border-slate-700 uppercase tracking-widest">{selectedItem.cluster} Silo</div>
                  </div>

                  <div className="space-y-6">
                     <div className="p-5 bg-slate-950 rounded-3xl border border-slate-800 flex items-center justify-center gap-8 shadow-inner">
                        <div className="text-center">
                           <div className="text-4xl font-black text-white tabular-nums leading-none mb-1">{selectedItem.score}</div>
                           <div className="text-[8px] text-slate-600 font-bold uppercase tracking-widest leading-none">Health Rating</div>
                        </div>
                        <div className="w-[1px] h-10 bg-slate-800" />
                        <div className="text-center">
                           <div className="text-[13px] font-black text-sky-400 uppercase leading-none mb-1">{selectedItem.h1Status}</div>
                           <div className="text-[8px] text-slate-600 font-bold uppercase tracking-widest leading-none">H1 Mode</div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800/50">
                           <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-4">Governance Intelligence</div>
                           <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                 <Activity size={12} className="text-sky-500" />
                                 <span className="text-[10px] font-bold text-slate-300">Intent Mode: <span className="uppercase text-sky-400 italic">{selectedItem.actual.intentLabel}</span></span>
                              </div>
                              {selectedItem.overlap.score > 0 && (
                                 <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
                                    <div className="flex items-center justify-between mb-2">
                                       <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest flex items-center gap-2 italic">Collision ({selectedItem.overlap.score}%)</span>
                                       {selectedItem.overlap.isHomepageOverlap && <span className="text-[8px] text-sky-500 font-black uppercase italic underline">distribution</span>}
                                    </div>
                                    <div className="text-[10px] text-slate-500 font-mono italic mb-3">With: {selectedItem.overlap.with}</div>
                                    <div className="space-y-1.5 opacity-80">
                                       {selectedItem.overlap.reasons.map((r, i) => (
                                          <div key={i} className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-2">
                                             <div className="w-1.5 h-1.5 rounded-full bg-rose-500/40" /> {r}
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              )}
                           </div>
                        </div>

                        {selectedItem.issues.length > 0 && (
                           <div className="bg-rose-500/5 p-5 rounded-3xl border border-rose-500/10 shadow-inner">
                              <div className="text-[8px] font-black text-rose-500 uppercase tracking-widest mb-3 italic">Stability Blocker Alert</div>
                              {selectedItem.issues.map((iss, i) => (
                                 <div key={i} className="text-[10px] text-slate-300 font-medium mb-1.5 flex items-start gap-2">
                                    <span className="text-red-500 mt-1 shrink-0">•</span> {iss.text}
                                 </div>
                              ))}
                           </div>
                        )}

                        <div className="pt-4 flex flex-wrap gap-2.5">
                           {selectedItem.recommendations.map(r => (
                              <span key={r} className="px-4 py-2.5 bg-sky-600 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-sky-500 transition-all cursor-pointer shadow-lg active:scale-95">
                                 {r.replace(/_/g, ' ')}
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-[40px] p-24 flex flex-col items-center justify-center text-center opacity-30">
                  <Zap size={44} className="text-slate-800 mb-6" />
                  <div className="text-[10px] font-black text-slate-600 uppercase tracking-[4px] italic">Select node for<br/>Gorevernance Scan</div>
               </div>
            )}
         </div>
      </div>
    </div>
  )
}
