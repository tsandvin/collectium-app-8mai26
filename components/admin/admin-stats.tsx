import { Users, BookOpen, Gavel, TrendingUp } from 'lucide-react'

interface AdminStatsProps {
  stats: {
    users: number
    auctions: number
    catalogItems: number
    activeAuctions: number
  }
}

export function AdminStats({ stats }: AdminStatsProps) {
  const statItems = [
    {
      label: 'Totalt brukere',
      value: stats.users,
      icon: Users,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Katalogobjekter',
      value: stats.catalogItems,
      icon: BookOpen,
      color: 'text-copper',
      bg: 'bg-copper/10',
    },
    {
      label: 'Totalt auksjoner',
      value: stats.auctions,
      icon: Gavel,
      color: 'text-silver',
      bg: 'bg-silver/10',
    },
    {
      label: 'Aktive auksjoner',
      value: stats.activeAuctions,
      icon: TrendingUp,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.label}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${item.bg}`}>
                <Icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
