import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import AppShell from '@/app/components/AppShell'
import { CatalogGrid } from '@/components/catalog/catalog-grid'
import { CatalogFilters } from '@/components/catalog/catalog-filters'
import { getCatalogItems } from '@/app/actions/collectium'
import Link from 'next/link'

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; country?: string; search?: string }>
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  const params = await searchParams
  const items = await getCatalogItems({
    type: params.type,
    country: params.country,
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
              Samlekatalog
            </h1>
            <p style={{ color: "var(--ct-text-muted)", fontFamily: "var(--ct-font-ui)", fontSize: "0.93em" }}>
              Utforsk {items.length} numismatiske objekter
            </p>
          </div>
          
          {session?.user && (
            <Link href="/katalog/ny" className="ct-btn">
              <i className="ti ti-plus" /> Legg til objekt
            </Link>
          )}
        </div>
      </header>

      <div style={{ display: 'flex', gap: 32 }}>
        <aside style={{ width: 240, flexShrink: 0 }}>
          <CatalogFilters />
        </aside>
        
        <div style={{ flex: 1 }}>
          <CatalogGrid items={items} />
        </div>
      </div>
    </AppShell>
  )
}
