import { ArrowRight, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ServiceCTA({
    title = "Siap Memulai?",
    link = "/sewa-kantor",
    buttonText = "Lihat Paket & Harga"
}) {
    return (
        <section className="py-20 md:py-32 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white/5 skew-y-3 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto text-center md:text-left">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-heading leading-tight">{title}</h2>
                        <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed font-light">
                            Jangan lewatkan kesempatan untuk memiliki kantor strategis di Jakarta Selatan dengan harga terjangkau.
                        </p>
                        <ul className="space-y-4 mb-8 text-slate-300 inline-block text-left">
                            <li className="flex items-center gap-2 font-medium">✓ Lokasi Strategis Bebas Macet</li>
                            <li className="flex items-center gap-2 font-medium">✓ Fasilitas Lengkap Tinggal Pakai</li>
                            <li className="flex items-center gap-2 font-medium">✓ Legalitas Aman & Terjamin</li>
                        </ul>
                    </div>
                    <div className="bg-white p-10 shadow-2xl skew-y-0 text-charcoal text-center flex flex-col items-center">
                        <Building2 className="w-16 h-16 text-primary mb-6 opacity-20" />
                        <h3 className="text-2xl font-bold mb-4 text-primary font-heading">Solusi Kantor Terpadu</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed font-light">
                            Temukan pilihan ruang kantor dan layanan legalitas yang paling sesuai dengan skala bisnis Anda.
                        </p>
                        <Button
                            className="w-full h-16"
                            asChild
                        >
                            <Link href={link}>
                                {buttonText} <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                        <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            Jakarta Selatan | Sejak 2007
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
