// Auto Execution Engine v0.5 — REWRITE Generation (server-only).
//
// Calls Anthropic Messages API to produce a draft from the prompt
// built by buildRewriteDraftPrompt. Server-only via the client module.
//
// Returns a deterministic shape so callers (route handler + store) can
// persist either a 'pending_review' or 'failed' draft without surprises.
//
// CRITICAL: must NOT fabricate `draftContent`. A failed call returns
// null + an error code — never a placeholder string. Fake content would
// poison the entity scoring engine downstream.

import 'server-only'
import { getAnthropicClientStatus, getDefaultModel } from '../anthropic/client'

export interface RewriteGenerationResult {
  ok:           boolean
  draftContent: string | null
  error?:       string | null
}

const TIMEOUT_MS = 60_000   // Anthropic SDK supports request-level timeout.
const MAX_TOKENS = 4096
const TEMPERATURE = 0.3

// Strip raw provider error to a safe code. Provider errors may carry
// request IDs / partial payloads — never relay verbatim to clients.
function classifyError(err: unknown): string {
  const e = err as { status?: number; name?: string; message?: string } | null
  if (!e || typeof e !== 'object') return 'anthropic_unknown_error'

  if (typeof e.status === 'number') {
    if (e.status === 401 || e.status === 403) return 'anthropic_auth_error'
    if (e.status === 429)                     return 'anthropic_rate_limited'
    if (e.status === 400)                     return 'anthropic_bad_request'
    if (e.status === 404)                     return 'anthropic_model_not_found'
    if (e.status >= 500)                      return 'anthropic_server_error'
  }
  if (e.name === 'AbortError')               return 'anthropic_timeout'
  return 'anthropic_request_failed'
}

// Extract concatenated text from a Messages API response. The API returns
// content as an array of typed blocks; we only consume `text` blocks.
function extractText(message: { content?: Array<{ type: string; text?: string }> } | null): string {
  if (!message?.content || !Array.isArray(message.content)) return ''
  return message.content
    .filter(b => b?.type === 'text' && typeof b.text === 'string')
    .map(b => b.text as string)
    .join('\n\n')
    .trim()
}

export async function generateRewriteDraft(
  prompt: string
): Promise<RewriteGenerationResult> {
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    return { ok: false, draftContent: null, error: 'missing_prompt' }
  }

  const status = getAnthropicClientStatus()
  if (!status.client) {
    // Map granular reason to safe diagnostic code. Key value is never logged.
    const code =
      status.reason === 'env_undefined'         ? 'anthropic_env_undefined'
      : status.reason === 'env_empty'           ? `anthropic_env_empty_len_${status.keyLength}`
      : status.reason === 'sdk_constructor_error' ? `anthropic_sdk_rejected_key_len_${status.keyLength}`
      : 'anthropic_api_not_configured'
    return { ok: false, draftContent: null, error: code }
  }
  const client = status.client

  const model = getDefaultModel()

  // One retry on transient errors (5xx / 429). Aborts/auth errors are NOT
  // retried — they won't get better with another shot.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await client.messages.create(
        {
          model,
          max_tokens:  MAX_TOKENS,
          temperature: TEMPERATURE,
          messages: [{ role: 'user', content: prompt }],
        },
        { timeout: TIMEOUT_MS }
      )

      const text = extractText(response as any)
      if (!text) {
        return { ok: false, draftContent: null, error: 'anthropic_empty_response' }
      }

      return { ok: true, draftContent: text, error: null }
    } catch (err) {
      const code = classifyError(err)
      const transient = code === 'anthropic_rate_limited'
        || code === 'anthropic_server_error'
        || code === 'anthropic_timeout'
      if (transient && attempt === 0) continue
      return { ok: false, draftContent: null, error: code }
    }
  }

  return { ok: false, draftContent: null, error: 'anthropic_request_failed' }
}
