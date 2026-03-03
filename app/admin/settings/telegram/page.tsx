'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Send } from 'lucide-react'

interface SalesProfile {
    user_id: string
    display_name: string
    telegram_chat_id: string | null
    is_active: boolean
}

export default function TelegramSettingsPage() {
    const [sales, setSales] = useState<SalesProfile[]>([])
    const [loading, setLoading] = useState(true)
    const [testResults, setTestResults] = useState<Record<string, any>>({})

    useEffect(() => {
        fetchSalesProfiles()
    }, [])

    async function fetchSalesProfiles() {
        try {
            const response = await fetch('/api/admin/settings/telegram/sales')
            const data = await response.json()
            setSales(data.sales || [])
        } catch (error) {
            console.error('Failed to fetch sales:', error)
        } finally {
            setLoading(false)
        }
    }

    async function testNotification(chatId: string, userId: string) {
        setTestResults(prev => ({ ...prev, [userId]: 'sending' }))

        try {
            const response = await fetch('/api/admin/settings/telegram/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId })
            })

            const result = await response.json()

            setTestResults(prev => ({
                ...prev,
                [userId]: result.success ? 'success' : 'error'
            }))

            setTimeout(() => {
                setTestResults(prev => ({ ...prev, [userId]: null }))
            }, 3000)
        } catch (error) {
            setTestResults(prev => ({ ...prev, [userId]: 'error' }))
        }
    }

    async function updateChatId(userId: string, newChatId: string) {
        try {
            await fetch('/api/admin/settings/telegram/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, chat_id: newChatId })
            })

            // Optimistic update
            setSales(prev => prev.map(s =>
                s.user_id === userId ? { ...s, telegram_chat_id: newChatId } : s
            ))
        } catch (error) {
            console.error('Failed to update:', error)
            fetchSalesProfiles() // Revert on error
        }
    }

    if (loading) {
        return <div className="p-8">Loading...</div>
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Telegram Settings</h1>
                <p className="text-gray-600 mt-2">
                    Manage Telegram notifications for sales team
                </p>
            </div>

            {/* Sales List */}
            <div className="space-y-4">
                {sales.map(s => (
                    <Card key={s.user_id} className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                    <h3 className="font-semibold text-lg">{s.display_name}</h3>
                                    {s.is_active ? (
                                        <Badge variant="default">Active</Badge>
                                    ) : (
                                        <Badge variant="secondary">Inactive</Badge>
                                    )}
                                    {s.telegram_chat_id ? (
                                        <Badge variant="outline" className="text-green-600 bg-green-50">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Connected
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-red-600 bg-red-50">
                                            <XCircle className="w-3 h-3 mr-1" />
                                            Not Connected
                                        </Badge>
                                    )}
                                </div>

                                <div className="mt-3 flex items-center space-x-3">
                                    <Input
                                        placeholder="Telegram Chat ID"
                                        value={s.telegram_chat_id || ''}
                                        onChange={(e) => updateChatId(s.user_id, e.target.value)}
                                        className="max-w-xs"
                                    />

                                    {s.telegram_chat_id && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => testNotification(s.telegram_chat_id!, s.user_id)}
                                            disabled={testResults[s.user_id] === 'sending'}
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                            Test
                                        </Button>
                                    )}
                                </div>

                                {testResults[s.user_id] && (
                                    <div className="mt-2">
                                        {testResults[s.user_id] === 'sending' && (
                                            <p className="text-sm text-gray-500">Sending...</p>
                                        )}
                                        {testResults[s.user_id] === 'success' && (
                                            <p className="text-sm text-green-600">✓ Test notification sent!</p>
                                        )}
                                        {testResults[s.user_id] === 'error' && (
                                            <p className="text-sm text-red-600">✗ Failed to send</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Setup Instructions */}
            <Card className="p-6 mt-8 bg-blue-50 border-blue-100">
                <h3 className="font-semibold mb-3 text-blue-900">Setup Instructions</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                    <li>Sales harus buka bot: <strong>@bbc_sales_bot</strong> (atau nama bot Anda)</li>
                    <li>Klik "Start" atau kirim <code>/start</code></li>
                    <li>Kirim pesan apapun (misal: "Hi")</li>
                    <li>Admin jalankan script system untuk dapat chat_id (atau minta sales kirim ID dari @userinfobot)</li>
                    <li>Masukkan chat_id di form di atas</li>
                    <li>Klik "Test" untuk verifikasi</li>
                </ol>
            </Card>
        </div>
    )
}
