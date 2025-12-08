import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { TripList } from "@/components/trip/trip-list"
import { SearchForm } from "@/components/search/search-form"
import { mockTrips } from "@/lib/mock-data"

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
            <TripList trips={mockTrips} />
          </div>
        </section>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
