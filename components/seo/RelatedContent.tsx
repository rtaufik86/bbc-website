import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface RelatedArticle {
    title: string
    description: string
    href: string
}

interface RelatedContentProps {
    articles: RelatedArticle[]
    title?: string
    layout?: 'grid' | 'list'
}

/**
 * Related Content Section for SEO Pages
 * Helps distribute authority within content silos
 * Should show 2-3 related pages from same silo
 * 'grid' layout (default) is for main content area.
 * 'list' layout is landscape-oriented for sidebars.
 */
export default function RelatedContent({
    articles,
    title = "Artikel Terkait",
    layout = "grid"
}: RelatedContentProps) {
    if (!articles || articles.length === 0) return null

    if (layout === 'list') {
        return (
            <div className="mt-12">
                <h3 className="text-lg font-bold text-primary mb-8 font-heading px-2">
                    {title}
                </h3>
                <div className="space-y-4">
                    {articles.map((article, index) => (
                        <Link
                            key={index}
                            href={article.href}
                            className="flex flex-col p-6 bg-white border border-primary/5 hover:border-accent hover:shadow-md transition-all group"
                        >
                            <h4 className="font-bold text-primary text-sm mb-2 group-hover:text-accent transition-colors">
                                {article.title}
                            </h4>
                            <p className="text-charcoal/60 text-[11px] leading-relaxed mb-4">
                                {article.description}
                            </p>
                            <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
                                Baca Selengkapnya
                                <ArrowRight className="w-3 h-3 text-accent" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <section className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary font-heading">
                {title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <Link
                        key={index}
                        href={article.href}
                        className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-accent transition-all flex flex-col h-full"
                        data-related-link="true"
                    >
                        <h3 className="text-lg font-bold mb-3 text-primary group-hover:text-accent transition-colors font-heading">
                            {article.title}
                        </h3>

                        <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">
                            {article.description}
                        </p>

                        <div className="inline-flex items-center gap-2 text-primary font-bold text-xs group-hover:gap-3 transition-all uppercase tracking-widest mt-auto">
                            Baca Selengkapnya
                            <ArrowRight className="w-4 h-4 text-accent" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
