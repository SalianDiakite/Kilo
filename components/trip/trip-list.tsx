"use client"

import { useState } from "react"
import type { Trip } from "@/lib/types"
import { TripCard } from "./trip-card"
import { Button } from "@/components/ui/button"
import { Filter, SlidersHorizontal } from "@/components/icons"
import { TripFilters } from "./trip-filters"

interface TripListProps {
  trips: Trip[]
  showFilters?: boolean
}

export function TripList({ trips, showFilters = true }: TripListProps) {
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div>
      {showFilters && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{trips.length}</span> trajets disponibles
          </p>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtres
          </Button>
        </div>
      )}

      {filtersOpen && <TripFilters onClose={() => setFiltersOpen(false)} />}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>

      {trips.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <Filter className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold mb-2">Aucun trajet trouvé</h3>
          <p className="text-sm text-muted-foreground">Essayez de modifier vos critères de recherche</p>
        </div>
      )}
    </div>
  )
}
