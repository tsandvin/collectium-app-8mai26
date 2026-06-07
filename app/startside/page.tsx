/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Startside
 *
 * Definering / formål:
 * Next.js route for Collectium startside.
 * Viser kontrollert V42 Tema Preview.
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
 * CT-STARTSIDE-ROUTE-V42-TEMA-PREVIEW-0002
 *
 * Endringsregel:
 * Denne filen skal kun rendre startsidens innholdskomponent.
 * Global template-root endres ikke i denne patchen.
 */

import CollectiumStartsideV42TemaPreview from "@/components/startside/CollectiumStartsideV42TemaPreview";

export default function StartsidePage() {
  return <CollectiumStartsideV42TemaPreview />;
}
