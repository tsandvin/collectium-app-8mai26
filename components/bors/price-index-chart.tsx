'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { PriceIndex } from '@/lib/db/schema'

interface PriceIndexChartProps {
  data: PriceIndex[]
}

export function PriceIndexChart({ data }: PriceIndexChartProps) {
  // Group data by category
  const categories = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, PriceIndex[]>)

  if (data.length === 0) {
    return (
      <div className="p-8 rounded-xl bg-card border border-border">
        <div className="text-center py-12">
          <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Ingen prisdata tilgjengelig
          </h3>
          <p className="text-muted-foreground">
            Prisindeksen vil bygges opp etterhvert som auksjoner fullføres.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 rounded-xl bg-card border border-border">
      <h2 className="text-xl font-semibold text-foreground mb-6">Prisutvikling</h2>
      
      <div className="space-y-6">
        {Object.entries(categories).map(([category, items]) => {
          const latestItem = items[0]
          const trend = latestItem?.trend
          
          return (
            <div key={category} className="p-4 rounded-lg bg-background border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground capitalize">{category}</h3>
                <div className="flex items-center gap-2">
                  {trend === 'up' && (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  )}
                  {trend === 'down' && (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  {trend === 'stable' && (
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
              
              {/* Simple bar chart representation */}
              <div className="h-24 flex items-end gap-1">
                {items.slice(0, 12).reverse().map((item, index) => {
                  const maxPrice = Math.max(...items.map(i => parseFloat(i.avgPrice)))
                  const height = (parseFloat(item.avgPrice) / maxPrice) * 100
                  
                  return (
                    <div
                      key={item.id}
                      className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t"
                      style={{ height: `${height}%` }}
                      title={`${new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' }).format(parseFloat(item.avgPrice))}`}
                    />
                  )
                })}
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Gjennomsnitt</p>
                  <p className="font-semibold text-foreground">
                    {new Intl.NumberFormat('nb-NO', {
                      style: 'currency',
                      currency: 'NOK',
                    }).format(parseFloat(latestItem?.avgPrice ?? '0'))}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Antall salg</p>
                  <p className="font-semibold text-foreground">{latestItem?.sampleSize ?? 0}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
