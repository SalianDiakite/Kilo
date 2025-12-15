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
    name: string
    avatar: string | null
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
          sender:profiles(id, name, avatar)
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
          })
          .select(`
          *,
          sender:profiles(id, name, avatar)
        `)
          .single()

        if (sendError) throw sendError

        // Add the new message to the local state immediately
        if (data) {
          setMessages((prev) => [...prev, data as RealtimeMessage])
        }

        // Update conversation timestamp
        await supabaseRef.current
          .from("conversations")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", conversationId)

        // Mark the message as read by the sender
        await supabaseRef.current
          .from("conversation_participants")
          .update({ last_read_at: new Date().toISOString() })
          .eq("conversation_id", conversationId)
          .eq("user_id", userId)

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
      // Update participant's last_read_at
      await supabaseRef.current
        .from("conversation_participants")
        .update({ last_read_at: new Date().toISOString() })
        .eq("conversation_id", conversationId)
        .eq("user_id", userId)
        
      // No need to update 'read' column on messages anymore as it's removed.
      // The unread status is now solely derived from last_read_at in RPC.
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
              .select("id, name, avatar")
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
      // Call the RPC function
      const { data, error } = await supabaseRef.current.rpc("get_conversations_for_user", {
        p_user_id: userId,
      })

      if (error) throw error

      // Transform the data to match the component's expected structure
      const transformedConversations = (data || []).map((c) => ({
        id: c.id,
        created_at: c.created_at,
        updated_at: c.updated_at,
        unreadCount: c.unread_count,
        trip: {
          id: c.trip_id,
          departure_city: c.trip_departure_city,
          arrival_city: c.trip_arrival_city,
          available_kg: c.trip_available_kg,
          price_per_kg: c.trip_price_per_kg,
        },
        lastMessage: c.last_message_content
          ? {
              content: c.last_message_content,
              created_at: c.last_message_created_at,
              sender_id: c.last_message_sender_id,
            }
          : null,
        participants: c.participants,
      }))

      setConversations(transformedConversations)
    } catch (err) {
      console.error("Failed to fetch conversations via RPC:", err)
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (!userId) {
      setIsLoading(false)
      return
    }

    fetchConversations()

    // Setup a single, stable channel for all updates related to this user's conversations
    const channel = supabaseRef.current
      .channel(`user-conversations-updates:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        () => {
          fetchConversations()
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "conversation_participants",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchConversations()
        },
      )
      .subscribe()
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "conversation_participants",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          // The user was added to a new conversation. Refetch the list.
          fetchConversations()
        },
      )
      .subscribe()

    channelRef.current = channel

    // Cleanup on unmount or user change
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
