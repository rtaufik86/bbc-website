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
  async redirects() {
    return [
      // 1. Core Service Pages (Preserving Authority)
      { source: '/service-office', destination: '/sewa-kantor', statusCode: 301 },
      { source: '/jasa-sewa-virtual-office-di-bintaro-jakarta-selatan', destination: '/virtual-office', statusCode: 301 },
      { source: '/jasa-pembuatan-pt', destination: '/legal/pendirian-pt-jakarta-selatan', statusCode: 301 },
      { source: '/jasa-legalitas', destination: '/legal/pendirian-pt-jakarta-selatan', statusCode: 301 },
      { source: '/lp/jasa-sewa-kantor', destination: '/sewa-kantor', statusCode: 301 },

      // 2. Business Service Page (Critical Transition)
      { source: '/business-services', destination: '/legal/pendirian-pt-jakarta-selatan', statusCode: 301 },

      // 3. Category & Gallery (Backlink Preservation)
      { source: '/category/sewa-ruang-kantor', destination: '/sewa-kantor/bintaro', statusCode: 301 },
      { source: '/category/virtual-office', destination: '/virtual-office', statusCode: 301 },
      { source: '/gallery', destination: '/tentang-kami', statusCode: 301 },

      // 4. Targeted SEO & Historical Authority (Preserved)
      { source: '/sewa-ruang-kantor-murah-di-jakarta-selatan', destination: '/sewa-kantor/murah-jakarta-selatan', statusCode: 301 },
      { source: '/jasa-sewa-kantor-di-bintaro-jakarta-selatan', destination: '/sewa-kantor/bintaro', statusCode: 301 },
      { source: '/tips-pintar-memilih-sewa-kantor-di-jakarta-selatan', destination: '/sewa-kantor/jakarta-selatan', statusCode: 301 },
      { source: '/persyaratan-jasa-pembuatan-pt', destination: '/legal/pendirian-pt-jakarta-selatan', statusCode: 301 },
      { source: '/kelebihan-dan-keuntungan-pt', destination: '/legal/pendirian-pt-jakarta-selatan', statusCode: 301 },
      { source: '/pengertian-perseroan-terbatas', destination: '/legal/pendirian-pt-jakarta-selatan', statusCode: 301 },
      { source: '/dasar-hukum-pendirian-pt', destination: '/legal/pendirian-pt-jakarta-selatan', statusCode: 301 },

      // 5. Note on 410 Gone: 
      // Handled in middleware.ts for /sewa-gudang-bulanan as per directive.
    ]
  }
};

export default nextConfig;
