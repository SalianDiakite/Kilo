"use client"

import { useEffect } from "react"
import { incrementTripViews } from "@/lib/db/trips"

interface TripViewTrackerProps {
  tripId: string
}

export function TripViewTracker({ tripId }: TripViewTrackerProps) {
  useEffect(() => {
    if (tripId) {
      // We don't need to await this, let it run in the background
      incrementTripViews(tripId)
    }
  }, [tripId])

  return null
}
