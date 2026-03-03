'use client'

import React, { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StickyWhatsAppCTAProps {
    message: string
    pageType: 'sewa_kantor' | 'virtual_office' | 'legal'
}

export default function StickyWhatsAppCTA({ message, pageType }: StickyWhatsAppCTAProps) {
    const [isVisible, setIsVisible] = useState(false)
    const phoneNumber = '6281311778036'
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    const handleTrack = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'click_whatsapp_money_page', {
                'page_type': pageType,
                'event_category': 'conversion',
                'event_label': 'sticky_cta'
            });
        }
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Contact', {
                content_name: 'WhatsApp Sticky CTA',
                content_category: pageType
            });
        }
    }

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return (
        <>
            {/* MOBILE STICKY BOTTOM BAR */}
            <div className={`fixed bottom-0 left-0 right-0 z-[100] p-4 bg-white/80 backdrop-blur-md border-t border-primary/5 md:hidden transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
                <Button
                    className="w-full font-bold py-6 rounded-none h-auto uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl shadow-accent/20"
                    onClick={handleTrack}
                    asChild
                >
                    <a href={waUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-5 h-5" /> Chat WhatsApp Sekarang
                    </a>
                </Button>
            </div>

            {/* DESKTOP FLOATING WHATSAPP */}
            <div className={`fixed bottom-8 right-8 z-[100] hidden md:block transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <Button
                    className="h-16 w-16 rounded-full shadow-2xl shadow-accent/40 flex items-center justify-center p-0 group overflow-hidden transition-all duration-300 hover:w-64"
                    onClick={handleTrack}
                    asChild
                >
                    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <MessageCircle className="w-8 h-8 shrink-0" />
                        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold uppercase tracking-widest text-[10px]">
                            Konsultasi via WhatsApp
                        </span>
                    </a>
                </Button>
            </div>
        </>
    )
}
