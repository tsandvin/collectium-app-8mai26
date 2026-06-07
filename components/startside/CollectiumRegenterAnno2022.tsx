'use client';

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumRegenterAnno2022
 *
 * Definering / formål:
 * Regentfelt for startsiden med mørk Collectium/ANNO 2022-visning.
 * Viser hvordan regenter brukes som historisk relasjonsinngang til sedler,
 * mynter, medaljer, merker, signaturer og perioder.
 *
 * Bruksområde:
 * Brukes i /startside.
 *
 * Berørte sider / routes:
 * - /startside
 * - /katalog
 * - fremtidig /regenter
 * - fremtidig /objekt/[sourceKey]/[objectGroup]/[objectId]
 *
 * Berørte DB-brytere / feature_keys:
 * - public.startside.view
 * - catalog.history.view
 * - catalog.relations.view
 * - catalog.regent.filter
 *
 * Berørte API-ruter:
 * - Fremtidig: GET /api/catalog/relations/regents
 * - Fremtidig: GET /api/catalog/objects?relation=regent
 *
 * Berørte tabeller / views:
 * - Fremtidig: ct_v_catalog_objects_resolved
 * - Fremtidig: ct_v_catalog_relations
 * - Fremtidig: ct_v_catalog_regents
 *
 * Dataretning:
 * Preview-data -> React -> UI.
 * Fremtidig: MariaDB -> API/backend -> Next.js -> React -> UI.
 *
 * Logging:
 * Ingen DB-logging i preview.
 *
 * Versjon:
 * CT-STARTSIDE-REGENTER-ANNO2022-0001
 */

import styles from './CollectiumRegenterAnno2022.module.css';

const regentYears = [
  { year: '1872', label: 'Oscar II' },
  { year: '1905', label: 'Haakon VII' },
  { year: '1957', label: 'Olav V' },
  { year: '1991', label: 'Harald V' },
];

export default function CollectiumRegenterAnno2022() {
  return (
    <section className={styles.regentSection} aria-labelledby="collectium-regenter-title">
      <div className={styles.inner}>
        <div className={styles.textCol}>
          <div className={styles.kicker}>
            <span>IV</span>
            <strong>Regenter</strong>
          </div>

          <h2 id="collectium-regenter-title">
            Fra Oscar II <br />
            til <em>Harald V.</em>
          </h2>

          <p>
            Hver konge har sitt signaturpreg. Klikk på en regent og se alle objekter
            fra hans tid — sedler, mynter, medaljer og merker — sortert etter utgave,
            periode, motiv og signatursett.
          </p>

          <div className={styles.yearGrid} aria-label="Regentperioder">
            {regentYears.map((item) => (
              <a key={item.year} href={/katalog?regent=}>
                <strong>{item.year}</strong>
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <div className={styles.actions}>
            <a className={styles.primary} href="/katalog?filter=regenter">
              Utforsk regenter
            </a>
            <a className={styles.secondary} href="/katalog?visning=tidslinje">
              Tidslinje
            </a>
          </div>
        </div>

        <a className={styles.imageCard} href="/katalog?filter=regenter" aria-label="Åpne regentrelasjoner i katalogen">
          <img src="/collectium-tema/collectium-tema-anno-2022-portrett.png" alt="Collectium ANNO 2022 regentmotiv" />
        </a>
      </div>
    </section>
  );
}
