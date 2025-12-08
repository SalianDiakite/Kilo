"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import type { RealtimeChannel, RealtimePostgresChangesPayload } from "@supabase/supabase-js"

export interface RealtimeMessage {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  type: "text" | "image" | "system"
  read: boolean
  created_at: string
  sender?: {
    id: string
    full_name: string
    avatar_url: string | null
  }
}

interface UseRealtimeMessagesOptions {
  conversationId: string | null
  userId: string | null
  onNewMessage?: (message: RealtimeMessage) => void
}

export function useRealtimeMessages({ conversationId, userId, onNewMessage }: UseRealtimeMessagesOptions) {
  const [messages, setMessages] = useState<RealtimeMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const channelRef = useRef<RealtimeChannel | null>(null)
  const supabaseRef = useRef(createClient())

  // Fetch initial messages
  const fetchMessages = useCallback(async () => {
    if (!conversationId) {
      setMessages([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabaseRef.current
        .from("messages")
        .select(`
          *,
          sender:profiles(id, full_name, avatar_url)
        `)
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true })

      if (fetchError) throw fetchError
      setMessages(data || [])
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch messages"))
    } finally {
      setIsLoading(false)
    }
  }, [conversationId])

  // Send a message
  const sendMessage = useCallback(
    async (content: string) => {
      if (!conversationId || !userId || !content.trim()) return null

      try {
        const { data, error: sendError } = await supabaseRef.current
          .from("messages")
          .insert({
            conversation_id: conversationId,
            sender_id: userId,
            content: content.trim(),
            type: "text",
            read: false,
          })
          .select(`
          *,
          sender:profiles(id, full_name, avatar_url)
        `)
          .single()

        if (sendError) throw sendError

        // Update conversation timestamp
        await supabaseRef.current
          .from("conversations")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", conversationId)

        return data
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to send message"))
        return null
      }
    },
    [conversationId, userId],
  )

  // Mark messages as read
  const markAsRead = useCallback(async () => {
    if (!conversationId || !userId) return

    try {
      // Mark all unread messages from other users as read
      await supabaseRef.current
        .from("messages")
        .update({ read: true })
        .eq("conversation_id", conversationId)
        .neq("sender_id", userId)
        .eq("read", false)

      // Update local state
      setMessages((prev) => prev.map((msg) => (msg.sender_id !== userId ? { ...msg, read: true } : msg)))

      // Update participant's last_read_at
      await supabaseRef.current
        .from("conversation_participants")
        .update({ last_read_at: new Date().toISOString() })
        .eq("conversation_id", conversationId)
        .eq("user_id", userId)
    } catch (err) {
      console.error("Failed to mark messages as read:", err)
    }
  }, [conversationId, userId])

  // Setup realtime subscription
  useEffect(() => {
    if (!conversationId) return

    // Fetch initial messages
    fetchMessages()

    // Create realtime channel for this conversation
    const channel = supabaseRef.current
      .channel(`messages:${conversationId}`)
      .on<RealtimeMessage>(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload: RealtimePostgresChangesPayload<RealtimeMessage>) => {
          const newMessage = payload.new as RealtimeMessage

          // Fetch sender info if not included
          if (!newMessage.sender) {
            const { data: sender } = await supabaseRef.current
              .from("profiles")
              .select("id, full_name, avatar_url")
              .eq("id", newMessage.sender_id)
              .single()

            if (sender) {
              newMessage.sender = sender
            }
          }

          // Add message to state (avoid duplicates)
          setMessages((prev) => {
            const exists = prev.some((m) => m.id === newMessage.id)
            if (exists) return prev
            return [...prev, newMessage]
          })

          // Trigger callback
          onNewMessage?.(newMessage)
        },
      )
      .on<RealtimeMessage>(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload: RealtimePostgresChangesPayload<RealtimeMessage>) => {
          const updatedMessage = payload.new as RealtimeMessage
          setMessages((prev) => prev.map((msg) => (msg.id === updatedMessage.id ? { ...msg, ...updatedMessage } : msg)))
        },
      )
      .subscribe()

    channelRef.current = channel

    // Cleanup on unmount or conversation change
    return () => {
      if (channelRef.current) {
        supabaseRef.current.removeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [conversationId, fetchMessages, onNewMessage])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    markAsRead,
    refetch: fetchMessages,
  }
}

// Hook for listening to conversation list updates
export function useRealtimeConversations(userId: string | null) {
  const [conversations, setConversations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const channelRef = useRef<RealtimeChannel | null>(null)
  const supabaseRef = useRef(createClient())

  const fetchConversations = useCallback(async () => {
    if (!userId) {
      setConversations([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    try {
      // Get conversation IDs where user is a participant
      const { data: participations } = await supabaseRef.current
        .from("conversation_participants")
        .select("conversation_id")
        .eq("user_id", userId)

      if (!participations || participations.length === 0) {
        setConversations([])
        setIsLoading(false)
        return
      }

      const conversationIds = participations.map((p) => p.conversation_id)

      const { data, error } = await supabaseRef.current
        .from("conversations")
        .select(`
          *,
          trip:trips(id, departure_city, arrival_city, departure_date, available_kg, price_per_kg),
          participants:conversation_participants(
            user_id,
            last_read_at,
            user:profiles(id, full_name, avatar_url, is_verified, rating)
          )
        `)
        .in("id", conversationIds)
        .order("updated_at", { ascending: false })

      if (error) throw error

      // Fetch last message and unread count for each conversation
      const conversationsWithMessages = await Promise.all(
        (data || []).map(async (conv) => {
          const { data: lastMessage } = await supabaseRef.current
            .from("messages")
            .select("*")
            .eq("conversation_id", conv.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single()

          const { count: unreadCount } = await supabaseRef.current
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("conversation_id", conv.id)
            .eq("read", false)
            .neq("sender_id", userId)

          return {
            ...conv,
            lastMessage,
            unreadCount: unreadCount || 0,
          }
        }),
      )

      setConversations(conversationsWithMessages)
    } catch (err) {
      console.error("Failed to fetch conversations:", err)
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (!userId) return

    fetchConversations()

    // Subscribe to conversation updates (new messages will update conversations)
    const channel = supabaseRef.current
      .channel(`user-conversations:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
        },
        () => {
          // Refetch conversations when any conversation is updated
          fetchConversations()
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        () => {
          // Refetch when new messages arrive to update unread counts
          fetchConversations()
        },
      )
      .subscribe()

    channelRef.current = channel

    return () => {
      if (channelRef.current) {
        supabaseRef.current.removeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [userId, fetchConversations])

  return {
    conversations,
    isLoading,
    refetch: fetchConversations,
  }
}
