'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Phone, Mail } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

interface Lead {
    id: string
    name: string
    whatsapp: string
    email: string | null
    product_type: string
    stage: string
    lead_score: number
    assigned_to: string | null
    created_at: string
    assigned_sales?: { email: string }
    products?: { name: string }
}

interface LeadsTableProps {
    leads: Lead[]
    currentPage: number
    totalPages: number
    isAdmin: boolean
}

export function LeadsTable({
    leads,
    currentPage,
    totalPages,
    isAdmin
}: LeadsTableProps) {
    const stageColors: Record<string, string> = {
        new: 'bg-blue-100 text-blue-800',
        contacted: 'bg-yellow-100 text-yellow-800',
        qualified: 'bg-green-100 text-green-800',
        proposal: 'bg-purple-100 text-purple-800',
        negotiation: 'bg-orange-100 text-orange-800',
        won: 'bg-green-500 text-white',
        lost: 'bg-gray-300 text-gray-700',
        junk: 'bg-red-100 text-red-800'
    }

    const scoreColor = (score: number) => {
        if (score >= 80) return 'text-red-600 font-bold' // Hot
        if (score >= 50) return 'text-yellow-600 font-semibold' // Warm
        return 'text-blue-600' // Cold
    }

    if (leads.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-gray-500">No leads found</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Stage</TableHead>
                        {isAdmin && <TableHead>Assigned To</TableHead>}
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leads.map(lead => (
                        <TableRow key={lead.id}>
                            <TableCell className="font-medium">
                                <Link
                                    href={`/admin/leads/${lead.id}`}
                                    className="hover:text-blue-600 hover:underline"
                                >
                                    {lead.name}
                                </Link>
                            </TableCell>

                            <TableCell>
                                <div className="flex flex-col space-y-1">
                                    <a
                                        href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-sm text-gray-600 hover:text-green-600"
                                    >
                                        <Phone className="w-3 h-3 mr-1" />
                                        {lead.whatsapp}
                                    </a>
                                    {lead.email && (
                                        <a
                                            href={`mailto:${lead.email}`}
                                            className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                                        >
                                            <Mail className="w-3 h-3 mr-1" />
                                            {lead.email}
                                        </a>
                                    )}
                                </div>
                            </TableCell>

                            <TableCell>
                                <span className="text-sm">
                                    {lead.products?.name || lead.product_type}
                                </span>
                            </TableCell>

                            <TableCell>
                                <span className={`text-lg ${scoreColor(lead.lead_score)}`}>
                                    {lead.lead_score}
                                </span>
                            </TableCell>

                            <TableCell>
                                <Badge className={stageColors[lead.stage] || ''}>
                                    {lead.stage}
                                </Badge>
                            </TableCell>

                            {isAdmin && (
                                <TableCell className="text-sm text-gray-600">
                                    {/* Safely handle if assigned_sales relation is null/undefined */}
                                    {lead.assigned_sales?.email || 'Unassigned'}
                                </TableCell>
                            )}

                            <TableCell className="text-sm text-gray-600">
                                {formatDistanceToNow(new Date(lead.created_at), {
                                    addSuffix: true,
                                    locale: idLocale
                                })}
                            </TableCell>

                            <TableCell className="text-right">
                                <Link href={`/admin/leads/${lead.id}`}>
                                    <Button variant="ghost" size="sm">
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t">
                    <p className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </p>

                    <div className="flex space-x-2">
                        <Link
                            href={`/admin/leads?page=${currentPage - 1}`}
                            className={currentPage <= 1 ? 'pointer-events-none' : ''}
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage <= 1}
                            >
                                Previous
                            </Button>
                        </Link>

                        <Link href={`/admin/leads?page=${currentPage + 1}`}>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage >= totalPages}
                            >
                                Next
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
