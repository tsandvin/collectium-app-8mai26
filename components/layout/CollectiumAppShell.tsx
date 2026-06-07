/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumAppShell
 *
 * Definering / formål:
 * Globalt app-skall for sider som skal ha sidebar. Skal ikke brukes på /startside.
 *
 * Bruksområde:
 * - /login
 * - ordinære app-sider
 *
 * Berørte sider / routes:
 * - /login
 *
 * Berørte DB-brytere / feature_keys:
 * - navigation.shell.view
 *
 * Berørte API-ruter:
 * - Ingen i v1.
 *
 * Berørte tabeller / views:
 * - Ingen i v1.
 *
 * Dataretning:
 * Layout → React → UI
 *
 * Logging:
 * Ingen serverlogging i v1.
 *
 * Versjon:
 * CT-FILE-APPSHELL-V48-0001
 */

import CollectiumSidebar from './CollectiumSidebar'
import styles from './CollectiumShell.module.css'

type Props = {
  children: React.ReactNode
  title?: string
}

export default function CollectiumAppShell({ children, title }: Props) {
  return (
    <div className={styles.appShell}>
      <CollectiumSidebar />

      <div className={styles.appMain}>
        <header className={styles.appTopbar}>
          <a href="/startside">Forsiden</a>
          <a href="/katalog">Katalog</a>
          <a href="/login">Logg inn</a>
          <a className={styles.memberButton} href="/registrering">
            Bli medlem
          </a>
        </header>

        <main className={styles.appContent}>
          {title ? <h1 className={styles.appTitle}>{title}</h1> : null}
          {children}
        </main>
      </div>
    </div>
  )
}
