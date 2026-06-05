/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Admin Page
 *
 * Definering / formål:
 * Admin page rendered inside global Collectium template.
 *
 * Bruksområde:
 * Route /admin
 *
 * Berørte sider / routes:
 * - /admin
 *
 * Berørte DB-brytere / feature_keys:
 * - admin.dashboard.view
 *
 * Berørte API-ruter:
 * - Future: GET /api/admin/system/dashboard
 *
 * Dataretning:
 * MariaDB/API later. Current route only repairs structure.
 *
 * Versjon:
 * CT-PATCH-STRUCTURE-FIX-V1
 */

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { CollectiumPageTemplate } from "@/components/templates/CollectiumPageTemplate";

export default function AdminPage(): JSX.Element {
  return (
    <CollectiumPageTemplate
      title="Admin"
      eyebrow="Kontrollsenter"
      description="Administrer brukere, sider, brytere, API-ruter, datakvalitet og systemstatus."
      variant="admin"
    >
      <AdminDashboard />
    </CollectiumPageTemplate>
  );
}
