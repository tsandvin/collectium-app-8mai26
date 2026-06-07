/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumPublicShell
 *
 * Definering / formål:
 * Offentlig shell for startside/landingsside uten app-sidemeny.
 *
 * Bruksområde:
 * Skal brukes av /startside og andre offentlige sider som ikke skal ha venstre app-sidebar.
 *
 * Berørte sider / routes:
 * - /startside
 * - /landingsside
 *
 * Berørte DB-brytere / feature_keys:
 * - public.startside.view
 *
 * Berørte API-ruter:
 * - Ingen direkte.
 *
 * Berørte tabeller / views:
 * - Ingen direkte.
 *
 * Dataretning:
 * Template/design → React UI
 *
 * Logging:
 * Ingen DB-logging.
 *
 * Versjon:
 * CT-PUBLIC-SHELL-8.5-0001
 *
 * Endringsregel:
 * PublicShell er separat fra AppShell. Fjerner ikke global app-sidebar for app-sider.
 */

import Link from "next/link";
import type { ReactNode } from "react";
import CollectiumDesignControls from "./CollectiumDesignControls";
import styles from "./CollectiumPublicShell.module.css";

type CollectiumPublicShellProps = {
  children: ReactNode;
};

export default function CollectiumPublicShell({ children }: CollectiumPublicShellProps) {
  return (
    <div className="ct-public-page">
      <header className={styles.topbar}>
        <Link href="/startside" className={styles.brand} aria-label="Collectium startside">
          <span className={styles.brandMark}>C</span>
          <span className={styles.brandText}>
            <strong>Collectium</strong>
            <small>Samlerplattform</small>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Forsidenavigasjon">
          <Link href="/startside">Forsiden</Link>
          <Link href="/katalog">Katalog</Link>
          <Link href="/auksjoner">Auksjon</Link>
          <Link href="/katalog?segment=historie">Historie</Link>
          <Link href="/min-side">Min samling</Link>
        </nav>

        <div className={styles.actions}>
          <CollectiumDesignControls />
          <Link href="/login" className={styles.login}>Logg inn</Link>
          <Link href="/registrering" className={styles.primary}>Bli medlem</Link>
        </div>
      </header>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
