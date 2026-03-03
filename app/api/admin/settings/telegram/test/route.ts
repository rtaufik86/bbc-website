import { NextRequest, NextResponse } from 'next/server'
import { sendTestNotification } from '@/lib/telegram/bot'

export async function POST(request: NextRequest) {
    try {
        const { chat_id } = await request.json()

        if (!chat_id) {
            return NextResponse.json({ success: false, error: 'Chat ID required' }, { status: 400 })
        }

        const result = await sendTestNotification(chat_id)

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Internal Error' }, { status: 500 })
    }
}
