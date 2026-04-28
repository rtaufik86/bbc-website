'use client'

import React, { useMemo, useRef, useState } from 'react'
import { X, Check, Ban, FileWarning } from 'lucide-react'
import { computeHtmlDiff } from '../../lib/seo/execution/diff'
import type { DiffRow } from '../../lib/seo/execution/diff'

export interface PatchPreview {
  id:           string
  page:         string
  actionType:   string
  status:       string
  createdAt:    string
  originalHtml: string | null
  patchedHtml:  string | null
}

interface Props {
  patch:     PatchPreview
  onClose:   () => void
  onApply?:  (id: string) => Promise<void> | void
  onReject?: (id: string) => Promise<void> | void
}

const ROW_STYLE: Record<DiffRow['type'], { leftBg: string; rightBg: string; marker: string }> = {
  same:    { leftBg: '',                          rightBg: '',                          marker: ' '  },
  added:   { leftBg: '',                          rightBg: 'bg-emerald-500/15',         marker: '+'  },
  removed: { leftBg: 'bg-rose-500/15',            rightBg: '',                          marker: '-'  },
  changed: { leftBg: 'bg-rose-500/15',            rightBg: 'bg-emerald-500/15',         marker: '~'  },
}

export default function ExecutionDiffViewer({ patch, onClose, onApply, onReject }: Props) {
  const diff = useMemo(
    () => computeHtmlDiff(patch.originalHtml, patch.patchedHtml),
    [patch.originalHtml, patch.patchedHtml],
  )

  // Scroll sync — guard against the re-entrant loop where setting scrollTop
  // triggers the other pane's onScroll and they chase each other.
  const leftRef  = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const lockRef  = useRef<'left' | 'right' | null>(null)

  const syncFromLeft = () => {
    if (lockRef.current === 'right') return
    if (!leftRef.current || !rightRef.current) return
    lockRef.current = 'left'
    rightRef.current.scrollTop  = leftRef.current.scrollTop
    rightRef.current.scrollLeft = leftRef.current.scrollLeft
    requestAnimationFrame(() => { lockRef.current = null })
  }
  const syncFromRight = () => {
    if (lockRef.current === 'left') return
    if (!leftRef.current || !rightRef.current) return
    lockRef.current = 'right'
    leftRef.current.scrollTop  = rightRef.current.scrollTop
    leftRef.current.scrollLeft = rightRef.current.scrollLeft
    requestAnimationFrame(() => { lockRef.current = null })
  }

  const [busy, setBusy] = useState<'apply' | 'reject' | null>(null)

  const handleApply = async () => {
    if (!onApply || busy) return
    setBusy('apply')
    try { await onApply(patch.id) } finally { setBusy(null); onClose() }
  }
  const handleReject = async () => {
    if (!onReject || busy) return
    setBusy('reject')
    try { await onReject(patch.id) } finally { setBusy(null); onClose() }
  }

  const hasHtml = !!patch.originalHtml && !!patch.patchedHtml
  const decided = patch.status === 'approved' || patch.status === 'rejected'

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-[1400px] w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-sm font-black text-white uppercase tracking-widest">
                Review Patch
              </h2>
              <span className="text-[8px] font-black px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-400 uppercase tracking-widest">
                {patch.actionType}
              </span>
              <span className={`text-[8px] font-black px-2 py-0.5 rounded border uppercase tracking-widest ${
                patch.status === 'approved' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                : patch.status === 'rejected' ? 'border-rose-500/30 bg-rose-500/10 text-rose-400'
                : 'border-slate-700 bg-slate-800 text-slate-400'
              }`}>
                {patch.status}
              </span>
            </div>
            <div className="font-mono text-[11px] text-slate-400 truncate">{patch.page}</div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {onReject && !decided && (
              <button
                disabled={busy !== null}
                onClick={handleReject}
                className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 hover:border-rose-400 rounded-xl px-3 py-2 text-[9px] font-black uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Ban size={10} />
                {busy === 'reject' ? 'Rejecting…' : 'Reject Patch'}
              </button>
            )}
            {onApply && !decided && (
              <button
                disabled={busy !== null || !hasHtml}
                onClick={handleApply}
                className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 hover:border-emerald-400 rounded-xl px-3 py-2 text-[9px] font-black uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={10} />
                {busy === 'apply' ? 'Applying…' : 'Apply Patch'}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Summary strip */}
        <div className="px-6 py-2 border-b border-slate-800 bg-slate-950/40 flex items-center gap-4 text-[10px] font-mono">
          <span className="text-emerald-400">+{diff.addedCount} added</span>
          <span className="text-rose-400">−{diff.removedCount} removed</span>
          <span className="text-slate-500">~{diff.changedCount} changed</span>
          <span className="text-slate-600 ml-auto">created {new Date(patch.createdAt).toLocaleString()}</span>
        </div>

        {/* Body */}
        {!hasHtml ? (
          <div className="flex-1 min-h-0 flex items-center justify-center p-10">
            <div className="flex flex-col items-center gap-3 text-slate-500">
              <FileWarning size={28} className="text-amber-400" />
              <div className="text-[11px] font-black uppercase tracking-widest text-amber-400">
                HTML snapshot unavailable
              </div>
              <p className="text-[10px] text-slate-500 max-w-sm text-center leading-relaxed">
                This log row has no stored original_html / patched_html. Older logs (v0.5) or
                failed/skipped runs don't persist HTML.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 min-h-0 grid grid-cols-2 divide-x divide-slate-800">
            {/* LEFT — original */}
            <div className="flex flex-col min-h-0">
              <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/50 text-[9px] font-black text-rose-300 uppercase tracking-widest">
                Original
              </div>
              <div
                ref={leftRef}
                onScroll={syncFromLeft}
                className="flex-1 min-h-0 overflow-auto font-mono text-[10px] leading-5 bg-slate-950/30"
              >
                {diff.rows.map((row, i) => {
                  const s = ROW_STYLE[row.type]
                  return (
                    <div key={`L${i}`} className={`flex ${s.leftBg}`}>
                      <span className="w-10 shrink-0 text-right pr-2 text-slate-600 select-none border-r border-slate-800/50">
                        {row.leftNum ?? ''}
                      </span>
                      <span className="w-4 shrink-0 text-center text-slate-500 select-none">
                        {row.leftText || row.type !== 'added' ? (row.type === 'same' ? ' ' : s.marker) : ''}
                      </span>
                      <code className="flex-1 px-2 whitespace-pre text-slate-300 break-all">
                        {row.leftText}
                      </code>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* RIGHT — patched */}
            <div className="flex flex-col min-h-0">
              <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/50 text-[9px] font-black text-emerald-300 uppercase tracking-widest">
                Patched
              </div>
              <div
                ref={rightRef}
                onScroll={syncFromRight}
                className="flex-1 min-h-0 overflow-auto font-mono text-[10px] leading-5 bg-slate-950/30"
              >
                {diff.rows.map((row, i) => {
                  const s = ROW_STYLE[row.type]
                  return (
                    <div key={`R${i}`} className={`flex ${s.rightBg}`}>
                      <span className="w-10 shrink-0 text-right pr-2 text-slate-600 select-none border-r border-slate-800/50">
                        {row.rightNum ?? ''}
                      </span>
                      <span className="w-4 shrink-0 text-center text-slate-500 select-none">
                        {row.rightText || row.type !== 'removed' ? (row.type === 'same' ? ' ' : s.marker) : ''}
                      </span>
                      <code className="flex-1 px-2 whitespace-pre text-slate-300 break-all">
                        {row.rightText}
                      </code>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
