"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useData } from "@/lib/data-provider"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  Shield,
  ChevronLeft,
  ThumbsUp,
  Flag,
  MessageSquare,
  Edit3,
  Check,
  Loader2,
} from "@/components/icons"
import { cn } from "@/lib/utils"
import type { User } from "@/lib/types"

export default function ReviewsPage() {
  const { currentUser, reviews, bookings, users, loading, isAuthenticated } = useData()
  const router = useRouter()

  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [reviewType, setReviewType] = useState<"buyer" | "seller">("buyer")
  const [selectedUserId, setSelectedUserId] = useState<string>("")

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [loading, isAuthenticated, router])

  if (loading || !isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </main>
        <Footer />
        <MobileNav />
      </div>
    )
  }

  const receivedReviews = reviews.filter((r) => r.reviewedId === currentUser.id)
  const givenReviews = reviews.filter((r) => r.reviewerId === currentUser.id)
  const reviewableBookings = bookings
    .filter((b) => b.status === "delivered" && b.senderId !== currentUser.id) // Assuming user is the trip owner
    .map((b) => ({
      ...b,
      canReview: !reviews.some((r) => r.tripId === b.tripId && r.reviewerId === currentUser.id),
    }))
    .filter((b) => b.canReview)

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: receivedReviews.filter((r) => r.rating === rating).length,
    percentage:
      receivedReviews.length > 0
        ? Math.round((receivedReviews.filter((r) => r.rating === rating).length / receivedReviews.length) * 100)
        : 0,
  }))

  const handleSubmitReview = () => {
    // TODO: Wire this up to a createReview function from the data provider
    console.log({
      rating: selectedRating,
      comment: reviewText,
      reviewedId: selectedUser?.id,
      reviewerId: currentUser.id,
    })
    setIsDialogOpen(false)
    setSelectedRating(0)
    setReviewText("")
    setSelectedUser(null)
    setSelectedUserId("")
  }

  const openReviewDialog = (user: User, type: "buyer" | "seller") => {
    setSelectedUser(user)
    setReviewType(type)
    setIsDialogOpen(true)
  }

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId)
    const user = users.find((u) => u.id === userId)
    if (user) setSelectedUser(user)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-20 md:pb-0 bg-secondary/20">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour au profil
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Avis et évaluations</h1>
              <p className="text-muted-foreground">Consultez et gérez vos avis</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Edit3 className="h-4 w-4" />
                  Laisser un avis
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Laisser un avis</DialogTitle>
                  <DialogDescription>
                    {reviewType === "buyer" ? "Évaluez cet acheteur/expéditeur" : "Évaluez ce voyageur/transporteur"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {!selectedUser && (
                    <>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Type d'avis</Label>
                        <Select value={reviewType} onValueChange={(v) => setReviewType(v as "buyer" | "seller")}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="buyer">Évaluer un acheteur (vous êtes voyageur)</SelectItem>
                            <SelectItem value="seller">Évaluer un voyageur (vous êtes expéditeur)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Sélectionner un utilisateur</Label>
                        <Select value={selectedUserId} onValueChange={handleUserSelect}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un utilisateur" />
                          </SelectTrigger>
                          <SelectContent>
                            {users.filter(u => u.id !== currentUser.id).map((user) => (
                              <SelectItem key={user.id} value={user.id}>
                                <div className="flex items-center gap-2">
                                  <span>{user.name}</span>
                                  {user.verified && <Shield className="h-3 w-3 text-accent" />}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {selectedUser && (
                    <div className="p-3 border border-border rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={selectedUser.avatar || "/placeholder.svg"}
                            alt={selectedUser.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{selectedUser.name}</p>
                            {selectedUser.verified && <Shield className="h-4 w-4 text-accent" />}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {reviewType === "buyer" ? "Acheteur/Expéditeur" : "Voyageur/Transporteur"}
                          </p>
                        </div>
                        {!selectedUserId && (
                          <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}>
                            Changer
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

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
                      placeholder={
                        reviewType === "buyer"
                          ? "Comment s'est passée l'expérience avec cet expéditeur ? Ponctualité, emballage du colis..."
                          : "Comment s'est passée la livraison ? Fiabilité, communication..."
                      }
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
                    onClick={() => {
                      setIsDialogOpen(false)
                      setSelectedUser(null)
                      setSelectedUserId("")
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSubmitReview}
                    disabled={!selectedRating || !reviewText.trim() || !selectedUser}
                  >
                    Publier l'avis
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="received" className="space-y-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="received">Reçus ({receivedReviews.length})</TabsTrigger>
              <TabsTrigger value="given">Donnés ({givenReviews.length})</TabsTrigger>
              <TabsTrigger value="pending">À évaluer ({reviewableBookings.length})</TabsTrigger>
            </TabsList>

            {/* Received Reviews */}
            <TabsContent value="received" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="text-center md:text-left">
                      <p className="text-5xl font-bold text-foreground">{currentUser.rating}</p>
                      <div className="flex justify-center md:justify-start gap-1 my-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-5 w-5",
                              star <= Math.round(currentUser.rating) ? "fill-warning text-warning" : "text-muted",
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{currentUser.reviewCount} avis au total</p>
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

              <div className="space-y-4">
                {receivedReviews.map((review) => (
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
                          <p className="text-foreground mb-4">{review.comment}</p>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                              <ThumbsUp className="h-4 w-4" />
                              Utile
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                              <MessageSquare className="h-4 w-4" />
                              Répondre
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                              <Flag className="h-4 w-4" />
                              Signaler
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Given Reviews */}
            <TabsContent value="given" className="space-y-4">
              {givenReviews.length > 0 ? (
                givenReviews.map((review) => {
                  const reviewedUser = users.find((u) => u.id === review.reviewedId)
                  return (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Link href={`/user/${reviewedUser?.id}`} className="flex-shrink-0">
                            <div className="relative h-12 w-12 rounded-full overflow-hidden hover:ring-2 hover:ring-accent transition-all">
                              <Image
                                src={reviewedUser?.avatar || "/placeholder.svg"}
                                alt={reviewedUser?.name || "User"}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </Link>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Link href={`/user/${reviewedUser?.id}`} className="hover:underline">
                                    <h3 className="font-semibold text-foreground">{reviewedUser?.name}</h3>
                                  </Link>
                                  {reviewedUser?.verified && <Shield className="h-4 w-4 text-accent" />}
                                  <Badge variant="secondary" className="text-xs">
                                    Expéditeur
                                  </Badge>
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
                            <p className="text-foreground mb-4">{review.comment}</p>
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                                <Edit3 className="h-4 w-4" />
                                Modifier
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2 text-foreground">Aucun avis donné</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Vous n'avez pas encore laissé d'avis à d'autres utilisateurs
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Pending Reviews */}
            <TabsContent value="pending">
              <div className="space-y-4">
                {reviewableBookings.length > 0 ? (
                  reviewableBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <Link href={`/user/${booking.sender?.id}`} className="flex-shrink-0">
                            <div className="relative h-12 w-12 rounded-full overflow-hidden hover:ring-2 hover:ring-accent transition-all">
                              <Image
                                src={booking.sender?.avatar || "/placeholder.svg"}
                                alt={booking.sender?.name || "User"}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </Link>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Link href={`/user/${booking.sender?.id}`} className="hover:underline">
                                <h3 className="font-semibold text-foreground">{booking.sender?.name}</h3>
                              </Link>
                              {booking.sender?.verified && <Shield className="h-4 w-4 text-accent" />}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {booking.kgConfirmed || booking.kgRequested} kg - {booking.itemDescription}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Check className="h-4 w-4 text-success" />
                              <span className="text-xs text-success">Livraison terminée</span>
                            </div>
                          </div>
                          <Button size="sm" onClick={() => booking.sender && openReviewDialog(booking.sender, "buyer")}>
                            Évaluer
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Check className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2 text-foreground">Tout est à jour</h3>
                      <p className="text-sm text-muted-foreground">Vous n'avez aucun avis en attente</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
