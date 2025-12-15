"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { X, MapPin, Weight } from "@/components/icons"
import { getCountries, type Country } from "@/lib/db/countries"

interface TripFiltersProps {
  filters: {
    departure: string
    arrival: string
    minKg: string
    maxPrice: string
  }
  onFilterChange: (filterName: string, value: string) => void
  onClose: () => void
  onReset: () => void
}

export function TripFilters({ filters, onFilterChange, onClose, onReset }: TripFiltersProps) {
  const { t, language } = useLanguage()
  const [countries, setCountries] = useState<Country[]>([])

  useEffect(() => {
    async function fetchCountries() {
      const countryList = await getCountries()
      setCountries(countryList)
    }
    fetchCountries()
  }, [])

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">{t("trip.filters.title")}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              {t("trip.filters.departure")}
            </Label>
            <select
              className="w-full h-10 px-3 rounded-lg border border-input bg-background"
              value={filters.departure}
              onChange={(e) => onFilterChange("departure", e.target.value)}
            >
              <option value="">{t("trip.filters.allCountries")}</option>
              {countries.map((country) => {
                const name = language === 'en' ? country.nameEn || country.name : country.name
                return (
                  <option key={country.id} value={name}>
                    {name}
                  </option>
                )
              })}
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              {t("trip.filters.arrival")}
            </Label>
            <select
              className="w-full h-10 px-3 rounded-lg border border-input bg-background"
              value={filters.arrival}
              onChange={(e) => onFilterChange("arrival", e.target.value)}
            >
              <option value="">{t("trip.filters.allCountries")}</option>
              {countries.map((country) => {
                const name = language === 'en' ? country.nameEn || country.name : country.name
                return (
                  <option key={country.id} value={name}>
                    {name}
                  </option>
                )
              })}
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Weight className="h-3 w-3" />
              {t("trip.filters.minKg")}
            </Label>
            <Input
              type="number"
              placeholder={t("trip.filters.minKgPlaceholder")}
              value={filters.minKg}
              onChange={(e) => onFilterChange("minKg", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">{t("trip.filters.maxPrice")}</Label>
            <Input
              type="number"
              placeholder={t("trip.filters.maxPricePlaceholder")}
              value={filters.maxPrice}
              onChange={(e) => onFilterChange("maxPrice", e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" onClick={onReset}>
            {t("trip.filters.reset")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

