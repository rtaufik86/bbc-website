import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'
import { buildWhatsAppLink } from '@/lib/tracking/cta'

const waUrlInline = buildWhatsAppLink({ text: 'Halo BBC, saya ingin info paket sewa kantor terjangkau Jakarta Selatan.', service: 'office', cta: 'mid', intent: 'pricing', phone: '628128888069' })
const waUrlClosing = buildWhatsAppLink({ text: 'Halo BBC, saya ingin info paket sewa kantor terjangkau Jakarta Selatan.', service: 'office', cta: 'final', intent: 'pricing', phone: '628128888069' })

const title = 'Sewa Kantor Murah Jakarta Selatan: Memahami Harga dan Nilai'
const description = 'Dalam mancari ruang kantor berharga hemat, Anda harus hati-hati melihat Total Cost of Occupancy (TCO). Ketahui perhitungannya untuk budget bisnis Anda.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/sewa-kantor/murah-jakarta-selatan' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/sewa-kantor/murah-jakarta-selatan',
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
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor/murah-jakarta-selatan/#webpage",
                "url": "https://www.bintarobusinesscentre.com/sewa-kantor/murah-jakarta-selatan",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor/murah-jakarta-selatan/#article",
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
                        "name": "Apakah harga sewa kantor bisa dinegosiasi?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Pada umumnya bisa, terutama untuk kontrak komitmen jangka panjang atau ruang dengan luasan ekstra. Negosiasi lebih efektif jika perusahaan siap membuktikan stabilitas usaha berkelanjutan."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah ada biaya yang wajib dibayar di muka selain sewa bulan pertama?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                        "text": "Biasanya ada jaminan perlindungan aset berupa deposit (1–3 bulan sewa) atau biaya pendaftaran integrasi sistem yang tercatat di pembukuan."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Bagaimana dampaknya bila saya berhenti sebelum masa akhir kontrak habis?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Gedung konvensional memotong denda penuh dan mengunci inventarisasi. Pastikan pelajari kewajiban terminasi serta kebijakan perpanjangan otomatis fleksibel yang adil."
                        }
                    }
                ]
            }
        ]
    }

    return (
        <WeaponPageTemplate
            url="/sewa-kantor/murah-jakarta-selatan"
            title={title}
            description={description}
            canonicalUrl="https://www.bintarobusinesscentre.com/sewa-kantor/murah-jakarta-selatan"
            schemaObject={schemaObject}
            h1="Sewa Kantor Murah Jakarta Selatan: Kalkulasi Keselarasan Nilai Jangka Panjang"
            intro='Ketika meninjau ruang komersial, istilah "murah" bagai pisau bermata dua. Jebakan pengeluaran tak terlihat seperti pemeliharaan utilitas merusak hitungan margin laba. Prinsip transparansi anggaran menyeluruh diadopsi pada model <a href="/sewa-kantor" class="text-accent font-bold hover:underline">sewa kantor Jakarta Selatan</a> di Bintaro Business Centre (BBC), guna menjamin pengusaha tidak disandera fluktuasi biaya tersembunyi di ibukota.'
            entity="sewa-kantor"
            location="jakarta-selatan"
            heroBadges={{ b1: "Evaluasi Biaya", b2: "Smart Business" }}
            sections={[
                {
                    id: "problem",
                    h2: "Mengkritisi Angka Total Cost of Occupancy (TCO)",
                    rawHtml: `
                        <p>Di koridor padat seperti Jakarta Selatan—pesona angka nominasi yang super rendah sungguh menggoda para pelaku startup. Ruang ruko ditawarkan senilai rendah terdengar menguntungkan saat dicerna mentah, namun apa yang terjadi bila tagihan tak dikontrol? Sambungan bandwidth pasang kelak lambat, kipas angin tak menyejukkan lobi, dan tagihan listrik meloncat melampaui tarif sewa.</p>
                        <p>Kita menyebutnya sebagai Total Cost of Occupancy (TCO). Ini adalah jumlah kolektif gabungan sewa awal ditambah variabel kebersihan, air komersial, asuransi, perbaikan struktur ringan tak berkesudahan, dan retensi kebersihan luar kawasan. Apabila diproyeksi menyeluruh per 18 bulan, tawaran terendah tersebut justru lebih tinggi daripada paket sewa profesional yang dijamin anti-bocor.</p>
                        <p>Dibiarkan berlarut, ketidakmampuan menebak pengeluaran logistik akhir akan mengganggu arus tunai perusahaan vital Anda. Anda harus cerdas membedah apakah komponen nilai (Value) yang diserahkan sudah terakumulasi sempurna dalam negosiasi biaya pertama.</p>
                    `
                },
                {
                    id: "education",
                    h2: "Perbedaan Dimensi Harga Promosi vs Nilai Aktual Servis",
                    rawHtml: `
                        <h3>Produktivitas SDM dan Iklim Psikologis Tim</h3>
                        <p>Suhu pendingin kurang daya, aliran ventilasi lembab merembes; ini adalah cerminan dari penghematan ekstrim yang memukul psikologis staf dan akhirnya membuahkan kelambatan kinerja harian signifikan yang merugikan margin komersil.</p>

                        <h3>Representasi Lobi dan Performa Muka Profesionalitas</h3>
                        <p>Menerima tamu di teras yang seadanya pada sebuah kantor murah akan mempertaruhkan keyakinan klien tender senilai ratusan juta rupiah. Keberadaan resepsionis yang disokong oleh ekosistem komunal bonafide lebih krusial dibanding selisih tarif bulanan yang tipis.</p>

                        <h3>Kekakuan Kontrak Ruko Tradisional</h3>
                        <p>Ruko kosong paling terjangkau selalu terikat jangka pinalti 2-3 tahun gembok. Serviced office pintar menangkis dilema itu dengan termin adaptif, layaknya penjelasan <a href="/sewa-kantor/harga" class="text-accent hover:underline">perbandingan model konvensional dan modern yang diimplementasi komunal gedung profesional</a>.</p>
                    `
                },
                {
                    id: "authority",
                    h2: "Risiko Terberat Bila Hanya Dituntun Nominal Minimal",
                    rawHtml: `
                        <p>Kepahitan pemborosan relokasi pasca tertipu realita di lapangan justru mengacaukan jalur produktivitas tim internal.</p>
                    `,
                    visual: {
                        type: "card",
                        items: [
                            { title: "Yurisdiksi abu-abu. Tertulis murah beralamat ruko luar kota, sehingga gagal mengajukan pendaftaran NIB domisili ibukota DKI.", icon: "Map" },
                            { title: "Tunggakan fasilitas keamanan parkir retribusi kawasan tak terduga setiap minggunya yang memperdaya tamu.", icon: "ShieldAlert" },
                            { title: "Struktur kelistrikan tak teratur tanpa proteksi UPS arus utama untuk pelindung piranti server keras data riset agensi.", icon: "Search" },
                            { title: "Pemutusan instalasi sepihak bila terjadi sengketa kepemilikan. Anda menanggung seluruh biaya memindahkan aset inventori kabinet baja.", icon: "Truck" }
                        ]
                    }
                },
                {
                    id: "value",
                    h2: "Framework Pemilihan yang Tepat (Minimum Criteria Evaluation)",
                    visual: {
                        type: "card",
                        items: [
                            { title: "Inventarisasi Realistis", desc: "Berapa luas luang kaki dan ventilasi AC standar mutlak demi menopang 6 pegawai laptop berat berdurasi 9 jam per hari?", icon: "CheckSquare" },
                            { title: "Status Garansi Yurisdiksi", desc: "Sertifikat domisili kecamatan legal mana yang terpampang sebagai dasar argumen KPP Pajak, NPWP?", icon: "Briefcase" },
                            { title: "Evaluasi Retensi Resepsionis", desc: "Uang cuti, BPJS Ketenagakerjaan akan membengkak jika harus mendatangkan staf khusus penerima telepon. Pada praktiknya, <a href=\"/sewa-kantor\" class=\"text-accent hover:underline\">paket kantor all-inclusive</a> sering lebih aman untuk menjaga struktur biaya.", icon: "Users" },
                            { title: "Skema Terminasi Fleksibel", desc: "Memastikan keluarnya agensi kelak diwarnai perjanjian perdata bisnis adil tanpa memotong seluruh deposit.", icon: "AlertTriangle" }
                        ]
                    }
                },
                {
                    id: "options",
                    h2: "Pertimbangkan Value Bersih Tanpa Ketetapan Ekstra",
                    rawHtml: `
                        <p>Pendekatan jujur BBC dalam mengakui struktur sewa.</p>

                        <h3>Service Office Stabil</h3>
                        <p>Unit terisolir tanpa gangguan sirkulasi tak dikenal. Arus tagihan listik/kebersihan telah ditutup mati pihak manajemen gedung sebagai operator. Banyak tim memilih <a href="/sewa-kantor/bintaro" class="text-accent hover:underline">kantor siap pakai di Bintaro</a> agar implementasi operasional tidak terseret biaya tak terlihat.</p>
                        <p><strong>Cocok Untuk</strong><br/>Startup pengadaan tender, manufaktur cabang kecil, dan badan riset independen.</p>
                        <ul>
                            <li>Biaya Bebas Volatilitas</li>
                            <li>Resepsionis dan Mail Handling Stabil</li>
                        </ul>

                        <h3>Virtual Office Ringkas</h3>
                        <p>Tekan hingga 90% arus kas operasional sewa lantai jika Anda sama sekali tidak butuh eksistensi tatap ruang meja rutin harian.</p>
                        <p><strong>Cocok Untuk</strong><br/>Lembaga yayasan legal, advokat pemikir hukum, dan pekerja lepas ekspedisi remote.</p>
                        <ul>
                            <li>Hak Domisili Berlegitimasi Maksimal</li>
                            <li>Meeting Room Tersedia On-Demand</li>
                        </ul>
                    `
                },
                {
                    id: "related",
                    h2: "ARTIKEL TERKAIT SEKTOR NILAI",
                    rawHtml: `
                        <ul>
                        </ul>
                    `
                },
                {
                    id: "cta",
                    h2: "Pilih Fondasi Bisnis, Bukan Cuma Label Harga Tanpa Kepastian",
                    rawHtml: `
                        <p>Angka terendah hari ini belum tentu berarti penghematan di bulan-bulan depan. Hindari pemborosan tersembunyi dengan memahami struktur TCO (Total Cost of Occupancy) bersama spesialis ruang kami.</p>
                        <p><a href="${waUrlInline}">Lihat Kalkulasi Paket Bebas Bocor</a> | Intip Inventaris Harga</p>
                    `
                }
            ]}
            faq={{
                title: "FAQ Anggaran Harga Kompetitif",
                items: [
                    { q: "Mengapa harga coworking kelihatannya sering lebih murah dari kantor?", a: "Coworking space membagi-tumpuk pemakaian satu kursi kepada banyak member berdasar giliran kedatangan, meniadakan eksklusivitas operasional." },
                    { q: "Apakah ada retribusi kebersihan atau pengadaan alat pemadam tambahan?", a: "Tidak ada biaya siluman bagi servis paket dasar kami. Retribusi kawasan dan utilitas standar tercover penuh dari tagihan rutin all-inclusive Anda." },
                    { q: "Apakah saya bisa menurunkan kapasitas ukuran unit bulan depan?", a: "Selama ketersediaan layout modular ada, penyusutan unit difasilitasi tanpa pengurusan NIB kembali dari nol asal dalam satu gedung binaan yang sama." }
                ]
            }}
            internalLinks={{
                intro: { label: "Periksa Transparansi", href: "/harga-sewa-kantor-bintaro" },
                mid: { label: "Simak Panduan Legal", href: "/virtual-office/alamat-bisnis-jakarta-selatan" },
                closing: { label: "Lihat Kalkulasi Paket Bebas Bocor", href: waUrlClosing }
            }}
        />
    )
}
