import { Metadata } from 'next'
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'

export const metadata: Metadata = {
    title: 'Set New Password - BBC Admin',
    description: 'Set your new password'
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Set New Password
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Please enter your new password below.
                    </p>
                </div>

                <ResetPasswordForm />
            </div>
        </div>
    )
}
