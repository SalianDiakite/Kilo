"use client"

import Link from "next/link"
import { useData } from "@/lib/data-provider"
import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/ui/header"
import { MobileNav } from "@/components/ui/mobile-nav"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { TripManagementCard } from "@/components/dashboard/trip-management-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Package } from "@/components/icons"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardTripsPage() {
  const { currentUser, trips, bookings } = useData()
  const { t } = useLanguage()

  const userTrips = currentUser ? trips.filter((t) => t.userId === currentUser.id) : []

  const activeTrips = userTrips.filter((t) => t.status === "active")
  const completedTrips = userTrips.filter((t) => t.status === "completed")
  const cancelledTrips = userTrips.filter((t) => t.status === "cancelled")

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Header />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 pb-20 lg:pb-0">
          <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{t("dashboard.trips.title")}</h1>
                <p className="text-muted-foreground">{t("dashboard.trips.subtitle")}</p>
              </div>
              <Link href="/publish">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  {t("dashboard.trips.new")}
                </Button>
              </Link>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="active" className="space-y-6">
              <TabsList>
                <TabsTrigger value="active" className="gap-2">
                  {t("dashboard.trips.active")}
                  <span className="text-xs bg-secondary rounded-full px-2 py-0.5">{activeTrips.length}</span>
                </TabsTrigger>
                <TabsTrigger value="completed" className="gap-2">
                  {t("dashboard.trips.completed")}
                  <span className="text-xs bg-secondary rounded-full px-2 py-0.5">{completedTrips.length}</span>
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="gap-2">
                  {t("dashboard.trips.cancelled")}
                  <span className="text-xs bg-secondary rounded-full px-2 py-0.5">{cancelledTrips.length}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {activeTrips.length > 0 ? (
                  activeTrips.map((trip) => (
                    <TripManagementCard
                      key={trip.id}
                      trip={trip}
                      bookings={bookings.filter((b) => b.tripId === trip.id)}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">{t("dashboard.trips.noActive")}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("dashboard.trips.noActiveDesc")}
                      </p>
                      <Link href="/publish">
                        <Button>{t("dashboard.trips.publish")}</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {completedTrips.length > 0 ? (
                  completedTrips.map((trip) => (
                    <TripManagementCard
                      key={trip.id}
                      trip={trip}
                      bookings={bookings.filter((b) => b.tripId === trip.id)}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">{t("dashboard.trips.noCompleted")}</h3>
                      <p className="text-sm text-muted-foreground">{t("dashboard.trips.noCompletedDesc")}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="cancelled" className="space-y-4">
                {cancelledTrips.length > 0 ? (
                  cancelledTrips.map((trip) => (
                    <TripManagementCard
                      key={trip.id}
                      trip={trip}
                      bookings={bookings.filter((b) => b.tripId === trip.id)}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">{t("dashboard.trips.noCancelled")}</h3>
                      <p className="text-sm text-muted-foreground">{t("dashboard.trips.noCancelledDesc")}</p>
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
