import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { LeadHeader } from '@/components/admin/LeadHeader'
import { LeadInfo } from '@/components/admin/LeadInfo'
import { LeadTimeline } from '@/components/admin/LeadTimeline'
import { LeadActions } from '@/components/admin/LeadActions'
import { ConversationHistory } from '@/components/admin/ConversationHistory'

interface LeadDetailPageProps {
    params: Promise<{ id: string }>
}

export default async function LeadDetailPage(props: LeadDetailPageProps) {
    const params = await props.params
    const supabase = await createClient()

    // Get current user
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) redirect('/login')

    const { data: orgMember } = await supabase
        .from('org_members')
        .select('org_id, role')
        .eq('user_id', session.user.id)
        .single()

    const isAdmin = orgMember?.role === 'admin' || orgMember?.role === 'owner'
    const isSales = orgMember?.role === 'sales'

    // Fetch lead with relations
    const { data: lead, error } = await supabase
        .from('leads')
        .select(`
      *,
      assigned_sales:auth.users!leads_assigned_to_fkey(id, email),
      products(name, slug)
    `)
        .eq('id', params.id)
        .eq('org_id', orgMember?.org_id)
        .is('deleted_at', null)
        .single()

    if (error || !lead) {
        notFound()
    }

    // Check permission: sales can only view own leads
    if (isSales && !isAdmin && (lead as any).assigned_to !== session.user.id) {
        redirect('/admin/leads')
    }

    // Fetch activities
    const { data: activities } = await supabase
        .from('lead_activities')
        .select('*, created_by_user:auth.users!lead_activities_created_by_fkey(email)')
        .eq('lead_id', params.id)
        .order('created_at', { ascending: false })
        .limit(50)

    // Fetch conversation if exists
    const { data: conversation } = await supabase
        .from('conversations')
        .select(`
      *,
      conversation_messages(*)
    `)
        .eq('lead_id', params.id)
        .order('started_at', { ascending: false })
        .limit(1)
        .single()

    // Get available products for product change
    const { data: products } = await supabase
        .from('products')
        .select('slug, name')
        .eq('org_id', orgMember?.org_id)
        .eq('is_active', true)

    // Get available sales for reassignment
    const { data: salesUsers } = isAdmin
        ? await supabase
            .from('sales_profiles')
            .select('user_id, display_name')
            .eq('org_id', orgMember?.org_id)
            .eq('is_active', true)
        : { data: [] }

    return (
        <div className="max-w-7xl mx-auto">
            <LeadHeader lead={lead} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Left Column: Lead Info & Actions */}
                <div className="lg:col-span-1 space-y-6">
                    <LeadInfo lead={lead} />

                    <LeadActions
                        lead={lead}
                        isAdmin={isAdmin}
                        products={products || []}
                        salesUsers={salesUsers || []}
                    />
                </div>

                {/* Right Column: Timeline & Conversation */}
                <div className="lg:col-span-2 space-y-6">
                    {conversation && (
                        <ConversationHistory
                            conversation={conversation}
                            messages={conversation.conversation_messages || []}
                        />
                    )}

                    <LeadTimeline activities={activities || []} />
                </div>
            </div>
        </div>
    )
}
