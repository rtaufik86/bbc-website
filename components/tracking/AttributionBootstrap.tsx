'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { captureAttribution } from '@/lib/tracking/attribution'

export default function AttributionBootstrap() {
    const pathname = usePathname()

    useEffect(() => {
        captureAttribution()
    }, [pathname])

    return null
}
