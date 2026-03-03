import { requireRole } from '@/lib/auth/server'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Users, Webhook, Shield } from 'lucide-react'

export default async function SettingsPage() {
    await requireRole(['owner', 'admin'])

    const settingsSections = [
        {
            title: 'Team Management',
            description: 'Manage users, roles, and permissions',
            icon: Users,
            href: '/admin/settings/team',
            color: 'text-blue-600'
        },
        {
            title: 'Integrations',
            description: 'Configure Meta Ads, Telegram, and more',
            icon: Webhook,
            href: '/admin/settings/integrations',
            color: 'text-purple-600'
        },
        {
            title: 'Security',
            description: 'Audit logs and security settings',
            icon: Shield,
            href: '/admin/settings/security',
            color: 'text-green-600'
        }
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500">Manage organization settings and configurations</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {settingsSections.map((section) => {
                    const Icon = section.icon
                    return (
                        <Link key={section.title} href={section.href}>
                            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer h-full">
                                <div className="flex items-start space-x-4">
                                    <div className={`p-3 rounded-lg bg-gray-50 ${section.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{section.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
