import { DataTable, MinsideShell, Panel, StatusChip } from '@/components/MinsideShell';
import { dealerRows, getRoleFromSearchParams, type SearchParamsInput } from '@/lib/minside-data';

export default async function ForhandlerPage({ searchParams }: { searchParams?: SearchParamsInput }) {
  const role = await getRoleFromSearchParams(searchParams);
  return (
    <MinsideShell role={role} activeRole="forhandler" activeSection="oversikt" title="Forhandler minside" intro="Forhandlerflate for innleveringer, objektgrupper, auksjon, nettbutikk, dokumentasjon, oppgjør og milepæler." pageHref="/minside/forhandler">
      <section className="ct-grid three">
        <Panel title="Innleveringer"><div className="ct-metric"><strong>12</strong><span>aktive</span></div><StatusChip tone="warn">2 mangler dokumentasjon</StatusChip></Panel>
        <Panel title="Auksjon"><div className="ct-metric"><strong>6</strong><span>aktive</span></div><StatusChip tone="good">3 klare</StatusChip></Panel>
        <Panel title="Nettbutikk"><div className="ct-metric"><strong>9</strong><span>aktive</span></div><StatusChip tone="warn">1 prisavvik</StatusChip></Panel>
      </section>
      <section style={{ marginTop: 16 }}><Panel title="Forhandlerstatus og godkjenninger"><DataTable rows={dealerRows} /></Panel></section>
      <section className="ct-grid four" style={{ marginTop: 16 }}>
        {['Forhandlerprofil', 'Avtale signert', 'Objektgrupper valgt', 'Dokumentasjon', 'Auksjonskonto', 'Nettbutikk', 'Fee/oppsett', 'Klar for publisering'].map((step, index) => <Panel key={step} title={`${index + 1}. ${step}`}><StatusChip tone={index < 3 ? 'good' : index < 6 ? 'warn' : 'info'}>{index < 3 ? 'OK' : index < 6 ? 'Venter' : 'Neste'}</StatusChip></Panel>)}
      </section>
    </MinsideShell>
  );
}
