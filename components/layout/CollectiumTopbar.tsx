/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumTopbar
 *
 * Definering / formål:
 * Standard global toppmeny for Collectium.
 * Ingen Design-knapp, ingen runtime skin-switch, ingen localStorage-template.
 *
 * Bruksområde:
 * Global template/topbar.
 *
 * Berørte sider / routes:
 * - Alle sider via CollectiumAppShell
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.topbar
 *
 * Berørte API-ruter:
 * - Ingen direkte
 *
 * Berørte tabeller / views:
 * - Ingen direkte
 *
 * Dataretning:
 * Template/layout → UI
 *
 * Logging:
 * Ingen direkte logging
 *
 * Versjon:
 * CT-TOPBAR-STANDARD-0001 / CHANGE-REINSTALL-STANDARD-TEMPLATE
 */

import Link from "next/link";

export function CollectiumTopbar(): JSX.Element {
  return (
    <header className="ct-standard-topbar">
      <div className="ct-standard-brand">
        <Link href="/" className="ct-standard-logo" aria-label="Collectium">
          C
        </Link>

        <div className="ct-standard-brand-text">
          <strong>Collectium</strong>
          <span>Samlerplattform for katalog, samling, auksjon og marked</span>
        </div>
      </div>

      <nav className="ct-standard-nav" aria-label="Hovedmeny">
        <Link href="/startside">Startside</Link>
        <Link href="/katalog">Katalog</Link>
        <Link href="/auksjoner">Auksjon</Link>
        <Link href="/min-side">Min side</Link>
        <Link href="/admin">Admin</Link>
      </nav>

      <form className="ct-standard-search" role="search">
        <label htmlFor="collectium-search">Søk i Collectium</label>
        <input id="collectium-search" type="search" placeholder="Søk i Collectium" />
      </form>

      <div className="ct-standard-auth">
        <Link href="/login">Logg inn</Link>
        <Link href="/sign-up">Registrer</Link>
      </div>
    </header>
  );
}

export default CollectiumTopbar;
