import { LucideIcon, CheckCircle, Shield, Clock, MapPin } from 'lucide-react'

interface Benefit {
    title: string
    description: string
    icon?: any // LucideIcon logic handled in parent or simplified
}

interface BenefitsProps {
    benefits: Benefit[]
}

export function Benefits({ benefits }: BenefitsProps) {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Mengapa Memilih Kami?</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                {/* Simplified icon logic for now */}
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
