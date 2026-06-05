/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium session API
 *
 * Definering / formal:
 * Returnerer innlogget Collectium-bruker basert paa session-cookie og ct_user_sessions.
 *
 * Bruksomrade:
 * Brukes av frontendmeny, Min side, admin og session-kontroll.
 *
 * Berorte sider / routes:
 * - /login
 * - /min-side
 * - /admin
 *
 * Berorte DB-brytere / feature_keys:
 * - auth.session
 *
 * Berorte API-ruter:
 * - GET /api/auth/session
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
 * log_category: auth
 * log_action: session.read
 *
 * Versjon:
 * CT-FILE-API-AUTH-SESSION-0001 / CHANGE-2026-06-05-AUTH-MARIADB-0001
 */

import { NextResponse } from 'next/server'
import { getCollectiumSession } from '@/lib/auth'

export async function GET() {
  const session = await getCollectiumSession()

  return NextResponse.json({
    ok: true,
    authenticated: session.authenticated,
    feature_key: 'auth.session',
    source: 'mariadb',
    user: session.user,
    errors: [],
  })
}
