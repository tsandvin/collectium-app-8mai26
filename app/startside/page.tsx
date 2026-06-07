/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Startside
 *
 * Definering / formål:
 * Next.js route for Collectium startside.
 * Renderer CollectiumStartsideV46React som fullbredde startside.
 *
 * Bruksområde:
 * Route: /startside
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - public.startside.view
 * - public.theme.preview
 * - public.catalog.preview
 * - public.membership.preview
 *
 * Berørte API-ruter:
 * - Ingen direkte.
 *
 * Berørte tabeller / views:
 * - Ingen direkte.
 *
 * Dataretning:
 * Statisk frontend-preview -> React -> UI
 *
 * Logging:
 * Ingen DB-logging.
 *
 * Versjon:
 * CT-STARTSIDE-ROUTE-V46-REACT-0001
 */

import CollectiumStartsideV46React from "@/components/startside/CollectiumStartsideV46React";

export default function StartsidePage() {
  return <CollectiumStartsideV46React />;
}
