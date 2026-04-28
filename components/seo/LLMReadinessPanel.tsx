'use client'

import React from 'react'
import { Bot, CheckCircle2, XCircle, MessageSquare, BookOpen, Fingerprint } from 'lucide-react'
import type { AllSignals } from '../../lib/seo/signals'

interface Props {
  signals:  AllSignals
  pageType: string
}

interface Signal {
  label:    string
  pass:     boolean
  icon:     React.ElementType
  passText: string
  failText: string
}

export default function LLMReadinessPanel({ signals, pageType }: Props) {
  const checks: Signal[] = [
    {
      label:    'Direct Answer',
      pass:     signals.aeo.hasDirectAnswer,
      icon:     MessageSquare,
      passText: 'Intro block ≥ 200 words',
      failText: 'Add 200+ word direct answer at the top',
    },
    {
      label:    'FAQ Schema',
      pass:     signals.faq.hasFAQ,
      icon:     BookOpen,
      passText: 'FAQPage schema detected',
      failText: pageType === 'weapon' ? 'REQUIRED: add FAQ schema for weapon pages' : 'Recommended: add FAQ schema',
    },
    {
      label:    'Entity Clarity',
      pass:     signals.entity.covered,
      icon:     Fingerprint,
      passText: `Entity coverage ${Math.round(signals.entity.score)}%`,
      failText: 'Strengthen entity signals in title / H1 / meta',
    },
  ]

  const passCount = checks.filter(c => c.pass).length
  const readiness = Math.round((passCount / checks.length) * 100)

  const readinessLabel =
    readiness === 100 ? 'LLM Ready'    :
    readiness >= 67   ? 'Partially Ready' : 'Not Ready'

  const readinessColor =
    readiness === 100 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
    readiness >= 67   ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
                        'text-rose-400 bg-rose-500/10 border-rose-500/20'

  return (
    <div className="space-y-4">
      {/* Overall readiness badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-slate-500" />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">LLM / AI Readiness</span>
        </div>
        <span className={`text-[9px] font-black px-2.5 py-1 rounded-full border uppercase tracking-widest ${readinessColor}`}>
          {readinessLabel}
        </span>
      </div>

      {/* Score bar */}
      <div className="space-y-1">
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${readiness === 100 ? 'bg-emerald-500' : readiness >= 67 ? 'bg-amber-500' : 'bg-rose-500'}`}
            style={{ width: `${readiness}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-slate-600 font-bold">
          <span>{passCount}/{checks.length} signals</span>
          <span>{readiness}%</span>
        </div>
      </div>

      {/* Individual checks */}
      <div className="space-y-2">
        {checks.map(c => {
          const Icon = c.icon
          return (
            <div
              key={c.label}
              className={`flex items-start gap-3 p-3 rounded-xl border ${
                c.pass
                  ? 'bg-emerald-500/5 border-emerald-500/15'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <Icon size={12} className={c.pass ? 'text-emerald-400 shrink-0 mt-0.5' : 'text-slate-600 shrink-0 mt-0.5'} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{c.label}</span>
                  {c.pass
                    ? <CheckCircle2 size={10} className="text-emerald-400 shrink-0" />
                    : <XCircle     size={10} className="text-rose-500 shrink-0" />
                  }
                </div>
                <div className={`text-[9px] font-medium mt-0.5 ${c.pass ? 'text-emerald-500/70' : 'text-slate-500 italic'}`}>
                  {c.pass ? c.passText : c.failText}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
