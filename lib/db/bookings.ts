import { createClient } from "@/lib/supabase/client"
import type { DbBooking, DbBookingInsert, DbBookingUpdate } from "./types"

export async function getBooking(bookingId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("bookings")
    .select("*, sender:profiles(*), trip:trips(*, user:profiles(*))")
    .eq("id", bookingId)
    .single()

  if (error) throw error
  return data as DbBooking
}

export async function getTripBookings(tripId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("bookings")
    .select("*, sender:profiles(*)")
    .eq("trip_id", tripId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as DbBooking[]
}

export async function getUserBookings(userId: string, role: "sender" | "owner") {
  const supabase = createClient()

  if (role === "sender") {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, trip:trips(*, user:profiles(*))")
      .eq("sender_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data as DbBooking[]
  } else {
    // Pour le propriétaire, récupérer toutes les réservations de ses trajets
    const { data, error } = await supabase
      .from("bookings")
      .select("*, sender:profiles(*), trip:trips!inner(*)")
      .eq("trip.user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data as DbBooking[]
  }
}

export async function createBooking(booking: DbBookingInsert) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("bookings")
    .insert(booking)
    .select("*, sender:profiles(*), trip:trips(*, user:profiles(*))")
    .single()

  if (error) throw error
  return data as DbBooking
}

export async function updateBooking(bookingId: string, updates: DbBookingUpdate) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("bookings")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", bookingId)
    .select("*, sender:profiles(*), trip:trips(*, user:profiles(*))")
    .single()

  if (error) throw error
  return data as DbBooking
}

export async function cancelBooking(bookingId: string) {
  return updateBooking(bookingId, { status: "cancelled" })
}

export async function confirmBooking(bookingId: string, kgConfirmed?: number) {
  const updates: DbBookingUpdate = { status: "confirmed" }
  if (kgConfirmed !== undefined) {
    updates.kg_confirmed = kgConfirmed
  }
  return updateBooking(bookingId, updates)
}
