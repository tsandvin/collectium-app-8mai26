import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import AppShell from '@/app/components/AppShell'
import { AuctionGrid } from '@/components/auction/auction-grid'
import { getActiveAuctions } from '@/app/actions/collectium'
import Link from 'next/link'

export default async function AuksjonerPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  const params = await searchParams
  const auctions = await getActiveAuctions({
    search: params.search,
  })

  return (
    <AppShell>
      <header style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h1
              style={{
                fontFamily: "var(--ct-font-display)",
                fontSize: "2em",
                letterSpacing: "-0.02em",
                color: "var(--ct-text)",
                lineHeight: 1.1,
                marginBottom: 4,
              }}
            >
              Auksjoner
            </h1>
            <p style={{ color: "var(--ct-text-muted)", fontFamily: "var(--ct-font-ui)", fontSize: "0.93em" }}>
              {auctions.length} aktive auksjoner
            </p>
          </div>
          
          {session?.user && (
            <Link href="/auksjoner/ny" className="ct-btn ct-btn--gold">
              <i className="ti ti-gavel" /> Opprett auksjon
            </Link>
          )}
        </div>
      </header>

      <AuctionGrid auctions={auctions} />
    </AppShell>
  )
}
