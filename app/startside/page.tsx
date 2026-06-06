/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Startside page
 *
 * Definering / formål:
 * Ren Next.js-side for /startside.
 * Siden bruker globalt skall og ren startsidekomponent.
 *
 * Bruksområde:
 * Offentlig startside.
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 *
 * Berørte API-ruter:
 * - Ingen direkte
 *
 * Berørte tabeller / views:
 * - Ingen direkte
 *
 * Dataretning:
 * Global template → StartsideContent → UI
 *
 * Logging:
 * Ingen direkte logging
 *
 * Versjon:
 * CT-STARTSIDE-PAGE-CLEAN-0001 / CHANGE-REINSTALL-4-SKINS
 */

import { CollectiumStartsideClean } from "@/components/startside/CollectiumStartsideClean";

export default function StartsidePage(): JSX.Element {
  return <CollectiumStartsideClean />;
}
