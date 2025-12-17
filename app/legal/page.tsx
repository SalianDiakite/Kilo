"use client"

import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { useLanguage } from "@/lib/language-context"

export default function LegalPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="prose prose-gray max-w-3xl mx-auto dark:prose-invert">
            <h1>{t("footer.legal")}</h1>
            <p>
              This is a placeholder for the Legal page. The content for the legal terms and conditions will be placed
              here.
            </p>
            <h2>1. Introduction</h2>
            <p>
              Welcome to KiloShare. These are the terms and conditions governing your access to and use of the KiloShare
              website and its related sub-domains, sites, services and tools.
            </p>
            <h2>2. User Responsibilities</h2>
            <p>
              You are responsible for your account and any activity on it. You are also responsible for the content you
              post and the consequences of that content.
            </p>
            <h2>3. Prohibited Activities</h2>
            <p>
              You are prohibited from using the service for any illegal or unauthorized purpose. You must not, in the
              use of the Service, violate any laws in your jurisdiction.
            </p>
            <h2>4. Limitation of Liability</h2>
            <p>
              In no event shall KiloShare, nor its directors, employees, partners, agents, suppliers, or affiliates, be
              liable for any indirect, incidental, special, consequential or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the Service.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
