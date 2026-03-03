import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { leadFormSchema } from '@/lib/schemas/lead'
import { sendCapiEvent } from '@/lib/tracking/capi'
import { hashString } from '@/lib/tracking/hash'
import { sendNewLeadNotification, sendLeadUpdatedNotification } from '@/lib/telegram/bot'

// Rate limiting (in-memory, simple)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
    const now = Date.now()
    const limit = rateLimitMap.get(ip)

    if (!limit || now > limit.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 }) // 1 minute
        return true
    }

    if (limit.count >= 10) {
        return false
    }

    limit.count++
    return true
}

function getClientIP(request: NextRequest): string {
    return request.headers.get('x-forwarded-for')?.split(',')[0].trim()
        || request.headers.get('x-real-ip')
        || 'unknown'
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip = getClientIP(request)
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { success: false, error: 'Too many requests. Please try again later.' },
                { status: 429 }
            )
        }

        // Parse request body
        const body = await request.json()

        // Validate
        const validatedData = leadFormSchema.parse(body)

        // Get org_id (for now, hardcode BBC Bintaro)
        const supabase = createAdminClient()

        const { data: org } = await supabase
            .from('organizations')
            .select('id')
            .eq('slug', 'bbc-bintaro')
            .single()

        if (!org) {
            // Create fallback org logic or throw error
            // Ideally we should have seeded data. If failing locally without user setting up DB, handle gracefully?
            // For now, throw
            throw new Error('Organization not found')
        }

        const org_id = org.id

        // Check for duplicate
        const { data: duplicateId } = await supabase
            .rpc('check_lead_duplicate', {
                p_org_id: org_id,
                p_whatsapp: validatedData.whatsapp,
                p_product_type: validatedData.product_type
            })

        let lead_id: string
        let is_new = false

        if (duplicateId) {
            // Update existing lead
            const { data: updated, error } = await supabase
                .from('leads')
                .update({
                    name: validatedData.name,
                    email: validatedData.email || null,
                    notes: validatedData.message || null,
                    source_json: validatedData.source_json || {},
                    updated_at: new Date().toISOString()
                })
                .eq('id', duplicateId)
                .select('id')
                .single()

            if (error) throw error

            lead_id = updated.id

            // Create activity
            await supabase.from('lead_activities').insert({
                org_id,
                lead_id: updated.id,
                type: 'returned_visitor',
                title: 'Returned visitor',
                description: 'Lead submitted form again within dedup window',
                payload_json: { source: validatedData.source_json },
                created_by: null // System action
            })

            // Get assigned sales for notification
            const { data: existingLead } = await supabase
                .from('leads')
                .select('assigned_to')
                .eq('id', duplicateId)
                .single()

            const assigned_user_id = existingLead?.assigned_to

            // Send updated notification (Day 4)
            if (assigned_user_id) {
                await sendUpdatedLeadNotificationHelper(duplicateId, assigned_user_id, supabase)
            }
        } else {
            // Create new lead
            const { data: created, error } = await supabase
                .from('leads')
                .insert({
                    org_id,
                    name: validatedData.name,
                    whatsapp: validatedData.whatsapp,
                    email: validatedData.email || null,
                    product_type: validatedData.product_type,
                    notes: validatedData.message || null,
                    source_json: validatedData.source_json || {},
                    stage: 'new'
                })
                .select('id')
                .single()

            if (error) throw error

            lead_id = created.id
            is_new = true

            // Calculate score (auto via trigger, but can call explicitly)
            await supabase.rpc('calculate_lead_score', { p_lead_id: lead_id })

            // Assign to sales
            const { data: assigned_user_id, error: assignError } = await supabase
                .rpc('assign_lead_weighted', {
                    p_org_id: org_id,
                    p_lead_id: lead_id,
                    p_product_type: validatedData.product_type
                })

            if (assignError) {
                console.error('Assignment error:', assignError)
                // Don't fail the whole request if assignment fails
            }

            console.log('New lead created:', lead_id, 'assigned to:', assigned_user_id)

            // Send Telegram notification (Day 4)
            if (assigned_user_id) {
                await sendNewLeadNotificationToSales(lead_id, assigned_user_id, supabase)
            }
        }

        // CAPI Integration (Day 3 & 4)
        const { fbp, fbc, landing_page, referrer, ...otherSourceJson } = validatedData.source_json || {}

        // Hash PII
        const userData = {
            em: validatedData.email ? hashString(validatedData.email) : undefined,
            ph: hashString(validatedData.whatsapp), // WhatsApp is phone
            fbp: fbp as string,
            fbc: fbc as string,
            client_ip_address: ip,
            client_user_agent: request.headers.get('user-agent') || undefined
        }

        // Fire CAPI event - Non-blocking
        sendCapiEvent({
            eventName: 'Lead',
            eventId: lead_id, // Use lead_id as dedup key
            eventTime: Math.floor(Date.now() / 1000),
            userData,
            sourceUrl: (landing_page as string) || request.headers.get('referer') || '',
            customData: {
                product_type: validatedData.product_type,
                lead_score: is_new ? 0 : undefined, // Could fetch score if needed, but 0 is safe default if not yet calcd
                status: is_new ? 'new' : 'returned',
                content_name: validatedData.product_type
            }
        }).catch(err => console.error('CAPI async error:', err))

        return NextResponse.json({
            success: true,
            lead_id,
            is_new,
            message: is_new
                ? 'Terima kasih! Tim kami akan segera menghubungi Anda.'
                : 'Data Anda telah diperbarui. Tim kami akan segera menghubungi Anda.'
        })

    } catch (error) {
        console.error('Lead submission error:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: 'Invalid data submitted', details: (error as any).errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

/**
 * Helper: Send notification for new lead
 */
async function sendNewLeadNotificationToSales(
    leadId: string,
    salesUserId: string,
    supabase: any
) {
    try {
        // Get full lead data
        const { data: lead } = await supabase
            .from('leads')
            .select('*')
            .eq('id', leadId)
            .single()

        if (!lead) {
            console.error('Lead not found:', leadId)
            return
        }

        // Get sales chat_id
        const { data: salesProfile } = await supabase
            .from('sales_profiles')
            .select('telegram_chat_id, display_name')
            .eq('user_id', salesUserId)
            .single()

        if (!salesProfile?.telegram_chat_id) {
            console.warn('Sales user has no Telegram chat_id:', salesUserId)
            return
        }

        // Send notification
        const result = await sendNewLeadNotification(lead, salesProfile.telegram_chat_id)

        // Log notification result
        await supabase.from('notification_logs').insert({
            lead_id: leadId,
            user_id: salesUserId,
            channel: 'telegram',
            type: 'new_lead',
            success: result.success,
            error_message: result.error,
            metadata: {
                telegram_message_id: result.message_id,
                chat_id: salesProfile.telegram_chat_id
            }
        })

        console.log('Telegram notification sent:', result)
    } catch (error) {
        console.error('Failed to send Telegram notification:', error)
        // Don't throw - notification failure shouldn't break lead creation
    }
}

/**
 * Helper: Send notification for updated lead
 */
async function sendUpdatedLeadNotificationHelper(
    leadId: string,
    salesUserId: string,
    supabase: any
) {
    try {
        const { data: lead } = await supabase
            .from('leads')
            .select('*')
            .eq('id', leadId)
            .single()

        const { data: salesProfile } = await supabase
            .from('sales_profiles')
            .select('telegram_chat_id')
            .eq('user_id', salesUserId)
            .single()

        if (!salesProfile?.telegram_chat_id) return

        const result = await sendLeadUpdatedNotification(lead, salesProfile.telegram_chat_id)

        await supabase.from('notification_logs').insert({
            lead_id: leadId,
            user_id: salesUserId,
            channel: 'telegram',
            type: 'updated_lead',
            success: result.success,
            error_message: result.error
        })

        console.log('Updated notification sent:', result)
    } catch (error) {
        console.error('Failed to send update notification:', error)
    }
}
