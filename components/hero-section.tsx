import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Coins, Gavel, TrendingUp, Users } from 'lucide-react'

interface HeroSectionProps {
  isLoggedIn: boolean
}

export function HeroSection({ isLoggedIn }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-copper/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="p-3 rounded-xl bg-primary/10">
              <Coins className="h-10 w-10 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
            Norges ledende plattform for{' '}
            <span className="text-primary">numismatikk</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Samle, handle og del din lidenskap for mynter, sedler og medaljer. 
            Bli med i Norges mest engasjerte samlerfellesskap.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isLoggedIn ? (
              <>
                <Link href="/katalog">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    <Coins className="h-5 w-5" />
                    Min samling
                  </Button>
                </Link>
                <Link href="/auksjoner">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Gavel className="h-5 w-5" />
                    Se auksjoner
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/sign-up">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    <Users className="h-5 w-5" />
                    Bli medlem gratis
                  </Button>
                </Link>
                <Link href="/auksjoner">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Gavel className="h-5 w-5" />
                    Utforsk auksjoner
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
              <Coins className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Digital katalog</h3>
            <p className="text-sm text-muted-foreground">
              Organiser og dokumenter hele din samling med detaljerte oppforinger og bilder.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="p-2 rounded-lg bg-copper/10 w-fit mb-4">
              <Gavel className="h-6 w-6 text-copper" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Trygg auksjon</h3>
            <p className="text-sm text-muted-foreground">
              Kjop og selg med sikker betalingslosning og verifiserte medlemmer.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="p-2 rounded-lg bg-silver/10 w-fit mb-4">
              <TrendingUp className="h-6 w-6 text-silver" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Prisindeks</h3>
            <p className="text-sm text-muted-foreground">
              Folg markedstrender og verdiutvikling for ulike mynttyper.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
