/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Startside Page
 *
 * Definering / formål:
 * Startside rendered inside global Collectium template.
 *
 * Bruksområde:
 * Route /startside
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 *
 * Dataretning:
 * Presentation only.
 *
 * Versjon:
 * CT-PATCH-STRUCTURE-FIX-V1
 */

import Link from "next/link";
import { StartsideContent } from "@/components/frontpage/StartsideContent";
import { CollectiumPageTemplate } from "@/components/templates/CollectiumPageTemplate";

export default function StartsidePage(): JSX.Element {
  return (
    <CollectiumPageTemplate
      title="For samlere. Av samlere. Alt på ett sted."
      eyebrow="For samlere · for historien · for markedet"
      description="Collectium samler katalog, egen samling, historiske relasjoner, auksjon, forhandlerkontakt og markedsutvikling i ett miljø."
      variant="landing"
      actions={
        <>
          <Link className="ct-button ct-button--primary" href="/registrering">
            Start gratis
          </Link>
          <Link className="ct-button" href="/katalog">
            Se katalog
          </Link>
        </>
      }
    >
      <StartsideContent />
    </CollectiumPageTemplate>
  );
}
