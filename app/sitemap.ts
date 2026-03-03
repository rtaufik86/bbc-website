import { MetadataRoute } from 'next'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bintarobusinesscentre.com'

    const routes = [
        '',
        '/tentang-kami',
        '/lokasi-kantor',
        '/fasilitas-kantor',
        '/legalitas-dan-perizinan-bbc',
        '/klien-dan-testimoni',
        '/ruang-meeting',
        '/kontak',
        '/sewa-kantor',
        '/sewa-kantor/jakarta-selatan',
        '/sewa-kantor/bintaro',
        '/sewa-kantor/murah-jakarta-selatan',
        '/sewa-kantor/harga',
        '/sewa-kantor/kantor-siap-pakai-bintaro',
        '/virtual-office',
        '/virtual-office/jakarta-selatan',
        '/virtual-office/alamat-bisnis-jakarta-selatan',
        '/legal/pendirian-pt-jakarta-selatan',
        '/legal/cek-kbli',
        '/legal/pkp-perdagangan',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))
}
