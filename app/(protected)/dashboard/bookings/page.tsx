"use client"

import { useState } from "react"
import Image from "next/image"
import { useData } from "@/lib/data-provider"
import { useLanguage } from "@/lib/language-context"
import { useCurrency } from "@/lib/hooks/use-currency"
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
import { cn } from "@/lib/utils"
import { confirmBooking, cancelBooking } from "@/lib/db/bookings"

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"received" | "sent">("received")
  const [activeTab, setActiveTab] = useState("all")
  const { currentUser, trips, bookings, refreshBookings } = useData()
  const { t } = useLanguage()
  const { formatPrice } = useCurrency()

  const handleAccept = async (bookingId: string) => {
    await confirmBooking(bookingId)
    await refreshBookings()
  }

  const handleReject = async (bookingId: string) => {
    await cancelBooking(bookingId)
    await refreshBookings()
  }

  const statusConfig = {
    pending: { label: t("dashboard.bookings.status.pending"), color: "bg-warning/10 text-warning", icon: Clock3 },
    confirmed: { label: t("dashboard.bookings.status.confirmed"), color: "bg-success/10 text-success", icon: CheckCircle2 },
    in_transit: { label: t("dashboard.bookings.status.in_transit"), color: "bg-accent/10 text-accent", icon: Truck },
    delivered: { label: t("dashboard.bookings.status.delivered"), color: "bg-success/10 text-success", icon: CheckCircle2 },
    cancelled: { label: t("dashboard.bookings.status.cancelled"), color: "bg-destructive/10 text-destructive", icon: XCircle },
  }

  // Received bookings: Bookings on TRIPS created by currentUser (I am the traveler)
  // Sent bookings: Bookings created BY currentUser (I am the sender)

  const userTrips = currentUser ? trips.filter((t) => t.userId === currentUser.id) : []
  const userTripIds = userTrips.map((t) => t.id)
  
  const receivedBookings = currentUser ? bookings.filter((b) => userTripIds.includes(b.tripId)) : []
  const sentBookings = currentUser ? bookings.filter((b) => b.senderId === currentUser.id) : []

  const currentList = viewMode === "received" ? receivedBookings : sentBookings
  
  const enrichedBookings = currentList.map((b) => ({
    ...b,
    trip: trips.find((t) => t.id === b.tripId),
  }))

  const filteredBookings = enrichedBookings.filter((booking) => {
    const searchTarget = viewMode === "received" 
      ? booking.sender?.name 
      : booking.trip?.user?.name
      
    const matchesSearch =
      (searchTarget?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (booking.itemDescription?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && booking.status === "pending") ||
      (activeTab === "active" && ["confirmed", "in_transit"].includes(booking.status)) ||
      (activeTab === "completed" && booking.status === "delivered")
    return matchesSearch && matchesTab
  })

  // Calculate counts for tabs
  const pendingCount = enrichedBookings.filter((b) => b.status === "pending").length
  const activeCount = enrichedBookings.filter((b) => ["confirmed", "in_transit"].includes(b.status)).length
  const completedCount = enrichedBookings.filter((b) => b.status === "delivered").length

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
                <h1 className="text-2xl font-bold text-foreground">{t("dashboard.bookings.title")}</h1>
                <p className="text-muted-foreground">
                  {viewMode === "received" 
                    ? t("dashboard.bookings.subtitleReceived") 
                    : t("dashboard.bookings.subtitleSent")}
                </p>
              </div>
              <div className="flex bg-secondary p-1 rounded-lg">
                <button
                  onClick={() => setViewMode("received")}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    viewMode === "received" 
                      ? "bg-background shadow text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t("dashboard.bookings.mySales")}
                </button>
                <button
                  onClick={() => setViewMode("sent")}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    viewMode === "sent" 
                      ? "bg-background shadow text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t("dashboard.bookings.myPurchases")}
                </button>
              </div>
            </div>

            <div className="relative w-full sm:w-72">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input
                   placeholder={t("dashboard.bookings.search")}
                   className="pl-9"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-secondary">
                <TabsTrigger value="all">{t("dashboard.bookings.all")} ({enrichedBookings.length})</TabsTrigger>
                <TabsTrigger value="pending">{t("dashboard.bookings.pending")} ({pendingCount})</TabsTrigger>
                <TabsTrigger value="active">{t("dashboard.bookings.active")} ({activeCount})</TabsTrigger>
                <TabsTrigger value="completed">{t("dashboard.bookings.completed")} ({completedCount})</TabsTrigger>
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
                              {/* Left - User Info (Sender if received, Traveler/Owner if sent) */}
                              <div className="p-4 md:p-6 flex-1 border-b md:border-b-0 md:border-r border-border">
                                <div className="flex items-start gap-4">
                                  {/* Avatar handling */}
                                  <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                      src={
                                        (viewMode === "received" ? booking.sender.avatar : booking.trip?.user.avatar) || 
                                        "/placeholder.svg"
                                      }
                                      alt="Avatar"
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-semibold text-foreground">
                                        {viewMode === "received" ? booking.sender.name : (booking.trip?.user.name || t("dashboard.bookings.trip"))}
                                      </h3>
                                      {viewMode === "received" && booking.sender.verified && <Shield className="h-4 w-4 text-accent" />}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                       {viewMode === "received" ? (
                                         <>
                                          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                                          <span>{booking.sender.rating}</span>
                                          <span>•</span>
                                          <span>{booking.sender.reviewCount} {t("dashboard.bookings.reviews")}</span>
                                         </>
                                       ) : (
                                          <span>{t("dashboard.bookings.trip")}: {booking.trip ? `${booking.trip.departure} -> ${booking.trip.arrival}` : t("dashboard.bookings.unknownTrip")}</span>
                                       )}
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
                                        {t("dashboard.bookings.viewDetails")}
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        {t("dashboard.bookings.sendMessage")}
                                      </DropdownMenuItem>
                                      {booking.status === "pending" && viewMode === "received" && (
                                        <>
                                          <DropdownMenuItem className="text-success" onClick={() => handleAccept(booking.id)}>
                                            <Check className="h-4 w-4 mr-2" />
                                            {t("dashboard.bookings.accept")}
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="text-destructive" onClick={() => handleReject(booking.id)}>
                                            <X className="h-4 w-4 mr-2" />
                                            {t("dashboard.bookings.reject")}
                                          </DropdownMenuItem>
                                        </>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>

                                {/* Item Description */}
                                <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
                                  <p className="text-sm text-muted-foreground mb-1">
                                    {viewMode === "received" ? t("dashboard.bookings.packageContent") : t("dashboard.bookings.yourRequest")}
                                  </p>
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
                                      }).format(new Date(booking.trip.departureDate))}
                                    </p>
                                  </div>
                                )}

                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">{t("dashboard.bookings.kgRequested")}</span>
                                    <span className="font-medium text-foreground">{booking.kgRequested} kg</span>
                                  </div>
                                  {booking.kgConfirmed && (
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">{t("dashboard.bookings.kgConfirmed")}</span>
                                      <span className="font-medium text-foreground">{booking.kgConfirmed} kg</span>
                                    </div>
                                  )}
                                  <div className="flex justify-between text-sm pt-2 border-t border-border">
                                    <span className="text-muted-foreground">{t("dashboard.bookings.totalPrice")}</span>
                                    <span className="font-bold text-accent">{formatPrice(booking.totalPrice)}</span>
                                  </div>
                                </div>

                                {/* Actions */}
                                {booking.status === "pending" && viewMode === "received" && (
                                  <div className="flex gap-2 mt-4">
                                    <Button size="sm" className="flex-1 bg-success hover:bg-success/90" onClick={() => handleAccept(booking.id)}>
                                      <Check className="h-4 w-4 mr-1" />
                                      {t("dashboard.bookings.accept")}
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={() => handleReject(booking.id)}>
                                      <X className="h-4 w-4 mr-1" />
                                      {t("dashboard.bookings.reject")}
                                    </Button>
                                  </div>
                                )}
                                {booking.status === "confirmed" && (
                                  <Button size="sm" className="w-full mt-4">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    {t("dashboard.bookings.contact")}
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
                      <h3 className="font-semibold mb-2 text-foreground">{t("dashboard.bookings.noBookings")}</h3>
                      <p className="text-sm text-muted-foreground">
                        {searchQuery
                          ? t("dashboard.bookings.noMatch")
                          : viewMode === "received" ? t("dashboard.bookings.noReceived") : t("dashboard.bookings.noSent")}
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
