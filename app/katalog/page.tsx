export default function Page(): JSX.Element {
  return (
    <section className="ct-page">
      <div className="ct-hero">
        <p className="ct-kicker">Katalog</p>
        <h1>Katalog</h1>
        <p className="ct-lead">Renset katalogflate. DB/API-kobling bygges videre kontrollert.</p>
      </div>

      <div className="ct-section">
        <h2>Renset standardflate</h2>
        <p>Denne siden er ryddet for gamle template-, V42-, V6- og designrester. Ny funksjonalitet kan bygges kontrollert herfra.</p>
      </div>
    </section>
  );
}
