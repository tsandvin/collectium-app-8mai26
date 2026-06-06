/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Min side data contract v1
 *
 * Definering / formal:
 * Forelopig UI-kontrakt for Min side. Data er mock/fallback til ekte API er koblet.
 *
 * Bruksomrade:
 * Brukes av MinsideDashboard for rollebasert visning.
 *
 * Berorte sider / routes:
 * - /min-side
 * - /minside
 *
 * Berorte DB-brytere / feature_keys:
 * - profile.view
 * - membership.view
 * - collection.view
 * - activity.view
 * - notifications.view
 * - messages.view
 * - transactions.view
 * - processes.view
 * - dealer.dashboard.view
 * - admin.dashboard.view
 *
 * Berorte API-ruter:
 * - GET /api/profile/overview
 * - GET /api/activity/feed
 * - GET /api/collection/summary
 * - GET /api/dealer/dashboard
 * - GET /api/admin/overview
 *
 * Berorte tabeller / views:
 * - ct_users
 * - ct_memberships
 * - ct_collection_items
 * - ct_user_object_states
 * - ct_collection_transactions
 * - ct_activity_log
 * - ct_notifications
 * - ct_processes
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: profile
 * log_action: minside.view
 *
 * Versjon:
 * CT-FILE-MINSIDE-DATA-0001 / CHANGE-2026-06-05-0001
 */

export type MinsideRole = "user" | "dealer" | "admin";

export type MinsidePanel = {
  title: string;
  value: string;
  meta: string;
  href: string;
  featureKey: string;
};

export type ArchiveItem = {
  type: string;
  title: string;
  object: string;
  status: string;
  date: string;
  priority: "lav" | "normal" | "hoy" | "kritisk";
  featureKey: string;
};

export const roleLabels: Record<MinsideRole, string> = {
  user: "Bruker",
  dealer: "Forhandler",
  admin: "Admin",
};

export const userPanels: MinsidePanel[] = [
  { title: "Medlemskap", value: "Silver", meta: "Aktiv til 04.06.2027", href: "/min-side?panel=medlemskap", featureKey: "membership.view" },
  { title: "Min samling", value: "142", meta: "37 mangler verdi · 9 mangler bilde", href: "/samling", featureKey: "collection.view" },
  { title: "Onskeliste", value: "22", meta: "Hjerte / wishlist", href: "/min-side?panel=onskeliste", featureKey: "collection.wishlist.view" },
  { title: "Favoritter", value: "14", meta: "Stjerne / favoritt", href: "/min-side?panel=favoritter", featureKey: "collection.favorite.view" },
  { title: "Transaksjoner", value: "18", meta: "Kjop, salg, bud og oppgjor", href: "/min-side?panel=transaksjoner", featureKey: "transactions.view" },
  { title: "Estimert verdi", value: "186 000 NOK", meta: "+11,2 % mot 12 mnd index", href: "/bors", featureKey: "index.personal.view" },
];

export const dealerPanels: MinsidePanel[] = [
  { title: "Forhandlerstatus", value: "Aktiv", meta: "Sedler · Mynter", href: "/forhandler", featureKey: "dealer.dashboard.view" },
  { title: "Innleveringer", value: "7", meta: "4 til vurdering · 3 klare", href: "/forhandler?panel=innleveringer", featureKey: "dealer.consignments.view" },
  { title: "Auksjon", value: "11", meta: "Aktive objekter", href: "/auksjoner", featureKey: "dealer.auction.prepare" },
  { title: "Nettbutikk", value: "18", meta: "Aktive salgsobjekter", href: "/forhandler?panel=nettbutikk", featureKey: "dealer.shop.prepare" },
];

export const adminPanels: MinsidePanel[] = [
  { title: "Database", value: "OK", meta: "MariaDB / API tilgjengelig", href: "/admin", featureKey: "admin.system.view" },
  { title: "DB 8.4", value: "3 varsler", meta: "Feature/action-route sjekk", href: "/admin?panel=brytere", featureKey: "admin.routes.view" },
  { title: "Brukere", value: "Nye 12", meta: "2 krever kontroll", href: "/admin?panel=brukere", featureKey: "admin.users.view" },
  { title: "Datakvalitet", value: "1283", meta: "Objekter uten verdi", href: "/admin?panel=datakvalitet", featureKey: "admin.data_quality.view" },
];

export const archiveItems: ArchiveItem[] = [
  { type: "Prosess", title: "Dokumentasjon mangler", object: "1 krone · 1917 · Litra A", status: "Krever handling", date: "07.06.2026", priority: "hoy", featureKey: "processes.view" },
  { type: "Finans", title: "Ny verdiobservasjon", object: "100 kroner · 1877 · Standardutgave", status: "Oppdatert", date: "04.06.2026", priority: "normal", featureKey: "index.personal.view" },
  { type: "Auksjon", title: "Bud fulgt", object: "2 kroner · 1914 · Solv", status: "Folges", date: "12.06.2026", priority: "normal", featureKey: "auction.watch" },
  { type: "Melding", title: "Melding fra forhandler", object: "Innlevering #1042", status: "Ulest", date: "05.06.2026", priority: "normal", featureKey: "messages.view" },
  { type: "System", title: "API-varsel", object: "catalog.search", status: "Admin kontroll", date: "05.06.2026", priority: "kritisk", featureKey: "admin.system.view" },
];

export const featureRows = [
  ["profile.view", "Profil", "Aktiv", "ct_users / ct_user_profiles"],
  ["membership.view", "Medlemskap", "Aktiv", "ct_memberships"],
  ["collection.view", "Min samling", "Aktiv", "ct_collection_items"],
  ["transactions.view", "Transaksjoner", "Aktiv", "ct_collection_transactions"],
  ["dealer.dashboard.view", "Forhandler", "Rollebasert", "ct_dealers / ct_dealer_objects"],
  ["admin.dashboard.view", "Admin", "Rollebasert", "ct_app_pages / ct_app_features"],
];
