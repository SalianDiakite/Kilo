"use client"

import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import {
  getConversations,
  getConversation,
  getConversationMessages,
  sendMessage,
  markMessagesAsRead,
  createConversation,
} from "@/lib/db/messages"
import type { DbMessageInsert } from "@/lib/db/types"

export function useConversations(userId: string | null) {
  return useSWR(userId ? ["conversations", userId] : null, () => (userId ? getConversations(userId) : null), {
    revalidateOnFocus: false,
    refreshInterval: 30000,
  })
}

export function useConversation(conversationId: string | null) {
  return useSWR(
    conversationId ? ["conversation", conversationId] : null,
    () => (conversationId ? getConversation(conversationId) : null),
    { revalidateOnFocus: false },
  )
}

export function useConversationMessages(conversationId: string | null) {
  return useSWR(
    conversationId ? ["messages", conversationId] : null,
    () => (conversationId ? getConversationMessages(conversationId) : null),
    { revalidateOnFocus: false, refreshInterval: 5000 },
  )
}

export function useSendMessage() {
  return useSWRMutation("messages", async (_key: string, { arg }: { arg: DbMessageInsert }) => sendMessage(arg))
}

export function useMarkAsRead() {
  return useSWRMutation(
    "messages",
    async (_key: string, { arg }: { arg: { conversationId: string; userId: string } }) =>
      markMessagesAsRead(arg.conversationId, arg.userId),
  )
}

export function useCreateConversation() {
  return useSWRMutation(
    "conversations",
    async (_key: string, { arg }: { arg: { tripId: string; userId: string; otherUserId: string } }) =>
      createConversation(arg.tripId, arg.userId, arg.otherUserId),
  )
}
