import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
    try {
        const { user_id, chat_id } = await request.json()

        const supabase = createAdminClient()

        const { error } = await supabase
            .from('sales_profiles')
            .update({ telegram_chat_id: chat_id })
            .eq('user_id', user_id)

        if (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Internal Error' }, { status: 500 })
    }
}
