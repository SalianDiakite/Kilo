"use client"

import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import { getReviews, createReview, deleteReview } from "@/lib/db/reviews"
import type { DbReviewInsert } from "@/lib/db/types"

export function useReviews(userId: string | null, type: "received" | "given") {
  return useSWR(userId ? ["reviews", userId, type] : null, () => (userId ? getReviews(userId, type) : null), {
    revalidateOnFocus: false,
  })
}

export function useCreateReview() {
  return useSWRMutation("reviews", async (_key: string, { arg }: { arg: DbReviewInsert }) => createReview(arg))
}

export function useDeleteReview() {
  return useSWRMutation("reviews", async (_key: string, { arg }: { arg: string }) => deleteReview(arg))
}
