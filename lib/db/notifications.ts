import { createClient } from "@/lib/supabase/client"
import type { DbNotification, DbNotificationInsert } from "./types"

export async function getNotifications(userId: string, limit = 50) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as DbNotification[]
}

export async function getUnreadNotificationsCount(userId: string) {
  const supabase = createClient()
  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("read", false)

  if (error) throw error
  return count || 0
}

export async function markNotificationAsRead(notificationId: string) {
  const supabase = createClient()
  const { error } = await supabase.from("notifications").update({ read: true }).eq("id", notificationId)

  if (error) throw error
}

export async function markAllNotificationsAsRead(userId: string) {
  const supabase = createClient()
  const { error } = await supabase.from("notifications").update({ read: true }).eq("user_id", userId).eq("read", false)

  if (error) throw error
}

export async function deleteNotification(notificationId: string) {
  const supabase = createClient()
  const { error } = await supabase.from("notifications").delete().eq("id", notificationId)

  if (error) throw error
}

export async function createNotification(notification: DbNotificationInsert) {
  const supabase = createClient()
  const { data, error } = await supabase.from("notifications").insert(notification).select().single()

  if (error) throw error
  return data as DbNotification
}
