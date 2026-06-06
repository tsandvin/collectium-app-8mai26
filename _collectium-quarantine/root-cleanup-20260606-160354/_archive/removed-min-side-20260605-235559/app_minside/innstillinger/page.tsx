import { DataTable, MinsideShell, Panel, StatusChip } from '@/components/MinsideShell';
import { getRoleFromSearchParams, settingsRows, type SearchParamsInput } from '@/lib/minside-data';

export default async function InnstillingerPage({ searchParams }: { searchParams?: SearchParamsInput }) {
  const role = await getRoleFromSearchParams(searchParams);
  return (
    <MinsideShell role={role} activeRole="bruker" activeSection="innstillinger" title="Innstillinger" intro="Full sidevisning for varsler, personvern, sikkerhet, aktive funksjoner, tilgang og låste funksjoner." pageHref="/minside/innstillinger">
      <section className="ct-grid three">
        <Panel title="Varsler"><div className="ct-chip-row"><StatusChip tone="good">E-post på</StatusChip><StatusChip tone="warn">SMS mangler</StatusChip></div></Panel>
        <Panel title="Personvern"><div className="ct-chip-row"><StatusChip tone="good">Deling kontrollert</StatusChip><StatusChip tone="info">Private lister</StatusChip></div></Panel>
        <Panel title="Tilgang"><div className="ct-chip-row"><StatusChip tone="good">Silver aktiv</StatusChip><StatusChip tone="warn">Eksport krever Gold</StatusChip></div></Panel>
      </section>
      <section style={{ marginTop: 16 }}><Panel title="Aktive funksjoner og låste valg"><DataTable rows={settingsRows} /></Panel></section>
    </MinsideShell>
  );
}
