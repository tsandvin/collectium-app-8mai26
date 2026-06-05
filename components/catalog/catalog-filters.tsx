'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Search, Coins, Banknote, Medal } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const itemTypes = [
  { value: '', label: 'Alle typer', icon: null },
  { value: 'coin', label: 'Mynter', icon: Coins },
  { value: 'banknote', label: 'Sedler', icon: Banknote },
  { value: 'medal', label: 'Medaljer', icon: Medal },
]

const countries = [
  { value: '', label: 'Alle land' },
  { value: 'Norge', label: 'Norge' },
  { value: 'Sverige', label: 'Sverige' },
  { value: 'Danmark', label: 'Danmark' },
  { value: 'USA', label: 'USA' },
  { value: 'Tyskland', label: 'Tyskland' },
  { value: 'Storbritannia', label: 'Storbritannia' },
]

export function CatalogFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  
  const currentType = searchParams.get('type') ?? ''
  const currentCountry = searchParams.get('country') ?? ''

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/katalog?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilter('search', search)
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label className="text-foreground mb-2 block">Sok</Label>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Sok etter objekter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-card"
          />
          <Button type="submit" size="icon" variant="secondary">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Type Filter */}
      <div>
        <Label className="text-foreground mb-2 block">Type</Label>
        <div className="space-y-1">
          {itemTypes.map((type) => {
            const Icon = type.icon
            return (
              <button
                key={type.value}
                onClick={() => updateFilter('type', type.value)}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-left',
                  currentType === type.value
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {type.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Country Filter */}
      <div>
        <Label className="text-foreground mb-2 block">Land</Label>
        <div className="space-y-1">
          {countries.map((country) => (
            <button
              key={country.value}
              onClick={() => updateFilter('country', country.value)}
              className={cn(
                'w-full px-3 py-2 rounded-md text-sm transition-colors text-left',
                currentCountry === country.value
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              {country.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
