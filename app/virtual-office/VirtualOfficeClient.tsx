'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Check,
    MapPin,
    MessageCircle,
    Building2,
    Wifi,
    CheckCircle2,
    Users,
    Table as TableIcon,
    ArrowRight,
    Search,
    Clock,
    Shield,
    Phone,
    FileText,
    AlertTriangle
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
            content_category: 'virtual_office',
            content_label: label
        });
    }
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'click_whatsapp_money_page', {
            'page_type': 'virtual_office',
            'event_category': 'conversion',
            'event_label': label
        });
        (window as any).gtag('event', eventName, {
            'event_category': 'engagement',
            'event_label': label
        });
    }
}

export default function VirtualOfficeClient() {
    const waMessage = "Hallo, saya ingin informasi paket virtual office BBC."
    const waUrl = `https://wa.me/6281311778036?text=${encodeURIComponent(waMessage)}`

    return (
        <main className="bg-white font-sans text-charcoal">
            <StickyWhatsAppCTA message={waMessage} pageType="virtual_office" />
            {/* A) HERO SECTION */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-bg-paper overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="w-full lg:w-1/2">
                            <span className="inline-block text-accent font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6">Solusi Efisiensi Bisnis</span>
                            <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-[1.1] mb-8 font-heading">
                                Virtual Office Jakarta Selatan – <span className="text-accent underline decoration-accent/30 underline-offset-8">Alamat Bisnis Resmi untuk Perusahaan Non-PKP</span>
                            </h1>
                            <p className="text-lg text-charcoal/70 mb-10 leading-relaxed max-w-2xl font-light">
                                Alamat profesional di Jakarta Selatan untuk pendirian PT/CV Non-PKP, NIB, dan NPWP—tanpa biaya kantor fisik. Beroperasi sejak 2007.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <Button
                                    className="bg-primary text-white px-8 py-7 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all duration-300 rounded-none h-auto w-full sm:w-auto shadow-lg shadow-primary/20"
                                    onClick={() => trackEvent('cta_click', 'hero_vo_wa_consult')}
                                    asChild
                                >
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer">Konsultasi Virtual Office</a>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-primary text-primary px-8 py-7 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-300 rounded-none h-auto w-full sm:w-auto"
                                    onClick={() => trackEvent('whatsapp_click', 'hero_vo_whatsapp')}
                                    asChild
                                >
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="w-4 h-4 mr-2" /> Chat WhatsApp
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px]">
                            <Image
                                src="/images/meeting-room/boardroom/bbc-meeting-room-boardroom-wide-01.jpg.JPG"
                                alt="Virtual Office Jakarta Selatan Bintaro Business Centre"
                                fill
                                className="object-cover shadow-2xl transition-transform duration-1000"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* B) WHY VIRTUAL OFFICE */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-6">The Solution</span>
                        <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-primary mb-8 font-heading">Mengapa Virtual Office adalah Solusi yang Tepat</h2>
                        <div className="space-y-6 text-charcoal/70 text-lg font-light leading-relaxed">
                            <p>
                                Sewa kantor fisik di Jakarta bisa mencapai puluhan juta per tahun. Untuk startup, freelancer, dan perusahaan remote—biaya ini tidak sebanding dengan kebutuhan.
                            </p>
                            <p className="font-bold text-primary italic">
                                Anda tidak butuh ruang kerja fisik setiap hari. Yang Anda butuh adalah alamat bisnis resmi Jakarta Selatan untuk keperluan administrasi dan legalitas perusahaan.
                            </p>
                            <p>
                                Virtual office memberikan solusi efisien: alamat profesional yang kredibel, tanpa overhead operasional kantor konvensional.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* C) PACKAGES */}
            <section className="py-24 lg:py-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Pilihan Paket</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-primary font-heading">Paket Virtual Office</h2>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* BA Paket */}
                        <div className="bg-white border border-primary/5 p-8 hover:border-accent transition-all duration-300 flex flex-col">
                            <h3 className="text-xl font-bold text-primary mb-2 font-heading">BA (Business Address)</h3>
                            <p className="text-accent font-bold text-lg mb-6">Rp 250.000<span className="text-sm text-charcoal/50 font-normal">/bulan</span></p>
                            <p className="text-xs text-charcoal/50 uppercase tracking-widest mb-8">Kontrak 12 bulan</p>

                            <ul className="space-y-4 mb-8 flex-1">
                                {[
                                    'Alamat bisnis Jakarta Selatan',
                                    'Penerimaan surat & paket (inbound)',
                                    'Notifikasi WhatsApp saat surat diterima',
                                    'Layanan resepsionis profesional',
                                    'Shared fax number',
                                    'Wi-Fi akses (area umum)',
                                    'Parkir gratis untuk kunjungan'
                                ].map((feat, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-charcoal/80">
                                        <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-6 border-t border-primary/5">
                                <p className="text-xs text-charcoal/60 italic mb-6">Cocok untuk: Freelancer, konsultan, e-commerce yang butuh alamat resmi untuk pendirian PT/CV Non-PKP, atau perusahaan KBLI Jasa yang memerlukan PKP.</p>
                                <Button
                                    className="w-full bg-primary text-white hover:bg-accent rounded-none shadow-lg"
                                    onClick={() => trackEvent('cta_click', 'package_ba_wa')}
                                    asChild
                                >
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer">Pilih Paket BA</a>
                                </Button>
                            </div>
                        </div>

                        {/* CP Paket */}
                        <div className="bg-primary text-white p-8 transform scale-105 shadow-2xl relative flex flex-col">
                            <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest">Recommended</div>
                            <h3 className="text-xl font-bold text-white mb-2 font-heading">CP (Communication Plan)</h3>
                            <p className="text-accent font-bold text-lg mb-6">Rp 375.000<span className="text-white/50 text-sm font-normal">/bulan</span></p>
                            <p className="text-xs text-white/50 uppercase tracking-widest mb-8">Kontrak 12 bulan</p>

                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="font-bold text-accent text-sm">Semua benefit BA Package, plus:</li>
                                {[
                                    'Meeting room 12 jam/bulan (ruang kecil)',
                                    'Instant call transfer ke nomor Anda'
                                ].map((feat, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                                        <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-xs text-white/60 italic mb-6">Cocok untuk: Startup & bisnis KBLI Jasa yang butuh meeting room reguler untuk klien atau verifikasi lokasi, termasuk untuk pengajuan PKP.</p>
                                <Button
                                    className="w-full bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-lg"
                                    onClick={() => trackEvent('cta_click', 'package_cp_wa')}
                                    asChild
                                >
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer">Pilih Paket CP</a>
                                </Button>
                            </div>
                        </div>

                        {/* FCP Paket */}
                        <div className="bg-white border border-primary/5 p-8 hover:border-accent transition-all duration-300 flex flex-col">
                            <h3 className="text-xl font-bold text-primary mb-2 font-heading">FCP (Full Communication)</h3>
                            <p className="text-accent font-bold text-lg mb-6">Rp 916.667<span className="text-sm text-charcoal/50 font-normal">/bulan</span></p>
                            <p className="text-xs text-charcoal/50 uppercase tracking-widest mb-8">Kontrak 12 bulan</p>

                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="font-bold text-primary text-sm">Semua benefit CP Package, plus:</li>
                                {[
                                    'Dedicated phone number (nomor telepon khusus perusahaan Anda)',
                                    'Meeting room 15 jam/bulan (ruang kecil)'
                                ].map((feat, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-charcoal/80">
                                        <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-6 border-t border-primary/5">
                                <p className="text-xs text-charcoal/60 italic mb-6">Cocok untuk: Perusahaan mapan KBLI Jasa yang butuh representasi profesional penuh dengan nomor telepon dedicated, termasuk untuk PKP.</p>
                                <Button
                                    className="w-full bg-outline border border-primary text-primary hover:bg-primary hover:text-white rounded-none"
                                    onClick={() => trackEvent('cta_click', 'package_fcp_wa')}
                                    asChild
                                >
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer">Pilih Paket FCP</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 text-center">
                        <Button
                            variant="outline"
                            className="border-primary text-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-300 rounded-none"
                            onClick={() => trackEvent('cta_click', 'compare_packages')}
                            asChild
                        >
                            <a href={waUrl} target="_blank" rel="noopener noreferrer">Bandingkan & Konsultasi</a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* D) WHAT YOU GET */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Layanan Utama</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-primary font-heading">Apa yang Anda Dapatkan</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            { title: 'Alamat Bisnis Jakarta Selatan', desc: 'Domisili administratif resmi di Jakarta Selatan—bukan Tangerang Selatan. Ini penting untuk administrasi yang memerlukan alamat dalam wilayah DKI Jakarta.', icon: <MapPin className="w-8 h-8" /> },
                            { title: 'Layanan Penerimaan Surat & Paket', desc: 'Tim kami menerima dan menyimpan kiriman bisnis Anda setiap hari kerja (Senin–Sabtu). Segera setelah surat diterima, Anda mendapat notifikasi via WhatsApp.', icon: <TableIcon className="w-8 h-8" /> },
                            { title: 'Resepsionis Profesional', desc: 'Representasi bisnis yang kredibel. Resepsionis kami menjawab telepon dengan nama perusahaan Anda (paket CP & FCP).', icon: <Users className="w-8 h-8" /> },
                            { title: 'Meeting Room (Paket CP & FCP)', desc: <>Ruang meeting modern untuk pertemuan klien atau keperluan verifikasi lokasi usaha.</>, icon: <Clock className="w-8 h-8" /> },
                            { title: 'Call Handling (Paket CP & FCP)', desc: 'Instant call transfer (CP) atau dedicated phone number (FCP) untuk komunikasi bisnis profesional.', icon: <Phone className="w-8 h-8" /> },
                            { title: 'Akses & Fasilitas', desc: 'Wi-Fi area umum, parkir gratis untuk kunjungan, dan akses ke ekosistem bisnis BBC sejak 2007.', icon: <Wifi className="w-8 h-8" /> }
                        ].map((item, i) => (
                            <div key={i} className="bg-bg-paper p-8 border border-primary/5 hover:border-accent transition-all duration-300">
                                <div className="text-accent mb-6">{item.icon}</div>
                                <h4 className="text-lg font-bold text-primary mb-4">{item.title}</h4>
                                <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center max-w-2xl mx-auto">
                        <p className="text-[10px] text-charcoal/40 font-bold uppercase tracking-[0.2em] italic">
                            Catatan penting: BBC melayani penerimaan surat/paket (inbound only) dan tidak menyediakan layanan pengiriman atas nama klien.
                        </p>
                    </div>
                </div>
            </section>

            {/* E) LEGAL CLARITY & PKP */}
            <section className="py-24 lg:py-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
                        <div>
                            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-6">Compliance & Legal</span>
                            <h2 className="text-4xl lg:text-4xl font-bold text-primary mb-8 font-heading leading-tight">Kegunaan Virtual Office untuk Legalitas Perusahaan</h2>
                            <p className="text-charcoal/70 text-lg mb-8 font-light">
                                Virtual Office BBC dapat digunakan untuk keperluan administrasi sesuai regulasi yang berlaku:
                            </p>
                            <div className="space-y-4 mb-10">
                                {['Pendirian PT/CV Non-PKP', 'NIB (Nomor Induk Berusaha)', 'NPWP Perusahaan', 'Surat domisili administratif', 'Korespondensi profesional'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-primary font-bold">
                                        <CheckCircle2 className="w-5 h-5 text-accent" /> {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-8 border-l-4 border-yellow-500 shadow-md">
                            <div className="flex items-start gap-4 mb-4">
                                <AlertTriangle className="w-8 h-8 text-yellow-500 shrink-0" />
                                <h3 className="text-xl font-bold text-primary">Catatan Penting: Penggunaan Alamat untuk PKP</h3>
                            </div>
                            <p className="text-charcoal/70 mb-4 font-light leading-relaxed">
                                Virtual Office BBC dapat digunakan untuk registrasi PKP dengan ketentuan sebagai berikut:
                            </p>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <h4 className="font-bold text-accent text-sm mb-1">✅ Perusahaan dengan KBLI Jasa</h4>
                                    <p className="text-sm text-charcoal/70">(Konsultan, IT, marketing, dll)</p>
                                    <p className="text-sm text-charcoal/70">Dapat menggunakan Virtual Office untuk pengajuan PKP tanpa batasan kontrak minimum.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-accent text-sm mb-1">⚠️ Perusahaan dengan KBLI Selain Jasa</h4>
                                    <p className="text-sm text-charcoal/70">(Trading, distributor, importir, transportasi, event organizer, dll)</p>
                                    <p className="text-sm text-charcoal/70">Memerlukan kontrak sewa ruangan kantor minimal 1 tahun (Service Office) untuk pengajuan PKP.</p>
                                </div>
                            </div>
                            <p className="text-xs text-charcoal/60 leading-relaxed italic bg-charcoal/5 p-4 rounded">
                                <strong>Mengapa ada perbedaan ini?</strong> Regulasi perpajakan memberikan fleksibilitas untuk perusahaan jasa. Perusahaan Selain Jasa memerlukan verifikasi ruang kantor fisik untuk memastikan kapasitas operasional (inventory/stock).
                            </p>
                            <p className="text-charcoal/70 text-sm mt-4 font-light">
                                <strong>Solusi:</strong> Konsultasikan KBLI perusahaan Anda dengan tim kami untuk menentukan paket yang tepat—Virtual Office atau Service Office—sesuai kebutuhan PKP Anda.
                            </p>
                            <p className="text-xs text-charcoal/60 italic mt-4">
                                Meeting room tersedia untuk mendukung verifikasi lokasi jika diperlukan oleh kantor pajak.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* F) UPGRADE PATH */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Growth Path</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-primary font-heading">Jalur yang Tepat untuk Bisnis Anda</h2>
                        <p className="text-lg text-charcoal/70 mt-6 max-w-3xl mx-auto font-light">
                            BBC mendukung berbagai kebutuhan bisnis dengan fleksibilitas paket sesuai KBLI dan kebutuhan PKP:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Jalur A */}
                        <div className="bg-white border-primary/10 border p-8 hover:border-accent transition-all">
                            <div className="bg-accent/10 w-12 h-12 flex items-center justify-center rounded-full mb-6">
                                <span className="font-bold text-accent text-xl">A</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-2">Perusahaan KBLI Jasa</h3>
                            <p className="text-sm text-charcoal/50 mb-6 uppercase tracking-widest">Konsultan, IT, Marketing, Kreatif</p>

                            <ul className="space-y-6 relative border-l-2 border-primary/10 ml-3 pl-8">
                                <li className="relative">
                                    <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-white"></div>
                                    <h4 className="font-bold text-primary text-sm">Tahap 1: Virtual Office</h4>
                                    <p className="text-sm text-charcoal/70 mt-1">Pendirian PT/CV dengan alamat Jakarta Selatan. Hemat biaya, fokus ke produk dan layanan.</p>
                                </li>
                                <li className="relative">
                                    <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full bg-accent border-4 border-white"></div>
                                    <h4 className="font-bold text-primary text-sm">Tahap 2: PKP (Optional)</h4>
                                    <p className="text-sm text-charcoal/70 mt-1">Jika diperlukan, ajukan PKP menggunakan alamat Virtual Office. Tidak perlu upgrade ke Service Office.</p>
                                </li>
                                <li className="relative">
                                    <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full bg-charcoal/20 border-4 border-white"></div>
                                    <h4 className="font-bold text-primary text-sm">Tahap 3: Service Office</h4>
                                    <p className="text-sm text-charcoal/70 mt-1">Upgrade ke kantor fisik Jakarta Selatan saat tim bertambah dan butuh ruang kerja dedicated.</p>
                                </li>
                            </ul>
                        </div>

                        {/* Jalur B */}
                        <div className="bg-primary text-white p-8 relative overflow-hidden">
                            <div className="bg-white/10 w-12 h-12 flex items-center justify-center rounded-full mb-6 relative z-10">
                                <span className="font-bold text-white text-xl">B</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Perusahaan KBLI Selain Jasa</h3>
                            <p className="text-sm text-white/50 mb-6 uppercase tracking-widest relative z-10">Trading, Distributor, Transportasi, Event Organizer</p>

                            <ul className="space-y-6 relative border-l-2 border-white/10 ml-3 pl-8 z-10">
                                <li className="relative">
                                    <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full bg-white border-4 border-primary"></div>
                                    <h4 className="font-bold text-white text-sm">Tahap 1: Virtual Office</h4>
                                    <p className="text-sm text-white/70 mt-1">Pendirian PT/CV Non-PKP dengan alamat Jakarta Selatan untuk tahap awal.</p>
                                </li>
                                <li className="relative">
                                    <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full bg-accent border-4 border-primary"></div>
                                    <h4 className="font-bold text-white text-sm">Tahap 2: Service Office untuk PKP</h4>
                                    <p className="text-sm text-white/70 mt-1">Upgrade ke Service Office dengan kontrak minimal 1 tahun saat siap mengajukan PKP. Ruang fisik memenuhi persyaratan verifikasi kantor pajak.</p>
                                </li>
                                <li className="relative">
                                    <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full bg-white/20 border-4 border-primary"></div>
                                    <h4 className="font-bold text-white text-sm">Tahap 3: Skalabilitas</h4>
                                    <p className="text-sm text-white/70 mt-1">Expand ruangan sesuai pertumbuhan inventori dan tim operasional.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 text-center">
                        <p className="text-charcoal/60 italic mb-6">BBC mendukung perjalanan bisnis Anda di setiap tahap dengan fleksibilitas upgrade tanpa penalty.</p>
                        <Button
                            className="bg-primary text-white px-8 py-7 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all duration-300 rounded-none shadow-lg"
                            onClick={() => trackEvent('cta_click', 'upgrade_to_service_office_wa')}
                            asChild
                        >
                            <a href={`https://wa.me/6281311778036?text=${encodeURIComponent("Hallo, saya tertarik konsultasi upgrade dari Virtual Office ke Service Office BBC.")}`} target="_blank" rel="noopener noreferrer">Upgrade ke Service Office</a>
                        </Button>
                    </div>
                </div>
            </section>


            {/* G) PROCESS ACTIVATION */}
            <section className="py-24 lg:py-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] block mb-4">5 Langkah Mudah</span>
                        <h2 className="text-4xl lg:text-5xl font-bold font-heading text-primary">Proses Aktivasi Virtual Office</h2>
                    </div>
                    <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto overflow-hidden">
                        {[
                            { step: '01', title: 'Konsultasi Kebutuhan', desc: 'Diskusikan kebutuhan spesifik bisnis Anda—apakah untuk pendirian PT, izin usaha, atau domisili perusahaan existing.' },
                            { step: '02', title: 'Pilih Paket', desc: 'Tentukan paket yang sesuai: BA untuk alamat dasar, CP untuk meeting room, atau FCP untuk telepon dedicated.' },
                            { step: '03', title: 'Lengkapi Dokumen', desc: 'Siapkan dokumen perusahaan sesuai persyaratan administratif.' },
                            { step: '04', title: 'Aktivasi Alamat', desc: 'Proses aktivasi diselesaikan dalam 1-2 hari kerja setelah dokumen lengkap diterima. Alamat virtual office aktif dan siap digunakan.' },
                            { step: '05', title: 'Mulai Beroperasi', desc: 'Gunakan alamat resmi untuk korespondensi, administrasi, dan representasi bisnis profesional.' }
                        ].map((item, i) => (
                            <div key={i} className="relative group">
                                <div className="text-accent text-5xl font-bold mb-6 opacity-40 group-hover:opacity-100 transition-opacity duration-500 font-heading">{item.step}</div>
                                <h4 className="text-lg font-bold mb-4 text-primary">{item.title}</h4>
                                <p className="text-charcoal/70 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* H) LOCATION */}
            <section className="py-24 lg:py-32 bg-primary text-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-12 text-center mb-16">
                            <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] block mb-4">Aksesibilitas</span>
                            <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold mb-8 font-heading text-white">Lokasi Strategis di Jakarta Selatan – Alamat Bisnis Resmi DKI Jakarta</h2>
                            <p className="text-white/70 text-lg max-w-4xl mx-auto font-light leading-relaxed">
                                Bintaro Business Centre berlokasi di Jakarta Selatan—bukan Tangerang Selatan. Ini memberikan keunggulan administratif signifikan untuk perusahaan yang memerlukan domisili DKI Jakarta.
                                <br /><br />
                                Bintaro Business Centre berlokasi di Pesanggrahan, Jakarta Selatan, dengan akses langsung melalui Pintu Tol Veteran dan Jalan RC Veteran Raya. Kawasan ini berada di perbatasan strategis antara Bintaro Jaya dan Pondok Indah, memberikan keunggulan alamat administratif DKI Jakarta dengan konektivitas tinggi ke area bisnis utama. Klien dari Rempoa dan sekitarnya juga dapat mengakses lokasi kami dalam hitungan menit.
                            </p>
                        </div>

                        <div className="lg:col-span-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: 'Pintu Tol Veteran', desc: '5 menit' },
                                { title: 'Bintaro Jaya', desc: 'Akses langsung' },
                                { title: 'Pondok Indah', desc: '15 menit' },
                                { title: 'Rempoa', desc: 'Area sekitar' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/10 p-6 border border-white/20 text-center">
                                    <h4 className="text-accent font-bold text-lg mb-2">{item.title}</h4>
                                    <p className="text-white/70 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="lg:col-span-12 text-center mt-8">
                            <p className="text-white/40 text-xs font-medium italic">
                                Lokasi di perbatasan memberikan fleksibilitas geografis tanpa mengorbankan status administratif DKI.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* I) COMPARISON TABLE */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Analisis Biaya</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6 font-heading">Virtual Office vs Kantor Fisik</h2>
                        <p className="text-charcoal/60 font-light text-lg">
                            Virtual office memberikan legalitas administratif tanpa beban operasional—solusi ideal untuk bisnis yang memprioritaskan efisiensi dan belum memerlukan PKP.
                        </p>
                    </div>

                    {/* DESKTOP TABLE */}
                    <div className="hidden md:block max-w-5xl mx-auto overflow-hidden border border-primary/5 shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-primary text-white">
                                    <th className="p-8 font-bold text-xs uppercase tracking-[0.2em] border-r border-white/10">Aspek</th>
                                    <th className="p-8 font-bold text-xs uppercase tracking-[0.2em] bg-accent">Virtual Office</th>
                                    <th className="p-8 font-bold text-xs uppercase tracking-[0.2em] border-r border-white/10">Service Office (Kantor Fisik)</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium text-charcoal/80">
                                {[
                                    { aspect: 'Biaya/bulan', vo: 'Rp 250rb - 917rb', physical: 'Rp 2jt - 8jt+' },
                                    { aspect: 'Setup cost', vo: 'Rp 0', physical: 'Rp 0 (all-inclusive)' },
                                    { aspect: 'Untuk Pendirian PT', vo: '✅ Non-PKP', physical: '✅ Non-PKP & PKP' },
                                    { aspect: 'Untuk PKP', vo: '✅ Bisa (KBLI Jasa)', physical: '✅ Bisa (Semua KBLI)' },
                                    { aspect: 'Kontrak Min. PKP', vo: 'Tidak ada (KBLI Jasa) / ❌ Tidak (KBLI Selain Jasa)', physical: '1 tahun (KBLI Selain Jasa)' },
                                    { aspect: 'Meeting Room', vo: 'Quota (CP/FCP)', physical: 'Quota included' },
                                    { aspect: 'Ruang Kerja', vo: 'Tidak ada', physical: 'Ada (private room)' },
                                    { aspect: 'Fleksibilitas', vo: 'Kerja dari mana saja', physical: 'Terikat lokasi' },
                                    { aspect: 'Cocok untuk', vo: 'Remote team, KBLI Jasa', physical: 'Tim tetap, KBLI Selain Jasa' }
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-primary/5 hover:bg-bg-paper transition-colors">
                                        <td className="p-8 font-bold text-primary bg-bg-paper/30 border-r border-primary/5">{row.aspect}</td>
                                        <td className="p-8 text-primary font-bold">{row.vo}</td>
                                        <td className="p-8 border-r border-primary/5">{row.physical}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* MOBILE LISTS */}
                    <div className="md:hidden space-y-12">
                        <div className="bg-bg-paper p-8 border-l-4 border-charcoal/20">
                            <h4 className="text-lg font-bold text-primary mb-6 uppercase tracking-widest">Service Office (Kantor Fisik):</h4>
                            <ul className="space-y-4">
                                {[
                                    'Biaya/bulan: Rp 2jt - 8jt+',
                                    'Setup cost: Rp 0 (all-inclusive)',
                                    'Untuk Pendirian PT: ✅ Non-PKP & PKP',
                                    'Untuk PKP: ✅ Bisa (Semua KBLI)',
                                    'Kontrak Min. PKP: 1 tahun (KBLI Selain Jasa)',
                                    'Meeting Room: Quota included',
                                    'Ruang Kerja: Ada (private room)',
                                    'Fleksibilitas: Terikat lokasi',
                                    'Cocok untuk: Tim tetap, KBLI Selain Jasa'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-charcoal/70">
                                        <div className="text-charcoal/30 mt-1">•</div> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-accent/5 p-8 border-l-4 border-accent">
                            <h4 className="text-lg font-bold text-primary mb-6 uppercase tracking-widest">Virtual Office:</h4>
                            <ul className="space-y-4">
                                {[
                                    'Biaya/bulan: Rp 250rb - 917rb',
                                    'Setup cost: Rp 0',
                                    'Untuk Pendirian PT: ✅ Non-PKP',
                                    'Untuk PKP: ✅ Bisa (KBLI Jasa only)',
                                    'Kontrak Min. PKP: Tidak ada (KBLI Jasa)',
                                    'Meeting Room: Quota (CP/FCP)',
                                    'Ruang Kerja: Tidak ada',
                                    'Fleksibilitas: Kerja dari mana saja',
                                    'Cocok untuk: Remote team, KBLI Jasa'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-primary font-medium">
                                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* J) FAQ */}
            <section className="py-24 lg:py-32 bg-bg-paper">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">FAQ</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-primary font-heading">Pertanyaan yang Sering Diajukan</h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {[
                            {
                                q: "Apakah virtual office bisa digunakan untuk pendirian PT?",
                                a: "Ya, untuk PT/CV Non-PKP dan PKP (tergantung KBLI). Virtual office dapat digunakan untuk pendirian perusahaan, NIB, dan NPWP sesuai regulasi yang berlaku."
                            },
                            {
                                q: "Apakah virtual office bisa untuk PKP?",
                                a: "Ya, untuk perusahaan KBLI Jasa (konsultan, IT, marketing, dll). Virtual Office dapat digunakan untuk pengajuan PKP tanpa batasan kontrak minimum. Untuk perusahaan KBLI Selain Jasa (trading, distributor, transportasi, event organizer, dll), diperlukan kontrak sewa ruangan kantor minimal 1 tahun (Service Office) untuk pengajuan PKP sesuai regulasi perpajakan."
                            },
                            {
                                q: "Bagaimana saya tahu apakah perusahaan saya KBLI Jasa atau Selain Jasa?",
                                a: "KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) tercantum dalam akta perusahaan Anda. Tim kami akan membantu mengidentifikasi kategori KBLI dan menentukan paket yang sesuai untuk kebutuhan PKP."
                            },
                            {
                                q: "Bagaimana handling surat dilakukan?",
                                a: "Handling surat dilakukan dengan sistem penerimaan (inbound) setiap hari kerja. Segera setelah surat diterima, tim kami menginformasikan kepada Anda melalui WhatsApp. BBC tidak melayani pengiriman surat atau dokumen keluar atas nama penyewa."
                            },
                            {
                                q: "Apakah tersedia meeting room?",
                                a: "Ya, untuk paket CP (12 jam/bulan) dan FCP (15 jam/bulan). Meeting room tersedia untuk pertemuan klien atau keperluan verifikasi lokasi perusahaan, termasuk verifikasi dari kantor pajak jika diperlukan."
                            },
                            {
                                q: "Berapa lama kontrak minimum?",
                                a: "Untuk Virtual Office: Kontrak minimum umumnya 12 bulan dengan pembayaran tahunan. Untuk Service Office dengan kebutuhan PKP KBLI Selain Jasa: Minimum 1 tahun sesuai persyaratan perpajakan."
                            },
                            {
                                q: "Apakah ada batasan bidang usaha?",
                                a: "Tidak ada batasan umum, namun pastikan bidang usaha Anda sesuai dengan regulasi KBLI dan kebijakan instansi pemberi izin. Untuk pengajuan PKP, KBLI akan menentukan apakah Virtual Office atau Service Office yang lebih sesuai."
                            },
                            {
                                q: "Apakah bisa upgrade dari Virtual Office ke Service Office?",
                                a: "Ya. Banyak klien kami—terutama perusahaan KBLI Selain Jasa—memulai dengan Virtual Office dan upgrade ke Service Office saat siap mengajukan PKP. Proses upgrade fleksibel dan tanpa penalty."
                            }
                        ].map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border border-primary/5 px-8 transition-colors hover:border-accent group bg-white">
                                <AccordionTrigger className="text-lg font-bold text-primary hover:text-accent py-8 text-left group-hover:no-underline font-heading">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-charcoal/70 text-base leading-relaxed pb-8 font-light">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* K) FINAL FORM */}
            <section id="vo-form" className="py-24 lg:py-32 relative text-white bg-primary overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
                        <div>
                            <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.4em] mb-10">Get Started</span>
                            <h2 className="text-4xl md:text-6xl font-bold mb-10 font-heading leading-tight text-white underline decoration-accent/30 underline-offset-8">Mulai Bisnis Anda dari Jakarta Selatan</h2>
                            <p className="text-white text-lg mb-12 font-light leading-relaxed">
                                Dapatkan alamat bisnis resmi Jakarta Selatan untuk pendirian PT/CV Non-PKP tanpa komitmen sewa kantor fisik. Konsultasikan kebutuhan KBLI dan legalitas Anda secara gratis via WhatsApp.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <Button
                                    className="bg-accent text-white px-12 py-8 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-500 shadow-3xl shadow-accent/20 rounded-none h-auto w-full sm:w-auto min-h-[80px]"
                                    onClick={() => trackEvent('whatsapp_click', 'final_vo_wa')}
                                    asChild
                                >
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="w-5 h-5 mr-3" /> Konsultasi via WhatsApp Sekarang
                                    </a>
                                </Button>
                            </div>
                        </div>

                        <div className="relative group overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                                alt="Virtual Office BBC"
                                width={800}
                                height={600}
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors duration-500"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* L) RELATED SERVICES */}
            <section className="py-20 bg-white border-t border-primary/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Layanan Terkait</span>
                        <h2 className="text-3xl font-bold text-primary font-heading">Solusi Bisnis Lainnya</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Service Office */}
                        <Link href="/sewa-kantor" className="group relative block overflow-hidden border border-primary/10 hover:border-accent transition-all duration-300">
                            <div className="aspect-[16/9] relative">
                                <Image
                                    src="/images/private-office/bbc-private-office-suite-wide-01.jpg.JPG"
                                    alt="Service Office"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors" />
                            </div>
                            <div className="p-8 bg-white">
                                <h4 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">Service Office</h4>
                                <p className="text-charcoal/60 text-sm mb-4">Kantor fisik private lengkap dengan furniture dan fasilitas all-in. Solusi untuk PKP.</p>
                                <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                    Lihat Layanan <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>

                        {/* Jasa Legal */}
                        <Link href="/legal/pendirian-pt-jakarta-selatan" className="group relative block overflow-hidden border border-primary/10 hover:border-accent transition-all duration-300">
                            <div className="aspect-[16/9] relative">
                                <Image
                                    src="/images/meeting-room/lounge/bbc-meeting-room-lounge-01.jpg.JPG"
                                    alt="Jasa Legal & Perizinan"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors" />
                            </div>
                            <div className="p-8 bg-white">
                                <h4 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">Jasa Legal Pendirian PT</h4>
                                <p className="text-charcoal/60 text-sm mb-4">Layanan pengurusan pendirian PT, CV, NIB, dan izin usaha lainnya secara profesional.</p>
                                <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                    Lihat Layanan <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="py-12 bg-white text-center border-t border-primary/5">
                <div className="container mx-auto px-6">
                    <p className="text-primary font-bold text-sm mb-6 font-heading">Bintaro Business Centre</p>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[9px] font-bold text-charcoal/30 uppercase tracking-[0.2em] mb-8">
                        <Link href="/legalitas-dan-perizinan-bbc" className="hover:text-primary transition-colors">Legalitas & Perizinan</Link>
                        <Link href="/tentang-kami" className="hover:text-primary transition-colors">Tentang Kami</Link>
                        <Link href="/lokasi-kantor" className="hover:text-primary transition-colors">Lokasi & Akses</Link>
                    </div>
                    <p className="text-charcoal/40 text-[10px] uppercase tracking-widest font-bold">Alamat bisnis kredibel sejak 2007 — mendukung legalitas dan pertumbuhan bisnis Anda.</p>
                </div>
            </footer>
        </main>
    )
}
