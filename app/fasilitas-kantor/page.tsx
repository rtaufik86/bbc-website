import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import {
    Check,
    Building2,
    Users,
    Wifi,
    Shield,
    Coffee,
    ArrowRight,
    Monitor,
    AirVent,
    Car
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'Fasilitas Bintaro Business Centre | Infrastruktur Kantor Lengkap Jakarta Selatan',
    description: 'Fasilitas lengkap mendukung operasional bisnis: Service Office, Meeting Room, Parkir 30 Mobil, High Speed Internet, dan Resepsionis Profesional di Jakarta Selatan.',
    alternates: { canonical: 'https://bintarobusinesscentre.com/fasilitas-kantor' },
}

export default function FasilitasKantorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Fasilitas Bintaro Business Centre",
        "description": "Detail infrastruktur dan fasilitas pendukung operasional kantor di Bintaro Business Centre Jakarta Selatan.",
        "publisher": {
            "@type": "LocalBusiness",
            "name": "Bintaro Business Centre"
        }
    }

    return (
        <main className="bg-white text-charcoal font-sans">
            <Script
                id="fasilitas-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* HERO SECTION */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.3em] mb-6">Building Amenities</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-primary leading-[1.1] mb-8 font-heading">
                            Fasilitas BBC: Infrastruktur Lengkap Mendukung Bisnis
                        </h1>
                        <p className="text-xl text-charcoal/70 mb-12 leading-relaxed font-light">
                            Fasilitas bukan nilai jual—fasilitas adalah standar minimum. Di BBC, semua infrastruktur sudah tersedia untuk mendukung <Link href="/sewa-kantor" className="text-accent hover:underline font-bold">operasional kantor</Link> and <Link href="/virtual-office" className="text-accent hover:underline font-bold">administrasi perusahaan</Link> Anda.
                        </p>
                    </div>
                </div>
            </section>

            {/* CORE INFRASTRUCTURE GRID */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                        <div>
                            <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-10 font-heading">Gedung & Infrastruktur Fisik</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6 items-start">
                                    <div className="shrink-0 w-12 h-12 bg-accent/10 flex items-center justify-center">
                                        <Building2 className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-2 uppercase tracking-widest text-xs">Spesifikasi Gedung</h4>
                                        <p className="text-charcoal/60 text-base font-light leading-relaxed">
                                            BBC beroperasi dari gedung seluas 1.600 m² yang terdiri dari empat lantai, dengan total 72 unit ruangan berukuran antara 9 m² hingga 36 m². Bukan konversi properti residensial.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="shrink-0 w-12 h-12 bg-accent/10 flex items-center justify-center">
                                        <Car className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-2 uppercase tracking-widest text-xs">Kapasitas Parkir</h4>
                                        <p className="text-charcoal/60 text-base font-light leading-relaxed">
                                            Lahan parkir menampung 30 kendaraan roda empat, tersedia tanpa biaya tambahan selama jam operasional bagi tenant aktif dan tamu.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="shrink-0 w-12 h-12 bg-accent/10 flex items-center justify-center">
                                        <Users className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-2 uppercase tracking-widest text-xs">Resepsionis & Mushola</h4>
                                        <p className="text-charcoal/60 text-base font-light leading-relaxed">
                                            Tim resepsionis profesional dan mushola bersih tersedia di dalam gedung untuk tenant, staf, dan tamu.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square shadow-3xl overflow-hidden">
                            <Image
                                src="/images/lobby/bbc-lobby-front-01.jpg.JPG"
                                alt="BBC Building Facilities"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="bg-bg-paper p-10 border-t-4 border-accent">
                            <h3 className="text-2xl font-bold text-primary mb-6 font-heading">Service Office</h3>
                            <ul className="space-y-4">
                                {['Fully Furnished', 'High Speed Internet', 'Cleaning Service Harian', 'Free Flow Minuman', 'AC Dedicated'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-charcoal/70 text-sm font-light">
                                        <Check className="w-4 h-4 text-accent" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-8 text-xs text-charcoal/40 italic">All-inclusive: Listrik & air tanpa biaya tambahan.</p>
                        </div>
                        <div className="bg-primary p-10 text-white">
                            <h3 className="text-2xl font-bold text-accent mb-6 font-heading">Meeting Rooms</h3>
                            <div className="space-y-6">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest block mb-2 opacity-50">Kapasitas Kecil</span>
                                    <p className="text-sm font-light">Hingga 6 orang • Rp 50.000/jam</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest block mb-2 opacity-50">Kapasitas Besar</span>
                                    <p className="text-sm font-light">12+ orang • Rp 100.000/jam</p>
                                </div>
                                <div className="pt-6 border-t border-white/10">
                                    <p className="text-xs font-light opacity-70">Termasuk: Whiteboard, Wi-Fi, Coffee/Tea.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-bg-paper p-10 border-t-4 border-accent">
                            <h3 className="text-2xl font-bold text-primary mb-6 font-heading">Resepsionis</h3>
                            <ul className="space-y-4">
                                {['Penerimaan Surat/Paket', 'Penanganan Telepon', 'Penerimaan Tamu', 'Notifikasi WhatsApp', 'Mail Handling'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-charcoal/70 text-sm font-light">
                                        <Check className="w-4 h-4 text-accent" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONNECTIVITY & SECURITY */}
            <section className="py-24 lg:py-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 font-heading">Standard Fasilitas Premium</h2>
                        <p className="text-charcoal/60 text-lg font-light leading-relaxed">Kami memastikan setiap aspek fasilitas dikelola secara profesional tanpa penurunan standar harian.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-12">
                        <div className="text-center">
                            <Wifi className="w-12 h-12 text-accent mx-auto mb-6" />
                            <h4 className="font-bold text-primary mb-4 uppercase tracking-widest text-xs">Dedicated Internet</h4>
                            <p className="text-charcoal/60 text-sm font-light">Koneksi stabil tanpa throttling untuk operasional bisnis harian.</p>
                        </div>
                        <div className="text-center">
                            <AirVent className="w-12 h-12 text-accent mx-auto mb-6" />
                            <h4 className="font-bold text-primary mb-4 uppercase tracking-widest text-xs">Climate Control</h4>
                            <p className="text-charcoal/60 text-sm font-light">Sistem AC terawat rutin di setiap unit ruangan dan public area.</p>
                        </div>
                        <div className="text-center">
                            <Shield className="w-12 h-12 text-accent mx-auto mb-6" />
                            <h4 className="font-bold text-primary mb-4 uppercase tracking-widest text-xs">Active Security</h4>
                            <p className="text-charcoal/60 text-sm font-light">Sistem keamanan gedung selama jam operasional penuh.</p>
                        </div>
                        <div className="text-center">
                            <Coffee className="w-12 h-12 text-accent mx-auto mb-6" />
                            <h4 className="font-bold text-primary mb-4 uppercase tracking-widest text-xs">Free Flow</h4>
                            <p className="text-charcoal/60 text-sm font-light">Penyediaan air mineral, teh, dan kopi setiap hari untuk tenant.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 lg:py-32 bg-white text-center">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-primary p-16 shadow-3xl text-white">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 font-heading text-white">Lihat Langsung Fasilitas Kami</h2>
                        <p className="text-white/60 text-lg mb-12 font-light italic">Survey lokasi gratis, tanpa komitmen. Tim kami siap mendampingi Anda.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Button className="bg-accent hover:bg-accent/90 text-white font-bold rounded-none px-12 py-8 h-auto uppercase tracking-widest text-[10px]" asChild>
                                <Link href="/sewa-kantor">Jadwalkan Survey Gratis</Link>
                            </Button>
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-bold rounded-none px-12 py-8 h-auto uppercase tracking-widest text-[10px]" asChild>
                                <Link href="/sewa-kantor">Lihat Unit Tersedia</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-12 bg-white border-t border-primary/5">
                <div className="container mx-auto px-6 flex justify-center gap-10 text-[9px] font-bold text-charcoal/30 uppercase tracking-[0.2em]">
                    <Link href="/tentang-kami" className="hover:text-primary transition-colors">Tentang BBC</Link>
                    <Link href="/lokasi-kantor" className="hover:text-primary transition-colors">Lokasi & Akses</Link>
                    <Link href="/legal/pendirian-pt-jakarta-selatan" className="hover:text-primary transition-colors">Legalitas Pendirian</Link>
                    <Link href="/sewa-kantor" className="hover:text-primary transition-colors">Paket Sewa Kantor</Link>
                </div>
            </footer>
        </main>
    )
}
