"use client"

import type React from "react"

import { createContext, useContext, useMemo } from "react"
import { useAuth } from "@/lib/hooks/use-auth"
import { mockTrips, mockUsers, mockConversations, mockBookings, mockNotifications, mockReviews } from "@/lib/mock-data"
import type { Trip, User, Conversation, Booking, Notification, Review } from "@/lib/types"

// Ce provider permet de basculer entre données mock et données Supabase
// Pour l'instant, on utilise les données mock car la base est vide

interface DataContextType {
  // Auth
  currentUser: User | null
  isAuthenticated: boolean
  loading: boolean

  // Data (mock pour l'instant)
  trips: Trip[]
  users: User[]
  conversations: Conversation[]
  bookings: Booking[]
  notifications: Notification[]
  reviews: Review[]

  // Helpers
  useMockData: boolean
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, isAuthenticated } = useAuth()

  // Pour l'instant, on utilise les données mock
  // Quand la base sera peuplée, on basculera sur les vraies données
  const useMockData = true

  const currentUser = useMemo(() => {
    if (useMockData) {
      return mockUsers[0] // Mock current user
    }
    if (profile) {
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
      } as User
    }
    return null
  }, [profile, useMockData])

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: useMockData ? true : isAuthenticated,
      loading: useMockData ? false : loading,
      trips: mockTrips,
      users: mockUsers,
      conversations: mockConversations,
      bookings: mockBookings,
      notifications: mockNotifications,
      reviews: mockReviews,
      useMockData,
    }),
    [currentUser, isAuthenticated, loading, useMockData],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
