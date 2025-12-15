import { createClient } from "@/lib/supabase/server"
import type { DbTrip } from "./types"
import type { TripFilters } from "./trips"

const PUBLIC_USER_COLUMNS =
  "id, name, avatar, bio, rating, review_count, verified, languages, response_rate, response_time, created_at"

export async function getTripsServer(filters?: TripFilters, page = 1, limit = 10) {
  const supabase = await createClient()
  let query = supabase
    .from("trips")
    .select(`*, user:profiles(${PUBLIC_USER_COLUMNS})`, { count: "exact" })
    .order("created_at", { ascending: false })
    .eq("status", "active")

  if (filters?.departure) {
    query = query.ilike("departure", `%${filters.departure}%`)
  }
  if (filters?.arrival) {
    query = query.ilike("arrival", `%${filters.arrival}%`)
  }

  const from = (page - 1) * limit
  const to = from + limit - 1
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) throw error
  return { trips: data as DbTrip[], total: count || 0 }
}

export async function getTripServer(tripId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("trips").select(`*, user:profiles(${PUBLIC_USER_COLUMNS})`).eq("id", tripId).single()

  if (error) throw error
  return data as DbTrip
}
