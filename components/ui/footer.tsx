import Link from "next/link"
import { Plane } from "@/components/icons"

export function Footer() {
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
            <p className="text-sm text-muted-foreground leading-relaxed">
              La plateforme de confiance pour envoyer vos colis avec des voyageurs vérifiés.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Plateforme</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/trips" className="hover:text-foreground transition-colors">
                  Trajets
                </Link>
              </li>
              <li>
                <Link href="/publish" className="hover:text-foreground transition-colors">
                  Publier
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-foreground transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-foreground transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-foreground transition-colors">
                  Sécurité
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  CGU
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 KiloShare. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>🇫🇷 Français</span>
            <span>€ EUR</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
