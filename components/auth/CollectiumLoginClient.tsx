/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium login/register klient
 *
 * Definering / formal:
 * Login- og registreringsskjema koblet til Collectium-auth mot MariaDB, ikke Better Auth.
 *
 * Bruksomrade:
 * Brukes av /login og eventuelle alias-sider for sign-in/sign-up.
 *
 * Berorte sider / routes:
 * - /login
 * - /sign-in
 * - /sign-up
 *
 * Berorte DB-brytere / feature_keys:
 * - auth.login
 * - auth.register
 *
 * Berorte API-ruter:
 * - POST /api/auth/login
 * - POST /api/auth/register
 *
 * Berorte tabeller / views:
 * - ct_users
 * - ct_user_profiles
 * - ct_user_roles
 * - ct_roles
 * - ct_user_sessions
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: auth
 * log_action: login.form
 *
 * Versjon:
 * CT-FILE-COMP-AUTH-LOGIN-0001 / CHANGE-2026-06-05-AUTH-MARIADB-0001
 */

'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { collectiumSignIn, collectiumSignUp } from '@/lib/auth-client'

type Mode = 'login' | 'register'

type CollectiumLoginClientProps = {
  initialMode?: Mode
}

export default function CollectiumLoginClient({ initialMode }: CollectiumLoginClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const modeFromUrl = searchParams.get('mode') === 'register' ? 'register' : 'login'
  const [mode, setMode] = useState<Mode>(initialMode ?? modeFromUrl)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const title = useMemo(() => (mode === 'register' ? 'Registrer' : 'Logg inn'), [mode])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setMessage(null)

    const result =
      mode === 'register'
        ? await collectiumSignUp({ name, email, password })
        : await collectiumSignIn(email, password)

    setIsLoading(false)

    if (!result.ok) {
      setError(result.message || 'Handlingen feilet.')
      return
    }

    if (mode === 'register') {
      setMessage(result.message || 'Bruker opprettet. Du kan logge inn.')
      setMode('login')
      setPassword('')
      return
    }

    const redirectTo = result.user?.isAdmin ? '/admin' : '/min-side'
    router.push(redirectTo)
    router.refresh()
  }

  return (
    <section className="ct-auth-shell" aria-label="Collectium innlogging">
      <div className="ct-auth-card ct-signature-frame">
        <div className="ct-auth-tabs" role="tablist" aria-label="Velg innlogging eller registrering">
          <button
            type="button"
            className={mode === 'login' ? 'is-active' : ''}
            onClick={() => setMode('login')}
          >
            Logg inn
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'is-active' : ''}
            onClick={() => setMode('register')}
          >
            Registrer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="ct-auth-form">
          <div>
            <p className="ct-kicker">Collectium konto</p>
            <h1>{title}</h1>
            <p>
              Innlogging bruker Collectium sin MariaDB-brukerbase. Roller, adminstatus og tilgang hentes fra DB.
            </p>
          </div>

          {mode === 'register' ? (
            <label>
              <span>Navn</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
              />
            </label>
          ) : null}

          <label>
            <span>E-post</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label>
            <span>Passord</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              required
            />
          </label>

          {error ? <p className="ct-auth-error" role="alert">{error}</p> : null}
          {message ? <p className="ct-auth-message" role="status">{message}</p> : null}

          <button type="submit" className="ct-primary-action" disabled={isLoading}>
            {isLoading ? 'Behandler...' : title}
          </button>
        </form>
      </div>
    </section>
  )
}
