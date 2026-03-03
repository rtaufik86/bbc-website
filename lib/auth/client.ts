'use client'

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

export async function signIn(email: string, password: string) {
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) throw error

    return data
}

export async function signOut() {
    const supabase = createClient()

    const { error } = await supabase.auth.signOut()

    if (error) throw error
}

export async function resetPassword(email: string) {
    const supabase = createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
    })

    if (error) throw error
}

export async function updatePassword(newPassword: string) {
    const supabase = createClient()

    const { error } = await supabase.auth.updateUser({
        password: newPassword
    })

    if (error) throw error
}
