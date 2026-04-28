'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Zap, ShieldCheck, Bot, Cpu, AlertCircle,
  CheckCircle2, Clock, PlayCircle, Filter, Search,
  Terminal, ChevronRight, BarChart3, Target, Copy, Trash2, ExternalLink, FileText
} from 'lucide-react'
// Signal Engine v1: centralized SEO signals (FAQ, H1, link, trust, schema,
// entity, AEO). Attached alongside existing Decision fields. Legacy scoring
// and action logic below remain authoritative for this phase.
import { computeAllSignals, toSignalInput } from '../../../lib/seo/signals'
import type { AllSignals } from '../../../lib/seo/signals'
// Intelligence Layer v1: impact scoring, priority derivation, opportunity
// detection, and action optimization derived from Signal Engine outputs.
import {
  computeIntelligence,
  optimizeActions,
  sequenceActions,
} from '../../../lib/seo/intelligence'
import type { IntelligenceOutput } from '../../../lib/seo/intelligence'

// --- TYPES ---

type ActionType = 'FIX' | 'REWRITE' | 'INJECT' | 'KILL'
type Priority = 'P0' | 'P1' | 'P2' | 'P3'
type Owner = 'GPT' | 'Claude' | 'Dev' | 'GPT + Dev'
type Status = 'NEEDS_ACTION' | 'IN_PROGRESS' | 'COMPLETED'

interface Action {
  type: ActionType
  priority: Priority
  owner: Owner
  reason?: string
  instruction?: {
    details: string
    targets?: string[]
    wordCount?: number
    links?: { from: string; to: string; anchor: string; placement: string }[]
    strategy?: string
    reason?: string
    overlap_with?: string
    new_angle?: string
    target_links?: string[]
    anchors?: { type: string; text: string }[]
  }
  // Intelligence Layer: execution sequencer tags added by sequenceActions()
  executionOrder?: number
  executionStep?:  number
}

interface Decision {
  uid: string
  url: string
  type: string
  issues: string[]
  actions: Action[]
  status: Status
  wordCount: number
  lastUpdated: string
  authority: {
    score: number
    target: number
    gap: number
  }
  isOverlapping?: boolean
  h1Texts: string[]
  h2Texts: string[]
  h3Texts: string[]
  linksInCount: number
  linksOutCount: number
  strategies: string[]
  validation: {
    structure: 'PASS' | 'WARNING' | 'FAIL'
    linking: 'PASS' | 'WARNING' | 'FAIL'
    aeo: 'PASS' | 'WARNING' | 'FAIL'
    overall: 'PASS' | 'WARNING' | 'FAIL'
  }
  introText?: string
  faqs?: Array<{ q: string, a: string }>
  governanceViolations?: string[]
  anchorDistribution?: Record<string, number>
  semanticGraph?: {
    primaryEntity: string
    entities: string[]
    relationships: string[]
    coverage: number
  }
  // Signal Engine v1 snapshot. Optional during Phase 1 rollout so that
  // older call-sites that construct Decision objects by hand still compile.
  signals?: AllSignals
  // Intelligence Layer v1: impact band, derived priority, opportunities,
  // and confidence score computed from Signal Engine outputs.
  intelligence?: IntelligenceOutput
}

interface AuditPage {
  path: string; pageType: string; indexability: string; title: string;
  wordCount: number; h1Count: number; schemaTypes: string[];
  inSitemap: boolean; orphanRisk: boolean; breadcrumb: boolean;
  linksIn: { from: string; anchor: string }[];
  linksOut: { href: string; anchor: string; isContextual: boolean; isMoneyPage: boolean }[];
  status: string; description: string;
  expectedFAQ?: boolean;
  h1Texts?: string[];
  h2Texts?: string[];
  h3Texts?: string[];
  introText?: string;
  faqs?: Array<{ q: string, a: string }>;
  governanceViolations?: string[];
  anchorDistribution?: Record<string, number>;
  semanticGraph?: {
    primaryEntity: string;
    entities: string[];
    relationships: string[];
    coverage: number;
  };
}

interface Props {
  auditData: AuditPage[]
}

// --- COLOR SYSTEM ---

const PRIORITY_COLORS: Record<Priority, string> = {
  P0: 'bg-rose-500 text-white',
  P1: 'bg-orange-500 text-white',
  P2: 'bg-amber-400 text-black',
  P3: 'bg-slate-500 text-white'
}

const ACTION_COLORS: Record<ActionType, string> = {
  FIX: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  REWRITE: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  INJECT: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  KILL: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
}

const STATUS_UI: Record<Status, { icon: any, class: string }> = {
  NEEDS_ACTION: { icon: Clock, class: 'bg-slate-800 text-slate-400 border-slate-700' },
  IN_PROGRESS: { icon: PlayCircle, class: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  COMPLETED: { icon: CheckCircle2, class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' }
}

// --- SILO DEFINITIONS ---
const SILO_MAP = {
  'sewa-kantor': {
    targetMoney: '/sewa-kantor',
    hub: '/sewa-kantor/jakarta-selatan',
    siblings: ['/harga-sewa-kantor-bintaro', '/sewa-kantor/bintaro'],
    anchors: [
      { type: 'service_location', text: 'Sewa Kantor Jakarta Selatan' },
      { type: 'brand_service', text: 'Sewa Kantor Bintaro Business Centre' },
      { type: 'generic', text: 'Lihat Paket Sewa Kantor' },
      { type: 'descriptive', text: 'ruang kantor siap pakai dengan fasilitas lengkap' }
    ]
  },
  'virtual-office': {
    targetMoney: '/virtual-office',
    hub: '/virtual-office/jakarta-selatan',
    siblings: ['/harga-virtual-office', '/virtual-office/alamat-bisnis-jakarta-selatan'],
    anchors: [
      { type: 'service_location', text: 'Virtual Office Jakarta Selatan' },
      { type: 'brand_service', text: 'Virtual Office BBC' },
      { type: 'generic', text: 'Daftar Paket Virtual Office' },
      { type: 'descriptive', text: 'alamat bisnis legal untuk domisili perusahaan' }
    ]
  },
  'legal': {
    targetMoney: '/pendirian-pt',
    hub: '/pendirian-pt-jakarta-selatan',
    siblings: ['/legal/pt-perorangan', '/izin-usaha'],
    anchors: [
      { type: 'service_location', text: 'Pendirian PT Jakarta Selatan' },
      { type: 'brand_service', text: 'Jasa Legalitas BBC' },
      { type: 'generic', text: 'Konsultasi Perizinan' },
      { type: 'descriptive', text: 'pembuatan akta perusahaan dan NIB cepat' }
    ]
  }
}

export default function DecisionEngineClient({ auditData }: Props) {
  const [filter, setFilter] = useState<string>('')
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'ALL'>('ALL')
  const [pageTypeFilter, setPageTypeFilter] = useState<string | 'ALL'>('ALL')
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set()) // Actually tracks UIDs now
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null)
  const [verifying, setVerifying] = useState<string | null>(null)
  const [verifyResults, setVerifyResults] = useState<Record<string, any>>({})
  const [statusOverrides, setStatusOverrides] = useState<Record<string, Status>>({})
  const [copiedPrompt, setCopiedPrompt] = useState(false)

  const decisions: Decision[] = useMemo(() => {
    return auditData.map((p, index) => {
      const issues: string[] = []
      const actions: Action[] = []
      const uid = `${p.path}-${index}`

      // --- SIGNAL ENGINE v1 (shared, read-only) ---
      // Computed alongside the legacy decision pipeline. Downstream UI /
      // Phase 2 logic should prefer these centralized signals over
      // re-deriving FAQ / H1 / trust / link primitives locally.
      const signals = computeAllSignals(toSignalInput(p))

      // --- 2.2 SILO DETECTION ---
      // Use path-boundary-aware checks so that paths like "/lokasi-kantor"
      // do NOT accidentally get classified into the "sewa-kantor" silo.
      // Match only explicit silo prefixes / segment boundaries.
      const currentSilo: keyof typeof SILO_MAP | null =
        p.path.includes('/virtual-office') ? 'virtual-office' :
        p.path.includes('/sewa-kantor') ? 'sewa-kantor' :
        (p.path.includes('/legal') ||
         p.path.startsWith('/pt-') ||
         p.path.startsWith('/cv-') ||
         p.path === '/pt' ||
         p.path === '/cv' ||
         p.path.includes('/pendirian-pt') ||
         p.path.includes('/pendirian-cv')) ? 'legal' :
        null  // support/trust/utility pages have no silo
      const siloData = currentSilo ? SILO_MAP[currentSilo] : null

      // --- 2.2 SIGNALS ---
      const strength = Math.min(100, (p.linksIn.length / 12) * 100)
      const targetThreshold = p.pageType === 'money' ? 90 : p.pageType === 'hub' ? 70 : 40
      const gap = targetThreshold - strength
      
      const indexStatus = !p.inSitemap ? 'discovered' : p.linksIn.length < 2 ? 'crawled_not_indexed' : 'indexed'
      
      const overlaps = auditData.filter(x => x.path !== p.path && x.title === p.title && x.pageType === p.pageType)
      const overlapWith = overlaps.length > 0 ? overlaps[0].path : undefined
      const isDuplicate = overlaps.length > 0
      
      // --- 2.2 CORE ISSUE DETECTION (TRANSPARENT LAYER) ---
      if (isDuplicate) issues.push('angle_overlap')
      if (p.wordCount < 800) issues.push('thin_content')
      // Only flag missing FAQ if the registry explicitly expects it (expectedFAQ !== false).
      // Signal Engine is now the single source for FAQ presence.
      if (!signals.faq.hasFAQ && p.pageType === 'weapon' && p.expectedFAQ !== false) issues.push('no_faq')
      if (strength < targetThreshold) issues.push('authority_gap')
      if (p.linksIn.length === 0) issues.push('orphan_risk')
      if (p.h1Count === 0) issues.push('no_h1')
      // Signal Engine link signal: no need to re-iterate linksOut manually.
      if (p.pageType === 'weapon' && signals.link.moneyLinks === 0) issues.push('missing_money_link')

      // --- INTELLIGENCE LAYER v1 ---
      // Must run AFTER all issue detection so priorityEngine receives the
      // complete issues array. Impact and priority are derived from signals
      // + issues; opportunities + confidence from signals alone.
      const intelligence = computeIntelligence(signals, {
        pageType:     p.pageType,
        issues,
        authorityGap: Math.round(gap),
        rawPage:      p,
      })

      // --- 2.2 ACTION MAPPING (BALANCED LAYER) ---

      // A. KILL & CLEANUP (P0)
      if (isDuplicate && strength < 25 && p.linksIn.length < 2) {
        actions.push({
          type: 'KILL', priority: 'P0', owner: 'Dev',
          instruction: { 
            details: 'Redundant Intent - Low Authority duplicate.',
            strategy: '301_REDIRECT',
            overlap_with: overlapWith
          }
        })
      }

      // B. OVERLAP RESOLUTION
      if (isDuplicate && !actions.some(a => a.type === 'KILL')) {
         const overlapPage = auditData.find(x => x.path === overlapWith)
         let strategy = 'ANGLE_DIFFERENTIATION'
         if (overlapPage?.pageType === 'hub') strategy = 'REPOSITION_ANGLE'
         
         actions.push({
           type: 'REWRITE', priority: intelligence.priority.value, owner: 'Claude',
           instruction: {
             details: `Contextual intent conflict with ${overlapWith}`,
             strategy,
             overlap_with: overlapWith,
             new_angle: currentSilo === 'virtual-office' ? 'Behavioral UX & Legal Address focus' : currentSilo === 'sewa-kantor' ? 'Operational Efficiency & Bintaro Proximity' : 'Page Differentiation & Angle Clarity',
             wordCount: 1500,
             targets: ['Add Direct Answer', 'Differentiate Intro']
           }
         })
      }

      // C. CONTENT QUALITY (REWRITE)
      if (issues.includes('thin_content') || issues.includes('no_faq')) {
        actions.push({
          type: 'REWRITE', priority: intelligence.priority.value, owner: 'Claude',
          instruction: {
            details: `AEO Quality Fix: ${issues.filter(i => ['thin_content', 'no_faq'].includes(i)).join(', ')}`,
            targets: [
              'Add Direct Answer (200 words at start)',
              'First internal link placement < 300 words',
              'Reinforce localized entity: Jakarta Selatan, Bintaro',
              'Expand FAQ to 3-4 entries with FAQ Schema'
            ],
            wordCount: 1500
          }
        })
      }

      // D. LINK INJECTION (INJECT)
      if ((issues.includes('authority_gap') || issues.includes('orphan_risk') || issues.includes('missing_money_link')) && siloData) {
        const primaryAnchor = siloData.anchors.find(a => a.type === 'service_location')?.text || 'Global Target'
        
        // Remove self-linking bug
        const targetLinks = [siloData.targetMoney, siloData.hub, ...siloData.siblings].filter(link => link !== p.path)
        
        actions.push({
          type: 'INJECT', priority: intelligence.priority.value, owner: 'GPT + Dev',
          instruction: {
            details: `Silo Authority Sync (${currentSilo})`,
            reason: issues.filter(i => ['authority_gap', 'orphan_risk', 'missing_money_link'].includes(i)).join(', '),
            target_links: targetLinks,
            anchors: siloData.anchors,
            links: [
              { from: siloData.hub, to: p.path, anchor: primaryAnchor, placement: 'intro (100-300 words)' },
              { from: siloData.targetMoney, to: p.path, anchor: siloData.anchors.find(a => a.type === 'brand_service')?.text || primaryAnchor, placement: 'CTA section' }
            ]
          }
        })
      }

      // E. INFRASTRUCTURE (FIX)
      if (issues.includes('no_h1') || !p.inSitemap) {
        actions.push({
          type: 'FIX', priority: 'P0', owner: 'Dev',
          instruction: { details: 'Technical Blockers', targets: ['Fix H1', 'Add to Sitemap'] }
        })
      }

      // F. PRIORITY OVERRIDE — removed.
      // Intelligence Layer's priorityEngine handles the "critical authority +
      // not indexed → P0" rule via impact.band === 'critical', so the manual
      // forEach override is no longer needed and has been replaced.

      // --- 2.4 STRATEGY FIELD ---
      const strategies: string[] = []
      if (issues.includes('authority_gap')) strategies.push("Authority Injection")
      if (issues.includes('no_faq') || issues.includes('thin_content')) strategies.push("AEO Enhancement")
      if (issues.includes('angle_overlap')) strategies.push("Angle Differentiation")
      if (issues.includes('orphan_risk')) strategies.push("Internal Linking Fix")

      // --- 2.4 VALIDATION SYSTEM ---
      let structureVal: 'PASS' | 'WARNING' | 'FAIL' = 'PASS'
      let linkingVal: 'PASS' | 'WARNING' | 'FAIL' = 'PASS'
      let aeoVal: 'PASS' | 'WARNING' | 'FAIL' = 'PASS'

      // Structure Check
      const h2Count = (p as any).h2Count || 0
      if (p.h1Count !== 1) structureVal = 'FAIL'
      else if (h2Count < 3 || h2Count > 6) structureVal = 'WARNING'

      // Link Check
      if (p.linksOut.length < 3) linkingVal = 'FAIL'
      else if (!(p as any).firstMoneyLinkBefore300) linkingVal = 'WARNING'

      // AEO Check: uses Signal Engine FAQ signal (single source of truth).
      if (p.pageType === 'weapon' && !signals.faq.hasFAQ) aeoVal = 'FAIL'

      // Overall
      let overallVal: 'PASS' | 'WARNING' | 'FAIL' = 'PASS'
      const hasFail = structureVal === 'FAIL' || linkingVal === 'FAIL' || aeoVal === 'FAIL'
      const hasWarning = (structureVal as string) === 'WARNING' || (linkingVal as string) === 'WARNING' || (aeoVal as string) === 'WARNING'
      
      if (hasFail) overallVal = 'FAIL'
      else if (hasWarning) overallVal = 'WARNING'

      return {
        uid,
        url: p.path,
        type: p.pageType,
        issues: Array.from(new Set(issues)),
        // Intelligence Layer: deduplicate + cap at 3 actions, then sort into
        // canonical execution order (KILL → FIX → INJECT → REWRITE).
        actions: sequenceActions(optimizeActions(actions)),
        status: (issues.length > 0) ? 'NEEDS_ACTION' : 'COMPLETED',
        wordCount: p.wordCount,
        lastUpdated: '2026-04-09',
        authority: { score: Math.round(strength), target: targetThreshold, gap: Math.round(gap) },
        isOverlapping: isDuplicate,
        h1Texts: p.h1Texts || [],
        h2Texts: p.h2Texts || [],
        h3Texts: p.h3Texts || [],
        linksInCount: p.linksIn.length,
        linksOutCount: p.linksOut.length,
        strategies: strategies.length > 0 ? strategies : ['N/A'],
        validation: {
          structure: structureVal,
          linking: linkingVal,
          aeo: aeoVal,
          overall: overallVal
        },
        introText: p.introText,
        faqs: p.faqs,
        governanceViolations: p.governanceViolations,
        anchorDistribution: p.anchorDistribution,
        semanticGraph: p.semanticGraph,
        signals,
        intelligence,
      }
    })
  }, [auditData])

  const filteredDecisions = useMemo(() => {
    return decisions.filter(d => {
      const matchesText = d.url.toLowerCase().includes(filter.toLowerCase())
      const matchesPriority = priorityFilter === 'ALL' || d.actions.some(a => a.priority === priorityFilter)
      const matchesType = pageTypeFilter === 'ALL' || d.type === pageTypeFilter
      return matchesText && matchesPriority && matchesType
    })
  }, [decisions, filter, priorityFilter, pageTypeFilter])

  const stats = useMemo(() => {
     const p0 = decisions.filter(d => d.actions.some(a => a.priority === 'P0')).length
     const p1 = decisions.filter(d => d.actions.some(a => a.priority === 'P1')).length
     const needsAction = decisions.filter(d => d.status === 'NEEDS_ACTION').length
     return { p0, p1, needsAction, total: decisions.length }
  }, [decisions])

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUrls(new Set(filteredDecisions.map(d => d.uid)))
    } else {
      setSelectedUrls(new Set())
    }
  }

  const toggleSelect = (uid: string) => {
    const next = new Set(selectedUrls)
    if (next.has(uid)) next.delete(uid)
    else next.add(uid)
    setSelectedUrls(next)
  }

  const handleVerifyDeploy = async (url: string) => {
    setVerifying(url)
    try {
      const res = await fetch(`/api/seo/verify-deploy?url=${encodeURIComponent(url)}`)
      const data = await res.json()
      setVerifyResults(prev => ({ ...prev, [url]: data }))
    } catch (err) {
      console.error('Verify failed', err)
      setVerifyResults(prev => ({ ...prev, [url]: { status: 'ERROR', error: 'Service Unavailable' } }))
    } finally {
      setVerifying(null)
    }
  }

  const handleCopyExecutionPrompt = (d: Decision) => {
    const sorted = [...d.actions].sort((a, b) => {
      const priorityOrder: Record<string, number> = { P0: 0, P1: 1, P2: 2, P3: 3 }
      const typeOrder: Record<ActionType, number> = { FIX: 0, KILL: 1, INJECT: 2, REWRITE: 3 }
      const priorityDelta = (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9)
      if (priorityDelta !== 0) return priorityDelta
      return (typeOrder[a.type] ?? 9) - (typeOrder[b.type] ?? 9)
    })
    const lines: string[] = [
      `# BBC SEO Execution Prompt`,
      `## Page: ${d.url}  |  Type: ${d.type}  |  Issues: ${d.issues.join(', ')}`,
      `## Authority: ${d.authority.score}/${d.authority.target} (gap ${d.authority.gap})`,
      ``
    ]
    sorted.forEach(a => {
      lines.push(`### [${a.type} | ${a.priority}] -- FOR ${a.owner}`)
      if (a.instruction?.details) lines.push(`**Task:** ${a.instruction.details}`)
      if (a.instruction?.strategy) lines.push(`**Strategy:** ${a.instruction.strategy}`)
      if (a.instruction?.wordCount) lines.push(`**Word Count Target:** ${a.instruction.wordCount}`)
      if (a.instruction?.targets?.length) {
        lines.push(`**Targets:**`)
        a.instruction.targets.forEach(t => lines.push(`  - ${t}`))
      }
      if (a.instruction?.links?.length) {
        lines.push(`**Link Injections:**`)
        a.instruction.links.forEach(l => lines.push(`  - [${l.placement}] ${l.from} -> ${l.to} | anchor: "${l.anchor}"`))
      }
      lines.push(``)
    })
    lines.push(`---`)
    lines.push(`Generated by BBC SEO Control Center | ${new Date().toLocaleDateString()}`)
    navigator.clipboard.writeText(lines.join('\n'))
    setCopiedPrompt(true)
    setTimeout(() => setCopiedPrompt(false), 2500)
  }

  const handlePushToInProgress = (d: Decision) => {
    setStatusOverrides(prev => ({ ...prev, [d.uid]: 'IN_PROGRESS' }))
    setSelectedDecision(prev => prev ? { ...prev, status: 'IN_PROGRESS' } : prev)
  }

  const handleCopyData = () => {
    const selectedDecisions = decisions.filter(d => selectedUrls.has(d.uid))
    
    let combinedText = ""
    
    selectedDecisions.forEach((d, idx) => {
      // 1. JSON part
      const jsonStr = JSON.stringify(d, null, 2)
      
      // 2. FULL HTML REPORT part
      const issuesHtml = d.issues.map(i => `
        <span style="background: #fef2f2; color: #991b1b; padding: 2px 8px; border-radius: 4px; border: 1px solid #fee2e2; margin-right: 4px; font-size: 10px; font-weight: 700;">#${i.replace('_', ' ')}</span>
      `).join('')

      const tasksHtml = d.actions.map(a => {
        let extraDetails = ""
        
        if (a.instruction?.targets) {
          extraDetails += `<div style="margin-top: 6px; padding-left: 10px; border-left: 2px solid #e2e8f0; font-size: 11px; color: #64748b;">
            <strong style="color: #475569;">Target Points:</strong> ${a.instruction.targets.join(', ')}
          </div>`
        }

        if (a.instruction?.target_links) {
          extraDetails += `<div style="margin-top: 6px; padding-left: 10px; border-left: 2px solid #e2e8f0; font-size: 11px; color: #64748b;">
            <strong style="color: #475569;">Link Registry:</strong> ${a.instruction.target_links.join(', ')}
          </div>`
        }

        if (a.instruction?.anchors) {
          const anchorsList = a.instruction.anchors.map(anc => `<span style="font-style: italic;">"${anc.text}" (${anc.type})</span>`).join(', ')
          extraDetails += `<div style="margin-top: 6px; padding-left: 10px; border-left: 2px solid #e2e8f0; font-size: 11px; color: #64748b;">
            <strong style="color: #475569;">Distributed Anchors:</strong> ${anchorsList}
          </div>`
        }

        if (a.instruction?.links) {
          const meshList = a.instruction.links.map((l, j) => `
            <div style="margin-top: 4px; padding: 8px; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 6px;">
               <div style="font-size: 10px; font-weight: 800; color: #10b981; text-transform: uppercase;">[Inject ${j+1}] ${l.placement}</div>
               <div style="font-family: monospace; font-size: 11px; margin-top: 2px;">
                 <span style="color: #64748b;">FROM</span> ${l.from} <span style="color: #64748b;">TO</span> ${l.to}
                 <br><span style="color: #475569; font-weight: bold;">ANCHOR:</span> "${l.anchor}"
               </div>
            </div>
          `).join('')
          extraDetails += `<div style="margin-top: 10px;">
            <strong style="font-size: 10px; text-transform: uppercase; color: #475569;">Multi-Source Injection Mesh:</strong>
            ${meshList}
          </div>`
        }

        return `
          <div style="margin-bottom: 20px; padding: 15px; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 12px; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);">
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
               <span style="background: #ef4444; color: #ffffff; font-size: 9px; font-weight: 900; padding: 2px 6px; border-radius: 4px;">${a.priority}</span>
               <span style="font-size: 11px; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">${a.type} — ${a.owner}</span>
            </div>
            <div style="font-size: 13px; color: #334155; font-weight: 600; line-height: 1.4;">${a.instruction?.details || ''}</div>
            ${extraDetails}
          </div>
        `
      }).join('')
      
      const strategy = d.actions.find(a => a.instruction?.strategy)?.instruction?.strategy || 'N/A'
      
      const h1Html = d.h1Texts.length > 0 ? d.h1Texts.map(t => `<div style="color: #0f172a; font-weight: 700; margin-bottom: 4px;">${t}</div>`).join('') : '<div style="color: #94a3b8; font-style: italic;">No H1 detected</div>'
      const h2Html = d.h2Texts.length > 0 ? d.h2Texts.map(t => `<div style="color: #334155; margin-bottom: 4px;">• ${t}</div>`).join('') : '<div style="color: #94a3b8; font-style: italic;">No H2 detected</div>'
      const h3Html = d.h3Texts.length > 0 ? d.h3Texts.map(t => `<div style="color: #64748b; font-size: 11px; margin-bottom: 2px;">- ${t}</div>`).join('') : '<div style="color: #94a3b8; font-style: italic; font-size: 11px;">No H3 detected</div>'

      const getValColor = (v: string) => v === 'PASS' ? '#10b981' : v === 'WARNING' ? '#f59e0b' : '#ef4444'

      const fullHtmlReport = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155; max-width: 800px; margin: 20px auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 24px;">
    <div>
      <h2 style="margin: 0; color: #0f172a; font-size: 20px; font-weight: 900; letter-spacing: -0.025em; text-transform: uppercase;">BBC SEO Execution Ticket</h2>
      <div style="margin-top: 6px; font-size: 12px; font-family: ui-monospace, monospace; color: #64748b;">ID: ${d.uid}</div>
    </div>
    <div style="text-align: right;">
      <span style="font-size: 10px; font-weight: 900; color: #ffffff; background: #0f172a; padding: 4px 12px; border-radius: 6px; text-transform: uppercase;">v2.4 Autonomous Layer</span>
      <div style="margin-top: 6px; font-size: 11px; font-weight: 700; color: #94a3b8;">${new Date().toLocaleDateString()}</div>
    </div>
  </div>
  
  <div style="margin-bottom: 30px;">
    <div style="font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">Diagnostic Evidence:</div>
    <div style="margin-bottom: 12px; font-size: 16px; color: #0f172a; font-weight: 800; font-family: ui-monospace, monospace; word-break: break-all;">${d.url}</div>
    <div style="margin-bottom: 15px;">${issuesHtml}</div>
    <div style="display: flex; gap: 20px; padding: 15px; background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px;">
      <div>
        <div style="font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase;">Page Type</div>
        <div style="font-size: 12px; font-weight: 800; color: #0f172a; text-transform: uppercase;">${d.type}</div>
      </div>
      <div style="border-left: 1px solid #e2e8f0; padding-left: 20px;">
        <div style="font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase;">Primary Strategy</div>
        <div style="font-size: 12px; font-weight: 800; color: #2563eb; text-transform: uppercase;">${d.strategies.join(' + ')}</div>
      </div>
      <div style="border-left: 1px solid #e2e8f0; padding-left: 20px;">
        <div style="font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase;">Links Flow</div>
        <div style="font-size: 12px; font-weight: 800; color: #0f172a; text-transform: uppercase;">${d.linksInCount} In / ${d.linksOutCount} Out</div>
      </div>
    </div>
  </div>

  <!-- v2.4 VALIDATION SYSTEM -->
  <div style="margin-bottom: 30px; padding: 20px; background: #0f172a; border-radius: 12px; color: #ffffff;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #334155; padding-bottom: 10px;">
        <div style="font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.15em;">Validation Status:</div>
        <div style="font-size: 11px; font-weight: 900; color: ${getValColor(d.validation.overall)}; text-transform: uppercase; background: ${getValColor(d.validation.overall)}20; padding: 2px 10px; border-radius: 4px; border: 1px solid ${getValColor(d.validation.overall)}50;">${d.validation.overall}</div>
    </div>
    <div style="display: grid; grid-template-cols: repeat(3, 1fr); gap: 15px;">
        <div>
            <div style="font-size: 9px; color: #64748b; text-transform: uppercase; font-weight: 800; margin-bottom: 4px;">Structure</div>
            <div style="font-size: 13px; font-weight: 800; color: ${getValColor(d.validation.structure)};">${d.validation.structure}</div>
        </div>
        <div>
            <div style="font-size: 9px; color: #64748b; text-transform: uppercase; font-weight: 800; margin-bottom: 4px;">Linking</div>
            <div style="font-size: 13px; font-weight: 800; color: ${getValColor(d.validation.linking)};">${d.validation.linking}</div>
        </div>
        <div>
            <div style="font-size: 9px; color: #64748b; text-transform: uppercase; font-weight: 800; margin-bottom: 4px;">AEO Compliance</div>
            <div style="font-size: 13px; font-weight: 800; color: ${getValColor(d.validation.aeo)};">${d.validation.aeo}</div>
        </div>
    </div>
  </div>

  <div style="margin-bottom: 30px; padding: 20px; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 12px;">
    <div style="font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Structure Audit:</div>
    
    <div style="margin-bottom: 15px;">
      <div style="font-size: 10px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 5px;">H1 Tags</div>
      ${h1Html}
    </div>

    <div style="margin-bottom: 15px;">
      <div style="font-size: 10px; font-weight: 800; color: #334155; text-transform: uppercase; margin-bottom: 5px;">H2 Hierarchy</div>
      <div style="font-size: 12px; line-height: 1.6;">${h2Html}</div>
    </div>

    </div>

    ${d.introText ? `
      <div style="margin-bottom: 15px; padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #cbd5e1;">
        <div style="font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 5px;">Intro / Subheading Preview:</div>
        <div style="font-size: 12px; color: #475569; font-style: italic; line-height: 1.5;">${d.introText}</div>
      </div>
    ` : ''}

    ${d.faqs && d.faqs.length > 0 ? `
      <div>
        <div style="font-size: 10px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 10px;">FAQ Content Registry:</div>
        ${d.faqs.map(f => `
          <div style="margin-bottom: 10px; padding: 10px; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 6px;">
            <div style="font-size: 11px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">Q: ${f.q}</div>
            <div style="font-size: 11px; color: #64748b; line-height: 1.4;">A: ${f.a}</div>
          </div>
        `).join('')}
      </div>
    ` : ''}
  </div>

  <div style="background: #ffffff; border-radius: 12px;">
    <div style="font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 15px;">Action Workflow:</div>
    ${tasksHtml}
  </div>

  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #f1f5f9; font-size: 11px; color: #94a3b8; text-align: center; line-height: 1.6;">
    This is an automated intelligence artifact generated by the BBC SEO Control Center.<br>
    <strong>Proprietary Operating System • v2.3 Autonomous Layer</strong>
  </div>
</div>`

      combinedText += `PAGE: ${d.url}\n`
      combinedText += `JSON DATA:\n${jsonStr}\n\n`
      combinedText += `FULL HTML REPORT:\n${fullHtmlReport}\n`
      combinedText += `\n============================================================\n\n`
    })
    
    navigator.clipboard.writeText(combinedText)
    alert(`Success! Enriched Reports (JSON + HTML) copied for ${selectedUrls.size} pages.`)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 font-sans">
      {/* Floating Action Toolbar */}
      {selectedUrls.size > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 shadow-2xl rounded-full px-6 py-4 flex items-center gap-6 z-[120] animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-2">
            <div className="bg-rose-500 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">{selectedUrls.size}</div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Tasks Selected</span>
          </div>
          <div className="w-[1px] h-6 bg-slate-800" />
          <button 
            onClick={handleCopyData}
            className="flex items-center gap-2 text-[10px] font-black text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest"
          >
            <Copy size={14} /> Copy Data (JSON + HTML)
          </button>
          <button 
            onClick={() => setSelectedUrls(new Set())}
            className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            <Trash2 size={14} /> Clear
          </button>
        </div>
      )}
      {/* Top Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-8 py-6 sticky top-0 z-50 backdrop-blur-md bg-slate-900/80">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/seo-control-center" className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
              <ArrowLeft size={20} className="text-slate-400" />
            </Link>
            <div className="flex items-center gap-4 border-l border-slate-700 pl-6">
              <div className="bg-gradient-to-br from-rose-500 to-orange-600 p-2.5 rounded-xl shadow-lg shadow-rose-500/20">
                <Target size={24} />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                  DECISION ENGINE <span className="text-[10px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full border border-slate-700">v1.0</span>
                </h1>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-0.5 italic">Execution Layer & Task Distributor</p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
             <div className="text-right">
                <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest leading-none mb-1">Critical Blocker</div>
                <div className="text-lg font-black tabular-nums">{stats.p0} pages</div>
             </div>
             <div className="w-[1px] h-8 bg-slate-800" />
             <div className="text-right">
                <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">Health Score</div>
                <div className="text-lg font-black tabular-nums">{Math.round((1 - (stats.needsAction / stats.total)) * 100)}%</div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 mt-10 grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Left Sidebar: Filters & Stats */}
        <div className="xl:col-span-1 space-y-6">
           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Diagnostics Filter</h2>
              <div className="space-y-4">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                       type="text" 
                       placeholder="Filter by URL..." 
                       className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                       value={filter}
                       onChange={(e) => setFilter(e.target.value)}
                    />
                 </div>
                 
                 <div className="space-y-2">
                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2 mb-1">
                       <Filter size={10} /> Priority Scale
                    </div>
                    {(['ALL', 'P0', 'P1', 'P2', 'P3'] as const).map(p => (
                       <button 
                          key={p} 
                          onClick={() => setPriorityFilter(p)}
                          className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                             priorityFilter === p ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-500 hover:text-slate-300'
                          }`}
                       >
                          <span>{p === 'ALL' ? 'All Priorities' : `${p} Priority`}</span>
                          {p !== 'ALL' && <div className={`w-2 h-2 rounded-full ${PRIORITY_COLORS[p as Priority]}`} />}
                       </button>
                    ))}
                 </div>

                 <div className="pt-4 border-t border-slate-800 space-y-2">
                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2 mb-1">
                       <Target size={10} /> Page Type Scale
                    </div>
                    {(['ALL', 'money', 'hub', 'weapon', 'utility'] as const).map(t => (
                       <button 
                          key={t} 
                          onClick={() => setPageTypeFilter(t)}
                          className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                             pageTypeFilter === t ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-500 hover:text-slate-300'
                          }`}
                       >
                          <span className="capitalize">{t === 'ALL' ? 'All Types' : t}</span>
                          <span className="text-[10px] opacity-50 tabular-nums">
                            {decisions.filter(d => t === 'ALL' || d.type === t).length}
                          </span>
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Governance Rules</h2>
              <div className="space-y-3">
                 {[
                    { icon: ShieldCheck, label: 'LOCKED ANGLE', desc: 'GPT-controlled boundary' },
                    { icon: Bot, label: 'AUTO-TASKING', desc: 'Sync to Claude/GPT pool' },
                    { icon: Cpu, label: 'DEV ENFORCEMENT', desc: 'Hard 410 rules active' }
                 ].map(rule => (
                    <div key={rule.label} className="flex gap-3">
                       <rule.icon size={14} className="text-slate-600 mt-0.5 shrink-0" />
                       <div>
                          <div className="text-[10px] font-black text-slate-300 uppercase tracking-wider">{rule.label}</div>
                          <div className="text-[10px] text-slate-600 font-medium lowercase italic leading-none mt-1">{rule.desc}</div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Main Content: Decision Queue Table */}
        <div className="xl:col-span-3 space-y-6">
           <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl shadow-black/50">
              <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                 <div>
                    <h2 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-widest">
                       <Terminal size={16} className="text-rose-500" /> Decision Queue & Task Distribution
                    </h2>
                    <p className="text-[10px] text-slate-500 font-medium mt-1">Found {filteredDecisions.length} execution points in current registry.</p>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                       Sync Ready
                    </span>
                 </div>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="border-b border-slate-800 bg-slate-950/50">
                          <th className="px-6 py-4 w-10">
                             <input 
                               type="checkbox" 
                               className="w-4 h-4 rounded border-slate-700 bg-slate-800 focus:ring-rose-500 accent-rose-500"
                               onChange={handleSelectAll}
                               checked={selectedUrls.size === filteredDecisions.length && filteredDecisions.length > 0}
                             />
                          </th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Target URL</th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest w-1/3">Required Actions</th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                       {filteredDecisions.length === 0 ? (
                          <tr>
                             <td colSpan={5} className="px-6 py-20 text-center text-slate-500 italic text-sm">No decisions found matching current filter.</td>
                          </tr>
                       ) : filteredDecisions.map(d => (
                          <tr key={d.uid} className={`group hover:bg-slate-800/30 transition-colors ${selectedDecision?.uid === d.uid ? 'bg-rose-500/5' : ''}`}>
                             <td 
                               className="px-6 py-4 cursor-pointer"
                               onClick={(e) => {
                                 e.stopPropagation()
                                 toggleSelect(d.uid)
                               }}
                             >
                                <input 
                                  type="checkbox" 
                                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 focus:ring-rose-500 accent-rose-500 cursor-pointer pointer-events-none"
                                  checked={selectedUrls.has(d.uid)}
                                  readOnly
                                />
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                   {d.isOverlapping && <AlertCircle size={14} className="text-rose-500 animate-pulse shrink-0" />}
                                   <div className="font-mono text-[11px] text-slate-300 group-hover:text-white transition-colors truncate max-w-[150px]">{d.url}</div>
                                   <a 
                                      href={d.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="p-1.5 hover:bg-slate-700/50 rounded-lg text-slate-500 hover:text-white transition-colors shrink-0"
                                      onClick={(e) => e.stopPropagation()}
                                      title="Open live page"
                                   >
                                      <ExternalLink size={12} />
                                   </a>
                                </div>
                                <div className="text-[9px] text-slate-600 mt-1 flex flex-wrap gap-1">
                                   {d.issues.map(i => <span key={i} className={`px-1 rounded ${i === 'angle_overlap' ? 'bg-rose-500/10 text-rose-400 font-black' : 'bg-slate-800'}`}>#{i}</span>)}
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                  <span className="text-[9px] font-black text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700 uppercase tracking-widest w-fit">{d.type}</span>
                                  <div className="flex items-center gap-1.5 mt-1">
                                     <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: `${d.authority.score}%` }} />
                                     </div>
                                     <span className="text-[8px] font-black text-slate-500 tabular-nums">{d.authority.score}%</span>
                                  </div>
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <div className="space-y-2">
                                   {d.actions.length === 0 ? (
                                      <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1"><CheckCircle2 size={12}/> No action — Optimal</span>
                                   ) : (
                                      <div className="flex flex-col gap-2">
                                        {d.actions.map((a, i) => (
                                           <div key={i} className="flex items-center justify-between gap-3 bg-slate-950/50 rounded-lg p-2 border border-slate-800/50 group-hover:border-slate-700 transition-colors">
                                              <div className="flex items-center gap-2">
                                                 <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${PRIORITY_COLORS[a.priority]}`}>{a.priority}</span>
                                                 <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-widest ${ACTION_COLORS[a.type]}`}>{a.type}</span>
                                              </div>
                                              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap">
                                                 <Bot size={10} className="text-slate-600" /> {a.owner}
                                              </span>
                                           </div>
                                        ))}
                                        <button 
                                          onClick={() => setSelectedDecision(d)}
                                          className="text-[9px] font-black text-rose-500 hover:text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 p-1.5 rounded-lg border border-rose-500/20 text-center uppercase tracking-widest transition-all"
                                        >
                                          GENERATE EXECUTION PACK
                                        </button>
                                      </div>
                                   )}
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                {(() => {
                                   const effectiveStatus = statusOverrides[d.uid] ?? d.status
                                   const UI = STATUS_UI[effectiveStatus]
                                   return (
                                      <div className={`flex items-center gap-2 text-[8px] font-black px-2.5 py-1 rounded-full border uppercase tracking-widest w-fit ${UI.class}`}>
                                         <UI.icon size={10} /> {effectiveStatus.replace('_', ' ')}
                                      </div>
                                   )
                                })()}
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
           
           {/* Summary Section */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6">
                 <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BarChart3 size={14} className="text-rose-500" /> Action Distribution
                 </h3>
                 <div className="space-y-4">
                    {[
                       { label: 'Fix (Technical)', count: decisions.filter(d => d.actions.some(a => a.type === 'FIX')).length, color: 'bg-blue-500' },
                       { label: 'Rewrite (Content)', count: decisions.filter(d => d.actions.some(a => a.type === 'REWRITE')).length, color: 'bg-purple-500' },
                       { label: 'Inject (Authority)', count: decisions.filter(d => d.actions.some(a => a.type === 'INJECT')).length, color: 'bg-emerald-500' },
                    ].map(item => (
                       <div key={item.label} className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                             <span className="text-slate-400">{item.label}</span>
                             <span className="text-white">{item.count}</span>
                          </div>
                          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                             <div 
                                className={`h-full ${item.color}`} 
                                style={{ width: `${(item.count / decisions.length) * 100}%` }}
                             />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
              
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 border-dashed">
                 <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap size={14} className="text-amber-400" /> Intelligence Insight
                 </h3>
                 <div className="space-y-3">
                    <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                       <p className="text-[11px] text-slate-500 leading-relaxed italic">
                          "Ditemukan <strong className="text-rose-400">{stats.p0} blocker kritis</strong> menghambat indexing. Fokus awal harus pada perbaikan H1 dan Sitemap (Layer 4) sebelum melakukan optimasi authority (Layer 5)."
                       </p>
                    </div>
                    <div className="text-[9px] text-slate-600 font-medium">
                       * Rules updated automatically based on BBC SEO OS Governance v1.0. Read-only view.
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>

      {/* Execution Pack Side Panel */}
      {selectedDecision && (
         <div className="fixed inset-y-0 right-0 w-[450px] bg-slate-900 border-l border-slate-800 shadow-2xl z-[100] flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md sticky top-0">
               <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Zap size={16} className="text-rose-500" /> EXECUTION PACK
                  </h3>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">{selectedDecision.url}</div>
               </div>
               <button onClick={() => setSelectedDecision(null)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors">
                  <ArrowLeft className="rotate-180" size={18} />
               </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
               {/* Authority Metrics */}
               <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                     <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Strength</div>
                     <div className="text-lg font-black text-emerald-400 tabular-nums">{selectedDecision.authority.score}%</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                     <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Target</div>
                     <div className="text-lg font-black text-white tabular-nums">{selectedDecision.authority.target}%</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                     <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Gap</div>
                     <div className="text-lg font-black text-rose-500 tabular-nums">{selectedDecision.authority.gap}%</div>
                  </div>
               </div>

               {/* VERIFICATION PANEL */}
                <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Bot size={48} className="text-blue-500" />
                  </div>
                  <div className="relative">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-[10px] font-black text-white flex items-center gap-2 uppercase tracking-widest">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          Consistency Engine v1.0
                        </h3>
                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter mt-0.5">Production Verification Layer</div>
                      </div>
                      <button 
                        onClick={() => handleVerifyDeploy(selectedDecision.url)}
                        disabled={verifying === selectedDecision.url}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/10 flex items-center gap-2 disabled:opacity-50"
                      >
                        {verifying === selectedDecision.url ? <div className="w-2.5 h-2.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Zap className="w-2.5 h-2.5" />}
                        {verifyResults[selectedDecision.url] ? 'RE-CHECK' : 'VERIFY LIVE'}
                      </button>
                    </div>

                    {verifyResults[selectedDecision.url] ? (
                      <div className={`p-4 rounded-2xl border ${
                        verifyResults[selectedDecision.url].status === 'MATCH' 
                          ? 'bg-emerald-500/5 border-emerald-500/20' 
                          : 'bg-rose-500/5 border-rose-500/20'
                      }`}>
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${verifyResults[selectedDecision.url].status === 'MATCH' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                             <span className={`text-[10px] font-black uppercase tracking-widest ${verifyResults[selectedDecision.url].status === 'MATCH' ? 'text-emerald-400' : 'text-rose-400'}`}>
                               {verifyResults[selectedDecision.url].status}
                             </span>
                          </div>
                          <span className="text-[9px] text-slate-500 font-mono font-bold">{verifyResults[selectedDecision.url].timestamp?.split('T')[1].split('.')[0]}</span>
                        </div>

                        {verifyResults[selectedDecision.url].status === 'MISMATCH' && (
                          <div className="grid grid-cols-1 gap-2">
                            {Object.entries(verifyResults[selectedDecision.url].diff || {}).map(([key, val]: [string, any]) => (
                              <div key={key} className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-[10px]">
                                 <div className="text-slate-600 font-black uppercase text-[8px] mb-1.5 tracking-widest">{key.replace('_', ' ')}</div>
                                 <div className="flex justify-between gap-4">
                                   <div className="text-slate-400">DEV: <span className="text-white font-mono">{val.local}</span></div>
                                   <div className="text-slate-400">LIVE: <span className="text-rose-400 font-bold font-mono">{val.live}</span></div>
                                 </div>
                              </div>
                            ))}
                            <div className="mt-2 text-[9px] text-rose-500/80 font-bold bg-rose-500/5 p-2 rounded-lg border border-rose-500/10 italic">
                               ⚠️ BLOCK: Production mismatch detected. Verification failed.
                            </div>
                          </div>
                        )}

                        {verifyResults[selectedDecision.url].status === 'MATCH' && (
                          <div className="text-[10px] text-emerald-500/70 font-black uppercase tracking-wide leading-relaxed">
                            ✅ CONSISTENCY GUARANTEED: PROD matches DEV snapshot. Safe for execution.
                          </div>
                        )}
                        
                        {verifyResults[selectedDecision.url].status === 'ERROR' && (
                          <div className="text-[10px] text-rose-400 font-bold italic">
                            Error: {verifyResults[selectedDecision.url].error}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
                        WAITING FOR LIVE COMPARISON...
                      </div>
                    )}
                  </div>
               </div>

               {/* Action Tickets */}
               <div className="space-y-6">
                  {selectedDecision.actions.map((action, i) => (
                     <div key={i} className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="px-5 py-3 bg-slate-900 flex items-center justify-between border-b border-slate-800">
                           <div className="flex items-center gap-2">
                              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${PRIORITY_COLORS[action.priority]}`}>{action.priority}</span>
                              <span className="text-[10px] font-black text-white uppercase tracking-widest">{action.type}</span>
                           </div>
                           <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                              <Bot size={12} className="text-rose-500" /> FOR {action.owner}
                           </div>
                        </div>
                        <div className="p-5 space-y-4">
                           {action.instruction && (
                              <>
                                 <div className="space-y-2">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Execution Basis:</div>
                                    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/50 text-xs text-slate-300 italic">
                                       "{action.instruction.details}"
                                    </div>
                                 </div>

                                 {action.instruction.strategy && (
                                    <div className="grid grid-cols-2 gap-3">
                                       <div className="space-y-1">
                                          <div className="text-[9px] font-black text-slate-500 uppercase">Strategy</div>
                                          <div className="text-[10px] font-black text-rose-400 bg-rose-500/5 border border-rose-500/20 px-2 py-1 rounded inline-block">{action.instruction.strategy}</div>
                                       </div>
                                       {action.instruction.overlap_with && (
                                          <div className="space-y-1">
                                             <div className="text-[9px] font-black text-slate-500 uppercase">Overlap With</div>
                                             <div className="text-[9px] font-mono text-slate-400 truncate">{action.instruction.overlap_with}</div>
                                          </div>
                                       )}
                                    </div>
                                 )}

                                 {action.instruction.reason && (
                                    <div className="space-y-1">
                                       <div className="text-[9px] font-black text-slate-500 uppercase">Reason</div>
                                       <div className="text-[10px] font-black text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-2 py-1 rounded inline-block">{action.instruction.reason}</div>
                                    </div>
                                 )}

                                 {action.instruction.targets && (
                                    <div className="space-y-2">
                                       <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Execution Targets:</div>
                                       <div className="flex flex-wrap gap-2">
                                          {action.instruction.targets.map((t: string) => (
                                             <span key={t} className="text-[9px] font-black text-slate-400 bg-slate-900 border border-slate-800 px-2 py-1 rounded-full">{t}</span>
                                          ))}
                                          {action.instruction.wordCount && (
                                             <span className="text-[9px] font-black text-rose-400 bg-rose-500/5 border border-rose-500/20 px-2 py-1 rounded-full">Target: {action.instruction.wordCount} words</span>
                                          )}
                                       </div>
                                    </div>
                                 )}

                                 {action.instruction.target_links && (
                                    <div className="space-y-4">
                                       <div className="space-y-2">
                                          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Link Registry:</div>
                                          <div className="grid grid-cols-1 gap-2">
                                             {action.instruction.target_links.map((link: string) => {
                                                const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://www.bintarobusinesscentre.com'
                                                const href = link.startsWith('http') ? link : `${BASE}${link}`
                                                return (
                                                <div key={link} className="flex items-center gap-1 group/link">
                                                   <span className="text-[9px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-1 rounded truncate flex-1">{link}</span>
                                                   <a
                                                      href={href}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="p-1.5 bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 text-slate-500 hover:text-white transition-colors"
                                                   >
                                                      <ExternalLink size={10} />
                                                   </a>
                                                </div>
                                                )
                                             })}
                                          </div>
                                       </div>
                                       
                                       <div className="space-y-2">
                                          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Distributed Anchors:</div>
                                          <div className="grid grid-cols-1 gap-2">
                                             {action.instruction.anchors?.map((a) => (
                                                <div key={a.type} className="flex items-center justify-between bg-slate-900/50 p-2 rounded-lg border border-slate-800/50">
                                                   <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{a.type.replace('_', ' ')}</span>
                                                   <span className="text-[10px] font-bold text-slate-300 italic">"{a.text}"</span>
                                                </div>
                                             ))}
                                          </div>
                                       </div>
                                    </div>
                                 )}

                                 {action.instruction.links && (
                                    <div className="space-y-2">
                                       <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Multi-Source Injection Mesh:</div>
                                       {action.instruction.links.map((link: { from: string; to: string; anchor: string; placement: string }, j: number) => (
                                          <div key={j} className="bg-slate-900 rounded-xl p-3 border border-slate-800 space-y-2">
                                             <div className="flex items-center justify-between">
                                                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Internal Link {j+1}</span>
                                                <span className="text-[8px] font-black text-slate-600 bg-slate-950 px-1.5 py-0.5 rounded uppercase tracking-widest">{link.placement}</span>
                                             </div>
                                             <div className="flex items-center gap-2 overflow-hidden">
                                                <div className="flex items-center gap-1 min-w-0">
                                                   <div className="text-[10px] font-mono text-slate-500 truncate">{link.from}</div>
                                                   <a href={link.from} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-400">
                                                      <ExternalLink size={8} />
                                                   </a>
                                                </div>
                                                <ChevronRight size={10} className="text-slate-700 shrink-0" />
                                                <div className="flex items-center gap-1 min-w-0">
                                                   <div className="text-[10px] font-mono text-slate-300 truncate">{link.to}</div>
                                                   <a href={link.to} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-400">
                                                      <ExternalLink size={8} />
                                                   </a>
                                                </div>
                                             </div>
                                             <div className="text-[10px] font-black text-slate-400 italic">Anchor: "{link.anchor}"</div>
                                          </div>
                                       ))}
                                    </div>
                                 )}
                              </>
                           )}
                           
                           <button
                              onClick={() => handleCopyExecutionPrompt(selectedDecision)}
                              className="w-full py-3 bg-slate-900 hover:bg-rose-500 text-slate-500 hover:text-white border border-slate-800 hover:border-rose-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group"
                           >
                              <Terminal size={14} className="group-hover:text-white" />
                              {copiedPrompt ? '✓ Copied!' : 'Copy Execution Prompt'}
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="p-6 bg-slate-900/80 border-t border-slate-800 backdrop-blur-md">
               <button
                  onClick={() => handlePushToInProgress(selectedDecision)}
                  disabled={selectedDecision.status === 'IN_PROGRESS' || selectedDecision.status === 'COMPLETED'}
                  className="w-full py-4 bg-gradient-to-r from-rose-500 to-orange-600 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-500/20 hover:scale-[1.02] disabled:hover:scale-100 transition-all"
               >
                  {selectedDecision.status === 'IN_PROGRESS' ? '✓ In Progress' :
                   selectedDecision.status === 'COMPLETED' ? '✓ Completed' :
                   'Validate & Push to In-Progress'}
               </button>
            </div>
         </div>
      )}
    </div>
  )
}
