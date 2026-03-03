import Link from 'next/link'
import Image from 'next/image'

interface SolutionCardProps {
    title: string
    description: string
    icon: string // URL to icon or name
    slug: string
    features: string[]
    price?: string
    image: string
}

export function SolutionCard({ title, description, slug, features, price, image }: SolutionCardProps) {
    return (
        <div className="flex flex-col bg-white border border-slate-200 shadow-sm rounded-none hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">{description}</p>

                {/* Features List */}
                <ul className="space-y-2 mb-6 text-sm text-slate-500 flex-1">
                    {features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            {feat}
                        </li>
                    ))}
                </ul>

                {price && (
                    <div className="mb-4">
                        <span className="text-xs text-slate-500 block">Mulai dari</span>
                        <span className="text-lg font-bold text-slate-900">{price}</span>
                    </div>
                )}


                <div className="mt-auto grid grid-cols-2 gap-3">
                    <Link
                        href={slug}
                        className="flex items-center justify-center px-4 py-2 border border-primary text-primary font-semibold text-sm hover:bg-slate-50 transition-colors"
                    >
                        Lihat Detail
                    </Link>
                    <Link
                        href="/kontak"
                        className="flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
                        style={{ backgroundColor: 'rgb(30 64 175)' }} // Keeping Primary Blue
                    >
                        Hubungi Kami
                    </Link>
                </div>
            </div>
        </div>
    )
}
