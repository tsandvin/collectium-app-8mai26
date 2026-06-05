import Link from 'next/link'
import { Coins, Banknote, Medal, Eye } from 'lucide-react'
import type { CatalogItem } from '@/lib/db/schema'
import { cn } from '@/lib/utils'

interface CatalogGridProps {
  items: CatalogItem[]
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'coin':
      return Coins
    case 'banknote':
      return Banknote
    case 'medal':
      return Medal
    default:
      return Coins
  }
}

function getTypeLabel(type: string) {
  switch (type) {
    case 'coin':
      return 'Mynt'
    case 'banknote':
      return 'Seddel'
    case 'medal':
      return 'Medalje'
    default:
      return type
  }
}

function formatPrice(price: string | null) {
  if (!price) return null
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
  }).format(parseFloat(price))
}

export function CatalogGrid({ items }: CatalogGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="p-4 rounded-full bg-muted w-fit mx-auto mb-4">
          <Coins className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Ingen objekter funnet
        </h3>
        <p className="text-muted-foreground">
          Prov a endre filtreringen eller legg til ditt forste objekt.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => {
        const Icon = getTypeIcon(item.type)
        return (
          <Link
            key={item.id}
            href={`/katalog/${item.id}`}
            className="group p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
          >
            {/* Image placeholder */}
            <div className="aspect-square rounded-lg bg-muted mb-4 flex items-center justify-center relative overflow-hidden">
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon className="h-16 w-16 text-muted-foreground" />
              )}
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex items-center gap-2 text-white">
                  <Eye className="h-5 w-5" />
                  <span className="font-medium">Se detaljer</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={cn(
                  'px-2 py-0.5 rounded text-xs font-medium',
                  item.type === 'coin' && 'bg-primary/10 text-primary',
                  item.type === 'banknote' && 'bg-copper/10 text-copper',
                  item.type === 'medal' && 'bg-silver/10 text-silver'
                )}>
                  {getTypeLabel(item.type)}
                </span>
                {item.year && (
                  <span className="text-xs text-muted-foreground">{item.year}</span>
                )}
              </div>
              
              <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              
              {item.country && (
                <p className="text-sm text-muted-foreground">{item.country}</p>
              )}
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                {item.grade && (
                  <span className="text-xs text-muted-foreground">
                    Kvalitet: {item.grade}
                  </span>
                )}
                {item.estimatedValue && (
                  <span className="text-sm font-semibold text-primary">
                    {formatPrice(item.estimatedValue)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
