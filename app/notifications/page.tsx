"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockNotifications } from "@/lib/mock-data"
import {
  Bell,
  BellOff,
  MessageCircle,
  Star,
  Wallet,
  Clock,
  ShieldCheck,
  Package,
  Check,
  Trash2,
  Settings,
} from "@/components/icons"
import { cn } from "@/lib/utils"
import type { Notification } from "@/lib/types"

const notificationIcons: Record<Notification["type"], React.ElementType> = {
  booking: Package,
  message: MessageCircle,
  review: Star,
  payment: Wallet,
  reminder: Clock,
  system: ShieldCheck,
}

const notificationColors: Record<Notification["type"], string> = {
  booking: "bg-accent/10 text-accent",
  message: "bg-blue-500/10 text-blue-500",
  review: "bg-warning/10 text-warning",
  payment: "bg-success/10 text-success",
  reminder: "bg-orange-500/10 text-orange-500",
  system: "bg-muted text-muted-foreground",
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 60) return `Il y a ${minutes} min`
  if (hours < 24) return `Il y a ${hours}h`
  if (days === 1) return "Hier"
  if (days < 7) return `Il y a ${days} jours`
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(date)
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const allNotifications = notifications
  const unreadNotifications = notifications.filter((n) => !n.read)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0 bg-secondary/20">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} non lue${unreadCount > 1 ? "s" : ""}` : "Toutes lues"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="gap-2">
                  <Check className="h-4 w-4" />
                  Tout marquer comme lu
                </Button>
              )}
              <Link href="/settings/notifications">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                Toutes ({allNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Non lues ({unreadNotifications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-2">
              {allNotifications.length > 0 ? (
                allNotifications.map((notif) => {
                  const Icon = notificationIcons[notif.type]
                  return (
                    <Card
                      key={notif.id}
                      className={cn(
                        "transition-colors cursor-pointer hover:shadow-sm",
                        !notif.read && "bg-accent/5 border-accent/20",
                      )}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {notif.metadata?.senderAvatar ? (
                            <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={notif.metadata.senderAvatar || "/placeholder.svg"}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0",
                                notificationColors[notif.type],
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className={cn("text-sm", !notif.read && "font-medium")}>{notif.title}</p>
                                <p className="text-sm text-muted-foreground mt-0.5">{notif.message}</p>
                              </div>
                              {!notif.read && <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">{formatTimeAgo(notif.createdAt)}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 flex-shrink-0 opacity-0 group-hover:opacity-100 hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notif.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <BellOff className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">Aucune notification</h3>
                    <p className="text-sm text-muted-foreground">Vous n'avez pas encore de notifications</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="unread" className="space-y-2">
              {unreadNotifications.length > 0 ? (
                unreadNotifications.map((notif) => {
                  const Icon = notificationIcons[notif.type]
                  return (
                    <Card
                      key={notif.id}
                      className="bg-accent/5 border-accent/20 transition-colors cursor-pointer hover:shadow-sm"
                      onClick={() => markAsRead(notif.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {notif.metadata?.senderAvatar ? (
                            <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={notif.metadata.senderAvatar || "/placeholder.svg"}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0",
                                notificationColors[notif.type],
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-medium">{notif.title}</p>
                                <p className="text-sm text-muted-foreground mt-0.5">{notif.message}</p>
                              </div>
                              <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">{formatTimeAgo(notif.createdAt)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">Tout est à jour</h3>
                    <p className="text-sm text-muted-foreground">Vous avez lu toutes vos notifications</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
