import { createClient } from "@/lib/supabase/server"
import type { DbProfile } from "./types"

export async function getProfileServer(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data as DbProfile
}
