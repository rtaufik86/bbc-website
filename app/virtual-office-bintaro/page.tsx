import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'
import Script from 'next/script'
import { Check, MessageCircle, MapPin, Building2, Shield, ArrowRight, CheckCircle2, Map } from 'lucide-react'
import { Button } from '@/components/ui/button'

const currentYear = new Date().getFullYear();
const title = 'Virtual Office Bintaro | Alamat Jakarta Selatan Untuk Bisnis Sah'
const description = 'Cari virtual office di Bintaro? Dapatkan alamat Jakarta Selatan (bukan Tangsel) yang sah untuk domisili bisnis & PKP di BBC. Akses Veteran, gedung fisik real.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/virtual-office-bintaro' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/virtual-office-bintaro',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/hero-virtual-office.jpg' }]
    }
}

const relatedArticles = [
    { title: 'Virtual Office Jakarta Selatan', description: 'Solusi alamat bisnis profesional tanpa kantor fisik.', href: '/virtual-office-jakarta-selatan' },
    { title: 'Alamat Bisnis Jakarta Selatan', description: 'Kredibilitas bisnis yang dimulai dari satu keputusan alamat.', href: '/alamat-bisnis-jakarta-selatan' },
    { title: 'Harga Virtual Office Jakarta Selatan', description: 'Perbandingan paket dan biaya virtual office terbaru.', href: '/harga-virtual-office-jakarta-selatan' }
]

export default function Page() {
    const waMessage = "Hallo, saya ingin info virtual office Jakarta Selatan."

    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/virtual-office-bintaro/#webpage",
                "url": "https://www.bintarobusinesscentre.com/virtual-office-bintaro",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/virtual-office-bintaro/#article",
                "headline": title,
                "description": description,
                "image": "https://www.bintarobusinesscentre.com/images/hero-virtual-office.jpg",
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            }
        ]
    }

    return (
        <main className="bg-white">
            <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }} />

            {/* HERO */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-40 bg-[#0F1E33] overflow-hidden">
                <div className="absolute inset-0 opacity-20 transition-transform duration-1000 scale-105 group-hover:scale-100">
                    <Image
                        src="/images/hero-virtual-office.jpg"
                        alt="Virtual Office Bintaro"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <SEOBreadcrumbs items={[{ label: 'Virtual Office Bintaro' }]} />
                    <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.4em] mb-8 mt-12 font-sans">Weapon Page — Virtual Office Cluster</span>
                    <h1 className="text-4xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 font-heading max-w-4xl mx-auto">
                        Virtual Office Bintaro: Alamat Jakarta Selatan, Bukan Tangerang Selatan
                    </h1>
                    <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto font-light mb-12">
                        Pastikan legalitas bisnis Anda aman dengan alamat DKI Jakarta yang sah. BBC berlokasi di area Pesanggrahan Jaksel.
                    </p>
                    <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-xl h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                        <Link href="/virtual-office">Tanya Ketersediaan Alamat</Link>
                    </Button>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto prose prose-lg prose-slate prose-headings:text-primary prose-headings:font-heading prose-headings:font-bold prose-accent:text-accent">
                        <p className="text-xl leading-relaxed text-charcoal/80 font-medium italic border-l-4 border-accent pl-8 py-4 bg-accent/5 rounded-r-3xl text-center lg:text-left">
                            Banyak penyedia memasarkan diri sebagai "virtual office Bintaro"—tapi mayoritas berada di Tangerang Selatan. Untuk PKP, NIB Jakarta, atau tender, perbedaan ini sangat material.
                        </p>

                        <h2 className="text-3xl mt-16 mb-8 font-heading">Bintaro Jaksel vs Bintaro Tangsel</h2>
                        <p>
                            Ini bukan masalah preferensi—ini masalah administrasi. Kawasan "Bintaro Jaya" terbagi antara dua wilayah administratif: sebagian masuk Pesanggrahan Jaksel (DKI Jakarta), sebagian besar masuk Tangerang Selatan.
                        </p>
                        <p>
                            <strong>Bintaro Business Centre (BBC)</strong> berlokasi di Jl. RC. Veteran, Kec. Pesanggrahan—di sisi Jakarta. Ini fakta administratif yang dapat diverifikasi oleh instansi manapun.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-8 not-prose my-16">
                            {[
                                { t: 'Legalitas DKI Jakarta', d: 'Sah untuk pendirian PT, NIB, & PKP Jasa di wilayah administratif Ibu Kota.', i: MapPin },
                                { t: 'Gedung Fisik Nyata', d: 'Bukan sekadar alamat surat. Gedung BBC dapat dikunjungi & diverifikasi.', i: Building2 },
                                { t: 'Resepsionis Aktif', d: 'Handling surat & paket profesional dengan notifikasi WhatsApp/Email.', i: Shield },
                                { t: 'Meeting Room Premium', d: 'Akses ruang pertemuan per jam untuk kebutuhan pertemuan klien.', i: Map }
                            ].map((feat, i) => (
                                <div key={i} className="flex gap-4 p-8 bg-bg-paper border border-primary/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <feat.i className="w-8 h-8 text-accent shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-primary text-base mb-1">{feat.t}</h4>
                                        <p className="text-charcoal/40 text-[10px] leading-relaxed uppercase tracking-widest font-bold">{feat.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl mt-16 mb-8 font-heading">Siapa yang Membutuhkan Layanan Ini?</h2>
                        <ul className="space-y-4 text-charcoal/70">
                            <li><CheckCircle2 className="w-5 h-5 text-accent inline mr-3" /> <strong>Pengusaha di Bintaro Jaya</strong> yang ingin kantor dekat rumah tapi beralamat Jakarta Selatan.</li>
                            <li><CheckCircle2 className="w-5 h-5 text-accent inline mr-3" /> <strong>Konsultan & Profesional Jasa</strong> yang butuh PKP dengan alamat DKI Jakarta.</li>
                            <li><CheckCircle2 className="w-5 h-5 text-accent inline mr-3" /> <strong>Startup Baru</strong> yang belum butuh ruang fisik harian tapi butuh domisili resmi.</li>
                        </ul>

                        <div className="not-prose border border-primary/5 p-12 rounded-3xl bg-bg-paper mt-20 shadow-xl border-t-8 border-accent">
                            <h3 className="text-2xl font-bold text-primary mb-6 font-heading">FAQ: Virtual Office Bintaro</h3>
                            <div className="space-y-8">
                                <div>
                                    <h4 className="font-bold text-primary mb-2">Apakah bisa untuk PKP Bisnis Jasa?</h4>
                                    <p className="text-charcoal/70 text-sm leading-relaxed">Sangat bisa. Untuk KBLI Jasa, VO BBC di Jakarta Selatan memenuhi syarat pendaftaran PKP. Kami menyediakan surat domisili gedung sah.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-2">Bagaimana memastikan alamatnya Jaksel?</h4>
                                    <p className="text-charcoal/70 text-sm leading-relaxed">Alamat kami di Pesanggrahan, Jaksel 12330. Dapat diverifikasi melalui sistem administrasi kependudukan DKI Jakarta atau Google Maps.</p>
                                </div>
                            </div>
                        </div>

                        <div className="not-prose bg-primary p-16 rounded-[4rem] text-center text-white shadow-2xl mt-20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                            <h3 className="text-3xl lg:text-5xl font-bold mb-8 !text-white leading-tight font-heading">Gunakan Alamat Bintaro Jakarta Selatan</h3>
                            <p className="text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                                Virtual office dari gedung fisik berkualitas, resepsionis aktif, dan surat domisili sah untuk pertumbuhan bisnis Anda.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                                <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-lg h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                                    <Link href="/virtual-office">Tanya Ketersediaan</Link>
                                </Button>
                                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary rounded-none h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                                    <Link href="/virtual-office">Lihat Semua Paket</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="mt-12 text-[10px] text-charcoal/40 font-bold uppercase tracking-[0.3em] flex flex-wrap gap-4 justify-center">
                            <Link href="/virtual-office-jakarta-selatan" className="hover:text-accent transition-colors">Virtual Office Jakarta Selatan</Link>
                            <Link href="/alamat-bisnis-jakarta-selatan" className="hover:text-accent transition-colors">Alamat Bisnis Jakarta Selatan</Link>
                            <Link href="/harga-virtual-office-jakarta-selatan" className="hover:text-accent transition-colors">Harga Virtual Office Jakarta Selatan</Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="container mx-auto px-6 py-24 border-t border-primary/5">
                <RelatedContent articles={relatedArticles} title="Insight Lokal" />
            </footer>
        </main>
    )
}
