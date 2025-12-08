import { createClient } from "@/lib/supabase/client"
import type { DbUserSettings, DbUserSettingsUpdate } from "./types"

export async function getUserSettings(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from("user_settings").select("*").eq("id", userId).single()

  if (error) {
    // Si les paramètres n'existent pas, les créer
    if (error.code === "PGRST116") {
      const { data: newSettings, error: createError } = await supabase
        .from("user_settings")
        .insert({ id: userId })
        .select()
        .single()

      if (createError) throw createError
      return newSettings as DbUserSettings
    }
    throw error
  }
  return data as DbUserSettings
}

export async function updateUserSettings(userId: string, updates: DbUserSettingsUpdate) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("user_settings")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()
    .single()

  if (error) throw error
  return data as DbUserSettings
}
