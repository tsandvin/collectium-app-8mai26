/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium AuthForm wrapper
 *
 * Definering / formal:
 * Kompatibilitetswrapper for eksisterende sider som importerer AuthForm. Bruker ny CollectiumLoginClient.
 *
 * Bruksomrade:
 * Brukes av /sign-in, /sign-up eller eldre auth-sider.
 *
 * Berorte sider / routes:
 * - /sign-in
 * - /sign-up
 * - /login
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
 * - ct_user_sessions
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: auth
 * log_action: auth_form.wrapper
 *
 * Versjon:
 * CT-FILE-COMP-AUTH-FORM-0001 / CHANGE-2026-06-05-AUTH-MARIADB-0001
 */

import CollectiumLoginClient from '@/components/auth/CollectiumLoginClient'

type AuthFormProps = {
  mode?: 'sign-in' | 'sign-up' | 'login' | 'register'
}

export function AuthForm({ mode = 'sign-in' }: AuthFormProps) {
  return <CollectiumLoginClient initialMode={mode === 'sign-up' || mode === 'register' ? 'register' : 'login'} />
}

export default AuthForm
