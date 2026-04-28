'use client'

import React from 'react'
import { ArrowLeft, Zap, ExternalLink, CheckCircle2, XCircle, Database } from 'lucide-react'
import type { AllSignals } from '../../lib/seo/signals'
import type { IntelligenceOutput } from '../../lib/seo/intelligence'
import EntityPanel       from './EntityPanel'
import ActionPanel       from './ActionPanel'
import LLMReadinessPanel from './LLMReadinessPanel'
import PerformancePanel  from './PerformancePanel'
import HealthPanel       from './HealthPanel'
import FeedbackPanel     from './FeedbackPanel'
import type { PagePerformance } from '../../lib/seo/performance'
import type { HealthResult } from '../../lib/seo/health'
import type { FeedbackResult } from '../../lib/seo/feedback'

type ActionType = 'FIX' | 'REWRITE' | 'INJECT' | 'KILL'
type Priority   = 'P0' | 'P1' | 'P2' | 'P3'

interface Action {
  type:           ActionType
  priority:       Priority
  reason:         string
  executionHint:  string
  executionOrder?: number
  executionStep?:  number
}

export interface Decision {
  path:           string
  pageType:       string
  indexability:   string
  title:          string
  wordCount:      number
  silo:           string | null
  signals:        AllSignals
  intelligence:   IntelligenceOutput
  actions:        Action[]
  issues:         string[]
  entityTokens:   string[]
  entityCovered:  string[]
  entityMissing:  string[]
  performance?:   PagePerformance
  health?:        HealthResult
  feedback?:      FeedbackResult
}

interface Props {
  decision: Decision | null
  onClose:  () => void
}

const CONFIDENCE_STYLE: Record<string, string> = {
  high:   'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  low:    'text-rose-400 bg-rose-500/10 border-rose-500/20',
}

const PRIORITY_STYLE: Record<Priority, string> = {
  P0: 'bg-rose-500 text-white',
  P1: 'bg-orange-500 text-white',
  P2: 'bg-amber-400 text-black',
  P3: 'bg-slate-600 text-white',
}

function TechRow({ label, pass, value }: { label: string; pass: boolean; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-1.5">
        {pass
          ? <CheckCircle2 size={10} className="text-emerald-400" />
          : <XCircle      size={10} className="text-rose-400" />
        }
        <span className={`text-[9px] font-bold ${pass ? 'text-slate-300' : 'text-rose-400'}`}>{value}</span>
      </div>
    </div>
  )
}

export default function PageExecutionDetail({ decision: d, onClose }: Props) {
  if (!d) return null

  const confidence = d.intelligence.confidence
  const priority   = d.intelligence.priority

  // Build execution order label from sequenced actions
  const execOrder = d.actions.map(a => a.type).join(' → ')

  const BASE = process.env.NEXT_PUBLIC_APP_URL || 'https://www.bintarobusinesscentre.com'
  const liveUrl = d.path.startsWith('http') ? d.path : `${BASE}${d.path}`

  return (
    <div className="fixed inset-y-0 right-0 w-[460px] bg-slate-900 border-l border-slate-800 shadow-2xl z-[100] flex flex-col animate-in slide-in-from-right duration-300">
      {/* ── A. HEADER ── */}
      <div className="p-5 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase ${CONFIDENCE_STYLE[confidence.level]}`}>
              Confidence: {confidence.score}%
            </span>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors"
              title="Open live page"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-mono text-[11px] text-slate-300 break-all leading-snug">{d.path}</div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[8px] font-black bg-slate-800 text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full uppercase">
              {d.pageType}
            </span>
            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${PRIORITY_STYLE[priority.value]}`}>
              {priority.value}
            </span>
            {d.actions.length > 0 && (
              <span className="text-[8px] font-mono text-slate-500">
                {execOrder}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div className="flex-1 overflow-y-auto p-5 space-y-7">

        {/* ── A2. HEALTH PANEL — shown first so FIX blockers are immediately visible ── */}
        {d.health && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-rose-600 rounded-full" />
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Health Gate</h3>
            </div>
            <HealthPanel health={d.health} />
          </section>
        )}

        {/* ── B. ENTITY PANEL ── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-violet-500 rounded-full" />
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entity Analysis</h3>
          </div>
          <EntityPanel
            signals={d.signals}
            entityCovered={d.entityCovered}
            entityMissing={d.entityMissing}
            path={d.path}
          />
        </section>

        {/* ── C. ACTION PANEL ── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-rose-500 rounded-full" />
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Actions ({d.actions.length})
            </h3>
          </div>
          <ActionPanel actions={d.actions} pagePath={d.path} />
        </section>

        {/* ── D. LLM READINESS ── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-blue-500 rounded-full" />
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">LLM Readiness</h3>
          </div>
          <LLMReadinessPanel signals={d.signals} pageType={d.pageType} />
        </section>

        {/* ── E. TECH SUMMARY ── */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-slate-600 rounded-full" />
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tech Summary</h3>
          </div>
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2 space-y-0">
            <TechRow label="H1"        pass={d.signals.h1.count === 1}   value={`${d.signals.h1.count} tag(s)`} />
            <TechRow label="Schema"    pass={d.signals.schema.hasSchema} value={d.signals.schema.types.join(', ') || 'None'} />
            <TechRow label="Links Out" pass={d.signals.link.total >= 3}  value={`${d.signals.link.total} link(s)`} />
            <TechRow label="Word Count" pass={d.wordCount >= 800}        value={`${d.wordCount.toLocaleString()} words`} />
          </div>
        </section>

        {/* ── F. PERFORMANCE PANEL ── */}
        {d.performance && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-sky-500 rounded-full" />
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GSC Performance</h3>
            </div>
            <PerformancePanel performance={d.performance} />
          </section>
        )}

        {/* ── G. FEEDBACK PANEL ── */}
        {d.feedback && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-teal-500 rounded-full" />
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Feedback Loop</h3>
            </div>
            <FeedbackPanel feedback={d.feedback} />
          </section>
        )}

        {/* Confidence Warnings */}
        {confidence.warnings.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Database size={12} className="text-amber-500" />
              <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Data Warnings</h3>
            </div>
            <div className="space-y-1">
              {confidence.warnings.map(w => (
                <div key={w} className="text-[9px] text-amber-600 italic bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-1.5">
                  {w}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── FOOTER ACTION BUTTON ── */}
      <div className="p-5 border-t border-slate-800 bg-slate-900/80">
        <button className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-orange-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
          <Zap size={14} /> Mark In-Progress
        </button>
      </div>
    </div>
  )
}
