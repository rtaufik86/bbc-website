'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    MessageCircle,
    Building2,
    Shield,
    Users,
    MapPin,
    Check,
    ArrowRight,
    Clock,
    TrendingUp,
    ShieldCheck,
    Briefcase,
    Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import StickyWhatsAppCTA from '@/components/StickyWhatsAppCTA'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function SewaKantorV2Client() {
    const waMessage = "Hallo BBC, saya tertarik sewa kantor di Jakarta Selatan. Bisa kirim detail unit yang tersedia?"
    const waUrl = `https://wa.me/6281311778036?text=${encodeURIComponent(waMessage)}`

    return (
        <main className="bg-white font-sans text-charcoal overflow-x-hidden">
            <StickyWhatsAppCTA message={waMessage} pageType="sewa_kantor" />

            {/* 1. HERO SECTION */}
            {/* Status: Production Ready, Rule: Max 70vh, Dark overlay, Gold CTA */}
            <section className="relative h-[70vh] flex items-center bg-primary overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/private-office/bbc-private-office-suite-wide-01.jpg.JPG"
                        alt="Sewa Kantor Jakarta Selatan"
                        fill
                        className="object-cover opacity-60 grayscale-[20%]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.4em] mb-8">Money Page — Jakarta Selatan</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 font-heading">
                            Sewa Kantor Siap Pakai <br />
                            <span className="text-accent">Langsung Operasional.</span>
                        </h1>
                        <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-2xl font-light">
                            Serviced office all-inclusive dengan dukungan legalitas lengkap di Pesanggrahan, Jakarta Selatan. Pindah hari ini, mulai kerja hari ini.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Button
                                className="bg-accent text-white hover:bg-[#8F6F2E] px-12 py-8 text-sm font-bold uppercase tracking-widest rounded-none h-auto shadow-2xl shadow-accent/20"
                                asChild
                            >
                                <a href={waUrl}>
                                    <MessageCircle className="w-5 h-5 mr-3" /> Konsultasi Sekarang
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-primary px-12 py-8 text-sm font-bold uppercase tracking-widest rounded-none h-auto bg-transparent border-2"
                                asChild
                            >
                                <Link href="#pricing">Lihat Paket & Harga</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. IMMEDIATE TRUST BAR */}
            {/* Rule: Directly below hero, 3-4 signals */}
            <section className="bg-[#FAF9F6] py-16 border-b border-primary/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-center">
                        <div className="text-center group">
                            <p className="text-3xl lg:text-5xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">2007</p>
                            <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.3em]">Beroperasi Sejak</p>
                        </div>
                        <div className="text-center group border-l border-primary/5 lg:border-l-0">
                            <p className="text-3xl lg:text-5xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">1.800+</p>
                            <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.3em]">Bisnis Dipercayakan</p>
                        </div>
                        <div className="text-center group border-t lg:border-t-0 lg:border-l border-primary/5 pt-12 lg:pt-0">
                            <p className="text-3xl lg:text-5xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">JAKSEL</p>
                            <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.3em]">Lokasi Administratif</p>
                        </div>
                        <div className="text-center group border-t border-l border-primary/5 lg:border-t-0 pt-12 lg:pt-0">
                            <p className="text-3xl lg:text-5xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">OSS</p>
                            <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.3em]">Legalitas Terverifikasi</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. PROBLEM → SOLUTION FRAMING */}
            {/* Rule: Address pain before benefits */}
            <section className="py-24 lg:py-40 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-20 items-center max-w-6xl mx-auto">
                        <div className="lg:col-span-12 text-center mb-12">
                            <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-8 font-heading">Berhenti Membuang Waktu untuk Setup Kantor</h2>
                            <p className="text-charcoal/60 text-lg max-w-3xl mx-auto font-light leading-relaxed">
                                Membangun kantor konvensional membutuhkan waktu 2-3 bulan dan biaya modal (CapEx) yang besar sebelum Anda bisa menghasilkan satu Rupiah pun.
                            </p>
                        </div>
                        <div className="lg:col-span-6 space-y-12">
                            <div className="bg-bg-paper p-10 rounded-3xl border border-primary/5">
                                <h3 className="text-xl font-bold text-primary mb-6 uppercase tracking-wider">The Complex Problem:</h3>
                                <ul className="space-y-6">
                                    <li className="flex gap-4 text-sm text-charcoal/70 items-start">
                                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-red-600 text-xs font-bold">!</span>
                                        </div>
                                        <span>Setup furniture, internet, dan utilitas yang memakan waktu berminggu-minggu.</span>
                                    </li>
                                    <li className="flex gap-4 text-sm text-charcoal/70 items-start">
                                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-red-600 text-xs font-bold">!</span>
                                        </div>
                                        <span>Biaya rekrutmen dan manajemen resepsionis serta tim kebersihan.</span>
                                    </li>
                                    <li className="flex gap-4 text-sm text-charcoal/70 items-start">
                                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-red-600 text-xs font-bold">!</span>
                                        </div>
                                        <span>Komitmen kontrak jangka panjang yang tidak fleksibel untuk pertumbuhan tim.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="lg:col-span-6 space-y-12">
                            <div className="bg-accent/5 p-10 rounded-3xl border border-accent/20">
                                <h3 className="text-xl font-bold text-primary mb-6 uppercase tracking-wider">The BBC Solution:</h3>
                                <ul className="space-y-6">
                                    <li className="flex gap-4 text-sm text-primary font-bold items-start">
                                        <Check className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                                        <span>Unit siap pakai dengan furniture lengkap dan internet high-speed.</span>
                                    </li>
                                    <li className="flex gap-4 text-sm text-primary font-bold items-start">
                                        <Check className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                                        <span>Resepsionis profesional dan staff kebersihan sudah tersedia.</span>
                                    </li>
                                    <li className="flex gap-4 text-sm text-primary font-bold items-start">
                                        <Check className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                                        <span>Skalabilitas mudah—upgrade ukuran ruangan kapan pun bisnis berkembang.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. VALUE PROPOSITION BLOCKS */}
            {/* Rule: 3-5 cards max, no excessive icons */}
            <section className="py-24 lg:py-32 bg-[#FAF9F6]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] block mb-6">Designed for Excellence</span>
                        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-6 font-heading">Fasilitas All-Inclusive Tanpa Biaya Tersembunyi</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            { title: 'Infrastruktur IT', desc: 'Internet serat optik berkecepatan tinggi dengan cadangan koneksi untuk jaminan uptime bisnis Anda.', icon: Zap },
                            { title: 'Alamat Administrasi', desc: 'Gunakan alamat premium Pesanggrahan (Jakarta Selatan) untuk legalitas, PKP, dan citra profesional.', icon: Building2 },
                            { title: 'Support Operasional', desc: 'Handling surat, penerimaan tamu oleh resepsionis, dan kebersihan harian yang terkelola penuh.', icon: Users },
                            { title: 'Keamanan 24/7', desc: 'Akses gedung yang aman dengan pengawasan CCTV dan personil keamanan sepanjang waktu.', icon: ShieldCheck },
                            { title: 'Ruang Meeting', desc: 'Akses ke ruang pertemuan profesional untuk presentasi klien atau koordinasi tim internal.', icon: Briefcase }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-10 border border-primary/5 hover:border-accent hover:shadow-xl transition-all duration-500 group">
                                <item.icon className="w-10 h-10 text-primary mb-8 group-hover:text-accent transition-colors" />
                                <h3 className="text-xl font-bold text-primary mb-4 font-heading">{item.title}</h3>
                                <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. PRICING / PACKAGE SECTION */}
            {/* Rule: Clear tier logic and visible structure */}
            <section id="pricing" className="py-24 lg:py-40 bg-white">
                <div className="container mx-auto px-6 font-sans">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <h2 className="text-3xl lg:text-6xl font-black text-primary mb-8 tracking-tight font-heading leading-tight italic">
                            Opsi Ruang Kantor <span className="text-accent">Siap Pakai</span>
                        </h2>
                        <p className="text-charcoal/70 text-xl font-light leading-relaxed">Paket sewa fleksibel yang dirancang untuk mendukung setiap skala pertumbuhan bisnis Anda.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8 max-w-7xl mx-auto px-4 md:px-0">
                        {[
                            {
                                name: 'Startup Suite',
                                size: '10 - 12 m²',
                                capacity: '1–2 Orang',
                                desc: 'Ideal untuk tim kecil atau solo entrepreneur.',
                                features: ['Furniture Dasar Lengkap', 'Dedicated Internet Line', 'Handling Surat & Resepsionis', 'Cleaning Service Harian'],
                                bestFor: 'Baru Mulai (Startup)'
                            },
                            {
                                name: 'Business Suite',
                                size: '15 - 20 m²',
                                capacity: '3–5 Orang',
                                desc: 'Pilihan terpopuler untuk tim yang sedang tumbuh.',
                                features: ['Meja & Kursi Executive', 'High-Speed Wifi & LAN', 'Telepon Extension Khusus', 'Kuota Jam Meeting Room'],
                                bestFor: 'Tim Berkembang',
                                highlighted: true
                            },
                            {
                                name: 'Corporate Suite',
                                size: '25 m²+',
                                capacity: '6–8+ Orang',
                                desc: 'Ruangan modular yang bisa digabungkan sesuai tim.',
                                features: ['Layout Custom (Request)', 'Premium Interior Grade', 'Prioritas Booking Fasilitas', 'Manajer Akun Khusus'],
                                bestFor: 'Perusahaan Mapan'
                            }
                        ].map((pkg, i) => (
                            <div
                                key={i}
                                className={`relative group h-full flex flex-col p-8 lg:p-12 transition-all duration-500 ${pkg.highlighted
                                        ? 'bg-primary text-white shadow-[0_45px_100px_rgba(15,30,51,0.25)] border-transparent scale-105 z-20'
                                        : 'bg-white text-primary border border-primary/5 hover:border-accent shadow-sm'
                                    }`}
                            >
                                {pkg.highlighted && (
                                    <div className="absolute top-0 right-12 bg-accent text-white px-6 py-2 text-[9px] font-black uppercase tracking-[0.3em] -translate-y-1/2 shadow-xl">
                                        Paling Diminati
                                    </div>
                                )}
                                <div className="mb-10">
                                    <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${pkg.highlighted ? 'text-accent' : 'text-accent'}`}>{pkg.bestFor}</p>
                                    <h3 className="text-3xl font-black mb-2 font-heading italic tracking-tighter">{pkg.name}</h3>
                                    <p className={`text-sm font-bold opacity-60`}>Ukuran: {pkg.size}</p>
                                </div>
                                <p className={`text-base mb-10 font-light leading-relaxed ${pkg.highlighted ? 'text-white/70' : 'text-charcoal/70'}`}>{pkg.desc}</p>
                                <ul className="space-y-6 mb-12 flex-grow">
                                    {pkg.features.map((feat, k) => (
                                        <li key={k} className="flex items-start gap-4">
                                            <Check className={`w-5 h-5 shrink-0 mt-0.5 ${pkg.highlighted ? 'text-accent' : 'text-accent'}`} />
                                            <span className={`text-sm font-medium ${pkg.highlighted ? 'text-white/90' : 'text-charcoal/80'}`}>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className={`w-full py-7 font-black rounded-none h-auto uppercase tracking-widest text-[10px] transition-all duration-500 ${pkg.highlighted
                                            ? 'bg-accent text-white hover:bg-white hover:text-primary shadow-2xl shadow-accent/20'
                                            : 'bg-primary text-white hover:bg-accent'
                                        }`}
                                    asChild
                                >
                                    <a href={waUrl}>Cek Ketersediaan Unit</a>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. COMPARISON MATRIX */}
            {/* Rule: If relevant for multiple packages */}
            <section className="py-24 lg:py-32 bg-[#FAF9F6]">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto overflow-hidden border border-primary/5 shadow-2xl rounded-3xl">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-primary text-white">
                                    <th className="p-8 font-bold text-xs uppercase tracking-widest font-heading">Layanan Mendalam</th>
                                    <th className="p-8 font-bold text-xs uppercase tracking-widest font-heading">Konvensional</th>
                                    <th className="p-8 font-bold text-xs uppercase tracking-widest text-accent font-heading italic">BBC Solution</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-primary/5 font-medium">
                                <tr>
                                    <td className="p-8 text-primary bg-bg-paper font-bold">Resepsionis</td>
                                    <td className="p-8 text-charcoal/60">Gaji Bulanan Tetap</td>
                                    <td className="p-8 text-primary font-bold italic">Terintegrasi (Gratis)</td>
                                </tr>
                                <tr>
                                    <td className="p-8 text-primary bg-bg-paper font-bold">Listrik & AC</td>
                                    <td className="p-8 text-charcoal/60">Tagihan Terpisah</td>
                                    <td className="p-8 text-primary font-bold italic">Termasuk Sewa</td>
                                </tr>
                                <tr>
                                    <td className="p-8 text-primary bg-bg-paper font-bold">Maintenance</td>
                                    <td className="p-8 text-charcoal/60">Urus Sendiri</td>
                                    <td className="p-8 text-primary font-bold italic">Eksklusif Managed</td>
                                </tr>
                                <tr>
                                    <td className="p-8 text-primary bg-bg-paper font-bold">Internet</td>
                                    <td className="p-8 text-charcoal/60">Pasang Baru (Lama)</td>
                                    <td className="p-8 text-primary font-bold italic">Fiber Optic Ready</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 7. FAQ (Max 6) */}
            {/* Rule: Decision blockers only, no filler */}
            <section className="py-24 lg:py-40 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-6 font-heading">Pertanyaan Terkait Sewa Kantor</h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {[
                            { q: 'Apakah harga sudah termasuk biaya listrik dan AC?', a: 'Ya. Harga sewa servis office kami sudah bersifat all-inclusive, mencakup pemakaian listrik dan AC selama jam operasional normal tanpa tambahan biaya tersembunyi.' },
                            { q: 'Berapa lama waktu minimal masa sewa?', a: 'Masa sewa fleksibel mulai dari 3 bulan. Namun, untuk perusahaan yang membutuhkan domisili untuk pengurusan PKP, disarankan mengambil kontrak minimal 12 bulan sesuai regulasi pajak.' },
                            { q: 'Apakah alamat kantor BBC bisa digunakan untuk PKP?', a: 'Sangat bisa. Alamat kami berlokasi di zona komersial resmi Jakarta Selatan (Pesanggrahan), sehingga memenuhi syarat untuk pengurusan NPWP dan PKP (Pengusaha Kena Pajak).' },
                            { q: 'Fasilitas apa saja yang tersedia di dalam ruangan kantor?', a: 'Setiap unit dilengkapi dengan meja kerja, kursi ergonomis, lemari penyimpanan, koneksi internet LAN/Wifi, dan AC. Anda juga mendapatkan akses ke pantry dan area bersama.' },
                            { q: 'Bagaimana dengan penanganan tamu dan surat?', a: 'Resepsionis kami akan menerima tamu Anda dan menangani seluruh surat menyurat serta paket yang datang atas nama perusahaan Anda secara profesional.' },
                            { q: 'Apakah ada biaya tambahan untuk penggunaan ruang meeting?', a: 'Setiap paket sewa mendapatkan kuota penggunaan ruang meeting bulanan secara gratis. Jika kuota habis, tersedia tarif khusus member yang sangat terjangkau.' }
                        ].map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border border-primary/10 px-8 rounded-2xl group data-[state=open]:border-accent transition-all">
                                <AccordionTrigger className="text-left font-bold text-primary hover:text-accent hover:no-underline py-6">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-charcoal/70 leading-relaxed pb-8 font-light">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* 8. FINAL CTA BLOCK */}
            {/* Rule: Strong visual container, Gold button */}
            <section className="py-24 lg:py-32 bg-primary relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md p-16 lg:p-24 border border-white/10 rounded-[3rem]">
                        <h2 className="text-4xl lg:text-7xl font-bold text-white mb-10 font-heading leading-tight">
                            Siap Memulai Operasional Bisnis Anda?
                        </h2>
                        <p className="text-xl text-white/70 mb-16 font-light max-w-2xl mx-auto leading-relaxed">
                            Jangan biarkan urusan operasional menghambat pertumbuhan bisnis Anda. Konsultasikan kebutuhan ruangan Anda hari ini.
                        </p>
                        <Button
                            className="bg-accent text-white hover:bg-white hover:text-primary px-16 py-8 text-base font-bold uppercase tracking-widest rounded-none h-auto transition-all duration-500 shadow-3xl shadow-accent/20"
                            asChild
                        >
                            <a href={waUrl}>
                                <MessageCircle className="w-6 h-6 mr-3" /> Chat via WhatsApp Sekarang
                            </a>
                        </Button>
                        <p className="mt-12 text-white/40 text-[9px] font-bold uppercase tracking-[0.3em]">
                            Konsultasi Gratis · Aktivasi Cepat · Lokasi Jakarta Selatan
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
