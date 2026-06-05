import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import AppShell from '@/app/components/AppShell'
import { ConversationList } from '@/components/messages/conversation-list'
import { getConversations } from '@/app/actions/collectium'

export default async function MeldingerPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }
  
  const conversations = await getConversations()

  return (
    <AppShell>
      <header style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: "var(--ct-font-display)",
            fontSize: "2em",
            letterSpacing: "-0.02em",
            color: "var(--ct-text)",
            lineHeight: 1.1,
            marginBottom: 4,
          }}
        >
          Meldinger
        </h1>
        <p style={{ color: "var(--ct-text-muted)", fontFamily: "var(--ct-font-ui)", fontSize: "0.93em" }}>
          Dine samtaler med andre samlere
        </p>
      </header>
      
      <ConversationList conversations={conversations} currentUserId={session.user.id} />
    </AppShell>
  )
}
