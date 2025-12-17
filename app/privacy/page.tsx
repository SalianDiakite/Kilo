"use client"

import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { useLanguage } from "@/lib/language-context"

export default function PrivacyPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="prose prose-gray max-w-3xl mx-auto dark:prose-invert">
            <h1>{t("footer.privacy")}</h1>
            <p>
              This is a placeholder for the Privacy Policy page. The content for the privacy policy will be placed
              here.
            </p>
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us. For example, we collect information when you create an
              account, subscribe, participate in any interactive features of our services, fill out a form, request
              customer support or otherwise communicate with us.
            </p>
            <h2>2. How We Use Information</h2>
            <p>
              We may use the information we collect to:
              <ul>
                <li>Provide, maintain, and improve our services;</li>
                <li>Respond to your comments, questions, and requests and provide customer service;</li>
                <li>
                  Communicate with you about products, services, offers, promotions, rewards, and events offered by
                  KiloShare and others;
                </li>
              </ul>
            </p>
            <h2>3. Sharing of Information</h2>
            <p>
              We may share the information we collect as follows:
              <ul>
                <li>With vendors, consultants, and other service providers who need access to such information to carry
                  out work on our behalf;</li>
                <li>In response to a request for information if we believe disclosure is in accordance with any
                  applicable law, regulation or legal process;</li>
              </ul>
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
