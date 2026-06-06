import type { Metadata } from "next";
import "./globals.css";
import { CollectiumAppShell } from "@/components/layout/CollectiumAppShell";

export const metadata: Metadata = {
  title: "Collectium",
  description: "Samlerplattform for katalog, samling, auksjon og marked.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="no" data-ct-skin="collectium">
      <body>
        <CollectiumAppShell>{children}</CollectiumAppShell>
      </body>
    </html>
  );
}
