import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

const title = 'Sewa Kantor Jakarta Selatan: Lokasi, Akses, dan Kesesuaian Bisnis'
const description = 'Panduan komprehensif sewa kantor di Jakarta Selatan. Temukan alasan mengapa domisili DKI Jakarta vital untuk perizinan NIB dan pengurusan pajak bisnis Anda.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/sewa-kantor-jakarta-selatan' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/sewa-kantor-jakarta-selatan',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/sewa-kantor/ruangan-kantor-utama.jpg' }]
    }
}

export default function Page() {
    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor-jakarta-selatan/#webpage",
                "url": "https://www.bintarobusinesscentre.com/sewa-kantor-jakarta-selatan",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor-jakarta-selatan/#article",
                "headline": title,
                "description": description,
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Apakah seluruh kawasan Bintaro masuk Jakarta Selatan?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Tidak. Kawasan Bintaro terbagi antara Jakarta Selatan (Pesanggrahan) dan Tangerang Selatan. Pastikan konfirmasi kecamatan administratif sebelum memilih lokasi."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah alamat di wilayah ini sah untuk NIB dan NPWP perusahaan?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ya, lokasi fisik yang secara administratif berada di bawah yurisdiksi Jakarta Selatan (DKI Jakarta) mutlak valid dan sesuai standar DPMPTSP."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Selain legalitas, apa keuntungan berdomisili di wilayah ini?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Anda mendapatkan gengsi korporat, kedekatan logistik pada klien, dan perluasan sumber daya talenta muda (Gen-Z) yang senang dengan wilayah premium."
                        }
                    }
                ]
            }
        ]
    }

    return (
        <WeaponPageTemplate
            title={title}
            description={description}
            canonicalUrl="https://www.bintarobusinesscentre.com/sewa-kantor-jakarta-selatan"
            schemaObject={schemaObject}
            hero={{
                badge1: 'Geographic Authority',
                badge2: 'Business Relevance',
                h1: 'Sewa Kantor Jakarta Selatan: Lokasi, Akses, dan Kesesuaian Bisnis',
                subheading: 'Jakarta Selatan adalah salah satu wilayah administratif DKI Jakarta yang paling aktif sebagai pusat operasional bisnis di luar kawasan CBD inti. <a href="/sewa-kantor" class="text-accent font-bold hover:underline">Bintaro Business Centre menyediakan sewa kantor siap pakai di Pesanggrahan, Jakarta Selatan</a> yang berada sepenuhnya dalam yurisdiksi administratif DKI Jakarta dengan akses langsung ke JORR W2S.',
                ctaLabel: 'Lihat Legalitas Kawasan',
                ctaHref: '#problem',
                image: '/images/sewa-kantor/ruangan-kantor-utama.jpg'
            }}
            problem={{
                title: 'Mengapa Jakarta Selatan Menjadi Pusat Bisnis Strategis',
                paragraphs: [
                    'Jakarta Selatan menawarkan keseimbangan antara aksesibilitas, ekosistem bisnis, dan status administratif yang tidak dimiliki oleh semua kawasan di sekitar Jakarta. Berbeda dengan kawasan penyangga seperti Tangerang Selatan atau Depok yang secara geografis berdekatan, Jakarta Selatan berada sepenuhnya dalam yurisdiksi DKI Jakarta — yang memiliki implikasi langsung pada proses perizinan usaha.',
                    'Perusahaan yang memilih domisili di Jakarta Selatan mendapatkan alamat administratif DKI yang memudahkan pengurusan NIB, NPWP perusahaan, dan berbagai izin operasional lainnya. Ini menjadi pertimbangan penting terutama bagi perusahaan baru yang sedang membangun struktur legal usahanya.',
                    'Lokasi kantor berpengaruh langsung pada jam operasional — jarak ke klien utama dan konektivitas. Kawasan seperti Pesanggrahan menawarkan posisi menguntungkan: cukup dekat ke pusat untuk akses mitra bisnis, namun jauh dari kepadatan CBD ekstrem.'
                ]
            }}
            education={{
                title: 'Konektivitas dan Mobilitas Tim Harian',
                items: [
                    {
                        title: 'Terkoneksi Jaringan Jalan Tol Utama',
                        content: 'Pilihan strategis untuk operasional sangat dipengaruhi oleh kelancaran logistik udara dan luar kota. Sebuah <a href="/kantor-dekat-tol-veteran" class="text-accent hover:underline">kantor dekat Tol Veteran</a> secara instan mendapat akses JORR W2S untuk menghubungkan lini kendaraan suplai.'
                    },
                    {
                        title: 'Mobilitas Lintas Wilayah Jakarta-Banten',
                        content: 'Bagi perusahaan di sektor distribusi laut, otomotif perakitan, konstruksi perumahan, atau layanan jasa terstruktur — memosisikan diri di persimpangan ini memudahkan rekrutmen staff pinggir kota.'
                    },
                    {
                        title: 'Lingkungan Profesional Menunjang Image',
                        content: 'Sebuah kantor di yurisdiksi unggulan menumbuhkan impresi bonafide saat pendaftaran tender korporasi besar atau pengajuan proyek BUMN.'
                    }
                ]
            }}
            authority={{
                title: 'Jenis Ruang Kerja yang Tersedia di Jakarta Selatan',
                highlight: 'Jakarta Selatan menawarkan beragam pilihan ruang kantor yang dapat disesuaikan dengan fase pertumbuhan dan investasi awal perusahaan.',
                image: '/images/foto-gedung-bbc.jpg',
                items: [
                    { icon: 'Building2', text: 'Serviced Office — ruang fully furnished dengan layanan utilitas dan resepsionis terpusat.' },
                    { icon: 'Layers', text: 'Kantor Konvensional — ruang kosong mentah untuk konfigurasi lay-out arsitektur perusahan Anda secara mandiri.' },
                    { icon: 'MapPin', text: 'Virtual Office — alamat domisili absah legal yang dirancang untuk pendirian izin NIB PT dari rumah.' },
                    { icon: 'CheckSquare', text: 'Fleksibilitas skalabilitas memungkinkan upgrade dari alamat virtual menjadi kantor kompartemen tertata.' }
                ]
            }}
            value={{
                title: 'Variabel Kunci Memilih Alamat di Jakarta Selatan',
                items: [
                    { title: 'Yurisdiksi Spesifik', desc: 'Pemilihan alamat mutlak harus di koridor DKI, bukan wilayah pinggiran Tangerang Selatan yang memblokir NPWP pendaftaran ganda.', icon: 'Map' },
                    { title: 'Akses Klien', desc: 'Lokasi yang memangkas biaya transportasi logis untuk kunjungan tim pemasaran dari pusat perkantoran Sudirman.', icon: 'Target' },
                    { title: 'Fleksibilitas Kontrak', desc: 'Sewa ruang modern menyediakan klausul fleksibel guna akomodasi pertumbuhan skala SDM di semester depan.', icon: 'ShieldCheck' },
                    { title: 'Infrastruktur', desc: 'Dikelilingi perbankan, vendor penunjang surat-menyurat, serta fasilitas ritel dan F&B untuk kesejahteraan produktivitas tim.', icon: 'Zap' }
                ]
            }}
            options={{
                title: 'Kategori Solusi Ruang Kerja di Bintaro Business Centre',
                intro: 'Fleksibilitas model usaha yang disesuaikan arus kas.',
                option1: {
                    title: 'Service Office Eksklusif',
                    desc: 'Unit terisolasi, AC, dan furnitur privat bagi tim yang siap tempur tanpa ribet instalasi harian.',
                    suitableForTitle: 'Cocok Untuk',
                    suitableForDesc: 'Vendor logistik, trader alat berat, distributor berskala yang perlu kantor cabang sentral.',
                    bullets: ['Verifikasi Legalitas Cepat', 'Resepsionis Profesional']
                },
                option2: {
                    title: 'Virtual Office Premium',
                    desc: 'Domisili bonafide untuk legalitas operasional akta pendirian, menekan pengeluaran infrastruktur hingga 80%.',
                    suitableForTitle: 'Cocok Untuk',
                    suitableForDesc: 'Startup software, studio kreatif, firma hukum dan penyedia lini jasa (KBLI Jasa).',
                    bullets: ['Notifikasi Mail Handling', 'Akses Ruang Eksekutif Meeting']
                }
            }}
            internalLinks={{
                title: 'Pahami Struktur Biaya Ruangan Anda Sebelum Menyewa',
                card1: {
                    title: 'Estimasi Biaya Bintaro',
                    desc: 'Ketahui seluk beluk pembagian angka di balik tagihan per bulan dalam evaluasi mandiri operasional kami.',
                    ctaLabel: 'Cek Harga',
                    href: '/harga-sewa-kantor-bintaro'
                },
                card2: {
                    title: 'Pilihan Layanan Siap Pakai',
                    desc: 'Gali metode kerja berfasilitas utuh tanpa disibukkan pusing administrasi dan perawatan struktur.',
                    ctaLabel: 'Jelajahi Solusi',
                    href: '/sewa-kantor/kantor-siap-pakai-bintaro'
                }
            }}
            relatedArticles={{
                title: 'ARTIKEL TERKAIT KONEKTIVITAS KAMI',
                links: [
                    { title: 'Sewa Kantor dengan Ruang Minimalis Bintaro', href: '/sewa-kantor/bintaro' },
                    { title: 'Kantor Dekat Tol Veteran JORR', href: '/kantor-dekat-tol-veteran' },
                    { title: 'Sewa Kantor Murah di Jakarta Selatan', href: '/sewa-kantor/murah-jakarta-selatan' }
                ]
            }}
            faq={{
                title: 'Pertanyaan Seputar Legalitas Domisili Bisnis Wilayah Selatan',
                items: [
                    { q: 'Apakah kawasan Pesanggrahan termasuk ke dalam Jakarta Selatan?', a: 'Ya, Pesanggrahan dan sebagian jalan RC Veteran berada penuh pada yurisdiksi Jakarta Selatan, menjadikannya kunci pembuka status kewilayahan DKI.' },
                    { q: 'Berapa jarak dari kantor ini untuk mencapai bandara Soekarno-Hatta?', a: 'Melalui koridor Pintu Tol Veteran (JORR W2S Utara), Anda hanya butuh sekitar 20-30 menit dalam kondisi lalu lintas wajar menuju bandara antar-nusa.' },
                    { q: 'Apakah Bintaro Business Centre menangani proses pendirian perusahaan dari nol?', a: 'Ya, Anda berhak menikmati fasilitas pengurusan inkubasi PT/CV hingga tuntas sebagai wujud support relasional layanan kami.' }
                ]
            }}
            bottomCTA={{
                title: 'Selesai Berkelana, Waktunya Mengambil Resolusi Operasional',
                subtitle: 'Keputusan lokasi kantor sebaiknya didasarkan pada pola pergerakan logistik modern dan proteksi yurisdiksi. Dapatkan efisiensi dan fasilitas kelas wahid.',
                primaryCTA: { label: 'Tanya Tim Konsultan Eksekutif', href: 'https://wa.me/628128888069' },
                secondaryCTA: { label: 'Lihat Daftar Tarif Sewa', href: '/harga-sewa-kantor-bintaro' }
            }}
        />
    )
}
