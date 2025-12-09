"use client"

import { useData } from "@/lib/data-provider"
import { TripList } from "@/components/trip/trip-list"
import { Loader2 } from "@/components/icons"

export function TripsPageClient() {
  const { trips, loading } = useData()

  // Filtrer uniquement les trajets actifs
  const activeTrips = trips.filter((t) => t.status === "active")

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  return <TripList trips={activeTrips} />
}
