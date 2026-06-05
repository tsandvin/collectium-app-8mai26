/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Startside
 *
 * Definering / formål:
 * Ren startsideinnholdsside.
 * Skal ikke eie AppShell, toppbar, sidemeny, template, PageFrame, html, body eller global bakgrunn.
 *
 * Bruksområde:
 * Vises inne i global CollectiumAppShell fra app/layout.tsx.
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 *
 * Dataretning:
 * MariaDB → API/backend → Next.js → React → UI
 */

import CollectiumStartsideV6 from "@/components/collectium/startside/CollectiumStartsideV6";

export default function StartsidePage() {
  return (
    <div className="ct-public-startside">
      <CollectiumStartsideV6 />
    </div>
  );
}
