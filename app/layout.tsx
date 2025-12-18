import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/lib/theme-context"
import { LanguageProvider } from "@/lib/language-context"
import { DataProvider } from "@/lib/data-provider"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KiloShare - Envoyez vos colis avec des voyageurs",
    template: "%s | KiloShare",
  },
  description:
    "Plateforme de mise en relation entre voyageurs avec des kilos disponibles et personnes souhaitant envoyer des colis entre pays.",
  generator: "v0.app",
  keywords: ["colis", "voyage", "transport", "kilos", "envoi", "international", "kiloshare", "GP", "gratuité partielle"],
  authors: [{ name: "KiloShare" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "KiloShare",
    title: "KiloShare - Envoyez vos colis avec des voyageurs",
    description: "Plateforme de mise en relation entre voyageurs avec des kilos disponibles et personnes souhaitant envoyer des colis entre pays.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KiloShare - Transport de colis collaboratif",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KiloShare - Envoyez vos colis avec des voyageurs",
    description: "Plateforme de mise en relation entre voyageurs avec des kilos disponibles et personnes souhaitant envoyer des colis entre pays.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "fr-FR": SITE_URL,
      "en-US": SITE_URL,
      "x-default": SITE_URL,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0d0d",
}

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <DataProvider>{children}</DataProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
