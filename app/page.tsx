/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Root page
 *
 * Definering / formål:
 * Root route viser samme rene startside som /startside.
 *
 * Bruksområde:
 * /
 *
 * Berørte sider / routes:
 * - /
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
 * CT-ROOT-PAGE-CLEAN-0001 / CHANGE-REINSTALL-4-SKINS
 */

import { CollectiumStartsideClean } from "@/components/startside/CollectiumStartsideClean";

export default function HomePage(): JSX.Element {
  return <CollectiumStartsideClean />;
}
