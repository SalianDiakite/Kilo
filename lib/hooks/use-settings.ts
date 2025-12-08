"use client"

import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import { getUserSettings, updateUserSettings } from "@/lib/db/settings"
import type { DbUserSettingsUpdate } from "@/lib/db/types"

export function useSettings(userId: string | null) {
  return useSWR(userId ? ["settings", userId] : null, () => (userId ? getUserSettings(userId) : null), {
    revalidateOnFocus: false,
  })
}

export function useUpdateSettings(userId: string) {
  return useSWRMutation(["settings", userId], async (_key: string[], { arg }: { arg: DbUserSettingsUpdate }) =>
    updateUserSettings(userId, arg),
  )
}
