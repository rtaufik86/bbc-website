"use client"

import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ArrowRight, Scale, FileSearch, ShieldCheck, MapPin, Building2, Gavel, Clock, Shield, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import ServiceCTA from '@/components/cta/ServiceCTA'

const legalServices = [
    {
        title: "Pendirian PT Jakarta Selatan",
        description: "Proses pendirian PT yang mencakup pemilihan nama, akta notaris, SK Kemenkumham, NPWP perusahaan, dan NIB — dengan pendampingan profesional dari awal hingga dokumen terbit.",
        link: "/legal/pendirian-pt-jakarta-selatan",
        cta: "Pelajari proses dan syaratnya",
        icon: Building2
    },
    {
        title: "Cek KBLI Usaha",
        description: "Klasifikasi KBLI yang tepat menentukan jenis kantor yang dibutuhkan, eligibilitas PKP, dan regulasi yang berlaku untuk bisnis Anda.",
        link: "/legal/cek-kbli",
        cta: "Cek KBLI usaha Anda",
        icon: FileSearch
    },
    {
        title: "Panduan PKP Non-Jasa",
        description: "Memahami persyaratan kompleks PKP untuk KBLI di luar sektor jasa sebelum mendirikan perusahaan untuk menghindari proses ulang.",
        link: "/legal/pkp-perdagangan",
        cta: "Baca panduan lengkap",
        icon: ShieldCheck
    }
]

export default function LegalClient() {
    return (
        <div className="min-h-screen bg-white font-sans text-charcoal selection:bg-accent/30">
            <main>
                {/* 1) HERO SECTION */}
                <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-bg-paper overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-4xl">
                            <span className="inline-block text-accent font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6">Layanan Legal Terintegrasi</span>

                            <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-[1.1] mb-8 font-heading">
                                Layanan Legalitas Bisnis di <span className="text-accent underline decoration-accent/30 underline-offset-8">Jakarta Selatan</span>
                            </h1>

                            <p className="text-lg text-charcoal/70 mb-10 leading-relaxed max-w-3xl font-light">
                                Mendirikan perusahaan di Jakarta Selatan bukan sekadar urusan dokumen. Ini tentang memiliki fondasi legal yang kuat — alamat domisili yang tepat, klasifikasi usaha yang benar, dan infrastruktur bisnis yang siap mendukung pertumbuhan dari hari pertama. Di Bintaro Business Centre, layanan legalitas bukan berdiri sendiri. Ini bagian dari ekosistem bisnis terintegrasi yang mencakup <Link href="/sewa-kantor" className="text-accent hover:underline">ruang kantor fisik</Link> and <Link href="/virtual-office" className="text-accent hover:underline">virtual office</Link> di Jakarta Selatan.
                            </p>

                            {/* Trust Indicators */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                <div className="flex items-start gap-3">
                                    <div className="bg-accent/10 p-2 rounded-lg">
                                        <Clock className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-primary font-bold text-xs uppercase tracking-wider">Sejak 2007</p>
                                        <p className="text-[10px] text-charcoal/60">Pengalaman Panjang</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 border-l border-charcoal/10 pl-0 md:pl-6">
                                    <div className="bg-accent/10 p-2 rounded-lg">
                                        <MapPin className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-primary font-bold text-xs uppercase tracking-wider">Jakarta Selatan</p>
                                        <p className="text-[10px] text-charcoal/60">Yurisdiksi DKI Jakarta</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 border-l border-charcoal/10 pl-0 md:pl-6">
                                    <div className="bg-accent/10 p-2 rounded-lg">
                                        <Shield className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-primary font-bold text-xs uppercase tracking-wider">Terintegrasi</p>
                                        <p className="text-[10px] text-charcoal/60">Legal & Office</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 h-14 rounded-none uppercase font-bold tracking-widest text-xs w-full sm:w-auto" asChild>
                                    <Link href="/legal/pendirian-pt-jakarta-selatan">Konsultasi Pendirian PT</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-primary/10 hover:bg-white px-10 h-14 rounded-none uppercase font-bold tracking-widest text-xs w-full sm:w-auto" asChild>
                                    <Link href="/sewa-kantor">Lihat Sewa Kantor</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Background Decorative Gavel */}
                    <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 opacity-[0.03] scale-150 pointer-events-none hidden lg:block">
                        <Gavel className="w-96 h-96 text-primary" />
                    </div>
                </section>


                {/* 3) Core Message Section */}
                <section className="py-20 lg:py-28">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                            <div>
                                <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.2em] mb-4">Integrated Ecosystem</span>
                                <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-8 leading-tight font-heading">
                                    Fondasi Legal yang Terintegrasi dengan Infrastruktur Bisnis
                                </h2>
                                <p className="text-charcoal/70 text-lg leading-relaxed mb-6 font-light">
                                    Setiap proses legal yang kami fasilitasi terhubung langsung dengan fasilitas kantor, alamat usaha resmi, dan dukungan operasional di bawah satu atap — di Jakarta Selatan. Kebutuhan alamat fisik dapat dipenuhi melalui <Link href="/sewa-kantor" className="text-accent hover:underline">sewa kantor BBC</Link> yang sudah beroperasi sejak 2007, atau melalui <Link href="/virtual-office" className="text-accent hover:underline">virtual office</Link> untuk bisnis yang membutuhkan alamat resmi tanpa ruang fisik harian.
                                </p>
                            </div>
                            <div className="bg-primary p-8 lg:p-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 -translate-y-16 translate-x-16 rounded-full blur-3xl"></div>
                                <div className="relative z-10 text-white">
                                    <h3 className="text-2xl font-bold mb-6 font-heading tracking-tight text-white">Layanan Legal Kami</h3>
                                    <div className="space-y-6 opacity-90 font-light">
                                        <p>Solusi legalitas yang kami tawarkan mencakup seluruh aspek krusial bagi startup dan perusahaan berkembang di Indonesia.</p>
                                        <ul className="space-y-4">
                                            {[
                                                "Pendirian PT & CV Profesional",
                                                "Pengurusan Izin Usaha Terintegrasi",
                                                "Verifikasi Domisili Jakarta Selatan",
                                                "Dukungan PKP Sektoral"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3">
                                                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                                                        <CheckCircle2 className="w-3 h-3 text-primary" />
                                                    </div>
                                                    <span className="font-medium text-white">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4) Services Grid */}
                <section className="py-20 bg-bg-paper">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 font-heading">Layanan Legal BBC</h2>
                            <div className="w-20 h-1 bg-accent mx-auto"></div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {legalServices.map((service, index) => (
                                <div key={index} className="bg-white p-10 border border-charcoal/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                                    <div className="w-14 h-14 bg-bg-paper flex items-center justify-center mb-8 group-hover:bg-accent transition-colors duration-300 rounded-lg">
                                        <service.icon className="w-7 h-7 text-primary group-hover:text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-4 font-heading tracking-tight">{service.title}</h3>
                                    <p className="text-charcoal/70 mb-8 leading-relaxed flex-grow font-light">
                                        {service.description}
                                    </p>
                                    <Link href={service.link} className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors text-xs uppercase tracking-widest group/btn">
                                        {service.cta} <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5) KBLI Education Section */}
                <section className="py-20 lg:py-28">
                    <div className="container mx-auto px-6">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-6 font-heading leading-tight">KBLI dan Kebutuhan Ruang Usaha</h2>
                                <p className="text-charcoal/70 text-lg leading-relaxed font-light max-w-3xl mx-auto">
                                    Salah satu aspek paling krusial dalam pendirian perusahaan yang sering diabaikan adalah hubungan antara jenis usaha (KBLI) dengan jenis kantor yang dibutuhkan.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-primary border-l-4 border-accent pl-6 font-heading tracking-tight">Bisnis KBLI Jasa</h3>
                                    <div className="text-charcoal/70 leading-relaxed font-light space-y-4">
                                        <p>
                                            Perusahaan dengan klasifikasi KBLI Jasa — konsultan, IT, marketing, jasa keuangan, dan sejenisnya — memiliki fleksibilitas lebih tinggi dalam pemilihan alamat usaha. Pengajuan PKP dimungkinkan menggunakan alamat BBC, baik melalui <Link href="/virtual-office" className="text-accent font-semibold hover:underline">virtual office</Link> maupun kontrak sewa ruangan di bawah satu tahun.
                                        </p>
                                        <p>
                                            Bagi yang membutuhkan fleksibilitas operasional lebih tinggi, <Link href="/virtual-office" className="text-accent font-semibold hover:underline">paket virtual office BBC</Link> dirancang untuk mendukung kebutuhan domisili dan administrasi bisnis jasa secara efisien.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-6 text-charcoal/70">
                                    <h3 className="text-2xl font-bold text-primary border-l-4 border-accent pl-6 font-heading tracking-tight">Bisnis KBLI Selain Jasa</h3>
                                    <div className="leading-relaxed font-light space-y-4">
                                        <p>
                                            Untuk sektor di luar jasa — termasuk perdagangan, transportasi, event organizer, logistik, dan bidang lain — persyaratan PKP dan operasional umumnya lebih kompleks. Dokumen pendukung yang diperlukan dapat mencakup bukti kontrak sewa satu hingga dua tahun, fasilitas kantor fisik yang terverifikasi.
                                        </p>
                                        <p>
                                            Dalam konteks ini, <Link href="/sewa-kantor" className="text-accent font-semibold hover:underline">sewa kantor di BBC</Link> menjadi solusi yang paling langsung untuk memenuhi persyaratan tersebut — alamat Jakarta Selatan yang terverifikasi dan fasilitas fisik yang siap digunakan.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 bg-bg-paper p-10 border-l-[6px] border-accent relative overflow-hidden group">
                                <Quote className="absolute right-6 top-6 w-12 h-12 text-accent/10 -scale-x-100" />
                                <p className="italic text-primary/80 text-xl font-medium relative z-10 font-heading">
                                    "Pemahaman yang tepat atas klasifikasi KBLI bisnis Anda adalah titik awal sebelum memutuskan struktur legal perusahaan. Setiap sektor memiliki jalurnya masing-masing — dan BBC menyediakan infrastruktur yang mendukung keduanya."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6) Location Advantage */}
                <section className="py-20 lg:py-28 bg-primary text-white relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10 blur-sm pointer-events-none">
                        <Gavel className="w-96 h-96" />
                    </div>
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl lg:text-4xl font-bold mb-8 leading-tight font-heading">Keunggulan Alamat Jakarta Selatan untuk Legalitas Bisnis</h2>
                                <div className="space-y-6 text-white/80 text-lg leading-relaxed font-light mb-10">
                                    <p>
                                        Bintaro Business Centre berlokasi di gedung kantor Jl. RC Veteran No. 1-i, Pesanggrahan, Jakarta Selatan — bukan Tangerang Selatan. Sebagai infrastruktur fisik yang telah beroperasi sejak 2007, alamat ini digunakan oleh lebih dari 1.700 perusahaan sebagai domisili resmi, alamat PKP, dan basis operasional bisnis mereka. Perbedaan yurisdiksi ini berdampak signifikan terhadap aspek legal dan operasional perusahaan.
                                    </p>
                                    <p>
                                        Secara administratif, Jakarta Selatan berada dalam yurisdiksi DKI Jakarta. Alamat usaha di bawah yurisdiksi ini memberikan keunggulan konkret: proses PKP yang lebih lancar, kredibilitas alamat yang lebih tinggi untuk keperluan tender, serta akses yang lebih mudah terhadap layanan pemerintah DKI Jakarta.
                                    </p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                                        <Star className="w-4 h-4 text-accent fill-accent" />
                                        <span className="font-bold tracking-widest text-[10px] uppercase">DKI Jakarta</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                                        <ShieldCheck className="w-4 h-4 text-accent" />
                                        <span className="font-bold tracking-widest text-[10px] uppercase">Terverifikasi</span>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                                {[
                                    "/images/private-office/bbc-private-office-suite-wide-01.jpg.JPG",
                                    "/images/meeting-room/shared/bbc-meeting-room-shared-01.jpg.JPG",
                                    "/images/private-office/shared/bbc-private-office-shared-02.jpg.JPG",
                                ].map((img, i) => (
                                    <div key={i} className="aspect-square relative overflow-hidden group/img">
                                        <Image src={img} alt={`Facility ${i + 1}`} fill className="object-cover grayscale group-hover/img:grayscale-0 group-hover/img:scale-110 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-primary/20 group-hover/img:bg-transparent transition-colors duration-500"></div>
                                    </div>
                                ))}
                                <div className="aspect-square relative overflow-hidden bg-accent flex items-center justify-center p-8 text-center">
                                    <p className="text-primary font-bold text-xs uppercase leading-loose tracking-[0.2em]">Strategis<br />Dekat Pintu Tol<br />Veteran</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7) Consultation CTA */}
                <section className="py-24 lg:py-40 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-4xl lg:text-6xl font-extrabold text-primary mb-8 tracking-tight font-heading leading-tight">Siap Membangun Struktur Legal yang Tepat?</h2>
                            <p className="text-charcoal/70 text-lg lg:text-xl mb-12 leading-relaxed max-w-2xl mx-auto font-light">
                                Setiap bisnis unik. Pastikan klasifikasi KBLI dan domisili Anda selaras demi kelancaran operasional dan kepatuhan regulasi jangka panjang.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 h-16 rounded-none uppercase font-bold tracking-widest text-xs w-full sm:w-auto shadow-lg shadow-primary/20" asChild>
                                    <Link href="/legal/pendirian-pt-jakarta-selatan">Konsultasi Pendirian PT</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-primary/20 hover:bg-slate-50 px-10 h-16 rounded-none uppercase font-bold tracking-widest text-xs w-full sm:w-auto" asChild>
                                    <Link href="/sewa-kantor">Hubungi Tim Legal</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <ServiceCTA />
            </main>
        </div>
    )
}
