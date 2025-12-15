"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { ChevronRight, Loader2 } from "@/components/icons"
import { TripCard } from "@/components/trip/trip-card"
import { fetchTrips } from "@/lib/services/data-service"
import type { Trip } from "@/lib/types"

export function RecentTrips() {
  const { t } = useLanguage()
  const [recentTrips, setRecentTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTrips = async () => {
      setLoading(true)
      try {
        const allTrips = await fetchTrips()
        const sortedTrips = allTrips
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 6)
        setRecentTrips(sortedTrips)
      } catch (error) {
        console.error("Failed to fetch recent trips:", error)
      } finally {
        setLoading(false)
      }
    }
    loadTrips()
  }, [])

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t("home.recentTrips.title")}</h2>
            <p className="text-muted-foreground">{t("home.recentTrips.subtitle")}</p>
          </div>
          <Link href="/trips" className="hidden md:flex items-center gap-1 text-sm font-medium hover:underline">
            {t("home.recentTrips.seeAll")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}

        <Link
          href="/trips"
          className="md:hidden flex items-center justify-center gap-1 text-sm font-medium mt-6 hover:underline"
        >
          {t("home.recentTrips.seeAll")}
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
