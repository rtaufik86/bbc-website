'use client'

import React from 'react'
import { Brain, AlertTriangle } from 'lucide-react'
import type { AllSignals } from '../../lib/seo/signals'

interface Decision {
  path:    string
  silo:    string | null
  signals: AllSignals
  entityMissing: string[]
}

interface Props {
  decisions: Decision[]
}

const SILO_LABEL: Record<string, string> = {
  'virtual-office': 'Virtual Office',
  'sewa-kantor':    'Sewa Kantor',
  'legal':          'Legal / PT',
  'none':           'Support / Other',
}

export default function EntityOverview({ decisions }: Props) {
  // --- Avg score per silo ---
  const siloMap = new Map<string, { total: number; count: number }>()
  for (const d of decisions) {
    const key = d.silo ?? 'none'
    const existing = siloMap.get(key)
    if (existing) {
      existing.total += d.signals.entity.score
      existing.count += 1
    } else {
      siloMap.set(key, { total: d.signals.entity.score, count: 1 })
    }
  }

  const siloStats = Array.from(siloMap.entries())
    .map(([silo, { total, count }]) => ({
      silo,
      label: SILO_LABEL[silo] ?? silo,
      avg:   Math.round(total / count),
      count,
    }))
    .sort((a, b) => a.avg - b.avg) // worst first

  // --- Top 5 missing entities (most common missing tokens) ---
  const tokenFreq = new Map<string, number>()
  for (const d of decisions) {
    for (const t of d.entityMissing) {
      tokenFreq.set(t, (tokenFreq.get(t) ?? 0) + 1)
    }
  }
  const topMissing = Array.from(tokenFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const scoreColor = (avg: number) =>
    avg >= 70 ? 'text-emerald-400' :
    avg >= 40 ? 'text-amber-400'   : 'text-rose-400'

  const barColor = (avg: number) =>
    avg >= 70 ? 'bg-emerald-500' :
    avg >= 40 ? 'bg-amber-500'   : 'bg-rose-500'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Silo breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Brain size={14} className="text-slate-500" />
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Entity Score per Silo</h4>
        </div>
        {siloStats.length === 0 ? (
          <p className="text-slate-600 text-[10px] italic">No silo data.</p>
        ) : (
          <div className="space-y-3">
            {siloStats.map(s => (
              <div key={s.silo} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{s.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-600 font-bold">{s.count} pages</span>
                    <span className={`text-[11px] font-black tabular-nums ${scoreColor(s.avg)}`}>{s.avg}%</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${barColor(s.avg)}`} style={{ width: `${s.avg}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top 5 missing entities */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} className="text-amber-500" />
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Top Missing Entities (global)</h4>
        </div>
        {topMissing.length === 0 ? (
          <p className="text-slate-600 text-[10px] italic">No missing entity tokens detected.</p>
        ) : (
          <div className="space-y-2">
            {topMissing.map(([token, freq]) => (
              <div key={token} className="flex items-center justify-between bg-slate-800/50 rounded-xl px-3 py-2">
                <span className="text-[10px] font-mono text-rose-300 font-bold">{token}</span>
                <span className="text-[9px] font-black text-slate-500">
                  {freq} page{freq > 1 ? 's' : ''} missing
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
