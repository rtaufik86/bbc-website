import { Metadata } from 'next'
import Image from 'next/image'
import ArticleHeader from '@/components/seo/ArticleHeader'
import SEOBreadcrumbs from '@/components/seo/Breadcrumbs'
import InternalLink from '@/components/seo/InternalLink'
import RelatedContent from '@/components/seo/RelatedContent'
import Script from 'next/script'
import { CheckCircle2, AlertTriangle, Info, MapPin, Building2, TrendingUp, Gauge, XCircle, ArrowRight } from 'lucide-react'

const currentYear = new Date().getFullYear();
const title = `Panduan Lengkap Sewa Kantor Jakarta Selatan ${currentYear} | Harga & Tips`
const description = 'Panduan memilih kantor siap pakai Jakarta Selatan: perbandingan harga per area, jenis kantor, syarat PKP, dan tips menghindari kesalahan umum saat sewa kantor.'

export const metadata: Metadata = {
    alternates: { canonical: 'https://bintarobusinesscentre.com/sewa-kantor/jakarta-selatan' },
    title,
    description,
    openGraph: {
        type: 'article',
        title,
        description,
        url: 'https://bintarobusinesscentre.com/sewa-kantor/jakarta-selatan',
        siteName: 'Bintaro Business Centre',
        images: [
            {
                url: '/images/hero-sewa-kantor-jakarta-selatan.jpg',
                width: 1200,
                height: 630,
                alt: 'Panduan Sewa Kantor Jakarta Selatan'
            }
        ]
    }
}

const relatedArticles = [
    {
        title: 'Harga Sewa Kantor Bintaro',
        description: 'Detail breakdown biaya sewa kantor di kawasan Bintaro dan faktor yang mempengaruhinya.',
        href: '/sewa-kantor/harga'
    },
    {
        title: 'Sewa Kantor Bintaro',
        description: 'Kenapa Bintaro menjadi alternatif strategis untuk kantor di Jakarta Selatan.',
        href: '/sewa-kantor/bintaro'
    },
    {
        title: 'Kantor Siap Pakai Bintaro',
        description: 'Solusi serviced office modern untuk startup dan SME di perbatasan Jakarta.',
        href: '/sewa-kantor/kantor-siap-pakai-bintaro'
    }
]

export default function Page() {
    const schemaObject = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://bintarobusinesscentre.com/sewa-kantor/jakarta-selatan/#webpage",
                "url": "https://bintarobusinesscentre.com/sewa-kantor/jakarta-selatan/",
                "name": title,
                "description": description,
                "inLanguage": "id-ID",
                "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://bintarobusinesscentre.com/#website"
                },
                "about": {
                    "@type": "Thing",
                    "name": "Sewa Kantor Jakarta Selatan"
                }
            },
            {
                "@type": "Article",
                "@id": "https://bintarobusinesscentre.com/sewa-kantor/jakarta-selatan/#article",
                "headline": "Panduan Sewa Kantor Jakarta Selatan – Perbandingan Harga, Jenis, dan Tips Memilih",
                "description": "Panduan edukatif tentang serviced office di Jakarta Selatan, termasuk estimasi harga, perbandingan dengan ruko, dan syarat PKP berdasarkan KBLI.",
                "author": {
                    "@type": "Organization",
                    "name": "Bintaro Business Centre"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Bintaro Business Centre",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://bintarobusinesscentre.com/logo.png"
                    }
                },
                "mainEntityOfPage": {
                    "@id": "https://bintarobusinesscentre.com/sewa-kantor/jakarta-selatan/#webpage"
                },
                "inLanguage": "id-ID"
            },
            {
                "@type": "Service",
                "@id": "https://bintarobusinesscentre.com/sewa-kantor/jakarta-selatan/#service-reference",
                "name": "Serviced Office Jakarta Selatan",
                "description": "Serviced office di Jakarta Selatan dengan fasilitas lengkap and alamat administratif DKI Jakarta untuk kebutuhan legalitas bisnis.",
                "areaServed": {
                    "@type": "AdministrativeArea",
                    "name": "Jakarta Selatan"
                },
                "provider": {
                    "@type": "Organization",
                    "name": "Bintaro Business Centre",
                    "url": "https://bintarobusinesscentre.com"
                }
            },
            {
                "@type": "FAQPage",
                "@id": "https://bintarobusinesscentre.com/sewa-kantor/jakarta-selatan/#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Apakah serviced office bisa digunakan untuk PKP?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ya, dengan catatan sesuai klasifikasi KBLI perusahaan. Untuk KBLI Jasa umumnya memenuhi syarat, sementara KBLI Selain Jasa (Trading, Distributor, Transportasi, Event Organizer, dll) memerlukan kontrak minimum satu tahun dengan space dedicated. Persyaratan akhir tetap mengikuti kebijakan kantor pajak setempat."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Berapa lama proses move-in serviced office?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Setelah perjanjian ditandatangani dan pembayaran dikonfirmasi, proses move-in umumnya dapat dilakukan dalam 3–5 hari kerja tergantung kesiapan unit."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apa perbedaan serviced office dan ruko?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Serviced office adalah kantor siap pakai dengan fasilitas lengkap dalam satu biaya bulanan, sedangkan ruko memerlukan investasi renovasi dan pengelolaan operasional sendiri."
                        }
                    }
                ]
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://bintarobusinesscentre.com/sewa-kantor/jakarta-selatan/#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://bintarobusinesscentre.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Sewa Kantor",
                        "item": "https://bintarobusinesscentre.com/sewa-kantor/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Panduan Sewa Kantor Jakarta Selatan"
                    }
                ]
            }
        ]
    };

    return (
        <article className="py-12 md:py-24 bg-white overflow-hidden">
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }}
            />
            <div className="container mx-auto px-4 max-w-5xl">
                <SEOBreadcrumbs items={[{ label: 'Sewa Kantor Jakarta Selatan' }]} />

                <header className="mt-8 mb-12">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F1E33] mb-8 leading-[1.15]">
                        Panduan Sewa Kantor Jakarta Selatan – Perbandingan Harga, Jenis, dan Tips Memilih
                    </h1>
                    <div className="flex items-center text-sm font-medium text-slate-500 gap-4 mb-10">
                        <time dateTime="2026-02-15">15 Februari 2026</time>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <span className="text-[#0F1E33] font-bold uppercase tracking-wider font-sans">Bintaro Business Centre</span>
                    </div>

                    <div className="bg-[#FAFAF8] p-8 rounded-3xl border-l-4 border-[#B08B3E] shadow-sm mb-12">
                        <p className="text-xl md:text-2xl text-[#0F1E33] leading-relaxed font-medium">
                            Memilih kantor yang tepat di Jakarta Selatan bukan hanya soal menemukan ruang kerja – ini tentang positioning strategis yang berdampak pada kredibilitas bisnis, efisiensi administrasi legalitas, dan aksesibilitas operasional. Panduan ini membahas berbagai aspek penting dalam sewa kantor Jakarta Selatan: dari memahami jenis kantor siap pakai, perbandingan biaya dengan alternatif lain, hingga kesalahan umum yang harus dihindari.
                        </p>
                        <p className="text-lg md:text-xl text-[#1C2E4A]/80 mt-6 leading-relaxed">
                            Jakarta Selatan menawarkan spektrum pilihan kantor yang luas, mulai dari pusat bisnis premium di Kuningan dan SCBD hingga kawasan berkembang di Pesanggrahan dan Cilandak. Pemahaman komprehensif tentang karakteristik masing-masing area, struktur biaya, dan persyaratan legalitas akan membantu Anda membuat keputusan yang tepat untuk kebutuhan bisnis jangka panjang.
                        </p>
                    </div>
                </header>

                <div className="mb-20 relative">
                    <div className="aspect-[21/9] relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                        <Image
                            src="/images/hero-sewa-kantor-jakarta-selatan.jpg"
                            alt="Sewa Kantor Jakarta Selatan - Hub Panduan"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                <div className="prose prose-lg text-slate-700 max-w-none prose-headings:text-[#0F1E33] prose-headings:font-bold prose-headings:font-heading prose-a:text-[#B08B3E] prose-strong:text-[#0F1E33] leading-relaxed space-y-20">

                    <section>
                        <h2 className="text-3xl md:text-4xl">BAGIAN 1: Kantor Siap Pakai: Definisi dan Karakteristik Utama</h2>
                        <p>
                            Kantor siap pakai adalah ruang kantor lengkap dengan perabotan yang disewakan dengan sistem menyeluruh – Anda mendapatkan meja kerja, kursi, jaringan internet, listrik, dan layanan administrasi dalam satu paket bulanan. Berbeda dengan sewa kantor konvensional yang mengharuskan Anda melakukan pemasangan dari awal, kantor siap pakai langsung dapat digunakan pada hari pertama.
                        </p>

                        <div className="space-y-6 mt-8">
                            <p>
                                <strong>Perabotan lengkap</strong> – Meja kerja ergonomis, kursi kantor standar komersial, lemari arsip, pendingin udara individual, dan telepon sudah tersedia. Anda hanya perlu membawa komputer jinjing dan mulai bekerja.
                            </p>
                            <p>
                                <strong>Utilitas tergabung</strong> – Listrik, air, jaringan internet khusus, dan pemeliharaan rutin termasuk dalam biaya sewa bulanan. Tidak ada kejutan tagihan utilitas terpisah dengan catatan kebijakan penggunaan wajar untuk listrik.
                            </p>
                            <p>
                                <strong>Layanan operasional</strong> – Resepsionis untuk penerimaan tamu dan penanganan kurir, kebersihan harian, pemeliharaan siap panggil, dan keamanan 24 jam penuh. Tim operasional gedung menangani semua aspek pendukung sehingga Anda fokus pada bisnis inti.
                            </p>
                            <p>
                                <strong>Alamat legal</strong> – Kantor siap pakai dapat digunakan sebagai domisili resmi perusahaan untuk keperluan pendirian PT atau CV dan pengurusan Nomor Induk Berusaha. Untuk pengajuan Pengusaha Kena Pajak, kelayakan tergantung klasifikasi Klasifikasi Baku Lapangan Usaha Indonesia perusahaan Anda – kantor siap pakai memenuhi persyaratan untuk klasifikasi Jasa (konsultan, layanan teknologi informasi, agensi pemasaran), sementara klasifikasi Selain Jasa (Trading, Distributor, Transportasi, Event Organizer) memerlukan kontrak minimum 1 tahun dengan ruang khusus. Persyaratan akhir tetap mengikuti kebijakan kantor pajak pratama setempat, sehingga konsultasi dengan penasihat pajak atau penyedia kantor siap pakai sangat disarankan sebelum berkomitmen.
                            </p>
                            <p>
                                <strong>Kontrak fleksibel</strong> – Durasi kontrak dapat disesuaikan dengan kebutuhan bisnis Anda, mulai dari jangka pendek hingga tahunan. Untuk perusahaan dengan klasifikasi Selain Jasa yang memerlukan Pengusaha Kena Pajak, kontrak minimum 1 tahun diperlukan sesuai persyaratan kantor pajak.
                            </p>
                        </div>

                        <div className="bg-[#E5EAF2] p-10 rounded-[2.5rem] border border-[#CBD5E1] my-12">
                            <h3 className="text-[#0F1E33] mt-0">Perbedaan dengan ruang kerja bersama (Coworking Space):</h3>
                            <p className="mb-0">
                                Kantor siap pakai memberikan ruang kerja pribadi – ruangan tertutup dengan pintu yang bisa dikunci, bukan meja di area terbuka. Anda mendapatkan privasi untuk rapat rahasia, penyimpanan dokumen aman, dan kontrol penuh atas siapa yang mengakses ruang Anda. Ruang kerja bersama cocok untuk individu atau pekerja lepas yang butuh fleksibilitas maksimal; kantor siap pakai cocok untuk perusahaan yang butuh privasi, stabilitas, dan citra profesional.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl md:text-4xl">BAGIAN 2: Mengapa Jakarta Selatan untuk Alamat Perusahaan Anda</h2>
                        <p>
                            Jakarta Selatan bukan sekadar lokasi geografis – ini adalah penempatan strategis dengan implikasi konkret pada kredibilitas bisnis, efisiensi administrasi, dan aksesibilitas operasional.
                        </p>

                        <h3>Keunggulan Administratif</h3>
                        <p>
                            Alamat DKI Jakarta memberikan Anda akses lebih efisien ke berbagai proses legalitas. Sistem Perizinan Berusaha Terintegrasi Secara Elektronik untuk Nomor Induk Berusaha, koordinasi dengan instansi pemerintah pusat, dan pengurusan perizinan tertentu lebih lancar dengan domisili Jakarta dibanding kota atau kabupaten lain.
                        </p>
                        <p>
                            <strong>Kredibilitas alamat</strong> – Klien korporat, mitra internasional, dan lembaga keuangan sering mengasosiasikan alamat Jakarta Selatan dengan bisnis mapan. Ini bukan soal gengsi kosong, tapi tentang kesan pertama dalam keterlibatan bisnis ke bisnis dimana tingkat kepercayaan menentukan apakah proposal Anda dibaca serius atau diabaikan.
                        </p>
                        <p>
                            <strong>Kantor Pajak Pratama</strong> – Untuk perusahaan yang perlu mengajukan Pengusaha Kena Pajak, lokasi kantor menentukan Kantor Pelayanan Pajak yang menangani. Jakarta Selatan memiliki beberapa Kantor Pelayanan Pajak Pratama dengan rekam jejak pemrosesan yang relatif mapan untuk pengajuan Pengusaha Kena Pajak, memberikan kejelasan dalam proses administrasi perpajakan.
                        </p>

                        <h3>Akses Infrastruktur</h3>
                        <p>
                            Konektivitas jalan tol – Jakarta Selatan dilalui oleh Tol Lingkar Luar Jakarta, Tol Jakarta-Serpong, dan berbagai akses masuk ke Jalan Tol Dalam Kota. Untuk bisnis yang membutuhkan mobilitas tinggi (distribusi, logistik, kunjungan klien), aksesibilitas ini mengurangi waktu tempuh signifikan.
                        </p>

                        <div className="bg-[#0F1E33] text-white p-12 rounded-[2.5rem] my-12 shadow-2xl">
                            <h4 className="text-[#B08B3E] font-bold uppercase tracking-widest text-sm mb-6">Khusus untuk kawasan Pesanggrahan, Jakarta Selatan:</h4>
                            <p className="text-xl leading-relaxed mb-8">
                                Kawasan Pesanggrahan menawarkan titik optimal: alamat administratif Jakarta Selatan dengan aksesibilitas yang praktis. Berlokasi dekat dengan Pintu Tol Veteran dan Jalan RC Veteran Raya, area ini memberikan akses cepat ke:
                            </p>
                            <ul className="grid md:grid-cols-2 gap-4 text-[#CBD5E1] list-none pl-0">
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#B08B3E]"></div>
                                    Kawasan Bintaro Jaya untuk ekosistem bisnis dan ritel
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#B08B3E]"></div>
                                    Pondok Indah untuk perbankan dan layanan korporat
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#B08B3E]"></div>
                                    JORR untuk konektivitas ke Serpong, BSD, dan Bandara
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#B08B3E]"></div>
                                    Kebayoran Lama dan Cilandak untuk jaringan profesional
                                </li>
                            </ul>
                            <p className="mt-8 text-slate-400 italic">
                                Lokasi ini memberikan manfaat alamat Jakarta Selatan dengan aksesibilitas pinggiran, tanpa kemacetan ekstrem pusat bisnis namun tetap dalam radius wajar ke pusat bisnis utama.
                            </p>
                        </div>

                        <h3>Ekosistem Bisnis Matang</h3>
                        <p>
                            Jakarta Selatan memiliki konsentrasi tinggi: Layanan profesional (notaris, akuntan, konsultan pajak), Perbankan korporat, dan Layanan pendukung (percetakan, kurir, katering). Ketika Anda butuh notaris untuk legalisasi dokumen atau akuntan untuk konsultasi pajak mendadak, kedekatan ini menghemat waktu operasional signifikan.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl md:text-4xl">BAGIAN 3: Profil Bisnis yang Optimal untuk Kantor Siap Pakai</h2>
                        <p>
                            Kantor siap pakai bukan solusi universal – ada jenis bisnis yang mendapat nilai maksimal dari model ini, dan ada yang lebih baik dengan pilihan lain.
                        </p>

                        <h3>Ideal untuk:</h3>
                        <div className="space-y-8 mt-6">
                            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                                <p className="font-bold text-xl text-[#0F1E33] mb-2">Perusahaan Selain Jasa (Trading, Distribusi, Transportasi)</p>
                                <p className="mb-0 leading-relaxed text-slate-600">
                                    Anda tidak butuh gudang di alamat kantor, tapi butuh alamat legal kredibel untuk kontrak dengan pemasok dan pembeli. Kantor siap pakai memberikan alamat profesional tanpa membayar berlebih untuk ruang yang tidak Anda manfaatkan. Untuk klasifikasi Selain Jasa (Trading, Distributor, Transportasi, Event Organizer) yang memerlukan Pengusaha Kena Pajak, pastikan Anda berkomitmen kontrak minimum 1 tahun sesuai persyaratan kantor pajak.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                                <p className="font-bold text-xl text-[#0F1E33] mb-2">Konsultan profesional</p>
                                <p className="mb-0 leading-relaxed text-slate-600">
                                    Pengacara, konsultan pajak, konsultan manajemen, atau konsultan teknologi informasi yang operasinya menghadap klien dengan tim kecil (2-5 orang). Anda butuh ruang rapat untuk presentasi klien, tapi tidak butuh kantor terbuka besar. Kantor siap pakai dengan akses ruang rapat sesuai kebutuhan memberikan fleksibilitas hemat biaya, dan untuk klasifikasi Jasa, alamat ini memenuhi syarat untuk pengajuan Pengusaha Kena Pajak.
                                    <InternalLink href="/sewa-kantor" anchorType="brand-service" position="mid-content" className="ml-1">Cek sewa kantor siap pakai Jakarta Selatan</InternalLink> untuk tim kecil Anda.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                                <p className="font-bold text-xl text-[#0F1E33] mb-2">Kantor cabang perusahaan multinasional</p>
                                <p className="mb-0 leading-relaxed text-slate-600">
                                    Membangun kehadiran di Indonesia tanpa berkomitmen pada sewa jangka panjang atau investasi pemasangan. Kantor siap pakai memungkinkan Anda menguji pasar dengan biaya overhead rendah, kemudian meningkatkan ke kantor khusus jika pertumbuhan terbukti berkelanjutan.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                                <p className="font-bold text-xl text-[#0F1E33] mb-2">Perusahaan rintisan (Startup) dengan pendanaan awal</p>
                                <p className="mb-0 leading-relaxed text-slate-600">
                                    Anda punya dana operasional 12-18 bulan dan butuh alamat legal untuk presentasi investor atau perekrutan klien korporat. Kantor siap pakai memberikan citra profesional tanpa membakar kas untuk perabotan dan pemasangan. Fokuskan anggaran Anda ke pengembangan produk dan akuisisi pelanggan, bukan interior kantor.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                                <p className="font-bold text-xl text-[#0F1E33] mb-2">Kantor perwakilan asing</p>
                                <p className="mb-0 leading-relaxed text-slate-600">
                                    Perusahaan luar negeri yang membuka kantor perwakilan memerlukan alamat legal di Indonesia. Kantor siap pakai memenuhi persyaratan ini dengan proses lebih cepat dibanding sewa konvensional yang butuh perjanjian kompleks.
                                </p>
                            </div>
                        </div>

                        <h3 className="mt-12 text-slate-500">Kurang cocok untuk:</h3>
                        <ul className="space-y-4 text-slate-600 list-disc pl-5">
                            <li><strong>Perusahaan dengan jumlah karyawan lebih dari 10 orang</strong> – Kantor siap pakai umumnya efisien untuk 1-5 stasiun kerja. Di atas itu, biaya per tempat duduk mulai tidak kompetitif dibanding sewa kantor konvensional dengan ukuran lebih besar.</li>
                            <li><strong>Bisnis yang butuh penyesuaian ekstensif</strong> – Jika Anda perlu papan nama merek besar, renovasi tata letak, atau instalasi peralatan khusus (laboratorium, bengkel, studio), kantor siap pakai terlalu membatasi. Sewa khusus dengan kebebasan pemasangan lebih sesuai.</li>
                            <li><strong>Operasi dengan lalu lintas pengunjung tinggi</strong> – Jika bisnis Anda mengharuskan banyak pengunjung per hari (pusat pelatihan, klinik, ritel), kantor siap pakai yang berbagi area umum dengan penyewa lain bukan pilihan ideal.</li>
                        </ul>

                        <p className="mt-10 font-bold text-[#0F1E33] bg-[#E5EAF2] p-6 rounded-2xl border-l-4 border-[#1C2E4A]">
                            Jika profil bisnis Anda cocok dengan kategori ideal untuk kantor siap pakai di atas, eksplorasi sewa kantor siap pakai Jakarta Selatan yang memenuhi persyaratan legalitas dan aksesibilitas untuk operasi Anda.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl md:text-4xl">BAGIAN 4: Kantor Siap Pakai vs Ruko – Pertimbangan Biaya dan Operasional</h2>
                        <p>
                            Ruko sering dianggap alternatif kantor siap pakai, terutama di kawasan suburban. Perbandingan ini membantu Anda mengevaluasi pilihan mana yang lebih sesuai dengan kebutuhan dan anggaran.
                        </p>

                        <h3>Investasi Awal</h3>
                        <div className="grid md:grid-cols-2 gap-10 my-8">
                            <div className="p-8 bg-[#FAFAF8] rounded-2xl border border-slate-200">
                                <h4 className="mt-0 text-[#0F1E33]">Kantor siap pakai:</h4>
                                <ul className="list-none pl-0 space-y-2 text-sm">
                                    <li>• Deposit: 1 bulan sewa (dikembalikan)</li>
                                    <li>• Biaya administrasi: 1 kali (awal)</li>
                                    <li>• Total: sekitar 2-3 bulan sewa</li>
                                    <li className="font-bold text-[#B08B3E] underline underline-offset-4 decoration-[#B08B3E]/30">• Perabotan: Sudah termasuk (No CAPEX)</li>
                                </ul>
                            </div>
                            <div className="p-8 bg-[#FAFAF8] rounded-2xl border border-slate-200">
                                <h4 className="mt-0 text-slate-600">Ruko:</h4>
                                <ul className="list-none pl-0 space-y-2 text-sm">
                                    <li>• Deposit: 3-6 bulan sewa</li>
                                    <li>• Biaya komisi: 1-2 bulan sewa</li>
                                    <li>• Renovasi & Pemasangan: Rp 50-150jt</li>
                                    <li>• Perabotan: Rp 30-80jt</li>
                                    <li className="font-bold text-[#1C2E4A] underline underline-offset-4 decoration-[#1C2E4A]/30">• Total Awal: setara 10-15 bulan sewa</li>
                                </ul>
                            </div>
                        </div>

                        <h3>Biaya Operasional Bulanan</h3>
                        <p className="text-sm text-slate-500 italic mb-6">Contoh perbandingan untuk tim 3-4 stasiun kerja:</p>
                        <div className="overflow-x-auto rounded-2xl border border-slate-300">
                            <table className="w-full text-sm leading-relaxed border-collapse">
                                <thead className="bg-[#E5EAF2] font-bold border-b border-slate-300">
                                    <tr>
                                        <th className="p-4 text-left text-[#0F1E33]">Komponen</th>
                                        <th className="p-4 text-left text-[#0F1E33]">Kantor Siap Pakai</th>
                                        <th className="p-4 text-left text-[#0F1E33]">Ruko (2 Lt, 80m²)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    <tr>
                                        <td className="p-4 font-bold text-[#0F1E33]">Sewa</td>
                                        <td className="p-4 text-slate-700 font-medium">Rp 5.5jt - 7jt</td>
                                        <td className="p-4">Rp 2.5jt - 4.2jt</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-bold text-[#0F1E33]">Listrik & AC</td>
                                        <td className="p-4 text-[#B08B3E] font-bold uppercase tracking-wider text-xs">Termasuk</td>
                                        <td className="p-4">Rp 1.5jt - 2.5jt</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-bold text-[#0F1E33]">Internet Khusus</td>
                                        <td className="p-4 text-[#B08B3E] font-bold uppercase tracking-wider text-xs">Termasuk</td>
                                        <td className="p-4">Rp 1jt - 2jt</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-bold text-[#0F1E33]">Keamanan & Kebersihan</td>
                                        <td className="p-4 text-[#B08B3E] font-bold uppercase tracking-wider text-xs">Termasuk</td>
                                        <td className="p-4">Rp 5jt - 6jt</td>
                                    </tr>
                                    <tr className="bg-[#FAFAF8] font-bold text-lg">
                                        <td className="p-4 text-[#0F1E33]">Total Bulanan</td>
                                        <td className="p-4 text-[#0F1E33] border-l-4 border-[#B08B3E] bg-[#E5EAF2]/50">Rp 5.5jt - 7jt</td>
                                        <td className="p-4 text-slate-500 border-l-4 border-slate-300">Rp 10.5jt - 14.7jt</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-12 space-y-6">
                            <h3>Fleksibilitas Kontrak</h3>
                            <div>
                                <strong>Kantor siap pakai:</strong>
                                <ul className="list-none pl-0 mt-2 space-y-1">
                                    <li>Minimum: Fleksibel (bulanan hingga tahunan, tergantung kebutuhan)</li>
                                    <li className="text-sm italic text-slate-500">Catatan: KBLI Selain Jasa yang butuh PKP memerlukan kontrak minimum 1 tahun</li>
                                    <li>Perpanjangan: Dapat dinegosiasikan, biasanya kenaikan 5-10% per tahun</li>
                                    <li>Pemutusan lebih awal: Kehilangan deposit, masa pemberitahuan sesuai durasi kontrak</li>
                                </ul>
                            </div>
                            <p className="mt-6"><strong>Ruko:</strong> Minimum 1-3 tahun (pemilik lebih suka lebih lama). Perpanjangan: Biasanya kenaikan 10-15% per tahun atau negosiasi ulang 5 tahun. Pemutusan lebih awal: Kehilangan deposit penuh ditambah potensi penalti.</p>

                            <h3>Alamat Legal untuk Pengusaha Kena Pajak</h3>
                            <p><strong>Kantor siap pakai:</strong> Memenuhi syarat untuk klasifikasi Jasa (konsultan, IT, dsb) – bisa langsung digunakan untuk Pengusaha Kena Pajak. Untuk klasifikasi Selain Jasa – memerlukan kontrak minimum 1 tahun. Persyaratan akhir tetap mengikuti kebijakan kantor pajak pratama setempat.</p>
                            <p><strong>Ruko:</strong> Memenuhi syarat untuk semua klasifikasi, termasuk Selain Jasa. Lebih meyakinkan untuk pengajuan Pengusaha Kena Pajak karena ruang fisik khusus. Memerlukan IMB dan PBG untuk perizinan tertentu.</p>
                        </div>

                        <div className="not-prose bg-[#0F1E33] text-white p-12 rounded-[3rem] mt-16 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B08B3E]/10 rounded-full -mr-16 -mt-16"></div>
                            <h4 className="text-[#B08B3E] !text-[#B08B3E] mt-0 uppercase tracking-widest text-xs mb-8 border-b border-[#B08B3E]/20 pb-4">KESIMPULAN PERBANDINGAN:</h4>
                            <div className="grid md:grid-cols-2 gap-10">
                                <div>
                                    <h5 className="text-white !text-white font-bold text-xl mb-6">Pilih Kantor Siap Pakai jika:</h5>
                                    <ul className="list-none pl-0 space-y-4 text-sm text-[#CBD5E1]">
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#B08B3E]"></div>
                                            Tim kecil (1-5 orang)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#B08B3E]"></div>
                                            Anggaran CAPEX terbatas
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#B08B3E]"></div>
                                            Butuh fleksibilitas pasar
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#B08B3E]"></div>
                                            Klasifikasi Jasa / Selain Jasa (Ready 1 thn)
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="text-white !text-white font-bold text-xl mb-6 opacity-70">Pilih Ruko jika:</h5>
                                    <ul className="list-none pl-0 space-y-4 text-sm text-slate-400">
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                            Tim lebih besar (&gt; 10 orang)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                            Butuh branding papan nama besar
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                            Proyeksi jangka panjang (&gt; 3 tahun)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                            Butuh visibilitas fisik ritel
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl md:text-4xl">BAGIAN 5: Kisaran Harga Kantor Siap Pakai di Jakarta Selatan</h2>
                        <p>Harga kantor siap pakai bervariasi signifikan berdasarkan lokasi, fasilitas, dan ukuran. Berikut rincian umum untuk Jakarta Selatan:</p>

                        <div className="grid md:grid-cols-3 gap-8 my-10">
                            <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="mt-0 text-[#0F1E33] font-black">CBD Premium</h4>
                                <p className="text-xs text-slate-500 mb-4 uppercase">Kuningan, SCBD, Sudirman</p>
                                <p className="text-sm font-bold text-slate-700 mb-1">1-2 Station:</p>
                                <p className="text-xl font-bold text-[#B08B3E] mb-4">Rp 8jt - 15jt</p>
                                <p className="text-slate-500 text-xs italic leading-relaxed">Multinasional, Law Firm, Finance.</p>
                            </div>
                            <div className="p-8 bg-white border-2 border-[#E5EAF2] rounded-2xl shadow-[#0F1E33]/5 shadow-xl">
                                <h4 className="mt-0 text-[#0F1E33] font-black">CBD Sekunder</h4>
                                <p className="text-xs text-slate-500 mb-4 uppercase">P. Indah, Fatmawati, Simatupang</p>
                                <p className="text-sm font-bold text-slate-700 mb-1">1-2 Station:</p>
                                <p className="text-xl font-bold text-[#B08B3E] mb-4">Rp 5jt - 10jt</p>
                                <p className="text-slate-500 text-xs italic leading-relaxed">Usaha menengah mapan, Agency.</p>
                            </div>
                            <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="mt-0 text-[#0F1E33] font-black">Suburban Matang</h4>
                                <p className="text-xs text-slate-500 mb-4 uppercase">Pesanggrahan, Cilandak, Jagakarsa</p>
                                <p className="text-sm font-bold text-slate-700 mb-1">1-2 Station:</p>
                                <p className="text-xl font-bold text-[#B08B3E] mb-4">Rp 3.5jt - 6jt</p>
                                <p className="text-slate-500 text-xs italic leading-relaxed">Trading, Konsultan, Startup.</p>
                            </div>
                        </div>

                        <h3>Yang Termasuk dalam Harga</h3>
                        <p>Pastikan Anda konfirmasi dengan penyedia apa saja yang termasuk:</p>
                        <ul className="grid md:grid-cols-2 gap-4 text-[#0F1E33] font-medium list-none pl-0">
                            <li className="flex items-center gap-2 bg-[#FAFAF8] p-3 rounded-xl">
                                <CheckCircle2 className="text-[#B08B3E] shrink-0" size={20} />
                                Perabotan standar komplet
                            </li>
                            <li className="flex items-center gap-2 bg-[#FAFAF8] p-3 rounded-xl">
                                <CheckCircle2 className="text-[#B08B3E] shrink-0" size={20} />
                                Internet khusus dedicated
                            </li>
                            <li className="flex items-center gap-2 bg-[#FAFAF8] p-3 rounded-xl">
                                <CheckCircle2 className="text-[#B08B3E] shrink-0" size={20} />
                                Listrik quota wajar
                            </li>
                            <li className="flex items-center gap-2 bg-[#FAFAF8] p-3 rounded-xl">
                                <CheckCircle2 className="text-[#B08B3E] shrink-0" size={20} />
                                Layanan resepsionis jam kantor
                            </li>
                            <li className="flex items-center gap-2 bg-[#FAFAF8] p-3 rounded-xl">
                                <CheckCircle2 className="text-[#B08B3E] shrink-0" size={20} />
                                Quota Ruang Rapat gratis
                            </li>
                            <li className="flex items-center gap-2 bg-[#FAFAF8] p-3 rounded-xl">
                                <CheckCircle2 className="text-[#B08B3E] shrink-0" size={20} />
                                Maintenance & Kebersihan
                            </li>
                        </ul>

                        <div className="mt-12 p-10 bg-[#FAFAF8] rounded-3xl border border-[#CBD5E1]">
                            <h4 className="mt-0 text-[#0F1E33] flex items-center gap-2">
                                <AlertTriangle size={24} className="text-[#B08B3E]" /> Biaya Tersembunyi yang Sering Terlewat:
                            </h4>
                            <ul className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-slate-600 list-none pl-0 text-sm opacity-90 mt-6 font-sans">
                                <li className="flex items-center gap-2 italic">• Lembur AC (Biaya extra setelah jam 6 sore)</li>
                                <li className="flex items-center gap-2 italic">• Kelebihan Ruang Rapat (Charge per jam)</li>
                                <li className="flex items-center gap-2 italic">• Parkir Tambahan (Charge bulanan)</li>
                                <li className="flex items-center gap-2 italic">• Penggunaan Telepon / Panggilan International</li>
                                <li className="flex items-center gap-2 italic">• Cetak & Pindai (Charge per lembar)</li>
                            </ul>
                        </div>

                        <p className="mt-12 text-[#1C2E4A] font-medium text-center bg-[#E5EAF2]/30 py-6 rounded-2xl border border-dashed border-[#CBD5E1]">
                            💡 <strong>Daya Tawar Negosiasi:</strong> Jika Anda berkomitmen 2 tahun, biasanya dapat diskon 10-15%. Untuk detail harga spesifik dan ketersediaan di kawasan Pesanggrahan dengan alamat Jakarta Selatan, lihat opsi kantor siap pakai di BBC yang menawarkan transparansi harga tinggi.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl md:text-4xl text-[#0F1E33] flex items-center gap-4">
                            <AlertTriangle size={40} className="text-[#B08B3E] shrink-0" />
                            BAGIAN 6: 5 Kesalahan yang Harus Dihindari Saat Sewa Kantor
                        </h2>

                        <div className="space-y-12 mt-12">
                            <div className="relative pl-12 border-l-2 border-[#CBD5E1]">
                                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#0F1E33] text-white flex items-center justify-center font-bold text-sm">1</div>
                                <h4 className="mt-0 font-bold text-xl text-[#0F1E33]">Terjebak Harga Murah Tanpa Cek Detail Utilitas</h4>
                                <p className="mb-4">Harga sewa Rp 3 juta terlihat menarik, tapi rincian biaya yang tidak transparan bisa membuat total pengeluaran bulanan naik 40-60%. Selalu minta rincian apa yang termasuk dan berapa batas penggunaan wajar listrik.</p>
                                <p className="text-sm font-medium text-[#0F1E33] bg-[#E5EAF2]/50 p-4 rounded-xl border-l-4 border-[#B08B3E]"><strong>Dampak:</strong> Anggaran operasional meledak di bulan kedua. <strong>Solusi:</strong> Bandingkan total biaya bulanan all-in.</p>
                            </div>

                            <div className="relative pl-12 border-l-2 border-[#CBD5E1]">
                                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#0F1E33] text-white flex items-center justify-center font-bold text-sm">2</div>
                                <h4 className="mt-0 font-bold text-xl text-[#0F1E33]">Tidak Verifikasi Jam Operasional dan Biaya Lembur</h4>
                                <p className="mb-4">Banyak kantor beroperasi 08:00-18:00. Jika tim Anda kerja sampai malam atau weekend, konfirmasi biaya lembur AC dan akses keamanan. Biaya bisa mencapai Rp 100k-300k per sesi.</p>
                                <p className="text-sm font-medium text-[#0F1E33] bg-[#E5EAF2]/50 p-4 rounded-xl border-l-4 border-[#B08B3E]"><strong>Dampak:</strong> Tambahan biaya Rp 4-6jt per bulan yang tidak dianggarkan. <strong>Solusi:</strong> Negosiasikan paket lembur tetap.</p>
                            </div>

                            <div className="relative pl-12 border-l-2 border-[#CBD5E1]">
                                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#0F1E33] text-white flex items-center justify-center font-bold text-sm">3</div>
                                <h4 className="mt-0 font-bold text-xl text-[#0F1E33]">Tidak Memahami Syarat PKP Sesuai Klasifikasi</h4>
                                <p className="mb-4">Kesalahan kritis: Perusahaan Selain Jasa menyewa kantor virtual, kemudian ditolak PKP karena tidak memenuhi syarat kantor fisik dengan kontrak min. 1 tahun. Persyaratan akhir mengikuti kebijakan KPP setempat.</p>
                                <p className="text-sm font-medium text-[#0F1E33] bg-[#E5EAF2]/50 p-4 rounded-xl border-l-4 border-[#B08B3E]"><strong>Dampak:</strong> Kehilangan waktu 2-3 bulan dan biaya deposit ganda. <strong>Solusi:</strong> Konsultasikan KBLI Anda sebelum sewa.</p>
                            </div>

                            <div className="relative pl-12 border-l-2 border-[#CBD5E1]">
                                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#0F1E33] text-white flex items-center justify-center font-bold text-sm">4</div>
                                <h4 className="mt-0 font-bold text-xl text-[#0F1E33]">Mengabaikan Akses Jalan Tol dan Waktu Tempuh</h4>
                                <p className="mb-4">"Dekat Jakarta" ≠ "Mudah Diakses". Kantor di peta mungkin strategis tapi butuh 90 menit tanpa akses tol langsung. Prioritaskan lokasi dekat Pintu Tol Veteran untuk mobilitas optimal.</p>
                                <p className="text-sm font-medium text-[#0F1E33] bg-[#E5EAF2]/50 p-4 rounded-xl border-l-4 border-[#B08B3E]"><strong>Dampak:</strong> Produktivitas tim turun drastis karena habis di jalan. <strong>Solusi:</strong> Uji rute aktual saat jam sibuk.</p>
                            </div>

                            <div className="relative pl-12 border-l-2 border-[#CBD5E1]">
                                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#0F1E33] text-white flex items-center justify-center font-bold text-sm">5</div>
                                <h4 className="mt-0 font-bold text-xl text-[#0F1E33]">Tidak Membaca Kontrak Perpanjangan dan Klausul Keluar</h4>
                                <p className="mb-4">Kontrak 1 tahun bisa menjebak kenaikan 15-20% tanpa jendela negosiasi. Juga waspadai penalti pemutusan lebih awal yang bisa mencapai 3-6 bulan sewa.</p>
                                <p className="text-sm font-medium text-[#0F1E33] bg-[#E5EAF2]/50 p-4 rounded-xl border-l-4 border-[#B08B3E]"><strong>Dampak:</strong> Kehilangan Rp 18jt+ untuk keluar lebih awal. <strong>Solusi:</strong> Minta klausul kenaikan maksimal (max 10%).</p>
                            </div>
                        </div>

                        <p className="mt-16 text-center font-bold text-[#0F1E33] bg-[#FAFAF8] p-8 rounded-3xl border border-[#CBD5E1] shadow-sm italic">
                            Praktik Terbaik: Lakukan kunjungan ke minimum 2 lokasi, bawa checklist (utilitas, PKP, parkir, meeting room), dan minta rincian harga tertulis lengkap.
                        </p>
                    </section>

                    <section id="faq">
                        <h2 className="text-3xl md:text-4xl text-[#0F1E33] mb-10 border-b-2 border-[#FAFAF8] pb-4">BAGIAN 7: Pertanyaan yang Sering Diajukan</h2>
                        <div className="space-y-4">
                            <details className="group bg-white border border-slate-200 rounded-2xl overflow-hidden pointer-events-auto cursor-pointer">
                                <summary className="font-bold text-xl py-6 px-8 flex justify-between items-center decoration-none group-hover:bg-[#FAFAF8] transition-colors">
                                    Apakah kantor siap pakai bisa digunakan untuk Pengusaha Kena Pajak?
                                    <span className="text-[#B08B3E] transition-transform group-open:rotate-180">▼</span>
                                </summary>
                                <div className="px-8 pb-8 text-slate-600 leading-relaxed pt-2">
                                    Ya, dengan catatan sesuai klasifikasi usaha perusahaan Anda. Untuk klasifikasi Jasa, kontrak kantor siap pakai umumnya langsung memenuhi syarat. Untuk klasifikasi Selain Jasa (Trading, Distributor, Transportasi, Event Organizer, dll), Anda perlu kontrak minimum 1 tahun dengan ruang khusus – kantor siap pakai memenuhi persyaratan ini. Persyaratan akhir tetap mengikuti kebijakan kantor pajak pratama setempat.
                                </div>
                            </details>

                            <details className="group bg-white border border-slate-200 rounded-2xl overflow-hidden pointer-events-auto cursor-pointer">
                                <summary className="font-bold text-xl py-6 px-8 flex justify-between items-center decoration-none group-hover:bg-[#FAFAF8] transition-colors">
                                    Berapa lama proses persetujuan dan pindah masuk?
                                    <span className="text-[#B08B3E] transition-transform group-open:rotate-180">▼</span>
                                </summary>
                                <div className="px-8 pb-8 text-slate-600 leading-relaxed pt-2">
                                    Setelah perjanjian ditandatangani dan pembayaran dikonfirmasi, pindah masuk bisa dalam 3-5 hari kerja. Pemrosesan termasuk verifikasi dokumen, aktivasi internet dedicated, sambungan telepon, dan kartu akses.
                                </div>
                            </details>

                            <details className="group bg-white border border-slate-200 rounded-2xl overflow-hidden pointer-events-auto cursor-pointer">
                                <summary className="font-bold text-xl py-6 px-8 flex justify-between items-center decoration-none group-hover:bg-[#FAFAF8] transition-colors text-left">
                                    Berapa lama kontrak minimum untuk Service Office?
                                    <span className="text-[#B08B3E] transition-transform group-open:rotate-180">▼</span>
                                </summary>
                                <div className="px-8 pb-8 text-slate-600 leading-relaxed pt-2">
                                    Durasi kontrak Service Office fleksibel dan dapat disesuaikan dengan kebutuhan bisnis Anda. Kontrak dapat dibuat bulanan, beberapa bulan, atau tahunan. Namun, jika perusahaan Anda memiliki klasifikasi Selain Jasa dan memerlukan Pengusaha Kena Pajak, kantor pajak mengharuskan kontrak minimum 1 tahun sebagai salah satu persyaratan pengajuan. Untuk klasifikasi Jasa, kontrak bisa lebih fleksibel.
                                </div>
                            </details>
                        </div>
                    </section>

                    <section className="not-prose text-center pt-16">
                        <h2 className="text-4xl md:text-5xl font-black text-[#0F1E33] mb-8 leading-tight italic">BAGIAN 8: Eksplorasi Pilihan Kantor Siap Pakai di Jakarta Selatan</h2>
                        <p className="text-xl text-[#1C2E4A]/80 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                            Memilih kantor siap pakai yang tepat memerlukan kunjungan lokasi untuk merasakan suasana ruang kerja, bertemu tim penyedia, dan memastikan kesesuaian dengan kebutuhan operasional tim Anda.
                        </p>

                        <div className="bg-[#0F1E33] text-white p-12 md:p-16 rounded-[4rem] shadow-2xl space-y-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B08B3E]/10 rounded-full blur-3xl"></div>
                            <p className="text-2xl md:text-3xl font-bold leading-relaxed relative z-10 !text-white">
                                Kawasan Pesanggrahan menawarkan kombinasi optimal antara kredibilitas administratif dan aksesibilitas praktis.
                            </p>
                            <p className="text-[#CBD5E1] text-lg relative z-10 italic">
                                Berlokasi di Jalan RC Veteran dengan akses mudah ke Pintu Tol Veteran, lokasi ini memberikan Anda kemudahan mobilitas dengan alamat legal Jakarta Selatan.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6 relative z-10 px-4 md:px-0">
                                <InternalLink
                                    href="/sewa-kantor/harga"
                                    anchorType="service-location"
                                    position="cta"
                                    className="bg-white !text-[#0F1E33] px-8 md:px-10 py-5 md:py-6 rounded-2xl font-black shadow-xl hover:bg-[#FAFAF8] transition-all text-lg md:text-xl border-2 border-white"
                                >
                                    Cek Daftar Harga
                                </InternalLink>
                                <InternalLink
                                    href="/sewa-kantor"
                                    anchorType="descriptive"
                                    position="cta"
                                    className="bg-[#B08B3E] !text-white px-8 md:px-10 py-5 md:py-6 rounded-2xl font-black shadow-xl hover:bg-[#8F6F2E] transition-all text-lg md:text-xl"
                                >
                                    Pesan Survey Lokasi →
                                </InternalLink>
                            </div>
                        </div>

                        <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                            <div className="border border-[#CBD5E1] p-8 rounded-2xl hover:bg-[#FAFAF8] transition-colors">
                                <h5 className="font-bold text-[#0F1E33] mb-2 font-heading">Struktur Biaya Detail</h5>
                                <p className="text-sm text-slate-500 mb-4 leading-relaxed font-sans">Untuk pertimbangan spesifik terkait harga dan rincian biaya operasional di Bintaro & Jaksel.</p>
                                <InternalLink href="/sewa-kantor/harga" anchorType="service-location" position="mid-content" className="text-[#B08B3E] font-bold text-sm uppercase flex items-center gap-2">Baca Panduan Harga <ArrowRight size={14} /></InternalLink>
                            </div>
                            <div className="border border-[#CBD5E1] p-8 rounded-2xl hover:bg-[#FAFAF8] transition-colors">
                                <h5 className="font-bold text-[#0F1E33] mb-2 font-heading">Kantor vs Ruko</h5>
                                <p className="text-sm text-slate-500 mb-4 leading-relaxed font-sans">Analisis manfaat biaya yang lebih mendalam antara kantor siap pakai dan unit ruko kosong.</p>
                                <InternalLink href="/sewa-kantor/kantor-siap-pakai-bintaro" anchorType="brand-service" position="mid-content" className="text-[#B08B3E] font-bold text-sm uppercase flex items-center gap-2">Baca Perbandingan <ArrowRight size={14} /></InternalLink>
                            </div>
                        </div>

                        <p className="mt-20 text-slate-400 font-medium text-xs md:text-sm tracking-[0.2em] uppercase font-sans">
                            Keputusan yang tepat dimulai dengan informasi yang komprehensif.
                        </p>
                    </section>
                </div>

                <footer className="mt-24 border-t border-[#CBD5E1]/30 pt-20">
                    <RelatedContent articles={relatedArticles} title="Bacaan Strategis Terkait" layout="list" />
                </footer>
            </div>
        </article>
    )
}
