import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'
import Script from 'next/script'
import { Check, MessageCircle, MapPin, Building2, Shield, ArrowRight, CheckCircle2, Award, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'

const currentYear = new Date().getFullYear();
const title = 'Alamat Bisnis Jakarta Selatan | Kredibilitas & Legalitas Perusahaan'
const description = 'Bagaimana mendapatkan alamat bisnis Jakarta Selatan yang sah? Panduan menggunakan virtual/serviced office untuk pendirian PT, NIB, dan PKP di DKI Jakarta.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/alamat-bisnis-jakarta-selatan' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/alamat-bisnis-jakarta-selatan',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/hero-alamat-bisnis-jakarta-selatan.jpg' }]
    }
}

const relatedArticles = [
    { title: 'Virtual Office Jakarta Selatan', description: 'Solusi alamat bisnis profesional tanpa kantor fisik.', href: '/virtual-office-jakarta-selatan' },
    { title: 'Harga Virtual Office Jakarta Selatan', description: 'Perbandingan paket dan biaya virtual office terbaru.', href: '/harga-virtual-office-jakarta-selatan' },
    { title: 'Virtual Office Bintaro', description: 'Alamat Jakarta Selatan untuk pengusaha di kawasan Bintaro.', href: '/virtual-office-bintaro' }
]

export default function Page() {
    const waMessage = "Hallo, saya ingin info virtual office Jakarta Selatan."

    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/alamat-bisnis-jakarta-selatan/#webpage",
                "url": "https://www.bintarobusinesscentre.com/alamat-bisnis-jakarta-selatan",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/alamat-bisnis-jakarta-selatan/#article",
                "headline": title,
                "description": description,
                "image": "https://www.bintarobusinesscentre.com/images/hero-alamat-bisnis-jakarta-selatan.jpg",
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            }
        ]
    }

    return (
        <main className="bg-white text-charcoal">
            <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }} />

            {/* HERO */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-40 bg-primary group overflow-hidden">
                <div className="absolute inset-0 opacity-15 grayscale group-hover:grayscale-0 transition-all duration-1000">
                    <Image
                        src="/images/hero-alamat-bisnis-jakarta-selatan.jpg"
                        alt="Alamat Bisnis Jakarta Selatan"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <SEOBreadcrumbs items={[{ label: 'Alamat Bisnis Jakarta Selatan' }]} />
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.4em] mb-8 mt-12 font-sans">Weapon Page — Virtual Office Cluster</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 font-heading">
                            Alamat Bisnis Jakarta Selatan: Kredibilitas Dimulai dari Sini
                        </h1>
                        <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto font-light mb-12">
                            Alamat bisnis adalah sinyal pertama yang dibaca oleh klien & instansi. Alamat Jakarta Selatan memberikan bobot berbeda dibanding wilayah lainnya.
                        </p>
                        <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-xl h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                            <Link href="/virtual-office">Dapatkan Alamat Bisnis Sah</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center lg:text-left">
                    <div className="max-w-4xl mx-auto prose prose-lg prose-slate prose-headings:text-primary prose-headings:font-heading prose-headings:font-bold prose-accent:text-accent">
                        <p className="text-2xl leading-relaxed text-charcoal/60 font-light mb-16 text-center">
                            Memahami kaitan antara alamat bisnis, kredibilitas, dan legitimasi hukum membantu Anda mengambil langkah tepat untuk pertumbuhan perusahaan.
                        </p>

                        <h2 className="text-3xl mt-16 mb-8 font-heading">Kenapa Alamat Jakarta Selatan Begitu Penting?</h2>
                        <div className="grid sm:grid-cols-3 gap-8 not-prose mb-16">
                            {[
                                { t: 'Yurisdiksi Admin', d: 'PKP, NIB, & NPWP diproses oleh instansi Jakarta Selatan (DKI Jakarta).', i: MapPin },
                                { t: 'Kredibilitas Klien', d: 'Membangun kesan profesional di mata klien korporat & mitra strategis.', i: Award },
                                { t: 'Syarat Tender', d: 'Banyak tender besar mensyaratkan domisili perusahaan di DKI Jakarta.', i: Briefcase }
                            ].map((f, i) => (
                                <div key={i} className="p-8 bg-bg-paper border border-primary/5 rounded-2xl hover:border-accent transition-colors shadow-sm">
                                    <f.i className="w-10 h-10 text-accent mb-6" />
                                    <h4 className="font-bold text-primary mb-2 text-base">{f.t}</h4>
                                    <p className="text-charcoal/60 text-xs leading-relaxed">{f.d}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl mt-16 mb-8 font-heading">Opsi Mendapatkan Alamat Bisnis</h2>
                        <p>
                            <strong>Virtual Office</strong>. Opsi paling efisien biaya. Dapatkan alamat sah untuk pendirian PT & PKP (KBLI Jasa). <InternalLink href="/virtual-office" anchorType="brand-service" position="mid-content">Virtual Office BBC</InternalLink> beroperasi dari gedung fisik yang nyata.
                        </p>
                        <p>
                            <strong>Service Office</strong>. Jika butuh ruang fisik & PKP KBLI Perdagangan. <InternalLink href="/sewa-kantor" anchorType="brand-service" position="mid-content">Service Office BBC</InternalLink> memenuhi syarat Ditjen Pajak untuk kontrak minimum 1 tahun.
                        </p>

                        <h2 className="text-3xl mt-16 mb-12 text-center font-heading">Virtual Office vs Kantor Fisik untuk Alamat</h2>
                        <div className="not-prose overflow-x-auto border border-primary/5 shadow-2xl mb-16 rounded-3xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-primary text-white text-xs uppercase tracking-widest">
                                        <th className="p-6 font-bold">Kriteria</th>
                                        <th className="p-6 font-bold">Virtual Office</th>
                                        <th className="p-6 font-bold">Service Office</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-primary/5">
                                    {[
                                        { c: 'Biaya Bulanan', v: 'Rp 250rb - 1 jt', s: 'Rp 3 - 12 jt+' },
                                        { c: 'Domisili PT/NIB', v: '✅ Semua KBLI', s: '✅ Semua KBLI' },
                                        { c: 'PKP KBLI Jasa', v: '✅ Bisa', s: '✅ Bisa' },
                                        { c: 'PKP Perdagangan', v: '❌ Tidak bisa', s: '✅ (min. 1 tahun)' },
                                        { c: 'Verifikasi Fisik', v: 'Gedung Penyedia', s: 'Unit Khusus Anda' }
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-accent/5 transition-colors">
                                            <td className="p-6 font-bold text-primary">{row.c}</td>
                                            <td className="p-6 font-bold text-accent">{row.v}</td>
                                            <td className="p-6 font-bold text-primary">{row.s}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="not-prose border border-primary/5 p-12 rounded-3xl bg-bg-paper mt-20 shadow-xl border-t-8 border-accent">
                            <h3 className="text-2xl font-bold text-primary mb-6 font-heading">Pertanyaan Penting</h3>
                            <div className="space-y-8">
                                <div>
                                    <h4 className="font-bold text-primary mb-2">Apakah virtual office diakui untuk PT?</h4>
                                    <p className="text-charcoal/70 text-sm leading-relaxed">Sangat diakui, selama penyedia memiliki gedung fisik yang valid. BBC beroperasi dari gedung fisik di Jl. RC. Veteran No. 1-i, Jakarta Selatan.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-2">Bisa gunakan alamat rumah?</h4>
                                    <p className="text-charcoal/70 text-sm leading-relaxed">Berisiko. Alamat residensial sering ditolak untuk PKP dan pendirian PT di zona tertentu. Alamat bisnis dari penyedia resmi jauh lebih aman.</p>
                                </div>
                            </div>
                        </div>

                        <div className="not-prose bg-primary p-16 rounded-[4rem] text-center text-white shadow-2xl mt-20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                            <h3 className="text-3xl md:text-5xl font-bold mb-8 !text-white leading-tight font-heading">Butuh alamat bisnis Jakarta Selatan?</h3>
                            <p className="text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                                Dapatkan alamat bisnis sah, terjangkau, dan dapat diverifikasi segera. Cocok untuk pendirian PT dan kredibilitas profesional.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-lg h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                                    <Link href="/virtual-office">Eksplorasi Alamat Bisnis</Link>
                                </Button>
                                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary rounded-none h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                                    <Link href="/virtual-office">Lihat Paket VO</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="mt-12 text-[10px] text-charcoal/40 font-bold uppercase tracking-[0.3em] flex flex-wrap gap-4 justify-center">
                            <Link href="/virtual-office-jakarta-selatan" className="hover:text-accent transition-colors">Virtual Office Jakarta Selatan</Link>
                            <Link href="/virtual-office-bintaro" className="hover:text-accent transition-colors">Virtual Office Bintaro</Link>
                            <Link href="/harga-virtual-office-jakarta-selatan" className="hover:text-accent transition-colors">Harga Virtual Office Jakarta Selatan</Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="container mx-auto px-6 py-24 border-t border-primary/5">
                <RelatedContent articles={relatedArticles} title="Insight Bisnis" />
            </footer>
        </main>
    )
}
