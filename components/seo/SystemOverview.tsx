'use client'

import React from 'react'
import { Cpu, Target, Brain, Layers, TrendingUp } from 'lucide-react'

interface Props {
  totalPages:     number
  indexablePages: number
  avgEntityScore: number
  avgAeoScore:    number
  criticalCount:  number  // P0 pages
}

export default function SystemOverview({
  totalPages, indexablePages, avgEntityScore, avgAeoScore, criticalCount
}: Props) {
  const stats = [
    {
      label:   'Total Pages',
      value:   totalPages,
      icon:    Layers,
      color:   'text-slate-300',
      bg:      'bg-slate-800/60',
      border:  'border-slate-700/50',
      suffix:  '',
    },
    {
      label:   'Indexable',
      value:   indexablePages,
      icon:    TrendingUp,
      color:   'text-emerald-400',
      bg:      'bg-emerald-500/10',
      border:  'border-emerald-500/20',
      suffix:  '',
    },
    {
      label:   'Avg Entity',
      value:   avgEntityScore,
      icon:    Brain,
      color:   avgEntityScore >= 70 ? 'text-emerald-400' : avgEntityScore >= 40 ? 'text-amber-400' : 'text-rose-400',
      bg:      avgEntityScore >= 70 ? 'bg-emerald-500/10' : avgEntityScore >= 40 ? 'bg-amber-500/10' : 'bg-rose-500/10',
      border:  avgEntityScore >= 70 ? 'border-emerald-500/20' : avgEntityScore >= 40 ? 'border-amber-500/20' : 'border-rose-500/20',
      suffix:  '%',
    },
    {
      label:   'Avg AEO',
      value:   avgAeoScore,
      icon:    Cpu,
      color:   avgAeoScore >= 70 ? 'text-emerald-400' : avgAeoScore >= 40 ? 'text-amber-400' : 'text-rose-400',
      bg:      avgAeoScore >= 70 ? 'bg-emerald-500/10' : avgAeoScore >= 40 ? 'bg-amber-500/10' : 'bg-rose-500/10',
      border:  avgAeoScore >= 70 ? 'border-emerald-500/20' : avgAeoScore >= 40 ? 'border-amber-500/20' : 'border-rose-500/20',
      suffix:  '%',
    },
    {
      label:   'Critical (P0)',
      value:   criticalCount,
      icon:    Target,
      color:   criticalCount > 0 ? 'text-rose-400' : 'text-emerald-400',
      bg:      criticalCount > 0 ? 'bg-rose-500/10' : 'bg-emerald-500/10',
      border:  criticalCount > 0 ? 'border-rose-500/20' : 'border-emerald-500/20',
      suffix:  '',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map(s => {
        const Icon = s.icon
        return (
          <div
            key={s.label}
            className={`${s.bg} border ${s.border} rounded-2xl p-4 flex items-center gap-3`}
          >
            <div className="shrink-0">
              <Icon size={18} className={s.color} />
            </div>
            <div>
              <div className={`text-2xl font-black tabular-nums leading-none ${s.color}`}>
                {s.value}{s.suffix}
              </div>
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">
                {s.label}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
