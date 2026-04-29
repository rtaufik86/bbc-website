import Link from 'next/link'
import { Phone, Mail, Clock } from 'lucide-react'
import FooterWhatsAppLink from '@/components/cta/FooterWhatsAppLink'

export default function Footer() {
    return (
        <footer className="bg-[#0A1628] text-white pt-20 pb-10 border-t border-slate-800">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                    {/* Column 1: Brand & Address */}
                    <div className="flex flex-col items-start lg:col-span-1">
                        <Link href="/" className="mb-6 inline-block">
                            <img src="/images/logo.png" alt="Logo Bintaro Business Centre" className="h-14 w-auto brightness-0 invert opacity-100" />
                        </Link>
                        <h5 className="font-bold text-white text-base mb-4 font-heading">Bintaro Business Centre</h5>
                        <p className="text-[#94A3B8] text-xs mb-6 leading-relaxed">
                            Business Center terpercaya di Jakarta Selatan sejak 2007. Memberikan solusi ruang kantor & legalitas bagi 1.800+ perusahaan.
                        </p>
                        <a
                            href="https://maps.google.com/?q=Jl.+RC.+Veteran+No.+1-i+Pesanggrahan+Jakarta+Selatan+12330"
                            target="_blank"
                            rel="noopener"
                            className="text-[#94A3B8] text-xs leading-relaxed hover:text-white transition-colors text-left block group"
                        >
                            <span className="font-bold text-slate-400 group-hover:text-bbc-gold-500 transition-colors uppercase tracking-widest text-[10px]">Alamat Resmi:</span><br />
                            Jl. RC. Veteran Raya No.1i, Bintaro<br />
                            Jakarta Selatan 12330, Indonesia
                        </a>
                    </div>

                    {/* Column 2: Layanan Utama */}
                    <div>
                        <h4 className="font-bold text-sm mb-6 text-white uppercase tracking-[0.2em] border-b border-white/10 pb-2">Layanan Utama</h4>
                        <ul className="space-y-4 text-xs text-[#D1D5DB]">
                            <li><Link href="/sewa-kantor" className="hover:text-bbc-gold-400 transition-colors py-1 flex items-center gap-2 group">Sewa Kantor Jakarta Selatan</Link></li>
                            <li><Link href="/virtual-office" className="hover:text-bbc-gold-400 transition-colors py-1 flex items-center gap-2 group">Virtual Office Jakarta Selatan</Link></li>
                            <li><Link href="/legal/pendirian-pt-jakarta-selatan" className="hover:text-bbc-gold-400 transition-colors py-1 flex items-center gap-2 group">Pendirian PT Jakarta Selatan</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Area & Lokasi */}
                    <div>
                        <h4 className="font-bold text-sm mb-6 text-white uppercase tracking-[0.2em] border-b border-white/10 pb-2">Area & Lokasi</h4>
                        <ul className="space-y-4 text-xs text-[#D1D5DB]">
                            <li><Link href="/sewa-kantor/bintaro" className="hover:text-bbc-gold-400 transition-colors py-1 flex items-center gap-2 group">Sewa Kantor Bintaro</Link></li>
                            <li><Link href="/sewa-kantor/jakarta-selatan" className="hover:text-bbc-gold-400 transition-colors py-1 flex items-center gap-2 group">Sewa Kantor Jakarta Selatan</Link></li>
                            <li><Link href="/virtual-office-bintaro" className="hover:text-bbc-gold-400 transition-colors py-1 flex items-center gap-2 group">Virtual Office Bintaro</Link></li>
                            <li><Link href="/virtual-office-jakarta-selatan" className="hover:text-bbc-gold-400 transition-colors py-1 flex items-center gap-2 group">Virtual Office Jakarta Selatan</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Informasi & Legal */}
                    <div>
                        <h4 className="font-bold text-sm mb-6 text-white uppercase tracking-[0.2em] border-b border-white/10 pb-2">Informasi & Legal</h4>
                        <ul className="space-y-4 text-xs text-[#D1D5DB]">
                            <li><Link href="/tentang-kami" className="hover:text-white transition-colors py-1 block italic opacity-80">Tentang Kami</Link></li>
                            <li><Link href="/lokasi-kantor" className="hover:text-white transition-colors py-1 block italic opacity-80">Lokasi Kantor</Link></li>
                            <li><Link href="/fasilitas-kantor" className="hover:text-white transition-colors py-1 block italic opacity-80">Fasilitas Gedung</Link></li>
                            <li><Link href="/legalitas-dan-perizinan-bbc" className="hover:text-white transition-colors py-1 block italic opacity-80">Legalitas & Perizinan</Link></li>
                            <li><Link href="/klien-dan-testimoni" className="hover:text-white transition-colors py-1 block italic opacity-80">Klien & Testimoni</Link></li>
                            <li><Link href="/legal/cek-kbli" className="hover:text-bbc-gold-400 transition-colors py-1 block font-bold">Panduan KBLI & Legalitas</Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Kontak & CTA */}
                    <div className="flex flex-col">
                        <h4 className="font-bold text-sm mb-6 text-white uppercase tracking-[0.2em] border-b border-white/10 pb-2">Hubungi Kami</h4>
                        <ul className="space-y-4 text-xs text-[#D1D5DB] mb-8">
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-bbc-gold-500" />
                                <a href="tel:+62217362639" className="hover:text-white transition-colors font-bold">(021) 7362639</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-bbc-gold-500" />
                                <a href="mailto:info@bintarobusinesscentre.com" className="hover:text-white transition-colors">info@bbc.id</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="w-4 h-4 text-bbc-gold-500 shrink-0 mt-0.5" />
                                <span>Senin – Jumat<br />09.00 – 17.00 WIB</span>
                            </li>
                        </ul>
                        
                        <FooterWhatsAppLink />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                    <p>&copy; {new Date().getFullYear()} Bintaro Business Centre. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
