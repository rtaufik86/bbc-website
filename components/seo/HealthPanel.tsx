'use client'

import React from 'react'
import { ShieldCheck, ShieldAlert, ShieldX, AlertCircle } from 'lucide-react'
import type { HealthResult, HealthStatus } from '../../lib/seo/health'

interface Props {
  health?: HealthResult
}

const STATUS_STYLE: Record<HealthStatus, { icon: React.ElementType; text: string; bg: string; border: string }> = {
  healthy:  { icon: ShieldCheck, text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  warning:  { icon: ShieldAlert,  text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
  critical: { icon: ShieldX,      text: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20' },
}

const SEVERITY_COLOR: Record<string, string> = {
  high:   'text-rose-400',
  medium: 'text-amber-400',
  low:    'text-slate-400',
}

export default function HealthPanel({ health }: Props) {
  if (!health) return null

  const style  = STATUS_STYLE[health.status]
  const Icon   = style.icon

  return (
    <div className={`${style.bg} border ${style.border} rounded-2xl p-4 space-y-3`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={14} className={style.text} />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Health Status
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${health.score >= 80 ? 'bg-emerald-500' : health.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
              style={{ width: `${health.score}%` }}
            />
          </div>
          <span className={`text-[10px] font-black tabular-nums ${style.text}`}>
            {health.score}
          </span>
        </div>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-2">
        <span className={`text-[9px] font-black px-2.5 py-1 rounded-full border uppercase tracking-widest ${style.text} ${style.bg} ${style.border}`}>
          {health.status}
        </span>
      </div>

      {/* Issues list */}
      {health.issues.length > 0 ? (
        <ul className="space-y-1.5">
          {health.issues.map((issue, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <AlertCircle size={10} className={`${SEVERITY_COLOR[issue.severity]} shrink-0 mt-0.5`} />
              <span className={`text-[9px] font-medium leading-snug ${SEVERITY_COLOR[issue.severity]}`}>
                {issue.message}
              </span>
              <span className="text-[8px] text-slate-700 font-black uppercase ml-auto shrink-0">
                {issue.severity}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[9px] text-emerald-500/70 font-bold italic">
          No structural issues detected.
        </p>
      )}
    </div>
  )
}
