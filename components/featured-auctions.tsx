import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Gavel, Clock, ArrowRight } from 'lucide-react'
import type { Auction } from '@/lib/db/schema'

interface FeaturedAuctionsProps {
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

export function FeaturedAuctions({ auctions }: FeaturedAuctionsProps) {
  if (auctions.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="p-4 rounded-full bg-muted w-fit mx-auto mb-4">
              <Gavel className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Ingen aktive auksjoner</h2>
            <p className="text-muted-foreground mb-6">
              Bli den forste til a opprette en auksjon!
            </p>
            <Link href="/sign-up">
              <Button className="bg-primary text-primary-foreground">
                Registrer deg for a selge
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Aktive auksjoner</h2>
            <p className="text-muted-foreground">Finn ditt neste samlerobj</p>
          </div>
          <Link href="/auksjoner">
            <Button variant="outline" className="gap-2">
              Se alle
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <Link
              key={auction.id}
              href={`/auksjoner/${auction.id}`}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="aspect-square rounded-lg bg-muted mb-4 flex items-center justify-center">
                <Gavel className="h-12 w-12 text-muted-foreground" />
              </div>
              
              <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                {auction.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Navaerende bud</p>
                  <p className="font-semibold text-primary">
                    {formatPrice(auction.currentBid ?? auction.startingPrice)}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatTimeLeft(auction.endTime)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
