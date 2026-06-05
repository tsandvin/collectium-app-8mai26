/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Startside Data
 *
 * Definering / formal:
 * Innholdsdata for offentlig startside. Filen inneholder tekst, lenker og bildepeking,
 * men ingen design, skin, bakgrunn, rammer, skygger eller template-regler.
 *
 * Bruksomrade:
 * Brukes av components/startside/CollectiumStartside.tsx.
 *
 * Berorte sider / routes:
 * - /startside
 *
 * Berorte DB-brytere / feature_keys:
 * - landing.view
 * - landing.login
 * - landing.register
 * - landing.membership
 * - catalog.view
 * - auction.view
 * - dealer.view
 *
 * Berorte API-ruter:
 * - Ingen direkte API-kall i denne filen.
 *
 * Berorte tabeller / views:
 * - Ingen direkte tabell/view i denne filen.
 *
 * Dataretning:
 * Innhold -> Next.js -> React -> UI. Systemdata skal senere komme fra API/backend.
 *
 * Logging:
 * log_category: landing
 * log_action: view
 *
 * Versjon:
 * CT-STARTSIDE-DATA-V2 / CHANGE-2026-06-05-STARTSIDE-TEMPLATE-COMPLIANT
 *
 * Endringsregel:
 * Denne filen skal ikke inneholde design. Template/tokens styrer alt visuelt.
 */

export type StartsideSection = {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  tone?: "light" | "soft" | "tint" | "dark" | "anno";
  layout?: "hero" | "split" | "cards" | "catalog-preview" | "membership" | "cta";
  actions?: Array<{ label: string; href: string; variant?: "primary" | "secondary" }>;
  cards?: Array<{ title: string; text: string }>;
};

export const startsideSections: StartsideSection[] = [
  {
    id: "hero",
    eyebrow: "For samlere · for historien · for markedet",
    title: "For samlere. Av samlere. Alt på ett sted.",
    lead: "Samling, historie, marked og trygg oversikt i én strukturert plattform.",
    body: "Collectium samler katalog, egen samling, verdivurdering, historiske relasjoner, auksjoner, forhandlerkontakt og markedsutvikling i ett miljø.",
    image: "/globe/mynter-og-sedler.png",
    imageAlt: "Illustrasjon av norske mynter og sedler",
    tone: "light",
    layout: "hero",
    actions: [
      { label: "Start gratis", href: "/medlemskap", variant: "primary" },
      { label: "Se katalog", href: "/katalog", variant: "secondary" },
    ],
  },
  {
    id: "hva-er-collectium",
    eyebrow: "Hva er Collectium?",
    title: "En samlet plattform for samlere",
    lead: "Collectium skal gjøre det enklere å forstå, organisere og følge utviklingen i egne og offentlige samleobjekter.",
    tone: "soft",
    layout: "cards",
    cards: [
      { title: "Samler", text: "Bygg samling, ønskeliste, favoritter, notater og dokumentasjon." },
      { title: "Historie", text: "Se objekter i sammenheng med utgaver, regenter, personer, perioder og materiale." },
      { title: "Finans", text: "Følg verdi, trend, auksjon, nettbutikk og utvikling over tid." },
    ],
  },
  {
    id: "samling",
    eyebrow: "Samling",
    title: "Samling og familie",
    lead: "Samlinger har ofte historie, verdi og personlige minner.",
    body: "Collectium skal gjøre det enklere å organisere objekter, ta vare på opplysninger og bygge oversikt over tid.",
    image: "/globe/samling-og-familie.png",
    imageAlt: "Familie som ser på en samling",
    tone: "light",
    layout: "split",
    actions: [{ label: "Les om Min samling", href: "/samling", variant: "secondary" }],
  },
  {
    id: "katalog",
    eyebrow: "Katalog",
    title: "Sedler og mynter som relasjonskatalog",
    lead: "Katalogen skal ikke være en flat produktliste. Objektene vises med kilde, utgave, år, variant, relasjoner og markedskontekst.",
    image: "/globe/sedler.png",
    imageAlt: "Illustrasjon av norske sedler",
    tone: "tint",
    layout: "catalog-preview",
  },
  {
    id: "historie",
    eyebrow: "Historie",
    title: "Historie og konger",
    lead: "Objekter kan knyttes til regenter, signaturer, produsenter, perioder, hendelser, materiale og proveniens.",
    image: "/globe/historie-og-konger.png",
    imageAlt: "Illustrasjon av historie og konger",
    tone: "soft",
    layout: "split",
    actions: [{ label: "Utforsk historie", href: "/katalog?segment=historie", variant: "secondary" }],
  },
  {
    id: "relasjon",
    eyebrow: "Eksempel på relasjon",
    title: "Karl Johan og historiske koblinger",
    lead: "En historisk relasjon kan åpne objektgrupper, perioder, personer, motiver og markedshistorikk på tvers av katalogen.",
    image: "/globe/karl-johan.png",
    imageAlt: "Illustrasjon av Karl Johan",
    tone: "light",
    layout: "split",
  },
  {
    id: "verdi",
    eyebrow: "Verdi og utvikling",
    title: "Følg verdiutvikling over tid",
    lead: "Markedsdata skal komme fra prisobservasjoner, auksjoner, nettbutikk og samlingshistorikk, ikke fra fiktive frontend-tall.",
    image: "/globe/verdi-og-utvikling.png",
    imageAlt: "Illustrasjon av verdi og utvikling",
    tone: "dark",
    layout: "split",
    actions: [{ label: "Se markedsoversikt", href: "/index", variant: "secondary" }],
  },
  {
    id: "auksjon",
    eyebrow: "Auksjon",
    title: "Auksjon som kontrollert markedskanal",
    lead: "Godkjente objekter kan senere følges, vurderes, publiseres og brukes som prisobservasjoner etter salg.",
    image: "/globe/auksjonshammer.png",
    imageAlt: "Illustrasjon av auksjonshammer",
    tone: "soft",
    layout: "split",
    actions: [{ label: "Åpne auksjon", href: "/auksjon", variant: "secondary" }],
  },
  {
    id: "forhandler",
    eyebrow: "Forhandlere og butikker",
    title: "For samlere, forhandlere og spesialister",
    lead: "Collectium skal gjøre det enklere å koble samlere, forhandlere og objekter på en ryddig måte.",
    body: "Forhandlere kan senere vise objekter, håndtere vurderinger, publisere salgsobjekter og bruke auksjon eller nettbutikk som kontrollerte markedskanaler.",
    image: "/globe/forhandlere-og-butikker.png",
    imageAlt: "Illustrasjon av forhandlere og butikker",
    tone: "light",
    layout: "split",
    actions: [
      { label: "Les om forhandler", href: "/forhandler", variant: "secondary" },
      { label: "Kontakt Collectium", href: "/kontakt", variant: "secondary" },
    ],
  },
  {
    id: "medlemskap",
    eyebrow: "Medlemskap",
    title: "Velg tilgang etter hvordan du samler",
    lead: "Start gratis, bygg samling og utvid til mer historikk, flere filter og dypere markedsdata når du trenger det.",
    tone: "tint",
    layout: "membership",
    cards: [
      { title: "Free", text: "Kom i gang med offentlig katalogutdrag og enkel utforsking." },
      { title: "Bronze", text: "For samlere som vil bruke ønskeliste, favoritter og grunnleggende samlingsverktøy." },
      { title: "Silver", text: "For aktive samlere som vil ha flere filter, mer historikk og bedre oversikt." },
      { title: "Gold", text: "For avansert bruk, forhandlertilgang eller profesjonell samleraktivitet." },
      { title: "Platinum", text: "For full tilgang, flere kilder og profesjonell analyse." },
    ],
    actions: [{ label: "Se medlemskap", href: "/medlemskap", variant: "primary" }],
  },
  {
    id: "internasjonalt",
    eyebrow: "Internasjonalt",
    title: "Internasjonalt og annonsering",
    lead: "Collectium kan senere åpne for flere land, markedsnyheter, auksjonskoblinger og relevante annonseringsflater uten at katalogdata blandes.",
    image: "/globe/internasjonalt-og-annonsering.png",
    imageAlt: "Illustrasjon av internasjonalt og annonsering",
    tone: "soft",
    layout: "split",
  },
  {
    id: "cta",
    eyebrow: "Kom i gang",
    title: "Start med katalogen. Bygg oversikt over tid.",
    lead: "Utforsk objekter, opprett bruker og gjør Collectium til samlerens arbeidsflate.",
    tone: "anno",
    layout: "cta",
    actions: [
      { label: "Start gratis", href: "/medlemskap", variant: "primary" },
      { label: "Utforsk katalogen", href: "/katalog", variant: "secondary" },
    ],
  },
];
