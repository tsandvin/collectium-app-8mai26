/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium server actions mot MariaDB
 *
 * Definering / formål:
 * Midlertidig build-fiks som erstatter gammel Drizzle/PostgreSQL-handlingsfil med mysql2/MariaDB-baserte server actions.
 * Denne versjonen legger også inn kompatibilitetsnavn som eldre komponenter importerer:
 * - getAuction
 * - sendDirectMessage
 *
 * Bruksområde:
 * Brukes av katalog, auksjon, meldinger, børs, medlem og admin mens full DB 8.4 action-route-lag bygges.
 *
 * Berørte sider / routes:
 * - /katalog
 * - /auksjoner
 * - /auksjoner/[id]
 * - /bors
 * - /medlem/[id]
 * - /meldinger
 * - /meldinger/[partnerId]
 * - /admin
 *
 * Berørte DB-brytere / feature_keys:
 * - catalog.view
 * - auction.view
 * - auction.bid
 * - profile.view
 * - messages.view
 * - admin.users.view
 *
 * Berørte API-ruter:
 * - Server actions, ingen public route.
 *
 * Berørte tabeller / views:
 * - ct_users
 * - catalog_item
 * - auction
 * - bid
 * - member_profile
 * - direct_message
 * - auction_chat
 * - price_index
 * - watchlist
 *
 * Dataretning:
 * MariaDB -> server action -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: server_action
 * log_action: collectium.legacy_compat
 *
 * Versjon:
 * CT-FILE-APP-ACTIONS-COLLECTIUM-0003 / CHANGE-2026-06-05-AUTH-BUILD-FIX-0003
 */

'use server'

import { revalidatePath } from 'next/cache'
import { auth, isPrivilegedRole } from '@/lib/auth'
import { dbExecute, dbQuery } from '@/lib/db'

type AnyRow = Record<string, any>

async function getSessionUser() {
  const session = await auth.api.getSession()

  if (!session?.user) {
    throw new Error('Ikke innlogget')
  }

  return session.user
}

async function getUserId(): Promise<number> {
  const user = await getSessionUser()
  return Number(user.id)
}

async function requireAdmin() {
  const user = await getSessionUser()
  const hasAccess =
    Boolean(user.isAdmin) ||
    user.roles?.some(isPrivilegedRole) ||
    isPrivilegedRole(user.role)

  if (!hasAccess) {
    throw new Error('Admin tilgang kreves')
  }

  return user
}

async function safeRows<T extends AnyRow>(sql: string, params: unknown[] = []): Promise<T[]> {
  try {
    return await dbQuery<T>(sql, params)
  } catch {
    return []
  }
}

async function safeFirst<T extends AnyRow>(sql: string, params: unknown[] = []): Promise<T | null> {
  const rows = await safeRows<T>(sql, params)
  return rows[0] ?? null
}

// ========== CATALOG ACTIONS ==========

export async function getCatalogItems(filters?: {
  type?: string
  country?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}) {
  const where: string[] = []
  const params: unknown[] = []

  if (filters?.type) {
    where.push('type = ?')
    params.push(filters.type)
  }

  if (filters?.country) {
    where.push('country = ?')
    params.push(filters.country)
  }

  if (typeof filters?.minPrice === 'number') {
    where.push('(estimatedValue IS NULL OR estimatedValue >= ?)')
    params.push(filters.minPrice)
  }

  if (typeof filters?.maxPrice === 'number') {
    where.push('(estimatedValue IS NULL OR estimatedValue <= ?)')
    params.push(filters.maxPrice)
  }

  if (filters?.search) {
    where.push('(title LIKE ? OR description LIKE ? OR catalogNumber LIKE ?)')
    params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`)
  }

  const clause = where.length ? `WHERE ${where.join(' AND ')}` : ''

  return safeRows(
    `SELECT *
     FROM catalog_item
     ${clause}
     ORDER BY createdAt DESC
     LIMIT 200`,
    params,
  )
}

export async function createCatalogItem(data: AnyRow) {
  const userId = await getUserId()

  const result = await dbExecute(
    `INSERT INTO catalog_item
      (userId, type, title, description, country, year, denomination, grade, catalogNumber, estimatedValue, purchasePrice, isForSale, isPublic, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      userId,
      data.type ?? 'unknown',
      data.title ?? 'Uten tittel',
      data.description ?? null,
      data.country ?? null,
      data.year ?? null,
      data.denomination ?? null,
      data.grade ?? null,
      data.catalogNumber ?? null,
      data.estimatedValue ?? null,
      data.purchasePrice ?? null,
      data.isForSale ? 1 : 0,
      data.isPublic === false ? 0 : 1,
    ],
  )

  revalidatePath('/katalog')
  return { id: result.insertId, ...data, userId }
}

export async function getCatalogItem(id: number) {
  return safeFirst(`SELECT * FROM catalog_item WHERE id = ? LIMIT 1`, [id])
}

// ========== AUCTION ACTIONS ==========

export async function getActiveAuctions() {
  return safeRows(
    `SELECT *
     FROM auction
     WHERE status = 'active' OR status IS NULL
     ORDER BY endTime ASC
     LIMIT 100`,
  )
}

export async function getAuctionById(id: number) {
  return safeFirst(`SELECT * FROM auction WHERE id = ? LIMIT 1`, [id])
}

// Kompatibilitetsnavn brukt av /app/auksjoner/[id]/page.tsx
export async function getAuction(id: number) {
  return getAuctionById(id)
}

export async function createAuction(data: AnyRow) {
  const userId = await getUserId()

  const result = await dbExecute(
    `INSERT INTO auction
      (userId, catalogItemId, title, description, startingPrice, reservePrice, buyNowPrice, startTime, endTime, status, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      userId,
      data.catalogItemId,
      data.title ?? 'Auksjon',
      data.description ?? null,
      data.startingPrice ?? 0,
      data.reservePrice ?? null,
      data.buyNowPrice ?? null,
      data.startTime ?? new Date(),
      data.endTime ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      data.status ?? 'draft',
    ],
  )

  revalidatePath('/auksjoner')
  return { id: result.insertId, ...data, userId }
}

export async function placeBid(auctionId: number, amount: number) {
  const userId = await getUserId()

  const result = await dbExecute(
    `INSERT INTO bid (auctionId, userId, amount, createdAt)
     VALUES (?, ?, ?, NOW())`,
    [auctionId, userId, amount],
  )

  await dbExecute(
    `UPDATE auction SET currentBid = ?, updatedAt = NOW() WHERE id = ?`,
    [amount, auctionId],
  )

  revalidatePath('/auksjoner')
  revalidatePath(`/auksjoner/${auctionId}`)
  return { id: result.insertId, auctionId, userId, amount }
}

export async function getBidsForAuction(auctionId: number) {
  return safeRows(
    `SELECT b.*, u.display_name AS userName, u.email AS userEmail
     FROM bid b
     LEFT JOIN ct_users u ON u.id = b.userId
     WHERE b.auctionId = ?
     ORDER BY b.amount DESC, b.createdAt DESC`,
    [auctionId],
  )
}

// ========== MEMBER ACTIONS ==========

export async function getMemberProfile(userId: string | number) {
  return safeFirst(
    `SELECT mp.*, u.email, u.display_name AS userName, u.role
     FROM member_profile mp
     LEFT JOIN ct_users u ON u.id = mp.userId
     WHERE mp.userId = ?
     LIMIT 1`,
    [userId],
  )
}

export async function updateMemberProfile(data: AnyRow) {
  const userId = await getUserId()

  await dbExecute(
    `INSERT INTO member_profile
      (userId, displayName, bio, location, specialization, updatedAt)
     VALUES (?, ?, ?, ?, ?, NOW())
     ON DUPLICATE KEY UPDATE
      displayName = VALUES(displayName),
      bio = VALUES(bio),
      location = VALUES(location),
      specialization = VALUES(specialization),
      updatedAt = NOW()`,
    [
      userId,
      data.displayName ?? null,
      data.bio ?? null,
      data.location ?? null,
      data.specialization ?? null,
    ],
  )

  revalidatePath('/min-side')
  revalidatePath(`/medlem/${userId}`)
  return getMemberProfile(userId)
}

// ========== MESSAGE ACTIONS ==========

export async function getConversations() {
  const userId = await getUserId()

  return safeRows(
    `SELECT
       dm.*,
       CASE WHEN dm.senderId = ? THEN dm.receiverId ELSE dm.senderId END AS partnerId,
       u.display_name AS partnerName,
       u.email AS partnerEmail
     FROM direct_message dm
     LEFT JOIN ct_users u
       ON u.id = CASE WHEN dm.senderId = ? THEN dm.receiverId ELSE dm.senderId END
     WHERE dm.senderId = ? OR dm.receiverId = ?
     ORDER BY dm.createdAt DESC
     LIMIT 100`,
    [userId, userId, userId, userId],
  )
}

export async function getDirectMessages(partnerId: string | number) {
  const userId = await getUserId()

  return safeRows(
    `SELECT dm.*, sender.display_name AS senderName, receiver.display_name AS receiverName
     FROM direct_message dm
     LEFT JOIN ct_users sender ON sender.id = dm.senderId
     LEFT JOIN ct_users receiver ON receiver.id = dm.receiverId
     WHERE (dm.senderId = ? AND dm.receiverId = ?) OR (dm.senderId = ? AND dm.receiverId = ?)
     ORDER BY dm.createdAt ASC`,
    [userId, partnerId, partnerId, userId],
  )
}

export async function sendMessage(receiverId: string | number, content: string) {
  const userId = await getUserId()

  const result = await dbExecute(
    `INSERT INTO direct_message (senderId, receiverId, content, isRead, createdAt)
     VALUES (?, ?, ?, 0, NOW())`,
    [userId, receiverId, content],
  )

  revalidatePath('/meldinger')
  revalidatePath(`/meldinger/${receiverId}`)
  return { id: result.insertId, senderId: userId, receiverId, content }
}

// Kompatibilitetsnavn brukt av components/messages/chat-window.tsx
export async function sendDirectMessage(receiverId: string | number, content: string) {
  return sendMessage(receiverId, content)
}

export async function getAuctionChat(auctionId: number) {
  return safeRows(
    `SELECT ac.*, u.display_name AS userName
     FROM auction_chat ac
     LEFT JOIN ct_users u ON u.id = ac.userId
     WHERE ac.auctionId = ?
     ORDER BY ac.createdAt ASC`,
    [auctionId],
  )
}

export async function sendAuctionChatMessage(auctionId: number, message: string) {
  const userId = await getUserId()

  const result = await dbExecute(
    `INSERT INTO auction_chat (auctionId, userId, message, createdAt)
     VALUES (?, ?, ?, NOW())`,
    [auctionId, userId, message],
  )

  revalidatePath(`/auksjoner/${auctionId}`)
  return { id: result.insertId, auctionId, userId, message }
}

// ========== PRICE INDEX / MARKET ACTIONS ==========

export async function getPriceIndexData(category?: string) {
  const params: unknown[] = []
  const where = category ? 'WHERE category = ?' : ''

  if (category) params.push(category)

  return safeRows(
    `SELECT *
     FROM price_index
     ${where}
     ORDER BY recordedAt DESC
     LIMIT 200`,
    params,
  )
}

export async function getMarketOverview() {
  const [catalogCount, auctionCount, activeAuctionCount, userCount] = await Promise.all([
    safeFirst<{ count: number }>(`SELECT COUNT(*) AS count FROM catalog_item`),
    safeFirst<{ count: number }>(`SELECT COUNT(*) AS count FROM auction`),
    safeFirst<{ count: number }>(`SELECT COUNT(*) AS count FROM auction WHERE status = 'active'`),
    safeFirst<{ count: number }>(`SELECT COUNT(*) AS count FROM ct_users`),
  ])

  return {
    catalogItems: Number(catalogCount?.count ?? 0),
    auctions: Number(auctionCount?.count ?? 0),
    activeAuctions: Number(activeAuctionCount?.count ?? 0),
    users: Number(userCount?.count ?? 0),
  }
}

// ========== WATCHLIST ACTIONS ==========

export async function getWatchlist() {
  const userId = await getUserId()
  return safeRows(`SELECT * FROM watchlist WHERE userId = ? ORDER BY createdAt DESC`, [userId])
}

export async function addToWatchlist(data: { auctionId?: number; catalogItemId?: number }) {
  const userId = await getUserId()

  const result = await dbExecute(
    `INSERT INTO watchlist (userId, auctionId, catalogItemId, createdAt)
     VALUES (?, ?, ?, NOW())`,
    [userId, data.auctionId ?? null, data.catalogItemId ?? null],
  )

  revalidatePath('/katalog')
  revalidatePath('/auksjoner')
  return { id: result.insertId, userId, ...data }
}

export async function removeFromWatchlist(id: number) {
  const userId = await getUserId()

  await dbExecute(
    `DELETE FROM watchlist WHERE id = ? AND userId = ?`,
    [id, userId],
  )

  revalidatePath('/katalog')
  revalidatePath('/auksjoner')
}

// ========== ADMIN ACTIONS ==========

export async function getAllUsers() {
  await requireAdmin()

  return safeRows(
    `SELECT
       id,
       public_id AS publicId,
       email,
       display_name AS name,
       display_name AS displayName,
       public_display_name AS publicDisplayName,
       role,
       is_admin AS isAdmin,
       is_active AS isActive,
       account_status AS accountStatus,
       email_status AS emailStatus,
       admin_approval_status AS adminApprovalStatus,
       created_at AS createdAt,
       updated_at AS updatedAt
     FROM ct_users
     ORDER BY created_at DESC
     LIMIT 500`,
  )
}

export async function updateUserRole(userId: string | number, role: string) {
  await requireAdmin()

  await dbExecute(
    `UPDATE ct_users SET role = ?, updated_at = NOW() WHERE id = ?`,
    [role, userId],
  )

  revalidatePath('/admin')
  return safeFirst(`SELECT * FROM ct_users WHERE id = ? LIMIT 1`, [userId])
}

export async function getAdminStats() {
  await requireAdmin()

  const [userCount, auctionCount, catalogCount, activeAuctionCount] = await Promise.all([
    safeFirst<{ count: number }>(`SELECT COUNT(*) AS count FROM ct_users`),
    safeFirst<{ count: number }>(`SELECT COUNT(*) AS count FROM auction`),
    safeFirst<{ count: number }>(`SELECT COUNT(*) AS count FROM catalog_item`),
    safeFirst<{ count: number }>(`SELECT COUNT(*) AS count FROM auction WHERE status = 'active'`),
  ])

  return {
    users: Number(userCount?.count ?? 0),
    auctions: Number(auctionCount?.count ?? 0),
    catalogItems: Number(catalogCount?.count ?? 0),
    activeAuctions: Number(activeAuctionCount?.count ?? 0),
  }
}
