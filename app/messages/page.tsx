"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Send,
  ArrowRight,
  ChevronLeft,
  MoreVertical,
  Phone,
  Info,
  Paperclip,
  Smile,
  ImageIcon,
  Check,
  CheckCircle2,
  Shield,
  Star,
  Archive,
  Trash2,
  BellOff,
} from "@/components/icons"
import { mockConversations } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const currentUserId = "1"

function formatMessageTime(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(date)
}

function formatConversationTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return formatMessageTime(date)
  if (days === 1) return "Hier"
  if (days < 7) return new Intl.DateTimeFormat("fr-FR", { weekday: "short" }).format(date)
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(date)
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const selectedConv = mockConversations.find((c) => c.id === selectedConversation)
  const otherParticipant = selectedConv?.participants.find((p) => p.id !== currentUserId)

  const filteredConversations = mockConversations.filter((conv) => {
    const otherUser = conv.participants.find((p) => p.id !== currentUserId)
    return otherUser?.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedConv?.messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setMessage("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="grid md:grid-cols-[380px_1fr] gap-0 md:gap-4 h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]">
            {/* Conversations List */}
            <div
              className={cn(
                "bg-card rounded-xl border border-border overflow-hidden flex flex-col",
                selectedConversation && "hidden md:flex",
              )}
            >
              {/* Search Header */}
              <div className="p-4 border-b border-border bg-card">
                <h2 className="font-bold text-xl mb-4 text-foreground">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher une conversation..."
                    className="pl-9 bg-secondary border-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Conversations - scrollable */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => {
                    const otherUser = conversation.participants.find((p) => p.id !== currentUserId)
                    const isSelected = selectedConversation === conversation.id
                    const hasUnread = conversation.unreadCount > 0

                    return (
                      <button
                        key={conversation.id}
                        className={cn(
                          "w-full p-4 flex items-start gap-3 hover:bg-secondary/50 transition-colors text-left border-b border-border",
                          isSelected && "bg-secondary",
                        )}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <div className="relative flex-shrink-0">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden">
                            <Image
                              src={otherUser?.avatar || "/placeholder.svg?height=48&width=48&query=user"}
                              alt={otherUser?.name || ""}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success rounded-full border-2 border-card" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "font-medium text-sm truncate",
                                  hasUnread ? "text-foreground" : "text-foreground",
                                )}
                              >
                                {otherUser?.name}
                              </span>
                              {otherUser?.verified && <Shield className="h-3.5 w-3.5 text-accent" />}
                            </div>
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                              {formatConversationTime(conversation.lastMessage?.createdAt || conversation.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <span className="truncate">{conversation.trip.departure}</span>
                            <ArrowRight className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{conversation.trip.arrival}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p
                              className={cn(
                                "text-sm truncate",
                                hasUnread ? "text-foreground font-medium" : "text-muted-foreground",
                              )}
                            >
                              {conversation.lastMessage?.senderId === currentUserId && (
                                <span className="text-muted-foreground">Vous : </span>
                              )}
                              {conversation.lastMessage?.content}
                            </p>
                            {hasUnread && (
                              <Badge className="ml-2 h-5 min-w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </button>
                    )
                  })
                ) : (
                  <div className="p-8 text-center">
                    <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Aucune conversation trouvée</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div
              className={cn(
                "bg-card rounded-xl border border-border overflow-hidden flex flex-col",
                !selectedConversation && "hidden md:flex",
              )}
            >
              {selectedConv && otherParticipant ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border flex items-center justify-between bg-card flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setSelectedConversation(null)}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={otherParticipant.avatar || "/placeholder.svg?height=40&width=40&query=user"}
                          alt={otherParticipant.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm text-foreground">{otherParticipant.name}</h3>
                          {otherParticipant.verified && <Shield className="h-3.5 w-3.5 text-accent" />}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-warning text-warning" />
                            {otherParticipant.rating}
                          </span>
                          <span>•</span>
                          <span>En ligne</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Info className="h-5 w-5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <BellOff className="h-4 w-4 mr-2" />
                            Mettre en sourdine
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="h-4 w-4 mr-2" />
                            Archiver
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Trip Info Banner */}
                  <div className="px-4 py-3 bg-secondary/50 border-b border-border flex-shrink-0">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {selectedConv.trip.departure} → {selectedConv.trip.arrival}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {selectedConv.trip.availableKg} kg dispo
                        </Badge>
                      </div>
                      <span className="font-semibold text-accent">{selectedConv.trip.pricePerKg}€/kg</span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                    {/* Date separator */}
                    <div className="flex items-center gap-4 my-4">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-xs text-muted-foreground">
                        {new Intl.DateTimeFormat("fr-FR", {
                          day: "numeric",
                          month: "long",
                        }).format(selectedConv.messages[0]?.createdAt || new Date())}
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>

                    {selectedConv.messages.map((msg, index) => {
                      const isOwn = msg.senderId === currentUserId
                      const showAvatar =
                        !isOwn && (index === 0 || selectedConv.messages[index - 1]?.senderId !== msg.senderId)

                      return (
                        <div key={msg.id} className={cn("flex items-end gap-2", isOwn && "flex-row-reverse")}>
                          {!isOwn && showAvatar && (
                            <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={otherParticipant.avatar || "/placeholder.svg?height=32&width=32&query=user"}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          {!isOwn && !showAvatar && <div className="w-8" />}
                          <div
                            className={cn(
                              "max-w-[70%] rounded-2xl px-4 py-3",
                              isOwn
                                ? "bg-accent text-accent-foreground rounded-br-md"
                                : "bg-secondary text-secondary-foreground rounded-bl-md",
                            )}
                          >
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                            <div className={cn("flex items-center gap-1.5 mt-1.5", isOwn && "justify-end")}>
                              <span className={cn("text-[10px]", isOwn ? "opacity-70" : "text-muted-foreground")}>
                                {formatMessageTime(msg.createdAt)}
                              </span>
                              {isOwn &&
                                (msg.read ? (
                                  <CheckCircle2 className="h-3 w-3 opacity-70" />
                                ) : (
                                  <Check className="h-3 w-3 opacity-70" />
                                ))}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input - fixed at bottom */}
                  <div className="p-4 border-t border-border bg-card flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                      <div className="flex gap-1">
                        <Button type="button" variant="ghost" size="icon" className="h-10 w-10">
                          <Paperclip className="h-5 w-5 text-muted-foreground" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" className="h-10 w-10 hidden sm:flex">
                          <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </div>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Écrivez votre message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="pr-10 bg-secondary border-0"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        >
                          <Smile className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </div>
                      <Button
                        type="submit"
                        size="icon"
                        className="h-10 w-10 bg-accent hover:bg-accent/90"
                        disabled={!message.trim()}
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center p-8">
                  <div>
                    <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                      <Search className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">Vos messages</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Sélectionnez une conversation pour commencer à discuter avec un voyageur ou un expéditeur
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
