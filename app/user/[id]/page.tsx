"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Star,
  Shield,
  ChevronLeft,
  MessageCircle,
  Calendar,
  Globe,
  Clock,
  ThumbsUp,
  Weight,
  ArrowRight,
  Edit3,
} from "@/components/icons"
import { WhatsAppIcon } from "@/components/icons"
import { mockUsers, mockTrips, mockReviews } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const user = mockUsers.find((u) => u.id === id)

  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (!user) {
    notFound()
  }

  const userTrips = mockTrips.filter((t) => t.userId === user.id && t.status === "active")
  const userReviews = mockReviews.filter((r) => r.reviewedId === user.id)

  const memberSince = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(user.createdAt)

  const whatsappLink = user.whatsapp
    ? `https://wa.me/${user.whatsapp}?text=${encodeURIComponent(`Bonjour ${user.name} ! Je vous contacte via KiloShare.`)}`
    : null

  const handleSubmitReview = () => {
    setIsDialogOpen(false)
    setSelectedRating(0)
    setReviewText("")
  }

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: userReviews.filter((r) => r.rating === rating).length,
    percentage:
      userReviews.length > 0
        ? Math.round((userReviews.filter((r) => r.rating === rating).length / userReviews.length) * 100)
        : 0,
  }))

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-20 md:pb-0 bg-secondary/20">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <Link
            href="/trips"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour aux trajets
          </Link>

          {/* Profile Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                  <Image
                    src={user.avatar || "/placeholder.svg?height=128&width=128&query=user avatar"}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                    {user.verified && (
                      <Badge className="bg-accent/10 text-accent border-accent/20 w-fit mx-auto sm:mx-0">
                        <Shield className="h-3 w-3 mr-1" />
                        Vérifié
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-4 w-4",
                            star <= Math.round(user.rating) ? "fill-warning text-warning" : "text-muted",
                          )}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-foreground">{user.rating}</span>
                    <span className="text-muted-foreground">({user.reviewCount} avis)</span>
                  </div>
                  {user.bio && <p className="text-muted-foreground mb-4">{user.bio}</p>}
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Membre depuis {memberSince}
                    </div>
                    {user.languages && (
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        {user.languages.join(", ")}
                      </div>
                    )}
                    {user.responseTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Répond {user.responseTime}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
                <Link href="/messages" className="flex-1">
                  <Button className="w-full gap-2" size="lg">
                    <MessageCircle className="h-5 w-5" />
                    Contacter via l'app
                  </Button>
                </Link>
                {whatsappLink && (
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white border-[#25D366] hover:border-[#20BD5A]"
                      size="lg"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      Contacter via WhatsApp
                    </Button>
                  </a>
                )}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-transparent" size="lg">
                      <Edit3 className="h-5 w-5" />
                      Laisser un avis
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Évaluer {user.name}</DialogTitle>
                      <DialogDescription>Partagez votre expérience avec ce voyageur</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-secondary/30">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{user.name}</p>
                            {user.verified && <Shield className="h-4 w-4 text-accent" />}
                          </div>
                          <p className="text-xs text-muted-foreground">Voyageur/Transporteur</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Votre note</p>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setSelectedRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="p-1"
                            >
                              <Star
                                className={cn(
                                  "h-8 w-8 transition-colors",
                                  star <= (hoverRating || selectedRating) ? "fill-warning text-warning" : "text-muted",
                                )}
                              />
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedRating === 1 && "Très insatisfait"}
                          {selectedRating === 2 && "Insatisfait"}
                          {selectedRating === 3 && "Correct"}
                          {selectedRating === 4 && "Satisfait"}
                          {selectedRating === 5 && "Excellent"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Votre commentaire</p>
                        <Textarea
                          placeholder="Comment s'est passée votre expérience ? Fiabilité, communication, ponctualité..."
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Annuler
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={handleSubmitReview}
                        disabled={!selectedRating || !reviewText.trim()}
                      >
                        Publier l'avis
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="trips" className="space-y-6">
            <TabsList className="bg-secondary w-full">
              <TabsTrigger value="trips" className="flex-1">
                Trajets ({userTrips.length})
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">
                Avis ({userReviews.length})
              </TabsTrigger>
            </TabsList>

            {/* Trips */}
            <TabsContent value="trips" className="space-y-4">
              {userTrips.length > 0 ? (
                userTrips.map((trip) => (
                  <Link key={trip.id} href={`/trips/${trip.id}`}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-lg font-semibold mb-1">
                              <span>{trip.departure}</span>
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              <span>{trip.arrival}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Intl.DateTimeFormat("fr-FR", {
                                  day: "numeric",
                                  month: "long",
                                }).format(trip.departureDate)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Weight className="h-4 w-4" />
                                {trip.availableKg} kg
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-accent">
                              {trip.pricePerKg}
                              {trip.currency}
                            </p>
                            <p className="text-xs text-muted-foreground">par kg</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Weight className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2 text-foreground">Aucun trajet actif</h3>
                    <p className="text-sm text-muted-foreground">
                      Ce voyageur n'a pas de trajet disponible pour le moment
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews" className="space-y-6">
              {/* Rating Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="text-center md:text-left">
                      <p className="text-5xl font-bold text-foreground">{user.rating}</p>
                      <div className="flex justify-center md:justify-start gap-1 my-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-5 w-5",
                              star <= Math.round(user.rating) ? "fill-warning text-warning" : "text-muted",
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.reviewCount} avis au total</p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {ratingDistribution.map(({ rating, count, percentage }) => (
                        <div key={rating} className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground w-4">{rating}</span>
                          <Star className="h-4 w-4 fill-warning text-warning" />
                          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-warning rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews List */}
              {userReviews.length > 0 ? (
                <div className="space-y-4">
                  {userReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Link href={`/user/${review.reviewer.id}`} className="flex-shrink-0">
                            <div className="relative h-12 w-12 rounded-full overflow-hidden hover:ring-2 hover:ring-accent transition-all">
                              <Image
                                src={review.reviewer.avatar || "/placeholder.svg"}
                                alt={review.reviewer.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </Link>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Link href={`/user/${review.reviewer.id}`} className="hover:underline">
                                    <h3 className="font-semibold text-foreground">{review.reviewer.name}</h3>
                                  </Link>
                                  {review.reviewer.verified && <Shield className="h-4 w-4 text-accent" />}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {new Intl.DateTimeFormat("fr-FR", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }).format(review.createdAt)}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={cn(
                                      "h-4 w-4",
                                      star <= review.rating ? "fill-warning text-warning" : "text-muted",
                                    )}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-foreground">{review.comment}</p>
                            <div className="flex items-center gap-4 mt-4">
                              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                                <ThumbsUp className="h-4 w-4" />
                                Utile
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2 text-foreground">Aucun avis</h3>
                    <p className="text-sm text-muted-foreground">Ce voyageur n'a pas encore reçu d'avis</p>
                    <Button className="mt-4 gap-2" onClick={() => setIsDialogOpen(true)}>
                      <Edit3 className="h-4 w-4" />
                      Soyez le premier à laisser un avis
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
