/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Min side shell-komponent
 *
 * Definering / formål:
 * Felles sidetopp, hovedfaner, rollefaner og sidehandling for Min side.
 * Komponenten er frontend-preview og skal senere kobles til session/access.
 *
 * Bruksområde:
 * Wrapper for alle /minside-ruter.
 *
 * Berørte DB-brytere / feature_keys:
 * - next.minside.*
 * - membership.access.view
 * - settings.features.view
 */
import Link from 'next/link';
import { allowedRoleAreas, roleNav, roleQuery, sectionNav, type Role, type RoleArea, type SectionKey } from '@/lib/minside-data';

export function MinsideShell({
  children,
  role,
  activeSection,
  activeRole,
  title,
  intro,
  pageHref,
  isOverview = false
}: {
  children: React.ReactNode;
  role: Role;
  activeSection: SectionKey;
  activeRole?: RoleArea;
  title: string;
  intro: string;
  pageHref?: string;
  isOverview?: boolean;
}) {
  const q = roleQuery(role);
  const roles = allowedRoleAreas(role);
  const currentHref = pageHref ?? sectionNav.find((item) => item.key === activeSection)?.href ?? '/minside';
  const actionLabel = isOverview ? 'Åpne side' : 'Lukk til Min side';
  const actionHref = isOverview ? `${currentHref}${q}` : `/minside${q}`;

  return (
    <main className="ct-app-shell">
      <header className="ct-hero ct-signature-box">
        <div>
          <p className="ct-kicker">Collectium / Min side</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        <div className="ct-user-card">
          <span className="ct-avatar">TS</span>
          <div>
            <strong>tsandvin</strong>
            <span>Kundenr. CT-NO-1042 · Silver</span>
          </div>
        </div>
      </header>

      <nav className="ct-tabbar" aria-label="Min side navigasjon">
        <div className="ct-main-tabs">
          {sectionNav.map((item) => (
            <Link key={item.key} href={`${item.href}${q}`} className={item.key === activeSection ? 'active' : ''}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="ct-role-tabs" aria-label="Rollevisning">
          {roleNav
            .filter((item) => roles.includes(item.key))
            .map((item) => (
              <Link key={item.key} href={`${item.href}${q}`} className={item.key === activeRole ? 'active' : ''}>
                {item.label}
              </Link>
            ))}
        </div>
      </nav>

      <section className="ct-page-title-row">
        <div>
          <p className="ct-kicker">Sidevisning</p>
          <h2>{title}</h2>
        </div>
        <Link href={actionHref} className="ct-open-switch">{actionLabel}</Link>
      </section>

      {children}
    </main>
  );
}

export function Panel({ title, text, children, href }: { title: string; text?: string; children?: React.ReactNode; href?: string }) {
  const content = (
    <article className="ct-panel ct-signature-box">
      <h3>{title}</h3>
      {text ? <p className="ct-muted">{text}</p> : null}
      {children}
    </article>
  );
  if (href) {
    return <Link href={href} className="ct-panel-link">{content}</Link>;
  }
  return content;
}

export function StatusChip({ tone = 'neutral', children }: { tone?: 'good' | 'warn' | 'danger' | 'neutral' | 'info'; children: React.ReactNode }) {
  return <span className={`ct-chip ${tone}`}>{children}</span>;
}

export function DataTable({ rows, headers = ['Felt', 'Status', 'Detalj'] }: { rows: string[][]; headers?: string[] }) {
  return (
    <div className="ct-table-wrap">
      <table className="ct-table">
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('-')}>
              {row.map((cell) => <td key={cell}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
