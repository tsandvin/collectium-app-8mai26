/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Startside route
 *
 * Definering / formål:
 * Next.js App Router-side for ny Collectium startside.
 *
 * Bruksområde:
 * Viser ny startside uten sidebar, med gjenbrukbar topbar.
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 *
 * Berørte API-ruter:
 * - Ingen i v1.
 *
 * Berørte tabeller / views:
 * - Ingen i v1.
 *
 * Dataretning:
 * Next.js route → React component → UI
 *
 * Logging:
 * Ingen serverlogging i v1.
 *
 * Versjon:
 * CT-FILE-STARTSIDE-V47-0003
 */

import CollectiumStartsideV47 from '@/components/frontpage/CollectiumStartsideV47'

export default function StartsidePage() {
  return <CollectiumStartsideV47 />
}
