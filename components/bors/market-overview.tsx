import { TrendingUp, TrendingDown, Minus, Coins, Banknote, Medal } from 'lucide-react'
import type { PriceIndex } from '@/lib/db/schema'

interface MarketOverviewProps {
  data: PriceIndex[]
}

function formatPrice(price: string) {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    maximumFractionDigits: 0,
  }).format(parseFloat(price))
}

export function MarketOverview({ data }: MarketOverviewProps) {
  // Calculate market stats
  const coinData = data.filter(d => d.category === 'coin')
  const banknoteData = data.filter(d => d.category === 'banknote')
  const medalData = data.filter(d => d.category === 'medal')

  const getLatest = (items: PriceIndex[]) => items[0] ?? null
  const getTrend = (items: PriceIndex[]) => {
    if (items.length < 2) return 'stable'
    const latest = parseFloat(items[0]?.avgPrice ?? '0')
    const previous = parseFloat(items[1]?.avgPrice ?? '0')
    if (latest > previous) return 'up'
    if (latest < previous) return 'down'
    return 'stable'
  }

  const marketStats = [
    {
      label: 'Mynter',
      icon: Coins,
      data: getLatest(coinData),
      trend: getTrend(coinData),
    },
    {
      label: 'Sedler',
      icon: Banknote,
      data: getLatest(banknoteData),
      trend: getTrend(banknoteData),
    },
    {
      label: 'Medaljer',
      icon: Medal,
      data: getLatest(medalData),
      trend: getTrend(medalData),
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Markedsoversikt</h2>
      
      {marketStats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="p-4 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium text-foreground">{stat.label}</span>
            </div>
            
            {stat.data ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Snittpris</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {formatPrice(stat.data.avgPrice)}
                    </span>
                    {stat.trend === 'up' && (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    )}
                    {stat.trend === 'down' && (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    {stat.trend === 'stable' && (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Min / Max</span>
                  <span className="text-foreground">
                    {formatPrice(stat.data.minPrice ?? '0')} - {formatPrice(stat.data.maxPrice ?? '0')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Salg siste periode</span>
                  <span className="text-foreground">{stat.data.sampleSize}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Ingen data tilgjengelig</p>
            )}
          </div>
        )
      })}

      {/* Tips */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <h3 className="font-medium text-foreground mb-2">Tips</h3>
        <p className="text-sm text-muted-foreground">
          Prisindeksen oppdateres automatisk basert på gjennomforte auksjoner. 
          Jo flere salg, jo mer noyaktige estimater.
        </p>
      </div>
    </div>
  )
}
