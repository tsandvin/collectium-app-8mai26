import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Collectium Min side',
  description: 'Rollebasert Min side for Collectium'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
