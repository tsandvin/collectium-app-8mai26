/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Min side page
 *
 * Definering / formÃ¥l:
 * Next.js-side for /min-side. Siden er kun innhold inne i eksisterende global Collectium template.
 * Den skal ikke lage egen sidebar, topbar, AppShell, body/html, bakgrunn eller globalt skall.
 *
 * BruksomrÃ¥de:
 * Brukes som brukerens rollebaserte kontrollsenter for profil, medlemskap, samling,
 * kjÃ¸p/salg, prosesser, varsler, meldinger og rolleflater for forhandler/admin.
 *
 * BerÃ¸rte sider / routes:
 * - /min-side
 *
 * BerÃ¸rte DB-brytere / feature_keys:
 * - user.dashboard.view
 * - user.profile.view
 * - user.membership.view
 * - collection.view
 * - user.processes.view
 * - dealer.dashboard.view
 * - admin.dashboard.view
 *
 * BerÃ¸rte API-ruter:
 * - GET /api/min-side/summary
 *
 * BerÃ¸rte tabeller / views:
 * - ct_users
 * - ct_user_profiles
 * - ct_user_memberships
 * - ct_collection_items
 * - ct_processes
 * - ct_notifications
 * - ct_messages
 *
 * Dataretning:
 * MariaDB â†’ API/backend â†’ Next.js â†’ React â†’ UI
 *
 * Logging:
 * log_category: user
 * log_action: min_side.view
 *
 * Versjon:
 * CT-MINSIDE-0002 / CHANGE-2026-06-08-0001
 */

import CollectiumMinSideClient from "@/components/min-side/CollectiumMinSideClient";
import { getMinSideData } from "@/lib/min-side/get-min-side-data";

export const metadata = {
  title: "Min side Â· Collectium",
  description: "Rollebasert Min side for Collectium.",
};

export default async function MinSidePage() {
  const data = await getMinSideData();

  return <CollectiumMinSideClient initialData={data} />;
}
