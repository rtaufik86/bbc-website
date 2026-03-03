import { CheckCircle2 } from 'lucide-react'

export interface Feature {
    title: string;
    description: string;
    icon?: any;
}

export default function ServiceFeatures({ features }: { features: Feature[] }) {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Fitur & Keunggulan</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-bbc-blue-50 text-bbc-blue-500 rounded-full flex items-center justify-center mb-4">
                                {feature.icon || <CheckCircle2 className="w-6 h-6" />}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
