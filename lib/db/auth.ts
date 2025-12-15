import { createClient } from "@/lib/supabase/client"

export async function signUp(email: string, password: string, name: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL,
      data: {
        name,
      },
      // Force email confirmation flow or not depending on project settings
    },
  })

  if (error) throw error

  // Manual profile creation fallback if session exists (trigger backup)
  if (data.user && data.session) {
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: data.user.id,
        name: name,
        email: email,
      })
      .select()
    
    if (profileError) {
      console.warn("Manual profile creation failed (trigger might have handled it):", profileError)
    }
  }

  return data
}

export async function signIn(email: string, password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  if (error) throw error

  // Self-healing: Check if profile exists, if not create it
  // We don't await this to prevent blocking the login flow if the DB is slow
  // The useAuth hook will eventually fetch the profile anyway
  if (data.user && data.session) {
    (async () => {
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", data.user.id)
          .single()
        
        if (!profile) {
          console.warn("User logged in but has no profile. Attempting to repair...")
          const name = data.user.user_metadata?.name || email.split("@")[0]
          
          const { error: profileError } = await supabase
            .from("profiles")
            .upsert({
              id: data.user.id,
              name: name,
              email: email,
            })
            .select()
          
          if (profileError) {
            console.error("Failed to repair user profile:", profileError)
          } else {
            console.info("Successfully repaired user profile")
          }
        }
      } catch (err) {
        console.error("Self-healing check failed:", err)
      }
    })() // IIFE to make it non-blocking
  }

  return data
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const supabase = createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export async function resetPassword(email: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  if (error) throw error
}

export async function updatePassword(newPassword: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  if (error) throw error
}
