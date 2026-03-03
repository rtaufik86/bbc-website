import { Metadata } from 'next'

interface CreateMetadataProps {
    title: string
    description: string
    image?: string
    path: string // e.g., /virtual-office
    noIndex?: boolean
}

export function createMetadata({
    title,
    description,
    image = '/og-image.jpg', // Default OG image
    path,
    noIndex = false
}: CreateMetadataProps): Metadata {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bbcbintaro.com'
    const url = `${baseUrl}${path}`

    return {
        title: {
            default: title,
            template: `%s | BBC Bintaro`
        },
        description,
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Bintaro Business Center',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                },
            ],
            locale: 'id_ID',
            type: 'website',
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
        },
        icons: {
            icon: '/favicon.ico',
        },
    }
}
