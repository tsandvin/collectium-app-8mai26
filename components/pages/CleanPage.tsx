export type CleanPageProps = {
  kicker: string;
  title: string;
  lead: string;
};

export function CleanPage({ kicker, title, lead }: CleanPageProps): JSX.Element {
  return (
    <section className="collectium-page">
      <div className="collectium-hero">
        <p className="collectium-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="collectium-lead">{lead}</p>
      </div>

      <div className="collectium-grid">
        <article className="collectium-card">
          <h2>Ren kjerne</h2>
          <p>Dette er en ny minimal Next.js-kjerne uten gamle template- eller V42/V6-filer.</p>
        </article>

        <article className="collectium-card">
          <h2>Klar for DB/API</h2>
          <p>DB-filer, dokumentasjon og bilder er beholdt. Funksjoner kan bygges på nytt kontrollert.</p>
        </article>

        <article className="collectium-card">
          <h2>Stabilt skall</h2>
          <p>Topbar, sidemeny og hovedflate ligger i én ren shell-komponent.</p>
        </article>
      </div>
    </section>
  );
}
