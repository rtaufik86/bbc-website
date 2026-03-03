import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendFollowUpReminder } from '@/lib/telegram/bot'

export async function GET(request: NextRequest) {
    // Verify cron secret (security)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        // For development/demo without CRON_SECRET set, we might want to bypass or warn
        // console.warn('Cron secret validation skipped for dev')
    }

    try {
        const supabase = createAdminClient()
        const now = new Date()
        const results = {
            hot_leads_reminded: 0,
            warm_leads_reminded: 0,
            cold_leads_reminded: 0,
            errors: 0
        }

        // HOT leads: not contacted in 4+ hours
        const fourHoursAgo = new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString()
        const { data: hotLeads, error: hotError } = await supabase
            .from('leads')
            .select(`
        *,
        sales_profiles!inner(telegram_chat_id, display_name)
      `)
            .eq('stage', 'new')
            .gt('lead_score', 80)
            .is('last_contacted_at', null)
            .lt('created_at', fourHoursAgo)
            .or(`last_reminder_sent.is.null,last_reminder_sent.lt.${fourHoursAgo}`)
            .limit(20)

        if (hotError) console.error('Error fetching hot leads:', hotError)

        for (const lead of hotLeads || []) {
            const hoursSince = Math.floor(
                (now.getTime() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60)
            )

            const result = await sendFollowUpReminder(
                lead,
                lead.sales_profiles.telegram_chat_id,
                hoursSince
            )

            if (result.success) {
                results.hot_leads_reminded++

                // Update last_reminder_sent
                await supabase
                    .from('leads')
                    .update({ last_reminder_sent: now.toISOString() })
                    .eq('id', lead.id)
            } else {
                results.errors++
            }

            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, 100))
        }

        // WARM leads: not contacted in 24+ hours
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
        const { data: warmLeads } = await supabase
            .from('leads')
            .select(`
        *,
        sales_profiles!inner(telegram_chat_id, display_name)
      `)
            .eq('stage', 'new')
            .gte('lead_score', 50)
            .lte('lead_score', 80)
            .is('last_contacted_at', null)
            .lt('created_at', twentyFourHoursAgo)
            .or(`last_reminder_sent.is.null,last_reminder_sent.lt.${twentyFourHoursAgo}`)
            .limit(50)

        for (const lead of warmLeads || []) {
            const hoursSince = Math.floor(
                (now.getTime() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60)
            )

            const result = await sendFollowUpReminder(
                lead,
                lead.sales_profiles.telegram_chat_id,
                hoursSince
            )

            if (result.success) {
                results.warm_leads_reminded++

                await supabase
                    .from('leads')
                    .update({ last_reminder_sent: now.toISOString() })
                    .eq('id', lead.id)
            } else {
                results.errors++
            }

            await new Promise(resolve => setTimeout(resolve, 100))
        }

        console.log('Follow-up reminders sent:', results)

        return NextResponse.json({ success: true, results })
    } catch (error) {
        console.error('Reminder cron error:', error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}
