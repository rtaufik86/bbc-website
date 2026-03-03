import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendReassignmentNotification } from '@/lib/telegram/bot'

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    try {
        const { new_user_id } = await request.json()

        const supabase = createAdminClient()

        // Get lead and old sales info
        const { data: lead } = await supabase
            .from('leads')
            .select('*, assigned_sales:auth.users!leads_assigned_to_fkey(email)')
            .eq('id', id)
            .single()

        if (!lead) {
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
        }

        const oldSalesName = (lead as any)?.assigned_sales?.email

        // Update assignment
        const { error } = await supabase
            .from('leads')
            .update({ assigned_to: new_user_id })
            .eq('id', id)

        if (error) throw error

        // Add activity
        await supabase.from('lead_activities').insert({
            lead_id: id,
            type: 'assignment',
            title: 'Lead reassigned',
            payload_json: {
                from: (lead as any).assigned_to,
                to: new_user_id
            }
        })

        // Send Telegram notification to new sales
        const { data: salesProfile } = await supabase
            .from('sales_profiles')
            .select('telegram_chat_id')
            .eq('user_id', new_user_id)
            .single()

        if (salesProfile?.telegram_chat_id) {
            await sendReassignmentNotification(
                (lead as any),
                salesProfile.telegram_chat_id,
                oldSalesName
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Reassign error:', error)
        return NextResponse.json(
            { error: 'Failed to reassign lead' },
            { status: 500 }
        )
    }
}
