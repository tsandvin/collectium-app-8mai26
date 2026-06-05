import { ActivityLog } from '@/components/ActivityLog';
import { MinsideShell, Panel, StatusChip } from '@/components/MinsideShell';
import { getRoleFromSearchParams, type SearchParamsInput } from '@/lib/minside-data';

export default async function AktivitetPage({ searchParams }: { searchParams?: SearchParamsInput }) {
  const role = await getRoleFromSearchParams(searchParams);
  return (
    <MinsideShell role={role} activeRole="bruker" activeSection="aktivitet" title="Aktivitet" intro="Full arkivside for varsler, transaksjoner, prosesser, meldinger, dokumenter og systemhendelser." pageHref="/minside/aktivitet">
      <section className="ct-grid four" style={{ marginBottom: 16 }}>
        <Panel title="Varsler"><div className="ct-metric"><strong>3</strong><span>uleste</span></div><StatusChip tone="warn">1 krever handling</StatusChip></Panel>
        <Panel title="Transaksjoner"><div className="ct-metric"><strong>24</strong><span>kjøp/salg</span></div><StatusChip tone="good">20 fullført</StatusChip></Panel>
        <Panel title="Prosesser"><div className="ct-metric"><strong>5</strong><span>aktive</span></div><StatusChip tone="warn">2 venter</StatusChip></Panel>
        <Panel title="Dokumenter"><div className="ct-metric"><strong>4</strong><span>mangler</span></div><StatusChip tone="danger">Kontroller</StatusChip></Panel>
      </section>
      <ActivityLog />
    </MinsideShell>
  );
}
