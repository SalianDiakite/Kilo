"use client"

import { useState, useMemo } from "react"
import type { Trip } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { TripCard } from "./trip-card"
import { Button } from "@/components/ui/button"
import { Filter, SlidersHorizontal } from "@/components/icons"
import { TripFilters } from "./trip-filters"

interface TripListProps {
  trips: Trip[]
  showFilters?: boolean
}

export function TripList({ trips, showFilters = true }: TripListProps) {
  const { t } = useLanguage()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    departure: "",
    arrival: "",
    minKg: "",
    maxPrice: "",
  })

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      if (filters.departure && trip.departureCountry !== filters.departure) {
        return false
      }
      if (filters.arrival && trip.arrivalCountry !== filters.arrival) {
        return false
      }
      if (filters.minKg && trip.availableKg < Number(filters.minKg)) {
        return false
      }
      if (filters.maxPrice && trip.pricePerKg > Number(filters.maxPrice)) {
        return false
      }
      return true
    })
  }, [trips, filters])

  const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }))
  }

  const resetFilters = () => {
    setFilters({
      departure: "",
      arrival: "",
      minKg: "",
      maxPrice: "",
    })
  }

  return (
    <div>
      {showFilters && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{filteredTrips.length}</span> {t("trip.list.availableTrips")}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t("trip.list.filters")}
          </Button>
        </div>
      )}

      {filtersOpen && (
        <TripFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClose={() => setFiltersOpen(false)}
          onReset={resetFilters}
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>

      {filteredTrips.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <Filter className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold mb-2">{t("trip.list.noTripsFound")}</h3>
          <p className="text-sm text-muted-foreground">{t("trip.list.noTripsFoundDesc")}</p>
        </div>
      )}
    </div>
  )
}
