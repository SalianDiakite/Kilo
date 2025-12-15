"use client"

import Link from "next/link"
import { Plane } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"
import { useCurrency } from "@/lib/hooks/use-currency"

export function Footer() {
  const { language, setLanguage, t } = useLanguage()
  const { currentCurrency } = useCurrency()

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr")
  }

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Plane className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">KiloShare</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.description")}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">{language === "fr" ? "Plateforme" : "Platform"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/trips" className="hover:text-foreground transition-colors">
                  {t("nav.trips")}
                </Link>
              </li>
              <li>
                <Link href="/publish" className="hover:text-foreground transition-colors">
                  {t("nav.publish")}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-foreground transition-colors">
                  {t("nav.howItWorks")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.support")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-foreground transition-colors">
                  {t("footer.help")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  {t("footer.faq")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-foreground transition-colors">
                  {t("footer.cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 KiloShare. {t("footer.rights")}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
            >
              {language === "fr" ? "🇫🇷 Français" : "🇬🇧 English"}
            </button>
            <span>{currentCurrency.symbol} {currentCurrency.code}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
