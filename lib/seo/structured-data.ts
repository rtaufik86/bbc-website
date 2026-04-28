export type StructuredDataProps =
    | { type: 'LocalBusiness'; name: string; description: string; image: string; telephone: string; address?: any; geo?: { latitude: number; longitude: number }; pageUrl?: string }
    | { type: 'Product'; name: string; description: string; image: string; price: number; availability: string; pageUrl?: string }
    | { type: 'FAQ'; faqs: { question: string; answer: string }[] }
    | { type: 'Breadcrumb'; items: { name: string; item: string }[] }

export function generateStructuredData(data: StructuredDataProps) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.bintarobusinesscentre.com'

    if (data.type === 'LocalBusiness') {
        return {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: data.name,
            description: data.description,
            image: data.image,
            telephone: data.telephone,
            address: data.address ?? {
                '@type': 'PostalAddress',
                streetAddress: 'Jl. RC Veteran No. 1-i, Pesanggrahan',
                addressLocality: 'Pesanggrahan',
                addressRegion: 'Jakarta Selatan',
                postalCode: '12270',
                addressCountry: 'ID'
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: data.geo?.latitude ?? -6.2745,   // Jl. RC Veteran, Pesanggrahan
                longitude: data.geo?.longitude ?? 106.7736
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
            url: data.pageUrl ?? baseUrl
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
                availability: data.availability
                    ? (data.availability.startsWith('https://') ? data.availability : `https://schema.org/${data.availability}`)
                    : 'https://schema.org/InStock',
                url: data.pageUrl ?? baseUrl
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
