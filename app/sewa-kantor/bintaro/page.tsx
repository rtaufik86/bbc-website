import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { CheckCircle2, MapPin, Clock, ArrowRight, Lightbulb, ChevronDown, MessageCircle, CornerUpRight, CarFront } from 'lucide-react'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'

const currentYear = new Date().getFullYear();
const title = `Sewa Kantor Bintaro Strategis Jakarta Selatan ${currentYear} | BBC`
const description = `Pilihan sewa kantor Bintaro di Jalan RC Veteran. Lokasi strategis Jakarta Selatan, akses tol langsung, fasilitas lengkap, dan harga kompetitif tahun ${currentYear}.`

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
        images: ['/og-sewa-kantor-bintaro.jpg']
    }
}

// FAQ Data
const faqData = [
    {
        question: "Apakah alamat Bintaro Business Centre masuk wilayah Jakarta Selatan secara hukum?",
        answer: "Ya. Gedung BBC berlokasi di Jalan RC Veteran, Pesanggrahan, yang secara administratif masuk wilayah Jakarta Selatan."
    },
    {
        question: "Apakah alamat ini bisa digunakan untuk pengurusan PKP?",
        answer: "Bisa. BBC berada di zona komersial resmi dan dapat digunakan untuk domisili usaha serta pengurusan PKP."
    },
    {
        question: "Apa keunggulan lokasi RC Veteran dibanding area Bintaro lainnya?",
        answer: "RC Veteran memiliki akses langsung ke tol sehingga lebih efisien dibanding kawasan dalam Bintaro yang cenderung lebih padat."
    },
    {
        question: "Apakah lokasi terkena aturan ganjil–genap?",
        answer: "Tidak. Akses melalui Tol Veteran dan Tanah Kusir bebas ganjil–genap hingga ke gedung."
    }
];

// Service Cards Data
const serviceCards = [
    {
        title: "Private Office",
        description: "Ruang kantor privat fully furnished di gedung perkantoran profesional. Cocok untuk tim kecil hingga menengah di Jakarta Selatan dengan akses langsung ke Tol Veteran.",
        highlights: [
            "Fully furnished",
            "Zona komersial resmi",
            "Akses 24/7"
        ],
        pricing: "Rp 3.5 Jt/bln",
        ctaText: "Paket private office BBC",
        ctaLink: "/sewa-kantor",
        anchorType: "service-location"
    },
    {
        title: "Virtual Office",
        description: "Solusi alamat bisnis Jakarta Selatan untuk kebutuhan domisili usaha, pengurusan PKP, dan administrasi perusahaan.",
        highlights: [
            "Alamat resmi Jakarta Selatan",
            "Mail + call handling",
            "Domisili usaha & PKP"
        ],
        pricing: "Rp 500k/bln",
        ctaText: "Paket virtual office BBC",
        ctaLink: "/virtual-office",
        anchorType: "brand-service"
    }
];

const relatedArticles = [
    {
        title: "Harga Sewa Kantor Bintaro",
        description: "Bandingkan harga per ukuran ruang dan cari paket yang paling efisien untuk tim Anda.",
        href: "/sewa-kantor/harga"
    },
    {
        title: "Sewa Kantor Jakarta Selatan",
        description: "Gambaran area premium Jaksel dan alasan RC Veteran jadi opsi paling praktis.",
        href: "/sewa-kantor/jakarta-selatan"
    }
]

export default function SewaKantorBintaroPage() {
    return (
        <main className="bg-white">
            <section className="py-8 md:py-12 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SEOBreadcrumbs items={[
                        { label: 'Sewa Kantor Bintaro' }
                    ]} />
                </div>
            </section>

            <section className="hero-section py-8 md:py-12 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                        Sewa Kantor Bintaro di Jalan RC Veteran
                    </h1>

                    <p className="text-xl md:text-2xl mt-6 text-slate-700 leading-relaxed max-w-4xl">
                        Lokasi strategis bebas macet, hanya ±500 meter dari Pintu Tol Veteran.
                        Alamat legal <strong>Jakarta Selatan</strong> dengan akses cepat ke kawasan Bintaro Jaya.
                    </p>

                    <div className="seo-anchor-paragraph mt-10 text-base md:text-lg leading-relaxed max-w-4xl text-slate-600 space-y-6">
                        <p>
                            Bintaro Business Center berlokasi di Jalan RC Veteran, Pesanggrahan, Jakarta Selatan.
                            Lokasi ini merupakan gerbang utama yang menghubungkan Jakarta Selatan dengan Bintaro. {' '}
                            <InternalLink
                                href="/sewa-kantor"
                                anchorType="brand-service"
                                position="intro"
                            >
                                Paket sewa kantor di BBC
                            </InternalLink>
                            {' '}dirancang untuk efisiensi operasional bisnis Anda.
                        </p>
                    </div>

                    <div className="cta-group mt-12 flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="bg-bbc-blue-500 hover:bg-bbc-blue-600 text-white font-bold h-14 px-10 text-lg shadow-xl" asChild>
                            <Link href="#pilihan-ruangan">
                                Lihat Pilihan Ruangan
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section id="pilihan-ruangan" className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {serviceCards.map((service, index) => (
                            <div key={index} className="service-card bg-white border border-slate-100 rounded-2xl p-8 shadow-sm flex flex-col h-full">
                                <h3 className="text-2xl font-bold mb-4 text-slate-900">{service.title}</h3>
                                <p className="text-slate-600 mb-8 flex-grow">{service.description}</p>
                                <div className="pricing text-3xl font-extrabold text-bbc-blue-600 mb-8 pt-6 border-t font-heading">
                                    {service.pricing}
                                </div>
                                <Button size="lg" className="w-full bg-bbc-blue-500 hover:bg-bbc-blue-600 text-white font-bold h-12" asChild>
                                    <Link href={service.ctaLink}>
                                        {service.ctaText} →
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="faq-section py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-slate-900">
                        Tanya Jawab Sewa Kantor Bintaro
                    </h2>
                    <div className="grid gap-4">
                        {faqData.map((faq, index) => (
                            <details key={index} className="bg-slate-50 p-8 rounded-2xl">
                                <summary className="font-bold text-xl cursor-pointer list-none list-item">
                                    {faq.question}
                                </summary>
                                <p className="mt-4 text-slate-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <RelatedContent articles={relatedArticles} title="Bacaan Lanjutan" />
                </div>
            </section>
        </main>
    )
}
