"use client"

import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import {
  getBooking,
  getTripBookings,
  getUserBookings,
  createBooking,
  updateBooking,
  confirmBooking,
  cancelBooking,
} from "@/lib/db/bookings"
import type { DbBookingInsert, DbBookingUpdate } from "@/lib/db/types"

export function useBooking(bookingId: string | null) {
  return useSWR(bookingId ? ["booking", bookingId] : null, () => (bookingId ? getBooking(bookingId) : null), {
    revalidateOnFocus: false,
  })
}

export function useTripBookings(tripId: string | null) {
  return useSWR(tripId ? ["trip-bookings", tripId] : null, () => (tripId ? getTripBookings(tripId) : null), {
    revalidateOnFocus: false,
  })
}

export function useUserBookings(userId: string | null, role: "sender" | "owner") {
  return useSWR(
    userId ? ["user-bookings", userId, role] : null,
    () => (userId ? getUserBookings(userId, role) : null),
    { revalidateOnFocus: false },
  )
}

export function useCreateBooking() {
  return useSWRMutation("bookings", async (_key: string, { arg }: { arg: DbBookingInsert }) => createBooking(arg))
}

export function useUpdateBooking(bookingId: string) {
  return useSWRMutation(["booking", bookingId], async (_key: string[], { arg }: { arg: DbBookingUpdate }) =>
    updateBooking(bookingId, arg),
  )
}

export function useConfirmBooking() {
  return useSWRMutation(
    "bookings",
    async (_key: string, { arg }: { arg: { bookingId: string; kgConfirmed?: number } }) =>
      confirmBooking(arg.bookingId, arg.kgConfirmed),
  )
}

export function useCancelBooking() {
  return useSWRMutation("bookings", async (_key: string, { arg }: { arg: string }) => cancelBooking(arg))
}
