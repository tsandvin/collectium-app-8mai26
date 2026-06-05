/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumPublicStartTemplate
 *
 * Definering / formål:
 * Ren innholdstemplate for offentlige/startside-relaterte sider.
 * Skal ikke eie global toppbar, sidemeny, shell, body, html eller bakgrunn.
 *
 * Bruksområde:
 * Brukes kun som innholdslag inne i global CollectiumAppShell fra app/layout.tsx.
 *
 * Berørte sider / routes:
 * - /startside
 * - /
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 *
 * Dataretning:
 * MariaDB → API/backend → Next.js → React → UI
 *
 * Endringsregel:
 * Global toppbar/sidemeny skal kun eies av app/layout.tsx → CollectiumAppShell.
 */

import type { ReactNode } from "react";

type CollectiumPublicStartTemplateProps = {
  children: ReactNode;
};

export function CollectiumPublicStartTemplate({
  children,
}: CollectiumPublicStartTemplateProps) {
  return <>{children}</>;
}

export default CollectiumPublicStartTemplate;
