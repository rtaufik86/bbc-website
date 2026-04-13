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
  skipTrailingSlashRedirect: true,
  async redirects() {
    const canonicalBase = 'https://www.bintarobusinesscentre.com';
    
    return [
      // 1. Core Service & Product Legacy (Direct to Final Canonical URL)
      { source: '/service-office', destination: `${canonicalBase}/sewa-kantor`, permanent: true },
      { source: '/sewa-gudang-bulanan', destination: `${canonicalBase}/sewa-kantor`, permanent: true },
      { source: '/jasa-sewa-virtual-office-di-bintaro-jakarta-selatan', destination: `${canonicalBase}/virtual-office`, permanent: true },
      { source: '/jasa-pembuatan-pt', destination: `${canonicalBase}/legal/pendirian-pt-jakarta-selatan`, permanent: true },
      { source: '/jasa-legalitas', destination: `${canonicalBase}/legal/pendirian-pt-jakarta-selatan`, permanent: true },

      // 2. Business & Legal Service Pages
      { source: '/business-services', destination: `${canonicalBase}/legal/pendirian-pt-jakarta-selatan`, permanent: true },
      { source: '/jasa-pengurusan-legalitas-perusahaan-di-jakarta-selatan', destination: `${canonicalBase}/legal/pendirian-pt-jakarta-selatan`, permanent: true },

      // 3. Contact & Basic Pages (Consolidation)
      { source: '/contact', destination: `${canonicalBase}/kontak`, permanent: true },
      { source: '/about', destination: `${canonicalBase}/tentang-kami`, permanent: true },
      { source: '/gallery', destination: `${canonicalBase}/tentang-kami`, permanent: true },

      // 4. Targeted SEO & Historical Authority
      { source: '/sewa-ruang-kantor-murah-di-jakarta-selatan', destination: `${canonicalBase}/sewa-kantor/murah-jakarta-selatan`, permanent: true },
      { source: '/jasa-sewa-kantor-di-bintaro-jakarta-selatan', destination: `${canonicalBase}/sewa-kantor/bintaro`, permanent: true },
      { source: '/tips-pintar-memilih-sewa-kantor-di-jakarta-selatan', destination: `${canonicalBase}/sewa-kantor/jakarta-selatan`, permanent: true },
      { source: '/persyaratan-jasa-pembuatan-pt', destination: `${canonicalBase}/legal/pendirian-pt-jakarta-selatan`, permanent: true },
      { source: '/kelebihan-dan-keuntungan-pt', destination: `${canonicalBase}/legal/pendirian-pt-jakarta-selatan`, permanent: true },
      { source: '/pengertian-perseroan-terbatas', destination: `${canonicalBase}/legal/pendirian-pt-jakarta-selatan`, permanent: true },
      { source: '/dasar-hukum-pendirian-pt', destination: `${canonicalBase}/legal/pendirian-pt-jakarta-selatan`, permanent: true },

      // 5. Host Canonicalization (Catch-all for non-www)
      // Moved to end to ensure specific path redirects happen in 1-hop even from non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'bintarobusinesscentre.com',
          },
        ],
        destination: `${canonicalBase}/:path*`,
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
