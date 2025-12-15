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
"[project]/lib/db/storage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uploadAvatar",
    ()=>uploadAvatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$profiles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/profiles.ts [app-ssr] (ecmascript)");
;
;
async function uploadAvatar(userId, file) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    // 1. Upload the file to Storage
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/avatar-${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from("Avatar").upload(filePath, file, {
        upsert: true,
        cacheControl: "3600"
    });
    if (uploadError) {
        console.error("Error uploading avatar:", uploadError);
        throw uploadError;
    }
    // 2. Get the public URL of the uploaded file
    const { data: urlData } = supabase.storage.from("Avatar").getPublicUrl(filePath);
    if (!urlData.publicUrl) {
        throw new Error("Could not get public URL for avatar.");
    }
    // 3. Update the 'avatar' field in the user's profile
    const updatedProfile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$profiles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateProfile"])(userId, {
        avatar: urlData.publicUrl
    });
    return updatedProfile;
}
}),
];

//# sourceMappingURL=lib_db_69647088._.js.map