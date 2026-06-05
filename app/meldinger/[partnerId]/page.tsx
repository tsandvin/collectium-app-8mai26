import { headers } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import AppShell from '@/app/components/AppShell'
import { ChatWindow } from '@/components/messages/chat-window'
import { getDirectMessages } from '@/app/actions/collectium'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export default async function ChatPage({
  params,
}: {
  params: Promise<{ partnerId: string }>
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }
  
  const { partnerId } = await params
  const [partner] = await db.select().from(user).where(eq(user.id, partnerId))
  
  if (!partner) notFound()
  
  const messages = await getDirectMessages(partnerId)

  return (
    <AppShell>
      <ChatWindow 
        partner={partner}
        messages={messages}
        currentUserId={session.user.id}
      />
    </AppShell>
  )
}
