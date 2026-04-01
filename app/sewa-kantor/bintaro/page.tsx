import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

const title = 'Sewa Kantor Bintaro: Konsep, Fasilitas, dan Kesesuaian Bisnis'
const description = 'Gambaran konsep dan fasilitas private office di kawasan Bintaro, Jakarta Selatan. Ruang privat fully furnished dengan akses langsung ke Pintu Tol Veteran.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/sewa-kantor/bintaro' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/sewa-kantor/bintaro',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/sewa-kantor/ruangan-kantor-bersih.jpg' }]
    }
}

export default function Page() {
    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor/bintaro/#webpage",
                "url": "https://www.bintarobusinesscentre.com/sewa-kantor/bintaro",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor/bintaro/#article",
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
            canonicalUrl="https://www.bintarobusinesscentre.com/sewa-kantor/bintaro"
            schemaObject={schemaObject}
            hero={{
                badge1: 'Konsep & Layout',
                badge2: 'Working Space',
                h1: 'Sewa Kantor Bintaro Eksekutif: Transformasi Ruangan Fisik All-In',
                subheading: 'Koridor selatan Jakarta memiliki keunggulan aksesibilitas tol maupun ekosistem bisnis mapan (Bintaro Jaya). Ciptakan <a href="/sewa-kantor" class="text-accent font-bold hover:underline">sewa kantor berkelas operasional matang tanpa setup modal besar</a>, sepenuhnya legal di yurisdiksi Jakarta Selatan dengan BBC.',
                ctaLabel: 'Konsep Layanan Ruang Serviced Office',
                ctaHref: '#problem',
                image: '/images/sewa-kantor/ruangan-kantor-bersih.jpg'
            }}
            problem={{
                title: 'Private Office versus Kosong vs Coworking Bintaro',
                paragraphs: [
                    'Serviced office, atau kantor siap pakai, adalah model sewa kantor di mana unit ruang lantai Anda sudah dilengkapi dengan furnitur modular, infrastruktur jaringan terpasang (WiFi/kabel LAN), dan layanan back-office pendukung harian seperti resepsionis hingga kurir inter-office. Tenant nyaris tak perlu waktu renovasi.',
                    'Kawasan Bintaro dan Pesanggrahan Jakarta Selatan menarik para pengelola property management ini dengan gencar, menyebabkan membeludaknya opsi co-working. Berbeda dari coworking space yang lazimnya shared/open plan nan bising (privat rentan) serta kosongan telanjang yang wajib kontraktor fitting out, model private office memangkas semuanya di hari yang sama.',
                    '<a href="/harga-sewa-kantor-bintaro" class="text-accent hover:underline">Halaman harga sewa kantor Bintaro yang membahas struktur biaya secara detail</a> sangat merefleksikan margin ROI antara 3 model layanan korporat properti tersebut secara finansial per pax di tahun pertama operasional PT / CV atau Startup branch office.'
                ]
            }}
            education={{
                title: 'Paket Fasilitas Standard Serviced Office',
                items: [
                    {
                        title: 'Workstations Modern Minimalist (Desks + Chairs + Tumb P.',
                        content: 'Tersusun ergonomik mebel lemari credenza tanpa biaya angkut logistik / instalasi hardware rumit di muka ketika tim bertambah. Internet broadband dedicated untuk setiap ruang.'
                    },
                    {
                        title: 'Tamu Di-Handle Front Desk & Lobby',
                        content: 'Gedung memiliki staf terlatih khusus untuk call forwarding / transfer ekstensi meja layaknya enterprise MNC tanpa budget UMR khusus resepsionis perusahaan mikro rintisan. <a href="/kantor-dekat-tol-veteran" class="text-accent hover:underline">Klien VIP masuk Pintu Tol Veteran JORR W2S</a>, mobil mereka akan diparkir di spot kami.'
                    },
                    {
                        title: 'Opex Ditutup Utilitas & Kebersihan',
                        content: 'Listrik (PLN tier korporat), sentral kompresor AC harian, utilitas sanitary toilet premium hingga house keeping tiap jam telah diblend (bundle) fix charge. Beban vendor cleaning hilang.'
                    }
                ]
            }}
            authority={{
                title: 'Tipe Ruang Privat Yang Paling Digemari BBC',
                highlight: 'Berdasarkan okupansi penuh kami, perusahaan selalu melakukan rightsizing unit. Ruang eksklusif memungkinkan penyewa mengecilkan / membesarkan skalabilitas unit bila demand naik / surut (flexibilitas down-sizing).',
                image: '/images/sewa-kantor/ruangan-kantor-utama.jpg',
                items: [
                    { icon: 'Smile', text: '1-3 Pax: Mini command center / hub consultan spesialis independen (Lawyer single).' },
                    { icon: 'Users', text: '4-8 Pax: Scaleup SaaS startup, web design house studio, atau divisi rep cabang consumer goods.' },
                    { icon: 'Target', text: 'Lebih dari 8 pax: Kontraktor MEP, distribution control office.' },
                    { icon: 'Calendar', text: 'Booking jam meeting ruangan auditorium yang tak mengganggu hiruk pikuk pengerjaan laptop kolega sebelahnya.' }
                ]
            }}
            value={{
                title: 'Indikator Bisnis yang Wajib Beralih Ke Sini',
                items: [
                    { title: 'Pendirian Legal', desc: 'Sesuai UU, OSS mewajibkan kantor fisik untuk PKP Perdagangan/Distributor (cek zonasi KBLI).', icon: 'Award' },
                    { title: 'Tim Cabang (Branch)', desc: 'Ekspansi wilayah Jabodetabek dari Jawa Barat sentral (Bandung) butuh rumah operasional sebulan.', icon: 'Map' },
                    { title: 'Remote Tapi Butuh Base', desc: 'Kadang remote WFH butuh sentralisasi seminggu sekali (hybrid model).', icon: 'Sun' },
                    { title: 'C-Level Privasi', desc: 'Direksi eksekutif menghargai kesunyian dinding peredam yang sulit dicari di cafe coworking.', icon: 'Lock' }
                ]
            }}
            options={{
                title: 'Katalog Kantor Bintaro BBC',
                intro: 'Kondisi fisik gedung dengan protokol korporasi transparan.',
                option1: {
                    title: 'Mini Suite Bintaro',
                    desc: 'Luas proporsional 10-14 sqm dilengkapi furnitur Aestetik.',
                    suitableForTitle: 'Akomodasi:',
                    suitableForDesc: 'Tim super kurus inti. Founder dan admin operasional tandem.',
                    bullets: ['Biaya Variabel Ringan', 'Kontrak Lentur Pendek']
                },
                option2: {
                    title: 'Medium Business Suite',
                    desc: 'Luas lega 15-20+ sqm, partisi meja lebar dan laci sorong.',
                    suitableForTitle: 'Akomodasi:',
                    suitableForDesc: 'Tim solid siap delivery campaign, atau admin procurement massal.',
                    bullets: ['Lingkungan Kondusif Rapat Kecil', 'Daya Tampung Skalatis']
                }
            }}
            internalLinks={{
                title: 'Langkah Evaluasi Kantor Impian Anda',
                card1: {
                    title: 'Minta Penawaran Sewa Bintaro',
                    desc: 'Hitung RAB sewa di rentang bulan pilihan. Temukan benefit di tiap periode.',
                    ctaLabel: 'Tinjau Harga',
                    href: '/harga-sewa-kantor-bintaro'
                },
                card2: {
                    title: 'Hubungan Area & Toll Operasional',
                    desc: 'Pahami betapa pentingnya gerbang masuk keluar dari Veteran untuk tamu.',
                    ctaLabel: 'Lihat Peta Akses Toll',
                    href: '/kantor-dekat-tol-veteran'
                }
            }}
            relatedArticles={{
                title: 'ARTIKEL TERKAIT',
                links: [
                    { title: 'Cara Menilai Harga Sewa Bintaro', href: '/sewa-kantor/harga' },
                    { title: 'Sewa Kantor Jakarta Selatan Eksklusif', href: '/sewa-kantor/jakarta-selatan' },
                    { title: 'Alamat Bisnis Sah Jakarta Selatan', href: '/alamat-bisnis-jakarta-selatan' }
                ]
            }}
            faq={{
                title: 'FAQ Layanan & Ruangan Kantor Bintaro',
                items: [
                    { q: 'Berapa durasi kontrak minimum untuk sewa kantor di Bintaro?', a: 'Durasi kontrak bervariasi tergantung penyedia. Sebagian besar mengizinkan fleksibilitas sewa bulanan, per kuartal (3 bulan) minimal, hingga tahunan komitmen discount.' },
                    { q: 'Apakah alamat kantor di Bintaro bisa digunakan untuk domisili perusahaan?', a: 'Tergantung lokasi spesifik dan IMB tata ruangnya. Alamat BBC di Pesanggrahan dapat mem-back up sah NIB serta NPWP korporasi PT sebagai domisili DKI Jakarta.' }
                ]
            }}
            bottomCTA={{
                title: 'Lihat Langsung Tata Ruang Kami Kapan Saja',
                subtitle: 'Walk in tour 10 menit dengan tim penasihat operasional ruang BBC bisa mencerahkan struktur dan tata ruang sejati untuk kru Anda.',
                primaryCTA: { label: 'Agendakan Survei Hari Ini', href: 'https://wa.me/628128888069' },
                secondaryCTA: { label: 'Gallery Fasilitas Ruangan Utama Jaksel', href: '/sewa-kantor' }
            }}
        />
    )
}
