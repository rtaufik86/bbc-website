import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'
import Script from 'next/script'
import { Check, MessageCircle, MapPin, Building2, TrendingUp, Clock, ArrowRight, CheckCircle2, Navigation, Gauge } from 'lucide-react'
import { Button } from '@/components/ui/button'

const currentYear = new Date().getFullYear();
const title = 'Kantor Dekat Tol Veteran Jakarta Selatan | Akses Cepat dari BSD & Serpong'
const description = 'Sewa kantor strategis dekat pintu tol Veteran (JORR W2S). Lokasi di Jakarta Selatan dengan akses super cepat dari BSD, Serpong, dan Tangerang. Cek unit di BBC.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/kantor-dekat-tol-veteran' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/kantor-dekat-tol-veteran',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/hero-lokasi.jpg' }]
    }
}

const relatedArticles = [
    { title: 'Kantor Dekat Bintaro Jaya', description: 'Infrastruktur bisnis Jakarta Selatan dalam jangkauan.', href: '/kantor-dekat-bintaro-jaya' },
    { title: 'Sewa Kantor Jakarta Selatan', description: 'Panduan memilih lokasi kantor strategis di Jaksel.', href: '/sewa-kantor-jakarta-selatan' },
    { title: 'Sewa Kantor', description: 'Unit kantor siap pakai all-inclusive di Pesanggrahan.', href: '/sewa-kantor' }
]

export default function Page() {
    const waMessage = "Hallo, saya ingin info sewa kantor di Jakarta Selatan."

    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/kantor-dekat-tol-veteran/#webpage",
                "url": "https://www.bintarobusinesscentre.com/kantor-dekat-tol-veteran",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/kantor-dekat-tol-veteran/#article",
                "headline": title,
                "description": description,
                "image": "https://www.bintarobusinesscentre.com/images/hero-lokasi.jpg",
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            }
        ]
    }

    return (
        <main className="bg-white">
            <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }} />

            {/* HERO */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-40 bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-15 grayscale">
                    <Image
                        src="/images/hero-lokasi.jpg"
                        alt="Kantor Dekat Tol Veteran"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <SEOBreadcrumbs items={[{ label: 'Kantor Dekat Tol Veteran' }]} />
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.4em] mb-8 mt-12 font-sans">Weapon Page — Sewa Kantor Cluster</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 font-heading">
                            Kantor Dekat Tol Veteran: Akses Jakarta Selatan dari Penjuru Jabotabek
                        </h1>
                        <p className="text-xl text-white/80 leading-relaxed max-w-2xl font-light mb-12">
                            Akses cepat bukan kemewahan—ini faktor produktivitas. Temukan kantor siap pakai di Pesanggrahan, Jakarta Selatan, bersinggungan langsung dengan JORR W2S.
                        </p>
                        <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-xl h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                            <Link href="/sewa-kantor">Cek Lokasi & Unit</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto prose prose-lg prose-slate prose-headings:text-primary prose-headings:font-heading prose-headings:font-bold prose-accent:text-accent">
                        <p className="text-2xl leading-relaxed text-charcoal/60 font-light mb-16">
                            Bagi pengusaha dengan mobilitas tinggi—klien di BSD hari ini, meeting di Jakarta Pusat besok—lokasi kantor tidak boleh menjadi bottleneck. Kantor di dekat pintu tol adalah aset operasional nyata.
                        </p>

                        <h2 className="text-3xl mt-16 mb-8 font-heading">Kenapa Kedekatan dengan Tol Sangat Relevan?</h2>
                        <p>
                            Akses tol tercepat berarti tim Anda masuk kerja lebih efisien. Klien dari berbagai arah—baik dari arah Tangerang, Jakarta Barat, atau TB Simatupang—dapat menemukan lokasi Anda dengan mudah via navigasi standar tanpa harus menembus kemacetan jalan-jalan kecil.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-8 not-prose my-16">
                            <div className="p-10 bg-bg-paper border-b-4 border-accent shadow-sm">
                                <Navigation className="w-10 h-10 text-accent mb-6" />
                                <h4 className="font-bold text-primary mb-4 text-xl">Dari BSD & Serpong</h4>
                                <p className="text-charcoal/70 text-sm leading-relaxed">Gunakan JORR W2S dan keluar di area Veteran. Rute langsung, tanpa navigasi jalan kecil yang membingungkan.</p>
                            </div>
                            <div className="p-10 bg-bg-paper border-b-4 border-accent shadow-sm">
                                <Gauge className="w-10 h-10 text-accent mb-6" />
                                <h4 className="font-bold text-primary mb-4 text-xl">Dari Tangerang & Jakbar</h4>
                                <p className="text-charcoal/70 text-sm leading-relaxed">Terhubung via JORR—memungkinkan akses ke BBC dari arah barat tanpa harus masuk ke pusat kemacetan Jakarta.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl mt-16 mb-8 font-heading text-center italic leading-tight">"Akses Jakarta Selatan, Hubungan Seluruh Jabotabek"</h2>
                        <p className="text-center text-charcoal/60 font-light max-w-2xl mx-auto">
                            Satu detail penting: Pintu Tol Veteran berada di perbatasan. Namun <InternalLink href="/sewa-kantor" anchorType="brand-service" position="mid-content">Bintaro Business Centre</InternalLink> berada sepenuhnya di wilayah Jakarta Selatan (DKI Jakarta), memberikan Anda legitimasi administratif yang dicari.
                        </p>

                        <div className="bg-primary p-12 rounded-[3rem] text-white my-16 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                            <h3 className="text-2xl font-bold mb-8 !text-white font-heading">Fasilitas Kantor Dekat Tol Veteran</h3>
                            <div className="space-y-6 not-prose">
                                {[
                                    { t: 'Parkir untuk 30+ Kendaraan', d: 'Tersedia gratis untuk tenant dan tamu selama jam operasional.', i: Check },
                                    { t: 'Alamat Jakarta Selatan Sah', d: 'Dibutuhkan untuk PKP, NIB, dan domisili perusahaan DKI Jakarta.', i: Check },
                                    { t: 'Fasilitas All-Inclusive', d: 'Internet dedicated, AC maintenance, listrik, & resepsionis lengkap.', i: Check }
                                ].map((row, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="bg-accent p-1 rounded-full"><row.i className="w-4 h-4 text-white" /></div>
                                        <div>
                                            <h4 className="font-bold text-white text-base mb-1">{row.t}</h4>
                                            <p className="text-white/60 text-[10px] leading-relaxed">{row.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="not-prose border border-primary/5 p-12 rounded-3xl bg-bg-paper mt-20 shadow-xl border-t-8 border-accent">
                            <h3 className="text-2xl font-bold text-primary mb-6 font-heading">FAQ: Lokasi & Akses</h3>
                            <div className="space-y-8">
                                <div>
                                    <h4 className="font-bold text-primary mb-2">Apakah parkir tersedia untuk klien?</h4>
                                    <p className="text-charcoal/70 text-sm leading-relaxed">Ya. BBC menyediakan parkir untuk 30 kendaraan, tersedia gratis selama jam operasional untuk tenant dan tamu.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-2">Mudahkah ditemukan di Google Maps?</h4>
                                    <p className="text-charcoal/70 text-sm leading-relaxed">Sangat mudah. Alamat kami: Jl. RC. Veteran No. 1-i, Bintaro, Pesanggrahan, Jakarta Selatan. Lokasi kami terdaftar akurat di Maps.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 text-center">
                            <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-xl h-auto py-6 px-12 text-xs font-bold uppercase tracking-widest" asChild>
                                <Link href="/sewa-kantor">Jadwalkan Survey Lokasi</Link>
                            </Button>
                        </div>

                        <div className="mt-12 text-[10px] text-charcoal/40 font-bold uppercase tracking-[0.3em] flex flex-wrap gap-4 justify-center">
                            <Link href="/kantor-dekat-bintaro-jaya" className="hover:text-accent transition-colors">Kantor Dekat Bintaro Jaya</Link>
                            <Link href="/harga-sewa-kantor-bintaro" className="hover:text-accent transition-colors">Harga Sewa Kantor Bintaro</Link>
                            <Link href="/sewa-kantor-jakarta-selatan" className="hover:text-accent transition-colors">Sewa Kantor Jakarta Selatan</Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="container mx-auto px-6 py-24 border-t border-primary/5">
                <RelatedContent articles={relatedArticles} title="Insight Strategis" />
            </footer>
        </main>
    )
}
