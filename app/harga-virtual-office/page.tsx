import { Metadata } from 'next'
import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'
import { buildWhatsAppLink } from '@/lib/tracking/cta'

const waUrlInline = buildWhatsAppLink({ text: 'Halo BBC, saya ingin info paket virtual office BBC.', service: 'vo', cta: 'mid', intent: 'pricing', phone: '6281210002131' })
const waUrlClosing = buildWhatsAppLink({ text: 'Halo BBC, saya ingin info paket virtual office BBC.', service: 'vo', cta: 'final', intent: 'pricing', phone: '6281210002131' })

const title = 'Harga Virtual Office: Faktor Penentu & Struktur Biaya'
const description = 'Informasi transparan mengenai harga virtual office di Jakarta Selatan, rincian layanan per paket, dan kapan virtual office menjadi pilihan paling efisien.'
const canonicalUrl = 'https://www.bintarobusinesscentre.com/harga-virtual-office'

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
        type: 'article',
        title,
        description,
        url: canonicalUrl,
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/foto-gedung-bbc.jpg' }]
    }
}

export default function HargaVirtualOfficePage() {
    return (
        <WeaponPageTemplate
            url="/harga-virtual-office"
            title={title}
            description={description}
            canonicalUrl={canonicalUrl}
            h1={title}
            intro="Virtual office bukan produk yang satu ukuran cocok untuk semua. Harganya mencerminkan perbedaan nyata dalam layanan yang Anda terima di <a href='/virtual-office'>virtual office Bintaro Business Center</a>."
            entity="virtual-office"
            location="jakarta-selatan"
            heroBadges={{ b1: "Virtual Office", b2: "Struktur Harga" }}
            sections={[
                {
                    id: "problem",
                    h2: "Memilih Berdasarkan Kebutuhan, Bukan Sekadar Harga",
                    rawHtml: `
                        <p>Memahami apa yang membentuk harga virtual office membantu Anda memilih paket yang benar-benar sesuai kebutuhan, bukan paket yang paling murah atau paling mahal.</p>
                        <p>Harganya bervariasi karena mencakup kombinasi layanan yang berbeda â€” dari keperluan alamat bisnis dasar hingga representasi bisnis penuh dengan akses meeting room dan penanganan telepon.</p>
                    `
                },
                {
                    id: "education",
                    h2: "Komponen yang Membentuk Paket Virtual Office",
                    rawHtml: `
                        <h3>Alamat Bisnis &amp; Domisili Gedung</h3>
                        <p>Layanan inti: hak penggunaan alamat resmi untuk keperluan legal (PT/CV) dan dokumen operasional. Pastikan penyedia memberikan surat domisili gedung yang sah.</p>

                        <h3>Penanganan Surat &amp; Notifikasi</h3>
                        <p>Layanan pengelolaan surat masuk dengan notifikasi real-time (WhatsApp/Email). Penyedia profesional memastikan tidak ada dokumen legal penting yang terlewat.</p>

                        <h3>Akses Meeting Room &amp; Telepon</h3>
                        <p>Paket menengah ke atas biasanya menyertakan quota meeting room. Untuk perusahaan yang ingin representasi penuh, layanan penjawab telepon atas nama perusahaan sangat krusial.</p>
                    `
                },
                {
                    id: "authority",
                    h2: "Faktor Lokasi Administratif",
                    rawHtml: `
                        <p>Wilayah administratif (Jakarta Selatan vs Tangerang Selatan) memiliki implikasi nyata untuk keperluan PKP dan domisili perusahaan. Untuk konteks tarif dan paket spesifik di wilayah DKI, lihat <a href="/harga-virtual-office-jakarta-selatan" class="text-accent hover:underline">breakdown harga virtual office Jakarta Selatan</a>.</p>
                    `,
                    visual: {
                        type: "card",
                        items: [
                            { title: "Alamat prestisius di wilayah Jakarta Selatan", icon: "MapPin" },
                            { title: "Proses PKP dimungkinkan untuk KBLI Jasa", icon: "ShieldCheck" },
                            { title: "Tiga paket fleksibel: BA, CP, dan FCP", icon: "Menu" }
                        ]
                    }
                },
                {
                    id: "value",
                    h2: "Kapan Virtual Office Menjadi Efisien?",
                    visual: {
                        type: "card",
                        items: [
                            { title: "Sangat Hemat", desc: "Mulai dari Rp 250rb/bulan, jauh lebih hemat dari sewa kantor fisik.", icon: "CreditCard" },
                            { title: "Setup Legalitas", desc: "Pondasi legal yang sah untuk pendirian PT dengan biaya overhead minimal.", icon: "FileText" },
                            { title: "Tim Remote", desc: "Sempurna untuk bisnis jasa yang timnya bekerja dari mana saja.", icon: "Users" },
                            { title: "Prestige Lokasi", desc: "Meningkatkan trust klien dengan alamat di kawasan bisnis strategis.", icon: "Award" }
                        ]
                    }
                },
                {
                    id: "options",
                    h2: "Bandingkan Paket Virtual Office",
                    rawHtml: `
                        <p>Di Bintaro Business Centre, kami menyediakan tiga pilihan paket utama.</p>

                        <h3>Paket BA (Basic Address)</h3>
                        <p>Hanya butuh alamat tanpa interaksi fisik yang sering.</p>
                        <p><strong>Cocok Untuk</strong><br/>Freelancer, Startup early-stage, dan bisnis digital.</p>
                        <ul>
                            <li>Alamat Bisnis Jakarta Selatan</li>
                            <li>Notifikasi Surat via WA</li>
                            <li>Harga: Rp 250.000 / bln</li>
                            <li>Domisili Gedung Lengkap</li>
                        </ul>

                        <h3>Paket FCP (Full Representation)</h3>
                        <p>Representasi bisnis penuh termasuk penanganan telepon.</p>
                        <p><strong>Cocok Untuk</strong><br/>Perusahaan mapan yang ingin tampil profesional di alamat premium.</p>
                        <ul>
                            <li>Semua fitur Paket BA + CP</li>
                            <li>Penjawab Telepon Khusus</li>
                            <li>Harga: Rp 916.667 / bln</li>
                            <li>Branding Nama Perusahaan</li>
                        </ul>
                    `
                },
                {
                    id: "cta",
                    h2: "Amankan Alamat Bisnis Anda Sekarang",
                    rawHtml: `
                        <p>Solusi alamat bisnis legal dan prestisius dengan harga paling kompetitif.</p>
                        <p><a href="${waUrlInline}">Pilih Paket via WhatsApp</a> | <a href="/virtual-office">Bandingkan Paket</a></p>
                    `
                }
            ]}
            faq={{
                title: "Pertanyaan Seputar Harga VO",
                items: [
                    {
                        q: "Berapa harga virtual office di Bintaro Business Centre?",
                        a: "Paket kami dimulai dari Rp 250.000 per bulan untuk paket BA (Basic Address). Paket menengah (CP) di Rp 375.000/bulan, dan paket premium (FCP) di Rp 916.667/bulan untuk representasi penuh."
                    },
                    {
                        q: "Apa saja yang termasuk dalam harga tersebut?",
                        a: "Layanan utama meliputi alamat bisnis resmi, surat domisili gedung, dan penerimaan surat. Paket lebih tinggi menyertakan quota meeting room dan layanan telepon."
                    },
                    {
                        q: "Apakah virtual office bisa untuk PT?",
                        a: "Ya, virtual office dapat digunakan sebagai alamat domisili PT. Untuk keperluan PKP, penggunaan dimungkinkan terutama bagi perusahaan dengan KBLI jasa, tergantung pada KPP yang menangani."
                    }
                ]
            }}
            internalLinks={{
                intro: { label: "Lihat Detail", href: "/virtual-office" },
                mid: { label: "Lihat Lokasi", href: "/virtual-office/jakarta-selatan" },
                closing: { label: "Pilih Paket via WhatsApp", href: waUrlClosing }
            }}
        />
    )
}
