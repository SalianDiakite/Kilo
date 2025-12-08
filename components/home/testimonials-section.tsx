import Image from "next/image"
import { Star, Quote } from "@/components/icons"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Fatou Diallo",
    role: "Expéditrice régulière",
    avatar: "/african-woman-portrait-professional.jpg",
    content:
      "Grâce à KiloShare, j'envoie des colis à ma famille au Sénégal tous les mois. C'est rapide, fiable et beaucoup moins cher que la poste !",
    rating: 5,
    location: "Paris → Dakar",
  },
  {
    name: "Mohamed El Amrani",
    role: "Voyageur vérifié",
    avatar: "/moroccan-man-portrait-professional.jpg",
    content:
      "Je voyage souvent entre Casablanca et Paris. KiloShare me permet de rentabiliser mes kilos disponibles tout en aidant la communauté.",
    rating: 5,
    location: "Casablanca → Paris",
  },
  {
    name: "Aminata Koné",
    role: "Expéditrice",
    avatar: "/smiling-african-woman.png",
    content:
      "Super plateforme ! Les voyageurs sont vérifiés et la communication est facile. Mon colis est arrivé en 2 jours seulement.",
    rating: 5,
    location: "Lyon → Abidjan",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">Ce que disent nos utilisateurs</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Rejoignez des milliers d'utilisateurs satisfaits</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-accent/10" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= testimonial.rating ? "fill-warning text-warning" : "text-muted"}`}
                    />
                  ))}
                </div>

                <p className="text-foreground mb-6 text-sm leading-relaxed">"{testimonial.content}"</p>

                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-accent">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
