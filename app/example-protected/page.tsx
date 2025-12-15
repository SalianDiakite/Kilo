"use client"

/**
 * EXEMPLE DE PAGE PROTÉGÉE
 * 
 * Cette page démontre les bonnes pratiques pour créer une page
 * qui nécessite une authentification dans l'application Kilo.
 * 
 * Caractéristiques:
 * - Protection automatique avec useRequireAuth()
 * - Utilisation de useData() pour accéder aux données
 * - Gestion de l'état de chargement avec AuthGuard
 * - Affichage conditionnel basé sur l'utilisateur connecté
 */

import { useRequireAuth } from "@/lib/hooks/use-require-auth"
import { useData } from "@/lib/data-provider"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Package, Bell, Star } from "@/components/icons"

export default function ExampleProtectedPage() {
  // 1. Protéger la page - redirige vers /login si non connecté
  useRequireAuth()

  // 2. Récupérer les données de l'application
  const { 
    currentUser, 
    trips, 
    bookings, 
    notifications, 
    reviews,
    isReady 
  } = useData()

  // 3. Calculer des statistiques basées sur l'utilisateur connecté
  const userTrips = trips.filter(t => t.userId === currentUser?.id)
  const unreadNotifications = notifications.filter(n => !n.read).length
  const averageRating = currentUser?.rating || 0

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0 bg-secondary/20">
        {/* 4. Utiliser AuthGuard pour gérer l'état de chargement */}
        <AuthGuard>
          <div className="container mx-auto px-4 py-8">
            {/* En-tête de la page */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Bonjour {currentUser?.name} 👋
              </h1>
              <p className="text-muted-foreground">
                Voici un aperçu de votre activité sur KiloShare
              </p>
            </div>

            {/* Grille de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Carte: Mes Trajets */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Package className="h-8 w-8 text-primary" />
                    <span className="text-3xl font-bold">{userTrips.length}</span>
                  </div>
                  <h3 className="font-semibold">Mes Trajets</h3>
                  <p className="text-sm text-muted-foreground">
                    Trajets publiés
                  </p>
                </CardContent>
              </Card>

              {/* Carte: Réservations */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <User className="h-8 w-8 text-accent" />
                    <span className="text-3xl font-bold">{bookings.length}</span>
                  </div>
                  <h3 className="font-semibold">Réservations</h3>
                  <p className="text-sm text-muted-foreground">
                    Demandes reçues
                  </p>
                </CardContent>
              </Card>

              {/* Carte: Notifications */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Bell className="h-8 w-8 text-orange-500" />
                    <span className="text-3xl font-bold">{unreadNotifications}</span>
                  </div>
                  <h3 className="font-semibold">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Non lues
                  </p>
                </CardContent>
              </Card>

              {/* Carte: Note Moyenne */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Star className="h-8 w-8 text-yellow-500" />
                    <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
                  </div>
                  <h3 className="font-semibold">Note Moyenne</h3>
                  <p className="text-sm text-muted-foreground">
                    {reviews.length} avis
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Section: Derniers Trajets */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Mes Derniers Trajets</h2>
                {userTrips.length > 0 ? (
                  <div className="space-y-4">
                    {userTrips.slice(0, 3).map((trip) => (
                      <div 
                        key={trip.id} 
                        className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold">
                            {trip.departure} → {trip.arrival}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(trip.departureDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{trip.availableKg} kg</p>
                          <p className="text-sm text-muted-foreground">
                            {trip.pricePerKg}€/kg
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Vous n'avez pas encore publié de trajet
                    </p>
                    <Button>Publier un trajet</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section: Informations du Profil */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Mon Profil</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nom</span>
                    <span className="font-semibold">{currentUser?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-semibold">{currentUser?.email || "Non renseigné"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Téléphone</span>
                    <span className="font-semibold">{currentUser?.phone || "Non renseigné"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Membre depuis</span>
                    <span className="font-semibold">
                      {currentUser?.createdAt 
                        ? new Date(currentUser.createdAt).toLocaleDateString('fr-FR')
                        : "N/A"
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Vérifié</span>
                    <span className="font-semibold">
                      {currentUser?.verified ? "✅ Oui" : "❌ Non"}
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="w-full">Modifier mon profil</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </AuthGuard>
      </main>

      <Footer />
      <MobileNav />
    </div>
  )
}
