"use client"

import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function WhatsAppFloating() {
    const pathname = usePathname()
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281311778036'

    // List of money pages where specialized StickyWhatsAppCTA is used
    const moneyPages = [
        '/sewa-kantor',
        '/virtual-office',
        '/legal/pendirian-pt-jakarta-selatan'
    ]

    // Hide if on money page to avoid double buttons
    if (moneyPages.includes(pathname)) {
        return null
    }

    return (
        <Link
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-8 h-8" />
        </Link>
    )
}
