import { Metadata } from 'next'
import { getMetadata } from '@/lib/seo/pageTypeMap'
import VirtualOfficeClient from './VirtualOfficeClient'
import Script from 'next/script'

export const metadata: Metadata = getMetadata('/virtual-office')

export default function VirtualOfficePage() {
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
                "@id": "https://www.bintarobusinesscentre.com/virtual-office#service",
                "name": "Virtual Office Jakarta Selatan",
                "serviceType": "Virtual Office",
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
                    "serviceUrl": "https://www.bintarobusinesscentre.com/virtual-office",
                    "availableLanguage": ["id", "en"]
                },
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Virtual Office Packages",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "BA (Business Address) - Paket Dasar",
                                "description": "Alamat bisnis Jakarta Selatan, Inbound Mail Handling, Resepsionis."
                            },
                            "price": "250000",
                            "priceCurrency": "IDR",
                            "priceSpecification": {
                                "@type": "UnitPriceSpecification",
                                "price": "250000",
                                "priceCurrency": "IDR",
                                "unitCode": "MON"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "CP (Communication Plan) - Paket Plus",
                                "description": "Termasuk Meeting Room 12 jam/bulan dan Instant Call Transfer."
                            },
                            "price": "375000",
                            "priceCurrency": "IDR",
                            "priceSpecification": {
                                "@type": "UnitPriceSpecification",
                                "price": "375000",
                                "priceCurrency": "IDR",
                                "unitCode": "MON"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "FCP (Full Communication) - Paket Premium",
                                "description": "Termasuk Dedicated Phone Number dan Meeting Room 15 jam/bulan."
                            },
                            "price": "916667",
                            "priceCurrency": "IDR",
                            "priceSpecification": {
                                "@type": "UnitPriceSpecification",
                                "price": "916667",
                                "priceCurrency": "IDR",
                                "unitCode": "MON"
                            }
                        }
                    ]
                }
            },
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/virtual-office#webpage",
                "url": "https://www.bintarobusinesscentre.com/virtual-office",
                "name": "Virtual Office Jakarta Selatan | Domisili Resmi DKI | BBC",
                "isPartOf": {
                    "@id": "https://www.bintarobusinesscentre.com/#website"
                },
                "about": {
                    "@id": "https://www.bintarobusinesscentre.com/#localbusiness"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://www.bintarobusinesscentre.com/virtual-office#breadcrumbs",
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
                        "name": "Virtual Office",
                        "item": "https://www.bintarobusinesscentre.com/virtual-office"
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "@id": "https://www.bintarobusinesscentre.com/virtual-office#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Apakah virtual office bisa digunakan untuk pendirian PT?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ya, untuk PT/CV Non-PKP dan PKP (tergantung KBLI). Virtual office dapat digunakan untuk pendirian perusahaan, NIB, dan NPWP sesuai regulasi yang berlaku."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah virtual office bisa untuk PKP?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ya, untuk perusahaan KBLI Jasa (konsultan, IT, marketing, dll). Virtual Office dapat digunakan untuk pengajuan PKP tanpa batasan kontrak minimum. Untuk perusahaan KBLI Selain Jasa (trading, distributor, transportasi, event organizer, dll), diperlukan kontrak sewa ruangan kantor minimal 1 tahun (Service Office) untuk pengajuan PKP sesuai regulasi perpajakan."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Bagaimana handling surat dilakukan?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Handling surat dilakukan dengan sistem penerimaan (inbound) setiap hari kerja. Segera setelah surat diterima, tim kami menginformasikan kepada Anda melalui WhatsApp. BBC tidak melayani pengiriman surat atau dokumen keluar atas nama penyewa."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah tersedia meeting room?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ya, untuk paket CP (12 jam/bulan) dan FCP (15 jam/bulan). Meeting room tersedia untuk pertemuan klien atau keperluan verifikasi lokasi perusahaan, termasuk verifikasi dari kantor pajak jika diperlukan."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Berapa lama kontrak minimum?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Untuk Virtual Office: Kontrak minimum umumnya 12 bulan dengan pembayaran tahunan. Untuk Service Office dengan kebutuhan PKP KBLI Selain Jasa: Minimum 1 tahun sesuai persyaratan perpajakan."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah ada batasan bidang usaha?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Tidak ada batasan umum, namun pastikan bidang usaha Anda sesuai dengan regulasi KBLI dan kebijakan instansi pemberi izin. Untuk pengajuan PKP, KBLI akan menentukan apakah Virtual Office atau Service Office yang lebih sesuai."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah bisa upgrade dari Virtual Office ke Service Office?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ya. Banyak klien kami—terutama perusahaan KBLI Selain Jasa—memulai dengan Virtual Office and upgrade ke Service Office saat siap mengajukan PKP. Proses upgrade fleksibel dan tanpa penalty."
                        }
                    }
                ]
            }
        ]
    }

    return (
        <>
            <Script
                id="virtual-office-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <p>
                Jika Anda butuh konteks domisili, baca <a href="/virtual-office/alamat-bisnis-jakarta-selatan">fungsi alamat bisnis di Jakarta Selatan</a> untuk kebutuhan administratif.
            </p>
            <VirtualOfficeClient />
            <p>
                Untuk kebutuhan pendirian badan usaha, lihat <a href="/legal/pendirian-pt-jakarta-selatan">layanan pendirian PT Jakarta Selatan</a> yang relevan dengan dokumen legal.
            </p>
            <p>
                Banyak bisnis memulai dari domisili untuk administrasi, lalu menambah kebutuhan operasional seiring waktu.
            </p>
            <p>
                Kenali latar belakang penyedia melalui halaman <a href="/tentang-kami">tentang kami</a> sebelum menentukan paket.
            </p>
        </>
    )
}
