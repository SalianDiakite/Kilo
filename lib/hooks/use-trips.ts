"use client"

import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import { getTrips, getTrip, getUserTrips, createTrip, updateTrip, deleteTrip, type TripFilters } from "@/lib/db/trips"
import type { DbTripInsert, DbTripUpdate } from "@/lib/db/types"

// Hook pour récupérer les trajets avec filtres
export function useTrips(filters?: TripFilters, page = 1) {
  const key = filters ? ["trips", filters, page] : ["trips", {}, page]

  return useSWR(key, () => getTrips(filters, page), {
    revalidateOnFocus: false,
  })
}

// Hook pour récupérer un trajet spécifique
export function useTrip(tripId: string | null) {
  return useSWR(tripId ? ["trip", tripId] : null, () => (tripId ? getTrip(tripId) : null), { revalidateOnFocus: false })
}

// Hook pour récupérer les trajets d'un utilisateur
export function useUserTrips(userId: string | null, status?: string) {
  return useSWR(userId ? ["user-trips", userId, status] : null, () => (userId ? getUserTrips(userId, status) : null), {
    revalidateOnFocus: false,
  })
}

// Hook pour créer un trajet
export function useCreateTrip() {
  return useSWRMutation("trips", async (_key: string, { arg }: { arg: DbTripInsert }) => createTrip(arg))
}

// Hook pour mettre à jour un trajet
export function useUpdateTrip(tripId: string) {
  return useSWRMutation(["trip", tripId], async (_key: string[], { arg }: { arg: DbTripUpdate }) =>
    updateTrip(tripId, arg),
  )
}

// Hook pour supprimer un trajet
export function useDeleteTrip() {
  return useSWRMutation("trips", async (_key: string, { arg }: { arg: string }) => deleteTrip(arg))
}
