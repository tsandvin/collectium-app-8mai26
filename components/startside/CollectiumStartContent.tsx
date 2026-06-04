/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Start Content
 *
 * Definering / formål:
 * Innholdskomponent for /startside og /landingsside. Komponenten inneholder
 * presentasjonsinnhold og statiske preview-felt. Ekte katalog-, index-, marked-,
 * medlemskap- og auksjonsdata skal senere hentes fra API/MariaDB.
 *
 * Bruksområde:
 * Brukes inne i CollectiumStartTemplate.
 *
 * Berørte sider / routes:
 * - /startside
 * - /landingsside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 * - landing.register
 * - landing.login
 * - landing.membership
 * - catalog.view
 * - index.view
 * - auction.public.view
 * - dealer.public.view
 *
 * Berørte API-ruter:
 * - GET /api/catalog/featured senere
 * - GET /api/index/market-preview senere
 * - GET /api/membership/plans senere
 *
 * Berørte tabeller / views:
 * - ct_v_catalog_objects_resolved senere
 * - ct_v_catalog_market_summary senere
 * - ct_v_feature_access_resolved senere
 *
 * Dataretning:
 * MariaDB/API senere -> Next.js -> React -> UI.
 *
 * Logging:
 * log_category: landing
 * log_action: content.view
 *
 * Versjon:
 * CT-FILE-START-V30-CONTENT / CHANGE-2026-06-05-START-V30
 */

import Link from "next/link";
import styles from "../templates/CollectiumStartTemplate.module.css";

const perspectives = [
  {
    title: "Samler",
    label: "Brukerstatus",
    text: "Bygg samling, ønskeliste og favoritter. Se egne objekter, kvalitet, dokumentasjon, deling og aktivitet samlet i ett system.",
  },
  {
    title: "Historie",
    label: "Relasjoner",
    text: "Katalogen skal vise konge, periode, utgave, signaturer, materiale, funn, produsent og historiske koblinger rundt objektet.",
  },
  {
    title: "Finans",
    label: "Marked",
    text: "Følg verdi, trend, prisobservasjoner, auksjon, nettbutikk, likviditet og utvikling over tid når datagrunnlaget er klart.",
  },
];

const objectCards = [
  {
    title: "1 krone · 1917-serien",
    meta: "NSNR 23a · Norske sedler",
    relation: "Haakon VII · Sikkerhetspapir · Litra A",
    value: "Ikke vurdert",
  },
  {
    title: "100 kroner · 1. utgave",
    meta: "Norske sedler · Banknote",
    relation: "Norges Bank · Historisk utgave",
    value: "Marked kommer fra API",
  },
  {
    title: "2 kroner · Jubileum",
    meta: "Mynt · Relasjonsobjekt",
    relation: "Regent · Metall · Historisk periode",
    value: "Trend senere",
  },
];

const plans = ["Free", "Bronze", "Silver", "Gold", "Platinum"];

export function CollectiumStartContent() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="collectium-start-title">
        <div className={styles.yearWatermarkTop}>2022</div>
        <div className={styles.heroText}>
          <p className={styles.kicker}>Norske sedler · mynter · arkiv</p>
          <h1 id="collectium-start-title">Collectium</h1>
          <p className={styles.lead}>Samlerplattformen for norske sedler, mynter, historie og markedsutvikling.</p>
          <p className={styles.bodyText}>
            I Collectium bygger vi en relasjonskatalog rundt norske sedler og mynter. Plattformen skal samle katalogdata,
            historiske relasjoner, samlingsverdi, auksjoner, forhandlerobjekter og markedsutvikling i én kontrollert flate.
          </p>
          <div className={styles.heroButtons}>
            <Link className={`${styles.button} ${styles.buttonPrimary}`} href="/katalog" data-feature-key="catalog.view">
              Utforsk katalogen
            </Link>
            <Link className={`${styles.button} ${styles.buttonGold}`} href="/registrering" data-feature-key="landing.register">
              Bli medlem
            </Link>
            <Link className={`${styles.button} ${styles.buttonLight}`} href="/login" data-feature-key="landing.login">
              Logg inn
            </Link>
          </div>
        </div>

        <aside className={styles.previewCard} aria-label="Katalogpreview">
          <div className={styles.previewMedia}>Collectium katalogpreview</div>
          <div className={styles.previewTabs}>
            <span>Samler</span>
            <span>Historie</span>
            <span>Finans</span>
          </div>
          <h2>Relasjonskatalog</h2>
          <p>Object_id + object_group + source_key er teknisk nøkkel. Frontend viser, API/MariaDB er sannhet.</p>
          <div className={styles.valueBox}>
            <span>Datagrunnlag</span>
            <strong>ca. 3000 objekter</strong>
            <span>Status</span>
            <strong>DB/API senere</strong>
          </div>
          <div className={styles.signature}>Collectium</div>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>I. Hva vil du utforske</p>
          <h2>Samme katalog, tre perspektiver</h2>
          <p>Katalogen kan leses som samlerverktøy, historisk relasjonsplattform eller markedsoversikt.</p>
        </div>
        <div className={styles.panelGrid}>
          {perspectives.map((item) => (
            <article className={styles.panel} key={item.title}>
              <p className={styles.eyebrow}>{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className={styles.signature}>Collectium</div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.catalogPreview}`}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>II. Katalogkort</p>
          <h2>Objektkort skal være inngang til full objektpresentasjon</h2>
          <p>Klikk på objekt skal senere gå til /objekt/[sourceKey]/[objectGroup]/[objectId].</p>
        </div>
        <div className={styles.catalogCards}>
          {objectCards.map((item, index) => (
            <article className={styles.objectCard} key={item.title}>
              <div className={styles.objectImage}>Objektbilde {index + 1}</div>
              <div className={styles.objectBody}>
                <h3>{item.title}</h3>
                <p>{item.meta}</p>
                <p>{item.relation}</p>
              </div>
              <div className={styles.objectFooter}>
                <span>{item.value}</span>
                <Link href="/katalog" data-feature-key="catalog.view">Åpne</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>III. Medlemskap</p>
          <h2>Tilgang skal styres av medlemskap og DB-brytere</h2>
          <p>Free, Bronze, Silver, Gold og Platinum skal åpne ulike nivåer av katalog, historie, finans og analyse.</p>
        </div>
        <div className={styles.planGrid}>
          {plans.map((plan) => (
            <article className={plan === "Gold" ? `${styles.plan} ${styles.planFeatured}` : styles.plan} key={plan}>
              <h3>{plan}</h3>
              <p>Tilgangsnivå kobles senere mot ct_v_feature_access_resolved.</p>
              <Link className={`${styles.button} ${styles.buttonLight}`} href="/medlemskap" data-feature-key="landing.membership">
                Se nivå
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <p className={styles.kicker}>Collectium</p>
        <h2>Start med katalogen. Bygg samlingen. Forstå historien.</h2>
        <p>
          Dette er en offentlig presentasjonsflate. Private data, admin, API, forhandlerprosesser og systemtester skal holdes bak tilgang.
        </p>
        <div className={styles.heroButtons}>
          <Link className={`${styles.button} ${styles.buttonGold}`} href="/registrering" data-feature-key="landing.register">
            Registrer deg gratis
          </Link>
          <Link className={`${styles.button} ${styles.buttonLight}`} href="/katalog" data-feature-key="catalog.view">
            Gå til katalog
          </Link>
        </div>
      </section>
    </>
  );
}
