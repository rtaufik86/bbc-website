'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Minus, Search, MousePointerClick, Eye } from 'lucide-react'
import type { PagePerformance } from '../../lib/seo/performance'

interface Props {
  performance?: PagePerformance
}

const TREND_ICON = {
  up:   TrendingUp,
  down: TrendingDown,
  flat: Minus,
}

const TREND_COLOR = {
  up:   'text-emerald-400',
  down: 'text-rose-400',
  flat: 'text-slate-500',
}

const POSITION_COLOR = (pos: number) =>
  pos <= 3  ? 'text-emerald-400' :
  pos <= 10 ? 'text-amber-400'   : 'text-rose-400'

export default function PerformancePanel({ performance }: Props) {
  if (!performance) return null

  const TrendIcon  = TREND_ICON[performance.trend]
  const trendColor = TREND_COLOR[performance.trend]
  const posColor   = POSITION_COLOR(performance.avgPosition)

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search size={12} className="text-slate-500" />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            GSC Performance
          </span>
        </div>
        <div className={`flex items-center gap-1 ${trendColor}`}>
          <TrendIcon size={12} />
          <span className="text-[9px] font-black uppercase">{performance.trend}</span>
        </div>
      </div>

      {/* Top Query */}
      <div className="bg-slate-950/60 rounded-xl px-3 py-2">
        <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Top Query</div>
        <div className="text-[10px] text-slate-300 font-medium italic truncate">
          "{performance.topQuery}"
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className={`text-lg font-black tabular-nums leading-none ${posColor}`}>
            #{performance.avgPosition.toFixed(1)}
          </div>
          <div className="text-[8px] text-slate-600 font-black uppercase tracking-widest mt-1">Position</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-black tabular-nums leading-none text-sky-400">
            {performance.totalImpressions.toLocaleString()}
          </div>
          <div className="text-[8px] text-slate-600 font-black uppercase tracking-widest mt-1">Impressions</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-black tabular-nums leading-none text-violet-400">
            {(performance.ctr * 100).toFixed(2)}%
          </div>
          <div className="text-[8px] text-slate-600 font-black uppercase tracking-widest mt-1">CTR</div>
        </div>
      </div>

      {/* Clicks */}
      <div className="flex items-center gap-2 border-t border-slate-800/50 pt-3">
        <MousePointerClick size={12} className="text-slate-500" />
        <span className="text-[10px] font-black text-slate-400">
          {performance.totalClicks.toLocaleString()} clicks
        </span>
      </div>
    </div>
  )
}
