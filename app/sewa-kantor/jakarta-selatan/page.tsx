import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'
import { buildWhatsAppLink } from '@/lib/tracking/cta'

const waUrlInline = buildWhatsAppLink({ text: 'Halo BBC, saya ingin konsultasi sewa kantor Jakarta Selatan.', service: 'office', cta: 'mid', intent: 'consultation', phone: '628128888069' })
const waUrlClosing = buildWhatsAppLink({ text: 'Halo BBC, saya ingin konsultasi sewa kantor Jakarta Selatan.', service: 'office', cta: 'final', intent: 'consultation', phone: '628128888069' })

const title = 'Sewa Kantor Jakarta Selatan: Lokasi, Akses, dan Kesesuaian Bisnis'
const description = 'Panduan komprehensif sewa kantor di Jakarta Selatan. Temukan alasan mengapa domisili DKI Jakarta vital untuk perizinan NIB dan pengurusan pajak bisnis Anda.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/sewa-kantor/jakarta-selatan' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/sewa-kantor/jakarta-selatan',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/sewa-kantor/ruangan-kantor-utama.jpg' }]
    }
}

export default function Page() {
    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor/jakarta-selatan/#webpage",
                "url": "https://www.bintarobusinesscentre.com/sewa-kantor/jakarta-selatan",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor/jakarta-selatan/#article",
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
                        "name": "Apakah seluruh kawasan Bintaro masuk Jakarta Selatan?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Tidak. Kawasan Bintaro terbagi antara Jakarta Selatan (Pesanggrahan) dan Tangerang Selatan. Pastikan konfirmasi kecamatan administratif sebelum memilih lokasi."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah alamat di wilayah ini sah untuk NIB dan NPWP perusahaan?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ya, lokasi fisik yang secara administratif berada di bawah yurisdiksi Jakarta Selatan (DKI Jakarta) mutlak valid dan sesuai standar DPMPTSP."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Selain legalitas, apa keuntungan berdomisili di wilayah ini?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Anda mendapatkan gengsi korporat, kedekatan logistik pada klien, dan perluasan sumber daya talenta muda (Gen-Z) yang senang dengan wilayah premium."
                        }
                    }
                ]
            }
        ]
    }

    return (
        <WeaponPageTemplate
            url="/sewa-kantor/jakarta-selatan"
            title={title}
            description={description}
            canonicalUrl="https://www.bintarobusinesscentre.com/sewa-kantor/jakarta-selatan"
            schemaObject={schemaObject}
            h1="Sewa Kantor Jakarta Selatan: Lokasi, Akses, dan Kesesuaian Bisnis"
            intro='Jakarta Selatan adalah salah satu wilayah administratif DKI Jakarta yang paling aktif sebagai pusat operasional bisnis di luar kawasan CBD inti. Bintaro Business Centre menyediakan <a href="/sewa-kantor" class="text-accent font-bold hover:underline">sewa kantor Jakarta Selatan</a> di Pesanggrahan yang berada sepenuhnya dalam yurisdiksi administratif DKI Jakarta dengan akses langsung ke JORR W2S.'
            entity="sewa-kantor"
            location="jakarta-selatan"
            heroBadges={{ b1: "Geographic Authority", b2: "Business Relevance" }}
            sections={[
                {
                    id: "problem",
                    h2: "Mengapa Jakarta Selatan Menjadi Pusat Bisnis Strategis",
                    rawHtml: `
                        <p>Jakarta Selatan menawarkan keseimbangan antara aksesibilitas, ekosistem bisnis, dan status administratif yang tidak dimiliki oleh semua kawasan di sekitar Jakarta. Berbeda dengan kawasan penyangga seperti Tangerang Selatan atau Depok yang secara geografis berdekatan, Jakarta Selatan berada sepenuhnya dalam yurisdiksi DKI Jakarta — yang memiliki implikasi langsung pada proses perizinan usaha.</p>
                        <p>Perusahaan yang memilih domisili di Jakarta Selatan mendapatkan alamat administratif DKI yang memudahkan pengurusan NIB, NPWP perusahaan, dan berbagai izin operasional lainnya. Ini menjadi pertimbangan penting terutama bagi perusahaan baru yang sedang membangun struktur legal usahanya.</p>
                        <p>Lokasi kantor berpengaruh langsung pada jam operasional — jarak ke klien utama dan konektivitas. Kawasan seperti Pesanggrahan menawarkan posisi menguntungkan: cukup dekat ke pusat untuk akses mitra bisnis, namun jauh dari kepadatan CBD ekstrem.</p>
                    `
                },
                {
                    id: "education",
                    h2: "Konektivitas dan Mobilitas Tim Harian",
                    rawHtml: `
                        <h3>Terkoneksi Jaringan Jalan Tol Utama</h3>
                        <p>Pilihan strategis untuk operasional sangat dipengaruhi oleh kelancaran logistik udara dan luar kota. Sebuah <a href="/kantor-dekat-tol-veteran" class="text-accent hover:underline">kantor dekat Tol Veteran</a> secara instan mendapat akses JORR W2S untuk menghubungkan lini kendaraan suplai.</p>

                        <h3>Mobilitas Lintas Wilayah Jakarta-Banten</h3>
                        <p>Bagi perusahaan di sektor distribusi laut, otomotif perakitan, konstruksi perumahan, atau layanan jasa terstruktur — memosisikan diri di persimpangan ini, termasuk <a href="/kantor-dekat-bintaro-jaya" class="text-accent hover:underline">area Bintaro Jaya</a>, memudahkan rekrutmen staff pinggir kota.</p>

                        <h3>Lingkungan Profesional Menunjang Image</h3>
                        <p>Sebuah kantor di yurisdiksi unggulan menumbuhkan impresi bonafide saat pendaftaran tender korporasi besar atau pengajuan proyek BUMN.</p>
                    `
                },
                {
                    id: "authority",
                    h2: "Jenis Ruang Kerja yang Tersedia di Jakarta Selatan",
                    rawHtml: `
                        <p>Jakarta Selatan menawarkan beragam pilihan ruang kantor yang dapat disesuaikan dengan fase pertumbuhan dan investasi awal perusahaan.</p>
                    `,
                    visual: {
                        type: "card",
                        items: [
                            { title: "Serviced Office — ruang fully furnished dengan layanan utilitas dan resepsionis terpusat.", icon: "Building2" },
                            { title: "Kantor Konvensional — ruang kosong mentah untuk konfigurasi lay-out arsitektur perusahan Anda secara mandiri.", icon: "Layers" },
                            { title: "Virtual Office — alamat domisili absah legal yang dirancang untuk pendirian izin NIB PT dari rumah.", icon: "MapPin" },
                            { title: "Fleksibilitas skalabilitas memungkinkan upgrade dari alamat virtual menjadi kantor kompartemen tertata.", icon: "CheckSquare" }
                        ]
                    }
                },
                {
                    id: "value",
                    h2: "Variabel Kunci Memilih Alamat di Jakarta Selatan",
                    visual: {
                        type: "card",
                        items: [
                            { title: "Yurisdiksi Spesifik", desc: "Pemilihan alamat mutlak harus di koridor DKI, bukan wilayah pinggiran Tangerang Selatan yang memblokir NPWP pendaftaran ganda.", icon: "Map" },
                            { title: "Akses Klien", desc: "Lokasi yang memangkas biaya transportasi logis untuk kunjungan tim pemasaran dari pusat perkantoran Sudirman.", icon: "Target" },
                            { title: "Fleksibilitas Kontrak", desc: "Sewa ruang modern menyediakan klausul fleksibel guna akomodasi pertumbuhan skala SDM di semester depan.", icon: "ShieldCheck" },
                            { title: "Infrastruktur", desc: "Dikelilingi perbankan, vendor penunjang surat-menyurat, serta fasilitas ritel dan F&B untuk kesejahteraan produktivitas tim. Banyak tim memilih <a href=\"/sewa-kantor\" class=\"text-accent hover:underline\">solusi kantor all-inclusive</a> untuk menjaga biaya tetap terukur.", icon: "Zap" }
                        ]
                    }
                },
                {
                    id: "options",
                    h2: "Kategori Solusi Ruang Kerja di Bintaro Business Centre",
                    rawHtml: `
                        <p>Fleksibilitas model usaha yang disesuaikan arus kas.</p>

                        <h3>Service Office Eksklusif</h3>
                        <p>Unit terisolasi, AC, dan furnitur privat bagi tim yang siap tempur tanpa ribet instalasi harian. Ini relevan bila Anda mencari <a href="/sewa-kantor/bintaro" class="text-accent hover:underline">kantor siap pakai di Bintaro</a> untuk operasional cepat.</p>
                        <p><strong>Cocok Untuk</strong><br/>Vendor logistik, trader alat berat, distributor berskala yang perlu kantor cabang sentral.</p>
                        <ul>
                            <li>Verifikasi Legalitas Cepat</li>
                            <li>Resepsionis Profesional</li>
                        </ul>

                        <h3>Virtual Office Premium</h3>
                        <p>Domisili bonafide untuk legalitas operasional akta pendirian, menekan pengeluaran infrastruktur hingga 80%.</p>
                        <p><strong>Cocok Untuk</strong><br/>Startup software, studio kreatif, firma hukum dan penyedia lini jasa (KBLI Jasa).</p>
                        <ul>
                            <li>Notifikasi Mail Handling</li>
                            <li>Akses Ruang Eksekutif Meeting</li>
                        </ul>
                    `
                },
                {
                    id: "related",
                    h2: "ARTIKEL TERKAIT KONEKTIVITAS KAMI",
                    rawHtml: `
                        <ul>
                            <li><a href="/sewa-kantor/murah-jakarta-selatan">Sewa Kantor Murah di Jakarta Selatan</a></li>
                        </ul>
                    `
                },
                {
                    id: "cta",
                    h2: "Selesai Berkelana, Waktunya Mengambil Resolusi Operasional",
                    rawHtml: `
                        <p>Keputusan lokasi kantor sebaiknya didasarkan pada pola pergerakan logistik modern dan proteksi yurisdiksi. Dapatkan efisiensi dan fasilitas kelas wahid, lalu lihat paket sewa kantor kami untuk memetakan kebutuhan tim.</p>
                        <p><a href="${waUrlInline}">Tanya Tim Konsultan Eksekutif</a> | <a href="/harga-sewa-kantor-bintaro">Lihat Daftar Tarif Sewa</a></p>
                    `
                }
            ]}
            faq={{
                title: "Pertanyaan Seputar Legalitas Domisili Bisnis Wilayah Selatan",
                items: [
                    { q: "Apakah kawasan Pesanggrahan termasuk ke dalam Jakarta Selatan?", a: "Ya, Pesanggrahan dan sebagian jalan RC Veteran berada penuh pada yurisdiksi Jakarta Selatan, menjadikannya kunci pembuka status kewilayahan DKI." },
                    { q: "Berapa jarak dari kantor ini untuk mencapai bandara Soekarno-Hatta?", a: "Melalui koridor Pintu Tol Veteran (JORR W2S Utara), Anda hanya butuh sekitar 20-30 menit dalam kondisi lalu lintas wajar menuju bandara antar-nusa." },
                    { q: "Apakah Bintaro Business Centre menangani proses pendirian perusahaan dari nol?", a: "Ya, Anda berhak menikmati fasilitas pengurusan inkubasi PT/CV hingga tuntas sebagai wujud support relasional layanan kami." }
                ]
            }}
            internalLinks={{
                intro: { label: "Cek Harga", href: "/harga-sewa-kantor-bintaro" },
                mid: { label: "Jelajahi Solusi", href: "/sewa-kantor/kantor-siap-pakai-bintaro" },
                closing: { label: "Tanya Tim Konsultan Eksekutif", href: waUrlClosing }
            }}
        />
    )
}
