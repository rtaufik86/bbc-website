import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import {
    Check,
    Clock,
    Building2,
    Briefcase,
    FileText,
    Shield,
    MapPin,
    ArrowRight,
    Search,
    History,
    FileCheck,
    Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'Bintaro Business Centre: Infrastruktur Bisnis Terpercaya Jakarta Selatan | BBC',
    description: 'Sejak 2007, BBC telah menjadi fondasi operasional bagi 1.800+ perusahaan yang membutuhkan alamat bisnis sah, ruang kerja profesional, dan dukungan legalitas di Jakarta Selatan.',
    alternates: { canonical: 'https://bintarobusinesscentre.com/tentang-kami' },
}

export default function TentangKamiPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "Tentang Bintaro Business Centre",
        "description": "Sejarah, misi, dan ekosistem infrastruktur bisnis Bintaro Business Centre di Jakarta Selatan sejak 2007.",
        "publisher": {
            "@type": "LocalBusiness",
            "name": "Bintaro Business Centre",
            "legalName": "PT. Ganesha Dwipaya Bhakti",
            "url": "https://www.bintarobusinesscentre.com"
        },
        "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Bintaro Business Centre"
        }
    }

    return (
        <main className="bg-white text-charcoal font-sans">
            <Script
                id="tentang-kami-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HERO SECTION */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-bg-paper">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.3em] mb-6">Established 2007</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-primary leading-[1.1] mb-8 font-heading">
                            Bintaro Business Centre: Infrastruktur Bisnis Terpercaya di Jakarta Selatan
                        </h1>
                        <p className="text-xl text-charcoal/70 mb-12 leading-relaxed font-light max-w-2xl">
                            Bintaro Business Centre bukan sekadar penyedia ruang kantor. Sejak 2007, kami telah menjadi fondasi operasional bagi lebih dari 1.800 perusahaan yang membutuhkan alamat bisnis sah, ruang kerja profesional, dan dukungan legalitas di Jakarta Selatan.
                        </p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-primary/10">
                        <div className="bg-white p-8 border border-primary/5 shadow-sm">
                            <strong className="block text-4xl lg:text-5xl font-bold text-primary mb-2">2007</strong>
                            <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Tahun Berdiri</span>
                        </div>
                        <div className="bg-white p-8 border border-primary/5 shadow-sm">
                            <strong className="block text-4xl lg:text-5xl font-bold text-primary mb-2">18+</strong>
                            <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Tahun Beroperasi</span>
                        </div>
                        <div className="bg-white p-8 border border-primary/5 shadow-sm">
                            <strong className="block text-4xl lg:text-5xl font-bold text-primary mb-2">1.800+</strong>
                            <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Perusahaan Dilayani</span>
                        </div>
                        <div className="bg-white p-8 border border-primary/5 shadow-sm">
                            <strong className="block text-4xl lg:text-5xl font-bold text-primary mb-2">72</strong>
                            <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Unit Ruangan</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* NARRATIVE SECTION */}
            <section className="py-24 lg:py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-5">
                            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8 font-heading">Perjalanan 18 Tahun yang Dibangun di Atas Kepercayaan</h2>
                            <div className="space-y-6 text-charcoal/80 text-lg leading-relaxed font-light">
                                <p>
                                    BBC didirikan pada 2007 di bawah <span className="font-semibold text-primary">PT. Ganesha Dwipaya Bhakti</span>, dengan satu misi yang tetap konsisten hingga hari ini: menyediakan infrastruktur bisnis yang benar, lengkap, dan terpercaya bagi perusahaan yang ingin beroperasi di Jakarta Selatan.
                                </p>
                                <p>
                                    Selama hampir dua dekade, kami menyaksikan berbagai transformasi ekosistem bisnis Indonesia—dari era ekspansi korporat, gelombang startup digital, hingga pergeseran menuju model kerja hybrid. Di setiap fase itu, BBC tetap relevan karena satu alasan: kami tidak menjual ruang. Kami menyediakan sistem yang memungkinkan bisnis berjalan.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="p-8 bg-bg-paper border-l-4 border-accent">
                                    <h4 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">Gedung Fisik Mandiri</h4>
                                    <p className="text-charcoal/60 text-sm font-light">
                                        Berdiri di atas lahan 1.600 m², empat lantai, dengan 72 unit ruangan yang telah menjadi rumah bagi konsultan pajak, firma hukum, hingga yayasan sosial.
                                    </p>
                                </div>
                                <div className="p-8 bg-bg-paper border-l-4 border-accent">
                                    <h4 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">Lokasi Administratif Sah</h4>
                                    <p className="text-charcoal/60 text-sm font-light">
                                        Berada di Kelurahan Bintaro, Kecamatan Pesanggrahan—Jakarta Selatan murni. Bukan perbatasan yang ambigu.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-12 relative aspect-video overflow-hidden shadow-2xl skew-x-3">
                                <Image
                                    src="/images/lobby/bbc-lobby-front-01.jpg.JPG"
                                    alt="Bintaro Business Centre Interior"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-primary/20"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* JAKARTA SELATAN FOCUS */}
            <section className="py-24 lg:py-32 bg-primary text-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-10 font-heading text-white">Mengapa Jakarta Selatan Bukan Sekadar Alamat</h2>
                    <div className="grid md:grid-cols-2 gap-16 text-white/80 text-lg font-light leading-relaxed">
                        <div className="space-y-6">
                            <p>
                                Jakarta Selatan adalah wilayah administratif dengan implikasi nyata bagi bisnis Anda. Untuk keperluan PKP (Pengusaha Kena Pajak), NIB, dan registrasi perusahaan, yurisdiksi administrasi lebih menentukan daripada sekadar jarak fisik.
                            </p>
                            <p>
                                BBC berlokasi di Jakarta Selatan—bukan di Tangerang Selatan. Ini bukan detail teknis kecil. Bagi perusahaan yang memerlukan alamat domisili sah untuk kepatuhan pajak, perbedaan ini bisa menentukan apakah pengajuan PKP Anda disetujui atau dikembalikan.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <p>
                                Klien kami yang bergerak di bidang jasa memanfaatkan alamat Jakarta Selatan kami untuk registrasi PKP melalui <Link href="/virtual-office" className="text-accent font-bold hover:underline">layanan virtual office</Link>.
                            </p>
                            <p>
                                Klien kami yang bergerak di bidang perdagangan mendapatkan kontrak sewa kantor fisik yang memenuhi syarat minimum satu tahun sesuai ketentuan Ditjen Pajak melalui <Link href="/sewa-kantor" className="text-accent font-bold hover:underline">layanan sewa kantor</Link> kami.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT DIFFERENTIATES */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">The BBC Difference</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 font-heading">Apa yang Membedakan BBC</h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="group p-10 bg-bg-paper hover:bg-white border border-transparent hover:border-accent transition-all duration-500">
                            <div className="w-16 h-16 bg-accent/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Building2 className="w-8 h-8 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-6 font-heading">Infrastruktur Nyata</h3>
                            <p className="text-charcoal/70 text-sm leading-relaxed font-light">
                                BBC adalah gedung fisik dengan 72 unit ruangan, elevator, parkir 30 kendaraan, resepsionis aktif, dan sistem keamanan operasional. Anda menyewa ruang yang siap ditempati hari itu juga.
                            </p>
                        </div>
                        <div className="group p-10 bg-bg-paper hover:bg-white border border-transparent hover:border-accent transition-all duration-500">
                            <div className="w-16 h-16 bg-accent/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <History className="w-8 h-8 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-6 font-heading">Stabilitas Terbukti</h3>
                            <p className="text-charcoal/70 text-sm leading-relaxed font-light">
                                Tingkat hunian di atas 60% secara konsisten selama bertahun-tahun mencerminkan tingkat retensi klien yang tinggi. Kami tidak menjual janji, tapi stabilitas operasional.
                            </p>
                        </div>
                        <div className="group p-10 bg-bg-paper hover:bg-white border border-transparent hover:border-accent transition-all duration-500">
                            <div className="w-16 h-16 bg-accent/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Users className="w-8 h-8 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-6 font-heading">Ekosistem Terpadu</h3>
                            <p className="text-charcoal/70 text-sm leading-relaxed font-light">
                                Dari penyediaan infrastruktur workspace hingga dukungan administrasi <Link href="/legal/pendirian-pt-jakarta-selatan" className="text-accent hover:underline font-bold">legalitas pendirian perusahaan</Link>, semua tersedia dalam satu ekosistem yang terintegrasi di bawah naungan BBC.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* INDUSTRIES */}
            <section className="py-24 lg:py-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8 font-heading">Industri yang Kami Layani</h2>
                            <p className="text-lg text-charcoal/70 mb-10 font-light leading-relaxed">
                                BBC melayani lintas industri dengan kebutuhan yang beragam. Dari startup yang baru mendirikan PT hingga perusahaan multinasional yang membuka kantor cabang di Jakarta Selatan—ekosistem kami dirancang untuk mengakomodasi keduanya.
                            </p>
                            <ul className="grid grid-cols-2 gap-4">
                                {['Konsultansi Bisnis & Pajak', 'Distribusi & Perdagangan', 'Teknologi & IT', 'Tour & Travel', 'Yayasan & NGO', 'Firma Hukum'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-primary uppercase tracking-wider">
                                        <div className="w-2 h-2 bg-accent rounded-full"></div> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2 bg-primary p-12 text-white">
                            <h4 className="text-lg font-bold mb-6 italic border-b border-white/10 pb-6 text-accent">Diperkuat Legalitas, Dijalankan Profesional</h4>
                            <p className="text-white/70 text-base font-light leading-relaxed mb-8">
                                BBC beroperasi di bawah PT. Ganesha Dwipaya Bhakti. Seluruh kontrak sewa berlandaskan perjanjian hukum yang jelas, dengan hak dan kewajiban yang tertuang secara eksplisit.
                            </p>
                            <Link href="/legalitas-dan-perizinan-bbc" className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest hover:text-accent transition-colors">
                                Verifikasi Legalitas Kami <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 lg:py-32 bg-white text-center">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-primary p-16 shadow-3xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 translate-x-16 -translate-y-16 rotate-45"></div>
                        <div className="relative z-10">
                            <p className="text-lg font-light leading-relaxed text-white mb-10">
                                BBC telah menjadi mitra infrastruktur bagi lebih dari 1.800 perusahaan selama 18 tahun. Jika bisnis Anda membutuhkan alamat Jakarta Selatan yang sah, ruang kerja yang siap pakai, atau dukungan legalitas yang sistematis—mulai dari sini.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <Button className="bg-accent hover:bg-accent/90 text-white font-bold rounded-none px-12 py-8 h-auto uppercase tracking-widest text-[10px]" asChild>
                                    <Link href="/sewa-kantor">Lihat Layanan Sewa Kantor</Link>
                                </Button>
                                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-bold rounded-none px-12 py-8 h-auto uppercase tracking-widest text-[10px]" asChild>
                                    <Link href="/virtual-office">Info Virtual Office</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 flex justify-center gap-10 text-[9px] font-bold text-charcoal/30 uppercase tracking-[0.2em]">
                        <Link href="/lokasi-kantor" className="hover:text-primary transition-colors">Lokasi & Akses</Link>
                        <Link href="/fasilitas-kantor" className="hover:text-primary transition-colors">Fasilitas Gedung</Link>
                        <Link href="/klien-dan-testimoni" className="hover:text-primary transition-colors">Klien & Testimoni</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
