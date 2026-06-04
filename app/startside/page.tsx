/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Startside page
 *
 * Definering / formål:
 * Egen sidefil for /startside. Siden eier ikke shell/design og bruker
 * CollectiumStartTemplate for topbar, sidemeny, rammer, signatur og footer.
 *
 * Bruksområde:
 * Offentlig startside for Collectium.
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 * - landing.register
 * - landing.login
 * - landing.membership
 * - catalog.view
 *
 * Berørte API-ruter:
 * - GET /api/catalog/featured senere
 * - GET /api/index/market-preview senere
 *
 * Berørte tabeller / views:
 * - ct_v_catalog_objects_resolved senere
 * - ct_v_catalog_market_summary senere
 *
 * Dataretning:
 * MariaDB/API senere -> Next.js -> React -> UI.
 *
 * Logging:
 * log_category: landing
 * log_action: startside.view
 *
 * Versjon:
 * CT-FILE-START-V30-PAGE-STARTSIDE / CHANGE-2026-06-05-START-V30
 */

import { CollectiumStartContent } from "../../components/startside/CollectiumStartContent";
import { CollectiumStartTemplate } from "../../components/templates/CollectiumStartTemplate";

export const metadata = {
  title: "Collectium · Startside",
  description: "Collectium startside for samlere, historikk, katalog, auksjon og markedsutvikling.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function StartsidePage() {
  return (
    <CollectiumStartTemplate showSidebar>
      <CollectiumStartContent />
    </CollectiumStartTemplate>
  );
}
