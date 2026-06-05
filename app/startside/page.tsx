/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Public Startside Route
 *
 * Definering / formal:
 * Next.js route for offentlig startside uten sidemeny. Siden eier ikke design.
 * Den rendrer innhold inne i global public template/layout.
 *
 * Bruksomrade:
 * Route: /startside
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
 * - Ingen direkte API-kall i statisk public-versjon.
 *
 * Berorte tabeller / views:
 * - Ingen direkte tabell/view i denne route-filen.
 *
 * Dataretning:
 * Public content -> Next.js -> React -> UI. Dynamisk data skal senere gaa via API/backend.
 *
 * Logging:
 * log_category: landing
 * log_action: view
 *
 * Versjon:
 * CT-STARTSIDE-PAGE-V2 / CHANGE-2026-06-05-STARTSIDE-TEMPLATE-COMPLIANT
 *
 * Endringsregel:
 * Ikke legg design, shell, sidebar, topbar, global CSS eller skinlogikk i denne filen.
 */

import type { Metadata } from "next";
import CollectiumStartside from "../../components/startside/CollectiumStartside";
import { CollectiumStartTemplate } from "../../components/templates/CollectiumStartTemplate";

export const metadata: Metadata = {
  title: "Collectium · Startside",
  description: "Offentlig startside for Collectium uten sidemeny.",
};

export default function StartsidePage() {
  return (
    <CollectiumStartTemplate showSidebar={false}>
      <CollectiumStartside />
    </CollectiumStartTemplate>
  );
}
