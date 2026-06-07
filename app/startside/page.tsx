import CollectiumPublicShell from "@/components/layout/CollectiumPublicShell";
/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Startside
 *
 * Definering / formÃ¥l:
 * Next.js route for Collectium startside. Renders only the page content component.
 * The global shell, topbar, sidebar, mobile menu, page frame and skin are owned by
 * app/layout.tsx and components/layout/components/templates.
 *
 * BruksomrÃ¥de:
 * Public startside route.
 *
 * BerÃ¸rte sider / routes:
 * - /startside
 *
 * BerÃ¸rte DB-brytere / feature_keys:
 * - landing.view
 * - catalog.view
 * - membership.view
 *
 * BerÃ¸rte API-ruter:
 * - none in this static first React version
 *
 * BerÃ¸rte tabeller / views:
 * - none in this static first React version
 *
 * Dataretning:
 * MariaDB â†’ API/backend â†’ Next.js â†’ React â†’ UI
 *
 * Logging:
 * log_category: landing
 * log_action: view
 *
 * Endringsregel:
 * This file must not create AppShell, Topbar, Sidebar, body/html or local global shell.
 */

import CollectiumStartsideV46React from "@/components/startside/CollectiumStartsideV46React";

export default function StartsidePage() {
  return (
    <CollectiumPublicShell>
      <CollectiumStartsideV46React />
    </CollectiumPublicShell>
  );
}

