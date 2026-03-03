import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    try {
        const { new_product } = await request.json()

        const supabase = createAdminClient()

        // Get lead org_id
        const { data: leadResult } = await supabase
            .from('leads')
            .select('org_id, assigned_to')
            .eq('id', id)
            .single()

        const lead = leadResult as any

        if (!lead) {
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
        }

        const oldAssignment = lead.assigned_to

        // Update product
        const { error: updateError } = await supabase
            .from('leads')
            .update({ product_type: new_product })
            .eq('id', id)

        if (updateError) throw updateError

        // Re-assign using weighted routing
        const { data: newAssignment } = await supabase
            .rpc('assign_lead_weighted', {
                p_org_id: lead.org_id,
                p_lead_id: id,
                p_product_type: new_product
            })

        // Add activity
        await supabase.from('lead_activities').insert({
            lead_id: id,
            type: 'product_change',
            title: `Product changed to ${new_product}`,
            payload_json: {
                old_assignment: oldAssignment,
                new_assignment: newAssignment
            }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Change product error:', error)
        return NextResponse.json(
            { error: 'Failed to change product' },
            { status: 500 }
        )
    }
}
