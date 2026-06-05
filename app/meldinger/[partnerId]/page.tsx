/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Meldinger partner-side mot Collectium MariaDB-auth
 *
 * Definering / formÃ¥l:
 * Fjerner gammel Drizzle/schema-import og henter partner direkte via MariaDB dbQuery.
 *
 * BruksomrÃ¥de:
 * Server Component for /meldinger/[partnerId].
 *
 * BerÃ¸rte sider / routes:
 * - /meldinger/[partnerId]
 *
 * BerÃ¸rte DB-brytere / feature_keys:
 * - messages.view
 *
 * BerÃ¸rte API-ruter:
 * - Server action: getDirectMessages
 *
 * BerÃ¸rte tabeller / views:
 * - ct_users
 * - direct_message
 *
 * Dataretning:
 * MariaDB -> server action -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: messages
 * log_action: thread.view
 *
 * Versjon:
 * CT-FILE-APP-MELDINGER-PARTNER-0002 / CHANGE-2026-06-05-AUTH-BUILD-FIX-0003
 */

import { headers } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import { dbQuery } from '@/lib/db'
import { ChatWindow } from '@/components/messages/chat-window'
import { getDirectMessages } from '@/app/actions/collectium'

type PageProps = {
  params: Promise<{ partnerId: string }>
}

export default async function ChatPage({ params }: PageProps) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect('/sign-in')
  }

  const { partnerId } = await params

  const partners = await dbQuery<{
    id: number
    email: string
    name: string | null
    displayName: string | null
    image: string | null
    role: string | null
  }>(
    `SELECT
       id,
       email,
       display_name AS name,
       display_name AS displayName,
       NULL AS image,
       role
     FROM ct_users
     WHERE id = ?
     LIMIT 1`,
    [partnerId],
  )

  const partner = partners[0]

  if (!partner) notFound()

  const messages = await getDirectMessages(partnerId)

  return (
    <><ChatWindow
        partner={partner}
        messages={messages}
        currentUserId={String(session.user.id)}
      /></>
  )
}

