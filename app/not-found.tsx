"use client"

import Link from "next/link"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-secondary/20">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="max-w-md mx-auto">
            <HelpCircle className="h-24 w-24 mx-auto mb-6 text-muted-foreground/50" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              404
            </h1>
            <h2 className="mt-4 text-2xl font-semibold text-foreground">
              {t("notFound.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("notFound.description")}
            </p>
            <Link href="/" className="mt-8 inline-block">
              <Button size="lg">{t("notFound.goHome")}</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
