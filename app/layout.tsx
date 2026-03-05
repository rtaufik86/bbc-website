import { Metadata } from 'next'
import Header from '@/components/navigation/Header'
import Footer from '@/components/navigation/Footer'
import WhatsAppFloating from '@/components/cta/WhatsAppFloating'
import Script from 'next/script'
import './globals.css'

import { Inter, Poppins, Playfair_Display } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

const poppins = Poppins({
    weight: ['700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://bintarobusinesscentre.com'),
    title: {
        default: 'Bintaro Business Center | Sewa Kantor & Virtual Office Jakarta Selatan',
        template: '%s | Bintaro Business Center'
    },
    description: 'Business center di Bintaro sejak 2007. Sewa kantor siap pakai, virtual office, dan jasa legal PT dengan fasilitas lengkap. Okupansi 85%.',
    icons: {
        icon: '/images/favicon.png',
        shortcut: '/images/favicon.png',
        apple: '/images/favicon.png',
    },
    openGraph: {
        type: 'website',
        locale: 'id_ID',
        url: 'https://bintarobusinesscentre.com',
        siteName: 'Bintaro Business Center',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Bintaro Business Center' }],
    },
    verification: {
        google: 'PLACEHOLDER_GOOGLE_VERIFICATION_CODE'
    }
}

const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "LocalBusiness",
            "name": "Bintaro Business Centre",
            "legalName": "PT. Ganesha Dwipaya Bhakti",
            "url": "https://www.bintarobusinesscentre.com",
            "logo": "https://www.bintarobusinesscentre.com/logo.png",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. RC. Veteran No. 1-i",
                "addressLocality": "Pesanggrahan",
                "addressRegion": "Jakarta Selatan",
                "postalCode": "12330",
                "addressCountry": "ID"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-6.2721934",
                "longitude": "106.7599445"
            },
            "telephone": "+62-21-7362639",
            "openingHours": "Mon-Fri 09:00-17:00, Sat 09:00-15:00",
            "sameAs": [
                "https://www.facebook.com/bintarobusinesscenter",
                "https://www.instagram.com/bintarobusinesscenter",
                "https://www.linkedin.com/company/bintarobusinesscenter"
            ]
        }
    ]
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id" className={`${inter.variable} ${poppins.variable} ${playfair.variable} scroll-smooth`}>
            <head>
                {/* Google Tag Manager - Head */}
                <Script id="gtm-head" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-KZ2QDX5');
                    `}
                </Script>

                {/* Global Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
                />

                {/* Meta Pixel */}
                <Script id="meta-pixel" strategy="afterInteractive">
                    {`
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID || ''}');
                  fbq('track', 'PageView');
              `}
                </Script>
            </head>
            <body className="font-sans text-slate-900 antialiased selection:bg-bbc-gold-500 selection:text-white">
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-KZ2QDX5"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                <Header />
                <main>{children}</main>
                <Footer />
                <WhatsAppFloating />

                {/* Telegram Notification Placeholder */}
                <Script id="telegram-notify" strategy="lazyOnload">
                    {/* Logic to send notifications would go here in client component hooks typically */}
                </Script>
            </body>
        </html>
    )
}
