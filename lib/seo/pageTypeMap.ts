import { getMetaByPath } from './metaGenerator';

export type PageType = 'money' | 'weapon' | 'hub' | 'support' | 'utility';

export interface PageConfig {
    type: PageType;
    entity: string;
    title?: string;
    description?: string;
}

export const PAGE_TYPE_MAP: Record<string, PageConfig> = {
    '/': { 
        type: 'money', 
        entity: 'BBC',
        title: 'Bintaro Business Centre | Kantor, VO & Legalitas Jakarta Selatan',
        description: 'BBC menyediakan sewa kantor siap pakai, virtual office, dan legalitas usaha di Pesanggrahan, Jakarta Selatan sejak 2007. Melayani 1.800+ perusahaan.'
    },
    
    // MONEY PAGES
    '/sewa-kantor': { 
        type: 'money', 
        entity: 'Sewa Kantor',
        title: 'Sewa Kantor Jakarta Selatan Siap Pakai | 72 Unit Operasional',
        description: 'Kantor fully furnished di Pesanggrahan, Jakarta Selatan. Langsung operasional tanpa setup. Dekat Pintu Tol Veteran & Bintaro Jaya. BBC sejak 2007.'
    },
    '/virtual-office': { 
        type: 'money', 
        entity: 'Virtual Office',
        title: 'Virtual Office Jakarta Selatan Resmi DKI | PT & PKP (KBLI Jasa)',
        description: 'Alamat bisnis resmi di Jakarta Selatan untuk pendirian PT, CV, NIB, dan PKP. BBC di Pesanggrahan melayani 1.800+ perusahaan sejak 2007.'
    },
    '/legal/pendirian-pt-jakarta-selatan': { 
        type: 'money', 
        entity: 'Pendirian PT',
        title: 'Pendirian PT Jakarta Selatan Resmi DKI | 14–21 Hari Kerja',
        description: 'Pendirian PT di Jakarta Selatan dengan domisili resmi DKI. Estimasi 14–21 hari kerja, dari akta notaris hingga PKP aktif. BBC di Pesanggrahan sejak 2007.'
    },

    // WEAPON PAGES - PRICE
    '/harga-sewa-kantor-bintaro': { 
        type: 'weapon', 
        entity: 'Harga Sewa Kantor Bintaro',
        title: 'Harga Sewa Kantor Bintaro: Struktur Biaya & Variabel',
        description: 'Uraian komponen biaya sewa kantor di kawasan Bintaro dan Jakarta Selatan. Struktur biaya dan variabel yang mempengaruhi harga di tiap lokasi dan tipe ruang.'
    },
    '/harga-virtual-office': { 
        type: 'weapon', 
        entity: 'Harga Virtual Office',
        title: 'Virtual Office Jakarta Selatan: Faktor Penentu Nilai Layanan',
        description: 'Harga bukan satu-satunya penentu. Gambaran faktor yang menentukan nilai nyata virtual office di Jakarta Selatan — layanan, legalitas, dan cakupan domisili.'
    },
    '/harga-virtual-office-jakarta-selatan': { 
        type: 'weapon', 
        entity: 'Harga Virtual Office Jakarta Selatan',
        title: 'Virtual Office Jakarta Selatan: Breakdown Biaya & Perbandingan',
        description: 'Breakdown biaya virtual office di Jakarta Selatan. Uraian komponen harga, perbedaan paket, dan variabel layanan yang mempengaruhi nilai tiap pilihan.'
    },
    '/sewa-kantor/harga': { 
        type: 'weapon', 
        entity: 'Sewa Kantor Bintaro',
        title: 'Sewa Kantor Bintaro: Cara Menilai Nilai Ruang Kantor',
        description: 'Penjelasan cara menilai nilai nyata ruang kantor di Bintaro. Faktor lokasi, fasilitas, dan struktur kontrak yang membentuk perbandingan antar pilihan.'
    },

    // WEAPON PAGES - LEGAL
    '/virtual-office-jakarta-selatan': { 
        type: 'weapon', 
        entity: 'Virtual Office Jakarta Selatan',
        title: 'Virtual Office Jakarta Selatan: Fungsi & Implikasi Legalitas',
        description: 'Peran virtual office di Jakarta Selatan dalam struktur perizinan usaha. Implikasi domisili DKI untuk NIB, NPWP, pendirian PT, dan kelancaran administrasi.'
    },
    '/alamat-bisnis-jakarta-selatan': { 
        type: 'weapon', 
        entity: 'Alamat Bisnis Jakarta Selatan',
        title: 'Alamat Bisnis Jakarta Selatan: Implikasi Administratif & Legalitas',
        description: 'Pemilihan domisili mempengaruhi aspek legalitas, perizinan, dan operasional bisnis. Gambaran implikasi administratif alamat bisnis di Jakarta Selatan.'
    },
    '/virtual-office/jakarta-selatan': { 
        type: 'weapon', 
        entity: 'Virtual Office Jakarta Selatan',
        title: 'Virtual Office Jakarta Selatan: Kesesuaian Regulasi NIB & PKP',
        description: 'Kesesuaian regulasi virtual office di Jakarta Selatan untuk NIB, NPWP, dan PKP. Peran domisili DKI dalam struktur perizinan berdasarkan klasifikasi KBLI.'
    },
    '/virtual-office/alamat-bisnis-jakarta-selatan': { 
        type: 'weapon', 
        entity: 'Alamat Bisnis Virtual Office Jakarta Selatan',
        title: 'Alamat Bisnis Virtual Office Jakarta Selatan: Fungsi & Legalitas',
        description: 'Fungsi alamat bisnis legal via virtual office di Jakarta Selatan. Implikasi domisili DKI untuk NIB, NPWP, pendirian PT, dan struktur perizinan usaha.'
    },

    // WEAPON PAGES - PRODUCT
    '/virtual-office-bintaro': { 
        type: 'weapon', 
        entity: 'Virtual Office Bintaro',
        title: 'Virtual Office Bintaro: Konsep & Fasilitas Layanan',
        description: 'Gambaran konsep dan fasilitas virtual office di kawasan Bintaro. Alamat administratif DKI Jakarta untuk pendirian PT, CV, NIB, dan perizinan usaha.'
    },
    '/sewa-kantor/jakarta-selatan': { 
        type: 'weapon', 
        entity: 'Sewa Kantor Jakarta Selatan',
        title: 'Sewa Kantor Jakarta Selatan: Struktur Layanan & Fasilitas',
        description: 'Gambaran struktur layanan sewa kantor di Jakarta Selatan: jenis ruang, fasilitas standar, dan variabel operasional yang membentuk tiap pilihan ruang kerja.'
    },
    '/sewa-kantor/bintaro': { 
        type: 'weapon', 
        entity: 'Private Office Bintaro',
        title: 'Private Office Bintaro: Konsep, Fasilitas & Standar Layanan',
        description: 'Gambaran konsep dan fasilitas private office di kawasan Bintaro, Jakarta Selatan. Ruang privat fully furnished dengan akses langsung ke Pintu Tol Veteran.'
    },
    '/sewa-kantor/kantor-siap-pakai-bintaro': { 
        type: 'weapon', 
        entity: 'Kantor Siap Pakai Bintaro',
        title: 'Kantor Siap Pakai Bintaro: Apa yang Termasuk dalam Paket',
        description: 'Penjelasan apa saja yang termasuk dalam paket kantor siap pakai di Bintaro. Fasilitas standar, infrastruktur gedung, dan struktur layanan yang membentuk paket.'
    },

    // WEAPON PAGES - COMPARISON
    '/sewa-kantor/murah-jakarta-selatan': { 
        type: 'weapon', 
        entity: 'Sewa Kantor Murah Jakarta Selatan',
        title: 'Sewa Kantor Murah Jakarta Selatan: Kelebihan & Keterbatasan',
        description: 'Perbedaan model kantor berbiaya rendah di Jakarta Selatan. Kelebihan dan keterbatasan yang membentuk nilai riil dari tiap pilihan fasilitas dan infrastruktur.'
    },
    '/sewa-kantor-jakarta-selatan': { 
        type: 'weapon', 
        entity: 'Sewa Kantor Jakarta Selatan',
        title: 'Sewa Kantor Jakarta Selatan: Pertimbangan yang Sering Diabaikan',
        description: 'Evaluasi kelayakan kantor di Jakarta Selatan dari sisi lokasi, legalitas domisili, dan infrastruktur. Faktor yang membentuk keputusan operasional jangka panjang.'
    },

    // WEAPON PAGES - GEO
    '/kantor-dekat-bintaro-jaya': { 
        type: 'weapon', 
        entity: 'Kantor Dekat Bintaro Jaya',
        title: 'Kantor Dekat Bintaro Jaya & Tol Veteran | Koridor Bisnis Jaksel',
        description: 'Kedekatan kawasan Bintaro Jaya dengan Pesanggrahan, Jakarta Selatan. Akses JORR W2S, koridor bisnis sekitar, dan infrastruktur wilayah yang relevan.'
    },
    '/kantor-dekat-tol-veteran': { 
        type: 'weapon', 
        entity: 'Kantor Dekat Tol Veteran',
        title: 'Kantor Dekat Tol Veteran Jakarta Selatan | Konektivitas & Akses',
        description: 'Konektivitas dan infrastruktur bisnis di sekitar Pintu Tol Veteran, Jakarta Selatan. Akses JORR W2S menuju Pondok Indah, Bintaro, dan koridor selatan.'
    },

    // HUB PAGES
    '/legal': { 
        type: 'hub', 
        entity: 'Legalitas Usaha',
        title: 'Legalitas Usaha Jakarta Selatan: PT, KBLI & PKP | BBC',
        description: 'Layanan legalitas bisnis BBC di Jakarta Selatan mencakup pendirian PT, klasifikasi KBLI, dan persyaratan PKP. Domisili resmi yurisdiksi DKI Jakarta.'
    },
    '/legal/cek-kbli': { 
        type: 'hub', 
        entity: 'Cek KBLI',
        title: 'Cek KBLI Usaha Jakarta Selatan: Panduan & Kategori',
        description: 'Klasifikasi KBLI di Jakarta Selatan mencakup kategori usaha jasa dan non-jasa yang menentukan kelayakan NIB, PKP, dan izin operasional perusahaan.'
    },
    '/legal/pkp-perdagangan': { 
        type: 'hub', 
        entity: 'PKP Perdagangan',
        title: 'PKP KBLI Non-Jasa Jakarta Selatan: Opsi & Persyaratan',
        description: 'Persyaratan PKP untuk KBLI perdagangan, distribusi, dan transportasi di Jakarta Selatan mencakup kantor fisik minimal 1 tahun dan opsi layanan pendukung.'
    },

    // SUPPORT PAGES
    '/tentang-kami': { 
        type: 'support', 
        entity: 'Tentang Kami',
        title: 'Tentang BBC | Bintaro Business Centre',
        description: 'BBC dioperasikan PT. Ganesha Dwipaya Bhakti sejak 2007. Melayani 1.800+ perusahaan dengan sewa kantor, virtual office, and legalitas di Jakarta Selatan.'
    },
    '/lokasi-kantor': { 
        type: 'support', 
        entity: 'Lokasi Kantor',
        title: 'Lokasi BBC | Jl. RC Veteran, Pesanggrahan, Jakarta Selatan',
        description: 'BBC berlokasi di Jl. RC Veteran No. 1-i, Pesanggrahan, Jakarta Selatan — wilayah administratif DKI Jakarta. Dekat Pintu Tol Veteran dan kawasan Bintaro Jaya.'
    },
    '/kontak': { 
        type: 'support', 
        entity: 'Kontak',
        title: 'Kontak BBC | Bintaro Business Centre',
        description: 'Hubungi tim BBC untuk informasi sewa kantor, virtual office, and pendirian PT di Jakarta Selatan. Tersedia via WhatsApp, telepon, and email. Senin–Jumat.'
    },
    '/klien-dan-testimoni': { 
        type: 'support', 
        entity: 'Klien & Testimoni',
        title: 'Klien & Testimoni | Bintaro Business Centre',
        description: 'Lebih dari 1.800 perusahaan mempercayakan infrastruktur bisnis kepada BBC sejak 2007. Profil klien dari sektor trading, jasa, and distribusi di Jakarta Selatan.'
    },
    '/fasilitas-kantor': { 
        type: 'support', 
        entity: 'Fasilitas Kantor',
        title: 'Fasilitas Kantor | Bintaro Business Centre',
        description: 'Infrastruktur gedung BBC di Pesanggrahan, Jakarta Selatan: parkir 30 mobil, high-speed internet, resepsionis profesional, meeting room, and lobi operasional.'
    },
    '/ruang-meeting': { 
        type: 'support', 
        entity: 'Ruang Meeting',
        title: 'Ruang Meeting Jakarta Selatan | Bintaro Business Centre',
        description: 'Sewa ruang meeting profesional di Pesanggrahan, Jakarta Selatan. Kapasitas 6–12+ orang, Wi-Fi, whiteboard, free flow coffee. Mulai Rp 50.000/jam.'
    },
    '/legalitas-dan-perizinan-bbc': { 
        type: 'support', 
        entity: 'Legalitas & Perizinan',
        title: 'Legalitas & Perizinan BBC | Bintaro Business Centre',
        description: 'BBC dioperasikan PT. Ganesha Dwipaya Bhakti dengan izin usaha resmi. Transparansi legalitas untuk domisili perusahaan and pendaftaran PKP di Jakarta Selatan.'
    },

    // UTILITY PAGES
    '/admin': { type: 'utility', entity: 'Admin' },
    '/login': { type: 'utility', entity: 'Login' },
    '/signup': { type: 'utility', entity: 'Signup' },
    '/forgot-password': { type: 'utility', entity: 'Forgot Password' },
    '/auth/reset-password': { type: 'utility', entity: 'Reset Password' },
    '/internal-links': { type: 'utility', entity: 'Internal Links' },
    '/web-audit': { type: 'utility', entity: 'Web Audit' }
};

export const getPageType = (pathname: string): PageType => {
    const config = getPageConfig(pathname);
    return config.type;
};

export const getPageConfig = (pathname: string): PageConfig => {
    const normalizedPath = pathname.replace(/\/$/, '') || '/';
    
    // Exact match
    if (PAGE_TYPE_MAP[normalizedPath]) return PAGE_TYPE_MAP[normalizedPath];
    
    // Pattern match for Dynamic Routes (e.g., /admin/*)
    if (normalizedPath.startsWith('/admin/')) return { type: 'utility', entity: 'Admin' };
    if (normalizedPath.startsWith('/auth/')) return { type: 'utility', entity: 'Auth' };
    
    // Default fallback
    return { type: 'support', entity: 'BBC' };
};

export const isIndexable = (pathname: string): boolean => {
    const type = getPageType(pathname);
    return type !== 'utility';
};

/**
 * SOURCE OF TRUTH: Get full metadata for Next.js
 */
export const getMetadata = (pathname: string) => {
    const meta = getMetaByPath(pathname);
    const isPageTypeIndexable = isIndexable(pathname);
    
    return {
        title: meta?.title || 'Bintaro Business Centre',
        description: meta?.description || 'Solusi Kantor & Legalitas Jakarta Selatan',
        alternates: {
            canonical: `https://www.bintarobusinesscentre.com${pathname === '/' ? '' : pathname}`,
        },
        robots: isPageTypeIndexable ? {
            index: true,
            follow: true,
        } : {
            index: false,
            follow: false,
            nocache: true,
        },
        openGraph: {
            title: meta?.title,
            description: meta?.description,
            url: `https://www.bintarobusinesscentre.com${pathname === '/' ? '' : pathname}`,
            siteName: 'Bintaro Business Centre',
            locale: 'id_ID',
            type: 'website',
        }
    };
};

/**
 * SOURCE OF TRUTH: Get robots metadata for Next.js Metadata object
 */
export const getRobotsMetadata = (pathname: string) => {
    if (!isIndexable(pathname)) {
        return {
            index: false,
            follow: false,
            nocache: true,
            googleBot: {
                index: false,
                follow: false,
            }
        };
    }
    return {
        index: true,
        follow: true
    };
};
