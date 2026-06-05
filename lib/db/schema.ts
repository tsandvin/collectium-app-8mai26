import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
  decimal,
  date,
} from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  role: text('role').notNull().default('member'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- Collectium App Tables -------------------------------------------

export const memberProfile = pgTable('member_profile', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull().unique(),
  displayName: text('displayName'),
  bio: text('bio'),
  location: text('location'),
  specialization: text('specialization'),
  memberSince: timestamp('memberSince').notNull().defaultNow(),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  totalSales: integer('totalSales').default(0),
  totalPurchases: integer('totalPurchases').default(0),
  isVerified: boolean('isVerified').default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const catalogItem = pgTable('catalog_item', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  type: text('type').notNull(), // 'coin', 'banknote', 'medal'
  title: text('title').notNull(),
  description: text('description'),
  country: text('country'),
  year: integer('year'),
  denomination: text('denomination'),
  metal: text('metal'),
  weight: decimal('weight', { precision: 10, scale: 4 }),
  diameter: decimal('diameter', { precision: 10, scale: 2 }),
  grade: text('grade'),
  catalogNumber: text('catalogNumber'),
  mintMark: text('mintMark'),
  mintage: integer('mintage'),
  images: text('images').array(),
  estimatedValue: decimal('estimatedValue', { precision: 12, scale: 2 }),
  purchasePrice: decimal('purchasePrice', { precision: 12, scale: 2 }),
  purchaseDate: date('purchaseDate'),
  isForSale: boolean('isForSale').default(false),
  isPublic: boolean('isPublic').default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const auction = pgTable('auction', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  catalogItemId: integer('catalogItemId').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  startingPrice: decimal('startingPrice', { precision: 12, scale: 2 }).notNull(),
  reservePrice: decimal('reservePrice', { precision: 12, scale: 2 }),
  currentBid: decimal('currentBid', { precision: 12, scale: 2 }),
  buyNowPrice: decimal('buyNowPrice', { precision: 12, scale: 2 }),
  startTime: timestamp('startTime').notNull(),
  endTime: timestamp('endTime').notNull(),
  status: text('status').notNull().default('draft'), // 'draft', 'active', 'ended', 'sold', 'cancelled'
  winnerId: text('winnerId'),
  stripePaymentIntentId: text('stripePaymentIntentId'),
  isPaid: boolean('isPaid').default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const bid = pgTable('bid', {
  id: serial('id').primaryKey(),
  auctionId: integer('auctionId').notNull(),
  userId: text('userId').notNull(),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  isAutoBid: boolean('isAutoBid').default(false),
  maxAutoBidAmount: decimal('maxAutoBidAmount', { precision: 12, scale: 2 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const directMessage = pgTable('direct_message', {
  id: serial('id').primaryKey(),
  senderId: text('senderId').notNull(),
  receiverId: text('receiverId').notNull(),
  content: text('content').notNull(),
  isRead: boolean('isRead').default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const auctionChat = pgTable('auction_chat', {
  id: serial('id').primaryKey(),
  auctionId: integer('auctionId').notNull(),
  userId: text('userId').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const priceIndex = pgTable('price_index', {
  id: serial('id').primaryKey(),
  category: text('category').notNull(),
  subcategory: text('subcategory'),
  country: text('country'),
  year: integer('year'),
  avgPrice: decimal('avgPrice', { precision: 12, scale: 2 }).notNull(),
  minPrice: decimal('minPrice', { precision: 12, scale: 2 }),
  maxPrice: decimal('maxPrice', { precision: 12, scale: 2 }),
  sampleSize: integer('sampleSize').default(0),
  trend: text('trend'), // 'up', 'down', 'stable'
  recordedAt: timestamp('recordedAt').notNull().defaultNow(),
})

export const watchlist = pgTable('watchlist', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  auctionId: integer('auctionId'),
  catalogItemId: integer('catalogItemId'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// Type exports
export type User = typeof user.$inferSelect
export type MemberProfile = typeof memberProfile.$inferSelect
export type CatalogItem = typeof catalogItem.$inferSelect
export type Auction = typeof auction.$inferSelect
export type Bid = typeof bid.$inferSelect
export type DirectMessage = typeof directMessage.$inferSelect
export type AuctionChat = typeof auctionChat.$inferSelect
export type PriceIndex = typeof priceIndex.$inferSelect
export type Watchlist = typeof watchlist.$inferSelect
