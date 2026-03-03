import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'
import Script from 'next/script'
import { Check, MessageCircle, MapPin, Building2, TrendingUp, Shield, Users, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const currentYear = new Date().getFullYear();
const title = 'Kantor Dekat Bintaro Jaya | Serviced Office Jakarta Selatan & Akses Mudah'
const description = 'Cari sewa kantor dekat Bintaro Jaya? Dapatkan alamat Jakarta Selatan yang sah untuk domisili bisnis dan PKP di BBC. Akses tol Veteran, fasilitas lengkap.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/hero-sewa-kantor-bintaro.jpg' }]
    }
}

const relatedArticles = [
    { title: 'Kantor Dekat Tol Veteran', description: 'Akses cepat Jakarta Selatan via JORR W2S.', href: '/kantor-dekat-tol-veteran' },
    { title: 'Harga Sewa Kantor Bintaro', description: 'Range harga sewa kantor terbaru di kawasan Bintaro.', href: '/harga-sewa-kantor-bintaro' },
    { title: 'Sewa Kantor Jakarta Selatan', description: 'Panduan memilih lokasi kantor strategis di Jaksel.', href: '/sewa-kantor-jakarta-selatan' }
]

export default function Page() {
    const waMessage = "Hallo, saya ingin info sewa kantor di Jakarta Selatan."

    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya/#webpage",
                "url": "https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya/#article",
                "headline": title,
                "description": description,
                "image": "https://www.bintarobusinesscentre.com/images/hero-sewa-kantor-bintaro.jpg",
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
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/images/hero-sewa-kantor-bintaro.jpg"
                        alt="Kantor Dekat Bintaro Jaya"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <SEOBreadcrumbs items={[{ label: 'Kantor Dekat Bintaro Jaya' }]} />
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.4em] mb-8 mt-12 font-sans">Weapon Page — Sewa Kantor Cluster</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 font-heading">
                            Kantor Dekat Bintaro Jaya: Alamat Jakarta Selatan dalam Jangkauan
                        </h1>
                        <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto font-light mb-12">
                            Bagi pengusaha yang tinggal di Bintaro Jaya dan butuh kantor dengan alamat Jakarta Selatan yang sah untuk domisili bisnis & PKP.
                        </p>
                        <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-xl h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                            <Link href="/sewa-kantor">Eksplorasi Pilihan Kantor</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto prose prose-lg prose-slate prose-headings:text-primary prose-headings:font-heading prose-headings:font-bold prose-accent:text-accent">
                        <p className="text-xl leading-relaxed text-charcoal/80 font-medium italic border-l-4 border-accent pl-8 py-4 bg-accent/5 rounded-r-3xl">
                            Bintaro Jaya adalah kawasan hunian terbesar di selatan Jakarta—tapi tidak seluruhnya masuk wilayah DKI Jakarta. Kantor siap pakai BBC memberikan Anda alamat Jakarta Selatan di perbatasan Bintaro Jaya.
                        </p>

                        <h2 className="text-3xl mt-16 mb-8 font-heading">Kenapa Memilih Kantor di Jakarta Selatan?</h2>
                        <p>
                            Alasannya sederhana: <strong>Administrasi & Yurisdiksi</strong>. Pengusaha di Bintaro Jaya Sektor 7, 9, atau sekitarnya memilih kantor di sisi Jakarta Selatan karena kebutuhan yurisdiksi DKI Jakarta untuk PKP, NPWP perusahaan, dan administrasi perpajakan pusat bisnis Ibu Kota.
                        </p>
                        <p>
                            Alamat Jakarta Selatan memberikan sinyal kredibilitas yang berbeda dari alamat Tangerang Selatan—terutama untuk proposal tender dan hubungan klien korporat Jakarta.
                        </p>

                        <h2 className="text-3xl mt-16 mb-8 font-heading">Akses Strategis dari Bintaro Jaya</h2>
                        <p>
                            Bintaro Business Centre berlokasi di Jl. RC. Veteran—berbatasan langsung dengan kawasan Bintaro Jaya di sisi timur. Akses tempuh sangat singkat melalui koridor Jl. RC. Veteran atau via <strong>Pintu Tol Veteran</strong> pada ruas JORR W2S.
                        </p>
                        <p>
                            Ini adalah model kantor paling logis: Alamat Jakarta Selatan, dengan jarak tempuh harian (commute) yang sangat singkat dari rumah Anda di Bintaro Jaya.
                        </p>

                        <div className="bg-primary p-12 rounded-[3rem] text-white my-16 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                            <h3 className="text-2xl font-bold mb-8 !text-white font-heading underline decoration-accent underline-offset-8">Apa yang didapatkan di BBC?</h3>
                            <div className="grid sm:grid-cols-2 gap-8 not-prose">
                                {[
                                    { t: 'Fasilitas Siap Pakai', d: 'Ruangan full furniture, internet dedicated, resepsionis profesional.', i: Building2 },
                                    { t: 'All-Inclusive Price', d: 'Satu harga bulanan mencakup listrik, AC, dan maintenance.', i: Shield },
                                    { t: 'Alamat Jakarta Selatan', d: 'Sah untuk domisili bisnis, NIB, dan PKP (KBLI-based).', i: MapPin },
                                    { t: 'Meeting Room', d: 'Quota jam bulanan inklusif dalam paket sewa kantor.', i: Clock }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <item.i className="w-8 h-8 text-accent shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-white text-sm mb-1">{item.t}</h4>
                                            <p className="text-white/60 text-[10px] leading-relaxed">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12 text-center">
                                <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none px-10 py-5 font-bold uppercase tracking-widest text-[10px] h-auto shadow-lg" asChild>
                                    <InternalLink href="/sewa-kantor" anchorType="brand-service" position="cta" className="!text-current">Lihat Paket Sewa Kantor</InternalLink>
                                </Button>
                            </div>
                        </div>

                        <h2 className="text-3xl mt-16 mb-8 font-heading">Untuk bisnis apa lokasi ini relevan?</h2>
                        <ul className="space-y-4 text-charcoal/70">
                            <li><CheckCircle2 className="w-5 h-5 text-accent inline mr-3" /> <strong>Pengusaha Bintaro Jaya</strong>: Menghemat waktu perjalanan tanpa mengorbankan yurisdiksi Jakarta Selatan.</li>
                            <li><CheckCircle2 className="w-5 h-5 text-accent inline mr-3" /> <strong>SME Distribusi & Trading</strong>: Butuh alamat Jaksel untuk PKP (KBLI Perdagangan) dengan akses tol mudah.</li>
                            <li><CheckCircle2 className="w-5 h-5 text-accent inline mr-3" /> <strong>Profesional Jasa</strong>: Butuh ruang pertemuan klien yang prestisius dan mudah dijangkau dari Bintaro.</li>
                        </ul>

                        <div className="not-prose border border-primary/5 p-12 rounded-3xl bg-bg-paper mt-20 shadow-xl border-t-8 border-accent">
                            <h3 className="text-2xl font-bold text-primary mb-6 font-heading">FAQ: Kantor Dekat Bintaro Jaya</h3>
                            <div className="space-y-8">
                                <div>
                                    <h4 className="font-bold text-primary mb-2">Apakah BBC benar-benar di Jakarta Selatan?</h4>
                                    <p className="text-charcoal/70 text-sm leading-relaxed">Ya. BBC berlokasi di Kel. Bintaro, Kec. Pesanggrahan, Jakarta Selatan. Administrasi kami mengikuti sistem DKI Jakarta, bukan Tangerang Selatan.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-2">Berapa lama perjalanan dari Sektor 7 ke BBC?</h4>
                                    <p className="text-charcoal/70 text-sm leading-relaxed">Hanya sekitar 10–20 menit via Jl. RC. Veteran. Sangat praktis bagi Anda yang tinggal di kawasan Bintaro Jaya.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 text-center">
                            <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-xl h-auto py-6 px-12 text-xs font-bold uppercase tracking-widest" asChild>
                                <Link href="/sewa-kantor">Cek Ketersediaan Unit</Link>
                            </Button>
                        </div>

                        <div className="mt-12 text-[10px] text-charcoal/40 font-bold uppercase tracking-[0.3em] flex flex-wrap gap-4 justify-center">
                            <Link href="/kantor-dekat-tol-veteran" className="hover:text-accent transition-colors">Kantor Dekat Tol Veteran</Link>
                            <Link href="/harga-sewa-kantor-bintaro" className="hover:text-accent transition-colors">Harga Sewa Kantor Bintaro</Link>
                            <Link href="/sewa-kantor-jakarta-selatan" className="hover:text-accent transition-colors">Sewa Kantor Jakarta Selatan</Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="container mx-auto px-6 py-24 border-t border-primary/5">
                <RelatedContent articles={relatedArticles} title="Inspirasi Lokasi" />
            </footer>
        </main>
    )
}
