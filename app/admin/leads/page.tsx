import { createClient } from '@/lib/supabase/server'
import { LeadsTable } from '@/components/admin/LeadsTable'
import { LeadsFilters } from '@/components/admin/LeadsFilters'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

interface LeadsPageProps {
    searchParams: Promise<{
        stage?: string
        product?: string
        assigned?: string
        search?: string
        sort?: string
        order?: 'asc' | 'desc'
        page?: string
    }>
}

export default async function LeadsPage(props: LeadsPageProps) {
    const searchParams = await props.searchParams
    const supabase = await createClient()

    // Get current user and org
    const { data: { session } } = await supabase.auth.getSession()
    const { data: orgMember } = await supabase
        .from('org_members')
        .select('org_id, role')
        .eq('user_id', session?.user.id)
        .single()

    const isAdmin = orgMember?.role === 'admin' || orgMember?.role === 'owner'
    const isSales = orgMember?.role === 'sales'

    // Build query
    let query = supabase
        .from('leads')
        .select(`
      *,
      assigned_sales:auth.users!leads_assigned_to_fkey(id, email),
      products!leads_product_type_fkey(name, slug)
    `, { count: 'exact' })
        .eq('org_id', orgMember?.org_id)
        .is('deleted_at', null)

    // Sales can only see their own leads
    if (isSales && !isAdmin) {
        query = query.eq('assigned_to', session?.user.id)
    }

    // Apply filters
    if (searchParams.stage) {
        query = query.eq('stage', searchParams.stage)
    }

    if (searchParams.product) {
        query = query.eq('product_type', searchParams.product)
    }

    if (searchParams.assigned && isAdmin) {
        query = query.eq('assigned_to', searchParams.assigned)
    }

    // Search
    if (searchParams.search) {
        const search = `%${searchParams.search}%`
        query = query.or(`name.ilike.${search},whatsapp.ilike.${search},email.ilike.${search}`)
    }

    // Sorting
    const sortField = searchParams.sort || 'created_at'
    const sortOrder = searchParams.order || 'desc'
    query = query.order(sortField, { ascending: sortOrder === 'asc' })

    // Pagination
    const page = parseInt(searchParams.page || '1')
    const pageSize = 20
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    query = query.range(from, to)

    const { data: leads, count, error } = await query

    if (error) {
        console.error('Failed to fetch leads:', error)
        return <div className="p-8 text-red-600">Failed to load leads</div>
    }

    // Get filter options
    const { data: products } = await supabase
        .from('products')
        .select('slug, name')
        .eq('org_id', orgMember?.org_id)
        .eq('is_active', true)

    const { data: salesUsers } = isAdmin
        ? await supabase
            .from('sales_profiles')
            .select('user_id, display_name')
            .eq('org_id', orgMember?.org_id)
            .eq('is_active', true)
        : { data: [] }

    const totalPages = count ? Math.ceil(count / pageSize) : 1

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                    <p className="text-gray-600 mt-1">
                        {count} total leads
                    </p>
                </div>

                <Link href="/admin/leads/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Lead
                    </Button>
                </Link>
            </div>

            <LeadsFilters
                products={products || []}
                salesUsers={salesUsers || []}
                isAdmin={isAdmin}
                currentFilters={searchParams}
            />

            <LeadsTable
                leads={(leads as any) || []}
                currentPage={page}
                totalPages={totalPages}
                isAdmin={isAdmin}
            />
        </div>
    )
}
