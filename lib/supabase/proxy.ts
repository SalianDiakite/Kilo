import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Ignorer les routes API, statiques et autres fichiers
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next()
  }

  // Routes publiques qui ne nécessitent pas de vérification d'auth
  const publicRoutes = [
    "/trips",
    "/how-it-works",
    "/forgot-password",
    "/reset-password",
    "/auth",
    "/terms",
    "/privacy",
  ]
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))
  
  // Si c'est une route publique, continuer sans vérification d'auth
  if (isPublicRoute) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // Si erreur de récupération de l'utilisateur, continuer sans redirection
  if (error) {
    console.error("Error getting user in middleware:", error)
    return supabaseResponse
  }

  // Vérifier que l'utilisateur existe vraiment (user peut être null même sans erreur)
  const isAuthenticated = !!user

  // Routes protégées - rediriger vers login si non connecté
  const protectedRoutes = ["/dashboard", "/profile", "/messages", "/notifications", "/settings", "/publish"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute && !isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  // Ne pas rediriger depuis login/register - laisser l'utilisateur accéder à ces pages
  // Le composant de login gérera la redirection après connexion réussie

  // Ne pas rediriger depuis la page d'accueil - laisser l'utilisateur choisir
  // Le header affichera le menu utilisateur si connecté

  return supabaseResponse
}
