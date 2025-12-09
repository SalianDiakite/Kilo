import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Weight,
  Star,
  ArrowRight,
  Shield,
  MessageCircle,
  Check,
  X,
  ChevronLeft,
  Share2,
  Heart,
  Info,
} from "@/components/icons"
import { WhatsAppIcon } from "@/components/icons"
import { fetchTrip } from "@/lib/services/data-service"

export default async function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const trip = await fetchTrip(id)

  if (!trip) {
    notFound()
  }

  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(trip.departureDate)

  const memberSince = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(trip.user.createdAt)

  const whatsappLink = trip.user.whatsapp
    ? `https://wa.me/${trip.user.whatsapp}?text=${encodeURIComponent(`Bonjour ! Je suis intéressé(e) par votre offre de kilos ${trip.departure} → ${trip.arrival} sur KiloShare.`)}`
    : null

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Header />
      <main className="flex-1 pb-28 md:pb-0">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/trips"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour aux trajets
          </Link>
        </div>

        <div className="container mx-auto px-4 pb-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Route Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <Badge variant="secondary" className="text-xs">
                      {trip.status === "active" ? "Disponible" : trip.status}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-accent" />
                        <span className="text-xl font-bold">{trip.departure}</span>
                      </div>
                      <span className="text-sm text-muted-foreground ml-5">{trip.departureCountry}</span>
                    </div>
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    <div className="flex-1 text-right">
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <span className="text-xl font-bold">{trip.arrival}</span>
                        <div className="w-3 h-3 rounded-full bg-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground mr-5">{trip.arrivalCountry}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-xl">
                    <div className="text-center">
                      <Calendar className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">{formattedDate}</p>
                      <p className="text-xs text-muted-foreground">Date de départ</p>
                    </div>
                    <div className="text-center border-x border-border">
                      <Weight className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">{trip.availableKg} kg</p>
                      <p className="text-xs text-muted-foreground">Disponibles</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">
                        {trip.pricePerKg}
                        {trip.currency}
                      </div>
                      <p className="text-xs text-muted-foreground">par kilo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              {trip.description && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Description</h3>
                    <p className="text-muted-foreground">{trip.description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Accepted/Rejected Items */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Types de colis</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Acceptés
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {trip.acceptedItems.map((item, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                        <X className="h-4 w-4 text-red-600" />
                        Non acceptés
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {trip.rejectedItems.map((item, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={trip.user.avatar || "/placeholder.svg?height=64&width=64&query=user avatar"}
                        alt={trip.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{trip.user.name}</h3>
                        {trip.user.verified && <Shield className="h-4 w-4 text-accent flex-shrink-0" />}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="font-medium text-foreground">{trip.user.rating}</span>
                        <span>({trip.user.reviewCount} avis)</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Membre depuis {memberSince}</p>
                    </div>
                  </div>

                  {trip.user.verified && (
                    <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg mb-4">
                      <Shield className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">Profil vérifié</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Link href="/messages" className="block">
                      <Button className="w-full gap-2" size="lg">
                        <MessageCircle className="h-5 w-5" />
                        Contacter via l'app
                      </Button>
                    </Link>

                    {whatsappLink && (
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
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
                  </div>
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card className="bg-secondary/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">Vérifiez toujours l'identité du voyageur avant de lui confier votre colis.</p>
                      <Link href="/safety" className="text-accent hover:underline">
                        Conseils de sécurité →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Mobile CTA - Added WhatsApp option */}
        <div className="fixed bottom-16 md:hidden left-0 right-0 p-4 bg-background border-t border-border">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-2xl font-bold">
                {trip.pricePerKg}
                {trip.currency}
                <span className="text-sm font-normal text-muted-foreground">/kg</span>
              </div>
              <p className="text-sm text-muted-foreground">{trip.availableKg} kg disponibles</p>
            </div>
            <div className="flex gap-2">
              {whatsappLink && (
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-[#25D366] hover:bg-[#20BD5A] text-white border-[#25D366]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                  </Button>
                </a>
              )}
              <Link href="/messages">
                <Button size="lg" className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
