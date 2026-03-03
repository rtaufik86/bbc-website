import { z } from 'zod'

const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/

export const leadFormSchema = z.object({
    name: z.string()
        .min(2, 'Nama minimal 2 karakter')
        .max(100, 'Nama maksimal 100 karakter'),

    whatsapp: z.string()
        .regex(phoneRegex, 'Format WhatsApp tidak valid (contoh: +6281311778036 atau 081311778036)')
        .transform(val => {
            // Normalize to +62 format
            let cleaned = val.replace(/\D/g, '')
            if (cleaned.startsWith('0')) {
                cleaned = '62' + cleaned.slice(1)
            } else if (!cleaned.startsWith('62')) {
                cleaned = '62' + cleaned
            }
            return '+' + cleaned
        }),

    email: z.string()
        .email('Format email tidak valid')
        .optional()
        .or(z.literal('')),

    product_type: z.enum(['serviced_office', 'virtual_office', 'meeting_room', 'legal'], {
        message: 'Pilih produk yang Anda minati'
    }),

    message: z.string()
        .max(500, 'Pesan maksimal 500 karakter')
        .optional(),

    consent: z.boolean().refine(val => val === true, {
        message: 'Anda harus menyetujui kebijakan privasi'
    }),

    source_json: z.record(z.string(), z.any()).optional()
})

export type LeadFormData = z.infer<typeof leadFormSchema>
