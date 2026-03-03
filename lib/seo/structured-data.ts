export type StructuredDataProps =
    | { type: 'LocalBusiness'; name: string; description: string; image: string; telephone: string; address: any }
    | { type: 'Product'; name: string; description: string; image: string; price: number; availability: string }
    | { type: 'FAQ'; faqs: { question: string; answer: string }[] }
    | { type: 'Breadcrumb'; items: { name: string; item: string }[] }

export function generateStructuredData(data: StructuredDataProps) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bbcbintaro.com'

    if (data.type === 'LocalBusiness') {
        return {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: data.name,
            description: data.description,
            image: data.image,
            telephone: data.telephone,
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Jl. Bintaro Utama 3A, Pondok Karya',
                addressLocality: 'Pondok Aren',
                addressRegion: 'Tangerang Selatan',
                postalCode: '15220',
                addressCountry: 'ID'
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: -6.2, // Approx
                longitude: 106.7 // Approx
            },
            openingHoursSpecification: [
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    opens: '08:00',
                    closes: '18:00'
                },
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: 'Saturday',
                    opens: '08:00',
                    closes: '13:00'
                }
            ],
            url: baseUrl
        }
    }

    if (data.type === 'Product') {
        return {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: data.name,
            description: data.description,
            image: data.image,
            offers: {
                '@type': 'Offer',
                priceCurrency: 'IDR',
                price: data.price,
                availability: 'https://schema.org/InStock',
                url: baseUrl
            }
        }
    }

    if (data.type === 'FAQ') {
        return {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: data.faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer
                }
            }))
        }
    }

    if (data.type === 'Breadcrumb') {
        return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: data.items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: item.item.startsWith('http') ? item.item : `${baseUrl}${item.item}`
            }))
        }
    }

    return {}
}
