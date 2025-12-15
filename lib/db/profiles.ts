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

export async function getPublicProfileById(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('get_public_profile_by_id', { user_id_in: userId })

  if (error) {
    console.error('Error fetching public profile:', error)
    throw error
  }
  
  // RPC returns an array, we expect a single object or an empty array
  return data && data.length > 0 ? data[0] : null
}
