/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * /startside
 *
 * Definering / formal:
 * Next.js-side for ny Collectium startside. Siden bruker felles CollectiumAppShellV6 i denne pakken.
 * Dersom prosjektet allerede har global AppShell i app/layout.tsx, bytt til innholdskomponenten alene.
 *
 * Bruksomrade:
 * Offentlig startside for Collectium-konsept, katalog, historie, marked, auksjon, forhandler og medlemskap.
 *
 * Berorte sider / routes:
 * - /startside
 *
 * Berorte DB-brytere / feature_keys:
 * - landing.view
 * - catalog.view
 * - membership.plans.view
 *
 * Berorte API-ruter:
 * - Fremtidig: GET /api/membership/plans
 * - Fremtidig: GET /api/catalog/featured
 *
 * Berorte tabeller / views:
 * - Fremtidig: ct_membership_plans
 * - Fremtidig: ct_v_catalog_objects_resolved
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: landing
 * log_action: view
 *
 * Versjon:
 * CT-FILE-STARTSIDE-MINSIDE-V6-0004
 */
import CollectiumAppShellV6 from '../../components/collectium/layout/CollectiumAppShellV6';
import CollectiumStartsideV6 from '../../components/collectium/startside/CollectiumStartsideV6';

export const metadata = {
  title: 'Startside | Collectium',
  description: 'Collectium samler katalog, egen samling, historie, marked, auksjon og forhandlerkontakt i ett miljoo.',
};

export default function StartsidePage() {
  return (
    <CollectiumAppShellV6 activeKey="startside" pageTitle="Collectium startside">
      <CollectiumStartsideV6 />
    </CollectiumAppShellV6>
  );
}
