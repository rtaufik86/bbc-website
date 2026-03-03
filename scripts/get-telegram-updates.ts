// Simple script to see who messaged your bot
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN

if (!BOT_TOKEN) {
    console.error('Please set TELEGRAM_BOT_TOKEN in environment variables')
    process.exit(1)
}

async function getUpdates() {
    try {
        const response = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`
        )

        const data = await response.json()

        if (!data.ok) {
            console.error('API Error:', data)
            return
        }

        console.log('Recent messages to bot:')
        data.result.forEach((update: any) => {
            if (update.message) {
                console.log({
                    chat_id: update.message.chat.id,
                    username: update.message.from.username,
                    first_name: update.message.from.first_name,
                    text: update.message.text
                })
            }
        })
    } catch (error) {
        console.error('Failed to get updates:', error)
    }
}

getUpdates()
