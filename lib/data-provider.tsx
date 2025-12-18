"use client"

import type React from "react"

import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react"
import { useAuth } from "@/lib/hooks/use-auth"
import { useRealtimeConversations } from "@/lib/hooks/use-realtime-messages"
import { mockTrips, mockUsers, mockBookings, mockNotifications, mockReviews } from "@/lib/mock-data"
import type { Trip, User, Conversation, Booking, Notification, Review } from "@/lib/types"
import type { Country } from "@/lib/db/countries"
import type { Currency } from "@/lib/db/currencies"
import {
  USE_MOCK_DATA,
  dbProfileToUser,
  fetchTrips,
  fetchUserTrips,
  fetchUserBookings,
  fetchNotifications,
  fetchUserReviews,
  fetchCountries,
  fetchCurrencies,
  createNewTrip,
  type CreateTripInput,
  createNewReview,
  type CreateReviewInput,
  updateUserProfile,
  uploadUserAvatar,
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
  bookings: Booking[]
  notifications: Notification[]
  reviews: Review[]
  countries: Country[]
  currencies: Currency[]
  totalUnreadMessages: number
  totalUnreadNotifications: number

  // Actions
  refreshTrips: () => Promise<void>
  refreshNotifications: () => Promise<void>
  refreshBookings: () => Promise<void>
  createTrip: (input: CreateTripInput) => Promise<Trip | null>
  createReview: (input: CreateReviewInput) => Promise<Review | null>
  updateUserProfile: (updates: Partial<User>) => Promise<boolean>
  uploadProfileAvatar: (file: File) => Promise<boolean>
  markNotificationRead: (id: string) => Promise<void>
  markAllNotificationsRead: () => Promise<void>
  deleteNotification: (id: string) => Promise<void>

  // Helpers
  useMockData: boolean
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user, profile, loading: authLoading, isAuthenticated: authIsAuthenticated, refreshProfile } = useAuth()

  // State pour les données
  const [trips, setTrips] = useState<Trip[]>(USE_MOCK_DATA ? mockTrips : [])
  const [bookings, setBookings] = useState<Booking[]>(USE_MOCK_DATA ? mockBookings : [])
  const [notifications, setNotifications] = useState<Notification[]>(USE_MOCK_DATA ? mockNotifications : [])
  const [reviews, setReviews] = useState<Review[]>(USE_MOCK_DATA ? mockReviews : [])
  const [countries, setCountries] = useState<Country[]>([])
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [dataLoading, setDataLoading] = useState(false)

  // Realtime conversations
  const { conversations } = useRealtimeConversations(USE_MOCK_DATA ? "1" : user?.id ?? null)
  const totalUnreadMessages = useMemo(() => {
    if (USE_MOCK_DATA) return 2 // Mock value
    return conversations.reduce((acc, c) => acc + (c.unread_count || 0), 0)
  }, [conversations])

  const totalUnreadNotifications = useMemo(() => {
    return notifications.filter(n => !n.read).length
  }, [notifications])

  // Utilisateur courant
  const currentUser = useMemo(() => {
    if (USE_MOCK_DATA) {
      return mockUsers[0] // Mock current user
    }
    if (profile) {
      console.log("DataProvider - Derived currentUser from profile:", profile.id)
      return dbProfileToUser(profile)
    }
    
    // Fallback: Use auth user data if profile is still loading (prevents empty UI)
    if (user && !USE_MOCK_DATA) {
      console.log("DataProvider - Using auth user fallback while profile loads")
      return {
        id: user.id,
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
        email: user.email,
        rating: 0,
        reviewCount: 0,
        verified: false,
        createdAt: new Date(user.created_at),
        languages: [],
        responseRate: 0
      } as User
    }

    console.log("DataProvider - No profile available to derive currentUser")
    return null
  }, [profile, user])

  const currentUserId = USE_MOCK_DATA ? "1" : user?.id

  // Charger les données au montage
  useEffect(() => {
    const loadData = async () => {
      setDataLoading(true)
      try {
        if (currentUserId) {
          // Utilisateur connecté : charger toutes les données
          const [tripsData, ownerBookings, senderBookings, notifsData, reviewsData, countriesData, currenciesData] = await Promise.all([
            fetchTrips(),
            fetchUserBookings(currentUserId, "owner"),
            fetchUserBookings(currentUserId, "sender"),
            fetchNotifications(currentUserId),
            fetchUserReviews(currentUserId),
            fetchCountries(),
            fetchCurrencies(),
          ])
          
          // Merge bookings and remove duplicates if any
          const allBookings = [...ownerBookings]
          senderBookings.forEach(sb => {
            if (!allBookings.some(b => b.id === sb.id)) {
              allBookings.push(sb)
            }
          })

          setTrips(tripsData)
          setBookings(allBookings)
          setNotifications(notifsData)
          setReviews(reviewsData)
          setCountries(countriesData)
          setCurrencies(currenciesData)
        } else {
          // Mode public : charger uniquement les données accessibles
          const [tripsData, countriesData, currenciesData] = await Promise.all([
            fetchTrips(),
            fetchCountries(),
            fetchCurrencies(),
          ])
          
          setTrips(tripsData)
          setCountries(countriesData)
          setCurrencies(currenciesData)
          
          // Réinitialiser les données privées
          setBookings([])
          setNotifications([])
          setReviews([])
        }
      } catch (error) {
        console.error("Error loading data:", error)
        // En cas d'erreur, on garde les données mock si activé
      } finally {
        setDataLoading(false)
      }
    }

    // Charger les données si on est en mode réel ou pour recharger
    // Note: Si USE_MOCK_DATA est true, on a déjà les données via useState
    // mais on laisse loadData potentiellement faire autre chose si besoin
    if (!USE_MOCK_DATA) {
      loadData()
    } else {
      // Load mock countries and currencies if using mock data
      fetchCountries().then(setCountries)
      fetchCurrencies().then(setCurrencies)
    }
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

  const refreshBookings = useCallback(async () => {
    if (!currentUserId) return
    try {
      const [ownerBookings, senderBookings] = await Promise.all([
        fetchUserBookings(currentUserId, "owner"),
        fetchUserBookings(currentUserId, "sender"),
      ])
      const allBookings = [...ownerBookings]
      senderBookings.forEach(sb => {
        if (!allBookings.some(b => b.id === sb.id)) {
          allBookings.push(sb)
        }
      })
      setBookings(allBookings)
    } catch (error) {
      console.error("Error refreshing bookings:", error)
    }
  }, [currentUserId])

  const handleCreateTrip = useCallback(async (input: CreateTripInput): Promise<Trip | null> => {
    const trip = await createNewTrip(input)
    if (trip) {
      setTrips(prev => [trip, ...prev])
    }
    return trip
  }, [])

  const handleCreateReview = useCallback(async (input: CreateReviewInput): Promise<Review | null> => {
    const review = await createNewReview(input)
    if (review) {
      setReviews(prev => [review, ...prev])
      // Update local user rating if needed, but easier to just refresh reviews or rely on optimistic update
    }
    return review
  }, [])

  const handleUpdateProfile = useCallback(async (updates: Partial<User>): Promise<boolean> => {
    if (!currentUserId || !profile) return false
    try {
      // Optimistic update done in DataService for mock, but here we can force refresh auth profile
      // For now, assume success and maybe refresh auth?
      await updateUserProfile(currentUserId, updates)
      await refreshProfile()
      return true
    } catch (error) {
      console.error("Error updating profile:", error)
      return false
    }
  }, [currentUserId, profile])

  const handleUploadAvatar = useCallback(async (file: File): Promise<boolean> => {
    if (!currentUserId) return false
    try {
      await uploadUserAvatar(currentUserId, file)
      await refreshProfile()
      return true
    } catch (error) {
      console.error("Error uploading avatar:", error)
      return false
    }
  }, [currentUserId])

  const handleMarkNotificationRead = useCallback(async (id: string) => {
    // Optimistic update
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    
    try {
      const { markNotificationRead } = await import("@/lib/services/data-service")
      await markNotificationRead(id)
    } catch (error) {
      console.error("Error marking notification as read:", error)
      // Revert optimistic update? For now just log
    }
  }, [])

  const handleMarkAllNotificationsRead = useCallback(async () => {
    if (!currentUserId) return
    
    // Optimistic update
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    
    try {
      const { markAllNotificationsRead } = await import("@/lib/services/data-service")
      await markAllNotificationsRead(currentUserId)
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }, [currentUserId])

  const handleDeleteNotification = useCallback(async (id: string) => {
    // Optimistic update
    setNotifications(prev => prev.filter(n => n.id !== id))
    
    try {
      const { removeNotification } = await import("@/lib/services/data-service")
      await removeNotification(id)
    } catch (error) {
      console.error("Error deleting notification:", error)
    }
  }, [])

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: USE_MOCK_DATA ? true : authIsAuthenticated,
      loading: USE_MOCK_DATA ? false : (authLoading || dataLoading),
      trips,
      users: mockUsers, // Les users autres que currentUser restent mock pour l'instant
      conversations,
      bookings,
      notifications,
      reviews,
      countries,
      currencies,
      totalUnreadMessages,
      totalUnreadNotifications,
      refreshTrips,
      refreshNotifications,
      refreshBookings,
      createTrip: handleCreateTrip,
      createReview: handleCreateReview,
      updateUserProfile: handleUpdateProfile,
      uploadProfileAvatar: handleUploadAvatar,
      markNotificationRead: handleMarkNotificationRead,
      markAllNotificationsRead: handleMarkAllNotificationsRead,
      deleteNotification: handleDeleteNotification,
      useMockData: USE_MOCK_DATA,
    }),
    [currentUser, authIsAuthenticated, authLoading, dataLoading, trips, conversations, bookings, notifications, reviews, countries, currencies, totalUnreadMessages, totalUnreadNotifications, refreshTrips, refreshNotifications, refreshBookings, handleCreateTrip, handleCreateReview, handleUpdateProfile, handleUploadAvatar, refreshProfile],
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
