"use client"

import Link from "next/link"
import { useAdmin } from "@/lib/hooks/use-admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Plane, DollarSign, Settings, ChevronRight, Shield } from "@/components/icons"

export default function AdminDashboardPage() {
  const { role } = useAdmin()

  const adminModules = [
    {
      title: "Gestion Utilisateurs",
      description: "Gérer les comptes, rôles et permissions",
      icon: Users,
      href: "/admin/users",
      badge: "Admin",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Gestion Trajets",
      description: "Modérer et gérer les trajets publiés",
      icon: Plane,
      href: "/admin/trips",
      badge: "Modérateur",
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Devises & Taux",
      description: "Configurer les devises et taux de change",
      icon: DollarSign,
      href: "/admin/currencies",
      badge: "Admin",
      color: "bg-yellow-500/10 text-yellow-500",
    },
    {
      title: "Paramètres",
      description: "Configuration globale de l'application",
      icon: Settings,
      href: "/admin/settings",
      badge: "Admin",
      color: "bg-purple-500/10 text-purple-500",
    },
  ]

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <Shield className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Administration</h1>
            <p className="text-sm text-muted-foreground">
              Rôle actuel: <Badge variant="secondary" className="ml-1">{role}</Badge>
            </p>
          </div>
        </div>
      </div>

      {/* Admin Modules Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {adminModules.map((module) => (
          <Link key={module.href} href={module.href}>
            <Card className="hover:bg-secondary/50 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${module.color}`}>
                      <module.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{module.title}</h3>
                        <Badge variant="outline" className="text-xs">{module.badge}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Statistiques rapides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">-</p>
              <p className="text-sm text-muted-foreground">Utilisateurs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">-</p>
              <p className="text-sm text-muted-foreground">Trajets actifs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">-</p>
              <p className="text-sm text-muted-foreground">Réservations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">-</p>
              <p className="text-sm text-muted-foreground">Volume (€)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
