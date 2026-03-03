import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-[#0A1628] text-white pt-20 pb-10 border-t border-slate-800">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
                    {/* Column 1: Brand & Desc */}
                    <div className="flex flex-col items-start">
                        <Link href="/" className="mb-6 inline-block">
                            <img src="/images/logo.png" alt="Logo Bintaro Business Centre - Business centre Jakarta Selatan sejak 2007" className="h-16 w-auto brightness-0 invert opacity-100" />
                        </Link>
                        <h5 className="font-bold text-white text-lg mb-4">Bintaro Business Centre</h5>
                        <p className="text-[#D1D5DB] text-sm mb-6 leading-relaxed">
                            Business centre di Jakarta Selatan sejak 2007. Solusi kantor profesional, virtual office, dan perizinan usaha.
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

                    {/* Column 2: Layanan */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Layanan Kami</h4>
                        <ul className="space-y-4 text-sm text-[#D1D5DB]">
                            <li><Link href="/sewa-kantor" className="hover:text-white transition-colors py-1 block">Sewa Kantor Jakarta Selatan</Link></li>
                            <li><Link href="/virtual-office" className="hover:text-white transition-colors py-1 block">Virtual Office Jakarta Selatan</Link></li>
                            <li><Link href="/legal/pendirian-pt-jakarta-selatan" className="hover:text-white transition-colors py-1 block">Pendirian PT Jakarta Selatan</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Hubungi Kami */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Hubungi Kami</h4>
                        <ul className="space-y-4 text-sm text-[#D1D5DB]">
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-bbc-gold-500" />
                                <a href="tel:+62217362639" className="hover:text-white transition-colors font-medium">(021) 7362639</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 text-[#25D366] fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                <a href="https://wa.me/6281311778036" className="hover:text-white transition-colors font-medium">+62 813-1177-8036</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-bbc-gold-500" />
                                <a href="mailto:info@bintarobusinesscentre.com" className="hover:text-white transition-colors">info@bintarobusinesscentre.com</a>
                            </li>
                        </ul>

                        <div className="mt-8">
                            <h5 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-bbc-gold-500" /> Jam Operasional:
                            </h5>
                            <ul className="space-y-2 text-sm text-[#D1D5DB]">
                                <li>Senin – Jumat: 09.00 – 17.00</li>
                                <li>Sabtu – Minggu: 09.00 – 15.00</li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 4: Informasi */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Informasi</h4>
                        <ul className="space-y-4 text-sm text-[#D1D5DB]">
                            <li><Link href="/tentang-kami" className="hover:text-white transition-colors py-1 block">Tentang Kami</Link></li>
                            <li><Link href="/lokasi-kantor" className="hover:text-white transition-colors py-1 block">Lokasi Kantor</Link></li>
                            <li><Link href="/fasilitas-kantor" className="hover:text-white transition-colors py-1 block">Fasilitas Gedung</Link></li>
                            <li><Link href="/legalitas-dan-perizinan-bbc" className="hover:text-white transition-colors py-1 block">Legalitas & Perizinan</Link></li>
                            <li><Link href="/klien-dan-testimoni" className="hover:text-white transition-colors py-1 block">Klien & Testimoni</Link></li>
                            <li><Link href="/kontak" className="hover:text-white transition-colors py-1 block">Kontak</Link></li>
                        </ul>
                        <div className="mt-8 pt-4 border-t border-slate-800">
                            <p className="text-[#D1D5DB] text-sm"><strong className="text-white">Akses Ruangan:</strong><br />Hingga 20.00 untuk penyewa kantor</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Bintaro Business Centre. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                        <span>|</span>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <span>|</span>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
