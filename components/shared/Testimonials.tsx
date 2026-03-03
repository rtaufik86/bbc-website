import { Quote, Star } from 'lucide-react'

const testimonials = [
    {
        name: 'Andi Wijaya',
        company: 'TECHFLOW SOLUTION',
        title: 'CEO',
        quote: 'BBC telah menjadi rumah bagi startup kami selama 3 tahun. Fasilitasnya sangat terawat dan tim manajemennya sangat responsif terhadap kebutuhan kami.',
        initials: 'AW'
    },
    {
        name: 'Sarah Devina',
        company: 'CREATIVE MINDS',
        title: 'FOUNDER',
        quote: 'Layanan Virtual Office-nya sangat membantu bisnis konsultan saya memiliki image yang profesional tanpa harus menyewa kantor fisik setiap hari.',
        initials: 'SD'
    },
    {
        name: 'Michael Tan',
        title: 'HR DIRECTOR',
        company: 'GLOBAL INVEST',
        quote: 'Meeting room-nya lengkap dengan teknologi terbaru. Sangat cocok untuk sesi training kami bersama klien-klien korporat.',
        initials: 'MT'
    }
]

export default function Testimonials() {
    return (
        <section className="py-24 lg:py-32 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-bbc-navy-900 mb-6 font-heading">03 — Apa Kata Klien Kami</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Testimoni asli dari penyewa kantor dan pengguna virtual office di Bintaro Business Centre.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, i) => (
                        <div key={i} className="bg-white p-8 md:p-10 rounded-2xl border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group">
                            {/* Large Background Quote */}
                            <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-100 group-hover:text-bbc-gold-500/20 transition-colors" />

                            <div className="relative z-10 h-full flex flex-col">
                                <p className="text-[#374151] text-lg font-medium italic leading-[1.7] mb-8 flex-grow">
                                    "{item.quote}"
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-slate-50 mt-auto">
                                    <div className="w-14 h-14 bg-bbc-navy-900 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-sm border-2 border-white ring-1 ring-slate-100 group-hover:ring-bbc-gold-500/50 transition-all">
                                        {item.initials}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-bbc-navy-900 text-base">{item.name}</h4>
                                        <p className="text-bbc-gold-600 text-[11px] font-bold tracking-widest uppercase mt-1">
                                            {item.title}, {item.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
