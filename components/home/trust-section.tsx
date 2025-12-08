import { Shield, Lock, CreditCard, Clock, CheckCircle2 } from "@/components/icons"

const features = [
  {
    icon: Shield,
    title: "Voyageurs vérifiés",
    description: "Chaque voyageur est vérifié via son identité, email et téléphone.",
  },
  {
    icon: Lock,
    title: "Transactions sécurisées",
    description: "Paiements sécurisés avec libération des fonds après livraison.",
  },
  {
    icon: CreditCard,
    title: "Assurance incluse",
    description: "Vos colis sont assurés jusqu'à 500€ en cas de problème.",
  },
  {
    icon: Clock,
    title: "Support 24/7",
    description: "Notre équipe est disponible pour vous aider à tout moment.",
  },
]

export function TrustSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">Pourquoi nous faire confiance</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            KiloShare met la sécurité et la confiance au coeur de chaque transaction
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {["SSL Sécurisé", "RGPD Conforme", "Support FR", "Avis vérifiés"].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm text-muted-foreground"
            >
              <CheckCircle2 className="h-4 w-4 text-success" />
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
