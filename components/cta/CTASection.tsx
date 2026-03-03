import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Container from '@/components/ui/Container'

interface CTASectionProps {
    title?: string
    description?: string
    primaryCTA?: {
        text: string
        href: string
    }
    secondaryCTA?: {
        text: string
        href: string
    }
    variant?: 'default' | 'dark'
}

export default function CTASection({
    title = "Siap Memulai Bisnis Anda?",
    description = "Hubungi kami sekarang untuk konsultasi gratis dan dapatkan solusi ruang kantor terbaik untuk bisnis Anda.",
    primaryCTA = {
        text: "Hubungi via WhatsApp",
        href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281311778036'}`
    },
    secondaryCTA = {
        text: "Jadwalkan Survey",
        href: "/kontak"
    },
    variant = 'dark'
}: CTASectionProps) {
    const isDark = variant === 'dark'

    return (
        <section className={`py-20 md:py-32 ${isDark ? 'bg-slate-900' : 'bg-bbc-blue-50'}`}>
            <Container size="lg" className="text-center">
                <h2 className={`text-3xl md:text-5xl font-bold mb-6 font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {title}
                </h2>

                <p className={`text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="bg-bbc-gold-500 hover:bg-bbc-gold-600 text-white font-bold px-10 h-14 text-lg"
                        asChild
                    >
                        <Link href={primaryCTA.href}>
                            {primaryCTA.text}
                        </Link>
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        className={`font-bold px-10 h-14 text-lg ${isDark
                            ? 'border-2 border-white text-white hover:bg-white hover:text-slate-900'
                            : 'border-2 border-bbc-blue-500 text-bbc-blue-500 hover:bg-bbc-blue-50'
                            }`}
                        asChild
                    >
                        <Link href={secondaryCTA.href}>
                            {secondaryCTA.text}
                        </Link>
                    </Button>
                </div>
            </Container>
        </section>
    )
}
