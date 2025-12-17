(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/db/profiles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
;
async function getProfile(userId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (error) throw error;
    return data;
}
async function updateProfile(userId, updates) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("profiles").update({
        ...updates,
        updated_at: new Date().toISOString()
    }).eq("id", userId).select().single();
    if (error) throw error;
    return data;
}
async function searchProfiles(query, limit = 10) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("profiles").select("*").ilike("name", `%${query}%`).limit(limit);
    if (error) throw error;
    return data;
}
async function getPublicProfileById(userId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("profiles").select("id, name, avatar, bio, created_at, rating, review_count, verified, languages, response_time").eq("id", userId).single();
    if (error) {
        console.error("Error fetching public profile:", error);
        throw error;
    }
    return data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/db/storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uploadAvatar",
    ()=>uploadAvatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$profiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db/profiles.ts [app-client] (ecmascript)");
;
;
async function uploadAvatar(userId, file) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
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
    const updatedProfile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2f$profiles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateProfile"])(userId, {
        avatar: urlData.publicUrl
    });
    return updatedProfile;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_db_6a17867e._.js.map