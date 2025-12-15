"use client"

import { useData } from "@/lib/data-provider"
import type { UserRole } from "@/lib/types"

/**
 * Hook pour vérifier les permissions admin
 * 
 * Usage:
 * ```tsx
 * const { isAdmin, isModerator, hasRole } = useAdmin()
 * 
 * if (isAdmin) {
 *   // Show admin features
 * }
 * ```
 */
export function useAdmin() {
  const { currentUser } = useData()

  const role: UserRole = currentUser?.role || 'user'
  
  const isAdmin = role === 'admin'
  const isModerator = role === 'moderator' || role === 'admin'
  
  const hasRole = (requiredRole: UserRole): boolean => {
    if (requiredRole === 'user') return true
    if (requiredRole === 'moderator') return isModerator
    if (requiredRole === 'admin') return isAdmin
    return false
  }

  const canManageUsers = isAdmin
  const canManageTrips = isModerator
  const canManageCurrencies = isAdmin
  const canViewAnalytics = isModerator

  return {
    role,
    isAdmin,
    isModerator,
    hasRole,
    canManageUsers,
    canManageTrips,
    canManageCurrencies,
    canViewAnalytics,
  }
}
