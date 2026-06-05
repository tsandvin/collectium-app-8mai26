import { collectionFilters, collectionObjects } from '@/lib/minside-data';
import { StatusChip } from '@/components/MinsideShell';

export function CollectionCatalog() {
  return (
    <section className="ct-collection-layout">
      <aside className="ct-filter-panel ct-signature-box">
        <h3>Samlingfilter</h3>
        {collectionFilters.map((group) => (
          <div className="ct-filter-group" key={group.title}>
            <strong>{group.title}</strong>
            <div className="ct-filter-values">
              {group.values.map((value) => <button type="button" key={value}>{value}</button>)}
            </div>
          </div>
        ))}
      </aside>
      <div className="ct-catalog-results">
        <div className="ct-subtabs">
          {['Samler', 'Historie', 'Finans'].map((tab, index) => <button className={index === 0 ? 'active' : ''} type="button" key={tab}>{tab}</button>)}
        </div>
        <div className="ct-view-switches">
          {['Horisontal', 'Stående', 'Liste', 'Kort', 'Tabell', 'Museum'].map((view, index) => <button className={index === 0 ? 'active' : ''} type="button" key={view}>{view}</button>)}
        </div>
        {collectionObjects.map((object) => (
          <article className="ct-object-row ct-signature-box" key={object.title}>
            <div className="ct-object-image">C</div>
            <div>
              <h3>{object.title}</h3>
              <p>{object.meta}</p>
              <p className="ct-muted">{object.relation}</p>
            </div>
            <div className="ct-object-status"><StatusChip tone="good">{object.status}</StatusChip></div>
            <div className="ct-object-value"><strong>{object.value}</strong><span>{object.trend}</span></div>
            <div className="ct-actions compact"><a href="#">Åpne objekt</a><a href="#">Detaljer</a></div>
          </article>
        ))}
      </div>
    </section>
  );
}
