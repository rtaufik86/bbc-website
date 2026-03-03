import { Card } from '@/components/ui/card'
import { ChangePasswordForm } from '@/components/account/ChangePasswordForm'
import { getUserWithOrg } from '@/lib/auth/server'

export const metadata = {
    title: 'My Account - BBC Admin',
}

export default async function AccountPage() {
    const userWithOrg = await getUserWithOrg()

    if (!userWithOrg) return null

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
                <p className="text-gray-500">Manage your account settings</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Full Name</label>
                            <p className="text-gray-900">{userWithOrg.user.user_metadata?.full_name || 'Not set'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Email Address</label>
                            <p className="text-gray-900">{userWithOrg.user.email}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Role</label>
                            <p className="text-gray-900 capitalize">{userWithOrg.role}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Organization</label>
                            <p className="text-gray-900">{userWithOrg.org.name}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                    <ChangePasswordForm />
                </Card>
            </div>
        </div>
    )
}
