import { Metadata } from 'next'
import LokasiClient from './LokasiClient'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'Lokasi Kantor Bintaro Business Centre Jakarta Selatan | Dekat Tol Veteran',
    description: 'Lokasi Bintaro Business Centre di Jl. RC. Veteran Raya No.1i, Pesanggrahan, Jakarta Selatan. Akses cepat ke Pintu Tol Veteran (±1,3 KM), dekat Bintaro Jaya dan Pondok Indah.',
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/lokasi' },
    openGraph: {
        title: 'Lokasi Kantor Bintaro Business Centre Jakarta Selatan | Dekat Tol Veteran',
        description: 'Lokasi Bintaro Business Centre di Jl. RC. Veteran Raya No.1i, Pesanggrahan, Jakarta Selatan. Akses cepat ke Pintu Tol Veteran (±1,3 KM), dekat Bintaro Jaya dan Pondok Indah.',
        images: ['/images/hero-lokasi.jpg']
    }
}

export default function LokasiPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.bintarobusinesscentre.com/lokasi#localbusiness",
        "name": "Bintaro Business Centre",
        "alternateName": "BBC",
        "url": "https://www.bintarobusinesscentre.com/lokasi",
        "description": "Lokasi kantor Bintaro Business Centre berada di Jl. RC. Veteran Raya No.1i, RT.1/RW.3, Kelurahan Bintaro, Kecamatan Pesanggrahan, Jakarta Selatan 12330, dengan akses cepat ke Pintu Tol Veteran (±1.3 KM).",
        "image": "https://www.bintarobusinesscentre.com/images/hero-lokasi.jpg",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jl. RC. Veteran Raya No.1i, RT.1/RW.3, Kel. Bintaro",
            "addressLocality": "Pesanggrahan",
            "addressRegion": "DKI Jakarta",
            "postalCode": "12330",
            "addressCountry": "ID"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -6.2721988,
            "longitude": 106.7622405
        },
        "hasMap": "https://www.google.com/maps/place/Bintaro+Business+Centre/@-6.2721988,106.7622405,17z",
        "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Jakarta Selatan"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "17:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "15:00"
            }
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "(021) 7362639",
            "contactType": "customer service",
            "areaServed": "ID",
            "availableLanguage": ["Indonesian", "English"]
        }
    }

    return (
        <>
            <Script
                id="lokasi-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <LokasiClient />
        </>
    )
}
