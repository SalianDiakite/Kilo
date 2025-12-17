"use client"

import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t("contact.title")}</h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                {t("contact.subtitle")}
              </p>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("contact.name")}</Label>
                  <Input id="name" placeholder={t("contact.namePlaceholder")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("contact.email")}</Label>
                  <Input id="email" type="email" placeholder={t("contact.emailPlaceholder")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{t("contact.subject")}</Label>
                <Input id="subject" placeholder={t("contact.subjectPlaceholder")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t("contact.message")}</Label>
                <Textarea id="message" placeholder={t("contact.messagePlaceholder")} className="min-h-[120px]" />
              </div>
              <Button type="submit" className="w-full">
                {t("contact.sendMessage")}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
