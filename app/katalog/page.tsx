import { CleanPage } from "@/components/pages/CleanPage";

export default function Page(): JSX.Element {
  return (
    <CleanPage
      kicker="Katalog"
      title="Katalog"
      lead="Renset katalogflate. DB/API-kobling bygges videre kontrollert."
      cards={[
        {
          title: "Ren standardflate",
          text: "Denne siden er ryddet for gamle template-, V42-, V6- og designrester.",
        },
        {
          title: "Klar for DB/API",
          text: "Videre funksjoner kan kobles kontrollert mot API, DB-brytere og MariaDB.",
        },
        {
          title: "Collectium-skall",
          text: "Topbar, sidemeny, hovedflate og fire skinn styres fra rent globalt skall.",
        },
      ]}
    />
  );
}
