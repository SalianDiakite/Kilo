module.exports = [
"[project]/lib/db/bookings.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
async function getBooking(bookingId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("bookings").select("*, sender:profiles(*), trip:trips(*, user:profiles(*))").eq("id", bookingId).single();
    if (error) throw error;
    return data;
}
async function getTripBookings(tripId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("bookings").select("*, sender:profiles(*)").eq("trip_id", tripId).order("created_at", {
        ascending: false
    });
    if (error) throw error;
    return data;
}
async function getUserBookings(userId, role, filters) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("bookings").insert(booking).select("*, sender:profiles(*), trip:trips(*, user:profiles(*))").single();
    if (error) throw error;
    return data;
}
async function updateBooking(bookingId, updates) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
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

//# sourceMappingURL=lib_db_bookings_ts_80a1cec5._.js.map