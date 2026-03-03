import { Metadata } from 'next'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Hubungi Bintaro Business Centre | Layanan Kantor & Legalitas Jakarta Selatan',
    description: 'Hubungi tim Bintaro Business Centre untuk konsultasi sewa kantor, virtual office, dan pendirian PT/CV di Jakarta Selatan. Respon cepat via WhatsApp.',
    alternates: { canonical: 'https://www.bintarobusinesscentre.com/kontak' },
    openGraph: { images: ['/images/hero-kontak.jpg'] }
}

export default function KontakPage() {
    return (
        <div className="py-16 md:py-24 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900 font-heading">Hubungi Kami</h1>

                <div className="mb-12">
                    <Image
                        src="/images/hero-kontak.jpg"
                        alt="Kontak Bintaro Business Centre"
                        width={1200}
                        height={630}
                        className="w-full h-auto shadow-sm grayscale hover:grayscale-0 transition-all duration-700"
                        priority
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-slate-900 font-heading">Kami Siap Membantu Bisnis Anda</h2>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed font-light">
                            Tim kami siap memberikan solusi terbaik untuk kebutuhan kantor dan legalitas usaha Anda.
                            Dapatkan respon cepat melalui WhatsApp atau telepon.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-bbc-blue-500/10 p-3 text-bbc-blue-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div className="text-slate-700 leading-relaxed">
                                    <strong className="text-primary block mb-1">Alamat Kantor:</strong>
                                    Jl. RC. Veteran Raya No.1i, RT.1/RW.3, Bintaro<br />
                                    Pesanggrahan, Jakarta Selatan 12330
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-bbc-blue-500/10 p-3 text-bbc-blue-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div className="text-slate-700 leading-relaxed">
                                    <strong className="text-primary block mb-1">Telepon & WhatsApp:</strong>
                                    <a href="tel:+62217362639" className="hover:text-bbc-blue-600 block">(021) 7362639 (Hunting)</a>
                                    <div className="flex items-center gap-2 mt-2">
                                        <MessageCircle className="w-4 h-4 text-green-600" />
                                        <a href="https://wa.me/6281311778036" className="hover:text-bbc-blue-600 text-green-600 font-bold">0813-1177-8036 (WhatsApp)</a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-bbc-blue-500/10 p-3 text-bbc-blue-600">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="text-slate-700 leading-relaxed">
                                    <strong className="text-primary block mb-1">Email:</strong>
                                    <a href="mailto:info@bintarobusinesscentre.com" className="hover:text-bbc-blue-600 font-medium">info@bintarobusinesscentre.com</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-10 shadow-2xl border border-primary/5 flex flex-col justify-center items-center text-center">
                        <MessageCircle className="w-16 h-16 text-green-600 mb-6 opacity-20" />
                        <h3 className="text-2xl font-bold mb-6 text-primary font-heading">Konsultasi via WhatsApp</h3>
                        <p className="text-slate-600 mb-10 leading-relaxed font-light">
                            Dapatkan respon tercepat untuk pertanyaan mengenai sewa kantor, virtual office, atau legalitas bisnis langsung dari tim ahli kami.
                        </p>
                        <Button
                            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-none h-16 uppercase tracking-widest text-xs font-bold shadow-xl shadow-green-600/20"
                            asChild
                        >
                            <a href="https://wa.me/6281311778036?text=Halo%20BBC%2C%20saya%20ingin%20konsultasi%20mengenai%20layanan%20Bintaro%20Business%20Centre">
                                <MessageCircle className="w-5 h-5 mr-2" /> Hubungi Kami via WhatsApp
                            </a>
                        </Button>
                        <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            Senin–Jumat: 09.00–17.00 WIB | Sabtu–Minggu: 09.00–15.00 WIB
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
