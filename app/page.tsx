import { CleanPage } from "@/components/pages/CleanPage";

export default function HomePage(): JSX.Element {
  return (
    <CleanPage
      kicker="Startside"
      title="Collectium"
      lead="Samlerplattform for katalog, samling, auksjon og marked."
      cards={[
        {
          title: "Katalog",
          text: "Utforsk Collectium-katalogen i et ryddet standardoppsett.",
        },
        {
          title: "Samling",
          text: "Bygg videre med brukerflate, samling, ønskeliste og favoritter.",
        },
        {
          title: "Marked",
          text: "Auksjon, verdi, trend og finansdata kan kobles på kontrollert.",
        },
      ]}
    />
  );
}
