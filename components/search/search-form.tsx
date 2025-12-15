"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useData } from "@/lib/data-provider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, ArrowRight } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"

export function SearchForm() {
  const router = useRouter()
  const { t, language } = useLanguage()

  const { countries } = useData()
  const [departure, setDeparture] = useState("")
  const [arrival, setArrival] = useState("")
  const [date, setDate] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (departure) params.set("from", departure)
    if (arrival) params.set("to", arrival)
    if (date) params.set("date", date)
    
    router.push(`/trips?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_auto] divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Departure */}
          <div className="p-4 md:p-5">
            <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-accent" />
              {t("hero.departure")}
            </label>
            <Select value={departure} onValueChange={setDeparture}>
              <SelectTrigger className="w-full h-auto p-0 border-0 bg-transparent text-base font-medium focus:ring-0 shadow-none hover:bg-transparent [&>span]:line-clamp-1">
                <SelectValue placeholder={t("searchForm.chooseCountry")} />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => {
                  const name = language === "en" ? country.nameEn || country.name : country.name
                  return (
                    <SelectItem key={country.id} value={name}>
                      <span className="flex items-center gap-2">
                         <span>{country.flag}</span>
                         <span>{name}</span>
                      </span>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center px-2">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Arrival */}
          <div className="p-4 md:p-5">
            <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-foreground" />
              {t("hero.arrival")}
            </label>
            <Select value={arrival} onValueChange={setArrival}>
              <SelectTrigger className="w-full h-auto p-0 border-0 bg-transparent text-base font-medium focus:ring-0 shadow-none hover:bg-transparent [&>span]:line-clamp-1">
                <SelectValue placeholder={t("searchForm.chooseCountry")} />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => {
                  const name = language === "en" ? country.nameEn || country.name : country.name
                  return (
                    <SelectItem key={country.id} value={name}>
                      <span className="flex items-center gap-2">
                         <span>{country.flag}</span>
                         <span>{name}</span>
                      </span>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="p-4 md:p-5">
            <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {t("hero.date")}
            </label>
            <input
              type="date"
              className="w-full bg-transparent text-base font-medium focus:outline-none cursor-pointer dark:[color-scheme:dark]"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <div className="p-4 md:p-3 flex items-center">
            <Button type="submit" size="lg" className="w-full md:w-auto gap-2 h-12 px-6">
              <Search className="h-5 w-5" />
              <span className="md:hidden lg:inline">{t("hero.search")}</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
