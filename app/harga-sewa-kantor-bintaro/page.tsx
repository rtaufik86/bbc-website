import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

export default function HargaSewaKantorBintaroPage() {
    return (
        <WeaponPageTemplate
            title="Harga Sewa Kantor Bintaro: Struktur Biaya & Faktor Penentu"
            description="Informasi transparan mengenai harga sewa kantor di Bintaro, struktur biaya per bulan, dan perbandingan antara kantor konvensional vs serviced office."
            canonicalUrl="https://www.bintarobusinesscentre.com/harga-sewa-kantor-bintaro"
            hero={{
                badge1: "Sewa Kantor",
                badge2: "Bintaro",
                h1: "Harga Sewa Kantor Bintaro: Struktur Biaya & Faktor Penentu",
                subheading: "Mencari harga sewa kantor di Bintaro tanpa memahami apa yang masuk dalam angka tersebut adalah cara tercepat untuk salah membandingkan di <a href='/sewa-kantor'>layanan sewa kantor Bintaro Business Center</a>.",
                ctaLabel: "Cek Price List",
                ctaHref: "https://wa.me/6281210002131",
                image: "/bintaro_office_interior_hero_1775704295338.png"
            }}
            problem={{
                title: "Memahami Apa yang Anda Bayar",
                paragraphs: [
                    "Dua kantor dengan harga yang sama bisa memberikan pengalaman yang sangat berbeda — tergantung apa yang tercakup dan apa yang tidak. Di Bintaro Business Center, kami beroperasi dengan model all-inclusive: satu angka, satu tagihan.",
                    "Sebelum memutuskan, penting untuk memahami bagaimana struktur biaya sewa kantor terbentuk — agar Anda bisa membuat perbandingan yang akurat dan keputusan yang paling efisien bagi cash flow perusahaan."
                ]
            }}
            education={{
                title: "Komponen Biaya Sewa Kantor Modern",
                items: [
                    {
                        title: "Sewa Ruang & Service Charge",
                        content: "Biaya dasar adalah hak penggunaan ruang. Namun, Anda juga harus memperhitungkan service charge untuk kebersihan area umum, keamanan, dan manajemen properti. Di serviced office, angka ini biasanya sudah digabung."
                    },
                    {
                        title: "Utilitas (Listrik, Air, Internet)",
                        content: "Inilah komponen yang paling sering menjadi sumber kejutan biaya. Kantor konvensional menagih berdasarkan konsumsi aktual, sementara model all-inclusive menghilangkan variabel ini dari pengeluaran bulanan Anda."
                    },
                    {
                        title: "Fasilitas & Layanan Resepsionis",
                        content: "Apakah harga tersebut sudah termasuk penanganan tamu, surat-menyurat, dan akses internet berkecepatan tinggi? Verifikasi fasilitas yang tercakup sebelum menyetujui kontrak."
                    }
                ]
            }}
            authority={{
                title: "Efisiensi Total Cost of Occupancy",
                highlight: "Untuk bisnis yang menghitung total cost — bukan hanya angka sewa — serviced office sering kali lebih efisien secara keseluruhan.",
                image: "/bintaro_office_interior_hero_1775704295338.png",
                items: [
                    { icon: "Calculator", text: "Transparansi biaya tanpa hidden fees" },
                    { icon: "CheckCircle2", text: "Model all-inclusive: Listrik, Internet, & Maintenance" },
                    { icon: "TrendingUp", text: "Lebih hemat hingga 30% dibanding setup kantor mandiri" }
                ]
            }}
            value={{
                title: "Mengapa Bintaro Sektor 7?",
                items: [
                    { title: "Akses Strategis", desc: "Akses tol langsung memudahkan mobilitas tim dan kunjungan klien.", icon: "MapPin" },
                    { title: "Ekosistem Bisnis", desc: "Berada di pusat komersial Bintaro dengan fasilitas pendukung lengkap.", icon: "Building2" },
                    { title: "Lingkungan Modern", desc: "Suasana kerja profesional yang meningkatkan produktivitas tim.", icon: "Zap" },
                    { title: "Parkir Terjamin", desc: "Kapasitas parkir luas yang seringkali sudah termasuk dalam paket sewa.", icon: "Truck" }
                ]
            }}
            options={{
                title: "Konvensional vs Serviced Office",
                intro: "Pilih model yang paling sesuai dengan kebutuhan jangka panjang bisnis Anda.",
                option1: {
                    title: "Serviced Office",
                    desc: "Kemas semua kebutuhan operasional dalam satu harga tetap setiap bulan.",
                    suitableForTitle: "Ideal Untuk",
                    suitableForDesc: "Startup, UKM, dan tim yang ingin fokus ke bisnis tanpa pusing urusan operasional kantor.",
                    bullets: ["Setup instan (Plug & Play)", "Budget bulanan terukur", "Kontrak fleksibel", "Gratis Meeting Room"]
                },
                option2: {
                    title: "Kantor Konvensional",
                    desc: "Sewa ruang kosong yang memberikan kebebasan kustomisasi penuh sesuai brand.",
                    suitableForTitle: "Ideal Untuk",
                    suitableForDesc: "Perusahaan besar dengan tim di atas 20 orang dan kebutuhan renovasi khusus.",
                    bullets: ["Kustomisasi layout penuh", "Identitas brand lebih kuat", "Kontrak jangka panjang", "Akses 24/7 mandiri"]
                }
            }}
            internalLinks={{
                title: "Bandingkan Paket Sewa",
                card1: {
                    title: "Pilihan Ruang Kantor",
                    desc: "Lihat berbagai pilihan ukuran ruang kantor siap pakai di Bintaro Sektor 7.",
                    ctaLabel: "Lihat Ruang",
                    href: "/sewa-kantor"
                },
                card2: {
                    title: "Virtual Office",
                    desc: "Hanya butuh alamat tanpa ruang kerja fisik? Virtual office adalah solusinya.",
                    ctaLabel: "Lihat Paket",
                    href: "/virtual-office"
                }
            }}
            faq={{
                title: "Pertanyaan Seputar Harga Sewa",
                items: [
                    {
                        q: "Berapa kisaran harga sewa kantor di Bintaro?",
                        a: "Untuk serviced office all-inclusive di kawasan Bintaro, kisaran harga umumnya dimulai dari Rp 2–3 juta per bulan untuk ruang kecil, hingga Rp 6–8 juta untuk ruang yang lebih besar dengan fasilitas lengkap. Harga ini sudah mencakup furniture, internet, resepsionis, dan utilitas."
                    },
                    {
                        q: "Apa saja biaya tambahan yang perlu diperhitungkan?",
                        a: "Pada model serviced office all-inclusive, biaya tambahan yang umum hanyalah penggunaan meeting room di luar quota paket Anda. Tidak ada tagihan listrik, air, atau service charge tambahan secara terpisah."
                    },
                    {
                        q: "Apakah serviced office lebih mahal dari kantor konvensional?",
                        a: "Secara angka sewa dasar, konvensional tampak lebih murah. Namun jika dihitung total biaya termasuk setup, renovasi, utilitas, dan biaya operasional lainnya, serviced office sering kali lebih efisien untuk tim di bawah 10 orang."
                    }
                ]
            }}
            bottomCTA={{
                title: "Dapatkan Penawaran Sewa Terbaik Hari Ini",
                subtitle: "Satu harga untuk semua kebutuhan kantor Anda. Tanpa biaya tersembunyi.",
                primaryCTA: { label: "WhatsApp Untuk Info Harga", href: "https://wa.me/6281210002131" },
                secondaryCTA: { label: "Tinjau Lokasi", href: "/sewa-kantor" }
            }}
        />
    )
}
