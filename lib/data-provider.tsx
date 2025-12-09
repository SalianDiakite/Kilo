"use client"

import type React from "react"

import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react"
import { useAuth } from "@/lib/hooks/use-auth"
import { mockTrips, mockUsers, mockConversations, mockBookings, mockNotifications, mockReviews } from "@/lib/mock-data"
import type { Trip, User, Conversation, Booking, Notification, Review } from "@/lib/types"
import {
  USE_MOCK_DATA,
  dbProfileToUser,
  fetchTrips,
  fetchUserTrips,
  fetchUserBookings,
  fetchNotifications,
  fetchUserReviews,
  createNewTrip,
  type CreateTripInput,
} from "@/lib/services/data-service"

/**
 * DataProvider - Fournit les données de l'application
 * 
 * Basculement automatique entre données mock et Supabase:
 * - Modifiez USE_MOCK_DATA dans lib/services/data-service.ts pour basculer
 * - Quand USE_MOCK_DATA = true: utilise les données mockées
 * - Quand USE_MOCK_DATA = false: utilise Supabase avec fallback sur mock si erreur
 */

interface DataContextType {
  // Auth
  currentUser: User | null
  isAuthenticated: boolean
  loading: boolean

  // Data
  trips: Trip[]
  users: User[]
  conversations: Conversation[]
  bookings: Booking[]
  notifications: Notification[]
  reviews: Review[]

  // Actions
  refreshTrips: () => Promise<void>
  refreshNotifications: () => Promise<void>
  createTrip: (input: CreateTripInput) => Promise<Trip | null>

  // Helpers
  useMockData: boolean
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user, profile, loading: authLoading, isAuthenticated: authIsAuthenticated } = useAuth()

  // State pour les données
  const [trips, setTrips] = useState<Trip[]>(mockTrips)
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [dataLoading, setDataLoading] = useState(false)

  // Utilisateur courant
  const currentUser = useMemo(() => {
    if (USE_MOCK_DATA) {
      return mockUsers[0] // Mock current user
    }
    if (profile) {
      return dbProfileToUser(profile)
    }
    return null
  }, [profile])

  const currentUserId = USE_MOCK_DATA ? "1" : user?.id

  // Charger les données au montage
  useEffect(() => {
    const loadData = async () => {
      if (!currentUserId) return
      
      setDataLoading(true)
      try {
        const [tripsData, bookingsData, notifsData, reviewsData] = await Promise.all([
          fetchTrips(),
          fetchUserBookings(currentUserId, "owner"),
          fetchNotifications(currentUserId),
          fetchUserReviews(currentUserId),
        ])
        
        setTrips(tripsData)
        setBookings(bookingsData)
        setNotifications(notifsData)
        setReviews(reviewsData)
      } catch (error) {
        console.error("Error loading data:", error)
        // En cas d'erreur, on garde les données mock
      } finally {
        setDataLoading(false)
      }
    }

    loadData()
  }, [currentUserId])

  // Actions
  const refreshTrips = useCallback(async () => {
    try {
      const tripsData = await fetchTrips()
      setTrips(tripsData)
    } catch (error) {
      console.error("Error refreshing trips:", error)
    }
  }, [])

  const refreshNotifications = useCallback(async () => {
    if (!currentUserId) return
    try {
      const notifsData = await fetchNotifications(currentUserId)
      setNotifications(notifsData)
    } catch (error) {
      console.error("Error refreshing notifications:", error)
    }
  }, [currentUserId])

  const handleCreateTrip = useCallback(async (input: CreateTripInput): Promise<Trip | null> => {
    const trip = await createNewTrip(input)
    if (trip) {
      setTrips(prev => [trip, ...prev])
    }
    return trip
  }, [])

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: USE_MOCK_DATA ? true : authIsAuthenticated,
      loading: USE_MOCK_DATA ? false : (authLoading || dataLoading),
      trips,
      users: mockUsers, // Les users autres que currentUser restent mock pour l'instant
      conversations: mockConversations, // Géré par useRealtimeMessages séparément
      bookings,
      notifications,
      reviews,
      refreshTrips,
      refreshNotifications,
      createTrip: handleCreateTrip,
      useMockData: USE_MOCK_DATA,
    }),
    [currentUser, authIsAuthenticated, authLoading, dataLoading, trips, bookings, notifications, reviews, refreshTrips, refreshNotifications, handleCreateTrip],
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
