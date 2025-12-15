module.exports = [
"[project]/lib/supabase/client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-rsc] (ecmascript)");
;
let client = null;
function createClient() {
    if (!client) {
        client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://vnghkdxyurxdlvrvuttn.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuZ2hrZHh5dXJ4ZGx2cnZ1dHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMjIxNTUsImV4cCI6MjA4MDc5ODE1NX0.WAGi5Lw7unVvZ2ExAb921Ad-jJOekfP5PGG7WNDhaSg"));
    }
    return client;
}
}),
"[project]/lib/db/bookings.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelBooking",
    ()=>cancelBooking,
    "confirmBooking",
    ()=>confirmBooking,
    "createBooking",
    ()=>createBooking,
    "getBooking",
    ()=>getBooking,
    "getTripBookings",
    ()=>getTripBookings,
    "getUserBookings",
    ()=>getUserBookings,
    "updateBooking",
    ()=>updateBooking
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-rsc] (ecmascript)");
;
async function getBooking(bookingId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("bookings").select("*, sender:profiles(*), trip:trips(*, user:profiles(*))").eq("id", bookingId).single();
    if (error) throw error;
    return data;
}
async function getTripBookings(tripId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("bookings").select("*, sender:profiles(*)").eq("trip_id", tripId).order("created_at", {
        ascending: false
    });
    if (error) throw error;
    return data;
}
async function getUserBookings(userId, role, filters) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    if (role === "sender") {
        let query = supabase.from("bookings").select("*, trip:trips(*, user:profiles(*))").eq("sender_id", userId).order("created_at", {
            ascending: false
        });
        if (filters?.dateFrom) {
            query = query.gte("created_at", filters.dateFrom);
        }
        if (filters?.dateTo) {
            query = query.lte("created_at", filters.dateTo);
        }
        const { data, error } = await query;
        if (error) throw error;
        return data;
    } else {
        // Pour le propriétaire, récupérer toutes les réservations de ses trajets
        let query = supabase.from("bookings").select("*, sender:profiles(*), trip:trips!inner(*)").eq("trip.user_id", userId).order("created_at", {
            ascending: false
        });
        if (filters?.dateFrom) {
            query = query.gte("created_at", filters.dateFrom);
        }
        if (filters?.dateTo) {
            query = query.lte("created_at", filters.dateTo);
        }
        const { data, error } = await query;
        if (error) throw error;
        return data;
    }
}
async function createBooking(booking) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("bookings").insert(booking).select("*, sender:profiles(*), trip:trips(*, user:profiles(*))").single();
    if (error) throw error;
    return data;
}
async function updateBooking(bookingId, updates) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("bookings").update({
        ...updates,
        updated_at: new Date().toISOString()
    }).eq("id", bookingId).select("*, sender:profiles(*), trip:trips(*, user:profiles(*))").single();
    if (error) throw error;
    return data;
}
async function cancelBooking(bookingId) {
    return updateBooking(bookingId, {
        status: "cancelled"
    });
}
async function confirmBooking(bookingId, kgConfirmed) {
    const updates = {
        status: "confirmed"
    };
    if (kgConfirmed !== undefined) {
        updates.kg_confirmed = kgConfirmed;
    }
    return updateBooking(bookingId, updates);
}
}),
];

//# sourceMappingURL=lib_b022789e._.js.map