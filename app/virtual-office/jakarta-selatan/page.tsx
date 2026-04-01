import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

const title = 'Virtual Office Jakarta Selatan: Fungsi Legalitas Perizinan NIB dan PKP'
const description = 'Menelusuri batasan operasional penyewaan alamat bisnis komersial. Ketahui posisi virtual office untuk KBLI Jasa dan hubungannya di ranah hukum DKI.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/virtual-office/jakarta-selatan' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/virtual-office/jakarta-selatan',
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
                "@id": "https://www.bintarobusinesscentre.com/virtual-office/jakarta-selatan/#webpage",
                "url": "https://www.bintarobusinesscentre.com/virtual-office/jakarta-selatan",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/virtual-office/jakarta-selatan/#article",
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
                        "name": "Apakah virtual office bisa digunakan untuk semua jenis usaha?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Untuk registrasi alamat domisili akta legal dan pendirian awal perusahaan, umumnya diizinkan. Namun untuk peningkatan status operasional PKP kepabeanan industri makro, terbatasi hanya pada jenis golongan KBLI Jasa eksklusif."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah alamatnya benar-benar di dalam garis kota otonom?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Virtual office ini menempati domisili wilayah selatan murni dengan kepastian nomor legal persil Kecamatan Pesanggrahan yang tervalidasi sebagai ibukota berhak penuh atas kode surat administrasi pajak DKI Jakarta."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Bagaimana manajemen telepon diwakilkan?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Setiap ada panggilan masuk yang menyasar line khusus, tim front-desk berdedikasi kami akan merespons menggunakan nama resmi PT Anda sebagai kalimat sapaan perdana yang merefleksikan pamor prestis skala tinggi."
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
            canonicalUrl="https://www.bintarobusinesscentre.com/virtual-office/jakarta-selatan"
            schemaObject={schemaObject}
            hero={{
                badge1: 'Perizinan Legal',
                badge2: 'Otoritas DKI',
                h1: 'Virtual Office Jakarta Selatan: Tata Cara Legalitas NIB, Fungsi & PKP KBLI Jasa',
                subheading: 'Sebagai sentra mobilitas komersial terbesar, penyewaan hak penggunaan identitas alamat gedung berkembang drastis. <a href="/virtual-office" class="text-accent font-bold hover:underline">Fasilitas virtual office eksklusif di wilayah Jakarta Selatan</a> kini menyediakan ruang administrasi valid yang relevan di mata perizinan pemerintah.',
                ctaLabel: 'Solusi Domisili Sah',
                ctaHref: '#problem',
                image: '/images/foto-gedung-bbc.jpg'
            }}
            problem={{
                title: 'Apakah Alamat di Luar Kapasitas Fisik Tetap Legal?',
                paragraphs: [
                    'Konsep layanan ini bukan sebuah celah fiktif, hal tersebut justru sudah diapresiasi oleh ketetapan dinas terkait sebagai solusi mempercepat tumbuh kembang efisiensi perusahaan UMKM dan Startup teknologi tanpa mewajibkan penyewa menyewa dinding tembok dan lantai mahal.',
                    'Operator gedung secara yuridis meminjamkan "hak penggunaan surat-menyurat teritorial gedungnya" sebagai titik kordinat usaha yang terpaku ke akta notaris Anda. Identitas dari dinas seperti NIB/TDP bisa melacak eksistensi pengusaha dengan jaminan kehadiran pengelola gedung berizin otentik di belakangnya.',
                    'Namun, kemunculan ribuan agen virtual asal-asalan menciptakan persepsi bias. Legalitas dan status PKP (Pengusaha Kena Pajak) mendikte limitasi ketat: perusahaan tidak bisa asal beli virtual office apabila kode Klasifikasi Baku Lapangan Usaha (KBLI) mereka mensyaratkan inspeksi mesin pabrikan raksasa.'
                ]
            }}
            education={{
                title: 'Hak Pakai KBLI: Pemisahan Jasa dan Perdagangan',
                items: [
                    {
                        title: 'KBLI Layanan Jasa dan Digital',
                        content: 'Pihak perpajakan memberikan toleransi operasional virtual kepada klasifikasi usaha seperti Konsultan Hukum, Pengembangan Piranti Lunak, Penggiat Media dan Pemasaran. Profil tim yang bekerja remote di cafe terkemuka tetap sah mengklaim domisili absah.'
                    },
                    {
                        title: 'Pemblokiran PKP untuk Jual Beli Komoditi Kasar',
                        content: 'Apakah Anda distributor sparepart atau pengusaha konstruksi baja? Yurisdiksi menyatakan larangan domisili virtual di kasus ini demi inspeksi kepatuhan pergudangan tertutup. Dalam kasus pengajuan dokumen bea ini, perpajakan menuntut eksistensi <a href="/alamat-bisnis-jakarta-selatan" class="text-accent hover:underline">alamat bisnis dengan peninjauan sewa fisik 1 tahun legal di Jakarta Selatan.</a>'
                    },
                    {
                        title: 'Tarik Ulur Pilihan Skalabilitas',
                        content: 'Sebuah institusi berkembang dapat bermula menancapkan bendera PT di domisili virtual, lantas kelak bermigrasi menempati luasan meter fisik pada gedung manajemen yang identik demi menghindari perubahan akta fatal merusak NIB OSS di masa sibuk omzet.'
                    }
                ]
            }}
            authority={{
                title: 'Fungsi Representasional Eksekutif yang Terjaga',
                highlight: 'Bukan perihal akta notaris Kemenkumham belaka, persepsi bisnis Anda direpresentasikan oleh fasilitator berkelas selama Anda tak ada di tempat aslinya.',
                image: '/images/sewa-kantor/ruangan-kantor-utama.jpg',
                items: [
                    { icon: 'Smile', text: 'Resepsionis berintegritas menerima sapaan relasi ekspedisi yang kebingungan mengantarkan dokumen akuntansi dari partner.' },
                    { icon: 'Mail', text: 'Katalog surat harian dipisah secara rahasia dan dinotifikasikan via kanal WhatsApp ke PIC perusahaan agar direktur utama dapat merapat ketika amplop itu urgen di hari tersebut.' },
                    { icon: 'PhoneCall', text: 'Jalur komunikasi statis di meja depan didedikasikan atas nama brand Anda (penyebutan nama CV saat penelepon bertanya).' },
                    { icon: 'Calendar', text: 'Di saat audit mendadak muncul, tersedia reservasi kilat ruangan pertemuan yang menjamu para pemeriksa atau panitia tender tertutup di meja marmer layak.' }
                ]
            }}
            value={{
                title: 'Menembus Pasar Elit Meski Mobilitas Remote Tinggi',
                items: [
                    { title: 'Tarik Kepercayaan Mitra B2B', desc: 'Kartu relasi memampang gedung bertingkat kawasan bergengsi RC Veteran dan menghilangkan stigma bisnis musiman perumahan kos fiktif.', icon: 'Building2' },
                    { title: 'Efisiensi Menyeluruh 90%', desc: 'Tagihan air, gaji penjaga keamanan, listrik lobi—seluruh komponen ini dihapus tuntas dari neraca operasional akuntan PT kecil muda.', icon: 'TrendingUp' },
                    { title: 'Peningkatan Kepatuhan NPWP', desc: 'Sertifikat domisili kecamatan merujuk resmi KPP Pratama Pesanggrahan, bukan sekadar pelat tempelan yang dirazia satpol di masa mediasi.', icon: 'ShieldCheck' },
                    { title: 'Adaptasi Era Distilasi Digital', desc: 'Struktur pegawai yang serba nomaden tak akan pernah kehilangann markas fisik administrasi pengiriman sampel produk dan pengukuhan lisensi BPOM ringan.', icon: 'Clock' }
                ]
            }}
            options={{
                title: 'Pilihan Konfigurasi Layanan Virtual',
                intro: 'Pendekatan spesifik tingkat layanan komunikasi harian.',
                option1: {
                    title: 'Tier Domisili Core Plus',
                    desc: 'Akses SK Domisili Gedung yang langsung dapat disetor pada Notaris kepercayaan disertai fasilitas Mail Handling lengkap dan resepsionis representasional ramah lingkungan.',
                    suitableForTitle: 'Stabilitas Fondasi Untuk',
                    suitableForDesc: 'Programmer freelance, Content Creator terkemuka, Konsultan Asuransi.',
                    bullets: ['Hak Pemakaian Alamat B2B Penuh', 'Kompilasi Penerimaan Dokumen Urgen Klien']
                },
                option2: {
                    title: 'Tier Call Dedicated',
                    desc: 'Semua fungsi awal lengkap plus dedicated phone forwarding. Nomor telpon perusahan Anda ditarik di direktori dan dijawab personal secara eksklusif selayaknya staff pribadi teladan.',
                    suitableForTitle: 'Sangat Menunjang Gengsi',
                    suitableForDesc: 'Lembaga Audit Legalitas Mutu dan Agensi Eksekutif Humas korporasi Ibukota.',
                    bullets: ['Terhubung Extension Ponsel Direktur', 'Menambah Citra Valuasi Multinasional Sejati']
                }
            }}
            internalLinks={{
                title: 'Eksplorasi Transisi Ruangan ke Ekosistem Tertutup',
                card1: {
                    title: 'Dinamika Batasan Bintaro - Jakarta',
                    desc: 'Pelajari garis lintang yang sering mengelabui awam, dan ketahui ruko mana saja yang mengamankan validitas NIB KPP setempat DKI asli.',
                    ctaLabel: 'Tinjau Geografi Wilayah Alamat',
                    href: '/virtual-office-bintaro'
                },
                card2: {
                    title: 'Pergeseran Fasilitas Konvensional Praktis',
                    desc: 'Saat tiba hari kelulusan menuju rekrutmen massal fisik 10 orang staf purnawaktu bertempat, ketahui harga pindah antar dinding tertutup eksklusif.',
                    ctaLabel: 'Cek Pilihan Ruang Sewa',
                    href: '/sewa-kantor/kantor-siap-pakai-bintaro'
                }
            }}
            relatedArticles={{
                title: 'ARTIKEL TERKAIT PANDANGAN NILAI LEGALITAS',
                links: [
                    { title: 'Kalkulasi Risiko Harga Murah Terselubung', href: '/sewa-kantor/murah-jakarta-selatan' },
                    { title: 'Dampak Peruntukan Domisili Wilayah Atas KPP Pratama', href: '/virtual-office/alamat-bisnis-jakarta-selatan' }
                ]
            }}
            faq={{
                title: 'FAQ Layanan dan Kesahihan Representasi Muka',
                items: [
                    { q: 'Bagaimana jika notaris saya di Tangsel dan virtual office ini di Jaksel?', a: 'Pembuatan PT sebenarnya dimungkinkan melintas batas notaris asal masih berlisensi resmi NKRI, tetapi penunjukan KPP perpajakan NIB Anda mutlak selalu mengunci sesuai koordinat wilayah alamat Pesanggrahan Selatan sebagai pusat administrasi NPWP mutlak.' },
                    { q: 'Apakah meeting room gratis disertakan setiap rentang bulannya?', a: 'Ya, ketersediaan alokasi kuota rapat disematkan sebagai privilege tenant resmi pendatang untuk menjamu klien penting tanpa biaya eksternal coworking space luaran tak terkontrol.' },
                    { q: 'Apakah papan logo identitas perusahaan saya bisa ditegakkan di pelataran pagar depan?', a: 'Standar regulasi virtual building secara kumulatif mengatur nama terdaftar pada _tenant directory lobi gedung interaktif_. Pemasangan logo tunggal fisik monumental luar terbatasi pada tenant pengguna sewa lantai komersial masif secara eksklusif tunggal dominan.' }
                ]
            }}
            bottomCTA={{
                title: 'Menyusun Representasi Menawan Adalah Penentu Pertama Validitas',
                subtitle: 'Hindari perizinan yang kelak tergembok red-tape birokrasi akibat salah asuhan domisili di hari pertama pembukaan usaha. Pilihan lokasi yang tepat membantu mendongkrak citra B2B yang serius dan terpercaya selamanya di mata klien.',
                primaryCTA: { label: 'Agendakan Pembenahan Administrasi Anda', href: 'https://wa.me/628128888069' },
                secondaryCTA: { label: 'Telaah Daftar Benefit Bulanan', href: '/harga-virtual-office' }
            }}
        />
    )
}
