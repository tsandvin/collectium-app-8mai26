import { Users, BookOpen, Gavel } from 'lucide-react'

interface StatsSectionProps {
  stats: {
    members: number
    catalogItems: number
    activeAuctions: number
  }
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-3xl font-bold text-foreground">{stats.members}</span>
            </div>
            <p className="text-muted-foreground">Aktive medlemmer</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-copper" />
              <span className="text-3xl font-bold text-foreground">{stats.catalogItems}</span>
            </div>
            <p className="text-muted-foreground">Katalogoppforinger</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gavel className="h-5 w-5 text-silver" />
              <span className="text-3xl font-bold text-foreground">{stats.activeAuctions}</span>
            </div>
            <p className="text-muted-foreground">Aktive auksjoner</p>
          </div>
        </div>
      </div>
    </section>
  )
}
