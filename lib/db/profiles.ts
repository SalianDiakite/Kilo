import { createClient } from "@/lib/supabase/client"
import type { DbProfile, DbProfileUpdate } from "./types"

// Client-side
export async function getProfile(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data as DbProfile
}

export async function updateProfile(userId: string, updates: DbProfileUpdate) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()
    .single()

  if (error) throw error
  return data as DbProfile
}

export async function searchProfiles(query: string, limit = 10) {
  const supabase = createClient()
  const { data, error } = await supabase.from("profiles").select("*").ilike("name", `%${query}%`).limit(limit)

  if (error) throw error
  return data as DbProfile[]
}
