"use client"

import { useState, useEffect } from "react"
import { useData } from "@/lib/data-provider"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/language-context"
import { useCurrency } from "@/lib/hooks/use-currency"
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
  Loader2,
} from "@/components/icons"

export default function AnalyticsPage() {
  const { currentUser, trips, bookings } = useData()
  const { t } = useLanguage()
  const { formatPrice } = useCurrency()
  const [monthlyEarnings, setMonthlyEarnings] = useState<Array<{ month: string; earnings: number }>>([])
  const [loadingMonthlyEarnings, setLoadingMonthlyEarnings] = useState(true)

  useEffect(() => {
    const fetchMonthlyEarnings = async () => {
      if (!currentUser?.id) return
      setLoadingMonthlyEarnings(true)
      try {
        const supabase = createClient()
        const { data, error } = await supabase.rpc("get_user_monthly_earnings", {
          p_user_id: currentUser.id,
          p_months_ago: 6,
        })
        if (error) throw error

        // Transform numeric earnings to actual numbers
        const transformedData = (data || []).map((item: any) => ({
            ...item,
            earnings: Number(item.earnings)
        }))
        setMonthlyEarnings(transformedData)
      } catch (error) {
        console.error("Error fetching monthly earnings:", error)
      } finally {
        setLoadingMonthlyEarnings(false)
      }
    }

    fetchMonthlyEarnings()
  }, [currentUser?.id])

  const userTrips = currentUser ? trips.filter((t) => t.userId === currentUser.id) : []
  const userBookings = currentUser ? bookings.filter((b) => userTrips.some((t) => t.id === b.tripId)) : []

  // Calculate stats
  const totalViews = userTrips.reduce((acc, t) => acc + (t.views || 0), 0)
  const totalInquiries = userTrips.reduce((acc, t) => acc + (t.inquiries || 0), 0)
  const totalEarnings = userBookings.filter((b) => b.status === "delivered").reduce((acc, b) => acc + b.totalPrice, 0)
  const conversionRate = totalInquiries > 0 ? Math.round((userBookings.length / totalInquiries) * 100) : 0

  const stats = [
    {
      title: t("dashboard.analytics.totalViews"),
      value: totalViews.toLocaleString(),
      change: "+12%",
      trend: "up",
      icon: Eye,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: t("dashboard.analytics.inquiries"),
      value: totalInquiries.toString(),
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: t("dashboard.analytics.bookings"),
      value: userBookings.length.toString(),
      change: "+24%",
      trend: "up",
      icon: Package,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: t("dashboard.analytics.revenue"),
      value: formatPrice(totalEarnings),
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 pb-20 lg:pb-0 bg-secondary/20">
          <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t("dashboard.analytics.title")}</h1>
              <p className="text-muted-foreground">{t("dashboard.analytics.subtitle")}</p>
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
                    {t("dashboard.analytics.monthlyRevenue")}
                  </CardTitle>
                  <CardDescription>{t("dashboard.analytics.monthlyRevenueDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingMonthlyEarnings ? (
                    <div className="flex items-center justify-center h-48">
                      <Loader2 className="h-8 w-8 animate-spin text-accent" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {monthlyEarnings.map((data, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <span className="w-10 text-sm text-muted-foreground">{data.month}</span>
                          <div className="flex-1 h-8 bg-secondary rounded-lg overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-lg transition-all duration-500"
                              style={{ width: `${(data.earnings / (Math.max(...monthlyEarnings.map(m => m.earnings)) || 1)) * 100}%` }}
                            />
                          </div>
                          <span className="w-16 text-sm font-medium text-foreground text-right">{formatPrice(data.earnings)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Conversion Metrics */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="h-5 w-5 text-success" />
                    {t("dashboard.analytics.conversionMetrics")}
                  </CardTitle>
                  <CardDescription>{t("dashboard.analytics.adPerformance")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/50 rounded-xl text-center">
                      <Target className="h-6 w-6 mx-auto mb-2 text-accent" />
                      <p className="text-2xl font-bold text-foreground">{conversionRate}%</p>
                      <p className="text-xs text-muted-foreground">{t("dashboard.analytics.conversionRate")}</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-xl text-center">
                      <Award className="h-6 w-6 mx-auto mb-2 text-warning" />
                      <p className="text-2xl font-bold text-foreground">{currentUser?.rating || "N/A"}</p>
                      <p className="text-xs text-muted-foreground">{t("dashboard.analytics.avgRating")}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t("dashboard.analytics.viewsToInquiries")}</span>
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
                      <span className="text-sm text-muted-foreground">{t("dashboard.analytics.inquiriesToBookings")}</span>
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
                <CardTitle className="text-base">{t("dashboard.analytics.tripPerformance")}</CardTitle>
                <CardDescription>{t("dashboard.analytics.tripPerformanceDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t("dashboard.analytics.trip")}</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t("dashboard.analytics.views")}</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t("dashboard.analytics.inquiries")}</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                          {t("dashboard.analytics.bookings")}
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{t("dashboard.analytics.conversion")}</th>
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
