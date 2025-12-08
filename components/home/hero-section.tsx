"use client"

import Image from "next/image"
import { SearchForm } from "@/components/search/search-form"
import { TrendingUp, Shield, Clock, Users, Star } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { language, t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="gap-2 px-4 py-2 bg-accent/10 text-accent border-0">
                <Star className="h-3.5 w-3.5 fill-current" />
                {language === "fr" ? "+10 000 utilisateurs satisfaits" : "+10,000 satisfied users"}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
                {language === "fr" ? (
                  <>
                    Envoyez vos colis avec des <span className="text-accent">voyageurs de confiance</span>
                  </>
                ) : (
                  <>
                    Send your packages with <span className="text-accent">trusted travelers</span>
                  </>
                )}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl text-pretty">
                {language === "fr"
                  ? "Connectez-vous avec des voyageurs qui ont des kilos disponibles dans leur valise. Simple, rapide et économique."
                  : "Connect with travelers who have available kilos in their luggage. Simple, fast and affordable."}
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-card rounded-2xl p-4 md:p-6 shadow-lg border border-border">
              <SearchForm />
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{language === "fr" ? "Vérifiés" : "Verified"}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === "fr" ? "100% voyageurs" : "100% travelers"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
                  <Clock className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{language === "fr" ? "Rapide" : "Fast"}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === "fr" ? "48h en moyenne" : "48h average"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
                  <TrendingUp className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">-70%</p>
                  <p className="text-xs text-muted-foreground">{language === "fr" ? "vs transport" : "vs shipping"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl" />
              <Image
                src="/traveler-with-suitcase-at-airport-modern-illustrat.jpg"
                alt={language === "fr" ? "Voyageur avec valise" : "Traveler with suitcase"}
                fill
                className="object-cover rounded-3xl"
              />

              {/* Floating Cards */}
              <div className="absolute -left-4 top-1/4 bg-card rounded-xl p-4 shadow-xl border border-border animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">2,547</p>
                    <p className="text-xs text-muted-foreground">
                      {language === "fr" ? "Voyageurs actifs" : "Active travelers"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 bg-card rounded-xl p-4 shadow-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                    <Star className="h-5 w-5 text-success fill-success" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">4.9/5</p>
                    <p className="text-xs text-muted-foreground">
                      {language === "fr" ? "Note moyenne" : "Average rating"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
