import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ArticleHeader from '@/components/seo/ArticleHeader'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'
import Script from 'next/script'
import { Check, Mail, MessageCircle, MapPin, Building2, TrendingUp, Shield, Users, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const currentYear = new Date().getFullYear();
const title = 'Virtual Office Jakarta Selatan | Alamat Bisnis Profesional DKI Jakarta'
const description = 'Solusi virtual office Jakarta Selatan untuk alamat bisnis sah, pendirian PT, dan PKP Jasa. Mulai Rp 250rb/bln dengan fasilitas meeting room & resepsionis.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/virtual-office-jakarta-selatan' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/virtual-office-jakarta-selatan',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/hero-virtual-office-jakarta-selatan.jpg' }]
    }
}

const relatedArticles = [
    { title: 'Harga Virtual Office Jakarta Selatan', description: 'Perbandingan paket dan biaya virtual office terbaru.', href: '/harga-virtual-office-jakarta-selatan' },
    { title: 'Virtual Office Bintaro', description: 'Alamat Jakarta Selatan untuk pengusaha di kawasan Bintaro.', href: '/virtual-office-bintaro' },
    { title: 'Alamat Bisnis Jakarta Selatan', description: 'Kredibilitas bisnis yang dimulai dari satu keputusan alamat.', href: '/alamat-bisnis-jakarta-selatan' }
]

export default function Page() {
    const waMessage = "Hallo, saya ingin info virtual office Jakarta Selatan."

    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/virtual-office-jakarta-selatan/#webpage",
                "url": "https://www.bintarobusinesscentre.com/virtual-office-jakarta-selatan",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/virtual-office-jakarta-selatan/#article",
                "headline": title,
                "description": description,
                "image": "https://www.bintarobusinesscentre.com/images/hero-virtual-office-jakarta-selatan.jpg",
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://www.bintarobusinesscentre.com/virtual-office-jakarta-selatan/#breadcrumb",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.bintarobusinesscentre.com/" },
                    { "@type": "ListItem", "position": 2, "name": "Virtual Office Jakarta Selatan" }
                ]
            }
        ]
    }

    return (
        <main className="bg-white">
            <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }} />

            {/* HERO SECTION */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-40 bg-[#0F1E33] overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/images/hero-virtual-office-jakarta-selatan.jpg"
                        alt="Virtual Office Jakarta Selatan"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <SEOBreadcrumbs items={[{ label: 'Virtual Office Jakarta Selatan' }]} />
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.4em] mb-8 mt-12 font-sans">Hub Page — Virtual Office Cluster</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 font-heading">
                            Virtual Office Jakarta Selatan: Solusi Alamat Bisnis Profesional
                        </h1>
                        <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-2xl font-light">
                            Gunakan alamat bisnis premium di wilayah administratif DKI Jakarta untuk meningkatkan kredibilitas tanpa biaya sewa kantor fisik yang tinggi.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-start max-w-7xl mx-auto">
                        <div className="lg:col-span-8 prose prose-lg prose-slate max-w-none">
                            <p className="text-xl leading-relaxed text-primary font-medium border-l-4 border-accent pl-8 py-4 bg-accent/5 rounded-r-3xl italic">
                                Virtual office memutus kaitan antara alamat bisnis dan kebutuhan ruang fisik, memberikan kredibilitas Jakarta Selatan dengan biaya sebagian kecil dari sewa kantor konvensional.
                            </p>

                            <h2 className="text-3xl font-bold text-primary mt-16 mb-8 font-heading">Apa itu virtual office dan fungsinya?</h2>
                            <p>
                                Virtual office adalah layanan yang memberikan alamat bisnis di lokasi fisik tertentu—lengkap dengan pengurusan surat, layanan resepsionis, dan akses meeting room—tanpa perlu menyewa ruangan secara permanen. Anda mendapatkan semua atribut eksternal sebuah kantor profesional, tanpa biaya operasional yang menyertainya.
                            </p>

                            <h2 className="text-3xl font-bold text-primary mt-16 mb-8 font-heading">Siapa yang paling cocok menggunakannya?</h2>
                            <div className="grid sm:grid-cols-2 gap-6 not-prose mb-12">
                                {[
                                    { t: 'Konsultan & Profesional', d: 'Independen yang bekerja berbasis proyek dan butuh alamat kredibel.' },
                                    { t: 'Startup Remote-First', d: 'Mendapat alamat domisili Jaksel untuk pendirian PT sambil tim bekerja remote.' },
                                    { t: 'E-commerce & Digital', d: 'Butuh alamat resmi untuk NIB, NPWP, dan korespondensi bisnis.' },
                                    { t: 'Kantor Cabang Jakarta', d: 'Perusahaan luar kota yang ingin hadir secara administratif di Ibu Kota.' }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 bg-bg-paper border-l-4 border-accent rounded-r-2xl shadow-sm hover:shadow-md transition-shadow">
                                        <h4 className="font-bold text-primary mb-2">{item.t}</h4>
                                        <p className="text-charcoal/70 text-sm leading-relaxed line-clamp-2">{item.d}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-16 not-prose">
                                <InternalLink href="/virtual-office" anchorType="brand-service" position="mid-content" variant="button">
                                    Cek Paket Virtual Office
                                </InternalLink>
                                <InternalLink href="/sewa-kantor" anchorType="brand-service" position="mid-content" className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-all decoration-0 no-underline font-semibold rounded-lg">
                                    Cek Service Office
                                </InternalLink>
                            </div>

                            <h2 className="text-3xl font-bold text-primary mt-16 mb-12 font-heading text-center">Kegunaan & Batasan Virtual Office</h2>
                            <div className="not-prose overflow-x-auto border border-primary/5 shadow-2xl mb-16 rounded-3xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-primary text-white text-xs uppercase tracking-widest">
                                            <th className="p-6 font-bold">Kegunaan</th>
                                            <th className="p-6 font-bold">Virtual Office</th>
                                            <th className="p-6 font-bold">Keterangan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-primary/5">
                                        {[
                                            { usage: 'Pendirian PT/CV', vo: '✅ Bisa', note: 'Untuk semua jenis KBLI' },
                                            { usage: 'NIB / Nomor Induk Berusaha', vo: '✅ Bisa', note: 'Untuk semua jenis KBLI' },
                                            { usage: 'NPWP Perusahaan', vo: '✅ Bisa', note: 'Untuk semua jenis KBLI' },
                                            { usage: 'PKP — KBLI Jasa', vo: '✅ Bisa', note: 'Konsultan, IT, Marketing, dll' },
                                            { usage: 'PKP — KBLI Perdagangan', vo: '❌ Tidak bisa', note: 'Wajib service office min. 1 tahun' },
                                            { usage: 'Meeting Room', vo: '✅ Bisa', note: 'Quota sesuai paket layanan' }
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-accent/5 transition-colors">
                                                <td className="p-6 font-bold text-primary">{row.usage}</td>
                                                <td className="p-6 font-bold text-accent">{row.vo}</td>
                                                <td className="p-6 text-charcoal/60 italic">{row.note}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <h2 className="text-3xl font-bold text-primary mt-16 mb-8 font-heading">PKP dan Virtual Office: Penjelasan Penting</h2>
                            <p>
                                Pertanyaan paling sering: "Apakah virtual office bisa untuk PKP?" Jawabannya: <strong>tergantung jenis usaha Anda.</strong>
                            </p>
                            <p>
                                Jika bisnis Anda bergerak di bidang jasa—konsultansi, IT, pemasaran, jasa keuangan—virtual office di Jakarta Selatan dapat digunakan untuk pendaftaran PKP. <InternalLink href="/virtual-office" anchorType="brand-service" position="mid-content">Alamat Virtual Office BBC</InternalLink> yang sah memenuhi persyaratan KPP untuk jenis usaha ini.
                            </p>
                            <p>
                                Jika bisnis Anda bergerak di bidang perdagangan atau distribusi—termasuk trading, import-export—Ditjen Pajak mensyaratkan kontrak sewa kantor fisik minimum satu tahun. Dalam kasus ini, <InternalLink href="/sewa-kantor" anchorType="brand-service" position="mid-content">layanan service office BBC</InternalLink> adalah solusi yang tepat.
                            </p>

                            <div className="bg-primary p-12 rounded-[3rem] text-white my-16 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                                <h3 className="text-2xl font-bold mb-6 !text-white font-heading">Area Strategis Jakarta Selatan</h3>
                                <p className="text-white/80 leading-relaxed mb-8 font-light">
                                    Bintaro—di area Kecamatan Pesanggrahan, Jakarta Selatan—menawarkan keseimbangan terbaik antara harga, aksesibilitas, dan legitimasi administratif DKI Jakarta. <InternalLink href="/virtual-office-bintaro" anchorType="service-location" position="mid-content">Virtual office di Bintaro via BBC</InternalLink> berlokasi di gedung fisik yang bisa dikunjungi.
                                </p>
                                <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-lg h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                                    <Link href="/virtual-office">Cek Pilihan Paket Virtual Office</Link>
                                </Button>
                            </div>

                            <h2 className="text-3xl font-bold text-primary mt-16 mb-12 font-heading">Frequently Asked Questions</h2>
                            <div className="not-prose space-y-6">
                                {[
                                    { q: "Apakah virtual office diakui secara hukum untuk domisili PT?", a: "Ya. Virtual office yang disediakan oleh badan usaha terdaftar di gedung fisik yang verifiable diakui untuk pendirian PT and NIB. BBC beroperasi via PT. Ganesha Dwipaya Bhakti." },
                                    { q: "Bagaimana penanganan surat dan paket?", a: "Diterima oleh resepsionis, dicatat, and Anda diberitahu via WhatsApp/Email. Dapat diambil langsung atau diteruskan ke alamat Anda." },
                                    { q: "Apakah bisa upgrade ke kantor fisik?", a: "Ya. Klien VO yang butuh ruang fisik dapat beralih ke service office BBC tanpa prosedure pendaftaran ulang penuh." }
                                ].map((faq, i) => (
                                    <div key={i} className="p-8 border border-primary/5 rounded-2xl hover:border-accent transition-colors group">
                                        <h4 className="font-bold text-primary mb-4 group-hover:text-accent transition-colors">{faq.q}</h4>
                                        <p className="text-charcoal/70 text-sm leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="not-prose bg-bg-paper p-12 border-t-4 border-accent shadow-xl my-16">
                                <p className="text-xl font-bold text-primary mb-6 font-heading italic leading-tight">
                                    "Butuh alamat bisnis Jakarta Selatan yang sah untuk pendirian PT, NIB, atau PKP jasa Anda?"
                                </p>
                                <p className="text-charcoal/70 mb-8 font-light leading-relaxed">
                                    Bintaro Business Centre (BBC) menyediakan virtual office dari gedung fisik beroperasi di Pesanggrahan, Jakarta Selatan, dekat Bintaro Jaya and Pondok Indah, dengan akses Pintu Tol Veteran.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button className="bg-primary text-white hover:bg-accent rounded-none shadow-lg h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                                        <Link href="/virtual-office">Lihat Pilihan Paket</Link>
                                    </Button>
                                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                                        <Link href="/virtual-office">Konsultasi Gratis</Link>
                                    </Button>
                                </div>
                            </div>

                            <p className="text-xs text-charcoal/40 font-bold uppercase tracking-widest">
                                Artikel terkait: <Link href="/alamat-bisnis-jakarta-selatan" className="text-accent underline">Alamat Bisnis Jakarta Selatan</Link> · <Link href="/virtual-office-bintaro" className="text-accent underline">Virtual Office Bintaro</Link> · <Link href="/harga-virtual-office-jakarta-selatan" className="text-accent underline">Harga Virtual Office Jakarta Selatan</Link>
                            </p>
                        </div>

                        <aside className="lg:col-span-4 sticky top-32 space-y-12">
                            <div className="p-8 bg-accent rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary opacity-90 transition-opacity group-hover:opacity-100"></div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-6 font-heading">Aktivasi Cepat 1 Hari</h3>
                                    <p className="text-white/80 text-sm leading-relaxed mb-8 font-light">
                                        Proses aktivasi virtual office di BBC hanya membutuhkan waktu 1-2 hari kerja setelah dokumen lengkap diterima.
                                    </p>
                                    <Button className="w-full bg-accent text-white hover:bg-white hover:text-primary rounded-none py-6 font-bold uppercase tracking-widest text-[10px] h-auto" asChild>
                                        <Link href="/virtual-office">
                                            Aktivasi Sekarang
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-primary mb-8 font-heading px-2">Keuntungan VO di BBC</h3>
                                <div className="space-y-4">
                                    {[
                                        { t: 'Gedung Fisik', d: 'Bukan sekadar alamat PO BOX', i: Shield },
                                        { t: 'Resepsionis Aktif', d: 'Handling tamu & surat profesional', i: Users },
                                        { t: 'Meeting Room', d: 'Fasilitas premium untuk pertemuan', i: Clock },
                                        { t: 'PKP Ready (Jasa)', d: 'Alamat sah untuk administrasi pajak', i: TrendingUp }
                                    ].map((feat, i) => (
                                        <div key={i} className="flex gap-4 p-6 bg-white border border-primary/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                            <feat.i className="w-8 h-8 text-accent shrink-0" />
                                            <div>
                                                <h4 className="font-bold text-primary text-sm mb-1">{feat.t}</h4>
                                                <p className="text-charcoal/40 text-[10px] leading-relaxed">{feat.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <RelatedContent articles={relatedArticles} title="Bacaan Strategis" layout="list" />
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    )
}
