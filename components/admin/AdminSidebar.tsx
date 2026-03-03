'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    Home,
    Users,
    MessageSquare,
    BarChart3,
    Settings,
    User,
    Package
} from 'lucide-react'

interface AdminSidebarProps {
    role: string
}

interface NavItem {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    roles: string[] // Which roles can see this
}

const navItems: NavItem[] = [
    {
        label: 'Dashboard',
        href: '/admin',
        icon: Home,
        roles: ['owner', 'admin', 'sales', 'ops']
    },
    {
        label: 'Leads',
        href: '/admin/leads',
        icon: Users,
        roles: ['owner', 'admin', 'sales']
    },
    {
        label: 'Conversations',
        href: '/admin/conversations',
        icon: MessageSquare,
        roles: ['owner', 'admin', 'sales']
    },
    {
        label: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart3,
        roles: ['owner', 'admin']
    },
    {
        label: 'Sales Team',
        href: '/admin/sales',
        icon: User,
        roles: ['owner', 'admin']
    },
    {
        label: 'Products',
        href: '/admin/products',
        icon: Package,
        roles: ['owner', 'admin']
    },
    {
        label: 'Settings',
        href: '/admin/settings',
        icon: Settings,
        roles: ['owner', 'admin']
    }
]

export function AdminSidebar({ role }: AdminSidebarProps) {
    const pathname = usePathname()

    const allowedItems = navItems.filter(item =>
        item.roles.includes(role)
    )

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
            <nav className="space-y-2">
                {allowedItems.map(item => {
                    const Icon = item.icon
                    const isActive = pathname === item.href ||
                        (item.href !== '/admin' && pathname.startsWith(item.href))

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                                isActive
                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
