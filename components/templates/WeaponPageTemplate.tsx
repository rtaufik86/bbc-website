import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { 
    Check, MapPin, Award, Briefcase, Plus, Building2, ShieldCheck, 
    ArrowRight, TrendingUp, Clock, Users, Search, Calculator, 
    UserCheck, CheckSquare, FileText, Target, Zap, ShieldAlert,
    HelpCircle, ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'

// --- BBC V3 UNIVERSAL CONTENT MODEL ---

export interface Section {
    id: string
    h2: string
    content?: string
    rawHtml?: string
    type?: "core" | "support" | "narrative"
    visual?: {
        type: "card" | "list" | "none"
        items?: { title: string; desc?: string; icon?: string }[]
    }
}

export interface WeaponPageTemplateProps {
    title: string
    description: string
    canonicalUrl: string
    h1: string
    intro: string
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
    heroImage?: string
    breadcrumb?: boolean
    // Legacy support (optional)
    hero?: any 
}

const iconMap: any = {
    MapPin, Building2, ShieldCheck, Award, Briefcase, 
    Users, Search, Calculator, UserCheck, TrendingUp, 
    Clock, CheckSquare, FileText, Target, Zap, ShieldAlert
}

export default function WeaponPageTemplate({
    title,
    description,
    canonicalUrl,
    h1,
    intro,
    sections,
    faq,
    closing,
    internalLinks,
    heroImage,
    breadcrumb = true
}: WeaponPageTemplateProps) {
    
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
                "image": "https://www.bintarobusinesscentre.com" + (heroImage || "/images/hero-default.png"),
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
        <main className="bg-white text-slate-900 font-sans selection:bg-accent selection:text-white">
            <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            {/* 1. HERO SECTION (V3) */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-slate-50 overflow-hidden border-b border-slate-100">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    {breadcrumb && (
                        <div className="mb-8">
                            <SEOBreadcrumbs items={[{ label: title }]} />
                        </div>
                    )}

                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 mb-8">
                            <span className="bg-bbc-gold-100 text-bbc-gold-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-bbc-gold-200">
                                Authority Mode
                            </span>
                            <span className="bg-bbc-blue-100 text-bbc-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-bbc-blue-200">
                                V3 Engine
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-tight mb-8 font-heading">
                            {h1}
                        </h1>
                        
                        <div className="prose prose-lg text-slate-600 max-w-3xl">
                            <p className="leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: intro }} />
                        </div>

                        {internalLinks?.intro && (
                            <div className="mt-8">
                                <Button asChild className="bg-accent hover:bg-bbc-gold-600">
                                    <Link href={internalLinks.intro.href}>{internalLinks.intro.label}</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
                    <Building2 size={600} className="text-primary translate-x-1/3" />
                </div>
            </section>

            {/* 2. DYNAMIC SECTIONS (The Heart of V3) */}
            {sections.map((section, idx) => (
                <section 
                    key={section.id} 
                    className={`py-20 lg:py-28 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} border-b border-slate-100/50`}
                >
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-px bg-bbc-gold-500 w-12" />
                            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">{section.h2}</h2>
                        </div>

                        <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                            {section.rawHtml ? (
                                <div className="space-y-6 [&_a]:text-accent [&_a]:font-bold [&_a]:underline" 
                                     dangerouslySetInnerHTML={{ __html: section.rawHtml }} />
                            ) : (
                                <p className="leading-relaxed whitespace-pre-line">{section.content}</p>
                            )}
                        </div>

                        {/* Visual Components Overlay */}
                        {section.visual && section.visual.type !== 'none' && (
                            <div className="mt-12 grid sm:grid-cols-2 gap-6">
                                {section.visual.items?.map((item, i) => {
                                    const Icon = iconMap[item.icon || ''] || CheckCircle2
                                    return (
                                        <div key={i} className="bg-white p-6 border border-slate-100 shadow-sm flex gap-4 items-start">
                                            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center shrink-0">
                                                <Icon className="text-bbc-gold-600 w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                                                {item.desc && <p className="text-sm text-slate-500">{item.desc}</p>}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        
                        {/* Mid Link Slot */}
                        {idx === Math.floor(sections.length / 2) && internalLinks?.mid && (
                            <div className="mt-16 p-8 bg-primary text-white rounded-2xl relative overflow-hidden">
                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <h3 className="text-xl font-bold">Butuh Konsultasi Domisili Jakarta Selatan?</h3>
                                    <Button asChild className="bg-accent hover:bg-bbc-gold-600 text-white rounded-none px-8">
                                        <Link href={internalLinks.mid.href}>{internalLinks.mid.label} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                                    </Button>
                                </div>
                                <ShieldCheck className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64" />
                            </div>
                        )}
                    </div>
                </section>
            ))}

            {/* 3. FAQ SECTION (AEO Focus) */}
            {faq && (
                <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                    <div className="container mx-auto px-6 max-w-4xl relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold font-heading mb-4">{faq.title}</h2>
                            <div className="h-1 w-20 bg-bbc-gold-500 mx-auto" />
                        </div>
                        <div className="space-y-4">
                            {faq.items.map((item, i) => (
                                <details key={i} className="group bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden active:bg-slate-800 transition-all">
                                    <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-lg marker:hidden">
                                        {item.q}
                                        <ChevronDown className="w-5 h-5 text-bbc-gold-400 group-open:rotate-180 transition-transform" />
                                    </summary>
                                    <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-slate-700/30 pt-4">
                                        {item.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 4. CLOSING & FOOTER CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    {closing && (
                        <div className="prose prose-lg mx-auto mb-16 text-slate-600 italic">
                            <p>{closing}</p>
                        </div>
                    )}
                    
                    <div className="bg-slate-50 border border-slate-100 p-12 rounded-[3rem] relative overflow-hidden">
                        <h2 className="text-3xl font-bold text-primary mb-6">Sudah Siap Melangkah?</h2>
                        <p className="text-slate-500 mb-10 max-w-xl mx-auto italic">
                             "Pilihan alamat hari ini menentukan kecepatan pertumbuhan bisnis Anda di masa depan."
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button asChild className="bg-primary hover:bg-slate-800 text-white px-10 py-7 text-sm font-bold uppercase tracking-widest rounded-none">
                                <Link href={internalLinks?.closing?.href || 'https://wa.me/6281210002131'}>
                                    {internalLinks?.closing?.label || 'Bicara Sekarang'}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
