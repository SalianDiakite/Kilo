"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  Shield,
  Settings,
  ChevronRight,
  Package,
  Plane,
  CreditCard,
  HelpCircle,
  Bell,
  User as UserIcon,
  Eye,
  Edit3,
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  Languages,
  BadgeCheck,
} from "@/components/icons"
import { useData } from "@/lib/data-provider"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { TripCard } from "@/components/trip/trip-card"

export default function ProfilePage() {
  const { currentUser, trips, reviews, bookings, loading } = useData()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login")
    }
  }, [loading, currentUser, router])

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p>{t("common.loading")}</p>
        </div>
        <Footer />
      </div>
    )
  }

  const userTrips = trips.filter((t) => t.userId === currentUser.id)
  const userTripIds = new Set(userTrips.map(t => t.id));
  const userReviews = reviews.filter((r) => r.reviewedId === currentUser.id)
  const deliveredPackagesCount = bookings.filter(b => userTripIds.has(b.tripId) && b.status === 'delivered').length;

  const memberSince = new Intl.DateTimeFormat(t("locale"), {
    month: "long",
    year: "numeric",
  }).format(currentUser.createdAt)
  
  const verificationProgress = Math.min(
    (currentUser.isEmailVerified ? 33 : 0) +
    (currentUser.isPhoneVerified ? 33 : 0) +
    (currentUser.isIdentityVerified ? 34 : 0),
    100
  );
  
  const menuItems = [
    { icon: UserIcon, label: t("profile.private.menu.personalInfo"), href: "/settings/profile" },
    { icon: Bell, label: t("profile.private.menu.notifications"), href: "/settings/notifications" },
    { icon: CreditCard, label: t("profile.private.menu.payments"), href: "/settings/payment" },
    { icon: HelpCircle, label: t("profile.private.menu.help"), href: "/help" },
    { icon: Settings, label: t("profile.private.menu.settings"), href: "/settings" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0 bg-secondary/20">
        <div className="container mx-auto px-4 py-8 space-y-8">
          
          {/* Top Section: Profile, Trips, Reviews */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden flex-shrink-0 mb-4">
                      <Image
                        src={currentUser.avatar || "/placeholder.svg?height=128&width=128&query=user avatar"}
                        alt={currentUser.name}
                        fill
                        className="object-cover"
                      />
                      {currentUser.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-1"><BadgeCheck className="h-5 w-5 text-accent-foreground" /></div>
                      )}
                    </div>
                    <div className="mb-4">
                      <h1 className="text-2xl font-bold text-foreground">{currentUser.name}</h1>
                      {currentUser.verified && (
                        <Badge className="bg-accent/10 text-accent border-accent/20 w-fit mx-auto mt-2">
                          <Shield className="h-3 w-3 mr-1" />
                          {t("profile.public.verified")}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (<Star key={star} className={cn("h-4 w-4", star <= Math.round(currentUser.rating) ? "fill-warning text-warning" : "text-muted")}/>))}
                      </div>
                      <span className="font-semibold text-foreground">{currentUser.rating}</span>
                      <span className="text-muted-foreground">({currentUser.reviewCount} {currentUser.reviewCount > 1 ? t("profile.public.reviewsCount") : t("profile.public.review")})</span>
                    </div>
                    {currentUser.bio && <p className="text-muted-foreground mb-4 text-sm">{currentUser.bio}</p>}
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground w-full items-start">
                      <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{t("profile.public.memberSince")} {memberSince}</div>
                      {currentUser.languages && currentUser.languages.length > 0 && (
                        <div className="flex items-center gap-2"><Languages className="h-4 w-4" />{currentUser.languages.join(", ")}</div>
                      )}
                      {currentUser.responseTime && (
                        <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{t("profile.public.responds")} {currentUser.responseTime}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-border">
                    <Link href={`/public-profile/${currentUser.id}`}><Button variant="outline" className="w-full gap-2 bg-transparent"><Eye className="h-4 w-4" />{t("profile.private.viewPublicProfile")}</Button></Link>
                    <Link href="/settings/profile"><Button className="w-full gap-2"><Edit3 className="h-4 w-4" />{t("profile.private.editProfile")}</Button></Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{t("profile.public.trips")}</h3>
                  <Link href="/dashboard/trips"><Button variant="ghost" size="sm" className="gap-1">{t("dashboard.seeAll")}<ChevronRight className="h-4 w-4" /></Button></Link>
                </div>
                {userTrips.length > 0 ? (
                  <div className="grid gap-4">
                    {userTrips.slice(0, 2).map((trip) => (<TripCard key={trip.id} trip={trip} variant="compact" />))}
                  </div>
                ) : (
                  <Card><CardContent className="p-8 text-center">
                    <Plane className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h4 className="font-semibold mb-2">{t("profile.public.noActiveTrips")}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{t("profile.private.noTripsDescription")}</p>
                    <Link href="/publish"><Button>{t("profile.private.publishFirstTrip")}</Button></Link>
                  </CardContent></Card>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{t("profile.public.reviews")}</h3>
                  <Link href="/profile/reviews"> 
                    <Button variant="ghost" size="sm" className="gap-1">{t("dashboard.seeAll")} ({currentUser.reviewCount})<ChevronRight className="h-4 w-4" /></Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {userReviews.length > 0 ? userReviews.slice(0, 3).map((review) => (
                    <Card key={review.id}><CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                          <Image src={review.reviewer.avatar || "/placeholder.svg?height=40&width=40&query=user"} alt={review.reviewer.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2"><span className="font-medium text-sm">{review.reviewer.name}</span>{review.reviewer.verified && <Shield className="h-3.5 w-3.5 text-accent" />}</div>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (<Star key={star} className={`h-3 w-3 ${star <= review.rating ? "fill-warning text-warning" : "text-muted"}`} />))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                          <p className="text-xs text-muted-foreground mt-2">{new Intl.DateTimeFormat(t("locale")).format(review.createdAt)}</p>
                        </div>
                      </div>
                    </CardContent></Card>
                  )) : (
                    <Card><CardContent className="p-12 text-center">
                      <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2 text-foreground">{t("profile.public.noReviews")}</h3>
                      <p className="text-sm text-muted-foreground">{t("profile.private.noReviewsDescription")}</p>
                    </CardContent></Card>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Stats and Settings/Verification */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">{t("profile.private.stats.title")}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-secondary/50 rounded-lg"><Plane className="h-5 w-5 mx-auto mb-2 text-muted-foreground" /><p className="text-2xl font-bold">{userTrips.length}</p><p className="text-xs text-muted-foreground">{t("profile.private.stats.publishedTrips")}</p></div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg"><Package className="h-5 w-5 mx-auto mb-2 text-muted-foreground" /><p className="text-2xl font-bold">{deliveredPackagesCount}</p><p className="text-xs text-muted-foreground">{t("profile.private.stats.deliveredPackages")}</p></div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg"><MessageCircle className="h-5 w-5 mx-auto mb-2 text-muted-foreground" /><p className="text-2xl font-bold">{currentUser.responseRate || "N/A"}%</p><p className="text-xs text-muted-foreground">{t("profile.private.stats.responseRate")}</p></div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg"><Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" /><p className="text-2xl font-bold">{currentUser.responseTime || "N/A"}</p><p className="text-xs text-muted-foreground">{t("profile.private.stats.responseTime")}</p></div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <Link href="/settings/verification" className="block mb-4 group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-accent" /><span className="font-medium group-hover:text-accent transition-colors">{t("profile.private.verification.title")}</span></div>
                    <span className="text-sm font-semibold text-accent">{verificationProgress}%</span>
                  </div>
                  <Progress value={verificationProgress} className="h-2" />
                </Link>
                
                <div className="border-t border-border -mx-4 mb-2" />

                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <Link key={item.href} href={item.href} className="flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-secondary transition-colors">
                      <div className="flex items-center gap-3"><item.icon className="h-5 w-5 text-muted-foreground" /><span className="font-medium text-sm">{item.label}</span></div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}