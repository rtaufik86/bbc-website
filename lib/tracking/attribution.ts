// Server-safe (no 'use client'): pure helpers with SSR guards. Allows server
// components to import without forcing the file into the client bundle boundary.

const FIRST_KEY = 'bbc_attr_first'
const LAST_KEY = 'bbc_attr_last'
const STORAGE_TTL_DAYS = 90

export interface TouchSnapshot {
    source: string
    medium: string
    campaign?: string
    content?: string
    term?: string
    gclid?: string
    fbclid?: string
    referrer?: string
    landing_page?: string
    landing_at: string
}

interface StoredTouch extends TouchSnapshot {
    stored_at: number
}

function safeRead<T>(key: string): T | null {
    if (typeof localStorage === 'undefined') return null
    try {
        const raw = localStorage.getItem(key)
        if (!raw) return null
        return JSON.parse(raw) as T
    } catch {
        return null
    }
}

function safeWrite(key: string, value: unknown): void {
    if (typeof localStorage === 'undefined') return
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch {
        // quota / private mode — ignore
    }
}

function isExpired(stored_at: number): boolean {
    return Date.now() - stored_at > STORAGE_TTL_DAYS * 24 * 3600 * 1000
}

function detectChannel(opts: {
    utm_source?: string
    utm_medium?: string
    gclid?: string
    fbclid?: string
    referrer?: string
}): { source: string; medium: string } {
    const { utm_source, utm_medium, gclid, fbclid, referrer } = opts

    if (utm_source) {
        return {
            source: utm_source.toLowerCase(),
            medium: (utm_medium || 'unknown').toLowerCase(),
        }
    }
    if (gclid) return { source: 'google', medium: 'cpc' }
    if (fbclid) return { source: 'meta', medium: 'paid' }

    if (referrer) {
        try {
            const url = new URL(referrer)
            const host = url.hostname.toLowerCase()
            if (referrer.includes('maps.google') || host.startsWith('local.google')) {
                return { source: 'gmb', medium: 'organic' }
            }
            if (host.includes('google.')) return { source: 'google', medium: 'organic' }
            if (host.includes('bing.')) return { source: 'bing', medium: 'organic' }
            if (host.includes('duckduckgo.')) return { source: 'duckduckgo', medium: 'organic' }
            if (host.includes('yahoo.')) return { source: 'yahoo', medium: 'organic' }
            if (host.includes('facebook.') || host.includes('instagram.') || host.includes('fb.')) {
                return { source: 'meta', medium: 'referral' }
            }
            if (host.includes('linkedin.')) return { source: 'linkedin', medium: 'referral' }
            if (host.includes('twitter.') || host.includes('x.com') || host.includes('t.co')) {
                return { source: 'x', medium: 'referral' }
            }
            return { source: host, medium: 'referral' }
        } catch {
            // malformed referrer — fall through
        }
    }

    return { source: 'direct', medium: 'direct' }
}

function isSameHost(referrer: string): boolean {
    if (typeof location === 'undefined') return false
    try {
        return new URL(referrer).hostname === location.hostname
    } catch {
        return false
    }
}

function buildSnapshot(): TouchSnapshot {
    const params = new URLSearchParams(typeof location !== 'undefined' ? location.search : '')
    const rawReferrer = typeof document !== 'undefined' ? document.referrer || undefined : undefined

    const utm_source = params.get('utm_source') || undefined
    const utm_medium = params.get('utm_medium') || undefined
    const utm_campaign = params.get('utm_campaign') || undefined
    const utm_content = params.get('utm_content') || undefined
    const utm_term = params.get('utm_term') || undefined
    const gclid = params.get('gclid') || undefined
    const fbclid = params.get('fbclid') || undefined

    const { source, medium } = detectChannel({ utm_source, utm_medium, gclid, fbclid, referrer: rawReferrer })

    return {
        source,
        medium,
        campaign: utm_campaign,
        content: utm_content,
        term: utm_term,
        gclid,
        fbclid,
        referrer: rawReferrer && !isSameHost(rawReferrer) ? rawReferrer : undefined,
        landing_page: typeof location !== 'undefined' ? location.pathname : undefined,
        landing_at: new Date().toISOString(),
    }
}

function hasIncomingSignal(snapshot: TouchSnapshot): boolean {
    return Boolean(
        snapshot.campaign ||
        snapshot.gclid ||
        snapshot.fbclid ||
        snapshot.referrer ||
        snapshot.source !== 'direct'
    )
}

export function captureAttribution(): void {
    if (typeof window === 'undefined') return

    const snapshot = buildSnapshot()

    let first = safeRead<StoredTouch>(FIRST_KEY)
    if (!first || isExpired(first.stored_at)) {
        safeWrite(FIRST_KEY, { ...snapshot, stored_at: Date.now() })
        first = { ...snapshot, stored_at: Date.now() }
    }

    if (hasIncomingSignal(snapshot)) {
        safeWrite(LAST_KEY, { ...snapshot, stored_at: Date.now() })
    } else {
        const last = safeRead<StoredTouch>(LAST_KEY)
        if (!last || isExpired(last.stored_at)) {
            safeWrite(LAST_KEY, { ...snapshot, stored_at: Date.now() })
        }
    }

    const dataLayer = ((window as any).dataLayer = (window as any).dataLayer || [])
    const lastTouch = getLastTouch()
    const firstTouch = getFirstTouch()
    dataLayer.push({
        event: 'attribution_ready',
        first_touch_source: firstTouch?.source,
        first_touch_medium: firstTouch?.medium,
        first_touch_campaign: firstTouch?.campaign,
        first_touch_landing: firstTouch?.landing_page,
        last_touch_source: lastTouch?.source,
        last_touch_medium: lastTouch?.medium,
        last_touch_campaign: lastTouch?.campaign,
    })
}

export function getFirstTouch(): TouchSnapshot | null {
    const stored = safeRead<StoredTouch>(FIRST_KEY)
    if (!stored || isExpired(stored.stored_at)) return null
    const { stored_at: _stored_at, ...snapshot } = stored
    return snapshot
}

export function getLastTouch(): TouchSnapshot | null {
    const stored = safeRead<StoredTouch>(LAST_KEY)
    if (!stored || isExpired(stored.stored_at)) return null
    const { stored_at: _stored_at, ...snapshot } = stored
    return snapshot
}

export interface AttributionPayload {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_content?: string
    utm_term?: string
    cta_placement?: string
    cta_service?: string
    landing_page?: string
    referrer?: string
    gclid?: string
    fbclid?: string
    first_touch?: TouchSnapshot
    last_touch?: TouchSnapshot
}

export interface AttributionExtras {
    cta_placement?: string
    cta_service?: string
}

export function getAttributionForPayload(extras?: AttributionExtras): AttributionPayload {
    const first = getFirstTouch()
    const last = getLastTouch()
    return {
        utm_source: first?.source,
        utm_medium: first?.medium,
        utm_campaign: first?.campaign,
        utm_content: first?.content,
        utm_term: first?.term,
        landing_page: first?.landing_page,
        referrer: first?.referrer,
        gclid: first?.gclid || last?.gclid,
        fbclid: first?.fbclid || last?.fbclid,
        cta_placement: extras?.cta_placement,
        cta_service: extras?.cta_service,
        first_touch: first || undefined,
        last_touch: last || undefined,
    }
}
