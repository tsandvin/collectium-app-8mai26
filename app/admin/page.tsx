import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import AppShell from '@/app/components/AppShell'
import { AdminStats } from '@/components/admin/admin-stats'
import { UserManagement } from '@/components/admin/user-management'
import { getAdminStats, getAllUsers } from '@/app/actions/collectium'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }
  
  // Check admin role
  const [userData] = await db.select().from(user).where(eq(user.id, session.user.id))
  if (userData?.role !== 'admin') {
    redirect('/')
  }
  
  const stats = await getAdminStats()
  const users = await getAllUsers()

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
          Admin Dashboard
        </h1>
        <p style={{ color: "var(--ct-text-muted)", fontFamily: "var(--ct-font-ui)", fontSize: "0.93em" }}>
          Administrer brukere og overvak plattformen
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <AdminStats stats={stats} />
        <UserManagement users={users} />
      </div>
    </AppShell>
  )
}
