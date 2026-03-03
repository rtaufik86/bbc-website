import { createAdminClient } from '@/lib/supabase/admin'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID!
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN!
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE
const IS_TEST_MODE = process.env.CAPI_TEST_MODE === 'true'

interface CapiEvent {
    eventName: string
    eventId: string
    eventTime: number // unix timestamp
    userData: {
        em?: string // hashed email
        ph?: string // hashed phone
        fbp?: string
        fbc?: string
        client_ip_address?: string
        client_user_agent?: string
    }
    customData?: Record<string, any>
    sourceUrl: string
}

export async function sendCapiEvent(event: CapiEvent) {
    if (!PIXEL_ID || !ACCESS_TOKEN) {
        console.warn('Meta Pixel ID or Access Token missing')
        return null
    }

    const payload = {
        data: [
            {
                event_name: event.eventName,
                event_time: event.eventTime,
                event_id: event.eventId,
                event_source_url: event.sourceUrl,
                action_source: 'website',
                user_data: event.userData,
                custom_data: event.customData,
            },
        ],
        ...(IS_TEST_MODE && TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
    }

    try {
        const response = await fetch(`https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })

        const result = await response.json()

        // Log to DB
        await logEventToDb(event, result, response.ok)

        return result
    } catch (error) {
        console.error('CAPI Error:', error)
        await logEventToDb(event, { error: String(error) }, false)
        return null
    }
}

async function logEventToDb(event: CapiEvent, response: any, success: boolean) {
    try {
        const supabase = createAdminClient()

        await supabase.from('events').insert({
            event_name: event.eventName,
            event_id: event.eventId,
            event_time: new Date(event.eventTime * 1000).toISOString(),
            user_data_json: event.userData,
            custom_data_json: event.customData || {},
            source_url: event.sourceUrl,
            capi_sent: true, // Attempted
            capi_response_json: response,
            error_message: success ? null : JSON.stringify(response)
        })
    } catch (dbError) {
        console.error('Failed to log event to DB:', dbError)
    }
}
