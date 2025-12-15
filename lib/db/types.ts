// Types de base de données (correspondant aux tables Supabase)
export interface DbProfile {
  id: string
  name: string
  email: string | null
  phone: string | null
  whatsapp: string | null
  avatar: string | null
  bio: string | null
  rating: number
  review_count: number
  verified: boolean
  languages: string[]
  response_rate: number
  response_time: string | null
  role: 'user' | 'admin' | 'moderator'
  created_at: string
  updated_at: string
}

export interface DbTrip {
  id: string
  user_id: string
  departure: string
  departure_country: string
  departure_city_id: string | null
  arrival: string
  arrival_country: string
  arrival_city_id: string | null
  departure_date: string
  available_kg: number
  total_kg: number
  price_per_kg: number
  currency: string
  description: string | null
  accepted_items: string[]
  rejected_items: string[]
  status: "active" | "completed" | "cancelled" | "pending"
  views: number
  inquiries: number
  created_at: string
  updated_at: string
  // Relations
  user?: DbProfile
}

export interface DbBooking {
  id: string
  trip_id: string
  sender_id: string
  kg_requested: number
  kg_confirmed: number | null
  total_price: number
  status: "pending" | "confirmed" | "in_transit" | "delivered" | "cancelled"
  item_description: string
  notes: string | null
  created_at: string
  updated_at: string
  // Relations
  sender?: DbProfile
  trip?: DbTrip
}

export interface DbConversation {
  id: string
  trip_id: string | null
  created_at: string
  updated_at: string
  // Relations
  trip?: DbTrip
  participants?: DbConversationParticipant[]
  messages?: DbMessage[]
}

export interface DbConversationParticipant {
  id: string
  conversation_id: string
  user_id: string
  last_read_at: string | null
  created_at: string
  // Relations
  user?: DbProfile
}

export interface DbMessage {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  type: "text" | "image" | "system"
  read_by: string[]
  created_at: string
  // Relations
  sender?: DbProfile
}

export interface DbReview {
  id: string
  trip_id: string | null
  reviewer_id: string
  reviewed_id: string
  rating: number
  comment: string | null
  created_at: string
  // Relations
  reviewer?: DbProfile
  reviewed?: DbProfile
  trip?: DbTrip
}

export interface DbNotification {
  id: string
  user_id: string
  type: "booking" | "message" | "review" | "system" | "payment" | "reminder"
  title: string
  message: string
  read: boolean
  link: string | null
  metadata: Record<string, unknown>
  created_at: string
}

export interface DbUserSettings {
  id: string
  notifications_email: boolean
  notifications_push: boolean
  notifications_sms: boolean
  notifications_new_bookings: boolean
  notifications_messages: boolean
  notifications_reviews: boolean
  notifications_promotions: boolean
  notifications_reminders: boolean
  privacy_show_phone: boolean
  privacy_show_email: boolean
  privacy_show_last_seen: boolean
  privacy_allow_search_engines: boolean
  preferences_language: string
  preferences_currency: string
  preferences_timezone: string
  preferences_dark_mode: boolean
  created_at: string
  updated_at: string
}

// Types pour les insertions/updates
export type DbProfileInsert = Omit<DbProfile, "created_at" | "updated_at" | "rating" | "review_count">
export type DbProfileUpdate = Partial<Omit<DbProfile, "id" | "created_at">>

export type DbTripInsert = Omit<DbTrip, "id" | "created_at" | "updated_at" | "views" | "inquiries" | "user">
export type DbTripUpdate = Partial<Omit<DbTrip, "id" | "user_id" | "created_at" | "user">>

export type DbBookingInsert = Omit<DbBooking, "id" | "created_at" | "updated_at" | "sender" | "trip">
export type DbBookingUpdate = Partial<
  Omit<DbBooking, "id" | "trip_id" | "sender_id" | "created_at" | "sender" | "trip">
>

export type DbMessageInsert = Omit<DbMessage, "id" | "created_at" | "read" | "sender">
export type DbReviewInsert = Omit<DbReview, "id" | "created_at" | "reviewer" | "reviewed" | "trip">
export type DbNotificationInsert = Omit<DbNotification, "id" | "created_at" | "read">
export type DbUserSettingsUpdate = Partial<Omit<DbUserSettings, "id" | "created_at">>
