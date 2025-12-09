"use client"

import Image from "next/image"
import Link from "next/link"
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
  User,
  Eye,
  Edit3,
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  CheckCircle2,
  Languages,
  BadgeCheck,
  Loader2,
} from "@/components/icons"
import { useData } from "@/lib/data-provider"
import { TripCard } from "@/components/trip/trip-card"

const menuItems = [
  { icon: User, label: "Informations personnelles", href: "/profile/edit" },
  { icon: Shield, label: "Vérification du profil", href: "/profile/verify", badge: "90%" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: CreditCard, label: "Paiements", href: "/profile/payments" },
  { icon: HelpCircle, label: "Aide & Support", href: "/help" },
  { icon: Settings, label: "Paramètres", href: "/settings" },
]

export default function ProfilePage() {
  const { currentUser, trips, reviews, loading } = useData()

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
        </div>
        <MobileNav />
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Vous n'êtes pas connecté</h2>
            <p className="text-muted-foreground mb-4">Connectez-vous pour voir votre profil.</p>
            <Link href="/login">
              <Button>Se connecter</Button>
            </Link>
          </div>
        </div>
        <MobileNav />
      </div>
    )
  }

  const userTrips = trips.filter((t) => t.userId === currentUser.id)
  const userReviews = reviews.filter((r) => r.reviewedId === currentUser.id)

  const memberSince = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(currentUser.createdAt)

  const verificationProgress = 90

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0 bg-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1 space-y-6">
              {/* Main Profile Card */}
              <Card className="overflow-hidden">
                {/* Cover */}
                <div className="h-24 bg-gradient-to-r from-accent/20 to-accent/5" />
                <CardContent className="p-6 -mt-12">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-background">
                        <Image
                          src={currentUser.avatar || "/placeholder.svg?height=96&width=96&query=user avatar"}
                          alt={currentUser.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {currentUser.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-1">
                          <BadgeCheck className="h-5 w-5 text-accent-foreground" />
                        </div>
                      )}
                    </div>
                    <h2 className="text-xl font-bold mt-4">{currentUser.name}</h2>
                    <p className="text-sm text-muted-foreground">{currentUser.bio}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= Math.round(currentUser.rating) ? "fill-warning text-warning" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold">{currentUser.rating}</span>
                      <span className="text-muted-foreground text-sm">({currentUser.reviewCount} avis)</span>
                    </div>

                    {/* Quick Info */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Paris, France
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {memberSince}
                      </div>
                    </div>

                    {/* Languages */}
                    {currentUser.languages && (
                      <div className="flex items-center gap-2 mt-3">
                        <Languages className="h-4 w-4 text-muted-foreground" />
                        <div className="flex gap-1">
                          {currentUser.languages.map((lang) => (
                            <Badge key={lang} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-6 w-full">
                      <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                        <Eye className="h-4 w-4" />
                        Profil public
                      </Button>
                      <Link href="/profile/edit" className="flex-1">
                        <Button className="w-full gap-2">
                          <Edit3 className="h-4 w-4" />
                          Modifier
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Progress */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-accent" />
                      <span className="font-medium">Vérification</span>
                    </div>
                    <span className="text-sm font-semibold text-accent">{verificationProgress}%</span>
                  </div>
                  <Progress value={verificationProgress} className="h-2 mb-3" />
                  <p className="text-sm text-muted-foreground mb-3">
                    Complétez votre profil pour gagner la confiance des utilisateurs
                  </p>
                  <Link href="/profile/verify">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Compléter la vérification
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Statistiques</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-secondary/50 rounded-lg">
                      <Plane className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-2xl font-bold">{userTrips.length}</p>
                      <p className="text-xs text-muted-foreground">Trajets publiés</p>
                    </div>
                    <div className="text-center p-3 bg-secondary/50 rounded-lg">
                      <Package className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-2xl font-bold">42</p>
                      <p className="text-xs text-muted-foreground">Colis livrés</p>
                    </div>
                    <div className="text-center p-3 bg-secondary/50 rounded-lg">
                      <MessageCircle className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-2xl font-bold">{currentUser.responseRate}%</p>
                      <p className="text-xs text-muted-foreground">Taux de réponse</p>
                    </div>
                    <div className="text-center p-3 bg-secondary/50 rounded-lg">
                      <Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-2xl font-bold">{currentUser.responseTime}</p>
                      <p className="text-xs text-muted-foreground">Temps de réponse</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Menu */}
              <Card>
                <CardContent className="p-2">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs bg-accent/10 text-accent">
                            {item.badge}
                          </Badge>
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* My Trips */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Mes trajets</h3>
                  <Link href="/dashboard/trips">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Voir tout
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                {userTrips.length > 0 ? (
                  <div className="grid gap-4">
                    {userTrips.slice(0, 2).map((trip) => (
                      <TripCard key={trip.id} trip={trip} variant="compact" />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Plane className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h4 className="font-semibold mb-2">Aucun trajet publié</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Publiez votre premier trajet pour commencer à rentabiliser vos kilos
                      </p>
                      <Link href="/publish">
                        <Button>Publier un trajet</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Reviews */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Avis reçus</h3>
                  <Link href="/profile/reviews">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Voir tout ({currentUser.reviewCount})
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {userReviews.slice(0, 3).map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={review.reviewer.avatar || "/placeholder.svg?height=40&width=40&query=user"}
                              alt={review.reviewer.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{review.reviewer.name}</span>
                                {review.reviewer.verified && <Shield className="h-3.5 w-3.5 text-accent" />}
                              </div>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${star <= review.rating ? "fill-warning text-warning" : "text-muted"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Intl.DateTimeFormat("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }).format(review.createdAt)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Badges de confiance</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="gap-2 py-2 px-3">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Email vérifié
                    </Badge>
                    <Badge variant="secondary" className="gap-2 py-2 px-3">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Téléphone vérifié
                    </Badge>
                    <Badge variant="secondary" className="gap-2 py-2 px-3">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Identité vérifiée
                    </Badge>
                    <Badge variant="secondary" className="gap-2 py-2 px-3 opacity-50">
                      <Clock className="h-4 w-4" />
                      Pièce d'identité en attente
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
