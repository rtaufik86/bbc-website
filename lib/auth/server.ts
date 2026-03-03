import { cookies } from 'next/headers'
import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const createServerClient = cache(async () => {
    const cookieStore = await cookies()

    return createSupabaseServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: any) {
                    try {
                        cookieStore.set({ name, value, ...options })
                    } catch (error) {
                        // The `set` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
                remove(name: string, options: any) {
                    try {
                        cookieStore.set({ name, value: '', ...options })
                    } catch (error) {
                        // The `remove` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
})

/**
 * Get current session (returns null if not authenticated)
 */
export async function getSession() {
    const supabase = await createServerClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session
}

/**
 * Get current user (returns null if not authenticated)
 */
export async function getUser() {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

/**
 * Get user with org membership and role
 */
export async function getUserWithOrg() {
    const user = await getUser()
    if (!user) return null

    const supabase = await createServerClient()

    const { data: orgMember } = await supabase
        .from('org_members')
        .select(`
      *,
      organizations(*)
    `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single()

    if (!orgMember) return null

    return {
        user,
        orgMember,
        org: orgMember.organizations,
        role: orgMember.role
    }
}

/**
 * Require authentication (redirect to login if not authenticated)
 */
export async function requireAuth() {
    const session = await getSession()

    if (!session) {
        redirect('/login')
    }

    return session
}

/**
 * Require specific role (redirect if insufficient permission)
 */
export async function requireRole(allowedRoles: string[]) {
    const userWithOrg = await getUserWithOrg()

    if (!userWithOrg) {
        redirect('/login')
    }

    if (!allowedRoles.includes(userWithOrg.role)) {
        redirect('/admin') // Redirect to dashboard if insufficient permission
    }

    return userWithOrg
}

/**
 * Check if user has permission
 */
export async function hasPermission(requiredRole: string): Promise<boolean> {
    const userWithOrg = await getUserWithOrg()

    if (!userWithOrg) return false

    const roleHierarchy: Record<string, number> = {
        owner: 4,
        admin: 3,
        sales: 2,
        ops: 1
    }

    return (roleHierarchy[userWithOrg.role] || 0) >= (roleHierarchy[requiredRole] || 0)
}
