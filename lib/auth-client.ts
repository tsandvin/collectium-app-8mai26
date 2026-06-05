/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium auth client helpers
 *
 * Definering / formal:
 * Erstatter Better Auth klient med fetch-baserte hjelpere mot Collectium sine egne Next.js API-ruter.
 *
 * Bruksomrade:
 * Brukes av login/register-komponenter og meny for innlogging, utlogging og session-lesing.
 *
 * Berorte sider / routes:
 * - /login
 * - /sign-in
 * - /sign-up
 * - /min-side
 *
 * Berorte DB-brytere / feature_keys:
 * - auth.login
 * - auth.logout
 * - auth.session
 * - auth.register
 *
 * Berorte API-ruter:
 * - POST /api/auth/login
 * - POST /api/auth/logout
 * - GET /api/auth/session
 * - POST /api/auth/register
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
 * log_action: client
 *
 * Versjon:
 * CT-FILE-LIB-AUTH-CLIENT-0001 / CHANGE-2026-06-05-AUTH-MARIADB-0001
 */

'use client'

export type CollectiumAuthUser = {
  id: number
  publicId: string
  email: string
  displayName: string
  publicDisplayName: string | null
  firstName: string | null
  lastName: string | null
  role: string
  roles: string[]
  isAdmin: boolean
  isActive: boolean
  accountStatus: string
  emailStatus: string
  adminApprovalStatus: string
}

export type CollectiumAuthResponse = {
  ok: boolean
  authenticated?: boolean
  user?: CollectiumAuthUser | null
  error_code?: string
  message?: string
  errors?: unknown[]
}

async function parseJson(response: Response): Promise<CollectiumAuthResponse> {
  try {
    return (await response.json()) as CollectiumAuthResponse
  } catch {
    return {
      ok: false,
      error_code: 'INVALID_JSON_RESPONSE',
      message: 'Ugyldig respons fra auth API.',
    }
  }
}

export async function collectiumSignIn(email: string, password: string): Promise<CollectiumAuthResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })

  return parseJson(response)
}

export async function collectiumSignUp(input: {
  name: string
  email: string
  password: string
}): Promise<CollectiumAuthResponse> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(input),
  })

  return parseJson(response)
}

export async function collectiumSignOut(): Promise<CollectiumAuthResponse> {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  })

  return parseJson(response)
}

export async function getCollectiumClientSession(): Promise<CollectiumAuthResponse> {
  const response = await fetch('/api/auth/session', {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
  })

  return parseJson(response)
}

export const authClient = {
  signIn: {
    email: async ({ email, password }: { email: string; password: string }) => {
      const result = await collectiumSignIn(email, password)
      return { data: result, error: result.ok ? null : result }
    },
  },
  signUp: {
    email: async ({ name, email, password }: { name?: string; email: string; password: string }) => {
      const result = await collectiumSignUp({ name: name || email, email, password })
      return { data: result, error: result.ok ? null : result }
    },
  },
  signOut: collectiumSignOut,
  getSession: getCollectiumClientSession,
}
