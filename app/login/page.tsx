"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Plane, ArrowRight, Loader2, AlertCircle, CheckCircle } from "@/components/icons"
import { signIn, signUp } from "@/lib/db/auth"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/hooks/use-auth"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/dashboard"
  const { t } = useLanguage()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirect)
    }
  }, [isAuthenticated, router, redirect])

  const [isLoading, setIsLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (isRegister) {
        // Validation
        if (password !== confirmPassword) {
          setError("Les mots de passe ne correspondent pas")
          setIsLoading(false)
          return
        }
        if (password.length < 6) {
          setError("Le mot de passe doit contenir au moins 6 caractères")
          setIsLoading(false)
          return
        }

        // Sign up with Supabase
        await signUp(email, password, name)
        setSuccess("Compte créé ! Vérifiez votre email pour confirmer votre inscription.")
        setIsRegister(false)
      } else {
        // Sign in with Supabase
        await signIn(email, password)
        router.push(redirect)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue"
      // Traduire les erreurs Supabase courantes
      if (errorMessage.includes("Invalid login credentials")) {
        setError("Email ou mot de passe incorrect")
      } else if (errorMessage.includes("Email not confirmed")) {
        setError("Veuillez confirmer votre email avant de vous connecter")
      } else if (errorMessage.includes("User already registered")) {
        setError("Un compte existe déjà avec cet email")
      } else {
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

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
          <CardContent className="p-6 md:p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">{isRegister ? t("register") : t("login")}</h1>
              <p className="text-muted-foreground">
                {isRegister ? "Rejoignez la communauté KiloShare" : "Accédez à votre espace personnel"}
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4 shrink-0" />
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    placeholder="Jean Dupont"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={isRegister}
                    disabled={isLoading}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  {!isRegister && (
                    <Link href="/forgot-password" className="text-xs text-accent hover:underline">
                      Mot de passe oublié ?
                    </Link>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>

              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>
              )}

              <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  <>
                    {isRegister ? "Créer mon compte" : t("login")}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isRegister ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
                <button
                  type="button"
                  className="font-medium text-accent hover:underline"
                  onClick={() => {
                    setIsRegister(!isRegister)
                    setError(null)
                    setSuccess(null)
                  }}
                  disabled={isLoading}
                >
                  {isRegister ? t("login") : t("register")}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          En continuant, vous acceptez nos{" "}
          <Link href="/terms" className="underline hover:text-foreground">
            Conditions d&apos;utilisation
          </Link>{" "}
          et notre{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Politique de confidentialité
          </Link>
        </p>
      </div>
    </div>
  )
}
