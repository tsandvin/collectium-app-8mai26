'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { placeBid } from '@/app/actions/collectium'
import { Clock, Gavel, TrendingUp, Loader2 } from 'lucide-react'
import type { Auction, Bid, User } from '@/lib/db/schema'
import Link from 'next/link'

interface BidSectionProps {
  auction: Auction & {
    bids: Bid[]
    seller: User | null
  }
  isLoggedIn: boolean
  currentUserId?: string
}

function formatPrice(price: string | null) {
  if (!price) return 'kr 0'
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
  }).format(parseFloat(price))
}

function formatTimeLeft(endTime: Date) {
  const now = new Date()
  const diff = endTime.getTime() - now.getTime()
  
  if (diff <= 0) return 'Avsluttet'
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (days > 0) return `${days}d ${hours}t ${minutes}m`
  if (hours > 0) return `${hours}t ${minutes}m`
  return `${minutes} minutter`
}

export function BidSection({ auction, isLoggedIn, currentUserId }: BidSectionProps) {
  const router = useRouter()
  const [bidAmount, setBidAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentBid = auction.currentBid 
    ? parseFloat(auction.currentBid) 
    : parseFloat(auction.startingPrice)
  const minimumBid = currentBid + (currentBid * 0.05) // 5% minimum increment
  const isEnded = new Date() > auction.endTime
  const isOwner = currentUserId === auction.userId

  const handleBid = async () => {
    if (!bidAmount) return
    setLoading(true)
    setError(null)

    try {
      await placeBid(auction.id, bidAmount)
      setBidAmount('')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunne ikke legge inn bud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sticky top-24 space-y-6">
      {/* Current Bid Card */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Navaerende bud</span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {formatTimeLeft(auction.endTime)}
          </div>
        </div>
        
        <p className="text-4xl font-bold text-primary mb-2">
          {formatPrice(auction.currentBid ?? auction.startingPrice)}
        </p>
        
        <p className="text-sm text-muted-foreground mb-6">
          {auction.bids.length} bud
        </p>

        {isEnded ? (
          <div className="p-4 rounded-lg bg-muted text-center">
            <p className="font-semibold text-foreground">Auksjonen er avsluttet</p>
            {auction.winnerId && (
              <p className="text-sm text-muted-foreground mt-1">
                Solgt for {formatPrice(auction.currentBid)}
              </p>
            )}
          </div>
        ) : isOwner ? (
          <div className="p-4 rounded-lg bg-muted text-center">
            <p className="text-muted-foreground">Du eier denne auksjonen</p>
          </div>
        ) : !isLoggedIn ? (
          <div className="space-y-3">
            <Link href="/sign-in">
              <Button className="w-full bg-primary text-primary-foreground">
                Logg inn for a by
              </Button>
            </Link>
            <p className="text-xs text-center text-muted-foreground">
              Eller <Link href="/sign-up" className="text-primary hover:underline">opprett en konto</Link>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">
                Ditt bud (minimum {formatPrice(minimumBid.toString())})
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder={minimumBid.toFixed(0)}
                  min={minimumBid}
                  step="1"
                  className="bg-background"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button 
              onClick={handleBid}
              disabled={loading || !bidAmount || parseFloat(bidAmount) < minimumBid}
              className="w-full bg-primary text-primary-foreground gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Legger inn bud...
                </>
              ) : (
                <>
                  <Gavel className="h-4 w-4" />
                  Legg inn bud
                </>
              )}
            </Button>
          </div>
        )}

        {/* Buy Now */}
        {auction.buyNowPrice && !isEnded && !isOwner && isLoggedIn && (
          <div className="mt-4 pt-4 border-t border-border">
            <Button variant="outline" className="w-full gap-2">
              <TrendingUp className="h-4 w-4" />
              Kjop na for {formatPrice(auction.buyNowPrice)}
            </Button>
          </div>
        )}
      </div>

      {/* Bid History */}
      {auction.bids.length > 0 && (
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">Budhistorikk</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {auction.bids.slice(0, 10).map((bid, index) => (
              <div 
                key={bid.id}
                className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-2">
                  {index === 0 && (
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs">
                      Hoyeste
                    </span>
                  )}
                  <span className="text-muted-foreground">
                    Byder #{auction.bids.length - index}
                  </span>
                </div>
                <span className="font-medium text-foreground">
                  {formatPrice(bid.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
