module.exports = [
"[project]/lib/db/reviews.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createReview",
    ()=>createReview,
    "deleteReview",
    ()=>deleteReview,
    "getReviews",
    ()=>getReviews
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
async function getReviews(userId, type) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const column = type === "received" ? "reviewed_id" : "reviewer_id";
    const { data, error } = await supabase.from("reviews").select("*, reviewer:profiles!reviewer_id(*), reviewed:profiles!reviewed_id(*), trip:trips(*)").eq(column, userId).order("created_at", {
        ascending: false
    });
    if (error) throw error;
    return data;
}
async function createReview(review) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("reviews").insert(review).select("*, reviewer:profiles!reviewer_id(*), reviewed:profiles!reviewed_id(*)").single();
    if (error) throw error;
    // Mettre à jour la note moyenne du profil
    await updateUserRating(review.reviewed_id);
    return data;
}
async function updateUserRating(userId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    // Calculer la nouvelle note moyenne
    const { data: reviews } = await supabase.from("reviews").select("rating").eq("reviewed_id", userId);
    if (reviews && reviews.length > 0) {
        const avgRating = reviews.reduce((sum, r)=>sum + r.rating, 0) / reviews.length;
        await supabase.from("profiles").update({
            rating: Math.round(avgRating * 10) / 10,
            review_count: reviews.length
        }).eq("id", userId);
    }
}
async function deleteReview(reviewId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    // Récupérer le reviewed_id avant de supprimer
    const { data: review } = await supabase.from("reviews").select("reviewed_id").eq("id", reviewId).single();
    const { error } = await supabase.from("reviews").delete().eq("id", reviewId);
    if (error) throw error;
    // Mettre à jour la note moyenne
    if (review) {
        await updateUserRating(review.reviewed_id);
    }
}
}),
];

//# sourceMappingURL=lib_db_reviews_ts_28ff2dc8._.js.map