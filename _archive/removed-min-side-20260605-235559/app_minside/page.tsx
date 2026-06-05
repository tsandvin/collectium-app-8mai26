import { MinsideShell, Panel, StatusChip } from '@/components/MinsideShell';
import { getRoleFromSearchParams, overviewCards, roleQuery, type SearchParamsInput } from '@/lib/minside-data';

export default async function MinsideOverview({ searchParams }: { searchParams?: SearchParamsInput }) {
  const role = await getRoleFromSearchParams(searchParams);
  const q = roleQuery(role);
  return (
    <MinsideShell role={role} activeRole="bruker" activeSection="oversikt" title="Oversikt" intro="Ren inngangsside for brukerstatus. Hver seksjon kan åpnes som egen sidevisning." isOverview>
      <section className="ct-grid three">
        {overviewCards.map((card) => (
          <Panel key={card.title} title={card.title} text={card.text} href={`${card.href}${q}`}>
            <div className="ct-metric"><strong>{card.status}</strong><span>{card.meta}</span></div>
            <div className="ct-actions"><span className="ct-action">Åpne side</span></div>
          </Panel>
        ))}
      </section>
      {role !== 'user' ? (
        <section className="ct-grid two" style={{ marginTop: 16 }}>
          <Panel title="Forhandler" text="Innleveringer, objektgrupper, auksjon, nettbutikk, dokumentasjon og oppgjør." href={`/minside/forhandler${q}`}>
            <div className="ct-chip-row"><StatusChip tone="good">Aktiv rolle</StatusChip><StatusChip tone="warn">2 krever handling</StatusChip></div>
          </Panel>
          {role === 'admin' ? <Panel title="Admin" text="Kontroll, brukere, import, tilgang, sider og systemstatus." href={`/minside/admin${q}`}><div className="ct-chip-row"><StatusChip tone="good">Admin aktiv</StatusChip><StatusChip tone="warn">4 kontrollpunkter</StatusChip></div></Panel> : null}
        </section>
      ) : null}
    </MinsideShell>
  );
}
