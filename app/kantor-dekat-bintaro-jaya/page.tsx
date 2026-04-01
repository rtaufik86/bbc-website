import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

const title = 'Kantor Dekat Bintaro Jaya: Akses Jakarta Selatan yang Strategis'
const description = 'Panduan lokasi kantor di koridor Bintaro–Pesanggrahan. Akses JORR W2S, perbedaan yurisdiksi DKI vs Tangerang Selatan, dan implikasi untuk perizinan usaha.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/foto-gedung-bbc.jpg' }]
    }
}

export default function Page() {
    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya/#webpage",
                "url": "https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya/#article",
                "headline": title,
                "description": description,
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            }
        ]
    }

    return (
        <WeaponPageTemplate
            title={title}
            description={description}
            canonicalUrl="https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya"
            schemaObject={schemaObject}
            hero={{
                badge1: 'Akses & Ekosistem',
                badge2: 'Koridor Bisnis',
                h1: 'Kantor Dekat Bintaro Jaya: Titik Temu Jaksel dan Tangerang Selatan',
                subheading: 'Bintaro Jaya merupakan referensi geografis unggulan di selatan Jakarta. "Dekat Bintaro Jaya" tidak selalu berarti di Tangerang. <a href="/sewa-kantor" class="text-accent font-bold hover:underline">BBC menyediakan kantor berbatas langsung dengan Bintaro Jaya</a> namun masuk di wilayah Jakarta Selatan (DKI Jakarta).',
                ctaLabel: 'Lihat Legalitas Kawasan',
                ctaHref: '#problem',
                image: '/images/foto-gedung-bbc.jpg'
            }}
            problem={{
                title: 'Kekeliruan Yurisdiksi Administratif',
                paragraphs: [
                    'Sebenarnya sebagian besar Bintaro Jaya secara zonasi ada di Tangerang Selatan. Ini menyulitkan badan usaha (PT) yang mensyaratkan domisili PT dan NIB yang masuk ke DKI Jakarta, entah karena syarat sub-kontraktor besar, akses instansi pemerintah, maupun gengsi ibukota.',
                    'Pilihan lokasi kantor bukan hanya soal jarak atau aksesibilitas fisik. Bagi banyak perusahaan, terutama yang sedang dalam proses pendirian atau perpanjangan izin usaha, yurisdiksi administratif lokasi kantor memiliki dampak langsung pada kelancaran pendaftaran birokrasi.',
                    'Namun, wilayah administratif itu ada garis demarkasinya. Pesanggrahan (Jakarta Selatan) berbatasan langsung dengan Bintaro Jaya. Alamat domisili di Jakarta Selatan memudahkan pengurusan dan verifikasi.'
                ]
            }}
            education={{
                title: 'Aksesibilitas Strategis dari Pesanggrahan - Bintaro Jaya',
                items: [
                    {
                        title: 'Akses dari Bintaro Jaya ke Pesanggrahan',
                        content: 'Dari pusat bisnis Bintaro Sektor 7 dan sekitarnya, ke Pesanggrahan dilalui koridor Jl RC Veteran. Kemudahan akses antara dua kawasan ini sangat mendukung logistik dan pergerakan perwakilan manajemen harian.'
                    },
                    {
                        title: 'Terkoneksi Mobilitas Eksekutif via JORR W2S',
                        content: 'Ditambah dari arah yang sama, bisa melompat ke <a href="/kantor-dekat-tol-veteran" class="text-accent hover:underline">Pintu Tol Veteran di JORR W2S</a>. Anda bisa menembus perbatasan koridor Selatan Jakarta dan menuntaskan mobilitas tinggi dalam 10-15 menit di luar jam sibuk tanpa lewat kemacetan dalam kota.'
                    },
                    {
                        title: 'Fasilitas di Perbatasan',
                        content: 'Ekosistem logistik, bank, dan pendanaan tersebar berdekatan. Jika butuh ekosistem perkantoran terjangkau yang terkelola mandiri, <a href="/sewa-kantor/bintaro" class="text-accent hover:underline">sewa kantor Bintaro dengan detail tipe ruang</a> menutupi semua celah tersebut.'
                    }
                ]
            }}
            authority={{
                title: 'Jenis Bisnis yang Cocok di Koridor Ini',
                highlight: 'Bintaro-Pesanggrahan menjadi favorit sektor distribusi, perakitan, subkontraktor dan IT.',
                image: '/images/sewa-kantor/ruangan-kantor-utama.jpg',
                items: [
                    { icon: 'Truck', text: 'Perusahaan logistik dan distribusi multinasional' },
                    { icon: 'Settings', text: 'Perakitan atau otomotif sub' },
                    { icon: 'Globe', text: 'Platform online dan web agency yang butuh mobilitas tim tangkas' },
                    { icon: 'Layers', text: 'Kantor cabang korporat besar dari regional Jawa - Sumatra' }
                ]
            }}
            value={{
                title: 'Mengapa Jakarta Selatan + Bintaro = Win Win',
                items: [
                    { title: 'Infrastruktur Lengkap', desc: 'Jalan RC Veteran merupakan tulang punggung ekonomi dengan fasilitas pendukung usaha.', icon: 'CheckCircle2' },
                    { title: 'Tarik Bakat Muda', desc: 'Akses mudah dari Bintaro menguntungkan pencarian talenta Gen Z yang mendambakan WFO berkualitas.', icon: 'Users' },
                    { title: 'Ekosistem Start-up', desc: 'Aktivitas bisnis di sekitar kafe dan retail menciptakan jejaring relasi.', icon: 'Briefcase' },
                    { title: 'Legal Standing DKI', desc: 'Tetap sah di bawah naungan KPP DKI Jakarta', icon: 'Award' }
                ]
            }}
            options={{
                title: 'Dua Strategi Akses Ruang Usaha Bintaro / Selatan',
                intro: 'Fleksibilitas model usaha',
                option1: {
                    title: 'Service Office Eksklusif',
                    desc: 'Unit terisolasi, AC dan furnitur privat bagi tim yang siap tempur.',
                    suitableForTitle: 'Cocok Untuk',
                    suitableForDesc: 'Vendor logistik, trader, dan importer/eksportir.',
                    bullets: ['Verifikasi Valid 100%', 'Legal Perusahaan Aman']
                },
                option2: {
                    title: 'Virtual Office Terjangkau',
                    desc: 'Tidak butuh meja 9-5. Modal alamat bonafide untuk legalitas pendirian PT.',
                    suitableForTitle: 'Cocok Untuk',
                    suitableForDesc: 'Startup software, konsultan teknik.',
                    bullets: ['Biaya Minim', 'Gengsi Optimal']
                }
            }}
            internalLinks={{
                title: 'Langkah Peninjauan Unit Kami Selanjutnya',
                card1: {
                    title: 'Sewa Kantor Jakarta Selatan',
                    desc: 'Lihat list unit kami di perbatasan administratif antara Jaksel dan Bintaro.',
                    ctaLabel: 'Lihat Unit Tersedia',
                    href: '/sewa-kantor'
                },
                card2: {
                    title: 'Tabel Harga Bintaro',
                    desc: 'Panduan dan benchmarking kompetitif sewa di koridor ini.',
                    ctaLabel: 'Bandingkan Harga',
                    href: '/harga-sewa-kantor-bintaro'
                }
            }}
            relatedArticles={{
                title: 'ARTIKEL TERKAIT',
                links: [
                    { title: 'Kantor Dekat Tol Veteran', href: '/kantor-dekat-tol-veteran' },
                    { title: 'Sewa Kantor Bintaro: Konsep & Fasilitas', href: '/sewa-kantor/bintaro' }
                ]
            }}
            faq={{
                title: 'FAQ Seputar Lokasi Kantor',
                items: [
                    { q: 'Apakah kawasan Bintaro Jaya termasuk Jakarta Selatan?', a: 'Tidak sepenuhnya. Sebagian besar kawasan Bintaro Jaya berada di Tangerang Selatan. Pesanggrahan yang berbatasan langsung di sisi timur adalah bagian dari Jakarta Selatan.' },
                    { q: 'Berapa jarak dari Bintaro Jaya ke Pesanggrahan?', a: 'Jarak antara pusat Bintaro Jaya dan kawasan Pesanggrahan berkisar 3–5 km, dengan waktu tempuh sekitar 10–15 menit di luar jam sibuk.' }
                ]
            }}
            bottomCTA={{
                title: 'Dapatkan Akses Terbaik Dalam Genggaman',
                subtitle: 'Segera agendakan peninjauan unit. Jadilah tetangga bagi kawasan berkembang pesat Bintaro Jaya dengan tetap menjangkar kaki operasional di ibukota.',
                primaryCTA: { label: 'Tanya Jadwal Visit', href: 'https://wa.me/628128888069' },
                secondaryCTA: { label: 'Harga Sewa Bintaro', href: '/harga-sewa-kantor-bintaro' }
            }}
        />
    )
}
