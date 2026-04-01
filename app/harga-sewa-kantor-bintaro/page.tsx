import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

const title = 'Harga Sewa Kantor Bintaro: Struktur Biaya dan Faktor Penentu'
const description = 'Struktur biaya dan variabel yang membentuk harga sewa kantor di Bintaro dan Jakarta Selatan. Panduan evaluasi sebelum membandingkan penawaran antar gedung.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/harga-sewa-kantor-bintaro' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/harga-sewa-kantor-bintaro',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/sewa-kantor/ruangan-kantor-minimalis.jpg' }]
    }
}

export default function Page() {
    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/harga-sewa-kantor-bintaro/#webpage",
                "url": "https://www.bintarobusinesscentre.com/harga-sewa-kantor-bintaro",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/harga-sewa-kantor-bintaro/#article",
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
            canonicalUrl="https://www.bintarobusinesscentre.com/harga-sewa-kantor-bintaro"
            schemaObject={schemaObject}
            hero={{
                badge1: 'Panduan Harga',
                badge2: 'Bintaro & Jaksel',
                h1: 'Harga Sewa Kantor di Bintaro: Struktur Biaya dan Faktor Penentu',
                subheading: 'Banyak calon penyewa kantor di Bintaro dan sekitar Jakarta Selatan memulai pencarian dengan satu pertanyaan: berapa harganya? <a href="/sewa-kantor" class="text-accent font-bold hover:underline">Bintaro Business Centre menyediakan sewa kantor siap pakai</a> dengan struktur harga all-in untuk referensi nyata.',
                ctaLabel: 'Pelajari Struktur Biaya',
                ctaHref: '#problem',
                image: '/images/sewa-kantor/ruangan-kantor-minimalis.jpg'
            }}
            problem={{
                title: 'Faktor yang Menentukan Harga Sewa Kantor',
                paragraphs: [
                    'Harga sewa kantor di kawasan Bintaro dan Jakarta Selatan dipengaruhi oleh beberapa variabel utama yang saling terkait. Memahami strukturnya lebih penting daripada sekadar membandingkan angka di permukaan.',
                    '<strong>Lokasi dan aksesibilitas</strong> menjadi faktor pertama. Kantor yang berada dekat pintu tol, stasiun, atau koridor bisnis utama cenderung memiliki harga lebih tinggi. Kawasan Pesanggrahan di Jakarta Selatan memiliki posisi strategis dengan akses langsung ke JORR W2S melalui <a href="/kantor-dekat-tol-veteran" class="text-accent hover:underline">Pintu Tol Veteran</a>.',
                    '<strong>Tipe ruang</strong> menentukan struktur biaya secara signifikan. Serviced office yang sudah dilengkapi furnitur, internet, dan resepsionis memiliki komponen harga berbeda dibanding ruang kosong. Selain itu, <strong>kapasitas dan ukuran ruang</strong> berbanding lurus dengan harga, namun tidak selalu linear.'
                ]
            }}
            education={{
                title: 'Rentang Harga Kantor di Bintaro dan Perbandingannya',
                items: [
                    {
                        title: 'Rentang Umum Serviced Office',
                        content: 'Serviced office di gedung perkantoran profesional kawasan Bintaro dan sekitar Jakarta Selatan umumnya berada di kisaran Rp 3–8 juta per bulan untuk ruang kecil hingga menengah, sudah termasuk fasilitas dasar. Angka bisa lebih rendah jika fasilitas terbatas, atau lebih tinggi di kawasan premium.'
                    },
                    {
                        title: 'Perbandingan: Bintaro vs Lokasi Lain',
                        content: 'Bintaro dan kawasan sekitarnya menawarkan alternatif menarik dibanding kawasan bisnis premium seperti Sudirman atau Kuningan. Perbedaan harganya bisa signifikan, sementara aksesibilitas lewat tol tetap terjaga.'
                    },
                    {
                        title: 'Status Yurisdiksi DKI Jakarta',
                        content: 'Yang perlu diperhatikan: tidak semua kawasan yang secara geografis berdekatan dengan Bintaro berada dalam yurisdiksi DKI Jakarta. <a href="/kantor-dekat-bintaro-jaya" class="text-accent hover:underline">Kantor dekat Bintaro Jaya di sisi Pesanggrahan</a> tetap masuk Jakarta Selatan, relevan untuk urusan perizinan.'
                    }
                ]
            }}
            authority={{
                title: 'Cara Membaca Penawaran Sewa Kantor dengan Benar',
                highlight: 'Saat menerima penawaran sewa kantor, evaluasi total cost of occupancy — bukan hanya harga sewa, tapi semua biaya yang muncul selama periode kontrak.',
                image: '/images/sewa-kantor/ruangan-kantor-utama.jpg',
                items: [
                    { icon: 'CheckSquare', text: 'Pastikan apa saja yang termasuk dalam harga — furnitur, internet, utilitas, dan fasilitas gedung.' },
                    { icon: 'FileText', text: 'Periksa struktur kontrak — durasi minimum, opsi perpanjangan, dan klausul terminasi dini.' },
                    { icon: 'Calculator', text: 'Perhitungkan komponen biaya tambahan: Utilitas, service charge, deposit, dan fasilitas berbayar.' },
                    { icon: 'Users', text: 'Biaya tersembunyi seperti waktu setup dan relokasi juga merupakan beban operasional.' }
                ]
            }}
            value={{
                title: 'Komponen Biaya Tambahan yang Perlu Dikonfirmasi',
                items: [
                    { title: 'Utilitas & Maintenance', desc: 'Listrik, air, AC, dan kebersihan. Pastikan apakah sudah termasuk dalam paket atau ditagih terpisah.', icon: 'Zap' },
                    { title: 'Deposit & Administrasi', desc: 'Deposit setara 1–3 bulan sewa dan kemungkinan biaya setup di awal kontrak.', icon: 'CreditCard' },
                    { title: 'Layanan Pendukung', desc: 'Resepsionis, keamanan, akses ruang meeting, atau parkir tambahan jika melebihi kuota.', icon: 'Building2' },
                    { title: 'Biaya Tak Langsung', desc: 'Waktu setup, biaya relokasi jika gedung tidak fleksibel, atau administrasi perubahan domisili.', icon: 'AlertTriangle' }
                ]
            }}
            options={{
                title: 'Struktur Harga Berdasarkan Kapasitas Ruang',
                intro: 'Proyeksi pertumbuhan tim 12 bulan ke depan membantu memilih ukuran yang tepat.',
                option1: {
                    title: 'Ruang Efisien (1-3 Orang)',
                    desc: 'Optimal secara harga per orang, sangat cocok untuk startup, founder, atau konsultan.',
                    suitableForTitle: 'Kelebihan:',
                    suitableForDesc: 'Biaya awal rendah dan efisiensi ruang maksimal operasional harian.',
                    bullets: ['Harga paling terjangkau', 'Setup instan', 'Fasilitas all-in']
                },
                option2: {
                    title: 'Ruang Menengah (4-8 Orang)',
                    desc: 'Fleksibilitas lebih tinggi dengan kapasitas yang memberikan ruang untuk ekspansi tim.',
                    suitableForTitle: 'Kelebihan:',
                    suitableForDesc: 'Ideal untuk fase scaling di mana penambahan anggota tim sering terjadi.',
                    bullets: ['Biaya per kepala efisien', 'Luas ruang memadai', 'Skalabilitas kontrak']
                }
            }}
            internalLinks={{
                title: 'Langkah Selanjutnya untuk Pemilihan Kantor Anda',
                card1: {
                    title: 'Sewa Kantor Jakarta Selatan',
                    desc: 'Lihat daftar harga sewa kantor siap pakai BBC beserta fasilitas yang termasuk.',
                    ctaLabel: 'Cek Daftar Harga',
                    href: '/sewa-kantor'
                },
                card2: {
                    title: 'Kantor Dekat Tol Veteran',
                    desc: 'Pelajari efisiensi operasional berkantor di dekat akses JORR W2S.',
                    ctaLabel: 'Lihat Detail Akses',
                    href: '/kantor-dekat-tol-veteran'
                }
            }}
            relatedArticles={{
                title: 'ARTIKEL TERKAIT',
                links: [
                    { title: 'Sewa Kantor Bintaro: Konsep & Fasilitas', href: '/sewa-kantor/bintaro' },
                    { title: 'Cara Menilai Harga Sewa Kantor di Bintaro', href: '/sewa-kantor/harga' },
                    { title: 'Kantor Dekat Bintaro Jaya: Akses Jakarta Selatan yang Strategis', href: '/kantor-dekat-bintaro-jaya' }
                ]
            }}
            bottomCTA={{
                title: 'Temukan Ruang Kantor Sesuai Budget Anda',
                subtitle: 'Tim kami siap membantu Anda menganalisis kebutuhan ruang dan total proyeksi biaya operasional.',
                primaryCTA: { label: 'Konsultasi Kebutuhan Ruang', href: 'https://wa.me/628128888069' },
                secondaryCTA: { label: 'Lihat Katalog Ruang', href: '/sewa-kantor' }
            }}
        />
    )
}
