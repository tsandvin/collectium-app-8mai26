/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumSidebar
 *
 * Definering / formål:
 * Standard global sidemeny for Collectium.
 * Viser navigasjon, ikke teknisk skin-/DB-status.
 *
 * Bruksområde:
 * Global template/sidebar.
 *
 * Berørte sider / routes:
 * - Alle sider via CollectiumAppShell
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.sidebar
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
 * CT-SIDEBAR-4-SKINS-0001 / CHANGE-REINSTALL-4-SKINS
 */

import Link from "next/link";

const menuItems = [
  { href: "/startside", code: "ST", label: "Startside" },
  { href: "/katalog", code: "KA", label: "Katalog" },
  { href: "/index", code: "IF", label: "Index / Finans" },
  { href: "/auksjoner", code: "AU", label: "Auksjon" },
  { href: "/min-side", code: "MS", label: "Min side" },
  { href: "/samling", code: "SA", label: "Min samling" },
  { href: "/meldinger", code: "ME", label: "Meldinger" },
  { href: "/forhandler", code: "FO", label: "Forhandlere" },
  { href: "/admin", code: "AD", label: "Admin kontroll" },
] as const;

export function CollectiumSidebar(): JSX.Element {
  return (
    <aside className="ct-sidebar" aria-label="Collectium sidemeny">
      <div className="ct-sidebar-title">Plattform</div>

      <nav className="ct-sidebar-nav">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className="ct-sidebar-link">
            <span>{item.code}</span>
            <strong>{item.label}</strong>
          </Link>
        ))}
      </nav>

      <div className="ct-sidebar-card">
        <strong>Collectium</strong>
        <span>Katalog · samling · auksjon · marked</span>
      </div>
    </aside>
  );
}

export default CollectiumSidebar;
