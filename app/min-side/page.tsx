/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * /min-side
 *
 * Definering / formal:
 * Next.js-side for ny Min side. Siden bruker felles CollectiumAppShellV6 i denne pakken.
 * Dersom prosjektet allerede har global AppShell i app/layout.tsx, bytt til innholdskomponenten alene.
 *
 * Bruksomrade:
 * Brukerens kontrollsenter for profil, medlemskap, samling, varsler, meldinger, prosesser og transaksjoner.
 *
 * Berorte sider / routes:
 * - /min-side
 *
 * Berorte DB-brytere / feature_keys:
 * - profile.view
 * - profile.membership
 * - profile.notifications
 * - profile.activity
 * - collection.view
 * - collection.transaction.view
 *
 * Berorte API-ruter:
 * - Fremtidig: GET /api/profile/overview
 * - Fremtidig: GET /api/membership/status
 * - Fremtidig: GET /api/collection/summary
 *
 * Berorte tabeller / views:
 * - Fremtidig: ct_users
 * - Fremtidig: ct_user_profiles
 * - Fremtidig: ct_memberships
 * - Fremtidig: ct_collection_items
 * - Fremtidig: ct_collection_transactions
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: profile
 * log_action: view_dashboard
 *
 * Versjon:
 * CT-FILE-STARTSIDE-MINSIDE-V6-0005
 */
import CollectiumAppShellV6 from '../../components/collectium/layout/CollectiumAppShellV6';
import CollectiumMinsideV6 from '../../components/collectium/minside/CollectiumMinsideV6';

export const metadata = {
  title: 'Min side | Collectium',
  description: 'Din Collectium-arbeidsflate for profil, medlemskap, samling, varsler, prosesser og transaksjoner.',
};

export default function MinSidePage() {
  return (
    <CollectiumAppShellV6 activeKey="minside" pageTitle="Min side">
      <CollectiumMinsideV6 />
    </CollectiumAppShellV6>
  );
}
