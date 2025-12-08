import { TripCard } from "@/components/trip/trip-card"
import { mockTrips } from "@/lib/mock-data"
import Link from "next/link"
import { ChevronRight } from "@/components/icons"

export function RecentTrips() {
  const recentTrips = mockTrips.slice(0, 6)

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Trajets récents</h2>
            <p className="text-muted-foreground">Les dernières annonces publiées par nos voyageurs</p>
          </div>
          <Link href="/trips" className="hidden md:flex items-center gap-1 text-sm font-medium hover:underline">
            Voir tous les trajets
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>

        <Link
          href="/trips"
          className="md:hidden flex items-center justify-center gap-1 text-sm font-medium mt-6 hover:underline"
        >
          Voir tous les trajets
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
