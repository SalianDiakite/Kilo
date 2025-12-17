"use client"

import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { HowItWorks } from "@/components/home/how-it-works"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HowItWorks />
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
