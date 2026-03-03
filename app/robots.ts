import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bintarobusinesscentre.com'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/', '/private/', '/login', '/signup', '/forgot-password', '/auth/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
