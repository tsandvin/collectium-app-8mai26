/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * template-toppmeny
 *
 * Definering / formål:
 * Eneste godkjente templatefil for global toppmeny.
 * Toppmenyen eies av template-laget, ikke av vanlige sider.
 *
 * Bruksområde:
 * Global Collectium template.
 *
 * Berørte sider / routes:
 * - alle sider via app/layout.tsx
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.toppmeny
 * - navigation.view
 *
 * Berørte API-ruter:
 * - senere /api/admin/menu
 *
 * Berørte tabeller / views:
 * - senere ct_v_app_menu
 *
 * Dataretning:
 * Foreløpig statisk template → React → UI
 * Senere MariaDB/API → Template → React → UI
 *
 * Logging:
 * ingen i første versjon
 *
 * Versjon:
 * CT-FILE-TEMPLATE-TOPPMENY-0002 / CHANGE-2026-06-06-TEMPLATE-MENUS
 */

import Link from "next/link";

export function TemplateToppmeny() {
  return (
    <header className="ct-template-toppmeny" aria-label="Collectium toppmeny">
      <Link href="/startside" className="ct-template-brand" aria-label="Collectium startside">
        <span className="ct-template-logo">C</span>
        <span>
          <strong>Collectium</strong>
          <small>Samlerplattform</small>
        </span>
      </Link>

      <nav className="ct-template-topnav" aria-label="Hovedmeny">
        <Link href="/startside">Startside</Link>
        <Link href="/katalog">Katalog</Link>
        <Link href="/auksjon">Auksjon</Link>
        <Link href="/min-side">Min side</Link>
        <Link href="/admin">Admin</Link>
      </nav>

      <form className="ct-template-search" role="search">
        <label htmlFor="ct-search">Søk</label>
        <input id="ct-search" type="search" placeholder="Søk i Collectium" />
      </form>

      <nav className="ct-template-auth" aria-label="Bruker">
        <Link href="/login">Logg inn</Link>
        <Link href="/registrering">Registrer</Link>
      </nav>
    </header>
  );
}