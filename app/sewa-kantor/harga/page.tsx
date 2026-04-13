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
            url="/sewa-kantor/harga"
            title={title}
            description={description}
            canonicalUrl="https://www.bintarobusinesscentre.com/sewa-kantor/harga"
            schemaObject={schemaObject}
            h1="Cara Menilai Harga Sewa Kantor di Bintaro Secara Kritis"
            intro='Dua ruang dengan harga sama bisa memberikan nilai aktual sangat berbeda di Bintaro. <a href="/sewa-kantor" class="text-accent font-bold hover:underline">BBC menyediakan kantor all-in di Jakarta Selatan</a> â€” struktur harga kami adalah landasan benchmark transparan saat Anda bernegosiasi.'
            entity="sewa-kantor"
            location="bintaro"
            heroBadges={{ b1: "Evaluasi Penawaran", b2: "Kantor Bintaro" }}
            sections={[
                {
                    id: "problem",
                    h2: "Dimensi Harga Sewa Kantor di Bintaro: Ukuran vs Kenyataan",
                    rawHtml: `
                        <p>Ukuran ruang adalah variabel paling langsung yang mempengaruhi harga sewa. Namun hubungannya tidak selalu linear â€” harga per meter persegi bisa lebih tinggi untuk ruang kecil karena ada biaya minimum operasional yang harus ditanggung oleh operasional (cleaning, resepsionis) siap tiap blok.</p>
                        <p>Sebagai contoh, kantor 10mÂ² (Kapasitas 1-2 orang) berada di kisaran terendah, optimal bagi konsultan pendiri. Memasuki area 12mâ€“20m (Kapasitas 2-8 tim), terjadi kurva harga yang lebih ramah bagi <a href="/sewa-kantor/bintaro" class="text-accent hover:underline">konsep fasilitas scale up sewa kantor Bintaro skala departemen ini</a>. Namun tanpa mengecek lokasi, nilai murni hanya janji angka.</p>
                        <p>Lokasi Bintaro melintang cukup lebar secara administratif, Anda berisiko terjebak penyedia yang memposisikan letaknya dekat mall elit tangsel namun jauh dari jalur logistik ekspres kota metropolitan utamanya.</p>
                    `
                },
                {
                    id: "education",
                    h2: "Perbandingan Harga Bintaro vs Area Jakarta Lain",
                    rawHtml: `
                        <h3>Akses vs Harga Kompetitif Bintaro/Pesanggrahan</h3>
                        <p>Berada di pinggiran Jorr W2S dan perbatasan kawasan bisnis Bintaro Jaya memberi harga terjangkau ketimbang TB Simatupang. <a href="/kantor-dekat-tol-veteran" class="text-accent hover:underline">Akses 1,3km dari Pintu Tol Veteran</a> menjamin harga ini dibayar pula dengan keterhubungan prima tanpa menyuap macet Fatmawati. Yurisdiksi full DKI Jakarta.</p>

                        <h3>TB Simatupang Business District</h3>
                        <p>Wilayah perkantoran tower ini menuntut premium pricing korporat Tbk dan multinasional. Sering terjebak botleneck lampu merah arteri. Opex / sewa di situ bisa 300% dari koridor Pesanggrahan namun pamor prestisenya sangat tajam untuk banking sektoral.</p>

                        <h3>Gemerlap Sudirman-Thamrin CBD</h3>
                        <p>Puncak biaya sewa tertinggi se-Indonesia dengan tantangan operasional harian bergejolak (ganjil-genap, demo). Pilihan elit murni, bila Anda tak wajib bermarkas di titik o-kilometers ini, radius perbatasan selatan adalah kelegaan cost efficiency luar biasa.</p>
                    `
                },
                {
                    id: "authority",
                    h2: "Apa yang Termasuk vs Tersembunyi di Penawaran Anda?",
                    rawHtml: `
                        <p>Biaya over-use dan eskalasi tahunan adalah momok terdiam dari broker ruang konvensional ketika menekan harga depan terlihat gila murah.</p>
                    `,
                    visual: {
                        type: "card",
                        items: [
                            { title: "All-In: Utilitas PLN murni, AC terpusat / dinding, sanitasi toilet (sudah dibayar bersih)", icon: "Zap" },
                            { title: "Resepsionis frontdesk di-shared layaknya karyawan representasi tanpa menguras slip gaji rekrutmen", icon: "Smile" },
                            { title: "Harga sewa tak mencakup Deposit 1â€“3 bulan tunai. Pertanyakan cash-flow lock dana jaminan ini", icon: "CreditCard" },
                            { title: "Kuota penggunaan meeting room eksklusif: apakah gratis harian / jam di paket atau tagih ketat log pemakaian per-menit.", icon: "Clock" }
                        ]
                    }
                },
                {
                    id: "value",
                    h2: "Biaya Tak Langsung Yang Harus Ditekan Manajemen",
                    visual: {
                        type: "card",
                        items: [
                            { title: "Time to Operasional", desc: "Bila tidak \"Siap Pakai/Furnished\", biaya kontraktor dan pusing kepala fitting out akan setara 60% sewa (capex vs opex).", icon: "Clock" },
                            { title: "Biaya Pindah Legalitas PT", desc: "Lokasi yang bukan wilayah valid bisnis mengharuskan cabut izin NIB untuk pindah kabupaten, buang 1-2 bulan lumpuh admin.", icon: "FileText" },
                            { title: "Biaya Terminasi Dini", desc: "Pahamilah klausul pemutusan bila PT bubar atau sebaliknya membludak perlu pindah cepat â€” apakah pinalti wajar?", icon: "AlertTriangle" },
                            { title: "Biaya Maintenance", desc: "Bohlam mati, AC netes, wastafel tersumbat. Penyedia Service office mengatasinya dalam 5 menit, ruko sewa perantara mensyaratkan Anda bayar tukang dari kantong sendiri.", icon: "ShieldCheck" }
                        ]
                    }
                },
                {
                    id: "options",
                    h2: "Menghitung Total Cost of Occupancy Ruang Bebas Stres",
                    rawHtml: `
                        <p>Harga hanyalah fasad pertama, nilailah operasional akhir (net balance).</p>

                        <h3>Serviced Office (Siap Kerja)</h3>
                        <p>Harga tinggi di kertas tagihan awal bulanan.</p>
                        <p><strong>Implikasi Akhir:</strong><br/>Biaya ekstra tak terduga nol%. Tidak ada drama teknisi gedung minta charge ke Anda. Internet wifi putus segera dibackup IT in-house lantai.</p>
                        <ul>
                            <li>Biaya Statis Fix</li>
                            <li>Risiko Penuh Operator Gedung</li>
                        </ul>

                        <h3>Ruko Kosong (Konvensional)</h3>
                        <p>Harga 50% lebih murah per meter sekan mata pada kuitansi DP.</p>
                        <p><strong>Implikasi Akhir:</strong><br/>Ratusan juta lari ke interior, partisi internet provider komersial. Jika bulan keenam atap bocor menetes ke laptop karyawan â€” kerugian dan stres Anda tanggung 100%.</p>
                        <ul>
                            <li>Capex Besar di Awal</li>
                            <li>Penguras Waktu Terus Menerus</li>
                        </ul>
                    `
                },
                {
                    id: "related",
                    h2: "ARTIKEL TERKAIT",
                    rawHtml: `
                        <ul>
                            <li><a href="/kantor-dekat-tol-veteran">Kantor Dekat Tol Veteran JORR (W2S)</a></li>
                            <li><a href="/kantor-dekat-bintaro-jaya">Kantor Dekat Bintaro Jaya (Pesanggrahan Jaksel)</a></li>
                            <li><a href="/sewa-kantor/jakarta-selatan">Sewa Kantor Jakarta Selatan</a></li>
                        </ul>
                    `
                },
                {
                    id: "cta",
                    h2: "Negosiasikan Posisi dan Ruangan Anda Sekarang",
                    rawHtml: `
                        <p>Datang langsung bersama pimpinan finance Anda. Hitunglah cost ratio operasional BBC menghadapi risiko capex Ruko/office telanjang sebelum meneken sepeser tagihan pun.</p>
                        <p><a href="https://wa.me/628128888069">Tanya Penawaran via WA</a> | <a href="/sewa-kantor">Lihat Detail Paket Bintaro Center</a></p>
                    `
                }
            ]}
            faq={{
                title: "Pertanyaan Praktis Sewa Ruangan Bintaro",
                items: [
                    { q: "Apakah meeting room dan internet di BBC sudah all-in dalam harga per paket per m2?", a: "Internet koneksi fiber broadband dedikasi sepenuhnya disediakan gratis. Meeting room dikelola melalui skema jam kuota free / allowance per-bulan berdasar luasan ruang; setelah melampaui baru tarif murah dipatok proporsional guna fairness." },
                    { q: "Harga paket per bulan apakah wajib bayar full setahun secara tunai 100% di depan kontrak?", a: "Metode term of payment dapat didiskusikan mulai dari kuartalan hingga tahunan demi menyejukkan cash flow perusahaan yang sedang berkembang pesat (terutama IT start-up atau kontraktor event murni)." }
                ]
            }}
            internalLinks={{
                intro: { label: "Bongkar Struktur Harga", href: "/harga-sewa-kantor-bintaro" },
                mid: { label: "Solusi Virtual Pilihan", href: "/harga-virtual-office-jakarta-selatan" },
                closing: { label: "Tanya Penawaran via WA", href: "https://wa.me/628128888069" }
            }}
        />
    )
}

