"use client"

import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import {
  getNotifications,
  getUnreadNotificationsCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "@/lib/db/notifications"

export function useNotifications(userId: string | null) {
  return useSWR(userId ? ["notifications", userId] : null, () => (userId ? getNotifications(userId) : null), {
    revalidateOnFocus: false,
    refreshInterval: 30000,
  })
}

export function useUnreadNotificationsCount(userId: string | null) {
  return useSWR(
    userId ? ["notifications-count", userId] : null,
    () => (userId ? getUnreadNotificationsCount(userId) : null),
    { revalidateOnFocus: false, refreshInterval: 30000 },
  )
}

export function useMarkNotificationAsRead() {
  return useSWRMutation("notifications", async (_key: string, { arg }: { arg: string }) => markNotificationAsRead(arg))
}

export function useMarkAllNotificationsAsRead() {
  return useSWRMutation("notifications", async (_key: string, { arg }: { arg: string }) =>
    markAllNotificationsAsRead(arg),
  )
}

export function useDeleteNotification() {
  return useSWRMutation("notifications", async (_key: string, { arg }: { arg: string }) => deleteNotification(arg))
}
