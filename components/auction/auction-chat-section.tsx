'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sendAuctionChatMessage } from '@/app/actions/collectium'
import { MessageCircle, Send, Loader2 } from 'lucide-react'
import type { AuctionChat, User } from '@/lib/db/schema'
import Link from 'next/link'

interface AuctionChatSectionProps {
  auctionId: number
  messages: (AuctionChat & { user: User | null })[]
  isLoggedIn: boolean
}

export function AuctionChatSection({ auctionId, messages, isLoggedIn }: AuctionChatSectionProps) {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!message.trim()) return
    setLoading(true)

    try {
      await sendAuctionChatMessage(auctionId, message)
      setMessage('')
      router.refresh()
    } catch (err) {
      console.error('Failed to send message:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-6 rounded-xl bg-card border border-border">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Auksjonschat</h3>
        <span className="text-sm text-muted-foreground">({messages.length} meldinger)</span>
      </div>

      {/* Messages */}
      <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
        {messages.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Ingen meldinger enna. Vaer den forste til a skrive!
          </p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-primary">
                  {msg.user?.name?.charAt(0).toUpperCase() ?? '?'}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground text-sm">
                    {msg.user?.name ?? 'Ukjent'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {msg.createdAt.toLocaleTimeString('nb-NO', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{msg.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      {isLoggedIn ? (
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Skriv en melding..."
            className="bg-background"
          />
          <Button 
            onClick={handleSend}
            disabled={loading || !message.trim()}
            size="icon"
            className="bg-primary text-primary-foreground"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      ) : (
        <div className="text-center py-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">
            Logg inn for a delta i chatten
          </p>
          <Link href="/sign-in">
            <Button size="sm" variant="outline">Logg inn</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
