import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { PriceIndexChart } from '@/components/bors/price-index-chart'
import { MarketOverview } from '@/components/bors/market-overview'
import { getPriceIndexData } from '@/app/actions/collectium'

export default async function BorsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  const priceData = await getPriceIndexData()

  return (
    <><header style={{ marginBottom: 32 }}>
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
          Prisindeks
        </h1>
        <p style={{ color: "var(--ct-text-muted)", fontFamily: "var(--ct-font-ui)", fontSize: "0.93em" }}>
          Folg markedstrender og verdiutvikling
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div>
          <PriceIndexChart data={priceData} />
        </div>
        
        <div>
          <MarketOverview data={priceData} />
        </div>
      </div></>
  )
}

