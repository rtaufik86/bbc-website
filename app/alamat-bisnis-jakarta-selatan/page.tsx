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
                            <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-tight mb-8 font-heading">
                                Alamat Bisnis Jakarta Selatan: Simbol Kredibilitas Korporat
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-12">
                                Alamat bisnis bukan sekadar koordinat GPS. Ini adalah sinyal pertama yang dibaca klien, perbankan, dan instansi legal mengenai keseriusan entitas Anda. 
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="bg-accent hover:bg-bbc-gold-600 text-white rounded-none px-8 py-6 text-sm font-bold uppercase tracking-widest transition-all shadow-lg" asChild>
                                    <Link href="/virtual-office">Dapatkan Alamat Bisnis Sah</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="relative h-[400px] lg:h-[500px] hidden lg:block rounded-2xl overflow-hidden shadow-2xl border-b-8 border-accent">
                            <Image
                                src="/images/foto-gedung-bbc.jpg"
                                alt="Gedung Bintaro Business Centre - Alamat Bisnis Jakarta Selatan"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. PROBLEM SECTION */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-primary mb-8 font-heading italic">Kenapa Alamat Bisnis Begitu Menentukan?</h2>
                    <div className="space-y-6 text-slate-600 leading-relaxed text-lg text-left">
                        <p>
                            Banyak pengusaha pemula meremehkan pemilihan domisili. Namun, fakta hukum di Indonesia menunjukkan bahwa validitas alamat adalah syarat mutlak untuk mendapatkan legalitas sah seperti <span className="text-accent font-bold">NIB, NPWP, hingga Sertifikat PKP</span>.
                        </p>
                        <p>
                            Menggunakan alamat residensial (rumah) kini semakin sulit disetujui untuk izin usaha tertentu, terutama di DKI Jakarta yang memiliki pembagian zona wilayah yang ketat antara zona hunian dan zona komersial.
                        </p>
                        <p>
                            Ketiadaan alamat yang kredibel seringkali menjadi penghambat saat perusahaan ingin mengikuti tender atau melakukan kerja sama strategis dengan perusahaan BUMN maupun multinasional.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. EDUCATION SECTION */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 font-heading">Manfaat Strategis Domisili Jakarta Selatan</h2>
                        <div className="w-24 h-1 bg-accent mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { 
                                title: 'Yurisdiksi Administratif', 
                                desc: 'NPWP dan NIB diproses oleh instansi Jakarta Selatan yang dikenal efisien namun memiliki standar verifikasi yang sangat ketat.', 
                                icon: MapPin 
                            },
                            { 
                                title: 'Psikologi Kredibilitas', 
                                desc: 'Alamat di Jakarta Selatan secara otomatis membangun kesan bahwa perusahaan Anda memiliki pondasi finansial dan operasional yang stabil.', 
                                icon: Award 
                            },
                            { 
                                title: 'Akses Tender & Proyek', 
                                desc: 'Banyak platform tender (seperti LPSE) memberikan nilai lebih bagi perusahaan yang memiliki domisili fisik di pusat bisnis DKI Jakarta.', 
                                icon: Briefcase 
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-10 shadow-sm border-l-4 border-primary hover:shadow-xl transition-all group">
                                <item.icon className="w-12 h-12 text-accent mb-8 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. COMPARISON / EXPLANATION SECTION */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4 font-heading">Mengenal Opsi Alamat Bisnis Sah</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto italic">Pilih yang paling sesuai dengan kebutuhan operasional dan jenis KBLI usaha Anda.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="border border-slate-200 p-10 rounded-xl hover:border-primary transition-all bg-white shadow-sm">
                            <h3 className="text-2xl font-bold text-primary mb-4">Virtual Office</h3>
                            <p className="text-slate-600 mb-8 text-sm italic leading-relaxed">Solusi paling hemat biaya untuk mendapatkan alamat legalitas tanpa harus menyewa ruang fisik secara permanen.</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-700">
                                    <Check className="text-green-500 shrink-0" size={18} />
                                    <span>Sah untuk pendirian PT / CV</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-700">
                                    <Check className="text-green-500 shrink-0" size={18} />
                                    <span>Syarat Legal untuk NIB & PKP Jasa</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-700 font-bold">
                                    <Check className="text-green-500 shrink-0" size={18} />
                                    <span>Efisien: Mulai dari Rp 250rb/bln</span>
                                </li>
                            </ul>
                            <Link href="/virtual-office-jakarta-selatan" className="text-primary font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2"> Pelajari Detail VO <ExternalLink size={14} /></Link>
                        </div>
                        <div className="border border-slate-200 p-10 rounded-xl hover:border-primary transition-all bg-white shadow-sm">
                            <h3 className="text-2xl font-bold text-primary mb-4">Service Office</h3>
                            <p className="text-slate-600 mb-8 text-sm italic leading-relaxed">Alamat bisnis dengan ruang fisik nyata. Wajib bagi perusahaan dengan jenis KBLI Perdagangan atau PKP Verifikasi Fisik.</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-700">
                                    <Check className="text-green-500 shrink-0" size={18} />
                                    <span>Wajib untuk PKP Perdagangan</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-700">
                                    <Check className="text-green-500 shrink-0" size={18} />
                                    <span>Tersedia Ruang Fisik & Fasilitas</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-700 font-bold">
                                    <Check className="text-green-500 shrink-0" size={18} />
                                    <span>Profesional: Full Furnished</span>
                                </li>
                            </ul>
                            <Link href="/sewa-kantor" className="text-primary font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2"> Lihat Ruang Kantor <ExternalLink size={14} /></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. AUTHORITY SECTION (SOFT BRAND INSERT) */}
            <section className="py-24 bg-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-8 font-heading">Mengapa Bermitra dengan <br/><span className="text-accent">Bintaro Business Centre?</span></h2>
                            <p className="text-blue-100 text-lg leading-relaxed mb-10 font-light italic">
                                Kami bukan broker atau agen perantara. BBC adalah pengelola gedung sekaligus pemilik properti yang telah beroperasi selama 17+ tahun.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="flex gap-4 items-start">
                                    <History className="text-accent" size={28} />
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Sejak 2007</h4>
                                        <p className="text-blue-200 text-xs">Rekam jejak konsisten dalam layanan bisnis.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <Building2 className="text-accent" size={28} />
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Owner Managed</h4>
                                        <p className="text-blue-200 text-xs">Keamanan legalitas jangka panjang tanpa risiko sengketa.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <ShieldCheck className="text-accent" size={28} />
                                    <div>
                                        <h4 className="font-bold text-white mb-1">1.800+ Klien</h4>
                                        <p className="text-blue-200 text-xs">Telah dipercaya oleh ribuan perusahaan nasional & global.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <Award className="text-accent" size={28} />
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Full Support</h4>
                                        <p className="text-blue-200 text-xs">Tim legal internal yang siap membantu pendirian entitas.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[300px] border-4 border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/images/sewa-kantor/ruangan-kantor-utama.jpg" 
                                alt="Fasilitas Kantor Bintaro Business Centre" 
                                fill 
                                className="object-cover opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. INTERNAL LINK / RELATED SOLUTIONS SECTION */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4 font-heading italic">Layanan Terkait untuk Pertumbuhan Bisnis</h2>
                        <div className="w-16 h-1 bg-accent mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Virtual Office Jakarta Selatan', href: '/virtual-office-jakarta-selatan', desc: 'Satu alamat untuk ribuan kemungkinan bisnis tanpa sewa gedung.' },
                            { title: 'Sewa Kantor Bintaro', href: '/sewa-kantor/bintaro', desc: 'Ruang kerja fisik dengan akses Tol Veteran untuk mobilitas tinggi.' },
                            { title: 'Layanan Legalitas (PT/CV)', href: '/legal/pendirian-pt-jakarta-selatan', desc: 'Bantuan pengurusan izin usaha lengkap dari NIB hingga dokumen pendirian.' }
                        ].map((link, i) => (
                            <Link key={i} href={link.href} className="bg-white p-8 group border border-slate-100 hover:border-accent transition-all shadow-sm">
                                <h4 className="font-bold text-primary mb-3 group-hover:text-accent transition-colors">{link.title}</h4>
                                <p className="text-slate-500 text-xs leading-relaxed mb-6 italic">{link.desc}</p>
                                <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 group-hover:text-primary transition-colors flex items-center gap-2">
                                    Explore More <ArrowRight size={12} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. FAQ SECTION */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-primary mb-12 font-heading text-center">FAQ: Alamat Bisnis Jakarta Selatan</h2>
                    <div className="space-y-4">
                        {[
                            { q: 'Apakah Virtual Office bisa digunakan untuk mengurus PKP?', a: 'Bisa. Peraturan Pemerintah saat ini mengizinkan penggunaan Virtual Office untuk pengukuhan PKP (Pengusaha Kena Pajak) terutama untuk jenis KBLI berbasis jasa yang tidak memerlukan verifikasi fisik inventaris barang.' },
                            { q: 'Berapa lama proses mendapatkan alamat bisnis di BBC?', a: 'Sangat cepat. Begitu dokumen syarat lengkap dan pembayaran divalidasi, surat keterangan domisili atau kontrak sewa virtual office bisa diterbitkan dalam kurun waktu 1-2 hari kerja.' },
                            { q: 'Mengapa Jakarta Selatan lebih disukai dibanding wilayah lain?', a: 'Jakarta Selatan dianggap sebagai hub bisnis premium dengan citra korporat yang lebih kuat dibandingkan wilayah lainnya di DKI Jakarta. Selain itu, zonasi wilayahnya sangat mendukung berbagai jenis cluster industri kreatif dan teknologi.' },
                            { q: 'Dapatkah saya menggunakan alamat BBC untuk kartu nama dan website?', a: 'Tentu saja. Pengguna virtual office dan service office kami berhak menggunakan alamat Jl. RC. Veteran No. 1-i, Jakarta Selatan untuk seluruh materi pemasaran dan korespondensi resmi perusahaan.' },
                            { q: 'Apakah ada fasilitas ruang meeting jika saya sewa alamat saja (Virtual Office)?', a: 'Ya, paket Virtual Office kami sudah termasuk kuota penggunaan ruang meeting atau area komunal (co-working space) setiap bulannya, sehingga Anda tetap bisa menyambut klien secara profesional.' }
                        ].map((faq, i) => (
                            <div key={i} className="border-b border-slate-100 last:border-0">
                                <details className="group">
                                    <summary className="flex justify-between items-center cursor-pointer py-6 font-bold text-primary hover:text-accent transition-colors list-none">
                                        <span className="text-sm md:text-base leading-relaxed pr-8">{faq.q}</span>
                                        <Plus className="group-open:rotate-45 transition-transform text-accent" size={20} />
                                    </summary>
                                    <div className="pb-8 text-slate-600 text-sm leading-relaxed px-2">
                                        {faq.a}
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. CTA SECTION (BOTTOM ONLY) */}
            <section className="py-32 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-3xl font-bold text-primary mb-8 font-heading italic">Mulai Membangun Kredibilitas Anda Hari Ini</h3>
                    <p className="text-slate-500 max-w-xl mx-auto mb-12">
                        Konsultasikan kebutuhan alamat bisnis Anda dengan tim ahli kami untuk mendapatkan solusi paling efisien dan sah secara hukum.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button className="bg-primary hover:bg-slate-900 text-white rounded-none px-12 py-7 text-xs font-black uppercase tracking-[0.2em] transition-all shadow-2xl" asChild>
                            <Link href="https://wa.me/628128888069" target="_blank">Konsultasi Via WhatsApp</Link>
                        </Button>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none px-12 py-7 text-xs font-black uppercase tracking-[0.2em] transition-all" asChild>
                            <Link href="/virtual-office">Lihat Harga Paket VO</Link>
                        </Button>
                    </div>
                    <div className="mt-16 flex items-center justify-center gap-6 opacity-30 grayscale">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Premium Locations</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Certified Legal Team</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Secure Credibility</span>
                    </div>
                </div>
            </section>
        </main>
    )
}
