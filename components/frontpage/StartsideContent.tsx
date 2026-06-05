/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Startside Content
 *
 * Definering / formål:
 * Startside content rendered inside global template. No local header/sidebar.
 *
 * Bruksområde:
 * app/startside/page.tsx and app/page.tsx
 *
 * Berørte sider / routes:
 * - /
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 *
 * Dataretning:
 * Presentation content only.
 *
 * Versjon:
 * CT-PATCH-STRUCTURE-FIX-V1
 */

import Link from "next/link";

export function StartsideContent(): JSX.Element {
  return (
    <div className="ct-panel-grid">
      <section className="ct-card ct-span-4">
        <h2>Samler</h2>
        <p>Bygg samling, ønskeliste, favoritter, notater og dokumentasjon på ett sted.</p>
      </section>

      <section className="ct-card ct-span-4">
        <h2>Historie</h2>
        <p>Se objekter i sammenheng med utgaver, regenter, personer, perioder og materiale.</p>
      </section>

      <section className="ct-card ct-span-4">
        <h2>Finans</h2>
        <p>Følg verdi, trend, marked, auksjon, nettbutikk og utvikling over tid.</p>
      </section>

      <section className="ct-panel ct-span-12">
        <h2>Katalogen som relasjonskatalog</h2>
        <p>
          Collectium skal ikke være en flat produktliste. Katalogen skal koble sedler, mynter,
          historiske relasjoner, samlingsstatus, markedsdata og objektpresentasjoner sammen.
        </p>
        <div className="ct-actions">
          <Link className="ct-button ct-button--primary" href="/katalog">
            Se katalog
          </Link>
          <Link className="ct-button" href="/medlemskap">
            Bli medlem
          </Link>
        </div>
      </section>
    </div>
  );
}
