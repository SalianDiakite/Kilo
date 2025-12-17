"use client"

import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { useLanguage } from "@/lib/language-context"

export default function TermsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="prose prose-gray max-w-3xl mx-auto dark:prose-invert">
            <h1>{t("footer.terms")}</h1>
            <p>
              This is a placeholder for the Terms of Service page. The content for the terms of service will be placed
              here.
            </p>
            <h2>1. Agreement to Terms</h2>
            <p>
              By using our Service, you agree to be bound by these Terms. If you don’t agree to be bound by these Terms,
              do not use the Service.
            </p>
            <h2>2. Changes to Terms or Services</h2>
            <p>
              We may update the Terms at any time, in our sole discretion. If we do so, we’ll let you know either by
              posting the updated Terms on the Site or through other communications.
            </p>
            <h2>3. Content Ownership</h2>
            <p>
              We do not claim any ownership rights in any User Content and nothing in these Terms will be deemed to
              restrict any rights that you may have to use and exploit your User Content.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
