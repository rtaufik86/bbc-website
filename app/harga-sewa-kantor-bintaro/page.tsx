import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'
import Script from 'next/script'
import { Check, MessageCircle, ArrowRight, CheckCircle2, DollarSign, Calculator, Layers, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const currentYear = new Date().getFullYear();
const title = 'Harga Sewa Kantor Bintaro 2026 | Perbandingan & Range Harga'
const description = 'Update harga sewa kantor di Bintaro 2026. Perbandingan biaya serviced office, faktor penentu harga, dan tips hemat anggaran kantor untuk bisnis Anda.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/harga-sewa-kantor-bintaro' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://www.bintarobusinesscentre.com/harga-sewa-kantor-bintaro',
        siteName: 'Bintaro Business Centre',
        images: [{ url: '/images/hero-harga-sewa-kantor-bintaro.jpg' }]
    }
}

const relatedArticles = [
    { title: 'Sewa Kantor Jakarta Selatan', description: 'Panduan lengkap memilih lokasi kantor strategis.', href: '/sewa-kantor-jakarta-selatan' },
    { title: 'Kantor Dekat Bintaro Jaya', description: 'Infrastruktur bisnis Jakarta Selatan dalam jangkauan.', href: '/kantor-dekat-bintaro-jaya' },
    { title: 'Sewa Kantor Bintaro', description: 'Panduan lengkap sewa kantor siap pakai di Bintaro.', href: '/sewa-kantor' }
]

export default function Page() {
    const waMessage = "Hallo, saya ingin info sewa kantor di Jakarta Selatan."

    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.bintarobusinesscentre.com/harga-sewa-kantor-bintaro/#webpage",
                "url": "https://www.bintarobusinesscentre.com/harga-sewa-kantor-bintaro",
                "name": title,
                "description": description,
                "isPartOf": { "@id": "https://www.bintarobusinesscentre.com/#website" }
            },
            {
                "@type": "Article",
                "@id": "https://www.bintarobusinesscentre.com/harga-sewa-kantor-bintaro/#article",
                "headline": title,
                "description": description,
                "image": "https://www.bintarobusinesscentre.com/images/hero-harga-sewa-kantor-bintaro.jpg",
                "author": { "@type": "Organization", "name": "Bintaro Business Centre" },
                "publisher": { "@type": "Organization", "name": "Bintaro Business Centre" }
            }
        ]
    }

    return (
        <main className="bg-white">
            <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }} />

            {/* HERO */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-40 bg-primary group overflow-hidden">
                <div className="absolute inset-0 opacity-10 grayscale group-hover:grayscale-0 transition-all duration-1000">
                    <Image
                        src="/images/hero-harga-sewa-kantor-bintaro.jpg"
                        alt="Harga Sewa Kantor Bintaro"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center lg:text-left">
                    <SEOBreadcrumbs items={[{ label: 'Harga Sewa Kantor Bintaro' }]} />
                    <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.4em] mb-8 mt-12 font-sans">Weapon Page — Sewa Kantor Cluster</span>
                    <h1 className="text-4xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 font-heading max-w-4xl">
                        Harga Sewa Kantor di Bintaro: Panduan Lengkap {currentYear}
                    </h1>
                    <p className="text-xl text-white/80 leading-relaxed max-w-2xl font-light mb-12">
                        Berapa harganya dan apa yang sudah termasuk? Dapatkan gambaran faktual range harga sewa kantor di Bintaro Jakarta Selatan.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-xl h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                            <Link href="/sewa-kantor">Tanya Harga Spesifik</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto prose prose-lg prose-slate prose-headings:text-primary prose-headings:font-heading prose-headings:font-bold prose-strong:text-primary prose-accent:text-accent">
                        <p className="text-2xl leading-relaxed text-charcoal/60 font-light mb-16">
                            Menyatukan tim di kantor yang tepat dimulai dengan anggaran yang realistis. Di Bintaro, rentang harga dipengaruhi oleh jenis fasilitas, model kontrak, dan kelengkapan biaya operasional.
                        </p>

                        <h2 className="text-3xl mt-16 mb-8">Faktor Penentu Harga Sewa Kantor</h2>
                        <div className="grid sm:grid-cols-3 gap-8 not-prose mb-16">
                            {[
                                { t: 'Jenis Kantor', d: 'Serviced office (tertinggi tapi all-in) vs Coworking (per kursi) vs Virtual.', i: Layers },
                                { t: 'Model Biaya', d: 'All-inclusive (listrik, internet inklusif) vs Komponen terpisah.', i: Calculator },
                                { t: 'Ukuran & Lantai', d: 'Luas unit dan posisi lantai menentukan range harga yang berlaku.', i: DollarSign }
                            ].map((f, i) => (
                                <div key={i} className="p-8 bg-bg-paper border border-primary/5 rounded-2xl hover:border-accent transition-colors shadow-sm">
                                    <f.i className="w-10 h-10 text-accent mb-6" />
                                    <h4 className="font-bold text-primary mb-2">{f.t}</h4>
                                    <p className="text-charcoal/60 text-xs leading-relaxed">{f.d}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl mt-16 mb-12 text-center">Rentang Harga Sewa Kantor Bintaro</h2>
                        <div className="not-prose overflow-x-auto border border-primary/5 shadow-2xl mb-16 rounded-3xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-primary text-white text-xs uppercase tracking-widest">
                                        <th className="p-6 font-bold">Jenis</th>
                                        <th className="p-6 font-bold">Rentang Harga</th>
                                        <th className="p-6 font-bold">Apa yang Termasuk</th>
                                        <th className="p-6 font-bold">Cocok untuk</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-primary/5">
                                    {[
                                        { t: 'Serviced Office (9–15 m²)', p: 'Rp 3–5 jt/bln', i: 'Furniture, internet, AC, listrik, resepsionis', f: '1–3 orang, startup' },
                                        { t: 'Serviced Office (16–25 m²)', p: 'Rp 5–8 jt/bln', i: 'Sama + storage lebih luas, sofa tamu', f: '3–6 orang, SME' },
                                        { t: 'Serviced Office (26–36 m²)', p: 'Rp 7–12 jt/bln', i: 'Unit luas, fasilitas lengkap', f: 'Tim menengah, Branch Office' },
                                        { t: 'Virtual Office', p: 'Rp 250rb–1 jt/bln', i: 'Alamat bisnis, surat handling, meeting room', f: 'Remote, konsultan' }
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-accent/5 transition-colors">
                                            <td className="p-6 font-bold text-primary">{row.t}</td>
                                            <td className="p-6 font-bold text-accent">{row.p}</td>
                                            <td className="p-6 text-xs">{row.i}</td>
                                            <td className="p-6 text-xs">{row.f}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-3xl mt-16 mb-8">Bintaro vs Area Jakarta Selatan Lain</h2>
                        <p>
                            Dibandingkan TB Simatupang atau Pondok Indah, Bintaro (Jakarta Selatan) menawarkan harga yang secara konsisten <strong>30–50% lebih rendah</strong> untuk kategori serviced office dengan fasilitas sebanding.
                        </p>
                        <p>
                            Bagi bisnis yang kliennya tersebar di Jabotabek, Bintaro Jakarta Selatan memberikan nilai terbaik: harga kompetitif, akses tol JORR W2S, dan alamat Jakarta Selatan yang sah untuk keperluan administratif.
                        </p>

                        <div className="bg-bg-paper p-10 border-l-8 border-accent rounded-r-[3rem] my-16 shadow-lg">
                            <h3 className="text-2xl font-bold text-primary mt-0 mb-6 flex items-center gap-2">
                                <AlertTriangle className="text-accent" /> Biaya Lain yang Perlu Dihitung
                            </h3>
                            <ul className="space-y-4 text-sm text-charcoal/70 list-none pl-0 font-medium">
                                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> <strong>Deposit Keamanan</strong>: Umumnya setara 1 bulan sewa, dikembalikan saat kontrak berakhir.</li>
                                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> <strong>Lembur AC & Listrik</strong>: Jika Anda butuh akses di luar jam operasional normal.</li>
                                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> <strong>Meeting Room Extra</strong>: Biaya per jam jika melebihi kuota paket (Rp 50rb/jam - Rp 100rb/jam di BBC).</li>
                            </ul>
                        </div>

                        <h2 className="text-3xl mt-16 mb-8 text-center">Tips Memaksimalkan Anggaran</h2>
                        <div className="not-prose space-y-4 mb-20">
                            {[
                                { t: 'Pilih Paket All-Inclusive', d: 'Hindari kejutan tagihan listrik atau internet yang membengkak di akhir bulan.' },
                                { t: 'Skalabilitas Unit', d: 'Pilih gedung yang memungkinkan upgrade unit seiring pertumbuhan tim Anda.' },
                                { t: 'Survey Fisik', d: 'Kunjungan 30 menit bisa menghemat frustrasi berbulan-masing.' }
                            ].map((tip, i) => (
                                <div key={i} className="p-8 border border-primary/5 rounded-2xl flex gap-6 items-start hover:bg-accent/5 transition-colors group">
                                    <div className="w-10 h-10 bg-primary text-white flex items-center justify-center font-bold font-heading shrink-0 group-hover:bg-accent transition-colors">0{i + 1}</div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-2">{tip.t}</h4>
                                        <p className="text-charcoal/70 text-sm leading-relaxed">{tip.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="not-prose bg-primary p-16 rounded-[4rem] text-center text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                            <h3 className="text-3xl md:text-5xl font-bold mb-8 !text-white leading-tight font-heading">Ingin tahu harga aktual unit Anda?</h3>
                            <p className="text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                                Bintaro Business Centre menyediakan kantor siap pakai dengan harga transparan dan all-inclusive di Jakarta Selatan (9 m² - 36 m²).
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button className="bg-accent text-white hover:bg-white hover:text-primary rounded-none shadow-lg h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                                    <Link href="/sewa-kantor">Tanya Harga & Ketersediaan</Link>
                                </Button>
                                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary rounded-none h-auto py-5 px-10 text-xs font-bold uppercase tracking-widest" asChild>
                                    <InternalLink href="/sewa-kantor" anchorType="brand-service" position="cta" className="!text-current">Lihat Detail Layanan</InternalLink>
                                </Button>
                            </div>
                        </div>

                        <div className="mt-12 text-[10px] text-charcoal/40 font-bold uppercase tracking-[0.3em] flex flex-wrap gap-4 justify-center">
                            <span>Artikel Terkait:</span>
                            <Link href="/sewa-kantor-jakarta-selatan" className="hover:text-accent transition-colors">Sewa Kantor Jakarta Selatan</Link>
                            <Link href="/kantor-dekat-bintaro-jaya" className="hover:text-accent transition-colors">Kantor Dekat Bintaro Jaya</Link>
                            <Link href="/sewa-kantor" className="hover:text-accent transition-colors">Panduan Lengkap Sewa Kantor Bintaro</Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="container mx-auto px-6 py-24 border-t border-primary/5">
                <RelatedContent articles={relatedArticles} title="Bacaan Strategis" />
            </footer>
        </main>
    )
}
