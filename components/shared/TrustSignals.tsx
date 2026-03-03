import Image from 'next/image'

const clients = [
    { name: 'Client 1', logo: '/images/clients/client1.png' }, // Placeholder
    { name: 'Client 2', logo: '/images/clients/client2.png' }, // Placeholder
    { name: 'Client 3', logo: '/images/clients/client3.png' }, // Placeholder
    { name: 'Client 4', logo: '/images/clients/client4.png' }, // Placeholder
    { name: 'Client 5', logo: '/images/clients/client5.png' }, // Placeholder
    { name: 'Client 6', logo: '/images/clients/client6.png' }, // Placeholder
]

export default function TrustSignals() {
    return (
        <section className="py-16 bg-slate-50 text-center">
            <div className="container mx-auto px-4">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Dipercaya oleh 100+ Perusahaan</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale">
                    {/* Placeholder logos - using text for now if images missing */}
                    <span className="text-xl font-bold text-slate-400">LOGO 1</span>
                    <span className="text-xl font-bold text-slate-400">LOGO 2</span>
                    <span className="text-xl font-bold text-slate-400">LOGO 3</span>
                    <span className="text-xl font-bold text-slate-400">LOGO 4</span>
                    <span className="text-xl font-bold text-slate-400">LOGO 5</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
                    <div>
                        <h4 className="text-4xl font-bold text-bbc-blue-600 mb-2">15+</h4>
                        <p className="text-slate-600 font-medium">Coming Soon</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-bbc-blue-600 mb-2">85%</h4>
                        <p className="text-slate-600 font-medium">Tingkat Okupansi</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-bbc-blue-600 mb-2">2007</h4>
                        <p className="text-slate-600 font-medium">Berdiri Sejak</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-bbc-blue-600 mb-2">72</h4>
                        <p className="text-slate-600 font-medium">Unit Kantor</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
