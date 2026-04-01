import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

const title = 'Harga Virtual Office Jakarta Selatan | Perbandingan Paket 2026'
const description = 'Update harga virtual office Jakarta Selatan 2026. Perbandingan paket basic hingga premium, faktor penentu harga, and tips memilih value terbaik untuk bisnis Anda.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/harga-virtual-office' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/harga-virtual-office',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/hero-virtual-office-jakarta-selatan.jpg' }]
    }
}

export default function Page() {
    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/harga-virtual-office/#webpage",
                "url": "https://www.bintarobusinesscentre.com/harga-virtual-office",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/harga-virtual-office/#article",
                "headline": title,
                "description": description,
                "image": "https://www.bintarobusinesscentre.com/images/hero-virtual-office-jakarta-selatan.jpg",
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            }
        ]
    }

    return (
        <WeaponPageTemplate
            title={title}
            description={description}
            canonicalUrl="https://www.bintarobusinesscentre.com/harga-virtual-office"
            schemaObject={schemaObject}
            hero={{
                badge1: 'Established 2007',
                badge2: 'Jakarta Selatan',
                h1: 'Harga Virtual Office Jakarta Selatan: Struktur, Faktor, dan Cara Memilih yang Tepat',
                subheading: 'Harga virtual office di Jakarta Selatan bervariasi signifikan — dan perbedaannya tidak hanya soal angka. Di balik selisih harga terdapat perbedaan nyata dalam validitas alamat, keandalan layanan, and implikasi legal jangka panjang. <a href="/virtual-office" class="text-accent hover:underline font-bold underline">Cek Paket & Harga Terbaru →</a>',
                ctaLabel: 'Panduan Memahami Struktur Harga Virtual Office',
                ctaHref: '#problem',
                image: '/images/foto-gedung-bbc.jpg'
            }}
            problem={{
                title: 'Memilih Virtual Office Berdasarkan Harga Saja: Risiko yang Sering Tidak Terlihat di Awal',
                paragraphs: [
                    'Ketika pertama kali mencari virtual office, respons alami banyak pemilik bisnis adalah membandingkan angka. Ini wajar — efisiensi biaya adalah salah satu alasan utama memilih virtual office sejak awal. Namun <a href="/virtual-office" class="text-accent hover:underline font-bold">virtual office Bintaro Business Centre</a> yang beroperasi sejak 2007 dengan lebih dari 1.800 klien perusahaan menunjukkan bahwa keputusan terbaik bukan selalu datang dari harga terendah — melainkan dari keseimbangan antara harga, keandalan alamat, and kualitas layanan yang dapat diverifikasi.',
                    'Di pasar Jakarta Selatan, harga virtual office dapat dimulai dari angka yang sangat terjangkau hingga beberapa kali lipatnya. Yang tidak langsung terlihat dari angka tersebut: apakah alamat itu valid untuk pengajuan NIB and NPWP? Apakah penyedia memiliki rekam jejak yang dapat dikonfirmasi? Jika Anda membutuhkan bantuan legalitas, BBC juga menyediakan <a href="/legal/pendirian-pt-jakarta-selatan" class="text-accent hover:underline font-bold">jasa pendirian PT di Jakarta Selatan</a> yang terintegrasi dengan domisili resmi.',
                    'Memilih berdasarkan harga semata bisa berujung pada proses legalitas yang terhambat, pengajuan PKP yang ditolak, atau perpindahan penyedia di tengah jalan yang justru memakan waktu and biaya lebih besar dari selisih harga yang awalnya dihemat.'
                ]
            }}
            education={{
                title: 'Struktur Harga Virtual Office: Tiga Faktor yang Membentuk Angka yang Anda Lihat',
                items: [
                    {
                        title: 'Range Harga Virtual Office di Jakarta Selatan',
                        content: 'Secara umum, harga virtual office di Jakarta Selatan bergerak dalam kisaran ratusan ribu hingga lebih dari satu juta rupiah per bulan. Penyedia dengan fasilitas minimal di lokasi yang kurang strategis secara administratif cenderung berada di batas bawah. Penyedia dengan alamat komersial terdaftar, pengelolaan surat aktif, and rekam jejak panjang umumnya berada di kisaran menengah ke atas — and perbedaan ini bukan tanpa alasan substantif. Untuk kebutuhan parkir and akses fisik, silakan cek <a href="/fasilitas-kantor" class="text-accent hover:underline font-bold">fasilitas kantor BBC</a>.'
                    },
                    {
                        title: 'Tiga Faktor yang Menentukan Harga Virtual Office',
                        content: 'Pertama, validitas and posisi administratif alamat. Alamat di wilayah DKI Jakarta dengan status komersial yang terdaftar memiliki nilai lebih tinggi. Kedua, cakupan layanan yang disertakan. Pengelolaan surat dasar berbeda dengan paket yang menyertakan notifikasi aktif, akses ruang meeting, and layanan penanganan telepon. Ketiga, rekam jejak and stabilitas operasional penyedia. Penyedia yang telah beroperasi selama lebih dari satu dekade membawa keandalan yang tidak dapat diukur dari angka bulanan saja. Jika bisnis berkembang, opsi <a href="/sewa-kantor" class="text-accent hover:underline font-bold">sewa kantor siap pakai</a> selalu tersedia.'
                    },
                    {
                        title: 'Apa yang Harus Diperiksa Sebelum Membandingkan Harga',
                        content: 'Pastikan Anda membandingkan hal yang setara. Periksa: apakah alamat dapat digunakan untuk domisili PT and pengajuan NIB? Apakah pengelolaan surat dilakukan secara aktif dengan notifikasi? Apakah akses <a href="/ruang-meeting" class="text-accent hover:underline font-bold">ruang meeting Jakarta Selatan</a> tersedia and berapa kuotanya? Apakah ada biaya tambahan di luar harga bulanan yang tidak langsung disebutkan?'
                    }
                ]
            }}
            authority={{
                title: 'Bintaro Business Centre: Transparansi Layanan dengan Rekam Jejak yang Terukur',
                highlight: 'Bintaro Business Centre beroperasi sejak 2007 di Jl. RC Veteran No. 1-i, Pesanggrahan, Jakarta Selatan — DKI Jakarta. Dalam 18 tahun operasional, lebih dari 1.800 perusahaan telah menggunakan alamat BBC sebagai domisili resmi bisnis mereka.',
                image: '/images/hero-virtual-office-jakarta-selatan.jpg',
                items: [
                    { icon: 'MapPin', text: 'Alamat DKI Jakarta yang valid — digunakan lebih dari 1.800 perusahaan sejak 2007' },
                    { icon: 'Users', text: 'Pengelolaan surat aktif dengan notifikasi kepada pemegang akun' },
                    { icon: 'Award', text: 'Transparansi penuh tanpa biaya tersembunyi — cakupan layanan per paket jelas' },
                    { icon: 'Building2', text: 'Opsi upgrade ke service office tersedia dalam satu penyedia, tanpa perubahan domisili' }
                ]
            }}
            value={{
                title: 'Harga Rendah vs. Nilai Nyata: Apa yang Sebenarnya Anda Pertaruhkan',
                items: [
                    { title: 'Risiko Alamat Tidak Valid', desc: 'Penyedia harga sangat rendah sering menggunakan alamat non-komersial. Konsekuensinya: penolakan NIB or PKP.', icon: 'ShieldCheck' },
                    { title: 'Layanan Surat Tidak Terkelola', desc: 'Surat penting dari kantor pajak or dokumen legal bisa tidak tersampaikan — risiko risiko yang nilainya jauh melampaui hemat biaya.', icon: 'Calculator' },
                    { title: 'Risiko Diskontinuitas', desc: 'Penyedia tanpa rekam jejak bisa tutup or pindah alamat tanpa pemberitahuan, memaksa perubahan akta yang mahal.', icon: 'History' },
                    { title: 'Investasi Legal', desc: 'Harga yang tepat adalah investasi dalam fondasi legal perusahaan, memberikan kepastian jangka panjang.', icon: 'Award' }
                ]
            }}
            options={{
                title: 'Menyesuaikan Paket dengan Kebutuhan Nyata Bisnis Anda',
                intro: 'Sebagian besar penyedia virtual office menawarkan beberapa tingkatan layanan. Tentukan kebutuhan inti bisnis Anda.',
                option1: {
                    title: 'Paket Dasar Virtual Office',
                    desc: 'Mencakup penggunaan alamat bisnis untuk keperluan legal and surat-menyurat, serta pengelolaan surat masuk.',
                    suitableForTitle: 'Cocok Untuk:',
                    suitableForDesc: 'Bisnis baru, perusahaan jasa dengan tim kecil, or profesional independen yang baru memformalkan usahanya.',
                    bullets: ['Alamat Sah Domisili', 'Basic Mail Handling']
                },
                option2: {
                    title: 'Paket Layanan Lengkap',
                    desc: 'Mencakup pengelolaan surat aktif dengan notifikasi, akses ruang meeting, and layanan penanganan telepon.',
                    suitableForTitle: 'Cocok Untuk:',
                    suitableForDesc: 'Konsultan aktif, agensi, or perusahaan jasa yang membutuhkan fasilitas meeting profesional.',
                    bullets: ['Notifikasi Aktif', 'Meeting Room Access']
                }
            }}
            internalLinks={{
                title: 'Langkah Selanjutnya Setelah Memahami Struktur Harga',
                card1: {
                    title: 'Layanan Virtual Office Bintaro Business Centre',
                    desc: 'Cakupan layanan lengkap, proses aktivasi, and dokumen yang dibutuhkan untuk memulai.',
                    ctaLabel: 'Lihat Detail Layanan',
                    href: '/virtual-office'
                },
                card2: {
                    title: 'Alamat Bisnis Jakarta Selatan',
                    desc: 'Memahami mengapa yurisdiksi DKI Jakarta penting untuk NIB, NPWP, and PKP.',
                    ctaLabel: 'Panduan Alamat Bisnis',
                    href: '/alamat-bisnis-jakarta-selatan'
                }
            }}
            relatedArticles={{
                title: 'ARTIKEL TERKAIT',
                links: [
                    { title: 'Virtual Office Jakarta Selatan: Konsep, Legalitas, and Untuk Siapa', href: '/virtual-office-jakarta-selatan' },
                    { title: 'Alamat Bisnis Jakarta Selatan: Fondasi Legal Perusahaan Anda', href: '/alamat-bisnis-jakarta-selatan' },
                    { title: 'Sewa Kantor Jakarta Selatan: Opsi Kantor Fisik untuk Kepatuhan PKP', href: '/sewa-kantor-jakarta-selatan' },
                    { title: 'Pendirian PT Jakarta Selatan: Biaya & Prosedur Terbaru', href: '/legal/pendirian-pt-jakarta-selatan' }
                ]
            }}
            faq={{
                title: 'FAQ',
                items: [
                    { q: 'Berapa kisaran harga virtual office di Jakarta Selatan?', a: 'Range harga bergerak antara ratusan ribu hingga lebih dari satu juta rupiah per bulan, tergantung validitas alamat and cakupan layanan.' },
                    { q: 'Apakah ada biaya tambahan yang perlu diwaspadai?', a: 'Beberapa penyedia membebankan biaya tambahan untuk penggunaan meeting room di luar kuota or penanganan surat khusus. Pastikan transparansi di awal.' },
                    { q: 'Apakah harga lebih murah selalu berarti kualitas lebih rendah?', a: 'Dalam konteks virtual office, harga sangat rendah sering berkorelasi dengan risiko validitas alamat and keandalan layanan surat.' },
                    { q: 'Apakah kontrak virtual office harus tahunan?', a: 'Tergantung kebijakan penyedia, namun untuk keperluan legalitas jangka panjang, kontrak tahunan lebih disarankan.' }
                ]
            }}
            bottomCTA={{
                title: 'Temukan Virtual Office dengan Nilai yang Tepat',
                subtitle: 'Keputusan tentang virtual office memengaruhi keabsahan hukum perusahaan Anda dalam jangka panjang.',
                primaryCTA: { label: 'Konsultasi Via WhatsApp', href: 'https://wa.me/628128888069' },
                secondaryCTA: { label: 'Lihat Layanan Virtual Office', href: '/virtual-office' }
            }}
        />
    )
}
