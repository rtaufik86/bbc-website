import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import {
    Users,
    Quote,
    Building2,
    Briefcase,
    Zap,
    Heart,
    ArrowRight,
    Star,
    CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'Klien & Testimoni BBC | 1.800+ Perusahaan Telah Bergabung',
    description: 'Lebih dari 1.800 perusahaan telah mempercayakan infrastruktur bisnis mereka kepada Bintaro Business Centre sejak 2007. Lihat profil klien dan testimoni mereka.',
    alternates: { canonical: 'https://bintarobusinesscentre.com/klien-dan-testimoni' },
}

export default function KlienTestimoniPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Klien & Testimoni Bintaro Business Centre",
        "description": "Portofolio klien dan testimoni perusahaan yang menggunakan layanan sewa kantor dan virtual office di BBC Jakarta Selatan.",
        "publisher": {
            "@type": "LocalBusiness",
            "name": "Bintaro Business Centre"
        }
    }

    return (
        <main className="bg-white text-charcoal font-sans">
            <Script
                id="testimoni-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* HERO SECTION */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.3em] mb-6">Social Proof & Trust</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-primary leading-[1.1] mb-8 font-heading">
                            1.800+ Perusahaan Mempercayakan Bisnisnya ke BBC
                        </h1>
                        <p className="text-xl text-charcoal/70 mb-12 leading-relaxed font-light">
                            Angka adalah satu hal. Konteks adalah segalanya. Sejak 2007, kami telah menjadi mitra infrastruktur bagi startup, firma hukum, hingga perusahaan nasional.
                        </p>
                    </div>
                </div>
            </section>

            {/* CLIENT PROFILES */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-20 font-heading text-center">Siapa yang Menggunakan Layanan BBC?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <div className="p-10 border border-primary/5 bg-bg-paper hover:shadow-2xl transition-all group">
                            <Briefcase className="w-12 h-12 text-accent mb-8 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-primary mb-6 font-heading">Konsultan & Firma Profesional</h3>
                            <p className="text-charcoal/60 text-sm font-light leading-relaxed">
                                Konsultan pajak, firma hukum, dan agensi bisnis membutuhkan citra profesional tinggi dan alamat Jakarta Selatan yang prestigius untuk menerima klien korporat.
                            </p>
                        </div>
                        <div className="p-10 border border-primary/5 bg-bg-paper hover:shadow-2xl transition-all group">
                            <Building2 className="w-12 h-12 text-accent mb-8 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-primary mb-6 font-heading">Perusahaan Distribusi</h3>
                            <p className="text-charcoal/60 text-sm font-light leading-relaxed">
                                Perusahaan trading memanfaatkan <Link href="/sewa-kantor" className="text-accent hover:underline font-bold">infrastruktur gedung</Link> kami untuk memenuhi syarat PKP KBLI Perdagangan yang mewajibkan sewa kantor fisik minimal satu tahun.
                            </p>
                        </div>
                        <div className="p-10 border border-primary/5 bg-bg-paper hover:shadow-2xl transition-all group">
                            <Zap className="w-12 h-12 text-accent mb-8 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-primary mb-6 font-heading">Startup & Founders</h3>
                            <p className="text-charcoal/60 text-sm font-light leading-relaxed">
                                Mendirikan PT pertama kali melalui <Link href="/legal/pendirian-pt-jakarta-selatan" className="text-accent hover:underline font-bold">layanan legalitas</Link> kami dengan dukungan <Link href="/virtual-office" className="text-accent hover:underline font-bold">alamat bisnis resmi</Link> di Jakarta Selatan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* RETENTION FOCUS */}
            <section className="py-24 lg:py-32 bg-primary text-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-10 font-heading text-white">Tingkat Retensi: Bukti Kepuasan Nyata</h2>
                    <p className="text-white/70 text-lg font-light leading-relaxed mb-16 italic">
                        "Dalam bisnis sewa kantor, angka retensi adalah indikator paling jujur. Tenant yang tidak puas tidak akan memperpanjang kontrak."
                    </p>
                    <div className="grid sm:grid-cols-2 gap-12">
                        <div className="p-10 bg-white/5 border border-white/10">
                            <strong className="block text-5xl font-bold text-accent mb-2">60%+</strong>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Konsistensi Hunian</span>
                        </div>
                        <div className="p-10 bg-white/5 border border-white/10">
                            <strong className="block text-5xl font-bold text-accent mb-2">3+ Thn</strong>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Rata-rata Durasi Tenant</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIAL PLACEHOLDER / SOCIAL PROOF STRIP */}
            <section className="py-24 lg:py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Client Experience</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8 font-heading">Apa Kata Mereka tentang BBC?</h2>
                            <div className="space-y-12">
                                <div className="relative p-10 bg-bg-paper border-l-4 border-accent">
                                    <Quote className="absolute top-4 right-4 w-12 h-12 text-accent/10" />
                                    <p className="text-primary italic mb-6 font-medium leading-relaxed">
                                        "Kami memilih BBC karena yurisdiksi Jakarta Selatan yang murni. Ini sangat membantu firma kami saat pengurusan PKP dan dipercaya oleh klien korporat kami."
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Users className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-primary text-sm uppercase tracking-wide">Direktur Utama</h5>
                                            <p className="text-charcoal/40 text-xs uppercase tracking-widest font-bold">Firma Hukum & Konsultan</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative p-10 bg-bg-paper border-l-4 border-accent">
                                    <Quote className="absolute top-4 right-4 w-12 h-12 text-accent/10" />
                                    <p className="text-primary italic mb-6 font-medium leading-relaxed">
                                        "Layanan virtual office BBC sangat responsif dalam mail handling. Kami selalu mendapat notifikasi WhatsApp secara real-time saat ada paket dokumen penting."
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Users className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-primary text-sm uppercase tracking-wide">Operations Manager</h5>
                                            <p className="text-charcoal/40 text-xs uppercase tracking-widest font-bold">Startup Teknologi</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square grayscale hover:grayscale-0 transition-all duration-1000 shadow-3xl overflow-hidden border border-primary/5">
                            <Image
                                src="/images/lobby/bbc-lobby-front-01.jpg.JPG"
                                alt="BBC Trusted Environments"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 lg:py-32 bg-bg-paper text-center">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8 font-heading uppercase tracking-tight">Bergabung dengan 1.800+ Bisnis di BBC</h2>
                    <p className="text-xl text-charcoal/60 mb-12 font-light italic leading-relaxed">
                        Jika bisnis Anda membutuhkan infrastruktur yang terbukti—alamat Jakarta Selatan yang sah, ruang kerja siap pakai, atau dukungan legalitas sistematis—mulai di sini.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button className="bg-accent hover:bg-accent/90 text-white font-bold rounded-none px-12 py-8 h-auto uppercase tracking-widest text-[10px]" asChild>
                            <Link href="/sewa-kantor">Jadwalkan Konsultasi</Link>
                        </Button>
                        <Button variant="outline" className="border-primary text-primary hover:bg-white font-bold rounded-none px-12 py-8 h-auto uppercase tracking-widest text-[10px]" asChild>
                            <Link href="/tentang-kami">Pelajari BBC Lebih Lanjut</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <footer className="py-12 bg-white border-t border-primary/5">
                <div className="container mx-auto px-6 flex justify-center gap-10 text-[9px] font-bold text-charcoal/30 uppercase tracking-[0.2em]">
                    <Link href="/tentang-kami" className="hover:text-primary transition-colors">Tentang BBC</Link>
                    <Link href="/sewa-kantor" className="hover:text-primary transition-colors">Sewa Kantor</Link>
                    <Link href="/virtual-office" className="hover:text-primary transition-colors">Virtual Office</Link>
                    <Link href="/legal/pendirian-pt-jakarta-selatan" className="hover:text-primary transition-colors">Legalitas Usaha</Link>
                </div>
            </footer>
        </main>
    )
}
