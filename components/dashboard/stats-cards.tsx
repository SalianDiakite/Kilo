"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Package, Eye, MessageCircle, Wallet } from "@/components/icons"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: React.ReactNode
}

function StatCard({ title, value, change, changeLabel, icon }: StatCardProps) {
  const isPositive = change && change > 0

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className={cn("text-xs font-medium", isPositive ? "text-success" : "text-destructive")}>
                  {isPositive ? "+" : ""}
                  {change}%
                </span>
                {changeLabel && <span className="text-xs text-muted-foreground">{changeLabel}</span>}
              </div>
            )}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

interface StatsCardsProps {
  stats: {
    totalTrips: number
    activeTrips: number
    totalBookings: number
    pendingBookings: number
    totalViews: number
    totalEarnings: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Trajets actifs"
        value={stats.activeTrips}
        change={12}
        changeLabel="ce mois"
        icon={<Package className="h-5 w-5 text-muted-foreground" />}
      />
      <StatCard
        title="Réservations"
        value={stats.totalBookings}
        change={8}
        changeLabel="ce mois"
        icon={<MessageCircle className="h-5 w-5 text-muted-foreground" />}
      />
      <StatCard
        title="Vues totales"
        value={stats.totalViews}
        change={24}
        changeLabel="cette semaine"
        icon={<Eye className="h-5 w-5 text-muted-foreground" />}
      />
      <StatCard
        title="Revenus"
        value={`${stats.totalEarnings}€`}
        change={15}
        changeLabel="ce mois"
        icon={<Wallet className="h-5 w-5 text-muted-foreground" />}
      />
    </div>
  )
}
