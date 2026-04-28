'use client'

import React from 'react'
import { Brain, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import type { AllSignals } from '../../lib/seo/signals'

interface Props {
  signals:        AllSignals
  entityCovered:  string[]   // URL tokens found in title/H1/desc
  entityMissing:  string[]   // URL tokens NOT found
  path:           string
}

type Grade = 'A' | 'B' | 'C' | 'D' | 'F'

function scoreToGrade(score: number): Grade {
  if (score >= 90) return 'A'
  if (score >= 70) return 'B'
  if (score >= 50) return 'C'
  if (score >= 30) return 'D'
  return 'F'
}

const GRADE_STYLE: Record<Grade, { text: string; bg: string; border: string }> = {
  A: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  B: { text: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/30' },
  C: { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/30' },
  D: { text: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/30' },
  F: { text: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/30' },
}

// BBC domain-specific entity keywords per silo context (relationship gaps)
const BBC_RELATIONSHIPS = ['Jakarta Selatan', 'Bintaro', 'BB Centre', 'KBLI', 'NIB', 'PT', 'PKP']

export default function EntityPanel({ signals, entityCovered, entityMissing, path }: Props) {
  const score  = Math.round(signals.entity.score)
  const grade  = scoreToGrade(score)
  const style  = GRADE_STYLE[grade]

  // Relationship gaps: BBC domain keywords not mentioned in covered tokens
  const coveredLower   = entityCovered.map(t => t.toLowerCase())
  const relGaps = BBC_RELATIONSHIPS.filter(r => !coveredLower.some(t => t.includes(r.toLowerCase())))

  return (
    <div className="space-y-4">
      {/* Score + Grade */}
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl ${style.bg} border ${style.border} flex flex-col items-center justify-center shrink-0`}>
          <span className={`text-xl font-black leading-none ${style.text}`}>{grade}</span>
          <span className="text-[8px] text-slate-500 font-black uppercase">grade</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Brain size={14} className="text-slate-500" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Entity Coverage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${score >= 70 ? 'bg-emerald-500' : score >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                style={{ width: `${score}%` }}
              />
            </div>
            <span className={`text-sm font-black tabular-nums ${style.text}`}>{score}%</span>
          </div>
        </div>
      </div>

      {/* Covered */}
      {entityCovered.length > 0 && (
        <div>
          <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
            <CheckCircle2 size={10} className="text-emerald-500" /> Covered Entities
          </div>
          <div className="flex flex-wrap gap-1.5">
            {entityCovered.map(t => (
              <span key={t} className="text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Critical Missing */}
      {entityMissing.length > 0 && (
        <div>
          <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
            <XCircle size={10} className="text-rose-500" /> Critical Missing
          </div>
          <div className="flex flex-wrap gap-1.5">
            {entityMissing.map(t => (
              <span key={t} className="text-[9px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Relationship Gaps */}
      {relGaps.length > 0 && (
        <div>
          <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
            <AlertTriangle size={10} className="text-amber-500" /> Relationship Gaps
          </div>
          <div className="flex flex-wrap gap-1.5">
            {relGaps.slice(0, 5).map(r => (
              <span key={r} className="text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full">
                {r}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
