"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useData } from "@/lib/data-provider"
import { useLanguage } from "@/lib/language-context"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { TripManagementCard } from "@/components/dashboard/trip-management-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, ChevronRight, Package, Clock3, CheckCircle2, TrendingUp, Loader2 } from "@/components/icons"
import { cn } from "@/lib/utils"

export function DashboardClient() {
  const { currentUser, trips, bookings, notifications } = useData()
  const { t } = useLanguage()

  // At this point, currentUser should exist, but we can add a fallback just in case.
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full py-12">
        <p className="text-muted-foreground">{t("common.loading")}</p>
      </div>
    )
  }

  const currentUserId = currentUser.id
  const userTrips = trips.filter((t: Trip) => t.userId === currentUserId)
  const activeTrips = userTrips.filter((t: Trip) => t.status === "active")
  const userBookings = bookings
  const recentNotifications = notifications.slice(0, 3)

  const stats = {
    totalTrips: userTrips.length,
    activeTrips: activeTrips.length,
    totalBookings: userBookings.length,
    pendingBookings: userBookings.filter((b: Booking) => b.status === "pending").length,
    totalViews: userTrips.reduce((acc, t) => acc + (t.views || 0), 0),
    totalEarnings: userBookings.filter((b: Booking) => b.status === "delivered").reduce((acc, b) => acc + b.totalPrice, 0),
  }

  const now = new Date()
  const currentPeriodStart = new Date(new Date().setDate(now.getDate() - 30))
  const previousPeriodStart = new Date(new Date().setDate(now.getDate() - 60))

  const calculatePeriodStats = (startDate: Date, endDate: Date) => {
    const tripsInPeriod = userTrips.filter((t: Trip) => {
      const createdAt = new Date(t.createdAt)
      return createdAt >= startDate && createdAt < endDate
    })

    const bookingsInPeriod = userBookings.filter((b: Booking) => {
      const createdAt = new Date(b.createdAt)
      return createdAt >= startDate && createdAt < endDate
    })

    return {
      activeTrips: tripsInPeriod.filter((t: Trip) => t.status === "active").length,
      totalBookings: bookingsInPeriod.length,
      totalViews: tripsInPeriod.reduce((acc, t) => acc + (t.views || 0), 0),
      totalEarnings: bookingsInPeriod
        .filter((b: Booking) => b.status === "delivered")
        .reduce((acc, b) => acc + b.totalPrice, 0),
    }
  }

  const currentPeriodStats = calculatePeriodStats(currentPeriodStart, now)
  const previousPeriodStats = calculatePeriodStats(previousPeriodStart, currentPeriodStart)

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0
    }
    return Math.round(((current - previous) / previous) * 100)
  }

  const changes = {
    activeTrips: calculateChange(currentPeriodStats.activeTrips, previousPeriodStats.activeTrips),
    totalBookings: calculateChange(currentPeriodStats.totalBookings, previousPeriodStats.totalBookings),
    totalViews: calculateChange(currentPeriodStats.totalViews, previousPeriodStats.totalViews),
    totalEarnings: calculateChange(currentPeriodStats.totalEarnings, previousPeriodStats.totalEarnings),
  }

  const totalGrowth = Math.round(
    (changes.activeTrips + changes.totalBookings + changes.totalViews + changes.totalEarnings) / 4,
  )


  const userName = currentUser.name?.split(" ")[0] || "User"

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("dashboard.client.hello")}, {userName}</h1>
          <p className="text-muted-foreground">{t("dashboard.client.welcome")}</p>
        </div>
        <Link href="/publish">
          <Button className="gap-2">
            <Package className="h-4 w-4" />
            {t("dashboard.client.publishTrip")}
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <StatsCards stats={stats} changes={changes} />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Trips */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t("dashboard.client.activeTrips")}</h2>
            <Link href="/dashboard/trips">
              <Button variant="ghost" size="sm" className="gap-1">
                {t("dashboard.client.seeAll")}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {activeTrips.length > 0 ? (
            <div className="space-y-4">
              {activeTrips.slice(0, 2).map((trip: Trip) => (
                <TripManagementCard
                  key={trip.id}
                  trip={trip}
                  bookings={bookings.filter((b: Booking) => b.tripId === trip.id)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">{t("dashboard.client.noActiveTrips")}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t("dashboard.client.publishFirstTrip")}</p>
                <Link href="/publish">
                  <Button>{t("dashboard.client.publishTrip")}</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{t("dashboard.client.quickSummary")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10">
                    <Clock3 className="h-4 w-4 text-warning" />
                  </div>
                  <span className="text-sm">{t("dashboard.client.pending")}</span>
                </div>
                <Badge variant="secondary">{stats.pendingBookings}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-sm">{t("dashboard.client.confirmed")}</span>
                </div>
                <Badge variant="secondary">{userBookings.filter((b: Booking) => b.status === "confirmed").length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                    <TrendingUp className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm">{t("dashboard.client.growth")}</span>
                </div>
                <span className={cn("text-sm font-medium", totalGrowth >= 0 ? "text-success" : "text-destructive")}>
                  {totalGrowth >= 0 ? "+" : ""}
                  {totalGrowth}%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{t("dashboard.client.notifications")}</CardTitle>
                <Link href="/notifications">
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    {t("dashboard.client.seeAll")}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentNotifications.map((notif) => (
                <Link
                  key={notif.id}
                  href={notif.link || "#"}
                  className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary flex-shrink-0">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{notif.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{notif.message}</p>
                  </div>
                  {!notif.read && <div className="w-2 h-2 rounded-full bg-accent mt-2" />}
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
import type { Trip, Booking } from "@/lib/types"
