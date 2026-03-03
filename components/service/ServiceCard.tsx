import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface ServiceCardProps {
    title: string
    description: string
    icon: React.ReactNode
    href: string
    features?: string[]
}

export default function ServiceCard({
    title,
    description,
    icon,
    href,
    features
}: ServiceCardProps) {
    return (
        <div className="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-bbc-blue-50 rounded-xl text-bbc-blue-600 group-hover:bg-bbc-blue-600 group-hover:text-white transition-colors">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
            </div>

            <p className="text-slate-600 mb-6 leading-relaxed">
                {description}
            </p>

            {features && features.length > 0 && (
                <ul className="space-y-2 mb-6">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-slate-700">
                            <span className="w-1.5 h-1.5 bg-bbc-gold-500 rounded-full"></span>
                            {feature}
                        </li>
                    ))}
                </ul>
            )}

            <Button
                asChild
                className="w-full bg-bbc-blue-500 hover:bg-bbc-blue-600 text-white font-semibold group"
            >
                <Link href={href} className="flex items-center justify-center gap-2">
                    Lihat Detail
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </Button>
        </div>
    )
}
