"use client"

import Link from "next/link"
import Image from "next/image"
import type { Trip } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Weight, Star, ArrowRight, Shield, ChevronRight } from "@/components/icons"
import { TripPriceDisplay } from "@/components/trip/trip-price-display"

interface TripCardProps {
  trip: Trip
  variant?: "default" | "compact"
}

export function TripCard({ trip, variant = "default" }: TripCardProps) {
  const { t, language } = useLanguage()

  const formattedDate = new Intl.DateTimeFormat(language, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(trip.departureDate)

  if (variant === "compact") {
    return (
      <Link href={`/trips/${trip.id}`}>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={trip.user.avatar || "/placeholder.svg?height=48&width=48&query=user avatar"}
                  alt={trip.user.name || "User avatar"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span>{trip.departure}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span>{trip.arrival}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span>{formattedDate}</span>
                  <span>•</span>
                  <span>{trip.availableKg} kg</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  <TripPriceDisplay 
                    amount={trip.pricePerKg} 
                    currencyCode={trip.currency} 
                    perKg={true}
                  />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/trips/${trip.id}`}>
      <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group overflow-hidden">
        <CardContent className="p-0">
          {/* Route Header */}
          <div className="p-5 pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-sm">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-medium">{trip.departure}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground mx-1" />
                <div className="flex items-center gap-1.5 text-sm">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
                  <span className="font-medium">{trip.arrival}</span>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {trip.status === "active" ? t("trip.card.available") : trip.status}
              </Badge>
            </div>

            {/* Trip Details */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Weight className="h-4 w-4" />
                <span className="font-medium text-foreground">{trip.availableKg} kg</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">
                <TripPriceDisplay 
                  amount={trip.pricePerKg} 
                  currencyCode={trip.currency} 
                  perKg={false}
                />
              </span>
              <span className="text-muted-foreground text-sm">/ kg</span>
            </div>
          </div>

          {/* User Info */}
          <div className="px-5 py-4 bg-secondary/50 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={trip.user.avatar || "/placeholder.svg?height=40&width=40&query=user avatar"}
                    alt={trip.user.name || "User avatar"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{trip.user.name}</span>
                    {trip.user.verified && <Shield className="h-3.5 w-3.5 text-accent" />}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    <span>{trip.user.rating}</span>
                    <span>({trip.user.reviewCount} {t("trip.card.reviews")})</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                {t("trip.card.view")}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
