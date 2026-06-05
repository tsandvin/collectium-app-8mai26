/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Landingsside page
 *
 * Definering / formål:
 * Egen sidefil for /landingsside. Bruker samme template og innholdskomponent
 * som /startside, men kan brukes som kampanje-/public route uten separat design.
 *
 * Bruksområde:
 * Offentlig landingsside for Collectium.
 *
 * Berørte sider / routes:
 * - /landingsside
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
 * log_action: landingsside.view
 *
 * Versjon:
 * CT-FILE-START-V30-PAGE-LANDING / CHANGE-2026-06-05-START-V30
 */

import { CollectiumStartContent } from "../../components/startside/CollectiumStartContent";
import { CollectiumStartTemplate } from "../../components/templates/CollectiumStartTemplate";

export const metadata = {
  title: "Collectium · Landingsside",
  description: "Collectium landingsside for samlere, katalog, historikk, marked, auksjon og medlemskap.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function LandingssidePage() {
  return (
    <CollectiumStartTemplate showSidebar={false}>
      <CollectiumStartContent />
    </CollectiumStartTemplate>
  );
}
