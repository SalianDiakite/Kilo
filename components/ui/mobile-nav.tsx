"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Plus, MessageCircle, LayoutDashboard } from "@/components/icons"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "Accueil" },
  { href: "/trips", icon: Search, label: "Trajets" },
  { href: "/publish", icon: Plus, label: "Publier", highlight: true },
  { href: "/messages", icon: MessageCircle, label: "Messages", badge: 2 },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
]

export function MobileNav() {
  const pathname = usePathname()

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
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.badge && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
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
