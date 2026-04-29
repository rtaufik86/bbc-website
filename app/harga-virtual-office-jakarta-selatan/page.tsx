import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'
import { buildWhatsAppLink } from '@/lib/tracking/cta'

const waUrlClosing = buildWhatsAppLink({ text: 'Halo BBC, saya ingin tanya layanan virtual office Jakarta Selatan.', service: 'vo', cta: 'final', intent: 'pricing', phone: '628128888069' })

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
        images: [{ url: '/images/foto-gedung-bbc.jpg' }]
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
            h1="Virtual Office Jakarta Selatan: Breakdown Biaya & Perbandingan"
            intro='Harga virtual office di Jakarta Selatan bervariasi tergantung lokasi gedung, kelengkapan fasilitas, durasi kontrak, dan layanan tambahan yang disertakan. Memahami komponen pembentuk harga adalah langkah pertama sebelum membandingkan pilihan <a href="/virtual-office" class="text-accent hover:underline">virtual office</a> yang tersedia &mdash; termasuk <a href="/virtual-office-jakarta-selatan" class="text-accent font-bold hover:underline">layanan virtual office Jakarta Selatan</a> dari BBC yang berlokasi di kawasan Bintaro, Jakarta Selatan.'
            entity="virtual-office"
            location="jakarta-selatan"
            heroBadges={{ b1: "Panduan Harga", b2: "Virtual Office" }}
            sections={[
                {
                    id: "problem",
                    h2: "Apa Itu Virtual Office dan Mengapa Harganya Berbeda-beda",
                    rawHtml: `
                        <p>Virtual office adalah layanan yang memberikan akses ke alamat bisnis legal, layanan penerimaan surat, dan dukungan administratif tanpa mengharuskan penyewa menempati ruang fisik secara penuh. Produk ini bukan sekadar &quot;alamat sewa&quot; &mdash; di dalamnya terdapat ekosistem layanan yang menentukan nilai dan harganya.</p>
                        <p>Perbedaan harga antar penyedia bukan semata soal lokasi. Dua penyedia di kawasan yang sama bisa memiliki selisih harga signifikan karena perbedaan dalam:</p>
                        <ul>
                            <li><strong>Reputasi dan legalitas gedung</strong> &mdash; apakah alamat tersebut memiliki dokumen pendukung yang memadai untuk kebutuhan administrasi OSS, domisili perusahaan, dan proses legalitas lain sesuai ketentuan instansi terkait.</li>
                            <li><strong>Kelengkapan layanan administratif</strong> &mdash; apakah termasuk penanganan surat masuk, notifikasi digital, atau hanya penerimaan fisik.</li>
                            <li><strong>Akses fasilitas pendukung</strong> &mdash; ketersediaan ruang meeting atau area kerja yang bisa digunakan secara terpisah.</li>
                            <li><strong>Durasi dan fleksibilitas kontrak</strong> &mdash; paket bulanan vs tahunan umumnya memiliki struktur harga yang berbeda.</li>
                        </ul>
                    `
                },
                {
                    id: "education",
                    h2: "Mengapa Komponen Harga Penting Sebelum Memilih",
                    rawHtml: `
                        <p>Banyak pelaku usaha memilih virtual office semata berdasarkan angka terendah, tanpa mempertimbangkan apakah layanan tersebut memenuhi kebutuhan operasional dan legal bisnis mereka. Ini sering menimbulkan masalah di kemudian hari &mdash; mulai dari alamat yang tidak sesuai dengan kebutuhan administrasi, hingga layanan administratif yang tidak memadai saat volume surat meningkat.</p>
                        <p>Memahami komponen harga membantu Anda:</p>
                        <ol>
                            <li><strong>Membandingkan secara setara</strong> &mdash; paket dengan harga lebih rendah mungkin tidak menyertakan layanan yang Anda butuhkan.</li>
                            <li><strong>Menghindari biaya tersembunyi</strong> &mdash; beberapa penyedia mengenakan biaya tambahan untuk layanan yang seharusnya sudah termasuk.</li>
                            <li><strong>Menyesuaikan dengan kebutuhan spesifik bisnis</strong> &mdash; startup tahap awal memiliki kebutuhan berbeda dibanding perusahaan yang sudah aktif beroperasi.</li>
                        </ol>
                        <p>Untuk gambaran lebih luas tentang struktur biaya secara umum, lihat panduan <a href="/harga-virtual-office" class="text-accent hover:underline">harga virtual office</a> dan faktor-faktor yang membentuknya.</p>
                    `
                },
                {
                    id: "authority",
                    h2: "Faktor Utama yang Mempengaruhi Harga Virtual Office di Jakarta Selatan",
                    rawHtml: `
                        <h3>Lokasi dan Prestise Alamat</h3>
                        <p>Jakarta Selatan memiliki beberapa sub-kawasan dengan karakteristik berbeda. Beberapa kawasan bisnis premium di Jakarta Selatan memiliki struktur biaya lebih tinggi karena faktor prestise dan aksesibilitas. Di sisi lain, Bintaro dan Pesanggrahan menawarkan alamat Jakarta Selatan yang tetap relevan secara administratif dengan struktur biaya yang lebih efisien.</p>

                        <h3>Kelengkapan Layanan Administratif</h3>
                        <p>Paket dasar umumnya hanya mencakup penggunaan alamat untuk domisili perusahaan. Paket yang lebih lengkap dapat menyertakan penerimaan dan penerusan surat fisik, notifikasi digital saat surat masuk, penanganan paket dan dokumen penting, serta layanan telepon bisnis jika tersedia dalam paket. Setiap tambahan layanan ini berkontribusi pada struktur harga akhir.</p>

                        <h3>Durasi Kontrak</h3>
                        <p>Kontrak jangka panjang umumnya menawarkan efisiensi biaya per bulan yang lebih baik dibanding kontrak bulanan. Namun, fleksibilitas kontrak jangka pendek bisa lebih relevan bagi bisnis yang masih dalam fase validasi atau baru berdiri.</p>

                        <h3>Layanan Tambahan dan Add-on</h3>
                        <p>Beberapa penyedia menawarkan akses ke ruang meeting atau fasilitas kerja sebagai add-on terpisah. Penting untuk memahami apakah layanan ini sudah termasuk dalam paket atau dikenakan biaya terpisah per penggunaan.</p>

                        <h3>Reputasi Penyedia dan Rekam Jejak Legalitas</h3>
                        <p>Alamat virtual office dengan dokumen pendukung dan legalitas gedung yang jelas akan lebih mudah dievaluasi dalam proses administrasi seperti OSS, pendirian PT, dan kebutuhan perbankan, dengan tetap mengikuti ketentuan instansi terkait. Untuk konteks lebih luas, baca <a href="/alamat-bisnis-jakarta-selatan" class="text-accent hover:underline">fungsi alamat bisnis Jakarta Selatan</a>.</p>
                    `
                },
                {
                    id: "value",
                    h2: "Virtual Office BBC di Bintaro, Jakarta Selatan",
                    rawHtml: `
                        <p>BBC menyediakan layanan virtual office yang berlokasi di kawasan Bintaro, Pesanggrahan, Jakarta Selatan &mdash; area yang terhubung dengan akses RC Veteran dan Pintu Tol Veteran. Sebagai penyedia yang berbasis di Jakarta Selatan, BBC menawarkan alamat bisnis yang dapat digunakan untuk kebutuhan domisili perusahaan, perizinan, dan korespondensi resmi sesuai ketentuan yang berlaku.</p>
                        <p>Untuk detail komponen harga dan paket yang tersedia, informasi lengkap dapat dilihat di halaman <a href="/harga-virtual-office" class="text-accent hover:underline">harga virtual office</a> atau langsung dikonsultasikan dengan tim BBC.</p>
                    `,
                    visual: {
                        type: "card",
                        items: [
                            { title: "Alamat Bisnis Jakarta Selatan", desc: "Relevan untuk perusahaan yang membutuhkan alamat administratif di wilayah Jakarta Selatan.", icon: "MapPin" },
                            { title: "Layanan Administratif Terstruktur", desc: "Penanganan surat dan dokumen masuk sebagai bagian dari layanan.", icon: "Mail" },
                            { title: "Fleksibilitas Paket", desc: "Pilihan yang dapat disesuaikan dengan kebutuhan dan skala bisnis.", icon: "Briefcase" },
                            { title: "Lokasi Bintaro–Pesanggrahan", desc: "Akses RC Veteran dan Pintu Tol Veteran untuk konektivitas Jakarta Selatan.", icon: "ShieldCheck" }
                        ]
                    }
                },
                {
                    id: "options",
                    h2: "Kapan Virtual Office di Jakarta Selatan Adalah Pilihan Tepat",
                    rawHtml: `
                        <p>Virtual office paling relevan untuk kondisi berikut:</p>
                        <ul>
                            <li><strong>Bisnis berbasis jasa atau digital</strong> yang tidak memerlukan ruang fisik untuk operasional sehari-hari, namun membutuhkan alamat profesional untuk keperluan legal dan korespondensi klien.</li>
                            <li><strong>Startup atau usaha rintisan</strong> yang ingin meminimalkan fixed cost di fase awal sambil tetap memiliki kehadiran bisnis yang terlegitimasi di Jakarta Selatan.</li>
                            <li><strong>Perusahaan luar Jakarta</strong> yang membutuhkan alamat representatif di Jakarta Selatan untuk ekspansi pasar atau kebutuhan administrasi wilayah.</li>
                            <li><strong>Freelancer atau konsultan</strong> yang ingin memisahkan alamat pribadi dari alamat bisnis untuk alasan profesionalisme dan privasi.</li>
                        </ul>

                        <h3>Catatan Penting soal PKP</h3>
                        <p>Untuk kebutuhan pengukuhan Pengusaha Kena Pajak (PKP), kesesuaian virtual office sangat bergantung pada jenis KBLI dan kebijakan KPP setempat:</p>
                        <ul>
                            <li><strong>KBLI Jasa</strong>: virtual office bisa menjadi opsi yang dipertimbangkan, namun persetujuan tetap bergantung pada penilaian KPP masing-masing &mdash; tidak ada jaminan otomatis.</li>
                            <li><strong>KBLI Perdagangan</strong>: umumnya membutuhkan bukti keberadaan fisik yang lebih kuat, sehingga virtual office saja mungkin tidak mencukupi persyaratan.</li>
                        </ul>
                        <p>Konsultasikan kebutuhan PKP Anda dengan penyedia layanan atau konsultan pajak sebelum mengambil keputusan. Untuk konteks proses legalitas perusahaan, lihat halaman <a href="/legal/pendirian-pt-jakarta-selatan" class="text-accent hover:underline">pendirian PT Jakarta Selatan</a>.</p>
                    `
                },
                {
                    id: "related",
                    h2: "Kapan Perlu Mempertimbangkan Alternatif",
                    rawHtml: `
                        <p>Virtual office bukan solusi universal. Ada kondisi di mana Anda perlu mempertimbangkan opsi lain:</p>
                        <ul>
                            <li><strong>Jika bisnis membutuhkan ruang kerja fisik reguler</strong> &mdash; virtual office tidak menyediakan meja kerja tetap. Dalam kasus ini, service office atau sewa kantor dengan akses harian lebih sesuai.</li>
                            <li><strong>Jika klien atau mitra mengharuskan kunjungan ke kantor</strong> &mdash; alamat virtual tidak dapat menggantikan ruang fisik yang bisa dikunjungi.</li>
                            <li><strong>Jika KBLI bisnis Anda memerlukan kantor fisik untuk perizinan</strong> &mdash; terutama untuk usaha di sektor perdagangan, distribusi, atau yang diatur oleh regulasi sektoral tertentu.</li>
                            <li><strong>Jika volume operasional sudah berkembang signifikan</strong> &mdash; bisnis dengan tim besar dan kebutuhan operasional harian yang intensif akan lebih efisien dengan ruang kantor dedicated.</li>
                        </ul>
                        <p>Untuk kebutuhan ini, BBC juga menyediakan opsi <a href="/sewa-kantor/bintaro" class="text-accent hover:underline">sewa kantor di Bintaro</a> yang dapat menjadi alternatif atau pelengkap dari layanan virtual office.</p>
                    `
                },
                {
                    id: "cta",
                    h2: "Bandingkan Berdasarkan Kebutuhan, Bukan Sekadar Harga",
                    rawHtml: `
                        <p>Jika Anda sedang membandingkan pilihan alamat bisnis di Jakarta Selatan, tim BBC dapat membantu mengevaluasi apakah virtual office, service office, atau sewa kantor fisik lebih sesuai dengan kebutuhan legalitas dan operasional bisnis Anda.</p>
                        <p>Sebagai referensi tambahan, baca <a href="/alamat-bisnis-jakarta-selatan" class="text-accent hover:underline">alamat bisnis Jakarta Selatan</a>, <a href="/virtual-office-jakarta-selatan" class="text-accent hover:underline">virtual office Jakarta Selatan</a>, atau <a href="/legal/pendirian-pt-jakarta-selatan" class="text-accent hover:underline">pendirian PT Jakarta Selatan</a>.</p>
                    `
                }
            ]}
            faq={{
                title: "FAQ Harga Virtual Office Jakarta Selatan",
                items: [
                    { q: "Apakah harga virtual office di Jakarta Selatan sudah termasuk layanan penanganan surat?", a: "Tidak selalu. Beberapa paket hanya mencakup penggunaan alamat, sementara layanan penanganan surat dikenakan biaya terpisah atau tersedia di paket yang lebih tinggi. Selalu periksa detail cakupan layanan sebelum memilih paket." },
                    { q: "Apakah alamat virtual office BBC di Bintaro bisa digunakan untuk pendirian PT?", a: "Alamat virtual office BBC di kawasan Bintaro, Pesanggrahan, Jakarta Selatan dapat digunakan sebagai salah satu komponen kebutuhan domisili perusahaan dalam proses pendirian PT, selama dokumen pendukung dan persyaratan instansi terkait terpenuhi. Persyaratan spesifik dapat berbeda tergantung jenis usaha dan instansi yang memproses." },
                    { q: "Apa perbedaan harga antara paket bulanan dan tahunan virtual office?", a: "Paket tahunan umumnya menawarkan efisiensi biaya per bulan yang lebih baik dibanding paket bulanan. Selisihnya bervariasi antar penyedia. Pilih berdasarkan kepastian kebutuhan bisnis Anda — jika masih dalam fase uji coba, fleksibilitas paket bulanan bisa lebih menguntungkan meski biaya per bulan lebih tinggi." },
                    { q: "Apakah virtual office di Jakarta Selatan otomatis disetujui untuk PKP?", a: "Tidak ada jaminan otomatis. Persetujuan PKP bergantung pada jenis KBLI, kelengkapan dokumen, dan kebijakan KPP setempat. Untuk KBLI jasa, virtual office lebih berpeluang dipertimbangkan, namun tetap perlu dikonfirmasi. Untuk KBLI perdagangan, umumnya dibutuhkan bukti keberadaan fisik yang lebih kuat." },
                    { q: "Bagaimana cara membandingkan harga virtual office secara akurat?", a: "Bandingkan berdasarkan komponen layanan yang setara: cakupan administratif, reputasi alamat untuk perizinan, fleksibilitas kontrak, dan ada tidaknya biaya tambahan. Harga terendah tidak selalu berarti nilai terbaik jika layanan yang disertakan tidak memenuhi kebutuhan operasional dan legal bisnis Anda." }
                ]
            }}
            internalLinks={{
                intro: { label: "Lihat VO Jakarta Selatan", href: "/virtual-office-jakarta-selatan" },
                mid: { label: "Baca Panduan", href: "/alamat-bisnis-jakarta-selatan" },
                closing: { label: "Tanya Layanan via WA", href: waUrlClosing }
            }}
        />
    )
}
