import { createClient } from '@supabase/supabase-js'

export function createMockSupabaseClient() {
    return {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis(),
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockReturnThis(),
        rpc: jest.fn(),
        auth: {
            getSession: jest.fn(),
            getUser: jest.fn(),
            signInWithPassword: jest.fn(),
            signOut: jest.fn(),
        },
    }
}

export const mockLead = {
    id: 'test-lead-123',
    org_id: 'test-org-123',
    name: 'Test User',
    whatsapp: '+6281234567890',
    email: 'test@example.com',
    product_type: 'virtual_office',
    stage: 'new',
    lead_score: 75,
    assigned_to: 'test-sales-123',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
}

export const mockOrgMember = {
    id: 'test-member-123',
    org_id: 'test-org-123',
    user_id: 'test-user-123',
    role: 'admin',
    is_active: true,
}

export function mockApiRequest(method: string, body?: any) {
    return new Request('http://localhost:3000/api/test', {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    })
}
