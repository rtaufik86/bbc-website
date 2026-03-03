import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
    title: React.ReactNode
    subtitle: React.ReactNode
    ctaText: string
    ctaAction?: () => void
    ctaHref?: string
    secondaryCtaText?: string
    secondaryCtaHref?: string
    backgroundImage?: string
    placeholderText?: string
    variant?: 'default' | 'centered' | 'split'
    className?: string
}

export function Hero({
    title,
    subtitle,
    ctaText,
    ctaHref = '#lead-form',
    secondaryCtaText,
    secondaryCtaHref = '#',
    backgroundImage,
    placeholderText = "Image Placeholder",
    variant = 'default',
    className
}: HeroProps) {
    return (
        <section className={cn('relative pt-32 pb-20 overflow-hidden', className)}>
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                {backgroundImage && variant !== 'split' ? (
                    <>
                        <Image
                            src={backgroundImage}
                            alt="Background"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-white/90" />
                    </>
                ) : (
                    <div className="w-full h-full bg-slate-50" />
                )}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className={cn(
                    'max-w-3xl',
                    variant === 'centered' && 'mx-auto text-center',
                    variant === 'split' && 'grid md:grid-cols-2 gap-12 items-center max-w-none'
                )}>
                    {/* Content */}
                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            {title}
                        </h1>
                        <div className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                            {subtitle}
                        </div>
                        <div className={cn('flex flex-col sm:flex-row gap-4 pt-4', variant === 'centered' && 'justify-center')}>
                            <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12" asChild>
                                <Link href={ctaHref}>{ctaText}</Link>
                            </Button>
                            {secondaryCtaText && (
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-12" asChild>
                                    <Link href={secondaryCtaHref}>{secondaryCtaText}</Link>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Visual for Split Layout */}
                    {variant === 'split' && (
                        <div className="hidden md:block relative h-[500px] rounded-r-3xl overflow-hidden shadow-2xl -mr-20 lg:-mr-40 bg-slate-100">
                            {backgroundImage ? (
                                <Image
                                    src={backgroundImage}
                                    alt="Office Space"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium bg-slate-200">
                                    {placeholderText}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
