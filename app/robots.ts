import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.bintarobusinesscentre.com'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/wp-admin/',
                '/wp-content/',
                '/wp-includes/',
                '/category/',
                '/tag/',
                '/author/',
                '/lp/',
                '/amp/',
                '/bookingroom/',
                '/feed/',
                '/thrive_',
                '/nggallery/',
                '/gallery/',
                '/client/',
                '/page/'
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
