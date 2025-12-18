import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { HeroSection } from "@/components/home/hero-section"
import { PopularRoutes } from "@/components/home/popular-routes"
import { HowItWorks } from "@/components/home/how-it-works"
import { RecentTrips } from "@/components/home/recent-trips"
import { CtaSection } from "@/components/home/cta-section"
import { TrustSection } from "@/components/home/trust-section"
import { SponsorsSection } from "@/components/home/sponsors-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { StatsSection } from "@/components/home/stats-section"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "KiloShare - Transport de colis collaboratif entre voyageurs",
  description: "Économisez sur vos envois de colis ou rentabilisez votre voyage en partageant vos kilos disponibles. La plateforme GP (Gratuité Partielle) moderne et sécurisée.",
}

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">
        <HeroSection />
        <StatsSection />
        <PopularRoutes />
        <HowItWorks />
        <RecentTrips />
        <TestimonialsSection />
        <TrustSection />
        <SponsorsSection />
        <CtaSection />
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
