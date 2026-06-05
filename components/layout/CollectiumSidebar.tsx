/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Sidebar
 *
 * Definering / formål:
 * Global sidebar. Individual pages must not create local sidebars.
 *
 * Bruksområde:
 * Used by CollectiumAppShell.
 *
 * Berørte sider / routes:
 * - All routes under app/layout.tsx
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.sidebar
 *
 * Dataretning:
 * Template/layout only.
 *
 * Versjon:
 * CT-PATCH-STRUCTURE-FIX-V1
 */

import Link from "next/link";

export type CollectiumSidebarLink = {
  readonly href: string;
  readonly label: string;
  readonly icon: string;
};

const platformLinks: readonly CollectiumSidebarLink[] = [
  { href: "/startside", label: "Startside", icon: "⌂" },
  { href: "/katalog", label: "Katalog", icon: "◎" },
  { href: "/index", label: "Index / Finans", icon: "↗" },
  { href: "/auksjoner", label: "Auksjon", icon: "◆" },
  { href: "/min-side", label: "Min side", icon: "◌" },
  { href: "/samling", label: "Min samling", icon: "♡" },
  { href: "/meldinger", label: "Meldinger", icon: "✉" },
  { href: "/forhandlere", label: "Forhandlere", icon: "▣" },
  { href: "/admin", label: "Admin kontroll", icon: "⚙" },
];

export function CollectiumSidebar(): JSX.Element {
  return (
    <aside className="ct-sidebar" aria-label="Collectium sidemeny">
      <div className="ct-sidebar__section">
        <p className="ct-sidebar__label">Plattform</p>
        {platformLinks.map((link: CollectiumSidebarLink) => (
          <Link key={link.href} href={link.href}>
            <span aria-hidden="true">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      <div className="ct-sidebar__footer">
        <strong>Signature Light · DB 8.4</strong>
        <br />
        Global template styrer skall, meny, rammer og responsivitet.
      </div>
    </aside>
  );
}
