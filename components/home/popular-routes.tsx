import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ChevronRight } from "@/components/icons"
import { popularRoutes } from "@/lib/mock-data"

export function PopularRoutes() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Trajets populaires</h2>
            <p className="text-muted-foreground">Les routes les plus demandées par notre communauté</p>
          </div>
          <Link href="/trips" className="hidden md:flex items-center gap-1 text-sm font-medium hover:underline">
            Voir tous les trajets
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {popularRoutes.map((route, index) => (
            <Link key={index} href={`/trips?from=${route.from}&to=${route.to}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-medium">{route.from}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{route.to}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{route.count} trajets disponibles</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Link
          href="/trips"
          className="md:hidden flex items-center justify-center gap-1 text-sm font-medium mt-6 hover:underline"
        >
          Voir tous les trajets
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
