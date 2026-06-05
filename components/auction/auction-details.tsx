import { Coins, Calendar, User, MapPin } from 'lucide-react'
import type { Auction, CatalogItem, User as UserType } from '@/lib/db/schema'
import Link from 'next/link'

interface AuctionDetailsProps {
  auction: Auction & {
    catalogItem: CatalogItem | null
    seller: UserType | null
  }
}

export function AuctionDetails({ auction }: AuctionDetailsProps) {
  const item = auction.catalogItem

  return (
    <div className="space-y-6">
      {/* Image */}
      <div className="aspect-video rounded-xl bg-card border border-border flex items-center justify-center">
        {item?.images && item.images.length > 0 ? (
          <img
            src={item.images[0]}
            alt={auction.title}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <Coins className="h-24 w-24 text-muted-foreground" />
        )}
      </div>

      {/* Title & Description */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">{auction.title}</h1>
        {auction.description && (
          <p className="text-muted-foreground">{auction.description}</p>
        )}
      </div>

      {/* Seller Info */}
      {auction.seller && (
        <div className="p-4 rounded-xl bg-card border border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Selger</h3>
          <Link 
            href={`/medlem/${auction.seller.id}`}
            className="flex items-center gap-3 hover:text-primary transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{auction.seller.name}</p>
              <p className="text-sm text-muted-foreground">Medlem</p>
            </div>
          </Link>
        </div>
      )}

      {/* Item Details */}
      {item && (
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">Objektdetaljer</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {item.type && (
              <div>
                <p className="text-muted-foreground">Type</p>
                <p className="text-foreground capitalize">{item.type}</p>
              </div>
            )}
            {item.country && (
              <div>
                <p className="text-muted-foreground">Land</p>
                <p className="text-foreground">{item.country}</p>
              </div>
            )}
            {item.year && (
              <div>
                <p className="text-muted-foreground">År</p>
                <p className="text-foreground">{item.year}</p>
              </div>
            )}
            {item.denomination && (
              <div>
                <p className="text-muted-foreground">Valør</p>
                <p className="text-foreground">{item.denomination}</p>
              </div>
            )}
            {item.metal && (
              <div>
                <p className="text-muted-foreground">Metall</p>
                <p className="text-foreground">{item.metal}</p>
              </div>
            )}
            {item.grade && (
              <div>
                <p className="text-muted-foreground">Kvalitet</p>
                <p className="text-foreground">{item.grade}</p>
              </div>
            )}
            {item.weight && (
              <div>
                <p className="text-muted-foreground">Vekt</p>
                <p className="text-foreground">{item.weight}g</p>
              </div>
            )}
            {item.diameter && (
              <div>
                <p className="text-muted-foreground">Diameter</p>
                <p className="text-foreground">{item.diameter}mm</p>
              </div>
            )}
            {item.catalogNumber && (
              <div>
                <p className="text-muted-foreground">Katalognummer</p>
                <p className="text-foreground">{item.catalogNumber}</p>
              </div>
            )}
            {item.mintage && (
              <div>
                <p className="text-muted-foreground">Opplag</p>
                <p className="text-foreground">{item.mintage.toLocaleString('nb-NO')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Auction Timeline */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Start:</span>
            <span className="text-foreground">
              {auction.startTime.toLocaleDateString('nb-NO', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Slutt:</span>
            <span className="text-foreground">
              {auction.endTime.toLocaleDateString('nb-NO', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
