import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

const title = 'Kantor Siap Pakai Bintaro: Konsep, Fasilitas, dan Kelebihannya'
const description = 'Pahami model sewa serviced office. Ruang eksklusif siap jalan dengan fasilitas resepsionis, furnitur lengkap, dan internet dedicated tanpa cap-ex besar.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/sewa-kantor/kantor-siap-pakai-bintaro' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/sewa-kantor/kantor-siap-pakai-bintaro',
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
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor/kantor-siap-pakai-bintaro/#webpage",
                "url": "https://www.bintarobusinesscentre.com/sewa-kantor/kantor-siap-pakai-bintaro",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor/kantor-siap-pakai-bintaro/#article",
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
                        "name": "Berapa lama proses dari tanda tangan kontrak sampai bisa mulai bekerja?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Untuk kantor siap pakai, biasanya hanya perlu 1–3 hari kerja setelah semua dokumen dan pembayaran awal diselesaikan."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah bisa menambah furnitur atau dekorasi sendiri?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Tergantung kebijakan operator gedung. Sebagian memperbolehkan penambahan dalam batas wajar asalkan tidak merusak struktur aset gedung asli, sebagian lainnya terstandarisasi."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah biaya internet dan utilitas sudah final?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ya, dalam model serviced office profesional, nilai langganan Anda sudah all-in meliputi pasokan listrik utilitas pendingin, biaya retribusi gedung, serta bandwidth internet memadai per unitnya."
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
            canonicalUrl="https://www.bintarobusinesscentre.com/sewa-kantor/kantor-siap-pakai-bintaro"
            schemaObject={schemaObject}
            hero={{
                badge1: 'Serviced Office',
                badge2: 'Plug & Play',
                h1: 'Kantor Siap Pakai Bintaro: Konsep Praktis Langsung Jalan',
                subheading: 'Istilah "kantor siap pakai" merujuk pada model sewa ruang eksklusif lengkap dengan struktur furnitur, utilitas, dan layanan kelola hari pertama. Serviced office memindahkan komitmen instalasi dari pundak Anda, hal ini terlihat pada pendekatan komprehensif di fasilitas <a href="/sewa-kantor" class="text-accent font-bold hover:underline">sewa kantor Bintaro Business Centre (BBC)</a> yang memudahkan proses adaptasi bisnis operasional.',
                ctaLabel: 'Apa Saja Fasilitasnya?',
                ctaHref: '#problem',
                image: '/images/sewa-kantor/ruangan-kantor-staff.jpg'
            }}
            problem={{
                title: 'Perbedaan Utama dengan Ruang Ruko Kosong Tradisional',
                paragraphs: [
                    'Banyak manajemen terjebak menaksir penawaran rendah untuk aset komersial mentah tanpa menghitung overhead administrasi renovasinya. Sewa ruang bangunan tradisional biasa memiliki tantangan memuncak di bulan pertama: penyewa bertanggung jawab mengkoordinasikan pemasangan meteran listrik, instalasi jaringan, langganan petugas keamanan, dan desain penyekat ruang.',
                    'Kantor siap pakai — juga dikenal sebagai serviced office — melepaskan beban delegasi instalasi operasional. Penyewa tidak perlu menginvestasikan waktu dan margin kas ke vendor kontraktor eksternal, karena gedung sudah di-setup memfasilitasi meja portabel, kursi dukungan ergonomis, bahkan peredam bunyi ruangan.',
                    'Eksklusivitas ruang adalah karakteristik utama yang membedakannya dari hiruk-pikuk coworking space lepas. Anda mendapat bilik atau ruangan mandiri yang tidak dilewati orang lain dan terjaga privasi data vitalnya secara menyeluruh.'
                ]
            }}
            education={{
                title: 'Infrastruktur All-Inclusive Serviced Office',
                items: [
                    {
                        title: 'Furnitur Komprehensif dan Dedicated Internet',
                        content: 'Sebuah layout kerja menuntut harmoni fisik. Kami telah menanam meja kerja bermutu dan line sambungan internet tanpa bagi-bagi di jalur yang padat merayap. Semua langsung dialamatkan eksklusif.'
                    },
                    {
                        title: 'Layanan Resepsionis Menangani Titik Muka',
                        content: 'Klien Anda disapa staf ahli dan penerimaan telepon/paket diawasi secara logis. Anda tak dituntut menyiapkan slip gaji petugas resepsionis hanya untuk satu perusahaan.'
                    },
                    {
                        title: 'Akses Ruang Meeting Kolaboratif',
                        content: 'Penunjang operasional presentasi eksekutif. Anda menyewa ruangan terbatas per bulan, tapi <a href="/sewa-kantor/bintaro" class="text-accent hover:underline">solusi gedung kantor di Bintaro</a> memampukan Anda menjamu investor di balai terpercaya tanpa ekspansi ruang berlebihan.'
                    }
                ]
            }}
            authority={{
                title: 'Kecocokan Entitas: Siapa yang Butuh?',
                highlight: 'Kepraktisan sewa ini cocok sekali bagi pelaku komersial berjiwa cepat atau cabang luar pulau yang minim jejak.',
                image: '/images/sewa-kantor/ruangan-kantor-bersih.jpg',
                items: [
                    { icon: 'Zap', text: 'Perusahaan startup fase awal yang lebih difokuskan modalnya untuk menggaet pasar, bukan beli marmer ruangan.' },
                    { icon: 'Target', text: 'Kantor Perwakilan atau cabang distributor dari luar Jabodetabek yang hanya beranggotakan 4-6 tenaga terampil pionir.' },
                    { icon: 'Globe', text: 'Tim pemasaran project khusus berdurasi kontrak lelang 1-2 tahun tanpa ikatan panjang.' },
                    { icon: 'ShieldCheck', text: 'Vendor PKP yang mencari stabilitas struktur alamat legal DKI untuk pengajuan bea cuka dan izin tender besar.' }
                ]
            }}
            value={{
                title: 'Kelebihan Posisi Strategis di Ambang Jakarta',
                items: [
                    { title: 'Infrastruktur Mandiri', desc: 'Pemeliharaan AC, ganti bola lampu, toilet mampat semua ditangani management pengelola secara responsif.', icon: 'CheckSquare' },
                    { title: 'Investasi Nol Rupiah', desc: 'Turunkan laju Capital Expenditure (Cap-Ex) pada akuntansi kuartal pertama. Anda hanya menanggung tagihan rutin bulanan ringan.', icon: 'TrendingUp' },
                    { title: 'Tumbuh Skalabilitasnya', desc: 'Ketika tim ekspansi jumlah meja dalam 5 bulan ke depan, unit modular bersebelahan dapat dilebur dengan rapi dan mulus.', icon: 'Layers' },
                    { title: 'Bebas Penalti Ruang', desc: 'Penyesuaian jangka menengah atau pergeseran ke VO difasilitasi tanpa harus me-reset NIB domisili perusahaan.', icon: 'Map' }
                ]
            }}
            options={{
                title: 'Mekanisme Akses Bintaro Business Centre',
                intro: 'Pendekatan spesifik layanan pendukung kami.',
                option1: {
                    title: 'Paket Ruang Eksekutif Tertutup',
                    desc: 'Unit terisolasi, AC independen (beberapa tipe), furnitur privat bagi tim 2-6 orang yang siap berprestasi.',
                    suitableForTitle: 'Cocok Untuk',
                    suitableForDesc: 'Vendor logistik, agen properti elit, perusahaan arsitektur terapan dan distributor tender.',
                    bullets: ['Biaya Listrik All-in', 'Kuota Ruang Meeting']
                },
                option2: {
                    title: 'Solusi Virtual (Penyangga Hukum)',
                    desc: 'Operasional alamat berkelas murni legalitas. Resepsionis menjaga gengsi surat-menyurat harian tanpa Anda tatap muka.',
                    suitableForTitle: 'Cocok Untuk',
                    suitableForDesc: 'Lembaga digital, agensi remote pemasaran independen, advokat lapangan.',
                    bullets: ['Verifikasi Validasi Instansi', 'Akses Lobi Resepsionis Modern']
                }
            }}
            internalLinks={{
                title: 'Rencanakan Pemindahan Logistik Anda ke Unit Kami',
                card1: {
                    title: 'Membedah Variabel Harga Ruang Bintaro',
                    desc: 'Bagaimana perbandingan biaya di wilayah selatan jika dibandingkan ruko tradisional terpisah?',
                    ctaLabel: 'Analisis Biaya',
                    href: '/harga-sewa-kantor-bintaro'
                },
                card2: {
                    title: 'Kelola Izin PKP untuk Non-Jasa',
                    desc: 'Gali informasi domisili apa yang kompatibel atau legal untuk industri distributor komoditi.',
                    ctaLabel: 'Tinjau Alamat Bisnis',
                    href: '/virtual-office/alamat-bisnis-jakarta-selatan'
                }
            }}
            relatedArticles={{
                title: 'PENYELAMAN INFORMASI LANJUTAN',
                links: [
                    { title: 'Menyingkap Harga Kompetitif Jakarta Selatan', href: '/sewa-kantor/murah-jakarta-selatan' },
                    { title: 'Evaluasi Akses Kendaraan Tol JORR', href: '/kantor-dekat-tol-veteran' },
                    { title: 'Cakupan Perbedaan Wilayah DKI vs Tangsel', href: '/sewa-kantor/jakarta-selatan' }
                ]
            }}
            faq={{
                title: 'FAQ Spesifikasi Pindah Unit',
                items: [
                    { q: 'Berapa lama proses dari tanda tangan kontrak sampai bisa mulai bekerja?', a: 'Untuk kantor siap pakai, biasanya hanya perlu 1–2 hari kerja setelah penyelesaian persetujuan registrasi, kunci akses sudah Anda kantongi.' },
                    { q: 'Apakah ukuran standar meja muat untuk desktop komputer dua layar?', a: 'Dimensi meubel telah disesuaikan dengan arsitektur kantor modern yang mengakomodasi laptop beserta secondary screen lebar dengan ruang kabel ergonomis.' },
                    { q: 'Bagaimana bila tamu saya berlimpah?', a: 'Area kafe resepsionis umum / guest lounge akan memandu klien Anda duduk santai sembari membebankan ketenangan komunikasi agar lorong kerja Anda di lorong tak terganggu bising diskusi ganda luar ruang.' }
                ]
            }}
            bottomCTA={{
                title: 'Memahami Konteks Lokasi Adalah Dasar Kebijaksanaan Ekspansi',
                subtitle: 'Memahami konteks lokasi akan membantu menentukan apakah sebuah instalasi operasional bisnis benar-benar relevan memangkas cost operasional berjalan. Datang dan pastikan sendiri ruang masa depan perusahaan Anda.',
                primaryCTA: { label: 'Survei Langsung', href: 'https://wa.me/628128888069' },
                secondaryCTA: { label: 'Cek Ruangan', href: '/sewa-kantor' }
            }}
        />
    )
}
