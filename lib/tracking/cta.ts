// Server-safe (no 'use client'): pure helpers for URL construction can be called
// from server components; trackCtaClick guards against SSR via typeof window check.

import { getFirstTouch, getLastTouch } from './attribution'

export type Placement =
    | 'hero'
    | 'mid'
    | 'sticky'
    | 'footer'
    | 'pricing'
    | 'faq'
    | 'navbar'
    | 'card'
    | 'comparison'
    | 'gallery'
    | 'final'

export type ServiceCode =
    | 'office'
    | 'vo'
    | 'legal'
    | 'meeting-room'
    | 'general'

export type Intent =
    // office
    | 'consultation'
    | 'unit-availability'
    | 'survey'
    | 'pricing'
    // vo
    | 'package-info'
    | 'upgrade-to-office'
    // legal
    | 'pt-setup'
    | 'kbli-check'
    | 'pkp'
    // meeting-room
    | 'availability'
    | 'booking'
    // free-form fallback
    | (string & {})

export type PackageCode =
    | 'basic'
    | 'complete'
    | 'premium'
    | 'standard'
    | 'small-office'
    | 'team-office'
    | 'executive-office'
    | (string & {})

export type CtaDestination = 'whatsapp' | 'form' | 'phone' | 'email' | 'page'

export interface BuildWhatsAppLinkArgs {
    text: string
    service: ServiceCode
    cta: Placement
    intent?: Intent
    package?: PackageCode
    phone?: string
}

const DEFAULT_PHONE = '6281311778036'

/**
 * Canonical WhatsApp link builder.
 * Customer-facing message stays in `text`; tracking metadata lives in URL params.
 *
 *   https://wa.me/<phone>?text=<encoded>&service=<svc>&cta=<placement>[&intent=<i>][&package=<p>]
 *
 * GTM trigger by URL contains: `service=office`, `service=vo`, `service=legal`, etc.
 */
export function buildWhatsAppLink(args: BuildWhatsAppLinkArgs): string {
    const num = (args.phone || DEFAULT_PHONE).replace(/\D/g, '')

    const params = new URLSearchParams()
    params.set('text', args.text)
    params.set('service', args.service)
    params.set('cta', args.cta)
    if (args.intent) params.set('intent', args.intent)
    const pkg = args.package
    if (pkg) params.set('package', pkg)

    return `https://wa.me/${num}?${params.toString()}`
}

export type ChannelTag = '[GA]' | '[FB]'

/**
 * Returns a sales-readable channel tag if the visitor came (at any touch) from
 * Google Ads or Facebook/Meta Ads. Sales team sees this prefix at the start of
 * the WhatsApp message — instant lead-source signal in chat.
 *
 * Detection priority: explicit click ID > UTM source+medium combo.
 *   Google Ads: gclid present  OR  source=google AND medium in [cpc, paid]
 *   Facebook:   fbclid present OR  source=meta   AND medium in [paid, cpc]
 *
 * Returns null for direct/organic/referral/other — no prefix gets prepended.
 */
export function getChannelTag(): ChannelTag | null {
    if (typeof window === 'undefined') return null
    const first = getFirstTouch()
    const last = getLastTouch()

    const isGoogleAds = (t: { source?: string; medium?: string; gclid?: string } | null) => {
        if (!t) return false
        if (t.gclid) return true
        if (t.source === 'google' && (t.medium === 'cpc' || t.medium === 'paid')) return true
        return false
    }
    const isFacebookAds = (t: { source?: string; medium?: string; fbclid?: string } | null) => {
        if (!t) return false
        if (t.fbclid) return true
        if (t.source === 'meta' && (t.medium === 'paid' || t.medium === 'cpc')) return true
        return false
    }

    if (isGoogleAds(first) || isGoogleAds(last)) return '[GA]'
    if (isFacebookAds(first) || isFacebookAds(last)) return '[FB]'
    return null
}

export interface CtaClickPayload {
    placement: Placement
    service: ServiceCode
    destination: CtaDestination
    href?: string
    label?: string
    intent?: Intent
    package?: PackageCode
}

export function trackCtaClick(payload: CtaClickPayload): void {
    if (typeof window === 'undefined') return

    const dataLayer = ((window as any).dataLayer = (window as any).dataLayer || [])
    const first = getFirstTouch()
    const last = getLastTouch()

    dataLayer.push({
        event: 'cta_click',
        cta_placement: payload.placement,
        cta_service: payload.service,
        cta_destination: payload.destination,
        cta_intent: payload.intent,
        cta_package: payload.package,
        cta_href: payload.href,
        cta_label: payload.label,
        first_touch_source: first?.source,
        first_touch_medium: first?.medium,
        first_touch_campaign: first?.campaign,
        last_touch_source: last?.source,
        last_touch_medium: last?.medium,
    })

    if (payload.destination === 'whatsapp') {
        dataLayer.push({
            event: 'wa_click',
            wa_service: payload.service,
            wa_placement: payload.placement,
            wa_intent: payload.intent,
            wa_package: payload.package,
            first_touch_source: first?.source,
            last_touch_source: last?.source,
        })
    }
}

export function inferServiceFromPath(pathname: string | null | undefined): ServiceCode {
    if (!pathname) return 'general'
    if (
        pathname.startsWith('/sewa-kantor') ||
        pathname.startsWith('/kantor-') ||
        pathname.startsWith('/harga-sewa-kantor')
    ) {
        return 'office'
    }
    if (
        pathname.startsWith('/virtual-office') ||
        pathname.startsWith('/harga-virtual-office')
    ) {
        return 'vo'
    }
    if (pathname.startsWith('/legal') || pathname.includes('pendirian-pt')) return 'legal'
    if (pathname.startsWith('/ruang-meeting') || pathname.startsWith('/meeting-room')) return 'meeting-room'
    return 'general'
}

export function mapProductTypeToService(productType: string | undefined): ServiceCode {
    switch (productType) {
        case 'serviced_office':
            return 'office'
        case 'virtual_office':
            return 'vo'
        case 'legal':
            return 'legal'
        case 'meeting_room':
            return 'meeting-room'
        default:
            return 'general'
    }
}
