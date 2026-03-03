import { getUserWithOrg } from './server'

// Role hierarchy definition
export const ROLE_HIERARCHY = {
    owner: 4,
    admin: 3,
    sales: 2,
    ops: 1,
} as const

export type Role = keyof typeof ROLE_HIERARCHY

/**
 * Check if the user's role meets the required role level
 */
export async function hasPermission(requiredRole: Role): Promise<boolean> {
    const userWithOrg = await getUserWithOrg()

    if (!userWithOrg) return false

    const userRoleLevel = ROLE_HIERARCHY[userWithOrg.role as Role] || 0
    const requiredRoleLevel = ROLE_HIERARCHY[requiredRole] || 0

    return userRoleLevel >= requiredRoleLevel
}

/**
 * Check if user is allowed to access specific resource
 * Can be extended with resource-specific logic
 */
export async function canAccess(resource: string, action: 'read' | 'write' | 'delete'): Promise<boolean> {
    const userWithOrg = await getUserWithOrg()
    if (!userWithOrg) return false

    const { role } = userWithOrg

    // Owner/Admin can do anything
    if (['owner', 'admin'].includes(role)) return true

    // Sales specific logic
    if (role === 'sales') {
        // Sales can only access their own leads (handled in query usually)
        // But for global resources:
        if (resource === 'settings' || resource === 'analytics') return false
        return true
    }

    return false
}
