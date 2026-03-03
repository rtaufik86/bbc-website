import { Metadata } from 'next'
import Image from 'next/image'
import ArticleHeader from '@/components/seo/ArticleHeader'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'
import ServiceCTA from '@/components/cta/ServiceCTA'

const title = 'Virtual Office Jakarta Selatan: Alamat Bisnis Resmi'
const description = 'Sewa virtual office di Jakarta Selatan mulai Rp 500rb/bulan. Ideal untuk PKP, legalitas PT/CV, dan bisnis yang butuh kredibilitas.'

export const metadata: Metadata = {
    alternates: { canonical: '/virtual-office/jakarta-selatan' },
    title,
    description,
    openGraph: { type: 'article', title, description }
}

const relatedArticles = [
    {
        title: 'Alamat Bisnis Jakarta Selatan',
        description: 'Pentingnya alamat bisnis legal untuk kredibilitas dan perizinan usaha.',
        href: '/virtual-office/alamat-bisnis-jakarta-selatan'
    },
    {
        title: 'Pendirian PT Jakarta Selatan',
        description: 'Tahapan pendirian PT dan dokumen legal yang wajib disiapkan.',
        href: '/legal/pendirian-pt-jakarta-selatan'
    },
    {
        title: 'Sewa Kantor Bintaro',
        description: 'Jika tim berkembang, pertimbangkan ruang kerja fisik di RC Veteran.',
        href: '/sewa-kantor/bintaro'
    }
]

export default function Page() {
    return (
        <article className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <SEOBreadcrumbs items={[{ label: 'Virtual Office Jakarta Selatan' }]} />
                <ArticleHeader title={title} date="2025-02-24" />

                <div className="mt-8 mb-10">
                    <Image
                        src="/images/hero-virtual-office-jakarta-selatan.jpg"
                        alt="Virtual office Jakarta Selatan di Bintaro Business Center"
                        width={1200}
                        height={630}
                        className="w-full h-auto rounded-2xl shadow-sm"
                        priority
                    />
                </div>

                <div className="prose prose-lg text-slate-700 max-w-none">
                    <p className="lead">
                        Virtual office adalah solusi paling efisien untuk startup, konsultan, dan UKM yang membutuhkan
                        legalitas bisnis di kawasan elit Jakarta Selatan tanpa biaya sewa kantor fisik penuh.
                    </p>

                    <p>
                        {' '}<InternalLink
                            href="/virtual-office"
                            anchorType="brand-service"
                            position="intro"
                        >
                            Virtual office Bintaro Business Center
                        </InternalLink>
                        {' '}menyediakan alamat bisnis resmi, resepsionis, dan handling surat menyurat dengan biaya ringan.
                    </p>

                    <h2>Manfaat utama virtual office Jakarta Selatan</h2>
                    <ul className="list-disc pl-5">
                        <li><strong>Alamat prestisius:</strong> meningkatkan citra perusahaan di mata klien.</li>
                        <li><strong>Zonasi perkantoran:</strong> aman untuk perizinan usaha (OSS RBA).</li>
                        <li><strong>Bisa PKP:</strong> syarat wajib bagi perusahaan kena pajak.</li>
                    </ul>

                    <div className="my-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-lg">
                        <span className="text-green-800 font-bold block mb-1">Paket Mulai Rp 500rb per bulan</span>
                        <p className="m-0 text-green-700">
                            Dapatkan layanan resepsionis, surat menyurat, dan kuota ruang meeting.
                            <InternalLink
                                href="/virtual-office"
                                anchorType="descriptive"
                                position="cta"
                                className="font-bold underline ml-1"
                            >
                                Lihat detail paket
                            </InternalLink>
                            {' '}sekarang.
                        </p>
                    </div>

                    <h2>Perbedaan virtual office vs serviced office</h2>
                    <p>
                        Virtual office fokus pada legalitas dan administrasi, sementara serviced office menyediakan ruang kerja
                        privat untuk tim yang aktif di kantor. Jika Anda membutuhkan ruang kerja harian, {' '}
                        <InternalLink
                            href="/sewa-kantor"
                            anchorType="service-location"
                            position="mid-content"
                        >
                            serviced office di BBC
                        </InternalLink>
                        {' '}memberikan fleksibilitas dengan fasilitas lengkap.
                    </p>

                    <h2>Tips memilih provider virtual office</h2>
                    <ul className="list-disc pl-5">
                        <li>Pastikan gedung berada di zonasi komersial resmi</li>
                        <li>Cek transparansi biaya dan tidak ada hidden fee</li>
                        <li>Pilih provider dengan reputasi dan pengalaman panjang</li>
                    </ul>
                </div>

                <RelatedContent articles={relatedArticles} />
                <ServiceCTA />
            </div>
        </article>
    )
}


