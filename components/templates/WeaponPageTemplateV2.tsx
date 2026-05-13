import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import {
    MapPin, Award, Briefcase, Plus, Building2, ShieldCheck,
    ArrowRight, TrendingUp, Clock, Users, Search, Calculator,
    UserCheck, CheckSquare, FileText, Target, Zap, ShieldAlert,
    CheckCircle2, Sparkles, MessageSquare, Calendar, Info
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import { getHeroImage, getSectionImage } from '@/lib/seo/visualMapping'
import { injectInternalLinks } from '@/lib/seo/linkInjectionEngine'
import { buildWhatsAppLink } from '@/lib/tracking/cta'

const fallbackHeroConsultV2 = buildWhatsAppLink({ text: 'Halo BBC, saya ingin konsultasi langsung.', service: 'general', cta: 'hero', intent: 'consultation', phone: '6281210002131' })
const fallbackClosingCtaV2 = buildWhatsAppLink({ text: 'Halo BBC, saya ingin daftar layanan.', service: 'general', cta: 'final', intent: 'consultation', phone: '6281210002131' })

// --- BBC WEAPON TEMPLATE V2 (UI/UX comparison build) ---
// Same prop shape as v1, improved presentation only.

export interface SectionV2 {
    id: string
    h2: string
    content?: string
    rawHtml?: string
    type?: "core" | "support" | "narrative"
    visual?: {
        type: "card" | "list" | "image" | "none"
        items?: { title: string; desc?: string; icon?: string }[]
        image?: string
        alt?: string
    }
}

type PageChip = {
    label: string
    type?: "service" | "location" | "trust" | "benefit" | "compliance" | "facility"
    entity?: string
    icon?: string
}

export interface WeaponPageTemplateV2Props {
    url: string
    title: string
    description: string
    canonicalUrl: string
    h1: string
    intro: string
    entity: string
    location: string
    heroImage?: string | false
    heroChips?: PageChip[]
    heroVisual?: {
        eyebrow?: string
        title?: string
        description?: string
        featureChips?: PageChip[]
    }
    sections: SectionV2[]
    faq?: {
        title: string
        items: { q: string; a: string }[]
    }
    closing?: string
    internalLinks?: {
        intro?: { label: string; href: string }
        mid?: { label: string; href: string }
        closing?: { label: string; href: string }
    }
    /**
     * Explicit Related Links list, rendered as a "Rujukan Terkait" grid
     * after the FAQ section. Only renders when the page provides this
     * prop — the template does NOT auto-derive from internalLinks to
     * prevent duplicate-link density with hero/mid/final CTAs.
     */
    relatedLinks?: { label: string; href: string }[]
    breadcrumb?: boolean
    schemaObject?: unknown
    /** Optional 3–5 quick takeaways shown in the direct-answer box. */
    keyTakeaways?: string[]
    trustSignals?: {
        heroLocation?: string
        years?: string
        companies?: string
        finalLocation?: string
    }
    /**
     * When true, intro + each section's content/rawHtml are piped through
     * `injectInternalLinks` (entity-graph driven auto-linking). Default is
     * `false` because the engine's "no duplicate target" guard is scoped per
     * call, which means multi-section pages can emit one money-page link per
     * section — visually spammy and SEO-risky. Explicit page-provided anchors
     * are preferred.
     */
    enableAutoInternalLinks?: boolean
}

const iconMap: Record<string, LucideIcon> = {
    MapPin, Building2, ShieldCheck, Award, Briefcase,
    Users, Search, Calculator, UserCheck, TrendingUp,
    Clock, CheckSquare, FileText, Target, Zap, ShieldAlert,
    Calendar
}

const chipClassMap: Record<string, string> = {
    service: "bg-bbc-gold-50 text-bbc-gold-700 border-bbc-gold-200",
    location: "bg-bbc-blue-50 text-bbc-blue-700 border-bbc-blue-200",
    trust: "bg-emerald-50 text-emerald-700 border-emerald-200",
    benefit: "bg-slate-50 text-slate-700 border-slate-200",
    compliance: "bg-slate-50 text-slate-700 border-slate-200",
    facility: "bg-bbc-gold-50 text-bbc-gold-700 border-bbc-gold-100"
}

export default function WeaponPageTemplateV2({
    url,
    title,
    description,
    canonicalUrl,
    h1,
    intro,
    entity,
    location,
    heroImage,
    heroChips,
    heroVisual,
    sections,
    faq,
    closing,
    internalLinks,
    breadcrumb = true,
    schemaObject,
    keyTakeaways,
    trustSignals,
    relatedLinks,
    enableAutoInternalLinks = false
}: WeaponPageTemplateV2Props) {
    const renderBody = (html: string) =>
        enableAutoInternalLinks ? injectInternalLinks(html, url) : html

    const autoHeroImage = heroImage === false ? '' : (heroImage || getHeroImage(entity, location))
    const midLink = internalLinks?.mid
    const limitedHeroChips = (heroChips || []).slice(0, 3)
    const visualFeatureChips = heroVisual?.featureChips || []

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": `${canonicalUrl}/#webpage`,
                "url": canonicalUrl,
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": `${canonicalUrl}/#article`,
                "headline": title,
                "description": description,
                "image": "https://www.bintarobusinesscentre.com" + autoHeroImage,
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            },
            ...(faq ? [{
                "@type": "FAQPage",
                "mainEntity": faq.items.map(item => ({
                    "@type": "Question",
                    "name": item.q,
                    "acceptedAnswer": { "@type": "Answer", "text": item.a }
                }))
            }] : [])
        ]
    }

    const renderedSchema = schemaObject ?? schema

    return (
        <main className="bg-white text-slate-900 font-sans selection:bg-accent selection:text-white">
            <Script id="article-schema-v2" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(renderedSchema) }} />

            {/* 1. HERO */}
            <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 bg-gradient-to-b from-slate-50 via-white to-white overflow-hidden border-b border-slate-100">
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    {breadcrumb && (
                        <div className="mb-8">
                            <SEOBreadcrumbs items={[{ label: title }]} />
                        </div>
                    )}

                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        <div className="lg:col-span-6 order-2 lg:order-1">
                            {limitedHeroChips.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2 mb-6">
                                    {limitedHeroChips.map((chip) => (
                                        <span
                                            key={`${chip.type || 'chip'}-${chip.label}`}
                                            className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border ${chipClassMap[chip.type || 'benefit'] || chipClassMap.benefit}`}
                                        >
                                            {chip.label}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-[1.1] mb-6 font-heading tracking-tight">
                                {h1}
                            </h1>

                            <p
                                className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl mb-10"
                                dangerouslySetInnerHTML={{ __html: renderBody(intro) }}
                            />

                            {internalLinks?.intro && (
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button asChild className="bg-accent hover:bg-bbc-gold-600 text-white rounded-lg px-8 py-6 min-h-[48px] text-sm font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl">
                                        <Link href={internalLinks.intro.href}>{internalLinks.intro.label}</Link>
                                    </Button>
                                    <Button variant="outline" className="border-2 border-slate-300 rounded-lg px-8 py-6 min-h-[48px] text-sm font-bold uppercase tracking-widest hover:bg-slate-50 hover:border-slate-400" asChild>
                                        <Link href={fallbackHeroConsultV2} target="_blank" rel="noopener noreferrer">Konsultasi Live</Link>
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-6 order-1 lg:order-2">
                            {autoHeroImage ? (
                                <div className="relative aspect-[5/4] rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200">
                                    <Image
                                        src={autoHeroImage}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/45 via-primary/5 to-transparent" />

                                    {heroVisual && (
                                        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-[340px] bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-md ring-1 ring-slate-200/70">
                                            {heroVisual.eyebrow && (
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{heroVisual.eyebrow}</div>
                                            )}
                                            {heroVisual.title && (
                                                <div className="text-sm font-bold text-primary leading-tight mt-1">{heroVisual.title}</div>
                                            )}
                                            {heroVisual.description && (
                                                <div className="text-xs text-slate-600 leading-snug mt-1.5">{heroVisual.description}</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* Information-card fallback when hero image is unavailable */
                                <div className="relative aspect-[5/4] rounded-2xl shadow-xl ring-1 ring-slate-200 bg-gradient-to-br from-primary via-primary to-primary/85 overflow-hidden p-8 lg:p-10 flex flex-col justify-between text-white">
                                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
                                        <Building2 size={500} className="text-white absolute -right-10 -top-10" />
                                    </div>

                                    <div />

                                    {heroVisual && (
                                        <div className="relative bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4">
                                            {heroVisual.eyebrow && (
                                                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{heroVisual.eyebrow}</div>
                                            )}
                                            {heroVisual.title && (
                                                <div className="text-sm font-bold leading-tight mt-1">{heroVisual.title}</div>
                                            )}
                                            {heroVisual.description && (
                                                <div className="text-xs text-white/70 leading-snug mt-1.5">{heroVisual.description}</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Functional info strip — package essentials */}
                            {visualFeatureChips.length > 0 && (
                            <div className="mt-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm grid grid-cols-3 gap-3">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="w-10 h-10 bg-bbc-gold-50 rounded-xl flex items-center justify-center ring-1 ring-bbc-gold-100">
                                        <Briefcase className="w-5 h-5 text-bbc-gold-600" />
                                    </div>
                                    <div className="text-[11px] font-bold text-primary uppercase tracking-wide leading-tight">{visualFeatureChips[0]?.label}</div>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="w-10 h-10 bg-bbc-gold-50 rounded-xl flex items-center justify-center ring-1 ring-bbc-gold-100">
                                        <Zap className="w-5 h-5 text-bbc-gold-600" />
                                    </div>
                                    <div className="text-[11px] font-bold text-primary uppercase tracking-wide leading-tight">{visualFeatureChips[1]?.label}</div>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="w-10 h-10 bg-bbc-gold-50 rounded-xl flex items-center justify-center ring-1 ring-bbc-gold-100">
                                        <UserCheck className="w-5 h-5 text-bbc-gold-600" />
                                    </div>
                                    <div className="text-[11px] font-bold text-primary uppercase tracking-wide leading-tight">{visualFeatureChips[2]?.label}</div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="absolute top-0 right-0 w-1/4 h-full opacity-[0.03] pointer-events-none">
                    <Building2 size={800} className="text-primary translate-x-1/2" />
                </div>
            </section>

            {/* 2. DIRECT-ANSWER / TL;DR BOX */}
            {(keyTakeaways && keyTakeaways.length > 0) || description ? (
                <section className="py-12 lg:py-16 bg-white">
                    <div className="container mx-auto px-6 max-w-[960px]">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 lg:p-10 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-11 h-11 bg-bbc-gold-500 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-bold font-heading text-primary leading-tight">Ringkasan Cepat</h2>
                            </div>
                            <p className="text-base lg:text-lg text-slate-700 leading-[1.65] mb-7">
                                {description}
                            </p>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-7">
                                {[
                                    { label: 'Layanan', value: entity.replace('-', ' ') },
                                    { label: 'Lokasi', value: location.replace('-', ' ') },
                                    { label: 'Cocok untuk', value: 'Evaluasi ruang kerja fisik' },
                                    { label: 'Aksi', value: internalLinks?.closing?.label || 'Hubungi Tim BBC' },
                                    { label: 'Catatan', value: 'Cakupan perlu dikonfirmasi' }
                                ].map((item) => (
                                    <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-4">
                                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
                                        <div className="text-sm font-semibold text-primary leading-snug capitalize">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                            {keyTakeaways && keyTakeaways.length > 0 && (
                                <ul className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200/70">
                                    {keyTakeaways.map((point, i) => (
                                        <li key={i} className="flex items-start gap-3 text-[15px] lg:text-base text-slate-700 leading-[1.65]">
                                            <CheckCircle2 className="w-5 h-5 text-bbc-gold-600 shrink-0 mt-0.5" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* 3. DYNAMIC SECTIONS */}
            <section className="py-12 lg:py-16 bg-white">
                <div className="container mx-auto px-6 max-w-[1160px]">
                    <details className="xl:hidden sticky top-16 z-30 -mx-6 mb-8 border-y border-slate-200 bg-white/95 px-6 py-3 shadow-sm backdrop-blur">
                        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-primary">
                            <span className="inline-flex items-center gap-2">
                                <Info className="w-4 h-4 text-bbc-gold-600" />
                                Daftar Isi
                            </span>
                            <Plus className="w-4 h-4 text-bbc-gold-600" />
                        </summary>
                        <nav className="grid gap-2 border-t border-slate-200 pt-3">
                            {sections.slice(0, 6).map((section) => (
                                <a key={section.id} href={`#${section.id}`} className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary">
                                    {section.h2}
                                </a>
                            ))}
                        </nav>
                    </details>

                    <div className="grid xl:grid-cols-[220px_minmax(0,840px)] gap-10 xl:gap-14 items-start justify-center">
                        <aside className="hidden xl:block self-stretch">
                            <div className="sticky top-24 bg-slate-50 border border-slate-200 rounded-xl p-5">
                                <div className="flex items-center gap-2 text-primary font-bold mb-4">
                                    <Info className="w-5 h-5 text-bbc-gold-600" />
                                    Daftar Isi
                                </div>
                                <nav className="space-y-3">
                                    {sections.slice(0, 6).map((section) => (
                                        <a key={section.id} href={`#${section.id}`} className="block text-sm text-slate-600 hover:text-primary leading-snug">
                                            {section.h2}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        <article className="min-w-0">
                            {sections.map((section, idx) => {
                                const autoSectionImage = getSectionImage(section.id)
                                const hasImage = section.visual?.type === 'image'

                                return (
                                    <section
                                        key={section.id}
                                        id={section.id}
                                        className="py-10 first:pt-0 last:pb-0 border-b border-slate-200 last:border-b-0 scroll-mt-24"
                                    >
                                        <h2 className="text-2xl md:text-3xl font-bold font-heading text-primary leading-tight mb-5 max-w-3xl">
                                            {section.h2}
                                        </h2>

                                        <div className="flex flex-col gap-7">
                                            {section.rawHtml ? (
                                                <div
                                                    className="prose prose-lg max-w-none text-slate-700 leading-[1.62] [&>p]:mb-4 [&>p:last-child]:mb-0 [&>h3]:text-primary [&>h3]:font-heading [&>h3]:text-xl [&>h3]:lg:text-2xl [&>h3]:mt-7 [&>h3]:mb-3 [&_a]:text-accent [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-bbc-gold-700 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:w-full"
                                                    dangerouslySetInnerHTML={{ __html: renderBody(section.rawHtml || '') }}
                                                />
                                            ) : (
                                                <p
                                                    className="text-base lg:text-lg text-slate-700 leading-[1.62] whitespace-pre-line"
                                                    dangerouslySetInnerHTML={{ __html: renderBody(section.content || '') }}
                                                />
                                            )}

                                            {hasImage && (
                                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm ring-1 ring-slate-200/70">
                                                    <Image
                                                        src={autoSectionImage}
                                                        alt={section.h2}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(min-width: 1024px) 760px, 100vw"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Visual Layer */}
                                        {section.visual && section.visual.type === 'card' && (
                                            <div className="mt-8 grid sm:grid-cols-2 gap-4 lg:gap-5">
                                                {section.visual.items?.map((item, i) => {
                                                    const Icon = iconMap[item.icon || ''] || CheckCircle2
                                                    return (
                                                        <div
                                                            key={i}
                                                            className="bg-white p-6 lg:p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-bbc-gold-400 transition-all flex flex-col gap-4 h-full"
                                                        >
                                                            <div className="w-12 h-12 bg-bbc-gold-100 rounded-xl flex items-center justify-center shrink-0 ring-1 ring-bbc-gold-200">
                                                                <Icon className="text-bbc-gold-700 w-6 h-6" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="font-bold text-lg text-primary mb-2 leading-snug">{item.title}</h4>
                                                                {item.desc && (
                                                                    <p className="text-[15px] text-slate-600 leading-[1.65]">{item.desc}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}

                                        {/* Mid-page Soft CTA Card (after 2nd section) */}
                                        {idx === 1 && midLink && (
                                            <div className="mt-8">
                                                <div className="bg-primary/[0.03] border border-primary/15 rounded-xl p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
                                                    <div className="w-12 h-12 bg-bbc-gold-500/15 rounded-xl flex items-center justify-center shrink-0">
                                                        <MessageSquare className="w-6 h-6 text-bbc-gold-700" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg lg:text-xl font-bold text-primary mb-1.5 font-heading">
                                                            Diskusikan kebutuhan kantor Anda
                                                        </h3>
                                                        <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                                                            Gunakan rujukan terkait untuk menilai kebutuhan alamat, operasional, dan ruang fisik sebelum memilih paket.
                                                        </p>
                                                    </div>
                                                    <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 py-5 min-h-[48px] text-sm font-bold whitespace-nowrap shrink-0">
                                                        <Link href={midLink.href} className="inline-flex items-center gap-2">
                                                            {midLink.label}
                                                            <ArrowRight className="w-4 h-4" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </section>
                                )
                            })}
                        </article>

                    </div>
                </div>
            </section>

            {/* 4. FAQ — card-style accordion */}
            {faq && (
                <section className="py-12 lg:py-16 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
                            <div className="md:col-span-1">
                                <div className="md:sticky md:top-24">
                                    <h2 className="text-2xl lg:text-3xl font-bold font-heading text-primary leading-tight mb-4">
                                        {faq.title}
                                    </h2>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        Jawaban singkat untuk pertanyaan yang paling sering muncul sebelum pemilihan paket.
                                    </p>
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                {faq.items.map((item, i) => (
                                    <details
                                        key={i}
                                        className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-bbc-gold-300 hover:shadow-md transition-all open:border-bbc-gold-400 open:shadow-md"
                                    >
                                        <summary className="flex justify-between items-center gap-4 px-6 lg:px-7 py-5 lg:py-6 cursor-pointer list-none font-bold text-base lg:text-lg text-primary min-h-[56px]">
                                            <span className="flex-1">{item.q}</span>
                                            <span className="w-9 h-9 rounded-full bg-bbc-gold-50 flex items-center justify-center shrink-0 group-open:bg-bbc-gold-500 transition-colors">
                                                <Plus className="w-4 h-4 text-bbc-gold-600 group-open:text-white group-open:rotate-45 transition-all" />
                                            </span>
                                        </summary>
                                        <div className="px-6 lg:px-7 pb-6 lg:pb-7 -mt-1 text-slate-600 leading-relaxed text-[15px] lg:text-base">
                                            {item.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 5. RELATED LINKS — renders only when page explicitly passes the prop */}
            {relatedLinks && relatedLinks.length > 0 && (
                <section className="py-12 lg:py-16 bg-white">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-2xl lg:text-3xl font-bold font-heading text-primary leading-tight mb-6">
                            Rujukan Terkait
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {relatedLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group bg-white border border-slate-200 rounded-xl p-6 min-h-[96px] flex items-center justify-between gap-4 hover:border-bbc-gold-400 hover:shadow-sm transition-all"
                                >
                                    <span className="font-bold text-primary leading-snug">{link.label}</span>
                                    <ArrowRight className="w-5 h-5 text-bbc-gold-600 shrink-0 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 6. CLOSING & FINAL CTA CARD */}
            <section className="py-16 lg:py-24 bg-slate-50">
                <div className="container mx-auto px-6 max-w-[960px]">
                    {closing && (
                        <div className="mb-12 max-w-2xl mx-auto border-l-4 border-bbc-gold-500 pl-6 italic text-slate-600 text-lg leading-relaxed">
                            <p>{closing}</p>
                        </div>
                    )}

                    <div className="bg-primary rounded-xl overflow-hidden shadow-lg">
                        <div className="p-10 lg:p-14 text-center text-white max-w-2xl mx-auto">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 leading-tight font-heading">
                                Mulai dari Memetakan Kebutuhan, Bukan Komitmen
                            </h2>
                            <p className="text-base lg:text-lg text-white/75 leading-relaxed mb-10">
                                Tim BBC bantu evaluasi apakah kantor siap pakai, sewa kantor reguler, atau virtual office paling sesuai dengan operasional dan legalitas bisnis Anda — tanpa tekanan komitmen di awal.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                                <Button asChild className="bg-accent hover:bg-bbc-gold-600 text-white px-10 py-6 min-h-[48px] text-sm font-bold uppercase tracking-widest rounded-lg">
                                    <Link href={internalLinks?.closing?.href || fallbackClosingCtaV2}>
                                        {internalLinks?.closing?.label || 'Hubungi Tim BBC'}
                                    </Link>
                                </Button>
                            </div>
                            {(trustSignals?.years || trustSignals?.companies || trustSignals?.finalLocation) && (
                                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-white/55">
                                    {trustSignals?.years && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {trustSignals.years}
                                        </span>
                                    )}
                                    {trustSignals?.companies && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5" />
                                            {trustSignals.companies}
                                        </span>
                                    )}
                                    {trustSignals?.finalLocation && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {trustSignals.finalLocation}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
