"use client"

import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { useLanguage } from "@/lib/language-context"

export default function HelpPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="prose prose-gray max-w-3xl mx-auto dark:prose-invert">
            <h1>{t("footer.help")}</h1>
            <p>
              This is a placeholder for the Help Center page. The content for the help center will be placed here.
            </p>
            <h2>Getting Started</h2>
            <p>
              Information about how to create an account, publish a trip, and book kilos.
            </p>
            <h2>Account & Profile</h2>
            <p>
              Information about managing your account, profile settings, and verification.
            </p>
            <h2>Payments & Fees</h2>
            <p>
              Information about our payment system, fees, and withdrawal methods.
            </p>
            <h2>Trust & Safety</h2>
            <p>
              Information about our trust and safety measures, including user verification and insurance.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
