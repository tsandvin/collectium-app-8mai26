/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium logout API
 *
 * Definering / formal:
 * Logger ut bruker ved aa slette Collectium session-cookie og forsoke aa slette raden i ct_user_sessions.
 *
 * Bruksomrade:
 * Brukes av toppmeny, Min side og alle logout-handlinger.
 *
 * Berorte sider / routes:
 * - /login
 * - /min-side
 * - /admin
 *
 * Berorte DB-brytere / feature_keys:
 * - auth.logout
 *
 * Berorte API-ruter:
 * - POST /api/auth/logout
 *
 * Berorte tabeller / views:
 * - ct_user_sessions
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: auth
 * log_action: logout
 *
 * Versjon:
 * CT-FILE-API-AUTH-LOGOUT-0001 / CHANGE-2026-06-05-AUTH-MARIADB-0001
 */

import { NextResponse } from 'next/server'
import { COLLECTIUM_SESSION_COOKIE, destroyCurrentSession } from '@/lib/auth'

export async function POST() {
  await destroyCurrentSession()

  const response = NextResponse.json({
    ok: true,
    authenticated: false,
    feature_key: 'auth.logout',
    message: 'Logget ut.',
    errors: [],
  })

  response.cookies.set(COLLECTIUM_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })

  return response
}
