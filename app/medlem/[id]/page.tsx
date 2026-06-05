import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import { MemberProfileCard } from '@/components/member/member-profile-card'
import { MemberCollection } from '@/components/member/member-collection'
import { getMemberProfile, getCatalogItems } from '@/app/actions/collectium'

export default async function MemberPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  const { id } = await params
  
  const profile = await getMemberProfile(id)
  if (!profile) notFound()
  
  const collection = await getCatalogItems({ userId: id })
  const isOwnProfile = session?.user?.id === id

  return (
    <><div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 32 }}>
        <div>
          <MemberProfileCard 
            profile={profile}
            isOwnProfile={isOwnProfile}
            isLoggedIn={!!session?.user}
          />
        </div>
        
        <div>
          <MemberCollection items={collection} isOwnProfile={isOwnProfile} />
        </div>
      </div></>
  )
}

