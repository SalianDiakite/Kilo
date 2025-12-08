import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Search, ArrowRight, Sparkles } from "@/components/icons"

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* For Senders */}
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-10 group hover:shadow-2xl transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/20 mb-6">
                <Search className="h-7 w-7" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Vous avez un colis à envoyer ?</h3>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Trouvez un voyageur de confiance et économisez jusqu'à 70% sur vos frais d'envoi.
              </p>
              <Link href="/trips">
                <Button size="lg" variant="secondary" className="gap-2 group-hover:translate-x-1 transition-transform">
                  Trouver un voyageur
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-primary-foreground/5" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary-foreground/5" />
          </div>

          {/* For Travelers */}
          <div className="relative overflow-hidden rounded-3xl bg-accent text-accent-foreground p-8 md:p-10 group hover:shadow-2xl transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-foreground/20 mb-6">
                <Plus className="h-7 w-7" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-2xl md:text-3xl font-bold">Vous voyagez bientôt ?</h3>
                <Sparkles className="h-6 w-6 animate-pulse" />
              </div>
              <p className="text-accent-foreground/80 mb-8 text-lg">
                Rentabilisez vos kilos disponibles et gagnez jusqu'à 300€ par voyage.
              </p>
              <Link href="/publish">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90 group-hover:translate-x-1 transition-transform"
                >
                  Publier mon trajet
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-accent-foreground/5" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-accent-foreground/5" />
          </div>
        </div>
      </div>
    </section>
  )
}
