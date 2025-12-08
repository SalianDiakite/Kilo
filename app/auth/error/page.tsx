import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, AlertCircle } from "@/components/icons"

export default async function AuthErrorPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams

  const errorMessages: Record<string, string> = {
    access_denied: "Accès refusé. Veuillez réessayer.",
    server_error: "Erreur serveur. Veuillez réessayer plus tard.",
    otp_expired: "Le lien a expiré. Veuillez demander un nouveau lien.",
    default: "Une erreur est survenue lors de l'authentification.",
  }

  const errorMessage = params.error ? errorMessages[params.error] || errorMessages.default : errorMessages.default

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/20 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Plane className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold tracking-tight">KiloShare</span>
        </Link>

        <Card>
          <CardContent className="p-6 md:p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Erreur d&apos;authentification</h1>
            <p className="text-muted-foreground mb-6">{errorMessage}</p>

            {params.error && (
              <p className="text-xs text-muted-foreground mb-4">
                Code d&apos;erreur : <code className="bg-secondary px-1 py-0.5 rounded">{params.error}</code>
              </p>
            )}

            <div className="flex flex-col gap-2">
              <Link href="/login">
                <Button className="w-full">Retour à la connexion</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  Retour à l&apos;accueil
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
