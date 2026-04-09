import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { 
    Check, MapPin, Award, Briefcase, Plus, Building2, ShieldCheck, 
    ArrowRight, TrendingUp, Clock, Users, Search, Calculator, 
    UserCheck, CheckSquare, FileText, Target, Zap, ShieldAlert,
    HelpCircle, ChevronDown, Image as ImageIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'

// --- BBC V3 UNIVERSAL CONTENT MODEL (WITH VISUAL LAYER v3.1) ---

export interface Section {
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
        position?: "side" | "top" | "bottom"
    }
}

export interface WeaponPageTemplateProps {
    title: string
    description: string
    canonicalUrl: string
    h1: string
    intro: string
    hero?: {
        image: string
        alt?: string
        badge1?: string
        badge2?: string
    }
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
    title,
    description,
    canonicalUrl,
    h1,
    intro,
    hero,
    sections,
    faq,
    closing,
    internalLinks,
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
                "image": "https://www.bintarobusinesscentre.com" + (hero?.image || "/images/hero-default.png"),
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

    const fallbackHeroImage = "/virtual_office_concept_hero_1775704318054.png"

    return (
        <main className="bg-white text-slate-900 font-sans selection:bg-accent selection:text-white pb-20">
            <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            {/* 1. HERO SECTION (v3.1 - Restoration) */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-slate-50 overflow-hidden border-b border-slate-100">
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
                                    {hero?.badge1 || "Official Domisili"}
                                </span>
                                <span className="bg-bbc-blue-100 text-bbc-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-bbc-blue-200">
                                    {hero?.badge2 || "Jakarta Selatan"}
                                </span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-tight mb-8 font-heading">
                                {h1}
                            </h1>
                            
                            <div className="prose prose-lg text-slate-600 max-w-xl mb-12">
                                <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: intro }} />
                            </div>

                            {internalLinks?.intro && (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button asChild className="bg-accent hover:bg-bbc-gold-600 text-white rounded-none px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all shadow-xl">
                                        <Link href={internalLinks.intro.href}>{internalLinks.intro.label}</Link>
                                    </Button>
                                    <Button variant="outline" className="border-slate-300 rounded-none px-10 py-7 text-sm font-bold uppercase tracking-widest hover:bg-slate-50" asChild>
                                        <Link href="https://wa.me/6281210002131">Konsultasi Live</Link>
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="order-1 lg:order-2 relative aspect-[4/3] lg:aspect-square">
                            <div className="absolute inset-0 bg-bbc-gold-500/10 -rotate-3 rounded-2xl" />
                            <div className="absolute inset-0 bg-slate-200 rounded-2xl overflow-hidden shadow-2xl rotate-2">
                                <Image 
                                    src={hero?.image || fallbackHeroImage} 
                                    alt={hero?.alt || title}
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
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Status</div>
                                        <div className="text-sm font-bold text-primary italic">Zonasi Perkantoran Jakarta</div>
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

            {/* 2. DYNAMIC SECTIONS (With Optional Visual Layer) */}
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

                        <div className="flex flex-col lg:flex-row gap-12 items-start">
                             <div className="flex-1 prose prose-slate prose-lg max-w-none text-slate-600">
                                {section.rawHtml ? (
                                    <div className="space-y-6 [&_a]:text-accent [&_a]:font-bold [&_a]:underline" 
                                         dangerouslySetInnerHTML={{ __html: section.rawHtml }} />
                                ) : (
                                    <p className="leading-relaxed whitespace-pre-line">{section.content}</p>
                                )}
                            </div>

                            {/* Section Image Support (Explicit Visual v3.1) */}
                            {section.visual?.image && (
                                <div className="lg:w-[350px] shrink-0">
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-4 border-white">
                                        <Image 
                                            src={section.visual.image} 
                                            alt={section.visual.alt || section.h2}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Card Visual Components Layer */}
                        {section.visual && section.visual.type === 'card' && (
                            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {section.visual.items?.map((item, i) => {
                                    const Icon = iconMap[item.icon || ''] || CheckCircle2
                                    return (
                                        <div key={i} className="bg-white p-6 border border-slate-100 shadow-sm flex flex-col gap-4 items-start relative group hover:border-bbc-gold-500 transition-all">
                                            <div className="w-10 h-10 bg-bbc-gold-50 rounded flex items-center justify-center shrink-0">
                                                <Icon className="text-bbc-gold-600 w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                                                {item.desc && <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>}
                                            </div>
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-1 h-1 bg-bbc-gold-500" />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        
                        {/* Mid Link Slot */}
                        {idx === Math.floor(sections.length / 2) && internalLinks?.mid && (
                            <div className="mt-16 p-8 bg-slate-900 text-white rounded-[2rem] relative overflow-hidden">
                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                                    <div className="max-w-md">
                                        <h3 className="text-2xl font-bold mb-2">Butuh Domisili Resmi Jakarta Selatan?</h3>
                                        <p className="text-slate-400 text-sm italic">"Pastikan legalitas Anda aman sebelum melakukan komitmen besar."</p>
                                    </div>
                                    <Button asChild className="bg-accent hover:bg-bbc-gold-600 text-white rounded-none px-10 h-14 font-black uppercase tracking-widest shrink-0">
                                        <Link href={internalLinks.mid.href}>{internalLinks.mid.label}</Link>
                                    </Button>
                                </div>
                                <div className="absolute -bottom-10 -right-10 text-white/[0.03] w-64 h-64 border-[30px] border-white rounded-full" />
                            </div>
                        )}
                    </div>
                </section>
            ))}

            {/* 3. FAQ SECTION */}
            {faq && (
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6 max-w-4xl relative z-10">
                        <div className="flex flex-col md:flex-row gap-12">
                            <div className="md:w-1/3">
                                <h2 className="text-3xl font-bold font-heading text-primary leading-tight sticky top-32">{faq.title}</h2>
                                <p className="mt-4 text-slate-500 text-sm leading-relaxed italic">Informasi faktual mengenai registrasi alamat dan legalitas zonasi.</p>
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
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    {closing && (
                        <div className="prose prose-lg mx-auto mb-20 text-slate-600 font-medium max-w-2xl border-l-4 border-bbc-gold-500 pl-8 text-left italic">
                            <p>{closing}</p>
                        </div>
                    )}
                    
                    <div className="bg-primary p-12 lg:p-20 rounded-[4rem] relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 text-white max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl lg:text-5xl font-bold mb-8">Siap Mengamankan Domisili Anda?</h2>
                            <p className="text-bbc-gold-200 mb-12 text-lg italic font-light">"Jangan tunda legalitas karena birokrasi, biarkan kami yang mengurus alamat Anda."</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <Button asChild className="bg-accent hover:bg-bbc-gold-600 text-white px-12 py-8 text-sm font-black uppercase tracking-widest rounded-none shadow-xl shadow-accent/20">
                                    <Link href={internalLinks?.closing?.href || 'https://wa.me/6281210002131'}>
                                        {internalLinks?.closing?.label || 'Daftar Sekarang'}
                                    </Link>
                                </Button>
                             </div>
                        </div>
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    </div>
                </div>
            </section>
        </main>
    )
}
