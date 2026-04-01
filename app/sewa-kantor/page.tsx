import { Metadata } from 'next'
import { getMetadata } from '@/lib/seo/pageTypeMap'
import SewaKantorClient from './SewaKantorClient'
import Script from 'next/script'

export const metadata: Metadata = getMetadata('/sewa-kantor')

export default function SewaKantorPage() {
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
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": -6.2721988,
                    "longitude": 106.7622405
                }
            },
            {
                "@type": "Service",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor#service",
                "name": "Sewa Kantor Siap Pakai Jakarta Selatan",
                "serviceType": "Serviced Office",
                "provider": {
                    "@id": "https://www.bintarobusinesscentre.com/#localbusiness"
                },
                "areaServed": [
                    {
                        "@type": "AdministrativeArea",
                        "name": "Jakarta Selatan"
                    }
                ],
                "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": "https://www.bintarobusinesscentre.com/sewa-kantor",
                    "availableLanguage": ["id", "en"]
                },
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Unit Kantor",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Unit Kantor 10m2"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Unit Kantor 12m2"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Unit Kantor 15m2"
                            }
                        }
                    ]
                }
            },
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor#webpage",
                "url": "https://www.bintarobusinesscentre.com/sewa-kantor",
                "name": "Sewa Kantor Siap Pakai Jakarta Selatan | Dekat Bintaro Jaya & Pondok Indah | BBC",
                "isPartOf": {
                    "@id": "https://www.bintarobusinesscentre.com/#website"
                },
                "about": {
                    "@id": "https://www.bintarobusinesscentre.com/#localbusiness"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor#breadcrumbs",
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
                        "name": "Layanan",
                        "item": "https://www.bintarobusinesscentre.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Sewa Kantor",
                        "item": "https://www.bintarobusinesscentre.com/sewa-kantor"
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Apakah saya bisa survey unit sebelum menyewa?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Bisa. Anda dapat menjadwalkan survey untuk melihat unit yang tersedia, fasilitas, dan akses lokasi sebelum mengambil keputusan. Survey gratis dan tanpa komitmen."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apa saja yang termasuk dalam paket sewa kantor?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Paket sewa kantor siap pakai mencakup furniture kantor, internet, resepsionis, utilitas dasar (listrik, AC, air), dan fasilitas penunjang sesuai paket yang Anda pilih."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Bagaimana jam akses untuk klien?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Jam operasional admin hingga 17.00 WIB. Klien dapat bekerja hingga 20.00 WIB di ruangan sesuai kebijakan operasional yang berlaku. Kami tidak menyediakan akses 24 jam dengan kartu saat ini."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Dokumen apa yang dibutuhkan untuk mulai sewa?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Umumnya diperlukan identitas penanggung jawab dan dokumen perusahaan (jika berbadan hukum). Tim kami akan menginformasikan checklist dokumen lengkap sesuai kebutuhan Anda saat konsultasi."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah tersedia layanan pendukung lain selain sewa kantor?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Tersedia layanan pendukung seperti virtual office (untuk alamat bisnis tanpa ruang fisik) dan layanan legal terintegrasi, serta fasilitas ruang meeting & training untuk menunjang operasional bisnis Anda."
                        }
                    }
                ]
            }
        ]
    }

    return (
        <>
            <Script
                id="sewa-kantor-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <SewaKantorClient />
        </>
    )
}
