/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Topbar
 *
 * Definering / formål:
 * Global topbar for Collectium pages. Individual pages must not create their own topbar.
 *
 * Bruksområde:
 * Used by CollectiumAppShell.
 *
 * Berørte sider / routes:
 * - All routes under app/layout.tsx
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.navigation
 *
 * Dataretning:
 * Template/layout only.
 *
 * Versjon:
 * CT-PATCH-STRUCTURE-FIX-V1
 */

import Link from "next/link";

export type CollectiumTopbarLink = {
  readonly href: string;
  readonly label: string;
};

const primaryLinks: readonly CollectiumTopbarLink[] = [
  { href: "/katalog", label: "Katalog" },
  { href: "/medlemskap", label: "Medlemskap" },
  { href: "/forhandlere", label: "Forhandlere" },
  { href: "/auksjoner", label: "Auksjon" },
];

export function CollectiumTopbar(): JSX.Element {
  return (
    <header className="ct-topbar" aria-label="Collectium toppmeny">
      <Link href="/" className="ct-topbar__brand" aria-label="Collectium startside">
        <span className="ct-topbar__mark">C</span>
        <span>Collectium</span>
      </Link>

      <nav className="ct-topbar__nav" aria-label="Hovednavigasjon">
        {primaryLinks.map((link: CollectiumTopbarLink) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="ct-topbar__actions" aria-label="Brukerhandlinger">
        <Link className="ct-topbar__action" href="/sok">
          Søk
        </Link>
        <Link className="ct-topbar__action" href="/login">
          Logg inn
        </Link>
        <Link className="ct-topbar__primary" href="/registrering">
          Kom i gang gratis
        </Link>
      </div>

      <div className="ct-mobile-menu" aria-label="Mobilhandlinger">
        <Link className="ct-topbar__action" href="/sok">
          Søk
        </Link>
        <Link className="ct-topbar__action" href="/login">
          Meny
        </Link>
      </div>
    </header>
  );
}
