/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Min side route
 *
 * Definering / formal:
 * Next.js-side for brukerens rollebaserte kontrollsenter.
 *
 * Bruksomrade:
 * Vises paa /min-side. Bruker role-query til demo/forhandsvisning.
 *
 * Berorte sider / routes:
 * - /min-side
 *
 * Berorte DB-brytere / feature_keys:
 * - profile.view
 * - membership.view
 * - collection.view
 * - activity.view
 * - dealer.dashboard.view
 * - admin.dashboard.view
 *
 * Berorte API-ruter:
 * - GET /api/profile/overview
 * - GET /api/activity/feed
 *
 * Berorte tabeller / views:
 * - ct_users
 * - ct_memberships
 * - ct_activity_log
 * - ct_collection_items
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: profile
 * log_action: minside.page
 *
 * Versjon:
 * CT-FILE-ROUTE-MINSIDE-0001 / CHANGE-2026-06-05-0001
 */

import AppShell from "../components/AppShell";
import { MinsideDashboard } from "@/components/minside/MinsideDashboard";
import type { MinsideRole } from "@/components/minside/minside-data";

function normalizeRole(value?: string | string[]): MinsideRole {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "admin" || raw === "dealer" || raw === "user") return raw;
  return "user";
}

export default async function MinSidePage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const params = searchParams ? await searchParams : {};
  const role = normalizeRole(params.role);

  return (
    <AppShell>
      <MinsideDashboard role={role} />
    </AppShell>
  );
}
