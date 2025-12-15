"use client"

import type React from "react"
import { useRequireAuth } from "@/lib/hooks/use-require-auth"
import { AuthGuard } from "@/components/auth/auth-guard"

/**
 * Layout pour toutes les pages protégées
 * 
 * Ce layout s'applique automatiquement à toutes les pages dans le groupe (protected)
 * Il gère la protection et l'état de chargement de manière centralisée
 */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Protection automatique pour toutes les pages de ce groupe
  useRequireAuth()

  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  )
}
