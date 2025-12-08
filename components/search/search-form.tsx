"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, Search, ArrowRight } from "@/components/icons"
import { countries } from "@/lib/mock-data"

export function SearchForm() {
  const router = useRouter()
  const [departure, setDeparture] = useState("")
  const [arrival, setArrival] = useState("")
  const [date, setDate] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/trips")
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_auto] divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Departure */}
          <div className="p-4 md:p-5">
            <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-accent" />
              Départ
            </label>
            <select
              className="w-full bg-transparent text-base font-medium focus:outline-none appearance-none cursor-pointer"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            >
              <option value="">Choisir un pays</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center px-2">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Arrival */}
          <div className="p-4 md:p-5">
            <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-foreground" />
              Arrivée
            </label>
            <select
              className="w-full bg-transparent text-base font-medium focus:outline-none appearance-none cursor-pointer"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            >
              <option value="">Choisir un pays</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="p-4 md:p-5">
            <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              Date
            </label>
            <input
              type="date"
              className="w-full bg-transparent text-base font-medium focus:outline-none cursor-pointer"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <div className="p-4 md:p-3 flex items-center">
            <Button type="submit" size="lg" className="w-full md:w-auto gap-2 h-12 px-6">
              <Search className="h-5 w-5" />
              <span className="md:hidden lg:inline">Rechercher</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
