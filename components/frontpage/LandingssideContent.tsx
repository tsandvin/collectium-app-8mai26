/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Landingsside Content
 *
 * Definering / formål:
 * Landing content rendered inside global template. No local header/sidebar.
 *
 * Bruksområde:
 * app/landingsside/page.tsx
 *
 * Berørte sider / routes:
 * - /landingsside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 * - landing.membership
 *
 * Dataretning:
 * Presentation content only.
 *
 * Versjon:
 * CT-PATCH-STRUCTURE-FIX-V1
 */

import Link from "next/link";

export function LandingssideContent(): JSX.Element {
  return (
    <div className="ct-panel-grid">
      <section className="ct-panel ct-span-6">
        <h2>Hva er Collectium?</h2>
        <p>
          Collectium er en strukturert samlerplattform for katalog, egen samling,
          historiske relasjoner, auksjon, forhandlerkontakt og markedsutvikling.
        </p>
      </section>

      <section className="ct-panel ct-span-6">
        <h2>For samlere</h2>
        <p>
          Bruk katalogen til å forstå objekter, organisere egen samling og følge
          utviklingen i egne og offentlige samleobjekter.
        </p>
      </section>

      <section className="ct-card ct-span-4">
        <h3>Samler</h3>
        <p>Hjerte, stjerne, min samling, lister, dokumentasjon og transaksjoner.</p>
      </section>

      <section className="ct-card ct-span-4">
        <h3>Historie</h3>
        <p>Regenter, personer, signaturer, perioder, materiale, funn og proveniens.</p>
      </section>

      <section className="ct-card ct-span-4">
        <h3>Finans</h3>
        <p>Marked, verdi, trend, auksjon, nettbutikk, likviditet og prisobservasjoner.</p>
      </section>

      <section className="ct-panel ct-span-12">
        <h2>Kom i gang</h2>
        <p>Start med katalogen, medlemskap eller innlogging til Min side.</p>
        <div className="ct-actions">
          <Link className="ct-button ct-button--primary" href="/registrering">
            Kom i gang gratis
          </Link>
          <Link className="ct-button" href="/login">
            Logg inn
          </Link>
        </div>
      </section>
    </div>
  );
}
