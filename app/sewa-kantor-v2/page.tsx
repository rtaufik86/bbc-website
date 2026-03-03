import { Metadata } from 'next'
import SewaKantorV2Client from './SewaKantorV2Client'
import Script from 'next/script'

export const metadata: Metadata = {
    alternates: { canonical: 'https://bintarobusinesscentre.com/sewa-kantor-v2' },
    title: 'Sewa Kantor Jakarta Selatan | Siap Pakai & Langsung Operasional | BBC',
    description: 'Sewa kantor siap pakai di Jakarta Selatan sejak 2007. Serviced office all-inclusive dengan dukungan legalitas lengkap. Lokasi strategis dekat Tol Veteran.',
}

export default function Page() {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://bintarobusinesscentre.com/sewa-kantor-v2#webpage",
                "url": "https://bintarobusinesscentre.com/sewa-kantor-v2",
                "name": "Sewa Kantor Siap Pakai Jakarta Selatan - Version 2",
                "isPartOf": { "@id": "https://bintarobusinesscentre.com/#website" }
            }
        ]
    }

    return (
        <>
            <Script
                id="sewa-kantor-v2-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <SewaKantorV2Client />
        </>
    )
}
