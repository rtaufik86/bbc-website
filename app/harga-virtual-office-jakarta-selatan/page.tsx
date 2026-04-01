import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

const title = 'Harga Virtual Office Jakarta Selatan: Breakdown Biaya & Perbandingan'
const description = 'Breakdown biaya virtual office di Jakarta Selatan. Uraian komponen harga, perbedaan paket, dan variabel layanan yang mempengaruhi nilai tiap pilihan.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/harga-virtual-office-jakarta-selatan' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/harga-virtual-office-jakarta-selatan',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/foto-gedung-bbc.jpg' }] // assuming placeholder image exists
    }
}

export default function Page() {
    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/harga-virtual-office-jakarta-selatan/#webpage",
                "url": "https://www.bintarobusinesscentre.com/harga-virtual-office-jakarta-selatan",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/harga-virtual-office-jakarta-selatan/#article",
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
            canonicalUrl="https://www.bintarobusinesscentre.com/harga-virtual-office-jakarta-selatan"
            schemaObject={schemaObject}
            hero={{
                badge1: 'Panduan Harga',
                badge2: 'Virtual Office',
                h1: 'Harga Virtual Office Jakarta Selatan: Struktur Biaya dan Perbandingan',
                subheading: 'Virtual office menjadi pilihan relevan bagi yang butuh domisili. Ada banyak opsi di pasaran. <a href="/virtual-office" class="text-accent font-bold hover:underline">BBC menawarkan Virtual Office Jakarta Selatan</a> dengan alamat domisili resmi DKI dan layanan yang terskala.',
                ctaLabel: 'Evaluasi Paket Anda',
                ctaHref: '#problem',
                image: '/images/foto-gedung-bbc.jpg'
            }}
            problem={{
                title: 'Rentang Harga Virtual Office di Jakarta Selatan',
                paragraphs: [
                    'Harga virtual office di Jakarta Selatan bervariasi cukup signifikan tergantung penyedia, lokasi gedung, dan cakupan layanan. Secara umum, paket dasar berada di kisaran Rp 300.000–600.000 per bulan, sementara paket dengan layanan lebih lengkap bisa mencapai Rp 1–2 juta per bulan atau lebih.',
                    'Namun, perbandingan langsung antar penyedia tanpa memperhatikan apa yang termasuk dalam harga bisa menyesatkan. Dua paket dengan harga sama bisa memiliki cakupan layanan yang sangat berbeda. <a href="/harga-virtual-office" class="text-accent hover:underline">Harga virtual office dan faktor penentu nilainya</a> lebih dari sekadar perbandingan cost mentah.',
                    'Banyak perusahaan mendaftar tanpa mengetahui legalitas penyedia. Jika gedung tidak memiliki izin usaha valid, alamat tersebut tidak dapat digunakan untuk keperluan perizinan resmi.'
                ]
            }}
            education={{
                title: 'Faktor Utama yang Mempengaruhi Harga VO',
                items: [
                    {
                        title: 'Lokasi dan Yurisdiksi Gedung',
                        content: 'Alamat di Jakarta Selatan (DKI Jakarta) memiliki nilai lebih tinggi untuk keperluan perizinan dibanding alamat di wilayah perbatasan atau Tangerang Selatan. Ini menyangkut validitas NIB, NPWP, dan pengajuan PKP bagi KBLI jasa.'
                    },
                    {
                        title: 'Cakupan Layanan Paket',
                        content: 'Mail handling, penerimaan kurir, akses resepsionis, dan penggunaan ruang meeting memiliki nilai berbeda tergantung kebutuhan. <a href="/alamat-bisnis-jakarta-selatan" class="text-accent hover:underline">Fungsi alamat bisnis Jakarta Selatan</a> harus dipahami agar kapasitas VO sesuai kebutuhan Anda.'
                    },
                    {
                        title: 'Status dan Reputasi Penyedia',
                        content: 'Banyak pengelola VO yang bersifat perantara. Penyedia dengan legalitas gedung mandiri dan perizinan zonasi komersial murni bisa mendaftarkan NIB dan PKP klien jauh lebih mulus.'
                    }
                ]
            }}
            authority={{
                title: 'Perbedaan Paket Virtual Office: Memahami Kebutuhan Anda',
                highlight: 'Untuk bisnis di Bintaro, virtual office Bintaro dengan alamat Jakarta Selatan menjadi alternatif yang ideal.',
                image: '/images/sewa-kantor/ruangan-kantor-utama.jpg',
                items: [
                    { icon: 'Mail', text: 'Paket dasar: alamat bisnis dan mail handling — untuk yang tingkat korespondensinya rendah.' },
                    { icon: 'PhoneCall', text: 'Paket menengah: resepsionis untuk telepon/tamu dan kuota meeting hours per bulan.' },
                    { icon: 'Briefcase', text: 'Paket lengkap: fitur maksimal dan bisa untuk domisili lebih dari 1 entitas perusahaan.' },
                    { icon: 'ShieldCheck', text: 'Validitas legalitas domisili merupakan fitur utama yang tidak bisa diganggu gugat.' }
                ]
            }}
            value={{
                title: 'Harga vs Nilai Layanan Strategis',
                items: [
                    { title: 'Pendirian PT/CV', desc: 'Valid untuk didaftarkan pada akta, OSS/NIB, tanpa risiko red flag di masa depan.', icon: 'Award' },
                    { title: 'Pengurusan NPWP', desc: 'Perpajakan tunduk pada yurisdiksi KPP DKI Jakarta yang lebih terprediksi administrasinya.', icon: 'FileText' },
                    { title: 'Pengajuan PKP', desc: 'Sangat memungkinkan bagi perusahaan jasa (KBLI) dengan prosedur dan survey KPP transparan.', icon: 'ShieldCheck' },
                    { title: 'Citra Profesional', desc: 'Kepercayaan klien meningkat bila alamat yang tercantum bukan kawasan perumahan.', icon: 'Users' }
                ]
            }}
            options={{
                title: 'Berapa Biaya Standar di BBC Jakarta Selatan?',
                intro: 'Cari paket layanan VO yang proporsional dengan fase usaha saat ini.',
                option1: {
                    title: 'VO Dasar (Hanya Domisili & Mail)',
                    desc: 'Fokus pada legal standing NPWP dan NIB. Biaya operasional tahunan yang sangat efisien.',
                    suitableForTitle: 'Cocok Untuk:',
                    suitableForDesc: 'Startup SaaS, konsultan indie, digital agency baru.',
                    bullets: ['Alamat Domisili PT, NPWP', 'Penerimaan Surat']
                },
                option2: {
                    title: 'VO Plus (Dengan Operasional Terbatas)',
                    desc: 'Melibatkan resepsionis penerima tamu reguler dan jam meeting bersama.',
                    suitableForTitle: 'Cocok Untuk:',
                    suitableForDesc: 'Law firm, firma akuntan, perusahaan jasa konsultasi korporat.',
                    bullets: ['Domain PKP', 'Receptionist', 'Meeting Room']
                }
            }}
            internalLinks={{
                title: 'Langkah Berikut: Pilih Virtual Office Anda',
                card1: {
                    title: 'Paket Virtual Office BBC',
                    desc: 'Lihat harga virtual office di Bintaro Business Centre secara mendetail.',
                    ctaLabel: 'Lihat Paket',
                    href: '/virtual-office'
                },
                card2: {
                    title: 'Alamat Bisnis Jakarta Selatan',
                    desc: 'Pelajari dasar legal domisili dan dampaknya pada usaha Anda di Jakarta.',
                    ctaLabel: 'Baca Panduan',
                    href: '/alamat-bisnis-jakarta-selatan'
                }
            }}
            relatedArticles={{
                title: 'ARTIKEL TERKAIT',
                links: [
                    { title: 'Virtual Office Bintaro: Konsep & Fasilitas', href: '/virtual-office-bintaro' },
                    { title: 'Harga Virtual Office: Struktur & Penentu', href: '/harga-virtual-office' }
                ]
            }}
            faq={{
                title: 'FAQ Biaya Virtual Office',
                items: [
                    { q: 'Apakah harga virtual office sudah termasuk biaya perpanjangan NIB?', a: 'Tidak. Biaya pengurusan dokumen perizinan seperti NIB biasanya terpisah dari biaya sewa virtual office.' },
                    { q: 'Apakah ada biaya setup atau administrasi awal?', a: 'Sebagian penyedia mengenakan biaya setup di awal kontrak. Ini perlu dikonfirmasi sebelum menandatangani perjanjian.' },
                    { q: 'Apakah pengurusan pajak dibantu oleh penyedia?', a: 'Virtual office hanya mensuplai surat keterangan domisili. Penginputan OSS dll adalah tanggungjawab notaris/Anda, namun kami bisa mendampingi perwakilan survey KPP.' }
                ]
            }}
            bottomCTA={{
                title: 'Hubungi Tim Legal Kami',
                subtitle: 'Dapatkan domisili resmi Jakarta Selatan mulai hari ini untuk kelancaran bisnis dan pajak.',
                primaryCTA: { label: 'Tanya Layanan via WA', href: 'https://wa.me/628128888069' },
                secondaryCTA: { label: 'Lihat Harga VO', href: '/virtual-office' }
            }}
        />
    )
}
