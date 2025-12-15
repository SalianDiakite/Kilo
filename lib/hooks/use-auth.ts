"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User, Session } from "@supabase/supabase-js"
import type { DbProfile } from "@/lib/db/types"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<DbProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (userId: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()

    if (error) {
      console.error("Error fetching profile:", error)
      return
    }

    setProfile(data as DbProfile | null)
  }, [])

  useEffect(() => {
    const supabase = createClient()
    let mounted = true

    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (!mounted) return

        if (error) {
          console.error("Error getting session:", error)
          setLoading(false)
          return
        }

        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          // Fire and forget profile fetch - don't await it to block loading state
          fetchProfile(currentUser.id).catch(err => 
            console.error("Background profile fetch failed:", err)
          )
        } else {
          setProfile(null)
        }
      } catch (err) {
        console.error("Error initializing auth:", err)
      } finally {
        // Always unblock UI immediately after initial session check
        if (mounted) setLoading(false)
      }
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, session: Session | null) => {
        console.log('useAuth - Auth state changed:', event)
        if (!mounted) return

        const currentUser = session?.user ?? null
        setUser(currentUser)
        
        // Immediate UI unblock on auth change
        setLoading(false)

        if (currentUser) {
           // For SIGNED_IN or TOKEN_REFRESHED, refresh profile asynchronously
           if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION' || !profile) {
             fetchProfile(currentUser.id).catch(err => 
               console.error("Background profile fetch failed:", err)
             )
           }
        } else {
          setProfile(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [fetchProfile]) // Removed profile from dependency array to prevent infinite loops

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }, [user, fetchProfile])

  return { user, profile, loading, isAuthenticated: !!user, refreshProfile }
}
