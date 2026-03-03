import { MapPin, Phone, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LocationMap() {
    return (
        <section className="py-16 md:py-24 bg-white" id="lokasi">
            <div className="container mx-auto px-4 max-w-7xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Lokasi Strategis di Jakarta Selatan</h2>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <div className="h-[400px] md:h-auto rounded-xl overflow-hidden shadow-lg border border-slate-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.034503798544!2d106.76211603955078!3d-6.2625778999999865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1025a1b3b21%3A0x6b4a6d0c6d9d0e0!2sBintaro%20Business%20Center!5e0!3m2!1sen!2sid!4v1707567890123!5m2!1sen!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><MapPin className="text-bbc-gold-500" /> Alamat Lengkap</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Jl. RC. Veteran Raya No.1i, RT.1/RW.3, Bintaro, Pesanggrahan, Jakarta Selatan 12330
                            </p>
                            <p className="text-slate-500 text-sm mt-2 font-medium">Dekat Gerbang Tol Veteran & Tanah Kusir</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Clock className="text-bbc-gold-500" /> Jam Operasional</h3>
                            <ul className="space-y-2 text-slate-600">
                                <li className="flex justify-between max-w-xs border-b border-slate-100 pb-2">
                                    <span>Senin - Jumat</span>
                                    <span className="font-semibold">09:00 - 17:00</span>
                                </li>
                                <li className="flex justify-between max-w-xs border-b border-slate-100 pb-2">
                                    <span>Sabtu - Minggu</span>
                                    <span className="font-semibold">09:00 - 15:00</span>
                                </li>
                            </ul>
                        </div>
                        <div className="pt-4">
                            <Button className="bg-bbc-blue-500 hover:bg-bbc-blue-600 w-full md:w-auto h-12 text-lg px-8" asChild>
                                <a href="https://www.google.com/maps/place/Bintaro+Business+Centre/@-6.2721988,106.7622405,17z" target="_blank">Buka di Google Maps</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
