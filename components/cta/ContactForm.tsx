"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle } from "lucide-react"

export default function ContactForm() {
    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold mb-6 text-slate-900">Mulai Konsultasi Gratis</h3>
            <form className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium mb-1 block text-slate-700">Nama</label>
                    <Input placeholder="Nama lengkap Anda" className="bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium mb-1 block text-slate-700">WhatsApp</label>
                    <Input placeholder="0812..." type="tel" className="bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium mb-1 block text-slate-700">Kebutuhan</label>
                    <Textarea placeholder="Saya tertarik sewa kantor..." className="bg-slate-50 border-slate-200 min-h-[100px]" />
                </div>
                <Button className="w-full bg-bbc-blue-500 hover:bg-bbc-blue-600 text-white font-bold h-12">
                    Kirim Pesan
                </Button>
            </form>
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500 mb-4">Atau hubungi langsung untuk respon cepat:</p>
                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 font-bold h-12" asChild>
                    <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281311778036'}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-5 h-5" /> Chat WhatsApp
                    </a>
                </Button>
            </div>
        </div>
    )
}
