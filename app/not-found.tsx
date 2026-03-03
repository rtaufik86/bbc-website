'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Building2, MapPin, Gavel, MessageCircle, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * BBC Custom 404 Page - Production Ready v1.1
 * Purpose: SEO Recovery + Conversion Redirection
 * Status: 🔒 PRODUCTION IMPLEMENTATION
 */
export default function NotFound() {
    // Analytics Tracking - Identifying broken paths
    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'page_404_view', {
                requested_path: window.location.pathname,
                referrer: document.referrer
            });
        }
    }, [])

    return (
        <main className="min-h-screen bg-[#FAFAF8] text-[#0F1E33] font-sans">
            <title>Halaman Tidak Ditemukan | Bintaro Business Centre</title>
            <meta name="robots" content="noindex, follow" />

            {/* HERO SECTION */}
            <section className="pt-32 pb-16 lg:pt-48 lg:pb-24 px-6 text-center">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl lg:text-7xl font-bold mb-8 font-heading text-primary leading-tight">
                        Halaman Tidak Ditemukan
                    </h1>
                    <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        Tautan yang Anda akses tidak tersedia. Kami bantu Anda menemukan layanan yang tepat.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[#0F1E33] font-bold hover:text-[#B08B3E] transition-all group uppercase tracking-widest text-xs"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Kembali ke Beranda
                    </Link>
                </div>
            </section>

            {/* PRIMARY REDIRECTION BLOCK */}
            <section className="py-24 lg:py-32 px-6 bg-white border-y border-slate-100">
                <div className="container mx-auto max-w-6xl">
                    <span className="block text-center text-[#B08B3E] font-bold uppercase tracking-[0.4em] text-[10px] mb-16">
                        Layanan Utama Kami
                    </span>
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {/* Card 1 — Sewa Kantor */}
                        <div className="group bg-[#FAFAF8] p-12 border border-slate-100 hover:border-[#B08B3E] hover:shadow-2xl transition-all duration-500 flex flex-col h-full rounded-none">
                            <Building2 className="w-12 h-12 text-[#0F1E33] mb-8 group-hover:text-[#B08B3E] transition-colors" />
                            <h3 className="text-2xl font-bold mb-6 font-heading">Sewa Kantor</h3>
                            <p className="text-slate-500 text-sm mb-10 leading-relaxed flex-grow font-light">
                                Ruang kerja profesional dengan alamat resmi Jakarta Selatan — siap operasional, tanpa repot setup.
                            </p>
                            <Button className="w-full bg-[#B08B3E] text-white hover:bg-[#8F6F2E] rounded-none py-6 font-bold uppercase tracking-widest text-[10px] h-auto shadow-xl transition-all" asChild>
                                <Link href="/sewa-kantor">
                                    Lihat Unit & Harga <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>

                        {/* Card 2 — Virtual Office */}
                        <div className="group bg-[#FAFAF8] p-12 border border-slate-100 hover:border-[#B08B3E] hover:shadow-2xl transition-all duration-500 flex flex-col h-full rounded-none">
                            <MapPin className="w-12 h-12 text-[#0F1E33] mb-8 group-hover:text-[#B08B3E] transition-colors" />
                            <h3 className="text-2xl font-bold mb-6 font-heading">Virtual Office</h3>
                            <p className="text-slate-500 text-sm mb-10 leading-relaxed flex-grow font-light">
                                Alamat bisnis prestisius di Jakarta Selatan untuk PKP, NPWP, dan legalitas perusahaan.
                            </p>
                            <Button className="w-full bg-[#B08B3E] text-white hover:bg-[#8F6F2E] rounded-none py-6 font-bold uppercase tracking-widest text-[10px] h-auto shadow-xl transition-all" asChild>
                                <Link href="/virtual-office">
                                    Lihat Paket Virtual Office <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>

                        {/* Card 3 — Pendirian PT */}
                        <div className="group bg-[#FAFAF8] p-12 border border-slate-100 hover:border-[#B08B3E] hover:shadow-2xl transition-all duration-500 flex flex-col h-full rounded-none">
                            <Shield className="w-12 h-12 text-[#0F1E33] mb-8 group-hover:text-[#B08B3E] transition-colors" />
                            <h3 className="text-2xl font-bold mb-6 font-heading">Pendirian PT</h3>
                            <p className="text-slate-500 text-sm mb-10 leading-relaxed flex-grow font-light">
                                Dari akta notaris hingga NIB aktif — pendirian perusahaan lengkap dengan alamat domisili yang lolos verifikasi OSS.
                            </p>
                            <Button className="w-full bg-[#B08B3E] text-white hover:bg-[#8F6F2E] rounded-none py-6 font-bold uppercase tracking-widest text-[10px] h-auto shadow-xl transition-all" asChild>
                                <Link href="/legal/pendirian-pt-jakarta-selatan">
                                    Konsultasi Legalitas <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>



            {/* FINAL ACTION BLOCK */}
            <section className="py-32 px-6 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#0F1E33] mb-8 font-heading">
                        Butuh Bantuan Langsung?
                    </h2>
                    <p className="text-xl text-slate-500 mb-16 max-w-xl mx-auto leading-relaxed font-light">
                        Diskusikan kebutuhan kantor atau alamat bisnis Anda langsung dengan tim kami.
                    </p>
                    <Button className="bg-[#B08B3E] text-white hover:bg-[#8F6F2E] px-16 py-8 rounded-none font-bold uppercase tracking-widest text-sm h-auto shadow-[0_20px_50px_rgba(176,139,62,0.3)] transition-all duration-500" asChild>
                        <a href="https://wa.me/6281311778036?text=Hallo,%20saya%20mengakses%20halaman%20yang%20tidak%20tersedia%20dan%20butuh%20bantuan." target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-6 h-6 mr-3" /> Chat via WhatsApp Sekarang
                        </a>
                    </Button>
                </div>
            </section>
        </main>
    )
}
