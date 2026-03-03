export interface Product {
    id: string
    org_id: string
    name: string
    slug: string
    description: string | null
    dedup_window_days: number
    pricing_tiers_json: PricingTier[]
    is_active: boolean
    display_order: number
}

export interface PricingTier {
    duration: string
    price: number
    features?: string[]
}

export interface LeadFormData {
    name: string
    whatsapp: string
    email?: string
    product_type: string
    message?: string
}

export interface FAQ {
    question: string
    answer: string
}

export interface LeadSubmission {
    name: string
    whatsapp: string
    email?: string
    product_type: string
    message?: string
    source_json?: {
        utm_source?: string
        utm_medium?: string
        utm_campaign?: string
        utm_content?: string
        utm_term?: string
        fbp?: string
        fbc?: string
        landing_page?: string
        referrer?: string
    }
}

export interface Lead {
    id: string
    created_at: string
    org_id: string
    name: string
    whatsapp: string
    email?: string | null
    product_type: string
    notes?: string | null
    source_json?: Record<string, any> | null
    status?: string // deprecated, use stage
    stage?: string
    lead_score: number
    timeline?: string | null
    assigned_to?: string | null
    is_hot_lead?: boolean
}
