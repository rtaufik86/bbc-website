import { Check } from 'lucide-react'

interface FeaturesProps {
    features: string[]
}

export function Features({ features }: FeaturesProps) {
    if (!features || features.length === 0) return null

    return (
        <section className="py-20 bg-slate-900 text-white">
            <div className="container mx-auto px-4 flex flex-col items-center">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Fasilitas Lengkap</h2>
                    <p className="text-slate-300">Semua yang Anda butuhkan untuk produktivitas maksimal</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 max-w-5xl w-full">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
