"use client"

import { Header } from "@/components/ui/header"
import { MobileNav } from "@/components/ui/mobile-nav"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  Users,
  Package,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Activity,
  Target,
  Award,
} from "@/components/icons"
import { mockTrips, mockBookings } from "@/lib/mock-data"

const currentUserId = "1"
const userTrips = mockTrips.filter((t) => t.userId === currentUserId)
const userBookings = mockBookings.filter((b) => userTrips.some((t) => t.id === b.tripId))

// Calculate stats
const totalViews = userTrips.reduce((acc, t) => acc + (t.views || 0), 0)
const totalInquiries = userTrips.reduce((acc, t) => acc + (t.inquiries || 0), 0)
const totalEarnings = userBookings.filter((b) => b.status === "delivered").reduce((acc, b) => acc + b.totalPrice, 0)
const conversionRate = totalInquiries > 0 ? Math.round((userBookings.length / totalInquiries) * 100) : 0

const stats = [
  {
    title: "Vues totales",
    value: totalViews.toLocaleString(),
    change: "+12%",
    trend: "up",
    icon: Eye,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Demandes reçues",
    value: totalInquiries.toString(),
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Réservations",
    value: userBookings.length.toString(),
    change: "+24%",
    trend: "up",
    icon: Package,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    title: "Revenus",
    value: `${totalEarnings}€`,
    change: "+18%",
    trend: "up",
    icon: Wallet,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

const tripPerformance = userTrips.slice(0, 5).map((trip) => ({
  route: `${trip.departure} → ${trip.arrival}`,
  views: trip.views || 0,
  inquiries: trip.inquiries || 0,
  bookings: trip.bookings?.length || 0,
  conversion: trip.inquiries ? Math.round(((trip.bookings?.length || 0) / trip.inquiries) * 100) : 0,
}))

const monthlyData = [
  { month: "Jan", earnings: 120 },
  { month: "Fév", earnings: 180 },
  { month: "Mar", earnings: 240 },
  { month: "Avr", earnings: 320 },
  { month: "Mai", earnings: 280 },
  { month: "Juin", earnings: 420 },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 pb-20 lg:pb-0 bg-secondary/20">
          <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-foreground">Statistiques</h1>
              <p className="text-muted-foreground">Analysez les performances de vos trajets</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bgColor}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          stat.trend === "up" ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
                        }
                      >
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Revenue Chart */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-accent" />
                    Revenus mensuels
                  </CardTitle>
                  <CardDescription>Évolution de vos gains sur les 6 derniers mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <span className="w-10 text-sm text-muted-foreground">{data.month}</span>
                        <div className="flex-1 h-8 bg-secondary rounded-lg overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-lg transition-all duration-500"
                            style={{ width: `${(data.earnings / 420) * 100}%` }}
                          />
                        </div>
                        <span className="w-16 text-sm font-medium text-foreground text-right">{data.earnings}€</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Conversion Metrics */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="h-5 w-5 text-success" />
                    Métriques de conversion
                  </CardTitle>
                  <CardDescription>Performance de vos annonces</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/50 rounded-xl text-center">
                      <Target className="h-6 w-6 mx-auto mb-2 text-accent" />
                      <p className="text-2xl font-bold text-foreground">{conversionRate}%</p>
                      <p className="text-xs text-muted-foreground">Taux de conversion</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-xl text-center">
                      <Award className="h-6 w-6 mx-auto mb-2 text-warning" />
                      <p className="text-2xl font-bold text-foreground">4.8</p>
                      <p className="text-xs text-muted-foreground">Note moyenne</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Vues → Demandes</span>
                      <span className="text-sm font-medium text-foreground">
                        {totalViews > 0 ? Math.round((totalInquiries / totalViews) * 100) : 0}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${totalViews > 0 ? Math.round((totalInquiries / totalViews) * 100) : 0}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Demandes → Réservations</span>
                      <span className="text-sm font-medium text-foreground">{conversionRate}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-success rounded-full" style={{ width: `${conversionRate}%` }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trip Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Performance par trajet</CardTitle>
                <CardDescription>Détail des statistiques pour chaque trajet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Trajet</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Vues</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Demandes</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                          Réservations
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Conversion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tripPerformance.map((trip, index) => (
                        <tr key={index} className="border-b border-border last:border-0">
                          <td className="py-3 px-4">
                            <span className="font-medium text-foreground">{trip.route}</span>
                          </td>
                          <td className="py-3 px-4 text-center text-muted-foreground">{trip.views}</td>
                          <td className="py-3 px-4 text-center text-muted-foreground">{trip.inquiries}</td>
                          <td className="py-3 px-4 text-center text-muted-foreground">{trip.bookings}</td>
                          <td className="py-3 px-4 text-center">
                            <Badge
                              variant="secondary"
                              className={
                                trip.conversion >= 50
                                  ? "bg-success/10 text-success"
                                  : trip.conversion >= 25
                                    ? "bg-warning/10 text-warning"
                                    : "bg-muted text-muted-foreground"
                              }
                            >
                              {trip.conversion}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
