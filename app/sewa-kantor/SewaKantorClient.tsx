'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Check,
    MapPin,
    Phone,
    MessageCircle,
    Building2,
    Shield,
    Wifi,
    FileText,
    Coffee,
    ArrowRight,
    Clock,
    CheckCircle2,
    ChevronDown,
    Building,
    Table as TableIcon,
    HelpCircle,
    Users,
    Layout
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
            content_category: 'office_rental',
            content_label: label
        });
    }
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'click_whatsapp_money_page', {
            'page_type': 'sewa_kantor',
            'event_category': 'conversion',
            'event_label': label
        });
        (window as any).gtag('event', eventName, {
            'event_category': 'engagement',
            'event_label': label
        });
    }
}

export default function SewaKantorClient() {
    const waMessage = "Hallo, saya tertarik sewa kantor di BBC. Bisa kirim detail unit yang tersedia?"
    const waUrl = `https://wa.me/6281311778036?text=${encodeURIComponent(waMessage)}`

    return (
        <main className="bg-white font-sans text-charcoal">
            <StickyWhatsAppCTA message={waMessage} pageType="sewa_kantor" />
            {/* A) HERO SECTION */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-bg-paper overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Content */}
                        <div className="w-full lg:w-1/2">
                            <span className="inline-block text-accent font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6">Berdiri Sejak 2007</span>

                            <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-[1.1] mb-8 font-heading">
                                Sewa Kantor Siap Pakai di Bintaro Business Centre – <span className="text-accent underline decoration-accent/30 underline-offset-8">Langsung Operasional, Tanpa Ribet</span>
                            </h1>

                            <p className="text-lg text-charcoal/70 mb-10 leading-relaxed max-w-2xl font-light">
                                Kantor profesional siap pakai dengan furniture lengkap, resepsionis, dan internet—sejak 2007 sebagai penyedia layanan gedung kantor yang terpercaya di lokasi Jakarta Selatan. Tidak perlu setup bertele-tele. Anda fokus pada bisnis, kami urus operasionalnya. Alamat administratif yang kredibel untuk legalitas dan keperluan perpajakan perusahaan Anda.
                            </p>

                            {/* Trust Indicators */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                <div className="flex items-start gap-3">
                                    <div className="bg-accent/10 p-2 rounded-lg">
                                        <Clock className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-primary font-bold text-xs uppercase tracking-wider">Sejak 2007</p>
                                        <p className="text-charcoal/60 text-[10px] leading-tight mt-1">Pengalaman 18 tahun melayani bisnis</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-accent/10 p-2 rounded-lg">
                                        <MapPin className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-primary font-bold text-xs uppercase tracking-wider">Jakarta Selatan</p>
                                        <p className="text-charcoal/60 text-[10px] leading-tight mt-1">Alamat administratif resmi</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-accent/10 p-2 rounded-lg">
                                        <Check className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-primary font-bold text-xs uppercase tracking-wider">Siap Pakai</p>
                                        <p className="text-charcoal/60 text-[10px] leading-tight mt-1">Furniture & fasilitas lengkap</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <Button
                                    className="bg-primary text-white px-8 py-7 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all duration-300 rounded-none h-auto w-full sm:w-auto shadow-lg shadow-primary/20"
                                    onClick={() => trackEvent('cta_click', 'hero_wa_survey')}
                                    asChild
                                >
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer">Jadwalkan Survey Kantor</a>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-primary text-primary px-8 py-7 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-300 rounded-none h-auto w-full sm:w-auto"
                                    onClick={() => trackEvent('whatsapp_click', 'hero_whatsapp')}
                                    asChild
                                >
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="w-4 h-4 mr-2" /> Konsultasi via WhatsApp
                                    </a>
                                </Button>
                            </div>

                            <p className="text-[10px] text-charcoal/40 font-medium uppercase tracking-widest flex items-center gap-2 italic">
                                💡 Jam operasional admin hingga 17.00 WIB. Klien dapat bekerja hingga 20.00 WIB di ruangan.
                            </p>
                        </div>

                        {/* Image - Authentic Room Photo */}
                        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px]">
                            <div className="relative w-full h-full overflow-hidden shadow-2xl group">
                                <Image
                                    src="/images/sewa-kantor/ruangan-kantor-utama.jpg"
                                    alt="Kantor siap pakai Bintaro Business Centre"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors duration-500"></div>
                            </div>
                            {/* Decorative Gold Box */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 -z-10 hidden lg:block"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* B) WHY THIS (BENEFIT STACK) */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-5">
                            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-6">Efisiensi Bisnis</span>
                            <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-primary mb-8 leading-tight font-heading">
                                Mengapa Kantor Siap Pakai Lebih Efisien untuk Bisnis Anda?
                            </h2>
                            <p className="text-charcoal/70 text-lg leading-relaxed font-light mb-8">
                                Menyewa kantor konvensional artinya Anda bayar setup interior, beli furniture, urus internet, rekrut resepsionis—semua itu memakan waktu dan modal besar sebelum bisnis mulai jalan. Kantor siap pakai menghilangkan semua hambatan itu.
                            </p>
                            <div className="bg-bg-paper p-8 border-l-4 border-accent">
                                <p className="text-primary font-bold italic text-lg leading-relaxed">
                                    "Anda tidak buang waktu 2-3 bulan untuk setup. Bisnis jalan lebih cepat."
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
                            {[
                                { title: 'Tanpa biaya setup awal', desc: 'Furniture kantor, meja meeting, storage sudah tersedia', icon: <Building2 className="w-6 h-6" /> },
                                { title: 'Resepsionis profesional', desc: 'Sambut tamu dan handling komunikasi bisnis Anda', icon: <Users className="w-6 h-6" /> },
                                { title: 'Internet siap digunakan', desc: 'Koneksi stabil untuk operasional tanpa delay', icon: <Wifi className="w-6 h-6" /> },
                                { title: 'Alamat bisnis kredibel', desc: 'Jakarta Selatan, mendukung kebutuhan legal dan administrasi', icon: <MapPin className="w-6 h-6" /> },
                                { title: 'Fleksibilitas kapasitas', desc: 'Pilih ukuran sesuai kebutuhan tim Anda', icon: <Layout className="w-6 h-6" /> },
                                { title: 'Proses mulai cepat', desc: 'Survey, pilih unit, kontrak, langsung operasional', icon: <ArrowRight className="w-6 h-6" /> }
                            ].map((item, i) => (
                                <div key={i} className="group p-8 border border-primary/5 hover:border-accent transition-all duration-300">
                                    <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                    <h4 className="text-lg font-bold text-primary mb-4">{item.title}</h4>
                                    <p className="text-charcoal/60 text-sm leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* C) UNIT OPTIONS */}
            <section id="room-selection" className="py-24 lg:py-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Pilihan Ruangan</span>
                        <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-primary mb-6 font-heading">
                            Pilihan Unit Kantor dan Kapasitas Tim
                        </h2>
                        <p className="text-charcoal/60 font-light text-lg">
                            Kami menyediakan berbagai ukuran unit agar Anda bisa memilih sesuai kebutuhan operasional—tidak perlu bayar ruang yang tidak digunakan.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Unit 1 10m2 */}
                        <div className="bg-white border border-primary/5 shadow-sm rounded-none hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
                            <div className="relative h-64 w-full bg-primary/5 overflow-hidden">
                                <Image
                                    src="/images/private-office/bbc-private-office-suite-workdesk-01.jpg.JPG"
                                    alt="Unit 10m2 Bintaro Business Centre"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-110"
                                />
                                <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest">Unit 10m²</div>
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <h3 className="text-2xl font-bold text-primary mb-2 font-heading">Unit 10m² – Ideal untuk 1–2 Orang</h3>
                                <p className="text-charcoal/60 text-sm mb-8 font-light italic">Ruang kerja personal yang tenang dan profesional.</p>

                                <div className="mb-8 flex-1">
                                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4">Yang Termasuk:</p>
                                    <ul className="space-y-3">
                                        {['Meja kerja & kursi', 'Lemari penyimpanan', 'Internet prioritas untuk unit', 'Akses resepsionis', 'Utilitas (listrik, AC, air)'].map((feat, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-charcoal/80 font-medium">
                                                <Check className="w-4 h-4 text-accent" /> {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full border-primary text-primary hover:bg-primary hover:text-white py-6 text-xs font-bold uppercase tracking-widest rounded-none transition-all duration-300"
                                    onClick={() => trackEvent('cta_click', 'unit_availability_10m2')}
                                    asChild
                                >
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer">Cek Ketersediaan Unit Ini</a>
                                </Button>
                            </div>
                        </div>

                        {/* Unit 2 12m2 */}
                        <div className="bg-white border border-accent shadow-xl rounded-none hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col relative">
                            <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-[8px] font-bold uppercase tracking-widest z-10">Paling Populer</div>
                            <div className="relative h-64 w-full bg-primary/5 overflow-hidden">
                                <Image
                                    src="/images/private-office/bbc-private-office-suite-wide-01.jpg.JPG"
                                    alt="Unit 12m2 Bintaro Business Centre"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-110"
                                />
                                <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest">Unit 12m²</div>
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <h3 className="text-2xl font-bold text-primary mb-2 font-heading">Unit 12m² – Cocok untuk 2–3 Orang</h3>
                                <p className="text-charcoal/60 text-sm mb-8 font-light italic">Desain fleksibel untuk tim yang berkembang.</p>

                                <div className="mb-8 flex-1">
                                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4">Yang Termasuk:</p>
                                    <ul className="space-y-3">
                                        {['Furniture lengkap untuk 3 workstation', 'Internet prioritas untuk unit', 'Akses resepsionis & handling surat', 'Utilitas sudah termasuk', 'Pantry bersama'].map((feat, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-charcoal/80 font-medium">
                                                <Check className="w-4 h-4 text-accent" /> {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full border-accent text-accent hover:bg-accent hover:text-white py-6 text-xs font-bold uppercase tracking-widest rounded-none transition-all duration-300"
                                    onClick={() => trackEvent('cta_click', 'unit_availability_12m2')}
                                    asChild
                                >
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer">Cek Ketersediaan Unit Ini</a>
                                </Button>
                            </div>
                        </div>

                        {/* Unit 3 16m2 */}
                        <div className="bg-white border border-primary/5 shadow-sm rounded-none hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
                            <div className="relative h-64 w-full bg-primary/5 overflow-hidden">
                                <Image
                                    src="/images/private-office/bbc-private-office-suite-sofa-01.jpg.JPG"
                                    alt="Unit 16m2 Bintaro Business Centre"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-110"
                                />
                                <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest">Unit 16m²</div>
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <h3 className="text-2xl font-bold text-primary mb-2 font-heading">Unit 16m² – Untuk Tim 3–4 Orang</h3>
                                <p className="text-charcoal/60 text-sm mb-8 font-light italic">Ruang lebih luas dengan area kolaborasi.</p>

                                <div className="mb-8 flex-1">
                                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4">Yang Termasuk:</p>
                                    <ul className="space-y-3">
                                        {['Setup untuk 4 workstation', 'Internet prioritas untuk unit', 'Resepsionis & handling tamu', 'Utilitas lengkap', 'Akses meeting room (sesuai paket)'].map((feat, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-charcoal/80 font-medium">
                                                <Check className="w-4 h-4 text-accent" /> {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full border-primary text-primary hover:bg-primary hover:text-white py-6 text-xs font-bold uppercase tracking-widest rounded-none transition-all duration-300"
                                    onClick={() => trackEvent('cta_click', 'unit_availability_16m2')}
                                    asChild
                                >
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer">Cek Ketersediaan Unit Ini</a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-charcoal/60 font-medium text-sm mb-6 uppercase tracking-widest">
                            Ingin tahu ketersediaan unit dan paket harga terbaru?
                        </p>
                        <Button
                            variant="link"
                            className="text-primary font-bold text-lg hover:text-accent underline decoration-accent/30 underline-offset-8 transition-all"
                            asChild
                        >
                            <a href={waUrl} target="_blank" rel="noopener noreferrer">Hubungi kami untuk informasi detail</a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* NEW: VISUALISASI RUANGAN (GALLERY) */}
            <section className="py-24 lg:py-32 bg-white border-y border-primary/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Galeri Realita</span>
                            <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold text-primary mb-6 font-heading">
                                Visualisasi Ruangan Kantor BBC
                            </h2>
                            <p className="text-charcoal/60 font-light text-lg">
                                Foto asli ruangan kami di Jakarta Selatan. Bukan mockup 3D, melainkan lingkungan kerja nyata yang siap Anda gunakan hari ini.
                            </p>
                        </div>
                        <Button
                            className="bg-accent text-white px-10 py-6 text-xs font-bold uppercase tracking-widest rounded-none shadow-xl shadow-accent/20 hover:bg-primary transition-all"
                            asChild
                        >
                            <a href={waUrl} target="_blank" rel="noopener noreferrer">Minta Foto Unit Lainnya</a>
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-2 lg:row-span-2 relative aspect-square lg:aspect-auto overflow-hidden shadow-lg group">
                            <Image
                                src="/images/sewa-kantor/ruangan-kantor-staff.jpg"
                                alt="Ruang Kerja Tim BBC"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                <p className="text-white font-bold text-xs uppercase tracking-widest">Ruang Kerja Kolaboratif</p>
                            </div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image
                                src="/images/sewa-kantor/ruangan-kantor-sofa.jpg"
                                alt="Ruang Kantor dengan Area Sofa BBC"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                <p className="text-white font-bold text-[10px] uppercase tracking-widest">Executive Suite</p>
                            </div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image
                                src="/images/sewa-kantor/ruangan-kantor-minimalis.jpg"
                                alt="Ruang Kantor Minimalis BBC"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                <p className="text-white font-bold text-[10px] uppercase tracking-widest">Unit Minimalis & Fokus</p>
                            </div>
                        </div>
                        <div className="relative aspect-square overflow-hidden shadow-lg group">
                            <Image
                                src="/images/sewa-kantor/ruangan-kantor-bersih.jpg"
                                alt="Ruang Kantor Bersih BBC"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                <p className="text-white font-bold text-[10px] uppercase tracking-widest">Profesional Environment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW: RUANG MEETING PROFESIONAL (GALLERY) */}
            <section className="py-24 lg:py-32 bg-bg-paper border-b border-primary/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8 text-right lg:text-left">
                        <div className="max-w-2xl lg:ml-0 ml-auto text-left w-full">
                            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Boardroom & Discussion</span>
                            <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold text-primary mb-6 font-heading">
                                Ruang Meeting Profesional
                            </h2>
                            <p className="text-charcoal/60 font-light text-lg">
                                Fasilitas pertemuan yang mendukung kredibilitas bisnis Anda. Tersedia mulai dari Boardroom formal hingga Small Meeting Room yang nyaman.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="relative aspect-[4/3] overflow-hidden shadow-xl group">
                            <Image
                                src="/images/meeting-room/boardroom/bbc-meeting-room-boardroom-wide-01.jpg.JPG"
                                alt="Boardroom Bintaro Business Centre"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <p className="text-accent font-bold text-[10px] uppercase tracking-widest mb-2">Formal Meeting</p>
                                <p className="text-white font-bold text-lg uppercase tracking-tight">Main Boardroom</p>
                            </div>
                        </div>
                        <div className="relative aspect-[4/3] overflow-hidden shadow-xl group">
                            <Image
                                src="/images/meeting-room/small-meeting/bbc-meeting-room-small-roundtable-wide-01.jpg.JPG"
                                alt="Small Meeting Room Bintaro Business Centre"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <p className="text-accent font-bold text-[10px] uppercase tracking-widest mb-2">Private Discussion</p>
                                <p className="text-white font-bold text-lg uppercase tracking-tight">Small Meeting Room</p>
                            </div>
                        </div>
                        <div className="relative aspect-[4/3] overflow-hidden shadow-xl group">
                            <Image
                                src="/images/meeting-room/boardroom/bbc-meeting-room-boardroom-front-01.jpg.JPG"
                                alt="Boardroom Perspective Bintaro Business Centre"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <p className="text-accent font-bold text-[10px] uppercase tracking-widest mb-2">Strategic Space</p>
                                <p className="text-white font-bold text-lg uppercase tracking-tight">Executive Presentation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* D) WHAT'S INCLUDED (ALL-INCLUSIVE) */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="w-full lg:w-1/2">
                            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-6">Fasilitas All-In</span>
                            <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-primary mb-8 font-heading">Apa Saja yang Termasuk dalam Sewa Kantor?</h2>
                            <p className="text-charcoal/70 text-lg mb-10 font-light">
                                Tidak ada biaya tersembunyi. Semua yang Anda butuhkan untuk operasional harian sudah termasuk dalam paket sewa.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                                {[
                                    { icon: <CheckCircle2 className="w-5 h-5 text-accent" />, title: 'Furniture kantor lengkap', desc: 'Meja, kursi, lemari' },
                                    { icon: <CheckCircle2 className="w-5 h-5 text-accent" />, title: 'Internet stabil', desc: 'Koneksi untuk produktivitas' },
                                    { icon: <CheckCircle2 className="w-5 h-5 text-accent" />, title: 'Utilitas operasional', desc: 'Listrik, AC, air sudah termasuk' },
                                    { icon: <CheckCircle2 className="w-5 h-5 text-accent" />, title: 'Akses Meeting Room', desc: <>Tersedia kuota bulanan untuk tenant aktif.</> },
                                    { icon: <CheckCircle2 className="w-5 h-5 text-accent" />, title: 'Resepsionis profesional', desc: 'Sambut tamu & terima telepon' },
                                    { icon: <CheckCircle2 className="w-5 h-5 text-accent" />, title: 'Pantry', desc: 'Area coffee break' },
                                    { icon: <CheckCircle2 className="w-5 h-5 text-accent" />, title: 'Handling surat & paket', desc: 'Terima dan simpan kiriman Anda' },
                                    { icon: <CheckCircle2 className="w-5 h-5 text-accent" />, title: 'Akses klien hingga 20.00', desc: 'Fleksibilitas di luar jam standar' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="shrink-0 mt-1">{item.icon}</div>
                                        <div>
                                            <p className="font-bold text-primary text-sm mb-1">{item.title}</p>
                                            <p className="text-charcoal/60 text-[11px] leading-tight">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-primary/5">
                                <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                                    Bagi bisnis yang memerlukan <span className="font-bold text-primary">domisili untuk PKP</span>, ketersediaan unit fisik kami menjamin kelancaran verifikasi lapangan. Konsultasikan juga <Link href="/legal/pendirian-pt-jakarta-selatan" className="text-accent font-bold hover:underline italic">layanan legal pendirian PT Jakarta Selatan</Link> jika Anda sedang memulai badan usaha baru.
                                </p>
                            </div>

                            <div className="mt-12 flex flex-col items-start gap-4">
                                <Button
                                    className="bg-primary text-white border-none px-10 py-7 text-xs font-bold uppercase tracking-widest rounded-none shadow-xl shadow-primary/20 hover:bg-accent transition-all animate-pulse"
                                    onClick={() => trackEvent('cta_click', 'view_visual_wa')}
                                    asChild
                                >
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer">Lihat Visual Ruangan</a>
                                </Button>
                                <p className="text-[11px] text-charcoal/40 font-bold italic uppercase tracking-widest">
                                    "Anda fokus pada bisnis. Kami urus operasional hariannya."
                                </p>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 relative h-[500px]">
                            <div className="absolute inset-0 border-[20px] border-bg-paper translate-x-10 translate-y-10"></div>
                            <div className="relative h-full w-full overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/sewa-kantor/ruangan-kantor-staff.jpg"
                                    alt="Interior kantor siap pakai Bintaro Business Centre dengan tim profesional sedang bekerja"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* E) LOCATION & ACCESS v2.2 */}
            <section className="py-24 lg:py-32 bg-primary text-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-12 text-center mb-16">
                            <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] block mb-4">Aksesibilitas</span>
                            <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold mb-8 font-heading text-white">Lokasi Strategis di Jakarta Selatan – Dekat Kawasan Bisnis dan Perumahan Premium</h2>
                            <p className="text-white/70 text-lg max-w-4xl mx-auto font-light leading-relaxed">
                                Bintaro Business Centre menyediakan solusi <Link href="/sewa-kantor/jakarta-selatan" className="text-accent font-bold hover:underline">sewa kantor Jakarta Selatan</Link> yang strategis di Pesanggrahan, dengan akses cepat melalui Pintu Tol Veteran dan Jalan RC Veteran Raya. Berada di sekitar Bintaro Jaya, Rempoa, dan kawasan Pondok Indah, lokasi ini memudahkan aktivitas bisnis sekaligus memberikan alamat administratif DKI Jakarta yang penting untuk kebutuhan legal dan perpajakan perusahaan.
                            </p>
                        </div>

                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <h6 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-6 border-b border-accent/20 pb-3">Akses Utama:</h6>
                                <ul className="space-y-4">
                                    {[
                                        'Pintu Tol Veteran – Koneksi langsung dari Jakarta Pusat, Selatan, dan Tangerang',
                                        'RC Veteran Raya – Arteri utama dengan akses mudah dari berbagai arah',
                                        'Dekat area bisnis Cilandak dan Kebayoran Lama'
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4 items-center">
                                            <MapPin className="w-4 h-4 text-accent" />
                                            <span className="text-sm font-medium text-white/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h6 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-6 border-b border-accent/20 pb-3">Nearby Areas & Points:</h6>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Pondok Indah', 'Bintaro Jaya', 'Rempoa & Tanah Kusir', 'RS Fatmawati', 'Pondok Indah Mall', 'Bintaro Jaya Xchange'].map((item, i) => (
                                        <div key={i} className="bg-white/5 p-4 border border-white/10 flex items-center gap-3">
                                            <Check className="w-4 h-4 text-accent" />
                                            <span className="text-xs font-bold uppercase tracking-wider">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className="text-white/40 text-xs font-medium italic border-l-2 border-accent/30 pl-6 py-2">
                                Lokasi ini memberikan kombinasi ideal: alamat administratif Jakarta Selatan untuk keperluan legal dan perpajakan, dengan kedekatan ke kawasan perumahan premium tempat banyak entrepreneur dan business owner tinggal.
                            </p>
                        </div>

                        <div className="lg:col-span-7 h-[500px] border border-white/10 relative overflow-hidden group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.90382379!2d106.7644!3d-6.2764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f032231dc913%3A0xf6039556d0d26733!2sBintaro%20Business%20Centre!5e0!3m2!1sid!2sid!4v1709600000000!5m2!1sid!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(85%)' }}
                                allowFullScreen
                                loading="lazy"
                                className="opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
                            ></iframe>
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary via-transparent to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* F) COMPARISON (MOBILE-OPTIMIZED FORMAT) */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Perbandingan</span>
                        <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-primary mb-8 font-heading">
                            Serviced Office vs Kantor Konvensional: Apa Bedanya?
                        </h2>
                        <p className="text-charcoal/60 font-light text-lg">
                            Banyak yang mengira sewa kantor siap pakai lebih mahal. Faktanya, ketika Anda hitung total cost of ownership, kantor siap pakai justru lebih efisien.
                        </p>
                    </div>

                    {/* DESKTOP TABLE */}
                    <div className="hidden md:block max-w-5xl mx-auto overflow-hidden border border-primary/5 shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-primary text-white">
                                    <th className="p-8 font-bold text-xs uppercase tracking-[0.2em] border-r border-white/10">Aspek</th>
                                    <th className="p-8 font-bold text-xs uppercase tracking-[0.2em] border-r border-white/10">Kantor Konvensional</th>
                                    <th className="p-8 font-bold text-xs uppercase tracking-[0.2em] bg-accent">Serviced Office (BBC)</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium text-charcoal/80">
                                <tr className="border-b border-primary/5 hover:bg-bg-paper transition-colors">
                                    <td className="p-8 font-bold text-primary bg-bg-paper/30 border-r border-primary/5">Setup Cost</td>
                                    <td className="p-8 border-r border-primary/5">Furniture, internet, resepsionis—bayar sendiri</td>
                                    <td className="p-8 text-primary font-bold">Sudah termasuk dalam sewa bulanan</td>
                                </tr>
                                <tr className="border-b border-primary/5 hover:bg-bg-paper transition-colors">
                                    <td className="p-8 font-bold text-primary bg-bg-paper/30 border-r border-primary/5">Waktu Operasional</td>
                                    <td className="p-8 border-r border-primary/5">2–3 bulan (renovasi, setup, rekrutmen)</td>
                                    <td className="p-8 text-primary font-bold">Survey → unit → operasional</td>
                                </tr>
                                <tr className="border-b border-primary/5 hover:bg-bg-paper transition-colors">
                                    <td className="p-8 font-bold text-primary bg-bg-paper/30 border-r border-primary/5">Resepsionis & Support</td>
                                    <td className="p-8 border-r border-primary/5">Rekrut, training, gaji bulanan tetap</td>
                                    <td className="p-8 text-primary font-bold">Sudah tersedia, profesional, no rekrut</td>
                                </tr>
                                <tr className="border-b border-primary/5 hover:bg-bg-paper transition-colors">
                                    <td className="p-8 font-bold text-primary bg-bg-paper/30 border-r border-primary/5">Fleksibilitas</td>
                                    <td className="p-8 border-r border-primary/5">Kontrak panjang, susah scale up/down</td>
                                    <td className="p-8 text-primary font-bold">Sesuaikan kapasitas sesuai tim</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* MOBILE BULLETS */}
                    <div className="md:hidden space-y-12">
                        <div className="bg-bg-paper p-8 border-l-4 border-charcoal/20">
                            <h4 className="text-lg font-bold text-primary mb-6 uppercase tracking-widest">Kantor Konvensional:</h4>
                            <ul className="space-y-4">
                                {[
                                    'Setup cost tinggi – Furniture, internet, resepsionis dibayar terpisah',
                                    'Waktu mulai 2–3 bulan – Renovasi, setup, rekrutmen resepsionis',
                                    'Harus rekrut & training – Resepsionis membutuhkan gaji bulanan tetap',
                                    'Kontrak kaku – Sulit scale up atau down sesuai kebutuhan bisnis'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-charcoal/70">
                                        <div className="text-charcoal/30 mt-1">•</div> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-accent/5 p-8 border-l-4 border-accent">
                            <h4 className="text-lg font-bold text-primary mb-6 uppercase tracking-widest">Serviced Office (BBC):</h4>
                            <ul className="space-y-4">
                                {[
                                    'Setup cost termasuk – Semua sudah dalam sewa bulanan',
                                    'Langsung operasional – Survey → pilih unit → mulai bekerja',
                                    'Resepsionis profesional – Sudah tersedia, tidak perlu rekrut',
                                    'Fleksibilitas penuh – Sesuaikan kapasitas dengan pertumbuhan tim'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-primary font-medium">
                                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-charcoal/40 text-xs italic mb-4">Anda tidak hanya hemat modal awal—Anda juga hemat waktu dan energi untuk fokus pada revenue generation.</p>
                        <p className="text-charcoal/60 text-sm">
                            Butuh informasi lebih lanjut mengenai paket khusus untuk startup dan bisnis baru? Tim kami siap membantu perhitungan budget kantor Anda.
                        </p>
                    </div>
                </div>
            </section>

            {/* G) TRUST / SOCIAL PROOF */}
            <section className="py-24 lg:py-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-12 text-center mb-16">
                            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-6">Experience Matters</span>
                            <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-primary mb-8 font-heading">Dipercaya Berbagai Jenis Bisnis</h2>
                            <p className="text-charcoal/70 text-lg leading-relaxed font-light max-w-3xl mx-auto">
                                Sejak 2007, Bintaro Business Centre melayani startup, SMB, konsultan, perusahaan multinasional, hingga freelancer profesional yang membutuhkan alamat bisnis kredibel dan ruang kerja yang mendukung produktivitas.
                            </p>
                        </div>

                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-white p-8 border border-primary/5">
                                <p className="text-4xl font-bold text-primary mb-1">500+</p>
                                <p className="text-[9px] font-bold text-accent uppercase tracking-widest leading-tight">Bisnis Terlayani</p>
                            </div>
                            <div className="bg-white p-8 border border-primary/5">
                                <p className="text-4xl font-bold text-primary mb-1">17+</p>
                                <p className="text-[9px] font-bold text-accent uppercase tracking-widest leading-tight">Tahun Pengalaman</p>
                            </div>
                            <div className="bg-white p-8 border border-primary/5">
                                <p className="text-4xl font-bold text-primary mb-1"> Jaksel</p>
                                <p className="text-[9px] font-bold text-accent uppercase tracking-widest leading-tight">Alamat Domisili</p>
                            </div>
                        </div>

                        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-8">
                            {[
                                { name: 'Andi Wijaya', role: 'CEO, TechFlow Solution', quote: 'Setup kantor dalam 3 hari, lengkap dengan surat domisili. Tim BBC sangat responsif.' },
                                { name: 'Sarah Devina', role: 'Founder, Creative Minds', quote: 'Layanan Virtual Office-nya sangat membantu bisnis saya memiliki image profesional.' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-10 border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-300 relative group h-full">
                                    <span className="absolute top-8 right-8 opacity-10 group-hover:opacity-100 transition-opacity">
                                        <MessageCircle className="w-12 h-12 text-accent" />
                                    </span>
                                    <p className="text-charcoal/70 italic text-sm leading-relaxed mb-8 relative z-10">"{item.quote}"</p>
                                    <div className="relative z-10 mt-auto">
                                        <p className="font-bold text-primary text-xs uppercase tracking-widest">{item.name}</p>
                                        <p className="text-[10px] text-accent font-bold uppercase tracking-widest mt-1">{item.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* H) FAQ (REORDERED - PSYCHOLOGY-OPTIMIZED) */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Pertanyaan Anda</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 font-heading">Pertanyaan yang Sering Diajukan</h2>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {[
                            {
                                q: "Apakah saya bisa survey unit sebelum menyewa?",
                                a: "Bisa. Anda dapat menjadwalkan survey untuk melihat unit yang tersedia, fasilitas, dan akses lokasi sebelum mengambil keputusan. Survey gratis dan tanpa komitmen."
                            },
                            {
                                q: "Apa saja yang termasuk dalam paket sewa kantor?",
                                a: "Paket sewa kantor siap pakai mencakup furniture kantor, internet, resepsionis, utilitas dasar (listrik, AC, air), dan fasilitas penunjang sesuai paket yang Anda pilih."
                            },
                            {
                                q: "Bagaimana jam akses untuk klien?",
                                a: "Jam operasional admin hingga 17.00 WIB. Klien dapat bekerja hingga 20.00 WIB di ruangan sesuai kebijakan operasional yang berlaku. Kami tidak menyediakan akses 24 jam dengan kartu saat ini."
                            },
                            {
                                q: "Dokumen apa yang dibutuhkan untuk mulai sewa?",
                                a: "Umumnya diperlukan identitas penanggung jawab dan dokumen perusahaan (jika berbadan hukum). Tim kami akan menginformasikan checklist dokumen lengkap sesuai kebutuhan Anda saat konsultasi."
                            },
                            {
                                q: "Apakah tersedia layanan pendukung lain selain sewa kantor?",
                                a: (
                                    <p className="mt-4">
                                        Untuk kebutuhan alamat legal tanpa harus menyewa fisik setiap hari, silakan pelajari <Link href="/virtual-office" className="text-accent font-bold hover:underline">layanan virtual office Bintaro Business Centre</Link> yang hemat biaya namun tetap kredibel.
                                    </p>
                                )
                            }
                        ].map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border border-primary/5 px-8 transition-colors hover:border-accent group bg-bg-paper/50">
                                <AccordionTrigger className="text-lg font-bold text-primary hover:text-accent font-heading py-8 text-left group-hover:no-underline">
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

            {/* TRUST VERIFICATION STRIP */}
            <section className="py-12 bg-bg-paper border-y border-primary/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                        <Link href="/lokasi-kantor" className="hover:text-accent transition-colors flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-accent" /> Lokasi & Akses
                        </Link>
                        <Link href="/fasilitas-kantor" className="hover:text-accent transition-colors flex items-center gap-2">
                            <Building2 className="w-3 h-3 text-accent" /> Fasilitas Gedung
                        </Link>
                        <Link href="/legalitas-dan-perizinan-bbc" className="hover:text-accent transition-colors flex items-center gap-2">
                            <Shield className="w-3 h-3 text-accent" /> Legalitas & Perizinan
                        </Link>
                        <Link href="/klien-dan-testimoni" className="hover:text-accent transition-colors flex items-center gap-2">
                            <Users className="w-3 h-3 text-accent" /> Klien & Testimoni
                        </Link>
                    </div>
                </div>
            </section>

            {/* I) FINAL CTA WITH FORM */}
            <section className="py-24 lg:py-32 relative text-white bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="/images/private-office/bbc-private-office-suite-wide-01.jpg.JPG"
                        alt="Final CTA Background"
                        fill
                        className="object-cover grayscale"
                    />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
                        <div>
                            <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.4em] mb-10">Scale Up Your Business</span>
                            <h2 className="text-4xl md:text-6xl font-bold mb-10 font-heading leading-tight text-white">Konsultasi Sewa Kantor via WhatsApp</h2>
                            <p className="text-white text-lg mb-12 font-light leading-relaxed">
                                Butuh informasi detail mengenai ketersediaan unit, harga paket, atau ingin menjadwalkan survey di area Bintaro Business Centre? Tim kami siap melayani Anda secara responsif melalui WhatsApp.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <Button
                                    className="bg-accent text-white px-12 py-8 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-500 shadow-3xl shadow-accent/20 rounded-none h-auto w-full sm:w-auto"
                                    onClick={() => trackEvent('whatsapp_click', 'final_survey_wa')}
                                    asChild
                                >
                                    <a href="https://wa.me/6281311778036?text=Halo%20BBC%2C%20saya%20ingin%20konsultasi%20mengenai%20sewa%20kantor%20siap%20pakai">
                                        <MessageCircle className="w-5 h-5 mr-3" /> Chat WhatsApp Sekarang
                                    </a>
                                </Button>
                            </div>
                        </div>

                        <div className="relative group overflow-hidden shadow-2xl">
                            <Image
                                src="/images/private-office/bbc-private-office-suite-wide-01.jpg.JPG"
                                alt="Konsultasi Sewa Kantor BBC"
                                width={800}
                                height={600}
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors duration-500"></div>
                        </div>
                    </div>

                    <div className="mt-20 flex flex-wrap justify-center gap-10 text-white/40 text-[9px] font-bold uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-2"><Check className="w-3 h-3 text-accent" /> No Hidden Cost</span>
                        <span className="flex items-center gap-2"><Check className="w-3 h-3 text-accent" /> Konsultasi Gratis</span>
                        <span className="flex items-center gap-2"><Check className="w-3 h-3 text-accent" /> Lokasi Jakarta Selatan</span>
                    </div>
                </div>
            </section>
        </main>
    )
}
