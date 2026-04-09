// ============================================================
// BBC SITE REGISTRY — STRUCTURAL SOURCE OF TRUTH
// LOCKED: angle, family, entity, intent CANNOT be changed by tools
// All audit tools READ from here. Never write back.
// ============================================================

export type Intent = 'transactional' | 'informational' | 'navigational' | 'commercial';
export type Family = 'core' | 'price' | 'geo' | 'product' | 'comparison' | 'legal' | 'reference' | 'trust' | 'utility';
export type Cluster = 'sewa-kantor' | 'virtual-office' | 'legal' | 'trust' | 'root' | 'utility';

export interface SiteRegistryEntry {
  url: string;
  absoluteUrl: string;
  pageType: 'money' | 'weapon' | 'hub' | 'support' | 'utility';
  family: Family;
  cluster: Cluster;
  entity: string;
  angle: string;           // LOCKED by structural authority
  intent: Intent;
  expectedBehavior: string;
  forbiddenPatterns: string[];
  trustSignals: string[];
  queryBank: string[];
  expectedContentLength: { min: number; max: number };
  expectedCTA: boolean;
  expectedFAQ: boolean;
  expectedSchema: string[];
}

export const SITE_REGISTRY: Record<string, SiteRegistryEntry> = {
  '/': {
    url: '/', absoluteUrl: 'https://www.bintarobusinesscentre.com',
    pageType: 'money', family: 'core', cluster: 'root',
    entity: 'BBC', angle: 'Kantor, VO & Legalitas Jakarta Selatan',
    intent: 'navigational',
    expectedBehavior: 'Navigational hub pointing to money pages with strong trust signals.',
    forbiddenPatterns: ['panduan lengkap', 'apa itu', 'faktor-faktor'],
    trustSignals: ['Jakarta Selatan', 'sejak 2007', '1.800+', 'Pesanggrahan', 'PT. Ganesha'],
    queryBank: ['kantor jakarta selatan', 'virtual office jakarta selatan', 'bintaro business centre'],
    expectedContentLength: { min: 400, max: 1000 }, expectedCTA: true, expectedFAQ: false,
    expectedSchema: ['Organization', 'LocalBusiness', 'WebSite'],
  },
  '/sewa-kantor': {
    url: '/sewa-kantor', absoluteUrl: 'https://www.bintarobusinesscentre.com/sewa-kantor',
    pageType: 'money', family: 'core', cluster: 'sewa-kantor',
    entity: 'Sewa Kantor', angle: '72 Unit Operasional Siap Pakai Tanpa Setup',
    intent: 'transactional',
    expectedBehavior: 'Primary conversion page. Strong CTA, trust signals, controlled outbound.',
    forbiddenPatterns: ['panduan', 'apa itu', 'kelebihan dan kekurangan'],
    trustSignals: ['72 unit', 'Jakarta Selatan', 'sejak 2007', 'Pintu Tol Veteran', 'Pesanggrahan'],
    queryBank: ['sewa kantor jakarta selatan', 'kantor siap pakai jakarta selatan', 'kantor dekat tol veteran'],
    expectedContentLength: { min: 600, max: 1200 }, expectedCTA: true, expectedFAQ: true,
    expectedSchema: ['Product', 'LocalBusiness', 'FAQPage'],
  },
  '/virtual-office': {
    url: '/virtual-office', absoluteUrl: 'https://www.bintarobusinesscentre.com/virtual-office',
    pageType: 'money', family: 'core', cluster: 'virtual-office',
    entity: 'Virtual Office', angle: 'Domisili Resmi DKI untuk PT & PKP (KBLI Jasa)',
    intent: 'transactional',
    expectedBehavior: 'Primary conversion. Must clarify PKP + KBLI jasa distinction. No overclaiming.',
    forbiddenPatterns: ['semua KBLI bisa PKP', 'garansi', 'pasti approved'],
    trustSignals: ['Jakarta Selatan', 'DKI', 'PKP', 'KBLI jasa', '1.800+', 'sejak 2007'],
    queryBank: ['virtual office jakarta selatan', 'virtual office untuk PKP', 'alamat bisnis jakarta selatan'],
    expectedContentLength: { min: 600, max: 1200 }, expectedCTA: true, expectedFAQ: true,
    expectedSchema: ['Product', 'LocalBusiness', 'FAQPage'],
  },
  '/legal/pendirian-pt-jakarta-selatan': {
    url: '/legal/pendirian-pt-jakarta-selatan', absoluteUrl: 'https://www.bintarobusinesscentre.com/legal/pendirian-pt-jakarta-selatan',
    pageType: 'money', family: 'core', cluster: 'legal',
    entity: 'Pendirian PT', angle: 'Proses 14–21 Hari Kerja dengan Domisili Resmi DKI',
    intent: 'transactional',
    expectedBehavior: 'Conversion for legal services. Clarify process, not guarantee outcomes.',
    forbiddenPatterns: ['garansi', 'pasti jadi', 'terjamin', 'cepat sekali'],
    trustSignals: ['Jakarta Selatan', 'DKI', 'notaris', 'akta', '14-21 hari', 'Pesanggrahan'],
    queryBank: ['pendirian PT jakarta selatan', 'buat PT jakarta selatan', 'jasa pendirian PT DKI'],
    expectedContentLength: { min: 500, max: 1000 }, expectedCTA: true, expectedFAQ: true,
    expectedSchema: ['Service', 'LocalBusiness', 'FAQPage'],
  },
  '/harga-sewa-kantor-bintaro': {
    url: '/harga-sewa-kantor-bintaro', absoluteUrl: 'https://www.bintarobusinesscentre.com/harga-sewa-kantor-bintaro',
    pageType: 'weapon', family: 'price', cluster: 'sewa-kantor',
    entity: 'Harga Sewa Kantor Bintaro', angle: 'Struktur Biaya & Variabel yang Mempengaruhi Harga',
    intent: 'commercial',
    expectedBehavior: 'Informational price guide. Explain cost structure. Soft CTA only.',
    forbiddenPatterns: ['promo', 'diskon', 'murah sekali', 'terbaik'],
    trustSignals: ['Jakarta Selatan', 'Bintaro Jaya', 'Pesanggrahan'],
    queryBank: ['harga sewa kantor bintaro', 'biaya kantor bintaro', 'sewa kantor bintaro berapa'],
    expectedContentLength: { min: 700, max: 1200 }, expectedCTA: false, expectedFAQ: true,
    expectedSchema: ['Article', 'FAQPage'],
  },
  '/harga-virtual-office': {
    url: '/harga-virtual-office', absoluteUrl: 'https://www.bintarobusinesscentre.com/harga-virtual-office',
    pageType: 'weapon', family: 'price', cluster: 'virtual-office',
    entity: 'Harga Virtual Office', angle: 'Faktor Penentu Nilai Layanan - Bukan Sekadar Angka',
    intent: 'commercial',
    expectedBehavior: 'Educate about value factors. Should NOT list BBC specific pricing.',
    forbiddenPatterns: ['promo', 'diskon', 'hubungi', 'murah', 'terjangkau'],
    trustSignals: ['Jakarta Selatan', 'DKI'],
    queryBank: ['harga virtual office', 'biaya virtual office', 'virtual office murah'],
    expectedContentLength: { min: 700, max: 1200 }, expectedCTA: false, expectedFAQ: true,
    expectedSchema: ['Article', 'FAQPage'],
  },
  '/harga-virtual-office-jakarta-selatan': {
    url: '/harga-virtual-office-jakarta-selatan', absoluteUrl: 'https://www.bintarobusinesscentre.com/harga-virtual-office-jakarta-selatan',
    pageType: 'weapon', family: 'price', cluster: 'virtual-office',
    entity: 'Harga Virtual Office Jakarta Selatan', angle: 'Breakdown Biaya & Perbandingan Antar Paket',
    intent: 'commercial',
    expectedBehavior: 'Component-based price breakdown for Jakarta Selatan. No explicit per-paket pricing.',
    forbiddenPatterns: ['promo', 'diskon', 'garansi'],
    trustSignals: ['Jakarta Selatan', 'DKI', 'Pesanggrahan'],
    queryBank: ['harga virtual office jakarta selatan', 'biaya virtual office jakarta selatan'],
    expectedContentLength: { min: 700, max: 1200 }, expectedCTA: false, expectedFAQ: true,
    expectedSchema: ['Article', 'FAQPage'],
  },
  '/sewa-kantor/harga': {
    url: '/sewa-kantor/harga', absoluteUrl: 'https://www.bintarobusinesscentre.com/sewa-kantor/harga',
    pageType: 'weapon', family: 'price', cluster: 'sewa-kantor',
    entity: 'Sewa Kantor Bintaro', angle: 'Cara Menilai Nilai Ruang Kantor - Bukan Angka Tanpa Konteks',
    intent: 'commercial',
    expectedBehavior: 'Educational value assessment guide. Teach HOW to evaluate, not list prices.',
    forbiddenPatterns: ['promo', 'diskon', 'murah'],
    trustSignals: ['Jakarta Selatan', 'Bintaro'],
    queryBank: ['harga sewa kantor bintaro 2024', 'kantor bintaro harga per bulan'],
    expectedContentLength: { min: 600, max: 1000 }, expectedCTA: false, expectedFAQ: true,
    expectedSchema: ['Article', 'FAQPage'],
  },
  '/virtual-office/jakarta-selatan': {
    url: '/virtual-office/jakarta-selatan', absoluteUrl: 'https://www.bintarobusinesscentre.com/virtual-office/jakarta-selatan',
    pageType: 'weapon', family: 'legal', cluster: 'virtual-office',
    entity: 'Virtual Office Jakarta Selatan', angle: 'Kesesuaian Regulasi NIB & PKP Berdasarkan KBLI',
    intent: 'informational',
    expectedBehavior: 'Regulatory education. Explain KBLI, NIB, PKP without overclaiming.',
    forbiddenPatterns: ['semua bisa', 'garansi PKP', 'pasti approved'],
    trustSignals: ['Jakarta Selatan', 'DKI', 'KBLI', 'NIB', 'PKP', 'regulasi'],
    queryBank: ['virtual office jakarta selatan untuk PKP', 'apakah virtual office bisa untuk PKP', 'KBLI virtual office'],
    expectedContentLength: { min: 700, max: 1200 }, expectedCTA: false, expectedFAQ: true,
    expectedSchema: ['Article', 'FAQPage'],
  },
  '/virtual-office/alamat-bisnis-jakarta-selatan': {
    url: '/virtual-office/alamat-bisnis-jakarta-selatan', absoluteUrl: 'https://www.bintarobusinesscentre.com/virtual-office/alamat-bisnis-jakarta-selatan',
    pageType: 'weapon', family: 'legal', cluster: 'virtual-office',
    entity: 'Alamat Bisnis Virtual Office Jakarta Selatan', angle: 'Fungsi & Legalitas Alamat Bisnis dalam Struktur Perizinan',
    intent: 'informational',
    expectedBehavior: 'Explain legal function of business address. Cover NIB, NPWP, PT implications.',
    forbiddenPatterns: ['promosi', 'diskon', 'garansi'],
    trustSignals: ['Jakarta Selatan', 'DKI', 'NIB', 'NPWP', 'perizinan'],
    queryBank: ['alamat bisnis virtual office', 'fungsi alamat bisnis PT', 'virtual office untuk alamat NPWP'],
    expectedContentLength: { min: 600, max: 1000 }, expectedCTA: false, expectedFAQ: true,
    expectedSchema: ['Article', 'FAQPage'],
  },
  '/virtual-office-bintaro': {
    url: '/virtual-office-bintaro', absoluteUrl: 'https://www.bintarobusinesscentre.com/virtual-office-bintaro',
    pageType: 'weapon', family: 'product', cluster: 'virtual-office',
    entity: 'Virtual Office Bintaro', angle: 'Konsep & Fasilitas Layanan Virtual Office Kawasan Bintaro',
    intent: 'informational',
    expectedBehavior: 'Product education for Bintaro area. Covers facilities, concept. Not conversion.',
    forbiddenPatterns: ['promo', 'diskon', 'paling murah'],
    trustSignals: ['Bintaro', 'Jakarta Selatan', 'DKI'],
    queryBank: ['virtual office bintaro', 'kantor virtual bintaro', 'virtual office dekat bintaro jaya'],
    expectedContentLength: { min: 600, max: 1000 }, expectedCTA: false, expectedFAQ: true,
    expectedSchema: ['Article', 'FAQPage'],
  },
  '/sewa-kantor/jakarta-selatan': {
    url: '/sewa-kantor/jakarta-selatan', absoluteUrl: 'https://www.bintarobusinesscentre.com/sewa-kantor/jakarta-selatan',
    pageType: 'weapon', family: 'product', cluster: 'sewa-kantor',
    entity: 'Sewa Kantor Jakarta Selatan', angle: 'Struktur Layanan & Fasilitas Kantor di Jakarta Selatan',
    intent: 'informational',
    expectedBehavior: 'Product structure page. Not pure conversion — educate on service structure.',
    forbiddenPatterns: ['promo', 'diskon', 'murah'],
    trustSignals: ['Jakarta Selatan', 'Pesanggrahan', 'DKI'],
    queryBank: ['sewa kantor jakarta selatan fully furnished', 'kantor operasional jakarta selatan'],
    expectedContentLength: { min: 600, max: 1000 }, expectedCTA: false, expectedFAQ: true,
    expectedSchema: ['Article', 'FAQPage'],
  },
  '/sewa-kantor/bintaro': {
    url: '/sewa-kantor/bintaro', absoluteUrl: 'https://www.bintarobusinesscentre.com/sewa-kantor/bintaro',
    pageType: 'weapon', family: 'product', cluster: 'sewa-kantor',
    entity: 'Private Office Bintaro', angle: 'Konsep, Fasilitas & Standar Layanan Private Office',
    intent: 'informational',
    expectedBehavior: 'Product concept education for Bintaro private office.',
    forbiddenPatterns: ['promo', 'diskon'],
    trustSignals: ['Bintaro', 'Jakarta Selatan', 'Tol Veteran', 'Pesanggrahan'],
    queryBank: ['private office bintaro', 'sewa kantor private bintaro'],
    expectedContentLength: { min: 600, max: 1000 }, expectedCTA: false, expectedFAQ: true,
    expectedSchema: ['Article', 'FAQPage'],
  },
  '/sewa-kantor/kantor-siap-pakai-bintaro': {
    url: '/sewa-kantor/kantor-siap-pakai-bintaro', absoluteUrl: 'https://www.bintarobusinesscentre.com/sewa-kantor/kantor-siap-pakai-bintaro',
    pageType: 'weapon', family: 'product', cluster: 'sewa-kantor',
    entity: 'Kantor Siap Pakai Bintaro', angle: 'Apa yang Termasuk dalam Paket Kantor Siap Pakai',
    intent: 'informational',
    expectedBehavior: 'Explain what\'s included in a ready-to-use office package. Educational.',
    forbiddenPatterns: ['promo', 'diskon', 'terbaik'],
    trustSignals: ['Bintaro', 'Jakarta Selatan', 'fully furnished'],
    queryBank: ['kantor siap pakai bintaro', 'kantor fully furnished bintaro', 'apa itu kantor siap pakai'],
    expectedContentLength: { min: 600, max: 1000 }, expectedCTA: false, expectedFAQ: true,
    expectedSchema: ['Article', 'FAQPage'],
  },
  '/sewa-kantor/murah-jakarta-selatan': {
    url: '/sewa-kantor/murah-jakarta-selatan', absoluteUrl: 'https://www.bintarobusinesscentre.com/sewa-kantor/murah-jakarta-selatan',
    pageType: 'weapon', family: 'comparison', cluster: 'sewa-kantor',
    entity: 'Sewa Kantor Murah Jakarta Selatan', angle: 'Kelebihan & Keterbatasan Model Kantor Berbiaya Rendah',
    intent: 'commercial',
    expectedBehavior: 'Balanced analysis of cheap office options — show limitations to redirect toward value.',
    forbiddenPatterns: ['garansi murah', 'terjamin'],
    trustSignals: ['Jakarta Selatan', 'Pesanggrahan'],
    queryBank: ['kantor murah jakarta selatan', 'sewa kantor jakarta selatan murah', 'kantor terjangkau jaksel'],
    expectedContentLength: { min: 600, max: 1000 }, expectedCTA: false, expectedFAQ: true,
    expectedSchema: ['Article', 'FAQPage'],
  },
  '/kantor-dekat-bintaro-jaya': {
    url: '/kantor-dekat-bintaro-jaya', absoluteUrl: 'https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya',
    pageType: 'weapon', family: 'geo', cluster: 'sewa-kantor',
    entity: 'Kantor Dekat Bintaro Jaya', angle: 'Koridor Bisnis Jakarta Selatan - Bintaro Jaya ke Pesanggrahan',
    intent: 'informational',
    expectedBehavior: 'Geographic context page. Explain proximity, not a store locator.',
    forbiddenPatterns: ['promo', 'murah', 'diskon'],
    trustSignals: ['Bintaro Jaya', 'Jakarta Selatan', 'JORR W2S', 'Pesanggrahan'],
    queryBank: ['kantor dekat bintaro jaya', 'office bintaro jaya', 'kantor dekat bintaro xchange'],
    expectedContentLength: { min: 600, max: 1000 }, expectedCTA: false, expectedFAQ: false,
    expectedSchema: ['Article'],
  },
  '/kantor-dekat-tol-veteran': {
    url: '/kantor-dekat-tol-veteran', absoluteUrl: 'https://www.bintarobusinesscentre.com/kantor-dekat-tol-veteran',
    pageType: 'weapon', family: 'geo', cluster: 'sewa-kantor',
    entity: 'Kantor Dekat Tol Veteran', angle: 'Konektivitas & Akses via Pintu Tol Veteran Jakarta Selatan',
    intent: 'informational',
    expectedBehavior: 'Infrastructure and connectivity context. Explain toll access.',
    forbiddenPatterns: ['promo', 'murah', 'diskon'],
    trustSignals: ['Tol Veteran', 'Jakarta Selatan', 'JORR', 'Pesanggrahan'],
    queryBank: ['kantor dekat tol veteran', 'office tol veteran jakarta', 'kantor akses tol selatan'],
    expectedContentLength: { min: 600, max: 1000 }, expectedCTA: false, expectedFAQ: false,
    expectedSchema: ['Article'],
  },
  '/legal': {
    url: '/legal', absoluteUrl: 'https://www.bintarobusinesscentre.com/legal',
    pageType: 'hub', family: 'core', cluster: 'legal',
    entity: 'Legalitas Usaha', angle: 'Panduan Navigasi PT, KBLI & PKP di Jakarta Selatan',
    intent: 'navigational',
    expectedBehavior: 'Navigation/distribution hub for legal cluster. Points to sub-pages.',
    forbiddenPatterns: ['murah', 'harga terbaik', 'diskon'],
    trustSignals: ['Jakarta Selatan', 'DKI', 'PT', 'PKP', 'KBLI'],
    queryBank: ['legalitas usaha jakarta selatan', 'pendirian PT dan PKP', 'prosedur legalitas perusahaan'],
    expectedContentLength: { min: 400, max: 800 }, expectedCTA: false, expectedFAQ: false,
    expectedSchema: ['CollectionPage'],
  },
  '/legal/cek-kbli': {
    url: '/legal/cek-kbli', absoluteUrl: 'https://www.bintarobusinesscentre.com/legal/cek-kbli',
    pageType: 'hub', family: 'reference', cluster: 'legal',
    entity: 'Cek KBLI', angle: 'Panduan & Kategori KBLI untuk Usaha di Jakarta Selatan',
    intent: 'informational',
    expectedBehavior: 'Reference page for KBLI classification. Purely educational.',
    forbiddenPatterns: ['promo', 'murah', 'diskon', 'gratis'],
    trustSignals: ['Jakarta Selatan', 'KBLI', 'NIB', 'jasa', 'perdagangan'],
    queryBank: ['cek KBLI usaha', 'KBLI jasa apa saja', 'cara cek KBLI', 'KBLI untuk virtual office'],
    expectedContentLength: { min: 500, max: 900 }, expectedCTA: false, expectedFAQ: true,
    expectedSchema: ['Article', 'FAQPage'],
  },
  '/legal/pkp-perdagangan': {
    url: '/legal/pkp-perdagangan', absoluteUrl: 'https://www.bintarobusinesscentre.com/legal/pkp-perdagangan',
    pageType: 'hub', family: 'reference', cluster: 'legal',
    entity: 'PKP Perdagangan', angle: 'Opsi & Persyaratan PKP untuk KBLI Non-Jasa',
    intent: 'informational',
    expectedBehavior: 'Explain PKP requirements for trading/non-service KBLI. Must clarify physical office requirement.',
    forbiddenPatterns: ['garansi PKP', 'pasti bisa', 'semua bisa PKP'],
    trustSignals: ['Jakarta Selatan', 'DKI', 'PKP', 'KBLI non-jasa', 'kantor fisik'],
    queryBank: ['PKP perdagangan persyaratan', 'KBLI perdagangan bisa PKP', 'virtual office untuk PKP perdagangan', 'kontrak 1 tahun PKP'],
    expectedContentLength: { min: 600, max: 1000 }, expectedCTA: false, expectedFAQ: true,
    expectedSchema: ['Article', 'FAQPage'],
  },
  '/tentang-kami': {
    url: '/tentang-kami', absoluteUrl: 'https://www.bintarobusinesscentre.com/tentang-kami',
    pageType: 'support', family: 'trust', cluster: 'trust',
    entity: 'Tentang Kami', angle: 'Profil Resmi BBC - PT. Ganesha Dwipaya Bhakti Sejak 2007',
    intent: 'navigational',
    expectedBehavior: 'Company profile with strong trust signals. History, legal entity, operational facts.',
    forbiddenPatterns: ['terbaik di Indonesia', 'nomor satu'],
    trustSignals: ['PT. Ganesha Dwipaya Bhakti', '2007', 'Pesanggrahan', 'Jakarta Selatan', '1.800+'],
    queryBank: ['tentang bintaro business centre', 'BBC siapa', 'profil BBC jakarta'],
    expectedContentLength: { min: 300, max: 700 }, expectedCTA: true, expectedFAQ: false,
    expectedSchema: ['Organization', 'AboutPage'],
  },
  '/lokasi-kantor': {
    url: '/lokasi-kantor', absoluteUrl: 'https://www.bintarobusinesscentre.com/lokasi-kantor',
    pageType: 'support', family: 'trust', cluster: 'trust',
    entity: 'Lokasi Kantor', angle: 'Jl. RC Veteran Pesanggrahan Jakarta Selatan - Cara Menuju BBC',
    intent: 'navigational',
    expectedBehavior: 'Location clarity page. Address, maps, access routes. Trust anchor.',
    forbiddenPatterns: [],
    trustSignals: ['Jl. RC Veteran', 'Pesanggrahan', 'Jakarta Selatan', 'DKI', 'Tol Veteran'],
    queryBank: ['lokasi BBC bintaro', 'alamat bintaro business centre', 'cara ke BBC dari tol veteran'],
    expectedContentLength: { min: 200, max: 500 }, expectedCTA: true, expectedFAQ: false,
    expectedSchema: ['LocalBusiness', 'Place'],
  },
  '/kontak': {
    url: '/kontak', absoluteUrl: 'https://www.bintarobusinesscentre.com/kontak',
    pageType: 'support', family: 'trust', cluster: 'trust',
    entity: 'Kontak', angle: 'Hubungi BBC - WhatsApp, Telepon & Email',
    intent: 'transactional',
    expectedBehavior: 'Contact/conversion page. Clear channels, operating hours.',
    forbiddenPatterns: [],
    trustSignals: ['WhatsApp', 'Jakarta Selatan', 'Senin–Jumat', 'BBC'],
    queryBank: ['kontak bintaro business centre', 'BBC whatsapp', 'telepon BBC'],
    expectedContentLength: { min: 100, max: 400 }, expectedCTA: true, expectedFAQ: false,
    expectedSchema: ['ContactPage', 'LocalBusiness'],
  },
  '/klien-dan-testimoni': {
    url: '/klien-dan-testimoni', absoluteUrl: 'https://www.bintarobusinesscentre.com/klien-dan-testimoni',
    pageType: 'support', family: 'trust', cluster: 'trust',
    entity: 'Klien & Testimoni', angle: 'Bukti Sosial - 1.800+ Perusahaan Percaya BBC',
    intent: 'navigational',
    expectedBehavior: 'Social proof trust page. Real client facts, industry breakdown.',
    forbiddenPatterns: ['terbaik di Indonesia'],
    trustSignals: ['1.800+ perusahaan', 'sejak 2007', 'Jakarta Selatan'],
    queryBank: ['testimoni bintaro business centre', 'review BBC jakarta', 'klien BBC'],
    expectedContentLength: { min: 300, max: 700 }, expectedCTA: true, expectedFAQ: false,
    expectedSchema: ['Organization'],
  },
  '/fasilitas-kantor': {
    url: '/fasilitas-kantor', absoluteUrl: 'https://www.bintarobusinesscentre.com/fasilitas-kantor',
    pageType: 'support', family: 'trust', cluster: 'trust',
    entity: 'Fasilitas Kantor', angle: 'Infrastruktur BBC - Parkir, Internet, Resepsionis & Meeting Room',
    intent: 'informational',
    expectedBehavior: 'Facility detail page. Physical trust signals. Not a conversion page.',
    forbiddenPatterns: ['promo', 'diskon'],
    trustSignals: ['30 mobil', 'high-speed internet', 'resepsionis', 'Jakarta Selatan', 'Pesanggrahan'],
    queryBank: ['fasilitas kantor BBC bintaro', 'kantor dengan resepsionis', 'kantor parking jakarta selatan'],
    expectedContentLength: { min: 300, max: 700 }, expectedCTA: false, expectedFAQ: false,
    expectedSchema: ['LocalBusiness'],
  },
  '/ruang-meeting': {
    url: '/ruang-meeting', absoluteUrl: 'https://www.bintarobusinesscentre.com/ruang-meeting',
    pageType: 'support', family: 'trust', cluster: 'trust',
    entity: 'Ruang Meeting', angle: 'Sewa Meeting Room Jakarta Selatan - Kapasitas & Harga per Jam',
    intent: 'commercial',
    expectedBehavior: 'Service page for meeting room. Has pricing. Mild conversion intent.',
    forbiddenPatterns: [],
    trustSignals: ['Jakarta Selatan', 'Pesanggrahan', 'BBC', 'Wi-Fi'],
    queryBank: ['ruang meeting jakarta selatan', 'sewa meeting room bintaro', 'meeting room dekat tol'],
    expectedContentLength: { min: 300, max: 600 }, expectedCTA: true, expectedFAQ: false,
    expectedSchema: ['Product', 'LocalBusiness'],
  },
  '/legalitas-dan-perizinan-bbc': {
    url: '/legalitas-dan-perizinan-bbc', absoluteUrl: 'https://www.bintarobusinesscentre.com/legalitas-dan-perizinan-bbc',
    pageType: 'support', family: 'trust', cluster: 'trust',
    entity: 'Legalitas & Perizinan', angle: 'Transparansi Operasional BBC - Izin Usaha Resmi',
    intent: 'navigational',
    expectedBehavior: 'Transparency page about BBC\'s own legal status. Strong trust anchor.',
    forbiddenPatterns: [],
    trustSignals: ['PT. Ganesha Dwipaya Bhakti', 'izin usaha', 'Jakarta Selatan', 'DKI'],
    queryBank: ['legalitas BBC', 'izin usaha bintaro business centre', 'BBC perusahaan resmi'],
    expectedContentLength: { min: 200, max: 500 }, expectedCTA: false, expectedFAQ: false,
    expectedSchema: ['Organization'],
  },
};

// ─── Query Bank per Cluster ─────────────────────────────────
export const QUERY_BANK_BY_CLUSTER: Record<string, string[]> = {
  'sewa-kantor': [
    'sewa kantor jakarta selatan', 'kantor siap pakai jakarta selatan',
    'kantor dekat tol veteran', 'kantor dekat bintaro jaya',
    'private office bintaro', 'harga sewa kantor bintaro',
    'kantor fully furnished jakarta selatan', 'sewa kantor murah jakarta selatan',
    'kantor 1 bulan jakarta selatan', 'kantor operasional tanpa setup',
  ],
  'virtual-office': [
    'virtual office jakarta selatan', 'apakah virtual office bisa untuk PKP',
    'virtual office untuk KBLI jasa', 'alamat bisnis jakarta selatan',
    'virtual office untuk PT baru', 'harga virtual office jakarta selatan',
    'virtual office bintaro', 'perbedaan virtual office dan sewa kantor',
  ],
  'legal': [
    'pendirian PT jakarta selatan', 'cara buat PT DKI Jakarta',
    'KBLI perdagangan bisa PKP tidak', 'syarat PKP untuk KBLI non jasa',
    'domisili usaha jakarta selatan', 'virtual office untuk PKP perdagangan',
    'kontrak 1 tahun untuk PKP perdagangan', 'pendirian PT berapa hari',
    'perbedaan virtual office dan sewa kantor untuk PKP',
  ],
  'trust': [
    'tentang bintaro business centre', 'lokasi BBC jakarta',
    'kontak BBC whatsapp', 'fasilitas kantor BBC', 'testimoni klien BBC',
    'BBC perusahaan resmi',
  ],
};

export function getSiteEntry(url: string): SiteRegistryEntry | undefined {
  const normalized = url.replace(/\/$/, '') || '/';
  return SITE_REGISTRY[normalized];
}

export function getAllEntries(): SiteRegistryEntry[] {
  return Object.values(SITE_REGISTRY);
}

export function getEntriesByCluster(cluster: Cluster): SiteRegistryEntry[] {
  return Object.values(SITE_REGISTRY).filter(e => e.cluster === cluster);
}
