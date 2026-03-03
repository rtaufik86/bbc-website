import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
    const supabase = await createClient()

    // In a real app, verify admin role here

    const { data: sales, error } = await supabase
        .from('sales_profiles')
        .select('user_id, display_name, telegram_chat_id, is_active')
        .order('display_name')

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ sales })
}
