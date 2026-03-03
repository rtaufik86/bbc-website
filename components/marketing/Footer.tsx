import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="space-y-4">
                    <div className="relative w-48 h-12">
                        <Image
                            src="/images/logo.png"
                            alt="BBC Bintaro"
                            fill
                            className="object-contain object-left brightness-0 invert"
                        />
                    </div>
                    <p className="text-sm leading-relaxed">
                        Pusat bisnis premium di Bintaro dengan layanan Virtual Office, Serviced Office, dan Legalitas Perusahaan terlengkap.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-white transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <Facebook size={20} />
                        </a>
                    </div>
                </div>

                {/* Products */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Layanan Kami</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/virtual-office" className="hover:text-white">Virtual Office</Link></li>
                        <li><Link href="/serviced-office" className="hover:text-white">Serviced Office</Link></li>
                        <li><Link href="/meeting-room" className="hover:text-white">Meeting Room</Link></li>
                        <li><Link href="/legal" className="hover:text-white">Jasa Legalitas</Link></li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Tautan Cepat</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:text-white">Tentang Kami</Link></li>
                        <li><Link href="/contact" className="hover:text-white">Hubungi Kami</Link></li>
                        <li><Link href="/privacy" className="hover:text-white">Kebijakan Privasi</Link></li>
                        <li><Link href="/terms" className="hover:text-white">Syarat & Ketentuan</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Hubungi Kami</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start space-x-3">
                            <MapPin size={18} className="shrink-0 mt-0.5" />
                            <span>Jl. Bintaro Utama 3A, Pondok Karya, Pondok Aren, Tangerang Selatan 15220</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Phone size={18} />
                            <span>+62-21-1234-5678</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Mail size={18} />
                            <span>info@bbcbintaro.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                &copy; {new Date().getFullYear()} Bintaro Business Center. All rights reserved.
            </div>
        </footer>
    )
}
