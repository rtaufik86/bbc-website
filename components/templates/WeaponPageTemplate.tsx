import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { 
    Check, MapPin, Award, Briefcase, Plus, Building2, ShieldCheck, 
    ArrowRight, TrendingUp, Clock, Users, Search, Calculator, 
    UserCheck, CheckSquare, FileText, Target, Zap, ShieldAlert,
    HelpCircle, ChevronDown, CheckCircle2, Image as ImageIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import { getHeroImage, getSectionImage } from '@/lib/seo/visualMapping'
import { injectInternalLinks } from '@/lib/seo/linkInjectionEngine'
import { buildWhatsAppLink } from '@/lib/tracking/cta'

const fallbackHeroConsult = buildWhatsAppLink({ text: 'Halo BBC, saya ingin konsultasi langsung.', service: 'general', cta: 'hero', intent: 'consultation', phone: '6281210002131' })
const fallbackClosingCta = buildWhatsAppLink({ text: 'Halo BBC, saya ingin daftar layanan.', service: 'general', cta: 'final', intent: 'consultation', phone: '6281210002131' })

// --- BBC V3 UNIVERSAL CONTENT MODEL (WITH VISUAL ENGINE v1) ---

export interface Section {
    id: string
    h2: string
    content?: string
    rawHtml?: string
    type?: "core" | "support" | "narrative"
    visual?: {
        type: "card" | "list" | "image" | "none"
        items?: { title: string; desc?: string; icon?: string }[]
        image?: string // Still optional for manual override
        alt?: string
    }
}

export interface WeaponPageTemplateProps {
    url: string       // NEW: for Entity Graph
    title: string
    description: string
    canonicalUrl: string
    h1: string
    intro: string
    entity: string    // NEW: for Visual Engine
    location: string  // NEW: for Visual Engine
    heroBadges?: { b1: string; b2: string }
    sections: Section[]
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
    breadcrumb?: boolean
    schemaObject?: any
}

const iconMap: any = {
    MapPin, Building2, ShieldCheck, Award, Briefcase, 
    Users, Search, Calculator, UserCheck, TrendingUp, 
    Clock, CheckSquare, FileText, Target, Zap, ShieldAlert
}

export default function WeaponPageTemplate({
    url,
    title,
    description,
    canonicalUrl,
    h1,
    intro,
    entity,
    location,
    heroBadges,
    sections,
    faq,
    closing,
    internalLinks,
    breadcrumb = true
}: WeaponPageTemplateProps) {
    
    // VISUAL ENGINE: Deterministic Hero Image
    const autoHeroImage = getHeroImage(entity, location);
    const midLink = internalLinks?.mid

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

    return (
        <main className="bg-white text-slate-900 font-sans selection:bg-accent selection:text-white pb-20">
            <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            {/* 1. HERO SECTION (v3.1 + Visual Engine) */}
            <section className="relative pt-20 pb-16 lg:pt-24 lg:pb-24 bg-slate-50 overflow-hidden border-b border-slate-100">
                <div className="container mx-auto px-6 max-w-7xl relative z-20">
                    {breadcrumb && (
                        <div className="mb-8">
                            <SEOBreadcrumbs items={[{ label: title }]} />
                        </div>
                    )}

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="flex items-center gap-2 mb-8">
                                <span className="bg-bbc-gold-100 text-bbc-gold-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-bbc-gold-200">
                                    {heroBadges?.b1 || "Verified Office"}
                                </span>
                                <span className="bg-bbc-blue-100 text-bbc-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-bbc-blue-200">
                                    {heroBadges?.b2 || location.replace('-', ' ')}
                                </span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-tight mb-8 font-heading">
                                {h1}
                            </h1>
                            
                            <div className="prose prose-lg text-slate-600 max-w-xl mb-12">
                                <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: injectInternalLinks(intro, url) }} />
                            </div>

                            {internalLinks?.intro && (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button asChild className="bg-accent hover:bg-bbc-gold-600 text-white rounded-none px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all shadow-xl">
                                        <Link href={internalLinks.intro.href}>{internalLinks.intro.label}</Link>
                                    </Button>
                                    <Button variant="outline" className="border-slate-300 rounded-none px-10 py-7 text-sm font-bold uppercase tracking-widest hover:bg-slate-50" asChild>
                                        <Link href={fallbackHeroConsult} target="_blank" rel="noopener noreferrer">Konsultasi Live</Link>
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="order-1 lg:order-2 relative aspect-[4/3] lg:aspect-square">
                            <div className="absolute inset-0 bg-bbc-gold-500/10 -rotate-3 rounded-2xl" />
                            <div className="absolute inset-0 bg-slate-200 rounded-2xl overflow-hidden shadow-2xl rotate-2">
                                <Image 
                                    src={autoHeroImage} 
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            {/* Floating Element */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl border border-slate-100 hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary flex items-center justify-center">
                                        <ShieldCheck className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Identity</div>
                                        <div className="text-sm font-bold text-primary italic capitalize">{entity.replace('-', ' ')} Service</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Visual Flair Background */}
                <div className="absolute top-0 right-0 w-1/4 h-full opacity-[0.03] pointer-events-none">
                    <Building2 size={800} className="text-primary translate-x-1/2" />
                </div>
            </section>

            {/* 2. DYNAMIC SECTIONS */}
            {sections.map((section, idx) => {
                // VISUAL ENGINE: Auto-resolve Section Image
                const autoSectionImage = getSectionImage(section.id);
                const hasImage = section.visual?.type === 'image' || section.id === 'authority';

                return (
                    <section 
                        key={section.id} 
                        className={`py-12 lg:py-16 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} border-b border-slate-100/50`}
                    >
                        <div className="container mx-auto px-6 max-w-4xl">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-px bg-bbc-gold-500 w-12" />
                                <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">{section.h2}</h2>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-12 items-start">
                                 <div className="flex-1 prose prose-slate prose-lg max-w-none text-slate-600">
                                    {section.rawHtml ? (
                                        <div className="space-y-6 [&_a]:text-accent [&_a]:font-bold [&_a]:underline" 
                                             dangerouslySetInnerHTML={{ __html: injectInternalLinks(section.rawHtml || '', url) }} />
                                    ) : (
                                        <p className="leading-relaxed whitespace-pre-line"
                                           dangerouslySetInnerHTML={{ __html: injectInternalLinks(section.content || '', url) }} />
                                    )}
                                </div>

                                {/* Visual Engine: Section Image Rendering */}
                                {hasImage && (
                                    <div className="lg:w-[320px] shrink-0">
                                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-4 border-white grayscale-[0.5] hover:grayscale-0 transition-all duration-700">
                                            <Image 
                                                src={autoSectionImage} 
                                                alt={section.h2}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Card Visual Layer */}
                            {section.visual && section.visual.type === 'card' && (
                                <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {section.visual.items?.map((item, i) => {
                                        const Icon = iconMap[item.icon || ''] || CheckCircle2
                                        return (
                                            <div key={i} className="bg-white p-6 border border-slate-100 shadow-sm flex flex-col gap-4 items-start hover:border-bbc-gold-500 transition-all">
                                                <div className="w-10 h-10 bg-bbc-gold-50 rounded flex items-center justify-center shrink-0">
                                                    <Icon className="text-bbc-gold-600 w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                                                    {item.desc && <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}

                            {/* Mid-page internal CTA (after 2nd section) */}
                            {idx === 1 && midLink && (
                                <p className="mt-10 text-base text-slate-600">
                                    <Link
                                        href={midLink.href}
                                        className="inline-flex items-center gap-2 text-accent font-bold underline"
                                    >
                                        {midLink.label}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </p>
                            )}
                        </div>
                    </section>
                );
            })}

            {/* 3. FAQ SECTION */}
            {faq && (
                <section className="py-16 lg:py-20 bg-white">
                    <div className="container mx-auto px-6 max-w-4xl relative z-10">
                        <div className="flex flex-col md:flex-row gap-12">
                            <div className="md:w-1/3">
                                <h2 className="text-3xl font-bold font-heading text-primary leading-tight sticky top-32">{faq.title}</h2>
                            </div>
                            <div className="md:w-2/3 space-y-4">
                                {faq.items.map((item, i) => (
                                    <details key={i} className="group border-b border-slate-100 hover:bg-slate-50 transition-all">
                                        <summary className="flex justify-between items-center py-6 cursor-pointer list-none font-bold text-lg text-primary">
                                            {item.q}
                                            <Plus className="w-5 h-5 text-bbc-gold-600 group-open:rotate-45 transition-transform" />
                                        </summary>
                                        <div className="pb-8 text-slate-600 leading-relaxed pr-10">
                                            {item.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 4. CLOSING & FOOTER CTA */}
            <section className="py-16 lg:py-20 bg-slate-50">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    {closing && (
                        <div className="prose prose-lg mx-auto mb-12 text-slate-600 font-medium max-w-2xl border-l-4 border-bbc-gold-500 pl-8 text-left italic">
                            <p>{closing}</p>
                        </div>
                    )}
                    
                    <div className="bg-primary p-10 lg:p-16 rounded-[4rem] relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 text-white max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl lg:text-5xl font-bold mb-8">Siap Mengatur Domisili?</h2>
                            <Button asChild className="bg-accent hover:bg-bbc-gold-600 text-white px-12 py-8 text-sm font-black uppercase tracking-widest rounded-none shadow-xl shadow-accent/20">
                                <Link href={internalLinks?.closing?.href || fallbackClosingCta}>
                                    {internalLinks?.closing?.label || 'Daftar Sekarang'}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
