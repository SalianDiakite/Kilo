"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useData } from "@/lib/data-provider"
import { useLanguage } from "@/lib/language-context"
import { fetchCities } from "@/lib/services/data-service"
import type { City } from "@/lib/db/countries"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Weight, ChevronRight, ChevronLeft, Check, Plane, Info, Loader2 } from "@/components/icons"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, key: "route", icon: Plane },
  { id: 2, key: "details", icon: Weight },
  { id: 3, key: "confirmation", icon: Check },
]

export default function PublishPage() {
  const router = useRouter()
  const { currentUser, createTrip, countries } = useData()
  const { t, language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    departureCountryId: "",
    departureCityId: "",
    arrivalCountryId: "",
    arrivalCityId: "",
    departureDate: "",
    availableKg: "",
    pricePerKg: "",
    description: "",
    acceptedItems: "",
    rejectedItems: "",
  })

  // State for dynamic cities
  const [departureCities, setDepartureCities] = useState<City[]>([])
  const [arrivalCities, setArrivalCities] = useState<City[]>([])

  // Load departure cities when country changes
  useEffect(() => {
    const loadCities = async () => {
      if (formData.departureCountryId) {
        const cities = await fetchCities(formData.departureCountryId)
        setDepartureCities(cities)
      } else {
        setDepartureCities([])
      }
    }
    loadCities()
  }, [formData.departureCountryId])

  // Load arrival cities when country changes
  useEffect(() => {
    const loadCities = async () => {
      if (formData.arrivalCountryId) {
        const cities = await fetchCities(formData.arrivalCountryId)
        setArrivalCities(cities)
      } else {
        setArrivalCities([])
      }
    }
    loadCities()
  }, [formData.arrivalCountryId])

  const handleSubmit = async () => {
    if (!currentUser) {
      alert(t("publish.error.mustBeLoggedIn"))
      return
    }
    setIsSubmitting(true)
    try {
      const acceptedItems = formData.acceptedItems.split(',').map(item => item.trim()).filter(item => item.length > 0)
      const rejectedItems = formData.rejectedItems.split(',').map(item => item.trim()).filter(item => item.length > 0)

      const departureCountry = countries.find(c => c.id === formData.departureCountryId)?.name || ""
      const departureCity = departureCities.find(c => c.id === formData.departureCityId)?.name || ""
      const arrivalCountry = countries.find(c => c.id === formData.arrivalCountryId)?.name || ""
      const arrivalCity = arrivalCities.find(c => c.id === formData.arrivalCityId)?.name || ""

      const newTrip = await createTrip({
        userId: currentUser.id,
        departure: departureCity,
        departureCountry: departureCountry,
        departureCityId: formData.departureCityId,
        arrival: arrivalCity,
        arrivalCountry: arrivalCountry,
        arrivalCityId: formData.arrivalCityId,
        departureDate: formData.departureDate,
        availableKg: Number(formData.availableKg),
        pricePerKg: Number(formData.pricePerKg),
        description: formData.description,
        acceptedItems: acceptedItems,
        rejectedItems: rejectedItems,
      })

      if (newTrip) {
        alert(t("publish.success.tripPublished"))
        router.push(`/trips/${newTrip.id}`)
      } else {
        throw new Error("La création du trajet a échoué.")
      }
    } catch (error) {
      console.error(error)
      alert(t("publish.error.generic"))
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
            <h2 className="text-xl font-bold mb-2">{t("publish.accessDenied.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("publish.accessDenied.subtitle")}</p>
            <Link href="/login">
              <Button>{t("login")}</Button>
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
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{t("publish.title")}</h1>
              <p className="text-muted-foreground">{t("publish.subtitle")}</p>
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
                    <span className="text-sm font-medium hidden sm:inline">{t(`publish.step.${step.key}` as any)}</span>
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
                          {t("publish.departure")}
                        </h3>
                        <div className="space-y-2">
                          <Label>{t("publish.country")}</Label>
                          <select
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                            value={formData.departureCountryId}
                            onChange={(e) => updateForm("departureCountryId", e.target.value)}
                          >
                            <option value="">{t("publish.select")}</option>
                            {countries.map((country) => (
                              <option key={country.id} value={country.id}>
                                {country.flag} {language === 'en' ? country.nameEn : country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>{t("publish.city")}</Label>
                            <select
                              className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                              value={formData.departureCityId}
                              onChange={(e) => updateForm("departureCityId", e.target.value)}
                              disabled={!formData.departureCountryId}
                            >
                              <option value="">{t("publish.select")}</option>
                              {departureCities.map((city) => (
                                <option key={city.id} value={city.id}>
                                  {language === 'en' ? city.nameEn : city.name}
                                </option>
                              ))}
                            </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-foreground" />
                          {t("publish.arrival")}
                        </h3>
                        <div className="space-y-2">
                          <Label>{t("publish.country")}</Label>
                          <select
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                            value={formData.arrivalCountryId}
                            onChange={(e) => updateForm("arrivalCountryId", e.target.value)}
                          >
                            <option value="">{t("publish.select")}</option>
                            {countries.map((country) => (
                              <option key={country.id} value={country.id}>
                                {country.flag} {language === 'en' ? country.nameEn : country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>{t("publish.city")}</Label>
                            <select
                              className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                              value={formData.arrivalCityId}
                              onChange={(e) => updateForm("arrivalCityId", e.target.value)}
                              disabled={!formData.arrivalCountryId}
                            >
                              <option value="">{t("publish.select")}</option>
                              {arrivalCities.map((city) => (
                                <option key={city.id} value={city.id}>
                                  {language === 'en' ? city.nameEn : city.name}
                                </option>
                              ))}
                            </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {t("publish.departureDate")}
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
                          {t("publish.availableKg")}
                        </Label>
                        <Input
                          type="number"
                          placeholder={t("publish.exampleKg")}
                          value={formData.availableKg}
                          onChange={(e) => updateForm("availableKg", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t("publish.pricePerKg")}</Label>
                        <Input
                          type="number"
                          placeholder={t("publish.examplePrice")}
                          value={formData.pricePerKg}
                          onChange={(e) => updateForm("pricePerKg", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>{t("publish.description")}</Label>
                      <Textarea
                        placeholder={t("publish.descriptionPlaceholder")}
                        rows={4}
                        value={formData.description}
                        onChange={(e) => updateForm("description", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t("publish.acceptedItems")}</Label>
                      <Textarea
                        placeholder={t("publish.acceptedItemsPlaceholder")}
                        value={formData.acceptedItems}
                        onChange={(e) => updateForm("acceptedItems", e.target.value)}
                      />
                       <p className="text-xs text-muted-foreground">{t("publish.commaSeparated")}</p>
                    </div>

                    <div className="space-y-2">
                      <Label>{t("publish.rejectedItems")}</Label>
                      <Textarea
                        placeholder={t("publish.rejectedItemsPlaceholder")}
                        value={formData.rejectedItems}
                        onChange={(e) => updateForm("rejectedItems", e.target.value)}
                      />
                       <p className="text-xs text-muted-foreground">{t("publish.commaSeparated")}</p>
                    </div>

                    <div className="p-4 bg-accent/10 rounded-lg flex items-start gap-3">
                      <Info className="h-5 w-5 text-accent mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        {t("publish.infoBox")}
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
                      <h3 className="text-xl font-semibold mb-2">{t("publish.summary.title")}</h3>
                      <p className="text-muted-foreground">{t("publish.summary.subtitle")}</p>
                    </div>

                    <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
                      <div className="flex items-center justify-between pb-4 border-b border-border">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                          <span className="font-medium">{departureCities.find(c => c.id === formData.departureCityId)?.name || t("publish.summary.departureCity")}</span>
                        </div>
                        <span className="text-muted-foreground">→</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{arrivalCities.find(c => c.id === formData.arrivalCityId)?.name || t("publish.summary.arrivalCity")}</span>
                          <div className="w-2 h-2 rounded-full bg-foreground" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">{t("publish.summary.date")}</p>
                          <p className="font-medium">{formData.departureDate || "-"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t("publish.summary.kilos")}</p>
                          <p className="font-medium">{formData.availableKg || "-"} kg</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t("publish.summary.price")}</p>
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
                    {t("common.back")}
                  </Button>
                  <Button onClick={handleNext} disabled={isSubmitting} className="gap-2 w-32">
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : currentStep === 3 ? (
                      t("publish.publishButton")
                    ) : (
                      <>
                        {t("common.next")}
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
