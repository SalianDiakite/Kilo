/**
 * Service de données unifié
 * Gère le basculement entre données mock et données Supabase
 * 
 * Pour activer les données réelles, mettre USE_MOCK_DATA = false
 */

import type { Trip, User, Booking, Notification, Review, Conversation } from "@/lib/types"
import type { DbTrip, DbProfile, DbBooking, DbNotification, DbReview } from "@/lib/db/types"
import {
  mockTrips,
  mockUsers,
  mockBookings,
  mockNotifications,
  mockReviews,
  mockConversations,
} from "@/lib/mock-data"

// ========================================
// CONFIGURATION
// ========================================

// Flag global pour basculer entre mock et DB
// Mettre à false quand la base de données sera peuplée
export const USE_MOCK_DATA = true

// ========================================
// CONVERTISSEURS DB → APP TYPES
// ========================================

export function dbProfileToUser(profile: DbProfile): User {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email || undefined,
    phone: profile.phone || undefined,
    whatsapp: profile.whatsapp || undefined,
    avatar: profile.avatar || undefined,
    bio: profile.bio || undefined,
    rating: profile.rating,
    reviewCount: profile.review_count,
    verified: profile.verified,
    createdAt: new Date(profile.created_at),
    languages: profile.languages,
    responseRate: profile.response_rate,
    responseTime: profile.response_time || undefined,
  }
}

export function dbTripToTrip(dbTrip: DbTrip): Trip {
  return {
    id: dbTrip.id,
    userId: dbTrip.user_id,
    user: dbTrip.user ? dbProfileToUser(dbTrip.user) : ({} as User),
    departure: dbTrip.departure,
    departureCountry: dbTrip.departure_country,
    arrival: dbTrip.arrival,
    arrivalCountry: dbTrip.arrival_country,
    departureDate: new Date(dbTrip.departure_date),
    availableKg: dbTrip.available_kg,
    totalKg: dbTrip.total_kg,
    pricePerKg: dbTrip.price_per_kg,
    currency: dbTrip.currency,
    description: dbTrip.description || undefined,
    acceptedItems: dbTrip.accepted_items,
    rejectedItems: dbTrip.rejected_items,
    createdAt: new Date(dbTrip.created_at),
    status: dbTrip.status,
    views: dbTrip.views,
    inquiries: dbTrip.inquiries,
  }
}

export function dbBookingToBooking(dbBooking: DbBooking): Booking {
  return {
    id: dbBooking.id,
    tripId: dbBooking.trip_id,
    senderId: dbBooking.sender_id,
    sender: dbBooking.sender ? dbProfileToUser(dbBooking.sender) : ({} as User),
    kgRequested: dbBooking.kg_requested,
    kgConfirmed: dbBooking.kg_confirmed || undefined,
    totalPrice: dbBooking.total_price,
    status: dbBooking.status,
    itemDescription: dbBooking.item_description,
    createdAt: new Date(dbBooking.created_at),
    updatedAt: new Date(dbBooking.updated_at),
    notes: dbBooking.notes || undefined,
  }
}

export function dbNotificationToNotification(dbNotif: DbNotification): Notification {
  return {
    id: dbNotif.id,
    userId: dbNotif.user_id,
    type: dbNotif.type,
    title: dbNotif.title,
    message: dbNotif.message,
    read: dbNotif.read,
    createdAt: new Date(dbNotif.created_at),
    link: dbNotif.link || undefined,
    metadata: dbNotif.metadata as Notification["metadata"],
  }
}

export function dbReviewToReview(dbReview: DbReview): Review {
  return {
    id: dbReview.id,
    tripId: dbReview.trip_id || "",
    reviewerId: dbReview.reviewer_id,
    reviewer: dbReview.reviewer ? dbProfileToUser(dbReview.reviewer) : ({} as User),
    reviewedId: dbReview.reviewed_id,
    rating: dbReview.rating,
    comment: dbReview.comment || "",
    createdAt: new Date(dbReview.created_at),
  }
}

// ========================================
// SERVICES DE DONNÉES (MOCK OU DB)
// ========================================

/**
 * Récupère tous les trajets disponibles
 */
export async function fetchTrips(): Promise<Trip[]> {
  if (USE_MOCK_DATA) {
    return mockTrips
  }

  const { getTrips } = await import("@/lib/db/trips")
  try {
    const { trips } = await getTrips({ status: "active" }, 1, 100)
    return trips.map(dbTripToTrip)
  } catch {
    console.warn("DB fetch failed, falling back to mock data")
    return mockTrips
  }
}

/**
 * Récupère un trajet par son ID
 */
export async function fetchTrip(tripId: string): Promise<Trip | null> {
  if (USE_MOCK_DATA) {
    return mockTrips.find((t) => t.id === tripId) || null
  }

  const { getTrip } = await import("@/lib/db/trips")
  try {
    const trip = await getTrip(tripId)
    return dbTripToTrip(trip)
  } catch {
    // Fallback sur mock
    return mockTrips.find((t) => t.id === tripId) || null
  }
}

/**
 * Récupère les trajets d'un utilisateur
 */
export async function fetchUserTrips(userId: string): Promise<Trip[]> {
  if (USE_MOCK_DATA) {
    return mockTrips.filter((t) => t.userId === userId)
  }

  const { getUserTrips } = await import("@/lib/db/trips")
  try {
    const trips = await getUserTrips(userId)
    return trips.map(dbTripToTrip)
  } catch {
    return mockTrips.filter((t) => t.userId === userId)
  }
}

/**
 * Récupère un utilisateur par son ID
 */
export async function fetchUser(userId: string): Promise<User | null> {
  if (USE_MOCK_DATA) {
    return mockUsers.find((u) => u.id === userId) || null
  }

  const { getProfile } = await import("@/lib/db/profiles")
  try {
    const profile = await getProfile(userId)
    return dbProfileToUser(profile)
  } catch {
    return mockUsers.find((u) => u.id === userId) || null
  }
}

/**
 * Récupère les réservations d'un trajet
 */
export async function fetchTripBookings(tripId: string): Promise<Booking[]> {
  if (USE_MOCK_DATA) {
    return mockBookings.filter((b) => b.tripId === tripId)
  }

  const { getTripBookings } = await import("@/lib/db/bookings")
  try {
    const bookings = await getTripBookings(tripId)
    return bookings.map(dbBookingToBooking)
  } catch {
    return mockBookings.filter((b) => b.tripId === tripId)
  }
}

/**
 * Récupère les réservations d'un utilisateur
 */
export async function fetchUserBookings(userId: string, role: "sender" | "owner"): Promise<Booking[]> {
  if (USE_MOCK_DATA) {
    if (role === "sender") {
      return mockBookings.filter((b) => b.senderId === userId)
    }
    // Owner: bookings on user's trips
    const userTripIds = mockTrips.filter((t) => t.userId === userId).map((t) => t.id)
    return mockBookings.filter((b) => userTripIds.includes(b.tripId))
  }

  const { getUserBookings } = await import("@/lib/db/bookings")
  try {
    const bookings = await getUserBookings(userId, role)
    return bookings.map(dbBookingToBooking)
  } catch {
    if (role === "sender") {
      return mockBookings.filter((b) => b.senderId === userId)
    }
    const userTripIds = mockTrips.filter((t) => t.userId === userId).map((t) => t.id)
    return mockBookings.filter((b) => userTripIds.includes(b.tripId))
  }
}

/**
 * Récupère les notifications d'un utilisateur
 */
export async function fetchNotifications(userId: string): Promise<Notification[]> {
  if (USE_MOCK_DATA) {
    return mockNotifications.filter((n) => n.userId === userId)
  }

  const { getNotifications } = await import("@/lib/db/notifications")
  try {
    const notifs = await getNotifications(userId)
    return notifs.map(dbNotificationToNotification)
  } catch {
    return mockNotifications.filter((n) => n.userId === userId)
  }
}

/**
 * Récupère les avis reçus par un utilisateur
 */
export async function fetchUserReviews(userId: string): Promise<Review[]> {
  if (USE_MOCK_DATA) {
    return mockReviews.filter((r) => r.reviewedId === userId)
  }

  const { getReviews } = await import("@/lib/db/reviews")
  try {
    const reviews = await getReviews(userId, "received")
    return reviews.map(dbReviewToReview)
  } catch {
    return mockReviews.filter((r) => r.reviewedId === userId)
  }
}

/**
 * Récupère les conversations d'un utilisateur
 */
export async function fetchConversations(userId: string): Promise<Conversation[]> {
  if (USE_MOCK_DATA) {
    return mockConversations.filter((c) => c.participants.some((p) => p.id === userId))
  }

  // Pour les conversations, on utilise déjà le hook realtime
  // Cette fonction est principalement pour le fallback mock
  return mockConversations.filter((c) => c.participants.some((p) => p.id === userId))
}

// ========================================
// FONCTIONS D'ÉCRITURE
// ========================================

export interface CreateTripInput {
  userId: string
  departure: string
  departureCountry: string
  arrival: string
  arrivalCountry: string
  departureDate: string
  availableKg: number
  pricePerKg: number
  description?: string
  acceptedItems?: string[]
  rejectedItems?: string[]
}

/**
 * Crée un nouveau trajet
 */
export async function createNewTrip(input: CreateTripInput): Promise<Trip | null> {
  if (USE_MOCK_DATA) {
    // En mode mock, on simule juste un succès
    console.log("Mock: Creating trip", input)
    return null
  }

  const { createTrip } = await import("@/lib/db/trips")
  try {
    const trip = await createTrip({
      user_id: input.userId,
      departure: input.departure,
      departure_country: input.departureCountry,
      arrival: input.arrival,
      arrival_country: input.arrivalCountry,
      departure_date: input.departureDate,
      available_kg: input.availableKg,
      total_kg: input.availableKg,
      price_per_kg: input.pricePerKg,
      currency: "€",
      description: input.description || null,
      accepted_items: input.acceptedItems || [],
      rejected_items: input.rejectedItems || [],
      status: "active",
    })
    return dbTripToTrip(trip)
  } catch (error) {
    console.error("Failed to create trip:", error)
    return null
  }
}

export interface CreateBookingInput {
  tripId: string
  senderId: string
  kgRequested: number
  totalPrice: number
  itemDescription: string
}

/**
 * Crée une nouvelle réservation
 */
export async function createNewBooking(input: CreateBookingInput): Promise<Booking | null> {
  if (USE_MOCK_DATA) {
    console.log("Mock: Creating booking", input)
    return null
  }

  const { createBooking } = await import("@/lib/db/bookings")
  try {
    const booking = await createBooking({
      trip_id: input.tripId,
      sender_id: input.senderId,
      kg_requested: input.kgRequested,
      kg_confirmed: null,
      total_price: input.totalPrice,
      status: "pending",
      item_description: input.itemDescription,
      notes: null,
    })
    return dbBookingToBooking(booking)
  } catch (error) {
    console.error("Failed to create booking:", error)
    return null
  }
}

/**
 * Marque une notification comme lue
 */
export async function markNotificationRead(notificationId: string): Promise<void> {
  if (USE_MOCK_DATA) {
    console.log("Mock: Marking notification as read", notificationId)
    return
  }

  const { markNotificationAsRead } = await import("@/lib/db/notifications")
  try {
    await markNotificationAsRead(notificationId)
  } catch (error) {
    console.error("Failed to mark notification as read:", error)
  }
}

/**
 * Marque toutes les notifications comme lues
 */
export async function markAllNotificationsRead(userId: string): Promise<void> {
  if (USE_MOCK_DATA) {
    console.log("Mock: Marking all notifications as read for user", userId)
    return
  }

  const { markAllNotificationsAsRead } = await import("@/lib/db/notifications")
  try {
    await markAllNotificationsAsRead(userId)
  } catch (error) {
    console.error("Failed to mark all notifications as read:", error)
  }
}
