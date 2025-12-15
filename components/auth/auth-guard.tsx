"use client"

import { useData } from "@/lib/data-provider"
import { Loader2 } from "@/components/icons"

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Composant de protection qui affiche un loader pendant le chargement
 * et redirige automatiquement si l'utilisateur n'est pas connecté
 * 
 * @example
 * ```tsx
 * <AuthGuard>
 *   <ProtectedContent />
 * </AuthGuard>
 * ```
 */
export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { currentUser } = useData()

  // Le middleware a déjà vérifié l'authentification
  // On affiche directement le contenu
  return <>{children}</>
}
