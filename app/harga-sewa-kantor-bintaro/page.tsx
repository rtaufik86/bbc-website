import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'
import { buildWhatsAppLink } from '@/lib/tracking/cta'

const waUrlInline = buildWhatsAppLink({ text: 'Halo BBC, saya ingin info harga sewa kantor Bintaro.', service: 'office', cta: 'mid', intent: 'pricing', phone: '6281210002131' })

export default function HargaSewaKantorBintaroPage() {
    return (
        <WeaponPageTemplate
            url="/harga-sewa-kantor-bintaro"
            title="Harga Sewa Kantor Bintaro: Struktur Biaya & Faktor Penentu"
            description="Informasi transparan mengenai harga sewa kantor di Bintaro, struktur biaya per bulan, dan perbandingan antara kantor konvensional vs serviced office."
            canonicalUrl="https://www.bintarobusinesscentre.com/harga-sewa-kantor-bintaro"
            h1="Harga Sewa Kantor Bintaro: Struktur Biaya & Faktor Penentu"
            intro="Mencari harga sewa kantor di Bintaro tanpa memahami apa yang masuk dalam angka tersebut adalah cara tercepat untuk salah membandingkan di <a href='/sewa-kantor'>layanan sewa kantor Bintaro Business Center</a>."
            entity="sewa-kantor"
            location="bintaro"
            heroBadges={{ b1: "Sewa Kantor", b2: "Bintaro" }}
            sections={[
                {
                    id: "problem",
                    h2: "Memahami Apa yang Anda Bayar",
                    rawHtml: `
                        <p>Dua kantor dengan harga yang sama bisa memberikan pengalaman yang sangat berbeda â€” tergantung apa yang tercakup dan apa yang tidak. Di Bintaro Business Center, kami beroperasi dengan model all-inclusive: satu angka, satu tagihan.</p>
                        <p>Sebelum memutuskan, penting untuk memahami bagaimana struktur biaya sewa kantor terbentuk â€” agar Anda bisa membuat perbandingan yang akurat dan keputusan yang paling efisien bagi cash flow perusahaan.</p>
                    `
                },
                {
                    id: "education",
                    h2: "Komponen Biaya Sewa Kantor Modern",
                    rawHtml: `
                        <h3>Sewa Ruang &amp; Service Charge</h3>
                        <p>Biaya dasar adalah hak penggunaan ruang. Namun, Anda juga harus memperhitungkan service charge untuk kebersihan area umum, keamanan, dan manajemen properti. Di serviced office, angka ini biasanya sudah digabung.</p>

                        <h3>Utilitas (Listrik, Air, Internet)</h3>
                        <p>Inilah komponen yang paling sering menjadi sumber kejutan biaya. Kantor konvensional menagih berdasarkan konsumsi aktual, sementara model all-inclusive menghilangkan variabel ini dari pengeluaran bulanan Anda.</p>

                        <h3>Fasilitas &amp; Layanan Resepsionis</h3>
                        <p>Apakah harga tersebut sudah termasuk penanganan tamu, surat-menyurat, dan akses internet berkecepatan tinggi? Verifikasi fasilitas yang tercakup sebelum menyetujui kontrak. Untuk gambaran lengkapnya, lihat <a href="/sewa-kantor/kantor-siap-pakai-bintaro" class="text-accent hover:underline">fasilitas kantor siap pakai BBC</a> yang sudah termasuk dalam satu paket sewa.</p>
                    `
                },
                {
                    id: "authority",
                    h2: "Efisiensi Total Cost of Occupancy",
                    rawHtml: `
                        <p>Untuk bisnis yang menghitung total cost â€” bukan hanya angka sewa â€” serviced office sering kali lebih efisien secara keseluruhan.</p>
                    `,
                    visual: {
                        type: "card",
                        items: [
                            { title: "Transparansi biaya tanpa hidden fees", icon: "Calculator" },
                            { title: "Model all-inclusive: Listrik, Internet, &amp; Maintenance", icon: "CheckCircle2" },
                            { title: "Lebih hemat hingga 30% dibanding setup kantor mandiri", icon: "TrendingUp" }
                        ]
                    }
                },
                {
                    id: "value",
                    h2: "Mengapa Bintaro Sektor 7?",
                    visual: {
                        type: "card",
                        items: [
                            { title: "Akses Strategis", desc: "Akses tol langsung memudahkan mobilitas tim dan kunjungan klien.", icon: "MapPin" },
                            { title: "Ekosistem Bisnis", desc: "Berada di pusat komersial Bintaro dengan fasilitas pendukung lengkap.", icon: "Building2" },
                            { title: "Lingkungan Modern", desc: "Suasana kerja profesional yang meningkatkan produktivitas tim.", icon: "Zap" },
                            { title: "Parkir Terjamin", desc: "Kapasitas parkir luas yang seringkali sudah termasuk dalam paket sewa.", icon: "Truck" }
                        ]
                    }
                },
                {
                    id: "options",
                    h2: "Konvensional vs Serviced Office",
                    rawHtml: `
                        <p>Pilih model yang paling sesuai dengan kebutuhan jangka panjang bisnis Anda.</p>

                        <h3>Serviced Office</h3>
                        <p>Kemas semua kebutuhan operasional dalam satu harga tetap setiap bulan.</p>
                        <p><strong>Ideal Untuk</strong><br/>Startup, UKM, dan tim yang ingin fokus ke bisnis tanpa pusing urusan operasional kantor.</p>
                        <ul>
                            <li>Setup instan (Plug &amp; Play)</li>
                            <li>Budget bulanan terukur</li>
                            <li>Kontrak fleksibel</li>
                            <li>Gratis Meeting Room</li>
                        </ul>

                        <h3>Kantor Konvensional</h3>
                        <p>Sewa ruang kosong yang memberikan kebebasan kustomisasi penuh sesuai brand.</p>
                        <p><strong>Ideal Untuk</strong><br/>Perusahaan besar dengan tim di atas 20 orang dan kebutuhan renovasi khusus.</p>
                        <ul>
                            <li>Kustomisasi layout penuh</li>
                            <li>Identitas brand lebih kuat</li>
                            <li>Kontrak jangka panjang</li>
                            <li>Akses 24/7 mandiri</li>
                        </ul>
                    `
                },
                {
                    id: "cta",
                    h2: "Dapatkan Penawaran Sewa Terbaik Hari Ini",
                    rawHtml: `
                        <p>Satu harga untuk semua kebutuhan kantor Anda. Tanpa biaya tersembunyi.</p>
                        <p><a href="${waUrlInline}">WhatsApp Untuk Info Harga</a> | <a href="/sewa-kantor">Tinjau Lokasi</a></p>
                    `
                }
            ]}
            internalLinks={{
                intro: {
                    label: "Bandingkan Paket Sewa",
                    href: "/sewa-kantor/bintaro"
                },
                mid: {
                    label: "Lihat Pilihan Ruang Kantor",
                    href: "/sewa-kantor"
                },
                closing: {
                    label: "Lihat Paket Virtual Office",
                    href: "/virtual-office"
                }
            }}
            faq={{
                title: "Pertanyaan Seputar Harga Sewa",
                items: [
                    {
                        q: "Berapa kisaran harga sewa kantor di Bintaro?",
                        a: "Untuk serviced office all-inclusive di kawasan Bintaro, kisaran harga umumnya dimulai dari Rp 2â€“3 juta per bulan untuk ruang kecil, hingga Rp 6â€“8 juta untuk ruang yang lebih besar dengan fasilitas lengkap. Harga ini sudah mencakup furniture, internet, resepsionis, dan utilitas."
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
        />
    )
}

