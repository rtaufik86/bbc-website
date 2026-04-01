import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

const currentYear = new Date().getFullYear()
const title = `Cara Menilai Harga Sewa Kantor di Bintaro: Faktor dan Struktur Biaya ${currentYear}`
const description = 'Penjelasan cara menilai nilai nyata ruang kantor di Bintaro. Faktor lokasi, fasilitas, dan struktur kontrak yang membentuk perbandingan antar pilihan.'

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
        <WeaponPageTemplate
            title={title}
            description={description}
            canonicalUrl="https://www.bintarobusinesscentre.com/sewa-kantor/harga"
            schemaObject={schemaObject}
            hero={{
                badge1: 'Evaluasi Penawaran',
                badge2: 'Kantor Bintaro',
                h1: 'Cara Menilai Harga Sewa Kantor di Bintaro Secara Kritis',
                subheading: 'Dua ruang dengan harga sama bisa memberikan nilai aktual sangat berbeda di Bintaro. <a href="/sewa-kantor" class="text-accent font-bold hover:underline">BBC menyediakan kantor all-in di Jakarta Selatan</a> — struktur harga kami adalah landasan benchmark transparan saat Anda bernegosiasi.',
                ctaLabel: 'Kerangka Dasar Penilaian Sewa',
                ctaHref: '#problem',
                image: '/images/sewa-kantor/ruangan-kantor-minimalis.jpg'
            }}
            problem={{
                title: 'Dimensi Harga Sewa Kantor di Bintaro: Ukuran vs Kenyataan',
                paragraphs: [
                    'Ukuran ruang adalah variabel paling langsung yang mempengaruhi harga sewa. Namun hubungannya tidak selalu linear — harga per meter persegi bisa lebih tinggi untuk ruang kecil karena ada biaya minimum operasional yang harus ditanggung oleh operasional (cleaning, resepsionis) siap tiap blok.',
                    'Sebagai contoh, kantor 10m² (Kapasitas 1-2 orang) berada di kisaran terendah, optimal bagi konsultan pendiri. Memasuki area 12m–20m (Kapasitas 2-8 tim), terjadi kurva harga yang lebih ramah bagi <a href="/sewa-kantor/bintaro" class="text-accent hover:underline">konsep fasilitas scale up sewa kantor Bintaro skala departemen ini</a>. Namun tanpa mengecek lokasi, nilai murni hanya janji angka.',
                    'Lokasi Bintaro melintang cukup lebar secara administratif, Anda berisiko terjebak penyedia yang memposisikan letaknya dekat mall elit tangsel namun jauh dari jalur logistik ekspres kota metropolitan utamanya.'
                ]
            }}
            education={{
                title: 'Perbandingan Harga Bintaro vs Area Jakarta Lain',
                items: [
                    {
                        title: 'Akses vs Harga Kompetitif Bintaro/Pesanggrahan',
                        content: 'Berada di pinggiran Jorr W2S dan perbatasan kawasan bisnis Bintaro Jaya memberi harga terjangkau ketimbang TB Simatupang. <a href="/kantor-dekat-tol-veteran" class="text-accent hover:underline">Akses 1,3km dari Pintu Tol Veteran</a> menjamin harga ini dibayar pula dengan keterhubungan prima tanpa menyuap macet Fatmawati. Yurisdiksi full DKI Jakarta.'
                    },
                    {
                        title: 'TB Simatupang Business District',
                        content: 'Wilayah perkantoran tower ini menuntut premium pricing korporat Tbk dan multinasional. Sering terjebak botleneck lampu merah arteri. Opex / sewa di situ bisa 300% dari koridor Pesanggrahan namun pamor prestisenya sangat tajam untuk banking sektoral.'
                    },
                    {
                        title: 'Gemerlap Sudirman-Thamrin CBD',
                        content: 'Puncak biaya sewa tertinggi se-Indonesia dengan tantangan operasional harian bergejolak (ganjil-genap, demo). Pilihan elit murni, bila Anda tak wajib bermarkas di titik o-kilometers ini, radius perbatasan selatan adalah kelegaan cost efficiency luar biasa.'
                    }
                ]
            }}
            authority={{
                title: 'Apa yang Termasuk vs Tersembunyi di Penawaran Anda?',
                highlight: 'Biaya over-use dan eskalasi tahunan adalah momok terdiam dari broker ruang konvensional ketika menekan harga depan terlihat gila murah.',
                image: '/images/sewa-kantor/ruangan-kantor-utama.jpg',
                items: [
                    { icon: 'Zap', text: 'All-In: Utilitas PLN murni, AC terpusat / dinding, sanitasi toilet (sudah dibayar bersih)' },
                    { icon: 'Smile', text: 'Resepsionis frontdesk di-shared layaknya karyawan representasi tanpa menguras slip gaji rekrutmen' },
                    { icon: 'CreditCard', text: 'Harga sewa tak mencakup Deposit 1–3 bulan tunai. Pertanyakan cash-flow lock dana jaminan ini' },
                    { icon: 'Clock', text: 'Kuota penggunaan meeting room eksklusif: apakah gratis harian / jam di paket atau tagih ketat log pemakaian per-menit.' }
                ]
            }}
            value={{
                title: 'Biaya Tak Langsung Yang Harus Ditekan Manajemen',
                items: [
                    { title: 'Time to Operasional', desc: 'Bila tidak "Siap Pakai/Furnished", biaya kontraktor dan pusing kepala fitting out akan setara 60% sewa (capex vs opex).', icon: 'Clock' },
                    { title: 'Biaya Pindah Legalitas PT', desc: 'Lokasi yang bukan wilayah valid bisnis mengharuskan cabut izin NIB untuk pindah kabupaten, buang 1-2 bulan lumpuh admin.', icon: 'FileText' },
                    { title: 'Biaya Terminasi Dini', desc: 'Pahamilah klausul pemutusan bila PT bubar atau sebaliknya membludak perlu pindah cepat — apakah pinalti wajar?', icon: 'AlertTriangle' },
                    { title: 'Biaya Maintenance', desc: 'Bohlam mati, AC netes, wastafel tersumbat. Penyedia Service office mengatasinya dalam 5 menit, ruko sewa perantara mensyaratkan Anda bayar tukang dari kantong sendiri.', icon: 'ShieldCheck' }
                ]
            }}
            options={{
                title: 'Menghitung Total Cost of Occupancy Ruang Bebas Stres',
                intro: 'Harga hanyalah fasad pertama, nilailah operasional akhir (net balance).',
                option1: {
                    title: 'Serviced Office (Siap Kerja)',
                    desc: 'Harga tinggi di kertas tagihan awal bulanan.',
                    suitableForTitle: 'Implikasi Akhir:',
                    suitableForDesc: 'Biaya ekstra tak terduga nol%. Tidak ada drama teknisi gedung minta charge ke Anda. Internet wifi putus segera dibackup IT in-house lantai.',
                    bullets: ['Biaya Statis Fix', 'Risiko Penuh Operator Gedung']
                },
                option2: {
                    title: 'Ruko Kosong (Konvensional)',
                    desc: 'Harga 50% lebih murah per meter sekan mata pada kuitansi DP.',
                    suitableForTitle: 'Implikasi Akhir:',
                    suitableForDesc: 'Ratusan juta lari ke interior, partisi internet provider komersial. Jika bulan keenam atap bocor menetes ke laptop karyawan — kerugian dan stres Anda tanggung 100%.',
                    bullets: ['Capex Besar di Awal', 'Penguras Waktu Terus Menerus']
                }
            }}
            internalLinks={{
                title: 'Eksplorasi Parameter Harga Secara Regional Bintaro',
                card1: {
                    title: 'Panduan Harga Bintaro Kompleks',
                    desc: 'Pelajari harga sewa di koridor selatan sebagai fundamental operasional ekspansi.',
                    ctaLabel: 'Bongkar Struktur Harga',
                    href: '/harga-sewa-kantor-bintaro'
                },
                card2: {
                    title: 'Sewa Kantor Virtual Office Berizin Jakarta Selatan',
                    desc: 'Bila harga fisik masih berat, turunkan komitmen ke Virtual Office dengan hasil surat izin legalitas tetap kuat perpanjangan administrasi.',
                    ctaLabel: 'Solusi Virtual Pilihan',
                    href: '/harga-virtual-office-jakarta-selatan'
                }
            }}
            relatedArticles={{
                title: 'ARTIKEL TERKAIT',
                links: [
                    { title: 'Kantor Dekat Tol Veteran JORR (W2S)', href: '/kantor-dekat-tol-veteran' },
                    { title: 'Kantor Dekat Bintaro Jaya (Pesanggrahan Jaksel)', href: '/kantor-dekat-bintaro-jaya' },
                    { title: 'Sewa Kantor Jakarta Selatan', href: '/sewa-kantor/jakarta-selatan' }
                ]
            }}
            faq={{
                title: 'Pertanyaan Praktis Sewa Ruangan Bintaro',
                items: [
                    { q: 'Apakah meeting room dan internet di BBC sudah all-in dalam harga per paket per m2?', a: 'Internet koneksi fiber broadband dedikasi sepenuhnya disediakan gratis. Meeting room dikelola melalui skema jam kuota free / allowance per-bulan berdasar luasan ruang; setelah melampaui baru tarif murah dipatok proporsional guna fairness.' },
                    { q: 'Harga paket per bulan apakah wajib bayar full setahun secara tunai 100% di depan kontrak?', a: 'Metode term of payment dapat didiskusikan mulai dari kuartalan hingga tahunan demi menyejukkan cash flow perusahaan yang sedang berkembang pesat (terutama IT start-up atau kontraktor event murni).' }
                ]
            }}
            bottomCTA={{
                title: 'Negosiasikan Posisi dan Ruangan Anda Sekarang',
                subtitle: 'Datang langsung bersama pimpinan finance Anda. Hitunglah cost ratio operasional BBC menghadapi risiko capex Ruko/office telanjang sebelum meneken sepeser tagihan pun.',
                primaryCTA: { label: 'Tanya Penawaran via WA', href: 'https://wa.me/628128888069' },
                secondaryCTA: { label: 'Lihat Detail Paket Bintaro Center', href: '/sewa-kantor' }
            }}
        />
    )
}
