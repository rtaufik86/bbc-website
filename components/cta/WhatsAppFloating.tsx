"use client"

import { MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { trackCtaClick, buildWhatsAppLink, inferServiceFromPath } from '@/lib/tracking/cta'

export default function WhatsAppFloating() {
    const pathname = usePathname()
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281311778036'

    // Money pages render their own StickyWhatsAppCTA — avoid double button
    const moneyPages = [
        '/sewa-kantor',
        '/virtual-office',
        '/legal/pendirian-pt-jakarta-selatan',
    ]
    if (moneyPages.includes(pathname)) {
        return null
    }

    const service = inferServiceFromPath(pathname)
    const href = buildWhatsAppLink({
        text: 'Halo BBC, saya mau konsultasi.',
        service,
        cta: 'sticky',
        intent: 'consultation',
        phone,
    })

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
                trackCtaClick({
                    placement: 'sticky',
                    service,
                    destination: 'whatsapp',
                    intent: 'consultation',
                    href,
                    label: 'WhatsApp Floating',
                })
            }
            data-cta-placement="sticky"
            data-cta-service={service}
            className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-8 h-8" />
        </a>
    )
}
