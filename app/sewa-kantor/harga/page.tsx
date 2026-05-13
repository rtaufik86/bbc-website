import { Metadata } from 'next'
import WeaponPageTemplateV2 from '@/components/templates/WeaponPageTemplateV2'

const title = 'Harga Sewa Kantor Jakarta Selatan: Cara Menilai Nilai Sewa'
const description = 'Cara menilai harga sewa kantor Jakarta Selatan dari total biaya operasional, fasilitas yang termasuk, kesiapan ruang, akses lokasi, dan kebutuhan survey.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/sewa-kantor/harga' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/sewa-kantor/harga',
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
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor/harga/#webpage",
                "url": "https://www.bintarobusinesscentre.com/sewa-kantor/harga",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/sewa-kantor/harga/#article",
                "headline": title,
                "description": description,
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            }
        ]
    }

    return (
        <WeaponPageTemplateV2
            url="/sewa-kantor/harga"
            title={title}
            description={description}
            canonicalUrl="https://www.bintarobusinesscentre.com/sewa-kantor/harga"
            schemaObject={schemaObject}
            h1="Harga Sewa Kantor Jakarta Selatan: Cara Menilai Nilai Sewa"
            intro='Harga Sewa Kantor Jakarta Selatan tidak hanya ditentukan oleh angka sewa bulanan. Nilai sebenarnya dari sebuah ruang kantor bergantung pada kelengkapan fasilitas, kesiapan operasional, lokasi, dan biaya yang sudah termasuk — mulai dari furniture, internet, resepsionis, utilitas, hingga akses ke meeting room. Sebelum membandingkan angka, penting untuk memahami apa saja yang tercakup dalam harga tersebut dan bagaimana total biaya operasional dihitung secara keseluruhan. Bintaro Business Centre menyediakan <a href="/sewa-kantor" class="text-accent font-bold hover:underline">layanan sewa kantor BBC</a> berupa service office di Pesanggrahan, Jakarta Selatan, dengan fasilitas yang sudah siap digunakan.'
            entity="sewa-kantor"
            location="jakarta-selatan"
            heroChips={[
                { label: "Service Office", type: "service" },
                { label: "Jakarta Selatan", type: "location" },
                { label: "Nilai Operasional", type: "benefit" }
            ]}
            heroVisual={{
                eyebrow: "Cara Menilai Nilai Sewa",
                title: "Bandingkan total biaya, bukan angka bulanan saja.",
                description: "Fasilitas, kesiapan operasional, akses, dan biaya yang sudah termasuk menentukan nilai sewa sebenarnya.",
                featureChips: [
                    { label: "Total biaya" },
                    { label: "Fasilitas termasuk" },
                    { label: "Survey kantor" }
                ]
            }}
            keyTakeaways={[
                "Nilai sewa kantor perlu dihitung dari total biaya operasional, bukan hanya sewa bulanan.",
                "Furniture, internet, resepsionis, utilitas, kebersihan, dan meeting room dapat mengubah perbandingan biaya.",
                "Survey langsung membantu memverifikasi kondisi ruangan, akses lokasi, parkir, dan fasilitas yang termasuk.",
                "BBC berada di Pesanggrahan, Jakarta Selatan, dekat Pintu Tol Veteran dan RC Veteran Raya."
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
                            <li><strong>Layanan:</strong> Sewa kantor / service office di Jakarta Selatan</li>
                            <li><strong>Lokasi:</strong> Jl. RC. Veteran No. 1-i, Pesanggrahan, Jakarta Selatan — dekat Pintu Tol Veteran dan RC Veteran Raya</li>
                            <li><strong>Yang perlu dinilai:</strong> Total biaya operasional, bukan hanya sewa bulanan</li>
                            <li><strong>Cocok untuk:</strong> Pemilik usaha, konsultan, perusahaan cabang, SME yang membutuhkan ruang kerja fisik siap pakai</li>
                            <li><strong>Aksi utama:</strong> Bandingkan fasilitas yang termasuk, lalu jadwalkan survey kantor</li>
                        </ul>
                    `
                },
                {
                    id: "cara-menilai",
                    h2: "Tiga Hal yang Menentukan Nilai Sewa",
                    rawHtml: `
                        <p>Perbandingan harga yang adil dimulai dari total biaya menjalankan kantor. Sewa bulanan hanyalah satu komponen; biaya setup, fasilitas, dan waktu sampai kantor siap digunakan perlu dihitung bersama.</p>
                    `,
                    visual: {
                        type: "card",
                        items: [
                            { title: "Total biaya operasional", desc: "Hitung sewa, utilitas, internet, furniture, kebersihan, resepsionis, dan biaya setup awal.", icon: "Calculator" },
                            { title: "Fasilitas yang termasuk", desc: "Cek komponen yang sudah tersedia dalam paket agar perbandingan tidak hanya berdasarkan angka bulanan.", icon: "CheckSquare" },
                            { title: "Waktu untuk survey kantor", desc: "Survey membantu memastikan kondisi aktual ruangan, akses, parkir, dan fasilitas sebelum komitmen.", icon: "Calendar" }
                        ]
                    }
                },
                {
                    id: "sewa-bulanan",
                    h2: "Mengapa Harga Sewa Kantor Tidak Bisa Dinilai dari Sewa Bulanan Saja",
                    rawHtml: `
                        <p>Sewa bulanan hanyalah satu komponen dari total biaya menjalankan kantor. Perusahaan yang hanya membandingkan angka bulanan sering melewatkan biaya awal dan biaya operasional yang muncul setelah kontrak ditandatangani.</p>
                        <p>Kantor konvensional dengan sewa bulanan lebih rendah bisa membutuhkan investasi awal untuk renovasi, pembelian furniture, instalasi internet, dan pengadaan peralatan. Kantor siap pakai dengan sewa lebih tinggi mungkin sudah mencakup semua komponen tersebut — sehingga total pengeluaran dalam 6 atau 12 bulan pertama bisa lebih efisien.</p>
                        <p>Perbandingan yang adil dimulai dari satu pertanyaan: apa saja yang sudah termasuk dalam harga sewa ini?</p>
                    `
                },
                {
                    id: "komponen-harga",
                    h2: "Komponen yang Mempengaruhi Harga Sewa Kantor Jakarta Selatan",
                    rawHtml: `
                        <p>Harga sewa kantor di Jakarta Selatan dipengaruhi oleh beberapa faktor yang perlu dievaluasi secara bersamaan:</p>
                        <ul>
                            <li><strong>Lokasi dan akses</strong> — Jarak ke pintu tol, transportasi publik, dan kawasan bisnis atau hunian sekitar</li>
                            <li><strong>Kondisi dan kelas gedung</strong> — Usia gedung, sistem AC, elevator, area parkir</li>
                            <li><strong>Ukuran ruangan</strong> — Luas efektif ruang kerja per orang atau per tim</li>
                            <li><strong>Kelengkapan furniture</strong> — Meja, kursi kerja, lemari penyimpanan</li>
                            <li><strong>Internet</strong> — Kecepatan, keandalan, dan apakah sudah termasuk dalam sewa</li>
                            <li><strong>Resepsionis</strong> — Layanan penerima tamu dan penanganan telepon</li>
                            <li><strong>Utilitas</strong> — Listrik dan air, apakah dihitung terpisah atau sudah all-in</li>
                            <li><strong>Kebersihan</strong> — Layanan cleaning rutin</li>
                            <li><strong>Meeting room</strong> — Akses dan kuota penggunaan per bulan</li>
                            <li><strong>Mail handling</strong> — Penerimaan surat dan paket atas nama perusahaan</li>
                            <li><strong>Dukungan gedung</strong> — Keamanan, mushola, ruang tunggu, area parkir</li>
                        </ul>
                        <p>Setiap komponen ini memengaruhi nilai sewa secara keseluruhan. Kantor yang harganya terlihat tinggi tetapi sudah mencakup semua komponen di atas bisa lebih hemat daripada kantor murah yang memerlukan banyak tambahan biaya.</p>
                    `
                },
                {
                    id: "kantor-siap-pakai",
                    h2: "Apa yang Sebaiknya Sudah Termasuk dalam Kantor Siap Pakai",
                    rawHtml: `
                        <p>Kantor siap pakai — atau service office — idealnya sudah menyertakan fasilitas dasar tanpa biaya tambahan yang tidak terduga. Berikut komponen yang sebaiknya dicek saat mengevaluasi paket sewa:</p>
                        <ul>
                            <li>Furniture lengkap (meja, kursi, lemari)</li>
                            <li>Internet (koneksi stabil, sudah termasuk dalam harga)</li>
                            <li>Air conditioning</li>
                            <li>Listrik dan utilitas dasar</li>
                            <li>Layanan kebersihan rutin</li>
                            <li>Resepsionis untuk penerima tamu dan telepon</li>
                            <li>Mail handling (penerimaan surat dan paket)</li>
                            <li>Akses meeting room (dengan kuota tertentu)</li>
                            <li>Dukungan fasilitas gedung (parkir, keamanan, lift)</li>
                        </ul>
                        <p>Jika beberapa komponen di atas dikenakan biaya terpisah, total biaya operasional bulanan perlu dihitung ulang sebelum membandingkan dengan opsi lain.</p>
                    `
                },
                {
                    id: "cta-tengah",
                    h2: "Cek Fasilitas yang Sudah Termasuk",
                    rawHtml: `
                        <p>Gunakan daftar fasilitas sebagai pembanding sebelum menilai apakah sebuah paket sewa kantor sesuai dengan kebutuhan operasional.</p>
                        <p>Untuk konteks layanan kantor fisik di wilayah ini, lihat <a href="/sewa-kantor/jakarta-selatan" class="text-accent font-bold hover:underline">sewa kantor Jakarta Selatan</a>.</p>
                    `
                },
                {
                    id: "service-office-vs-konvensional",
                    h2: "Service Office vs Kantor Konvensional: Perbedaan Biaya yang Sering Terlewat",
                    rawHtml: `
                        <table>
                            <thead>
                                <tr>
                                    <th>Aspek Biaya</th>
                                    <th>Service Office / Kantor Siap Pakai</th>
                                    <th>Kantor Konvensional</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Setup awal</td><td>Rendah — ruangan sudah siap</td><td>Tinggi — renovasi, instalasi, pengadaan</td></tr>
                                <tr><td>Furniture</td><td>Sudah termasuk</td><td>Harus dibeli atau disewa terpisah</td></tr>
                                <tr><td>Internet</td><td>Umumnya sudah termasuk</td><td>Instalasi dan langganan terpisah</td></tr>
                                <tr><td>Resepsionis</td><td>Sudah termasuk dalam layanan gedung</td><td>Harus merekrut dan menggaji sendiri</td></tr>
                                <tr><td>Utilitas (listrik, air)</td><td>Sering sudah all-in</td><td>Ditagih terpisah berdasarkan pemakaian</td></tr>
                                <tr><td>Kebersihan</td><td>Sudah termasuk</td><td>Harus diatur dan dibiayai sendiri</td></tr>
                                <tr><td>Meeting room</td><td>Akses tersedia sesuai paket</td><td>Harus sewa ruang terpisah atau tidak ada</td></tr>
                                <tr><td>Fleksibilitas operasional</td><td>Lebih fleksibel, tidak perlu setup ulang</td><td>Terikat setup dan kontrak yang lebih kompleks</td></tr>
                                <tr><td>Waktu sampai bisa digunakan</td><td>Cepat — bisa langsung beroperasi</td><td>Lebih lama karena perlu persiapan</td></tr>
                            </tbody>
                        </table>
                        <p>Untuk perusahaan yang membutuhkan kantor fungsional dalam waktu singkat, service office menawarkan efisiensi waktu dan pengurangan beban koordinasi yang signifikan.</p>
                    `
                },
                {
                    id: "lokasi",
                    h2: "Peran Lokasi Pesanggrahan, RC Veteran Raya, dan Pintu Tol Veteran dalam Nilai Sewa",
                    rawHtml: `
                        <p>Lokasi kantor memengaruhi nilai operasional secara langsung — bukan hanya dari sisi harga, tetapi dari sisi efisiensi mobilitas tim dan kemudahan akses klien.</p>
                        <p>Bintaro Business Centre berlokasi di Jl. RC. Veteran No. 1-i, Pesanggrahan, Jakarta Selatan, dengan akses cepat melalui Pintu Tol Veteran dan Jalan RC Veteran Raya. Lokasi ini berada di wilayah administratif DKI Jakarta dan dapat menjadi faktor pertimbangan untuk kebutuhan alamat perusahaan, perpajakan, dan administrasi legal.</p>
                        <p>Bagi pemilik usaha yang beraktivitas di sekitar Bintaro Jaya, Rempoa, Tanah Kusir, atau Pondok Indah, akses ke lokasi ini relatif singkat melalui koridor Tol Veteran. Gedung BBC memiliki luas bangunan 1.600 m² dengan 4 lantai dan 72 unit kantor, beroperasi sejak 2007 di bawah pengelolaan PT. Ganesha Dwipaya Bhakti.</p>
                        <p>Untuk konteks akses lokasi yang lebih lengkap, lihat: <a href="/kantor-dekat-tol-veteran" class="text-accent font-bold hover:underline">kantor dekat Pintu Tol Veteran</a>.</p>
                    `
                },
                {
                    id: "efisiensi",
                    h2: "Kapan Harga Lebih Tinggi Tetap Bisa Lebih Efisien",
                    rawHtml: `
                        <p>Sewa bulanan yang lebih tinggi tidak selalu berarti pengeluaran lebih besar. Beberapa situasi di mana harga lebih tinggi justru lebih efisien:</p>
                        <ul>
                            <li><strong>Setup cost nol</strong> — Tidak perlu mengeluarkan biaya awal untuk furniture, renovasi, atau instalasi</li>
                            <li><strong>Operasional langsung</strong> — Tim bisa mulai bekerja tanpa menunggu proses persiapan kantor</li>
                            <li><strong>Biaya tersembunyi lebih sedikit</strong> — Utilitas, internet, dan resepsionis sudah tercakup</li>
                            <li><strong>Tidak perlu rekrut staf pendukung</strong> — Resepsionis dan mail handling sudah disediakan</li>
                            <li><strong>Fleksibilitas operasional</strong> — Model service office dapat mengurangi beban setup dan koordinasi fasilitas, dengan detail kontrak tetap perlu dikonfirmasi sebelum menyewa</li>
                        </ul>
                        <p>Bagi perusahaan yang baru memulai operasional, membuka kantor cabang, atau ingin mengurangi beban manajemen fasilitas, model service office seringkali lebih efisien secara total meskipun angka sewanya lebih tinggi per meter persegi dibanding kantor konvensional.</p>
                    `
                },
                {
                    id: "survey",
                    h2: "Kapan Sebaiknya Melakukan Survey Kantor",
                    rawHtml: `
                        <p>Survey kantor sebaiknya dilakukan ketika keputusan kontrak sudah semakin dekat dan ada beberapa hal konkret yang perlu dikonfirmasi secara langsung.</p>
                        <p>Waktu yang tepat untuk survey kantor:</p>
                        <ul>
                            <li>Ukuran tim sudah jelas dan kebutuhan ruang sudah bisa diperkirakan</li>
                            <li>Lokasi menjadi faktor penting — perlu memverifikasi akses dan kemudahan parkir secara langsung</li>
                            <li>Sedang membandingkan dua atau tiga pilihan kantor</li>
                            <li>Perlu mengonfirmasi kondisi aktual ruangan, furniture, dan fasilitas yang termasuk</li>
                            <li>Kontrak hampir ditandatangani dan perlu kepastian sebelum komitmen</li>
                        </ul>
                        <p>Survey langsung membantu menghindari asumsi yang salah tentang kondisi ruangan, kualitas fasilitas, dan aksesibilitas lokasi.</p>
                    `
                },
                {
                    id: "kesimpulan",
                    h2: "Kesimpulan: Nilai Sewa Kantor Lebih Penting daripada Angka Sewa Saja",
                    rawHtml: `
                        <p>Harga sewa kantor Jakarta Selatan perlu dievaluasi dari sudut pandang total nilai operasional — bukan hanya angka bulanan. Fasilitas yang sudah termasuk, kesiapan operasional, lokasi, dan dukungan gedung adalah faktor yang menentukan apakah harga yang ditawarkan sepadan atau tidak.</p>
                        <p>Bintaro Business Centre menyediakan service office di Pesanggrahan, Jakarta Selatan, dengan fasilitas yang dirancang untuk mendukung operasional perusahaan tanpa setup dari nol. Untuk memastikan kesesuaian ruang dan fasilitas dengan kebutuhan Anda, langkah berikutnya adalah melakukan survey langsung.</p>
                    `
                },
                {
                    id: "cta-akhir",
                    h2: "Jadwalkan Survey Kantor",
                    rawHtml: `
                        <p>Jadwalkan survey kantor untuk melihat fasilitas dan akses lokasi secara langsung. Tanyakan ketersediaan unit dan fasilitas yang termasuk dalam paket sewa.</p>
                    `
                }
            ]}
            faq={{
                title: "FAQ",
                items: [
                    { q: "Apa yang mempengaruhi harga sewa kantor Jakarta Selatan?", a: "Harga sewa kantor dipengaruhi oleh lokasi, ukuran ruangan, kondisi gedung, kelengkapan fasilitas (furniture, internet, resepsionis, utilitas), dan jenis kontrak. Kantor dengan fasilitas lengkap biasanya memiliki harga sewa lebih tinggi, tetapi total biaya operasional bisa lebih efisien." },
                    { q: "Apakah kantor siap pakai lebih hemat daripada kantor konvensional?", a: "Tergantung pada kebutuhan dan skala operasional. Untuk perusahaan yang membutuhkan kantor fungsional dalam waktu singkat tanpa setup awal, service office umumnya lebih efisien secara total karena furniture, internet, resepsionis, dan utilitas sudah termasuk." },
                    { q: "Apa saja yang harus termasuk dalam harga sewa kantor?", a: "Komponen yang sebaiknya sudah termasuk: furniture, internet, AC, listrik, kebersihan, resepsionis, mail handling, dan akses meeting room. Jika ada komponen yang dikenakan biaya terpisah, perhitungan total biaya bulanan perlu disesuaikan." },
                    { q: "Apakah perlu survey kantor sebelum menyewa?", a: "Ya. Survey kantor membantu memverifikasi kondisi aktual ruangan, fasilitas yang benar-benar tersedia, kualitas akses dan parkir, serta memastikan kesesuaian sebelum kontrak ditandatangani." },
                    { q: "Apakah lokasi dekat Pintu Tol Veteran mempengaruhi nilai sewa?", a: "Lokasi memengaruhi efisiensi mobilitas tim dan kemudahan akses klien. Kantor dekat Pintu Tol Veteran dan RC Veteran Raya memberikan konektivitas ke koridor Bintaro Jaya, Pondok Indah, dan Jakarta Selatan secara umum — relevan bagi banyak pelaku usaha di kawasan ini." },
                    { q: "Apakah Bintaro Business Centre menyediakan service office?", a: "Ya. BBC menyediakan service office di Pesanggrahan, Jakarta Selatan — gedung fisik 1.600 m² dengan 4 lantai dan 72 unit kantor, beroperasi sejak 2007 di bawah pengelolaan PT. Ganesha Dwipaya Bhakti. Fasilitas pendukung mencakup resepsionis, mail handling, dan akses meeting room sesuai paket atau ketentuan sewa." },
                    { q: "Bagaimana cara membandingkan harga sewa kantor secara adil?", a: "Bandingkan total paket, bukan hanya sewa bulanan. Hitung biaya yang sudah termasuk vs biaya yang perlu ditambahkan, estimasi biaya setup awal, waktu yang dibutuhkan hingga kantor siap operasional, dan kualitas akses lokasi. Survey langsung ke dua atau tiga pilihan sebelum memutuskan." }
                ]
            }}
            internalLinks={{
                closing: { label: "jadwalkan survey kantor BBC", href: "/sewa-kantor" }
            }}
        />
    )
}
