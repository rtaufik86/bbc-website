import { Metadata } from 'next'
import Image from 'next/image'
import ArticleHeader from '@/components/seo/ArticleHeader'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'
import { CheckCircle2 } from 'lucide-react'
import Script from 'next/script'

const currentYear = new Date().getFullYear();
const title = `Harga Sewa Kantor Bintaro: Perbandingan & Tips Hemat ${currentYear}`
const description = `Daftar harga sewa kantor di Bintaro ${currentYear}: serviced office, coworking, virtual office. Perbandingan harga per lokasi. Tips hemat biaya kantor untuk bisnis Anda.`

export const metadata: Metadata = {
    alternates: { canonical: 'https://bintarobusinesscentre.com/sewa-kantor/harga' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://bintarobusinesscentre.com/sewa-kantor/harga',
        images: ['/og-harga-sewa-kantor-bintaro.jpg']
    }
}

const relatedArticles = [
    {
        title: "Sewa Kantor Bintaro: Panduan Lengkap",
        description: "Pelajari jenis-jenis kantor, lokasi strategis, dan tips memilih kantor yang tepat di Bintaro.",
        href: "/sewa-kantor/bintaro"
    },
    {
        title: "Kantor Siap Pakai Bintaro",
        description: "Keunggulan plug-and-play office dan mengapa ini solusi ideal untuk startup dan SME.",
        href: "/sewa-kantor/kantor-siap-pakai-bintaro"
    },
    {
        title: "Sewa Kantor Jakarta Selatan",
        description: "Panduan komprehensif lokasi premium dan alternatif strategis di Jaksel.",
        href: "/sewa-kantor/jakarta-selatan"
    }
]

export default function HargaSewaKantorBintaroPage() {
    // Article Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": "https://bintarobusinesscentre.com/images/sewa-kantor/harga.jpg",
        "datePublished": "2025-02-10",
        "dateModified": "2026-02-15",
        "author": {
            "@type": "Organization",
            "name": "Bintaro Business Center"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Bintaro Business Center",
            "logo": {
                "@type": "ImageObject",
                "url": "https://bintarobusinesscentre.com/logo.png"
            }
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            <article className="py-12 md:py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <SEOBreadcrumbs items={[{ label: 'Harga Sewa Kantor Bintaro' }]} />

                    <ArticleHeader
                        title={title}
                        date="2026-02-15"
                    />

                    <div className="mt-8 mb-10">
                        <Image
                            src="/images/hero-harga-sewa-kantor-bintaro.jpg"
                            alt="Harga sewa kantor di Bintaro Business Center"
                            width={1200}
                            height={630}
                            className="w-full h-auto rounded-2xl shadow-sm"
                            priority
                        />
                    </div>

                    <div className="prose prose-lg max-w-none text-slate-700">
                        <p className="text-xl leading-relaxed text-slate-600 mb-6">
                            Mencari kantor siap pakai di Bintaro dengan harga yang transparan dan kompetitif?
                            Panduan lengkap ini membahas rentang harga sewa kantor di area Bintaro,
                            perbandingan dengan area lain di Jakarta Selatan, dan tips hemat untuk bisnis Anda di tahun {currentYear}.
                        </p>

                        <p className="mb-6">
                            Range harga sewa kantor di Bintaro untuk serviced office berkisar Rp 3-6 juta per bulan,
                            tergantung ukuran dan lokasi. {' '}
                            <InternalLink
                                href="/sewa-kantor"
                                anchorType="brand-service"
                                position="intro"
                            >
                                Bintaro Business Center menawarkan paket transparan
                            </InternalLink>
                            {' '}dengan semua utilitas, internet, furniture, dan resepsionis sudah included
                            dalam harga—tanpa biaya tersembunyi.
                        </p>

                        <p className="mb-8">
                            Dibandingkan dengan area premium seperti TB Simatupang (Rp 5-10 juta/bulan) atau
                            Sudirman-Thamrin (Rp 8-15 juta/bulan), Bintaro menawarkan value proposition yang
                            lebih baik: lokasi strategis dengan akses tol langsung, okupansi tinggi (indikator
                            kualitas), dan harga yang lebih terjangkau.
                        </p>

                        <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
                            Rentang harga sewa kantor di Bintaro berdasarkan ukuran
                        </h2>

                        <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Kantor 10m² (Kapasitas 1-2 orang)</h3>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-bbc-gold-600 mt-0.5 flex-shrink-0" />
                                    <span><strong>Harga:</strong> Rp 3.5 - 4 juta/bulan</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-bbc-gold-600 mt-0.5 flex-shrink-0" />
                                    <span><strong>Termasuk:</strong> Furniture standar, AC, internet dedicated</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-bbc-gold-600 mt-0.5 flex-shrink-0" />
                                    <span><strong>Cocok untuk:</strong> Startup early-stage, konsultan mandiri</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-bbc-blue-50 rounded-xl p-6 mb-8 border-2 border-bbc-blue-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-slate-900">Kantor 12m² (Kapasitas 2-3 orang)</h3>
                                <span className="bg-bbc-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    POPULAR
                                </span>
                            </div>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-bbc-blue-600 mt-0.5 flex-shrink-0" />
                                    <span><strong>Harga:</strong> Rp 4.5 - 5.5 juta/bulan</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-bbc-blue-600 mt-0.5 flex-shrink-0" />
                                    <span><strong>Termasuk:</strong> 3 Meja kerja, AC, view jendela, internet dedicated</span>
                                </li>
                            </ul>
                            <p className="text-sm text-bbc-blue-700 italic">
                                💡 Ukuran paling banyak dipilih klien BBC (okupansi 90%)
                            </p>
                        </div>

                        <p className="mb-8">
                            Dengan harga yang kompetitif, Anda mendapatkan bukan hanya ruang kantor,
                            tapi ekosistem bisnis yang mendukung produktivitas. {' '}
                            <InternalLink
                                href="/sewa-kantor"
                                anchorType="generic"
                                position="mid-content"
                            >
                                Lihat detail lengkap apa yang termasuk dalam harga sewa kami
                            </InternalLink>
                            {' '}untuk memastikan tidak ada biaya tersembunyi.
                        </p>

                        <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
                            Perbandingan harga Bintaro vs area lain di Jakarta Selatan
                        </h2>

                        <div className="overflow-x-auto mb-8">
                            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead className="bg-bbc-blue-500 text-white">
                                    <tr>
                                        <th className="p-4 text-left">Area</th>
                                        <th className="p-4 text-left">Harga/m² (Rp/bulan)</th>
                                        <th className="p-4 text-left">Akses Tol</th>
                                        <th className="p-4 text-left">Parkir</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    <tr className="hover:bg-slate-50">
                                        <td className="p-4 font-semibold text-bbc-blue-600">Bintaro (RC Veteran)</td>
                                        <td className="p-4">300k - 400k</td>
                                        <td className="p-4">✅ Langsung</td>
                                        <td className="p-4">✅ Luas & Gratis</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                        <td className="p-4">TB Simatupang</td>
                                        <td className="p-4">500k - 700k</td>
                                        <td className="p-4">⚠️ Macet jam sibuk</td>
                                        <td className="p-4">💰 Berbayar</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                        <td className="p-4">Sudirman-Thamrin</td>
                                        <td className="p-4">800k - 1.2jt</td>
                                        <td className="p-4">⚠️ Sangat macet</td>
                                        <td className="p-4">💰💰 Mahal</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="mb-8 bg-bbc-gold-50 border-l-4 border-bbc-gold-500 p-6 rounded-r-lg">
                            <strong className="text-bbc-gold-800 block mb-2">💡 Insight Hemat:</strong>
                            <span className="text-bbc-gold-700">
                                Dengan memilih Bintaro, Anda bisa menghemat <strong>40-60%</strong> dibanding
                                area premium, tanpa mengorbankan kualitas fasilitas atau akses strategis.
                            </span>
                        </p>

                        <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
                            Apa saja yang termasuk dalam harga? (Hindari biaya tersembunyi)
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Sudah Termasuk (All-In)
                                </h3>
                                <ul className="space-y-2 text-sm text-green-700">
                                    <li>✅ Furniture lengkap</li>
                                    <li>✅ Internet dedicated</li>
                                    <li>✅ Listrik & AC</li>
                                    <li>✅ Resepsionis profesional</li>
                                    <li>✅ Cleaning service & Maintenance</li>
                                    <li>✅ Parkir luas</li>
                                </ul>
                            </div>
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                                <h3 className="text-lg font-bold text-amber-800 mb-4">
                                    Biaya Tambahan (Opsional)
                                </h3>
                                <ul className="space-y-2 text-sm text-amber-700">
                                    <li>💰 Deposit jaminan (dikembalikan)</li>
                                    <li>💰 Meeting room per jam</li>
                                    <li>💰 Telepon line dedicated</li>
                                    <li>💰 Printing & Fotokopi</li>
                                </ul>
                            </div>
                        </div>

                        <p className="mb-8">
                            Dibandingkan dengan menyewa kantor konvensional yang membutuhkan setup cost
                            Rp 50-100 juta, {' '}
                            <InternalLink
                                href="/sewa-kantor"
                                anchorType="service-location"
                                position="mid-content"
                            >
                                kantor siap pakai di Bintaro Business Center
                            </InternalLink>
                            {' '}memungkinkan Anda memulai dengan investasi minimal dan kontrak fleksibel.
                        </p>

                        <div className="bg-gradient-to-br from-bbc-blue-500 to-bbc-blue-600 rounded-2xl p-8 md:p-12 text-white text-center mt-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Siap mencari kantor siap pakai di Bintaro?
                            </h2>
                            <p className="text-xl mb-8 text-bbc-blue-50">
                                Dapatkan penawaran terbaik dengan okupansi terbukti dan fasilitas lengkap.
                            </p>
                            <InternalLink
                                href="/sewa-kantor"
                                anchorType="descriptive"
                                position="cta"
                                className="bg-bbc-gold-500 hover:bg-bbc-gold-600 text-white font-bold px-8 py-4 rounded-lg text-lg inline-flex items-center gap-2"
                            >
                                Lihat Paket Sewa Kantor Kami →
                            </InternalLink>
                        </div>
                    </div>

                    <RelatedContent articles={relatedArticles} />
                </div>
            </article>
        </>
    )
}
