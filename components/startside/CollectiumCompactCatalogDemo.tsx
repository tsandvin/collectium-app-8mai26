"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumCompactCatalogDemo
 *
 * Definering / formål:
 * Kompakt startside-demo for hvordan katalogen viser objekt, periodefilter,
 * Samler/Historie/Finans-segment og medlemskapsstyrt filtertilgang.
 *
 * Bruksområde:
 * Brukes på /startside som presentasjonsseksjon under "Katalogen viser objektet i sammenheng."
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.catalog.preview
 * - catalog.view
 * - catalog.filters
 * - catalog.history.view
 * - catalog.market.view
 * - membership.access.preview
 *
 * Berørte API-ruter:
 * - Ingen i denne statiske preview-versjonen.
 * - Senere: /api/catalog, /api/object, /api/membership/access
 *
 * Berørte tabeller / views:
 * - Senere: ct_catalog_objects
 * - Senere: ct_v_feature_access_resolved
 * - Senere: ct_feature_action_routes
 *
 * Dataretning:
 * Lokal preview-data -> React state -> UI.
 * MariaDB/API skal være sannhet når dette kobles videre.
 *
 * Logging:
 * Ingen i denne preview-komponenten.
 *
 * Versjon:
 * CT-STARTSIDE-CATALOG-DEMO-0007 / CHANGE-2026-06-07-MEMBERSHIP-FILTER-PANEL
 */

import { useMemo, useState } from "react";
import styles from "./CollectiumCompactCatalogDemo.module.css";

type SegmentKey = "samler" | "historie" | "finans";
type ObjectKind = "banknote" | "coin";
type PeriodMode = "national" | "king" | "signature" | "motif" | "finance";

const segmentLabels: Record<SegmentKey, string> = {
  samler: "Samler",
  historie: "Historie",
  finans: "Finans"
};

const periodModes: Array<{ key: PeriodMode; label: string }> = [
  { key: "national", label: "Nasjonal periode" },
  { key: "king", label: "Konge" },
  { key: "signature", label: "Signatur" },
  { key: "motif", label: "Motiv/person" },
  { key: "finance", label: "Finans" }
];

const periodSets: Record<
  PeriodMode,
  {
    title: string;
    subtitle: string;
    helper: string;
    items: Array<{ label: string; years: string; tone: "gold" | "green" | "dark" | "muted" }>;
  }
> = {
  national: {
    title: "Nasjonale perioder",
    subtitle: "1814–2024",
    helper: "Viser hvordan objekt, regent, signatur og marked ligger i samme tidsrom.",
    items: [
      { label: "1814", years: "1814–1844", tone: "gold" },
      { label: "Oscar I", years: "1844–1859", tone: "gold" },
      { label: "Karl XV", years: "1859–1872", tone: "muted" },
      { label: "Oscar II", years: "1872–1905", tone: "green" },
      { label: "Haakon VII", years: "1905–1957", tone: "muted" },
      { label: "Olav V", years: "1957–1985", tone: "dark" }
    ]
  },
  king: {
    title: "Oscar II",
    subtitle: "1872–1905",
    helper: "Kongeperioden filtrerer objekt, signaturer og historiske relasjoner.",
    items: [
      { label: "Oscar I", years: "1844–1859", tone: "gold" },
      { label: "Karl XV", years: "1859–1872", tone: "muted" },
      { label: "Oscar II", years: "1872–1905", tone: "green" },
      { label: "Haakon VII", years: "1905–1957", tone: "muted" },
      { label: "Olav V", years: "1957–1985", tone: "dark" }
    ]
  },
  signature: {
    title: "Winge / Getz",
    subtitle: "1877–1886",
    helper: "Signaturperioden viser hvilke personer og signatursett som kobles til objektet.",
    items: [
      { label: "Winge / Getz", years: "1877–1886", tone: "green" },
      { label: "Bøhn / Kielland", years: "1886–1893", tone: "muted" },
      { label: "Rygg / Omsted", years: "1907–1913", tone: "dark" },
      { label: "Jahn / Broch", years: "1920–1939", tone: "gold" }
    ]
  },
  motif: {
    title: "Riksvåpen",
    subtitle: "1877–1901",
    helper: "Motiv/person kobler symbol, portrett, motivfelt og relasjonssider.",
    items: [
      { label: "Riksvåpen", years: "1877–1901", tone: "green" },
      { label: "Oscar II portrett", years: "1872–1905", tone: "gold" },
      { label: "Norges Bank", years: "1890–1920", tone: "muted" },
      { label: "Haakon VII motiv", years: "1905–1957", tone: "dark" }
    ]
  },
  finance: {
    title: "Tidlig økonomi",
    subtitle: "1642+",
    helper: "Finansiell periode styrer markeds-, indeks- og verdikontekst.",
    items: [
      { label: "Tidlig økonomi", years: "1642+", tone: "gold" },
      { label: "Kroner og øre", years: "1873+", tone: "green" },
      { label: "Bred finansbase", years: "ca. 1920+", tone: "muted" },
      { label: "Moderne marked", years: "1971–2024", tone: "dark" }
    ]
  }
};

const membershipRows = [
  {
    tier: "Free",
    title: "Enkel katalogvisning",
    text: "Ser utvalgte objekter, basisinformasjon og begrensede filtre."
  },
  {
    tier: "Bronze",
    title: "Samling og brukerstatus",
    text: "Organiserer egen samling med hjerte, stjerne og grunnleggende lister."
  },
  {
    tier: "Silver",
    title: "Flere katalogfiltre",
    text: "Åpner flere filterlag, historikk og tydeligere objektkoblinger."
  },
  {
    tier: "Gold",
    title: "Dypere innsikt",
    text: "Gir mer historisk og finansiell analyse for valgt marked/land."
  },
  {
    tier: "Platinum",
    title: "Full filterdybde",
    text: "Gir bredeste tilgang til land, relasjoner, analysefelt og datalag."
  }
];

const segmentText: Record<SegmentKey, string> = {
  samler: "Hjerte, stjerne, Min samling, dokumentasjon og egne handlinger.",
  historie: "Regent, periode, signatur, motiv/person og historiske relasjoner.",
  finans: "Markedsverdi, trend, observasjoner, prisgrunnlag og verdiutvikling."
};

export default function CollectiumCompactCatalogDemo() {
  const [segment, setSegment] = useState<SegmentKey>("historie");
  const [objectKind, setObjectKind] = useState<ObjectKind>("banknote");
  const [periodMode, setPeriodMode] = useState<PeriodMode>("king");

  const currentPeriod = periodSets[periodMode];

  const objectData = useMemo(() => {
    if (objectKind === "coin") {
      return {
        typeLabel: "Mynt",
        amount: "2 kroner",
        year: "1902",
        title: "2 kroner · 1902",
        issuer: "NORGES MYNT",
        issue: "Jubileumsmynt",
        variant: "Sølvmynt",
        rarity: "Etterspurt",
        meta: "Mynt · Norske mynter · Oscar II · KM 365",
        price: "1 850 kr",
        materialA: "Sølv",
        materialB: "0,800",
        materialC: "15 g"
      };
    }

    return {
      typeLabel: "Seddel",
      amount: "100 kroner",
      year: "1877",
      title: "100 kroner · 1877",
      issuer: "NORGES BANK",
      issue: "1. utgave",
      variant: "Standardutgave",
      rarity: "Sjelden",
      meta: "Seddel · Norske sedler · Oscar II · NS 1459",
      price: "15 000 kr",
      materialA: "Seddelpapir",
      materialB: "Winge / Getz",
      materialC: "Riksvåpen"
    };
  }, [objectKind]);

  return (
    <section className={styles.catalogSection} aria-labelledby="catalog-demo-title">
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.kicker}>Katalog</p>
          <h2 id="catalog-demo-title">Katalogen viser objektet i sammenheng.</h2>
          <p>
            Periodefilteret viser overlapp mellom konger, signaturer, motiv og finansperioder.
            Visningskortet bytter innhold etter Samler, Historie, Finans og objektgruppe.
          </p>
        </div>

        <div className={styles.kindSwitch} aria-label="Velg objektgruppe">
          <button
            type="button"
            className={objectKind === "banknote" ? styles.isActive : ""}
            onClick={() => setObjectKind("banknote")}
          >
            Seddel
          </button>
          <button
            type="button"
            className={objectKind === "coin" ? styles.isActive : ""}
            onClick={() => setObjectKind("coin")}
          >
            Mynt
          </button>
        </div>
      </div>

      <div className={styles.periodCard}>
        <div className={styles.periodTop}>
          <div>
            <p className={styles.kicker}>Periodefilter</p>
            <h3>{currentPeriod.title} · {currentPeriod.subtitle}</h3>
            <p>{currentPeriod.helper}</p>
          </div>

          <div className={styles.periodButtons} aria-label="Velg periodisk filter">
            {periodModes.map((item) => (
              <button
                key={item.key}
                type="button"
                className={periodMode === item.key ? styles.isActive : ""}
                onClick={() => setPeriodMode(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.timeline}>
          <div className={styles.periodTracks}>
            {currentPeriod.items.map((item) => (
              <button
                key={`${item.label}-${item.years}`}
                type="button"
                className={`${styles.periodPill} ${styles[item.tone]}`}
                onClick={() => undefined}
              >
                <strong>{item.label}</strong>
                <span>{item.years}</span>
              </button>
            ))}
          </div>

          <div className={styles.timelineLine} aria-hidden="true">
            <span />
            <i />
            <i />
            <i />
            <i />
          </div>

          <div className={styles.timelineYears}>
            <span>1814</span>
            <span>1872</span>
            <span>1905</span>
            <span>1957</span>
            <span>2024</span>
          </div>
        </div>

        <div className={styles.periodFoot}>
          <span>Aktiv overstyring: {currentPeriod.title} · {currentPeriod.subtitle}</span>
          <span>Periodevalg = aktiv overstyring av utvidet filter</span>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftColumn}>
          <div className={styles.segmentTabs} aria-label="Velg katalogsegment">
            {(["samler", "historie", "finans"] as SegmentKey[]).map((key) => (
              <button
                key={key}
                type="button"
                className={segment === key ? styles.isActive : ""}
                onClick={() => setSegment(key)}
              >
                {segmentLabels[key]}
              </button>
            ))}
          </div>

          <div className={styles.objectCard}>
            <div className={styles.objectStamp}>
              <strong>{objectKind === "coin" ? "2" : "100"}</strong>
              <span>{objectData.issuer}</span>
              <small>{objectKind === "coin" ? "SØLV" : "1872–1905"}</small>
            </div>

            <div className={styles.objectMain}>
              <h3>{objectData.title}</h3>

              <div className={styles.factGrid}>
                <div>
                  <span>Valørutgave</span>
                  <strong>{objectData.amount}</strong>
                </div>
                <div>
                  <span>Utgave</span>
                  <strong>{objectData.issue}</strong>
                </div>
                <div>
                  <span>Variant / type</span>
                  <strong>{objectData.variant}</strong>
                </div>
                <div>
                  <span>Sjeldenhet</span>
                  <strong>{objectData.rarity}</strong>
                </div>
              </div>

              <p className={styles.metaLine}>{objectData.meta}</p>
            </div>

            <div className={styles.statusStack}>
              <InfoBadge icon="♡" label="Hjerte" value="0" />
              <InfoBadge icon="☆" label="Stjerne" value="0" />
              <InfoBadge icon="⚒" label="Auksjon" value="3" />
              <InfoBadge icon="▦" label="Nettbutikk" value="1" />

              <div className={styles.priceBox}>
                <span>Estimert pris</span>
                <strong>{objectData.price}</strong>
                <small>Vurdert</small>
              </div>
            </div>
          </div>

          <div className={styles.dynamicCard}>
            <div className={styles.dynamicIcon}>{segment === "finans" ? "↗" : segment === "samler" ? "♡" : "▥"}</div>

            <div className={styles.dynamicContent}>
              <div className={styles.dynamicTitle}>
                <h3>{segmentLabels[segment]} · dynamisk felt</h3>
                <p>{segmentText[segment]}</p>
              </div>

              <div className={styles.dynamicGrid}>
                <DataLine label="Regent / konge" value={periodMode === "finance" ? "Tidlig økonomi" : "Oscar II"} />
                <DataLine label="Periode" value={currentPeriod.subtitle} />
                <DataLine label={objectKind === "coin" ? "Metall" : "Signatur"} value={objectKind === "coin" ? objectData.materialA : objectData.materialB} />
                <DataLine label={objectKind === "coin" ? "Innhold" : "Motiv / person"} value={objectKind === "coin" ? `${objectData.materialB} · ${objectData.materialC}` : objectData.materialC} />
                <DataLine label="Historisk kontekst" value="Unionstid, norsk seddelhistorie" />
                <DataLine label="Forklaring" value="Objektet kobles til regent, signatur og motiv/person." />
              </div>

              <div className={styles.actionRow}>
                <button type="button">Åpne objekt</button>
                <button type="button">Se relasjon</button>
                <button type="button">Legg i samling</button>
                <button type="button" aria-label="Flere valg">…</button>
              </div>
            </div>
          </div>
        </div>

        <aside className={styles.rightColumn} aria-label="Medlemskap og filtertilgang">
          <div className={styles.accessPanel}>
            <div className={styles.panelHead}>
              <div className={styles.panelIcon}>☷</div>
              <div>
                <p className={styles.kicker}>Medlemskap</p>
                <h3>Medlemskap og katalogtilgang</h3>
              </div>
            </div>

            <p className={styles.panelIntro}>
              Som medlem kan du organisere din samling og bruke katalogen som et arbeidsverktøy.
              Tilgangsnivået bestemmer hvor dypt du kan filtrere, sammenligne og lese historiske,
              samlermessige og finansielle datalag.
            </p>

            <div className={styles.membershipList}>
              {membershipRows.map((row) => (
                <div key={row.tier} className={styles.membershipRow}>
                  <strong>{row.tier}</strong>
                  <div>
                    <span>{row.title}</span>
                    <p>{row.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.accessPanel}>
            <div className={styles.panelHead}>
              <div className={styles.panelIcon}>⌁</div>
              <div>
                <p className={styles.kicker}>Filter</p>
                <h3>Slik fungerer filtrene</h3>
              </div>
            </div>

            <div className={styles.explainList}>
              <p>
                <strong>Periodefilter</strong>
                viser overlapp mellom regenter, signaturer, motiv/person og finansperioder.
              </p>
              <p>
                <strong>Samler · Historie · Finans</strong>
                bytter innholdet i visningskortet uten å endre objektets tekniske nøkkel.
              </p>
              <p>
                <strong>Profil og medlemskap</strong>
                styrer hvilke filterlag, markedsdata og relasjonsfelt som vises.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function InfoBadge({
  icon,
  label,
  value
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className={styles.infoBadge}>
      <span aria-hidden="true">{icon}</span>
      <strong>{label}</strong>
      <b>{value}</b>
    </div>
  );
}

function DataLine({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className={styles.dataLine}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
