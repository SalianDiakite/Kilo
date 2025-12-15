"use client"

import { useData } from "@/lib/data-provider"
import { useLanguage } from "@/lib/language-context"
import { useCurrency } from "@/lib/hooks/use-currency"
import { Header } from "@/components/ui/header"
import { MobileNav } from "@/components/ui/mobile-nav"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Banknote,
  Clock,
  CheckCircle2,
  Download,
} from "@/components/icons"



export default function EarningsPage() {



  const { currentUser, trips, bookings } = useData()



  const { t } = useLanguage()



  const { formatPrice } = useCurrency()







  const userTrips = currentUser ? trips.filter((t) => t.userId === currentUser.id) : []



  const userTripIds = userTrips.map((t) => t.id)



  const userBookings = currentUser ? bookings.filter((b) => userTripIds.includes(b.tripId)) : []







  const deliveredBookings = userBookings.filter((b) => b.status === "delivered")



  const pendingBookings = userBookings.filter((b) => ["pending", "confirmed", "in_transit"].includes(b.status))







  const totalEarnings = deliveredBookings.reduce((acc, b) => acc + b.totalPrice, 0)



  const pendingEarnings = pendingBookings.reduce((acc, b) => acc + b.totalPrice, 0)



  const availableBalance = totalEarnings * 0.9 // 10% fee







  // Derive transactions from bookings



  const transactions = userBookings



    .filter(b => ["confirmed", "in_transit", "delivered"].includes(b.status))



    .map(b => {



      const trip = trips.find(t => t.id === b.tripId)



      return {



        id: b.id,



        type: "earning",



        description: trip ? `${t("dashboard.earnings.delivery")} ${trip.departure} → ${trip.arrival}` : `${t("dashboard.earnings.delivery")} KiloShare`,



        amount: b.totalPrice,



        status: b.status === "delivered" ? "completed" : "pending",



        date: new Date(b.createdAt || new Date()), // Fallback if createdAt missing



      }



    })



    .sort((a, b) => b.date.getTime() - a.date.getTime())







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



                <h1 className="text-2xl font-bold text-foreground">{t("dashboard.earnings.title")}</h1>



                <p className="text-muted-foreground">{t("dashboard.earnings.subtitle")}</p>



              </div>



              <Button className="gap-2">



                <Banknote className="h-4 w-4" />



                {t("dashboard.earnings.withdraw")}



              </Button>



            </div>







            {/* Balance Cards */}



            <div className="grid gap-4 md:grid-cols-3">



              <Card className="bg-accent text-accent-foreground">



                <CardContent className="p-6">



                  <div className="flex items-center justify-between mb-4">



                    <Wallet className="h-8 w-8 opacity-80" />



                    <Badge className="bg-accent-foreground/20 text-accent-foreground border-0">{t("dashboard.earnings.available")}</Badge>



                  </div>



                  <p className="text-3xl font-bold">{formatPrice(availableBalance)}</p>



                  <p className="text-sm opacity-80">{t("dashboard.earnings.availableDesc")}</p>



                </CardContent>



              </Card>







              <Card>



                <CardContent className="p-6">



                  <div className="flex items-center justify-between mb-4">



                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">



                      <Clock className="h-5 w-5 text-warning" />



                    </div>



                    <ArrowUpRight className="h-4 w-4 text-success" />



                  </div>



                  <p className="text-2xl font-bold text-foreground">{formatPrice(pendingEarnings)}</p>



                  <p className="text-sm text-muted-foreground">{t("dashboard.earnings.pendingDelivery")}</p>



                </CardContent>



              </Card>







              <Card>



                <CardContent className="p-6">



                  <div className="flex items-center justify-between mb-4">



                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">



                      <CheckCircle2 className="h-5 w-5 text-success" />



                    </div>



                    <span className="text-sm text-success font-medium">+18%</span>



                  </div>



                  <p className="text-2xl font-bold text-foreground">{formatPrice(totalEarnings)}</p>



                  <p className="text-sm text-muted-foreground">{t("dashboard.earnings.totalEarnings")}</p>



                </CardContent>



              </Card>



            </div>







            <div className="grid gap-6 lg:grid-cols-3">



              {/* Transactions */}



              <Card className="lg:col-span-2">



                <CardHeader className="flex flex-row items-center justify-between">



                  <div>



                    <CardTitle className="text-base">{t("dashboard.earnings.history")}</CardTitle>



                    <CardDescription>{t("dashboard.earnings.historyDesc")}</CardDescription>



                  </div>



                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">



                    <Download className="h-4 w-4" />



                    {t("dashboard.earnings.export")}



                  </Button>



                </CardHeader>



                <CardContent>



                  <div className="space-y-4">



                    {transactions.map((transaction) => (



                      <div



                        key={transaction.id}



                        className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl"



                      >



                        <div className="flex items-center gap-4">



                          <div



                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${



                              transaction.type === "earning" ? "bg-success/10" : "bg-accent/10"



                            }`}



                          >



                            {transaction.type === "earning" ? (



                              <ArrowUpRight className="h-5 w-5 text-success" />



                            ) : (



                              <ArrowDownRight className="h-5 w-5 text-accent" />



                            )}



                          </div>



                          <div>



                            <p className="font-medium text-foreground">{transaction.description}</p>



                            <p className="text-sm text-muted-foreground">



                              {new Intl.DateTimeFormat("fr-FR", {



                                day: "numeric",



                                month: "short",



                                year: "numeric",



                              }).format(transaction.date)}



                            </p>



                          </div>



                        </div>



                        <div className="text-right">



                          <p className={`font-semibold ${transaction.amount > 0 ? "text-success" : "text-foreground"}`}>



                            {transaction.amount > 0 ? "+" : ""}{formatPrice(transaction.amount)}



                          </p>



                          <Badge



                            variant="secondary"



                            className={



                              transaction.status === "completed"



                                ? "bg-success/10 text-success"



                                : "bg-warning/10 text-warning"



                            }



                          >



                            {transaction.status === "completed" ? t("dashboard.earnings.statusCompleted") : t("dashboard.earnings.statusPending")}



                          </Badge>



                        </div>



                      </div>



                    ))}



                  </div>



                </CardContent>



              </Card>







              {/* Payment Methods */}



              <Card>



                <CardHeader>



                  <CardTitle className="text-base">{t("dashboard.earnings.paymentMethods")}</CardTitle>



                  <CardDescription>{t("dashboard.earnings.paymentMethodsDesc")}</CardDescription>



                </CardHeader>



                <CardContent className="space-y-4">



                  <div className="p-4 border border-border rounded-xl">



                    <div className="flex items-center gap-3 mb-3">



                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">



                        <CreditCard className="h-5 w-5 text-muted-foreground" />



                      </div>



                      <div>



                        <p className="font-medium text-foreground">{t("dashboard.earnings.visaCard")}</p>



                        <p className="text-sm text-muted-foreground">•••• 4242</p>



                      </div>



                    </div>



                    <Badge variant="secondary" className="bg-success/10 text-success">



                      {t("dashboard.earnings.default")}



                    </Badge>



                  </div>







                  <div className="p-4 border border-border rounded-xl">



                    <div className="flex items-center gap-3 mb-3">



                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">



                        <Banknote className="h-5 w-5 text-muted-foreground" />



                      </div>



                      <div>



                        <p className="font-medium text-foreground">{t("dashboard.earnings.bankAccount")}</p>



                        <p className="text-sm text-muted-foreground">FR76 •••• 1234</p>



                      </div>



                    </div>



                  </div>







                  <Button variant="outline" className="w-full bg-transparent">



                    {t("dashboard.earnings.addMethod")}



                  </Button>



                </CardContent>



              </Card>



            </div>



          </div>



        </main>



      </div>



      <MobileNav />



    </div>



  )



}
