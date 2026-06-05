/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Landingsside Page
 *
 * Definering / formål:
 * Landing page rendered inside global Collectium template.
 *
 * Bruksområde:
 * Route /landingsside
 *
 * Berørte sider / routes:
 * - /landingsside
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

import { LandingssideContent } from "@/components/frontpage/LandingssideContent";
import { CollectiumPageTemplate } from "@/components/templates/CollectiumPageTemplate";

export default function LandingssidePage(): JSX.Element {
  return (
    <CollectiumPageTemplate
      title="Collectium"
      eyebrow="Samlerplattform"
      description="En samlet plattform for norske sedler, mynter, historiske relasjoner, samling, marked, auksjon og forhandlere."
      variant="landing"
    >
      <LandingssideContent />
    </CollectiumPageTemplate>
  );
}
