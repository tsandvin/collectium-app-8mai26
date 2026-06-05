/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumAppShellV6
 *
 * Definering / formal:
 * Felles applikasjonsskall for Collectium startside og Min side i denne pakken.
 * Eies av layout-laget og samler toppbar, sidemeny og innholdsramme.
 *
 * Bruksomrade:
 * Brukes av app/startside/page.tsx og app/min-side/page.tsx dersom prosjektet ikke allerede har globalt skall.
 * Hvis eksisterende app/layout.tsx allerede pakker alle sider i AppShell, bruk kun innholdskomponentene.
 *
 * Berorte sider / routes:
 * - /startside
 * - /min-side
 *
 * Berorte DB-brytere / feature_keys:
 * - landing.view
 * - profile.view
 * - profile.membership
 * - collection.view
 * - profile.notifications
 * - profile.activity
 *
 * Berorte API-ruter:
 * - Fremtidig: GET /api/auth/session
 * - Fremtidig: GET /api/profile/overview
 * - Fremtidig: GET /api/collection/summary
 *
 * Berorte tabeller / views:
 * - Fremtidig: ct_users
 * - Fremtidig: ct_memberships
 * - Fremtidig: ct_v_catalog_user_state
 * - Fremtidig: ct_collection_items
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: layout
 * log_action: render_shell
 *
 * Versjon:
 * CT-FILE-STARTSIDE-MINSIDE-V6-0001
 */
import Link from 'next/link';
import styles from './CollectiumAppShellV6.module.css';

export type CollectiumAppShellV6Props = {
  children: React.ReactNode;
  activeKey?: 'startside' | 'katalog' | 'medlemskap' | 'auksjon' | 'minside' | 'forhandler' | 'admin';
  pageTitle?: string;
};

const navItems = [
  { key: 'startside', label: 'Startside', href: '/startside' },
  { key: 'katalog', label: 'Katalog', href: '/katalog' },
  { key: 'medlemskap', label: 'Medlemskap', href: '/medlemskap' },
  { key: 'auksjon', label: 'Auksjon', href: '/auksjoner' },
  { key: 'minside', label: 'Min side', href: '/min-side' },
  { key: 'forhandler', label: 'Forhandler', href: '/forhandler' },
] as const;

export default function CollectiumAppShellV6({
  children,
  activeKey = 'startside',
  pageTitle = 'Collectium',
}: CollectiumAppShellV6Props) {
  return (
    <div className={styles.shell} data-ct-shell="startside-minside-v6">
      <aside className={styles.sidebar} aria-label="Collectium sidemeny">
        <Link className={styles.logo} href="/startside" aria-label="Collectium startside">
          <span className={styles.logoMark}>C</span>
          <span className={styles.logoText}>Collectium</span>
        </Link>

        <nav className={styles.sideNav} aria-label="Hovedmeny">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={item.key === activeKey ? styles.activeNavItem : styles.navItem}
            >
              <span className={styles.navIcon} aria-hidden="true">{item.label.slice(0, 1)}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sideFooter}>
          <span className={styles.stamp}>Anno 2022</span>
          <Link href="/support" className={styles.supportLink}>Support</Link>
        </div>
      </aside>

      <div className={styles.mainArea}>
        <header className={styles.topbar} aria-label="Collectium toppbar">
          <div className={styles.mobileBrand}>
            <span className={styles.logoMark}>C</span>
            <span>Collectium</span>
          </div>

          <label className={styles.searchWrap}>
            <span className={styles.visuallyHidden}>Sok</span>
            <input type="search" placeholder="Sok i Collectium Katalogen" aria-label="Sok i Collectium Katalogen" />
          </label>

          <div className={styles.searchModes} aria-label="Soketype">
            <button type="button">AI-sok</button>
            <button type="button" className={styles.selectedMode}>Katalogsok</button>
            <button type="button">Sidesok</button>
          </div>

          <nav className={styles.topActions} aria-label="Brukerhandlinger">
            <Link href="/login">Logg inn</Link>
            <Link href="/min-side">Min side</Link>
            <Link href="/registrering" className={styles.primaryAction}>Start gratis</Link>
          </nav>
        </header>

        <main className={styles.pageFrame} aria-label={pageTitle}>
          {children}
        </main>
      </div>
    </div>
  );
}
