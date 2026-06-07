/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Startside
 *
 * Definering / formål:
 * Public startside for Collectium.
 *
 * Bruksområde:
 * Route: /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - public.startside.view
 *
 * Berørte API-ruter:
 * - Ingen direkte.
 *
 * Berørte tabeller / views:
 * - Ingen direkte.
 *
 * Dataretning:
 * Public route -> PublicShell -> Startside V47
 *
 * Versjon:
 * CT-STARTSIDE-ROUTE-8.5-V47-0001
 *
 * Endringsregel:
 * Denne route-filen skal ikke lage app-sidebar, app-topbar, body/html eller lokal global shell.
 */

import CollectiumPublicShell from "@/components/layout/CollectiumPublicShell";
import CollectiumStartsideV47Public from "@/components/startside/CollectiumStartsideV47Public";

export default function StartsidePage() {
  return (
    <CollectiumPublicShell>
      <CollectiumStartsideV47Public />
    </CollectiumPublicShell>
  );
}
