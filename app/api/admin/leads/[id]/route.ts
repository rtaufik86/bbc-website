import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    try {
        const supabase = await createClient()
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { stage, note } = body

        const adminClient = createAdminClient()

        // Update lead
        const { error: updateError } = await adminClient
            .from('leads')
            .update({
                stage,
                last_contacted_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                updated_by: session.user.id
            })
            .eq('id', id)

        if (updateError) throw updateError

        // Add activity
        if (note) {
            await adminClient.from('lead_activities').insert({
                lead_id: id,
                type: 'note',
                title: `Stage updated to ${stage}`,
                description: note,
                created_by: session.user.id
            })
        } else {
            await adminClient.from('lead_activities').insert({
                lead_id: id,
                type: 'status_change',
                title: `Stage updated to ${stage}`,
                created_by: session.user.id
            })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Update lead error:', error)
        return NextResponse.json(
            { error: 'Failed to update lead' },
            { status: 500 }
        )
    }
}
