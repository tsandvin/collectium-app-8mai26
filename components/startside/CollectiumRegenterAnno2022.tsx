/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumRegenterAnno2022
 *
 * Definering / formål:
 * Startside-seksjon for regent-/historiepresentasjon med Anno 2022-bilde
 * som full høyreside-bakgrunn uten egen bilderamme.
 *
 * Bruksområde:
 * Brukes på /startside som visuell seksjon for regenter, tidslinje og historisk kontekst.
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.regents.preview
 * - catalog.history.view
 * - catalog.relations.view
 *
 * Berørte API-ruter:
 * - Ingen i denne statiske preview-versjonen.
 *
 * Berørte tabeller / views:
 * - Senere: ct_catalog_objects
 * - Senere: ct_catalog_object_relations
 * - Senere: ct_historical_periods
 *
 * Dataretning:
 * Lokal preview-data -> React -> UI.
 *
 * Logging:
 * Ingen i denne preview-komponenten.
 *
 * Versjon:
 * CT-STARTSIDE-REGENTER-ANNO2022-0003 / CHANGE-2026-06-07-FULL-RIGHT-BACKGROUND
 */

import styles from "./CollectiumRegenterAnno2022.module.css";

const regentYears = [
  {
    year: "1872",
    label: "Oscar II",
    href: "/katalog?regent=oscar-ii"
  },
  {
    year: "1905",
    label: "Haakon VII",
    href: "/katalog?regent=haakon-vii"
  },
  {
    year: "1957",
    label: "Olav V",
    href: "/katalog?regent=olav-v"
  },
  {
    year: "1991",
    label: "Harald V",
    href: "/katalog?regent=harald-v"
  }
];

export default function CollectiumRegenterAnno2022() {
  return (
    <section className={styles.regentSection} aria-labelledby="collectium-regenter-title">
      <div className={styles.imageLayer} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.kicker}>
          <span>IV</span>
          <strong>Regenter</strong>
        </p>

        <h2 id="collectium-regenter-title">
          Fra Oscar II
          <br />
          til <em>Harald V.</em>
        </h2>

        <p className={styles.lead}>
          Hver konge har sitt signaturpreg. Klikk på en regent og se alle objekter
          fra hans tid — sedler, mynter, medaljer og merker — sortert etter utgave
          og signatursett.
        </p>

        <div className={styles.yearGrid} aria-label="Regentperioder">
          {regentYears.map((item) => (
            <a key={item.year} href={item.href}>
              <strong>{item.year}</strong>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <div className={styles.actions}>
          <a href="/katalog?segment=historie">Utforsk regenter</a>
          <a href="/katalog?view=tidslinje">Tidslinje</a>
        </div>
      </div>
    </section>
  );
}
