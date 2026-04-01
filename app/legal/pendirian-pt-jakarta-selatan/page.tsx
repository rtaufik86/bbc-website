import { Metadata } from 'next'
import { getMetadata } from '@/lib/seo/pageTypeMap'
import PendirianPTClient from './PendirianPTClient'
import Script from 'next/script'

export const metadata: Metadata = getMetadata('/legal/pendirian-pt-jakarta-selatan')

export default function JasaLegalPage() {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "LocalBusiness",
                "@id": "https://www.bintarobusinesscentre.com/#localbusiness",
                "name": "Bintaro Business Centre",
                "url": "https://www.bintarobusinesscentre.com/",
                "image": "https://www.bintarobusinesscentre.com/images/og/bbc-og.jpg",
                "description": "Bintaro Business Centre menyediakan sewa kantor siap pakai (serviced office), virtual office, ruang meeting, dan layanan legal terintegrasi di Jakarta Selatan sejak 2007.",
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
                "@id": "https://www.bintarobusinesscentre.com/legal/pendirian-pt-jakarta-selatan#service",
                "name": "Jasa Pendirian PT & PKP Jakarta Selatan",
                "serviceType": "Legal Services",
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
                    "serviceUrl": "https://www.bintarobusinesscentre.com/legal/pendirian-pt-jakarta-selatan",
                    "availableLanguage": ["id", "en"]
                },
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Paket Pendirian PT",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Paket Dasar - Setup PT Fundamental",
                                "description": "Konsultasi KBLI, Reservasi Nama, Akta Notaris, SK Kemenkumham, NPWP & NIB."
                            },
                            "price": "7500000",
                            "priceCurrency": "IDR"
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Paket Complete - PT + PKP Ready",
                                "description": "Semua Paket Dasar + Domisili Jakarta Selatan, PKP Registration Support, VO 6 Bulan."
                            },
                            "price": "12500000",
                            "priceCurrency": "IDR"
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Paket Premium - Full Business Infrastructure",
                                "description": "Semua Paket Complete + Service Office Ready (PKP Selain Jasa 1th), VO 12 Bulan, Banking Assistance."
                            },
                            "price": "18500000",
                            "priceCurrency": "IDR"
                        }
                    ]
                }
            },
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/legal/pendirian-pt-jakarta-selatan#webpage",
                "url": "https://www.bintarobusinesscentre.com/legal/pendirian-pt-jakarta-selatan",
                "name": "Pendirian PT Jakarta Selatan — Sistematis, Tanpa Bolak-Balik | BBC",
                "isPartOf": {
                    "@id": "https://www.bintarobusinesscentre.com/#website"
                },
                "about": {
                    "@id": "https://www.bintarobusinesscentre.com/#localbusiness"
                }
            },
            {
                "@type": "FAQPage",
                "@id": "https://www.bintarobusinesscentre.com/legal/pendirian-pt-jakarta-selatan#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Kenapa tidak langsung ke notaris saja?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Notaris fokus pada legal execution (akta, SK). BBC kasih guidance end-to-end: Konsultasi KBLI strategy, PKP readiness planning, Domisili Jakarta Selatan, dan koordinasi dengan pajak & kemenkumham."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Virtual Office saya bisa untuk PKP atau tidak?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Tergantung KBLI Anda: KBLI Jasa (konsultan, IT, marketing) bisa menggunakan Virtual Office. KBLI Selain Jasa (trading, distributor, transportasi, event organizer, dll) wajib menggunakan Service Office minimal 1 tahun."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Berapa lama proses pendirian PT?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Estimasi 14–21 hari kerja, tergantung kompleksitas approval nama, kelengkapan dokumen, dan proses di instansi (Kemenkumham, Pajak)."
                        }
                    }
                ]
            }
        ]
    }

    return (
        <>
            <Script
                id="pendirian-pt-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <PendirianPTClient />
        </>
    )
}
