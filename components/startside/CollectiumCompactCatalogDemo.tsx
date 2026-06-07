"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumCompactCatalogDemo
 *
 * Definering / formål:
 * Kompakt katalogdemo under startsidens katalogfelt.
 * Skal visuelt følge UI 8.5-referansene:
 * - Periodefilter UI 8.5
 * - Horisontalt visningskort UI 8.5
 *
 * Bruksområde:
 * Brukes i /startside.
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - public.startside.view
 * - public.catalog.preview
 * - catalog.view
 * - catalog.segment.collector
 * - catalog.segment.history
 * - catalog.segment.finance
 *
 * Berørte API-ruter:
 * - Ingen direkte i preview.
 *
 * Berørte tabeller / views:
 * - Fremtidig: ct_v_catalog_objects_resolved
 * - Fremtidig: ct_v_catalog_relations
 * - Fremtidig: ct_v_catalog_market_summary
 *
 * Dataretning:
 * Lokal preview-data -> React state -> UI
 *
 * Logging:
 * Ingen DB-logging i preview.
 *
 * Versjon:
 * CT-STARTSIDE-CATALOG-DEMO-UI85-0001
 */

import { useMemo, useState } from "react";
import styles from "./CollectiumCompactCatalogDemo.module.css";

type SegmentKey = "samler" | "historie" | "finans";
type ObjectKind = "banknote" | "coin";
type PeriodMode = "national" | "king" | "signature" | "motif" | "finance";

type PeriodItem = {
  key: string;
  label: string;
  years: string;
  text: string;
};

const modeLabels: Record<PeriodMode, string> = {
  national: "Nasjonal periode",
  king: "Konge",
  signature: "Signatur",
  motif: "Motiv/person",
  finance: "Finans",
};

const periods: Record<PeriodMode, PeriodItem[]> = {
  national: [
    { key: "oscar1", label: "Oscar I", years: "1844–1859", text: "Oscar I-perioden viser tidlige objekt-, mynt- og maktrelasjoner." },
    { key: "karl15", label: "Karl XV", years: "1859–1872", text: "Karl XV-perioden viser overgang før kroner og øre." },
    { key: "oscar2", label: "Oscar II", years: "1872–1905", text: "Kongeperioden filtrerer objekt, signaturer og historiske relasjoner." },
    { key: "haakon7", label: "Haakon VII", years: "1905–1957", text: "Haakon VII viser selvstendighet, krigstid og moderne objektdata." },
    { key: "olav5", label: "Olav V", years: "1957–1985", text: "Olav V viser moderne norsk pengehistorie frem til 1985." },
  ],
  king: [
    { key: "oscar1", label: "Oscar I", years: "1844–1859", text: "Kongefilteret kobler objektet mot regent og tilhørende utgaver." },
    { key: "karl15", label: "Karl XV", years: "1859–1872", text: "Karl XV viser eldre unionsrelasjoner." },
    { key: "oscar2", label: "Oscar II", years: "1872–1905", text: "Oscar II kobler objekt, signatur, motiv og unionstid." },
    { key: "haakon7", label: "Haakon VII", years: "1905–1957", text: "Haakon VII kobler objekt mot selvstendighet og krigstid." },
    { key: "olav5", label: "Olav V", years: "1957–1985", text: "Olav V kobler moderne objekter mot marked og samling." },
  ],
  signature: [
    { key: "winge_getz", label: "Winge / Getz", years: "1877–1886", text: "Signaturperioden viser hvilke signaturer/personer som kobles til objektene." },
    { key: "bohn_kielland", label: "Bøhn / Kielland", years: "1886–1893", text: "Signaturfilteret avgrenser samme objektfamilie etter personer." },
    { key: "rygg_omsted", label: "Rygg / Omsted", years: "1907–1913", text: "Signaturperioden kobler objektet til Norges Bank og personrelasjoner." },
    { key: "jahn_broch", label: "Jahn / Broch", years: "1920–1939", text: "Senere signaturperiode med finans- og utgavekontekst." },
  ],
  motif: [
    { key: "riksvapen", label: "Riksvåpen", years: "1877–1901", text: "Person-/motivperioden kobler motiv, portrett, symbol og relasjonssider." },
    { key: "oscar2_portrait", label: "Oscar II portrett", years: "1872–1905", text: "Motivfilteret binder objektet mot portrett, regent og periode." },
    { key: "norges_bank", label: "Norges Bank motiv", years: "1890–1920", text: "Motiv kobles mot utsteder, trykk og institusjon." },
    { key: "haakon7_motif", label: "Haakon VII motiv", years: "1905–1957", text: "Motivfilteret viser moderne nasjons- og kongerelasjoner." },
  ],
  finance: [
    { key: "early_finance", label: "Tidlig økonomi", years: "1642+", text: "Finansiell periode styrer markeds-/index- og verdikontekst." },
    { key: "krone_ore", label: "Kroner og øre", years: "1873+", text: "Pengeenhet, valør og markedslogikk kobles mot moderne katalogdata." },
    { key: "broad_finance", label: "Bred finansbase", years: "ca. 1920+", text: "Bredere finansgrunnlag med indeks, prisdata og markedsobservasjoner." },
    { key: "modern_market", label: "Moderne marked", years: "1971–2024", text: "Moderne markedsperiode med pris, trend, valuta og metall." },
  ],
};

function getPreview(kind: ObjectKind, period: PeriodItem) {
  const coin = kind === "coin";
  const oscar2 = period.key.includes("oscar2") || period.key === "riksvapen" || period.key === "winge_getz";

  if (coin) {
    return {
      title: oscar2 ? "2 kroner 1878" : period.key === "oscar1" ? "1 speciedaler 1847" : "1 krone 1914",
      imageTop: oscar2 ? "2 KR" : period.key === "oscar1" ? "1 SPD" : "1 KR",
      value: oscar2 ? "2 kroner" : period.key === "oscar1" ? "1 speciedaler" : "1 krone",
      issue: period.label,
      variant: oscar2 ? "Sølvmynt" : "Standard",
      rarity: oscar2 ? "Sjelden" : "Varierer",
      relation: `Mynt · Norge · ${period.label} · ${period.years}`,
      price: oscar2 ? "6 500 kr" : period.key === "oscar1" ? "32 000 kr" : "1 250 kr",
      specs: {
        left1Label: "Regent / konge",
        left1Value: period.label,
        left2Label: "Periode",
        left2Value: period.years,
        left3Label: "Metall",
        left3Value: oscar2 || period.key === "oscar1" ? "Sølv" : "Kobbernikkel",
        right1Label: "Innhold / finhet",
        right1Value: oscar2 || period.key === "oscar1" ? "800/1000 sølv" : "CuNi / legering",
        right2Label: "Vekt",
        right2Value: oscar2 ? "15,0 g" : period.key === "oscar1" ? "28,9 g" : "7,5 g",
        right3Label: "Kort forklaring",
        right3Value: "Mynten kobles til regent, metall, periode og marked.",
      },
    };
  }

  return {
    title: oscar2 ? "100 kroner 1877" : period.key === "haakon7" ? "500 kroner 1948" : "50 kroner 1962",
    imageTop: oscar2 ? "100" : period.key === "haakon7" ? "500" : "50",
    value: oscar2 ? "100 kroner" : period.key === "haakon7" ? "500 kroner" : "50 kroner",
    issue: oscar2 ? "1. utgave" : "Standardutgave",
    variant: "Standardutgave",
    rarity: oscar2 ? "Sjelden" : "Varierer",
    relation: `Seddel · Norske sedler · ${period.label} · NS 1459`,
    price: oscar2 ? "15 000 kr" : period.key === "haakon7" ? "28 000 kr" : "850 kr",
    specs: {
      left1Label: "Regent / konge",
      left1Value: period.label,
      left2Label: "Periode",
      left2Value: period.years,
      left3Label: "Signatur",
      left3Value: "Winge / Getz",
      right1Label: "Motiv / person",
      right1Value: "Riksvåpen",
      right2Label: "Historisk kontekst",
      right2Value: "Unionstid, norsk seddelhistorie",
      right3Label: "Kort forklaring",
      right3Value: "Objektet kobles til regent, signatur og motiv/person som egne relasjoner.",
    },
  };
}

export default function CollectiumCompactCatalogDemo() {
  const [segment, setSegment] = useState<SegmentKey>("historie");
  const [objectKind, setObjectKind] = useState<ObjectKind>("banknote");
  const [periodMode, setPeriodMode] = useState<PeriodMode>("king");
  const [periodKey, setPeriodKey] = useState("oscar2");

  const activeList = periods[periodMode];

  const activePeriod = useMemo(() => {
    return activeList.find((item) => item.key === periodKey) ?? activeList[0];
  }, [activeList, periodKey]);

  const preview = useMemo(() => getPreview(objectKind, activePeriod), [objectKind, activePeriod]);

  function changeMode(mode: PeriodMode) {
    setPeriodMode(mode);
    setPeriodKey(periods[mode][0].key);
  }

  return (
    <section id="katalog" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.titleBlock}>
          <span>Katalog</span>
          <h2>Katalogen viser objektet i sammenheng.</h2>
          <p>
            Under vises periodefilter og horisontalt visningskort slik feltet skal fungere:
            objektgruppe, periode og Samler/Historie/Finans styrer informasjonen i kortet.
          </p>
        </div>

        <div className={styles.kindSwitch}>
          <button type="button" className={objectKind === "banknote" ? styles.activeSmall : ""} onClick={() => setObjectKind("banknote")}>
            Seddel
          </button>
          <button type="button" className={objectKind === "coin" ? styles.activeSmall : ""} onClick={() => setObjectKind("coin")}>
            Mynt
          </button>
        </div>

        <div className={styles.periodFilter}>
          <div className={styles.periodTop}>
            <div>
              <span>Periodefilter</span>
              <strong>{activePeriod.label} · {activePeriod.years}</strong>
              <p>{activePeriod.text}</p>
            </div>

            <div className={styles.modeButtons}>
              {(Object.keys(modeLabels) as PeriodMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={periodMode === mode ? styles.activeMode : ""}
                  onClick={() => changeMode(mode)}
                >
                  {modeLabels[mode]}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineLine} />
            {activeList.map((period) => (
              <button
                type="button"
                key={period.key}
                className={activePeriod.key === period.key ? styles.activePeriod : ""}
                onClick={() => setPeriodKey(period.key)}
              >
                <strong>{period.label}</strong>
                <span>{period.years}</span>
              </button>
            ))}
          </div>

          <div className={styles.timelineFoot}>
            <span>Aktiv overstyring: <strong>{activePeriod.label}</strong> · {activePeriod.years}</span>
            <span>Periodevalg = aktiv overstyring av utvidet filter</span>
          </div>
        </div>

        <div className={styles.cardShell}>
          <div className={styles.cardTabs}>
            {(["samler", "historie", "finans"] as SegmentKey[]).map((item) => (
              <button
                key={item}
                type="button"
                className={segment === item ? styles.activeTab : ""}
                onClick={() => setSegment(item)}
              >
                {item[0].toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles.objectCard}>
            <div className={styles.objectTop}>
              <div className={styles.fakeImage}>
                <strong>{preview.imageTop}</strong>
                <span>{objectKind === "banknote" ? "NORGES BANK" : "NORGES MYNT"}</span>
                <em>{activePeriod.years}</em>
              </div>

              <div className={styles.objectMain}>
                <h3>{preview.title}</h3>

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
                    <span>Variant</span>
                    <strong>{preview.variant}</strong>
                  </div>
                  <div>
                    <span>Sjeldenhet</span>
                    <strong>{preview.rarity}</strong>
                  </div>
                </div>

                <p className={styles.metaLine}>{preview.relation}</p>
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
                <h4>{segment[0].toUpperCase() + segment.slice(1)} · dynamisk felt</h4>

                {segment === "samler" ? (
                  <div className={styles.dataGrid}>
                    <Data label="Brukerstatus" value="Hjerte, stjerne og Min samling" />
                    <Data label="Samling" value="Privat som standard" />
                    <Data label="Handling" value="Åpne objekt · legg i samling" />
                    <Data label="Dokumentasjon" value="Bilder, kvalitet og transaksjoner" />
                  </div>
                ) : null}

                {segment === "historie" ? (
                  <div className={styles.dataGrid}>
                    <Data label={preview.specs.left1Label} value={preview.specs.left1Value} />
                    <Data label={preview.specs.right1Label} value={preview.specs.right1Value} />
                    <Data label={preview.specs.left2Label} value={preview.specs.left2Value} />
                    <Data label={preview.specs.right2Label} value={preview.specs.right2Value} />
                    <Data label={preview.specs.left3Label} value={preview.specs.left3Value} />
                    <Data label={preview.specs.right3Label} value={preview.specs.right3Value} />
                  </div>
                ) : null}

                {segment === "finans" ? (
                  <div className={styles.dataGrid}>
                    <Data label="Estimert pris" value={preview.price} />
                    <Data label="Trend 12 mnd" value="+4,2 %" />
                    <Data label="Marked" value="Auksjon og nettbutikk" />
                    <Data label="Prisregel" value="0 kr betyr manglende vurdering" />
                  </div>
                ) : null}

                <div className={styles.actions}>
                  <a href="/katalog">Åpne objekt</a>
                  <a href="/katalog?relasjon=1">Se relasjon</a>
                  <a href="/min-side">Legg i samling</a>
                  <button type="button">···</button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
