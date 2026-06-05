/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium hovednavigasjon
 *
 * Definering / formal:
 * Erstatter Better Auth signOut med Collectium logout API og viser enkel session-basert navigasjon.
 *
 * Bruksomrade:
 * Brukes i global navigasjon/topbar der main-nav importeres.
 *
 * Berorte sider / routes:
 * - /
 * - /katalog
 * - /min-side
 * - /admin
 * - /login
 *
 * Berorte DB-brytere / feature_keys:
 * - auth.session
 * - auth.logout
 *
 * Berorte API-ruter:
 * - GET /api/auth/session
 * - POST /api/auth/logout
 *
 * Berorte tabeller / views:
 * - ct_users
 * - ct_user_sessions
 * - ct_user_roles
 * - ct_roles
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: navigation
 * log_action: main_nav
 *
 * Versjon:
 * CT-FILE-COMP-MAIN-NAV-0001 / CHANGE-2026-06-05-AUTH-MARIADB-0001
 */

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { collectiumSignOut, getCollectiumClientSession, type CollectiumAuthUser } from '@/lib/auth-client'

export default function MainNav() {
  const [user, setUser] = useState<CollectiumAuthUser | null>(null)

  useEffect(() => {
    let mounted = true

    getCollectiumClientSession().then((session) => {
      if (mounted && session.ok && session.authenticated && session.user) {
        setUser(session.user)
      }
    })

    return () => {
      mounted = false
    }
  }, [])

  async function handleLogout() {
    await collectiumSignOut()
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <nav className="ct-main-nav" aria-label="Hovedmeny">
      <Link href="/">Start</Link>
      <Link href="/katalog">Katalog</Link>
      <Link href="/auksjoner">Auksjon</Link>
      <Link href="/bors">Bors</Link>

      {user ? (
        <>
          <Link href="/min-side">Min side</Link>
          {user.isAdmin ? <Link href="/admin">Admin</Link> : null}
          <button type="button" onClick={handleLogout}>
            Logg ut
          </button>
        </>
      ) : (
        <>
          <Link href="/login">Logg inn</Link>
          <Link href="/login?mode=register">Registrer</Link>
        </>
      )}
    </nav>
  )
}
