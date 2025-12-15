import { createClient } from "@/lib/supabase/client"
import { updateProfile } from "./profiles"

/**
 * Uploads a new user avatar, updates the user's profile, and returns the public URL.
 * @param userId The user's ID.
 * @param file The image file to upload.
 */
export async function uploadAvatar(userId: string, file: File) {
  const supabase = createClient()

  // 1. Upload the file to Storage
  const fileExt = file.name.split(".").pop()
  const filePath = `${userId}/avatar-${Date.now()}.${fileExt}`

  const { error: uploadError } = await supabase.storage.from("Avatar").upload(filePath, file, {
    upsert: true, // Overwrite existing file
    cacheControl: "3600",
  })

  if (uploadError) {
    console.error("Error uploading avatar:", uploadError)
    throw uploadError
  }

  // 2. Get the public URL of the uploaded file
  const { data: urlData } = supabase.storage.from("Avatar").getPublicUrl(filePath)

  if (!urlData.publicUrl) {
    throw new Error("Could not get public URL for avatar.")
  }

  // 3. Update the 'avatar' field in the user's profile
  const updatedProfile = await updateProfile(userId, { avatar: urlData.publicUrl })

  return updatedProfile
}
