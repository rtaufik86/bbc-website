'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Check,
    MapPin,
    Building2,
    Shield,
    CheckCircle2,
    FileText,
    AlertTriangle,
    Scale,
    Landmark,
    Users,
    ArrowRight,
    Clock,
    Target,
    Zap,
    HelpCircle,
    Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import StickyWhatsAppCTA from '@/components/StickyWhatsAppCTA'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

// Tracking Utility
const trackEvent = (eventName: string, label: string) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
            content_name: eventName,
            content_category: 'legal_services',
            content_label: label
        });
    }
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'click_whatsapp_money_page', {
            'page_type': 'legal',
            'event_category': 'conversion',
            'event_label': label
        });
        (window as any).gtag('event', eventName, {
            'event_category': 'engagement',
            'event_label': label
        });
    }
}

export default function PendirianPTClient() {
    const waMessage = "Hallo, saya ingin konsultasi pendirian PT Jakarta Selatan di BBC."
    const waUrl = `https://wa.me/6281311778036?text=${encodeURIComponent(waMessage)}`

    return (
        <main className="bg-white font-sans text-charcoal">
            <StickyWhatsAppCTA message={waMessage} pageType="legal" />
            {/* 1) HERO SECTION */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-bg-paper overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="w-full lg:w-1/2">
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <span className="inline-block text-accent font-bold text-[10px] md:text-xs uppercase tracking-[0.3em]">Legalitas Terpercaya Sejak 2007</span>
                                <div className="h-px w-12 bg-accent/30 hidden md:block"></div>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-[1.1] mb-8 font-heading">
                                Pendirian PT Jakarta Selatan — <span className="text-accent underline decoration-accent/30 underline-offset-8">Sistematis, Tanpa Bolak-Balik</span>
                            </h1>
                            <p className="text-lg text-charcoal/70 mb-10 leading-relaxed max-w-2xl font-light">
                                Dari setup PT hingga PKP aktif. Proses resmi, terstruktur, estimasi 14–21 hari kerja. Kami bantu Anda menata legalitas bisnis secara benar sejak awal, didukung alamat dan infrastruktur gedung kantor BBC di Pesanggrahan, Jakarta Selatan.
                            </p>

                            {/* Trust Strip */}
                            <div className="flex flex-wrap gap-4 mb-10 text-[10px] font-bold uppercase tracking-widest text-primary/60">
                                <span className="flex items-center gap-2 bg-primary/5 px-3 py-2 rounded-full border border-primary/5">
                                    <Check className="w-3 h-3 text-accent" /> Sejak 2007
                                </span>
                                <span className="flex items-center gap-2 bg-primary/5 px-3 py-2 rounded-full border border-primary/5">
                                    <Check className="w-3 h-3 text-accent" /> 1,871+ Perusahaan
                                </span>
                                <span className="flex items-center gap-2 bg-primary/5 px-3 py-2 rounded-full border border-primary/5">
                                    <Check className="w-3 h-3 text-accent" /> Jakarta Selatan PKP-Ready
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    className="bg-primary text-white px-8 py-7 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all duration-300 rounded-none h-auto w-full sm:w-auto shadow-lg shadow-primary/20"
                                    onClick={() => trackEvent('cta_click', 'hero_wa_consult')}
                                    asChild
                                >
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer">
                                        Konsultasi Gratis via WhatsApp
                                    </a>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-primary/20 text-primary px-8 py-7 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-300 rounded-none h-auto w-full sm:w-auto"
                                    onClick={() => trackEvent('cta_click', 'hero_wa_kbli')}
                                    asChild
                                >
                                    <a href={`https://wa.me/6281311778036?text=${encodeURIComponent("Hallo, saya ingin cek KBLI bisnis saya untuk pendirian PT di BBC.")}`} target="_blank" rel="noopener noreferrer">
                                        Cek KBLI Bisnis Anda
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[550px] group">
                            <div className="absolute inset-0 border-2 border-accent/20 -m-4 translate-x-3 translate-y-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500"></div>
                            <Image
                                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200"
                                alt="Pendirian PT Jakarta Selatan Bintaro Business Centre"
                                fill
                                className="object-cover shadow-2xl transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2) PAIN POINT SECTION */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-6">The Problem</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-12 font-heading leading-tight">Kenapa Pendirian PT Sering Ribet?</h2>
                        <p className="text-lg text-charcoal/70 mb-12 leading-relaxed font-light">
                            Banyak pengusaha mengira pendirian PT hanya soal "urus dokumen ke notaris." Kenyataannya, kesalahan kecil di awal bisa berakibat fatal bagi operasional bisnis Anda. BBC menyediakan opsi domisili usaha melalui layanan <Link href="/sewa-kantor" className="text-accent font-semibold hover:underline">sewa kantor</Link> maupun <Link href="/virtual-office" className="text-accent font-semibold hover:underline">virtual office</Link> di Jakarta Selatan untuk memastikan kepatuhan sejak hari pertama.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "Salah Pilih KBLI",
                                    desc: "PKP ditolak, harus revisi akta dari awal. Waktu dan biaya terbuang percuma.",
                                    icon: <AlertTriangle className="w-6 h-6 text-red-500" />
                                },
                                {
                                    title: "Domisili Tidak Sesuai",
                                    desc: "Kemenkumham reject, proses tertunda berbulan-bulan karena masalah zonasi.",
                                    icon: <MapPin className="w-6 h-6 text-red-500" />
                                },
                                {
                                    title: "Tidak Tahu Alur PKP",
                                    desc: "PT sudah jadi, tapi tidak bisa operasional karena status PKP belum siap.",
                                    icon: <Target className="w-6 h-6 text-red-500" />
                                },
                                {
                                    title: "Bolak-Balik Instansi",
                                    desc: "Koordinasi sendiri antara Notaris, Pajak, dan Bank bikin pusing kepala.",
                                    icon: <Zap className="w-6 h-6 text-red-500" />
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-bg-paper p-8 border border-primary/5 hover:border-red-100 transition-all group">
                                    <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                                    <h4 className="text-xl font-bold text-primary mb-3 font-heading flex items-center gap-2">
                                        <span className="text-red-500">❌</span> {item.title}
                                    </h4>
                                    <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 p-8 bg-primary text-white text-center">
                            <p className="text-xl font-light italic leading-relaxed">
                                "Ini bukan hanya soal dokumen. Ini soal sistematis end-to-end — dari setup hingga siap operasional. BBC punya sistem untuk memastikan PT Anda berjalan benar sejak hari pertama."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3) POSITIONING DIFFERENTIATION */}
            <section className="py-24 lg:py-32 bg-bg-paper border-y border-primary/5">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div>
                            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-6">Differentiation</span>
                            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-8 font-heading leading-tight">Ekosistem Kantor & Legal Internal BBC</h2>
                            <p className="text-lg text-charcoal/70 mb-10 font-light leading-relaxed">
                                Kami bukan sekadar biro jasa. Kami adalah pengelola infrastruktur kantor yang didukung tim legal internal untuk memastikan PT Anda siap operasional sejak awal.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: "Konsultasi KBLI dari awal", desc: "Pastikan KBLI Anda sesuai bisnis model & eligible PKP." },
                                    { title: "Domisili Jakarta Selatan strategis", desc: "Administratif DKI Jakarta — keuntungan compliance untuk PKP." },
                                    { title: "Infrastruktur Gedung Sendiri", desc: "Gedung fisik di Pesanggrahan, Jakarta Selatan dengan akses strategis Tol Veteran." },
                                    { title: "Timeline jelas & realistis", desc: "Estimasi 14–21 hari kerja. Tidak ada hidden surprise." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                                            <Check className="w-3 h-3 text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                                            <p className="text-sm text-charcoal/60">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 flex items-center gap-8">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-primary">Fokus Anda</p>
                                    <p className="text-accent text-sm font-bold uppercase tracking-widest mt-1">Bisnis</p>
                                </div>
                                <ArrowRight className="w-8 h-8 text-charcoal/20" />
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-primary">Fokus Kami</p>
                                    <p className="text-accent text-sm font-bold uppercase tracking-widest mt-1">Legal Compliance</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[600px] hidden lg:block">
                            <Image
                                src="https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=1200"
                                alt="Legal Compliance BBC"
                                fill
                                className="object-cover shadow-3xl"
                            />
                            <div className="absolute -bottom-8 -left-8 bg-white p-8 shadow-xl border border-primary/5 max-w-sm">
                                <p className="text-charcoal/70 text-sm italic font-light">"Kemitraan jangka panjang dimulai dengan fondasi legal yang kokoh dan compliance yang tepat."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4) TARGET PERSONA */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Who is it for?</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-primary font-heading">Layanan Ini Cocok Untuk:</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            { title: "Pengusaha yang baru memulai usaha", desc: "Butuh guidance legalitas dari nol untuk membangun bisnis impian.", icon: <Users className="w-8 h-8" /> },
                            { title: "Pemilik CV yang ingin upgrade ke PT", desc: "Struktur legal lebih kuat, siap tender, dan siap mengajukan PKP.", icon: <Building2 className="w-8 h-8" /> },
                            { title: "Perusahaan yang membuka entitas baru", desc: "Ekspansi bisnis, divisi baru, atau pembukaan cabang secara cepat.", icon: <Landmark className="w-8 h-8" /> },
                            { title: "Pebisnis luar Jakarta", desc: "Membutuhkan alamat resmi DKI Jakarta untuk compliance & kredibilitas.", icon: <MapPin className="w-8 h-8" /> },
                            { title: "Distributor & Trading PKP-Ready", desc: "Butuh domisili Jakarta Selatan yang sudah memenuhi kriteria PKP operasional.", icon: <Shield className="w-8 h-8" /> },
                            { title: "Owner yang ingin menata ulang legalitas", desc: "Sistematisasi entitas bisnis agar lebih profesional dan terstruktur.", icon: <Scale className="w-8 h-8" /> }
                        ].map((item, i) => (
                            <div key={i} className="p-8 border border-primary/5 hover:border-accent/30 transition-all bg-bg-paper/50 hover:bg-white flex flex-col items-center text-center group">
                                <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                                <h4 className="text-lg font-bold text-primary mb-4 font-heading">{item.title}</h4>
                                <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-primary font-bold text-lg">Apapun situasi bisnis Anda — BBC kasih struktur yang jelas.</p>
                    </div>
                </div>
            </section>

            {/* 5) PKP MATRIX (STRATEGIC MOAT) */}
            <section className="py-24 lg:py-32 bg-primary text-white overflow-hidden" id="matrix-pkp">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Strategic Moat</span>
                        <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-8 text-white">Matrix PKP: Virtual Office atau Service Office?</h2>
                        <p className="text-white/70 text-lg font-light leading-relaxed">
                            Banyak pengusaha tidak tahu: PKP eligibility tergantung KBLI Anda — bukan sekadar "daftar virtual office." Salah pilih berarti PKP ditolak dan harus proses ulang dari awal.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto overflow-x-auto">
                        <table className="w-full text-left border-collapse bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
                            <thead>
                                <tr className="bg-white/10 border-b border-white/20">
                                    <th className="p-6 md:p-8 font-bold text-xs uppercase tracking-[0.2em] border-r border-white/10">Jenis KBLI</th>
                                    <th className="p-6 md:p-8 font-bold text-xs uppercase tracking-[0.2em] border-r border-white/10 text-center">Virtual Office?</th>
                                    <th className="p-6 md:p-8 font-bold text-xs uppercase tracking-[0.2em] border-r border-white/10 text-center">Service Office?</th>
                                    <th className="p-6 md:p-8 font-bold text-xs uppercase tracking-[0.2em]">Catatan PKP</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium">
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-6 md:p-8 border-r border-white/5">
                                        <p className="font-bold text-white">KBLI Jasa</p>
                                        <p className="text-[10px] text-white/50 uppercase tracking-wider mt-1">(Konsultan, IT, Marketing, Jasa Profesional)</p>
                                    </td>
                                    <td className="p-6 md:p-8 text-center border-r border-white/5"><span className="text-accent font-bold text-lg">✅ Eligible</span></td>
                                    <td className="p-6 md:p-8 text-center border-r border-white/5"><span className="text-accent font-bold text-lg">✅ Eligible</span></td>
                                    <td className="p-6 md:p-8 text-white/70 italic text-xs">
                                        <Link href="/virtual-office" className="text-accent hover:underline font-bold">Virtual Office BBC</Link> cukup untuk pengajuan PKP. Hemat biaya.
                                    </td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="p-6 md:p-8 border-r border-white/5">
                                        <p className="font-bold text-white">KBLI Selain Jasa</p>
                                        <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1 text-red-300">(Trading, Distributor, Transportasi, Event Organizer, dll)</p>
                                    </td>
                                    <td className="p-6 md:p-8 text-center border-r border-white/5"><span className="text-red-400 font-bold text-lg">❌ Tidak Cukup</span></td>
                                    <td className="p-6 md:p-8 text-center border-r border-white/5"><span className="text-accent font-bold text-lg">✅ Wajib</span></td>
                                    <td className="p-6 md:p-8 text-white/70 italic text-xs">
                                        PKP butuh domisili <Link href="/sewa-kantor" className="text-accent hover:underline font-bold">Service Office BBC</Link> (kontrak 1 tahun) sesuai regulasi survei pajak untuk klasifikasi Selain Jasa.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-16 bg-white/10 p-8 border border-white/10 max-w-2xl mx-auto rounded-none text-center backdrop-blur-sm">
                        <p className="text-lg font-bold mb-8">Tidak yakin KBLI bisnis Anda?</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                className="bg-accent text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all duration-300 rounded-none shadow-lg"
                                onClick={() => trackEvent('cta_consult', 'matrix_wa')}
                                asChild
                            >
                                <a href="https://wa.me/6281311778036?text=Halo, saya ingin konsultasi KBLI usaha saya untuk keperluan PKP">
                                    Konsultasi Gratis via WhatsApp
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                className="border-white/20 text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all duration-300 rounded-none h-auto"
                                onClick={() => trackEvent('cta_check', 'matrix_kbli')}
                                asChild
                            >
                                <a href="https://wa.me/6281311778036?text=Halo, saya ingin cek KBLI bisnis saya">
                                    Cek KBLI Bisnis Anda
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6) PROCESS TIMELINE */}
            <section className="py-24 lg:py-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Outcome-Based</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-primary font-heading">Proses Sistematis BBC — Dari Setup hingga Operasional</h2>
                        <p className="text-charcoal/60 text-lg mt-6 font-light">
                            Setiap tahap memiliki output konkret. Kami handle semua koordinasi — Anda fokus bisnis Anda.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto space-y-4">
                        {[
                            { step: "Step 1", title: "Konsultasi KBLI", time: "15 menit, hari pertama", output: "Rekomendasi KBLI + setup strategy", desc: "Pastikan KBLI Anda eligible PKP & sesuai model bisnis Anda." },
                            { step: "Step 2", title: "Reservasi Nama PT", time: "1 hari kerja", output: "Approval nama dari Kemenkumham", desc: "Nama Anda protected, tidak bentrok dengan perusahaan lain." },
                            { step: "Step 3", title: "Akta Notaris", time: "2-3 hari kerja", output: "Akta Pendirian resmi", desc: "Dokumen legal sah, siap submit ke Kemenkumham." },
                            { step: "Step 4", title: "SK Kemenkumham", time: "3-5 hari kerja", output: "SK Pengesahan dari Kemenkumham", desc: "PT Anda resmi terdaftar secara hukum di mata negara." },
                            { step: "Step 5", title: "NPWP & NIB", time: "2-3 hari kerja", output: "NPWP + NIB aktif", desc: "Identitas pajak & izin usaha aktif — perusahaan bisa segera operasional." },
                            { step: "Step 6", title: "PKP (Opsional)", time: "Tergantung KBLI", output: "PKP aktif (jika eligible)", desc: "Untuk KBLI Selain Jasa (Trading/Distribusi/Transportasi), butuh domisili Service Office 1 tahun." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 border border-primary/5 hover:border-accent/30 transition-all flex flex-col md:flex-row gap-6 md:items-center">
                                <div className="md:w-32 shrink-0">
                                    <p className="text-accent font-bold text-[10px] uppercase tracking-widest block mb-1">{item.step}</p>
                                    <p className="text-charcoal/40 text-[10px] font-bold uppercase tracking-tighter">{item.time}</p>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-primary mb-2 font-heading">{item.title}</h4>
                                    <p className="text-sm text-charcoal/60 leading-relaxed max-w-md">{item.desc}</p>
                                </div>
                                <div className="md:w-64 bg-primary/5 p-4 border border-primary/5 rounded-none">
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 opacity-50">Output:</p>
                                    <p className="text-xs font-bold text-primary">{item.output}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-2xl font-bold text-primary mb-2">Total estimasi: 14–21 hari kerja</p>
                        <p className="text-charcoal/40 text-[10px] font-bold uppercase tracking-widest italic">(Tergantung kompleksitas approval & kelengkapan dokumen)</p>
                    </div>
                </div>
            </section>

            {/* 7) PRICING SECTION */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Value Anchoring</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-primary font-heading">Paket Pendirian PT BBC — Transparan, Tidak Ada Biaya Tersembunyi</h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                        {/* Paket Dasar */}
                        <div className="bg-white border border-primary/5 p-8 lg:p-10 hover:border-accent transition-all flex flex-col group">
                            <div className="mb-8">
                                <p className="text-accent font-bold text-[10px] uppercase tracking-[0.3em] mb-4">📦 Paket Dasar</p>
                                <h3 className="text-2xl font-bold text-primary mb-2 font-heading">Setup PT Fundamental</h3>
                                <p className="text-primary font-bold text-3xl mb-1">Rp 7.500.000</p>
                                <p className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold font-heading">Satu Kali Bayar</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {[
                                    { text: 'Konsultasi KBLI', inc: true },
                                    { text: 'Reservasi Nama PT', inc: true },
                                    { text: 'Akta Notaris', inc: true },
                                    { text: 'SK Kemenkumham', inc: true },
                                    { text: 'NPWP & NIB', inc: true },
                                    { text: 'Domisili Jakarta Selatan', inc: false },
                                    { text: 'PKP Pendaftaran', inc: false },
                                ].map((item, i) => (
                                    <li key={i} className={`flex items-start gap-3 text-sm ${item.inc ? 'text-charcoal/80' : 'text-charcoal/20 line-through'}`}>
                                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${item.inc ? 'text-accent' : 'text-charcoal/20'}`} />
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-8 border-t border-primary/5">
                                <p className="text-xs text-charcoal/60 italic mb-8 h-10">Cocok untuk: KBLI Jasa yang belum butuh PKP segera.</p>
                                <Button
                                    className="w-full bg-outline border border-primary text-primary hover:bg-primary hover:text-white rounded-none h-14 text-xs font-bold uppercase tracking-widest"
                                    onClick={() => trackEvent('cta_click', 'package_dasar_wa')}
                                    asChild
                                >
                                    <a href={`https://wa.me/6281311778036?text=${encodeURIComponent("Hallo, saya tertarik dengan Paket Dasar Pendirian PT di BBC.")}`} target="_blank" rel="noopener noreferrer">Pilih Paket Dasar</a>
                                </Button>
                            </div>
                        </div>

                        {/* Paket Complete */}
                        <div className="bg-primary text-white p-8 lg:p-12 transform lg:scale-105 shadow-2xl relative flex flex-col z-20">
                            <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest">⭐ Paling Populer</div>
                            <div className="mb-10">
                                <p className="text-accent font-bold text-[10px] uppercase tracking-[0.3em] mb-4">📦 Paket Complete</p>
                                <h3 className="text-3xl font-bold text-white mb-2 font-heading">PT + PKP Ready</h3>
                                <p className="text-accent font-bold text-4xl mb-1">Rp 12.500.000</p>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Lengkap dengan Domisili</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                <li className="text-xs font-bold text-accent uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Semua di Paket Dasar, PLUS:</li>
                                {[
                                    { text: 'Domisili Jakarta Selatan (1 Tahun)', inc: true },
                                    { text: 'PKP Registration Support', inc: true },
                                    { text: 'Virtual Office 6 Bulan Pertama', inc: true },
                                    { text: 'Meeting Room 2 Jam/Bulan', inc: true },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-8 border-t border-white/10">
                                <p className="text-xs text-white/70 italic mb-8 h-10 font-light">Cocok untuk: Bisnis yang siap operasional & perlu status PKP untuk B2B.</p>
                                <Button
                                    className="w-full bg-accent text-white hover:bg-white hover:text-primary rounded-none h-16 text-xs font-bold uppercase tracking-widest shadow-xl shadow-accent/20"
                                    onClick={() => trackEvent('cta_click', 'package_complete_wa')}
                                    asChild
                                >
                                    <a href={`https://wa.me/6281311778036?text=${encodeURIComponent("Hallo, saya tertarik dengan Paket Complete Pendirian PT di BBC.")}`} target="_blank" rel="noopener noreferrer">Pilih Paket Complete</a>
                                </Button>
                            </div>
                        </div>

                        {/* Paket Premium */}
                        <div className="bg-white border border-primary/5 p-8 lg:p-10 hover:border-accent transition-all flex flex-col group">
                            <div className="mb-8">
                                <p className="text-accent font-bold text-[10px] uppercase tracking-[0.3em] mb-4">📦 Paket Premium</p>
                                <h3 className="text-2xl font-bold text-primary mb-2 font-heading">Full Business Infrastructure</h3>
                                <p className="text-primary font-bold text-3xl mb-1">Rp 18.500.000</p>
                                <p className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold">PKP Selain Jasa Wajib</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                <li className="text-xs font-bold text-accent uppercase tracking-widest mb-2 border-b border-primary/5 pb-2">Semua di Paket Complete, PLUS:</li>
                                {[
                                    { text: 'Service Office Ready (PKP Selain Jasa 1th)', inc: true },
                                    { text: 'Virtual Office 12 Bulan Penuh', inc: true },
                                    { text: 'Rekening Bank Assistance', inc: true },
                                    { text: 'Priority Legal Support', inc: true },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-charcoal/80">
                                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-8 border-t border-primary/5">
                                <p className="text-xs text-charcoal/60 italic mb-8 h-10">Cocok untuk: Trading, distributor, transportasi, event organizer yang butuh infrastruktur lengkap.</p>
                                <Button
                                    className="w-full bg-outline border border-primary text-primary hover:bg-primary hover:text-white rounded-none h-14 text-xs font-bold uppercase tracking-widest"
                                    onClick={() => trackEvent('cta_click', 'package_premium_wa')}
                                    asChild
                                >
                                    <a href={`https://wa.me/6281311778036?text=${encodeURIComponent("Hallo, saya tertarik dengan Paket Premium Pendirian PT di BBC.")}`} target="_blank" rel="noopener noreferrer">Pilih Paket Premium</a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-24 max-w-4xl mx-auto bg-primary/5 p-10 lg:p-16 text-center border border-primary/10">
                        <h4 className="text-2xl font-bold text-primary mb-8 font-heading">💡 Kenapa BBC, Bukan Notaris Standalone atau Biro Jasa?</h4>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-left">
                            {[
                                { title: "Konsultasi KBLI Strategy", desc: "Bukan hanya sekadar input aplikasi, tapi memastikan kode yang dipilih sesuai model bisnis & target klien." },
                                { title: "Infrastruktur Kantor Terverifikasi", desc: "Alamat Jakarta Selatan di gedung BBC yang strategis untuk compliance PKP dan kredibilitas bisnis." },
                                { title: "Koordinasi End-to-End", desc: "Kami handle jembatan antara notaris, pajak, perbankan, dan kementerian. Anda tidak perlu bolak-balik." },
                                { title: "Support Pasca-Pendirian", desc: "Kami bukan hanya setup lalu selesai. Kami adalah partner operasional untuk sewa kantor & meeting room." }
                            ].map((item, i) => (
                                <div key={i}>
                                    <h5 className="font-bold text-primary mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-accent" /> {item.title}
                                    </h5>
                                    <p className="text-sm text-charcoal/60 leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 pt-12 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-center gap-6">
                            <p className="text-primary font-bold italic">"Bukan yang termurah — tapi yang paling jelas dan terstruktur."</p>
                            <div className="h-4 w-px bg-primary/20 hidden sm:block"></div>
                            <Button variant="link" className="text-accent font-bold uppercase tracking-widest text-[10px]" asChild>
                                <Link href="/sewa-kantor">Lihat Paket Sewa Kantor <ArrowRight className="w-3 h-3 ml-2" /></Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8) FAQ SECTION */}
            <section className="py-24 lg:py-32 bg-bg-paper">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Questions & Objections</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-primary font-heading">Pertanyaan Umum</h2>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {[
                            {
                                q: "Kenapa tidak langsung ke notaris saja?",
                                a: "Notaris fokus pada legal execution (akta, SK). BBC kasih guidance end-to-end: Konsultasi KBLI strategy, PKP readiness planning, Domisili Jakarta Selatan, dan koordinasi dengan pajak & kemenkumham. Anda tidak perlu bolak-balik cari info sendiri."
                            },
                            {
                                q: "Virtual Office saya bisa untuk PKP atau tidak?",
                                a: "Tergantung KBLI Anda: KBLI Jasa (konsultan, IT, marketing) eligible menggunakan Virtual Office. KBLI Selain Jasa (trading, distributor, transportasi, event organizer, dll) wajib menggunakan Service Office minimal 1 tahun sesuai persyaratan survei lokasi PKP."
                            },
                            {
                                q: "Apakah BBC legal? Bukan biro jasa informal?",
                                a: "BBC adalah Business Centre resmi sejak 2007, telah melayani 1,871+ perusahaan. Partner kami adalah notaris bersertifikat & berpengalaman di Jakarta Selatan. Kami adalah partner legalitas terstruktur, bukan sekadar calo biro jasa."
                            },
                            {
                                q: "Berapa lama proses pendirian PT?",
                                a: "Estimasi 14–21 hari kerja, tergantung pada kompleksitas approval nama, kelengkapan dokumen pendiri, dan proses di instansi (Kemenkumham, Pajak). BBC kasih timeline realistis—tidak over-promise."
                            },
                            {
                                q: "Apakah bisa proses remote (tidak perlu datang)?",
                                a: "Sebagian besar proses bisa dilakukan secara remote. Anda hanya perlu 1x tanda tangan dokumen notaris (bisa diatur) dan video call verifikasi dari perbankan jika diperlukan. Koordinasi selebihnya kami tangani."
                            },
                            {
                                q: "Kalau PT saya sudah jadi, masih butuh BBC?",
                                a: "Tentu. BBC bukan hanya untuk setup—tapi partner jangka panjang. Kami menyediakan Virtual Office untuk alamat bisnis ongoing, Meeting Room untuk pertemuan klien, dan Service Office jika bisnis Anda berkembang."
                            }
                        ].map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-none px-0 group">
                                <AccordionTrigger className="text-lg font-bold text-primary hover:text-accent py-8 text-left group-hover:no-underline font-heading bg-white px-8 border border-primary/5 transition-all">
                                    <div className="flex gap-4 items-center">
                                        <HelpCircle className="w-5 h-5 text-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                                        {faq.q}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-charcoal/70 text-base leading-relaxed p-10 font-light bg-white/50 border-x border-b border-primary/5">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* 9) FINAL CTA SECTION */}
            <section className="py-24 lg:py-32 relative text-white bg-primary text-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                    <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] block mb-6">Take Action Now</span>
                    <h2 className="text-4xl lg:text-7xl font-bold mb-10 font-heading leading-tight text-white">Siap Menata Legalitas Perusahaan Anda?</h2>
                    <p className="text-white/70 text-xl font-light mb-16 leading-relaxed">
                        Konsultasi gratis 15 menit — kami bantu tentukan setup yang tepat untuk bisnis Anda. Tidak ada "asal jadi", yang ada "jadi dengan benar".
                    </p>

                    <div className="flex flex-col items-center gap-6">
                        <Button
                            className="bg-accent text-white px-12 py-8 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all duration-300 rounded-none shadow-3xl shadow-accent/40 w-full sm:w-auto h-auto min-h-[80px]"
                            onClick={() => trackEvent('cta_click', 'final_wa_consult')}
                            asChild
                        >
                            <a href={waUrl} target="_blank" rel="noopener noreferrer">
                                Konsultasi Gratis via WhatsApp
                            </a>
                        </Button>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
                            <Button
                                variant="outline"
                                className="border-white/20 text-white px-10 py-6 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300 rounded-none h-auto"
                                onClick={() => trackEvent('cta_click', 'final_wa_sewa_kantor')}
                                asChild
                            >
                                <a href={`https://wa.me/6281311778036?text=${encodeURIComponent("Hallo, saya ingin informasi mengenai sewa kantor di BBC.")}`} target="_blank" rel="noopener noreferrer">
                                    Info Sewa Kantor
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                className="border-white/20 text-white px-10 py-6 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300 rounded-none h-auto"
                                onClick={() => trackEvent('cta_click', 'final_wa_check_kbli')}
                                asChild
                            >
                                <a href={`https://wa.me/6281311778036?text=${encodeURIComponent("Hallo, saya mau cek KBLI.")}`} target="_blank" rel="noopener noreferrer">
                                    Cek KBLI Bisnis Anda
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                className="border-white/20 text-white px-10 py-6 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300 rounded-none h-auto"
                                onClick={() => trackEvent('cta_click', 'final_wa_checklist')}
                                asChild
                            >
                                <a href={`https://wa.me/6281311778036?text=${encodeURIComponent("Hallo, saya mau minta checklist pendirian PT.")}`} target="_blank" rel="noopener noreferrer">
                                    Minta Checklist Pendirian PT
                                </a>
                            </Button>
                        </div>
                    </div>

                    <div className="mt-20 flex flex-wrap justify-center gap-10 text-white/30 text-[9px] font-bold uppercase tracking-[0.3em]">
                        <span className="flex items-center gap-2"><Check className="w-3 h-3" /> No Pressure</span>
                        <span className="flex items-center gap-2"><Check className="w-3 h-3" /> Professional Guide</span>
                        <span className="flex items-center gap-2"><Check className="w-3 h-3" /> Jakarta Selatan Base</span>
                    </div>
                </div>
            </section>

            {/* RELATED SERVICES / LINK TO HUB */}
            <section className="py-20 bg-white border-t border-primary/5">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        <Link href="/legal/pendirian-pt-jakarta-selatan" className="text-charcoal/40 hover:text-accent text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                            Hub Legalitas PT <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link href="/virtual-office" className="text-charcoal/40 hover:text-accent text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                            Virtual Office <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link href="/sewa-kantor" className="text-charcoal/40 hover:text-accent text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                            Service Office <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link href="/lokasi-kantor" className="text-charcoal/40 hover:text-accent text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                            Lokasi & Akses <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link href="/tentang-kami" className="text-charcoal/40 hover:text-accent text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                            Tentang BBC <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
