module.exports = [
"[project]/lib/db/settings.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserSettings",
    ()=>getUserSettings,
    "updateUserSettings",
    ()=>updateUserSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
async function getUserSettings(userId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("user_settings").select("*").eq("id", userId).single();
    if (error) {
        // Si les paramètres n'existent pas, les créer
        if (error.code === "PGRST116") {
            const { data: newSettings, error: createError } = await supabase.from("user_settings").insert({
                id: userId
            }).select().single();
            if (createError) throw createError;
            return newSettings;
        }
        throw error;
    }
    return data;
}
async function updateUserSettings(userId, updates) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("user_settings").update({
        ...updates,
        updated_at: new Date().toISOString()
    }).eq("id", userId).select().single();
    if (error) throw error;
    return data;
}
}),
];

//# sourceMappingURL=lib_db_settings_ts_7ac1b0d9._.js.map