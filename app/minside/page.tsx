/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Legacy alias for Min side
 *
 * Definering / formal:
 * Sender /minside til ny Next.js-standard /min-side.
 *
 * Bruksomrade:
 * Brukes for bakoverkompatibilitet med tidligere URL-navn.
 *
 * Berorte sider / routes:
 * - /minside
 * - /min-side
 *
 * Berorte DB-brytere / feature_keys:
 * - profile.view
 *
 * Berorte API-ruter:
 * - Ingen direkte
 *
 * Berorte tabeller / views:
 * - Ingen direkte
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: route
 * log_action: minside.alias
 *
 * Versjon:
 * CT-FILE-ROUTE-MINSIDE-ALIAS-0001 / CHANGE-2026-06-05-0001
 */

import { redirect } from "next/navigation";

export default function LegacyMinsidePage() {
  redirect("/min-side");
}
