import { redirect } from 'next/navigation'
import { getUserWithOrg } from '@/lib/auth/server'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

export const metadata = {
    title: 'CRM - BBC Admin',
    description: 'Lead and customer management system'
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const userWithOrg = await getUserWithOrg()

    if (!userWithOrg) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <AdminHeader
                user={userWithOrg.user}
                org={userWithOrg.org}
                role={userWithOrg.role}
            />

            <div className="flex flex-1">
                <AdminSidebar role={userWithOrg.role} />

                <main className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-73px)]">
                    {children}
                </main>
            </div>
        </div>
    )
}
