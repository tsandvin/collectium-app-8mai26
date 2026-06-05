'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createCatalogItem } from '@/app/actions/collectium'
import { Coins, Banknote, Medal, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const itemTypes = [
  { value: 'coin', label: 'Mynt', icon: Coins },
  { value: 'banknote', label: 'Seddel', icon: Banknote },
  { value: 'medal', label: 'Medalje', icon: Medal },
]

const grades = [
  'Poor (P)',
  'Fair (FR)',
  'About Good (AG)',
  'Good (G)',
  'Very Good (VG)',
  'Fine (F)',
  'Very Fine (VF)',
  'Extremely Fine (EF/XF)',
  'About Uncirculated (AU)',
  'Mint State (MS)',
  'Proof (PF)',
]

export function NewItemForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [type, setType] = useState('coin')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      await createCatalogItem({
        type,
        title: formData.get('title') as string,
        description: formData.get('description') as string || undefined,
        country: formData.get('country') as string || undefined,
        year: formData.get('year') ? parseInt(formData.get('year') as string) : undefined,
        denomination: formData.get('denomination') as string || undefined,
        metal: formData.get('metal') as string || undefined,
        weight: formData.get('weight') as string || undefined,
        diameter: formData.get('diameter') as string || undefined,
        grade: formData.get('grade') as string || undefined,
        catalogNumber: formData.get('catalogNumber') as string || undefined,
        mintMark: formData.get('mintMark') as string || undefined,
        mintage: formData.get('mintage') ? parseInt(formData.get('mintage') as string) : undefined,
        estimatedValue: formData.get('estimatedValue') as string || undefined,
        purchasePrice: formData.get('purchasePrice') as string || undefined,
        purchaseDate: formData.get('purchaseDate') as string || undefined,
        isPublic: formData.get('isPublic') === 'on',
        isForSale: formData.get('isForSale') === 'on',
      })
      
      router.push('/katalog')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Noe gikk galt')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Type Selection */}
      <div>
        <Label className="text-foreground mb-3 block">Type objekt</Label>
        <div className="grid grid-cols-3 gap-3">
          {itemTypes.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setType(item.value)}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                  type === item.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50'
                )}
              >
                <Icon className={cn(
                  'h-8 w-8',
                  type === item.value ? 'text-primary' : 'text-muted-foreground'
                )} />
                <span className={cn(
                  'font-medium',
                  type === item.value ? 'text-primary' : 'text-foreground'
                )}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Basic Info */}
      <div className="p-6 rounded-xl bg-card border border-border space-y-4">
        <h3 className="font-semibold text-foreground">Grunnleggende informasjon</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="title">Tittel *</Label>
            <Input
              id="title"
              name="title"
              required
              placeholder="F.eks. 20 kroner 1876"
              className="bg-background mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="country">Land</Label>
            <Input
              id="country"
              name="country"
              placeholder="F.eks. Norge"
              className="bg-background mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="year">År</Label>
            <Input
              id="year"
              name="year"
              type="number"
              placeholder="F.eks. 1876"
              className="bg-background mt-1"
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="description">Beskrivelse</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Beskriv objektet..."
              className="bg-background mt-1"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="p-6 rounded-xl bg-card border border-border space-y-4">
        <h3 className="font-semibold text-foreground">Tekniske detaljer</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="denomination">Valør</Label>
            <Input
              id="denomination"
              name="denomination"
              placeholder="F.eks. 20 kroner"
              className="bg-background mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="metal">Metall</Label>
            <Input
              id="metal"
              name="metal"
              placeholder="F.eks. Gull"
              className="bg-background mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="weight">Vekt (gram)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              step="0.0001"
              placeholder="F.eks. 8.96"
              className="bg-background mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="diameter">Diameter (mm)</Label>
            <Input
              id="diameter"
              name="diameter"
              type="number"
              step="0.01"
              placeholder="F.eks. 23"
              className="bg-background mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="grade">Kvalitet</Label>
            <select
              id="grade"
              name="grade"
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground mt-1"
            >
              <option value="">Velg kvalitet</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="catalogNumber">Katalognummer</Label>
            <Input
              id="catalogNumber"
              name="catalogNumber"
              placeholder="F.eks. KM# 355"
              className="bg-background mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="mintMark">Myntmerke</Label>
            <Input
              id="mintMark"
              name="mintMark"
              placeholder="F.eks. S"
              className="bg-background mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="mintage">Opplag</Label>
            <Input
              id="mintage"
              name="mintage"
              type="number"
              placeholder="F.eks. 50000"
              className="bg-background mt-1"
            />
          </div>
        </div>
      </div>

      {/* Value Info */}
      <div className="p-6 rounded-xl bg-card border border-border space-y-4">
        <h3 className="font-semibold text-foreground">Verdi og anskaffelse</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="estimatedValue">Estimert verdi (NOK)</Label>
            <Input
              id="estimatedValue"
              name="estimatedValue"
              type="number"
              step="0.01"
              placeholder="F.eks. 15000"
              className="bg-background mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="purchasePrice">Kjopspris (NOK)</Label>
            <Input
              id="purchasePrice"
              name="purchasePrice"
              type="number"
              step="0.01"
              placeholder="F.eks. 12000"
              className="bg-background mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="purchaseDate">Kjopsdato</Label>
            <Input
              id="purchaseDate"
              name="purchaseDate"
              type="date"
              className="bg-background mt-1"
            />
          </div>
        </div>
      </div>

      {/* Visibility Options */}
      <div className="p-6 rounded-xl bg-card border border-border space-y-4">
        <h3 className="font-semibold text-foreground">Synlighet</h3>
        
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isPublic"
              defaultChecked
              className="w-4 h-4 rounded border-input"
            />
            <span className="text-foreground">Vis i offentlig katalog</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isForSale"
              className="w-4 h-4 rounded border-input"
            />
            <span className="text-foreground">Marker som til salgs</span>
          </label>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="flex-1"
        >
          Avbryt
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-primary text-primary-foreground"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Lagrer...
            </>
          ) : (
            'Legg til objekt'
          )}
        </Button>
      </div>
    </form>
  )
}
