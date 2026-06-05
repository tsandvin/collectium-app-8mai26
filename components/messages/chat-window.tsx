'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sendDirectMessage } from '@/app/actions/collectium'
import { ArrowLeft, Send, Loader2, User } from 'lucide-react'
import type { DirectMessage, User as UserType } from '@/lib/db/schema'

interface ChatWindowProps {
  partner: UserType
  messages: DirectMessage[]
  currentUserId: string
}

export function ChatWindow({ partner, messages, currentUserId }: ChatWindowProps) {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!message.trim()) return
    setLoading(true)

    try {
      await sendDirectMessage(partner.id, message)
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
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 rounded-t-xl bg-card border border-border">
        <Link href="/meldinger">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          {partner.image ? (
            <img
              src={partner.image}
              alt={partner.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-primary" />
          )}
        </div>
        
        <div>
          <h2 className="font-medium text-foreground">{partner.name}</h2>
          <Link 
            href={`/medlem/${partner.id}`}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Se profil
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 bg-background border-x border-border space-y-4">
        {messages.map((msg) => {
          const isOwn = msg.senderId === currentUserId
          return (
            <div
              key={msg.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-2xl px-4 py-2 ${
                  isOwn
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {msg.createdAt.toLocaleTimeString('nb-NO', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 p-4 rounded-b-xl bg-card border border-border border-t-0">
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
          className="bg-primary text-primary-foreground"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
