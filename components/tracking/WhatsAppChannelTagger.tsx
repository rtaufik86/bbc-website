'use client'

import { useEffect } from 'react'
import { getChannelTag } from '@/lib/tracking/cta'

/**
 * Global click interceptor: when visitor came via Google Ads or Facebook/Meta
 * Ads, prepend a `[GA]` or `[FB]` prefix to the `text` param of any clicked
 * WhatsApp link. Sales sees the channel tag at the start of the chat message.
 *
 * Mutates `anchor.href` in the mousedown capture phase, before the browser
 * resolves navigation. Idempotent — re-clicking a tagged link does not
 * double-prepend.
 *
 * Direct/organic/referral visitors trigger no mutation: WA URL stays clean.
 */
export default function WhatsAppChannelTagger() {
    useEffect(() => {
        const handler = (e: Event) => {
            const target = e.target as HTMLElement | null
            if (!target) return
            const anchor = target.closest('a[href*="wa.me/"]') as HTMLAnchorElement | null
            if (!anchor) return

            const tag = getChannelTag()
            if (!tag) return

            try {
                const url = new URL(anchor.href)
                const text = url.searchParams.get('text') || ''
                if (text.startsWith(tag)) return // already tagged — idempotent
                const tagged = text ? `${tag} ${text}` : tag
                url.searchParams.set('text', tagged)
                anchor.href = url.toString()
            } catch {
                // malformed URL — let original href pass through
            }
        }

        // Capture phase mutates href before browser resolves navigation.
        // mousedown covers left/middle/right click; keydown covers Enter on focused link.
        document.addEventListener('mousedown', handler, true)
        document.addEventListener('keydown', handler, true)
        return () => {
            document.removeEventListener('mousedown', handler, true)
            document.removeEventListener('keydown', handler, true)
        }
    }, [])

    return null
}
