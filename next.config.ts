import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bintarobusinesscentre.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp']
  },
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'bintarobusinesscentre.com',
          },
        ],
        destination: 'https://www.bintarobusinesscentre.com/:path*',
        permanent: true,
      },
      // 1. Core Service Pages (Preserving Authority)
      { source: '/service-office', destination: '/sewa-kantor', permanent: true },
      { source: '/jasa-sewa-virtual-office-di-bintaro-jakarta-selatan', destination: '/virtual-office', permanent: true },
      { source: '/jasa-pembuatan-pt', destination: '/legal/pendirian-pt-jakarta-selatan', permanent: true },
      { source: '/jasa-legalitas', destination: '/legal/pendirian-pt-jakarta-selatan', permanent: true },
      { source: '/lp/jasa-sewa-kantor', destination: '/sewa-kantor', permanent: true },

      // 2. Business Service Page (Critical Transition)
      { source: '/business-services', destination: '/legal/pendirian-pt-jakarta-selatan', permanent: true },

      // 3. Category & Gallery (Backlink Preservation)
      { source: '/category/sewa-ruang-kantor', destination: '/sewa-kantor/bintaro', permanent: true },
      { source: '/category/virtual-office', destination: '/virtual-office', permanent: true },
      { source: '/gallery', destination: '/tentang-kami', permanent: true },

      // 4. Targeted SEO & Historical Authority (Preserved)
      { source: '/sewa-ruang-kantor-murah-di-jakarta-selatan', destination: '/sewa-kantor/murah-jakarta-selatan', permanent: true },
      { source: '/jasa-sewa-kantor-di-bintaro-jakarta-selatan', destination: '/sewa-kantor/bintaro', permanent: true },
      { source: '/tips-pintar-memilih-sewa-kantor-di-jakarta-selatan', destination: '/sewa-kantor/jakarta-selatan', permanent: true },
      { source: '/persyaratan-jasa-pembuatan-pt', destination: '/legal/pendirian-pt-jakarta-selatan', permanent: true },
      { source: '/kelebihan-dan-keuntungan-pt', destination: '/legal/pendirian-pt-jakarta-selatan', permanent: true },
      { source: '/pengertian-perseroan-terbatas', destination: '/legal/pendirian-pt-jakarta-selatan', permanent: true },
      { source: '/dasar-hukum-pendirian-pt', destination: '/legal/pendirian-pt-jakarta-selatan', permanent: true },

      // 5. Note on 410 Gone: 
      // Handled in middleware.ts for /sewa-gudang-bulanan as per directive.
    ]
  }
};

export default nextConfig;
