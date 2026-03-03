import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'
import Script from 'next/script'
import { Check, MessageCircle, ArrowRight, CheckCircle2, DollarSign, Calculator, Search, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

const currentYear = new Date().getFullYear();
const title = 'Harga Virtual Office Jakarta Selatan 2026 | Perbandingan Paket'
const description = 'Update harga virtual office Jakarta Selatan 2026. Perbandingan paket basic hingga premium, faktor penentu harga, dan tips memilih value terbaik untuk bisnis Anda.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/harga-virtual-office-jakarta-selatan' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/harga-virtual-office-jakarta-selatan',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/hero-virtual-office-jakarta-selatan.jpg' }]
    }
}

const relatedArticles = [
    { title: 'Virtual Office Jakarta Selatan', description: 'Solusi alamat bisnis profesional tanpa kantor fisik.', href: '/virtual-office-jakarta-selatan' },
    { title: 'Virtual Office Bintaro', description: 'Alamat Jakarta Selatan untuk pengusaha di kawasan Bintaro.', href: '/virtual-office-bintaro' },
    { title: 'Alamat Bisnis Jakarta Selatan', description: 'Kredibilitas bisnis yang dimulai dari satu keputusan alamat.', href: '/alamat-bisnis-jakarta-selatan' }
]

export default function Page() {
    const waMessage = "Hallo, saya ingin info virtual office Jakarta Selatan."

    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/harga-virtual-office-jakarta-selatan/#webpage",
                "url": "https://www.bintarobusinesscentre.com/harga-virtual-office-jakarta-selatan",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/harga-virtual-office-jakarta-selatan/#article",
                "headline": title,
                "description": description,
                "image": "https://www.bintarobusinesscentre.com/images/hero-virtual-office-jakarta-selatan.jpg",
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
                <div className="absolute inset-0 opacity-10 grayscale">
                    <Image
                        src="/images/hero-virtual-office-jakarta-selatan.jpg"
                        alt="Harga Virtual Office Jakarta Selatan"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center lg:text-left">
                    <SEOBreadcrumbs items={[{ label: 'Harga Virtual Office Jakarta Selatan' }]} />
                    <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.4em] mb-8 mt-12 font-sans">Weapon Page — Virtual Office Cluster</span>
                    <h1 className="text-4xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 font-heading max-w-4xl">
                        Harga Virtual Office di Jakarta Selatan: Panduan {currentYear}
                    </h1>
                    <p className="text-xl text-white/80 leading-relaxed max-w-2xl font-light mb-12">
                        Pahami struktur harga virtual office secara tepat agar Anda mendapatkan nilai terbaik tanpa biaya tersembunyi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-xl h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                            <Link href="/virtual-office">Eksplorasi Paket Virtual Office</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto prose prose-lg prose-slate prose-headings:text-primary prose-headings:font-heading prose-headings:font-bold">
                        <p className="text-2xl leading-relaxed text-charcoal/60 font-light mb-16 text-center lg:text-left">
                            Harga virtual office bervariasi signifikan. Perbedaan harga tidak selalu mencerminkan perbedaan kualitas, namun seringkali soal prestige alamat dan kelengkapan layanan.
                        </p>

                        <h2 className="text-3xl mt-16 mb-12 text-center lg:text-left">Rentang Harga Virtual Office Jakarta Selatan</h2>
                        <div className="not-prose overflow-x-auto border border-primary/5 shadow-2xl mb-16 rounded-3xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-primary text-white text-xs uppercase tracking-widest">
                                        <th className="p-6 font-bold">Kategori Paket</th>
                                        <th className="p-6 font-bold">Rentang Harga</th>
                                        <th className="p-6 font-bold">Biasanya Termasuk</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-primary/5">
                                    {[
                                        { t: 'Basic', p: 'Rp 250rb – 500rb/bln', i: 'Alamat bisnis + penerimaan surat' },
                                        { t: 'Standard', p: 'Rp 500rb – 900rb/bln', i: '+ Notifikasi digital + meeting room terbatas' },
                                        { t: 'Premium / Legalitas', p: 'Rp 900rb – 1.5jt/bln', i: '+ Meeting room luas + support pendirian PT' }
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-accent/5 transition-colors">
                                            <td className="p-6 font-bold text-primary">{row.t}</td>
                                            <td className="p-6 font-bold text-accent">{row.p}</td>
                                            <td className="p-6 text-charcoal/60 font-medium italic">{row.i}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-3xl mt-16 mb-8 font-heading">Faktor Penentu Harga</h2>
                        <div className="grid sm:grid-cols-3 gap-8 not-prose mb-16">
                            {[
                                { t: 'Lokasi & Resepsi', d: 'TB Simatupang lebih mahal dari Bintaro/Fatmawati.', i: Search },
                                { t: 'Gedung Fisik', d: 'Penyedia dengan gedung fisik real memberi keamanan verifikasi tax.', i: ShieldCheck },
                                { t: 'Layanan Ekstra', d: 'Kuota meeting room & handling telepon menambah nilai paket.', i: Calculator }
                            ].map((f, i) => (
                                <div key={i} className="p-8 bg-bg-paper border border-primary/5 rounded-2xl hover:border-accent transition-colors shadow-sm">
                                    <f.i className="w-10 h-10 text-accent mb-6" />
                                    <h4 className="font-bold text-primary mb-2 text-base">{f.t}</h4>
                                    <p className="text-charcoal/60 text-xs leading-relaxed">{f.d}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl mt-16 mb-8 font-heading">Harga vs Nilai: Cara Membaca Penawaran</h2>
                        <p>
                            Penyedia murah tanpa gedung fisik berisiko menyebabkan penolakan PKP atau masalah verifikasi. Sebaliknya, <InternalLink href="/virtual-office" anchorType="brand-service" position="mid-content">BBC memiliki gedung fisik aktif sejak 2007</InternalLink>, memberikan kepastian legal yang tidak bisa dihargai sekadar angka brosur.
                        </p>

                        <div className="bg-primary p-12 rounded-[3rem] text-white my-16 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                            <h3 className="text-2xl font-bold mb-8 !text-white font-heading">Paket Virtual Office BBC</h3>
                            <p className="text-white/80 mb-8 font-light">
                                Penawaran mulai <strong>Rp 250.000 per bulan</strong>—mencakup alamat bisnis Jakarta Selatan, penerimaan surat, dan notifikasi. Bundel legalitas (pendirian PT lengkap) mulai Rp 6 juta.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-lg h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                                    <Link href="/virtual-office">Cek Detail Harga & Paket</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="not-prose border border-primary/5 p-12 rounded-3xl bg-bg-paper mt-20 shadow-xl border-t-8 border-accent">
                            <h3 className="text-2xl font-bold text-primary mb-6 font-heading">FAQ: Biaya Virtual Office</h3>
                            <div className="space-y-8">
                                <div>
                                    <h4 className="font-bold text-primary mb-2">Apakah paket termurah cukup untuk PT?</h4>
                                    <p className="text-charcoal/70 text-sm leading-relaxed">Untuk pendirian PT dan NIB, paket Basic umumnya sudah mencukupi. PKP Jasa mungkin butuh paket Standard untuk verifikasi domisili gedung.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-2">Ada biaya di luar paket bulanan?</h4>
                                    <p className="text-charcoal/70 text-sm leading-relaxed">Penggunaan meeting room di luar kuota dikenakan biaya per jam (Rp 50rb/jam - Rp 100rb/jam). Tidak ada biaya tersembunyi lain.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 text-center">
                            <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-xl h-auto py-6 px-12 text-xs font-bold uppercase tracking-widest" asChild>
                                <Link href="/virtual-office">Bandingkan Paket Sekarang</Link>
                            </Button>
                        </div>

                        <div className="mt-12 text-[10px] text-charcoal/40 font-bold uppercase tracking-[0.3em] flex flex-wrap gap-4 justify-center">
                            <Link href="/virtual-office-jakarta-selatan" className="hover:text-accent transition-colors">Virtual Office Jakarta Selatan</Link>
                            <Link href="/virtual-office-bintaro" className="hover:text-accent transition-colors">Virtual Office Bintaro</Link>
                            <Link href="/alamat-bisnis-jakarta-selatan" className="hover:text-accent transition-colors">Alamat Bisnis Jakarta Selatan</Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="container mx-auto px-6 py-24 border-t border-primary/5">
                <RelatedContent articles={relatedArticles} title="Bacaan Strategis" />
            </footer>
        </main>
    )
}
