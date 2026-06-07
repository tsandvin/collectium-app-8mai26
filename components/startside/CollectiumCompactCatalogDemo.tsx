"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumCompactCatalogDemo
 *
 * Definering / formål:
 * Kompakt katalogdemo for startsiden. Viser katalogobjekt i sammenheng
 * med Samler / Historie / Finans, Seddel / Mynt og periodefilter
 * som ekte overlappende tidslinje.
 *
 * Bruksområde:
 * Brukes under katalogfeltet på /startside.
 *
 * Berørte sider / routes:
 * - /startside
 * - /katalog
 * - /objekt/[sourceKey]/[objectGroup]/[objectId]
 *
 * Berørte DB-brytere / feature_keys:
 * - public.startside.view
 * - catalog.view
 * - catalog.filters
 * - catalog.object.open
 * - catalog.history.view
 * - catalog.market.view
 * - collection.favorite.toggle
 * - collection.wishlist.toggle
 *
 * Berørte API-ruter:
 * - Fremtidig: GET /api/catalog/object
 * - Fremtidig: GET /api/catalog/relations
 * - Fremtidig: GET /api/catalog/market
 *
 * Berørte tabeller / views:
 * - Fremtidig: ct_v_catalog_objects_resolved
 * - Fremtidig: ct_v_catalog_relations
 * - Fremtidig: ct_v_catalog_market_summary
 * - Fremtidig: ct_v_catalog_user_state
 *
 * Dataretning:
 * Preview-data -> React state -> UI.
 * Fremtidig: MariaDB -> API/backend -> Next.js -> React -> UI.
 *
 * Logging:
 * Ingen DB-logging i preview.
 *
 * Versjon:
 * CT-STARTSIDE-CATALOG-DEMO-UI85-0004 / CHANGE-2026-06-07-COMPACT-TIMELINE
 */

import { useMemo, useState } from "react";
import styles from "./CollectiumCompactCatalogDemo.module.css";

type SegmentKey = "samler" | "historie" | "finans";
type ObjectKind = "banknote" | "coin";
type FilterMode = "national" | "king" | "signature" | "motif" | "finance";
type TimelineTone = "accent" | "accentSoft" | "signature" | "muted" | "accentDark";

type TimelineItem = {
  id: string;
  label: string;
  years: string;
  left: string;
  width: string;
  tone: TimelineTone;
};

type TimelineMode = {
  eyebrow: string;
  title: string;
  description: string;
  activeText: string;
  defaultActiveId: string;
  items: TimelineItem[];
};

const timelineModes: Record<FilterMode, TimelineMode> = {
  national: {
    eyebrow: "Periodefilter",
    title: "Nasjonale perioder · 1814–2024",
    description:
      "Periodene viser objektene i større historiske hovedfaser og lar katalogen filtrere på epoke.",
    activeText: "Aktiv overstyring: Nasjonale perioder",
    defaultActiveId: "n3",
    items: [
      { id: "n1", label: "1814", years: "1814–1844", left: "0%", width: "16%", tone: "accentSoft" },
      { id: "n2", label: "Oscar I", years: "1844–1859", left: "14%", width: "11%", tone: "signature" },
      { id: "n3", label: "Oscar II", years: "1872–1905", left: "28%", width: "18%", tone: "accent" },
      { id: "n4", label: "Haakon VII", years: "1905–1957", left: "45%", width: "24%", tone: "muted" },
      { id: "n5", label: "Olav V", years: "1957–1985", left: "67%", width: "16%", tone: "accentDark" }
    ]
  },
  king: {
    eyebrow: "Periodefilter",
    title: "Oscar II · 1872–1905",
    description:
      "Kongeperioden filtrerer objekt, signaturer og historiske relasjoner.",
    activeText: "Aktiv overstyring: Oscar II · 1872–1905",
    defaultActiveId: "k3",
    items: [
      { id: "k1", label: "Oscar I", years: "1844–1859", left: "14%", width: "10%", tone: "accentSoft" },
      { id: "k2", label: "Karl XV", years: "1859–1872", left: "22%", width: "9%", tone: "signature" },
      { id: "k3", label: "Oscar II", years: "1872–1905", left: "29%", width: "18%", tone: "accent" },
      { id: "k4", label: "Haakon VII", years: "1905–1957", left: "45%", width: "24%", tone: "muted" },
      { id: "k5", label: "Olav V", years: "1957–1985", left: "67%", width: "16%", tone: "accentDark" }
    ]
  },
  signature: {
    eyebrow: "Periodefilter",
    title: "Winge / Getz · 1877–1886",
    description:
      "Signaturperioden viser hvilke signaturer og personer som kobles til objektene.",
    activeText: "Aktiv overstyring: Winge / Getz · 1877–1886",
    defaultActiveId: "s1",
    items: [
      { id: "s1", label: "Winge / Getz", years: "1877–1886", left: "30%", width: "13%", tone: "accent" },
      { id: "s2", label: "Bøhn / Kielland", years: "1886–1893", left: "39%", width: "12%", tone: "signature" },
      { id: "s3", label: "Rygg / Omsted", years: "1907–1913", left: "48%", width: "10%", tone: "muted" },
      { id: "s4", label: "Jahn / Broch", years: "1920–1939", left: "58%", width: "17%", tone: "accentDark" }
    ]
  },
  motif: {
    eyebrow: "Periodefilter",
    title: "Riksvåpen · 1877–1901",
    description:
      "Motivperioden kobler motiv, portrett, symbol og relasjonssider.",
    activeText: "Aktiv overstyring: Riksvåpen · 1877–1901",
    defaultActiveId: "m1",
    items: [
      { id: "m1", label: "Riksvåpen", years: "1877–1901", left: "29%", width: "16%", tone: "accent" },
      { id: "m2", label: "Oscar II portrett", years: "1872–1905", left: "27%", width: "19%", tone: "signature" },
      { id: "m3", label: "Norges Bank", years: "1890–1920", left: "40%", width: "18%", tone: "muted" },
      { id: "m4", label: "Haakon VII", years: "1905–1957", left: "45%", width: "24%", tone: "accentDark" }
    ]
  },
  finance: {
    eyebrow: "Periodefilter",
    title: "Tidlig økonomi · 1642+",
    description:
      "Finansiell periode styrer markeds-, indeks- og verdikontekst.",
    activeText: "Aktiv overstyring: Tidlig økonomi · 1642+",
    defaultActiveId: "f1",
    items: [
      { id: "f1", label: "Tidlig økonomi", years: "1642+", left: "0%", width: "28%", tone: "accentSoft" },
      { id: "f2", label: "Kroner og øre", years: "1873+", left: "29%", width: "18%", tone: "accent" },
      { id: "f3", label: "Bred finansbase", years: "ca. 1920+", left: "50%", width: "20%", tone: "muted" },
      { id: "f4", label: "Moderne marked", years: "1971–2024", left: "70%", width: "30%", tone: "accentDark" }
    ]
  }
};

const modeButtons: Array<{ key: FilterMode; label: string }> = [
  { key: "national", label: "Nasjonal periode" },
  { key: "king", label: "Konge" },
  { key: "signature", label: "Signatur" },
  { key: "motif", label: "Motiv/person" },
  { key: "finance", label: "Finans" }
];

function getPreview(kind: ObjectKind, item: TimelineItem, segment: SegmentKey) {
  const isCoin = kind === "coin";
  const oscar = item.label.includes("Oscar") || item.id.includes("3") || item.id === "m1" || item.id === "s1";

  if (isCoin) {
    return {
      objectHref: "/objekt/norske_mynter/coin/1878",
      title: oscar ? "2 kroner · 1878" : "1 krone · 1914",
      imageLabel: oscar ? "2 KR" : "1 KR",
      sourceLine: `Mynt · Norge · ${item.label} · ${item.years}`,
      value: oscar ? "2 kroner" : "1 krone",
      issue: item.label,
      variant: oscar ? "Sølvmynt" : "Standard",
      rarity: oscar ? "Sjelden" : "Vanlig",
      price: oscar ? "6 500 kr" : "1 250 kr",
      fields: [
        ["Regent / konge", item.label],
        ["Periode", item.years],
        ["Metall", oscar ? "Sølv" : "Kobbernikkel"],
        ["Innhold / finhet", oscar ? "800/1000 sølv" : "CuNi / legering"],
        ["Vekt", oscar ? "15,0 g" : "7,5 g"],
        ["Forklaring", "Mynten kobles til regent, metall, periode og marked."]
      ],
      segmentText:
        segment === "finans"
          ? "Marked, metall, trend og observasjoner."
          : segment === "samler"
            ? "Hjerte, stjerne, samling og egne notater."
            : "Regent, metall, periode og relasjoner."
    };
  }

  return {
    objectHref: "/objekt/norske_sedler/banknote/1459",
    title: oscar ? "100 kroner · 1877" : "50 kroner · 1962",
    imageLabel: oscar ? "100" : "50",
    sourceLine: `Seddel · Norske sedler · ${item.label} · NS 1459`,
    value: oscar ? "100 kroner" : "50 kroner",
    issue: oscar ? "1. utgave" : "Standardutgave",
    variant: "Standardutgave",
    rarity: oscar ? "Sjelden" : "Varierer",
    price: oscar ? "15 000 kr" : "850 kr",
    fields: [
      ["Regent / konge", item.label],
      ["Periode", item.years],
      ["Signatur", "Winge / Getz"],
      ["Motiv / person", "Riksvåpen"],
      ["Historisk kontekst", "Unionstid, norsk seddelhistorie"],
      ["Forklaring", "Objektet kobles til regent, signatur og motiv/person."]
    ],
    segmentText:
      segment === "finans"
        ? "Markedsverdi, trend, observasjoner og prisgrunnlag."
        : segment === "samler"
          ? "Hjerte, stjerne, Min samling og brukerstatus."
          : "Regent, signatur, motiv og historiske relasjoner."
  };
}

export default function CollectiumCompactCatalogDemo() {
  const [segment, setSegment] = useState<SegmentKey>("historie");
  const [objectKind, setObjectKind] = useState<ObjectKind>("banknote");
  const [filterMode, setFilterMode] = useState<FilterMode>("king");
  const [activeTimelineId, setActiveTimelineId] = useState(timelineModes.king.defaultActiveId);

  const currentTimeline = timelineModes[filterMode];

  const activeItem = useMemo(() => {
    return currentTimeline.items.find((item) => item.id === activeTimelineId) ?? currentTimeline.items[0];
  }, [activeTimelineId, currentTimeline.items]);

  const preview = useMemo(() => {
    return getPreview(objectKind, activeItem, segment);
  }, [objectKind, activeItem, segment]);

  function changeMode(nextMode: FilterMode) {
    setFilterMode(nextMode);
    setActiveTimelineId(timelineModes[nextMode].defaultActiveId);
  }

  return (
    <section id="katalog" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.titleRow}>
          <div>
            <span className={styles.eyebrow}>Katalog</span>
            <h2>Katalogen viser objektet i sammenheng.</h2>
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
              aria-pressed={objectKind === "banknote"}
            >
              Seddel
            </button>
            <button
              type="button"
              className={objectKind === "coin" ? styles.isActive : ""}
              onClick={() => setObjectKind("coin")}
              aria-pressed={objectKind === "coin"}
            >
              Mynt
            </button>
          </div>
        </div>

        <section className={styles.periodFilter} aria-label="Periodefilter">
          <div className={styles.periodHeader}>
            <div className={styles.periodIntro}>
              <span className={styles.periodEyebrow}>{currentTimeline.eyebrow}</span>
              <h3>{currentTimeline.title}</h3>
              <p>{currentTimeline.description}</p>
            </div>

            <div className={styles.periodModeButtons}>
              {modeButtons.map((button) => (
                <button
                  key={button.key}
                  type="button"
                  className={filterMode === button.key ? styles.isActive : ""}
                  onClick={() => changeMode(button.key)}
                  aria-pressed={filterMode === button.key}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.timelineFrame}>
            <div className={styles.timelineRail} aria-hidden="true" />

            {currentTimeline.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.timelineSegment} ${styles[item.tone]} ${activeTimelineId === item.id ? styles.timelineActive : ""}`}
                style={{ left: item.left, width: item.width }}
                onClick={() => setActiveTimelineId(item.id)}
                aria-pressed={activeTimelineId === item.id}
              >
                <strong>{item.label}</strong>
                <span>{item.years}</span>
              </button>
            ))}

            <div className={styles.yearRow} aria-hidden="true">
              <span style={{ left: "0%" }}>1814</span>
              <span style={{ left: "29%" }}>1872</span>
              <span style={{ left: "45%" }}>1905</span>
              <span style={{ left: "67%" }}>1957</span>
              <span style={{ left: "100%" }}>2024</span>
            </div>
          </div>

          <div className={styles.periodFooter}>
            <span>{currentTimeline.activeText}</span>
            <span>Periodevalg = aktiv overstyring av utvidet filter</span>
          </div>
        </section>

        <section className={styles.cardShell} aria-label="Kompakt visningskort">
          <nav className={styles.cardTabs} aria-label="Segment">
            {(["samler", "historie", "finans"] as SegmentKey[]).map((tab) => (
              <button
                key={tab}
                type="button"
                className={segment === tab ? styles.isActive : ""}
                onClick={() => setSegment(tab)}
                aria-pressed={segment === tab}
              >
                {tab === "samler" ? "Samler" : tab === "historie" ? "Historie" : "Finans"}
              </button>
            ))}
          </nav>

          <div className={styles.objectCard}>
            <div className={styles.objectTop}>
              <a className={styles.fakeImage} href={preview.objectHref} aria-label="Åpne objekt">
                <strong>{preview.imageLabel}</strong>
                <span>{objectKind === "banknote" ? "NORGES BANK" : "NORGES MYNT"}</span>
                <em>{activeItem.years}</em>
              </a>

              <div className={styles.objectMain}>
                <a className={styles.titleLink} href={preview.objectHref}>
                  <h3>{preview.title}</h3>
                </a>

                <div className={styles.factGrid}>
                  <div>
                    <span>Valørutgave</span>
                    <strong>{preview.value}</strong>
                  </div>
                  <div>
                    <span>Utgave</span>
                    <strong>{preview.issue}</strong>
                  </div>
                  <div>
                    <span>Variant / type</span>
                    <strong>{preview.variant}</strong>
                  </div>
                  <div>
                    <span>Sjeldenhet</span>
                    <strong>{preview.rarity}</strong>
                  </div>
                </div>

                <p className={styles.metaLine}>{preview.sourceLine}</p>
              </div>

              <aside className={styles.sidePanel}>
                <Metric label="Hjerte" value="0" />
                <Metric label="Stjerne" value="0" />
                <Metric label="Auksjon" value="3" />
                <Metric label="Nettbutikk" value="1" />

                <div className={styles.priceBox}>
                  <span>Estimert pris</span>
                  <strong>{preview.price}</strong>
                  <em>Vurdert</em>
                </div>
              </aside>
            </div>

            <div className={styles.dynamicField}>
              <div className={styles.iconBox}>{segment === "samler" ? "♡" : segment === "historie" ? "▥" : "↗"}</div>

              <div className={styles.dynamicContent}>
                <div className={styles.dynamicHeader}>
                  <h4>{segment === "samler" ? "Samler" : segment === "historie" ? "Historie" : "Finans"} · dynamisk felt</h4>
                  <p>{preview.segmentText}</p>
                </div>

                <div className={styles.dataGrid}>
                  {preview.fields.map(([label, value]) => (
                    <Data key={label} label={label} value={value} />
                  ))}
                </div>

                <div className={styles.actions}>
                  <a href={preview.objectHref}>Åpne objekt</a>
                  <a href={`${preview.objectHref}?segment=historie&relasjon=1`}>Se relasjon</a>
                  <a href="/min-side">Legg i samling</a>
                  <button type="button" aria-label="Flere valg">···</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.metric}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Data({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.dataPair}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
