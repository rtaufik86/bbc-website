import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
    const supabase = await createClient()

    // Check DB connection
    const { error } = await supabase.from('products').select('count').single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is JSON object requested, multiple (or no) rows returned - common with .single() on empty table
        return NextResponse.json({ status: 'error', database: 'disconnected', details: error.message }, { status: 500 })
    }

    return NextResponse.json({
        status: 'ok',
        database: 'connected',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    })
}
