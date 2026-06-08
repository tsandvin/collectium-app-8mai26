/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Katalogside
 *
 * Definering / formål:
 * Next.js server page for Collectium katalog.
 * Siden eier ikke global layout, topbar, sidebar, body, html,
 * bakgrunn eller globale template-regler.
 *
 * Bruksområde:
 * Route: /katalog
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
 * Viktig:
 * Denne siden bruker lokal testdata i klientkomponenten.
 * Den skriver ikke til MariaDB.
 */

import CollectiumCatalogClient from "@/components/catalog/CollectiumCatalogClient"

export default function KatalogPage() {
  return <CollectiumCatalogClient />
}
