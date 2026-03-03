import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Button } from '@/components/ui/button'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import ServicesTabSection from '@/components/home/ServicesTabSection'
import {
    Quote,
    ArrowRight,
    Check,
    MapPin,
    Phone,
    Mail,
    Clock,
    Share2,
    Globe,
    Building2,
    Key,
    CreditCard,
    Train,
    Car,
    Building,
    ArrowUpRight
} from 'lucide-react'

// Dummy Data for Testimonials (Replicating components/shared/Testimonials content but with new design)
const testimonials = [
    {
        name: 'Andi Wijaya',
        company: 'TECHFLOW SOLUTION',
        title: 'CEO',
        quote: 'BBC telah menjadi rumah bagi startup kami selama 3 tahun. Fasilitasnya sangat terawat dan tim manajemennya sangat responsif terhadap kebutuhan kami.',
        avatar: '/images/private-office/bbc-private-office-suite-wide-01.jpg.JPG' // Placeholder, using available image
    },
    {
        name: 'Sarah Devina',
        company: 'CREATIVE MINDS',
        title: 'FOUNDER',
        quote: 'Layanan Virtual Office-nya sangat membantu bisnis konsultan saya memiliki image yang profesional tanpa harus menyewa kantor fisik setiap hari.',
        avatar: '/images/private-office/bbc-private-office-suite-sofa-01.jpg.JPG' // Placeholder
    }
]

export const metadata: Metadata = {
    alternates: { canonical: '/' },
    title: 'Bintaro Business Centre – Serviced Office & Virtual Office Jakarta Selatan Sejak 2007',
    description: 'Bintaro Business Centre menyediakan serviced office, virtual office, dan layanan legal di Pesanggrahan, Jakarta Selatan sejak 2007. Alamat Jakarta Selatan untuk PKP dan izin usaha. Konsultasi gratis.',
    keywords: ['bintaro business centre', 'serviced office jakarta selatan', 'virtual office jakarta selatan', 'kantor jakarta selatan', 'sewa kantor bintaro', 'alamat legal jakarta selatan', 'pkp jakarta selatan', 'pesanggrahan', 'business centre pesanggrahan'],
    openGraph: {
        title: 'Bintaro Business Centre – Serviced Office & Virtual Office Jakarta Selatan Sejak 2007',
        description: 'Bintaro Business Centre menyediakan serviced office, virtual office, dan layanan legal di Pesanggrahan, Jakarta Selatan sejak 2007. Alamat Jakarta Selatan untuk PKP dan izin usaha.',
        images: ['/images/hero-home.jpg']
    }
}

export default function HomePage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://www.bintarobusinesscentre.com/#organization",
                "name": "Bintaro Business Centre",
                "alternateName": ["Bintaro Business Center", "BBC"],
                "url": "https://www.bintarobusinesscentre.com/",
                "logo": "https://www.bintarobusinesscentre.com/images/logo.png",
                "email": "info@bintarobusinesscentre.com",
                "telephone": "(021) 736-2639",
            },
            {
                "@type": ["LocalBusiness", "ProfessionalService"],
                "@id": "https://www.bintarobusinesscentre.com/#localbusiness",
                "name": "Bintaro Business Centre",
                "url": "https://www.bintarobusinesscentre.com/",
                "image": [
                    "https://www.bintarobusinesscentre.com/images/hero-home.jpg"
                ],
                "telephone": "(021) 7362639",
                "email": "info@bintarobusinesscentre.com",
                "priceRange": "$$",
                "foundingDate": "2007",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Jl. RC. Veteran Raya No.1i, RT.1/RW.3, Bintaro",
                    "addressLocality": "Pesanggrahan",
                    "addressRegion": "Jakarta Selatan",
                    "postalCode": "12330",
                    "addressCountry": "ID"
                },
                "areaServed": [
                    {
                        "@type": "AdministrativeArea",
                        "name": "Jakarta Selatan"
                    },
                    {
                        "@type": "Place",
                        "name": "Bintaro"
                    }
                ],
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                        "opens": "09:00",
                        "closes": "17:00"
                    },
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Saturday", "Sunday"],
                        "opens": "09:00",
                        "closes": "15:00"
                    }
                ],
                "parentOrganization": {
                    "@id": "https://www.bintarobusinesscentre.com/#organization"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": -6.2721988,
                    "longitude": 106.7622405
                },
                "hasMap": "https://www.google.com/maps/place/Bintaro+Business+Centre/@-6.2721988,106.7622405,17z"
            },
            {
                "@type": "WebSite",
                "@id": "https://www.bintarobusinesscentre.com/#website",
                "url": "https://www.bintarobusinesscentre.com/",
                "name": "Bintaro Business Centre",
                "publisher": {
                    "@id": "https://www.bintarobusinesscentre.com/#organization"
                },
                "inLanguage": "id-ID"
            },
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/#webpage",
                "url": "https://www.bintarobusinesscentre.com/",
                "name": "Bintaro Business Centre – Serviced Office & Virtual Office Jakarta Selatan",
                "description": "Bintaro Business Centre menyediakan serviced office, virtual office, dan layanan legal di Pesanggrahan, Jakarta Selatan sejak 2007. Alamat Jakarta Selatan untuk PKP dan izin usaha. Konsultasi gratis.",
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" },
                "about": { "@id": "https://www.bintarobusinesscentre.com/#localbusiness" },
                "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "@id": "https://www.bintarobusinesscentre.com/#primaryimage",
                    "url": "https://www.bintarobusinesscentre.com/images/hero-home.jpg"
                },
                "inLanguage": "id-ID",
                "breadcrumb": { "@id": "https://www.bintarobusinesscentre.com/#breadcrumb" }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://www.bintarobusinesscentre.com/#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.bintarobusinesscentre.com/"
                    }
                ]
            },
            {
                "@type": "ItemList",
                "@id": "https://www.bintarobusinesscentre.com/#services",
                "name": "Layanan Bintaro Business Centre",
                "itemListElement": [
                    {
                        "@type": "Service",
                        "@id": "https://www.bintarobusinesscentre.com/#service-serviced-office",
                        "name": "Serviced Office",
                        "serviceType": "Serviced Office",
                        "provider": { "@id": "https://www.bintarobusinesscentre.com/#localbusiness" },
                        "areaServed": { "@type": "AdministrativeArea", "name": "Jakarta Selatan" },
                        "url": "https://www.bintarobusinesscentre.com/sewa-kantor",
                        "description": "Kantor private fully furnished siap digunakan hari pertama dengan internet bisnis, listrik, AC, dan resepsionis profesional."
                    },
                    {
                        "@type": "Service",
                        "@id": "https://www.bintarobusinesscentre.com/#service-virtual-office",
                        "name": "Virtual Office Jakarta Selatan",
                        "serviceType": "Virtual Office",
                        "provider": { "@id": "https://www.bintarobusinesscentre.com/#localbusiness" },
                        "areaServed": { "@type": "AdministrativeArea", "name": "Jakarta Selatan" },
                        "url": "https://www.bintarobusinesscentre.com/virtual-office",
                        "description": "Alamat legal Jakarta Selatan tanpa ruang fisik, termasuk mail handling dan dukungan administrasi untuk kebutuhan bisnis."
                    },
                    {
                        "@type": "Service",
                        "@id": "https://www.bintarobusinesscentre.com/#service-legal",
                        "name": "Layanan Legal & Perizinan",
                        "serviceType": "Business Legal Services",
                        "provider": { "@id": "https://www.bintarobusinesscentre.com/#localbusiness" },
                        "areaServed": { "@type": "AdministrativeArea", "name": "Jakarta Selatan" },
                        "url": "https://www.bintarobusinesscentre.com/legal/pendirian-pt-jakarta-selatan",
                        "description": "Pengurusan PT, CV, izin usaha, PKP, dan kebutuhan legal perusahaan lainnya."
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "@id": "https://www.bintarobusinesscentre.com/#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "@id": "https://www.bintarobusinesscentre.com/#q1",
                        "name": "Apa itu serviced office di Jakarta Selatan?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Serviced office adalah ruang kantor fully furnished yang siap pakai dengan fasilitas lengkap seperti internet, listrik, resepsionis, dan maintenance. Bintaro Business Centre menyediakan serviced office di Pesanggrahan, Jakarta Selatan untuk kebutuhan administrasi bisnis."
                        }
                    },
                    {
                        "@type": "Question",
                        "@id": "https://www.bintarobusinesscentre.com/#q2",
                        "name": "Apa perbedaan virtual office dan kantor fisik?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Virtual office memberikan alamat legal Jakarta Selatan tanpa ruang fisik dan cocok untuk bisnis yang tidak memerlukan kantor tetap. Serviced office memberikan ruang kantor private dengan fasilitas lengkap. Bintaro Business Centre menyediakan kedua solusi sesuai kebutuhan bisnis."
                        }
                    },
                    {
                        "@type": "Question",
                        "@id": "https://www.bintarobusinesscentre.com/#q3",
                        "name": "Apakah alamat Bintaro Business Centre terdaftar sebagai Jakarta Selatan?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ya. Bintaro Business Centre berlokasi di Pesanggrahan, Jakarta Selatan 12330—bukan Tangerang Selatan—dan dapat digunakan untuk kebutuhan administrasi bisnis yang mensyaratkan domisili Jakarta."
                        }
                    },
                    {
                        "@type": "Question",
                        "@id": "https://www.bintarobusinesscentre.com/#q4",
                        "name": "Apa saja fasilitas yang termasuk dalam serviced office?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Fasilitas serviced office Bintaro Business Centre mencakup furnitur, internet bisnis, listrik, AC, kebersihan, resepsionis, dan maintenance rutin. Cakupan fasilitas dapat berbeda berdasarkan paket dan ketersediaan."
                        }
                    },
                    {
                        "@type": "Question",
                        "@id": "https://www.bintarobusinesscentre.com/#q5",
                        "name": "Bagaimana cara menggunakan virtual office untuk pengajuan PKP?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Virtual office Bintaro Business Centre menyediakan alamat legal Jakarta Selatan dan dukungan administrasi yang diperlukan untuk membantu proses pengajuan PKP sesuai ketentuan yang berlaku."
                        }
                    }
                ]
            }
        ]
    }

    return (
        <div className="bg-white text-charcoal selection:bg-accent/30 font-sans">
            <Script
                id="bbc-home-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd)
                }}
            />

            {/* HERO SECTION */}
            <section className="relative flex flex-col md:min-h-[85vh] md:flex-row md:items-center md:justify-center pt-24 md:pt-20 bg-bg-paper overflow-hidden">
                {/* Desktop Background (Hidden on Mobile usually, or kept as subtle pattern) */}
                <div className="absolute inset-0 z-0 opacity-0 md:opacity-0 overflow-hidden">
                    <Image
                        src="/images/lobby/bbc-lobby-front-01.jpg.JPG"
                        alt="Background Pattern"
                        fill
                        className="object-cover grayscale"
                    />
                </div>

                {/* Mobile-Only Full Width Image */}
                <div className="w-full relative aspect-[4/3] md:hidden mb-8">
                    <Image
                        src="/images/lobby/bbc-lobby-front-01.jpg.JPG"
                        alt="Bintaro Business Centre Lobby"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center max-w-6xl pb-8 md:pb-0">
                    <span className="inline-block text-accent font-semibold text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 md:mb-8">Berdiri Sejak 2007</span>

                    {/* DESKTOP HEADLINE */}
                    <h1 className="hidden md:block text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-primary leading-[1.1] mb-8 font-heading">
                        Bintaro Business Centre <br />
                        Serviced Office & Virtual Office Jakarta Selatan
                    </h1>

                    {/* MOBILE HEADLINE - OPTIMIZED */}
                    <h1 className="md:hidden text-[clamp(1.75rem,8vw,2.5rem)] font-bold text-primary leading-[1.2] mb-4 font-heading">
                        Bintaro Business Centre <br />
                        Serviced & Virtual Office <br />
                        Jakarta Selatan
                    </h1>

                    {/* SUBHEADLINE */}
                    <p className="text-[clamp(0.875rem,2vw,1.125rem)] text-charcoal/70 mb-8 md:mb-12 leading-relaxed max-w-4xl mx-auto font-light">
                        Bintaro Business Centre menyediakan serviced office, virtual office, dan layanan legal di Pesanggrahan, Jakarta Selatan sejak 2007. Dengan alamat administratif Jakarta Selatan — bukan Tangerang Selatan — kami memberikan solusi kantor profesional untuk bisnis yang membutuhkan kredibilitas legal dan operasional tanpa kompleksitas.
                    </p>

                    {/* CTA BUTTONS - Adjusted for mobile touch targets */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-8 md:mb-20">
                        <Button
                            className="px-8 py-4 md:px-10 md:py-7 h-auto w-full sm:w-auto"
                            asChild
                        >
                            <Link href="#solusi">Jelajahi Solusi Kami</Link>
                        </Button>
                    </div>

                    {/* TRUST INDICATORS - Adjusted grid for mobile */}
                    <div className="grid grid-cols-3 gap-2 md:gap-12 border-t border-primary/10 pt-6 md:pt-12 max-w-4xl mx-auto">
                        <div className="flex flex-col items-center gap-1 md:gap-2">
                            <span className="text-accent text-[10px] md:text-sm font-bold uppercase tracking-widest">Pengalaman</span>
                            <p className="text-primary font-medium text-xs md:text-sm">Sejak 2007</p>
                        </div>
                        <div className="flex flex-col items-center gap-1 md:gap-2">
                            <span className="text-accent text-[10px] md:text-sm font-bold uppercase tracking-widest">Kapasitas</span>
                            <p className="text-primary font-medium text-xs md:text-sm">70+ Ruang</p>
                        </div>
                        <div className="flex flex-col items-center gap-1 md:gap-2 hidden md:flex">
                            <span className="text-accent text-[10px] md:text-sm font-bold uppercase tracking-widest">Klien</span>
                            <p className="text-primary font-medium text-xs md:text-sm">500+ Klien Puas</p>
                        </div>
                        <div className="flex flex-col items-center gap-1 md:gap-2 md:hidden">
                            <span className="text-accent text-[10px] md:text-sm font-bold uppercase tracking-widest">Klien</span>
                            <p className="text-primary font-medium text-xs md:text-sm">500+</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT / PARTNER SECTION */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-8">
                    <div className="grid lg:grid-cols-12 gap-20 items-center">
                        <div className="lg:col-span-5">
                            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-6">Tentang BBC</span>
                            <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-primary mb-8 leading-tight font-heading">Partner Terpercaya Bisnis Anda Sejak 2007</h2>
                            <div className="space-y-6 text-charcoal/80 leading-relaxed font-light mb-12">
                                <p>
                                    Bintaro Business Centre adalah business centre di Pesanggrahan, Jakarta Selatan yang melayani lebih dari 500 klien sejak 2007. Kami menyediakan solusi terintegrasi untuk bisnis yang membutuhkan kredibilitas administratif tanpa kompleksitas operasional.
                                </p>
                                <p>
                                    Dari startup hingga kantor perwakilan, perusahaan mempercayai <Link href="/sewa-kantor">serviced office Bintaro Business Centre</Link> sebagai solusi ruang kerja profesional mereka. Untuk bisnis yang membutuhkan alamat legal tanpa ruang fisik, <Link href="/virtual-office">virtual office Jakarta Selatan</Link> kami menjadi pilihan hemat biaya dengan dukungan administrasi PKP dan izin usaha. Layanan pendirian PT kami juga memberikan kemudahan legalitas sejak hari pertama.
                                </p>
                                <p>
                                    Dengan alamat Jakarta Selatan, Bintaro Business Centre memberikan keunggulan untuk pengajuan PKP, izin usaha, dan keperluan legalitas yang mensyaratkan domisili Jakarta.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-px bg-primary/10 border border-primary/10">
                                <div className="bg-white p-8">
                                    <p className="text-3xl font-bold text-primary mb-1 font-serif">17+</p>
                                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Tahun Pengalaman</p>
                                </div>
                                <div className="bg-white p-8">
                                    <p className="text-3xl font-bold text-primary mb-1 font-serif">70+</p>
                                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Ruang Kantor</p>
                                </div>
                                <div className="bg-white p-8">
                                    <p className="text-3xl font-bold text-primary mb-1 font-serif">500+</p>
                                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Klien Puas</p>
                                </div>
                                <div className="bg-white p-8">
                                    <p className="text-3xl font-bold text-primary mb-1 font-serif">Jaksel</p>
                                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Alamat Resmi</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7 relative">
                            <div className="aspect-[4/5] overflow-hidden shadow-[20px_20px_0px_0px_rgba(26,42,64,0.05)] relative">
                                <Image
                                    src="/images/private-office/bbc-private-office-suite-wide-01.jpg.JPG"
                                    alt="Modern Workspace"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-10 -left-10 bg-primary p-12 text-white max-w-sm hidden xl:block">
                                <Quote className="text-accent mb-4 w-10 h-10" />
                                <p className="font-display italic text-lg leading-relaxed">"Kami menyediakan lebih dari sekadar ruang; kami menyediakan ekosistem untuk sukses."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES SECTION */}
            <ServicesTabSection />

            {/* WHY CHOOSE US */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-8">
                    <div className="text-center max-w-3xl mx-auto mb-24">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Keunggulan</span>
                        <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-primary mb-6 font-heading">Mengapa Perusahaan Memilih Bintaro Business Centre</h2>
                        <p className="text-charcoal/60 font-light text-lg">Perusahaan memilih Bintaro Business Centre karena alamat Jakarta Selatan, fasilitas siap pakai, dan struktur biaya transparan.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-16">
                        <div className="text-center group">
                            <div className="mb-10 inline-block p-6 border border-primary/10 group-hover:border-accent transition-colors">
                                <Building2 className="w-12 h-12 text-primary group-hover:text-accent transition-colors" strokeWidth={1} />
                            </div>
                            <h4 className="text-xl font-bold mb-6 text-primary">Alamat Jakarta Selatan</h4>
                            <p className="text-charcoal/70 leading-relaxed font-light text-sm">
                                Berlokasi di Pesanggrahan, Jakarta Selatan — bukan Tangerang Selatan — Bintaro Business Centre memberikan alamat legal yang memenuhi syarat untuk pengajuan PKP, izin usaha tertentu, dan keperluan administrasi yang mensyaratkan domisili Jakarta.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="mb-10 inline-block p-6 border border-primary/10 group-hover:border-accent transition-colors">
                                <Key className="w-12 h-12 text-primary group-hover:text-accent transition-colors" strokeWidth={1} />
                            </div>
                            <h4 className="text-xl font-bold mb-6 text-primary">Siap Pakai, Tanpa Repot</h4>
                            <p className="text-charcoal/70 leading-relaxed font-light text-sm">
                                Semua fasilitas sudah tersedia dan terintegrasi: furnitur ergonomis, internet bisnis hingga 100 Mbps, listrik unlimited, AC sentral, kebersihan harian, dan resepsionis profesional. Anda fokus ke bisnis, Bintaro Business Centre urus semua kebutuhan operasional kantor.
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="mb-10 inline-block p-6 border border-primary/10 group-hover:border-accent transition-colors">
                                <CreditCard className="w-12 h-12 text-primary group-hover:text-accent transition-colors" strokeWidth={1} />
                            </div>
                            <h4 className="text-xl font-bold mb-6 text-primary">Harga Transparan, Tanpa Biaya Tersembunyi</h4>
                            <p className="text-charcoal/70 leading-relaxed font-light text-sm">
                                Semua biaya sudah termasuk dalam harga sewa: listrik, internet hingga 100 Mbps, kebersihan harian, resepsionis, dan maintenance rutin. Tidak ada tagihan listrik mengejutkan di akhir bulan, tidak ada biaya internet terpisah, tidak ada hidden cost.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* LOCATION SECTION — PRESTIGE BLOCK */}
            <section className="py-32 bg-primary text-white overflow-hidden">
                <div className="container mx-auto px-8">
                    <div className="grid lg:grid-cols-12 gap-20 xl:gap-32 items-center">
                        {/* LEFT: STRATEGIC POSITIONING */}
                        <div className="lg:col-span-5">
                            <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] block mb-10">Strategic Positioning</span>
                            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold mb-10 leading-[1.1] font-heading text-white">
                                Lokasi Strategis di Koridor Selatan Jakarta
                            </h2>
                            <p className="text-white/70 font-medium text-lg mb-20 leading-relaxed max-w-lg">
                                Berlokasi di Pesanggrahan, Jakarta Selatan, Bintaro Business Centre berada di koridor strategis yang menghubungkan Pondok Indah, Bintaro, dan akses utama tol Jakarta.
                            </p>

                            {/* DISTANCE HIGHLIGHTS — TWO-TIER HIERARCHY */}
                            <div className="space-y-20">
                                {/* MAIN HIGHLIGHTS */}
                                <div className="space-y-12">
                                    <div>
                                        <div className="text-5xl md:text-6xl font-bold text-white mb-2 leading-none tracking-tight">1.6 km</div>
                                        <div className="text-[10px] text-accent font-bold uppercase tracking-[0.25em] opacity-80">Pintu Tol Veteran</div>
                                    </div>
                                    <div>
                                        <div className="text-5xl md:text-6xl font-bold text-white mb-2 leading-none tracking-tight">±3 km</div>
                                        <div className="text-[10px] text-accent font-bold uppercase tracking-[0.25em] opacity-80">Kawasan Pondok Indah</div>
                                    </div>
                                    <div>
                                        <div className="text-5xl md:text-6xl font-bold text-white mb-2 leading-none tracking-tight">6.1 km</div>
                                        <div className="text-[10px] text-accent font-bold uppercase tracking-[0.25em] opacity-80">Bintaro Xchange</div>
                                    </div>
                                </div>

                                {/* SUPPORTING HIGHLIGHTS — MINIMALIST GRID */}
                                <div className="pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div>
                                        <div className="text-xl font-bold text-white mb-1">2.9 km</div>
                                        <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-tight">RS Pondok Indah</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-white mb-1">450 m</div>
                                        <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-tight">RSPPN Soedirman</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-white mb-1">2.9 km</div>
                                        <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-tight">Komplek Perbankan Pondok Indah</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: GIANT MAP PRESTIGE PRESENCE */}
                        <div className="lg:col-span-7 relative h-[700px] lg:h-[900px]">
                            {/* Map Container */}
                            <div className="relative h-full w-full bg-slate-900 shadow-3xl overflow-hidden border border-white/5">
                                <div className="absolute inset-0 scale-110">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15863.633045236683!2d106.7599093!3d-6.2657067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f032231dc913%3A0xf6039556d0d26733!2sBintaro%20Business%20Centre!5e0!3m2!1sen!2sid!4v1709600000000!5m2!1sen!2sid"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(85%) hue-rotate(180deg)' }}
                                        allowFullScreen
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                                    ></iframe>
                                </div>

                                {/* CINEMATIC DEPTH LAYERING */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent z-10 pointer-events-none"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent z-10 pointer-events-none"></div>

                                {/* INTERACTION BLOCKER */}
                                <div className="absolute inset-0 z-10 bg-transparent"></div>

                                {/* MINIMALIST CTA LINK */}
                                <div className="absolute bottom-12 right-12 z-20">
                                    <Link
                                        href="https://maps.app.goo.gl/dummyLink"
                                        target="_blank"
                                        className="flex items-center gap-2 text-white/60 hover:text-accent transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.25em] group"
                                    >
                                        Buka di Google Maps <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* CORPORATE GOLD MARKER */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                                    <div className="relative">
                                        <div className="absolute -inset-2 bg-accent/20 rounded-full animate-pulse opacity-10"></div>
                                        <div className="relative bg-accent p-5 rounded-full shadow-[0_0_30px_rgba(171,136,46,0.3)] border border-white/20">
                                            <Building2 className="w-7 h-7 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER: ADMINISTRATIVE ANCHOR PANEL */}
                    <div className="mt-32 pt-20 border-t border-white/10">
                        <div className="grid lg:grid-cols-12 gap-16 items-start">
                            <div className="lg:col-span-8">
                                <div className="inline-block border-t-2 border-accent pt-10 pr-20">
                                    <h6 className="font-bold text-accent uppercase tracking-widest text-[10px] mb-8">Alamat Administratif</h6>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-white text-3xl font-bold font-heading mb-4 leading-tight">
                                            Bintaro Business Centre<br />
                                            Jl. RC. Veteran No. 1-i, Jakarta Selatan 12330
                                        </p>
                                        <p className="text-white/40 text-xs font-medium tracking-wide max-w-lg leading-relaxed uppercase">
                                            Terdaftar secara administratif di Jakarta Selatan untuk mendukung kebutuhan legalitas dan domisili usaha Anda.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-4 lg:text-right pt-10">
                                <div className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-6 opacity-60">Operasional Kantor</div>
                                <div className="text-white/80 text-sm font-medium space-y-2">
                                    <p>Senin – Jumat <span className="text-white/20 px-3">|</span> 08:30 – 17:00</p>
                                    <p className="text-white/30 uppercase tracking-widest text-[10px]">Sabtu – Minggu Tutup</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="py-32 bg-bg-paper">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-24">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Testimonials</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading">Apa Kata Klien Kami</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {testimonials.map((item, i) => (
                            <div key={i} className="bg-white p-12 relative border border-primary/5 hover:border-accent/30 transition-colors duration-300">
                                <span className="absolute top-8 right-8">
                                    <Quote className="text-accent/20 w-12 h-12" />
                                </span>
                                <p className="text-primary italic font-display text-lg leading-relaxed mb-10 relative z-10 font-serif">
                                    "{item.quote}"
                                </p>
                                <div className="flex items-center gap-5 border-t border-primary/5 pt-8">
                                    <div className="w-12 h-12 grayscale overflow-hidden relative">
                                        <Image
                                            src={item.avatar}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary text-sm uppercase tracking-widest">{item.name}</p>
                                        <p className="text-[10px] text-accent font-bold uppercase tracking-widest mt-1">{item.title}, {item.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ SECTION (Adapted to new design) */}
            <section className="py-32 bg-white text-center">
                <div className="container mx-auto px-8 max-w-4xl">
                    <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">FAQ</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12 font-heading">Pertanyaan Umum</h2>

                    <Accordion type="single" collapsible className="w-full text-left">
                        <AccordionItem value="item-1" className="border-b border-primary/10">
                            <AccordionTrigger className="text-lg font-bold text-primary hover:text-accent font-heading py-6 hover:no-underline">Apa itu serviced office di Jakarta Selatan?</AccordionTrigger>
                            <AccordionContent className="text-charcoal/70 text-base leading-relaxed pb-6 font-light">
                                Serviced office adalah ruang kantor fully furnished yang siap pakai dengan fasilitas lengkap seperti internet, listrik, resepsionis, dan maintenance. Bintaro Business Centre menyediakan serviced office di Pesanggrahan, Jakarta Selatan dengan alamat legal untuk keperluan administrasi bisnis.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-b border-primary/10">
                            <AccordionTrigger className="text-lg font-bold text-primary hover:text-accent font-heading py-6 hover:no-underline">Apa perbedaan virtual office dan kantor fisik?</AccordionTrigger>
                            <AccordionContent className="text-charcoal/70 text-base leading-relaxed pb-6 font-light">
                                Virtual office memberikan alamat legal Jakarta Selatan tanpa ruang fisik, cocok untuk bisnis yang tidak memerlukan kantor tetap. Serviced office memberikan ruang kantor private dengan fasilitas lengkap. Bintaro Business Centre menyediakan kedua solusi sesuai kebutuhan bisnis Anda.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-b border-primary/10">
                            <AccordionTrigger className="text-lg font-bold text-primary hover:text-accent font-heading py-6 hover:no-underline">Apakah alamat Bintaro Business Centre terdaftar sebagai Jakarta Selatan?</AccordionTrigger>
                            <AccordionContent className="text-charcoal/70 text-base leading-relaxed pb-6 font-light">
                                Ya. Bintaro Business Centre berlokasi di Pesanggrahan, Jakarta Selatan 12330 — bukan Tangerang Selatan. Alamat kami memenuhi syarat untuk pengajuan PKP dan izin usaha yang mensyaratkan domisili Jakarta.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4" className="border-b border-primary/10">
                            <AccordionTrigger className="text-lg font-bold text-primary hover:text-accent font-heading py-6 hover:no-underline">Apa saja fasilitas yang termasuk dalam serviced office?</AccordionTrigger>
                            <AccordionContent className="text-charcoal/70 text-base leading-relaxed pb-6 font-light">
                                Serviced office Bintaro Business Centre sudah termasuk furnitur ergonomis, internet bisnis hingga 100 Mbps, listrik unlimited, AC, kebersihan harian, resepsionis profesional, dan maintenance rutin. Semua biaya sudah termasuk dalam harga sewa bulanan.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5" className="border-b border-primary/10">
                            <AccordionTrigger className="text-lg font-bold text-primary hover:text-accent font-heading py-6 hover:no-underline">Bagaimana cara menggunakan virtual office untuk pengajuan PKP?</AccordionTrigger>
                            <AccordionContent className="text-charcoal/70 text-base leading-relaxed pb-6 font-light">
                                Virtual office Bintaro Business Centre memberikan alamat legal Jakarta Selatan yang dapat digunakan untuk pengajuan PKP. Kami menyediakan surat keterangan domisili dan dukungan administrasi untuk memudahkan proses pengajuan PKP Anda.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>

            {/* CTA FINAL SECTION */}
            <section className="py-32 relative text-white bg-primary">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/images/meeting-room/boardroom/bbc-meeting-room-boardroom-wide-01.jpg.JPG"
                        alt="Inviting Professional Office"
                        fill
                        className="object-cover grayscale"
                    />
                </div>
                <div className="container mx-auto px-8 text-center relative z-10 max-w-4xl">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 font-heading text-white">Siap Mulai? Dapatkan Kantor Profesional Hari Ini</h2>
                    <p className="text-white text-lg mb-12 max-w-2xl mx-auto font-light">
                        Konsultasikan kebutuhan ruang bisnis Anda dengan tim ahli kami secara gratis dan temukan solusi yang tepat.
                    </p>
                    <Button
                        className="px-12 py-8 h-auto"
                        asChild
                    >
                        <Link href="/kontak">Hubungi Kami Sekarang</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
