/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Admin Dashboard Content
 *
 * Definering / formål:
 * Admin dashboard content rendered inside CollectiumPageTemplate.
 *
 * Bruksområde:
 * app/admin/page.tsx
 *
 * Berørte sider / routes:
 * - /admin
 *
 * Berørte DB-brytere / feature_keys:
 * - admin.dashboard.view
 * - admin.system.status.view
 *
 * Berørte API-ruter:
 * - Future: GET /api/admin/system/dashboard
 *
 * Berørte tabeller / views:
 * - Future: ct_app_pages
 * - Future: ct_app_features
 * - Future: ct_feature_action_routes
 *
 * Dataretning:
 * MariaDB/API later. Current component is safe template/status placeholder.
 *
 * Versjon:
 * CT-PATCH-STRUCTURE-FIX-V1
 */

export type AdminStatusItem = {
  readonly name: string;
  readonly status: "OK" | "VARSEL" | "FEIL" | "IKKE TESTET";
  readonly note: string;
};

const statusItems: readonly AdminStatusItem[] = [
  { name: "Global AppShell", status: "OK", note: "Topbar, sidebar og PageFrame styres globalt." },
  { name: "Admin side", status: "OK", note: "Renderes inne i CollectiumPageTemplate." },
  { name: "DB 8.4-kjede", status: "IKKE TESTET", note: "Kobles mot admin systemdashboard senere." },
  { name: "API-ruter", status: "IKKE TESTET", note: "Kontrolleres i egen enhetstestside." },
];

export function AdminDashboard(): JSX.Element {
  return (
    <div className="ct-panel-grid">
      <section className="ct-panel ct-span-8">
        <h2>Systemstatus</h2>
        <div className="ct-admin-status" aria-label="Admin systemstatus">
          {statusItems.map((item: AdminStatusItem) => (
            <div className="ct-status-row" key={item.name}>
              <strong>{item.name}</strong>
              <span className="ct-status-pill">{item.status}</span>
              <span>{item.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ct-card ct-span-4">
        <h2>Kontroll</h2>
        <p>
          Admin skal være kontrollsenter for sider, brukere, medlemskap, features, API-ruter,
          datakvalitet, forhandlere, auksjon og logging.
        </p>
      </section>

      <section className="ct-card ct-span-4">
        <h3>Brukere</h3>
        <p>Vis og administrer brukere, roller, medlemskap, sesjoner og aktivitet.</p>
      </section>

      <section className="ct-card ct-span-4">
        <h3>Sider / brytere / API</h3>
        <p>Kontroller page_key, feature_key, tilgang, action-routes og read/write-koblinger.</p>
      </section>

      <section className="ct-card ct-span-4">
        <h3>Datakvalitet</h3>
        <p>Finn manglende views, relasjoner, verdier, bilder, katalogfelt og importsaker.</p>
      </section>
    </div>
  );
}
