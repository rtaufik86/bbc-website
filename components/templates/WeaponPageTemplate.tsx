import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { 
    Check, 
    MapPin, 
    Award, 
    Briefcase, 
    Plus,
    Building2,
    ShieldCheck,
    History,
    ArrowRight,
    TrendingUp,
    Clock,
    Users,
    Search,
    Calculator,
    UserCheck,
    CheckSquare,
    FileText,
    Truck,
    Settings,
    Globe,
    Layers,
    Smile,
    Zap,
    CreditCard,
    Mail,
    PhoneCall,
    Target,
    Calendar,
    CheckCircle2,
    CheckCircle,
    Map,
    Sun,
    Lock,
    AlertTriangle,
    ShieldAlert
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import InternalLink from '@/components/seo/InternalLink'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'

interface WeaponPageTemplateProps {
    title: string
    description: string
    canonicalUrl: string
    hero: {
        badge1: string
        badge2: string
        h1: string
        subheading: string
        ctaLabel: string
        ctaHref: string
        image: string
    }
    problem: {
        title: string
        paragraphs: string[]
    }
    education: {
        title: string
        items: {
            title: string
            content: string
        }[]
    }
    authority: {
        title: string
        highlight: string
        image: string
        items: {
            icon: string
            text: string
        }[]
    }
    value: {
        title: string
        items: {
            title: string
            desc: string
            icon: string
        }[]
    }
    options: {
        title: string
        intro: string
        option1: {
            title: string
            desc: string
            suitableForTitle: string
            suitableForDesc: string
            bullets: string[]
        }
        option2: {
            title: string
            desc: string
            suitableForTitle: string
            suitableForDesc: string
            bullets: string[]
        }
    }
    internalLinks: {
        title: string
        card1: {
            title: string
            desc: string
            ctaLabel: string
            href: string
        }
        card2: {
            title: string
            desc: string
            ctaLabel: string
            href: string
        }
    }
    faq?: {
        title: string
        items: {
            q: string
            a: string
        }[]
    }
    relatedArticles?: {
        title?: string
        links: {
            title: string
            href: string
        }[]
    }
    bottomCTA: {
        title: string
        subtitle: string
        primaryCTA: { label: string; href: string }
        secondaryCTA: { label: string; href: string }
    }
    extraNarrative?: {
        title: string
        paragraphs: string[]
    }
    schemaObject?: any
    breadcrumb?: boolean
}

const iconMap: any = {
    MapPin,
    History,
    Building2,
    ShieldCheck,
    Award,
    Briefcase,
    Users,
    Search,
    Calculator,
    UserCheck,
    TrendingUp,
    Clock,
    CheckSquare,
    FileText,
    Truck,
    Settings,
    Globe,
    Layers,
    Smile,
    Zap,
    CreditCard,
    Mail,
    PhoneCall,
    Target,
    Calendar,
    CheckCircle2,
    CheckCircle,
    Map,
    Sun,
    Lock,
    AlertTriangle,
    ShieldAlert
}

export default function WeaponPageTemplate({
    title,
    description,
    canonicalUrl,
    hero,
    problem,
    education,
    authority,
    value,
    options,
    internalLinks,
    relatedArticles,
    faq,
    bottomCTA,
    extraNarrative,
    schemaObject,
    breadcrumb = true
}: WeaponPageTemplateProps) {
    const defaultSchema = {
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
                "image": "https://www.bintarobusinesscentre.com" + hero.image,
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            }
        ]
    }

    const shadowSchema = schemaObject || defaultSchema

    return (
        <main className="bg-white text-slate-900 font-sans selection:bg-accent selection:text-white">
            <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(shadowSchema) }} />


            {/* 1. HERO SECTION */}
            <section className="relative pt-24 pb-24 lg:pt-32 lg:pb-32 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">

                    {breadcrumb && (
                        <div className="mb-8">
                            <SEOBreadcrumbs items={[{ label: title }]} />
                        </div>
                    )}

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-8">
                                <span className="bg-bbc-gold-100 text-bbc-gold-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-bbc-gold-200">
                                    {hero.badge1}
                                </span>
                                <span className="bg-bbc-blue-100 text-bbc-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-bbc-blue-200">
                                    {hero.badge2}
                                </span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-primary leading-tight mb-8 font-heading">
                                {hero.h1}
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-12 [&_a]:text-accent [&_a]:font-bold [&_a]:underline [&_a]:hover:text-bbc-gold-600" dangerouslySetInnerHTML={{ __html: hero.subheading }} />
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="bg-accent hover:bg-bbc-gold-600 text-white rounded-none px-8 py-6 text-sm font-bold uppercase tracking-widest transition-all shadow-lg" asChild>
                                    {hero.ctaHref.startsWith('#') ? (
                                        <a href={hero.ctaHref}>{hero.ctaLabel} <ArrowRight className="ml-2 inline" size={16} /></a>
                                    ) : (
                                        <Link href={hero.ctaHref}>{hero.ctaLabel} <ArrowRight className="ml-2 inline" size={16} /></Link>
                                    )}
                                </Button>
                            </div>
                        </div>
                        <div className="relative h-[400px] lg:h-[500px] hidden lg:block rounded-2xl overflow-hidden shadow-2xl border-b-8 border-accent">
                            <Image
                                src={hero.image}
                                alt={hero.h1}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. PROBLEM CONTEXT */}
            <section id="problem" className="py-24 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-primary mb-12 font-heading text-center">{problem.title}</h2>
                    <div className="space-y-8 text-slate-600 leading-relaxed text-lg">
                        {problem.paragraphs.map((p, i) => (
                            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. EDUCATION (CORE) */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 font-heading">{education.title}</h2>
                        <div className="w-24 h-1 bg-accent mx-auto"></div>
                    </div>
                    
                    <div className="space-y-20">
                        {education.items.map((item, i) => (
                            <div key={i}>
                                <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                                    <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">{i+1}</span>
                                    {item.title}
                                </h3>
                                <div className="text-slate-600 leading-relaxed mb-6 font-light" dangerouslySetInnerHTML={{ __html: item.content }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. AUTHORITY INSERT (BBC) */}
            <section className="py-24 bg-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-8 font-heading">{authority.title}</h2>
                            <p className="text-blue-100 text-lg leading-relaxed mb-10 font-light italic">
                                {authority.highlight}
                            </p>
                            <ul className="space-y-6">
                                {authority.items.map((item, i) => {
                                    const Icon = iconMap[item.icon]
                                    return (
                                        <li key={i} className="flex gap-4 items-start">
                                            <Icon className="text-accent shrink-0" size={24} />
                                            <p className="text-sm text-blue-100">{item.text}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="relative h-[400px] border-4 border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            <Image 
                                src={authority.image} 
                                alt={authority.title} 
                                fill 
                                className="object-cover opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. VALUE (SOFT BENEFIT) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <h2 className="text-3xl font-bold text-primary mb-16 font-heading text-center">{value.title}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {value.items.map((item, i) => {
                            const Icon = iconMap[item.icon]
                            return (
                                <div key={i} className="bg-slate-50 p-8 border-b-4 border-accent hover:bg-primary hover:text-white transition-all group">
                                    <Icon className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-lg font-bold mb-4 font-heading">{item.title}</h3>
                                    <p className="text-sm opacity-80 leading-relaxed font-light">
                                        {item.desc}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* 6. OPTIONS (LIGHT COMPARISON) */}
            <section id="options" className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4 font-heading">{options.title}</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto italic">{options.intro}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-accent">
                            <h3 className="text-2xl font-bold text-primary mb-6">{options.option1.title}</h3>
                            <p className="text-slate-600 mb-8 text-sm leading-relaxed italic">{options.option1.desc}</p>
                            <div className="bg-bbc-blue-50 p-6 mb-8 rounded-lg">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{options.option1.suitableForTitle}</h4>
                                <p className="text-sm text-slate-700">{options.option1.suitableForDesc}</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {options.option1.bullets.map((b, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                                        <Check className="text-green-500 shrink-0" size={18} />
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-primary">
                            <h3 className="text-2xl font-bold text-primary mb-6">{options.option2.title}</h3>
                            <p className="text-slate-600 mb-8 text-sm leading-relaxed italic">{options.option2.desc}</p>
                            <div className="bg-bbc-gold-50 p-6 mb-8 rounded-lg">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-bbc-gold-700 mb-2">{options.option2.suitableForTitle}</h4>
                                <p className="text-sm text-slate-700">{options.option2.suitableForDesc}</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {options.option2.bullets.map((b, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                                        <Check className="text-green-500 shrink-0" size={18} />
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW: EXTRA NARRATIVE SECTION (V2.5) */}
            {extraNarrative && (
                <section className="py-20 bg-white border-y border-slate-100">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl font-bold font-heading mb-8 text-primary">{extraNarrative.title}</h2>
                        <div className="space-y-6">
                            {extraNarrative.paragraphs.map((p, idx) => (
                                <p key={idx} className="text-lg text-slate-600 leading-relaxed" 
                                   dangerouslySetInnerHTML={{ __html: p }} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 7. INTERNAL LINK BRIDGE */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <h2 className="text-3xl font-bold text-primary mb-12 font-heading">{internalLinks.title}</h2>
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        {/* Card 1 */}
                        <div className="group border border-slate-200 p-8 hover:border-bbc-gold-500 transition-all shadow-sm bg-slate-50 relative overflow-hidden">
                            <h3 className="text-xl font-bold text-primary mb-4">{internalLinks.card1.title}</h3>
                            <p className="text-slate-600 mb-8 text-sm leading-relaxed">{internalLinks.card1.desc}</p>
                            <Link href={internalLinks.card1.href} className="inline-flex items-center text-bbc-gold-600 font-bold text-xs uppercase tracking-widest hover:text-bbc-gold-700 transition-colors">
                                {internalLinks.card1.ctaLabel} <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                            </Link>
                        </div>
                        {/* Card 2 */}
                        <div className="group border border-slate-200 p-8 hover:border-primary transition-all shadow-sm bg-slate-50 relative overflow-hidden">
                            <h3 className="text-xl font-bold text-primary mb-4">{internalLinks.card2.title}</h3>
                            <p className="text-slate-600 mb-8 text-sm leading-relaxed">{internalLinks.card2.desc}</p>
                            <Link href={internalLinks.card2.href} className="inline-flex items-center text-primary font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors">
                                {internalLinks.card2.ctaLabel} <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* RELATED ARTICLES */}
            {relatedArticles && (
                <section className="py-16 bg-white border-b border-slate-100">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h3 className="text-lg font-bold text-primary mb-8 font-heading uppercase tracking-wider">{relatedArticles.title || 'Artikel Terkait'}</h3>
                        <div className="grid gap-4">
                            {relatedArticles.links.map((link, i) => (
                                <Link key={i} href={link.href} className="group flex items-center justify-between p-4 border border-slate-100 hover:bg-slate-50 transition-all">
                                    <span className="text-slate-700 group-hover:text-primary transition-colors">{link.title}</span>
                                    <ArrowRight size={16} className="text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 8. FAQ */}
            {faq && (
                <section className="py-24 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl font-bold text-primary mb-12 font-heading text-center">{faq.title}</h2>
                        <div className="space-y-4">
                            {faq.items.map((item, i) => (
                                <div key={i} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                    <details className="group">
                                        <summary className="flex justify-between items-center cursor-pointer py-6 px-8 font-bold text-primary hover:bg-slate-50 transition-all list-none">
                                            <span className="text-sm md:text-base leading-relaxed pr-8">{item.q}</span>
                                            <Plus className="group-open:rotate-45 transition-transform text-accent" size={20} />
                                        </summary>
                                        <div className="px-8 pb-8 text-slate-600 text-sm leading-relaxed">
                                            {item.a}
                                        </div>
                                    </details>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 9. CTA (BOTTOM ONLY) */}
            <section className="py-32 bg-primary text-white border-t-8 border-accent">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-3xl lg:text-4xl font-bold mb-8 font-heading">{bottomCTA.title}</h3>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-12 text-lg font-light italic">
                        {bottomCTA.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button className="bg-accent hover:bg-bbc-gold-600 text-white rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest transition-all shadow-2xl" asChild>
                            <Link href={bottomCTA.primaryCTA.href} target="_blank">{bottomCTA.primaryCTA.label}</Link>
                        </Button>
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest transition-all" asChild>
                            <Link href={bottomCTA.secondaryCTA.href}>{bottomCTA.secondaryCTA.label}</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}
