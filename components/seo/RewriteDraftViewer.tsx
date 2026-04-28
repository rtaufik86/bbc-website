'use client'

// v0.6 — Rewrite Draft Review Modal.
//
// Surfaces a pending_review draft from `seo_rewrite_drafts` so a human can
// approve or reject it. NO filesystem write, NO scoring call, NO further
// LLM round-trip — approval/rejection is a DB-only status flip mirroring
// the v0.8 patch approval pipeline.
//
// Backdrop click closes; clicking inside the modal does NOT close (event
// stop-propagation). Approve/Reject buttons hide when status is already
// terminal ('approved' / 'rejected').

import React from 'react'
import { X, Check, Ban, FileText } from 'lucide-react'

interface DraftLike {
  id?:                      string
  page_path?:               string
  entity_key?:              string | null
  action_type?:             string | null
  status?:                  string
  draft_content?:           string | null
  error?:                   string | null
  created_at?:              string
  entity_score?:            number | null
  entity_score_valid?:      boolean | null
  entity_score_breakdown?:  {
    entity?:      number
    attributes?:  number
    relations?:   number
    context?:     number
  } | null
}

interface Props {
  draft:      DraftLike | null
  open:       boolean
  onClose:    () => void
  onApprove:  (draft: DraftLike) => void | Promise<void>
  onReject:   (draft: DraftLike) => void | Promise<void>
}

const STATUS_STYLE: Record<string, string> = {
  pending_review: 'text-amber-300    bg-amber-500/10    border-amber-500/30',
  approved:       'text-emerald-300  bg-emerald-500/10  border-emerald-500/30',
  rejected:       'text-rose-300     bg-rose-500/10     border-rose-500/30',
  failed:         'text-slate-300    bg-slate-700/40    border-slate-600/40',
}

export default function RewriteDraftViewer({
  draft,
  open,
  onClose,
  onApprove,
  onReject,
}: Props) {
  if (!open || !draft) return null

  const status      = (draft.status ?? 'pending_review') as string
  const statusStyle = STATUS_STYLE[status] ?? STATUS_STYLE.pending_review
  const isTerminal  = status === 'approved' || status === 'rejected'
  const content     = draft.draft_content && draft.draft_content.trim().length > 0
    ? draft.draft_content
    : null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <FileText size={16} className="text-purple-400 shrink-0" />
            <div className="min-w-0">
              <h2 className="text-sm font-black text-white uppercase tracking-widest">
                Rewrite Draft Review
              </h2>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 truncate">
                {draft.page_path ?? 'unknown path'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        {/* Meta strip */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/40 flex items-center gap-2 flex-wrap">
          <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest ${statusStyle}`}>
            {status}
          </span>
          {draft.entity_key && (
            <span className="text-[8px] font-black px-2 py-0.5 rounded border uppercase tracking-widest bg-purple-500/10 text-purple-300 border-purple-500/30">
              entity · {draft.entity_key}
            </span>
          )}
          {draft.action_type && (
            <span className="text-[8px] font-black px-2 py-0.5 rounded border uppercase tracking-widest bg-blue-500/10 text-blue-300 border-blue-500/30">
              {draft.action_type}
            </span>
          )}
          {draft.created_at && (
            <span className="text-[9px] text-slate-500 font-mono ml-auto">
              {new Date(draft.created_at).toLocaleString()}
            </span>
          )}
        </div>

        {/* Entity quality strip */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/40 flex items-center gap-3 flex-wrap">
          {typeof draft.entity_score === 'number' ? (
            <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-widest ${
              draft.entity_score_valid === true
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                : draft.entity_score_valid === false
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                : 'bg-slate-700/40 text-slate-300 border-slate-600/40'
            }`}>
              Entity Score: {draft.entity_score}/100
            </span>
          ) : (
            <span className="text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-widest bg-slate-700/40 text-slate-400 border-slate-600/40">
              No score
            </span>
          )}

          {draft.entity_score_breakdown && (
            <div className="flex items-center gap-3 flex-wrap text-[9px] font-mono text-slate-400 uppercase tracking-wider">
              {typeof draft.entity_score_breakdown.entity === 'number' && (
                <span>Entity: <span className="text-slate-200 font-bold">{draft.entity_score_breakdown.entity}</span></span>
              )}
              {typeof draft.entity_score_breakdown.attributes === 'number' && (
                <span>Attributes: <span className="text-slate-200 font-bold">{draft.entity_score_breakdown.attributes}</span></span>
              )}
              {typeof draft.entity_score_breakdown.relations === 'number' && (
                <span>Relations: <span className="text-slate-200 font-bold">{draft.entity_score_breakdown.relations}</span></span>
              )}
              {typeof draft.entity_score_breakdown.context === 'number' && (
                <span>Context: <span className="text-slate-200 font-bold">{draft.entity_score_breakdown.context}</span></span>
              )}
            </div>
          )}
        </div>

        {/* Soft warning when score below threshold */}
        {draft.entity_score_valid === false && (
          <div className="px-6 py-2 border-b border-amber-500/20 bg-amber-500/5 text-[10px] text-amber-300/90 font-medium">
            Review carefully: entity quality score is below threshold.
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {content ? (
            <pre className="whitespace-pre-wrap break-words text-[12px] leading-relaxed text-slate-200 font-sans">
              {content}
            </pre>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-slate-500 text-xs italic mb-2">
                No draft content available.
              </div>
              {draft.error && (
                <div className="text-[10px] text-rose-400/80 font-mono">
                  error: {draft.error}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            Close
          </button>
          {!isTerminal && (
            <>
              <button
                onClick={() => onReject(draft)}
                className="flex items-center gap-1.5 px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 hover:border-rose-400 transition-colors"
              >
                <Ban size={10} />
                Reject
              </button>
              <button
                onClick={() => onApprove(draft)}
                className="flex items-center gap-1.5 px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-emerald-400 transition-colors"
              >
                <Check size={10} />
                Approve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
