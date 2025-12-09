"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useData } from "@/lib/data-provider"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Weight, ChevronRight, ChevronLeft, Check, Plane, Info, Loader2 } from "@/components/icons"
import { countries } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "Trajet", icon: Plane },
  { id: 2, title: "Détails", icon: Weight },
  { id: 3, title: "Confirmation", icon: Check },
]

export default function PublishPage() {
  const router = useRouter()
  const { currentUser, createTrip, useMockData } = useData()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    departureCountry: "",
    departureCity: "",
    arrivalCountry: "",
    arrivalCity: "",
    departureDate: "",
    availableKg: "",
    pricePerKg: "",
    description: "",
  })

  const handleSubmit = async () => {
    if (!currentUser) {
      alert("Vous devez être connecté pour publier un trajet.")
      return
    }
    setIsSubmitting(true)
    try {
      const newTrip = await createTrip({
        userId: currentUser.id,
        departure: formData.departureCity,
        departureCountry: formData.departureCountry,
        arrival: formData.arrivalCity,
        arrivalCountry: formData.arrivalCountry,
        departureDate: formData.departureDate,
        availableKg: Number(formData.availableKg),
        pricePerKg: Number(formData.pricePerKg),
        description: formData.description,
      })

      if (useMockData) {
        // In mock mode, we don't get a real trip back, so we just log it and redirect.
        console.log("Mock trip created:", formData)
        alert("Trajet publié avec succès (simulation) !")
        router.push("/dashboard")
      } else if (newTrip) {
        alert("Trajet publié avec succès !")
        router.push(`/trips/${newTrip.id}`)
      } else {
        throw new Error("La création du trajet a échoué.")
      }
    } catch (error) {
      console.error(error)
      alert("Une erreur est survenue lors de la publication.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Accès refusé</h2>
            <p className="text-muted-foreground mb-4">Vous devez être connecté pour publier un trajet.</p>
            <Link href="/login">
              <Button>Se connecter</Button>
            </Link>
          </div>
        </div>
        <MobileNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0 bg-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Publier un trajet</h1>
              <p className="text-muted-foreground">Partagez vos kilos disponibles avec la communauté</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full transition-colors",
                      currentStep >= step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground",
                    )}
                  >
                    <step.icon className="h-4 w-4" />
                    <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
                    <span className="text-sm font-medium sm:hidden">{step.id}</span>
                  </div>
                  {index < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />}
                </div>
              ))}
            </div>

            {/* Form Card */}
            <Card>
              <CardContent className="p-6 md:p-8">
                {/* Step 1: Route */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-accent" />
                          Départ
                        </h3>
                        <div className="space-y-2">
                          <Label>Pays</Label>
                          <select
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                            value={formData.departureCountry}
                            onChange={(e) => updateForm("departureCountry", e.target.value)}
                          >
                            <option value="">Sélectionner</option>
                            {countries.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Ville</Label>
                          <Input
                            placeholder="Ex: Paris"
                            value={formData.departureCity}
                            onChange={(e) => updateForm("departureCity", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-foreground" />
                          Arrivée
                        </h3>
                        <div className="space-y-2">
                          <Label>Pays</Label>
                          <select
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                            value={formData.arrivalCountry}
                            onChange={(e) => updateForm("arrivalCountry", e.target.value)}
                          >
                            <option value="">Sélectionner</option>
                            {countries.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Ville</Label>
                          <Input
                            placeholder="Ex: Dakar"
                            value={formData.arrivalCity}
                            onChange={(e) => updateForm("arrivalCity", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        Date de départ
                      </Label>
                      <Input
                        type="date"
                        value={formData.departureDate}
                        onChange={(e) => updateForm("departureDate", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Weight className="h-4 w-4 text-muted-foreground" />
                          Kilos disponibles
                        </Label>
                        <Input
                          type="number"
                          placeholder="Ex: 15"
                          value={formData.availableKg}
                          onChange={(e) => updateForm("availableKg", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Prix par kilo (€)</Label>
                        <Input
                          type="number"
                          placeholder="Ex: 10"
                          value={formData.pricePerKg}
                          onChange={(e) => updateForm("pricePerKg", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description (optionnel)</Label>
                      <Textarea
                        placeholder="Décrivez votre trajet, les conditions de remise, etc."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => updateForm("description", e.target.value)}
                      />
                    </div>

                    <div className="p-4 bg-accent/10 rounded-lg flex items-start gap-3">
                      <Info className="h-5 w-5 text-accent mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Soyez précis dans votre description pour attirer plus de demandes. Indiquez les types de colis
                        acceptés et refusés.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center py-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
                        <Check className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Récapitulatif</h3>
                      <p className="text-muted-foreground">Vérifiez les informations de votre trajet</p>
                    </div>

                    <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
                      <div className="flex items-center justify-between pb-4 border-b border-border">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                          <span className="font-medium">{formData.departureCity || "Ville de départ"}</span>
                        </div>
                        <span className="text-muted-foreground">→</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{formData.arrivalCity || "Ville d'arrivée"}</span>
                          <div className="w-2 h-2 rounded-full bg-foreground" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-medium">{formData.departureDate || "-"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Kilos</p>
                          <p className="font-medium">{formData.availableKg || "-"} kg</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Prix</p>
                          <p className="font-medium">{formData.pricePerKg || "-"} €/kg</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1 || isSubmitting} className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Retour
                  </Button>
                  <Button onClick={handleNext} disabled={isSubmitting} className="gap-2 w-32">
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : currentStep === 3 ? (
                      "Publier"
                    ) : (
                      <>
                        Continuer
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
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
