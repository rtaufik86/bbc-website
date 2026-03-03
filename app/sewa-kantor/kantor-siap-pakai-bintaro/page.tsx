import { Metadata } from 'next'
import Image from 'next/image'
import ArticleHeader from '@/components/seo/ArticleHeader'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'
import ServiceCTA from '@/components/cta/ServiceCTA'
import { CheckCircle2, Building2, Zap, Clock, ShieldCheck } from 'lucide-react'
import Script from 'next/script'

const currentYear = new Date().getFullYear();
const title = `Kantor Siap Pakai Bintaro: Solusi Serviced Office Modern ${currentYear}`
const description = `Temukan kantor fully furnished di Bintaro tahun ${currentYear}. Hemat biaya operasional, fasilitas lengkap (internet, resepsionis, meeting room), dan langsung siap pakai.`

export const metadata: Metadata = {
    alternates: { canonical: 'https://bintarobusinesscentre.com/sewa-kantor/kantor-siap-pakai-bintaro' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        images: ['/og-kantor-siap-pakai-bintaro.jpg']
    }
}

const relatedArticles = [
    {
        title: "Harga Sewa Kantor Bintaro",
        description: "Cek daftar harga terbaru sewa kantor di Bintaro mulai Rp 3 jutaan per bulan.",
        href: "/sewa-kantor/harga"
    },
    {
        title: "Sewa Kantor Bintaro",
        description: "Panduan memilih lokasi dan jenis kantor yang tepat untuk bisnis Anda di Bintaro.",
        href: "/sewa-kantor/bintaro"
    },
    {
        title: "Virtual Office Jakarta Selatan",
        description: "Solusi hemat biaya untuk alamat bisnis prestisius tanpa sewa ruang fisik.",
        href: "/virtual-office"
    }
]

export default function KantorSiapPakaiBintaroPage() {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": "https://bintarobusinesscentre.com/images/hero-kantor-siap-pakai-bintaro.jpg",
        "datePublished": "2025-02-18",
        "dateModified": "2026-02-15",
        "author": {
            "@type": "Organization",
            "name": "Bintaro Business Center"
        }
    }

    return (
        <article className="py-12 md:py-20 bg-white">
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <div className="container mx-auto px-4 max-w-4xl">
                <SEOBreadcrumbs items={[{ label: 'Kantor Siap Pakai Bintaro' }]} />
                <ArticleHeader title={title} date="2026-02-15" />

                <div className="mt-8 mb-10">
                    <Image
                        src="/images/hero-kantor-siap-pakai-bintaro.jpg"
                        alt="Kantor siap pakai di Bintaro Business Center"
                        width={1200}
                        height={630}
                        className="w-full h-auto rounded-2xl shadow-sm"
                        priority
                    />
                </div>

                <div className="prose prose-lg max-w-none text-slate-700">
                    <p className="text-xl leading-relaxed text-slate-600 mb-6">
                        Dalam era bisnis yang serba cepat, kecepatan setup kantor menjadi faktor krusial di tahun {currentYear}.
                        Menunggu renovasi dan pembelian furniture bisa memakan waktu berbulan-bulan.
                        Model <strong>kantor siap pakai (serviced office)</strong> adalah solusinya.
                    </p>

                    <p className="mb-6">
                        Berlokasi strategis di Jalan RC Veteran, {' '}
                        <InternalLink
                            href="/sewa-kantor"
                            anchorType="brand-service"
                            position="intro"
                        >
                            kantor siap pakai Bintaro Business Center
                        </InternalLink>
                        {' '}menawarkan ruang kerja fully furnished yang bisa langsung digunakan.
                        Anda cukup membawa laptop dan mulai produktif bekerja hari ini.
                    </p>

                    <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
                        Apa itu Serviced Office?
                    </h2>
                    <p>
                        Serviced office adalah layanan penyewaan ruang kantor privat yang sudah dilengkapi dengan
                        seluruh fasilitas penunjang operasional, mulai dari internet dedicated hingga staff resepsionis.
                        Ini adalah pilihan paling efisien dibanding menyewa ruko kosong.
                    </p>

                    <div className="bg-bbc-gold-50 border-l-4 border-bbc-gold-500 p-6 my-8 rounded-r-lg">
                        <h3 className="font-bold text-bbc-gold-800 text-lg mb-2">Fasilitas Lengkap & Profesional</h3>
                        <p className="text-bbc-gold-900 mb-0">
                            Setiap penyewa serviced office di Bintaro Business Centre mendapatkan akses ke fasilitas premium termasuk <strong>ruang meeting & training</strong>, area pantry, wifi kecepatan tinggi, serta dukungan resepsionis profesional.
                        </p>
                    </div>

                    <div className="mt-12">
                        <ServiceCTA />
                    </div>
                </div>

                <RelatedContent articles={relatedArticles} title="Artikel Terkait" />
            </div>
        </article>
    )
}
