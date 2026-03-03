import { Metadata } from 'next'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'
import { getSession } from '@/lib/auth/server'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Forgot Password - BBC Admin',
    description: 'Reset your password'
}

export default async function ForgotPasswordPage() {
    const session = await getSession()

    if (session) {
        redirect('/admin')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Bintaro Business Center
                    </h1>
                    <h2 className="mt-6 text-2xl font-semibold text-gray-700">
                        Reset Password
                    </h2>
                </div>

                <ForgotPasswordForm />
            </div>
        </div>
    )
}
