import type { Metadata } from "next";
import "./globals.css";
import { CollectiumShell } from "@/components/layout/CollectiumShell";

export const metadata: Metadata = {
  title: "Collectium",
  description: "Samlerplattform for katalog, samling, auksjon og marked."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="no">
      <body>
        <CollectiumShell>{children}</CollectiumShell>
      </body>
    </html>
  );
}
