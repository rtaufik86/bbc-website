import WeaponPageTemplate from '@/components/templates/WeaponPageTemplate'

export default function AlamatBisnisJakartaSelatanPage() {
    return (
        <WeaponPageTemplate
            url="/virtual-office/alamat-bisnis-jakarta-selatan"
            title="Alamat Bisnis Virtual Office Jakarta Selatan: Fungsi & Legalitas"
            description="Pelajari fungsi administratif dan legalitas alamat bisnis virtual office di Jakarta Selatan untuk domisili PT, NIB, NPWP, dan PKP perusahaan Anda."
            canonicalUrl="https://www.bintarobusinesscentre.com/virtual-office/alamat-bisnis-jakarta-selatan"
            h1="Alamat Bisnis Virtual Office Jakarta Selatan: Fungsi & Legalitas"
            intro="Alamat bisnis dalam virtual office adalah alamat resmi yang digunakan perusahaan untuk kebutuhan administratif dan legal, seperti pengurusan NPWP, NIB, dan domisili usaha yang sah secara hukum di Jakarta Selatan."
            
            // VISUAL ENGINE DATA (v1)
            entity="virtual-office"
            location="jakarta-selatan"
            heroBadges={{ b1: "Legalitas Bisnis", b2: "DKI Jakarta" }}

            sections={[
                {
                    id: "definisi",
                    h2: "Apa Itu Alamat Bisnis dalam Virtual Office?",
                    rawHtml: `
                        <p>Alamat bisnis adalah alamat resmi yang mewakili keberadaan legal sebuah perusahaan. Dalam struktur virtual office, alamat ini disediakan oleh penyedia layanan dan dapat digunakan oleh klien sebagai alamat domisili perusahaan mereka tanpa harus menempati ruang fisik secara penuh.</p>
                        <p>Di Indonesia, alamat bisnis yang valid diperlukan untuk pengurusan Nomor Induk Berusaha (NIB) melalui OSS, pendaftaran NPWP badan usaha, pembuatan akta pendirian PT, serta pendaftaran sebagai Pengusaha Kena Pajak (PKP).</p>
                    `
                },
                {
                    id: "legalitas",
                    h2: "Peran Alamat Bisnis dalam Legalitas Perusahaan",
                    rawHtml: `
                        <p>Dalam akta pendirian PT, alamat domisili tercantum secara eksplisit dan menjadi identitas legal yang didaftarkan ke Kemenkumham. Alamat ini menentukan yurisdiksi administrasi perusahaan Anda.</p>
                        <ul>
                            <li><strong>Domisili Perusahaan:</strong> Menentukan wilayah administrasi hukum.</li>
                            <li><strong>Pendaftaran NIB via OSS:</strong> Memastikan kepatuhan zonasi wilayah Jakarta Selatan.</li>
                            <li><strong>Yurisdiksi NPWP:</strong> Menentukan penempatan Kantor Pelayanan Pajak (KPP).</li>
                        </ul>
                    `
                },
                {
                    id: "authority",
                    h2: "Apakah Alamat Virtual Office Sah Secara Hukum?",
                    rawHtml: `
                        <p>Secara umum, alamat virtual office dapat digunakan untuk keperluan legal perusahaan selama penyedia memiliki dokumen IMB/PBG dan bukti operasional gedung yang valid serta sesuai dengan Peraturan Gubernur terkait Zonasi perkantoran.</p>
                    `,
                    visual: {
                        type: "card",
                        items: [
                            { title: "Legal Stand", desc: "Sah untuk pendirian PT dan pengurusan NIB sesuai regulasi zonasi DKI", icon: "ShieldCheck" },
                            { title: "PKP Support", desc: "Dimungkinkan untuk pendaftaran PKP bagi perusahaan sektor jasa", icon: "CheckSquare" },
                            { title: "Gedung Milik Sendiri", desc: "Stabilitas domisili terjamin dengan kepemilikan gedung BBC sejak 2007", icon: "Award" }
                        ]
                    }
                },
                {
                    id: "perbandingan",
                    h2: "Perbedaan Alamat Bisnis di Jakarta Selatan vs Luar DKI",
                    rawHtml: `
                        <p>Bagi perusahaan yang berencana beroperasi di Jakarta atau menargetkan pasar ibu kota, pemilihan wilayah administratif untuk domisili bisnis bukan keputusan yang sepele. Jakarta Selatan adalah bagian dari DKI Jakarta — provinsi dengan status khusus.</p>
                        <p>Perbedaan ini berdampak pada: yurisdiksi Kantor Pelayanan Pajak (KPP) untuk urusan perpajakan, instansi Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu (DPMPTSP) yang menangani perizinan, serta persepsi klien dan mitra bisnis.</p>
                    `
                },
                {
                    id: "batasan",
                    h2: "Kapan Alamat Virtual Office Tidak Cukup?",
                    rawHtml: `
                        <p>Ada situasi di mana perusahaan perlu mempertimbangkan transisi ke ruang kantor fisik. Untuk jenis usaha non-jasa atau perdagangan yang mensyaratkan inspeksi lapangan dari instansi perizinan atau Bea Cukai, keberadaan fisik sangat mutlak.</p>
                    `
                }
            ]}
            faq={{
                title: "FAQ: Alamat Bisnis Virtual Office Jakarta Selatan",
                items: [
                    {
                        q: "Apakah virtual office bisa untuk domisili PT di Jakarta Selatan?",
                        a: "Bisa, selama penyedia memiliki dokumen legalitas gedung lengkap. Bintaro Business Centre memiliki sertifikat gedung dan IMB Perkantoran yang valid."
                    },
                    {
                        q: "Apakah alamat ini bisa untuk pendaftaran PKP?",
                        a: "Bisa untuk bidang usaha tertentu seperti konsultan, IT, marketing, dan jasa."
                    }
                ]
            }}
            internalLinks={{
                intro: { label: "Pesan Virtual Office", href: "/virtual-office" },
                mid: { label: "Cek Validasi Domisili", href: "https://wa.me/6281210002131" },
                closing: { label: "Hubungi Legal Support", href: "/kontak" }
            }}
            closing="Memilih alamat bisnis yang tepat di Jakarta Selatan adalah investasi strategis untuk kredibilitas perusahaan Anda."
        />
    )
}
