// Auto Execution Engine v0.5 / v0.8 — REWRITE Generation Route Handler.
//
// POST /api/rewrite/generate
//
// Request body:
//   { pagePath: string, entityKey?: string|null, actionType?: string|null, prompt: string }
//
// Response body:
//   { ok, draftId?, error?, entityScore?, entityScoreValid?, saveDiag? }
//
// This handler is the ONLY entry point for client components into the
// Anthropic SDK. ANTHROPIC_API_KEY never crosses the server boundary.
// Provider errors are classified into safe codes upstream in
// generateRewriteDraft — we relay those without inspection.
//
// v0.8 — after a successful Anthropic generation we resolve the entity
// (via stable key OR human-readable input) and run scoreEntityQuality
// on the draft text. Score + valid flag + breakdown JSON are persisted
// alongside the draft so the operator UI can rank by quality before
// approving. Scoring is best-effort: any failure leaves the draft saved
// with score columns NULL, never blocks the row write.

import { NextResponse } from 'next/server'
import { generateRewriteDraft } from '../../../../lib/seo/rewrite/generate'
import { saveRewriteDraft } from '../../../../lib/seo/rewrite/store'
import { createClient } from '../../../../lib/supabase/client'
import {
  getEntity,
  getEntityByInput,
  resolveEntityKey,
  scoreEntityQuality,
} from '../../../../lib/seo/entity'

export const runtime = 'nodejs'  // Anthropic SDK requires Node runtime, not Edge.

interface RequestBody {
  pagePath:    string
  entityKey?:  string | null
  actionType?: string | null
  // v0.46 — passed through from client, persisted alongside draft for the
  // Copy for GPT review template. Route does not infer page type.
  pageType?:   string | null
  prompt:      string
}

export async function POST(req: Request) {
  let body: RequestBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 }
    )
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json(
      { ok: false, error: 'invalid_body' },
      { status: 400 }
    )
  }

  const pagePath = typeof body.pagePath === 'string' ? body.pagePath.trim() : ''
  const prompt   = typeof body.prompt   === 'string' ? body.prompt          : ''

  if (!pagePath) {
    return NextResponse.json(
      { ok: false, error: 'missing_page_path' },
      { status: 400 }
    )
  }
  if (!prompt || prompt.trim().length === 0) {
    return NextResponse.json(
      { ok: false, error: 'missing_prompt' },
      { status: 400 }
    )
  }

  const result = await generateRewriteDraft(prompt)

  // v0.8.1 — Canonicalize entityKey server-side. Direct API callers (curl,
  // future SDK clients) may submit human-readable labels; the resolver maps
  // them to stable BBC_ENTITIES keys. When resolver returns null we fall
  // back to the raw input so unknown-entity drafts still persist.
  const rawEntityKey      = body.entityKey ?? null
  const resolvedEntityKey = resolveEntityKey(rawEntityKey) ?? rawEntityKey ?? null

  // v0.8 — Entity quality scoring. Only attempts when:
  //   - generation succeeded (result.ok && draftContent has length)
  //   - we have an entityKey (canonicalized)
  //   - entity lookup succeeds via stable key first, then label fallback
  // Any throw inside the scorer is swallowed so persistence still runs.
  let entityScore:           number  | null = null
  let entityScoreValid:      boolean | null = null
  let entityScoreBreakdown:  Record<string, unknown> | null = null
  if (
    result.ok
    && typeof result.draftContent === 'string'
    && result.draftContent.length > 0
    && resolvedEntityKey
  ) {
    try {
      const entityData =
        getEntity(resolvedEntityKey) ?? getEntityByInput(resolvedEntityKey)
      if (entityData) {
        const r = scoreEntityQuality(result.draftContent, entityData)
        entityScore          = typeof r.score === 'number' ? r.score : null
        entityScoreValid     = typeof r.valid === 'boolean' ? r.valid : null
        entityScoreBreakdown = (r.breakdown as Record<string, unknown> | undefined) ?? null
      }
    } catch {
      // Score is best-effort — never block draft save on a scorer fault.
    }
  }

  // Persist either the success draft or a failed attempt. Both branches
  // produce a row so the operator UI can see WHY a generation failed.
  const saved = await saveRewriteDraft({
    pagePath,
    entityKey:    resolvedEntityKey,
    actionType:   body.actionType ?? null,
    pageType:     body.pageType ?? null,
    prompt,
    draftContent: result.draftContent,
    status:       result.ok ? 'pending_review' : 'failed',
    error:        result.error ?? null,
    entityScore,
    entityScoreValid,
    entityScoreBreakdown,
  })

  // Diagnostic — when saveRewriteDraft returns null (graceful fail), retry
  // a direct insert so we can surface the Supabase error code in the
  // response. Provides actionable signal instead of silent loss.
  let saveDiag: { code?: string; message?: string } | null = null
  if (!saved) {
    try {
      const supabase = createClient()
      const { error: dbError } = await supabase
        .from('seo_rewrite_drafts')
        .insert({
          page_path:              pagePath,
          page_type:              body.pageType ?? null,
          entity_key:             resolvedEntityKey,
          action_type:            body.actionType ?? null,
          prompt,
          draft_content:          result.draftContent,
          status:                 result.ok ? 'pending_review' : 'failed',
          error:                  result.error ?? null,
          entity_score:           entityScore,
          entity_score_valid:     entityScoreValid,
          entity_score_breakdown: entityScoreBreakdown,
        })
      if (dbError) {
        saveDiag = {
          code:    dbError.code    ?? 'unknown',
          message: dbError.message ?? 'unknown',
        }
      }
    } catch (e) {
      saveDiag = { code: 'exception', message: String((e as Error)?.message ?? 'unknown') }
    }
  }

  if (!result.ok) {
    return NextResponse.json(
      {
        ok:        false,
        draftId:   saved?.id,
        error:     result.error ?? 'generation_failed',
        saveDiag,
      },
      { status: 200 }
    )
  }

  // Spec note: response intentionally exposes the score (numeric, non-PII)
  // but NEVER the draft_content — the operator must open the modal to read
  // the actual text, so the page-load network surface stays small.
  return NextResponse.json(
    {
      ok:               true,
      draftId:          saved?.id,
      error:            null,
      entityScore,
      entityScoreValid,
      saveDiag,
    },
    { status: 200 }
  )
}
