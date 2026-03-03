import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import {
    MapPin,
    Navigation,
    ShieldCheck,
    Globe,
    Building2,
    ArrowRight,
    Clock,
    Phone,
    MessageCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'Lokasi Bintaro Business Centre: Jakarta Selatan | Akses Strategis',
    description: 'Bintaro Business Centre berlokasi di Jakarta Selatan (Kecamatan Pesanggrahan), murni wilayah administratif Jakarta dengan akses tol JORR yang strategis.',
    alternates: { canonical: 'https://bintarobusinesscentre.com/lokasi-kantor' },
}

export default function LokasiKantorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": ["ContactPage", "LocalBusiness"],
        "name": "Lokasi Bintaro Business Centre",
        "description": "Informasi alamat, peta navigasi, dan akses transportasi menuju gedung Bintaro Business Centre di Jakarta Selatan.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jl. RC. Veteran No. 1-i, Kel. Bintaro",
            "addressLocality": "Pesanggrahan",
            "addressRegion": "Jakarta Selatan",
            "postalCode": "12330",
            "addressCountry": "ID"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-6.2721988",
            "longitude": "106.7622405"
        },
        "telephone": "+62-21-7362639",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "20:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "15:00"
            }
        ]
    }

    return (
        <main className="bg-white text-charcoal font-sans">
            <Script
                id="lokasi-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HERO SECTION */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.3em] mb-6">Strategic Location</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-primary leading-[1.1] mb-8 font-heading">
                            Lokasi BBC: Jakarta Selatan, Akses Strategis dari Berbagai Arah
                        </h1>
                        <p className="text-xl text-charcoal/70 mb-12 leading-relaxed font-light">
                            Jl. RC. Veteran No. 1-i, Kelurahan Bintaro, Kecamatan Pesanggrahan, Jakarta Selatan 12330. Koridor bisnis strategis dengan akses langsung ke jaringan tol JORR.
                        </p>
                    </div>
                </div>
            </section>

            {/* ADDRESS & MAP GRID */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <h3 className="text-2xl font-bold text-primary mb-8 font-heading uppercase tracking-wider">Alamat & Identitas Administratif</h3>
                                <div className="space-y-6 text-charcoal/80 text-lg leading-relaxed font-light">
                                    <p>
                                        Bintaro Business Centre secara administratif berada di <span className="text-primary font-bold">Kecamatan Pesanggrahan, Jakarta Selatan</span>. Hal ini krusial untuk keperluan registrasi perusahaan, pengurusan domisili, dan PKP. Bagi entitas yang membutuhkan <Link href="/sewa-kantor" className="text-accent hover:underline font-bold">infrastruktur kantor fisik</Link> atau sekadar <Link href="/virtual-office" className="text-accent hover:underline font-bold">alamat bisnis resmi</Link>, lokasi ini memberikan kepastian hukum yang murni berlokasi di DKI Jakarta.
                                    </p>
                                    <div className="flex gap-4 p-8 bg-bg-paper border-l-4 border-accent shadow-sm">
                                        <MapPin className="w-6 h-6 text-accent shrink-0" />
                                        <address className="not-italic font-medium text-primary leading-relaxed">
                                            Jl. RC. Veteran No. 1-i, Kel. Bintaro, <br />
                                            Kec. Pesanggrahan, Jakarta Selatan 12330
                                        </address>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-charcoal/70">
                                    <Phone className="w-5 h-5 text-accent" />
                                    <span className="font-medium text-sm">(021) 7362639</span>
                                </div>
                                <div className="flex items-center gap-4 text-charcoal/70">
                                    <MessageCircle className="w-5 h-5 text-accent" />
                                    <span className="font-medium text-sm">0813-1177-8036 (WhatsApp)</span>
                                </div>
                            </div>

                            <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-none h-16 uppercase tracking-widest text-[10px] font-bold shadow-xl shadow-primary/10" asChild>
                                <a href="https://www.google.com/maps/place/Bintaro+Business+Centre/@-6.2721988,106.7622405,17z" target="_blank" rel="noopener noreferrer">
                                    <Navigation className="w-4 h-4 mr-2" /> Navigasi via Google Maps
                                </a>
                            </Button>
                        </div>

                        <div className="lg:col-span-1 hidden lg:block h-full border-r border-primary/5"></div>

                        <div className="lg:col-span-6">
                            <div className="relative aspect-[4/3] w-full shadow-3xl grayscale hover:grayscale-0 transition-all duration-1000 border border-primary/5">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.198357776145!2d106.76005187425867!3d-6.272198765351914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1025a1b3b21%3A0x6b4a6d0c6d9d0e0!2sBintaro%20Business%20Centre!5e0!3m2!1sen!2sid!4v1707567890123!5m2!1sen!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ACCESS DETAILS */}
            <section className="py-24 lg:py-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-16 font-heading">Akses dari Tol & Jalan Utama</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="space-y-6">
                            <h4 className="text-xl font-bold text-primary uppercase tracking-widest text-xs border-b border-accent/20 pb-4">Akses via Tol JORR</h4>
                            <p className="text-charcoal/70 text-sm leading-relaxed font-light">
                                Gedung BBC bersinggungan langsung dengan ruas JORR W2S. Kemudahan akses ini sangat mendukung proses <Link href="/legal/pendirian-pt-jakarta-selatan" className="text-accent hover:underline font-bold">legalitas usaha</Link> yang memerlukan verifikasi lokasi fisik secara cepat oleh instansi terkait.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-xl font-bold text-primary uppercase tracking-widest text-xs border-b border-accent/20 pb-4">Dari Pondok Indah</h4>
                            <p className="text-charcoal/70 text-sm leading-relaxed font-light">
                                Melalui Jalan RA. Kartini menuju Jalan RC. Veteran. Rute ini relatif lancar di luar jam sibuk, menghubungkan kawasan premium dengan BBC.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-xl font-bold text-primary uppercase tracking-widest text-xs border-b border-accent/20 pb-4">Bintaro Jaya & Kebayoran</h4>
                            <p className="text-charcoal/70 text-sm leading-relaxed font-light">
                                Akses langsung melalui koridor Jalan RC. Veteran arah utara. BBC adalah pusat bisnis terdekat bagi domisili kawasan Bintaro Sektor 1-9.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* OPERATIONAL INFO */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8 font-heading">Fasilitas Parkir & Jam Operasional</h2>
                            <p className="text-lg text-charcoal/70 mb-10 font-light leading-relaxed">
                                BBC menyediakan lahan parkir untuk 30 kendaraan roda empat, tersedia bebas biaya selama jam operasional untuk tenant dan tamu.
                            </p>
                            <div className="space-y-6">
                                <div className="flex justify-between border-b border-primary/5 pb-4">
                                    <span className="font-bold text-primary">Senin – Jumat</span>
                                    <span className="text-charcoal/60 italic">08.00 – 20.00 WIB</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/5 pb-4">
                                    <span className="font-bold text-primary">Sabtu – Minggu</span>
                                    <span className="text-charcoal/60 italic">09.00 – 15.00 WIB</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/5 pb-4">
                                    <span className="font-bold text-primary">Hari Libur Nasional</span>
                                    <span className="text-red-500/60 italic font-medium uppercase tracking-widest text-[10px]">Tutup</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary p-12 text-white">
                            <h3 className="text-2xl font-bold mb-6 font-heading text-accent">Survey Lokasi</h3>
                            <p className="text-white/70 text-base font-light leading-relaxed mb-10">
                                Kami mendorong calon klien untuk menjadwalkan kunjungan langsung sebelum mengambil keputusan. Melihat ruangan secara fisik—merasakan kondisi pencahayaan, kapasitas parkir, dan kualitas resepsionis—memberikan keyakinan yang nyata.
                            </p>
                            <Button className="bg-accent hover:bg-accent/90 text-white font-bold rounded-none px-12 py-8 h-auto uppercase tracking-widest text-[10px] w-full shadow-2xl shadow-accent/20" asChild>
                                <Link href="/sewa-kantor">Jadwalkan Kunjungan Survey</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTEGRITY SECTION */}
            <section className="py-24 lg:py-32 bg-white border-t border-primary/5">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <div className="flex justify-center gap-12 mb-12">
                        <div className="text-center">
                            <ShieldCheck className="w-12 h-12 text-accent mx-auto mb-4" />
                            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Jakarta Selatan Valid</span>
                        </div>
                        <div className="text-center">
                            <Globe className="w-12 h-12 text-accent mx-auto mb-4" />
                            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Strategic JORR Access</span>
                        </div>
                        <div className="text-center">
                            <Building2 className="w-12 h-12 text-accent mx-auto mb-4" />
                            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">30 Capacity Parking</span>
                        </div>
                    </div>
                    <p className="text-xl text-charcoal/60 font-light italic leading-relaxed">
                        "Lokasi strategis tidak selalu berarti mahal. Jadwalkan kunjungan survey ke BBC dan lihat langsung infrastruktur yang telah mendukung lebih dari 1.800 perusahaan selama 18 tahun."
                    </p>
                    <div className="mt-16 flex justify-center gap-10 text-[9px] font-bold text-charcoal/30 uppercase tracking-[0.2em]">
                        <Link href="/tentang-kami" className="hover:text-primary transition-colors">Tentang BBC</Link>
                        <Link href="/fasilitas-kantor" className="hover:text-primary transition-colors">Fasilitas Gedung</Link>
                        <Link href="/sewa-kantor" className="hover:text-primary transition-colors">Lihat Unit Tersedia</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
