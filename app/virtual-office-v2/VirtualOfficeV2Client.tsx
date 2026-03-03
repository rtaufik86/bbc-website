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
    AlertTriangle,
    Mail
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import StickyWhatsAppCTA from '@/components/StickyWhatsAppCTA'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function VirtualOfficeV2Client() {
    const waMessage = "Hallo, saya ingin informasi paket virtual office BBC."
    const waUrl = `https://wa.me/6281311778036?text=${encodeURIComponent(waMessage)}`

    return (
        <main className="bg-white font-sans text-charcoal overflow-x-hidden">
            <StickyWhatsAppCTA message={waMessage} pageType="virtual_office" />

            {/* 1. HERO SECTION */}
            {/* Rule 10.3.1: Max 70vh, Dark overlay, Gold CTA. Copywriting from origin. */}
            <section className="relative h-[70vh] flex items-center bg-primary overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/meeting-room/boardroom/bbc-meeting-room-boardroom-wide-01.jpg.JPG"
                        alt="Virtual Office Jakarta Selatan"
                        fill
                        className="object-cover opacity-60 grayscale-[20%]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.4em] mb-8">Solusi Efisiensi Bisnis</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 font-heading">
                            Virtual Office Jakarta Selatan – <br />
                            <span className="text-accent">Alamat Bisnis Resmi untuk Perusahaan Non-PKP</span>
                        </h1>
                        <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-2xl font-light">
                            Alamat profesional di Jakarta Selatan untuk pendirian PT/CV Non-PKP, NIB, dan NPWP—tanpa biaya kantor fisik. Beroperasi sejak 2007.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Button
                                className="bg-accent text-white hover:bg-[#8F6F2E] px-12 py-8 text-sm font-bold uppercase tracking-widest rounded-none h-auto shadow-2xl shadow-accent/20"
                                asChild
                            >
                                <a href={waUrl}>
                                    <MessageCircle className="w-5 h-5 mr-3" /> Konsultasi Virtual Office
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-primary px-12 py-8 text-sm font-bold uppercase tracking-widest rounded-none h-auto bg-transparent border-2"
                                asChild
                            >
                                <Link href="#pricing">Lihat Pilihan Paket</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. IMMEDIATE TRUST BAR */}
            {/* Rule 10.3.2: 4 signals, using key data from original page. */}
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
                            <p className="text-3xl lg:text-5xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">OFFICIAL</p>
                            <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.3em]">Gedung Mandiri</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. PROBLEM → SOLUTION FRAMING */}
            {/* Rule 10.3.3: Content from original B) WHY VIRTUAL OFFICE section. */}
            <section className="py-24 lg:py-40 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 max-w-4xl mx-auto">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-6 px-2">The Solution</span>
                        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-8 font-heading">Mengapa Virtual Office adalah Solusi yang Tepat</h2>
                        <p className="text-charcoal/60 text-lg font-light leading-relaxed">
                            Sewa kantor fisik di Jakarta bisa mencapai puluhan juta per tahun. Untuk startup, freelancer, dan perusahaan remote—biaya ini tidak sebanding dengan kebutuhan.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
                        <div className="bg-primary p-12 lg:p-16 text-white shadow-2xl relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
                            <p className="text-2xl font-light italic leading-relaxed text-white/90">
                                "Anda tidak butuh ruang kerja fisik setiap hari. Yang Anda butuh adalah <span className="text-accent font-bold">alamat bisnis resmi Jakarta Selatan</span> untuk keperluan administrasi dan legalitas perusahaan."
                            </p>
                        </div>
                        <div>
                            <p className="text-lg text-charcoal/70 mb-10 leading-relaxed font-light">
                                Virtual office memberikan solusi efisien: alamat profesional yang kredibel, tanpa overhead operasional kantor konvensional.
                            </p>
                            <ul className="space-y-6">
                                <li className="flex gap-4 text-primary font-bold items-start">
                                    <Check className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                                    <span>Alamat Bisnis Jakarta Selatan (DKI Jakarta)</span>
                                </li>
                                <li className="flex gap-4 text-primary font-bold items-start">
                                    <Check className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                                    <span>Layanan Resepsionis & Penanganan Surat Profesional</span>
                                </li>
                                <li className="flex gap-4 text-primary font-bold items-start">
                                    <Check className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                                    <span>Dukungan Legalitas & PKP (KBLI Jasa)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. VALUE PROPOSITION BLOCKS */}
            {/* Rule 10.3.4: Content from original D) WHAT YOU GET section. */}
            <section className="py-24 lg:py-32 bg-[#FAF9F6]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Layanan Utama</span>
                        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-6 font-heading">Apa yang Anda Dapatkan</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            { title: 'Alamat Bisnis Jakarta Selatan', desc: 'Domisili administratif resmi di Jakarta Selatan—bukan Tangerang Selatan. Ini penting untuk administrasi yang memerlukan alamat dalam wilayah DKI Jakarta.', icon: MapPin },
                            { title: 'Penerimaan Surat & Paket', desc: 'Tim kami menerima dan menyimpan kiriman bisnis Anda setiap hari kerja (Senin–Sabtu). Segera setelah surat diterima, Anda mendapat notifikasi via WhatsApp.', icon: TableIcon },
                            { title: 'Resepsionis Profesional', desc: 'Representasi bisnis yang kredibel. Resepsionis kami menjawab telepon dengan nama perusahaan Anda (paket CP & FCP).', icon: Users },
                            { title: 'Meeting Room', desc: <>Ruang meeting modern untuk pertemuan klien atau keperluan verifikasi lokasi usaha (khusus paket CP & FCP).</>, icon: Clock },
                            { title: 'Call Handling', desc: 'Instant call transfer (CP) atau dedicated phone number (FCP) untuk komunikasi bisnis profesional.', icon: Phone },
                            { title: 'Akses & Fasilitas', desc: 'Wi-Fi area umum, parkir gratis untuk kunjungan, dan akses ke ekosistem bisnis BBC sejak 2007.', icon: Wifi }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-10 border border-primary/5 hover:border-accent hover:shadow-xl transition-all duration-500 group flex flex-col">
                                <item.icon className="w-10 h-10 text-primary mb-8 group-hover:text-accent transition-colors" />
                                <h3 className="text-xl font-bold text-primary mb-4 font-heading">{item.title}</h3>
                                <p className="text-charcoal/60 text-sm leading-relaxed flex-grow">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 text-center max-w-2xl mx-auto">
                        <p className="text-[10px] text-charcoal/40 font-bold uppercase tracking-[0.2em] italic">
                            Catatan penting: BBC melayani penerimaan surat/paket (inbound only) dan tidak menyediakan layanan pengiriman atas nama klien.
                        </p>
                    </div>
                </div>
            </section>

            {/* 5. PRICING / PACKAGE SECTION */}
            {/* Rule 10.3.5: Content from original C) PACKAGES section. */}
            <section id="pricing" className="py-24 lg:py-40 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Pilihan Paket</span>
                        <h2 className="text-3xl lg:text-7xl font-bold text-primary mb-8 font-heading tracking-tight italic">
                            Paket Virtual <span className="text-accent">Office</span>
                        </h2>
                        <p className="text-charcoal/70 text-xl font-light leading-relaxed">Pilihan investasi yang efisien untuk membangun legalitas dan citra bisnis Anda.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                name: 'BA (Business Address)',
                                price: 'Rp 250.000',
                                period: '/ bulan',
                                subText: 'Kontrak 12 bulan',
                                desc: 'Cocok untuk: Freelancer, konsultan, e-commerce yang butuh alamat resmi untuk pendirian PT/CV Non-PKP, atau perusahaan KBLI Jasa.',
                                features: [
                                    'Alamat bisnis Jakarta Selatan',
                                    'Penerimaan surat & paket (inbound)',
                                    'Notifikasi WhatsApp saat surat diterima',
                                    'Layanan resepsionis profesional',
                                    'Shared fax number',
                                    'Wi-Fi akses (area umum)',
                                    'Parkir gratis untuk kunjungan'
                                ]
                            },
                            {
                                name: 'CP (Communication)',
                                price: 'Rp 375.000',
                                period: '/ bulan',
                                subText: 'Kontrak 12 bulan',
                                desc: 'Cocok untuk: Startup & bisnis KBLI Jasa yang butuh meeting room reguler untuk klien atau verifikasi lokasi.',
                                features: [
                                    'Semua benefit BA Package',
                                    'Meeting room 12 jam/bulan',
                                    'Instant call transfer ke nomor Anda'
                                ],
                                highlighted: true
                            },
                            {
                                name: 'FCP (Full Communication)',
                                price: 'Rp 916.667',
                                period: '/ bulan',
                                subText: 'Kontrak 12 bulan',
                                desc: 'Cocok untuk: Perusahaan mapan KBLI Jasa yang butuh representasi profesional penuh dengan nomor telepon dedicated.',
                                features: [
                                    'Semua benefit CP Package',
                                    'Dedicated phone number',
                                    'Meeting room 15 jam/bulan'
                                ]
                            }
                        ].map((pkg, i) => (
                            <div
                                key={i}
                                className={`relative group h-full flex flex-col p-8 lg:p-12 transition-all duration-500 rounded-none ${pkg.highlighted
                                    ? 'bg-primary text-white shadow-[0_45px_100px_rgba(15,30,51,0.25)] border-transparent scale-105 z-20'
                                    : 'bg-white text-primary border border-primary/5 hover:border-accent shadow-sm'
                                    }`}
                            >
                                {pkg.highlighted && (
                                    <div className="absolute top-0 right-12 bg-accent text-white px-6 py-2 text-[9px] font-bold uppercase tracking-[0.3em] -translate-y-1/2 shadow-xl">
                                        Recommended
                                    </div>
                                )}
                                <div className="mb-10">
                                    <h3 className="text-2xl font-bold mb-4 font-heading">{pkg.name}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-4xl font-bold ${pkg.highlighted ? 'text-accent' : 'text-primary'}`}>{pkg.price}</span>
                                        <span className="opacity-60 text-xs font-bold uppercase">{pkg.period}</span>
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest mt-2 opacity-50">{pkg.subText}</p>
                                </div>
                                <p className={`text-sm mb-10 leading-relaxed italic ${pkg.highlighted ? 'text-white/70' : 'text-charcoal/60'}`}>{pkg.desc}</p>
                                <ul className="space-y-6 mb-12 flex-grow">
                                    {pkg.features.map((feat, k) => (
                                        <li key={k} className="flex items-start gap-4">
                                            <Check className={`w-5 h-5 shrink-0 mt-0.5 text-accent`} />
                                            <span className={`text-sm font-medium ${pkg.highlighted ? 'text-white/90' : 'text-charcoal/80'}`}>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className={`w-full py-7 font-black rounded-none h-auto uppercase tracking-widest text-[10px] transition-all duration-500 shadow-xl ${pkg.highlighted
                                        ? 'bg-accent text-white hover:bg-white hover:text-primary shadow-accent/20'
                                        : 'bg-primary text-white hover:bg-accent hover:shadow-accent/40'
                                        }`}
                                    asChild
                                >
                                    <a href={waUrl}>Pilih Paket Ini</a>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. COMPARISON MATRIX */}
            {/* Rule 10.3.6: Content from original I) COMPARISON TABLE section. */}
            <section className="py-24 lg:py-32 bg-[#FAF9F6]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Analisis Biaya</span>
                        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-6 font-heading">Virtual Office vs Kantor Fisik</h2>
                    </div>
                    <div className="max-w-4xl mx-auto overflow-hidden border border-primary/5 shadow-2xl rounded-3xl">
                        <table className="w-full text-left font-sans">
                            <thead>
                                <tr className="bg-primary text-white">
                                    <th className="p-8 font-bold text-xs uppercase tracking-widest">Aspek</th>
                                    <th className="p-8 font-bold text-xs uppercase tracking-widest text-accent italic">Virtual Office</th>
                                    <th className="p-8 font-bold text-xs uppercase tracking-widest opacity-70">Kantor Fisik</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-primary/5 font-medium">
                                <tr>
                                    <td className="p-8 text-primary bg-bg-paper font-bold uppercase text-[10px] tracking-widest">Biaya/bulan</td>
                                    <td className="p-8 text-primary font-bold italic">Rp 250rb - 917rb</td>
                                    <td className="p-8 text-charcoal/60">Rp 2jt - 8jt+</td>
                                </tr>
                                <tr>
                                    <td className="p-8 text-primary bg-bg-paper font-bold uppercase text-[10px] tracking-widest">Setup cost</td>
                                    <td className="p-8 text-primary font-bold italic">Rp 0</td>
                                    <td className="p-8 text-charcoal/60">Rp 0 (all-inclusive)</td>
                                </tr>
                                <tr>
                                    <td className="p-8 text-primary bg-bg-paper font-bold uppercase text-[10px] tracking-widest">Untuk PKP</td>
                                    <td className="p-8 text-primary font-bold italic">✅ Bisa (KBLI Jasa)</td>
                                    <td className="p-8 text-charcoal/60">✅ Bisa (Semua KBLI)</td>
                                </tr>
                                <tr>
                                    <td className="p-8 text-primary bg-bg-paper font-bold uppercase text-[10px] tracking-widest">Kontrak Min. PKP</td>
                                    <td className="p-8 text-primary font-bold italic">Mulai 3 Bln</td>
                                    <td className="p-8 text-charcoal/60">1 tahun (KBLI Selain Jasa)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 7. FAQ (Max 6) */}
            {/* Rule 10.3.7: Top 6 decision-blocker FAQs from original J) section. */}
            <section className="py-24 lg:py-40 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4 text-center">FAQ</span>
                        <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-6 font-heading">Pertanyaan yang Sering Diajukan</h2>
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
                                q: "Apakah bisa upgrade dari Virtual Office ke Service Office?",
                                a: "Ya. Banyak klien kami memulainya dengan Virtual Office dan upgrade ke Service Office saat tim bertambah. Proses upgrade fleksibel dan tanpa penalty."
                            }
                        ].map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border border-primary/10 px-8 rounded-2xl group data-[state=open]:border-accent transition-all">
                                <AccordionTrigger className="text-left font-bold text-primary hover:text-accent hover:no-underline py-6">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-charcoal/70 leading-relaxed pb-8 font-light text-base">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* 8. FINAL CTA BLOCK */}
            {/* Rule 10.3.8: Content from original K) FINAL FORM section. */}
            <section className="py-24 lg:py-40 bg-primary relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md p-16 lg:p-24 border border-white/10 rounded-[3rem]">
                        <h2 className="text-4xl lg:text-7xl font-bold text-white mb-10 font-heading leading-tight underline decoration-accent/30 underline-offset-8 italic">
                            Mulai Bisnis Anda <br />dari Jakarta Selatan
                        </h2>
                        <p className="text-xl text-white/70 mb-16 font-light max-w-2xl mx-auto leading-relaxed">
                            Dapatkan alamat bisnis resmi Jakarta Selatan untuk pendirian PT/CV Non-PKP tanpa komitmen sewa kantor fisik.
                        </p>
                        <Button
                            className="bg-accent text-white hover:bg-white hover:text-primary px-16 py-8 text-base font-bold uppercase tracking-widest rounded-none h-auto transition-all duration-500 shadow-3xl shadow-accent/20"
                            asChild
                        >
                            <a href={waUrl}>
                                <MessageCircle className="w-6 h-6 mr-3" /> Konsultasi Virtual Office Sekarang
                            </a>
                        </Button>
                        <p className="mt-12 text-white/40 text-[9px] font-bold uppercase tracking-[0.3em]">
                            Domisili Kredibel · Sejak 2007 · Dukungan Legalitas
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
