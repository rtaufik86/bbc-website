'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { X } from 'lucide-react'

interface LeadsFiltersProps {
    products: Array<{ slug: string; name: string }>
    salesUsers: Array<{ user_id: string; display_name: string }>
    isAdmin: boolean
    currentFilters: any
}

export function LeadsFilters({
    products,
    salesUsers,
    isAdmin,
    currentFilters
}: LeadsFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    function updateFilter(key: string, value: string) {
        const params = new URLSearchParams(searchParams.toString())

        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }

        // Reset to page 1 when filtering
        params.set('page', '1')

        router.push(`/admin/leads?${params.toString()}`)
    }

    function clearFilters() {
        router.push('/admin/leads')
    }

    const hasFilters = Object.keys(currentFilters).length > 0

    const stages = [
        { value: 'new', label: 'New' },
        { value: 'contacted', label: 'Contacted' },
        { value: 'qualified', label: 'Qualified' },
        { value: 'proposal', label: 'Proposal' },
        { value: 'negotiation', label: 'Negotiation' },
        { value: 'won', label: 'Won' },
        { value: 'lost', label: 'Lost' }
    ]

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <Input
                    placeholder="Search name, phone, email..."
                    defaultValue={currentFilters.search || ''}
                    onChange={(e) => {
                        const value = e.target.value
                        // Debounce search
                        setTimeout(() => updateFilter('search', value), 500)
                    }}
                />

                {/* Stage Filter */}
                <Select
                    value={currentFilters.stage || ''}
                    onValueChange={(value) => updateFilter('stage', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="All Stages" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">All Stages</SelectItem>
                        {stages.map(stage => (
                            <SelectItem key={stage.value} value={stage.value}>
                                {stage.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Product Filter */}
                <Select
                    value={currentFilters.product || ''}
                    onValueChange={(value) => updateFilter('product', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="All Products" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">All Products</SelectItem>
                        {products.map(product => (
                            <SelectItem key={product.slug} value={product.slug}>
                                {product.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Assigned Filter (Admin only) */}
                {isAdmin && (
                    <Select
                        value={currentFilters.assigned || ''}
                        onValueChange={(value) => updateFilter('assigned', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All Sales" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All Sales</SelectItem>
                            {salesUsers.map(user => (
                                <SelectItem key={user.user_id} value={user.user_id}>
                                    {user.display_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>

            {hasFilters && (
                <div className="mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={clearFilters}
                    >
                        <X className="w-4 h-4 mr-2" />
                        Clear Filters
                    </Button>
                </div>
            )}
        </div>
    )
}
