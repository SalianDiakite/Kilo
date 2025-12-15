"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Users, Wallet, BarChart3, Settings, HelpCircle, Plus } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const sidebarItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: t("dashboard.overview") },
    { href: "/dashboard/trips", icon: Package, label: t("dashboard.myTrips") },
    { href: "/dashboard/bookings", icon: Users, label: t("dashboard.bookings") },
    { href: "/dashboard/earnings", icon: Wallet, label: t("dashboard.earnings") },
    { href: "/dashboard/analytics", icon: BarChart3, label: t("dashboard.analytics") },
  ]

  const bottomItems = [
    { href: "/settings", icon: Settings, label: t("nav.settings") },
    { href: "/help", icon: HelpCircle, label: t("dashboard.sidebar.help") },
  ]

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 border-r border-border bg-card min-h-[calc(100vh-64px)]">
      <div className="p-4">
        <Link href="/publish">
          <Button className="w-full gap-2">
            <Plus className="h-4 w-4" />
            {t("dashboard.sidebar.newTrip")}
          </Button>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
