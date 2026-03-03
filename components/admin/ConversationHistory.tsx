import { Card } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'

export function ConversationHistory({ conversation, messages }: { conversation: any; messages: any[] }) {
    return (
        <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Conversation History</h3>

            <div className="space-y-4">
                {messages
                    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                    .map(msg => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg px-4 py-3 ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-900'
                                    }`}
                            >
                                <p className="text-sm font-medium mb-1">
                                    {msg.role === 'user' ? 'User' : 'AI Assistant'}
                                </p>
                                <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                                <p className="text-xs opacity-70 mt-2">
                                    {formatDistanceToNow(new Date(msg.created_at), {
                                        addSuffix: true,
                                        locale: idLocale
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </Card>
    )
}
