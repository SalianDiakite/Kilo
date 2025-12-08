"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/ui/header"
import { MobileNav } from "@/components/ui/mobile-nav"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreVertical,
  CheckCircle2,
  Clock3,
  Truck,
  XCircle,
  MessageCircle,
  Star,
  Shield,
  ArrowRight,
  Package,
  Eye,
  Check,
  X,
} from "@/components/icons"
import { mockBookings, mockTrips } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const allBookings = mockBookings.map((b) => ({
  ...b,
  trip: mockTrips.find((t) => t.id === b.tripId),
}))

const statusConfig = {
  pending: { label: "En attente", color: "bg-warning/10 text-warning", icon: Clock3 },
  confirmed: { label: "Confirmé", color: "bg-success/10 text-success", icon: CheckCircle2 },
  in_transit: { label: "En transit", color: "bg-accent/10 text-accent", icon: Truck },
  delivered: { label: "Livré", color: "bg-success/10 text-success", icon: CheckCircle2 },
  cancelled: { label: "Annulé", color: "bg-destructive/10 text-destructive", icon: XCircle },
}

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredBookings = allBookings.filter((booking) => {
    const matchesSearch =
      booking.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.itemDescription.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && booking.status === "pending") ||
      (activeTab === "active" && ["confirmed", "in_transit"].includes(booking.status)) ||
      (activeTab === "completed" && booking.status === "delivered")
    return matchesSearch && matchesTab
  })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 pb-20 lg:pb-0 bg-secondary/20">
          <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Réservations</h1>
                <p className="text-muted-foreground">Gérez toutes les réservations de vos trajets</p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-secondary">
                <TabsTrigger value="all">Toutes ({allBookings.length})</TabsTrigger>
                <TabsTrigger value="pending">
                  En attente ({allBookings.filter((b) => b.status === "pending").length})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Actives ({allBookings.filter((b) => ["confirmed", "in_transit"].includes(b.status)).length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Terminées ({allBookings.filter((b) => b.status === "delivered").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                {filteredBookings.length > 0 ? (
                  <div className="space-y-4">
                    {filteredBookings.map((booking) => {
                      const status = statusConfig[booking.status]
                      const StatusIcon = status.icon

                      return (
                        <Card key={booking.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              {/* Left - Sender Info */}
                              <div className="p-4 md:p-6 flex-1 border-b md:border-b-0 md:border-r border-border">
                                <div className="flex items-start gap-4">
                                  <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                      src={booking.sender.avatar || "/placeholder.svg"}
                                      alt={booking.sender.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-semibold text-foreground">{booking.sender.name}</h3>
                                      {booking.sender.verified && <Shield className="h-4 w-4 text-accent" />}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                      <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                                      <span>{booking.sender.rating}</span>
                                      <span>•</span>
                                      <span>{booking.sender.reviewCount} avis</span>
                                    </div>
                                    <Badge variant="secondary" className={cn("text-xs", status.color)}>
                                      <StatusIcon className="h-3 w-3 mr-1" />
                                      {status.label}
                                    </Badge>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Eye className="h-4 w-4 mr-2" />
                                        Voir les détails
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        Envoyer un message
                                      </DropdownMenuItem>
                                      {booking.status === "pending" && (
                                        <>
                                          <DropdownMenuItem className="text-success">
                                            <Check className="h-4 w-4 mr-2" />
                                            Accepter
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="text-destructive">
                                            <X className="h-4 w-4 mr-2" />
                                            Refuser
                                          </DropdownMenuItem>
                                        </>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>

                                {/* Item Description */}
                                <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
                                  <p className="text-sm text-muted-foreground mb-1">Contenu du colis</p>
                                  <p className="text-sm font-medium text-foreground">{booking.itemDescription}</p>
                                </div>
                              </div>

                              {/* Right - Trip & Booking Info */}
                              <div className="p-4 md:p-6 md:w-72 bg-secondary/30">
                                {booking.trip && (
                                  <div className="mb-4">
                                    <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                      <span>{booking.trip.departure}</span>
                                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                      <span>{booking.trip.arrival}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      {new Intl.DateTimeFormat("fr-FR", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      }).format(booking.trip.departureDate)}
                                    </p>
                                  </div>
                                )}

                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Kilos demandés</span>
                                    <span className="font-medium text-foreground">{booking.kgRequested} kg</span>
                                  </div>
                                  {booking.kgConfirmed && (
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Kilos confirmés</span>
                                      <span className="font-medium text-foreground">{booking.kgConfirmed} kg</span>
                                    </div>
                                  )}
                                  <div className="flex justify-between text-sm pt-2 border-t border-border">
                                    <span className="text-muted-foreground">Prix total</span>
                                    <span className="font-bold text-accent">{booking.totalPrice}€</span>
                                  </div>
                                </div>

                                {/* Actions */}
                                {booking.status === "pending" && (
                                  <div className="flex gap-2 mt-4">
                                    <Button size="sm" className="flex-1 bg-success hover:bg-success/90">
                                      <Check className="h-4 w-4 mr-1" />
                                      Accepter
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                      <X className="h-4 w-4 mr-1" />
                                      Refuser
                                    </Button>
                                  </div>
                                )}
                                {booking.status === "confirmed" && (
                                  <Button size="sm" className="w-full mt-4">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Contacter
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2 text-foreground">Aucune réservation</h3>
                      <p className="text-sm text-muted-foreground">
                        {searchQuery
                          ? "Aucune réservation ne correspond à votre recherche"
                          : "Vous n'avez pas encore de réservations"}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
