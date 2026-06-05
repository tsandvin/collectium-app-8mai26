import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { NewItemForm } from '@/components/catalog/new-item-form'

export default async function NewItemPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <><div style={{ maxWidth: 640, margin: '0 auto' }}>
        <header style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "var(--ct-font-display)",
              fontSize: "2em",
              letterSpacing: "-0.02em",
              color: "var(--ct-text)",
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            Legg til nytt objekt
          </h1>
          <p style={{ color: "var(--ct-text-soft)", fontFamily: "var(--ct-font-body)", fontSize: "1em" }}>
            Registrer en ny mynt, seddel eller medalje i din samling.
          </p>
        </header>
        
        <NewItemForm />
      </div></>
  )
}

