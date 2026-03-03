'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ProductFormProps {
    product: any
}

export function ProductForm({ product }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description,
        is_active: product.is_active,
        knowledge_base_text: product.knowledge_base_text, // Add this
        pricing_tiers_json: JSON.stringify(product.pricing_tiers_json, null, 2)
    })

    const supabase = createClient()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        try {
            // Validate JSON
            let pricingTiers
            try {
                pricingTiers = JSON.parse(formData.pricing_tiers_json)
            } catch (err) {
                toast.error('Invalid JSON format for pricing tiers')
                setLoading(false)
                return
            }

            const { error } = await supabase
                .from('products')
                .update({
                    name: formData.name,
                    description: formData.description,
                    is_active: formData.is_active,
                    knowledge_base_text: formData.knowledge_base_text, // Add this
                    pricing_tiers_json: pricingTiers
                })
                .eq('id', product.id)

            if (error) throw error

            toast.success('Product updated successfully')
            router.refresh()
        } catch (error) {
            console.error('Error updating product:', error)
            toast.error('Failed to update product')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <Link
                    href="/admin/products"
                    className="text-sm text-gray-500 hover:text-gray-900 flex items-center"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Products
                </Link>
                <Button type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </>
                    )}
                </Button>
            </div>

            <Card className="p-6">
                <div className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description || ''}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                        />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <Switch
                            id="is_active"
                            checked={formData.is_active}
                            onCheckedChange={checked => setFormData({ ...formData, is_active: checked })}
                        />
                        <Label htmlFor="is_active">Active Status</Label>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Knowledge Base (AI Context)</h3>
                <div className="grid gap-2">
                    <Label htmlFor="knowledge_base">Knowledge Base Text</Label>
                    <p className="text-sm text-gray-500 mb-2">
                        Add detailed information, FAQs, or technical lists (like Ping Services) here.
                        The AI Sales Agent will use this to answer customer questions.
                    </p>
                    <Textarea
                        id="knowledge_base"
                        value={formData.knowledge_base_text || ''}
                        onChange={e => setFormData({ ...formData, knowledge_base_text: e.target.value })}
                        rows={10}
                        placeholder="Paste your content here..."
                    />
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Pricing Configuration (JSON)</h3>
                <div className="grid gap-2">
                    <Label htmlFor="pricing">JSON Configuration</Label>
                    <p className="text-sm text-gray-500 mb-2">
                        Edit pricing structure in JSON format. Be careful with syntax.
                    </p>
                    <Textarea
                        id="pricing"
                        value={formData.pricing_tiers_json}
                        onChange={e => setFormData({ ...formData, pricing_tiers_json: e.target.value })}
                        rows={10}
                        className="font-mono text-sm"
                    />
                </div>
            </Card>
        </form>
    )
}
