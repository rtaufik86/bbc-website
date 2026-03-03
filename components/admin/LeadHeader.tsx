import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function LeadHeader({ lead }: { lead: any }) {
    const stageColors: Record<string, string> = {
        new: 'bg-blue-100 text-blue-800',
        contacted: 'bg-yellow-100 text-yellow-800',
        qualified: 'bg-green-100 text-green-800',
        proposal: 'bg-purple-100 text-purple-800',
        negotiation: 'bg-orange-100 text-orange-800',
        won: 'bg-green-500 text-white',
        lost: 'bg-gray-300 text-gray-700'
    }

    const scoreColor = (score: number) => {
        if (score >= 80) return 'bg-red-50 text-red-700 border-red-200'
        if (score >= 50) return 'bg-yellow-50 text-yellow-700 border-yellow-200'
        return 'bg-blue-50 text-blue-700 border-blue-200'
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <Link
                        href="/admin/leads"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Leads
                    </Link>

                    <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>

                    <div className="flex items-center space-x-3 mt-3">
                        <Badge className={stageColors[lead.stage] || ''}>
                            {lead.stage.toUpperCase()}
                        </Badge>

                        <Badge variant="outline" className={scoreColor(lead.lead_score)}>
                            Score: {lead.lead_score}/100
                        </Badge>

                        <span className="text-sm text-gray-500">
                            Created {formatDistanceToNow(new Date(lead.created_at), {
                                addSuffix: true,
                                locale: idLocale
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
