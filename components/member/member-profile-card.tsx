import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User, MapPin, Calendar, Star, MessageCircle, Settings, ShieldCheck } from 'lucide-react'
import type { MemberProfile, User as UserType } from '@/lib/db/schema'

interface MemberProfileCardProps {
  profile: MemberProfile & { user: UserType | null }
  isOwnProfile: boolean
  isLoggedIn: boolean
}

export function MemberProfileCard({ profile, isOwnProfile, isLoggedIn }: MemberProfileCardProps) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border sticky top-24">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          {profile.user?.image ? (
            <img
              src={profile.user.image}
              alt={profile.displayName ?? profile.user?.name ?? 'Medlem'}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="h-12 w-12 text-primary" />
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-foreground">
            {profile.displayName ?? profile.user?.name ?? 'Ukjent'}
          </h1>
          {profile.isVerified && (
            <ShieldCheck className="h-5 w-5 text-primary" />
          )}
        </div>
        
        {profile.specialization && (
          <p className="text-sm text-primary mt-1">{profile.specialization}</p>
        )}
      </div>

      {/* Bio */}
      {profile.bio && (
        <p className="text-muted-foreground text-sm text-center mb-6">
          {profile.bio}
        </p>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{profile.totalSales}</p>
          <p className="text-xs text-muted-foreground">Salg</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{profile.totalPurchases}</p>
          <p className="text-xs text-muted-foreground">Kjop</p>
        </div>
        <div className="text-center flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <p className="text-2xl font-bold text-foreground">
              {profile.rating ? parseFloat(profile.rating).toFixed(1) : '-'}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">Rating</p>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-3 mb-6 text-sm">
        {profile.location && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{profile.location}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            Medlem siden {profile.memberSince.toLocaleDateString('nb-NO', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Actions */}
      {isOwnProfile ? (
        <Link href="/innstillinger/profil">
          <Button variant="outline" className="w-full gap-2">
            <Settings className="h-4 w-4" />
            Rediger profil
          </Button>
        </Link>
      ) : isLoggedIn ? (
        <Link href={`/meldinger/${profile.userId}`}>
          <Button className="w-full bg-primary text-primary-foreground gap-2">
            <MessageCircle className="h-4 w-4" />
            Send melding
          </Button>
        </Link>
      ) : (
        <Link href="/sign-in">
          <Button variant="outline" className="w-full">
            Logg inn for a kontakte
          </Button>
        </Link>
      )}
    </div>
  )
}
