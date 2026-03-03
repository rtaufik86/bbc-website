import { getUserWithOrg } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Users, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboardPage() {
    const userWithOrg = await getUserWithOrg()

    if (!userWithOrg) {
        return null
    }

    const supabase = await createClient()
    const isAdmin = ['admin', 'owner'].includes(userWithOrg.role)

    // Build query based on role
    let leadsQuery = supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('org_id', userWithOrg.orgMember.org_id)
        .is('deleted_at', null)

    if (!isAdmin) {
        leadsQuery = leadsQuery.eq('assigned_to', userWithOrg.user.id)
    }

    const { count: totalLeads } = await leadsQuery

    // Helper to get count with role filter
    const getCount = async (stage?: string, days?: number) => {
        let query = supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .eq('org_id', userWithOrg.orgMember.org_id)
            .is('deleted_at', null)

        if (stage) query = query.eq('stage', stage)
        if (days) query = query.gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
        if (!isAdmin) query = query.eq('assigned_to', userWithOrg.user.id)

        const { count } = await query
        return count || 0
    }

    const newLeads = await getCount('new')
    const thisMonthLeads = await getCount(undefined, 30)
    const wonLeads = await getCount('won', 30)

    const stats = [
        {
            label: isAdmin ? 'Total Leads' : 'My Leads',
            value: totalLeads || 0,
            icon: Users,
            color: 'text-blue-600'
        },
        {
            label: 'New Leads',
            value: newLeads,
            icon: TrendingUp,
            color: 'text-green-600'
        },
        {
            label: 'Last 30 Days',
            value: thisMonthLeads,
            icon: Clock,
            color: 'text-orange-600'
        },
        {
            label: 'Won (30 Days)',
            value: wonLeads,
            icon: CheckCircle,
            color: 'text-purple-600'
        }
    ]

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back, {userWithOrg.user.user_metadata?.full_name?.split(' ')[0] || 'User'}!
                </h1>
                <p className="text-gray-600 mt-1">
                    {isAdmin ? "Here's the organization overview." : "Here's what's happening with your leads."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => {
                    const Icon = stat.icon
                    return (
                        <Card key={stat.label} className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">
                                        {stat.label}
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {stat.value}
                                    </p>
                                </div>
                                <Icon className={`w-12 h-12 ${stat.color}`} />
                            </div>
                        </Card>
                    )
                })}
            </div>

            <div className="mt-8">
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <Link
                            href="/admin/leads?stage=new"
                            className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                            <p className="font-medium text-blue-900">View New Leads</p>
                            <p className="text-sm text-blue-700">
                                {newLeads} leads waiting for contact
                            </p>
                        </Link>

                        {isAdmin && (
                            <Link
                                href="/admin/settings"
                                className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <p className="font-medium text-gray-900">Organization Settings</p>
                                <p className="text-sm text-gray-700">
                                    Manage users, roles, and integrations
                                </p>
                            </Link>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}
