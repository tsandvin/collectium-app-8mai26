import Link from "next/link";

export type CleanPageProps = {
  kicker: string;
  title: string;
  lead: string;
  cards?: ReadonlyArray<{
    title: string;
    text: string;
  }>;
};

export function CleanPage({ kicker, title, lead, cards = [] }: CleanPageProps): JSX.Element {
  return (
    <section className="ct-page">
      <div className="ct-hero">
        <p className="ct-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="ct-lead">{lead}</p>

        <div className="ct-actions">
          <Link href="/katalog">Katalog</Link>
          <Link href="/min-side">Min side</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>

      {cards.length > 0 ? (
        <div className="ct-grid">
          {cards.map((card) => (
            <article key={card.title} className="ct-card">
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
