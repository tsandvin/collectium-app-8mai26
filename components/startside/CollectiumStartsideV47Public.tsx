"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumStartsideV47Public
 *
 * Definering / formål:
 * Ny offentlig startside for Collectium uten app-sidemeny.
 *
 * Bruksområde:
 * Brukes kun av /startside inne i CollectiumPublicShell.
 *
 * Berørte DB-brytere / feature_keys:
 * - public.startside.view
 * - public.catalog.preview
 *
 * Berørte API-ruter:
 * - Ingen direkte i v47. Dette er statisk public preview.
 *
 * Berørte tabeller / views:
 * - Ingen direkte.
 *
 * Dataretning:
 * Public content -> React UI
 *
 * Versjon:
 * CT-STARTSIDE-V47-PUBLIC-0001
 */

import styles from "./CollectiumStartsideV47Public.module.css";

const previewFields = [
  "Overskrift",
  "Valørutgave / serie",
  "Utgave",
  "Variant",
  "Sjeldenhet",
];

export default function CollectiumStartsideV47Public() {
  return (
    <section className={styles.page} aria-labelledby="startside-title">
      <div className={styles.hero}>
        <article className={styles.heroText}>
          <p className={styles.year}>2022</p>
          <p className={styles.kicker}>For samlere · For historien · For markedet</p>

          <h1 id="startside-title">
            For samlere.
            <br />
            Av samlere.
            <br />
            Alt på ett sted.
          </h1>

          <p className={styles.lead}>
            Samlerplattformen for norske sedler, mynter, historie og markedsutvikling.
          </p>

          <p className={styles.body}>
            Utforsk katalogobjekter, historiske relasjoner, samlingsverdi, auksjoner og
            forhandlerobjekter — samlet i én plattform under ett tak.
          </p>

          <div className={styles.actions}>
            <a href="/registrering" className={styles.primary}>Start gratis</a>
            <a href="/katalog" className={styles.secondary}>Se katalog</a>
          </div>
        </article>

        <article className={styles.preview} aria-label="Katalogvisning forhåndsvisning">
          <div className={styles.segment}>
            <span>Samler</span>
            <span>Historie</span>
            <span>Finans</span>
          </div>

          <div className={styles.watermark}>Katalog</div>

          <div className={styles.objectCard}>
            <div className={styles.objectImage}>
              <span>Katalog</span>
            </div>

            <div className={styles.objectInfo}>
              <p>NSNR 23a · Norske sedler</p>
              <h2>1 krone · 1917-serien · Litra A</h2>
              <p>Norges Bank · Haakon VII · Seddel / sikkerhetspapir</p>

              <div className={styles.fieldGrid}>
                {previewFields.map((field) => (
                  <span key={field}>{field}</span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.noteCard}>
            <p>Visningskort · Samler</p>
            <h3>Samlerstatus på objektet</h3>
            <span>
              Kortet prioriterer hjerte, stjerne, Min samling, kvalitet, sjeldenhet og
              brukerens egne kjøp, salg og dokumentasjon.
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
