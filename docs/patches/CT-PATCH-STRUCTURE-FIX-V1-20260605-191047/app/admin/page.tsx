/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Adminside med Collectium MariaDB-auth
 *
 * Definering / formål:
 * Erstatter gammel Drizzle/Better Auth-adminsjekk med session fra lib/auth og adminstatistikk fra app/actions/collectium.
 *
 * Bruksområde:
 * Server Component for /admin.
 *
 * Berørte sider / routes:
 * - /admin
 *
 * Berørte DB-brytere / feature_keys:
 * - admin.dashboard.view
 * - admin.users.view
 *
 * Berørte API-ruter:
 * - Intern server action: getAdminStats
 * - Intern server action: getAllUsers
 *
 * Berørte tabeller / views:
 * - ct_users
 * - ct_user_roles
 * - ct_roles
 *
 * Dataretning:
 * MariaDB -> server action -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: admin
 * log_action: dashboard.view
 *
 * Versjon:
 * CT-FILE-APP-ADMIN-PAGE-0002 / CHANGE-2026-06-05-AUTH-BUILD-FIX-0002
 */

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth, isPrivilegedRole } from '@/lib/auth'
import AppShell from '@/app/components/AppShell'
import { AdminStats } from '@/components/admin/admin-stats'
import { UserManagement } from '@/components/admin/user-management'
import { getAdminStats, getAllUsers } from '@/app/actions/collectium'

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect('/sign-in')
  }

  const hasAdminAccess =
    Boolean(session.user.isAdmin) ||
    session.user.roles?.some(isPrivilegedRole) ||
    isPrivilegedRole(session.user.role)

  if (!hasAdminAccess) {
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
          Administrer brukere og overvåk plattformen
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <AdminStats stats={stats} />
        <UserManagement users={users} />
      </div>
    </AppShell>
  )
}
