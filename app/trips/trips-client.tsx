"use client"

import { useData } from "@/lib/data-provider"
import { TripList } from "@/components/trip/trip-list"
import { Loader2 } from "@/components/icons"

export function TripsPageClient() {
  const { trips } = useData()

  // Filtrer uniquement les trajets actifs
  const activeTrips = trips.filter((t) => t.status === "active")

  return <TripList trips={activeTrips} />
}
