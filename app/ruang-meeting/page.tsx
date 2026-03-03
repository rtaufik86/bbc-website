import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import {
    Check,
    Users,
    Wifi,
    Coffee,
    Monitor,
    Clock,
    Printer,
    ArrowRight,
    MessageCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'Sewa Ruang Meeting Jakarta Selatan | Bintaro Business Centre',
    description: 'Sewa ruang meeting profesional di Jakarta Selatan mulai dari Rp 50.000/jam. Kapasitas 6-12+ orang, lengkap dengan Wi-Fi, whiteboard, dan free flow coffee/tea.',
    alternates: { canonical: 'https://bintarobusinesscentre.com/ruang-meeting' },
}

export default function RuangMeetingPage() {
    const waUrl = "https://wa.me/6281311778036?text=Halo%20BBC%2C%20saya%20ingin%20reservasi%20ruang%20meeting"

    return (
        <main className="bg-white text-charcoal font-sans">
            {/* HERO SECTION */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <span className="inline-block text-accent font-bold text-xs uppercase tracking-[0.3em] mb-6">Meeting Facilities</span>
                        <h1 className="text-4xl lg:text-7xl font-bold text-primary leading-[1.1] mb-8 font-heading">
                            Sewa Ruang Meeting Jakarta Selatan: Profesional & Terjangkau
                        </h1>
                        <p className="text-xl text-charcoal/70 mb-12 leading-relaxed font-light">
                            Ruang pertemuan yang dirancang untuk mendukung produktivitas. Dari presentasi klien hingga diskusi internal, lingkungan profesional kami memberikan kesan yang tepat untuk bisnis Anda.
                        </p>
                    </div>
                </div>
            </section>

            {/* PRICING & CAPACITY */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Ruang Kecil */}
                        <div className="bg-bg-paper p-12 border-t-4 border-accent shadow-sm hover:shadow-2xl transition-all h-full flex flex-col">
                            <h3 className="text-2xl font-bold text-primary mb-2 font-heading">Ruang Medium</h3>
                            <p className="text-charcoal/40 text-sm uppercase tracking-widest font-bold mb-6">Hingga 6 Orang</p>
                            <div className="mb-10">
                                <span className="text-4xl font-bold text-primary">Rp 50.000</span>
                                <span className="text-charcoal/50 text-sm italic font-light"> / jam</span>
                            </div>
                            <ul className="space-y-4 mb-12 flex-1">
                                {['Whiteboard & Spidol', 'High Speed Wi-Fi', 'Free Flow Coffee/Tea', 'Resepsionis Profesional'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-charcoal/70 text-sm font-light">
                                        <Check className="w-4 h-4 text-accent" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full bg-primary hover:bg-accent text-white rounded-none h-14 uppercase tracking-widest text-[10px] font-bold" asChild>
                                <a href={waUrl} target="_blank" rel="noopener noreferrer">Reservasi Ruang Meeting</a>
                            </Button>
                        </div>

                        {/* Ruang Besar */}
                        <div className="bg-primary p-12 shadow-2xl h-full flex flex-col text-white">
                            <h3 className="text-2xl font-bold text-accent mb-2 font-heading">Boardroom</h3>
                            <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-6">12+ Orang</p>
                            <div className="mb-10">
                                <span className="text-4xl font-bold text-white">Rp 100.000</span>
                                <span className="text-white/50 text-sm italic font-light"> / jam</span>
                            </div>
                            <ul className="space-y-4 mb-12 flex-1">
                                {['Whiteboard & Projector (by request)', 'High Speed Wi-Fi', 'Free Flow Coffee/Tea', 'Mail/Package Handling Support'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white/70 text-sm font-light">
                                        <Check className="w-4 h-4 text-accent" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full bg-accent hover:bg-white hover:text-primary text-white font-bold rounded-none h-14 uppercase tracking-widest text-[10px]" asChild>
                                <a href={waUrl} target="_blank" rel="noopener noreferrer">Reservasi Boardroom</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* VISUALS SECTION */}
            <section className="py-24 lg:py-32 bg-bg-paper">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative aspect-video shadow-3xl overflow-hidden border border-primary/5">
                            <Image
                                src="/images/meeting-room/boardroom/bbc-meeting-room-boardroom-wide-01.jpg.JPG"
                                alt="BBC Boardroom Meeting Room"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-bold text-primary font-heading leading-tight">Mendukung Presentasi dan Kolaborasi</h2>
                            <p className="text-lg text-charcoal/70 font-light leading-relaxed">
                                Seluruh ruang meeting kami dirancang dengan privasi tinggi dan kenyamanan maksimal. Pencahayaan yang cukup dan tata letak furnitur yang ergonomis memastikan pertemuan Anda berjalan lancar tanpa gangguan luar.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <Monitor className="w-8 h-8 text-accent mb-4" />
                                    <h5 className="font-bold text-primary text-sm uppercase tracking-widest mb-2">Technical Ready</h5>
                                    <p className="text-charcoal/50 text-xs font-light">Dukungan teknis untuk perangkat presentasi Anda.</p>
                                </div>
                                <div>
                                    <Clock className="w-8 h-8 text-accent mb-4" />
                                    <h5 className="font-bold text-primary text-sm uppercase tracking-widest mb-2">Flexible Hours</h5>
                                    <p className="text-charcoal/50 text-xs font-light">Tersedia untuk reservasi mendadak atau terjadwal.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TENANT BENEFITS */}
            <section className="py-24 lg:py-32 bg-white border-t border-primary/5">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-10 font-heading">Keuntungan Khusus Tenant</h2>
                    <p className="text-xl text-charcoal/60 font-light leading-relaxed mb-12">
                        Penyewa <Link href="/sewa-kantor" className="text-accent font-bold hover:underline">Sewa Kantor</Link> dan <Link href="/virtual-office" className="text-accent font-bold hover:underline">Virtual Office Paket CP/FCP</Link> secara otomatis mendapatkan kuota penggunaan ruang meeting setiap bulannya tanpa biaya tambahan.
                    </p>
                    <div className="p-8 bg-primary/5 border border-primary/10 inline-block">
                        <p className="text-primary font-bold uppercase tracking-widest text-xs italic">
                            "Efisiensi ganda bagi perusahaan Anda: Alamat Prestigius + Akses Ruang Pertemuan."
                        </p>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 lg:py-32 bg-primary text-white text-center">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 font-heading text-white">Butuh Ruang Pertemuan Hari Ini?</h2>
                    <p className="text-white/60 text-lg mb-12 font-light italic">Hubungi tim kami untuk cek ketersediaan ruang meeting secara real-time.</p>
                    <Button className="bg-accent hover:bg-accent/90 text-white font-bold rounded-none px-12 py-8 h-auto uppercase tracking-widest text-[10px]" asChild>
                        <a href={waUrl} target="_blank" rel="noopener noreferrer">Reservasi via WhatsApp</a>
                    </Button>
                </div>
            </section>

            <footer className="py-12 bg-white border-t border-primary/5">
                <div className="container mx-auto px-6 flex justify-center gap-10 text-[9px] font-bold text-charcoal/30 uppercase tracking-[0.2em]">
                    <Link href="/fasilitas-kantor" className="hover:text-primary transition-colors">Fasilitas Lainnya</Link>
                    <Link href="/sewa-kantor" className="hover:text-primary transition-colors">Paket Sewa Kantor</Link>
                    <Link href="/virtual-office" className="hover:text-primary transition-colors">Virtual Office</Link>
                    <Link href="/kontak" className="hover:text-primary transition-colors">Hubungi Kami</Link>
                </div>
            </footer>
        </main>
    )
}
