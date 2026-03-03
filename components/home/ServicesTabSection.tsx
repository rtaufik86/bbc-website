'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

// Services Data matching the new interactive design
const services = [
    {
        id: 'serviced-office',
        label: 'SERVICED OFFICE',
        title: 'Serviced Office',
        description: 'Kantor private fully furnished siap digunakan hari pertama. Tanpa biaya setup, tanpa instalasi internet, tanpa beli furnitur — langsung operasional dengan internet bisnis stabil hingga 100 Mbps, listrik unlimited, AC, dan resepsionis profesional.',
        benefits: [
            'Tersedia lebih dari 70 unit di berbagai ukuran',
            'Akses ruangan hingga pukul 20.00',
            'Dukungan resepsionis profesional di jam operasional'
        ],
        image: '/images/private-office/bbc-private-office-suite-sofa-01.jpg.JPG',
        link: '/sewa-kantor',
        cta: 'Lihat Ketersediaan Ruangan'
    },
    {
        id: 'virtual-office',
        label: 'VIRTUAL OFFICE',
        title: 'Virtual Office',
        description: 'Alamat legal Jakarta Selatan untuk bisnis Anda tanpa ruang fisik. Termasuk mail handling profesional, surat resmi atas nama perusahaan, dan dukungan administrasi untuk pengajuan PKP dan izin usaha.',
        benefits: [
            'Alamat bisnis terdaftar di Jakarta Selatan (Pesanggrahan)',
            'Surat keterangan domisili untuk keperluan legal',
            'Layanan penerusan surat'
        ],
        image: '/images/private-office/bbc-private-office-suite-workdesk-01.jpg.JPG',
        link: '/virtual-office',
        cta: 'Pelajari Paket Virtual Office'
    },
    {
        id: 'legal-services',
        label: 'LEGAL SERVICES',
        title: 'Layanan Legal & Administrasi',
        description: 'Bintaro Business Centre menyediakan pengurusan PT, CV, izin usaha, PKP, dan kebutuhan legal perusahaan lainnya. Proses cepat dengan alamat Jakarta Selatan yang sudah terdaftar.',
        benefits: [
            'Pendirian PT, CV, dan PMA dengan alamat legal Jakarta Selatan',
            'Pengurusan NIB, SIUP, dan izin operasional',
            'Konsultasi gratis untuk kebutuhan legalitas bisnis'
        ],
        image: '/images/private-office/bbc-private-office-suite-wide-01.jpg.JPG',
        link: '/legal/pendirian-pt-jakarta-selatan',
        cta: 'Konsultasi Legal Gratis'
    }
]

export default function ServicesTabSection() {
    const [activeServiceId, setActiveServiceId] = useState(services[0].id)
    const [isTransitioning, setIsTransitioning] = useState(false)

    const activeService = services.find(s => s.id === activeServiceId) || services[0]

    const handleTabClick = (id: string) => {
        if (id === activeServiceId) return;
        setIsTransitioning(true)
        setTimeout(() => {
            setActiveServiceId(id)
            setIsTransitioning(false)
        }, 300) // Transition duration matches CSS
    }

    return (
        <section id="solusi" className="py-32 bg-bg-paper">
            <div className="container mx-auto px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">EKSKLUSIVITAS</span>
                    <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-primary font-heading">Layanan Profesional Kami</h2>
                    <p className="text-charcoal/60 mt-4 font-light max-w-2xl mx-auto">
                        Eksplorasi rangkaian solusi kantor kami yang dirancang untuk efisiensi bisnis Anda.
                    </p>
                </div>

                {/* Interactive Content Area */}
                <div className="bg-white border-t-2 border-accent shadow-sm min-h-[800px] flex flex-col relative overflow-hidden">

                    {/* Content Area with SEO-friendly rendering (all items in DOM) */}
                    <div className="relative flex-grow flex flex-col justify-center">
                        {services.map((service, index) => {
                            const isActive = activeServiceId === service.id;
                            return (
                                <div
                                    key={service.id}
                                    className={`
                                        w-full transition-opacity duration-500 grid lg:grid-cols-2 gap-12 items-center
                                        ${isActive
                                            ? 'relative opacity-100 z-10'
                                            : 'absolute top-0 left-0 h-full opacity-0 pointer-events-none z-0'
                                        }
                                    `}
                                    aria-hidden={!isActive}
                                >

                                    {/* Left: Image (Square Format) */}
                                    <div className="relative p-8 lg:p-16 h-full flex flex-col justify-center">
                                        <div className="relative w-full aspect-square overflow-hidden bg-primary/5 shadow-2xl skew-y-0">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover transition-transform duration-700 hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                priority={index === 0}
                                            />
                                        </div>
                                    </div>

                                    {/* Right: Content */}
                                    <div className="p-8 lg:p-16 lg:pl-0 flex flex-col justify-center h-full">


                                        <h3 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-primary font-heading mb-8">
                                            {service.title}
                                        </h3>
                                        <p className="text-charcoal/70 text-lg leading-relaxed font-light mb-10 max-w-lg">
                                            {service.description}
                                        </p>

                                        {/* Benefits List */}
                                        <ul className="space-y-5 mb-12">
                                            {service.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-4">
                                                    <div className="rounded-full bg-accent/10 p-1 mt-0.5">
                                                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                                                    </div>
                                                    <span className="text-charcoal/80 text-base font-medium">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href={service.link}
                                            className="inline-flex items-center gap-3 text-accent text-xs font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors group self-start border-b border-accent/30 pb-1"
                                            tabIndex={isActive ? 0 : -1}
                                        >
                                            {service.cta}
                                            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Bottom Navigation Tabs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 border-t border-primary/5 divide-x divide-primary/5">
                        {services.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => handleTabClick(service.id)}
                                className={`py-6 px-4 text-[10px] uppercase font-bold tracking-[0.15em] transition-all duration-300 hover:bg-primary/5
                                    ${activeServiceId === service.id
                                        ? 'text-accent bg-primary/5 shadow-[inset_0_-2px_0_0_#AB882E]'
                                        : 'text-primary/40 hover:text-primary'
                                    }`}
                            >
                                {service.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
