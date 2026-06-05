import { CollectionCatalog } from '@/components/CollectionCatalog';
import { MinsideShell, Panel, StatusChip } from '@/components/MinsideShell';
import { getRoleFromSearchParams, type SearchParamsInput } from '@/lib/minside-data';

export default async function SamlingPage({ searchParams }: { searchParams?: SearchParamsInput }) {
  const role = await getRoleFromSearchParams(searchParams);
  return (
    <MinsideShell role={role} activeRole="bruker" activeSection="samling" title="Samling" intro="Hele samlingen som katalogvisning med filter, visningsvalg, marked, brukerstatus og relasjoner." pageHref="/minside/samling">
      <section className="ct-grid four" style={{ marginBottom: 16 }}>
        <Panel title="Objekter"><div className="ct-metric"><strong>142</strong><span>i samling</span></div><StatusChip tone="good">Aktiv</StatusChip></Panel>
        <Panel title="Ønskeliste"><div className="ct-metric"><strong>22</strong><span>hjerte</span></div><StatusChip tone="info">Samler</StatusChip></Panel>
        <Panel title="Favoritter"><div className="ct-metric"><strong>14</strong><span>stjerne</span></div><StatusChip tone="info">Prioritert</StatusChip></Panel>
        <Panel title="Mangler data"><div className="ct-metric"><strong>37</strong><span>mangler verdi</span></div><StatusChip tone="warn">Reparer</StatusChip></Panel>
      </section>
      <CollectionCatalog />
    </MinsideShell>
  );
}
