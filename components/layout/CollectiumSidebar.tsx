"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumSidebar
 *
 * Definering / formål:
 * Global app-sidemeny for innloggede/app-routes.
 *
 * Bruksområde:
 * Vises av CollectiumAppShell på app-routes. Skal ikke vises på /startside.
 *
 * Regel:
 * Ingen rare symbolikoner. Bruk rene korte merker og tydelige tekstlenker.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarLink = {
  href: string;
  label: string;
  mark: string;
};

const platformLinks: readonly SidebarLink[] = [
  { href: "/startside", label: "Startside", mark: "ST" },
  { href: "/katalog", label: "Katalog", mark: "KA" },
  { href: "/bors", label: "Index / Finans", mark: "IF" },
  { href: "/auksjoner", label: "Auksjon", mark: "AU" },
  { href: "/min-side", label: "Min side", mark: "MS" },
  { href: "/samling", label: "Min samling", mark: "SA" },
  { href: "/meldinger", label: "Meldinger", mark: "ME" },
  { href: "/forhandler", label: "Forhandlere", mark: "FO" },
  { href: "/admin", label: "Admin kontroll", mark: "AD" },
];

export function CollectiumSidebar(): JSX.Element {
  const pathname = usePathname() || "/";

  return (
    <aside className="ct-sidebar" aria-label="Collectium sidemeny">
      <div className="ct-sidebar__head">
        <span className="ct-sidebar__logo">C</span>
        <span>Collectium</span>
      </div>

      <p className="ct-sidebar__eyebrow">Plattform</p>

      <nav className="ct-sidebar__nav">
        {platformLinks.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(`${link.href}/`));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={active ? "ct-sidebar__item is-active" : "ct-sidebar__item"}
            >
              <span className="ct-sidebar__mark">{link.mark}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="ct-sidebar__note">
        <strong>Collectium</strong>
          <span>Katalog · samling · auksjon · marked</span>
      </div>
    </aside>
  );
}

export default CollectiumSidebar;


