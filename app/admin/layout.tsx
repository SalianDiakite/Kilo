"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAdmin } from "@/lib/hooks/use-admin"
import { useData } from "@/lib/data-provider"
import { Header } from "@/components/ui/header"
import { Loader2 } from "@/components/icons"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { currentUser, loading } = useData()
  const { isAdmin } = useAdmin()

  useEffect(() => {
    // Redirect non-admin users
    if (!loading && currentUser && !isAdmin) {
      router.push("/dashboard")
    }
    // Redirect non-authenticated users
    if (!loading && !currentUser) {
      router.push("/login")
    }
  }, [loading, currentUser, isAdmin, router])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </main>
      </div>
    )
  }

  // No access message
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Accès refusé</h1>
            <p className="text-muted-foreground">Vous n'avez pas les droits d'accès à cette page.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
