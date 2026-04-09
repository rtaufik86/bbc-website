import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.bintarobusinesscentre.com'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/', 
                '/admin/', 
                '/private/', 
                '/login', 
                '/signup', 
                '/forgot-password', 
                '/auth/',
                '/category/',
                '/tag/',
                '/wp-json/',
                '/lp/'
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
