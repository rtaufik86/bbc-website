'use client'

import React from 'react'
import Link from 'next/link'
import { Building2, MapPin, MousePointer2, ArrowRight } from 'lucide-react'

interface SiloLink {
    title: string
    href: string
}

interface SiloGroup {
    title: string
    links: SiloLink[]
    icon: React.ReactNode
}

const silos: SiloGroup[] = [
    {
        title: "Silo Sewa Kantor (Bintaro Focus)",
        icon: <Building2 className="w-5 h-5 text-accent" />,
        links: [
            { title: "Sewa Kantor Bintaro", href: "/sewa-kantor/bintaro" },
            { title: "Kantor Dekat Bintaro Jaya", href: "/kantor-dekat-bintaro-jaya" },
            { title: "Kantor Dekat Tol Veteran", href: "/kantor-dekat-tol-veteran" },
            { title: "Harga Sewa Kantor Bintaro", href: "/harga-sewa-kantor-bintaro" }
        ]
    },
    {
        title: "Silo Virtual Office (Jaksel Focus)",
        icon: <MapPin className="w-5 h-5 text-accent" />,
        links: [
            { title: "Virtual Office Jakarta Selatan", href: "/virtual-office-jakarta-selatan" },
            { title: "Virtual Office Bintaro", href: "/virtual-office-bintaro" },
            { title: "Alamat Bisnis Jakarta Selatan", href: "/alamat-bisnis-jakarta-selatan" },
            { title: "Legalitas & Domisili Resmi", href: "/legal" }
        ]
    }
]

export default function SiloNavigation() {
    return (
        <section className="py-20 bg-bg-paper border-y border-primary/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Akses Cepat</span>
                    <h2 className="text-3xl font-bold text-primary font-heading uppercase tracking-wider">Jelajahi Solusi Berdasarkan Lokasi</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {silos.map((silo, i) => (
                        <div key={i} className="bg-white p-8 border border-primary/5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                {silo.icon}
                                <h3 className="font-bold text-primary text-sm uppercase tracking-widest">{silo.title}</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {silo.links.map((link, j) => (
                                    <Link 
                                        key={j} 
                                        href={link.href}
                                        className="flex items-start gap-2 group text-charcoal/70 hover:text-accent transition-colors"
                                    >
                                        <MousePointer2 className="w-3 h-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="text-xs font-medium leading-tight">{link.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-12 text-center">
                    <Link 
                        href="/sewa-kantor" 
                        className="inline-flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.3em] hover:text-accent transition-colors group"
                    >
                        Lihat Semua Layanan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
