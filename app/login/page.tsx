/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Login page
 *
 * Definering / formål:
 * Login-side med global Collectium sidebar/app-shell.
 *
 * Bruksområde:
 * - /login
 *
 * Berørte sider / routes:
 * - /login
 *
 * Berørte DB-brytere / feature_keys:
 * - auth.login.view
 * - auth.login.submit
 *
 * Berørte API-ruter:
 * - POST /api/auth/login senere
 *
 * Berørte tabeller / views:
 * - ct_users senere
 * - ct_user_sessions senere
 *
 * Dataretning:
 * UI → API/backend senere → MariaDB
 *
 * Logging:
 * log_category: auth
 * log_action: login.view
 *
 * Versjon:
 * CT-FILE-LOGIN-V48-0001
 */

import CollectiumAppShell from '@/components/layout/CollectiumAppShell'
import styles from './page.module.css'

export default function LoginPage() {
  return (
    <CollectiumAppShell title="Logg inn">
      <section className={styles.loginPanel}>
        <p className={styles.kicker}>Collectium konto</p>
        <h2>Tilgang til samling, katalog og markedsdata.</h2>
        <p>
          Logg inn for å åpne Min samling, ønskeliste, favoritter, medlemskap,
          varsler og personlige katalogvalg.
        </p>

        <form className={styles.form}>
          <label>
            E-post
            <input type="email" name="email" placeholder="din@epost.no" />
          </label>

          <label>
            Passord
            <input type="password" name="password" placeholder="Passord" />
          </label>

          <button type="submit">Logg inn</button>
        </form>
      </section>
    </CollectiumAppShell>
  )
}
