'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, UserCog, Package } from 'lucide-react'

interface LeadActionsProps {
    lead: any
    isAdmin: boolean
    products: Array<{ slug: string; name: string }>
    salesUsers: Array<{ user_id: string; display_name: string }>
}

export function LeadActions({
    lead,
    isAdmin,
    products,
    salesUsers
}: LeadActionsProps) {
    const router = useRouter()
    const [isUpdating, setIsUpdating] = useState(false)
    const [newStage, setNewStage] = useState(lead.stage)
    const [note, setNote] = useState('')

    const stages = [
        { value: 'new', label: 'New' },
        { value: 'contacted', label: 'Contacted' },
        { value: 'qualified', label: 'Qualified' },
        { value: 'proposal', label: 'Proposal Sent' },
        { value: 'negotiation', label: 'Negotiation' },
        { value: 'won', label: 'Won' },
        { value: 'lost', label: 'Lost' }
    ]

    async function updateStage() {
        setIsUpdating(true)

        try {
            const response = await fetch(`/api/admin/leads/${lead.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stage: newStage,
                    note: note || undefined
                })
            })

            if (response.ok) {
                router.refresh()
                setNote('')
            } else {
                alert('Failed to update lead')
            }
        } catch (error) {
            console.error('Update error:', error)
            alert('Failed to update lead')
        } finally {
            setIsUpdating(false)
        }
    }

    async function reassignLead(newUserId: string) {
        if (!confirm('Reassign this lead to another sales?')) return

        try {
            const response = await fetch(`/api/admin/leads/${lead.id}/reassign`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ new_user_id: newUserId })
            })

            if (response.ok) {
                router.refresh()
            }
        } catch (error) {
            console.error('Reassign error:', error)
        }
    }

    async function changeProduct(newProduct: string) {
        if (!confirm('Change product? This will re-assign the lead to the appropriate sales.')) return

        try {
            const response = await fetch(`/api/admin/leads/${lead.id}/change-product`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ new_product: newProduct })
            })

            if (response.ok) {
                router.refresh()
            }
        } catch (error) {
            console.error('Change product error:', error)
        }
    }

    return (
        <div className="space-y-4">
            {/* Update Stage */}
            <Card className="p-4">
                <h4 className="font-semibold mb-3 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Update Stage
                </h4>

                <div className="space-y-3">
                    <Select value={newStage} onValueChange={setNewStage}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {stages.map(stage => (
                                <SelectItem key={stage.value} value={stage.value}>
                                    {stage.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Textarea
                        placeholder="Add note (optional)"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={3}
                    />

                    <Button
                        onClick={updateStage}
                        disabled={isUpdating || newStage === lead.stage}
                        className="w-full"
                    >
                        {isUpdating ? 'Updating...' : 'Update Stage'}
                    </Button>
                </div>
            </Card>

            {/* Reassign (Admin only) */}
            {isAdmin && salesUsers.length > 0 && (
                <Card className="p-4">
                    <h4 className="font-semibold mb-3 flex items-center">
                        <UserCog className="w-4 h-4 mr-2" />
                        Reassign Lead
                    </h4>

                    <Select onValueChange={reassignLead}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select sales..." />
                        </SelectTrigger>
                        <SelectContent>
                            {salesUsers.map(user => (
                                <SelectItem key={user.user_id} value={user.user_id}>
                                    {user.display_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Card>
            )}

            {/* Change Product (Admin only) */}
            {isAdmin && products.length > 0 && (
                <Card className="p-4">
                    <h4 className="font-semibold mb-3 flex items-center">
                        <Package className="w-4 h-4 mr-2" />
                        Change Product
                    </h4>

                    <Select onValueChange={changeProduct}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select product..." />
                        </SelectTrigger>
                        <SelectContent>
                            {products.map(product => (
                                <SelectItem key={product.slug} value={product.slug}>
                                    {product.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Card>
            )}
        </div>
    )
}
