'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MessageCircle, X, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')

    const handleStartChat = () => {
        // 1. Track 'ChatStarted' event to Pixel
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('trackCustom', 'ChatStarted', { content_name: 'whatsapp_widget' })
        }

        // 2. Redirect to WhatsApp
        const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281311778036'
        const text = encodeURIComponent(message || 'Halo, saya tertarik dengan layanan BBC Bintaro.')
        window.open(`https://wa.me/${phone}?text=${text}`, '_blank')

        setIsOpen(false)
        setMessage('')
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
            {isOpen && (
                <Card className="w-80 shadow-2xl animate-in fade-in slide-in-from-bottom-10 border-blue-100">
                    <CardHeader className="bg-blue-600 text-white p-4 rounded-t-lg flex flex-row items-center justify-between space-y-0">
                        <div>
                            <h3 className="font-bold text-sm">Chat dengan Kami</h3>
                            <p className="text-xs text-blue-100">Online • Balasan cepat</p>
                        </div>
                        <Button size="icon" variant="ghost" className="text-white hover:bg-blue-700 h-8 w-8" onClick={() => setIsOpen(false)}>
                            <X size={18} />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-4 bg-slate-50 min-h-[150px] flex flex-col justify-end">
                        <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-slate-700 mb-2">
                            Halo! Ada yang bisa kami bantu seputar Virtual Office atau Legalitas?
                        </div>
                    </CardContent>
                    <CardFooter className="p-3 bg-white border-t">
                        <div className="flex w-full space-x-2">
                            <Input
                                placeholder="Ketik pesan..."
                                className="flex-1 text-sm h-9"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleStartChat()}
                            />
                            <Button size="icon" className="h-9 w-9 bg-green-600 hover:bg-green-700" onClick={handleStartChat}>
                                <Send size={16} />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            )}

            <Button
                size="icon"
                className={cn(
                    "h-14 w-14 rounded-full shadow-xl transition-transform hover:scale-110",
                    isOpen ? "bg-slate-500 hover:bg-slate-600" : "bg-green-600 hover:bg-green-700"
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                    </span>
                )}
            </Button>
        </div>
    )
}
