/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Startside
 *
 * Definering / formål:
 * Next.js route for Collectium startside.
 * Renderer kontrollert Startside V42 med fire skins.
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
 *
 * Berørte API-ruter:
 * - Ingen direkte.
 *
 * Berørte tabeller / views:
 * - Ingen direkte.
 *
 * Dataretning:
 * Statisk preview -> React -> UI
 *
 * Logging:
 * Ingen DB-logging.
 *
 * Versjon:
 * CT-STARTSIDE-ROUTE-V42-TEMA-PREVIEW-0005
 *
 * Endringsregel:
 * Denne filen skal kun rendre startsidens innholdskomponent.
 */

import CollectiumStartsideV42TemaPreview from "@/components/startside/CollectiumStartsideV42TemaPreview";

export default function StartsidePage() {
  return <CollectiumStartsideV42TemaPreview />;
}
