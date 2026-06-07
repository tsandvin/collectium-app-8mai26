"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumCompactCatalogDemo
 *
 * Definering / formål:
 * Kompakt interaktiv katalogdemo for startsiden.
 * Viser hvordan ett objekt kan leses gjennom objektgruppe, periodefilter
 * og segmentene Samler, Historie og Finans.
 *
 * Bruksområde:
 * Brukes i /startside inne i CollectiumStartsideV46React.
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - public.startside.view
 * - public.catalog.preview
 * - catalog.view
 * - catalog.history.view
 * - catalog.market.view
 *
 * Berørte API-ruter:
 * - Ingen direkte i preview.
 *
 * Berørte tabeller / views:
 * - Fremtidig kobling: ct_v_catalog_objects_resolved
 * - Fremtidig kobling: ct_v_catalog_relations
 * - Fremtidig kobling: ct_v_catalog_market_summary
 *
 * Dataretning:
 * Lokal preview-data -> React state -> UI
 *
 * Logging:
 * Ingen DB-logging i preview.
 *
 * Versjon:
 * CT-STARTSIDE-COMPACT-CATALOG-DEMO-0001
 */

import { useMemo, useState } from "react";
import styles from "./CollectiumCompactCatalogDemo.module.css";

type CatalogSegment = "samler" | "historie" | "finans";
type ObjectKind = "banknote" | "coin";
type PeriodMode = "national" | "king" | "signature" | "motif" | "finance";
type PeriodKey =
  | "all"
  | "oscar1"
  | "karl15"
  | "oscar2"
  | "haakon7"
  | "olav5"
  | "winge_getz"
  | "bohn_kielland"
  | "rygg_omsted"
  | "jahn_broch"
  | "riksvapen"
  | "oscar2_portrait"
  | "norges_bank"
  | "haakon7_motif"
  | "early_finance"
  | "krone_ore"
  | "broad_finance"
  | "modern_market";

type PeriodChoice = {
  key: PeriodKey;
  label: string;
  years: string;
  text: string;
};

const periodModeLabels: Record<PeriodMode, string> = {
  national: "Nasjonal periode",
  king: "Konge",
  signature: "Signatur",
  motif: "Motiv/person",
  finance: "Finans",
};

const periodGroups: Record<PeriodMode, PeriodChoice[]> = {
  national: [
    {
      key: "all",
      label: "Alle",
      years: "1844–1985",
      text: "Viser objektet på tvers av kongeperioder, kilder og periodiske relasjoner.",
    },
    {
      key: "oscar1",
      label: "Oscar I",
      years: "1844–1859",
      text: "Tidlig unionsperiode med egne objekt-, mynt- og maktrelasjoner.",
    },
    {
      key: "karl15",
      label: "Karl XV",
      years: "1859–1872",
      text: "Overgang før kroner og øre, relevant for eldre kilde- og objektlag.",
    },
    {
      key: "oscar2",
      label: "Oscar II",
      years: "1872–1905",
      text: "Kongeperioden filtrerer objekt, signaturer og historiske relasjoner.",
    },
    {
      key: "haakon7",
      label: "Haakon VII",
      years: "1905–1957",
      text: "Nasjonal selvstendighet, moderne sedler, mynter og markedsdata.",
    },
    {
      key: "olav5",
      label: "Olav V",
      years: "1957–1985",
      text: "Senere norsk pengehistorie frem til valgt sluttpunkt for denne demoen.",
    },
  ],
  king: [
    {
      key: "oscar1",
      label: "Oscar I",
      years: "1844–1859",
      text: "Kongefilteret kobler objektet mot regent og tilhørende utgaver.",
    },
    {
      key: "karl15",
      label: "Karl XV",
      years: "1859–1872",
      text: "Kongefilteret viser objektfamilier før Oscar II-perioden.",
    },
    {
      key: "oscar2",
      label: "Oscar II",
      years: "1872–1905",
      text: "Oscar II-perioden kobler objekt, signatur, motiv og unionstid.",
    },
    {
      key: "haakon7",
      label: "Haakon VII",
      years: "1905–1957",
      text: "Haakon VII-perioden kobler objekt mot selvstendighet og krigstid.",
    },
    {
      key: "olav5",
      label: "Olav V",
      years: "1957–1985",
      text: "Olav V-perioden kobler moderne objekter mot marked og samling.",
    },
  ],
  signature: [
    {
      key: "winge_getz",
      label: "Winge / Getz",
      years: "1877–1886",
      text: "Signaturperioden viser hvilke signaturer/personer som kobles til objektene.",
    },
    {
      key: "bohn_kielland",
      label: "Bøhn / Kielland",
      years: "1886–1893",
      text: "Signaturfilteret avgrenser samme objektfamilie etter personer.",
    },
    {
      key: "rygg_omsted",
      label: "Rygg / Omsted",
      years: "1907–1913",
      text: "Signaturperioden kobler objektet til Norges Bank og personrelasjoner.",
    },
    {
      key: "jahn_broch",
      label: "Jahn / Broch",
      years: "1920–1939",
      text: "Senere signaturperiode med finans- og utgavekontekst.",
    },
  ],
  motif: [
    {
      key: "riksvapen",
      label: "Riksvåpen",
      years: "1877–1901",
      text: "Person-/motivperioden kobler motiv, symbol og relasjonssider.",
    },
    {
      key: "oscar2_portrait",
      label: "Oscar II portrett",
      years: "1872–1905",
      text: "Motivfilteret binder objektet mot portrett, regent og periode.",
    },
    {
      key: "norges_bank",
      label: "Norges Bank motiv",
      years: "1890–1920",
      text: "Motiv kobles mot utsteder, trykk og institusjon.",
    },
    {
      key: "haakon7_motif",
      label: "Haakon VII motiv",
      years: "1905–1957",
      text: "Motivfilteret viser moderne nasjons- og kongerelasjoner.",
    },
  ],
  finance: [
    {
      key: "early_finance",
      label: "Tidlig økonomi",
      years: "1642+",
      text: "Finansiell periode styrer markeds-/index- og verdikontekst.",
    },
    {
      key: "krone_ore",
      label: "Kroner og øre",
      years: "1873+",
      text: "Pengeenhet, valør og markedslogikk kobles mot moderne katalogdata.",
    },
    {
      key: "broad_finance",
      label: "Bred finansbase",
      years: "ca. 1920+",
      text: "Bredere finansgrunnlag med indeks, prisdata og markedsobservasjoner.",
    },
    {
      key: "modern_market",
      label: "Moderne marked",
      years: "1971–2024",
      text: "Moderne markedsperiode med pris, trend, valuta og metall.",
    },
  ],
};

const segmentText: Record<CatalogSegment, string> = {
  samler:
    "Samler viser brukerstatus, ønskeliste, favoritt, samling og handlinger rundt objektet.",
  historie:
    "Historie viser regent, signatur, motiv, periode og relasjoner rundt objektet.",
  finans:
    "Finans viser verdi, trend, marked, prisregel og relevante økonomiske koblinger.",
};

function getObjectData(objectKind: ObjectKind, period: PeriodChoice) {
  const coin = objectKind === "coin";

  if (coin) {
    const isOscar2 = period.key === "oscar2" || period.key === "oscar2_portrait" || period.key === "riksvapen";
    const isOscar1 = period.key === "oscar1";

    return {
      objectLabel: "Mynt",
      visualTop: isOscar1 ? "1 spd" : isOscar2 ? "2 kr" : "1 kr",
      title: isOscar1
        ? "1 speciedaler · Oscar I"
        : isOscar2
          ? "2 kroner · Oscar II"
          : period.key === "haakon7"
            ? "1 krone · Haakon VII"
            : period.key === "olav5"
              ? "5 kroner · Olav V"
              : "Norsk mynt · periodevalg",
      meta: "Norge · Mynt · Relasjonskatalog",
      price: isOscar1 ? "32 000 kr" : isOscar2 ? "6 500 kr" : "1 250 kr",
      trend: "+3,8 %",
      rarity: isOscar1 ? "RR" : isOscar2 ? "R" : "Vanlig–R",
      specs: [
        ["Valør", isOscar1 ? "1 speciedaler" : isOscar2 ? "2 kroner" : "1 krone"],
        ["År", isOscar1 ? "1847" : isOscar2 ? "1878" : "1914"],
        ["Konge", period.label],
        ["Periode", period.years],
        ["Metall", isOscar1 || isOscar2 ? "Sølv" : "Kobbernikkel"],
        ["Innhold", isOscar1 || isOscar2 ? "800/1000 sølv" : "CuNi / legering"],
        ["Vekt", isOscar1 ? "28,9 g" : isOscar2 ? "15,0 g" : "7,5 g"],
        ["Diameter", isOscar1 ? "39 mm" : isOscar2 ? "31 mm" : "25 mm"],
      ],
    };
  }

  return {
    objectLabel: "Seddel",
    visualTop: period.key === "haakon7" ? "500" : period.key === "olav5" ? "50" : "100",
    title:
      period.key === "haakon7"
        ? "500 kroner · Haakon VII"
        : period.key === "olav5"
          ? "50 kroner · Olav V"
          : "100 kroner · 1. utgave · 1877",
    meta: "Norge · Seddel · Norske sedler",
    price: period.key === "haakon7" ? "28 000 kr" : period.key === "olav5" ? "850 kr" : "15 000 kr",
    trend: "+4,2 %",
    rarity: period.key === "olav5" ? "Vanlig" : "Sjelden",
    specs: [
      ["Valør", period.key === "haakon7" ? "500 kroner" : period.key === "olav5" ? "50 kroner" : "100 kroner"],
      ["År", period.key === "haakon7" ? "1948" : period.key === "olav5" ? "1962" : "1877"],
      ["Utgave", period.key === "haakon7" ? "2. utgave" : "1. utgave"],
      ["Signatur", period.key === "winge_getz" ? "Winge / Getz" : "Winge / Getz"],
      ["Materiale", "Seddelpapir"],
      ["Trykkeri", "Norges Bank"],
      ["Format", "Katalogført"],
      ["Kvalitet", "45 XF"],
    ],
  };
}

export default function CollectiumCompactCatalogDemo() {
  const [objectKind, setObjectKind] = useState<ObjectKind>("banknote");
  const [periodMode, setPeriodMode] = useState<PeriodMode>("national");
  const [periodKey, setPeriodKey] = useState<PeriodKey>("oscar2");
  const [segment, setSegment] = useState<CatalogSegment>("historie");

  const activeChoices = periodGroups[periodMode];

  const activePeriod = useMemo(() => {
    return activeChoices.find((item) => item.key === periodKey) ?? activeChoices[0];
  }, [activeChoices, periodKey]);

  const objectData = useMemo(() => {
    return getObjectData(objectKind, activePeriod);
  }, [objectKind, activePeriod]);

  function changePeriodMode(nextMode: PeriodMode) {
    setPeriodMode(nextMode);
    const first = periodGroups[nextMode][0];
    setPeriodKey(first.key);
  }

  return (
    <section id="katalog" className={styles.contextSection}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <span className={styles.kicker}>III · Katalogdemo</span>
          <h2>Katalogen viser objektet i sammenheng.</h2>
          <p>
            Denne kompakte demoen viser hvordan ett objekt endrer innhold når brukeren bytter
            mellom seddel/mynt, periodefilter og Samler · Historie · Finans.
          </p>
        </div>

        <div className={styles.demoGrid}>
          <div className={styles.controlsPanel}>
            <div className={styles.controlBlock}>
              <span className={styles.controlLabel}>Objektgruppe</span>
              <div className={styles.pillRow}>
                <button
                  type="button"
                  className={objectKind === "banknote" ? styles.active : ""}
                  onClick={() => setObjectKind("banknote")}
                >
                  Seddel
                </button>
                <button
                  type="button"
                  className={objectKind === "coin" ? styles.active : ""}
                  onClick={() => setObjectKind("coin")}
                >
                  Mynt
                </button>
              </div>
            </div>

            <div className={styles.periodPanel}>
              <div className={styles.periodTitle}>
                <span>Periodefilter</span>
                <strong>
                  {activePeriod.label} · {activePeriod.years}
                </strong>
                <p>{activePeriod.text}</p>
              </div>

              <div className={styles.modeTabs}>
                {(Object.keys(periodModeLabels) as PeriodMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={periodMode === mode ? styles.active : ""}
                    onClick={() => changePeriodMode(mode)}
                  >
                    {periodModeLabels[mode]}
                  </button>
                ))}
              </div>

              <div className={styles.periodRail}>
                {activeChoices.map((period) => (
                  <button
                    key={period.key}
                    type="button"
                    className={period.key === activePeriod.key ? styles.selectedPeriod : ""}
                    onClick={() => setPeriodKey(period.key)}
                  >
                    <strong>{period.label}</strong>
                    <span>{period.years}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.controlBlock}>
              <span className={styles.controlLabel}>Visningslag</span>
              <div className={styles.segmentTabs}>
                {(["samler", "historie", "finans"] as CatalogSegment[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={segment === item ? styles.active : ""}
                    onClick={() => setSegment(item)}
                  >
                    {item[0].toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
              <p className={styles.segmentHelp}>{segmentText[segment]}</p>
            </div>
          </div>

          <article className={styles.previewCard}>
            <div className={styles.cardTop}>
              <div className={styles.objectVisual}>
                <span>{objectData.visualTop}</span>
                <small>{objectData.objectLabel}</small>
              </div>

              <div className={styles.objectHeader}>
                <span>{objectData.meta}</span>
                <h3>{objectData.title}</h3>
                <p>
                  {activePeriod.label} · {activePeriod.years} · {periodModeLabels[periodMode]}
                </p>
              </div>
            </div>

            <div className={styles.specGrid}>
              {objectData.specs.map(([label, value]) => (
                <div key={`${label}-${value}`}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className={styles.segmentBox}>
              <span>{segment.toUpperCase()}</span>

              {segment === "samler" ? (
                <p>
                  Hjerte, stjerne, Min samling og private handlinger ligger som brukerstatus på objektet.
                </p>
              ) : null}

              {segment === "historie" ? (
                <p>
                  Objektet kobles mot {activePeriod.label}, periode, signatur, motiv og kilde som egne relasjoner.
                </p>
              ) : null}

              {segment === "finans" ? (
                <p>
                  Estimert pris {objectData.price}, trend {objectData.trend}. 0 kr betyr manglende vurdering, ikke markedsverdi.
                </p>
              ) : null}
            </div>

            <div className={styles.marketRow}>
              <div>
                <span>Estimert pris</span>
                <strong>{objectData.price}</strong>
              </div>
              <div>
                <span>Trend 12 mnd</span>
                <strong>{objectData.trend}</strong>
              </div>
              <div>
                <span>Sjeldenhet</span>
                <strong>{objectData.rarity}</strong>
              </div>
            </div>

            <div className={styles.actions}>
              <a href="/katalog">Åpne objekt</a>
              <a href="/katalog?relasjon=1">Se relasjon</a>
              <a href="/min-side">Legg i samling</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
