import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ServiceHeroProps {
    title: string
    description: string
    image: string
    ctaText?: string
    ctaLink?: string
}

export default function ServiceHero({ title, description, image, ctaText = 'Jadwalkan Survey', ctaLink = '#contact' }: ServiceHeroProps) {
    return (
        <section className="relative bg-slate-900 text-white py-20 md:py-32">
            <div className="absolute inset-0 z-0 bg-slate-900">
                {/* Image placeholder handling */}
                {image && image.startsWith('/') ? (
                    <Image src={image} alt={title} fill className="object-cover opacity-20" />
                ) : (
                    <div className="w-full h-full bg-slate-800 opacity-50" />
                )}
            </div>
            <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">{title}</h1>
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">{description}</p>
                <div className="flex justify-center gap-4 flex-col sm:flex-row">
                    <Button size="lg" className="bg-bbc-gold-500 hover:bg-bbc-gold-600 text-white text-lg px-8 h-14" asChild>
                        <Link href={ctaLink}>{ctaText}</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
