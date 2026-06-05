import Link from 'next/link'
import { MessageCircle, User } from 'lucide-react'
import type { DirectMessage, User as UserType } from '@/lib/db/schema'

interface ConversationListProps {
  conversations: {
    partnerId: string
    lastMessage: DirectMessage
    partner: UserType | null
  }[]
  currentUserId: string
}

export function ConversationList({ conversations, currentUserId }: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="p-4 rounded-full bg-muted w-fit mx-auto mb-4">
          <MessageCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Ingen meldinger enna
        </h3>
        <p className="text-muted-foreground">
          Start en samtale med andre medlemmer fra deres profil.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {conversations.map((conv) => (
        <Link
          key={conv.partnerId}
          href={`/meldinger/${conv.partnerId}`}
          className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            {conv.partner?.image ? (
              <img
                src={conv.partner.image}
                alt={conv.partner.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 text-primary" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">
                {conv.partner?.name ?? 'Ukjent bruker'}
              </h3>
              <span className="text-xs text-muted-foreground">
                {conv.lastMessage.createdAt.toLocaleDateString('nb-NO', {
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {conv.lastMessage.senderId === currentUserId && 'Du: '}
              {conv.lastMessage.content}
            </p>
          </div>
          
          {!conv.lastMessage.isRead && conv.lastMessage.receiverId === currentUserId && (
            <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
          )}
        </Link>
      ))}
    </div>
  )
}
