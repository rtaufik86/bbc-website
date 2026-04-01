import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

const title = 'Alamat Bisnis Jakarta Selatan: Implikasi Administratif dan Legalitas'
const description = 'Pilih yurisdiksi alamat bisnis yang tepat di Jakarta Selatan. Temukan kaitan erat NIB, NPWP, dan KPP dengan lokasi domisili awal perusahaan Anda.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/virtual-office/alamat-bisnis-jakarta-selatan' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/virtual-office/alamat-bisnis-jakarta-selatan',
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
                "@id": "https://www.bintarobusinesscentre.com/virtual-office/alamat-bisnis-jakarta-selatan/#webpage",
                "url": "https://www.bintarobusinesscentre.com/virtual-office/alamat-bisnis-jakarta-selatan",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/virtual-office/alamat-bisnis-jakarta-selatan/#article",
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
                        "name": "Apakah semua virtual office di Jakarta Selatan bisa digunakan untuk PKP?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Tidak. Penggunaan virtual office untuk Pengusaha Kena Pajak (PKP) rata-rata hanya dimungkinkan bagi entitas klasifikasi KBLI jasa. KBLI non-jasa (distributor/agen) secara spesifik memerlukan sewa kantor fisik tertutup minimal satu tahun kontrak resmi."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apa yang terjadi jika alamat domisili tidak konsisten antar dokumen?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Inkonsistensi titik koordinat alamat rentan menyebabkan penolakan otomatis pengajuan perizinan OSS atau komplikasi tajam saat proses audit verifikasi surat pajak tertulis KPP."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah alamat DKI berarti pasti biaya besar?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Tidak. Skema peminjaman domisili atau layanan terpusat virtual membuat biaya infrastruktur fisik disubsidi bersama, asalkan berbadan penyedia yang sah legal."
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
            canonicalUrl="https://www.bintarobusinesscentre.com/virtual-office/alamat-bisnis-jakarta-selatan"
            schemaObject={schemaObject}
            hero={{
                badge1: 'Legal Foundation',
                badge2: 'Domisili Resmi',
                h1: 'Alamat Bisnis Jakarta Selatan: Implikasi Administratif & Batas Legalitas KPP',
                subheading: 'Alamat bisnis di kartu nama Anda bukanlah fiksi tanpa bukti otentik. Pemilihan titik ini menentukan yurisdiksi otoritas penerbit NIB dan pajak. <a href="/virtual-office" class="text-accent font-bold hover:underline">Virtual office Bintaro Business Centre menyediakan domisili di Pesanggrahan, Jakarta Selatan</a> untuk memastikan bahwa setiap akta perizinan KBLI Anda bernaung murni di bawah otoritas sistem administrasi DKI Jakarta raya yang kuat.',
                ctaLabel: 'Apa Pentingnya Domisili?',
                ctaHref: '#problem',
                image: '/images/sewa-kantor/ruangan-kantor-utama.jpg'
            }}
            problem={{
                title: 'Jangkar Perizinan Usaha dan Kaitan Instansi Pemerintah',
                paragraphs: [
                    'Identitas perusahaan dalam kancah nasional selalu dipetakan menggunakan titik geografis lokasi usahanya. NIB (Nomor Induk Berusaha), TDP, dan berbagai izin komersial diterbitkan oleh dinas kawasan terkait yang membawahi teritorial letak kedudukan gedung itu berdiri.',
                    'Sebagai contoh riil, perusahaan yang memilih domisili perbatasan di Bintaro Selatan (wilayah Banten) akan diatur oleh aparatur Tangerang Selatan. Namun, jika Anda mencantumkan titik domisili di koridor Pesanggrahan—maka Anda berurusan eksklusif dengan DPMPTSP dan KPP Pratama wilayah administratif Jakarta Selatan. Proses mutasi pajak jika di kemudian hari berpindah yurisdiksi sungguh tidak sederhana dan berpeluang membuang sumber daya waktu hingga dua bulan operasi beku.',
                    'Selain itu, ketidakselarasan sekecil apapun antara akta notaris Kemenkumham dengan alamat kontrak fisik yang dilampirkan akan langsung ditolak mesin validasi OSS.'
                ]
            }}
            education={{
                title: 'Implikasi NIB, OSS dan Aturan Pembatasan PKP',
                items: [
                    {
                        title: 'NIB Diikat Kontrak Tersertifikasi',
                        content: 'Penerbitan surat izin harus lolos audit lokasi riil. OSS tak lagi bisa dibodohi domisili fiktif tanpa adanya perjanjian penggunaan virtual office sah berkesinambungan.'
                    },
                    {
                        title: 'KBLI Jasa vs Non-Jasa Sebagai Pengusaha Kena Pajak',
                        content: 'Virtual office sering diagungkan seolah kunci segala pajak. Faktanya, menurut ketentuan nasional, status domisili virtual ini untuk pengajuan PKP amat ketat: "Hanya dimungkinkan bagi KBLI kategori JASA".'
                    },
                    {
                        title: 'Klausul Fisik untuk Distribusi Barang Murni',
                        content: 'Sebaliknya, jika KBLI merujuk pada konstruksi besar atau Perdagangan Barang Distributor (Non-Jasa), pengusaha dimandatkan menghadirkan ruang fisik tertutup yang mengikat. Hal ini didukung oleh opsi upgrade ke tingkat atas seperti yang diulas <a href="/virtual-office-jakarta-selatan" class="text-accent hover:underline">dinamika virtual office Jakarta Selatan khusus NIB</a> di jaringan komersial kami.'
                    }
                ]
            }}
            authority={{
                title: 'Perbedaan Aktual Virtual Office & Sewa Ruang Tertutup',
                highlight: 'Berdasarkan hukum komersial, keduanya sama sah dari struktur validitas lokasi, perbedaannya hanya "Batas Kewenangan Jenis KBLI".',
                image: '/images/foto-gedung-bbc.jpg',
                items: [
                    { icon: 'Award', text: 'Skema domisili Virtual dilarang berstatus izin manufaktur raksasa dan pergudangan tanpa bukti lampiran luasan meter persegi lahan nyata gudang terdaftar instansi.' },
                    { icon: 'ShieldCheck', text: 'Domisili tanpa ruang penuh sangat luwes dipakai software developer, konsultan PR/akuntansi, dan agency pemasaran tanpa benturan audit dari DPMPTSP.' },
                    { icon: 'TrendingUp', text: 'Ruko fisik memiliki fleksibilitas izin luas mencakup segmen non-jasa, tetapi biayanya ratusan juta lebih perih ketimbang mensiasati tarif alamat.' },
                    { icon: 'Users', text: 'Ekspedisi pos akan selalu menemukan letak alamat komersial yang stabil terkurasi pada lobi gedung perkantoran prestis, bukan blok pos security perumahan tertutup.' }
                ]
            }}
            value={{
                title: 'Kesalahan Terbesar Penempatan Domisili Tahap Perdana',
                items: [
                    { title: 'Salah Nama Kecamatan', desc: 'Identifikasi \'Bintaro\' sering mengecoh karena teriris 2 propinsi. Memastikan garis lintang DKI terproteksi valid adalah asuransi pengurusan pajak mutlak.', icon: 'MapPin' },
                    { title: 'Operator Tidak Sah', desc: 'Pemilih ruko ilegal tidak punya peruntukan SK domisili penyedia ruang. Alamat mereka bisa di-_blacklist_ pemerintah daerah kelak.', icon: 'AlertTriangle' },
                    { title: 'KBLI Terlarang', desc: 'Mencoba nekat daftar agen bea cukai pelabuhan dengan sewa VO murah akan berujung surat balasan tolak validasi DPMPTSP KPP secara permanen.', icon: 'CheckSquare' },
                    { title: 'Klaim Tidak Relevan', desc: 'Pemakaian alamat tidak profesional seperti \'rumah kost\' langsung menandakan kapasitas peredaran uang kecil di mata partner kreditor bank besar.', icon: 'TrendingUp' }
                ]
            }}
            options={{
                title: 'Skala Proteksi Alamat Wilayah Selatan',
                intro: 'Kondisikan skala bisnis dengan model legalitas yang tepat investasi.',
                option1: {
                    title: 'Paket Domisili Inti',
                    desc: 'Akses SK Domisili Gedung yang langsung dapat disetor pada Notaris kepercayaan perusahaan untuk membangkitkan akta NIB baru tanpa delay birokrasi ekstra.',
                    suitableForTitle: 'Cocok Untuk Kebutuhan',
                    suitableForDesc: 'Lembaga Non-Profit Yayasan, Programmer Agensi Tunggal, atau Konsultansi Bisnis (KBLI Jasa).',
                    bullets: ['Terdaftar Valid Pemda', 'Resepsionis Surat-menyurat']
                },
                option2: {
                    title: 'Paket Fisik Ruang (Upgrade)',
                    desc: 'Kontrak penyediaan dimensi ruang tertutup untuk migrasi PKP ke tingkat yang mengeksekusi perdagangan retail skala besar.',
                    suitableForTitle: 'Cocok Untuk',
                    suitableForDesc: 'Importir otomotif, pedagang alat berat subkontraktor dan ekspedisi distribusi (Non-Jasa).',
                    bullets: ['Mendukung Surat Survey Instansi Pajak', 'Ruang Tamu Representatif Khusus']
                }
            }}
            internalLinks={{
                title: 'Gali Penunjang Validitas Operasional',
                card1: {
                    title: 'Pusat Tarif Fasilitas Resmi',
                    desc: 'Dapatkan angka pembanding tarif terukur untuk memperkirakan biaya operasional dan pemeliharaan representasional lini depan.',
                    ctaLabel: 'Referensi Harga',
                    href: '/harga-virtual-office-jakarta-selatan'
                },
                card2: {
                    title: 'Kantor Strategis Tol W2S',
                    desc: 'Lompat dari domisili legal ke kehadiran operasional mobil logistik prima melalui kawasan konektivitas ganda unggulan Jakarta.',
                    ctaLabel: 'Tinjau Area',
                    href: '/kantor-dekat-tol-veteran'
                }
            }}
            relatedArticles={{
                title: 'ARTIKEL TERKAIT SEPUTAR HUKUM',
                links: [
                    { title: 'Status Regulasi Virtual Office Jakarta', href: '/virtual-office/jakarta-selatan' },
                    { title: 'Definisi Area Bintaro Selatan', href: '/virtual-office-bintaro' }
                ]
            }}
            faq={{
                title: 'FAQ Integritas Legalitas Pendaftaran NPWP/PKP',
                items: [
                    { q: 'Apakah ada perbedaan biaya perizinan negara jika saya memakai Virtual Office dibanding ruko?', a: 'Tidak ada diferensiasi "tarif mesin perizinan negara" antara pengguna ruko sewaan luas maupun layanan domisili VO. Namun VO jelas memotong miliaran rupiah komitmen biaya sewa per tahun pertama sebelum laba tercapai.' },
                    { q: 'Bagaimana jika notaris meminta IMB gedung?', a: 'Penyedia domisili yang absah selalu dilengkapi bundel legalitas salinan IMB resmi peruntukan niaga serta PBB ter-update, yang akan diberikan sebagai prasyarat bagi Anda meneruskan pengajuan akta notaris Kemenkumham.' },
                    { q: 'Apakah Bintaro Business Centre memfasilitasi pendirian PT sekaligus?', a: 'Ya, Anda dapat berkoordinasi langsung dengan tim fasilitator kami yang terhubung akrab bersama jaringan notaris domisili Jakarta Selatan agar penyelarasan birokrasi berjalan utuh tanpa pihak ketiga yang lepas tangan.' }
                ]
            }}
            bottomCTA={{
                title: 'Integritas Alamat Merupakan Pantulan Perusahaan Anda',
                subtitle: 'Keputusan lokasi legal tidak bisa ditarik tanpa proses pencabutan dokumen besar-besaran. Jangan bertaruh di atas fondasi yang lemah secara yurisdiksi kota dan retensi dukungan. Mulai pembicaraan strategis seputar perizinan DKI bersama kami.',
                primaryCTA: { label: 'Konsultasi Perizinan PT/CV Sekarang', href: 'https://wa.me/628128888069' },
                secondaryCTA: { label: 'Lihat Detail Tarif Domisili', href: '/harga-virtual-office-jakarta-selatan' }
            }}
        />
    )
}
