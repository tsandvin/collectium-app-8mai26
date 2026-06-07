/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumSidebar
 *
 * Definering / formål:
 * Global sidemeny for vanlige app-sider. Skal ikke brukes på /startside.
 *
 * Bruksområde:
 * - /login
 * - /katalog
 * - /min-samling
 * - senere ordinære app-sider
 *
 * Berørte sider / routes:
 * - /login
 *
 * Berørte DB-brytere / feature_keys:
 * - navigation.sidebar.view
 *
 * Berørte API-ruter:
 * - Ingen i v1.
 *
 * Berørte tabeller / views:
 * - Ingen i v1.
 *
 * Dataretning:
 * Lokal navigasjon → React → UI
 *
 * Logging:
 * Ingen serverlogging i v1.
 *
 * Versjon:
 * CT-FILE-SIDEBAR-V48-0001
 */

import styles from './CollectiumShell.module.css'

const navItems = [
  { href: '/startside', label: 'Forsiden' },
  { href: '/katalog', label: 'Katalog' },
  { href: '/auksjon', label: 'Auksjon' },
  { href: '/historie', label: 'Historie' },
  { href: '/min-samling', label: 'Min samling' },
  { href: '/login', label: 'Logg inn' },
]

export default function CollectiumSidebar() {
  return (
    <aside className={styles.sidebar} aria-label="Collectium sidemeny">
      <a className={styles.sidebarLogo} href="/startside">
        <span>C</span>
        <strong>Collectium</strong>
      </a>

      <nav className={styles.sidebarNav}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <span>Anno MMXXII</span>
      </div>
    </aside>
  )
}
