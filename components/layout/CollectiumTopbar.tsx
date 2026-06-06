/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumTopbar
 *
 * Definering / formål:
 * Ren global toppmeny for Collectium.
 * Denne filen inneholder ikke designvelger, skinvelger, template-switch,
 * runtime theme, localStorage skin-state eller Design-dropdown.
 *
 * Bruksområde:
 * Brukes av global Collectium layout/AppShell.
 *
 * Berørte sider / routes:
 * - Alle sider via global layout
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.topbar
 *
 * Berørte API-ruter:
 * - Ingen direkte API-ruter
 *
 * Berørte tabeller / views:
 * - Ingen direkte tabeller/views
 *
 * Dataretning:
 * Template/layout → UI
 *
 * Logging:
 * Ingen direkte logging
 *
 * Versjon:
 * CT-TOPBAR-CLEAN-0001 / CHANGE-REMOVE-DESIGN-SYSTEM
 *
 * Endringsregel:
 * Denne filen skal ikke inneholde runtime skin/design-system.
 */

import Link from "next/link";

export function CollectiumTopbar(): JSX.Element {
  return (
    <header className="ct-topbar-v42" data-component="collectium-topbar">
      <div className="ct-topbar-v42__brand">
        <Link href="/" className="ct-topbar-v42__logoMark" aria-label="Collectium startside">
          C
        </Link>

        <div className="ct-topbar-v42__brandText">
          <strong>Collectium</strong>
          <small>Samlerplattform for katalog, samling, auksjon og marked</small>
        </div>
      </div>

      <nav className="ct-topbar-v42__nav" aria-label="Hovedmeny">
        <Link href="/startside">Startside</Link>
        <Link href="/katalog">Katalog</Link>
        <Link href="/auksjoner">Auksjon</Link>
        <Link href="/min-side">Min side</Link>
        <Link href="/admin">Admin</Link>
      </nav>

      <div className="ct-topbar-v42__search" role="search">
        <label className="sr-only" htmlFor="collectium-global-search">
          Søk i Collectium
        </label>
        <input
          id="collectium-global-search"
          type="search"
          placeholder="Søk i Collectium"
          aria-label="Søk i Collectium"
        />
      </div>

      <div className="ct-topbar-v42__authSwitch" aria-label="Brukerhandlinger">
        <Link href="/login">Logg inn</Link>
        <Link href="/sign-up">Registrer</Link>
      </div>
    </header>
  );
}

export default CollectiumTopbar;
