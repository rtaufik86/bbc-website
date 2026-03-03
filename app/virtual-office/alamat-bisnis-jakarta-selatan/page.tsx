import { Metadata } from 'next'
import Image from 'next/image'
import ArticleHeader from '@/components/seo/ArticleHeader'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'
import ServiceCTA from '@/components/cta/ServiceCTA'

const title = 'Alamat Bisnis Jakarta Selatan: Prestise Tanpa Biaya Mahal'
const description = 'Menyewa alamat bisnis di Jakarta Selatan adalah kunci legalitas usaha. Dapatkan zonasi komersial aman untuk PT/CV di Bintaro Business Center.'

export const metadata: Metadata = {
    alternates: { canonical: '/virtual-office/alamat-bisnis-jakarta-selatan' },
    title,
    description,
    openGraph: { type: 'article', title, description }
}

const relatedArticles = [
    {
        title: 'Virtual Office Jakarta Selatan',
        description: 'Solusi alamat bisnis legal dengan biaya ringan dan layanan resepsionis.',
        href: '/virtual-office/jakarta-selatan'
    },
    {
        title: 'Pendirian PT Jakarta Selatan',
        description: 'Tahapan pendirian PT dan dokumen legal yang wajib disiapkan.',
        href: '/legal/pendirian-pt-jakarta-selatan'
    },
    {
        title: 'Sewa Kantor Bintaro',
        description: 'Jika tim berkembang, pertimbangkan kantor fisik di RC Veteran.',
        href: '/sewa-kantor/bintaro'
    }
]

export default function Page() {
    return (
        <article className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <SEOBreadcrumbs items={[{ label: 'Alamat Bisnis Jakarta Selatan' }]} />
                <ArticleHeader title={title} date="2025-02-26" />

                <div className="mt-8 mb-10">
                    <Image
                        src="/images/hero-alamat-bisnis-jakarta-selatan.jpg"
                        alt="Alamat bisnis Jakarta Selatan di Bintaro Business Center"
                        width={1200}
                        height={630}
                        className="w-full h-auto rounded-2xl shadow-sm"
                        priority
                    />
                </div>

                <div className="prose prose-lg text-slate-700 max-w-none">
                    <p className="lead">
                        Alamat bisnis yang tepat dapat meningkatkan kepercayaan klien secara signifikan, terutama di kawasan
                        premium seperti Jakarta Selatan. Alamat legal juga menjadi syarat penting untuk perizinan usaha.
                    </p>

                    <p>
                        {' '}<InternalLink
                            href="/virtual-office"
                            anchorType="brand-service"
                            position="intro"
                        >
                            Virtual office Bintaro Business Center
                        </InternalLink>
                        {' '}menawarkan alamat bisnis resmi di zonasi komersial tanpa harus menyewa kantor fisik penuh.
                    </p>

                    <h2>Pentingnya alamat bisnis untuk legalitas</h2>
                    <p>
                        Alamat bisnis digunakan untuk pendaftaran OSS, penerbitan NIB, dan administrasi pajak. Dengan alamat
                        yang berada di zonasi komersial, proses legalitas menjadi lebih aman dan mudah diverifikasi.
                    </p>

                    <div className="my-8 p-6 bg-bbc-gold-50 border-l-4 border-bbc-gold-500 rounded-lg">
                        <span className="text-bbc-gold-700 font-bold block mb-1">Mulai Rp 6 Juta per tahun</span>
                        <p className="m-0 text-bbc-gold-600">
                            Sewa virtual office sekarang dan dapatkan handling surat menyurat.
                            <InternalLink
                                href="/virtual-office"
                                anchorType="descriptive"
                                position="cta"
                                className="font-bold underline ml-1 text-bbc-gold-800"
                            >
                                Cek paket tersedia
                            </InternalLink>
                            {' '}sebelum penuh.
                        </p>
                    </div>

                    <h2>Risiko menggunakan alamat rumah</h2>
                    <p>
                        Banyak alamat rumah tidak berada di zonasi komersial. Hal ini dapat menghambat proses legalitas, menimbulkan
                        risiko penolakan dokumen, dan menurunkan kredibilitas di mata klien.
                    </p>

                    <h2>Keunggulan Bintaro Business Center</h2>
                    <p>
                        BBC telah beroperasi sejak 2007 dan memiliki gedung sendiri dengan pengelolaan profesional. Jika Anda
                        membutuhkan bantuan legalitas PT atau CV, {' '}
                        <InternalLink
                            href="/jasa-legalitas"
                            anchorType="service-location"
                            position="mid-content"
                        >
                            layanan legalitas di BBC
                        </InternalLink>
                        {' '}membantu proses lebih cepat dan transparan.
                    </p>
                </div>

                <RelatedContent articles={relatedArticles} />

            </div>
        </article>
    )
}


