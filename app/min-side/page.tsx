/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Min side
 *
 * Definering / formål:
 * Ren Min side innholdsside.
 * Skal ikke eie AppShell, toppbar, sidemeny, template, PageFrame, html, body eller global bakgrunn.
 *
 * Bruksområde:
 * Vises inne i global CollectiumAppShell fra app/layout.tsx.
 *
 * Berørte sider / routes:
 * - /min-side
 *
 * Berørte DB-brytere / feature_keys:
 * - profile.view
 * - profile.membership
 * - profile.activity
 * - collection.view
 *
 * Dataretning:
 * MariaDB → API/backend → Next.js → React → UI
 */

import CollectiumMinsideV6 from "@/components/collectium/minside/CollectiumMinsideV6";

export default function MinSidePage() {
  return <CollectiumMinsideV6 />;
}
