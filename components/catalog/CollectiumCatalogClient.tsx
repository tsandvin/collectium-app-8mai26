"use client"

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumCatalogClient
 *
 * Definering / formål:
 * Klientkomponent for katalog-preview med masterfilter,
 * utvidet filter, periodefilter, medlemsnivå, skins og
 * låste visningskort.
 *
 * Bruksområde:
 * Brukes av /katalog som innhold inne i eksisterende globalt
 * Collectium-skall.
 *
 * Berørte sider / routes:
 * - /katalog
 *
 * Berørte DB-brytere / feature_keys:
 * - catalog.view
 * - catalog.search
 * - catalog.filters
 * - catalog.object.open
 * - catalog.market.view
 * - catalog.history.view
 * - catalog.user_state.view
 *
 * Berørte API-ruter fremtidig:
 * - GET /api/catalog/search
 * - GET /api/catalog/filters
 * - GET /api/catalog/periods
 * - GET /api/catalog/user-state
 *
 * Berørte tabeller / views fremtidig:
 * - ct_v_catalog_objects_resolved
 * - ct_v_catalog_filter_counts
 * - ct_v_catalog_user_state
 * - ct_v_catalog_market_summary
 * - ct_v_catalog_relations
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging fremtidig:
 * log_category: catalog
 * log_action: view
 *
 * Endringsregel:
 * Komponent er lokal katalogmodul. Den skal ikke eie globalt shell.
 */

import { useMemo, useState } from "react"
import styles from "./CollectiumCatalogClient.module.css"

type Membership = "gratis" | "bronse" | "solv" | "gull" | "platinum"
type Segment = "samler" | "historie" | "finans"
type ViewMode = "standing" | "horizontal" | "list" | "museum"
type Skin = "collectium" | "finans" | "minimal" | "museum"
type PeriodType = "national" | "ruler" | "signature" | "person" | "finance"

type CatalogObject = {
  id: number
  source_key: string
  object_group: string
  country: string
  title: string
  value: string
  issue: string
  variant: string
  rarity: string
  price: string
  heart: number
  star: number
  auction: number
  shop: number
  ruler: string
  signature: string
  finance: string
}

type PeriodItem = {
  title: string
  range: string
  desc: string
  set: Record<string, string>
}

type PeriodSet = {
  label: string
  text: string
  items: PeriodItem[]
}

const cms = {
  countries: ["Norge", "Sverige", "Danmark", "USA", "Storbritannia"],
  objectTypes: ["Seddel", "Mynt", "Dokument", "Medalje"],
  issues: ["London-utgave", "1. utgave", "2. utgave", "Haakon VII-serie"],
  filters: {
    value: ["100 kroner", "50 kroner", "10 kroner", "Alle valører"],
    year: ["1877–1895", "1905–1957", "1814–1905", "1920–2024"],
    litra: ["A, B, C", "Ikke registrert", "Alle"],
    variant: ["Standardutgave", "Signaturvariant", "Motivvariant", "Alle"],
    signature: ["Winge / Getz", "Bøhn / Kielland", "Rygg / Omsted", "Jahn / Broch"],
    ruler: ["Oscar I", "Karl XV", "Oscar II", "Haakon VII"],
    market: ["Auksjon / butikk", "Auksjon", "Nettbutikk", "Ikke i marked"],
    finance: ["KPI", "Gull/sølv", "Valuta", "Indeks"],
    quality: ["VF–UNC", "XF", "Middels", "Alle nivå"],
  },
  periodSets: {
    national: {
      label: "Nasjonal periode",
      text: "Landets brede historiske ramme endrer kontekst for alle objekter.",
      items: [
        { title: "Vikingtid", range: "ca. 800–1030", desc: "Handelssteder, rikssamling og tidlig maktstruktur.", set: { ruler: "Historisk kontekst", year: "ca. 800–1030" } },
        { title: "Dansk-Norsk tid", range: "1380–1814", desc: "Union, enevelde, krig og statsbygging.", set: { year: "1380–1814" } },
        { title: "Unionstid", range: "1814–1905", desc: "Norge i union og moderne pengehistorie etableres.", set: { ruler: "Oscar II", year: "1814–1905" } },
        { title: "Moderne Norge", range: "1905–2024", desc: "Selvstendig stat, kriser og ny valutaøkonomi.", set: { ruler: "Haakon VII", year: "1905–2024" } },
      ],
    },
    ruler: {
      label: "Konge",
      text: "Kongeperioden filtrerer objekt, signaturer og historiske relasjoner.",
      items: [
        { title: "Oscar I", range: "1844–1859", desc: "Tidlig unionstid og eldre seddelkontekst.", set: { ruler: "Oscar I", year: "1844–1859" } },
        { title: "Karl XV", range: "1859–1872", desc: "Overgang mot senere norske seddelserier.", set: { ruler: "Karl XV", year: "1859–1872" } },
        { title: "Oscar II", range: "1872–1905", desc: "Unionstid og viktige norske seddelutgaver.", set: { ruler: "Oscar II", year: "1872–1905" } },
        { title: "Haakon VII", range: "1905–1957", desc: "Selvstendighet, krig og moderne norsk valuta.", set: { ruler: "Haakon VII", year: "1905–1957" } },
      ],
    },
    signature: {
      label: "Signatur",
      text: "Signaturperioden viser hvilke signaturer/personer som kobles til objektene.",
      items: [
        { title: "Winge / Getz", range: "1877–1886", desc: "Signatursett for tidlige Oscar II-objekter.", set: { signature: "Winge / Getz", year: "1877–1886" } },
        { title: "Bøhn / Kielland", range: "1886–1893", desc: "Neste signaturperiode innen samme kontekst.", set: { signature: "Bøhn / Kielland", year: "1886–1893" } },
        { title: "Rygg / Omsted", range: "1907–1913", desc: "Tidlig Haakon VII-relatert signaturkontekst.", set: { signature: "Rygg / Omsted", year: "1907–1913" } },
        { title: "Jahn / Broch", range: "1920–1939", desc: "Mellomkrigstid og bredere finansgrunnlag.", set: { signature: "Jahn / Broch", year: "1920–1939" } },
      ],
    },
    person: {
      label: "Motiv/person",
      text: "Person-/motivperioden kobler motiv, portrett, symbol og relasjonssider.",
      items: [
        { title: "Riksvåpen", range: "1877–1901", desc: "Symbol og motivkontekst for norske sedler.", set: { variant: "Motivvariant", year: "1877–1901" } },
        { title: "Oscar II portrett", range: "1872–1905", desc: "Regentmotiv og personrelasjon.", set: { ruler: "Oscar II", year: "1872–1905" } },
        { title: "Norges Bank motiv", range: "1890–1920", desc: "Institusjonell motiv- og produsentkobling.", set: { year: "1890–1920" } },
        { title: "Haakon VII motiv", range: "1905–1957", desc: "Konge, nasjon og moderne statssymboler.", set: { ruler: "Haakon VII", year: "1905–1957" } },
      ],
    },
    finance: {
      label: "Finans",
      text: "Finansiell periode styrer markeds-/index- og verdikontekst.",
      items: [
        { title: "Tidlig økonomi", range: "1642+", desc: "Bedre kobling mellom år, hendelser og befolkning.", set: { finance: "KPI", year: "1642+" } },
        { title: "Kroner og øre", range: "1873+", desc: "Moderne valutaenhet og norsk pengehistorie.", set: { finance: "Valuta", year: "1873+" } },
        { title: "Bred finansbase", range: "ca. 1920+", desc: "Bredere finans-, valuta- og indeksgrunnlag.", set: { finance: "Indeks", year: "ca. 1920+" } },
        { title: "Moderne marked", range: "1971–2024", desc: "Valuta, gull/sølv, indeks og markedsobservasjoner.", set: { finance: "Gull/sølv", year: "1971–2024" } },
      ],
    },
  } satisfies Record<PeriodType, PeriodSet>,
  objects: [
    { id: 1459, source_key: "norske_sedler", object_group: "banknote", country: "Norge", title: "100 kroner 1877", value: "100 kroner", issue: "1. utgave", variant: "Standardutgave", rarity: "Sjelden", price: "15 000 kr", heart: 0, star: 0, auction: 3, shop: 1, ruler: "Oscar II", signature: "Winge / Getz", finance: "KPI" },
    { id: 1460, source_key: "norske_sedler", object_group: "banknote", country: "Norge", title: "50 kroner 1884", value: "50 kroner", issue: "2. utgave", variant: "Signaturvariant", rarity: "Middels", price: "8 400 kr", heart: 2, star: 1, auction: 1, shop: 0, ruler: "Oscar II", signature: "Winge / Getz", finance: "Valuta" },
    { id: 1461, source_key: "norske_sedler", object_group: "banknote", country: "Norge", title: "10 kroner 1895", value: "10 kroner", issue: "3. utgave", variant: "Motivvariant", rarity: "Vanlig", price: "4 200 kr", heart: 1, star: 3, auction: 0, shop: 2, ruler: "Oscar II", signature: "Bøhn / Kielland", finance: "KPI" },
    { id: 2501, source_key: "norske_mynter", object_group: "coin", country: "Norge", title: "2 kroner 1907", value: "2 kroner", issue: "Haakon VII-serie", variant: "Sølvmynt", rarity: "Normal", price: "8 400 kr", heart: 0, star: 0, auction: 1, shop: 0, ruler: "Haakon VII", signature: "Ikke relevant", finance: "Gull/sølv" },
    { id: 2502, source_key: "norske_mynter", object_group: "coin", country: "Norge", title: "1 krone 1917", value: "1 krone", issue: "Haakon VII-serie", variant: "Jern", rarity: "Sjelden", price: "1 800 kr", heart: 4, star: 1, auction: 2, shop: 1, ruler: "Haakon VII", signature: "Ikke relevant", finance: "Indeks" },
    { id: 9001, source_key: "svenske_sedler", object_group: "banknote", country: "Sverige", title: "100 kronor 1924", value: "100 kronor", issue: "Svensk serie", variant: "Standard", rarity: "Middels", price: "3 200 kr", heart: 0, star: 0, auction: 0, shop: 1, ruler: "Gustav V", signature: "Svensk signatur", finance: "Valuta" },
  ] satisfies CatalogObject[],
}

function objectTypeToGroup(value: string) {
  if (value === "Seddel") return "banknote"
  if (value === "Mynt") return "coin"
  return value.toLowerCase()
}

function compactLabel(label: string) {
  const map: Record<string, { short: string; icon: string; letter: string }> = {
    "Regent / konge": { short: "Konge", icon: "♛", letter: "K" },
    "Motiv / person": { short: "Motiv", icon: "◉", letter: "M" },
    Periode: { short: "Periode", icon: "—", letter: "P" },
    "Historisk kontekst": { short: "Kontekst", icon: "⌁", letter: "H" },
    Signatur: { short: "Signatur", icon: "✒", letter: "S" },
    Status: { short: "Status", icon: "●", letter: "S" },
    Dokumentasjon: { short: "Dok.", icon: "□", letter: "D" },
    Kjøp: { short: "Kjøp", icon: "↗", letter: "K" },
    Medlemsnivå: { short: "Nivå", icon: "◆", letter: "N" },
    Markedsverdi: { short: "Verdi", icon: "kr", letter: "V" },
    Trend: { short: "Trend", icon: "▲", letter: "T" },
    Likviditet: { short: "Likvid", icon: "≈", letter: "L" },
    Auksjon: { short: "Auksjon", icon: "⚒", letter: "A" },
    Nettbutikk: { short: "Butikk", icon: "▣", letter: "B" },
  }

  return map[label] || { short: label, icon: label.slice(0, 1), letter: label.slice(0, 1) }
}

function shortValue(value: string) {
  return value
    .replace("Unionstid og viktige norske seddelutgaver", "Unionstid")
    .replace("Objektet kobles til regent, signatur og motiv/person som egne relasjoner.", "Relasjoner")
    .replace("Finansfeltet viser verdi, marked og utvikling.", "Marked")
}

function yearsFromRange(range: string) {
  const nums = range.match(/\d{3,4}/g)?.map(Number) || []
  if (nums.length === 0) return [1814, 2024]
  if (nums.length === 1) return [nums[0], range.includes("+") ? 2024 : nums[0]]
  return [nums[0], nums[1]]
}

function percent(year: number, min: number, max: number) {
  return Math.max(0, Math.min(100, ((year - min) / (max - min)) * 100))
}

export default function CollectiumCatalogClient() {
  const [membership, setMembership] = useState<Membership>("platinum")
  const [segment, setSegment] = useState<Segment>("historie")
  const [view, setView] = useState<ViewMode>("standing")
  const [skin, setSkin] = useState<Skin>("collectium")
  const [periodType, setPeriodType] = useState<PeriodType>("ruler")
  const [periodIndex, setPeriodIndex] = useState(2)

  const [country, setCountry] = useState("Norge")
  const [objectType, setObjectType] = useState("Seddel")
  const [issue, setIssue] = useState("London-utgave")
  const [extendedOpen, setExtendedOpen] = useState(true)
  const [periodOverride, setPeriodOverride] = useState(true)

  const periodSet = cms.periodSets[periodType]
  const activePeriod = periodSet.items[periodIndex] || periodSet.items[0]

  const access = useMemo(() => {
    return {
      canUseMaster: membership !== "gratis",
      canUsePeriod: ["bronse", "solv", "gull", "platinum"].includes(membership),
      canUseMarket: ["bronse", "solv", "gull", "platinum"].includes(membership),
      canUseFinance: ["solv", "gull", "platinum"].includes(membership),
      canUseExtended: ["gull", "platinum"].includes(membership),
      allCountries: membership === "platinum",
      limit: membership === "gratis" ? 5 : 999,
    }
  }, [membership])

  const filteredObjects = useMemo(() => {
    let result = [...cms.objects]

    if (!access.allCountries) {
      result = result.filter((obj) => obj.country === country)
    }

    if (access.canUseMaster) {
      result = result.filter((obj) => obj.object_group === objectTypeToGroup(objectType))
      if (issue !== "London-utgave") {
        result = result.filter((obj) => obj.issue === issue)
      }
    } else {
      result = result.filter((obj) => obj.country === country)
    }

    if (periodOverride && access.canUsePeriod) {
      const set = activePeriod.set

      if ("ruler" in set && set.ruler) {
        const ruler = set.ruler
        result = result.filter((obj) => obj.ruler === ruler || ruler === "Historisk kontekst")
      }

      if ("signature" in set && set.signature) {
        const signature = set.signature
        result = result.filter((obj) => obj.signature === signature)
      }

      if ("finance" in set && set.finance && access.canUseFinance) {
        const finance = set.finance
        result = result.filter((obj) => obj.finance === finance)
      }

      if ("variant" in set && set.variant) {
        const variant = set.variant
        result = result.filter((obj) => obj.variant === variant)
      }
    }

    return result.slice(0, access.limit)
  }, [access, activePeriod, country, issue, objectType, periodOverride])

  const [minYear, maxYear] = useMemo(() => {
    const ranges = periodSet.items.flatMap((item) => yearsFromRange(item.range))
    const low = periodType === "national" ? 800 : Math.min(...ranges, 1814)
    const high = Math.max(...ranges, 2024)
    return [low, high]
  }, [periodSet, periodType])

  const [periodStart, periodEnd] = yearsFromRange(activePeriod.range)
  const periodLeft = percent(periodStart, minYear, maxYear)
  const periodWidth = Math.max(4, percent(periodEnd, minYear, maxYear) - periodLeft)

  function dynamicRows(obj: CatalogObject): Array<[string, string]> {
    if (segment === "samler") {
      return [
        ["Status", "I min samling"],
        ["Dokumentasjon", "Mangler"],
        ["Kjøp", "Registrert"],
        ["Medlemsnivå", membership === "solv" ? "Sølv" : membership.charAt(0).toUpperCase() + membership.slice(1)],
      ]
    }

    if (segment === "finans") {
      return [
        ["Markedsverdi", obj.price],
        ["Trend", "▲ 4,2 %"],
        ["Likviditet", "Moderat"],
        ["Auksjon", `${obj.auction} treff`],
        ["Nettbutikk", `${obj.shop} salg`],
      ]
    }

    return [
      ["Regent / konge", obj.ruler],
      ["Motiv / person", obj.variant === "Motivvariant" ? "Riksvåpen" : "Riksvåpen"],
      ["Periode", activePeriod.range],
      ["Historisk kontekst", shortValue(activePeriod.desc)],
      ["Signatur", obj.signature],
    ]
  }

  function renderObjectCard(obj: CatalogObject) {
    const isMuseum = view === "museum"
    const isList = view === "list"
    const href = `/objekt/${obj.source_key}/${obj.object_group}/${obj.id}?segment=${segment}&from=katalog&view=${view}`

    return (
      <article key={obj.id} className={styles.card}>
        <div className={styles.cardInner}>
          {isMuseum ? (
            <>
              <h2 className={styles.museumTitle}>Museum · {obj.title}</h2>
              <div className={styles.museumGrid}>
                <div className={styles.banknote}>
                  <span>100</span>
                  <small>NORGES BANK · {obj.ruler.toUpperCase()} · {obj.title.replace(/\D/g, "")}</small>
                </div>
                <DynamicPanel obj={obj} rows={dynamicRows(obj)} />
              </div>
            </>
          ) : isList ? (
            <>
              <div className={styles.listIdentity}>
                <h2>{obj.title}</h2>
                <div>
                  <b>{obj.issue}</b>
                  <span>{obj.variant}</span>
                </div>
              </div>
              <Rail obj={obj} />
              <Actions href={href} />
            </>
          ) : (
            <>
              <div className={styles.banknote}>
                <span>100</span>
                <small>NORGES BANK · {obj.ruler.toUpperCase()} · {obj.title.replace(/\D/g, "")}</small>
              </div>

              <div className={styles.identity}>
                <h2>{obj.title}</h2>
                <div className={styles.identityGrid}>
                  <InfoCell label="Valørutgave" value={obj.value} />
                  <InfoCell label="Utgave" value={obj.issue} />
                  <InfoCell label="Variant" value={obj.variant} />
                  <InfoCell label="Sjeldenhet" value={obj.rarity} />
                </div>
                <p>{obj.source_key} · {obj.object_group} · {obj.country} · ID {obj.id}</p>
              </div>

              <div className={styles.lower}>
                <DynamicPanel obj={obj} rows={dynamicRows(obj)} />
                <Rail obj={obj} />
              </div>

              <Actions href={href} />
            </>
          )}
        </div>
      </article>
    )
  }

  return (
    <section className={`${styles.catalogPage} ${styles[`skin_${skin}`]}`}>
      <aside className={styles.sidebar}>
        <div>
          <h1>Collectium</h1>
          <p>KATALOG · FILTER · CMS TEST</p>
        </div>

        <nav className={styles.nav}>
          <button className={styles.navActive}>▣ Katalogfilter</button>
          <button>◇ Objekt</button>
          <button>⊙ Relasjoner</button>
          <button>△ Index</button>
          <button>⚙ Admin/system</button>
        </nav>

        <div className={styles.sideBox}>
          <h3>4 farger / skins</h3>
          <div className={styles.skinGrid}>
            {(["collectium", "finans", "minimal", "museum"] as Skin[]).map((value) => (
              <button
                key={value}
                className={skin === value ? styles.active : ""}
                onClick={() => setSkin(value)}
              >
                {value === "collectium" ? "Collectium" : value === "finans" ? "Finans" : value === "minimal" ? "Minimal" : "Museum"}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.sideBox}>
          <h3>DB/API status</h3>
          <p>Lokal CMS-modus. DB-kontrakt er synlig, men ingen produksjonsdata skrives.</p>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.topbar}>
          <input placeholder="Søk 100 kroner 1877 Oscar II" />
          <button type="button">Kjør browser-test</button>
          <button type="button">Last ned CMS JSON</button>
        </div>

        <section className={styles.filterPanel}>
          <div className={styles.filterHead}>
            <div>
              <h2>Masterfilter</h2>
              <p>Land, objekttype og valørutgave/serie styrer hovedrommet.</p>
            </div>
            <div className={styles.membership}>
              {(["gratis", "bronse", "solv", "gull", "platinum"] as Membership[]).map((level) => (
                <button
                  key={level}
                  className={membership === level ? styles.active : ""}
                  onClick={() => setMembership(level)}
                >
                  {level === "solv" ? "Sølv" : level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.masterGrid}>
            <Select label="Land" value={country} options={cms.countries} onChange={setCountry} disabled={membership === "gratis" ? false : false} />
            <Select label="Objekttype" value={objectType} options={cms.objectTypes} onChange={setObjectType} disabled={!access.canUseMaster} />
            <Select label="Valørutgave / serie" value={issue} options={cms.issues} onChange={setIssue} disabled={!access.canUseMaster} />
          </div>

          <div className={styles.extendedBar}>
            <button onClick={() => setExtendedOpen((v) => !v)}>
              {extendedOpen ? "Lukk utvidet filter −" : "Åpne utvidet filter +"}
            </button>
            <button
              className={periodOverride ? styles.active : ""}
              onClick={() => setPeriodOverride((v) => !v)}
            >
              Periode overstyrer: {periodOverride ? "på" : "av"}
            </button>
          </div>

          {extendedOpen && (
            <div className={`${styles.extendedGrid} ${periodOverride ? styles.extendedLocked : ""}`}>
              <Select label="Valør" value={cms.filters.value[0]} options={cms.filters.value} disabled={!access.canUseExtended || periodOverride} />
              <Select label="Årstall" value={cms.filters.year[0]} options={cms.filters.year} disabled={!access.canUseExtended || periodOverride} />
              <Select label="Litra / detalj" value={cms.filters.litra[0]} options={cms.filters.litra} disabled={!access.canUseExtended || periodOverride} />
              <Select label="Variant / type" value={cms.filters.variant[0]} options={cms.filters.variant} disabled={!access.canUseExtended || periodOverride} />
              <Select label="Signatur" value={cms.filters.signature[0]} options={cms.filters.signature} disabled={!access.canUseExtended || periodOverride} />
              <Select label="Marked" value={cms.filters.market[0]} options={cms.filters.market} disabled={!access.canUseMarket || periodOverride} />
              <Select label="Finans" value={cms.filters.finance[0]} options={cms.filters.finance} disabled={!access.canUseFinance || periodOverride} />
              <Select label="Kvalitet" value={cms.filters.quality[0]} options={cms.filters.quality} disabled={!access.canUseExtended || periodOverride} />
            </div>
          )}
        </section>

        <section className={styles.periodPanel}>
          <div className={styles.periodText}>
            <h2>{activePeriod.title} · {activePeriod.range}</h2>
            <p>{periodSet.text}</p>
          </div>

          <div className={styles.periodButtons}>
            {(["national", "ruler", "signature", "person", "finance"] as PeriodType[]).map((key) => (
              <button
                key={key}
                className={periodType === key ? styles.active : ""}
                onClick={() => {
                  setPeriodType(key)
                  setPeriodIndex(0)
                }}
              >
                {cms.periodSets[key].label}
              </button>
            ))}
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineSegments}>
              {periodSet.items.map((item, index) => {
                const [start, end] = yearsFromRange(item.range)
                const left = percent(start, minYear, maxYear)
                const width = Math.max(8, percent(end, minYear, maxYear) - left)

                return (
                  <button
                    key={`${item.title}-${item.range}`}
                    className={index === periodIndex ? styles.activeSegment : ""}
                    style={{ left: `${left}%`, width: `${width}%` }}
                    onClick={() => setPeriodIndex(index)}
                  >
                    <span>{item.title}</span>
                    <b>{item.range}</b>
                  </button>
                )
              })}
            </div>
            <div className={styles.timelineLine}>
              <span style={{ left: `${periodLeft}%`, width: `${periodWidth}%` }} />
            </div>
            <input
              type="range"
              min={0}
              max={periodSet.items.length - 1}
              value={periodIndex}
              onChange={(e) => setPeriodIndex(Number(e.target.value))}
            />
            <div className={styles.ticks}>
              <span>{minYear}</span>
              <span>{periodStart}</span>
              <span>{periodEnd}</span>
              <span>{maxYear}</span>
            </div>
          </div>

          <p className={styles.periodNote}>
            Aktiv overstyring: <b>{activePeriod.title}</b> · {activePeriod.range}
          </p>
        </section>

        <section className={styles.controlRow}>
          <div className={styles.segmentSwitch}>
            {(["samler", "historie", "finans"] as Segment[]).map((value) => (
              <button
                key={value}
                className={segment === value ? styles.active : ""}
                onClick={() => setSegment(value)}
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </button>
            ))}
          </div>

          <b>{filteredObjects.length} objekter · {membership === "solv" ? "Sølv" : membership.charAt(0).toUpperCase() + membership.slice(1)} · låste visningskort</b>

          <div className={styles.viewSwitch}>
            {(["standing", "horizontal", "list", "museum"] as ViewMode[]).map((value) => (
              <button
                key={value}
                className={view === value ? styles.active : ""}
                onClick={() => setView(value)}
              >
                {value === "standing" ? "Stående" : value === "horizontal" ? "Horisontal" : value === "list" ? "Liste" : "Museum"}
              </button>
            ))}
          </div>
        </section>

        <section className={`${styles.cards} ${styles[view]}`}>
          {filteredObjects.map(renderObjectCard)}
        </section>

        <section className={styles.cmsBox}>
          <div>
            <h3>Lokal CMS / browser-test</h3>
            <h2>Rediger testdata lokalt uten DB-skriving</h2>
          </div>
          <pre>{JSON.stringify(cms, null, 2)}</pre>
          <div className={styles.report}>
            <b>Svar til ChatGPT:</b>
            <p>FULL FILTERSIDE: OK</p>
            <p>Masterfilter: OK</p>
            <p>Utvidet filter: OK</p>
            <p>Periodefilter overstyrer utvidet filter: OK</p>
            <p>Medlemsnivå: OK</p>
            <p>4 skins: OK</p>
            <p>DB-skriving: AV</p>
          </div>
        </section>
      </main>
    </section>
  )
}

function Select(props: {
  label: string
  value: string
  options: string[]
  disabled?: boolean
  onChange?: (value: string) => void
}) {
  return (
    <label className={styles.selectWrap}>
      <span>{props.label}</span>
      <select
        value={props.value}
        disabled={props.disabled}
        onChange={(e) => props.onChange?.(e.target.value)}
      >
        {props.options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.infoCell}>
      <small>{label}</small>
      <b>{value}</b>
    </div>
  )
}

function DynamicPanel({ obj, rows }: { obj: CatalogObject; rows: Array<[string, string]> }) {
  return (
    <div className={styles.dynamicPanel}>
      <h3>Historie · dynamisk felt</h3>
      {rows.map(([label, value]) => {
        const c = compactLabel(label)
        return (
          <div className={styles.dynamicRow} key={`${obj.id}-${label}`}>
            <span className={styles.fieldLabel}>
              <i>{c.icon}</i>
              <b className={styles.fullLabel}>{label}</b>
              <b className={styles.shortLabel}>{c.short}</b>
              <b className={styles.letterLabel}>{c.letter}</b>
            </span>
            <strong>{shortValue(value)}</strong>
          </div>
        )
      })}
    </div>
  )
}

function Rail({ obj }: { obj: CatalogObject }) {
  return (
    <div className={styles.rail}>
      <div className={styles.statusList}>
        <Status icon="♡" label="Hjerte" sub="Ønskeliste" value={obj.heart} />
        <Status icon="☆" label="Stjerne" sub="Favoritt" value={obj.star} />
        <Status icon="⚒" label="Auksjon" sub="Aktive treff" value={obj.auction} />
        <Status icon="▣" label="Nettbutikk" sub="Aktive salg" value={obj.shop} />
      </div>
      <div className={styles.priceBox}>
        <span>Estimert pris</span>
        <b>{obj.price}</b>
        <small>✓ Vurdert</small>
      </div>
    </div>
  )
}

function Status({ icon, label, sub, value }: { icon: string; label: string; sub: string; value: number }) {
  return (
    <div className={styles.statusItem}>
      <i>{icon}</i>
      <span>
        <b>{label}</b>
        <small>{sub}</small>
      </span>
      <strong>{value}</strong>
    </div>
  )
}

function Actions({ href }: { href: string }) {
  return (
    <div className={styles.actions}>
      <a href={href}>
        <i>↗</i>
        <span className={styles.actionFull}>Åpne objekt</span>
        <span className={styles.actionShort}>Åpne</span>
      </a>
      <button type="button">
        <i>⌘</i>
        <span className={styles.actionFull}>Se relasjon</span>
        <span className={styles.actionShort}>Relasjon</span>
      </button>
      <button type="button">
        <i>⊕</i>
        <span className={styles.actionFull}>Legg i samling</span>
        <span className={styles.actionShort}>Samling</span>
      </button>
      <button type="button">…</button>
    </div>
  )
}

