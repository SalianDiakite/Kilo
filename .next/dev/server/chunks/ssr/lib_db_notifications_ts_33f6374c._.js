module.exports = [
"[project]/lib/db/notifications.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createNotification",
    ()=>createNotification,
    "deleteNotification",
    ()=>deleteNotification,
    "getNotifications",
    ()=>getNotifications,
    "getUnreadNotificationsCount",
    ()=>getUnreadNotificationsCount,
    "markAllNotificationsAsRead",
    ()=>markAllNotificationsAsRead,
    "markNotificationAsRead",
    ()=>markNotificationAsRead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
async function getNotifications(userId, limit = 50) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("notifications").select("*").eq("user_id", userId).order("created_at", {
        ascending: false
    }).limit(limit);
    if (error) throw error;
    return data;
}
async function getUnreadNotificationsCount(userId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { count, error } = await supabase.from("notifications").select("*", {
        count: "exact",
        head: true
    }).eq("user_id", userId).eq("read", false);
    if (error) throw error;
    return count || 0;
}
async function markNotificationAsRead(notificationId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from("notifications").update({
        read: true
    }).eq("id", notificationId);
    if (error) throw error;
}
async function markAllNotificationsAsRead(userId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from("notifications").update({
        read: true
    }).eq("user_id", userId).eq("read", false);
    if (error) throw error;
}
async function deleteNotification(notificationId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from("notifications").delete().eq("id", notificationId);
    if (error) throw error;
}
async function createNotification(notification) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("notifications").insert(notification).select().single();
    if (error) throw error;
    return data;
}
}),
];

//# sourceMappingURL=lib_db_notifications_ts_33f6374c._.js.map