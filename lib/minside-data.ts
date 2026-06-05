/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Min side data- og visningsmanifest
 *
 * Definering / formål:
 * Samler midlertidige frontend-data for Min side preview i Next.js.
 * I produksjon skal disse verdiene hentes fra session, MariaDB og API.
 *
 * Bruksområde:
 * Brukes av app/minside/*-sidene og MinsideShell.
 *
 * Berørte sider / routes:
 * - /minside
 * - /minside/profil
 * - /minside/aktivitet
 * - /minside/samling
 * - /minside/finans
 * - /minside/deling
 * - /minside/innstillinger
 * - /minside/forhandler
 * - /minside/admin
 *
 * Berørte DB-brytere / feature_keys:
 * - next.minside.* / profile.* / activity.* / collection.* / index.* / share.* / settings.*
 *
 * Dataretning:
 * MariaDB/API -> Next.js server components -> React UI.
 */

export type Role = 'user' | 'dealer' | 'admin';
export type SectionKey = 'oversikt' | 'profil' | 'aktivitet' | 'samling' | 'finans' | 'deling' | 'innstillinger';
export type RoleArea = 'bruker' | 'forhandler' | 'admin';

export type SearchParamsInput = { role?: string } | Promise<{ role?: string }> | undefined;

export async function getRoleFromSearchParams(searchParams: SearchParamsInput): Promise<Role> {
  const resolved = await searchParams;
  return getRole(resolved?.role);
}

export function getRole(value?: string): Role {
  if (value === 'admin') return 'admin';
  if (value === 'dealer' || value === 'forhandler') return 'dealer';
  return 'user';
}

export function roleQuery(role: Role): string {
  return `?role=${role}`;
}

export function allowedRoleAreas(role: Role): RoleArea[] {
  if (role === 'admin') return ['bruker', 'forhandler', 'admin'];
  if (role === 'dealer') return ['bruker', 'forhandler'];
  return ['bruker'];
}

export const sectionNav: Array<{ key: SectionKey; label: string; href: string }> = [
  { key: 'oversikt', label: 'Oversikt', href: '/minside' },
  { key: 'profil', label: 'Profil', href: '/minside/profil' },
  { key: 'aktivitet', label: 'Aktivitet', href: '/minside/aktivitet' },
  { key: 'samling', label: 'Samling', href: '/minside/samling' },
  { key: 'finans', label: 'Index / Finans', href: '/minside/finans' },
  { key: 'deling', label: 'Deling', href: '/minside/deling' },
  { key: 'innstillinger', label: 'Innstillinger', href: '/minside/innstillinger' }
];

export const roleNav: Array<{ key: RoleArea; label: string; href: string }> = [
  { key: 'bruker', label: 'Bruker', href: '/minside' },
  { key: 'forhandler', label: 'Forhandler', href: '/minside/forhandler' },
  { key: 'admin', label: 'Admin', href: '/minside/admin' }
];

export const overviewCards = [
  { title: 'Profil og medlemskap', href: '/minside/profil', status: 'Silver aktiv', meta: 'Profil 86 % · telefon mangler', text: 'Persondata, medlemskap, varighet, verifisering, sikkerhet og sesjoner.' },
  { title: 'Aktivitet og logg', href: '/minside/aktivitet', status: '7 aktiviteter', meta: '3 varsler · 2 krever handling', text: 'Varsler, transaksjoner, prosesser, meldinger, dokumenter og systemhendelser.' },
  { title: 'Min samling', href: '/minside/samling', status: '142 objekter', meta: '22 hjerte · 14 stjerne', text: 'Katalogvisning av hele samlingen med filter, relasjoner, marked og brukerstatus.' },
  { title: 'Index / Finans', href: '/minside/finans', status: '186 000 NOK', meta: '+11 % siste 12 mnd', text: 'Samlingsverdi, trend, marked, relasjon mot index og manglende data.' },
  { title: 'Deling', href: '/minside/deling', status: '3 aktive', meta: '1 utløper snart', text: 'Objektlenker, gruppevisning, samlingslister, besøk og mottakerstatus.' },
  { title: 'Innstillinger', href: '/minside/innstillinger', status: '12 aktive', meta: '2 låst av medlemskap', text: 'Varsler, personvern, sikkerhet, aktive funksjoner og tilgangsstatus.' }
];

export const profileRows = [
  ['Kundenummer', 'CT-NO-1042', 'Aktiv'],
  ['Medlemskap', 'Silver', 'Fornyes 04.06.2027'],
  ['Profilstatus', '86 % komplett', 'Telefon gjenstår'],
  ['E-post', 'Verifisert', 'OK'],
  ['Telefon', 'Ikke verifisert', 'Krever handling'],
  ['Sesjoner', '2 aktive', 'Kontrollerbar']
];

export const activityFilters = [
  { title: 'Loggtype', values: ['Alle', 'Varsler', 'Transaksjoner', 'Prosesser', 'Meldinger', 'Dokumenter', 'System'] },
  { title: 'Dato', values: ['I dag', 'Siste 7 dager', 'Siste 30 dager', '2026'] },
  { title: 'Objekttype', values: ['Alle', 'Seddel', 'Mynt', 'Dokument', 'Betaling'] },
  { title: 'Land', values: ['Alle', 'Norge', 'Sverige', 'Danmark'] },
  { title: 'Marked', values: ['Auksjon', 'Nettbutikk', 'I samling', 'Kjøp/salg'] },
  { title: 'Status', values: ['Krever handling', 'Venter', 'Fullført', 'Arkivert'] }
];

export const activityLog = [
  {
    icon: '!', tone: 'danger', title: 'Dokumentasjon mangler', type: 'Prosessvarsel', status: 'Krever handling',
    object: '1 krone · 1917 · Litra A', objectType: 'Seddel', country: 'Norge', relation: 'I samling', date: '07.06.2026',
    detail: 'Objektet mangler dokumentasjon for kjøp/salg før det kan sendes til forhandler eller auksjon.',
    actions: ['Åpne objekt i samling', 'Last opp dokument', 'Se prosess']
  },
  {
    icon: '◆', tone: 'finance', title: 'Ny verdiobservasjon', type: 'Finans', status: 'Oppdatert',
    object: '100 kroner · 1877 · Standardutgave', objectType: 'Seddel', country: 'Norge', relation: 'Index / Finans', date: '04.06.2026',
    detail: 'Markedet viser +8,4 % siste 12 måneder. Objektet påvirker din personlige samlingsindex.',
    actions: ['Åpne objektpresentasjon', 'Se index', 'Se marked']
  },
  {
    icon: '✓', tone: 'success', title: 'Betaling registrert', type: 'Transaksjon', status: 'Fullført',
    object: '2 kroner · 1914 · Sølv', objectType: 'Mynt', country: 'Norge', relation: 'Kjøp', date: '01.06.2026',
    detail: 'Kjøp er registrert med faktura og transaksjonsnotat. Objektet ligger i Min samling.',
    actions: ['Åpne faktura', 'Åpne transaksjon', 'Åpne objekt']
  },
  {
    icon: '↗', tone: 'share', title: 'Delt objektgruppe åpnet', type: 'Deling', status: 'Besøkt',
    object: 'Norske sedler · 1917-serien', objectType: 'Objektgruppe', country: 'Norge', relation: 'Delt lenke', date: '31.05.2026',
    detail: 'Mottaker åpnet delt objektgruppe via privat lenke. Tilgang er fortsatt aktiv.',
    actions: ['Åpne deling', 'Stopp deling', 'Se besøk']
  }
];

export const collectionFilters = [
  { title: 'Kildegrunnlag', values: ['Norske sedler 86', 'Norske mynter 42', 'Andre objekter 14'] },
  { title: 'Objekt', values: ['Seddel 86', 'Mynt 42', 'Dokument 6', 'Reklame 8'] },
  { title: 'Relasjoner', values: ['Haakon VII 31', 'Norges Bank 62', '1917-serien 9', 'Sikkerhetspapir 48'] },
  { title: 'Marked og bruker', values: ['I samling 142', 'Hjerte 22', 'Stjerne 14', 'Auksjon 6', 'Nettbutikk 9', 'Mangler verdi 37'] },
  { title: 'Visning', values: ['Horisontal', 'Stående', 'Liste', 'Kort', 'Tabell', 'Museum'] }
];

export const collectionObjects = [
  { title: '1 krone · 1917-serien · 1917 · Litra A · Seddel', meta: 'NS 12 · Norske sedler', status: 'I samling', value: '1 200 NOK', trend: '+4 %', relation: 'Haakon VII · sikkerhetspapir' },
  { title: '100 kroner · 1. utgave · 1877 · Standardutgave · Seddel', meta: 'NS 1 459 · Norske sedler', status: 'Mangler kvalitet', value: 'Henter verdi', trend: 'Ikke vurdert', relation: 'Oscar II · Norges Bank' },
  { title: '2 kroner · Jubileumsutgave · 1914 · Standardutgave · Mynt', meta: 'NM 12 · Norsk myntkatalog', status: 'Favoritt', value: '8 600 NOK', trend: '+11 %', relation: 'Sølv · utgaveperiode' }
];

export const financeRelations = [
  ['Norske sedler', '86 objekter', '112 000 NOK', '+9 %', '18 mangler verdi'],
  ['Norske mynter', '42 objekter', '61 500 NOK', '+14 %', '11 mangler verdi'],
  ['Auksjon', '6 fulgte bud', '92 000 NOK', '+7 %', '2 krever handling'],
  ['Nettbutikk', '9 fulgte salg', '118 000 NOK', '+5 %', '3 prisavvik'],
  ['Kjøp / salg', '24 transaksjoner', '121 000 NOK kjøpt for', '+65 000 NOK', '4 mangler dokument']
];

export const shareRows = [
  ['Delt objektgruppe', 'Norske sedler · 1917-serien', 'Aktiv til 18.06.2026', '3 visninger'],
  ['Samlingsliste', 'Privat lenke', 'Aktiv', '1 mottaker'],
  ['Utløpt lenke', 'Norske mynter · sølv', 'Utløpt', '7 visninger']
];

export const settingsRows = [
  ['Medlemskap aktivt', 'Aktiv', 'Silver'],
  ['Profil komplett', 'Delvis', '86 %'],
  ['Varsler', 'Aktiv', 'E-post på'],
  ['SMS-varsler', 'Mangler', 'Telefon ikke verifisert'],
  ['Deling aktivert', 'Aktiv', '3 lenker'],
  ['Index / Finans', 'Aktiv', 'Silver'],
  ['Eksport', 'Låst', 'Krever Gold'],
  ['Full analyse', 'Låst', 'Krever Platinum']
];

export const dealerRows = [
  ['Forhandlerstatus', 'Aktiv', 'Avtale signert'],
  ['Objektgrupper', 'Sedler · Mynter', '2 grupper'],
  ['Innleveringer', '12 aktive', '2 krever dokumentasjon'],
  ['Auksjon', '6 aktive', '3 klargjøres'],
  ['Nettbutikk', '9 aktive', '1 prisavvik'],
  ['Oppgjør', '3 venter', 'Kontroller']
];

export const adminRows = [
  ['Sidekontroll', 'OK med varsler', '4 punkter'],
  ['Brukere og roller', '3 krever kontroll', 'Admin'],
  ['Import', '2 venter', 'AI-mapping'],
  ['Tilgang / brytere', 'Aktiv', 'DB 8.4'],
  ['Systemlogg', '1 varsel', 'Kontroller'],
  ['Publisering', 'Blokkert ved feil', 'Sikker']
];
