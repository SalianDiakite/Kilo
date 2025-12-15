"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
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
import { useLanguage } from "@/lib/language-context"
import { useData } from "@/lib/data-provider"
import { signOut } from "@/lib/db/auth"



interface HeaderProps {
  transparent?: boolean
}

export function Header({ transparent = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { t } = useLanguage()
  const router = useRouter()

  const { currentUser, notifications, totalUnreadMessages, totalUnreadNotifications, isAuthenticated } = useData()

  // Afficher le menu utilisateur si authentifié et currentUser existe
  const showUserMenu = isAuthenticated && !!currentUser

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signOut()
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

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
              {t("nav.availableTrips")}
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("nav.dashboard")}
              </Link>
            )}
            <Link
              href="/how-it-works"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav.howItWorks")}
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">

            {showUserMenu ? (
              <>
                <Link href="/notifications">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {totalUnreadNotifications > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                        {totalUnreadNotifications}
                      </span>
                    )}
                  </Button>
                </Link>

                <Link href="/messages">
                  <Button variant="ghost" size="icon" className="relative">
                    <MessageCircle className="h-5 w-5" />
                    {totalUnreadMessages > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                      {totalUnreadMessages}
                    </span>
                    )}
                  </Button>
                </Link>

                <Link href="/publish">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Plus className="h-4 w-4" />
                    {t("nav.publish")}
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 pl-2">
                      <div className="relative h-7 w-7 rounded-full overflow-hidden bg-secondary">
                        {currentUser?.avatar ? (
                          <Image
                            src={currentUser.avatar}
                            alt={currentUser.name || "User"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full bg-primary text-primary-foreground text-xs font-semibold">
                            {(currentUser?.name || "U")[0].toUpperCase()}
                          </div>
                        )}
                      </div>
                      <span className="max-w-[100px] truncate">
                        {currentUser?.name || "User"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">
                        {currentUser?.name || "Utilisateur"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {currentUser?.email || ""}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                        <User className="h-4 w-4" />
                        {t("nav.profile")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                        <LayoutDashboard className="h-4 w-4" />
                        {t("nav.dashboard")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                        <Settings className="h-4 w-4" />
                        {t("nav.settings")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive cursor-pointer"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {isLoggingOut ? "Déconnexion..." : t("nav.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    {t("login")}
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="sm">{t("register")}</Button>
                </Link>
              </>
            )}
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
              {t("nav.availableTrips")}
            </Link>
            {showUserMenu && (
              <Link
                href="/dashboard"
                className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.dashboard")}
              </Link>
            )}
            {showUserMenu && (
              <>
                <Link
                  href="/notifications"
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{t("nav.notifications")}</span>
                  {totalUnreadNotifications > 0 && (
                    <span className="h-5 w-5 rounded-full bg-accent text-xs font-bold text-accent-foreground flex items-center justify-center">
                      {totalUnreadNotifications}
                    </span>
                  )}
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.settings")}
                </Link>
              </>
            )}
            <div className="pt-4 border-t border-border mt-4 space-y-2">
              {showUserMenu ? (
                <>
                  <Link href="/publish" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <Plus className="h-4 w-4" />
                      {t("nav.publishAd")}
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleLogout()
                    }}
                    disabled={isLoggingOut}
                  >
                    <LogOut className="h-4 w-4" />
                    {isLoggingOut ? "Déconnexion..." : t("nav.logout")}
                  </Button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">{t("login")}</Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
