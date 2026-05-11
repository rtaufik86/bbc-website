import { Metadata } from 'next'
import Script from 'next/script'
import HubPageTemplateV2 from '../../components/templates/HubPageTemplateV2'

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
            <HubPageTemplateV2
                eyebrow="Layanan Legal BBC"
                title="Layanan Legalitas Bisnis BBC"
                description="Hub legal BBC membantu pemilik usaha memilih jalur layanan yang tepat untuk pendirian PT, pengecekan KBLI, kebutuhan PKP, alamat bisnis, atau kantor fisik di Jakarta Selatan."
                primaryEntity="Layanan Legal BBC"
                breadcrumbs={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Legal', href: '/legal' },
                ]}
                heroActions={[
                    { label: 'Lihat jalur legal', href: '#jalur-legal' },
                    { label: 'Pertimbangkan alamat bisnis', href: '/virtual-office' },
                ]}
                decisionPaths={[
                    {
                        label: 'Pendirian usaha',
                        title: 'Baru mau mendirikan PT',
                        description: 'Untuk pemilik usaha yang sudah siap menyiapkan struktur badan usaha dan membutuhkan jalur pendirian PT di Jakarta Selatan.',
                        href: '/legal/pendirian-pt-jakarta-selatan',
                    },
                    {
                        label: 'Klasifikasi usaha',
                        title: 'Belum yakin KBLI yang sesuai',
                        description: 'Untuk usaha yang perlu memastikan klasifikasi kegiatan sebelum melanjutkan ke legalitas, izin, atau kebutuhan PKP.',
                        href: '/legal/cek-kbli',
                    },
                    {
                        label: 'PKP perdagangan',
                        title: 'Bisnis perdagangan perlu PKP',
                        description: 'Untuk bisnis perdagangan yang ingin memahami konteks PKP dan kebutuhan alamat atau kantor yang relevan.',
                        href: '/legal/pkp-perdagangan',
                    },
                    {
                        label: 'Alamat bisnis',
                        title: 'Butuh alamat bisnis Jakarta Selatan',
                        description: 'Untuk usaha jasa atau operasional ringan yang mempertimbangkan alamat bisnis melalui virtual office sesuai kebutuhan usaha.',
                        href: '/virtual-office',
                    },
                    {
                        label: 'Kantor fisik',
                        title: 'Butuh kantor fisik untuk konteks PKP',
                        description: 'Untuk usaha yang membutuhkan ruang kerja fisik, terutama ketika konteks kegiatan usaha menuntut alamat dan aktivitas kantor yang lebih jelas.',
                        href: '/sewa-kantor',
                    },
                ]}
                overviewBlocks={[
                    {
                        title: 'Pendirian dan struktur legal',
                        description: 'Jalur ini berfokus pada kebutuhan awal badan usaha, termasuk pilihan layanan pendirian PT dan dokumen pendukung yang relevan.',
                    },
                    {
                        title: 'KBLI dan izin usaha',
                        description: 'KBLI membantu mengarahkan kegiatan usaha agar selaras dengan izin dan kebutuhan administrasi berikutnya.',
                    },
                    {
                        title: 'Alamat bisnis dan kantor',
                        description: 'BBC menghubungkan kebutuhan legal dengan pilihan alamat bisnis, virtual office, atau sewa kantor sesuai konteks usaha.',
                    },
                ]}
                trustNotes={[
                    'Kebutuhan PKP bergantung pada KBLI, jenis kegiatan usaha, dan konteks operasional bisnis.',
                    'Virtual Office dapat sesuai untuk sebagian kebutuhan usaha jasa, tetapi tidak selalu cocok untuk semua jenis kegiatan.',
                    'Usaha perdagangan yang mengarah ke PKP dapat memerlukan konteks kantor fisik atau aktivitas operasional yang lebih jelas.',
                ]}
                serviceRoutes={[
                    {
                        title: 'Pendirian PT Jakarta Selatan',
                        description: 'Rute untuk pemilik usaha yang sudah siap memulai badan usaha PT dengan konteks domisili Jakarta Selatan.',
                        href: '/legal/pendirian-pt-jakarta-selatan',
                    },
                    {
                        title: 'Cek KBLI Usaha',
                        description: 'Rute untuk memeriksa klasifikasi kegiatan usaha sebelum memilih jalur legal atau perizinan.',
                        href: '/legal/cek-kbli',
                    },
                    {
                        title: 'Virtual Office BBC',
                        description: 'Rute untuk kebutuhan alamat bisnis Jakarta Selatan yang perlu dipertimbangkan bersama konteks legalitas.',
                        href: '/virtual-office',
                    },
                    {
                        title: 'Sewa Kantor BBC',
                        description: 'Rute untuk kebutuhan kantor fisik ketika aktivitas usaha membutuhkan ruang kerja yang lebih nyata.',
                        href: '/sewa-kantor',
                    },
                ]}
                faqItems={[
                    {
                        question: 'Mulai dari pendirian PT atau cek KBLI dulu?',
                        answer: 'Jika kegiatan usaha belum jelas, mulai dari cek KBLI. Jika struktur usaha dan kegiatan sudah siap, lanjutkan ke jalur pendirian PT.',
                    },
                    {
                        question: 'Apakah virtual office selalu cukup untuk kebutuhan legal?',
                        answer: 'Tidak selalu. Virtual Office dapat cocok untuk sebagian model usaha, tetapi kebutuhan alamat perlu dilihat bersama KBLI, jenis usaha, dan rencana operasional.',
                    },
                    {
                        question: 'Kapan sewa kantor lebih relevan daripada virtual office?',
                        answer: 'Sewa kantor lebih relevan jika kegiatan usaha membutuhkan kehadiran fisik, ruang kerja operasional, atau konteks PKP perdagangan yang memerlukan dukungan kantor.',
                    },
                ]}
                finalCta={{
                    title: 'Mulai dari kebutuhan legal yang paling sesuai',
                    description: 'Pilih rute layanan legal BBC berdasarkan tahap usaha, KBLI, kebutuhan PKP, dan kebutuhan alamat bisnis.',
                    actions: [
                        { label: 'Pilih jalur pendirian PT', href: '/legal/pendirian-pt-jakarta-selatan' },
                        { label: 'Cek KBLI usaha', href: '/legal/cek-kbli' },
                    ],
                }}
            />
        </>
    )
}
