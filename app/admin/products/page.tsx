import { createClient } from '@/lib/supabase/server'
import { getUserWithOrg } from '@/lib/auth/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Edit, Package } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
    const userWithOrg = await getUserWithOrg()

    if (!userWithOrg) {
        return null
    }

    const supabase = await createClient()

    const { data: products } = await supabase
        .from('products')
        .select('*')
        .eq('org_id', userWithOrg.orgMember.org_id)
        .order('display_order', { ascending: true })

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold font-display">Products</h1>
                    <p className="text-gray-500">Manage organization products and pricing</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {(products || []).map((product: any) => (
                    <Card key={product.id} className="p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Package className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold">{product.name}</h3>
                                    {product.is_active ? (
                                        <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-200">
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary">Inactive</Badge>
                                    )}
                                </div>

                                <p className="text-gray-600 mb-4 max-w-2xl">
                                    {product.description || 'No description provided.'}
                                </p>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Pricing Tiers</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(product.pricing_tiers_json || []).map((tier: any, index: number) => (
                                            <Badge key={index} variant="outline" className="px-3 py-1">
                                                {tier.duration}: Rp {tier.price.toLocaleString('id-ID')}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Link href={`/admin/products/${product.id}`}>
                                <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Product
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ))}

                {(!products || products.length === 0) && (
                    <div className="text-center py-12 bg-white rounded-lg border border-dashed text-gray-500">
                        No products found.
                    </div>
                )}
            </div>
        </div>
    )
}
