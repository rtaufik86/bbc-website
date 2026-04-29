import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'
import { buildWhatsAppLink } from '@/lib/tracking/cta'

const waUrlClosing = buildWhatsAppLink({ text: 'Halo BBC, saya ingin survei kantor siap pakai Bintaro.', service: 'office', cta: 'final', intent: 'survey', phone: '628128888069' })

const title = 'Sewa Kantor Siap Pakai Bintaro: Apa yang Termasuk dalam Paket'
const description = 'Panduan apa yang biasanya termasuk dalam paket kantor siap pakai di Bintaro, faktor evaluasi sebelum memilih, dan kapan model ini relevan untuk bisnis Anda.'

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
                        "name": "Apa yang biasanya termasuk dalam paket kantor siap pakai?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Cakupan paket bervariasi antar penyedia. Sebagian umumnya menyertakan ruang fisik, akses ke fasilitas umum gedung, dan konfigurasi furnitur dasar. Layanan tambahan seperti ruang meeting eksklusif, internet dedicated, atau dukungan IT perlu dikonfirmasi langsung per unit dan per durasi sewa."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah alamat kantor siap pakai bisa langsung dipakai untuk pengurusan NIB atau PKP?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Penggunaan alamat untuk dokumen legal seperti NIB, NPWP, atau PKP perlu dikonfirmasi sesuai jenis usaha, dokumen pendukung, dan ketentuan instansi terkait. Tidak ada jaminan otomatis bahwa satu alamat akan diterima untuk semua kategori KBLI."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Berapa lama proses dari kontrak sampai bisa mulai bekerja?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Untuk kantor siap pakai dalam kondisi unit sudah tersedia dan dokumen lengkap, jangka waktu setup biasanya lebih singkat dibandingkan ruang kosong yang masih perlu renovasi. Estimasi pasti perlu dikonfirmasi berdasarkan tipe unit, kebutuhan tim, dan ketentuan kontrak."
                        }
                    }
                ]
            }
        ]
    }

    return (
        <WeaponPageTemplate
            url="/sewa-kantor/kantor-siap-pakai-bintaro"
            title={title}
            description={description}
            canonicalUrl="https://www.bintarobusinesscentre.com/sewa-kantor/kantor-siap-pakai-bintaro"
            schemaObject={schemaObject}
            h1="Sewa Kantor Siap Pakai Bintaro: Apa yang Termasuk dalam Paket"
            intro="Kantor siap pakai &mdash; atau serviced office &mdash; adalah model sewa ruang kerja yang menggabungkan ruang fisik dengan sebagian fasilitas operasional dasar dalam satu paket. Halaman ini membahas apa yang biasanya termasuk dalam paket di kawasan Bintaro, faktor yang perlu Anda evaluasi sebelum memilih, dan kapan model ini relevan untuk kebutuhan bisnis Anda."
            entity="sewa-kantor"
            location="bintaro"
            heroBadges={{ b1: "Serviced Office", b2: "Plug & Play" }}
            sections={[
                {
                    id: "problem",
                    h2: "Apa Itu Kantor Siap Pakai dan Apa yang Biasanya Termasuk",
                    rawHtml: `
                        <p>Kantor siap pakai (sering juga disebut serviced office) adalah model penyewaan ruang kerja di mana sebagian besar persiapan operasional sudah disediakan oleh penyedia, sehingga penyewa dapat mulai bekerja relatif lebih cepat dibandingkan menyewa ruang kosong yang masih perlu dirombak.</p>
                        <p>Yang biasanya termasuk dalam paket bervariasi antar penyedia dan antar tipe unit. Beberapa paket bisa mencakup ruang fisik, akses ke fasilitas umum gedung, dan konfigurasi furnitur dasar. Namun cakupan fasilitas perlu dikonfirmasi berdasarkan unit, kapasitas, dan durasi sewa &mdash; tidak semua paket otomatis menyertakan layanan IT khusus, ruang meeting eksklusif, atau pantry pribadi.</p>
                        <p>Karena itu, ketika menilai sebuah penawaran, langkah pertama bukanlah membandingkan harga akhir, melainkan memetakan apa yang sesungguhnya termasuk: ruang fisik saja, atau ruang plus fasilitas pendukung. Dua paket dengan harga sama bisa memiliki cakupan yang sangat berbeda.</p>
                    `
                },
                {
                    id: "education",
                    h2: "Mengapa Kantor Siap Pakai Relevan untuk Bisnis di Bintaro",
                    rawHtml: `
                        <p>Bintaro adalah kawasan komersial dan residensial di Jakarta Selatan yang berkembang pesat selama beberapa dekade terakhir. Akses ke kawasan ini didukung oleh Jalan RC Veteran serta Pintu Tol Veteran yang terhubung ke jaringan JORR W2S, menjadikannya titik temu antara Tangerang Selatan, Pondok Indah, dan koridor Jakarta Selatan.</p>
                        <p>Bagi bisnis yang membutuhkan ruang fisik tetapi belum siap menanggung biaya renovasi dan instalasi awal, kantor siap pakai di kawasan Bintaro menjadi pertimbangan praktis. Anda mendapat alamat di area Pesanggrahan, Jakarta Selatan, dengan kesiapan operasional yang lebih cepat dibandingkan menyewa ruko atau ruang kosong yang masih harus disetting dari nol.</p>
                        <p>Untuk konteks pilihan tipe unit dan kapasitas yang tersedia di kawasan yang sama, Anda dapat menelaah <a href="/sewa-kantor/bintaro" class="text-accent hover:underline">opsi sewa kantor di Bintaro</a> sebagai perbandingan ringkas.</p>
                    `
                },
                {
                    id: "authority",
                    h2: "Faktor yang Perlu Dipertimbangkan Sebelum Memilih Paket",
                    rawHtml: `
                        <p>Sebelum memilih sebuah paket kantor siap pakai, ada beberapa pertimbangan struktural yang perlu disesuaikan dengan profil bisnis Anda. Penilaian yang teliti di tahap awal cenderung mengurangi friksi operasional di bulan-bulan pertama.</p>
                    `,
                    visual: {
                        type: "card",
                        items: [
                            { title: "Durasi & Komitmen", desc: "Periksa minimum durasi kontrak, opsi perpanjangan, dan ketentuan keluar dini agar tidak terkunci pada penalti yang tidak perlu.", icon: "Calendar" },
                            { title: "Kapasitas Tim", desc: "Sesuaikan ukuran unit dengan jumlah staf saat ini dan proyeksi 6&ndash;12 bulan ke depan, termasuk kebutuhan ekspansi modular.", icon: "Users" },
                            { title: "Cakupan Fasilitas", desc: "Konfirmasi secara eksplisit mana yang sudah termasuk dalam paket dan mana yang menjadi biaya tambahan, terutama untuk listrik, internet, dan ruang meeting.", icon: "CheckSquare" },
                            { title: "Akses Lokasi", desc: "Pertimbangkan jarak ke tol, transportasi umum, dan kebutuhan klien yang akan datang berkunjung secara reguler.", icon: "MapPin" }
                        ]
                    }
                },
                {
                    id: "value",
                    h2: "Kantor Siap Pakai BBC di Bintaro: Konteks Layanan",
                    rawHtml: `
                        <p>Bintaro Business Centre (BBC) berlokasi di Jl. RC Veteran No. 1-i, Pesanggrahan, Jakarta Selatan, dengan akses ke kawasan RC Veteran dan Pintu Tol Veteran yang terhubung ke jaringan JORR W2S. BBC telah beroperasi sejak 2007 dan saat ini melayani lebih dari 1.800 perusahaan dari berbagai kategori usaha.</p>
                        <p>Untuk kategori kantor siap pakai, BBC menyediakan beberapa tipe unit dengan kapasitas yang berbeda. Cakupan fasilitas pendukung yang dapat disesuaikan dengan kebutuhan penyewa &mdash; konfigurasi furnitur, durasi sewa, dan akses ke ruang umum gedung perlu dikonfirmasi per unit dan per paket. Tim BBC bersedia membantu pemetaan kebutuhan sebelum komitmen kontrak ditandatangani.</p>
                        <p>Untuk konteks pilihan dalam silo Jakarta Selatan secara lebih luas, Anda dapat melihat <a href="/sewa-kantor/jakarta-selatan" class="text-accent hover:underline">struktur layanan sewa kantor di Jakarta Selatan</a> sebagai pembanding skala wilayah.</p>
                    `
                },
                {
                    id: "options",
                    h2: "Kapan Kantor Siap Pakai Adalah Pilihan yang Tepat",
                    rawHtml: `
                        <p>Tidak setiap bisnis memerlukan kantor siap pakai. Model ini cenderung relevan ketika beberapa kondisi berikut terpenuhi.</p>

                        <h3>Bisnis Membutuhkan Ruang Fisik Sehari-hari</h3>
                        <p>Tim Anda perlu hadir secara fisik secara rutin &mdash; baik karena karakter pekerjaan, kebutuhan koordinasi internal, atau persyaratan klien. Dalam kondisi ini, ruang fisik berfungsi sebagai pusat operasional, bukan sekadar alamat administratif.</p>

                        <h3>Onboarding Operasional Perlu Cepat</h3>
                        <p>Anda tidak memiliki waktu atau kapasitas untuk merancang renovasi sendiri, memesan furnitur custom, dan mengurus instalasi utilitas dari awal. Paket siap pakai memindahkan beban setup dari tim Anda ke pengelola gedung, sehingga bisnis dapat fokus pada aktivitas inti.</p>

                        <h3>Kategori Usaha dengan Kebutuhan Kehadiran Fisik</h3>
                        <p>Untuk sebagian KBLI &mdash; terutama di sektor perdagangan, distribusi barang, dan layanan yang memerlukan inspeksi lapangan &mdash; kehadiran fisik di alamat usaha umumnya lebih kuat dibandingkan model virtual office. Namun penerimaan formal dari instansi seperti OSS, KPP, atau pengajuan PKP perlu dikonfirmasi sesuai jenis usaha, dokumen pendukung, dan ketentuan instansi terkait.</p>
                    `
                },
                {
                    id: "related",
                    h2: "Kapan Perlu Mempertimbangkan Alternatif",
                    rawHtml: `
                        <p>Tidak setiap bisnis butuh ruang fisik. Untuk kebutuhan yang lebih ringan secara operasional &mdash; misalnya tim remote atau bisnis jasa awal yang belum memerlukan kehadiran harian &mdash; <a href="/virtual-office/jakarta-selatan" class="text-accent hover:underline">layanan virtual office di Jakarta Selatan</a> bisa menjadi alternatif yang lebih efisien dari sisi biaya.</p>
                        <p>Pertimbangan kunci adalah kategori KBLI dan kebutuhan inspeksi fisik. KBLI di sektor perdagangan biasanya menuntut kehadiran fisik yang lebih kuat dibandingkan KBLI jasa. Untuk pengurusan PKP, NIB, atau verifikasi domisili oleh KPP, persyaratan dapat berbeda antar jenis usaha &mdash; tidak ada jaminan otomatis bahwa satu model alamat akan diterima untuk semua kategori usaha. Konsultasi dengan instansi terkait atau konsultan legal sebelum memutuskan tetap disarankan.</p>
                    `
                },
                {
                    id: "cta",
                    h2: "Memetakan Kebutuhan Sebelum Memilih",
                    rawHtml: `
                        <p>Jika Anda sedang mempertimbangkan ruang kerja fisik di Bintaro, tim BBC dapat membantu mengevaluasi apakah kantor siap pakai, sewa kantor reguler, atau virtual office lebih sesuai dengan kebutuhan operasional dan legalitas bisnis Anda.</p>
                    `
                }
            ]}
            faq={{
                title: "Pertanyaan yang Sering Diajukan",
                items: [
                    { q: "Apa yang biasanya termasuk dalam paket kantor siap pakai?", a: "Cakupan paket bervariasi antar penyedia. Sebagian umumnya menyertakan ruang fisik, akses ke fasilitas umum gedung, dan konfigurasi furnitur dasar. Layanan tambahan seperti ruang meeting eksklusif, internet dedicated, atau dukungan IT perlu dikonfirmasi langsung per unit dan per durasi sewa." },
                    { q: "Apakah alamat kantor siap pakai bisa langsung dipakai untuk pengurusan NIB atau PKP?", a: "Penggunaan alamat untuk dokumen legal seperti NIB, NPWP, atau PKP perlu dikonfirmasi sesuai jenis usaha, dokumen pendukung, dan ketentuan instansi terkait. Tidak ada jaminan otomatis bahwa satu alamat akan diterima untuk semua kategori KBLI." },
                    { q: "Berapa lama proses dari kontrak sampai bisa mulai bekerja?", a: "Untuk kantor siap pakai dalam kondisi unit sudah tersedia dan dokumen lengkap, jangka waktu setup biasanya lebih singkat dibandingkan ruang kosong yang masih perlu renovasi. Estimasi pasti perlu dikonfirmasi berdasarkan tipe unit, kebutuhan tim, dan ketentuan kontrak." }
                ]
            }}
            internalLinks={{
                intro: { label: "Analisis Biaya", href: "/harga-sewa-kantor-bintaro" },
                mid: { label: "Tinjau Alamat Bisnis", href: "/virtual-office/alamat-bisnis-jakarta-selatan" },
                closing: { label: "Survei Langsung", href: waUrlClosing }
            }}
        />
    )
}
