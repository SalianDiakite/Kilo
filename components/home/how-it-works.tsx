"use client"

import { Search, MessageCircle, Package, Check, ArrowRight } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"

export function HowItWorks() {
  const { language } = useLanguage()

  const steps = [
    {
      icon: Search,
      title: language === "fr" ? "Trouvez un trajet" : "Find a trip",
      description:
        language === "fr"
          ? "Recherchez parmi des centaines de voyageurs vers votre destination."
          : "Search among hundreds of travelers to your destination.",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: MessageCircle,
      title: language === "fr" ? "Contactez le voyageur" : "Contact the traveler",
      description:
        language === "fr"
          ? "Discutez des détails de votre colis et convenez des modalités."
          : "Discuss your package details and agree on terms.",
      color: "bg-success/10 text-success",
    },
    {
      icon: Package,
      title: language === "fr" ? "Remettez votre colis" : "Hand over your package",
      description:
        language === "fr"
          ? "Rencontrez le voyageur pour lui confier votre colis en toute sécurité."
          : "Meet the traveler to hand over your package safely.",
      color: "bg-warning/10 text-warning",
    },
    {
      icon: Check,
      title: language === "fr" ? "Livraison confirmée" : "Delivery confirmed",
      description:
        language === "fr"
          ? "Votre colis arrive à destination. Laissez un avis au voyageur."
          : "Your package arrives at destination. Leave a review for the traveler.",
      color: "bg-primary text-primary-foreground",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
            {language === "fr" ? "Comment ça marche" : "How it works"}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {language === "fr" ? "Envoyez vos colis en 4 étapes simples" : "Send your packages in 4 simple steps"}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="flex flex-col items-center text-center">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold z-10">
                    {index + 1}
                  </div>

                  {/* Icon Container */}
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <step.icon className="h-7 w-7" />
                  </div>

                  <h3 className="font-semibold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-8 left-[60%] w-[80%] items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
