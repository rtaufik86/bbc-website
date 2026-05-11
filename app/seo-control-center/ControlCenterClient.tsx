'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Cpu, Lock, Zap } from 'lucide-react'
import { computeAllSignals, toSignalInput } from '../../lib/seo/signals'
import {
  computeIntelligence,
  optimizeActions,
  sequenceActions,
} from '../../lib/seo/intelligence'
import type { AllSignals } from '../../lib/seo/signals'
import type { IntelligenceOutput } from '../../lib/seo/intelligence'
import {
  mapQueriesToPage,
  computePagePerformance,
} from '../../lib/seo/performance'
import type { PagePerformance } from '../../lib/seo/performance'
import { computeHealth } from '../../lib/seo/health'
import type { HealthResult } from '../../lib/seo/health'
import { computeWindowFeedback, computeActionStats } from '../../lib/seo/feedback'
import type { FeedbackResult, WindowAverage, ActionStat, ActionResultRow } from '../../lib/seo/feedback'
import { computeQuality } from '../../lib/seo/quality'
import type { QualityResult } from '../../lib/seo/quality'
import {
  safeExecute,
  createRunContext,
  getFreezeState,
  evaluateFreezeRisk,
  triggerFreeze,
  releaseFreeze,
  auditRun,
} from '../../lib/seo/execution'
import type {
  SafeAction,
  SafePageType,
  FreezeState,
  AuditReport,
} from '../../lib/seo/execution'
import { createClient } from '../../lib/supabase/client'
import { buildRewriteDraftPrompt } from '../../lib/seo/execution/rewriteDraft'
import { resolveEntityKey }        from '../../lib/seo/entity'
// Direct imports from `store.ts` (browser-safe) to bypass the rewrite barrel
// which re-exports `generate.ts` — that module is `server-only` and would
// trip Turbopack the moment a client component pulls in the barrel.
import { fetchRewriteDrafts, updateRewriteDraftStatus } from '../../lib/seo/rewrite/store'
import type { RewriteDraftRow }                          from '../../lib/seo/rewrite/store'

import SystemOverview      from '../../components/seo/SystemOverview'
import ExecutionCenter,    { Decision as ExecDecision }     from '../../components/seo/ExecutionCenter'
import PageExecutionDetail, { Decision as DetailDecision }  from '../../components/seo/PageExecutionDetail'
import EntityOverview      from '../../components/seo/EntityOverview'
import QualityGatePanel    from '../../components/seo/QualityGatePanel'
import OpportunityBoard    from '../../components/seo/OpportunityBoard'
import type { PatchPreview }                                from '../../components/seo/ExecutionDiffViewer'

// ── TYPES ────────────────────────────────────────────────────────────────────

interface AuditPage {
  path: string; pageType: string; indexability: string; title: string;
  wordCount: number; h1Count: number; schemaTypes: string[];
  inSitemap: boolean; orphanRisk: boolean; breadcrumb: boolean;
  linksIn:  { from: string; anchor: string }[];
  linksOut: { href: string; anchor: string; isContextual: boolean }[];
  status: string; description: string;
  expectedFAQ?: boolean;
  firstMoneyLinkBefore300?: boolean;
  h1Texts?: string[];
  h2Texts?: string[];
  introText?: string;
}

interface RegistryEntry {
  url: string; pageType: string; cluster: string; angle: string;
  entity: string; intent: string; queryBank: string[];
}

interface Props {
  auditData:        AuditPage[]
  registryEntries:  RegistryEntry[]
}

type ActionType = 'FIX' | 'REWRITE' | 'INJECT' | 'KILL'
type Priority   = 'P0' | 'P1' | 'P2' | 'P3'

interface RawAction {
  type:          ActionType
  priority:      Priority
  reason:        string
  executionHint: string
}

/**
 * CoreDecision — the single data contract for the v3 UI.
 * Computed ONCE in the useMemo below; child components read-only.
 */
interface CoreDecision {
  path:           string
  pageType:       string
  indexability:   string
  title:          string
  wordCount:      number
  silo:           string | null
  signals:        AllSignals
  intelligence:   IntelligenceOutput
  actions:        (RawAction & { executionOrder?: number; executionStep?: number })[]
  issues:         string[]
  entityTokens:   string[]
  entityCovered:  string[]
  entityMissing:  string[]
  health?:               HealthResult
  performance?:          PagePerformance
  performanceHint?:      string
  feedback?:             FeedbackResult
  quality?:              QualityResult
  priorityExplanation?:  {
    position:    number | null
    impressions: number
    entityScore: number
    reason:      string
  }
}

// ── SILO DETECTION ───────────────────────────────────────────────────────────

function detectSilo(path: string): string | null {
  if (path.includes('/virtual-office'))  return 'virtual-office'
  if (path.includes('/sewa-kantor'))     return 'sewa-kantor'
  if (
    path.includes('/legal') ||
    path.includes('/pendirian-pt') ||
    path.includes('/pendirian-cv') ||
    path.startsWith('/pt-') ||
    path.startsWith('/cv-')
  ) return 'legal'
  return null
}

// Last-resort entity-key inference when resolveEntityKey() can't match an
// alias and the decision carries no entity label. The 3 keys here mirror the
// BBC_ENTITIES registry used by score / prompt; keep in sync if entities are
// renamed there.
function inferEntityKeyFromPath(path?: string | null): string | null {
  if (!path) return null
  const normalized = path.toLowerCase()
  if (normalized.includes('virtual-office'))                              return 'virtual-office'
  if (normalized.includes('sewa-kantor'))                                 return 'sewa-kantor'
  if (normalized.includes('pendirian-pt') || normalized.includes('legal')) return 'pendirian-pt'
  return null
}

// ── ACTION BUILDER ────────────────────────────────────────────────────────────
// Derives a minimal action list from detected issues + intelligence priority.
// Actions are then run through optimizeActions → sequenceActions so the UI
// always receives a clean, ordered, max-3 list without recomputing.

function buildActions(
  issues:        string[],
  intelligence:  IntelligenceOutput,
  inSitemap:     boolean,
  h1Count:       number,
): (RawAction & { executionOrder?: number; executionStep?: number })[] {
  const raw: RawAction[] = []

  // A. Technical blockers — always P0
  const techIssues = [
    h1Count === 0   && 'no H1',
    !inSitemap      && 'not in sitemap',
  ].filter(Boolean) as string[]

  if (techIssues.length > 0) {
    raw.push({
      type:          'FIX',
      priority:      'P0',
      reason:        `Technical blocker: ${techIssues.join(', ')}`,
      executionHint: 'Add H1 tag and include page in XML sitemap',
    })
  }

  // B. Kill duplicates — always P0
  if (issues.includes('angle_overlap')) {
    raw.push({
      type:          'KILL',
      priority:      'P0',
      reason:        'Duplicate intent detected — redirect candidate',
      executionHint: '301 redirect to canonical page in same silo',
    })
  }

  // C. Content rewrite — intelligence-derived priority
  const contentIssues = issues.filter(i => ['thin_content', 'no_faq'].includes(i))
  if (contentIssues.length > 0) {
    raw.push({
      type:          'REWRITE',
      priority:      intelligence.priority.value,
      reason:        `Content gap: ${contentIssues.join(', ')}`,
      executionHint: 'Add 200-word direct answer intro + expand FAQ to 3-4 entries with FAQPage schema',
    })
  }

  // D. Authority / link injection — intelligence-derived priority
  const linkIssues = issues.filter(i => ['authority_gap', 'orphan_risk', 'missing_money_link'].includes(i))
  if (linkIssues.length > 0) {
    raw.push({
      type:          'INJECT',
      priority:      intelligence.priority.value,
      reason:        `Link gap: ${linkIssues.join(', ')}`,
      executionHint: 'Inject silo-hub → page link and money-page CTA within first 300 words',
    })
  }

  // Apply optimizer + sequencer (max 3, KILL supersedes, canonical order)
  return sequenceActions(optimizeActions(raw))
}

// ── ENTITY TOKEN ANALYSIS ─────────────────────────────────────────────────────

function analyzeEntityTokens(path: string, title: string, description: string, h1Texts: string[]) {
  const tokens  = path.toLowerCase().split(/[\/\-_]+/).filter(t => t.length >= 3)
  const haystack = `${title} ${h1Texts.join(' ')} ${description}`.toLowerCase()
  return {
    entityTokens:  tokens,
    entityCovered: tokens.filter(t => haystack.includes(t)),
    entityMissing: tokens.filter(t => !haystack.includes(t)),
  }
}

// ── PERFORMANCE MOCK (replace with real GSC feed when wired) ──────────────────
// Lifted out of the component so referential identity is stable across renders.
const performanceMock = [
  {
    query:       'harga virtual office jakarta selatan',
    page:        '/harga-virtual-office-jakarta-selatan',
    clicks:      45,
    impressions: 1200,
    ctr:         0.037,
    position:    11,
  },
]

// ── SNAPSHOT AVG HELPER ───────────────────────────────────────────────────────
// DB row shape (seo_performance_snapshots): { page, position, ctr, impressions, created_at }
// Returns null when the window has no data — guards downstream feedback against
// false signals from empty windows.

interface SnapshotRow {
  page:        string
  position:    number | null
  ctr:         number | null
  impressions: number | null
  created_at:  string
}

function avgWindow(rows: SnapshotRow[] | null | undefined, path: string): WindowAverage | null {
  if (!rows || rows.length === 0) return null
  let posSum = 0, posCount = 0, ctrSum = 0, impSum = 0
  for (const r of rows) {
    if (r.position != null) { posSum += r.position; posCount++ }
    ctrSum += r.ctr         ?? 0
    impSum += r.impressions ?? 0
  }
  return {
    path,
    avgPosition:      posCount > 0 ? posSum / posCount : null,
    totalImpressions: Math.round(impSum),
    totalClicks:      0, // DB schema does not store clicks
    ctr:              ctrSum / rows.length,
  }
}

// ── ATTRIBUTION v1.1 — multi-action decay + time-delay filter ───────────────
// MIN_ATTRIBUTION_DAYS: an action must be at least this old before it counts
// toward attribution. Younger actions haven't had time to move GSC metrics
// so pairing them with a feedback event would be spurious.
const MIN_ATTRIBUTION_DAYS = 3
const ATTRIBUTION_WINDOW   = 3  // max number of recent logs inspected per page

interface ActionLogRow {
  action_type: string
  executed_at: string
}

interface AttributedAction extends ActionLogRow {
  weight: number
}

// Apply harmonic decay (1, 1/2, 1/3…) so the newest mature action owns the
// largest share of attribution while older actions still contribute.
function resolveAttributedAction(actions: ActionLogRow[]): AttributedAction[] | null {
  if (!actions || actions.length === 0) return null
  return actions.map((a, idx) => ({ ...a, weight: 1 / (idx + 1) }))
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────

export default function ControlCenterClient({ auditData }: Props) {
  const [selectedDecision, setSelectedDecision] = useState<CoreDecision | null>(null)

  // ── Historical windows from Supabase (7d recent vs 7d previous) ──────────
  // Keyed by page path. `null` entries mean "query resolved, no data for window".
  // `undefined` (missing key) means "not loaded yet" → feedback stays undefined.
  const [historicalByPath, setHistoricalByPath] =
    useState<Record<string, { before: WindowAverage | null; after: WindowAverage | null }>>({})

  // ── Action Attribution Engine v1.0 — per-action success rates ─────────────
  // Loaded once per mount. Empty array until resolved; filter stays inert in
  // that window so no valid action is suppressed by stale/missing stats.
  const [actionStats, setActionStats] = useState<ActionStat[]>([])

  // Dedup keys for attribution writes within a single mount. Key shape:
  // `${path}:${feedback.result}`. Prevents re-inserting the same outcome on
  // every render while `decisions` remains stable.
  const writtenResultsRef = useRef<Set<string>>(new Set())

  // ── Auto Execution Engine v0.5 — toggle + session dedup ──────────────────
  // autoRunSafe: OFF by default. User opts in via the ExecutionCenter
  // checkbox. When ON, the dispatcher below runs safeExecute on each
  // decision's first action (P0 FIX / INJECT only; safeExecute itself
  // enforces the full guard stack).
  const [autoRunSafe, setAutoRunSafe] = useState<boolean>(false)

  // Session-level dedup so a single toggle-ON event produces at most one
  // execution attempt per (path, actionType) — protects against re-renders
  // and against spamming Supabase when decisions re-compute.
  const autoRunRef = useRef<Set<string>>(new Set())

  // ── Auto Execution Governance v0.7 ───────────────────────────────────────
  // freezeState: global circuit-breaker state (reason + timestamp), loaded
  //   on mount and refreshed after every auto-run. When frozen, both auto
  //   dispatcher and manual Run Now are rejected at the executor level — the
  //   UI additionally hides the CTAs to avoid misleading clicks.
  // auditReport: last audit pass for the most recent run. Max 5 issues,
  //   surfaced in ExecutionCenter directly below the queue.
  const [freezeState,  setFreezeState]  = useState<FreezeState>({ frozen: false })
  const [auditReport,  setAuditReport]  = useState<AuditReport | null>(null)

  // ── v0.8 — Patch Approval Layer ───────────────────────────────────────────
  // Latest patch per page path where status ∈ {applied, approved}. `applied`
  // rows are auto-produced by safeExecute and await operator review; once the
  // user clicks Apply, status flips to `approved`. Filesystem write is NOT
  // triggered here — approval is a DB-only state change for v0.8.
  const [patchesByPath, setPatchesByPath] = useState<Record<string, PatchPreview>>({})
  // Bump to force a refetch after the user Approves/Rejects a patch.
  const [patchRefreshTick, setPatchRefreshTick] = useState(0)

  // ── v0.45 — REWRITE Draft Storage ─────────────────────────────────────────
  // Latest rewrite drafts, ordered newest-first. Skeleton state load only —
  // no UI surface in v0.45. handleGenerateRewriteDraft below populates this
  // table; UI consumers arrive in a later milestone.
  const [rewriteDrafts, setRewriteDrafts] = useState<RewriteDraftRow[]>([])
  const [rewriteDraftRefreshTick, setRewriteDraftRefreshTick] = useState(0)
  // v0.7 — per-row "Generating..." spinner state. Single key in flight at a
  // time keeps button states deterministic and prevents accidental double
  // POST. Format: `${decision.path}:${action.type}`.
  const [generatingRewriteKey, setGeneratingRewriteKey] = useState<string | null>(null)

  // ── Performance map (stable across renders since performanceMock is module-scoped) ──
  const performanceMap = useMemo(() => {
    const mapped = mapQueriesToPage(performanceMock)
    return computePagePerformance(mapped)
  }, [])

  // ── Capture current snapshots + load historical windows ──────────────────
  // Runs once per auditData/performance change. Non-blocking writes, single
  // aggregate read. Crash-safe: errors from Supabase are swallowed so the UI
  // still renders with the session's in-memory decisions.
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const supabase = createClient()
      const now             = Date.now()
      const sevenDaysAgo    = new Date(now - 7  * 24 * 60 * 60 * 1000)
      const fourteenDaysAgo = new Date(now - 14 * 24 * 60 * 60 * 1000)

      // 1. Capture snapshots for pages with fresh perf data (non-blocking).
      const inserts = auditData
        .map(p => {
          const perf = performanceMap[p.path]
          if (!perf) return null
          return {
            page:        p.path,
            position:    perf.avgPosition    ?? 0,
            ctr:         perf.ctr            ?? 0,
            impressions: perf.totalImpressions ?? 0,
          }
        })
        .filter((r): r is { page: string; position: number; ctr: number; impressions: number } => r !== null)

      if (inserts.length > 0) {
        // Fire-and-forget — don't block feedback load on write completion.
        // Supabase builders are thenable; .then(noop, noop) actually fires
        // the request while preserving non-blocking semantics.
        supabase.from('seo_performance_snapshots').insert(inserts).then(() => {}, () => {})
      }

      // 2. Fetch last 14 days for all pages in one query.
      const { data, error } = await supabase
        .from('seo_performance_snapshots')
        .select('page, position, ctr, impressions, created_at')
        .gte('created_at', fourteenDaysAgo.toISOString())

      if (cancelled || error || !data) return

      // 3. Group into before/after windows per page.
      const sevenDaysAgoMs = sevenDaysAgo.getTime()
      const result: Record<string, { before: WindowAverage | null; after: WindowAverage | null }> = {}
      for (const p of auditData) {
        const pageRows = (data as SnapshotRow[]).filter(s => s.page === p.path)
        const recent   = pageRows.filter(s => new Date(s.created_at).getTime() >= sevenDaysAgoMs)
        const previous = pageRows.filter(s => new Date(s.created_at).getTime() <  sevenDaysAgoMs)
        result[p.path] = {
          before: avgWindow(previous, p.path),
          after:  avgWindow(recent,   p.path),
        }
      }
      if (!cancelled) setHistoricalByPath(result)
    })().catch(() => { /* swallowed — UI degrades gracefully to no_data */ })

    return () => { cancelled = true }
  }, [auditData, performanceMap])

  // ── Action Attribution Engine v1.0 — load stats (once per mount) ─────────
  // Aggregates historical success rates across every tracked action outcome.
  // Stats are global (per action type), not per page, so no auditData dep.
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('seo_action_results')
        .select('page, action_type, result, position_delta, ctr_delta, recorded_at')
      if (cancelled || error || !data) return
      setActionStats(computeActionStats(data as ActionResultRow[]))
    })().catch(() => { /* swallowed — filter degrades to pass-through */ })

    return () => { cancelled = true }
  }, [])

  // ── Single computation boundary ──────────────────────────────────────────
  // Child components MUST NOT recompute. All derived data lives here.
  const decisions = useMemo<CoreDecision[]>(() => {

    return auditData.map(p => {
      // 1. Signals
      const signals = computeAllSignals(toSignalInput(p))

      // 1b. Health (computed early — structural gate before any optimization)
      const health = computeHealth(p)

      // 2. Authority / strength
      const strength        = Math.min(100, (p.linksIn.length / 12) * 100)
      const targetThreshold = p.pageType === 'money' ? 90 : p.pageType === 'hub' ? 70 : 40
      const authorityGap    = Math.round(targetThreshold - strength)

      // 3. Overlap detection (O(n²) — acceptable for typical site sizes < 200 pages)
      const isOverlap = auditData.some(
        x => x.path !== p.path && x.title === p.title && x.pageType === p.pageType
      )

      // 4. Issue detection
      const issues: string[] = []
      if (isOverlap)                                                     issues.push('angle_overlap')
      if (p.wordCount < 800)                                             issues.push('thin_content')
      if (!signals.faq.hasFAQ && p.pageType === 'weapon' && p.expectedFAQ !== false) issues.push('no_faq')
      if (strength < targetThreshold)                                    issues.push('authority_gap')
      if (p.linksIn.length === 0 || p.orphanRisk)                        issues.push('orphan_risk')
      if (p.pageType === 'weapon' && p.firstMoneyLinkBefore300 === false && p.wordCount > 300) issues.push('missing_money_link')
      if (p.h1Count === 0)                                               issues.push('no_h1')

      // 5. Intelligence (runs AFTER issues so priorityEngine has the full list)
      const intelligence = computeIntelligence(signals, {
        pageType:     p.pageType,
        issues,
        authorityGap: Math.max(0, authorityGap),
        rawPage:      p,
      })

      // 5b. Performance-aware decision augmentation v1.1
      // Extracts GSC signals and adjusts priority + issues before action build.
      const perf        = performanceMap[p.path]
      const pos         = perf?.avgPosition    ?? null
      const impressions = perf?.totalImpressions ?? 0
      const topQuery    = perf?.topQuery        ?? ''
      const entityScore = signals.entity?.score ?? 0

      // CASE 1: ranking buruk + entity kuat → authority problem, BUKAN rewrite
      if (pos !== null && pos > 10 && entityScore > 70) {
        intelligence.priority.value  = 'P0'
        intelligence.priority.reason = 'authority_gap_detected'
      }

      // CASE 2: high impression + low rank → biggest market opportunity
      if (pos !== null && pos > 10 && impressions > 500) {
        intelligence.priority.value  = 'P0'
        intelligence.priority.reason = 'high_impression_opportunity'
      }

      // CASE 3: low impression (dengan data GSC) → deprioritize noise
      if (perf !== undefined && impressions < 50) {
        if (intelligence.priority.value === 'P0') {
          intelligence.priority.value = 'P1'
        }
      }

      // CASE 4: top query tidak tercermin di title/H1 → content misalignment
      if (topQuery) {
        const normalizedQuery = topQuery.toLowerCase()
        const titleLower      = (p.title ?? '').toLowerCase()
        const h1Lower         = (p.h1Texts ?? []).join(' ').toLowerCase()
        const hasQueryMatch   = titleLower.includes(normalizedQuery) || h1Lower.includes(normalizedQuery)

        if (!hasQueryMatch) {
          issues.push('query_mismatch')
          intelligence.priority.value  = 'P0'
          intelligence.priority.reason = 'query_not_aligned_with_content'
        }
      }

      // Performance hint classification (used by action suppression + UI)
      let performanceHint = ''
      if (pos !== null) {
        if (pos <= 5)       performanceHint = 'top_ranking'
        else if (pos <= 10) performanceHint = 'page_2'
        else                performanceHint = 'low_ranking'
      }

      // 5c. HEALTH OVERRIDE (highest priority gate)
      // Critical health blocks all optimization — FIX must come first.
      if (health.status === 'critical') {
        intelligence.priority.value  = 'P0'
        intelligence.priority.reason = 'critical_health_issue'
      }

      // 5d. FEEDBACK LOOP v1.3 — 7d-vs-7d window comparison from Supabase.
      // historicalByPath[p.path] is undefined until the useEffect below has
      // resolved. `before`/`after` may be null when a window holds no rows —
      // in either case feedback stays undefined and no adaptation fires.
      const historical = historicalByPath[p.path]
      const beforeAvg  = historical?.before ?? null
      const afterAvg   = historical?.after  ?? null
      let feedback: FeedbackResult | undefined
      if (beforeAvg && afterAvg) {
        feedback = computeWindowFeedback(beforeAvg, afterAvg)
      }

      // 5e. FEEDBACK-DRIVEN ADAPTATION v1.3 (window-based, threshold-filtered).
      // Safe-mode: declined → P0, flat with real traffic → P1, improved downgrades P0 → P2.
      if (feedback?.result === 'declined') {
        intelligence.priority.value  = 'P0'
        intelligence.priority.reason = 'performance_declined_window'
      } else if (feedback?.result === 'flat' && (afterAvg?.totalImpressions ?? 0) > 200) {
        intelligence.priority.value  = 'P1'
        intelligence.priority.reason = 'no_progress_window'
      } else if (feedback?.result === 'improved') {
        if (intelligence.priority.value === 'P0') {
          intelligence.priority.value = 'P2'
        }
      }

      // 6. Actions
      let actions = buildActions(issues, intelligence, p.inSitemap, p.h1Count)

      // ACTION ADJUSTMENT: suppress REWRITE when page ranks low but entity is already
      // strong — the bottleneck is authority/links, not content quality.
      if (performanceHint === 'low_ranking' && entityScore > 70) {
        actions = actions.filter(a => a.type !== 'REWRITE')
      }

      // ATTRIBUTION FILTER v1.1 — page-type-segmented smart filter.
      // Keep an action when its (type, pageType) segment shows
      //   successRate * confidence > 0.25
      // Guards:
      //   - P0 always ships (structural blockers cannot be deprioritized)
      //   - KILL always ships (not tracked, no stat exists)
      //   - no stat for this segment → pass-through (absence ≠ failure)
      //   - total < 3 → pass-through (not enough samples to trust)
      if (actionStats.length > 0) {
        actions = actions.filter(a => {
          if (a.priority === 'P0') return true
          if (a.type === 'KILL')   return true
          const stat = actionStats.find(
            s => s.type === a.type && s.pageType === p.pageType
          )
          if (!stat)              return true
          if (stat.total < 3)     return true
          return stat.successRate * stat.confidence > 0.25
        })
      }

      // HEALTH FIX INJECTION: ensure no_h1 always surfaces as first FIX action.
      // Guard against duplication — buildActions already adds FIX for no_h1 issues,
      // but if it was filtered or suppressed, this guarantees it's restored.
      if (
        health.issues.some(i => i.type === 'no_h1') &&
        !actions.some(a => a.type === 'FIX')
      ) {
        actions.unshift({
          type:          'FIX',
          priority:      'P0',
          reason:        'Missing H1 tag — structural blocker',
          executionHint: 'Add H1 tag to page before any optimization',
        })
      }

      // 7. Entity token analysis
      const { entityTokens, entityCovered, entityMissing } = analyzeEntityTokens(
        p.path,
        p.title ?? '',
        p.description ?? '',
        p.h1Texts ?? [],
      )

      // 8. Quality Gate v1A — read-only baseline. Score is attached for
      // downstream consumers (UI panel arrives in v1B). Does NOT influence
      // issues, priority, actions, or queue filtering at this version.
      const quality = computeQuality(p)

      return {
        path:         p.path,
        pageType:     p.pageType,
        indexability: p.indexability,
        title:        p.title ?? '',
        wordCount:    p.wordCount,
        silo:         detectSilo(p.path),
        signals,
        intelligence,
        actions,
        issues:       Array.from(new Set(issues)),
        entityTokens,
        entityCovered,
        entityMissing,
        health,
        performance:         performanceMap[p.path],
        performanceHint,
        feedback,
        quality,
        priorityExplanation: {
          position:    pos,
          impressions,
          entityScore,
          reason:      intelligence.priority.reason || 'default',
        },
      }
    })
  }, [auditData, performanceMap, historicalByPath, actionStats])

  // ── Attribution write-back v1.1 ──────────────────────────────────────────
  // Multi-action attribution with time-delay filter. For each page where
  // feedback resolved to 'improved' or 'declined', inspect the N most recent
  // action logs, drop any too young to have moved GSC metrics (MIN_DAYS), and
  // write one weighted result row per surviving action.
  //
  //   weight = 1 / (idx + 1)  → harmonic decay, newest owns largest share
  //
  // Dedup key `${path}:${result}` still covers a feedback event as a whole,
  // so a single render produces at most N rows per page and never repeats.
  useEffect(() => {
    const targets = decisions.filter(d =>
      d.feedback && d.feedback.result !== 'flat' && d.feedback.result !== 'no_data'
    )
    if (targets.length === 0) return

    let cancelled = false
    ;(async () => {
      const supabase = createClient()
      const nowMs    = Date.now()
      for (const d of targets) {
        const fb  = d.feedback!
        const key = `${d.path}:${fb.result}`
        if (writtenResultsRef.current.has(key)) continue

        const { data: logs, error: logErr } = await supabase
          .from('seo_action_logs')
          .select('action_type, executed_at')
          .eq('page', d.path)
          .order('executed_at', { ascending: false })
          .limit(ATTRIBUTION_WINDOW)
        if (cancelled) return
        if (logErr || !logs || logs.length === 0) continue

        // MIN_DAYS filter — drop actions too young to have moved metrics.
        const validActions = (logs as ActionLogRow[]).filter(a => {
          const days = (nowMs - new Date(a.executed_at).getTime()) / (1000 * 60 * 60 * 24)
          return days >= MIN_ATTRIBUTION_DAYS
        })

        const attributed = resolveAttributedAction(validActions)
        if (!attributed) continue

        writtenResultsRef.current.add(key)
        for (const a of attributed) {
          // Thenable builder — .then(noop, noop) fires the request without
          // blocking the attribution loop on each insert.
          supabase.from('seo_action_results').insert({
            page:           d.path,
            action_type:    a.action_type,
            page_type:      d.pageType,
            result:         fb.result,
            weight:         a.weight,
            position_delta: fb.delta?.positionDelta ?? null,
            ctr_delta:      fb.delta?.ctrDelta      ?? null,
          }).then(() => {}, () => {})
        }
      }
    })().catch(() => { /* swallowed — attribution is best-effort */ })

    return () => { cancelled = true }
  }, [decisions])

  // ── v0.8 Patch fetch — runs on mount + after every Apply/Reject ──────────
  // Filters to {applied, approved} so freshly applied patches surface for
  // review, and previously approved ones keep their visible history until
  // re-applied. Rejected rows are intentionally hidden. One row per (page)
  // is kept — the most recent — so the queue UI doesn't duplicate.
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('seo_execution_logs')
        .select('id, page, action_type, status, created_at, original_html, patched_html')
        .in('status', ['pending_review', 'approved'])
        .order('created_at', { ascending: false })
        .limit(200)
      if (cancelled || error || !data) return
      const byPath: Record<string, PatchPreview> = {}
      for (const row of data as Array<{
        id: string; page: string; action_type: string; status: string;
        created_at: string; original_html: string | null; patched_html: string | null;
      }>) {
        if (byPath[row.page]) continue // keep newest only
        byPath[row.page] = {
          id:           row.id,
          page:         row.page,
          actionType:   row.action_type,
          status:       row.status,
          createdAt:    row.created_at,
          originalHtml: row.original_html,
          patchedHtml:  row.patched_html,
        }
      }
      if (!cancelled) setPatchesByPath(byPath)
    })().catch(() => { /* swallowed — UI degrades to no-patches */ })

    return () => { cancelled = true }
  }, [patchRefreshTick])

  // Approve: DB-only flip. Filesystem is NOT touched at v0.8.
  const handleApplyPatch = async (logId: string) => {
    const supabase = createClient()
    await supabase.from('seo_execution_logs').update({ status: 'approved' }).eq('id', logId)
    setPatchRefreshTick(t => t + 1)
  }

  const handleRejectPatch = async (logId: string) => {
    const supabase = createClient()
    await supabase.from('seo_execution_logs').update({ status: 'rejected' }).eq('id', logId)
    setPatchRefreshTick(t => t + 1)
  }

  // ── v0.45 — Rewrite drafts fetch (skeleton, no UI) ───────────────────────
  // Loads the latest rewrite drafts from Supabase. State is populated for
  // future UI consumers; nothing renders this list yet. Crash-safe via
  // fetchRewriteDrafts' graceful fallback (returns []).
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const rows = await fetchRewriteDrafts()
      if (!cancelled) setRewriteDrafts(rows)
    })()
    return () => { cancelled = true }
  }, [rewriteDraftRefreshTick])

  // ── v0.5/v0.7 — REWRITE generation handler (calls server route) ──────────
  // Client component MUST NOT import the Anthropic SDK directly — that would
  // bundle ANTHROPIC_API_KEY into the browser. Instead we POST the prompt
  // to /api/rewrite/generate which performs the LLM call + persistence
  // server-side, then we just refresh the local drafts state.
  // NEVER auto-applies. NEVER fakes draft content. NEVER touches the
  // filesystem or the safeExecute / approval pipelines.
  //
  // v0.7: also drives `generatingRewriteKey` so the originating REWRITE
  // button can render a "Generating…" disabled state. Per spec, entity-key
  // mapping (decision.entity → BBC_ENTITIES key) is OUT OF SCOPE — we pass
  // whatever decision.entity holds, or null if absent.
  const handleGenerateRewriteDraft = async (
    decision: { path: string; pageType: string; title?: string; entity?: string },
    action:   { type?: string } | null,
  ) => {
    console.warn('[rewrite] handler called', decision?.path, action?.type)
    if (!decision?.path) return null

    const key = `${decision.path}:${action?.type ?? 'REWRITE'}`
    setGeneratingRewriteKey(key)

    const prompt = buildRewriteDraftPrompt({
      path:     decision.path,
      pageType: decision.pageType,
      title:    decision.title,
    })

    // v0.7-entity-mapping — resolve human-readable label to a stable
    // BBC_ENTITIES key when possible.
    //
    // v0.8.2 — manual rewrite from PageExecutionDetail does not carry
    // decision.entity, so we widen the resolution input through an ordered
    // fallback (entity → primaryEntity → primary_entity → title → path).
    // If alias-based resolveEntityKey still fails, inferEntityKeyFromPath
    // catches the common BBC silos via path substring match.
    const dx = decision as {
      path?:           string
      entity?:         string
      primaryEntity?:  string
      primary_entity?: string
      title?:          string
    }
    const entityInput =
      dx.entity ??
      dx.primaryEntity ??
      dx.primary_entity ??
      dx.title ??
      dx.path ??
      null

    const resolvedEntityKey =
      resolveEntityKey(entityInput) ??
      inferEntityKeyFromPath(decision.path)

    const entityKeyToSend = resolvedEntityKey ?? decision.entity ?? null

    // v0.46 — page type is captured from whatever the decision shape carries.
    // Order: explicit pageType (CoreDecision contract) → snake_case page_type
    // (legacy / alternate shape) → generic `type` field. Never inferred from
    // URL — if none provided, route persists null.
    const dt = decision as {
      pageType?:  string | null
      page_type?: string | null
      type?:      string | null
    }
    const pageType =
      dt.pageType ??
      dt.page_type ??
      dt.type ??
      null

    let body: { ok: boolean; draftId?: string; error?: string | null } = {
      ok: false, error: 'fetch_failed',
    }
    try {
      console.warn('[rewrite] posting generate route')
      const res = await fetch('/api/rewrite/generate', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pagePath:   decision.path,
          entityKey:  entityKeyToSend,
          actionType: action?.type ?? null,
          pageType,
          prompt,
        }),
      })
      body = await res.json()
      if (!body?.ok) {
        // Safe console: the route already classifies provider errors into
        // non-sensitive codes; nothing here leaks credentials.
        console.warn('[rewrite] generation returned not-ok:', body?.error)
      }
    } catch (e) {
      console.warn('[rewrite] /api/rewrite/generate fetch failed:', (e as Error)?.message)
    } finally {
      setGeneratingRewriteKey(null)
      setRewriteDraftRefreshTick(t => t + 1)
    }

    return body
  }

  // ── v0.6 — Rewrite draft approve/reject (DB-only flip, mirrors patches) ──
  // Approve = `approved`, Reject = `rejected`. NO filesystem write. NO
  // downstream LLM call. NO scoring trigger. Refresh is a tick bump that
  // re-reads via fetchRewriteDrafts so the UI reflects the new status.
  const handleApproveRewriteDraft = async (draft: RewriteDraftRow | { id?: string }) => {
    if (!draft?.id) return
    await updateRewriteDraftStatus(draft.id, 'approved')
    setRewriteDraftRefreshTick(t => t + 1)
  }

  const handleRejectRewriteDraft = async (draft: RewriteDraftRow | { id?: string }) => {
    if (!draft?.id) return
    await updateRewriteDraftStatus(draft.id, 'rejected')
    setRewriteDraftRefreshTick(t => t + 1)
  }

  // ── Freeze-state bootstrap ───────────────────────────────────────────────
  // Load persisted freeze state on mount so the UI reflects any circuit
  // breaker that fired in a previous session. Rerun after every auto-run
  // finishes so a freeze triggered this session surfaces instantly.
  useEffect(() => {
    let cancelled = false
    getFreezeState()
      .then(state => { if (!cancelled) setFreezeState(state) })
      .catch(() => { /* defaults to not-frozen */ })
    return () => { cancelled = true }
  }, [])

  // ── Auto Execution dispatcher v0.7 (governance) ──────────────────────────
  // Per dispatcher pass:
  //   1. Abort if freeze is active — every pending row gets skipped before
  //      Supabase sees it.
  //   2. Build a RunContext so every log row carries run_id and the
  //      per-page-per-run limit is enforced session-locally.
  //   3. Run each decision's first action through safeExecute with
  //      mode='safe'. Guards live in the executor; the dispatcher only
  //      decides whether to CALL it.
  //   4. After the loop: evaluate freeze risk. If triggered, persist the
  //      freeze, update local state (turns the UI red), and flip autoRunSafe
  //      OFF so no further runs fire.
  //   5. Finally, run the audit pass on this run_id and store the report
  //      for ExecutionCenter to surface.
  useEffect(() => {
    if (!autoRunSafe) return
    if (decisions.length === 0) return
    if (freezeState.frozen) return

    let cancelled = false
    ;(async () => {
      const run = createRunContext()

      for (const d of decisions) {
        if (cancelled) return
        const first = d.actions?.[0]
        if (!first) continue

        const key = `${d.path}:${first.type}`
        if (autoRunRef.current.has(key)) continue
        autoRunRef.current.add(key)

        try {
          await safeExecute(
            {
              path:     d.path,
              pageType: d.pageType as SafePageType,
            },
            // priority propagated so the eligibility gate can evaluate it.
            { ...first, priority: first.priority } as SafeAction,
            { mode: 'safe', run },
          )
        } catch {
          /* swallowed — executor logs its own failures to seo_execution_logs */
        }
      }

      if (cancelled) return

      // Post-run: freeze risk → state update → audit pass. Sequenced so the
      // audit query always sees the run's rows fully flushed.
      const risk = await evaluateFreezeRisk()
      if (risk.shouldFreeze && risk.reason) {
        const next = await triggerFreeze(risk.reason, run.runId)
        if (!cancelled) {
          setFreezeState(next)
          setAutoRunSafe(false)
        }
      }

      const report = await auditRun(run.runId)
      if (!cancelled) setAuditReport(report)
      // v0.8 — surface any new patches written during this run.
      if (!cancelled) setPatchRefreshTick(t => t + 1)
    })()

    return () => { cancelled = true }
  }, [autoRunSafe, decisions, freezeState.frozen])

  // ── Manual Run (spec 11A — MANUAL MODE approval path) ────────────────────
  // Single-action approval: user clicks Run Now per row, dispatcher bypasses
  // the auto loop but still flows through every governance gate + audit.
  // mode='manual' lets attribution tell apart operator-approved runs from
  // auto runs in the log table.
  const handleManualRun = async (d: ExecDecision) => {
    if (freezeState.frozen) return
    const first = d.actions?.[0]
    if (!first) return

    const run = createRunContext()
    try {
      await safeExecute(
        {
          path:     d.path,
          pageType: d.pageType as SafePageType,
        },
        { ...first, priority: first.priority } as SafeAction,
        { mode: 'manual', run },
      )
    } catch {
      /* swallowed */
    }

    const risk = await evaluateFreezeRisk()
    if (risk.shouldFreeze && risk.reason) {
      const next = await triggerFreeze(risk.reason, run.runId)
      setFreezeState(next)
    }
    const report = await auditRun(run.runId)
    setAuditReport(report)
    setPatchRefreshTick(t => t + 1)
  }

  // Operator-initiated freeze release. Writes an audit row and clears local
  // state so the UI unlocks without requiring a reload.
  const handleReleaseFreeze = async () => {
    await releaseFreeze()
    setFreezeState({ frozen: false })
  }

  // ── Aggregate KPIs ───────────────────────────────────────────────────────
  const kpi = useMemo(() => {
    const indexable = decisions.filter(d => d.indexability === 'index')
    let entitySum = 0, aeoSum = 0
    for (const d of decisions) {
      entitySum += d.signals.entity.score
      aeoSum    += d.signals.aeo.score
    }
    const n = decisions.length || 1
    return {
      total:          decisions.length,
      indexable:      indexable.length,
      avgEntityScore: Math.round(entitySum / n),
      avgAeoScore:    Math.round(aeoSum / n),
      criticalCount:  decisions.filter(d => d.intelligence.priority.value === 'P0').length,
    }
  }, [decisions])

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="border-b border-slate-800 bg-slate-900 px-8 py-5 sticky top-0 z-40 backdrop-blur-md bg-slate-900/90">
        <div className="max-w-[1600px] mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-rose-500 to-orange-600 p-2 rounded-xl shadow-lg shadow-rose-500/20">
                <Cpu size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-black tracking-tight text-white uppercase">BBC SEO OS</h1>
                  <span className="text-[9px] font-black bg-slate-800 text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full">v3.0</span>
                </div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Execution-First SEO Operating System</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={12} className="text-amber-400" />
              <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">Localhost Only</span>
            </div>
          </div>

          {/* System Overview */}
          <SystemOverview
            totalPages={kpi.total}
            indexablePages={kpi.indexable}
            avgEntityScore={kpi.avgEntityScore}
            avgAeoScore={kpi.avgAeoScore}
            criticalCount={kpi.criticalCount}
          />
        </div>
      </div>

      {/* ── MAIN CONTENT ───────────────────────────────────────────────────── */}
      <div className="max-w-[1600px] mx-auto px-8 py-8 space-y-10">

        {/* 1. Execution Center — highest priority, shown first */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={14} className="text-rose-500" />
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">Execution Queue</h2>
          </div>
          <ExecutionCenter
            decisions={decisions as ExecDecision[]}
            onSelect={d => setSelectedDecision(d as CoreDecision)}
            autoRunSafe={autoRunSafe}
            onAutoRunSafeChange={setAutoRunSafe}
            freeze={freezeState}
            onReleaseFreeze={handleReleaseFreeze}
            onManualRun={handleManualRun}
            audit={auditReport}
            patches={patchesByPath}
            onApplyPatch={handleApplyPatch}
            onRejectPatch={handleRejectPatch}
            rewriteDrafts={rewriteDrafts}
            onApproveRewriteDraft={handleApproveRewriteDraft}
            onRejectRewriteDraft={handleRejectRewriteDraft}
            onGenerateRewriteDraft={handleGenerateRewriteDraft}
            generatingRewriteKey={generatingRewriteKey}
          />
        </section>

        {/* 2. Entity Overview — signals-based global view */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">Entity Intelligence</h2>
          </div>
          <EntityOverview decisions={decisions} />
        </section>

        {/* 3. Quality Gate Panel — read-only scoring (v1B) */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-fuchsia-500" />
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">Quality Gate</h2>
          </div>
          <QualityGatePanel decisions={decisions} />
        </section>

        {/* 4. Opportunity Board — upside / quick-wins */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">Opportunity Board</h2>
          </div>
          <OpportunityBoard decisions={decisions} />
        </section>

      </div>

      {/* ── SLIDE PANEL ────────────────────────────────────────────────────── */}
      <PageExecutionDetail
        decision={selectedDecision as DetailDecision | null}
        onClose={() => setSelectedDecision(null)}
        onGenerateRewriteDraft={handleGenerateRewriteDraft}
        generatingRewriteKey={generatingRewriteKey}
      />
    </div>
  )
}
