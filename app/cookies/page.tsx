"use client"

import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { useLanguage } from "@/lib/language-context"

export default function CookiesPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="prose prose-gray max-w-3xl mx-auto dark:prose-invert">
            <h1>{t("footer.cookies")}</h1>
            <p>
              This is a placeholder for the Cookie Policy page. The content for the cookie policy will be placed here.
            </p>
            <h2>1. What are cookies?</h2>
            <p>
              A cookie is a small text file that a website saves on your computer or mobile device when you visit the
              site. It enables the website to remember your actions and preferences (such as login, language, font size
              and other display preferences) over a period of time, so you don’t have to keep re-entering them whenever
              you come back to the site or browse from one page to another.
            </p>
            <h2>2. How do we use cookies?</h2>
            <p>
              We use cookies to:
              <ul>
                <li>Remember your preferences</li>
                <li>Keep you signed in</li>
                <li>Understand how you use our services</li>
                <li>Show you relevant advertising</li>
              </ul>
            </p>
            <h2>3. How to manage cookies</h2>
            <p>
              You can control and/or delete cookies as you wish – for details, see aboutcookies.org. You can delete all
              cookies that are already on your computer and you can set most browsers to prevent them from being placed.
              If you do this, however, you may have to manually adjust some preferences every time you visit a site and
              some services and functionalities may not work.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
