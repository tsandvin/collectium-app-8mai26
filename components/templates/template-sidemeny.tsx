/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * template-sidemeny
 *
 * Definering / formål:
 * Eneste godkjente templatefil for global sidemeny.
 * Det skal ikke opprettes templatemega-sidemeny, template-mega-sidemeny
 * eller alternative sidemeny-templatefiler.
 *
 * Bruksområde:
 * Global Collectium template.
 *
 * Berørte sider / routes:
 * - alle sider via global template
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.sidemeny
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
 * CT-FILE-TEMPLATE-SIDEMENY-0002 / CHANGE-2026-06-06-TEMPLATE-MENUS
 */

import Link from "next/link";

const menu = [
  { href: "/startside", code: "ST", label: "Startside" },
  { href: "/katalog", code: "KA", label: "Katalog" },
  { href: "/index", code: "IF", label: "Index / Finans" },
  { href: "/auksjon", code: "AU", label: "Auksjon" },
  { href: "/min-side", code: "MS", label: "Min side" },
  { href: "/samling", code: "SA", label: "Min samling" },
  { href: "/admin", code: "AD", label: "Admin kontroll" }
] as const;

export function TemplateSidemeny() {
  return (
    <aside className="ct-template-sidemeny" aria-label="Collectium sidemeny">
      <p className="ct-template-sidemenu-title">Plattform</p>

      <nav className="ct-template-sidemenu-nav">
        {menu.map((item) => (
          <Link key={item.href} href={item.href} className="ct-template-sidemenu-link">
            <span>{item.code}</span>
            <strong>{item.label}</strong>
          </Link>
        ))}
      </nav>

      <div className="ct-template-sidemenu-card">
        <strong>Collectium</strong>
        <p>Katalog · samling · auksjon · marked</p>
      </div>
    </aside>
  );
}