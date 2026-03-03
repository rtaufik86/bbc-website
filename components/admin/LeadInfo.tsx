import { Card } from '@/components/ui/card'
import { Phone, Mail, Building2, Clock, User } from 'lucide-react'

export function LeadInfo({ lead }: { lead: any }) {
    const productNames: Record<string, string> = {
        serviced_office: 'Serviced Office',
        virtual_office: 'Virtual Office',
        meeting_room: 'Meeting Room',
        legal: 'Jasa Legalitas'
    }

    const timelineLabels: Record<string, string> = {
        immediate: '🔥 Segera',
        '1-4_weeks': '📅 1-4 minggu',
        '1-3_months': '📆 1-3 bulan',
        exploring: '🔍 Eksplorasi'
    }

    return (
        <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Lead Information</h3>

            <div className="space-y-4">
                <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm text-gray-600">WhatsApp</p>
                        <a
                            href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            {lead.whatsapp}
                        </a>
                    </div>
                </div>

                {lead.email && (
                    <div className="flex items-start space-x-3">
                        <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">Email</p>
                            <a
                                href={`mailto:${lead.email}`}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                {lead.email}
                            </a>
                        </div>
                    </div>
                )}

                <div className="flex items-start space-x-3">
                    <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm text-gray-600">Product</p>
                        <p className="font-medium">
                            {productNames[lead.product_type] || lead.product_type}
                        </p>
                    </div>
                </div>

                {lead.timeline && (
                    <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">Timeline</p>
                            <p className="font-medium">
                                {timelineLabels[lead.timeline] || lead.timeline}
                            </p>
                        </div>
                    </div>
                )}

                {lead.assigned_sales && (
                    <div className="flex items-start space-x-3">
                        <User className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">Assigned To</p>
                            <p className="font-medium">{lead.assigned_sales.email}</p>
                        </div>
                    </div>
                )}

                {lead.notes && (
                    <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600 mb-2">Notes</p>
                        <p className="text-gray-900">{lead.notes}</p>
                    </div>
                )}

                {lead.source_json?.utm_campaign && (
                    <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600 mb-2">Source</p>
                        <div className="text-sm space-y-1">
                            {lead.source_json.utm_source && (
                                <p><span className="text-gray-500">Source:</span> {lead.source_json.utm_source}</p>
                            )}
                            {lead.source_json.utm_campaign && (
                                <p><span className="text-gray-500">Campaign:</span> {lead.source_json.utm_campaign}</p>
                            )}
                            {lead.source_json.landing_page && (
                                <p><span className="text-gray-500">Page:</span> {lead.source_json.landing_page}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}
