// Auto Execution Engine v0.5 — Anthropic SDK client (server-only).
//
// Importing `server-only` makes Next.js fail the build if any client
// component imports this module. The API key NEVER reaches the browser.
//
// Public surface:
//   - getAnthropicClient(): returns SDK instance, or null if key missing.
//   - getDefaultModel():    returns ANTHROPIC_MODEL env override or fallback.
//
// The key is never logged, never returned, never thrown in error messages.

import 'server-only'
import Anthropic from '@anthropic-ai/sdk'

// Family alias (no date suffix). Anthropic resolves this to the latest
// snapshot within the 4.6 family — auto-tracks point releases (e.g. 4.6
// patch updates) without code changes. To move to a NEWER family (4.7,
// 5.0, etc.) you must explicitly set ANTHROPIC_MODEL env var: there is
// no "latest sonnet across families" alias.
const DEFAULT_MODEL = 'claude-sonnet-4-6'

// Singleton — one client per server process. Recreating per request adds
// pointless overhead for an SDK that already pools HTTP connections.
let cached: Anthropic | null = null

// Granular reason for client being null. Helps debug missing env vs empty
// env vs SDK-rejected key WITHOUT exposing the key value itself.
export type AnthropicClientReason =
  | 'env_undefined'         // process.env.ANTHROPIC_API_KEY is undefined
  | 'env_empty'             // present but empty / whitespace only
  | 'sdk_constructor_error' // SDK rejected the value
  | 'ok'

export function getAnthropicClientStatus(): {
  client:    Anthropic | null
  reason:    AnthropicClientReason
  keyLength: number          // length only — never the value itself
} {
  if (cached) return { client: cached, reason: 'ok', keyLength: -1 }

  const raw = process.env.ANTHROPIC_API_KEY
  if (raw === undefined) {
    return { client: null, reason: 'env_undefined', keyLength: 0 }
  }
  if (typeof raw !== 'string' || raw.trim().length === 0) {
    return { client: null, reason: 'env_empty', keyLength: typeof raw === 'string' ? raw.length : 0 }
  }

  try {
    cached = new Anthropic({ apiKey: raw.trim() })
    return { client: cached, reason: 'ok', keyLength: raw.trim().length }
  } catch {
    return { client: null, reason: 'sdk_constructor_error', keyLength: raw.trim().length }
  }
}

export function getAnthropicClient(): Anthropic | null {
  return getAnthropicClientStatus().client
}

export function getDefaultModel(): string {
  const override = process.env.ANTHROPIC_MODEL
  return override && override.trim().length > 0 ? override : DEFAULT_MODEL
}
