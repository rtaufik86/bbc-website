import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-[#0A1628] text-white pt-20 pb-10 border-t border-slate-800">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
                    {/* Column 1: Brand & Address */}
                    <div className="flex flex-col items-start">
                        <Link href="/" className="mb-6 inline-block">
                            <img src="/images/logo.png" alt="Logo Bintaro Business Centre - Business centre Jakarta Selatan sejak 2007" className="h-16 w-auto brightness-0 invert opacity-100" />
                        </Link>
                        <h5 className="font-bold text-white text-lg mb-4">Bintaro Business Centre</h5>
                        <p className="text-[#D1D5DB] text-sm mb-6 leading-relaxed">
                            Penyedia ruang kantor siap pakai, virtual office, dan layanan legalitas terpercaya di Jakarta Selatan sejak 2007.
                        </p>
                        <a
                            href="https://maps.google.com/?q=Jl.+RC.+Veteran+No.+1-i+Pesanggrahan+Jakarta+Selatan+12330"
                            target="_blank"
                            rel="noopener"
                            className="text-[#D1D5DB] text-sm mb-6 leading-relaxed hover:text-white transition-colors text-left block group"
                        >
                            <span className="font-semibold text-white group-hover:text-bbc-gold-500 transition-colors">Alamat Kantor:</span><br />
                            Jl. RC. Veteran Raya No.1i, RT.1/RW.3, Bintaro<br />
                            Pesanggrahan, Jakarta Selatan 12330<br />
                            DKI Jakarta, Indonesia
                        </a>
                    </div>

                    {/* Column 2: Layanan Utama (Money Pages) */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white border-b border-white/10 pb-2">Layanan Utama</h4>
                        <ul className="space-y-4 text-sm text-[#D1D5DB]">
                            <li><Link href="/sewa-kantor" className="hover:text-white transition-colors py-1 flex items-center gap-2 group"><ArrowRight className="w-3 h-3 text-bbc-gold-500 opacity-0 group-hover:opacity-100 transition-all" /> Sewa Kantor</Link></li>
                            <li><Link href="/virtual-office" className="hover:text-white transition-colors py-1 flex items-center gap-2 group"><ArrowRight className="w-3 h-3 text-bbc-gold-500 opacity-0 group-hover:opacity-100 transition-all" /> Virtual Office</Link></li>
                            <li><Link href="/legal" className="hover:text-white transition-colors py-1 flex items-center gap-2 group"><ArrowRight className="w-3 h-3 text-bbc-gold-500 opacity-0 group-hover:opacity-100 transition-all" /> Layanan Legal & Perizinan</Link></li>
                            <li><Link href="/legal/pendirian-pt-jakarta-selatan" className="hover:text-white transition-colors py-1 flex items-center gap-2 group"><ArrowRight className="w-3 h-3 text-bbc-gold-500 opacity-0 group-hover:opacity-100 transition-all" /> Pendirian PT Jakarta Selatan</Link></li>
                            <li><Link href="/ruang-meeting" className="hover:text-white transition-colors py-1 flex items-center gap-2 group"><ArrowRight className="w-3 h-3 text-bbc-gold-500 opacity-0 group-hover:opacity-100 transition-all" /> Meeting Room Jakarta Selatan</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Silo Bintaro (Weapon Pages) */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white border-b border-white/10 pb-2">Area & Lokasi</h4>
                        <ul className="space-y-4 text-sm text-[#D1D5DB]">
                            <li><Link href="/sewa-kantor/jakarta-selatan" className="hover:text-white transition-colors py-1 flex items-center gap-2 group"><ArrowRight className="w-3 h-3 text-bbc-gold-500 opacity-0 group-hover:opacity-100 transition-all" /> Sewa Kantor Jakarta Selatan</Link></li>
                            <li><Link href="/virtual-office-jakarta-selatan" className="hover:text-white transition-colors py-1 flex items-center gap-2 group"><ArrowRight className="w-3 h-3 text-bbc-gold-500 opacity-0 group-hover:opacity-100 transition-all" /> Virtual Office Jakarta Selatan</Link></li>
                            <li><Link href="/sewa-kantor/bintaro" className="hover:text-white transition-colors py-1 flex items-center gap-2 group"><ArrowRight className="w-3 h-3 text-bbc-gold-500 opacity-0 group-hover:opacity-100 transition-all" /> Sewa Kantor Bintaro</Link></li>
                            <li><Link href="/virtual-office-bintaro" className="hover:text-white transition-colors py-1 flex items-center gap-2 group"><ArrowRight className="w-3 h-3 text-bbc-gold-500 opacity-0 group-hover:opacity-100 transition-all" /> Virtual Office Bintaro</Link></li>
                            <li><Link href="/harga-sewa-kantor-bintaro" className="hover:text-white transition-colors py-1 flex items-center gap-2 group"><ArrowRight className="w-3 h-3 text-bbc-gold-500 opacity-0 group-hover:opacity-100 transition-all" /> Harga Sewa Kantor Bintaro</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Hubungi & Info */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white border-b border-white/10 pb-2">Info & Kontak</h4>
                        <ul className="space-y-4 text-sm text-[#D1D5DB]">
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-bbc-gold-500" />
                                <a href="tel:+62217362639" className="hover:text-white transition-colors font-medium">(021) 7362639</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-bbc-gold-500" />
                                <a href="mailto:info@bintarobusinesscentre.com" className="hover:text-white transition-colors">info@bbc.id</a>
                            </li>
                            <li><Link href="/tentang-kami" className="hover:text-white transition-colors py-1 block">Tentang BBC</Link></li>
                            <li><Link href="/fasilitas-kantor" className="hover:text-white transition-colors py-1 block">Fasilitas & Gedung</Link></li>
                            <li><Link href="/klien-dan-testimoni" className="hover:text-white transition-colors py-1 block">Klien & Testimoni</Link></li>
                            <li><Link href="/kontak" className="hover:text-white transition-colors py-1 block">Hubungi Kami</Link></li>
                        </ul>
                        <div className="mt-6">
                            <h5 className="font-bold text-white text-xs mb-2 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-bbc-gold-500" /> Operasional Admin:
                            </h5>
                            <p className="text-xs text-[#D1D5DB]">Senin – Jumat (09.00 – 17.00)</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                    <p>&copy; {new Date().getFullYear()} Bintaro Business Centre. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
