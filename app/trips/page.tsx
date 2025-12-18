import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trajets disponibles - KiloShare",
  description: "Parcourez les trajets disponibles sur KiloShare. Trouvez un voyageur pour envoyer votre colis à prix réduit vers de nombreuses destinations.",
}

import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { SearchForm } from "@/components/search/search-form"
import { TripsPageClient } from "./trips-client"

export default function TripsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">
        {/* Search Header */}
        <section className="bg-secondary/30 py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Trajets disponibles</h1>
            <SearchForm />
          </div>
        </section>

        {/* Trip List */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <TripsPageClient />
          </div>
        </section>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
