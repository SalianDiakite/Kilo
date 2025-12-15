"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useData } from "@/lib/data-provider"

/**
 * Hook pour forcer la connexion sur une page
 * Redirige automatiquement vers /login si l'utilisateur n'est pas connecté
 * 
 * @example
 * ```tsx
 * function ProtectedPage() {
 *   const { isAuthenticated, loading } = useRequireAuth()
 *   
 *   if (loading) return <div>Chargement...</div>
 *   
 *   return <div>Contenu protégé</div>
 * }
 * ```
 */
export function useRequireAuth() {
  const { isAuthenticated, loading, useMockData } = useData()
  const router = useRouter()

  useEffect(() => {
    // En mode mock, on ne redirige jamais (pour le développement)
    if (useMockData) return

    // Si le chargement est terminé et l'utilisateur n'est pas connecté
    if (!loading && !isAuthenticated) {
      const currentPath = window.location.pathname
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
    }
  }, [isAuthenticated, loading, useMockData, router])

  return { isAuthenticated, loading }
}
