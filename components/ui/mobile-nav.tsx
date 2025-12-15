"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Plus, MessageCircle, LayoutDashboard } from "@/components/icons"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { useData } from "@/lib/data-provider"

export function MobileNav() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { isAuthenticated, totalUnreadMessages } = useData()

  const showUserMenu = isAuthenticated

  const navItems = [
    { href: "/", icon: Home, labelKey: "nav.home" as const },
    { href: "/trips", icon: Search, labelKey: "nav.trips" as const },
    { href: "/publish", icon: Plus, labelKey: "nav.publish" as const, highlight: true },
    { href: "/messages", icon: MessageCircle, labelKey: "nav.messages" as const, badge: totalUnreadMessages },
    { href: "/dashboard", icon: LayoutDashboard, labelKey: "nav.dashboard" as const },
  ].filter(item => {
    // Only show dashboard and messages if user is authenticated
    if (item.href === "/dashboard" || item.href === "/messages") {
      return showUserMenu
    }
    return true
  })

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          const Icon = item.icon

          if (item.highlight) {
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center -mt-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 relative",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{t(item.labelKey)}</span>
              {item.badge > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
