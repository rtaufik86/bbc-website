import { requireRole } from '@/lib/auth/server'
import { Card } from '@/components/ui/card'

export default async function SalesPerformancePage() {
    await requireRole(['owner', 'admin'])

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Sales Performance</h1>
                <p className="text-gray-500">Overview of sales team performance</p>
            </div>

            <Card className="p-12 text-center text-gray-500">
                <p>Sales analytics dashboard coming soon...</p>
            </Card>
        </div>
    )
}
