import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import Script from 'next/script'
import { 
    Check, 
    MessageCircle, 
    MapPin, 
    Award, 
    Briefcase, 
    ChevronDown, 
    Plus,
    Building2,
    ShieldCheck,
    History,
    ExternalLink,
    ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const title = 'Alamat Bisnis Jakarta Selatan | Kredibilitas & Legalitas Perusahaan'
const description = 'Bagaimana mendapatkan alamat bisnis Jakarta Selatan yang sah? Panduan menggunakan virtual/serviced office untuk pendirian PT, NIB, dan PKP di DKI Jakarta.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/alamat-bisnis-jakarta-selatan' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/alamat-bisnis-jakarta-selatan',
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
                "@id": "https://www.bintarobusinesscentre.com/alamat-bisnis-jakarta-selatan/#webpage",
                "url": "https://www.bintarobusinesscentre.com/alamat-bisnis-jakarta-selatan",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/alamat-bisnis-jakarta-selatan/#article",
                "headline": title,
                "description": description,
                "image": "https://www.bintarobusinesscentre.com/images/foto-gedung-bbc.jpg",
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            }
        ]
    }

    return (
        <main className="bg-white text-slate-900 font-sans selection:bg-accent selection:text-white">
            <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }} />

            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-8">
                                <span className="bg-bbc-gold-100 text-bbc-gold-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-bbc-gold-200">
                                    Established 2007
                                </span>
                                <span className="bg-bbc-blue-100 text-bbc-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-bbc-blue-200">
                                    Jakarta Selatan
                                </span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-primary leading-tight mb-8 font-heading">
                                Alamat Bisnis Jakarta Selatan: Fondasi Legal yang Sering Diabaikan Pengusaha
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-12">
                                Banyak bisnis berjalan tanpa alamat yang tepat — dan baru menyadari masalahnya saat mengurus NIB, NPWP perusahaan, atau pengajuan PKP. Pahami apa yang seharusnya menjadi landasan legal bisnis Anda, sebelum terlambat.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="bg-accent hover:bg-bbc-gold-600 text-white rounded-none px-8 py-6 text-sm font-bold uppercase tracking-widest transition-all shadow-lg" asChild>
                                    <Link href="#options">Pelajari Opsi Alamat Bisnis di Jakarta Selatan <ArrowRight className="ml-2" size={16} /></Link>
                                </Button>
                            </div>
                        </div>
                        <div className="relative h-[400px] lg:h-[500px] hidden lg:block rounded-2xl overflow-hidden shadow-2xl border-b-8 border-accent">
                            <Image
                                src="/images/foto-gedung-bbc.jpg"
                                alt="Gedung Bintaro Business Centre - Jakarta Selatan"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. PROBLEM CONTEXT */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-primary mb-12 font-heading text-center">Salah Alamat, Salah Strategi: Risiko yang Tidak Banyak Dibicarakan</h2>
                    <div className="space-y-8 text-slate-600 leading-relaxed text-lg">
                        <p>
                            Di Indonesia, alamat bisnis bukan sekadar data administratif. Ia menentukan yurisdiksi pajak, keabsahan dokumen legal, dan kredibilitas perusahaan di mata mitra, klien, maupun lembaga keuangan. Ketika sebuah perusahaan mendaftarkan diri dengan alamat yang tidak sesuai peruntukan — misalnya menggunakan alamat rumah untuk kegiatan usaha perdagangan — konsekuensinya bisa muncul di kemudian hari: pengajuan PKP ditolak, NIB tidak bisa diproses sesuai KBLI, atau verifikasi lapangan oleh kantor pajak menemukan ketidaksesuaian.
                        </p>
                        <p>
                            Masalah ini lebih umum dari yang terlihat. Banyak pendiri PT atau CV baru memilih alamat yang paling mudah tersedia — bukan yang paling tepat secara hukum dan bisnis. Alamat rumah, alamat saudara, atau alamat domisili yang berbeda provinsi sering digunakan tanpa mempertimbangkan implikasi jangka panjangnya terhadap kewajiban perpajakan dan perizinan.
                        </p>
                        <p>
                            Jakarta Selatan, sebagai wilayah administratif DKI Jakarta, memiliki signifikansi tersendiri. Alamat bisnis di sini bukan hanya soal prestise — ini menyangkut yurisdiksi DKI Jakarta yang memengaruhi proses pendirian PT, NPWP perusahaan, NIB, hingga pengajuan status PKP tergantung jenis KBLI usaha Anda. Memilih alamat yang tepat sejak awal adalah keputusan strategis, bukan sekadar administratif.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. EDUCATION (CORE) */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 font-heading">Apa Itu Alamat Bisnis dan Mengapa Lokasinya Penting Secara Legal</h2>
                        <div className="w-24 h-1 bg-accent mx-auto"></div>
                    </div>
                    
                    <div className="space-y-20">
                        <div>
                            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                Alamat Bisnis vs. Alamat Rumah: Bukan Hal yang Sama
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-6 font-light">
                                Secara hukum, alamat bisnis adalah lokasi resmi tempat sebuah badan usaha berdomisili — dan ini harus dapat diverifikasi. Penggunaan alamat rumah untuk keperluan bisnis dimungkinkan dalam kondisi tertentu, namun memiliki keterbatasan signifikan: banyak kantor pajak yang tidak merekomendasikannya untuk perusahaan yang ingin mengajukan PKP, terutama untuk KBLI non-jasa. Selain itu, alamat rumah umumnya tidak mencerminkan kapasitas operasional yang diharapkan dari sebuah PT aktif.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                Jakarta Selatan vs. Luar DKI: Perbedaan yang Berdampak Nyata
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-6 font-light">
                                Bagi banyak pelaku usaha, perbedaan antara "Jakarta Selatan" dan kawasan berbatasan seperti Tangerang Selatan terasa tipis secara geografis — namun berdampak signifikan secara administratif. Jakarta Selatan berada dalam yurisdiksi DKI Jakarta. Ini berarti perusahaan yang berdomisili di sini akan terdaftar di bawah Kantor Pajak (KPP) DKI Jakarta, dengan konsekuensi yang berbeda dibanding jika terdaftar di Tangerang Selatan yang masuk wilayah Banten. Untuk bisnis yang menargetkan klien korporat, tender pemerintah, atau lembaga keuangan besar di Jakarta, alamat DKI Jakarta kerap menjadi syarat implisit yang sering terlupakan.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                Implikasi terhadap NIB, NPWP, dan PKP
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-6 font-light">
                                Tiga dokumen ini saling berkaitan erat dengan alamat bisnis. NIB (Nomor Induk Berusaha) diterbitkan berdasarkan alamat domisili usaha — termasuk KBLI yang Anda pilih. NPWP perusahaan juga akan terdaftar berdasarkan alamat ini. Adapun status PKP (Pengusaha Kena Pajak) memiliki aturan tersendiri: untuk KBLI jasa seperti konsultansi, IT, atau pemasaran, virtual office di alamat yang tepat dimungkinkan untuk pengajuan PKP. Untuk KBLI non-jasa seperti perdagangan atau distribusi, umumnya diperlukan kantor fisik dengan kontrak minimal satu tahun agar proses pengajuan PKP dapat berjalan. Memilih alamat bisnis yang sesuai dengan jenis usaha Anda bukan hanya soal kepatuhan — ini adalah fondasi dari seluruh ekosistem legal perusahaan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. AUTHORITY INSERT (BBC) */}
            <section className="py-24 bg-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-8 font-heading">Bintaro Business Centre: 18 Tahun Menjadi Alamat Bisnis Terpercaya di Jakarta Selatan</h2>
                            <p className="text-blue-100 text-lg leading-relaxed mb-10 font-light italic">
                                Bintaro Business Centre berdiri sejak 2007 di Jl. RC Veteran No. 1-i, Pesanggrahan — secara administratif berada di Jakarta Selatan, DKI Jakarta. Selama hampir dua dekade, lebih dari 1.800 perusahaan telah menggunakan alamat ini sebagai domisili resmi bisnis mereka.
                            </p>
                            <ul className="space-y-6">
                                <li className="flex gap-4 items-start">
                                    <MapPin className="text-accent shrink-0" size={24} />
                                    <p className="text-sm text-blue-100">Alamat administratif Jakarta Selatan, DKI Jakarta — valid untuk keperluan domisili PT, NIB, NPWP, dan perizinan usaha</p>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <History className="text-accent shrink-0" size={24} />
                                    <p className="text-sm text-blue-100">Beroperasi sejak 2007 dengan rekam jejak lebih dari 1.800 klien perusahaan dari berbagai sektor</p>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <Building2 className="text-accent shrink-0" size={24} />
                                    <p className="text-sm text-blue-100">Lokasi strategis dengan akses langsung ke Pintu Tol Veteran dan jaringan jalan utama menuju Bintaro Jaya dan Pondok Indah</p>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <ShieldCheck className="text-accent shrink-0" size={24} />
                                    <p className="text-sm text-blue-100">Tersedia pilihan Virtual Office dan Service Office sesuai kebutuhan legal dan operasional bisnis Anda</p>
                                </li>
                            </ul>
                        </div>
                        <div className="relative h-[400px] border-4 border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/images/sewa-kantor/ruangan-kantor-utama.jpg" 
                                alt="Fasilitas Bintaro Business Centre" 
                                fill 
                                className="object-cover opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. VALUE (SOFT BENEFIT) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <h2 className="text-3xl font-bold text-primary mb-16 font-heading text-center">Mengapa Alamat Bisnis di Jakarta Selatan Memberikan Keunggulan Nyata</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { 
                                title: 'Kredibilitas Administratif', 
                                desc: 'Alamat di wilayah DKI Jakarta memberikan bobot tersendiri dalam dokumen resmi perusahaan. Ini memengaruhi persepsi mitra, vendor, dan lembaga keuangan.', 
                                icon: Award 
                            },
                            { 
                                title: 'Relevansi Pajak & Perizinan', 
                                desc: 'Yurisdiksi DKI Jakarta memiliki prosedur dan ekosistem perpajakan yang berbeda. Menghindarkan Anda dari pemindahan domisili yang memakan biaya.', 
                                icon: ShieldCheck 
                            },
                            { 
                                title: 'Akses Ekosistem Bisnis', 
                                desc: 'Jakarta Selatan adalah pusat konsentrasi bisnis. Membangun ekosistem yang dekat dengan klien korporat dan penyedia layanan profesional.', 
                                icon: MapPin 
                            },
                            { 
                                title: 'Fleksibilitas Solusi', 
                                desc: 'Tersedia dalam berbagai format — dari virtual office untuk perusahaan jasa, hingga kantor fisik penuh bagi kepatuhan PKP perdagangan.', 
                                icon: Briefcase 
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-50 p-8 border-b-4 border-accent hover:bg-primary hover:text-white transition-all group">
                                <item.icon className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-bold mb-4 font-heading">{item.title}</h3>
                                <p className="text-sm opacity-80 leading-relaxed font-light">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. OPTIONS (LIGHT COMPARISON) */}
            <section id="options" className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4 font-heading">Dua Cara Mendapatkan Alamat Bisnis di Jakarta Selatan</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto italic">Pilihan yang tepat bergantung pada jenis usaha, struktur KBLI, dan kebutuhan operasional Anda.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-accent">
                            <h3 className="text-2xl font-bold text-primary mb-6">Virtual Office</h3>
                            <p className="text-slate-600 mb-8 text-sm leading-relaxed italic">Alamat resmi tanpa ruang fisik harian. Mencakup pengurusan surat dan valid untuk NIB & NPWP.</p>
                            <div className="bg-bbc-blue-50 p-6 mb-8 rounded-lg">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Cocok Untuk:</h4>
                                <p className="text-sm text-slate-700">Konsultan, IT, Jasa Pemasaran, dan bisnis berbasis jasa yang tidak butuh ruang operasional harian.</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-700">
                                    <Check className="text-green-500 shrink-0" size={18} />
                                    <span>Alamat Sah Domisili PT/CV</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-700">
                                    <Check className="text-green-500 shrink-0" size={18} />
                                    <span>PKP Dimungkinkan (KBLI Jasa)</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-primary">
                            <h3 className="text-2xl font-bold text-primary mb-6">Service Office</h3>
                            <p className="text-slate-600 mb-8 text-sm leading-relaxed italic">Kantor fisik siap pakai. Wajib bagi KBLI Perdagangan/Distribusi untuk verifikasi fisik PKP.</p>
                            <div className="bg-bbc-gold-50 p-6 mb-8 rounded-lg">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-bbc-gold-700 mb-2">Cocok Untuk:</h4>
                                <p className="text-sm text-slate-700">Trading, Distributor, Importir, dan bisnis yang butuh kehadiran fisik nyata untuk operasional.</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-700">
                                    <Check className="text-green-500 shrink-0" size={18} />
                                    <span>Full Compliance PKP SEMUA KBLI</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-700">
                                    <Check className="text-green-500 shrink-0" size={18} />
                                    <span>Fasilitas Lengkap Siap Pakai</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. INTERNAL LINK BRIDGE */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-primary mb-8 font-heading">Langkah Selanjutnya: Temukan Opsi yang Sesuai untuk Bisnis Anda</h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-12">
                        Jika bisnis Anda bergerak di bidang jasa dan membutuhkan alamat Jakarta Selatan yang fleksibel, <InternalLink href="/virtual-office">layanan virtual office Bintaro Business Centre</InternalLink> adalah titik awal yang tepat untuk dieksplorasi. Bagi perusahaan yang memerlukan ruang fisik dan kepatuhan PKP penuh — terutama untuk KBLI perdagangan — <InternalLink href="/sewa-kantor">opsi sewa kantor siap pakai kami</InternalLink> dirancang agar Anda bisa beroperasi sejak hari pertama tanpa biaya setup.
                    </p>
                </div>
            </section>

            {/* 8. FAQ */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-primary mb-12 font-heading text-center">FAQ: Alamat Bisnis Jakarta Selatan</h2>
                    <div className="space-y-4">
                        {[
                            { 
                                q: 'Apakah virtual office bisa digunakan untuk pengajuan PKP?', 
                                a: 'Tergantung jenis KBLI usaha Anda. Untuk KBLI jasa — seperti konsultansi, IT, pemasaran, atau jasa profesional lainnya — virtual office dimungkinkan untuk mendukung proses pengajuan PKP. Untuk KBLI non-jasa seperti perdagangan, distribusi, atau jasa konstruksi, umumnya diperlukan kantor fisik dengan kontrak minimal satu tahun agar pengajuan PKP dapat diproses.' 
                            },
                            { 
                                q: 'Apa perbedaan alamat bisnis Jakarta Selatan dengan Tangerang Selatan untuk keperluan legal?', 
                                a: 'Secara administratif, keduanya berbeda wilayah. Jakarta Selatan berada dalam yurisdiksi DKI Jakarta, sedangkan Tangerang Selatan masuk wilayah Banten. Perbedaan ini memengaruhi kantor pajak tempat perusahaan Anda terdaftar, prosedur perizinan, dan kelayakan mengikuti tender tertentu.' 
                            },
                            { 
                                q: 'Bagaimana proses mendapatkan alamat bisnis di Jakarta Selatan melalui BBC?', 
                                a: 'Anda memilih jenis layanan (virtual office atau service office), melengkapi dokumen identitas pendiri, dan dokumen perusahaan. Setelah kontrak berjalan, alamat Jakarta Selatan BBC dapat digunakan untuk keperluan domisili, NIB, NPWP, dan perizinan lainnya.' 
                            },
                            { 
                                q: 'Apakah alamat bisnis BBC diakui untuk keperluan pendirian PT?', 
                                a: 'Ya. Alamat Bintaro Business Centre di Jl. RC Veteran No. 1-i, Jakarta Selatan — sebagai wilayah administratif DKI Jakarta — dapat digunakan sebagai domisili dalam akta pendirian PT, proses pengajuan NIB di OSS, dan pendaftaran NPWP perusahaan.' 
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                <details className="group">
                                    <summary className="flex justify-between items-center cursor-pointer py-6 px-8 font-bold text-primary hover:bg-slate-50 transition-all list-none">
                                        <span className="text-sm md:text-base leading-relaxed pr-8">{faq.q}</span>
                                        <Plus className="group-open:rotate-45 transition-transform text-accent" size={20} />
                                    </summary>
                                    <div className="px-8 pb-8 text-slate-600 text-sm leading-relaxed">
                                        {faq.a}
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. CTA (BOTTOM ONLY) */}
            <section className="py-32 bg-primary text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-8 font-heading">Tentukan Alamat Bisnis yang Tepat Sejak Awal</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-12 text-lg font-light italic">
                        Pilihan alamat bukan keputusan administratif semata — ini memengaruhi legal standing, kewajiban pajak, dan kredibilitas jangka panjang perusahaan Anda.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button className="bg-accent hover:bg-bbc-gold-600 text-white rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest transition-all shadow-2xl" asChild>
                            <Link href="https://wa.me/628128888069" target="_blank">Konsultasi Via WhatsApp</Link>
                        </Button>
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary rounded-none px-12 py-7 text-sm font-bold uppercase tracking-widest transition-all" asChild>
                            <Link href="/virtual-office">Lihat Opsi VO & Service Office</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}
