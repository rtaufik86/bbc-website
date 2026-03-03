import Link from 'next/link'
import { CheckCircle2, Building2, Globe, FileCheck, Users, Presentation } from 'lucide-react'

const services = [
    {
        title: "Sewa Kantor",
        description: "Kantor privat siap pakai 10-15m² dengan fasilitas lengkap.",
        icon: <Building2 className="w-8 h-8 text-bbc-blue-900" />,
        href: "/sewa-kantor"
    },
    {
        title: "Virtual Office",
        description: "Alamat bisnis bergengsi untuk legalitas tanpa sewa fisik.",
        icon: <Globe className="w-8 h-8 text-bbc-blue-900" />,
        href: "/virtual-office"
    },
    {
        title: "Jasa Legal",
        description: "Pendirian PT, CV, dan izin usaha cepat & transparan.",
        icon: <FileCheck className="w-8 h-8 text-bbc-blue-900" />,
        href: "/legal/pendirian-pt-jakarta-selatan"
    }
]

export default function ServicesOverview() {
    return (
        <section className="py-20 md:py-32 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-bbc-gold-500 font-bold tracking-wider uppercase text-sm">Layanan Kami</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 mb-6">Solusi Bisnis Lengkap di Bintaro</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Kami menyediakan ekosistem kantor profesional yang mendukung pertumbuhan bisnis Anda, mulai dari alamat legal hingga ruang kerja fisik.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <Link key={i} href={service.href} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
                            <div className="w-16 h-16 bg-bbc-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-bbc-blue-900 transition-colors">
                                <div className="group-hover:text-white transition-colors">{service.icon}</div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                            <p className="text-slate-600 mb-6 line-clamp-2">{service.description}</p>
                            <span className="text-bbc-blue-600 font-semibold group-hover:underline flex items-center gap-2">
                                Lihat Detail <CheckCircle2 className="w-4 h-4" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
