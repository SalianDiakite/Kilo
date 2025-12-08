import { createClient } from "@/lib/supabase/client"
import type { DbConversation, DbMessage, DbMessageInsert } from "./types"

export async function getConversations(userId: string) {
  const supabase = createClient()

  // Récupérer les conversations où l'utilisateur est participant
  const { data: participations, error: partError } = await supabase
    .from("conversation_participants")
    .select("conversation_id")
    .eq("user_id", userId)

  if (partError) throw partError

  const conversationIds = participations.map((p) => p.conversation_id)

  if (conversationIds.length === 0) return []

  const { data, error } = await supabase
    .from("conversations")
    .select(`
      *,
      trip:trips(*, user:profiles(*)),
      participants:conversation_participants(*, user:profiles(*)),
      messages(*)
    `)
    .in("id", conversationIds)
    .order("updated_at", { ascending: false })

  if (error) throw error
  return data as DbConversation[]
}

export async function getConversation(conversationId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("conversations")
    .select(`
      *,
      trip:trips(*, user:profiles(*)),
      participants:conversation_participants(*, user:profiles(*)),
      messages(*, sender:profiles(*))
    `)
    .eq("id", conversationId)
    .single()

  if (error) throw error
  return data as DbConversation
}

export async function getConversationMessages(conversationId: string, limit = 50) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("messages")
    .select("*, sender:profiles(*)")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(limit)

  if (error) throw error
  return data as DbMessage[]
}

export async function sendMessage(message: DbMessageInsert) {
  const supabase = createClient()

  // Insérer le message
  const { data, error } = await supabase.from("messages").insert(message).select("*, sender:profiles(*)").single()

  if (error) throw error

  // Mettre à jour la conversation
  await supabase
    .from("conversations")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", message.conversation_id)

  return data as DbMessage
}

export async function markMessagesAsRead(conversationId: string, userId: string) {
  const supabase = createClient()

  // Marquer tous les messages non lus comme lus
  const { error: msgError } = await supabase
    .from("messages")
    .update({ read: true })
    .eq("conversation_id", conversationId)
    .neq("sender_id", userId)
    .eq("read", false)

  if (msgError) throw msgError

  // Mettre à jour last_read_at du participant
  const { error: partError } = await supabase
    .from("conversation_participants")
    .update({ last_read_at: new Date().toISOString() })
    .eq("conversation_id", conversationId)
    .eq("user_id", userId)

  if (partError) throw partError
}

export async function createConversation(tripId: string, userId: string, otherUserId: string) {
  const supabase = createClient()

  // Vérifier si une conversation existe déjà entre ces deux utilisateurs pour ce trajet
  const { data: existing } = await supabase
    .from("conversations")
    .select(`
      *,
      participants:conversation_participants(user_id)
    `)
    .eq("trip_id", tripId)

  const existingConversation = existing?.find((conv) => {
    const participantIds = conv.participants?.map((p: { user_id: string }) => p.user_id) || []
    return participantIds.includes(userId) && participantIds.includes(otherUserId)
  })

  if (existingConversation) {
    return existingConversation.id
  }

  // Créer une nouvelle conversation
  const { data: conversation, error: convError } = await supabase
    .from("conversations")
    .insert({ trip_id: tripId })
    .select()
    .single()

  if (convError) throw convError

  // Ajouter les participants
  const { error: partError } = await supabase.from("conversation_participants").insert([
    { conversation_id: conversation.id, user_id: userId },
    { conversation_id: conversation.id, user_id: otherUserId },
  ])

  if (partError) throw partError

  return conversation.id
}
