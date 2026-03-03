'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
    MapPin,
    Phone,
    Clock,
    Car,
    Compass,
    ArrowRight,
    Check,
    Building2,
    ShieldCheck,
    Globe,
    MessageCircle,
    Navigation
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LokasiClient() {
    const addresses = {
        main: "Jl. RC. Veteran Raya No.1i, RT.1/RW.3, Bintaro",
        city: "Pesanggrahan, Jakarta Selatan 12330",
        full: "Jl. RC. Veteran Raya No.1i, RT.1/RW.3, Bintaro, Kec. Pesanggrahan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12330"
    }

    const proximityItems = [
        {
            title: "Pintu Tol Veteran",
            distance: "±1,3 KM",
            time: "3–5 menit berkendara",
            desc: "Gerbang tol terdekat dari gedung BBC. Dari arah BSD, Serpong, maupun Ciputat — keluar di Pintu Tol Veteran dan gedung kami dapat dicapai dalam waktu singkat melalui Jl. RC Veteran Raya."
        },
        {
            title: "Bintaro Jaya",
            distance: "Radius Terdekat",
            time: "Direct access",
            desc: "BBC berlokasi di koridor langsung menuju kawasan Bintaro Jaya. Bagi pemilik bisnis yang berdomisili atau beroperasi di Bintaro, BBC adalah pilihan kantor yang paling efisien secara waktu dan akses harian."
        },
        {
            title: "Pondok Indah",
            distance: "Mudah Dijangkau",
            time: "±10–15 menit",
            desc: "Dari kawasan Pondok Indah, BBC dapat dicapai melalui Jl. RC Veteran tanpa melewati titik kemacetan utama Jakarta Selatan. Waktu tempuh efisien di luar jam puncak."
        },
        {
            title: "Rempoa & Tanah Kusir",
            distance: "Koridor Terdekat",
            time: "Strategic junction",
            desc: "Bagi bisnis yang berbasis di Rempoa atau Tanah Kusir, lokasi BBC berada dalam jangkauan harian yang praktis."
        }
    ]

    return (
        <main className="bg-white text-charcoal font-sans overflow-x-hidden">
            {/* HERO SECTION - Premium Magazine Style */}
            <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-32 bg-bg-paper border-b border-primary/5">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block text-accent font-bold text-[10px] lg:text-xs uppercase tracking-[0.3em] mb-6">Lokasi Strategis</span>
                        <h1 className="text-3xl lg:text-6xl font-bold text-primary leading-[1.1] mb-6 font-heading">
                            Lokasi Kantor Bintaro Business Centre <br className="hidden lg:block" /> di Jakarta Selatan
                        </h1>
                        <h2 className="text-xl md:text-2xl text-accent font-medium mb-8">
                            Koridor Utama Jakarta Selatan — Akses Cepat dari Bintaro Jaya & Pondok Indah
                        </h2>
                        <p className="text-lg text-charcoal/70 leading-relaxed font-light">
                            Gedung kami berada di koridor utama Jakarta Selatan dengan akses cepat ke Pintu Tol Veteran (±1,3 KM) dan konektivitas langsung ke kawasan Bintaro Jaya serta Pondok Indah.
                        </p>
                    </div>
                </div>
            </section>

            {/* ALAMAT LENGKAP & MAP */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        <div className="lg:col-span-5 order-2 lg:order-1">
                            <div className="bg-bg-paper p-6 lg:p-10 border-l-4 border-accent shadow-2xl">
                                <h3 className="text-xl lg:text-2xl font-bold text-primary mb-6 lg:mb-8 font-heading uppercase tracking-wider">Alamat Lengkap</h3>
                                <div className="space-y-6 lg:space-y-8">
                                    <div className="flex gap-4">
                                        <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-accent shrink-0" />
                                        <p className="text-base lg:text-lg text-primary font-medium leading-relaxed">
                                            Bintaro Business Centre<br />
                                            Jl. RC. Veteran Raya No.1i, RT.1/RW.3<br />
                                            Kel. Bintaro, Kec. Pesanggrahan<br />
                                            Jakarta Selatan 12330
                                        </p>
                                    </div>
                                    <div className="grid gap-4">
                                        <div className="flex items-start gap-4">
                                            <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                            <span className="text-charcoal/80 font-medium text-sm lg:text-base">Telepon: (021) 7362639</span>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <MessageCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                            <span className="text-charcoal/80 font-medium text-sm lg:text-base">WhatsApp: +62 812-1177-8036</span>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                            <span className="text-charcoal/80 font-medium text-sm lg:text-base">
                                                Senin–Jumat: 09.00–17.00 WIB<br />
                                                Sabtu–Minggu: 09.00–15.00 WIB
                                            </span>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-none h-14 uppercase tracking-widest text-[10px] lg:text-xs font-bold mt-6" asChild>
                                        <a href="https://www.google.com/maps/place/Bintaro+Business+Centre/@-6.2721988,106.7622405,17z" target="_blank">
                                            <Navigation className="w-4 h-4 mr-2" /> Buka di Google Maps
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1 border-r border-primary/5 hidden lg:block h-96"></div>
                        <div className="lg:col-span-6 order-1 lg:order-2">
                            <div className="h-[300px] md:h-[450px] lg:h-[500px] relative w-full shadow-3xl bg-slate-100 grayscale hover:grayscale-0 transition-all duration-700">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.198357776145!2d106.76005187425867!3d-6.272198765351914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1025a1b3b21%3A0x6b4a6d0c6d9d0e0!2sBintaro%20Business%20Centre!5e0!3m2!1sen!2sid!4v1707567890123!5m2!1sen!2sid"
                                    width="100%"
                                    height="100%"
                                    className="absolute inset-0 border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AKSES & KEDEKATAN LOKASI */}
            <section className="py-16 lg:py-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mb-12 lg:mb-20">
                        <span className="inline-block text-accent font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Connectivity</span>
                        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-6 font-heading">Akses & Kedekatan Lokasi</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-20">
                        {proximityItems.map((item, i) => (
                            <div key={i} className="group">
                                <span className="text-accent font-bold text-xs uppercase tracking-widest mb-4 block">{item.distance} — {item.time}</span>
                                <h3 className="text-2xl font-bold text-primary mb-4 font-heading group-hover:text-accent transition-colors">{item.title}</h3>
                                <p className="text-charcoal/70 text-base leading-relaxed font-light">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* KENAPA JAKARTA SELATAN - Editorial Layout */}
            <section className="py-16 lg:py-32 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                        <div className="lg:col-span-5 lg:sticky lg:top-32 mb-12 lg:mb-0">
                            <span className="inline-block text-accent font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Legal Strategy</span>
                            <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-6 lg:mb-8 font-heading">Kenapa Jakarta Selatan?</h2>
                            <p className="text-base lg:text-lg text-charcoal/80 leading-relaxed font-light mb-8">
                                Lokasi bukan sekadar alamat. Untuk bisnis, alamat adalah <span className="text-primary font-bold">pernyataan legalitas</span>.
                            </p>
                            <div className="p-6 lg:p-8 bg-primary text-white border-l-4 border-accent">
                                <p className="text-xs lg:text-sm font-light italic leading-relaxed">
                                    "BBC berlokasi di Jakarta Selatan secara administratif — bukan Tangerang Selatan, bukan Bintaro Jaya sebagai kawasan pengembang swasta."
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-7 space-y-10 lg:space-y-16">
                            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
                                <div className="shrink-0 w-12 lg:w-16 h-12 lg:h-16 bg-bg-paper border border-primary/5 flex items-center justify-center">
                                    <ShieldCheck className="w-6 lg:w-8 h-6 lg:h-8 text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-lg lg:text-xl font-bold text-primary mb-3 lg:mb-4 uppercase tracking-widest font-heading">Keunggulan Administratif DKI Jakarta</h4>
                                    <p className="text-charcoal/70 text-sm lg:text-base leading-relaxed font-light">
                                        Alamat Jakarta Selatan memberikan keuntungan dalam proses registrasi perusahaan, pengurusan NPWP badan, dan pengajuan status PKP. Kantor pajak wilayah DKI Jakarta memiliki yurisdiksi berbeda dari wilayah Tangerang Selatan — dan perbedaan yurisdiksi ini berdampak langsung pada proses legal dan perpajakan perusahaan Anda.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
                                <div className="shrink-0 w-12 lg:w-16 h-12 lg:h-16 bg-bg-paper border border-primary/5 flex items-center justify-center">
                                    <Globe className="w-6 lg:w-8 h-6 lg:h-8 text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-lg lg:text-xl font-bold text-primary mb-3 lg:mb-4 uppercase tracking-widest font-heading">Kredibilitas B2B</h4>
                                    <p className="text-charcoal/70 text-sm lg:text-base leading-relaxed font-light">
                                        Klien korporat, mitra bisnis, dan institusi keuangan cenderung memberikan kepercayaan lebih kepada perusahaan dengan alamat Jakarta — khususnya Jakarta Selatan yang dikenal sebagai koridor bisnis premium.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
                                <div className="shrink-0 w-12 lg:w-16 h-12 lg:h-16 bg-bg-paper border border-primary/5 flex items-center justify-center">
                                    <Building2 className="w-6 lg:w-8 h-6 lg:h-8 text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-lg lg:text-xl font-bold text-primary mb-3 lg:mb-4 uppercase tracking-widest font-heading">Compliance-Ready</h4>
                                    <p className="text-charcoal/70 text-sm lg:text-base leading-relaxed font-light">
                                        Untuk bisnis jasa yang membutuhkan PKP dengan alamat virtual office, atau bisnis yang memerlukan domisili perusahaan yang dapat diverifikasi oleh instansi pemerintah — alamat Jakarta Selatan memenuhi persyaratan tersebut.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 lg:py-32 bg-primary text-white text-center">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 font-heading text-white">Anda ingin melihat langsung kondisi gedung, ruang kantor, dan fasilitas kami sebelum memutuskan?</h2>
                    <p className="text-white/60 text-lg mb-12 font-light italic">Tim BBC siap menjadwalkan kunjungan tanpa tekanan.</p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button
                            className="bg-accent hover:bg-accent/90 text-white font-bold rounded-none px-10 py-8 h-auto uppercase tracking-widest text-xs shadow-xl shadow-accent/20"
                            asChild
                        >
                            <a href="https://wa.me/6281311778036?text=Halo%20BBC,%20saya%20ingin%20jadwal%20kunjungan%20lokasi">
                                Jadwalkan Kunjungan via WhatsApp <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                        </Button>
                        <Button
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-primary font-bold rounded-none px-10 py-8 h-auto uppercase tracking-widest text-xs"
                            asChild
                        >
                            <Link href="/kontak">
                                Hubungi Kami
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-16 pt-16 border-t border-white/10 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-60">
                        <Link href="/sewa-kantor" className="text-sm uppercase tracking-widest hover:text-accent transition-colors">Service Office</Link>
                        <Link href="/virtual-office" className="text-sm uppercase tracking-widest hover:text-accent transition-colors">Virtual Office</Link>
                        <Link href="/jasa-legalitas" className="text-sm uppercase tracking-widest hover:text-accent transition-colors">Jasa Legalitas</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
