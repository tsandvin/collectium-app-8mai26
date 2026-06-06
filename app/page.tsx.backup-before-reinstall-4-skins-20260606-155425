/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Home Page
 *
 * Definering / formål:
 * Root page rendered inside global Collectium template.
 *
 * Bruksområde:
 * Route /
 *
 * Berørte sider / routes:
 * - /
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

export default function HomePage(): JSX.Element {
  return (
    <CollectiumPageTemplate
      title="For samlere. Av samlere. Alt på ett sted."
      eyebrow="Collectium"
      description="Samling, historie, marked og trygg oversikt i én strukturert plattform."
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
