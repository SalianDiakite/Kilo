"use client"

import { useState } from "react"
import Image from "next/image"
import type { Trip, Booking } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Calendar,
  Weight,
  ArrowRight,
  Eye,
  MessageCircle,
  MoreHorizontal,
  Edit3,
  Trash2,
  Archive,
  Users,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock3,
  Truck,
  XCircle,
  Shield,
  Star,
} from "@/components/icons"
import { cn } from "@/lib/utils"

interface TripManagementCardProps {
  trip: Trip
  bookings: Booking[]
}

const statusConfig = {
  pending: { label: "En attente", color: "bg-warning/10 text-warning", icon: Clock3 },
  confirmed: { label: "Confirmé", color: "bg-success/10 text-success", icon: CheckCircle2 },
  in_transit: { label: "En transit", color: "bg-accent/10 text-accent", icon: Truck },
  delivered: { label: "Livré", color: "bg-success/10 text-success", icon: CheckCircle2 },
  cancelled: { label: "Annulé", color: "bg-destructive/10 text-destructive", icon: XCircle },
}

export function TripManagementCard({ trip, bookings }: TripManagementCardProps) {
  const [showBookings, setShowBookings] = useState(false)

  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(trip.departureDate)

  const pendingCount = bookings.filter((b) => b.status === "pending").length
  const confirmedKg = bookings
    .filter((b) => b.status === "confirmed" || b.status === "in_transit")
    .reduce((acc, b) => acc + (b.kgConfirmed || 0), 0)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Trip Header */}
        <div className="p-5 border-b border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-medium">{trip.departure}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-foreground" />
                <span className="font-medium">{trip.arrival}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={cn(
                  trip.status === "active" && "bg-success/10 text-success",
                  trip.status === "completed" && "bg-muted text-muted-foreground",
                  trip.status === "cancelled" && "bg-destructive/10 text-destructive",
                )}
              >
                {trip.status === "active" ? "Actif" : trip.status === "completed" ? "Terminé" : "Annulé"}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="h-4 w-4 mr-2" />
                    Archiver
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Trip Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Weight className="h-4 w-4 text-muted-foreground" />
              <span>
                <span className="font-medium text-foreground">{trip.availableKg}</span>
                <span className="text-muted-foreground">/{trip.totalKg} kg</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{trip.views || 0} vues</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              <span>{trip.inquiries || 0} demandes</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">
                {trip.pricePerKg}
                {trip.currency}
              </span>
              <span className="text-muted-foreground text-sm">/ kg</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Users className="h-3 w-3" />
                {bookings.length} acheteurs
              </Badge>
              {pendingCount > 0 && (
                <Badge className="bg-warning text-warning-foreground">{pendingCount} en attente</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        {bookings.length > 0 && (
          <div>
            <button
              onClick={() => setShowBookings(!showBookings)}
              className="w-full px-5 py-3 flex items-center justify-between text-sm font-medium hover:bg-secondary/50 transition-colors"
            >
              <span>Voir les réservations ({bookings.length})</span>
              {showBookings ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {showBookings && (
              <div className="border-t border-border divide-y divide-border">
                {bookings.map((booking) => {
                  const config = statusConfig[booking.status]
                  const StatusIcon = config.icon

                  return (
                    <div key={booking.id} className="p-4 hover:bg-secondary/30 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={booking.sender.avatar || "/placeholder.svg?height=40&width=40&query=user"}
                            alt={booking.sender.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{booking.sender.name}</span>
                            {booking.sender.verified && <Shield className="h-3.5 w-3.5 text-accent" />}
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="h-3 w-3 fill-warning text-warning" />
                              <span>{booking.sender.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mb-2">{booking.itemDescription}</p>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="font-medium">
                              {booking.kgRequested} kg · {booking.totalPrice}€
                            </span>
                            <Badge variant="secondary" className={cn("text-xs", config.color)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {config.label}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {booking.status === "pending" && (
                            <>
                              <Button size="sm" variant="outline" className="h-8 bg-transparent">
                                Refuser
                              </Button>
                              <Button size="sm" className="h-8">
                                Accepter
                              </Button>
                            </>
                          )}
                          {booking.status === "confirmed" && (
                            <Button size="sm" variant="outline" className="h-8 bg-transparent">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
