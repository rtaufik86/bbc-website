import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import {
    ShieldCheck,
    FileText,
    Scale,
    CheckCircle2,
    Building2,
    ArrowRight,
    Search,
    Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'Legalitas & Perizinan BBC | Transparansi Infrastruktur Bisnis',
    description: 'Bintaro Business Centre dioperasikan oleh PT. Ganesha Dwipaya Bhakti. Kami menjamin transparansi legalitas untuk dukungan domisili perusahaan dan pendaftaran PKP.',
    alternates: { canonical: 'https://bintarobusinesscentre.com/legalitas-dan-perizinan-bbc' },
}

export default function LegalitasBbcPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Legalitas & Perizinan Bintaro Business Centre",
        "description": "Dokumen hukum dan transparansi entitas PT. Ganesha Dwipaya Bhakti sebagai pengelola Bintaro Business Centre.",
        "publisher": {
            "@type": "LocalBusiness",
            "name": "Bintaro Business Centre"
        }
    }

    return (
        <main className="bg-white text-charcoal font-sans">
            <Script
                id="legalitas-bbc-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* HERO SECTION */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.3em] mb-6">Compliance & Legitimacy</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-primary leading-[1.1] mb-8 font-heading">
                            Legalitas & Perizinan BBC: Fondasi Kepercayaan Anda
                        </h1>
                        <p className="text-xl text-charcoal/70 mb-12 leading-relaxed font-light">
                            Dalam memilih mitra infrastruktur bisnis, legalitas bukan pertanyaan tambahan—ini pertanyaan pertama. Kami menyediakan transparansi penuh untuk mendukung keamanan operasional bisnis Anda.
                        </p>
                    </div>
                </div>
            </section>

            {/* IDENTITY TABLE */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-12 font-heading">Identitas Legal BBC</h2>
                    <div className="overflow-hidden border border-primary/5 shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <tbody>
                                <tr className="border-b border-primary/5">
                                    <th className="p-8 bg-bg-paper text-primary font-bold uppercase tracking-widest text-xs w-1/3">Nama Badan Usaha</th>
                                    <td className="p-8 text-charcoal/80 font-medium text-lg">PT. Ganesha Dwipaya Bhakti</td>
                                </tr>
                                <tr className="border-b border-primary/5">
                                    <th className="p-8 bg-bg-paper text-primary font-bold uppercase tracking-widest text-xs">Nama Dagang</th>
                                    <td className="p-8 text-charcoal/80 font-medium text-lg">Bintaro Business Centre (BBC)</td>
                                </tr>
                                <tr className="border-b border-primary/5">
                                    <th className="p-8 bg-bg-paper text-primary font-bold uppercase tracking-widest text-xs">Alamat Terdaftar</th>
                                    <td className="p-8 text-charcoal/80 font-medium text-lg">Jl. RC. Veteran No. 1-i, Kel. Bintaro, Kec. Pesanggrahan, Jakarta Selatan 12330</td>
                                </tr>
                                <tr className="border-b border-primary/5">
                                    <th className="p-8 bg-bg-paper text-primary font-bold uppercase tracking-widest text-xs">Mulai Beroperasi</th>
                                    <td className="p-8 text-charcoal/80 font-medium text-lg">2007</td>
                                </tr>
                                <tr>
                                    <th className="p-8 bg-bg-paper text-primary font-bold uppercase tracking-widest text-xs">Wilayah Administrasi</th>
                                    <td className="p-8 text-charcoal/80 font-medium text-lg">Jakarta Selatan (Kecamatan Pesanggrahan)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-12 p-8 bg-accent/5 border-l-4 border-accent flex gap-6 items-center">
                        <Info className="w-8 h-8 text-accent shrink-0" />
                        <p className="text-sm text-charcoal/60 leading-relaxed font-light">
                            Nomor SK perusahaan, NIB, dan detail izin operasional spesifik dapat dikonfirmasi langsung melalui tim legal kami untuk keperluan due diligence yang lebih mendalam.
                        </p>
                    </div>
                </div>
            </section>

            {/* WHY LEGALITY MATTERS */}
            <section className="py-24 lg:py-32 bg-primary text-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 font-heading text-white text-center">Mengapa Legalitas BBC Relevan untuk Anda?</h2>
                    <div className="grid md:grid-cols-2 gap-16">
                        <div className="p-10 bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                            <ShieldCheck className="w-12 h-12 text-accent mb-8" />
                            <h3 className="text-2xl font-bold mb-6 font-heading">Pengguna Virtual Office</h3>
                            <p className="text-white/70 text-base font-light leading-relaxed">
                                Kantor pajak dan instansi terkait akan melakukan verifikasi keberadaan gedung dan validitas entitas pemilik alamat. BBC menyediakan gedung fisik mandiri (bukan shared retail) yang murni berada di yurisdiksi Jakarta Selatan, menjamin keamanan pendaftaran PKP Anda.
                            </p>
                        </div>
                        <div className="p-10 bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                            <FileText className="w-12 h-12 text-accent mb-8" />
                            <h3 className="text-2xl font-bold mb-6 font-heading">Pengguna Service Office</h3>
                            <p className="text-white/70 text-base font-light leading-relaxed">
                                Kontrak sewa yang Anda tandatangani adalah perjanjian hukum sah antara dua badan usaha. Dokumen ini memiliki kekuatan hukum penuh untuk mendukung <Link href="/sewa-kantor" className="text-accent hover:underline font-bold">penggunaan ruang kantor</Link>, NPWP badan, hingga syarat tender proyek resmi.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* JURISDICTION FOCUS */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-20 items-center">
                        <div className="lg:col-span-5 relative aspect-square shadow-3xl overflow-hidden border border-primary/5">
                            <Image
                                src="/images/hero-tentang-kami.jpg"
                                alt="BBC Jakarta Selatan Jurisdiction"
                                fill
                                className="object-cover grayscale"
                            />
                        </div>
                        <div className="lg:col-span-7">
                            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8 font-heading">Wilayah Administrasi: Jakarta Selatan</h2>
                            <div className="space-y-6 text-charcoal/80 text-lg leading-relaxed font-light">
                                <p>
                                    BBC berlokasi di Kelurahan Bintaro, Kecamatan Pesanggrahan, DKI Jakarta. Kami menegaskan ini secara eksplisit karena kawasan Bintaro Jaya secara populer sering diasosiasikan dengan Tangerang Selatan.
                                </p>
                                <p>
                                    Keuntungan yurisdiksi <span className="text-primary font-bold underline decoration-accent decoration-2">DKI Jakarta</span> meliputi:
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        'Pendaftaran PKP di KPP wilayah Jakarta Selatan yang prestisius',
                                        'Pengurusan NIB dan izin usaha berbasis domisili Jakarta',
                                        'Validitas tender yang mensyaratkan kedudukan hukum di Ibukota',
                                        'Kredibilitas administratif di mata perbankan dan investor'
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4 items-start">
                                            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                                            <span className="text-base">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRANSPARENCY CTA */}
            <section className="py-24 lg:py-32 bg-bg-paper text-center">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8 font-heading">Kepercayaan Dibangun dari Transparansi</h2>
                    <p className="text-xl text-charcoal/60 mb-12 font-light italic leading-relaxed">
                        Jika Anda memiliki pertanyaan tentang legalitas BBC atau ingin mendiskusikan bagaimana alamat Jakarta Selatan kami mendukung kepatuhan bisnis Anda, hubungi kami.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-none px-12 py-8 h-auto uppercase tracking-widest text-[10px]" asChild>
                            <a href="https://wa.me/6281311778036?text=Halo BBC, saya ingin konsultasi terkait legalitas domisili">Diskusikan Kebutuhan Bisnis</a>
                        </Button>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-none px-12 py-8 h-auto uppercase tracking-widest text-[10px]" asChild>
                            <Link href="/virtual-office">Pelajari Virtual Office</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <footer className="py-12 bg-white border-t border-primary/5">
                <div className="container mx-auto px-6 flex justify-center gap-10 text-[9px] font-bold text-charcoal/30 uppercase tracking-[0.2em]">
                    <Link href="/tentang-kami" className="hover:text-primary transition-colors">Tentang BBC</Link>
                    <Link href="/lokasi-kantor" className="hover:text-primary transition-colors">Lokasi & Akses</Link>
                    <Link href="/sewa-kantor" className="hover:text-primary transition-colors">Sewa Kantor</Link>
                    <Link href="/legal/pendirian-pt-jakarta-selatan" className="hover:text-primary transition-colors">Layanan Pendirian PT</Link>
                </div>
            </footer>
        </main>
    )
}
