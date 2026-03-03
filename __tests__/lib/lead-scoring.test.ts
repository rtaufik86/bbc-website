import { describe, it, expect } from '@jest/globals'

// Mock implementation of lead scoring logic (should match server logic)
function calculateLeadScore(lead: any): number {
    let score = 0

    // Has WhatsApp (Mandatory usually, but adds score)
    if (lead.whatsapp) score += 30

    // Has Email
    if (lead.email) score += 10

    // Has Company Name
    if (lead.company_name) score += 15

    // Message length/Quality
    if (lead.message && lead.message.length > 50) score += 10

    // Timeline (Mapped from potential form fields)
    // Assuming 'timeline' field might exist in form
    const timelineScores: Record<string, number> = {
        immediate: 25,
        '1-4_weeks': 20,
        '1-3_months': 10,
        exploring: 5,
    }
    if (lead.timeline) score += timelineScores[lead.timeline] || 0

    // Product priority
    const productScores: Record<string, number> = {
        serviced_office: 20,
        virtual_office: 15,
        legal: 15,
        meeting_room: 10,
    }
    if (lead.product_type) score += productScores[lead.product_type] || 0

    return Math.min(score, 100)
}

describe('Lead Scoring', () => {
    it('should give base score for WhatsApp only', () => {
        const lead = {
            whatsapp: '+6281234567890',
        }

        expect(calculateLeadScore(lead)).toBe(30)
    })

    it('should calculate full score for complete lead', () => {
        const lead = {
            whatsapp: '+6281234567890',
            email: 'test@example.com',
            company_name: 'PT Test',
            message: 'Very interested in serviced office for our startup, need to move in ASAP',
            timeline: 'immediate',
            product_type: 'serviced_office',
        }

        // 30 + 10 + 15 + 10 + 25 + 20 = 110, capped at 100
        expect(calculateLeadScore(lead)).toBe(100)
    })

    it('should score hot lead high', () => {
        const lead = {
            whatsapp: '+6281234567890',
            email: 'test@example.com',
            timeline: 'immediate',
            product_type: 'serviced_office',
        }

        // 30 + 10 + 25 + 20 = 85
        expect(calculateLeadScore(lead)).toBe(85)
    })

    it('should score cold lead low', () => {
        const lead = {
            whatsapp: '+6281234567890',
            timeline: 'exploring',
            product_type: 'meeting_room',
        }

        // 30 + 5 + 10 = 45
        expect(calculateLeadScore(lead)).toBe(45)
    })
})
