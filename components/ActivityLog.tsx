import { activityFilters, activityLog } from '@/lib/minside-data';
import { StatusChip } from '@/components/MinsideShell';

export function ActivityLog() {
  return (
    <section className="ct-activity-layout">
      <aside className="ct-filter-panel ct-signature-box">
        <h3>Filter</h3>
        {activityFilters.map((group) => (
          <div className="ct-filter-group" key={group.title}>
            <strong>{group.title}</strong>
            <div className="ct-filter-values">
              {group.values.map((value) => <button key={value} type="button">{value}</button>)}
            </div>
          </div>
        ))}
      </aside>
      <div className="ct-log-results">
        <div className="ct-subtabs">
          {['Alle', 'Varsler', 'Transaksjoner', 'Prosesser', 'Meldinger', 'Dokumenter', 'System', 'Arkivert'].map((tab, index) => (
            <button className={index === 0 ? 'active' : ''} type="button" key={tab}>{tab}</button>
          ))}
        </div>
        {activityLog.map((item) => (
          <details className={`ct-log-row ${item.tone}`} key={item.title}>
            <summary>
              <span className="ct-log-icon">{item.icon}</span>
              <span className="ct-log-main">
                <strong>{item.title}</strong>
                <em>{item.type}</em>
              </span>
              <span className="ct-log-field">{item.status}</span>
              <span className="ct-log-field">{item.objectType}</span>
              <span className="ct-log-field">{item.country}</span>
              <span className="ct-log-field">{item.relation}</span>
            </summary>
            <div className="ct-log-detail">
              <div>
                <p className="ct-kicker">Objekt</p>
                <h4>{item.object}</h4>
                <p>{item.detail}</p>
              </div>
              <div className="ct-detail-grid">
                <span><strong>Dato/frist</strong>{item.date}</span>
                <span><strong>Status</strong>{item.status}</span>
                <span><strong>Type</strong>{item.type}</span>
                <span><strong>Plassering</strong>{item.relation}</span>
              </div>
              <div className="ct-actions">
                {item.actions.map((action) => <a href="#" key={action}>{action}</a>)}
              </div>
            </div>
          </details>
        ))}
        <div className="ct-chip-row">
          <StatusChip tone="info">Filter over 700px: venstre</StatusChip>
          <StatusChip tone="info">Mobil under 700px: filter over resultat</StatusChip>
        </div>
      </div>
    </section>
  );
}
