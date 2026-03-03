import { Lead } from '@/lib/types'
import { TelegramMessage, NotificationResult } from './types'

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID

/**
 * Send message to Telegram
 */
async function sendTelegramMessage(
    message: TelegramMessage
): Promise<NotificationResult> {
    if (!BOT_TOKEN) {
        console.error('Telegram bot token not configured')
        return { success: false, error: 'Bot token not configured' }
    }

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(message)
            }
        )

        const data = await response.json()

        if (!data.ok) {
            console.error('Telegram API error:', data)

            // Handle specific errors
            if (data.error_code === 403) {
                return { success: false, error: 'Bot blocked by user' }
            } else if (data.error_code === 429) {
                return { success: false, error: 'Rate limit exceeded' }
            }

            return { success: false, error: data.description }
        }

        return {
            success: true,
            message_id: data.result.message_id
        }
    } catch (error) {
        console.error('Failed to send Telegram message:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

/**
 * Format lead data for notification
 */
function formatLeadMessage(lead: Lead, type: 'new' | 'updated' | 'reassigned'): string {
    const emoji = {
        new: '🆕',
        updated: '🔄',
        reassigned: '➡️'
    }

    const title = {
        new: 'Lead Baru',
        updated: 'Lead Kembali',
        reassigned: 'Lead Dialihkan'
    }

    // Product name mapping
    const productNames: Record<string, string> = {
        serviced_office: 'Serviced Office',
        virtual_office: 'Virtual Office',
        meeting_room: 'Meeting Room',
        legal: 'Jasa Legalitas'
    }

    // Lead score badge
    let scoreBadge = '⚪️'
    if (lead.lead_score >= 80) scoreBadge = '🔴' // Hot
    else if (lead.lead_score >= 50) scoreBadge = '🟡' // Warm
    else scoreBadge = '🔵' // Cold

    let message = `${emoji[type]} <b>${title[type]}</b>\n\n`

    message += `👤 <b>Nama:</b> ${lead.name}\n`
    message += `📱 <b>WhatsApp:</b> ${lead.whatsapp}\n`

    if (lead.email) {
        message += `📧 <b>Email:</b> ${lead.email}\n`
    }

    message += `🏢 <b>Produk:</b> ${productNames[lead.product_type] || lead.product_type}\n`
    message += `${scoreBadge} <b>Score:</b> ${lead.lead_score}/100\n`

    if (lead.timeline) {
        const timelineText: Record<string, string> = {
            immediate: '🔥 Segera',
            '1-4_weeks': '📅 1-4 minggu',
            '1-3_months': '📆 1-3 bulan',
            exploring: '🔍 Masih eksplorasi'
        }
        message += `⏰ <b>Timeline:</b> ${timelineText[lead.timeline] || lead.timeline}\n`
    }

    if (lead.notes) {
        const truncated = lead.notes.length > 100
            ? lead.notes.substring(0, 100) + '...'
            : lead.notes
        message += `\n💬 <b>Pesan:</b>\n<i>${truncated}</i>\n`
    }

    // Source info
    if (lead.source_json) {
        const source = lead.source_json as any
        if (source.utm_campaign) {
            message += `\n🎯 <b>Campaign:</b> ${source.utm_campaign}`
        }
    }

    return message
}

/**
 * Create action buttons
 */
function createActionButtons(lead: Lead, baseUrl: string) {
    // WhatsApp link with pre-filled message
    const waMessage = encodeURIComponent(
        `Halo ${lead.name}, terima kasih telah menghubungi Bintaro Business Center. Saya dari tim kami, ada yang bisa saya bantu? 😊`
    )
    const waUrl = `https://wa.me/${lead.whatsapp.replace(/\D/g, '')}?text=${waMessage}`

    // CRM deep link
    const crmUrl = `${baseUrl}/admin/leads/${lead.id}`

    return {
        inline_keyboard: [
            [
                { text: '💬 Chat WhatsApp', url: waUrl },
                { text: '📊 Buka CRM', url: crmUrl }
            ]
        ]
    }
}

/**
 * Send new lead notification to sales
 */
export async function sendNewLeadNotification(
    lead: Lead,
    salesChatId: string
): Promise<NotificationResult> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const message: TelegramMessage = {
        chat_id: salesChatId,
        text: formatLeadMessage(lead, 'new'),
        parse_mode: 'HTML',
        reply_markup: createActionButtons(lead, baseUrl)
    }

    const result = await sendTelegramMessage(message)

    // If failed, try sending to admin as fallback
    if (!result.success && ADMIN_CHAT_ID) {
        console.log('Failed to send to sales, trying admin fallback')

        const adminMessage: TelegramMessage = {
            chat_id: ADMIN_CHAT_ID,
            text: `⚠️ <b>Gagal kirim ke sales</b>\n\n${message.text}\n\n<i>Error: ${result.error}</i>`,
            parse_mode: 'HTML',
            reply_markup: message.reply_markup
        }

        await sendTelegramMessage(adminMessage)
    }

    return result
}

/**
 * Send lead updated notification
 */
export async function sendLeadUpdatedNotification(
    lead: Lead,
    salesChatId: string
): Promise<NotificationResult> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const message: TelegramMessage = {
        chat_id: salesChatId,
        text: formatLeadMessage(lead, 'updated'),
        parse_mode: 'HTML',
        reply_markup: createActionButtons(lead, baseUrl)
    }

    return sendTelegramMessage(message)
}

/**
 * Send lead reassignment notification
 */
export async function sendReassignmentNotification(
    lead: Lead,
    newSalesChatId: string,
    oldSalesName?: string
): Promise<NotificationResult> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    let message = formatLeadMessage(lead, 'reassigned')

    if (oldSalesName) {
        message += `\n\n<i>Dialihkan dari: ${oldSalesName}</i>`
    }

    const telegramMessage: TelegramMessage = {
        chat_id: newSalesChatId,
        text: message,
        parse_mode: 'HTML',
        reply_markup: createActionButtons(lead, baseUrl)
    }

    return sendTelegramMessage(telegramMessage)
}

/**
 * Send follow-up reminder to sales
 */
export async function sendFollowUpReminder(
    lead: Lead,
    salesChatId: string,
    hoursSinceCreated: number
): Promise<NotificationResult> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const message = `⏰ <b>Reminder: Lead Belum Di-Follow-Up</b>\n\n` +
        `Lead sudah ${hoursSinceCreated} jam belum dihubungi:\n\n` +
        `👤 ${lead.name}\n` +
        `📱 ${lead.whatsapp}\n` +
        `🏢 ${lead.product_type}\n` +
        `📊 Score: ${lead.lead_score}/100\n\n` +
        `<i>Segera follow-up untuk meningkatkan conversion rate!</i>`

    const telegramMessage: TelegramMessage = {
        chat_id: salesChatId,
        text: message,
        parse_mode: 'HTML',
        reply_markup: createActionButtons(lead, baseUrl)
    }

    return sendTelegramMessage(telegramMessage)
}

/**
 * Send test notification (for setup verification)
 */
export async function sendTestNotification(
    chatId: string
): Promise<NotificationResult> {
    const message: TelegramMessage = {
        chat_id: chatId,
        text: '✅ <b>Test Notification</b>\n\nBot berhasil terhubung! Anda akan menerima notifikasi lead di sini.',
        parse_mode: 'HTML'
    }

    return sendTelegramMessage(message)
}

/**
 * Batch send to multiple sales (for testing/admin)
 */
export async function sendBulkNotification(
    chatIds: string[],
    message: string
): Promise<{ success: number; failed: number }> {
    let success = 0
    let failed = 0

    for (const chatId of chatIds) {
        const result = await sendTelegramMessage({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })

        if (result.success) {
            success++
        } else {
            failed++
        }

        // Rate limiting: wait 50ms between messages
        await new Promise(resolve => setTimeout(resolve, 50))
    }

    return { success, failed }
}
