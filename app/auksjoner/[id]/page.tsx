import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import { AuctionDetails } from '@/components/auction/auction-details'
import { BidSection } from '@/components/auction/bid-section'
import { AuctionChatSection } from '@/components/auction/auction-chat-section'
import { getAuction, getAuctionChat } from '@/app/actions/collectium'

export default async function AuctionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  const { id } = await params
  const auctionId = parseInt(id)
  
  const auction = await getAuction(auctionId)
  if (!auction) notFound()
  
  const chatMessages = await getAuctionChat(auctionId)

  return (
    <><div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <AuctionDetails auction={auction} />
          <AuctionChatSection 
            auctionId={auctionId} 
            messages={chatMessages}
            isLoggedIn={!!session?.user}
          />
        </div>
        
        {/* Sidebar - Bidding */}
        <div>
          <BidSection 
            auction={auction}
            isLoggedIn={!!session?.user}
            currentUserId={session?.user?.id}
          />
        </div>
      </div></>
  )
}

