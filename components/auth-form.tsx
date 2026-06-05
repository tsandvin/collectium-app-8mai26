'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isSignUp = mode === 'sign-up'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = isSignUp
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password })

    setLoading(false)

    if (error) {
      setError(error.message ?? 'Noe gikk galt')
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <main 
      className="min-h-svh flex items-center justify-center px-4"
      style={{ 
        background: 'linear-gradient(180deg, #fffaf2, #f6f1e8)',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span 
              className="text-3xl font-bold"
              style={{ fontFamily: 'Georgia, serif', color: '#0f2e24' }}
            >
              C
            </span>
            <span 
              className="text-xl"
              style={{ fontFamily: 'Georgia, serif', color: '#0f2e24' }}
            >
              Collectium
            </span>
          </Link>
          <h1 
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: 'Georgia, serif', color: '#0f2e24' }}
          >
            {isSignUp ? 'Bli medlem' : 'Velkommen tilbake'}
          </h1>
          <p className="text-sm mt-2" style={{ color: '#355044' }}>
            {isSignUp
              ? 'Opprett din konto og start samlingen'
              : 'Logg inn for å fortsette'}
          </p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col gap-4 p-6 rounded-lg"
          style={{ 
            background: 'rgba(255, 250, 242, 0.78)',
            border: '1px solid rgba(15, 46, 36, 0.16)',
            boxShadow: '0 18px 44px rgba(15, 46, 36, 0.08)'
          }}
        >
          {isSignUp && (
            <div className="flex flex-col gap-2">
              <Label 
                htmlFor="name"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#a17a3a'
                }}
              >
                Navn
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Ditt fulle navn"
                style={{
                  color: '#0f2e24'
                }}
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Label 
              htmlFor="email"
              style={{ 
                fontFamily: 'Georgia, serif',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#a17a3a'
              }}
            >
              E-post
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="din@epost.no"
              style={{
                color: '#0f2e24'
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label 
              htmlFor="password"
              style={{ 
                fontFamily: 'Georgia, serif',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#a17a3a'
              }}
            >
              Passord
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              placeholder="Minst 8 tegn"
              style={{
                color: '#0f2e24'
              }}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full mt-2"
            style={{
              background: '#d6a641',
              color: '#0f2e24',
              border: '1px solid #a17a3a',
              fontWeight: 700,
              minHeight: '46px'
            }}
          >
            {loading
              ? 'Vennligst vent...'
              : isSignUp
                ? 'Bli medlem'
                : 'Logg inn'}
          </Button>
        </form>

        <p className="text-sm text-center mt-6" style={{ color: '#355044' }}>
          {isSignUp ? 'Har du allerede en konto? ' : 'Har du ikke en konto? '}
          <Link
            href={isSignUp ? '/sign-in' : '/sign-up'}
            className="font-medium underline-offset-4 hover:underline"
            style={{ color: '#a17a3a' }}
          >
            {isSignUp ? 'Logg inn' : 'Registrer deg'}
          </Link>
        </p>
      </div>
    </main>
  )
}
