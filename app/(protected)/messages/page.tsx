"use client"

import type React from "react"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

import { useState, useRef, useEffect, useCallback } from "react"
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
  Loader2,
} from "@/components/icons"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/hooks/use-auth"
import { useRealtimeMessages, useRealtimeConversations, type RealtimeMessage } from "@/lib/hooks/use-realtime-messages"
import { TripPriceDisplay } from "@/components/trip/trip-price-display"

function formatMessageTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(d)
}
function formatConversationTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return formatMessageTime(d)
  if (days === 1) return "Hier"
  if (days < 7) return new Intl.DateTimeFormat("fr-FR", { weekday: "short" }).format(d)
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(d)
}

function MessagesPage({ initialConversationId }: { initialConversationId: string | null }) {
  const { user, loading: authLoading } = useAuth()
  const { t } = useLanguage()
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(initialConversationId)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 1. Fetch conversations (Realtime)
  const {
    conversations,
    isLoading: conversationsLoading,
    refetch: refetchConversations,
  } = useRealtimeConversations(user?.id ?? null)

  const handleNewMessage = useCallback(
    (newMessage: RealtimeMessage) => {
      // Play sound or show notification for new messages if needed
      if (newMessage.sender_id !== user?.id) {
        refetchConversations()
      }
    },
    [user?.id, refetchConversations],
  )

  // 2. Fetch messages for selected conversation (Realtime)
  const {
    messages: displayMessages,
    isLoading: messagesLoading,
    sendMessage: sendRealtimeMessage,
    markAsRead,
  } = useRealtimeMessages({
    conversationId: selectedConversationId,
    userId: user?.id ?? null,
    onNewMessage: handleNewMessage,
  })

  // 3. Derived state & Calculations
  const selectedConv = conversations.find((c) => c.id === selectedConversationId)
  
  // Identify other participant
  const otherParticipant = selectedConv?.participants?.[0]

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    const other = conv.participants?.[0]
    return other?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [displayMessages])

  // Mark messages as read when conversation is selected
  useEffect(() => {
    if (selectedConversationId && user?.id) {
      const doMarkAsRead = async () => {
        await markAsRead()
        // After marking as read, we must refetch the conversation list to update the unread count
        refetchConversations() 
      }
      doMarkAsRead()
    }
  }, [selectedConversationId, user?.id, markAsRead, refetchConversations])

  // If there's an initial ID and conversations are loaded, ensure it's selected.
  // This handles the case where the user navigates directly with a query param.
  useEffect(() => {
    if (initialConversationId && conversations.length > 0) {
      const exists = conversations.some(c => c.id === initialConversationId);
      if (exists) {
        setSelectedConversationId(initialConversationId);
      }
    }
  }, [initialConversationId, conversations]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsSending(true)
    await sendRealtimeMessage(message)
    setIsSending(false)
    setMessage("") 
  }

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </main>
        <Footer />
        <MobileNav />
      </div>
    )
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
                selectedConversationId && "hidden md:flex",
              )}
            >
              {/* Search Header */}
              <div className="p-4 border-b border-border bg-card">
                <h2 className="font-bold text-xl mb-4 text-foreground">{t("messages.title")}</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("messages.search")}
                    className="pl-9 bg-secondary border-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Conversations - scrollable */}
              <div className="flex-1 overflow-y-auto">
                {conversationsLoading ? (
                  <div className="p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-accent mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">{t("messages.loading")}</p>
                  </div>
                ) : filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => {
                    const otherUser = conversation.participants?.[0]
                    const isSelected = selectedConversationId === conversation.id
                    const hasUnread = conversation.unreadCount > 0

                    const userName = otherUser?.name
                    const userAvatar = otherUser?.avatar
                    const userVerified = otherUser?.verified                    
                    const lastMessageContent = conversation.lastMessage?.content
                    const lastMessageSenderId = conversation.lastMessage?.sender_id
                    const lastMessageDate = conversation.lastMessage?.created_at || conversation.updated_at
                    
                    const tripDeparture = conversation.trip?.departure_city
                    const tripArrival = conversation.trip?.arrival_city

                    return (
                      <button
                        key={conversation.id}
                        className={cn(
                          "w-full p-4 flex items-start gap-3 hover:bg-secondary/50 transition-colors text-left border-b border-border",
                          isSelected && "bg-secondary",
                        )}
                        onClick={() => setSelectedConversationId(conversation.id)}
                      >
                        <div className="relative flex-shrink-0">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden">
                            <Image
                              src={userAvatar || "/placeholder.svg?height=48&width=48&query=user"}
                              alt={userName || "User"}
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
                                {userName}
                              </span>
                              {userVerified && <Shield className="h-3.5 w-3.5 text-accent" />}
                            </div>
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                              {formatConversationTime(lastMessageDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <span className="truncate">{tripDeparture}</span>
                            <ArrowRight className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{tripArrival}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p
                              className={cn(
                                "text-sm truncate",
                                hasUnread ? "text-foreground font-medium" : "text-muted-foreground",
                              )}
                            >
                              {lastMessageSenderId === user?.id && (
                                <span className="text-muted-foreground">{t("messages.you")}</span>
                              )}
                              {lastMessageContent}
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
                    <p className="text-sm text-muted-foreground">
                      {searchQuery ? t("messages.noConversationFound") : t("messages.noConversations")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div
              className={cn(
                "bg-card rounded-xl border border-border overflow-hidden flex flex-col",
                !selectedConversationId && "hidden md:flex",
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
                        onClick={() => setSelectedConversationId(null)}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={
                            otherParticipant.avatar ||
                            "/placeholder.svg?height=40&width=40&query=user"
                          }
                          alt={otherParticipant.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm text-foreground">
                            {otherParticipant.name}
                          </h3>
                          {otherParticipant.is_verified && (
                            <Shield className="h-3.5 w-3.5 text-accent" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-warning text-warning" />
                            {otherParticipant.rating || 0}
                          </span>
                          <span>•</span>
                          <span className="text-success">{t("messages.online")}</span>
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
                            {t("messages.mute")}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="h-4 w-4 mr-2" />
                            {t("messages.archive")}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t("messages.delete")}
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
                          {`${selectedConv.trip?.departure_city} → ${selectedConv.trip?.arrival_city}`}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {selectedConv.trip?.available_kg} {t("messages.kgAvailable")}
                        </Badge>
                      </div>
                      {selectedConv.trip && (
                        <TripPriceDisplay 
                          amount={selectedConv.trip.price_per_kg} 
                          currencyCode={selectedConv.trip.currency} 
                          perKg={true}
                        />
                      )}
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                    {messagesLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-accent" />
                      </div>
                    ) : displayMessages.length > 0 ? (
                      <>
                        {/* Date separator */}
                        <div className="flex items-center gap-4 my-4">
                          <div className="flex-1 h-px bg-border" />
                          <span className="text-xs text-muted-foreground">
                            {new Intl.DateTimeFormat("fr-FR", {
                              day: "numeric",
                              month: "long",
                            }).format(
                              new Date(displayMessages[0]?.created_at),
                            )}
                          </span>
                          <div className="flex-1 h-px bg-border" />
                        </div>

                        {displayMessages.map((msg: any, index: number) => {
                          const isOwn = msg.sender_id === user?.id
                          const showAvatar =
                            !isOwn &&
                            (index === 0 || displayMessages[index - 1]?.sender_id !== msg.sender_id)

                          return (
                            <div key={msg.id} className={cn("flex items-end gap-2", isOwn && "flex-row-reverse")}>
                              {!isOwn && showAvatar && (
                                <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                                  <Image
                                    src={
                                      otherParticipant.avatar ||
                                      "/placeholder.svg?height=32&width=32&query=user"
                                    }
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
                                    {formatMessageTime(msg.created_at)}
                                  </span>
                                  {isOwn && (
                                      <Check className="h-3 w-3 opacity-70" />
                                    )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full text-center">
                        <div>
                          <p className="text-muted-foreground text-sm">{t("messages.noMessages")}</p>
                          <p className="text-muted-foreground text-xs mt-1">{t("messages.startConversation")}</p>
                        </div>
                      </div>
                    )}
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
                          placeholder={t("messages.writeMessage")}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="pr-10 bg-secondary border-0"
                          disabled={isSending}
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
                        disabled={!message.trim() || isSending}
                      >
                        {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
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
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{t("messages.yourMessages")}</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      {t("messages.selectConversation")}
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


function MessagesPageWrapper() {
  const searchParams = useSearchParams()
  const initialConversationId = searchParams.get("conversation")
  return <MessagesPage initialConversationId={initialConversationId} />
}

export default function SuspendedMessagesPage() {
    return (
        <Suspense fallback={
          <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </main>
            <Footer />
            <MobileNav />
          </div>
        }>
            <MessagesPageWrapper />
        </Suspense>
    )
}

