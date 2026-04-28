'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react'
import type { FeedbackResult, FeedbackResultType } from '../../lib/seo/feedback'

interface Props {
  feedback?: FeedbackResult
}

const RESULT_STYLE: Record<FeedbackResultType, {
  icon:   React.ElementType
  text:   string
  bg:     string
  border: string
  label:  string
}> = {
  improved: {
    icon:   TrendingUp,
    text:   'text-emerald-400',
    bg:     'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    label:  'Improved',
  },
  declined: {
    icon:   TrendingDown,
    text:   'text-rose-400',
    bg:     'bg-rose-500/10',
    border: 'border-rose-500/20',
    label:  'Declined',
  },
  flat: {
    icon:   Minus,
    text:   'text-amber-400',
    bg:     'bg-amber-500/10',
    border: 'border-amber-500/20',
    label:  'Flat',
  },
  no_data: {
    icon:   Clock,
    text:   'text-slate-500',
    bg:     'bg-slate-800',
    border: 'border-slate-700',
    label:  'No Prior Data',
  },
}

function DeltaRow({
  label,
  value,
  positive,
  unit = '',
}: {
  label:    string
  value:    number | null
  positive: boolean   // true = positive number is good
  unit?:    string
}) {
  if (value === null) return null
  const isGood = positive ? value < 0 : value > 0   // position: lower is better
  const isNeutral = value === 0
  const color = isNeutral
    ? 'text-slate-500'
    : isGood
      ? 'text-emerald-400'
      : 'text-rose-400'
  const sign  = value > 0 ? '+' : ''
  return (
    <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">{label}</span>
      <span className={`text-[9px] font-bold tabular-nums ${color}`}>
        {sign}{value.toFixed(value % 1 === 0 ? 0 : 1)}{unit}
      </span>
    </div>
  )
}

export default function FeedbackPanel({ feedback }: Props) {
  if (!feedback) return null

  const style = RESULT_STYLE[feedback.result]
  const Icon  = style.icon

  return (
    <div className={`${style.bg} border ${style.border} rounded-2xl p-4 space-y-3`}>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={14} className={style.text} />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Delta Signal
          </span>
        </div>
        <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full border uppercase tracking-widest ${style.text} ${style.bg} ${style.border}`}>
          {style.label}
        </span>
      </div>

      {/* Window context — v1.3 feedback is always 7d-vs-7d */}
      <div className="text-[9px] text-slate-500 font-medium">
        Based on last 7 days vs previous 7 days
      </div>

      {/* Message */}
      <p className={`text-[9px] font-medium italic ${style.text}`}>
        {feedback.message}
      </p>

      {/* Delta breakdown — only when we have real data */}
      {feedback.delta && feedback.result !== 'no_data' && (
        <div className="space-y-0">
          {/* Position: lower = better, so "positive" is false (negative delta is good) */}
          <DeltaRow
            label="Position Δ"
            value={feedback.delta.positionDelta}
            positive={false}
          />
          <DeltaRow
            label="Impressions Δ"
            value={feedback.delta.impressionDelta}
            positive={true}
          />
          <DeltaRow
            label="Clicks Δ"
            value={feedback.delta.clickDelta}
            positive={true}
          />
          <DeltaRow
            label="CTR Δ"
            value={feedback.delta.ctrDelta != null ? Math.round(feedback.delta.ctrDelta * 1000) / 10 : null}
            positive={true}
            unit="%"
          />
        </div>
      )}

      {/* Previous snapshot timestamp */}
      {feedback.previousSnapshot && (
        <p className="text-[8px] text-slate-700 font-mono">
          vs snapshot {new Date(feedback.previousSnapshot.timestamp).toLocaleString('en-GB', {
            day:    '2-digit',
            month:  'short',
            hour:   '2-digit',
            minute: '2-digit',
          })}
        </p>
      )}

      {feedback.result === 'no_data' && (
        <p className="text-[9px] text-slate-600 italic">
          Baseline will be captured on first GSC data load. Check back after the next data refresh.
        </p>
      )}
    </div>
  )
}
