import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

export default function AlamatBisnisJakartaSelatanPage() {
    return (
        <WeaponPageTemplate
            title="Alamat Bisnis Virtual Office Jakarta Selatan: Fungsi & Legalitas"
            description="Pelajari fungsi administratif dan legalitas alamat bisnis virtual office di Jakarta Selatan untuk domisili PT, NIB, NPWP, dan PKP perusahaan Anda."
            canonicalUrl="https://www.bintarobusinesscentre.com/virtual-office/alamat-bisnis-jakarta-selatan"
            hero={{
                badge1: "Legalitas Bisnis",
                badge2: "Jakarta Selatan",
                h1: "Alamat Bisnis Virtual Office Jakarta Selatan: Fungsi & Legalitas",
                subheading: "Alamat bisnis dalam virtual office adalah alamat resmi yang digunakan perusahaan untuk kebutuhan administratif dan legal, seperti pengurusan NPWP, NIB, dan domisili usaha yang sah secara hukum di <a href='/virtual-office'>Jakarta Selatan</a>.",
                ctaLabel: "Konsultasi Legalitas",
                ctaHref: "https://wa.me/6281210002131",
                image: "/virtual_office_concept_hero_1775704318054.png"
            }}
            problem={{
                title: "Apa Itu Alamat Bisnis dalam Virtual Office?",
                paragraphs: [
                    "Alamat bisnis adalah alamat resmi yang mewakili keberadaan legal sebuah perusahaan. Dalam struktur virtual office, alamat ini disediakan oleh penyedia layanan dan dapat digunakan oleh klien sebagai alamat domisili perusahaan mereka tanpa harus menempati ruang fisik secara penuh.",
                    "Di Indonesia, alamat bisnis yang valid diperlukan untuk pengurusan Nomor Induk Berusaha (NIB) melalui OSS, pendaftaran NPWP badan usaha, pembuatan akta pendirian PT, serta pendaftaran sebagai Pengusaha Kena Pajak (PKP). Tanpa alamat bisnis yang jelas dan terverifikasi, proses ini tidak dapat diselesaikan secara legal.",
                    "Penting untuk dipahami bahwa alamat bisnis berbeda dari alamat rumah. Penggunaan alamat rumah sebagai domisili perusahaan membawa risiko regulasi zonasi yang membatasi aktivitas komersial di area residensial."
                ]
            }}
            education={{
                title: "Peran Alamat Bisnis dalam Legalitas Perusahaan",
                items: [
                    {
                        title: "Domisili Perusahaan",
                        content: "Dalam akta pendirian PT, alamat domisili tercantum secara eksplisit dan menjadi identitas legal yang didaftarkan ke Kemenkumham. Alamat ini menentukan yurisdiksi administrasi perusahaan Anda."
                    },
                    {
                        title: "Pendaftaran NIB via OSS",
                        content: "Sistem OSS mengharuskan alamat usaha yang sesuai dengan wilayah administratif yang relevan. Alamat di Jakarta Selatan memastikan perusahaan Anda masuk ke dalam wilayah administratif DKI Jakarta yang strategis."
                    },
                    {
                        title: "Yurisdiksi NPWP Badan Usaha",
                        content: "Kantor Pelayanan Pajak (KPP) ditentukan berdasarkan alamat domisili. Perusahaan yang terdaftar di Jakarta Selatan akan memiliki akses ke yurisdiksi perpajakan ibu kota yang berbeda dengan wilayah di luar DKI."
                    }
                ]
            }}
            authority={{
                title: "Apakah Alamat Virtual Office Sah Secara Hukum?",
                highlight: "Secara umum, alamat virtual office dapat digunakan untuk keperluan legal perusahaan selama penyedia memiliki dokumen IMB/PBG dan bukti operasional gedung yang valid.",
                image: "/jakarta_selatan_office_hero_1775704269536.png",
                items: [
                    { icon: "ShieldCheck", text: "Sah untuk pendirian PT dan pengurusan NIB sesuai regulasi" },
                    { icon: "CheckSquare", text: "Dimungkinkan untuk pendaftaran PKP bagi KBLI Jasa (IT, Marketing, Konsultan)" },
                    { icon: "Building2", text: "Bintaro Business Centre menyediakan dokumen pendukung lengkap sejak 2007" }
                ]
            }}
            value={{
                title: "Perbedaan Jakarta Selatan vs Luar DKI",
                items: [
                    { title: "Status Administratif", desc: "Jakarta Selatan adalah bagian resmi DKI Jakarta dengan implikasi perizinan yang berbeda dari wilayah penyangga.", icon: "Target" },
                    { title: "Yurisdiksi Pajak", desc: "Penanganan oleh KPP di wilayah Jakarta memberikan prestise dan kepastian administratif.", icon: "Briefcase" },
                    { title: "Persepsi Bisnis", desc: "Alamat Jaksel sering diasosiasikan dengan ekosistem bisnis elit ibu kota oleh mitra dan klien.", icon: "Award" },
                    { title: "Domisili Kontrak", desc: "Alamat di DKI diperlukan untuk memenuhi standar tertentu dalam kontrak pemerintah atau korporat.", icon: "ShieldCheck" }
                ]
            }}
            options={{
                title: "Kapan Alamat Virtual Office Tidak Cukup?",
                intro: "Ada situasi di mana perusahaan perlu mempertimbangkan transisi ke ruang kantor fisik.",
                option1: {
                    title: "Kebutuhan Inspeksi Fisik",
                    desc: "Untuk jenis usaha non-jasa atau perdagangan yang mensyaratkan inspeksi lapangan dari instansi perizinan.",
                    suitableForTitle: "Status",
                    suitableForDesc: "Wajib Kantor Fisik",
                    bullets: ["Verifikasi domisili fisik nyata", "Penyimpanan stok barang", "Syarat PKP non-jasa", "Inspeksi KPP/Bea Cukai"]
                },
                option2: {
                    title: "Operasional Tim Harian",
                    desc: "Jika volume operasional membutuhkan ruang kerja permanen bagi tim untuk kolaborasi tatap muka.",
                    suitableForTitle: "Status",
                    suitableForDesc: "Opsi Serviced Office",
                    bullets: ["Transisi mudah dalam satu gedung", "Fasilitas lengkap siap pakai", "Tanpa ganti alamat domisili", "Kontrak fleksibel sesuai skala"]
                }
            }}
            internalLinks={{
                title: "Mulai Bisnis Anda dengan Tepat",
                card1: {
                    title: "Paket Virtual Office",
                    desc: "Dapatkan alamat bisnis Jakarta Selatan resmi untuk legalitas PT dan NIB Anda.",
                    ctaLabel: "Lihat Paket",
                    href: "/virtual-office"
                },
                card2: {
                    title: "Sewa Kantor Fisik",
                    desc: "Butuh ruang operasional di Jakarta Selatan? Lihat unit kantor siap pakai kami.",
                    ctaLabel: "Lihat Ruang",
                    href: "/sewa-kantor"
                }
            }}
            faq={{
                title: "FAQ: Alamat Bisnis Virtual Office Jakarta Selatan",
                items: [
                    {
                        q: "Apakah virtual office bisa untuk domisili PT di Jakarta Selatan?",
                        a: "Bisa, selama penyedia memiliki dokumen legalitas gedung lengkap. Bintaro Business Centre telah melayani 1.871+ klien dengan dokumen pendukung yang diverifikasi notaris."
                    },
                    {
                        q: "Apakah alamat virtual office bisa untuk NPWP badan usaha?",
                        a: "Bisa. NPWP akan terdaftar di KPP sesuai wilayah domisili (Jakarta Selatan), memberikan kepastian yurisdiksi pajak."
                    },
                    {
                        q: "Apakah bisa digunakan untuk PKP?",
                        a: "Bergantung pada KBLI. KBLI Jasa dimungkinkan menggunakan virtual office untuk PKP, sementara KBLI Perdagangan biasanya memerlukan kantor fisik."
                    },
                    {
                        q: "Kapan sebaiknya beralih ke kantor fisik?",
                        a: "Saat tim butuh ruang kerja tetap atau regulasi bisnis Anda mensyaratkan verifikasi lokasi fisik untuk audit klien/pemerintah."
                    }
                ]
            }}
            bottomCTA={{
                title: "Tentukan Alamat Bisnis Anda Hari Ini",
                subtitle: "Gunakan domisili Jakarta Selatan yang sah secara hukum di Bintaro Business Centre.",
                primaryCTA: { label: "Hubungi Kami via WhatsApp", href: "https://wa.me/6281210002131" },
                secondaryCTA: { label: "Pelajari Paket VO", href: "/virtual-office" }
            }}
        />
    )
}
