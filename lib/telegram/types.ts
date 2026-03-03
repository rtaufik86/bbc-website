export interface TelegramMessage {
    chat_id: string
    text: string
    parse_mode?: 'Markdown' | 'HTML'
    reply_markup?: {
        inline_keyboard: Array<Array<{
            text: string
            url?: string
            callback_data?: string
        }>>
    }
}

export interface NotificationResult {
    success: boolean
    message_id?: number
    error?: string
}

export interface TelegramNotificationLog {
    id: string
    lead_id: string
    sales_user_id: string
    chat_id: string
    message_type: 'new_lead' | 'updated' | 'reassigned' | 'reminder'
    success: boolean
    error_message?: string
    telegram_message_id?: number
    created_at: Date
}
