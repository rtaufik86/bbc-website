import { Metadata } from 'next'
import Image from 'next/image'
import ArticleHeader from '@/components/seo/ArticleHeader'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'

const currentYear = new Date().getFullYear();
const title = `Sewa Kantor Murah Jakarta Selatan ${currentYear}: Area Bintaro & Sekitarnya`
const description = `Cari sewa kantor murah di Jakarta Selatan tahun ${currentYear}? Bintaro Business Center menawarkan tarif kompetitif dengan fasilitas lengkap di perbatasan Jaksel.`

export const metadata: Metadata = {
    alternates: { canonical: 'https://bintarobusinesscentre.com/sewa-kantor/murah-jakarta-selatan' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        images: ['/og-sewa-kantor-murah-jakarta-selatan.jpg']
    }
}

const relatedArticles = [
    {
        title: 'Sewa Kantor Bintaro',
        description: 'Panduan lengkap lokasi RC Veteran dan pilihan ruang kantor di Bintaro.',
        href: '/sewa-kantor/bintaro'
    },
    {
        title: 'Harga Sewa Kantor Bintaro',
        description: 'Bandingkan harga per ukuran ruang dan strategi hemat biaya kantor.',
        href: '/sewa-kantor/harga'
    },
    {
        title: 'Sewa Kantor Jakarta Selatan',
        description: 'Gambaran area premium Jaksel dan alasan Bintaro paling efisien.',
        href: '/sewa-kantor/jakarta-selatan'
    }
]

export default function Page() {
    return (
        <article className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <SEOBreadcrumbs items={[{ label: 'Sewa Kantor Murah Jakarta Selatan' }]} />
                <ArticleHeader title={title} date="2026-02-15" />

                <div className="mt-8 mb-10">
                    <Image
                        src="/images/hero-sewa-kantor-murah-jakarta-selatan.jpg"
                        alt="Sewa kantor murah Jakarta Selatan"
                        width={1200}
                        height={630}
                        className="w-full h-auto rounded-2xl shadow-sm"
                        priority
                    />
                </div>

                <div className="prose prose-lg text-slate-700 max-w-none prose-headings:text-primary prose-a:text-accent">
                    <p className="lead">
                        Harga properti komersial di SCBD, Kuningan, dan TB Simatupang terus naik di tahun {currentYear}. Banyak bisnis mencari alternatif terjangkau namun tetap legal dan strategis.
                    </p>

                    <p>
                        Di area RC Veteran, {' '}
                        <InternalLink
                            href="/sewa-kantor"
                            anchorType="brand-service"
                            position="intro"
                        >
                            sewa kantor di Bintaro Business Center
                        </InternalLink>
                        {' '}memberikan kombinasi harga efisien, akses tol langsung, dan fasilitas all-in.
                    </p>

                    <h2 className="text-primary">Perbandingan biaya sewa</h2>
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                        <table className="border-collapse table-auto w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="p-4 text-left font-bold text-primary">Lokasi</th>
                                    <th className="p-4 text-left font-bold text-primary">Estimasi Harga/m2</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-slate-100">
                                    <td className="p-4">Sudirman</td>
                                    <td className="p-4 italic text-slate-500">Rp 300rb - 500rb</td>
                                </tr>
                                <tr className="font-bold bg-accent/5 border-t border-slate-100">
                                    <td className="p-4 text-primary">Bintaro (Jaksel)</td>
                                    <td className="p-4 text-accent">Rp 100rb - 200rb</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-6">
                        Untuk tim yang belum butuh kantor fisik penuh, {' '}
                        <InternalLink
                            href="/virtual-office"
                            anchorType="service-location"
                            position="mid-content"
                        >
                            virtual office Jakarta Selatan
                        </InternalLink>
                        {' '}dapat menjadi opsi hemat.
                    </p>

                    <div className="my-8 p-8 bg-primary text-white rounded-2xl shadow-lg border-l-8 border-accent">
                        <strong className="block text-accent text-xl mb-2">Hemat Biaya Operasional:</strong>
                        <p className="m-0 text-white/90 leading-relaxed">
                            Sewa kantor full service di BBC mulai dari Rp 3.5 Juta per bulan.
                            <InternalLink
                                href="/sewa-kantor"
                                anchorType="descriptive"
                                position="cta"
                                className="underline underline-offset-4 ml-1 font-bold text-white hover:text-accent transition-colors"
                            >
                                Cek ketersediaan unit
                            </InternalLink>
                            {' '}sekarang sebelum penuh.
                        </p>
                    </div>
                </div>

                <div className="mt-20">
                    <RelatedContent articles={relatedArticles} />
                </div>
            </div>
        </article>
    )
}
