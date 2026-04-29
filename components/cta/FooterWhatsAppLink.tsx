"use client"

import { MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { trackCtaClick, buildWhatsAppLink, inferServiceFromPath } from "@/lib/tracking/cta"

interface FooterWhatsAppLinkProps {
    phone?: string
    label?: string
}

export default function FooterWhatsAppLink({
    phone = '628128888069',
    label = 'Konsultasi Sekarang',
}: FooterWhatsAppLinkProps) {
    const pathname = usePathname()
    const service = inferServiceFromPath(pathname)
    const href = buildWhatsAppLink({
        text: 'Halo BBC, saya mau konsultasi.',
        service,
        cta: 'footer',
        intent: 'consultation',
        phone,
    })

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener"
            onClick={() =>
                trackCtaClick({
                    placement: 'footer',
                    service,
                    destination: 'whatsapp',
                    intent: 'consultation',
                    href,
                    label,
                })
            }
            data-cta-placement="footer"
            data-cta-service={service}
            className="bg-bbc-gold-600 hover:bg-bbc-gold-500 text-white text-[10px] font-black uppercase tracking-widest py-4 px-6 text-center transition-all shadow-xl flex items-center justify-center gap-2 group"
        >
            <MessageCircle size={14} className="group-hover:scale-110 transition-transform" />
            {label}
        </a>
    )
}
