"use client"

import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import { getProfile, updateProfile, searchProfiles } from "@/lib/db/profiles"
import type { DbProfileUpdate } from "@/lib/db/types"

export function useProfile(userId: string | null) {
  return useSWR(userId ? ["profile", userId] : null, () => (userId ? getProfile(userId) : null), {
    revalidateOnFocus: false,
  })
}

export function useUpdateProfile(userId: string) {
  return useSWRMutation(["profile", userId], async (_key: string[], { arg }: { arg: DbProfileUpdate }) =>
    updateProfile(userId, arg),
  )
}

export function useSearchProfiles(query: string) {
  return useSWR(query.length >= 2 ? ["profiles-search", query] : null, () => searchProfiles(query), {
    revalidateOnFocus: false,
  })
}
