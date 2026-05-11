'use client'

import React from 'react'
import { ShieldCheck, AlertTriangle } from 'lucide-react'

// Quality Gate Panel v2A — display-only alert badges for indexable pages.
// Badges are computed locally from decision.quality and do NOT affect
// issue / action / priority / queue logic in any way.

type QualityLabel = 'strong' | 'fair' | 'weak'
type AlertPriority = 'high' | 'medium'

interface QualityScoreLike {
  score:    number
  label:    QualityLabel
  checks?:  Record<string, boolean>
  notes?:   string[]
}

interface QualityShape {
  entityPlacement:    QualityScoreLike
  answerFirst:        QualityScoreLike
  interaction:        QualityScoreLike
  taskSuccess:        QualityScoreLike
  trustVisibility:    QualityScoreLike
  serpOptimization:   QualityScoreLike
  overall:            number
  overallLabel:       QualityLabel
}

interface QualityDecisionLike {
  path:          string
  title?:        string
  status?:       string
  pageType?:     string
  priority?:     string
  actions?:      unknown[]
  quality?:      QualityShape
  indexability?: string   // 'index' | 'noindex' — forwarded from CoreDecision
}

interface QualityAlert {
  id:       'trust_weak' | 'overall_fair' | 'answer_fair' | 'entity_fair'
  label:    string
  reason:   string
  priority: AlertPriority
}

interface Props {
  decisions: QualityDecisionLike[]
}

// ── Style helpers ────────────────────────────────────────────────────────────

const LABEL_STYLE: Record<QualityLabel, { pill: string; bar: string; text: string }> = {
  strong: {
    pill: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    bar:  'bg-emerald-500',
    text: 'text-emerald-400',
  },
  fair: {
    pill: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    bar:  'bg-amber-500',
    text: 'text-amber-400',
  },
  weak: {
    pill: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    bar:  'bg-rose-500',
    text: 'text-rose-400',
  },
}

const ALERT_STYLE: Record<AlertPriority, string> = {
  high:   'bg-rose-500/10 text-rose-400 border border-rose-500/30',
  medium: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
}

const DIMENSION_LABELS: Array<{ key: keyof QualityShape; short: string }> = [
  { key: 'entityPlacement',  short: 'Entity'      },
  { key: 'answerFirst',      short: 'Answer'       },
  { key: 'interaction',      short: 'Interaction'  },
  { key: 'taskSuccess',      short: 'Task'         },
  { key: 'trustVisibility',  short: 'Trust'        },
  { key: 'serpOptimization', short: 'SERP'         },
]

// ── Badge logic ──────────────────────────────────────────────────────────────

const NOINDEX_PREFIXES = [
  '/admin', '/login', '/signup', '/forgot-password', '/auth/',
  '/internal-links', '/web-audit', '/seo-control-center',
]

// Pages excluded from quality alert badges for editorial reasons.
// Exact-path matches only — does not affect siblings or parent paths.
const EXCLUDED_QUALITY_ALERT_PATHS = [
  '/legal/cek-kbli', // Regulatory reference/lookup tool — trust signals not expected here
]

function isQualityBadgeEligible(d: QualityDecisionLike): boolean {
  if (!d.quality) return false
  if (d.indexability === 'noindex') return false
  if (d.pageType === 'utility') return false
  const p = d.path ?? ''
  if (NOINDEX_PREFIXES.some(pfx => p === pfx || p.startsWith(pfx + '/'))) return false
  if (EXCLUDED_QUALITY_ALERT_PATHS.includes(p)) return false
  return true
}

// Priority order: trust_weak → overall_fair → answer_fair → entity_fair.
// interaction / taskSuccess intentionally excluded (inflated in v2A baseline).
// Maximum 3 badges per page.
function getQualityAlerts(q: QualityShape): QualityAlert[] {
  const alerts: QualityAlert[] = []
  if (q.trustVisibility.score < 57)
    alerts.push({ id: 'trust_weak',   label: 'Trust weak',        reason: 'Trust proof below recommended visibility', priority: 'high'   })
  if (q.overall < 85)
    alerts.push({ id: 'overall_fair', label: 'Overall fair',      reason: 'Overall Quality Gate below alert threshold', priority: 'medium' })
  if (q.answerFirst.score < 80)
    alerts.push({ id: 'answer_fair',  label: 'Answer-first fair', reason: 'Opening may not answer intent strongly',   priority: 'medium' })
  if (q.entityPlacement.score < 72)
    alerts.push({ id: 'entity_fair',  label: 'Entity weak',       reason: 'Entity placement may be unclear',         priority: 'medium' })
  return alerts.slice(0, 3)
}

// ── Component ────────────────────────────────────────────────────────────────

export default function QualityGatePanel({ decisions }: Props) {
  const scored = decisions.filter((d): d is QualityDecisionLike & { quality: QualityShape } =>
    Boolean(d.quality),
  )

  if (scored.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <Header alertCount={0} />
        <p className="mt-4 text-xs text-slate-500">Quality scores are not available yet.</p>
      </div>
    )
  }

  const overallAvg = Math.round(
    scored.reduce((sum, d) => sum + d.quality.overall, 0) / scored.length,
  )

  const counts = scored.reduce(
    (acc, d) => {
      acc[d.quality.overallLabel]++
      return acc
    },
    { strong: 0, fair: 0, weak: 0 } as Record<QualityLabel, number>,
  )

  const weakest = [...scored]
    .sort((a, b) => a.quality.overall - b.quality.overall)
    .slice(0, 5)

  // Alert pages: indexable pages with at least one badge, sorted by
  // alert count desc then overall score asc. Capped at 5.
  const alertPages = scored
    .filter(isQualityBadgeEligible)
    .map(d => ({ d, alerts: getQualityAlerts(d.quality) }))
    .filter(({ alerts }) => alerts.length > 0)
    .sort((a, b) => b.alerts.length - a.alerts.length || a.d.quality.overall - b.d.quality.overall)
    .slice(0, 5)

  const alertCount = scored.filter(d => isQualityBadgeEligible(d) && getQualityAlerts(d.quality).length > 0).length

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-5">
      <Header alertCount={alertCount} />

      {/* Aggregate strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCell label="Overall Avg" value={`${overallAvg}`} accent={LABEL_STYLE[labelFor(overallAvg)].text} />
        <StatCell label="Strong" value={`${counts.strong}`} accent="text-emerald-400" />
        <StatCell label="Fair"   value={`${counts.fair}`}   accent="text-amber-400"   />
        <StatCell label="Weak"   value={`${counts.weak}`}   accent="text-rose-400"    />
      </div>

      {/* Alert pages — indexable pages with quality badges */}
      <div>
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <AlertTriangle size={10} className="text-amber-400" />
          Quality Alerts — Indexable Pages
        </h3>
        {alertPages.length === 0 ? (
          <p className="text-xs text-slate-600 italic">
            No public-page quality alerts under current thresholds.
          </p>
        ) : (
          <div className="space-y-2">
            {alertPages.map(({ d, alerts }) => (
              <AlertRow key={d.path} d={d} alerts={alerts} />
            ))}
          </div>
        )}
      </div>

      {/* Weakest pages list */}
      <div>
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
          Weakest 5 — Quality Gate
        </h3>
        <div className="space-y-3">
          {weakest.map(d => (
            <WeakRow key={d.path} d={d} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ───────────────────────────────────────────────────────────

function Header({ alertCount }: { alertCount: number }) {
  return (
    <div className="flex items-start justify-between gap-3 flex-wrap">
      <div className="flex items-start gap-3">
        <div className="bg-gradient-to-br from-violet-500 to-fuchsia-600 p-2 rounded-xl shadow-lg shadow-violet-500/20">
          <ShieldCheck size={16} className="text-white" />
        </div>
        <div>
          <h2 className="text-sm font-black text-white uppercase tracking-tight">Quality Gate</h2>
          <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5 max-w-2xl">
            Read-only scoring layer for entity, answer-first, interaction, trust, task success, and SERP readiness.
          </p>
        </div>
      </div>
      {alertCount > 0 && (
        <div className="flex items-center gap-1.5 text-[10px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full">
          <AlertTriangle size={9} />
          {alertCount} quality alert{alertCount > 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}

function StatCell({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</div>
      <div className={`text-2xl font-black ${accent} mt-1`}>{value}</div>
    </div>
  )
}

function BadgeStrip({ alerts }: { alerts: QualityAlert[] }) {
  if (alerts.length === 0) return null
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {alerts.map(a => (
        <span
          key={a.id}
          title={a.reason}
          className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${ALERT_STYLE[a.priority]}`}
        >
          {a.label}
        </span>
      ))}
    </div>
  )
}

function AlertRow({ d, alerts }: { d: QualityDecisionLike & { quality: QualityShape }; alerts: QualityAlert[] }) {
  const q = d.quality
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 flex items-start justify-between gap-3 flex-wrap">
      <div className="min-w-0 flex-1">
        <span className="text-xs font-mono text-slate-300 truncate block">{d.path}</span>
        {d.title && <span className="text-[11px] text-slate-500 truncate block mt-0.5">{d.title}</span>}
        <BadgeStrip alerts={alerts} />
      </div>
      <div className={`text-[10px] font-black uppercase tracking-widest border px-2 py-1 rounded-full shrink-0 ${LABEL_STYLE[q.overallLabel].pill}`}>
        {q.overall} · {q.overallLabel}
      </div>
    </div>
  )
}

function WeakRow({ d }: { d: QualityDecisionLike & { quality: QualityShape } }) {
  const q          = d.quality
  const overallSty = LABEL_STYLE[q.overallLabel]
  const actionN    = d.actions?.length ?? 0
  const eligible   = isQualityBadgeEligible(d)
  const alerts     = eligible ? getQualityAlerts(q) : []

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-slate-300 truncate">{d.path}</span>
            {d.pageType && (
              <span className="text-[9px] font-black bg-slate-800 text-slate-400 border border-slate-700 px-1.5 py-0.5 rounded uppercase tracking-widest">
                {d.pageType}
              </span>
            )}
            {d.status && (
              <span className="text-[9px] font-black bg-slate-800 text-slate-400 border border-slate-700 px-1.5 py-0.5 rounded uppercase tracking-widest">
                {d.status}
              </span>
            )}
            {actionN > 0 && (
              <span className="text-[9px] font-black bg-slate-800 text-slate-400 border border-slate-700 px-1.5 py-0.5 rounded uppercase tracking-widest">
                {actionN} action{actionN > 1 ? 's' : ''}
              </span>
            )}
          </div>
          {d.title && (
            <div className="text-[11px] text-slate-500 truncate mt-1">{d.title}</div>
          )}
        </div>
        <div className={`text-[10px] font-black uppercase tracking-widest border px-2 py-1 rounded-full ${overallSty.pill}`}>
          {q.overall} · {q.overallLabel}
        </div>
      </div>

      {/* 6 dimension bars */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
        {DIMENSION_LABELS.map(({ key, short }) => {
          const dim = q[key] as QualityScoreLike
          const sty = LABEL_STYLE[dim.label]
          return (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest">
                <span className="text-slate-500">{short}</span>
                <span className={sty.text}>{dim.score}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full ${sty.bar}`}
                  style={{ width: `${Math.max(0, Math.min(100, dim.score))}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Alert badges — only for indexable public pages */}
      {alerts.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-800">
          <BadgeStrip alerts={alerts} />
        </div>
      )}
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function labelFor(score: number): QualityLabel {
  if (score >= 80) return 'strong'
  if (score >= 60) return 'fair'
  return 'weak'
}
