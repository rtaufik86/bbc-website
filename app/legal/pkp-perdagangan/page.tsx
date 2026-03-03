import { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, AlertTriangle, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'Panduan PKP KBLI Selain Jasa (Perdagangan) | Jakarta Selatan | BBC',
    description: 'Panduan lengkap pengajuan PKP untuk KBLI selain jasa (trading, distributor, transportasi). Persyaratan sewa kantor fisik minimal 1 tahun di Jakarta Selatan.',
    alternates: { canonical: 'https://bintarobusinesscentre.com/legal/pkp-perdagangan' },
}

export default function PKPPerdaganganPage() {
    return (
        <main className="bg-white text-charcoal font-sans text-charcoal">
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.3em] mb-6">PKP Compliance</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-primary leading-[1.1] mb-8 font-heading">
                            Panduan PKP untuk KBLI Selain Jasa: Pahami Sebelum Melangkah
                        </h1>
                        <p className="text-xl text-charcoal/70 mb-12 leading-relaxed font-light">
                            Mengajukan PKP (Pengusaha Kena Pajak) untuk perusahaan perdagangan, distributor, atau event organizer memerlukan persiapan domisili yang lebih ketat dibandingkan perusahaan jasa.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-red-50 p-8 border-l-4 border-red-500 mb-16">
                        <div className="flex items-center gap-4 mb-4">
                            <AlertTriangle className="text-red-500 w-8 h-8" />
                            <h2 className="text-2xl font-bold text-primary font-heading">Aturan Ketat PKP Non-Jasa</h2>
                        </div>
                        <p className="text-charcoal/70 leading-relaxed font-light">
                            Berdasarkan regulasi perpajakan di Jakarta Selatan, perusahaan dengan KBLI Selain Jasa wajib memiliki <strong>sewa kantor fisik (Service Office) minimal 12 bulan</strong> untuk dapat disetujui status PKP-nya. Penggunaan Virtual Office murni umumnya akan ditolak dalam proses verifikasi lapangan.
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold text-primary mb-10 font-heading">Solusi Infrastruktur dari BBC</h2>
                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <div className="p-8 border border-primary/5 bg-bg-paper">
                            <h3 className="font-bold text-primary mb-4">Service Office Jakarta Selatan</h3>
                            <p className="text-sm text-charcoal/60 leading-relaxed font-light mb-6">Ruang kantor private yang terverifikasi secara fisik oleh petugas pajak. Kontrak fleksibel mulai 1 tahun.</p>
                            <Link href="/sewa-kantor" className="text-accent text-xs font-bold uppercase tracking-widest hover:underline">Lihat Sewa Kantor &rarr;</Link>
                        </div>
                        <div className="p-8 border border-primary/5 bg-bg-paper">
                            <h3 className="font-bold text-primary mb-4">Support Verifikasi</h3>
                            <p className="text-sm text-charcoal/60 leading-relaxed font-light mb-6">Tim resepsionis dan operasional BBC membantu menyambut petugas pajak saat survei lokasi PKP.</p>
                            <Link href="/sewa-kantor" className="text-accent text-xs font-bold uppercase tracking-widest hover:underline">Pelajari Layanan &rarr;</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 lg:py-32 bg-primary text-white">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 font-heading text-white">Siap Mengajukan PKP?</h2>
                    <p className="text-white/60 text-lg mb-12 font-light">Jangan spekulasi dengan legalitas perusahaan Anda. Konsultasikan KBLI dan kebutuhan PKP Anda dengan ahli legalitas BBC.</p>
                    <Button className="bg-accent hover:bg-white hover:text-primary text-white font-bold rounded-none px-12 py-8 h-auto uppercase tracking-widest text-[10px]" asChild>
                        <Link href="/legal/pendirian-pt-jakarta-selatan">Konsultasi Legalitas & PKP</Link>
                    </Button>
                </div>
            </section>

            <footer className="py-12 bg-white border-t border-primary/5">
                <div className="container mx-auto px-6 text-center">
                    <Link href="/legal/pendirian-pt-jakarta-selatan" className="text-accent font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                        Kembali ke Layanan Pendirian PT <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </footer>
        </main>
    )
}
