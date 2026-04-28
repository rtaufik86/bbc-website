import type { SignalInput, TrustSignal } from './types'

/**
 * Trust signal: shared baseline trust-pattern detection across title,
 * meta description, intro, and H1 text. This is the CROSS-TOOL baseline
 * used by every consumer (Decision Engine, Answer Extraction, LLM Scanner,
 * Control Center). Cluster-specific patterns (KBLI, PKP, Tol Veteran, etc.)
 * remain inside TrustScannerClient and may extend this baseline.
 *
 * Pure, deterministic.
 */
const TRUST_PATTERNS = ['kbli', 'pkp', 'notaris', 'jakarta selatan', 'bintaro']

export function computeTrustSignal(input: SignalInput): TrustSignal {
  const text = (
    (input.title || '') + ' ' +
    (input.description || '') + ' ' +
    (input.introText || '') + ' ' +
    input.h1Texts.join(' ')
  ).toLowerCase()

  const found = TRUST_PATTERNS.filter(s => text.includes(s))
  const score = (found.length / TRUST_PATTERNS.length) * 100

  return { found, score }
}
