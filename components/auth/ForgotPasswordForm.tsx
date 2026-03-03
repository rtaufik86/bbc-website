'use client'

import { useState } from 'react'
import { resetPassword } from '@/lib/auth/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function ForgotPasswordForm() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setSuccess(false)
        setIsLoading(true)

        try {
            await resetPassword(email)
            setSuccess(true)
        } catch (error: any) {
            console.error('Reset password error:', error)
            setError(error.message || 'Failed to send reset email')
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <div className="bg-white p-8 rounded-lg shadow space-y-4">
                <Alert className="bg-green-50 text-green-800 border-green-200">
                    <AlertDescription>
                        Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
                    </AlertDescription>
                </Alert>
                <Link
                    href="/login"
                    className="block w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    Return to login
                </Link>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow">
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                    placeholder="you@example.com"
                />
                <p className="mt-2 text-sm text-gray-500">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>

            <div className="space-y-3">
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending link...
                        </>
                    ) : (
                        'Send reset link'
                    )}
                </Button>

                <Link
                    href="/login"
                    className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to login
                </Link>
            </div>
        </form>
    )
}
