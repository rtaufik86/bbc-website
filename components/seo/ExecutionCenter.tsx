'use client'

import React, { useState } from 'react'
import {
  Terminal,
  ChevronRight,
  AlertCircle,
  Zap,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  Play,
  FileDiff,
  FileText,
} from 'lucide-react'
import type { AllSignals } from '../../lib/seo/signals'
import type { IntelligenceOutput } from '../../lib/seo/intelligence'
import type { FeedbackResult } from '../../lib/seo/feedback'
import type { FreezeState, AuditReport } from '../../lib/seo/execution'
import ExecutionDiffViewer from './ExecutionDiffViewer'
import type { PatchPreview } from './ExecutionDiffViewer'
import RewriteDraftViewer from './RewriteDraftViewer'

// v0.6 — minimal shape that satisfies RewriteDraftViewer's props. Loose
// typing keeps ExecutionCenter decoupled from the Supabase row type so
// callers can pass `RewriteDraftRow` without importing it here.
interface RewriteDraftLike {
  id?:            string
  page_path?:     string
  entity_key?:    string | null
  action_type?:   string | null
  status?:        string
  draft_content?: string | null
  error?:         string | null
  created_at?:    string
}

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

export interface Decision {
  path:          string
  pageType:      string
  indexability:  string
  title:         string
  wordCount:     number
  silo:          string | null
  signals:       AllSignals
  intelligence:  IntelligenceOutput
  actions:       Action[]
  issues:        string[]
  entityTokens:  string[]
  entityCovered: string[]
  entityMissing: string[]
  performance?:  { avgPosition?: number; topQuery?: string }
  health?:       { status: string; score: number }
  feedback?:     FeedbackResult
}

interface Props {
  decisions:             Decision[]
  onSelect:              (d: Decision) => void
  /** Auto Execution toggle — when absent, UI control is hidden (opt-in surface). */
  autoRunSafe?:          boolean
  onAutoRunSafeChange?:  (v: boolean) => void
  /** v0.7 — global freeze circuit breaker state. Renders a blocking banner. */
  freeze?:               FreezeState
  onReleaseFreeze?:      () => void
  /** v0.7 — manual approval path: click to run safeExecute with mode='manual'. */
  onManualRun?:          (d: Decision) => void
  /** v0.7 — last audit pass result. Shown below queue when issues > 0. */
  audit?:                AuditReport | null
  /** v0.8 — latest pending patch per page path (status='applied'|'approved'). */
  patches?:              Record<string, PatchPreview>
  /** v0.8 — approve a patch: flips seo_execution_logs.status to 'approved'. */
  onApplyPatch?:         (logId: string) => Promise<void> | void
  /** v0.8 — reject a patch: flips seo_execution_logs.status to 'rejected'. */
  onRejectPatch?:        (logId: string) => Promise<void> | void
  /** v0.6 — rewrite drafts list (newest-first, mixed status). */
  rewriteDrafts?:           RewriteDraftLike[]
  /** v0.6 — approve a rewrite draft: flips seo_rewrite_drafts.status to 'approved'. */
  onApproveRewriteDraft?:   (draft: RewriteDraftLike) => Promise<void> | void
  /** v0.6 — reject a rewrite draft: flips seo_rewrite_drafts.status to 'rejected'. */
  onRejectRewriteDraft?:    (draft: RewriteDraftLike) => Promise<void> | void
  /** v0.7 — invoke /api/rewrite/generate for a REWRITE action on a decision. */
  onGenerateRewriteDraft?:  (decision: Decision, action: Action) => Promise<unknown> | unknown
  /** v0.7 — when this matches `${path}:${actionType}`, the row's button shows a spinner. */
  generatingRewriteKey?:    string | null
}

const PRIORITY_STYLE: Record<Priority, { badge: string; dot: string }> = {
  P0: { badge: 'bg-rose-500 text-white',    dot: 'bg-rose-500' },
  P1: { badge: 'bg-orange-500 text-white',  dot: 'bg-orange-500' },
  P2: { badge: 'bg-amber-400 text-black',   dot: 'bg-amber-400' },
  P3: { badge: 'bg-slate-600 text-white',   dot: 'bg-slate-600' },
}

const ACTION_STYLE: Record<ActionType, { text: string; bg: string; border: string }> = {
  FIX:     { text: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
  REWRITE: { text: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20' },
  INJECT:  { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  KILL:    { text: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20' },
}

const IMPACT_STYLE: Record<string, string> = {
  critical: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  high:     'text-orange-400 bg-orange-500/10 border-orange-500/20',
  medium:   'text-amber-400 bg-amber-500/10 border-amber-500/20',
  low:      'text-slate-400 bg-slate-800 border-slate-700',
}

// A first action qualifies for manual Run when it matches the executor's
// eligibility gate (P0/P1 + FIX/INJECT). Keeping this logic in the UI avoids
// firing the gate and logging a useless 'skipped:priority_not_eligible' row.
function isRunnable(action: Action | undefined): boolean {
  if (!action) return false
  if (action.priority !== 'P0' && action.priority !== 'P1') return false
  return action.type === 'FIX' || action.type === 'INJECT'
}

export default function ExecutionCenter({
  decisions,
  onSelect,
  autoRunSafe,
  onAutoRunSafeChange,
  freeze,
  onReleaseFreeze,
  onManualRun,
  audit,
  patches,
  onApplyPatch,
  onRejectPatch,
  rewriteDrafts,
  onApproveRewriteDraft,
  onRejectRewriteDraft,
  onGenerateRewriteDraft,
  generatingRewriteKey,
}: Props) {
  // v0.8 — modal state for Review Patch. Local so the dashboard doesn't need
  // to track which patch is being reviewed.
  const [reviewing, setReviewing] = useState<PatchPreview | null>(null)
  // v0.6 — modal state for Review Rewrite Draft.
  const [reviewingDraft, setReviewingDraft] = useState<RewriteDraftLike | null>(null)

  // Sort drafts: pending_review first, then by created_at desc (assumed
  // newest-first input but we re-sort defensively). Cap to 5 surface-rows.
  const sortedDrafts = (rewriteDrafts ?? []).slice().sort((a, b) => {
    const aPending = a.status === 'pending_review' ? 0 : 1
    const bPending = b.status === 'pending_review' ? 0 : 1
    if (aPending !== bPending) return aPending - bPending
    const aTime = a.created_at ? Date.parse(a.created_at) : 0
    const bTime = b.created_at ? Date.parse(b.created_at) : 0
    return bTime - aTime
  })
  const visibleDrafts     = sortedDrafts.slice(0, 5)
  const pendingDraftCount = sortedDrafts.filter(d => d.status === 'pending_review').length
  // Queue gate: P0/P1 priority AND at least one executable action. A decision
  // can carry a P0 priority for genuine performance/opportunity reasons (e.g.
  // high_impression_opportunity) while having actions.length === 0 because
  // governance + scoring filters cleared the page. Those don't belong in
  // Today's Focus — they have nothing for the operator to execute.
  const isExecutable = (d: Decision) =>
    ['P0', 'P1'].includes(d.intelligence.priority.value) && d.actions.length > 0

  // Sort: P0 first, then P1. Within each tier: impact score desc (totalGap desc).
  const queue = [...decisions]
    .filter(isExecutable)
    .sort((a, b) => {
      const aPriority = a.intelligence.priority.value
      const bPriority = b.intelligence.priority.value
      if (aPriority !== bPriority) return aPriority.localeCompare(bPriority)
      return b.intelligence.impact.totalGap - a.intelligence.impact.totalGap
    })
    .slice(0, 5)

  // Header counts mirror queue eligibility so badges + footer "+N more" stay
  // in sync with the visible list.
  const p0Count = decisions.filter(d => isExecutable(d) && d.intelligence.priority.value === 'P0').length
  const p1Count = decisions.filter(d => isExecutable(d) && d.intelligence.priority.value === 'P1').length

  const frozen        = freeze?.frozen === true
  const modeLabel     = frozen ? 'FROZEN' : autoRunSafe ? 'SAFE (AUTO)' : 'MANUAL'
  const modeStyle     = frozen
    ? 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    : autoRunSafe
    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    : 'text-slate-400 bg-slate-800 border-slate-700'

  if (queue.length === 0) {
    return (
      <div className="bg-slate-900 border border-emerald-500/20 rounded-3xl p-10 text-center">
        <div className="text-emerald-400 font-black text-lg mb-2">✓ Nothing Critical</div>
        <p className="text-slate-500 text-xs">No P0 or P1 items in the execution queue.</p>
      </div>
    )
  }

  return (
    <>
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal size={16} className="text-rose-500" />
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-widest">
              Today's Focus
            </h2>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
              Execution queue — priority sorted
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest ${modeStyle}`}>
            {modeLabel}
          </span>
          {onAutoRunSafeChange && !frozen && (
            <label className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest cursor-pointer select-none">
              <input
                type="checkbox"
                checked={!!autoRunSafe}
                onChange={e => onAutoRunSafeChange(e.target.checked)}
                className="w-3 h-3 rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500/40 focus:ring-offset-0"
              />
              <span className={autoRunSafe ? 'text-emerald-400' : 'text-slate-500'}>
                Auto Execution
              </span>
            </label>
          )}
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-[9px] font-black text-slate-500">{p0Count} P0</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-[9px] font-black text-slate-500">{p1Count} P1</span>
          </div>
        </div>
      </div>

      {/* v0.7 — Freeze banner. When active, blocks all run CTAs until released. */}
      {frozen && (
        <div className="px-6 py-3 bg-rose-500/10 border-b border-rose-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldAlert size={14} className="text-rose-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-[11px] font-black text-rose-300 uppercase tracking-widest">
                Auto Execution Frozen
              </div>
              <div className="text-[9px] text-rose-400/70 font-mono truncate">
                reason: {freeze?.reason ?? 'unknown'}
                {freeze?.triggeredAt && (
                  <span className="ml-2 text-slate-500">
                    @ {new Date(freeze.triggeredAt).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          {onReleaseFreeze && (
            <button
              onClick={onReleaseFreeze}
              className="shrink-0 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition-colors"
            >
              <ShieldCheck size={10} />
              Release
            </button>
          )}
        </div>
      )}

      {/* Queue */}
      <div className="divide-y divide-slate-800/50">
        {queue.map((d, i) => {
          const priority  = d.intelligence.priority
          const impact    = d.intelligence.impact
          const pStyle    = PRIORITY_STYLE[priority.value]
          const firstAction = d.actions[0]
          const aStyle    = firstAction ? ACTION_STYLE[firstAction.type] : ACTION_STYLE.FIX
          const canManualRun = !frozen && !autoRunSafe && isRunnable(firstAction) && !!onManualRun
          const patch       = patches?.[d.path]

          return (
            <div
              key={d.path}
              className="group px-6 py-4 hover:bg-slate-800/30 transition-colors cursor-default"
            >
              {/* Top row */}
              <div className="flex items-start gap-3">
                {/* Step number */}
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[9px] font-black text-slate-400">{i + 1}</span>
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0 space-y-2">
                  {/* URL + badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${pStyle.badge}`}>
                      {priority.value}
                    </span>
                    {firstAction && (
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded border uppercase tracking-widest ${aStyle.bg} ${aStyle.text} ${aStyle.border}`}>
                        {firstAction.type}
                      </span>
                    )}
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest ${IMPACT_STYLE[impact.band]}`}>
                      {impact.band}
                    </span>
                    {d.issues.includes('angle_overlap') && (
                      <AlertCircle size={10} className="text-rose-500 animate-pulse shrink-0" />
                    )}
                  </div>

                  {/* Path + health indicator + feedback signal */}
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-[11px] text-slate-300 truncate">{d.path}</div>
                    {d.health?.status === 'critical' && (
                      <span className="shrink-0 text-[8px] font-black text-rose-500 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        ⚠ critical
                      </span>
                    )}
                    {d.health?.status === 'warning' && (
                      <span className="shrink-0 text-[8px] font-black text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        ⚠ warning
                      </span>
                    )}
                    {d.feedback?.result === 'declined' && (
                      <span className="shrink-0 flex items-center gap-0.5 text-[8px] font-black text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        <TrendingDown size={8} />
                        ↓
                      </span>
                    )}
                    {d.feedback?.result === 'improved' && (
                      <span className="shrink-0 flex items-center gap-0.5 text-[8px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        <TrendingUp size={8} />
                        ↑
                      </span>
                    )}
                  </div>
                  {(d.performance?.avgPosition || d.performance?.topQuery) && (
                    <div className="text-[9px] text-slate-600 font-mono">
                      {d.performance.avgPosition != null && (
                        <span className={d.performance.avgPosition > 10 ? 'text-rose-500' : 'text-amber-400'}>
                          #{d.performance.avgPosition.toFixed(1)}
                        </span>
                      )}
                      {d.performance.avgPosition != null && d.performance.topQuery && ' · '}
                      {d.performance.topQuery && (
                        <span className="italic">{d.performance.topQuery}</span>
                      )}
                    </div>
                  )}

                  {/* Reason */}
                  <div className="text-[9px] text-slate-500 italic leading-snug">
                    {priority.reason}
                  </div>

                  {/* Issues */}
                  {d.issues.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {d.issues.map(issue => (
                        <span key={issue} className="text-[8px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded font-mono">
                          #{issue}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => onSelect(d)}
                    className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 hover:border-rose-400 rounded-xl px-3 py-2 text-[9px] font-black uppercase tracking-widest transition-all group-hover:shadow-lg group-hover:shadow-rose-500/10"
                  >
                    <Zap size={10} />
                    Review
                    <ChevronRight size={10} />
                  </button>
                  {canManualRun && (
                    <button
                      onClick={() => onManualRun?.(d)}
                      className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 hover:border-emerald-400 rounded-xl px-3 py-2 text-[9px] font-black uppercase tracking-widest transition-all"
                      title="Approve and run safeExecute in manual mode"
                    >
                      <Play size={10} />
                      Run Now
                    </button>
                  )}
                  {patch && (
                    <button
                      onClick={() => setReviewing(patch)}
                      className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/20 hover:border-amber-400 rounded-xl px-3 py-2 text-[9px] font-black uppercase tracking-widest transition-all"
                      title={`Review patched HTML (status: ${patch.status})`}
                    >
                      <FileDiff size={10} />
                      Review Patch
                    </button>
                  )}
                  {firstAction?.type === 'REWRITE' && onGenerateRewriteDraft && (() => {
                    const genKey      = `${d.path}:${firstAction.type}`
                    const isGenerating = generatingRewriteKey === genKey
                    return (
                      <button
                        onClick={() => { if (!isGenerating) void onGenerateRewriteDraft(d, firstAction) }}
                        disabled={isGenerating}
                        className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[9px] font-black uppercase tracking-widest transition-all border ${
                          isGenerating
                            ? 'bg-purple-500/5 text-purple-300/60 border-purple-500/10 cursor-wait'
                            : 'bg-purple-500/10 hover:bg-purple-500 text-purple-300 hover:text-white border-purple-500/30 hover:border-purple-400'
                        }`}
                        title="Call /api/rewrite/generate for this REWRITE action"
                      >
                        <FileText size={10} />
                        {isGenerating ? 'Generating…' : 'Generate Draft'}
                      </button>
                    )
                  })()}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      {(p0Count + p1Count) > 5 && (
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/30">
          <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest text-center">
            +{(p0Count + p1Count) - 5} more items in queue — resolve these first
          </p>
        </div>
      )}

      {/* v0.6 — Rewrite Drafts panel. Surfaces pending_review rows so a
          human can review before any downstream action. Hidden when no
          drafts exist OR no handlers wired (opt-in surface). */}
      {visibleDrafts.length > 0 && onApproveRewriteDraft && onRejectRewriteDraft && (
        <div className="px-6 py-4 border-t border-purple-500/20 bg-purple-500/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText size={11} className="text-purple-400" />
              <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest">
                Rewrite Drafts
              </span>
              {pendingDraftCount > 0 && (
                <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase tracking-widest">
                  {pendingDraftCount} pending
                </span>
              )}
            </div>
            {sortedDrafts.length > 5 && (
              <span className="text-[9px] text-slate-500 font-mono">
                +{sortedDrafts.length - 5} more
              </span>
            )}
          </div>
          <ul className="space-y-1.5">
            {visibleDrafts.map(d => {
              const status      = d.status ?? 'pending_review'
              const statusColor =
                status === 'pending_review' ? 'text-amber-300 bg-amber-500/10 border-amber-500/30'
                : status === 'approved'     ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30'
                : status === 'rejected'     ? 'text-rose-300 bg-rose-500/10 border-rose-500/30'
                :                             'text-slate-300 bg-slate-700/40 border-slate-600/40'
              return (
                <li
                  key={d.id ?? `${d.page_path}-${d.created_at}`}
                  className="flex items-center gap-2 text-[10px]"
                >
                  <span className={`shrink-0 text-[8px] font-black px-1.5 py-0.5 rounded border uppercase tracking-widest ${statusColor}`}>
                    {status.replace('_', ' ')}
                  </span>
                  <span className="font-mono text-slate-300 truncate flex-1">
                    {d.page_path ?? '<unknown>'}
                  </span>
                  {d.created_at && (
                    <span className="shrink-0 text-[9px] text-slate-500 font-mono">
                      {new Date(d.created_at).toLocaleString()}
                    </span>
                  )}
                  <button
                    onClick={() => setReviewingDraft(d)}
                    className={`shrink-0 flex items-center gap-1 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border transition-colors ${
                      d.status === 'approved'
                        ? 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-white border-emerald-500/30 hover:border-emerald-400'
                        : 'bg-purple-500/10 hover:bg-purple-500 text-purple-300 hover:text-white border-purple-500/30 hover:border-purple-400'
                    }`}
                  >
                    <FileText size={9} />
                    {d.status === 'approved'
                      ? 'Copy for GPT Review'
                      : d.status === 'rejected'
                      ? 'View Rejected Draft'
                      : 'Review Draft'}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* v0.7 — Audit report surface. Only shows when last run produced issues. */}
      {audit && audit.issues.length > 0 && (
        <div className="px-6 py-3 border-t border-amber-500/20 bg-amber-500/5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShieldAlert size={11} className="text-amber-400" />
              <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest">
                Run Audit · {audit.issues.length} issue{audit.issues.length === 1 ? '' : 's'}
              </span>
            </div>
            <span className="text-[9px] text-slate-500 font-mono">run · {audit.runId}</span>
          </div>
          <ul className="space-y-1">
            {audit.issues.map((issue, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[10px] leading-snug">
                <span className="text-[8px] font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded px-1.5 py-0.5 uppercase tracking-wider shrink-0">
                  {issue.kind.replace(/_/g, ' ')}
                </span>
                <span className="font-mono text-slate-400 truncate">{issue.page}</span>
                <span className="text-slate-500 italic">— {issue.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {/* v0.8 — Patch review modal. Mounted at the top-level so its overlay
        escapes the queue card's overflow-hidden clip. */}
    {reviewing && (
      <ExecutionDiffViewer
        patch={reviewing}
        onClose={() => setReviewing(null)}
        onApply={onApplyPatch}
        onReject={onRejectPatch}
      />
    )}

    {/* v0.6 — Rewrite Draft review modal. Same top-level mount pattern. */}
    <RewriteDraftViewer
      draft={reviewingDraft}
      open={!!reviewingDraft}
      onClose={() => setReviewingDraft(null)}
      onApprove={async d => {
        if (onApproveRewriteDraft) await onApproveRewriteDraft(d)
        setReviewingDraft(null)
      }}
      onReject={async d => {
        if (onRejectRewriteDraft) await onRejectRewriteDraft(d)
        setReviewingDraft(null)
      }}
    />
    </>
  )
}
