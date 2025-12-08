import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, Mail, CheckCircle } from "@/components/icons"

export default function SignUpSuccessPage() {
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
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Inscription réussie !</h1>
            <p className="text-muted-foreground mb-6">
              Un email de confirmation a été envoyé à votre adresse. Veuillez cliquer sur le lien dans l&apos;email pour
              activer votre compte.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-left p-3 rounded-lg bg-secondary/50">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">Vérifiez votre boîte de réception</p>
                  <p className="text-muted-foreground">L&apos;email peut prendre quelques minutes pour arriver.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left p-3 rounded-lg bg-secondary/50">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">Vérifiez vos spams</p>
                  <p className="text-muted-foreground">
                    Si vous ne trouvez pas l&apos;email, regardez dans votre dossier spam.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/login">
                <Button className="w-full">Retour à la connexion</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
