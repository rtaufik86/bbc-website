import { describe, it, expect } from '@jest/globals'

// Logic extracted from implementation/specs
function normalizePhone(phone: string): string {
    let cleaned = phone.replace(/\D/g, '')
    if (cleaned.startsWith('0')) {
        cleaned = '62' + cleaned.slice(1)
    } else if (!cleaned.startsWith('62')) {
        cleaned = '62' + cleaned
    }
    return '+' + cleaned
}

function isWithinDedupWindow(createdAt: Date, now: Date, windowDays: number): boolean {
    const diffMs = now.getTime() - createdAt.getTime()
    const diffDays = diffMs / (1000 * 60 * 60 * 24)
    return diffDays <= windowDays
}

describe('Lead Deduplication Logic', () => {
    it('should normalize phone numbers correctly', () => {
        const phones = [
            '+6281234567890',
            '081234567890',
            '62 812 3456 7890',
            '+62-812-3456-7890',
        ]

        const normalized = phones.map(normalizePhone)

        // All should normalize to same format
        expect(new Set(normalized).size).toBe(1)
        expect(normalized[0]).toBe('+6281234567890')
    })

    it('should check dedup window correctly', () => {
        const now = new Date()
        const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

        // Virtual office: 7 day window
        expect(isWithinDedupWindow(dayAgo, now, 7)).toBe(true)
        expect(isWithinDedupWindow(weekAgo, now, 7)).toBe(false)

        // Meeting room: 3 day window
        expect(isWithinDedupWindow(dayAgo, now, 3)).toBe(true)
        expect(isWithinDedupWindow(new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000), now, 3)).toBe(false)
    })
})
