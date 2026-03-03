import { Metadata } from 'next'
import { SignupForm } from '@/components/auth/SignupForm'
import { getUserWithOrg } from '@/lib/auth/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Sign Up - BBC Admin',
    description: 'Create your BBC CRM account'
}

export default async function SignupPage() {
    const userWithOrg = await getUserWithOrg()

    if (userWithOrg) {
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
                        Create your account
                    </h2>
                </div>

                <SignupForm />

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
