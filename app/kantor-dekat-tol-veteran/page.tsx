import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

const title = 'Kantor Dekat Tol Veteran: Akses Strategis Jakarta Selatan via JORR W2S'
const description = 'Panduan konektivitas kantor di sekitar Pintu Tol Veteran JORR W2S. Akses ke koridor bisnis Jakarta Selatan, Bintaro, dan Tangerang dalam satu lokasi.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/kantor-dekat-tol-veteran' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/kantor-dekat-tol-veteran',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/sewa-kantor/ruangan-kantor-staff.jpg' }]
    }
}

export default function Page() {
    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/kantor-dekat-tol-veteran/#webpage",
                "url": "https://www.bintarobusinesscentre.com/kantor-dekat-tol-veteran",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/kantor-dekat-tol-veteran/#article",
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
            canonicalUrl="https://www.bintarobusinesscentre.com/kantor-dekat-tol-veteran"
            schemaObject={schemaObject}
            hero={{
                badge1: 'Akses Logistik',
                badge2: 'JORR W2S',
                h1: 'Kantor Dekat Tol Veteran: Akses Strategis Lintas Jakarta Selatan',
                subheading: 'Mobilitas tinggi berarti perbedaan efisiensi antar jarak pintu tol sangat krusial. <a href="/sewa-kantor" class="text-accent font-bold hover:underline">Bintaro Business Centre berlokasi ~1,3 km dari Pintu Tol Veteran</a> dengan akses instan fasilitas kantor siap pakai Pesanggrahan, Jakarta Selatan.',
                ctaLabel: 'Keuntungan Ber-kantor Dekat Tol',
                ctaHref: '#problem',
                image: '/images/sewa-kantor/ruangan-kantor-staff.jpg'
            }}
            problem={{
                title: 'Peran Akses Tol dalam Efisiensi Operasional Harian',
                paragraphs: [
                    'Bagi perusahaan yang memiliki kebutuhan mobilitas tinggi — baik itu kelancaran distribusi logistik armada, intensitas kunjungan klien yang tinggi, atau koordinasi antar cabang reguler — kedekatan dengan pintu tol bukan sekadar soal kenyamanan.',
                    'Waktu tempuh yang lebih pendek dari dan ke kantor menjamin biaya transportasi irit, mempermudah kalkulasi jadwal kunjungan, dan menjaga level produktivitas energi tim yang bergerak. Di kota sepadat Jakarta, selisih 2–3 kilometer dari pintu tol bisa berarti kerugian waktu 20–30 menit perjalanan kemacetan jam sibuk.',
                    'Penjabaran <a href="/harga-sewa-kantor-bintaro" class="text-accent hover:underline">harga sewa kantor Bintaro dibandingkan kawasan lain di Jakarta Selatan</a> akan menjadi referensi apakah efisiensi logistik ini diimbangi dengan struktur biaya bulanan masuk akal di kantong perusahaan.'
                ]
            }}
            education={{
                title: 'Konektivitas Segitiga Emas: JORR W2S Tol Veteran',
                items: [
                    {
                        title: 'Arah Selatan-Barat (Tangerang Raya)',
                        content: 'Pintu Tol Veteran bermuara ke arah Pondok Aren, Serpong, dan BSD. Ini sangat relevan bagi perusahaan yang beroperasi pada klaster perumahan di Tangerang Selatan atau kompleks industri padat di barat.'
                    },
                    {
                        title: 'Arah Utara (Soekarno-Hatta & Kebon Jeruk)',
                        content: 'Lewat sambungan JORR W2S Utara tembus langsung ke pintu tol Kebon Jeruk, Cengkareng, dan bandara komersial internasional Soekarno-Hatta. Sangat penting bagi ekspor-impor (pengiriman barang udara) dan C-suite yang melanglang buana antar-pulau tiap bulan.'
                    },
                    {
                        title: 'Arah Timur-Dalam (Cilandak & Fatmawati)',
                        content: 'Akses Jakarta Selatan bagian dalam seperti TB Simatupang, Fatmawati, Lebak Bulus mengandalkan jalur ini. <a href="/kantor-dekat-bintaro-jaya" class="text-accent hover:underline">Halaman kantor dekat Bintaro Jaya</a> membahas bagaimana posisi lintasan ini menghubungkan administrasi penting eksternal.'
                    }
                ]
            }}
            authority={{
                title: 'Keunggulan Lokasi Pesanggrahan - Veteran Secara Mikro',
                highlight: 'Tak hanya tol, fasilitas sekitar koridor Tol Veteran sangat mengakomodir operasional makro suatu gedung perkantoran skala manapun.',
                image: '/images/sewa-kantor/ruangan-kantor-utama.jpg',
                items: [
                    { icon: 'Search', text: 'Perluasan rekrutmen mudah: akses yang dekat pintu tol JORR W2S tak membatasi geografi SDM melamar dan pulang malam ke Depok / Bekasi' },
                    { icon: 'Truck', text: 'Efisiensi armada logistik tanpa blusukan masuk ke kemacetan lokal tak terprediksi dalam area pasar Pesanggrahan' },
                    { icon: 'Users', text: 'Mitra & partner mudah bertamu ke lobi sehingga memperkuat representasi profesionalisme rapat korporat Anda' },
                    { icon: 'Zap', text: 'Perbankan besar dan restoran yang mengapit jalan arteri utama sangat mensupor tim frontliner backoffice reguler di sekitar' }
                ]
            }}
            value={{
                title: 'Dampak Lokasi Pintu Tol Veteran Terhadap Budaya Kerja',
                items: [
                    { title: 'Tepat Waktu', desc: 'Kemudahan kalkulasi mobilitas tanpa kejebak lampu merah meminimalisir keterlambatan absensi WFO secara signifikan', icon: 'Clock' },
                    { title: 'Persepsi VIP Klien', desc: 'Klien akan menilai positif bila alamat perseroan Anda dekat <a href="/sewa-kantor/bintaro" class="text-accent hover:underline">sewa kantor Bintaro dengan fasilitas resepsionis tingkat A+</a> yang begitu mudah di-Gojek', icon: 'CheckCircle' },
                    { title: 'Jangkau Perbatasan', desc: 'Tumbuh melampaui limit area selatan', icon: 'Globe' },
                    { title: 'Siklus Operasional Normal', desc: 'Di jam terlarang malam (jam truk), suplai di jalan arteri raya ini masih terbuka leluasa untuk pengiriman instan barang garmen / material', icon: 'ShieldAlert' }
                ]
            }}
            options={{
                title: 'Temukan Konfigurasi Ruangan Yang Tepat',
                intro: 'Kenyamanan mobilitas harus dipadukan dengan ruangan produktif.',
                option1: {
                    title: 'Pusat Logistik Mini',
                    desc: 'Ruang Service office tertutup yang bisa digunakan sebagai pusat command stok dan admin.',
                    suitableForTitle: 'Akses Armada',
                    suitableForDesc: 'Menurunkan barang sample komersil, material distribusi ringan.',
                    bullets: ['Ruang Eksklusif', '24 Jam Keamanan']
                },
                option2: {
                    title: 'Hub Konsultansi / Branch',
                    desc: 'Ruang yang diperuntukkan bagi manajer regional selatan-barat menerima report para rep.',
                    suitableForTitle: 'Fasilitas Kolaborasi',
                    suitableForDesc: 'Rapat dan brain-storming di ruang yang privat.',
                    bullets: ['WiFi Stabil', 'Resepsionis Ramah Untuk Tamu']
                }
            }}
            internalLinks={{
                title: 'Gali Insight Harga dan Opsi Lainnya',
                card1: {
                    title: 'Daftar Harga Bintaro Office',
                    desc: 'Simulasi budget sewa dengan keunggulan akses logistik perbatasan ibukota.',
                    ctaLabel: 'Referensi Biaya',
                    href: '/harga-sewa-kantor-bintaro'
                },
                card2: {
                    title: 'Sewa Kantor Jakarta Selatan',
                    desc: 'Bandingkan inventori lengkap BBC untuk unit 2, 4, hingga 8 pax siap survei.',
                    ctaLabel: 'Pilih Kantor',
                    href: '/sewa-kantor'
                }
            }}
            relatedArticles={{
                title: 'ARTIKEL TERKAIT',
                links: [
                    { title: 'Kantor Dekat Bintaro Jaya', href: '/kantor-dekat-bintaro-jaya' },
                    { title: 'Sewa Kantor Bintaro: Konsep & Fasilitas', href: '/sewa-kantor/bintaro' }
                ]
            }}
            faq={{
                title: 'FAQ Area Tol Veteran',
                items: [
                    { q: 'Apakah ada kemacetan signifikan di sekitar Pintu Tol Veteran?', a: 'Seperti sebagian besar pintu tol di Jakarta, kepadatan biasanya terjadi pada jam masuk kerja (07.00–09.00) dan jam pulang (17.00–19.00). Di luar jam tersebut, akses relatif lancar.' },
                    { q: 'Apakah tersedia transportasi umum ke kawasan ini?', a: 'Kawasan Pesanggrahan dapat diakses melalui beberapa rute angkutan umum (termasuk TransJakarta terdekat), meskipun ojek online masih menjadi moda yang paling efisien untuk first/last-mile perjalanan halte stasiun.' }
                ]
            }}
            bottomCTA={{
                title: 'Maksimalkan Akselerasi Bisnis Armada Anda',
                subtitle: 'Ambil alih jam produktif Anda. Akses 10 menit ke jalan toll bebas hambatan sangat bernilai ketimbang kemacetan dalam kota metropolitan.',
                primaryCTA: { label: 'Survei Unit Hari Ini', href: 'https://wa.me/628128888069' },
                secondaryCTA: { label: 'Tinjauan Sewa Jaksel', href: '/sewa-kantor' }
            }}
        />
    )
}
