'use client'

import React from 'react'
import { Sparkles, TrendingUp, BookOpen, Fingerprint, Link2, Bot } from 'lucide-react'
import type { Opportunity, OpportunityType } from '../../lib/seo/intelligence'

interface Decision {
  path:         string
  pageType:     string
  intelligence: { opportunities: Opportunity[] }
}

interface Props {
  decisions: Decision[]
}

const OPP_ICON: Record<OpportunityType, React.ElementType> = {
  FAQ_ADDITION:      BookOpen,
  TRUST_BOOST:       TrendingUp,
  ENTITY_EXPANSION:  Fingerprint,
  LINK_INJECTION:    Link2,
  AEO_UPGRADE:       Bot,
}

const OPP_STYLE: Record<OpportunityType, { text: string; bg: string; border: string }> = {
  FAQ_ADDITION:      { text: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20' },
  TRUST_BOOST:       { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  ENTITY_EXPANSION:  { text: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/20' },
  LINK_INJECTION:    { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
  AEO_UPGRADE:       { text: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
}

interface AggregatedOpp {
  type:          OpportunityType
  pageCount:     number
  maxGain:       number
  totalGain:     number
  description:   string
  pages:         string[]
}

export default function OpportunityBoard({ decisions }: Props) {
  // Aggregate opportunities across all pages by type
  const aggMap = new Map<OpportunityType, AggregatedOpp>()

  for (const d of decisions) {
    for (const opp of d.intelligence.opportunities) {
      const existing = aggMap.get(opp.type)
      if (existing) {
        existing.pageCount  += 1
        existing.totalGain  += opp.potentialGain
        existing.maxGain     = Math.max(existing.maxGain, opp.potentialGain)
        if (existing.pages.length < 3) existing.pages.push(d.path)
      } else {
        aggMap.set(opp.type, {
          type:        opp.type,
          pageCount:   1,
          maxGain:     opp.potentialGain,
          totalGain:   opp.potentialGain,
          description: opp.description,
          pages:       [d.path],
        })
      }
    }
  }

  const opps = Array.from(aggMap.values()).sort((a, b) => b.totalGain - a.totalGain)

  if (opps.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 italic text-sm">
        No optimization opportunities detected.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={14} className="text-amber-400" />
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">
          Opportunity Board — {opps.length} types across {decisions.length} pages
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {opps.map(opp => {
          const Icon  = OPP_ICON[opp.type]
          const style = OPP_STYLE[opp.type]
          const label = opp.type.replace(/_/g, ' ')

          return (
            <div
              key={opp.type}
              className={`${style.bg} border ${style.border} rounded-2xl p-4 space-y-3`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Icon size={14} className={style.text} />
                  <span className={`text-[9px] font-black uppercase tracking-widest ${style.text}`}>
                    {label}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] font-black text-slate-300 tabular-nums">+{opp.maxGain}</div>
                  <div className="text-[8px] text-slate-600 font-bold uppercase">max gain</div>
                </div>
              </div>

              {/* Description */}
              <div className="text-[9px] text-slate-400 font-medium italic leading-relaxed">
                {opp.description}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between border-t border-slate-800/50 pt-2">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  {opp.pageCount} page{opp.pageCount > 1 ? 's' : ''}
                </span>
                <span className={`text-[9px] font-black ${style.text}`}>
                  {opp.totalGain} total pts
                </span>
              </div>

              {/* Sample pages */}
              {opp.pages.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {opp.pages.map(p => (
                    <span key={p} className="text-[8px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded truncate max-w-[120px]">
                      {p}
                    </span>
                  ))}
                  {opp.pageCount > 3 && (
                    <span className="text-[8px] text-slate-600 font-bold">+{opp.pageCount - 3} more</span>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
