'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadFormSchema, type LeadFormData } from '@/lib/schemas/lead'
import { getMetaParams, getUTMParams, trackLeadEvent } from '@/lib/tracking/meta'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

interface LeadFormProps {
    productType?: string
    className?: string
}

export function LeadForm({ productType, className }: LeadFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const form = useForm<LeadFormData>({
        resolver: zodResolver(leadFormSchema),
        defaultValues: {
            product_type: productType as any,
            consent: false,
            name: '',
            whatsapp: '',
            email: '',
            message: ''
        }
    })

    async function onSubmit(data: LeadFormData) {
        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            // Get tracking params
            const metaParams = getMetaParams()
            const utmParams = getUTMParams()

            // Submit to API
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    source_json: {
                        ...utmParams,
                        ...metaParams,
                        landing_page: window.location.pathname,
                        referrer: document.referrer,
                    }
                })
            })

            if (!response.ok) throw new Error('Failed to submit')

            const result = await response.json()

            // Track with Meta Pixel
            trackLeadEvent(data)

            // Show success
            setSubmitStatus('success')
            form.reset()

        } catch (error) {
            console.error('Form submission error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={className}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" {...form.register('name')} placeholder="Nama Anda" />
                    {form.formState.errors.name && (
                        <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input id="whatsapp" {...form.register('whatsapp')} placeholder="081234567890" type="tel" />
                    {form.formState.errors.whatsapp && (
                        <p className="text-xs text-red-500">{form.formState.errors.whatsapp.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email (Opsional)</Label>
                    <Input id="email" {...form.register('email')} placeholder="email@contoh.com" type="email" />
                    {form.formState.errors.email && (
                        <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                    )}
                </div>

                {/* Hidden product type field if passed, otherwise selector could be added here */}
                <Input type="hidden" {...form.register('product_type')} />
                {form.formState.errors.product_type && (
                    <p className="text-xs text-red-500">{form.formState.errors.product_type.message}</p>
                )}

                <div className="space-y-2">
                    <Label htmlFor="message">Pesan (Opsional)</Label>
                    <Textarea id="message" {...form.register('message')} placeholder="Ada pertanyaan khusus?" />
                    {form.formState.errors.message && (
                        <p className="text-xs text-red-500">{form.formState.errors.message.message}</p>
                    )}
                </div>

                <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                        id="consent"
                        checked={form.watch('consent')}
                        onCheckedChange={(c) => form.setValue('consent', c === true)}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="consent" className="text-sm font-normal text-slate-600 cursor-pointer">
                            Saya setuju data saya digunakan untuk keperluan komunikasi sesuai <a href="/privacy" className="underline text-blue-600">kebijakan privasi</a>.
                        </Label>
                        {form.formState.errors.consent && (
                            <p className="text-xs text-red-500">{form.formState.errors.consent.message}</p>
                        )}
                    </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Mengirim...
                        </>
                    ) : (
                        'Kirim Permintaan'
                    )}
                </Button>
            </form>

            {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 animate-in fade-in">
                    <p className="font-semibold">✅ Terima kasih!</p>
                    <p className="text-sm">Tim kami akan segera menghubungi Anda via WhatsApp.</p>
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 animate-in fade-in">
                    <p className="font-semibold">❌ Terjadi kesalahan</p>
                    <p className="text-sm">Silakan coba lagi atau hubungi kami langsung.</p>
                </div>
            )}
        </div>
    )
}
