import { createClient } from "@/lib/supabase/client"
import type { DbTrip, DbTripInsert, DbTripUpdate } from "./types"

const PUBLIC_USER_COLUMNS =
  "id, name, avatar, bio, rating, review_count, verified, languages, response_rate, response_time, created_at"

export interface TripFilters {
  departure?: string
  arrival?: string
  departureCountry?: string
  arrivalCountry?: string
  dateFrom?: string
  dateTo?: string
  minKg?: number
  maxPrice?: number
  status?: string
}

// Client-side
export async function getTrips(filters?: TripFilters, page = 1, limit = 10) {
  const supabase = createClient()
  let query = supabase
    .from("trips")
    .select(`*, user:profiles(${PUBLIC_USER_COLUMNS})`, { count: "exact" })
    .order("created_at", { ascending: false })

  if (filters?.departure) {
    query = query.ilike("departure", `%${filters.departure}%`)
  }
  if (filters?.arrival) {
    query = query.ilike("arrival", `%${filters.arrival}%`)
  }
  if (filters?.departureCountry) {
    query = query.eq("departure_country", filters.departureCountry)
  }
  if (filters?.arrivalCountry) {
    query = query.eq("arrival_country", filters.arrivalCountry)
  }
  if (filters?.dateFrom) {
    query = query.gte("departure_date", filters.dateFrom)
  }
  if (filters?.dateTo) {
    query = query.lte("departure_date", filters.dateTo)
  }
  if (filters?.minKg) {
    query = query.gte("available_kg", filters.minKg)
  }
  if (filters?.maxPrice) {
    query = query.lte("price_per_kg", filters.maxPrice)
  }
  if (filters?.status) {
    query = query.eq("status", filters.status)
  } else {
    query = query.eq("status", "active")
  }

  const from = (page - 1) * limit
  const to = from + limit - 1
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) throw error
  return { trips: data as DbTrip[], total: count || 0 }
}

export async function getTrip(tripId: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from("trips").select(`*, user:profiles(${PUBLIC_USER_COLUMNS})`).eq("id", tripId).single()

  if (error) throw error
  return data as DbTrip
}

export async function getUserTrips(userId: string, filters?: TripFilters) {
  const supabase = createClient()
  let query = supabase
    .from("trips")
    .select(`*, user:profiles(${PUBLIC_USER_COLUMNS})`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }
  if (filters?.dateFrom) {
    query = query.gte("created_at", filters.dateFrom)
  }
  if (filters?.dateTo) {
    query = query.lte("created_at", filters.dateTo)
  }

  const { data, error } = await query

  if (error) throw error
  return data as DbTrip[]
}

export async function createTrip(trip: DbTripInsert) {
  const supabase = createClient()
  const { data, error } = await supabase.from("trips").insert(trip).select(`*, user:profiles(${PUBLIC_USER_COLUMNS})`).single()

  if (error) throw error
  return data as DbTrip
}

export async function updateTrip(tripId: string, updates: DbTripUpdate) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("trips")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", tripId)
    .select(`*, user:profiles(${PUBLIC_USER_COLUMNS})`)
    .single()

  if (error) throw error
  return data as DbTrip
}

export async function deleteTrip(tripId: string) {
  const supabase = createClient()
  const { error } = await supabase.from("trips").delete().eq("id", tripId)

  if (error) throw error
}

export async function incrementTripViews(tripId: string) {
  const supabase = createClient()
  const { error } = await supabase.rpc("increment_trip_views", { trip_id: tripId })
  if (error) {
    // Fallback si la fonction RPC n'existe pas
    const { data: trip } = await supabase.from("trips").select("views").eq("id", tripId).single()

    if (trip) {
      await supabase
        .from("trips")
        .update({ views: (trip.views || 0) + 1 })
        .eq("id", tripId)
    }
  }
}

