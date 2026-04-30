'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { captureAttribution } from '@/lib/tracking/attribution'
import { persistLeadSource } from '@/lib/tracking/cta'

export default function AttributionBootstrap() {
    const pathname = usePathname()

    useEffect(() => {
        captureAttribution()
        // Sticky-write resolved lead source for downstream readers
        // (WhatsAppChannelTagger, trackCtaClick, GA4 dataLayer).
        persistLeadSource()
    }, [pathname])

    return null
}
