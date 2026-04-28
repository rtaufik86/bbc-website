// Auto Execution Engine v0.45 — REWRITE Draft Persistence
//
// Thin Supabase wrapper around `seo_rewrite_drafts`. Mirrors the
// graceful-fallback pattern used elsewhere (logExecution etc.):
// every call swallows Supabase errors and returns a safe default,
// so UI never blocks on persistence outages.

import { createClient } from '../../supabase/client'

export type RewriteDraftStatus =
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'failed'

export interface SaveRewriteDraftInput {
  pagePath:               string
  entityKey?:             string | null
  actionType?:            string | null
  prompt:                 string
  draftContent?:          string | null
  status?:                RewriteDraftStatus
  error?:                 string | null
  // v0.8 — entity quality score, computed server-side after generation.
  entityScore?:           number  | null
  entityScoreValid?:      boolean | null
  entityScoreBreakdown?:  Record<string, unknown> | null
}

export interface RewriteDraftRow {
  id:                      string
  page_path:               string
  entity_key:              string | null
  action_type:             string | null
  prompt:                  string
  draft_content:           string | null
  status:                  RewriteDraftStatus
  error:                   string | null
  entity_score:            number  | null
  entity_score_valid:      boolean | null
  entity_score_breakdown:  Record<string, unknown> | null
  created_at:              string
  updated_at:              string
}

const TABLE = 'seo_rewrite_drafts'

export async function saveRewriteDraft(
  input: SaveRewriteDraftInput
): Promise<RewriteDraftRow | null> {
  if (!input?.pagePath || !input?.prompt) return null

  try {
    const supabase = createClient()
    const payload = {
      page_path:              input.pagePath,
      entity_key:             input.entityKey   ?? null,
      action_type:            input.actionType  ?? null,
      prompt:                 input.prompt,
      draft_content:          input.draftContent ?? null,
      status:                 input.status       ?? 'pending_review',
      error:                  input.error        ?? null,
      // v0.8 — score columns. Pre-migration these are NULL-tolerant (the
      // ALTER TABLE adds them as nullable). When score fields are absent
      // from input we explicitly send null so the row shape is consistent.
      entity_score:           input.entityScore           ?? null,
      entity_score_valid:     input.entityScoreValid      ?? null,
      entity_score_breakdown: input.entityScoreBreakdown  ?? null,
    }

    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single()

    if (error) return null
    return (data as RewriteDraftRow) ?? null
  } catch {
    return null
  }
}

export async function fetchRewriteDrafts(): Promise<RewriteDraftRow[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error || !data) return []
    return data as RewriteDraftRow[]
  } catch {
    return []
  }
}

export async function updateRewriteDraftStatus(
  id:     string,
  status: RewriteDraftStatus
): Promise<boolean> {
  if (!id || !status) return false

  const allowed: RewriteDraftStatus[] = [
    'approved',
    'rejected',
    'pending_review',
    'failed',
  ]
  if (!allowed.includes(status)) return false

  try {
    const supabase = createClient()
    const { error } = await supabase
      .from(TABLE)
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)

    return !error
  } catch {
    return false
  }
}
