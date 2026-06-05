import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Coins, Plus } from 'lucide-react'
import type { CatalogItem } from '@/lib/db/schema'

interface MemberCollectionProps {
  items: CatalogItem[]
  isOwnProfile: boolean
}

function formatPrice(price: string | null) {
  if (!price) return null
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
  }).format(parseFloat(price))
}

export function MemberCollection({ items, isOwnProfile }: MemberCollectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {isOwnProfile ? 'Min samling' : 'Samling'}
        </h2>
        {isOwnProfile && (
          <Link href="/katalog/ny">
            <Button className="bg-primary text-primary-foreground gap-2">
              <Plus className="h-4 w-4" />
              Legg til
            </Button>
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 rounded-xl bg-card border border-border">
          <div className="p-4 rounded-full bg-muted w-fit mx-auto mb-4">
            <Coins className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {isOwnProfile ? 'Du har ingen objekter enna' : 'Ingen objekter i samlingen'}
          </h3>
          {isOwnProfile && (
            <p className="text-muted-foreground mb-4">
              Start din digitale samling i dag!
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/katalog/${item.id}`}
              className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Coins className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.country} {item.year && `- ${item.year}`}
                </p>
                {item.estimatedValue && (
                  <p className="text-sm font-semibold text-primary mt-1">
                    {formatPrice(item.estimatedValue)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
