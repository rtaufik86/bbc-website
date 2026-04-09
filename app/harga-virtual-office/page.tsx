import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

export default function HargaVirtualOfficePage() {
    return (
        <WeaponPageTemplate
            title="Harga Virtual Office: Faktor Penentu & Struktur Biaya"
            description="Informasi transparan mengenai harga virtual office di Jakarta Selatan, rincian layanan per paket, dan kapan virtual office menjadi pilihan paling efisien."
            canonicalUrl="https://www.bintarobusinesscentre.com/harga-virtual-office"
            hero={{
                badge1: "Virtual Office",
                badge2: "Struktur Harga",
                h1: "Harga Virtual Office: Faktor Penentu & Struktur Biaya",
                subheading: "Virtual office bukan produk yang satu ukuran cocok untuk semua. Harganya mencerminkan perbedaan nyata dalam layanan yang Anda terima di <a href='/virtual-office'>virtual office Bintaro Business Center</a>.",
                ctaLabel: "Pilih Paket Anda",
                ctaHref: "https://wa.me/6281210002131",
                image: "/virtual_office_concept_hero_1775704318054.png"
            }}
            problem={{
                title: "Memilih Berdasarkan Kebutuhan, Bukan Sekadar Harga",
                paragraphs: [
                    "Memahami apa yang membentuk harga virtual office membantu Anda memilih paket yang benar-benar sesuai kebutuhan, bukan paket yang paling murah atau paling mahal.",
                    "Harganya bervariasi karena mencakup kombinasi layanan yang berbeda — dari keperluan alamat bisnis dasar hingga representasi bisnis penuh dengan akses meeting room dan penanganan telepon."
                ]
            }}
            education={{
                title: "Komponen yang Membentuk Paket Virtual Office",
                items: [
                    {
                        title: "Alamat Bisnis & Domisili Gedung",
                        content: "Layanan inti: hak penggunaan alamat resmi untuk keperluan legal (PT/CV) dan dokumen operasional. Pastikan penyedia memberikan surat domisili gedung yang sah."
                    },
                    {
                        title: "Penanganan Surat & Notifikasi",
                        content: "Layanan pengelolaan surat masuk dengan notifikasi real-time (WhatsApp/Email). Penyedia profesional memastikan tidak ada dokumen legal penting yang terlewat."
                    },
                    {
                        title: "Akses Meeting Room & Telepon",
                        content: "Paket menengah ke atas biasanya menyertakan quota meeting room. Untuk perusahaan yang ingin representasi penuh, layanan penjawab telepon atas nama perusahaan sangat krusial."
                    }
                ]
            }}
            authority={{
                title: "Faktor Lokasi Administratif",
                highlight: "Wilayah administratif (Jakarta Selatan vs Tangerang Selatan) memiliki implikasi nyata untuk keperluan PKP dan domisili perusahaan.",
                image: "/virtual_office_concept_hero_1775704318054.png",
                items: [
                    { icon: "MapPin", text: "Alamat prestisius di wilayah Jakarta Selatan" },
                    { icon: "ShieldCheck", text: "Proses PKP dimungkinkan untuk KBLI Jasa" },
                    { icon: "Menu", text: "Tiga paket fleksibel: BA, CP, dan FCP" }
                ]
            }}
            value={{
                title: "Kapan Virtual Office Menjadi Efisien?",
                items: [
                    { title: "Sangat Hemat", desc: "Mulai dari Rp 250rb/bulan, jauh lebih hemat dari sewa kantor fisik.", icon: "CreditCard" },
                    { title: "Setup Legalitas", desc: "Pondasi legal yang sah untuk pendirian PT dengan biaya overhead minimal.", icon: "FileText" },
                    { title: "Tim Remote", desc: "Sempurna untuk bisnis jasa yang timnya bekerja dari mana saja.", icon: "Users" },
                    { title: "Prestige Lokasi", desc: "Meningkatkan trust klien dengan alamat di kawasan bisnis strategis.", icon: "Award" }
                ]
            }}
            options={{
                title: "Bandingkan Paket Virtual Office",
                intro: "Di Bintaro Business Centre, kami menyediakan tiga pilihan paket utama.",
                option1: {
                    title: "Paket BA (Basic Address)",
                    desc: "Hanya butuh alamat tanpa interaksi fisik yang sering.",
                    suitableForTitle: "Cocok Untuk",
                    suitableForDesc: "Freelancer, Startup early-stage, dan bisnis digital.",
                    bullets: ["Alamat Bisnis Jakarta Selatan", "Notifikasi Surat via WA", "Harga: Rp 250.000 / bln", "Domisili Gedung Lengkap"]
                },
                option2: {
                    title: "Paket FCP (Full Representation)",
                    desc: "Representasi bisnis penuh termasuk penanganan telepon.",
                    suitableForTitle: "Cocok Untuk",
                    suitableForDesc: "Perusahaan mapan yang ingin tampil profesional di alamat premium.",
                    bullets: ["Semua fitur Paket BA + CP", "Penjawab Telepon Khusus", "Harga: Rp 916.667 / bln", "Branding Nama Perusahaan"]
                }
            }}
            internalLinks={{
                title: "Mulai Optimasi Biaya Anda",
                card1: {
                    title: "Detail Paket Virtual Office",
                    desc: "Pelajari rincian setiap fitur dan layanan dalam paket virtual office kami.",
                    ctaLabel: "Lihat Detail",
                    href: "/virtual-office"
                },
                card2: {
                    title: "Daftar Lokasi Kantor",
                    desc: "Cari tahu lebih lanjut tentang lokasi fisik kami di Jakarta Selatan & Bintaro.",
                    ctaLabel: "Lihat Lokasi",
                    href: "/virtual-office/jakarta-selatan"
                }
            }}
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
            bottomCTA={{
                title: "Amankan Alamat Bisnis Anda Sekarang",
                subtitle: "Solusi alamat bisnis legal dan prestisius dengan harga paling kompetitif.",
                primaryCTA: { label: "Pilih Paket via WhatsApp", href: "https://wa.me/6281210002131" },
                secondaryCTA: { label: "Bandingkan Paket", href: "/virtual-office" }
            }}
        />
    )
}
