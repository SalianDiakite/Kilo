"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { X, MapPin, Weight } from "@/components/icons"
import { countries } from "@/lib/mock-data"

interface TripFiltersProps {
  onClose: () => void
}

export function TripFilters({ onClose }: TripFiltersProps) {
  const [departure, setDeparture] = useState("")
  const [arrival, setArrival] = useState("")
  const [minKg, setMinKg] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Filtrer les trajets</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              Départ
            </Label>
            <select
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            >
              <option value="">Tous les pays</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              Arrivée
            </Label>
            <select
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            >
              <option value="">Tous les pays</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Weight className="h-3 w-3" />
              Kilos minimum
            </Label>
            <Input type="number" placeholder="Ex: 5" value={minKg} onChange={(e) => setMinKg(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Prix max (€/kg)</Label>
            <Input type="number" placeholder="Ex: 15" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" onClick={onClose}>
            Réinitialiser
          </Button>
          <Button size="sm">Appliquer</Button>
        </div>
      </CardContent>
    </Card>
  )
}
