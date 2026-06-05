import Link from 'next/link'
import { Gavel, Clock, Users } from 'lucide-react'
import type { Auction } from '@/lib/db/schema'

interface AuctionGridProps {
  auctions: Auction[]
}

function formatTimeLeft(endTime: Date) {
  const now = new Date()
  const diff = endTime.getTime() - now.getTime()
  
  if (diff <= 0) return 'Avsluttet'
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (days > 0) return `${days}d ${hours}t igjen`
  if (hours > 0) return `${hours}t ${minutes}m igjen`
  return `${minutes}m igjen`
}

function formatPrice(price: string | null) {
  if (!price) return 'Ingen bud'
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
  }).format(parseFloat(price))
}

export function AuctionGrid({ auctions }: AuctionGridProps) {
  if (auctions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="p-4 rounded-full bg-muted w-fit mx-auto mb-4">
          <Gavel className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Ingen aktive auksjoner
        </h3>
        <p className="text-muted-foreground">
          Bli den forste til a opprette en auksjon!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {auctions.map((auction) => (
        <Link
          key={auction.id}
          href={`/auksjoner/${auction.id}`}
          className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
        >
          {/* Image placeholder */}
          <div className="aspect-video rounded-lg bg-muted mb-4 flex items-center justify-center">
            <Gavel className="h-12 w-12 text-muted-foreground" />
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {auction.title}
          </h3>

          {/* Description */}
          {auction.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {auction.description}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">Navaerende bud</p>
              <p className="font-bold text-primary">
                {formatPrice(auction.currentBid ?? auction.startingPrice)}
              </p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{formatTimeLeft(auction.endTime)}</span>
              </div>
            </div>
          </div>

          {/* Buy Now Price */}
          {auction.buyNowPrice && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">Kjop na</p>
              <p className="font-semibold text-foreground">
                {formatPrice(auction.buyNowPrice)}
              </p>
            </div>
          )}
        </Link>
      ))}
    </div>
  )
}
