import { Metadata } from 'next'
import WeaponPageTemplateV2 from '@/components/templates/WeaponPageTemplateV2'

const title = 'Kantor Dekat Bintaro Jaya untuk Akses Bisnis Jakarta Selatan'
const description = 'Panduan memilih kantor dekat Bintaro Jaya dengan alamat administratif Jakarta Selatan, akses Pintu Tol Veteran, fasilitas service office, dan kebutuhan survey.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/foto-gedung-bbc.jpg' }]
    }
}

export default function Page() {
    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya/#webpage",
                "url": "https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya/#article",
                "headline": title,
                "description": description,
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            }
        ]
    }

    return (
        <WeaponPageTemplateV2
            url="/kantor-dekat-bintaro-jaya"
            title={title}
            description={description}
            canonicalUrl="https://www.bintarobusinesscentre.com/kantor-dekat-bintaro-jaya"
            schemaObject={schemaObject}
            h1="Kantor Dekat Bintaro Jaya untuk Akses Bisnis Jakarta Selatan"
            intro='Kantor Dekat Bintaro Jaya dapat menjadi pertimbangan bagi pemilik usaha yang beraktivitas di sekitar Bintaro Jaya, Pondok Indah, Rempoa, atau Tanah Kusir, tetapi tetap membutuhkan alamat administratif DKI Jakarta. Bintaro Business Centre berlokasi di Pesanggrahan, Jakarta Selatan — bukan bagian dari kawasan Bintaro Jaya — dengan akses melalui Pintu Tol Veteran dan RC Veteran Raya. BBC menyediakan <a href="/sewa-kantor" class="text-accent font-bold hover:underline">layanan sewa kantor BBC</a> berupa service office siap pakai dengan fasilitas yang mendukung operasional langsung.'
            entity="sewa-kantor"
            location="jakarta-selatan"
            heroChips={[
                { label: "Koridor Bintaro", type: "location" },
                { label: "Pesanggrahan", type: "location" },
                { label: "Service Office", type: "service" }
            ]}
            heroVisual={{
                eyebrow: "Kedekatan Area & Koridor Bisnis",
                title: "Dekat koridor Bintaro Jaya, tetap beralamat Jakarta Selatan.",
                description: "BBC berada di Pesanggrahan, Jakarta Selatan, dekat koridor Bintaro Jaya dan akses Pintu Tol Veteran.",
                featureChips: [
                    { label: "Koridor Bintaro" },
                    { label: "Pintu Tol Veteran" },
                    { label: "Alamat Jaksel" }
                ]
            }}
            keyTakeaways={[
                "BBC berlokasi di Pesanggrahan, Jakarta Selatan, dekat koridor Bintaro Jaya, tetapi bukan bagian dari kawasan Bintaro Jaya.",
                "Akses melalui Pintu Tol Veteran dan RC Veteran Raya menjadi pertimbangan praktis bagi owner, tim, dan tamu bisnis.",
                "Alamat administratif Jakarta Selatan relevan untuk perusahaan yang membedakan kebutuhan akses kawasan dengan kebutuhan alamat DKI Jakarta.",
                "Survey langsung membantu memverifikasi akses, fasilitas, parkir, dan kondisi ruang kantor."
            ]}
            trustSignals={{
                years: "Beroperasi sejak 2007",
                companies: "72 unit kantor",
                finalLocation: "Pesanggrahan, Jakarta Selatan"
            }}
            sections={[
                {
                    id: "ringkasan",
                    h2: "Ringkasan Cepat",
                    rawHtml: `
                        <ul>
                            <li><strong>Layanan:</strong> Sewa kantor / service office siap pakai</li>
                            <li><strong>Lokasi:</strong> Jl. RC. Veteran No. 1-i, Pesanggrahan, Jakarta Selatan</li>
                            <li><strong>Area terdekat:</strong> Bintaro Jaya, Pondok Indah, Rempoa, Tanah Kusir</li>
                            <li><strong>Cocok untuk:</strong> Pemilik usaha, tim kecil, perusahaan cabang, konsultan yang membutuhkan kantor dekat koridor Bintaro Jaya dengan alamat Jakarta Selatan</li>
                            <li><strong>Aksi utama:</strong> Verifikasi akses dan fasilitas melalui survey kantor langsung</li>
                        </ul>
                    `
                },
                {
                    id: "peta-kebutuhan",
                    h2: "Tiga Pertimbangan Lokasi",
                    rawHtml: `
                        <p>Pemilihan kantor dekat Bintaro Jaya perlu menimbang kedekatan area, akses tol, dan kebutuhan alamat administratif Jakarta Selatan secara bersamaan.</p>
                    `,
                    visual: {
                        type: "card",
                        items: [
                            { title: "Dekat koridor Bintaro Jaya", desc: "Relevan bagi owner, tim, atau klien yang beraktivitas di Bintaro Jaya, Rempoa, Pondok Indah, dan Tanah Kusir.", icon: "MapPin" },
                            { title: "Akses Pintu Tol Veteran", desc: "Pintu Tol Veteran dan RC Veteran Raya menjadi jalur akses penting dari koridor Bintaro menuju Jakarta dan sekitarnya.", icon: "Target" },
                            { title: "Alamat administratif Jakarta Selatan", desc: "BBC berada di Kelurahan Bintaro, Kecamatan Pesanggrahan, Jakarta Selatan.", icon: "Building2" }
                        ]
                    }
                },
                {
                    id: "alasan",
                    h2: "Mengapa Banyak Pemilik Usaha Mencari Kantor Dekat Bintaro Jaya?",
                    rawHtml: `
                        <p>Banyak pemilik usaha mencari kantor dekat Bintaro Jaya karena koridor ini merupakan kawasan hunian dan bisnis yang padat di selatan Jakarta. Beberapa alasan yang umum mendorong pencarian ini:</p>
                        <ul>
                            <li><strong>Kedekatan dengan tempat tinggal</strong> — Pemilik usaha yang tinggal di Bintaro Jaya, Rempoa, atau Tanah Kusir ingin mengurangi waktu tempuh ke kantor</li>
                            <li><strong>Kemudahan akses tim</strong> — Karyawan dan staf yang beraktivitas di koridor Bintaro dapat menjangkau kantor dengan lebih efisien</li>
                            <li><strong>Koneksi ke klien dan mitra bisnis</strong> — Banyak klien dan mitra usaha yang berdomisili atau berkegiatan di kawasan Bintaro Jaya dan Pondok Indah</li>
                            <li><strong>Akses tol</strong> — Pintu Tol Veteran menjadi salah satu akses penting dari koridor Bintaro menuju wilayah Jakarta dan sekitarnya</li>
                            <li><strong>Kebutuhan alamat Jakarta Selatan</strong> — Beberapa bisnis memerlukan alamat administratif DKI Jakarta meskipun pemiliknya berbasis di sekitar Bintaro Jaya</li>
                        </ul>
                        <p>Faktor-faktor ini membuat lokasi di Jakarta Selatan dekat Bintaro Jaya menjadi pertimbangan praktis bagi banyak pelaku usaha di kawasan tersebut.</p>
                    `
                },
                {
                    id: "posisi-bbc",
                    h2: "Posisi BBC: Berlokasi di Jakarta Selatan, Dekat Bintaro Jaya",
                    rawHtml: `
                        <p>Bintaro Business Centre berlokasi di Jl. RC. Veteran No. 1-i, Pesanggrahan, Jakarta Selatan — bukan berada di dalam kawasan Bintaro Jaya. Perbedaan ini penting untuk dipahami dari sisi administratif.</p>
                        <p>BBC berada di Kelurahan Bintaro, Kecamatan Pesanggrahan, Jakarta Selatan, yang berbatasan dengan koridor kawasan Bintaro Jaya. Meskipun bukan bagian dari kawasan Bintaro Jaya secara administratif, lokasinya memungkinkan akses dari koridor Bintaro Jaya, Rempoa, Tanah Kusir, dan Pondok Indah melalui jalur RC Veteran Raya dan Pintu Tol Veteran.</p>
                    `
                },
                {
                    id: "akses",
                    h2: "Akses melalui Pintu Tol Veteran dan RC Veteran Raya",
                    rawHtml: `
                        <p>Akses ke Bintaro Business Centre dari koridor Bintaro Jaya dan sekitarnya dapat dilakukan melalui Pintu Tol Veteran dan Jalan RC Veteran Raya. Jalur ini menjadi salah satu pertimbangan praktis bagi pemilik usaha dan tim yang beraktivitas di kawasan selatan Jakarta.</p>
                        <p>Manfaat akses melalui jalur ini:</p>
                        <ul>
                            <li><strong>Bagi pemilik usaha</strong> — Perjalanan dari Bintaro Jaya atau Tanah Kusir dapat menggunakan jalur RC Veteran Raya tanpa harus masuk ke pusat kota</li>
                            <li><strong>Bagi tim dan karyawan</strong> — Karyawan yang tinggal di sekitar Bintaro atau Rempoa dapat menjangkau kantor melalui jalur yang familiar</li>
                            <li><strong>Bagi klien dan tamu bisnis</strong> — Akses dari Tol Veteran memudahkan pertemuan bisnis tanpa navigasi yang rumit</li>
                            <li><strong>Untuk survey kantor</strong> — Calon penyewa dapat mengunjungi lokasi dan memverifikasi akses secara langsung sebelum kontrak</li>
                        </ul>
                        <p>Untuk informasi lebih lengkap tentang akses melalui koridor tol, lihat: <a href="/kantor-dekat-tol-veteran" class="text-accent font-bold hover:underline">kantor dekat Pintu Tol Veteran</a>.</p>
                    `
                },
                {
                    id: "area-sekitar",
                    h2: "Area Sekitar yang Relevan: Pondok Indah, Rempoa, dan Tanah Kusir",
                    rawHtml: `
                        <p>Beberapa kawasan di sekitar BBC yang sering menjadi titik asal bagi pengguna kantor di lokasi Pesanggrahan Jakarta Selatan:</p>
                        <p><strong>Bintaro Jaya:</strong> Kawasan hunian dan komersial yang berbatasan dengan Pesanggrahan. Pemilik usaha yang berbasis di Bintaro Jaya dapat menjangkau BBC melalui jalur RC Veteran Raya.</p>
                        <p><strong>Pondok Indah:</strong> Kawasan bisnis dan hunian premium di Jakarta Selatan. Aksesnya ke Pesanggrahan dapat dilakukan melalui jalur Fatmawati atau RC Veteran, tergantung titik keberangkatan.</p>
                        <p><strong>Rempoa:</strong> Kawasan hunian yang berada di antara Bintaro Jaya dan Pesanggrahan. Pemilik usaha dan karyawan yang tinggal di Rempoa memiliki kedekatan geografis langsung ke lokasi BBC.</p>
                        <p><strong>Tanah Kusir:</strong> Area yang berlokasi di koridor antara Kebayoran Lama dan Pesanggrahan. Akses ke BBC dari Tanah Kusir dapat dilakukan melalui RC Veteran Raya.</p>
                        <p>Pengguna dari area-area ini sebaiknya memverifikasi akses secara langsung saat survey kantor, karena kondisi lalu lintas dan jalur dapat berbeda berdasarkan waktu dan titik keberangkatan.</p>
                    `
                },
                {
                    id: "kantor-siap-pakai",
                    h2: "Kantor Siap Pakai untuk Perusahaan yang Butuh Operasional Langsung",
                    rawHtml: `
                        <p>Bintaro Business Centre menyediakan service office — kantor siap pakai — yang dirancang untuk perusahaan yang membutuhkan ruang kerja operasional tanpa setup dari nol. Fasilitas yang mendukung operasional langsung:</p>
                        <ul>
                            <li>Furniture lengkap (meja, kursi kerja, lemari penyimpanan)</li>
                            <li>Internet</li>
                            <li>Air conditioning</li>
                            <li>Listrik dan utilitas</li>
                            <li>Layanan kebersihan</li>
                            <li>Resepsionis untuk penerima tamu dan penanganan korespondensi</li>
                            <li>Mail handling</li>
                            <li>Akses meeting room sesuai paket atau ketentuan sewa</li>
                            <li>Parkir selama jam operasional</li>
                            <li>Fasilitas gedung: lift, mushola, ruang tunggu</li>
                        </ul>
                        <p>Gedung BBC memiliki luas bangunan 1.600 m² dengan 4 lantai dan 72 unit kantor, beroperasi sejak 2007 di bawah pengelolaan PT. Ganesha Dwipaya Bhakti.</p>
                    `
                },
                {
                    id: "jakarta-selatan",
                    h2: "Mengapa Alamat Administratif Jakarta Selatan Tetap Penting?",
                    rawHtml: `
                        <p>Bintaro Jaya sebagai kawasan kota mandiri umumnya dikenal berada di Tangerang Selatan, sementara Bintaro Business Centre berada di Kelurahan Bintaro, Kecamatan Pesanggrahan, Jakarta Selatan. Perbedaan ini penting bagi perusahaan yang membedakan kebutuhan akses kawasan Bintaro Jaya dengan kebutuhan alamat administratif DKI Jakarta.</p>
                        <p>Bagi perusahaan yang membutuhkan alamat Jakarta Selatan — untuk keperluan domisili perusahaan, NIB, NPWP, atau korespondensi dengan instansi DKI Jakarta — perbedaan yurisdiksi ini relevan.</p>
                        <p>Untuk konteks layanan kantor fisik dengan alamat administratif Jakarta Selatan, lihat: <a href="/sewa-kantor/jakarta-selatan" class="text-accent font-bold hover:underline">sewa kantor Jakarta Selatan</a>.</p>
                    `
                },
                {
                    id: "tabel-pertimbangan",
                    h2: "Pertimbangan Memilih Kantor Dekat Bintaro Jaya",
                    rawHtml: `
                        <p>Survey kantor sebaiknya dilakukan ketika ada beberapa hal konkret yang perlu diverifikasi secara langsung sebelum memutuskan sewa.</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Pertimbangan</th>
                                    <th>Mengapa Penting</th>
                                    <th>Yang Perlu Dicek Saat Survey</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Akses dari Bintaro Jaya</td><td>Memastikan jalur dan waktu tempuh realistis untuk tim dan owner</td><td>Jalur RC Veteran Raya, kondisi jalan sekitar</td></tr>
                                <tr><td>Akses dari Pondok Indah</td><td>Klien atau tim dari Pondok Indah perlu jalur yang jelas</td><td>Alternatif jalur masuk ke Pesanggrahan</td></tr>
                                <tr><td>Akses Pintu Tol Veteran</td><td>Memudahkan mobilitas dari dan ke tol untuk owner dan tamu bisnis</td><td>Jarak dari pintu tol ke gedung BBC</td></tr>
                                <tr><td>Alamat Jakarta Selatan</td><td>Relevansi yurisdiksi DKI Jakarta untuk kebutuhan perusahaan</td><td>Konfirmasi alamat dan kelurahan di dokumen</td></tr>
                                <tr><td>Fasilitas kantor siap pakai</td><td>Memastikan kondisi ruangan dan fasilitas sesuai kebutuhan tim</td><td>Furniture, internet, AC, kondisi unit</td></tr>
                                <tr><td>Meeting room</td><td>Dibutuhkan untuk pertemuan klien, mitra, atau verifikasi</td><td>Kapasitas, ketersediaan, dan ketentuan booking</td></tr>
                                <tr><td>Parkir dan penerimaan tamu</td><td>Memengaruhi kenyamanan klien dan efisiensi operasional</td><td>Area parkir, resepsionis, dan alur tamu masuk</td></tr>
                            </tbody>
                        </table>
                        <p>Waktu yang tepat untuk melakukan survey:</p>
                        <ul>
                            <li>Tim dan owner sudah menentukan area kerja yang diinginkan</li>
                            <li>Ada perbandingan antara dua atau tiga pilihan kantor di Jakarta Selatan</li>
                            <li>Perlu mengonfirmasi akses dari Bintaro Jaya, Rempoa, atau Pondok Indah secara langsung</li>
                            <li>Kebutuhan fasilitas sudah cukup jelas untuk dibandingkan</li>
                            <li>Kontrak hampir ditandatangani dan perlu kepastian sebelum komitmen</li>
                        </ul>
                    `
                },
                {
                    id: "kesimpulan",
                    h2: "Kesimpulan: Pilih Kantor Berdasarkan Akses, Kebutuhan Tim, dan Fungsi Alamat",
                    rawHtml: `
                        <p>Kantor dekat Bintaro Jaya yang tepat adalah kantor yang memenuhi tiga pertimbangan utama: akses yang realistis untuk tim dan owner, fasilitas yang sesuai dengan kebutuhan operasional, dan alamat yang relevan dengan kebutuhan administratif perusahaan.</p>
                        <p>Bintaro Business Centre berlokasi di Pesanggrahan, Jakarta Selatan — dekat koridor Bintaro Jaya dengan akses melalui Pintu Tol Veteran dan RC Veteran Raya. Survey langsung membantu memverifikasi bahwa akses, fasilitas, dan alamat sesuai sebelum kontrak ditandatangani.</p>
                    `
                },
                {
                    id: "cta-akhir",
                    h2: "Jadwalkan Survey Kantor",
                    rawHtml: `
                        <p>Jadwalkan survey kantor untuk memverifikasi akses dari Bintaro Jaya, Rempoa, Pondok Indah, atau Tanah Kusir, serta melihat fasilitas kantor secara langsung. Tanyakan ketersediaan unit.</p>
                    `
                }
            ]}
            faq={{
                title: "FAQ",
                items: [
                    { q: "Apakah BBC berada di kawasan Bintaro Jaya?", a: "Tidak. Bintaro Business Centre berlokasi di Kelurahan Bintaro, Kecamatan Pesanggrahan, Jakarta Selatan — bukan bagian dari kawasan Bintaro Jaya. BBC berada di dekat koridor Bintaro Jaya, dengan akses melalui Pintu Tol Veteran dan RC Veteran Raya." },
                    { q: "Di mana lokasi Bintaro Business Centre?", a: "BBC berlokasi di Jl. RC. Veteran No. 1-i, Kel. Bintaro, Kec. Pesanggrahan, Jakarta Selatan 12330 — di dalam wilayah administratif DKI Jakarta." },
                    { q: "Mengapa kantor dekat Bintaro Jaya relevan untuk pemilik usaha?", a: "Banyak pemilik usaha yang tinggal atau beraktivitas di sekitar Bintaro Jaya, Rempoa, Tanah Kusir, dan Pondok Indah. Kantor di Jakarta Selatan yang dekat koridor ini memungkinkan efisiensi mobilitas sekaligus memberikan alamat administratif DKI Jakarta." },
                    { q: "Apakah lokasi dekat Pintu Tol Veteran membantu akses kantor?", a: "Ya. Pintu Tol Veteran dan RC Veteran Raya menjadi jalur akses utama ke BBC dari arah Bintaro Jaya, Tanah Kusir, dan kawasan selatan Jakarta. Kondisi akses sebaiknya diverifikasi langsung saat survey kantor." },
                    { q: "Apakah tersedia kantor siap pakai dekat Bintaro Jaya?", a: "Ya. BBC menyediakan service office — kantor siap pakai — di Pesanggrahan, Jakarta Selatan. Fasilitas mencakup furniture, internet, resepsionis, mail handling, dan akses meeting room sesuai paket atau ketentuan sewa." },
                    { q: "Apa yang perlu dicek saat survey kantor?", a: "Hal utama yang perlu diverifikasi: jalur akses dari lokasi asal (Bintaro Jaya, Rempoa, Pondok Indah, atau Tanah Kusir), kondisi ruangan dan furniture, fasilitas yang termasuk dalam paket, ketersediaan parkir, dan alur penerimaan tamu." },
                    { q: "Apakah alamat BBC termasuk Jakarta Selatan?", a: "Ya. BBC berlokasi di Kelurahan Bintaro, Kecamatan Pesanggrahan, Jakarta Selatan — di dalam wilayah administratif DKI Jakarta. Ini berbeda dari kawasan Bintaro Jaya yang dikenal sebagai kota mandiri di Tangerang Selatan." },
                    { q: "Apakah kantor dekat Bintaro Jaya cocok untuk perusahaan cabang?", a: "BBC dapat menjadi opsi untuk perusahaan cabang yang membutuhkan ruang kerja fisik dengan alamat Jakarta Selatan di dekat koridor Bintaro Jaya. Kesesuaian untuk kebutuhan cabang spesifik sebaiknya dikonfirmasi langsung dengan tim BBC." }
                ]
            }}
            internalLinks={{
                closing: { label: "jadwalkan survey kantor BBC", href: "/sewa-kantor" }
            }}
        />
    )
}
