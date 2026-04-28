import type { SignalInput, LinkSignal } from './types'

/**
 * Link signal: counts outbound links overall, money-target links, and
 * early-position links (position < 300 characters from start of body).
 *
 * Pure, deterministic.
 */
export function computeLinkSignal(input: SignalInput): LinkSignal {
  const links = input.linksOut || []
  const moneyLinks = links.filter(l => Boolean(l.isMoney)).length
  const earlyLinks = links.filter(
    l => typeof l.position === 'number' && l.position < 300
  ).length

  return {
    total: links.length,
    moneyLinks,
    earlyLinks,
  }
}
