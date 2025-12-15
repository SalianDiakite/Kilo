export type UserRole = 'user' | 'admin' | 'moderator'

export interface User {
  id: string
  name: string
  email?: string
  phone?: string
  whatsapp?: string
  avatar?: string
  bio?: string
  rating: number
  reviewCount: number
  verified: boolean
  createdAt: Date
  languages?: string[]
  responseRate?: number
  responseTime?: string
  role?: UserRole
}

export type TransportTypeCode = 'plane' | 'train' | 'bus' | 'car' | 'boat'

export interface Trip {
  id: string
  userId: string
  user: User
  departure: string
  departureCountry: string
  departureCityId?: string      // Lien vers table cities (optionnel pour migration)
  arrival: string
  arrivalCountry: string
  arrivalCityId?: string        // Lien vers table cities (optionnel pour migration)
  departureDate: Date
  availableKg: number
  totalKg: number
  pricePerKg: number
  currency: string
  description?: string
  acceptedItems: string[]
  rejectedItems: string[]
  createdAt: Date
  status: "active" | "completed" | "cancelled" | "pending"
  transportType?: TransportTypeCode  // avion, train, bus, etc.
  transportTypeId?: string      // Lien vers table transport_types
  bookings?: Booking[]
  views?: number
  inquiries?: number
}

export interface Booking {
  id: string
  tripId: string
  senderId: string
  sender: User
  kgRequested: number
  kgConfirmed?: number
  totalPrice: number
  status: "pending" | "confirmed" | "in_transit" | "delivered" | "cancelled"
  itemDescription: string
  createdAt: Date
  updatedAt: Date
  notes?: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  tripId: string
  content: string
  createdAt: Date
  read: boolean
  type?: "text" | "image" | "system"
}

export interface Conversation {
  id: string
  tripId: string
  trip: Trip
  participants: User[]
  messages: Message[]
  lastMessage?: Message
  unreadCount: number
  createdAt: Date
}

export interface Notification {
  id: string
  userId: string
  type: "booking" | "message" | "review" | "system" | "payment" | "reminder"
  title: string
  message: string
  read: boolean
  createdAt: Date
  link?: string
  metadata?: {
    tripId?: string
    bookingId?: string
    senderId?: string
    senderAvatar?: string
    senderName?: string
  }
}

export interface Review {
  id: string
  tripId: string
  reviewerId: string
  reviewer: User
  reviewedId: string
  rating: number
  comment: string
  createdAt: Date
}

export interface UserSettings {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    newBookings: boolean
    messages: boolean
    reviews: boolean
    promotions: boolean
    reminders: boolean
  }
  privacy: {
    showPhone: boolean
    showEmail: boolean
    showLastSeen: boolean
    allowSearchEngines: boolean
  }
  preferences: {
    language: string
    currency: string
    timezone: string
    darkMode: boolean
  }
}
