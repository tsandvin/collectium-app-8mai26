import { DataTable, MinsideShell, Panel, StatusChip } from '@/components/MinsideShell';
import { financeRelations, getRoleFromSearchParams, type SearchParamsInput } from '@/lib/minside-data';

export default async function FinansPage({ searchParams }: { searchParams?: SearchParamsInput }) {
  const role = await getRoleFromSearchParams(searchParams);
  return (
    <MinsideShell role={role} activeRole="bruker" activeSection="finans" title="Index / Finans" intro="Relasjon mellom samleobjekter, index-tall, verdi, trend, marked, auksjon og nettbutikk." pageHref="/minside/finans">
      <section className="ct-grid three">
        <Panel title="Estimert verdi"><div className="ct-metric"><strong>186 000</strong><span>NOK</span></div><StatusChip tone="good">+11 % siste 12 mnd</StatusChip></Panel>
        <Panel title="Kjøpt for"><div className="ct-metric"><strong>121 000</strong><span>NOK</span></div><StatusChip tone="info">24 transaksjoner</StatusChip></Panel>
        <Panel title="Mangler verdi"><div className="ct-metric"><strong>37</strong><span>objekter</span></div><StatusChip tone="warn">Krever datagrunnlag</StatusChip></Panel>
      </section>
      <section style={{ marginTop: 16 }}><Panel title="Samlingsobjekter mot index"><DataTable headers={['Relasjon', 'Antall', 'Verdi', 'Trend', 'Avvik']} rows={financeRelations} /></Panel></section>
    </MinsideShell>
  );
}
