import { describe, it, expect, jest } from '@jest/globals'
import { POST } from '@/app/api/leads/route'
import { mockApiRequest } from '../utils/test-helpers'

// Mock dependencies
// We mock the admin client creator to return our mocked Supabase chain
jest.mock('@/lib/supabase/admin', () => ({
    createAdminClient: jest.fn(() => ({
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
            data: { id: 'test-org-123' },
            error: null,
        }),
        rpc: jest.fn().mockResolvedValue({
            data: null, // rpc usually returns void or data, null is safe mock for assignment
            error: null,
        }),
    })),
}))

// Mock console.error to avoid noise
global.console.error = jest.fn()

describe('POST /api/leads', () => {
    it('should create new lead with valid data', async () => {
        const requestBody = {
            name: 'Test User',
            whatsapp: '+6281234567890',
            email: 'test@example.com',
            product_type: 'virtual_office',
            consent: true,
        }

        const request = mockApiRequest('POST', requestBody)
        const response = await POST(request as any)
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data.success).toBe(true)
        expect(data.lead_id).toBeDefined()
    })

    it('should validate required fields', async () => {
        const requestBody = {
            name: 'Test User',
            // Missing whatsapp
            product_type: 'virtual_office',
        }

        const request = mockApiRequest('POST', requestBody)
        const response = await POST(request as any)

        expect(response.status).toBe(400)
    })

    it('should validate phone format', async () => {
        const requestBody = {
            name: 'Test User',
            whatsapp: 'invalid-phone', // triggers refine check
            product_type: 'virtual_office',
            consent: true,
        }

        const request = mockApiRequest('POST', requestBody)
        const response = await POST(request as any)

        expect(response.status).toBe(400)
    })
})
