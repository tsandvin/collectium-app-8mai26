'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { 
  catalogItem, 
  auction, 
  bid, 
  memberProfile,
  directMessage,
  auctionChat,
  priceIndex,
  watchlist,
  user
} from '@/lib/db/schema'
import { and, desc, eq, gte, lte, or, ilike, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Auth helper
async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

async function getOptionalUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.id ?? null
}

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  const [userData] = await db.select().from(user).where(eq(user.id, session.user.id))
  if (userData?.role !== 'admin') throw new Error('Admin required')
  return session.user.id
}

// ========== CATALOG ACTIONS ==========

export async function getCatalogItems(filters?: {
  type?: string
  country?: string
  search?: string
  userId?: string
}) {
  const conditions = []
  
  if (filters?.type) {
    conditions.push(eq(catalogItem.type, filters.type))
  }
  if (filters?.country) {
    conditions.push(eq(catalogItem.country, filters.country))
  }
  if (filters?.search) {
    conditions.push(
      or(
        ilike(catalogItem.title, `%${filters.search}%`),
        ilike(catalogItem.description, `%${filters.search}%`)
      )
    )
  }
  if (filters?.userId) {
    conditions.push(eq(catalogItem.userId, filters.userId))
  } else {
    conditions.push(eq(catalogItem.isPublic, true))
  }
  
  return db
    .select()
    .from(catalogItem)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(catalogItem.createdAt))
}

export async function getMyCatalogItems() {
  const userId = await getUserId()
  return db
    .select()
    .from(catalogItem)
    .where(eq(catalogItem.userId, userId))
    .orderBy(desc(catalogItem.createdAt))
}

export async function getCatalogItem(id: number) {
  const [item] = await db.select().from(catalogItem).where(eq(catalogItem.id, id))
  return item
}

export async function createCatalogItem(data: {
  type: string
  title: string
  description?: string
  country?: string
  year?: number
  denomination?: string
  metal?: string
  weight?: string
  diameter?: string
  grade?: string
  catalogNumber?: string
  mintMark?: string
  mintage?: number
  images?: string[]
  estimatedValue?: string
  purchasePrice?: string
  purchaseDate?: string
  isForSale?: boolean
  isPublic?: boolean
}) {
  const userId = await getUserId()
  
  const [item] = await db.insert(catalogItem).values({
    userId,
    type: data.type,
    title: data.title,
    description: data.description,
    country: data.country,
    year: data.year,
    denomination: data.denomination,
    metal: data.metal,
    weight: data.weight,
    diameter: data.diameter,
    grade: data.grade,
    catalogNumber: data.catalogNumber,
    mintMark: data.mintMark,
    mintage: data.mintage,
    images: data.images,
    estimatedValue: data.estimatedValue,
    purchasePrice: data.purchasePrice,
    purchaseDate: data.purchaseDate,
    isForSale: data.isForSale ?? false,
    isPublic: data.isPublic ?? true,
  }).returning()
  
  revalidatePath('/katalog')
  return item
}

export async function updateCatalogItem(id: number, data: Partial<{
  type: string
  title: string
  description: string
  country: string
  year: number
  denomination: string
  metal: string
  weight: string
  diameter: string
  grade: string
  catalogNumber: string
  mintMark: string
  mintage: number
  images: string[]
  estimatedValue: string
  purchasePrice: string
  purchaseDate: string
  isForSale: boolean
  isPublic: boolean
}>) {
  const userId = await getUserId()
  
  const [item] = await db
    .update(catalogItem)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(catalogItem.id, id), eq(catalogItem.userId, userId)))
    .returning()
  
  revalidatePath('/katalog')
  revalidatePath(`/katalog/${id}`)
  return item
}

export async function deleteCatalogItem(id: number) {
  const userId = await getUserId()
  
  await db.delete(catalogItem).where(
    and(eq(catalogItem.id, id), eq(catalogItem.userId, userId))
  )
  
  revalidatePath('/katalog')
}

// ========== AUCTION ACTIONS ==========

export async function getActiveAuctions(filters?: {
  search?: string
  minPrice?: number
  maxPrice?: number
}) {
  const now = new Date()
  const conditions = [
    eq(auction.status, 'active'),
    lte(auction.startTime, now),
    gte(auction.endTime, now),
  ]
  
  if (filters?.search) {
    conditions.push(
      or(
        ilike(auction.title, `%${filters.search}%`),
        ilike(auction.description, `%${filters.search}%`)
      )
    )
  }
  
  return db
    .select()
    .from(auction)
    .where(and(...conditions))
    .orderBy(auction.endTime)
}

export async function getAuction(id: number) {
  const [auctionData] = await db.select().from(auction).where(eq(auction.id, id))
  if (!auctionData) return null
  
  const [item] = await db.select().from(catalogItem).where(eq(catalogItem.id, auctionData.catalogItemId))
  const bids = await db.select().from(bid).where(eq(bid.auctionId, id)).orderBy(desc(bid.createdAt))
  const [seller] = await db.select().from(user).where(eq(user.id, auctionData.userId))
  
  return {
    ...auctionData,
    catalogItem: item,
    bids,
    seller,
  }
}

export async function getMyAuctions() {
  const userId = await getUserId()
  return db
    .select()
    .from(auction)
    .where(eq(auction.userId, userId))
    .orderBy(desc(auction.createdAt))
}

export async function createAuction(data: {
  catalogItemId: number
  title: string
  description?: string
  startingPrice: string
  reservePrice?: string
  buyNowPrice?: string
  startTime: Date
  endTime: Date
}) {
  const userId = await getUserId()
  
  // Verify ownership of catalog item
  const [item] = await db.select().from(catalogItem).where(
    and(eq(catalogItem.id, data.catalogItemId), eq(catalogItem.userId, userId))
  )
  if (!item) throw new Error('Item not found or not owned by user')
  
  const [auctionData] = await db.insert(auction).values({
    userId,
    catalogItemId: data.catalogItemId,
    title: data.title,
    description: data.description,
    startingPrice: data.startingPrice,
    reservePrice: data.reservePrice,
    buyNowPrice: data.buyNowPrice,
    startTime: data.startTime,
    endTime: data.endTime,
    status: data.startTime <= new Date() ? 'active' : 'draft',
  }).returning()
  
  revalidatePath('/auksjoner')
  return auctionData
}

export async function placeBid(auctionId: number, amount: string, maxAutoBidAmount?: string) {
  const userId = await getUserId()
  
  // Get auction and verify it's active
  const [auctionData] = await db.select().from(auction).where(eq(auction.id, auctionId))
  if (!auctionData) throw new Error('Auction not found')
  if (auctionData.status !== 'active') throw new Error('Auction is not active')
  if (auctionData.userId === userId) throw new Error('Cannot bid on your own auction')
  if (new Date() > auctionData.endTime) throw new Error('Auction has ended')
  
  const currentBid = auctionData.currentBid ? parseFloat(auctionData.currentBid) : parseFloat(auctionData.startingPrice)
  const bidAmount = parseFloat(amount)
  
  if (bidAmount <= currentBid) {
    throw new Error('Bid must be higher than current bid')
  }
  
  const [newBid] = await db.insert(bid).values({
    auctionId,
    userId,
    amount,
    isAutoBid: !!maxAutoBidAmount,
    maxAutoBidAmount,
  }).returning()
  
  await db.update(auction).set({
    currentBid: amount,
    updatedAt: new Date(),
  }).where(eq(auction.id, auctionId))
  
  revalidatePath(`/auksjoner/${auctionId}`)
  return newBid
}

// ========== MEMBER PROFILE ACTIONS ==========

export async function getMemberProfile(userId: string) {
  const [profile] = await db.select().from(memberProfile).where(eq(memberProfile.userId, userId))
  const [userData] = await db.select().from(user).where(eq(user.id, userId))
  
  if (!profile && userData) {
    // Create default profile
    const [newProfile] = await db.insert(memberProfile).values({
      userId,
      displayName: userData.name,
    }).returning()
    return { ...newProfile, user: userData }
  }
  
  return profile ? { ...profile, user: userData } : null
}

export async function updateMemberProfile(data: {
  displayName?: string
  bio?: string
  location?: string
  specialization?: string
}) {
  const userId = await getUserId()
  
  const [existing] = await db.select().from(memberProfile).where(eq(memberProfile.userId, userId))
  
  if (existing) {
    const [profile] = await db
      .update(memberProfile)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(memberProfile.userId, userId))
      .returning()
    revalidatePath(`/medlem/${userId}`)
    return profile
  } else {
    const [profile] = await db.insert(memberProfile).values({
      userId,
      ...data,
    }).returning()
    revalidatePath(`/medlem/${userId}`)
    return profile
  }
}

// ========== MESSAGING ACTIONS ==========

export async function getConversations() {
  const userId = await getUserId()
  
  // Get unique conversation partners
  const messages = await db
    .select()
    .from(directMessage)
    .where(or(
      eq(directMessage.senderId, userId),
      eq(directMessage.receiverId, userId)
    ))
    .orderBy(desc(directMessage.createdAt))
  
  const partnerIds = new Set<string>()
  const conversations: { partnerId: string; lastMessage: typeof messages[0] }[] = []
  
  for (const msg of messages) {
    const partnerId = msg.senderId === userId ? msg.receiverId : msg.senderId
    if (!partnerIds.has(partnerId)) {
      partnerIds.add(partnerId)
      conversations.push({ partnerId, lastMessage: msg })
    }
  }
  
  // Get partner user data
  const partners = await Promise.all(
    conversations.map(async (conv) => {
      const [partner] = await db.select().from(user).where(eq(user.id, conv.partnerId))
      return { ...conv, partner }
    })
  )
  
  return partners
}

export async function getDirectMessages(partnerId: string) {
  const userId = await getUserId()
  
  const messages = await db
    .select()
    .from(directMessage)
    .where(
      or(
        and(eq(directMessage.senderId, userId), eq(directMessage.receiverId, partnerId)),
        and(eq(directMessage.senderId, partnerId), eq(directMessage.receiverId, userId))
      )
    )
    .orderBy(directMessage.createdAt)
  
  // Mark messages as read
  await db
    .update(directMessage)
    .set({ isRead: true })
    .where(and(eq(directMessage.senderId, partnerId), eq(directMessage.receiverId, userId)))
  
  return messages
}

export async function sendDirectMessage(receiverId: string, content: string) {
  const userId = await getUserId()
  
  const [message] = await db.insert(directMessage).values({
    senderId: userId,
    receiverId,
    content,
  }).returning()
  
  revalidatePath('/meldinger')
  return message
}

// ========== AUCTION CHAT ACTIONS ==========

export async function getAuctionChat(auctionId: number) {
  const messages = await db
    .select()
    .from(auctionChat)
    .where(eq(auctionChat.auctionId, auctionId))
    .orderBy(auctionChat.createdAt)
  
  // Get user data for each message
  const messagesWithUsers = await Promise.all(
    messages.map(async (msg) => {
      const [userData] = await db.select().from(user).where(eq(user.id, msg.userId))
      return { ...msg, user: userData }
    })
  )
  
  return messagesWithUsers
}

export async function sendAuctionChatMessage(auctionId: number, message: string) {
  const userId = await getUserId()
  
  const [chatMessage] = await db.insert(auctionChat).values({
    auctionId,
    userId,
    message,
  }).returning()
  
  revalidatePath(`/auksjoner/${auctionId}`)
  return chatMessage
}

// ========== PRICE INDEX ACTIONS ==========

export async function getPriceIndexData(filters?: {
  category?: string
  country?: string
}) {
  const conditions = []
  
  if (filters?.category) {
    conditions.push(eq(priceIndex.category, filters.category))
  }
  if (filters?.country) {
    conditions.push(eq(priceIndex.country, filters.country))
  }
  
  return db
    .select()
    .from(priceIndex)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(priceIndex.recordedAt))
    .limit(100)
}

// ========== WATCHLIST ACTIONS ==========

export async function getWatchlist() {
  const userId = await getUserId()
  
  const items = await db.select().from(watchlist).where(eq(watchlist.userId, userId))
  
  // Get associated auctions and catalog items
  const enrichedItems = await Promise.all(
    items.map(async (item) => {
      let auctionData = null
      let catalogData = null
      
      if (item.auctionId) {
        const [a] = await db.select().from(auction).where(eq(auction.id, item.auctionId))
        auctionData = a
      }
      if (item.catalogItemId) {
        const [c] = await db.select().from(catalogItem).where(eq(catalogItem.id, item.catalogItemId))
        catalogData = c
      }
      
      return { ...item, auction: auctionData, catalogItem: catalogData }
    })
  )
  
  return enrichedItems
}

export async function addToWatchlist(data: { auctionId?: number; catalogItemId?: number }) {
  const userId = await getUserId()
  
  const [item] = await db.insert(watchlist).values({
    userId,
    auctionId: data.auctionId,
    catalogItemId: data.catalogItemId,
  }).returning()
  
  revalidatePath('/katalog')
  revalidatePath('/auksjoner')
  return item
}

export async function removeFromWatchlist(id: number) {
  const userId = await getUserId()
  
  await db.delete(watchlist).where(
    and(eq(watchlist.id, id), eq(watchlist.userId, userId))
  )
  
  revalidatePath('/katalog')
  revalidatePath('/auksjoner')
}

// ========== ADMIN ACTIONS ==========

export async function getAllUsers() {
  await requireAdmin()
  return db.select().from(user).orderBy(desc(user.createdAt))
}

export async function updateUserRole(userId: string, role: string) {
  await requireAdmin()
  
  const [updated] = await db
    .update(user)
    .set({ role, updatedAt: new Date() })
    .where(eq(user.id, userId))
    .returning()
  
  revalidatePath('/admin')
  return updated
}

export async function getAdminStats() {
  await requireAdmin()
  
  const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(user)
  const [auctionCount] = await db.select({ count: sql<number>`count(*)` }).from(auction)
  const [catalogCount] = await db.select({ count: sql<number>`count(*)` }).from(catalogItem)
  const [activeAuctionCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(auction)
    .where(eq(auction.status, 'active'))
  
  return {
    users: Number(userCount?.count ?? 0),
    auctions: Number(auctionCount?.count ?? 0),
    catalogItems: Number(catalogCount?.count ?? 0),
    activeAuctions: Number(activeAuctionCount?.count ?? 0),
  }
}
