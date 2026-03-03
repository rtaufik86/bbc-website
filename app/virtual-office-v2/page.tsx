import { Metadata } from 'next'
import VirtualOfficeV2Client from './VirtualOfficeV2Client'
import Script from 'next/script'

export const metadata: Metadata = {
    alternates: { canonical: 'https://bintarobusinesscentre.com/virtual-office-v2' },
    title: 'Virtual Office Jakarta Selatan | Alamat Bisnis Sah & Profesional | BBC',
    description: 'Layanan Virtual Office Jakarta Selatan sejak 2007. Alamat bisnis sah di zona komersial untuk PKP, NPWP, dan legalitas PT/CV. Aktivasi 24 jam.',
}

export default function Page() {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://bintarobusinesscentre.com/virtual-office-v2#webpage",
                "url": "https://bintarobusinesscentre.com/virtual-office-v2",
                "name": "Virtual Office Jakarta Selatan - Version 2",
                "isPartOf": { "@id": "https://bintarobusinesscentre.com/#website" }
            }
        ]
    }

    return (
        <>
            <Script
                id="virtual-office-v2-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <VirtualOfficeV2Client />
        </>
    )
}
