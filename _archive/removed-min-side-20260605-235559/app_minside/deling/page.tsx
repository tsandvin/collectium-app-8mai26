import { DataTable, MinsideShell, Panel, StatusChip } from '@/components/MinsideShell';
import { getRoleFromSearchParams, shareRows, type SearchParamsInput } from '@/lib/minside-data';

export default async function DelingPage({ searchParams }: { searchParams?: SearchParamsInput }) {
  const role = await getRoleFromSearchParams(searchParams);
  return (
    <MinsideShell role={role} activeRole="bruker" activeSection="deling" title="Deling" intro="Sidevisning for delte objekter, objektgrupper, samlingslister, mottakere, besøk og aktive/utløpte lenker." pageHref="/minside/deling">
      <section className="ct-grid three">
        <Panel title="Aktive delinger"><div className="ct-metric"><strong>3</strong><span>aktive</span></div><StatusChip tone="good">OK</StatusChip></Panel>
        <Panel title="Besøk"><div className="ct-metric"><strong>8</strong><span>siste 7 dager</span></div><StatusChip tone="info">Privat lenke</StatusChip></Panel>
        <Panel title="Utløper snart"><div className="ct-metric"><strong>1</strong><span>innen 48 t</span></div><StatusChip tone="warn">Kontroller</StatusChip></Panel>
      </section>
      <section style={{ marginTop: 16 }}><Panel title="Delingsstatus"><DataTable headers={['Type', 'Objekt/gruppe', 'Status', 'Besøk']} rows={shareRows} /></Panel></section>
    </MinsideShell>
  );
}
