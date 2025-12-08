import Link from "next/link"
import { Header } from "@/components/ui/header"
import { MobileNav } from "@/components/ui/mobile-nav"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { TripManagementCard } from "@/components/dashboard/trip-management-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockTrips, mockBookings } from "@/lib/mock-data"
import { Plus, Package } from "@/components/icons"
import { Card, CardContent } from "@/components/ui/card"

const currentUserId = "1"
const userTrips = mockTrips.filter((t) => t.userId === currentUserId)

export default function DashboardTripsPage() {
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
                <h1 className="text-2xl font-bold">Mes trajets</h1>
                <p className="text-muted-foreground">Gérez tous vos trajets publiés</p>
              </div>
              <Link href="/publish">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nouveau trajet
                </Button>
              </Link>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="active" className="space-y-6">
              <TabsList>
                <TabsTrigger value="active" className="gap-2">
                  Actifs
                  <span className="text-xs bg-secondary rounded-full px-2 py-0.5">{activeTrips.length}</span>
                </TabsTrigger>
                <TabsTrigger value="completed" className="gap-2">
                  Terminés
                  <span className="text-xs bg-secondary rounded-full px-2 py-0.5">{completedTrips.length}</span>
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="gap-2">
                  Annulés
                  <span className="text-xs bg-secondary rounded-full px-2 py-0.5">{cancelledTrips.length}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {activeTrips.length > 0 ? (
                  activeTrips.map((trip) => (
                    <TripManagementCard
                      key={trip.id}
                      trip={trip}
                      bookings={mockBookings.filter((b) => b.tripId === trip.id)}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">Aucun trajet actif</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Publiez un trajet pour commencer à recevoir des demandes
                      </p>
                      <Link href="/publish">
                        <Button>Publier un trajet</Button>
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
                      bookings={mockBookings.filter((b) => b.tripId === trip.id)}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">Aucun trajet terminé</h3>
                      <p className="text-sm text-muted-foreground">Vos trajets terminés apparaîtront ici</p>
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
                      bookings={mockBookings.filter((b) => b.tripId === trip.id)}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">Aucun trajet annulé</h3>
                      <p className="text-sm text-muted-foreground">Vos trajets annulés apparaîtront ici</p>
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
