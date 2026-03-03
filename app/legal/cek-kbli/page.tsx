import { Metadata } from 'next'
import Link from 'next/link'
import { FileSearch, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'Cek KBLI Usaha Jakarta Selatan | Panduan Klasifikasi Bisnis | BBC',
    description: 'Panduan cek KBLI untuk pendirian PT dan CV di Jakarta Selatan. Pastikan klasifikasi usaha Anda benar untuk kelancaran izin NIB dan pengajuan PKP.',
    alternates: { canonical: 'https://bintarobusinesscentre.com/legal/cek-kbli' },
}

export default function CekKBLIPage() {
    return (
        <main className="bg-white text-charcoal font-sans">
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.3em] mb-6">Business Classification</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-primary leading-[1.1] mb-8 font-heading">
                            Cek KBLI Usaha: Pilih Klasifikasi yang Tepat untuk Legalitas Anda
                        </h1>
                        <p className="text-xl text-charcoal/70 mb-12 leading-relaxed font-light">
                            KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) bukan sekadar kode. Ini menentukan eligibilitas PKP, jenis kantor yang wajib Anda sewa, dan kewajiban pajak ke depan.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24 lg:py-32">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold text-primary mb-8 font-heading">Kenapa KBLI Penting?</h2>
                    <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-8 border border-primary/5 bg-bg-paper">
                                <h3 className="font-bold text-primary mb-4">Penentuan Izin NIB</h3>
                                <p className="text-sm text-charcoal/60 leading-relaxed font-light">Kode KBLI menentukan level risiko usaha Anda (Rendah, Menengah Rendah, Menengah Tinggi, atau Tinggi) dalam sistem OSS RBA.</p>
                            </div>
                            <div className="p-8 border border-primary/5 bg-bg-paper">
                                <h3 className="font-bold text-primary mb-4">Eligibilitas PKP</h3>
                                <p className="text-sm text-charcoal/60 leading-relaxed font-light">KBLI Jasa memiliki fleksibilitas lebih dalam pengajuan PKP dibanding KBLI Perdagangan/Distribusi.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 p-12 bg-primary text-white text-center">
                        <h3 className="text-2xl font-bold mb-6 font-heading">Bingung Menentukan KBLI?</h3>
                        <p className="mb-10 text-white/70 font-light">Tim legal BBC membantu verifikasi akurasi KBLI sebelum Akta Notaris dibuat untuk menghindari revisi di kemudian hari.</p>
                        <Button className="bg-accent hover:bg-white hover:text-primary text-white font-bold rounded-none px-10 h-14 uppercase tracking-widest text-[10px]" asChild>
                            <Link href="/legal/pendirian-pt-jakarta-selatan">Konsultasi KBLI Profesional</Link>
                        </Button>
                    </div>
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
