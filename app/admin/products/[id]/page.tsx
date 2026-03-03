import { createClient } from '@/lib/supabase/server'
import { getUserWithOrg } from '@/lib/auth/server'
import { ProductForm } from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'

export default async function ProductEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const userWithOrg = await getUserWithOrg()

    if (!userWithOrg) {
        return null
    }

    const supabase = await createClient()

    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('org_id', userWithOrg.orgMember.org_id)
        .single()

    if (!product) {
        notFound()
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
            <ProductForm product={product} />
        </div>
    )
}
