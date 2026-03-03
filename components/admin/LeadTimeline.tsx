import { formatDistanceToNow } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { Card } from '@/components/ui/card'
import {
    MessageSquare,
    UserCheck,
    FileText,
    Package,
    TrendingUp
} from 'lucide-react'

const activityIcons: Record<string, any> = {
    note: MessageSquare,
    assignment: UserCheck,
    status_change: TrendingUp,
    product_change: Package,
    default: FileText
}

export function LeadTimeline({ activities }: { activities: any[] }) {
    return (
        <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Activity Timeline</h3>

            {activities.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No activities yet</p>
            ) : (
                <div className="space-y-4">
                    {activities.map(activity => {
                        const Icon = activityIcons[activity.type] || activityIcons.default

                        return (
                            <div key={activity.id} className="flex space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Icon className="w-4 h-4 text-blue-600" />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900">
                                        {activity.title}
                                    </p>

                                    {activity.description && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            {activity.description}
                                        </p>
                                    )}

                                    <p className="text-xs text-gray-500 mt-1">
                                        {formatDistanceToNow(new Date(activity.created_at), {
                                            addSuffix: true,
                                            locale: idLocale
                                        })}
                                        {activity.created_by_user && (
                                            <> by {activity.created_by_user.email}</>
                                        )}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </Card>
    )
}
