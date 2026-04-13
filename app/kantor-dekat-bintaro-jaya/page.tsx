import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

const title = 'Kantor Dekat Bintaro Jaya: Akses Jakarta Selatan yang Strategis'
const description = 'Panduan lokasi kantor di koridor Bintaroâ€“Pesanggrahan. Akses JORR W2S, perbedaan yurisdiksi DKI vs Tangerang Selatan, dan implikasi untuk perizinan usaha.'

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
            url="/kantor-dekat-bintaro-jaya"
            title={title}
            description={description}
            canonicalUrl="https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya"
            schemaObject={schemaObject}
            h1="Kantor Dekat Bintaro Jaya: Titik Temu Jaksel dan Tangerang Selatan"
            intro='Bintaro Jaya merupakan referensi geografis unggulan di selatan Jakarta. "Dekat Bintaro Jaya" tidak selalu berarti di Tangerang. <a href="/sewa-kantor" class="text-accent font-bold hover:underline">BBC menyediakan kantor berbatas langsung dengan Bintaro Jaya</a> namun masuk di wilayah Jakarta Selatan (DKI Jakarta).'
            entity="sewa-kantor"
            location="jakarta-selatan"
            heroBadges={{ b1: "Akses & Ekosistem", b2: "Koridor Bisnis" }}
            sections={[
                {
                    id: "problem",
                    h2: "Kekeliruan Yurisdiksi Administratif",
                    rawHtml: `
                        <p>Sebenarnya sebagian besar Bintaro Jaya secara zonasi ada di Tangerang Selatan. Ini menyulitkan badan usaha (PT) yang mensyaratkan domisili PT dan NIB yang masuk ke DKI Jakarta, entah karena syarat sub-kontraktor besar, akses instansi pemerintah, maupun gengsi ibukota.</p>
                        <p>Pilihan lokasi kantor bukan hanya soal jarak atau aksesibilitas fisik. Bagi banyak perusahaan, terutama yang sedang dalam proses pendirian atau perpanjangan izin usaha, yurisdiksi administratif lokasi kantor memiliki dampak langsung pada kelancaran pendaftaran birokrasi.</p>
                        <p>Namun, wilayah administratif itu ada garis demarkasinya. Pesanggrahan (Jakarta Selatan) berbatasan langsung dengan Bintaro Jaya. Alamat domisili di Jakarta Selatan memudahkan pengurusan dan verifikasi.</p>
                    `
                },
                {
                    id: "education",
                    h2: "Aksesibilitas Strategis dari Pesanggrahan - Bintaro Jaya",
                    rawHtml: `
                        <h3>Akses dari Bintaro Jaya ke Pesanggrahan</h3>
                        <p>Dari pusat bisnis Bintaro Sektor 7 dan sekitarnya, ke Pesanggrahan dilalui koridor Jl RC Veteran. Kemudahan akses antara dua kawasan ini sangat mendukung logistik dan pergerakan perwakilan manajemen harian.</p>

                        <h3>Terkoneksi Mobilitas Eksekutif via JORR W2S</h3>
                        <p>Ditambah dari arah yang sama, bisa melompat ke <a href="/kantor-dekat-tol-veteran" class="text-accent hover:underline">Pintu Tol Veteran di JORR W2S</a>. Anda bisa menembus perbatasan koridor Selatan Jakarta dan menuntaskan mobilitas tinggi dalam 10-15 menit di luar jam sibuk tanpa lewat kemacetan dalam kota.</p>

                        <h3>Fasilitas di Perbatasan</h3>
                        <p>Ekosistem logistik, bank, dan pendanaan tersebar berdekatan. Jika butuh ekosistem perkantoran terjangkau yang terkelola mandiri, <a href="/sewa-kantor/bintaro" class="text-accent hover:underline">sewa kantor Bintaro dengan detail tipe ruang</a> menutupi semua celah tersebut.</p>
                    `
                },
                {
                    id: "authority",
                    h2: "Jenis Bisnis yang Cocok di Koridor Ini",
                    rawHtml: `
                        <p>Bintaro-Pesanggrahan menjadi favorit sektor distribusi, perakitan, subkontraktor dan IT.</p>
                    `,
                    visual: {
                        type: "card",
                        items: [
                            { title: "Perusahaan logistik dan distribusi multinasional", icon: "Truck" },
                            { title: "Perakitan atau otomotif sub", icon: "Settings" },
                            { title: "Platform online dan web agency yang butuh mobilitas tim tangkas", icon: "Globe" },
                            { title: "Kantor cabang korporat besar dari regional Jawa - Sumatra", icon: "Layers" }
                        ]
                    }
                },
                {
                    id: "value",
                    h2: "Mengapa Jakarta Selatan + Bintaro = Win Win",
                    visual: {
                        type: "card",
                        items: [
                            { title: "Infrastruktur Lengkap", desc: "Jalan RC Veteran merupakan tulang punggung ekonomi dengan fasilitas pendukung usaha.", icon: "CheckCircle2" },
                            { title: "Tarik Bakat Muda", desc: "Akses mudah dari Bintaro menguntungkan pencarian talenta Gen Z yang mendambakan WFO berkualitas.", icon: "Users" },
                            { title: "Ekosistem Start-up", desc: "Aktivitas bisnis di sekitar kafe dan retail menciptakan jejaring relasi.", icon: "Briefcase" },
                            { title: "Legal Standing DKI", desc: "Tetap sah di bawah naungan KPP DKI Jakarta", icon: "Award" }
                        ]
                    }
                },
                {
                    id: "options",
                    h2: "Dua Strategi Akses Ruang Usaha Bintaro / Selatan",
                    rawHtml: `
                        <p>Fleksibilitas model usaha</p>

                        <h3>Service Office Eksklusif</h3>
                        <p>Unit terisolasi, AC dan furnitur privat bagi tim yang siap tempur.</p>
                        <p><strong>Cocok Untuk</strong><br/>Vendor logistik, trader, dan importer/eksportir.</p>
                        <ul>
                            <li>Verifikasi Valid 100%</li>
                            <li>Legal Perusahaan Aman</li>
                        </ul>

                        <h3>Virtual Office Terjangkau</h3>
                        <p>Tidak butuh meja 9-5. Modal alamat bonafide untuk legalitas pendirian PT.</p>
                        <p><strong>Cocok Untuk</strong><br/>Startup software, konsultan teknik.</p>
                        <ul>
                            <li>Biaya Minim</li>
                            <li>Gengsi Optimal</li>
                        </ul>
                    `
                },
                {
                    id: "related",
                    h2: "ARTIKEL TERKAIT",
                    rawHtml: `
                        <ul>
                            <li><a href="/kantor-dekat-tol-veteran">Kantor Dekat Tol Veteran</a></li>
                            <li><a href="/sewa-kantor/bintaro">Sewa Kantor Bintaro: Konsep &amp; Fasilitas</a></li>
                        </ul>
                    `
                },
                {
                    id: "cta",
                    h2: "Dapatkan Akses Terbaik Dalam Genggaman",
                    rawHtml: `
                        <p>Segera agendakan peninjauan unit. Jadilah tetangga bagi kawasan berkembang pesat Bintaro Jaya dengan tetap menjangkar kaki operasional di ibukota.</p>
                        <p><a href="https://wa.me/628128888069">Tanya Jadwal Visit</a> | <a href="/harga-sewa-kantor-bintaro">Harga Sewa Bintaro</a></p>
                    `
                }
            ]}
            faq={{
                title: "FAQ Seputar Lokasi Kantor",
                items: [
                    { q: "Apakah kawasan Bintaro Jaya termasuk Jakarta Selatan?", a: "Tidak sepenuhnya. Sebagian besar kawasan Bintaro Jaya berada di Tangerang Selatan. Pesanggrahan yang berbatasan langsung di sisi timur adalah bagian dari Jakarta Selatan." },
                    { q: "Berapa jarak dari Bintaro Jaya ke Pesanggrahan?", a: "Jarak antara pusat Bintaro Jaya dan kawasan Pesanggrahan berkisar 3â€“5 km, dengan waktu tempuh sekitar 10â€“15 menit di luar jam sibuk." }
                ]
            }}
            internalLinks={{
                intro: { label: "Lihat Unit Tersedia", href: "/sewa-kantor" },
                mid: { label: "Bandingkan Harga", href: "/harga-sewa-kantor-bintaro" },
                closing: { label: "Tanya Jadwal Visit", href: "https://wa.me/628128888069" }
            }}
        />
    )
}

