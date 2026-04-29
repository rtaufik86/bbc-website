import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'
import { buildWhatsAppLink } from '@/lib/tracking/cta'

const waUrlInline = buildWhatsAppLink({ text: 'Halo BBC, saya ingin koordinasi legalitas virtual office Bintaro.', service: 'vo', cta: 'mid', intent: 'consultation', phone: '628128888069' })
const waUrlClosing = buildWhatsAppLink({ text: 'Halo BBC, saya ingin koordinasi legalitas virtual office Bintaro.', service: 'vo', cta: 'final', intent: 'consultation', phone: '628128888069' })

const title = 'Virtual Office Bintaro: Alamat Bisnis Jakarta Selatan untuk Perizinan'
const description = 'Hati-hati, Bintaro terbelah dua kawasan. Pilih virtual office di Pesanggrahan Jakarta Selatan yang 100% tervalidasi oleh sistem administrasi perizinan.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/virtual-office-bintaro' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/virtual-office-bintaro',
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
                "@id": "https://www.bintarobusinesscentre.com/virtual-office-bintaro/#webpage",
                "url": "https://www.bintarobusinesscentre.com/virtual-office-bintaro",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/virtual-office-bintaro/#article",
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
                        "name": "Apakah BBC berlokasi di Jakarta Selatan atau Tangerang Selatan?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "BBC berlokasi di Jl. RC Veteran No. 1-i, Pesanggrahan, Jakarta Selatan â€” sepenuhnya dalam yurisdiksi murni DKI Jakarta yang dijamin legitimasinya."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah virtual office bisa diupgrade ke kantor fisik kompartemen eksklusif kelak?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Tentu saja. Begitu profitabilitas memungkinkan pendirian cabang permanen, penyewa virtual offline kami akan diberikan hak akses pertama atas sirkulasi unit fisik kosong sebelum dipasarkan ke koran terbuka. Anda bahkan tidak perlu repot menarik revisi NIB."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Seandainya saya PKP Non-Jasa, apakah BBC dapat menjadi pijakan saya?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Sangat mungkin, namun skemanya wajib langsung mengambil kesepakatan satu ruko/unit tertutup 12 Bulan durasi mutlak, dikarenakan instansi KPP Jakarta menolak alamat representasional gabungan untuk agen penjualan riil."
                        }
                    }
                ]
            }
        ]
    }

    return (
        <WeaponPageTemplate
            url="/virtual-office-bintaro"
            title={title}
            description={description}
            canonicalUrl="https://www.bintarobusinesscentre.com/virtual-office-bintaro"
            schemaObject={schemaObject}
            h1="Virtual Office Bintaro: Konfirmasi Yurisdiksi Alamat Bisnis Anda"
            intro='Lokasi yang Anda persepsikan sebagai Bintaro bisa jadi terbelah dalam dua tata pemerintahan sipil yang berbeda. <a href="/virtual-office" class="text-accent font-bold hover:underline">Sebuah domisili virtual office berkualitas di wilayah selatan seperti BBC</a> memastikan entitas Anda dilindungi sepenuh hati oleh kerangka perizinan provinsi utama Ibukota, bukan kawasan seberangnya.'
            entity="virtual-office"
            location="bintaro"
            heroBadges={{ b1: "Klarifikasi Domisili", b2: "Otoritas Pajak" }}
            sections={[
                {
                    id: "problem",
                    h2: "Lokasi Bintaro vs Jakarta Selatan: Apa Bedanya Pada Surat Negara",
                    rawHtml: `
                        <p>Kata "Bintaro" dalam percakapan informal awam sering digunakan secara luas untuk merujuk pada keseluruhan kawasan pemukiman rindang. Namun secara realitas struktural, batas wilayah ini sangat tipis: Bintaro Jaya dan perumahan satelit besarnya masuk di jajaran Tangerang Selatan (Banten). Sedangkan jalur sentral perdagangan seperti RC Veteran Bintaro di Pesanggrahan mutlak terikat pada Kecamatan Jakarta Selatan.</p>
                        <p>Gagal membedakan distrik tersebut memiliki kerugian administratif luar biasa. Perusahaan yang bersandar pada gengsi domisili DKI akan gagal seketika di perizinan OSS apabila mereka mengambil ruko murah namun letaknya lima ratus meter melampaui Pintu Tol Barat masuk ke zona suburban Tangerang.</p>
                        <p>Instansi pemerintahan mendikte KPP (Kantor Pelayanan Pajak) berdasar geografi lintang batas jalan tersebut. NPWP dan urusan birokrasi legalitas yang tertuang pada akta pendaftaran harus linier menyelaraskan nomenklatur Kelurahan tempat Anda mendeklarasikan "Hak Virtual" penyewaan usaha dini.</p>
                    `
                },
                {
                    id: "education",
                    h2: "Implikasi Kesalahan Pilih: PT, NIB dan Standarisasi PKP",
                    rawHtml: `
                        <h3>Akal-akalan NIB yang Digagalkan Sistem</h3>
                        <p>Pendaftaran OSS NIB sangat teliti terhadap sinkronisasi provinsi tujuan yang dikoneksikan via akta pendirian, Anda tak lagi lolos dari audit fiktif.</p>

                        <h3>Kejelasan bagi Pengajuan PKP Ekstensif (KBLI Jasa)</h3>
                        <p>Khusus institusi pemasar wujud digital, surveyor KPP merestui virtual address khusus bagi Anda. Keputusan ini dirunding dalam pembahasan ketat di panduan <a href="/virtual-office/jakarta-selatan" class="text-accent hover:underline">Kesesuaian Regulasi Virtual Office Jakarta</a> yang mengatur pembagian KBLI perdagangan kasar dan konsultan murni.</p>

                        <h3>Peringatan Pemindahan KPP Berlarut</h3>
                        <p>Membatalkan kepemilikan NPWP perusahaan dari KPP Tangerang Selatan lantas beralih relokasi domisili ke Jakarta Selatan kelak menyita dua bulan periode pengakuan data silang yang membekukan transaksi tagihan vendor mutlak.</p>
                    `
                },
                {
                    id: "authority",
                    h2: "Sokongan Fungsionalitas Tim Penunjang Profesional",
                    rawHtml: `
                        <p>Lebih dari papan tulisan notaris legal, ruang administrasi pendamping Anda dibekali piranti nyata.</p>
                    `,
                    visual: {
                        type: "card",
                        items: [
                            { title: "Struktur kurasi Mail Handling harian memilah brosur usang dengan dokumen tagihan penawaran dari korporat elit.", icon: "Mail" },
                            { title: "Meja lobi Resepsionis menjamu utusan dinas DPMPTSP serta inspektor ketersediaan lahan secara cerdas dengan tata krama bisnis korporat besar.", icon: "Smile" },
                            { title: "Sertifikasi Asuransi IMB ruko jelas untuk dijamin peruntukan niaganya, sehingga bukan \"zonasi hunian yang disulap\" rawan razia pamong praja siang hari.", icon: "ShieldCheck" },
                            { title: "Bebas penundaan perjumpaan rapat eksekutif karena hak pemesanan slot meja auditorium representatif dijaga di internal kalender gedung.", icon: "Users" }
                        ]
                    }
                },
                {
                    id: "value",
                    h2: "Kepastian Keunggulan Operasional Bebas Cemas (Stress-Free)",
                    visual: {
                        type: "card",
                        items: [
                            { title: "Terkawal Otoritas Tepat", desc: "Pemilih alamat di Kecamatan Pesanggrahan berani mengklaim NPWP DKI Selatan yang berwibawa pada laman invoice perusahan utama tender.", icon: "Award" },
                            { title: "Pangkas Tagihan Tersembunyi", desc: "Sewa ruang mati puluhan juta bagi perusahaan KBLI Penulis Konten dihapus dengan investasi berlangganan alamat murah ratusan ribu.", icon: "Zap" },
                            { title: "Pemrosesan Cepat Notaris", desc: "Aksesi ke kolega notariat binaan mengantarkan pengesahan akta tuntas dalam lima hari kalender tak ada lempar kesalahan birokrasi terduga.", icon: "Clock" },
                            { title: "Representasi Lobi Tangguh", desc: "Pesona awal masuk parkiran BBC dan area komersial selingkung menguatkan penilaian auditor mengenai omzet kredibilitas entitas B2B masa muda Anda.", icon: "Target" }
                        ]
                    }
                },
                {
                    id: "options",
                    h2: "Mekanisme Domisili Sesuai Modal Inti Tahap Awal",
                    rawHtml: `
                        <p>Kapasitas layanan memprioritaskan fungsi utama absah negara.</p>

                        <h3>Verifikasi Legal Domisili</h3>
                        <p>Semua fungsi awal disahkan perundang-undangan di bawah izin IMB, plus Mail Handling dan pendaftaran perpanjangan tahunan SKDP kilat.</p>
                        <p><strong>Cocok Dimanfaatkan Untuk</strong><br/>Startup pengadaan perangkat lunak edukasi, Notariat independen mandiri perwakilan luar pulau, dan Biro Jasa Pariwisata.</p>
                        <ul>
                            <li>Terdaftar Valid KPP Setempat</li>
                            <li>Resepsionis Surat Representatif</li>
                        </ul>

                        <h3>Fasilitas Tatap Muka Kombinasi</h3>
                        <p>Unit terisolir tanpa gangguan sirkulasi (Kantor Siap Pakai) untuk merangkap KBLI Distribusi Barang atau Gudang Inventori retail fisik wajib PKP.</p>
                        <p><strong>Cocok Dimanfaatkan Untuk</strong><br/>Agen penyalur kosmetik pabrikan berskala menengah dan Pemasok suku cadang asuransi otomotif (Operasional Barang Nyata).</p>
                        <ul>
                            <li>Hak Survey Gudang Inspektur Pajak</li>
                            <li>Eksklusivitas Penyimpanan Produk Sensitif</li>
                        </ul>
                    `
                },
                {
                    id: "related",
                    h2: "NAVIGASI TOPIK PERIZINAN BERTAHAP",
                    rawHtml: `
                        <ul>
                            <li><a href="/sewa-kantor/murah-jakarta-selatan">Kalkulasi Cerdas Ruang Kerja Murah</a></li>
                            <li><a href="/kantor-dekat-tol-veteran">Kenapa Kedekatan Jalan Tol Meringankan Laju Bisnis</a></li>
                        </ul>
                    `
                },
                {
                    id: "cta",
                    h2: "Hindari Penolakan Izin Karena Letak Koordinat Abu-Abu yang Mematikan Usaha",
                    rawHtml: `
                        <p>Garis batas teritorial tidak kenal kompromi perasaan. Kesalahan domisili adalah perombakan total akta yang melumpuhkan produktivitas 6 bulan ke depan secara administratif rumit. Pastikan perlindungan hukum berdikari operasional entitas tim di Jakarta Selatan bersama representasi kami.</p>
                        <p><a href="${waUrlInline}">Koordinasi Legalitas Perdana</a> | <a href="/harga-virtual-office-jakarta-selatan">Tinjau Rincian Harga Paket</a></p>
                    `
                }
            ]}
            faq={{
                title: "FAQ Spesifik Kawasan Batas Bintaro",
                items: [
                    { q: "Apakah kawasan RC Veteran ini mutlak dalam zona plat nomor B (DKI)?", a: "100% mutlak. Identitas pendaftaran kode pos dan penyerahan pajaknya dipilah melalui sistem perpajakan Samsat dan KPP Jakarta Selatan terpusat tanpa irisan area terlarang Tangerang Selatan pinggiran." },
                    { q: "Paket virtual manakah yang mendukung penggunaan nama PT saya langsung oleh operator gedung?", a: "Diresmikan via kategori Call Dedicated tambahan opsional di lini paket prestisius. Operator berdedikasi merespons dering masuk seketika dengan sapaan verbal nama Perseroan Anda yang tercatat agar menimbulkan pesona eksklusif mutlak saat partner relasi menekan nomor lokal itu harian." },
                    { q: "Pilihan kontrak tersedia rentang berapa lama?", a: "Standarisasi demi komitmen perundang-undangan OSS (Online Single Submission) mewajibkan ikatan hukum minimal durasi dua belas bulan agar diakui kokoh instansi pengawasan penanaman perizinan nasional yang anti-fiktif harian bodong." }
                ]
            }}
            internalLinks={{
                intro: { label: "Survei Besaran Harga", href: "/harga-virtual-office-jakarta-selatan" },
                mid: { label: "Baca Panduan Legal KPP", href: "/virtual-office/alamat-bisnis-jakarta-selatan" },
                closing: { label: "Koordinasi Legalitas Perdana", href: waUrlClosing }
            }}
        />
    )
}

