"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumTopbar
 *
 * Definering / formål:
 * Global toppbar for Collectium. Skal brukes på både public og app-routes.
 *
 * Bruksområde:
 * Eies kun av CollectiumAppShell.
 *
 * Innhold:
 * Logo, hovedlenker, søk, Design-knapp, login/min side og gratis start.
 */

import Link from "next/link";
import { useState } from "react";

type TopbarLink = {
  href: string;
  label: string;
};

const primaryLinks: readonly TopbarLink[] = [
  { href: "/katalog", label: "Katalog" },
  { href: "/medlemskap", label: "Medlemskap" },
  { href: "/forhandler", label: "Forhandlere" },
  { href: "/auksjoner", label: "Auksjon" },
];

export function CollectiumTopbar(): JSX.Element {
  const [designOpen, setDesignOpen] = useState(false);

  return (
    <header className="ct-topbar">
      <div className="ct-topbar__inner">
        <Link className="ct-topbar__brand" href="/startside" aria-label="Collectium startside">
          <span className="ct-topbar__mark">C</span>
          <span>Collectium</span>
        </Link>

        <nav className="ct-topbar__nav" aria-label="Hovedmeny">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ct-topbar__actions">
          <Link className="ct-topbar__link" href="/katalog">
            Søk
          </Link>

          <button
            className="ct-topbar__button"
            type="button"
            aria-expanded={designOpen}
            aria-controls="ct-design-panel"
            onClick={() => setDesignOpen((value) => !value)}
          >
            Design
          </button>

          <Link className="ct-topbar__link" href="/login">
            Logg inn
          </Link>

          <Link className="ct-topbar__link" href="/min-side">
            Min side
          </Link>

          <Link className="ct-topbar__primary" href="/sign-up">
            Kom i gang gratis
          </Link>
        </div>
      </div>

      {designOpen ? (
        <div className="ct-design-panel" id="ct-design-panel">
          <div>
            <p className="ct-design-panel__eyebrow">Design</p>
            <h2>Collectium Signature Light</h2>
            <p>
              Global template styrer skall, toppbar, sidemeny, rammer og responsivitet.
              Sideinnhold skal ikke lage eget skall.
            </p>
          </div>
          <button type="button" onClick={() => setDesignOpen(false)}>
            Lukk
          </button>
        </div>
      ) : null}
    </header>
  );
}

export default CollectiumTopbar;
