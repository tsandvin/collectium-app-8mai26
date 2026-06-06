import { DataTable, MinsideShell, Panel, StatusChip } from '@/components/MinsideShell';
import { adminRows, getRoleFromSearchParams, type SearchParamsInput } from '@/lib/minside-data';

export default async function AdminPage({ searchParams }: { searchParams?: SearchParamsInput }) {
  const role = await getRoleFromSearchParams(searchParams);
  return (
    <MinsideShell role={role} activeRole="admin" activeSection="oversikt" title="Admin minside" intro="Adminflate for kontroll, brukere, tilgang, import, sider, routes og systemstatus. Teknisk visning skal ligge her, ikke i vanlig brukerfrontend." pageHref="/minside/admin">
      <section className="ct-grid three">
        <Panel title="Kontrollstatus"><div className="ct-metric"><strong>OK</strong><span>med varsler</span></div><StatusChip tone="warn">4 punkter</StatusChip></Panel>
        <Panel title="Import"><div className="ct-metric"><strong>2</strong><span>venter</span></div><StatusChip tone="info">AI-mapping</StatusChip></Panel>
        <Panel title="Brukere"><div className="ct-metric"><strong>3</strong><span>til kontroll</span></div><StatusChip tone="warn">Roller</StatusChip></Panel>
      </section>
      <section style={{ marginTop: 16 }}><Panel title="Adminområder"><DataTable rows={adminRows} /></Panel></section>
      <section className="ct-grid two" style={{ marginTop: 16 }}>
        <Panel title="Normal / teknisk visning" text="Normal visning skjuler interne navn. Teknisk visning kan vise page_key, feature_key, routes og logg bare for admin."><div className="ct-chip-row"><StatusChip tone="good">Normal</StatusChip><StatusChip tone="info">Teknisk admin</StatusChip></div></Panel>
        <Panel title="Publiseringssikkerhet" text="Komponenter med manglende route eller feil skal ikke publiseres før kontroll er grønn."><div className="ct-chip-row"><StatusChip tone="warn">Blokker ved feil</StatusChip><StatusChip tone="good">Visnings-only OK</StatusChip></div></Panel>
      </section>
    </MinsideShell>
  );
}
