import { Metadata } from 'next'
import LegalClient from './LegalClient'
import Script from 'next/script'

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: true,
    },
    title: 'Layanan Legalitas Bisnis & Pendirian PT Jakarta Selatan | BBC',
    description: 'Layanan legalitas bisnis terintegrasi di Jakarta Selatan. Pendirian PT, cek KBLI, dan panduan PKP. Alamat domisili resmi di yurisdiksi DKI Jakarta.',
    openGraph: {
        title: 'Layanan Legalitas Bisnis & Pendirian PT Jakarta Selatan | BBC',
        description: 'Layanan legalitas bisnis terintegrasi di Jakarta Selatan. Pendirian PT, cek KBLI, dan panduan PKP. Alamat domisili resmi di yurisdiksi DKI Jakarta.',
        images: ['/images/og/bbc-og-legal.jpg']
    }
}

export default function LegalPage() {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "LocalBusiness",
                "@id": "https://www.bintarobusinesscentre.com/#localbusiness",
                "name": "Bintaro Business Centre",
                "url": "https://www.bintarobusinesscentre.com/",
                "image": "https://www.bintarobusinesscentre.com/images/og/bbc-og.jpg",
                "description": "Bintaro Business Centre menyediakan sewa kantor siap pakai (serviced office), virtual office, dan layanan legal terintegrasi di Jakarta Selatan sejak 2007.",
                "telephone": "(021) 7362639",
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Jl. RC. Veteran Raya No.1i, RT.1/RW.3, Bintaro",
                    "addressLocality": "Pesanggrahan",
                    "addressRegion": "Jakarta Selatan",
                    "postalCode": "12330",
                    "addressCountry": "ID"
                }
            },
            {
                "@type": "Service",
                "@id": "https://www.bintarobusinesscentre.com/legal#service",
                "name": "Layanan Legalitas Bisnis & Pendirian PT Jakarta Selatan",
                "serviceType": "Legal Services",
                "provider": {
                    "@id": "https://www.bintarobusinesscentre.com/#localbusiness"
                },
                "areaServed": [
                    {
                        "@type": "AdministrativeArea",
                        "name": "Jakarta Selatan"
                    },
                    {
                        "@type": "AdministrativeArea",
                        "name": "DKI Jakarta"
                    }
                ],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Layanan Legal",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Pendirian PT Jakarta Selatan"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Cek KBLI Usaha"
                            }
                        }
                    ]
                }
            },
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/legal#webpage",
                "url": "https://www.bintarobusinesscentre.com/legal",
                "name": "Layanan Legalitas Bisnis & Pendirian PT Jakarta Selatan | BBC",
                "isPartOf": {
                    "@id": "https://www.bintarobusinesscentre.com/#website"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://www.bintarobusinesscentre.com/legal#breadcrumbs",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Beranda",
                        "item": "https://www.bintarobusinesscentre.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Legal",
                        "item": "https://www.bintarobusinesscentre.com/legal"
                    }
                ]
            }
        ]
    }

    return (
        <>
            <Script
                id="legal-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <LegalClient />
        </>
    )
}
