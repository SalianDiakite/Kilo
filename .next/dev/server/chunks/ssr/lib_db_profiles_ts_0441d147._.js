module.exports = [
"[project]/lib/db/profiles.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getProfile",
    ()=>getProfile,
    "getPublicProfileById",
    ()=>getPublicProfileById,
    "searchProfiles",
    ()=>searchProfiles,
    "updateProfile",
    ()=>updateProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
async function getProfile(userId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (error) throw error;
    return data;
}
async function updateProfile(userId, updates) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("profiles").update({
        ...updates,
        updated_at: new Date().toISOString()
    }).eq("id", userId).select().single();
    if (error) throw error;
    return data;
}
async function searchProfiles(query, limit = 10) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("profiles").select("*").ilike("name", `%${query}%`).limit(limit);
    if (error) throw error;
    return data;
}
async function getPublicProfileById(userId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.rpc('get_public_profile_by_id', {
        user_id_in: userId
    });
    if (error) {
        console.error('Error fetching public profile:', error);
        throw error;
    }
    // RPC returns an array, we expect a single object or an empty array
    return data && data.length > 0 ? data[0] : null;
}
}),
];

//# sourceMappingURL=lib_db_profiles_ts_0441d147._.js.map