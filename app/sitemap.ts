import { MetadataRoute } from 'next'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.bintarobusinesscentre.com'

    // 1. Primary Hubs (Money Pages) - Priority 1.0 & 0.9
    const moneyHubs = [
        { url: '', priority: 1, freq: 'weekly' },
        { url: '/sewa-kantor', priority: 0.9, freq: 'weekly' },
        { url: '/virtual-office', priority: 0.9, freq: 'weekly' },
        { url: '/legal/pendirian-pt-jakarta-selatan', priority: 0.9, freq: 'weekly' },
    ]

    // 2. SEO Weapon Pages (Tier 1) - Priority 0.8
    const weaponPages = [
        '/sewa-kantor-jakarta-selatan',
        '/virtual-office-jakarta-selatan',
        '/virtual-office-bintaro',
        '/harga-sewa-kantor-bintaro',
        '/harga-virtual-office-jakarta-selatan',
        '/kantor-dekat-bintaro-jaya',
        '/kantor-dekat-tol-veteran',
        '/alamat-bisnis-jakarta-selatan',
        '/lokasi-kantor',
    ]

    // 3. Service Sub-Pages & Hub Guides - Priority 0.7
    const subPages = [
        '/sewa-kantor/jakarta-selatan',
        '/sewa-kantor/bintaro',
        '/sewa-kantor/murah-jakarta-selatan',
        '/sewa-kantor/harga',
        '/sewa-kantor/kantor-siap-pakai-bintaro',
        '/virtual-office/jakarta-selatan',
        '/virtual-office/alamat-bisnis-jakarta-selatan',
        '/legal',
        '/legal/cek-kbli',
        '/legal/pkp-perdagangan',
    ]

    // 4. Information & Support Pages - Priority 0.5
    const infoPages = [
        '/tentang-kami',
        '/fasilitas-kantor',
        '/legalitas-dan-perizinan-bbc',
        '/klien-dan-testimoni',
        '/ruang-meeting',
        '/kontak',
    ]

    const allRoutes = [
        ...moneyHubs.map(h => ({ url: `${baseUrl}${h.url}`, priority: h.priority, changeFrequency: h.freq as any })),
        ...weaponPages.map(url => ({ url: `${baseUrl}${url}`, priority: 0.8, changeFrequency: 'monthly' as const })),
        ...subPages.map(url => ({ url: `${baseUrl}${url}`, priority: 0.7, changeFrequency: 'monthly' as const })),
        ...infoPages.map(url => ({ url: `${baseUrl}${url}`, priority: 0.5, changeFrequency: 'monthly' as const })),
    ]

    return allRoutes.map(route => ({
        ...route,
        lastModified: new Date(),
    }))
}
