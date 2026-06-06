import { DataTable, MinsideShell, Panel, StatusChip } from '@/components/MinsideShell';
import { getRoleFromSearchParams, profileRows, type SearchParamsInput } from '@/lib/minside-data';

export default async function ProfilPage({ searchParams }: { searchParams?: SearchParamsInput }) {
  const role = await getRoleFromSearchParams(searchParams);
  return (
    <MinsideShell role={role} activeRole="bruker" activeSection="profil" title="Profil og medlemskap" intro="Full sidevisning for profil, medlemskap, varighet, godkjenninger, persondata, sikkerhet og sesjoner." pageHref="/minside/profil">
      <section className="ct-grid three">
        <Panel title="Medlemskap" text="Medlemsnivå, varighet, status, fornyelse og oppgradering."><div className="ct-metric"><strong>Silver</strong><span>aktiv til 04.06.2027</span></div><div className="ct-chip-row"><StatusChip tone="good">Aktiv</StatusChip><StatusChip tone="info">12 mnd</StatusChip></div></Panel>
        <Panel title="Profilstatus" text="Persondata, e-post, telefon, land og adresse."><div className="ct-metric"><strong>86 %</strong><span>telefon gjenstår</span></div><div className="ct-chip-row"><StatusChip tone="good">E-post OK</StatusChip><StatusChip tone="warn">Telefon mangler</StatusChip></div></Panel>
        <Panel title="Sikkerhet og sesjoner" text="Sist innlogget, aktive økter og sikkerhetsstatus."><div className="ct-metric"><strong>2</strong><span>aktive sesjoner</span></div><div className="ct-chip-row"><StatusChip tone="good">Sikkerhet OK</StatusChip><StatusChip tone="info">Kontrollerbar</StatusChip></div></Panel>
      </section>
      <section style={{ marginTop: 16 }}><Panel title="Profilfelt og godkjenninger"><DataTable rows={profileRows} /></Panel></section>
    </MinsideShell>
  );
}
