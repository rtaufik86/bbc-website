'use client'

import React, { useState } from 'react'
import { Zap, Code2, RefreshCw, Link2, Trash2, Play, Loader2, Check, AlertTriangle } from 'lucide-react'
import { createClient } from '../../lib/supabase/client'

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

interface Props {
  actions:  Action[]
  pagePath?: string
}

type LogStatus = 'idle' | 'logging' | 'logged' | 'error'

// Attribution Engine — async write with surfaced status so the user can see
// whether the insert landed. KILL is intentionally not tracked (v1 spec).
async function logAction(pagePath: string, action: Action): Promise<{ ok: boolean; message?: string }> {
  if (action.type === 'KILL') return { ok: false, message: 'KILL is not tracked' }
  try {
    const supabase = createClient()
    const { error } = await supabase.from('seo_action_logs').insert({
      page:        pagePath,
      action_type: action.type,
      action_step: action.executionStep ?? action.executionOrder ?? 1,
    })
    if (error) return { ok: false, message: error.message }
    return { ok: true }
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : 'unknown error' }
  }
}

const ACTION_ICON: Record<ActionType, React.ElementType> = {
  FIX:     Code2,
  REWRITE: RefreshCw,
  INJECT:  Link2,
  KILL:    Trash2,
}

const ACTION_STYLE: Record<ActionType, { text: string; bg: string; border: string }> = {
  FIX:     { text: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
  REWRITE: { text: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20' },
  INJECT:  { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  KILL:    { text: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20' },
}

const PRIORITY_STYLE: Record<Priority, string> = {
  P0: 'bg-rose-500 text-white',
  P1: 'bg-orange-500 text-white',
  P2: 'bg-amber-400 text-black',
  P3: 'bg-slate-600 text-white',
}

export default function ActionPanel({ actions, pagePath }: Props) {
  const [statuses, setStatuses] = useState<Record<number, LogStatus>>({})
  const [errors,   setErrors]   = useState<Record<number, string>>({})

  async function handleExecute(i: number, action: Action) {
    if (!pagePath) return
    setStatuses(s => ({ ...s, [i]: 'logging' }))
    setErrors(e => { const n = { ...e }; delete n[i]; return n })
    const res = await logAction(pagePath, action)
    if (res.ok) {
      setStatuses(s => ({ ...s, [i]: 'logged' }))
    } else {
      setStatuses(s => ({ ...s, [i]: 'error' }))
      setErrors(e => ({ ...e, [i]: res.message ?? 'unknown error' }))
    }
  }

  if (actions.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 italic text-[11px] border border-dashed border-slate-800 rounded-2xl">
        No actions required — page is optimized
      </div>
    )
  }

  // RULE: if REWRITE exists, don't show an EXPAND action
  const hasRewrite = actions.some(a => a.type === 'REWRITE')

  return (
    <div className="space-y-3">
      {actions.map((action, i) => {
        // hide EXPAND if REWRITE is in the list
        if (hasRewrite && action.type === 'INJECT' && action.reason?.toLowerCase().includes('expand')) return null
        const Icon    = ACTION_ICON[action.type]
        const style   = ACTION_STYLE[action.type]
        const pStyle  = PRIORITY_STYLE[action.priority]
        const step    = action.executionStep ?? i + 1

        return (
          <div
            key={`${action.type}-${i}`}
            className={`${style.bg} border ${style.border} rounded-2xl p-4 space-y-3`}
          >
            {/* Header row */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <span className="text-[8px] font-black text-slate-400">{step}</span>
                </div>
                <Icon size={14} className={style.text} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${style.text}`}>
                  {action.type}
                </span>
              </div>
              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${pStyle}`}>
                {action.priority}
              </span>
            </div>

            {/* Reason */}
            <div className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
              "{action.reason}"
            </div>

            {/* Execution Hint */}
            <div className="bg-slate-900/80 rounded-xl px-3 py-2 flex items-start gap-2">
              <Zap size={10} className="text-slate-600 mt-0.5 shrink-0" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">
                {action.executionHint}
              </span>
            </div>

            {/* Execute button — logs to Attribution Engine on click.
                Visible state: idle → logging → logged / error. */}
            {pagePath && action.type !== 'KILL' && (() => {
              const status = statuses[i] ?? 'idle'
              const err    = errors[i]
              const base   = 'w-full flex items-center justify-center gap-1.5 py-2 border rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors'
              if (status === 'logged') {
                return (
                  <button type="button" disabled
                    className={`${base} bg-emerald-500/10 border-emerald-500/30 text-emerald-400 cursor-default`}>
                    <Check size={10} /> Logged
                  </button>
                )
              }
              if (status === 'logging') {
                return (
                  <button type="button" disabled
                    className={`${base} bg-slate-800/70 border-slate-700 text-slate-500 cursor-wait`}>
                    <Loader2 size={10} className="animate-spin" /> Logging…
                  </button>
                )
              }
              if (status === 'error') {
                return (
                  <div className="space-y-1">
                    <button type="button"
                      onClick={() => handleExecute(i, action)}
                      className={`${base} bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/15`}>
                      <AlertTriangle size={10} /> Retry
                    </button>
                    {err && (
                      <div className="text-[9px] text-rose-400/80 break-all leading-snug px-1">
                        {err}
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <button type="button"
                  onClick={() => handleExecute(i, action)}
                  className={`${base} bg-slate-800/70 hover:bg-slate-800 border-slate-700 text-slate-400 hover:text-white`}>
                  <Play size={10} /> Mark Executed
                </button>
              )
            })()}
          </div>
        )
      })}
    </div>
  )
}
