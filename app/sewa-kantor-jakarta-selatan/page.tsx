import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ArticleHeader from '@/components/seo/ArticleHeader'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'
import Script from 'next/script'
import { Check, Mail, MessageCircle, MapPin, Building2, TrendingUp, Shield, Users, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const currentYear = new Date().getFullYear();
const title = 'Sewa Kantor Jakarta Selatan | Perbandingan Area, Harga & Akses'
const description = 'Panduan lengkap memilih lokasi sewa kantor di Jakarta Selatan. Perbandingan area TB Simatupang, Bintaro, Pondok Indah, dan Fatmawati untuk bisnis Anda.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/sewa-kantor-jakarta-selatan' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/sewa-kantor-jakarta-selatan',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/hero-sewa-kantor-jakarta-selatan.jpg' }]
    }
}

const relatedArticles = [
    { title: 'Harga Sewa Kantor Bintaro', description: 'Panduan lengkap biaya sewa kantor di kawasan Bintaro.', href: '/harga-sewa-kantor-bintaro' },
    { title: 'Virtual Office Jakarta Selatan', description: 'Solusi alamat bisnis profesional tanpa kantor fisik.', href: '/virtual-office-jakarta-selatan' },
    { title: 'Kantor Dekat Tol Veteran', description: 'Akses cepat Jakarta Selatan dari seluruh penjuru Jabotabek.', href: '/kantor-dekat-tol-veteran' }
]

export default function Page() {
    const waMessage = "Hallo, saya ingin info sewa kantor di Jakarta Selatan."

    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor-jakarta-selatan/#webpage",
                "url": "https://www.bintarobusinesscentre.com/sewa-kantor-jakarta-selatan",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor-jakarta-selatan/#article",
                "headline": title,
                "description": description,
                "image": "https://www.bintarobusinesscentre.com/images/hero-sewa-kantor-jakarta-selatan.jpg",
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor-jakarta-selatan/#breadcrumb",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.bintarobusinesscentre.com/" },
                    { "@type": "ListItem", "position": 2, "name": "Sewa Kantor Jakarta Selatan" }
                ]
            }
        ]
    }

    return (
        <main className="bg-white">
            <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }} />

            {/* HERO SECTION */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-40 bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/images/hero-sewa-kantor-jakarta-selatan.jpg"
                        alt="Sewa Kantor Jakarta Selatan"
                        fill
                        className="object-cover grayscale"
                        priority
                    />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <SEOBreadcrumbs items={[{ label: 'Sewa Kantor Jakarta Selatan' }]} />
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.4em] mb-8 mt-12">Hub Page — Sewa Kantor Cluster</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 font-heading">
                            Sewa Kantor di Jakarta Selatan: Panduan Memilih Lokasi yang Tepat
                        </h1>
                        <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-2xl font-light">
                            Jakarta Selatan bukan hanya wilayah residensial premium—ini adalah salah satu pusat bisnis paling aktif di Indonesia. Panduan faktual memetakan pilihan area, harga, dan akses.
                        </p>
                    </div>
                </div>
            </section>

            {/* INTRO SECTION */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-start max-w-7xl mx-auto">
                        <div className="lg:col-span-8 prose prose-lg prose-slate max-w-none">
                            <p className="text-xl leading-relaxed text-primary/80 font-medium italic border-l-4 border-accent pl-8 py-4 bg-accent/5 rounded-r-3xl">
                                Jakarta Selatan memiliki kombinasi yang jarang ditemukan di kota lain: infrastruktur korporat yang mapan, kawasan residensial premium yang berdampingan dengan koridor bisnis, dan akses tol yang menghubungkan area ini ke seluruh Jabotabek.
                            </p>

                            <h2 className="text-3xl font-bold text-primary mt-16 mb-8 font-heading">Mengapa Jakarta Selatan menjadi pilihan utama?</h2>
                            <p>
                                Dari sisi regulasi, Jakarta Selatan berada dalam yurisdiksi DKI Jakarta. Artinya, perusahaan yang berdomisili di sini mendapatkan akses ke sistem administrasi bisnis Jakarta—termasuk pengurusan PKP, NIB, dan domisili perusahaan yang diproses oleh kantor-kantor pelayanan Jakarta Selatan. Ini berbeda signifikan dari wilayah yang secara populer disebut "Bintaro" tapi secara administratif masuk ke Tangerang Selatan.
                            </p>

                            <h2 className="text-3xl font-bold text-primary mt-16 mb-8 font-heading">Area-area utama sewa kantor di Jakarta Selatan</h2>

                            <div className="grid sm:grid-cols-2 gap-8 not-prose mt-12">
                                <div className="p-8 bg-bg-paper border border-primary/5 hover:border-accent transition-all duration-300">
                                    <h3 className="text-xl font-bold text-primary mb-4 font-heading">TB Simatupang</h3>
                                    <p className="text-sm text-charcoal/70 leading-relaxed mb-6">Koridor korporat modern dengan konsentrasi gedung grade A tertinggi. Cocok untuk MNC dan firma hukum internasional.</p>
                                </div>
                                <div className="p-8 bg-bg-paper border border-primary/5 hover:border-accent transition-all duration-300">
                                    <h3 className="text-xl font-bold text-primary mb-4 font-heading">Kebayoran Baru</h3>
                                    <p className="text-sm text-charcoal/70 leading-relaxed mb-6">Kawasan mapan dekat pusat kota dengan ekosistem bisnis yang sangat matang. Tarif kompetitif untuk profesional.</p>
                                </div>
                                <div className="p-8 bg-accent/5 border border-accent/20 hover:border-accent transition-all duration-300">
                                    <h3 className="text-xl font-bold text-primary mb-4 font-heading">Bintaro (Jaksel)</h3>
                                    <p className="text-sm text-charcoal/70 leading-relaxed mb-6">Area berkembang dengan akses tol strategis. Ideal untuk SME dan startup yang ingin alamat Jakarta Selatan.</p>
                                    <InternalLink href="/sewa-kantor" anchorType="brand-service" position="mid-content">Cek BBC di Jakarta Selatan</InternalLink>
                                </div>
                                <div className="p-8 bg-bg-paper border border-primary/5 hover:border-accent transition-all duration-300">
                                    <h3 className="text-xl font-bold text-primary mb-4 font-heading">Pondok Indah</h3>
                                    <p className="text-sm text-charcoal/70 leading-relaxed mb-6">Premium residensial bertemu bisnis. Aura prestisius dengan harga sewa segmen atas.</p>
                                    <InternalLink href="/harga-sewa-kantor-bintaro" anchorType="descriptive" position="mid-content">Cek Perbandingan Harga</InternalLink>
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold text-primary mt-16 mb-12 font-heading text-center">Perbandingan Karakteristik Per Area</h2>
                            <div className="not-prose overflow-x-auto border border-primary/5 shadow-2xl mb-16 rounded-3xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-primary text-white">
                                            <th className="p-6 font-bold text-xs uppercase tracking-widest">Area</th>
                                            <th className="p-6 font-bold text-xs uppercase tracking-widest">Rentang Harga SO*</th>
                                            <th className="p-6 font-bold text-xs uppercase tracking-widest">Keunggulan</th>
                                            <th className="p-6 font-bold text-xs uppercase tracking-widest">Cocok untuk</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-primary/5">
                                        {[
                                            { area: 'TB Simatupang', price: 'Rp 8–20 jt/bln', win: 'Grade A, korporat', fit: 'MNC, firma hukum' },
                                            { area: 'Kebayoran Baru', price: 'Rp 6–15 jt/bln', win: 'Mapan, dekat pusat', fit: 'Konsultan, profesional' },
                                            { area: 'Bintaro (Jaksel)', price: 'Rp 3–8 jt/bln', win: 'Tol, residensial', fit: 'SME, startup' },
                                            { area: 'Pondok Indah', price: 'Rp 8–18 jt/bln', win: 'Premium, prestisius', fit: 'Bisnis segmen atas' },
                                            { area: 'Fatmawati', price: 'Rp 4–10 jt/bln', win: 'MRT, moderat', fit: 'Tim berbasis transit' }
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-accent/5 transition-colors">
                                                <td className="p-6 font-bold text-primary">{row.area}</td>
                                                <td className="p-6 font-bold text-accent">{row.price}</td>
                                                <td className="p-6">{row.win}</td>
                                                <td className="p-6">{row.fit}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="p-6 bg-bg-paper text-[10px] text-charcoal/40 uppercase tracking-widest font-bold text-center">
                                    *Estimasi serviced office all-inclusive per unit. Harga bervariasi tergantung ukuran & fasilitas.
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold text-primary mt-16 mb-8 font-heading">Jenis kantor yang tersedia</h2>
                            <p>
                                <strong>Serviced office — solusi siap pakai</strong>. Ruangan yang dilengkapi furniture, internet, utilitas, dan resepsionis dalam satu harga. <InternalLink href="/sewa-kantor" anchorType="brand-service" position="mid-content">Serviced office BBC</InternalLink> mencakup seluruh fasilitas dalam satu paket all-inclusive.
                            </p>
                            <p>
                                <strong>Virtual office — alamat tanpa ruang fisik</strong>. Memberikan alamat bisnis Jakarta Selatan tanpa biaya sewa kantor penuh. <InternalLink href="/virtual-office-jakarta-selatan" anchorType="service-location" position="mid-content">Layanan Virtual Office Jakarta Selatan</InternalLink> adalah opsi efisien untuk bisnis jasa.
                            </p>

                            <div className="bg-primary p-12 rounded-[3rem] text-white my-16 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                                <h3 className="text-2xl font-bold mb-6 !text-white">Tips Memilih Area Kantor</h3>
                                <p className="text-white/80 leading-relaxed mb-8">
                                    Tanyakan dulu: dari mana sebagian besar tim Anda berangkat? Di mana klien utama Anda berada? Apakah bisnis Anda memerlukan alamat untuk PKP atau hanya untuk korespondensi? Jawaban ini akan mempersempit pilihan lebih cepat dari perbandingan harga manapun.
                                </p>
                                <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none px-8 py-6 font-bold uppercase tracking-widest text-xs h-auto" asChild>
                                    <Link href="/sewa-kantor">Cek Pilihan Ruang Kantor</Link>
                                </Button>
                            </div>

                            <h2 className="text-3xl font-bold text-primary mt-16 mb-12 font-heading">Frequently Asked Questions</h2>
                            <div className="not-prose space-y-6 mb-16">
                                {[
                                    { q: "Di mana area paling strategis untuk kantor di Jakarta Selatan?", a: "Tergantung kebutuhan bisnis. Untuk korporat: TB Simatupang. Untuk harga & akses: Bintaro (Jakarta Selatan). Untuk klien high-end: Pondok Indah." },
                                    { q: "Apakah Jakarta Selatan lebih murah dari Jakarta Pusat?", a: "Secara umum ya, terutama area berkembang seperti Bintaro dan Cilandak. Area premium seperti TB Simatupang bisa setara Jakarta Pusat." },
                                    { q: "Apakah semua Bintaro termasuk Jakarta Selatan?", a: "Tidak. Sebagian besar Bintaro Jaya berada di Tangerang Selatan. Hanya area Pesanggrahan yang secara administratif masuk Jakarta Selatan." }
                                ].map((faq, i) => (
                                    <div key={i} className="p-8 border border-primary/5 rounded-2xl hover:border-accent transition-colors">
                                        <h4 className="font-bold text-primary mb-4">{faq.q}</h4>
                                        <p className="text-charcoal/70 text-sm leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="not-prose bg-bg-paper p-12 border-t-4 border-accent shadow-xl mb-16">
                                <p className="text-lg leading-relaxed text-charcoal/80 mb-8 font-light italic">
                                    "Bintaro Business Centre menyediakan serviced office di Jakarta Selatan—bukan Tangerang Selatan—dengan fasilitas all-inclusive pendukung 1.800+ perusahaan sejak 2007."
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button className="bg-primary text-white hover:bg-accent rounded-none shadow-lg h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                                        <Link href="/sewa-kantor">Daftar Harga & Unit</Link>
                                    </Button>
                                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                                        <Link href="/sewa-kantor">Jadwalkan Survey</Link>
                                    </Button>
                                </div>
                            </div>

                            <p className="text-xs text-charcoal/40 font-bold uppercase tracking-widest">
                                Artikel terkait: <Link href="/harga-sewa-kantor-bintaro" className="text-accent underline">Harga Sewa Kantor Bintaro</Link> · <Link href="/virtual-office-jakarta-selatan" className="text-accent underline">Virtual Office Jakarta Selatan</Link>
                            </p>
                        </div>

                        <aside className="lg:col-span-4 sticky top-32 space-y-12">
                            <div className="p-8 bg-primary rounded-3xl text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
                                <h3 className="text-xl font-bold mb-6 relative z-10 font-heading">Butuh Bantuan Memilih?</h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-8 relative z-10">
                                    Tim konsultan kami siap membantu Anda memetakan lokasi terbaik sesuai dengan KBLI dan target klien bisnis Anda.
                                </p>
                                <Button className="w-full bg-accent text-white hover:bg-white hover:text-primary rounded-none py-6 font-bold uppercase tracking-widest text-[10px] h-auto" asChild>
                                    <Link href="/sewa-kantor">
                                        Eksplorasi Layanan Kantor
                                    </Link>
                                </Button>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-primary mb-8 font-heading px-2">Layanan Terkait</h3>
                                <div className="space-y-4">
                                    {[
                                        { title: 'Sewa Kantor', desc: 'Unit siap pakai all-inclusive', href: '/sewa-kantor' },
                                        { title: 'Virtual Office', desc: 'Alamat bisnis Jakarta Selatan', href: '/virtual-office' },
                                        { title: 'Jasa Legalitas', desc: 'Pendirian PT/CV & PKP', href: '/legal/pendirian-pt-jakarta-selatan' }
                                    ].map((s, i) => (
                                        <Link key={i} href={s.href} className="flex items-center p-6 bg-white border border-primary/5 hover:border-accent transition-all group">
                                            <div className="flex-1">
                                                <h4 className="font-bold text-primary text-sm mb-1 group-hover:text-accent transition-colors">{s.title}</h4>
                                                <p className="text-charcoal/40 text-[10px] uppercase tracking-widest font-bold">{s.desc}</p>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <RelatedContent articles={relatedArticles} title="Bacaan Strategis" layout="list" />
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    )
}
