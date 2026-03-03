import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function HomeHero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
            {/* Background Placeholder */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-10" />
                {/* Replace with actual video/image */}
                <div className="w-full h-full bg-cover bg-center bg-slate-800" style={{ backgroundImage: "url('/img/placeholder-hero.jpg')" }} />
            </div>

            <div className="container mx-auto px-4 relative z-20 text-center max-w-5xl">
                <div className="inline-flex items-center gap-2 bg-bbc-blue-500/20 text-bbc-gold-400 px-4 py-2 rounded-full border border-bbc-blue-500/30 backdrop-blur-sm mb-8 animate-fade-in-up">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-semibold tracking-wide">Okupansi 85% - Tersedia 12 Unit Terakhir</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-heading tracking-tight leading-tight">
                    Bintaro Business Center
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Solusi Kantor Profesional Sejak 2007. Sewa kantor siap pakai, virtual office & legalitas badan usaha dalam satu atap.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-bbc-gold-500 hover:bg-bbc-gold-600 text-white text-lg px-8 h-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1" asChild>
                        <Link href="#layanan">
                            Lihat Layanan Kami <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-2 border-slate-500 text-white hover:bg-white hover:text-slate-900 text-lg px-8 h-14 rounded-full transition-all" asChild>
                        <Link href="https://wa.me/6281311778036">
                            Hubungi via WhatsApp
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
