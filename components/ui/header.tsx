"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, Plane, Bell, Plus, User, LayoutDashboard, Settings, LogOut, MessageCircle } from "@/components/icons"
import { cn } from "@/lib/utils"
import { mockUsers, mockNotifications } from "@/lib/mock-data"

interface HeaderProps {
  transparent?: boolean
}

const currentUser = mockUsers[0]
const unreadNotifs = mockNotifications.filter((n) => !n.read).length

export function Header({ transparent = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-200",
        transparent ? "bg-transparent" : "bg-background/95 backdrop-blur-md border-b border-border",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Plane className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">KiloShare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/trips"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Trajets disponibles
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/how-it-works"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Comment ça marche
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                    {unreadNotifs}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/messages">
              <Button variant="ghost" size="icon" className="relative">
                <MessageCircle className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                  2
                </span>
              </Button>
            </Link>

            <Link href="/publish">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                Publier
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 pl-2">
                  <div className="relative h-7 w-7 rounded-full overflow-hidden">
                    <Image
                      src={currentUser.avatar || "/placeholder.svg?height=28&width=28&query=user"}
                      alt={currentUser.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="max-w-[100px] truncate">{currentUser.name.split(" ")[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    Mon profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    Paramètres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 -mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-1">
            <Link
              href="/trips"
              className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trajets disponibles
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/notifications"
              className="flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Notifications</span>
              {unreadNotifs > 0 && (
                <span className="h-5 w-5 rounded-full bg-accent text-xs font-bold text-accent-foreground flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Paramètres
            </Link>
            <div className="pt-4 border-t border-border mt-4 space-y-2">
              <Link href="/publish" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Plus className="h-4 w-4" />
                  Publier une annonce
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
