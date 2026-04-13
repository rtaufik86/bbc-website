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
            url="/harga-virtual-office-jakarta-selatan"
            title={title}
            description={description}
            canonicalUrl="https://www.bintarobusinesscentre.com/harga-virtual-office-jakarta-selatan"
            schemaObject={schemaObject}
            h1="Harga Virtual Office Jakarta Selatan: Struktur Biaya dan Perbandingan"
            intro='Virtual office menjadi pilihan relevan bagi yang butuh domisili. Ada banyak opsi di pasaran. <a href="/virtual-office" class="text-accent font-bold hover:underline">BBC menawarkan Virtual Office Jakarta Selatan</a> dengan alamat domisili resmi DKI dan layanan yang terskala.'
            entity="virtual-office"
            location="jakarta-selatan"
            heroBadges={{ b1: "Panduan Harga", b2: "Virtual Office" }}
            sections={[
                {
                    id: "problem",
                    h2: "Rentang Harga Virtual Office di Jakarta Selatan",
                    rawHtml: `
                        <p>Harga virtual office di Jakarta Selatan bervariasi cukup signifikan tergantung penyedia, lokasi gedung, dan cakupan layanan. Secara umum, paket dasar berada di kisaran Rp 300.000â€“600.000 per bulan, sementara paket dengan layanan lebih lengkap bisa mencapai Rp 1â€“2 juta per bulan atau lebih.</p>
                        <p>Namun, perbandingan langsung antar penyedia tanpa memperhatikan apa yang termasuk dalam harga bisa menyesatkan. Dua paket dengan harga sama bisa memiliki cakupan layanan yang sangat berbeda. <a href="/harga-virtual-office" class="text-accent hover:underline">Harga virtual office dan faktor penentu nilainya</a> lebih dari sekadar perbandingan cost mentah.</p>
                        <p>Banyak perusahaan mendaftar tanpa mengetahui legalitas penyedia. Jika gedung tidak memiliki izin usaha valid, alamat tersebut tidak dapat digunakan untuk keperluan perizinan resmi.</p>
                    `
                },
                {
                    id: "education",
                    h2: "Faktor Utama yang Mempengaruhi Harga VO",
                    rawHtml: `
                        <h3>Lokasi dan Yurisdiksi Gedung</h3>
                        <p>Alamat di Jakarta Selatan (DKI Jakarta) memiliki nilai lebih tinggi untuk keperluan perizinan dibanding alamat di wilayah perbatasan atau Tangerang Selatan. Ini menyangkut validitas NIB, NPWP, dan pengajuan PKP bagi KBLI jasa.</p>

                        <h3>Cakupan Layanan Paket</h3>
                        <p>Mail handling, penerimaan kurir, akses resepsionis, dan penggunaan ruang meeting memiliki nilai berbeda tergantung kebutuhan. <a href="/alamat-bisnis-jakarta-selatan" class="text-accent hover:underline">Fungsi alamat bisnis Jakarta Selatan</a> harus dipahami agar kapasitas VO sesuai kebutuhan Anda.</p>

                        <h3>Status dan Reputasi Penyedia</h3>
                        <p>Banyak pengelola VO yang bersifat perantara. Penyedia dengan legalitas gedung mandiri dan perizinan zonasi komersial murni bisa mendaftarkan NIB dan PKP klien jauh lebih mulus.</p>
                    `
                },
                {
                    id: "authority",
                    h2: "Perbedaan Paket Virtual Office: Memahami Kebutuhan Anda",
                    rawHtml: `
                        <p>Untuk bisnis di Bintaro, virtual office Bintaro dengan alamat Jakarta Selatan menjadi alternatif yang ideal.</p>
                    `,
                    visual: {
                        type: "card",
                        items: [
                            { title: "Paket dasar: alamat bisnis dan mail handling â€” untuk yang tingkat korespondensinya rendah.", icon: "Mail" },
                            { title: "Paket menengah: resepsionis untuk telepon/tamu dan kuota meeting hours per bulan.", icon: "PhoneCall" },
                            { title: "Paket lengkap: fitur maksimal dan bisa untuk domisili lebih dari 1 entitas perusahaan.", icon: "Briefcase" },
                            { title: "Validitas legalitas domisili merupakan fitur utama yang tidak bisa diganggu gugat.", icon: "ShieldCheck" }
                        ]
                    }
                },
                {
                    id: "value",
                    h2: "Harga vs Nilai Layanan Strategis",
                    visual: {
                        type: "card",
                        items: [
                            { title: "Pendirian PT/CV", desc: "Valid untuk didaftarkan pada akta, OSS/NIB, tanpa risiko red flag di masa depan.", icon: "Award" },
                            { title: "Pengurusan NPWP", desc: "Perpajakan tunduk pada yurisdiksi KPP DKI Jakarta yang lebih terprediksi administrasinya.", icon: "FileText" },
                            { title: "Pengajuan PKP", desc: "Sangat memungkinkan bagi perusahaan jasa (KBLI) dengan prosedur dan survey KPP transparan.", icon: "ShieldCheck" },
                            { title: "Citra Profesional", desc: "Kepercayaan klien meningkat bila alamat yang tercantum bukan kawasan perumahan.", icon: "Users" }
                        ]
                    }
                },
                {
                    id: "options",
                    h2: "Berapa Biaya Standar di BBC Jakarta Selatan?",
                    rawHtml: `
                        <p>Cari paket layanan VO yang proporsional dengan fase usaha saat ini.</p>

                        <h3>VO Dasar (Hanya Domisili &amp; Mail)</h3>
                        <p>Fokus pada legal standing NPWP dan NIB. Biaya operasional tahunan yang sangat efisien.</p>
                        <p><strong>Cocok Untuk:</strong><br/>Startup SaaS, konsultan indie, digital agency baru.</p>
                        <ul>
                            <li>Alamat Domisili PT, NPWP</li>
                            <li>Penerimaan Surat</li>
                        </ul>

                        <h3>VO Plus (Dengan Operasional Terbatas)</h3>
                        <p>Melibatkan resepsionis penerima tamu reguler dan jam meeting bersama.</p>
                        <p><strong>Cocok Untuk:</strong><br/>Law firm, firma akuntan, perusahaan jasa konsultasi korporat.</p>
                        <ul>
                            <li>Domain PKP</li>
                            <li>Receptionist</li>
                            <li>Meeting Room</li>
                        </ul>
                    `
                },
                {
                    id: "related",
                    h2: "ARTIKEL TERKAIT",
                    rawHtml: `
                        <ul>
                            <li><a href="/virtual-office-bintaro">Virtual Office Bintaro: Konsep &amp; Fasilitas</a></li>
                            <li><a href="/harga-virtual-office">Harga Virtual Office: Struktur &amp; Penentu</a></li>
                        </ul>
                    `
                },
                {
                    id: "cta",
                    h2: "Hubungi Tim Legal Kami",
                    rawHtml: `
                        <p>Dapatkan domisili resmi Jakarta Selatan mulai hari ini untuk kelancaran bisnis dan pajak.</p>
                        <p><a href="https://wa.me/628128888069">Tanya Layanan via WA</a> | <a href="/virtual-office">Lihat Harga VO</a></p>
                    `
                }
            ]}
            faq={{
                title: "FAQ Biaya Virtual Office",
                items: [
                    { q: "Apakah harga virtual office sudah termasuk biaya perpanjangan NIB?", a: "Tidak. Biaya pengurusan dokumen perizinan seperti NIB biasanya terpisah dari biaya sewa virtual office." },
                    { q: "Apakah ada biaya setup atau administrasi awal?", a: "Sebagian penyedia mengenakan biaya setup di awal kontrak. Ini perlu dikonfirmasi sebelum menandatangani perjanjian." },
                    { q: "Apakah pengurusan pajak dibantu oleh penyedia?", a: "Virtual office hanya mensuplai surat keterangan domisili. Penginputan OSS dll adalah tanggungjawab notaris/Anda, namun kami bisa mendampingi perwakilan survey KPP." }
                ]
            }}
            internalLinks={{
                intro: { label: "Lihat Paket", href: "/virtual-office" },
                mid: { label: "Baca Panduan", href: "/alamat-bisnis-jakarta-selatan" },
                closing: { label: "Tanya Layanan via WA", href: "https://wa.me/628128888069" }
            }}
        />
    )
}

