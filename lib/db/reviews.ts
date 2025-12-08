import { createClient } from "@/lib/supabase/client"
import type { DbReview, DbReviewInsert } from "./types"

export async function getReviews(userId: string, type: "received" | "given") {
  const supabase = createClient()

  const column = type === "received" ? "reviewed_id" : "reviewer_id"

  const { data, error } = await supabase
    .from("reviews")
    .select("*, reviewer:profiles!reviewer_id(*), reviewed:profiles!reviewed_id(*), trip:trips(*)")
    .eq(column, userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as DbReview[]
}

export async function createReview(review: DbReviewInsert) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("reviews")
    .insert(review)
    .select("*, reviewer:profiles!reviewer_id(*), reviewed:profiles!reviewed_id(*)")
    .single()

  if (error) throw error

  // Mettre à jour la note moyenne du profil
  await updateUserRating(review.reviewed_id)

  return data as DbReview
}

async function updateUserRating(userId: string) {
  const supabase = createClient()

  // Calculer la nouvelle note moyenne
  const { data: reviews } = await supabase.from("reviews").select("rating").eq("reviewed_id", userId)

  if (reviews && reviews.length > 0) {
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

    await supabase
      .from("profiles")
      .update({
        rating: Math.round(avgRating * 10) / 10,
        review_count: reviews.length,
      })
      .eq("id", userId)
  }
}

export async function deleteReview(reviewId: string) {
  const supabase = createClient()

  // Récupérer le reviewed_id avant de supprimer
  const { data: review } = await supabase.from("reviews").select("reviewed_id").eq("id", reviewId).single()

  const { error } = await supabase.from("reviews").delete().eq("id", reviewId)

  if (error) throw error

  // Mettre à jour la note moyenne
  if (review) {
    await updateUserRating(review.reviewed_id)
  }
}
