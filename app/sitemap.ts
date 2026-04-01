import { MetadataRoute } from 'next'
import { PAGE_TYPE_MAP, isIndexable } from '@/lib/seo/pageTypeMap'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.bintarobusinesscentre.com'

    // Filter indexable pages from the Source of Truth
    const routes = Object.keys(PAGE_TYPE_MAP).filter(route => isIndexable(route))

    const sitemapEntries: MetadataRoute.Sitemap = routes.map(route => {
        const type = PAGE_TYPE_MAP[route]
        let priority = 0.5
        let changefreq: 'weekly' | 'monthly' = 'monthly'

        if (route === '/') {
            priority = 1.0
            changefreq = 'weekly'
        } else if (type.type === 'money') {
            priority = 0.9
            changefreq = 'weekly'
        } else if (type.type === 'weapon') {
            priority = 0.8
        } else if (type.type === 'hub') {
            priority = 0.7
        } else if (type.type === 'support') {
            priority = 0.5
        }

        return {
            url: `${baseUrl}${route === '/' ? '' : route}`,
            lastModified: new Date(),
            changeFrequency: changefreq,
            priority: priority,
        }
    })

    return sitemapEntries
}
