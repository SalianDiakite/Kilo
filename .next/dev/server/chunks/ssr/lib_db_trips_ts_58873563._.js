module.exports = [
"[project]/lib/db/trips.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTrip",
    ()=>createTrip,
    "deleteTrip",
    ()=>deleteTrip,
    "getTrip",
    ()=>getTrip,
    "getTrips",
    ()=>getTrips,
    "getUserTrips",
    ()=>getUserTrips,
    "incrementTripViews",
    ()=>incrementTripViews,
    "updateTrip",
    ()=>updateTrip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
const PUBLIC_USER_COLUMNS = "id, name, avatar, bio, rating, review_count, verified, languages, response_rate, response_time, created_at";
async function getTrips(filters, page = 1, limit = 10) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    let query = supabase.from("trips").select(`*, user:profiles(${PUBLIC_USER_COLUMNS})`, {
        count: "exact"
    }).order("created_at", {
        ascending: false
    });
    if (filters?.departure) {
        query = query.ilike("departure", `%${filters.departure}%`);
    }
    if (filters?.arrival) {
        query = query.ilike("arrival", `%${filters.arrival}%`);
    }
    if (filters?.departureCountry) {
        query = query.eq("departure_country", filters.departureCountry);
    }
    if (filters?.arrivalCountry) {
        query = query.eq("arrival_country", filters.arrivalCountry);
    }
    if (filters?.dateFrom) {
        query = query.gte("departure_date", filters.dateFrom);
    }
    if (filters?.dateTo) {
        query = query.lte("departure_date", filters.dateTo);
    }
    if (filters?.minKg) {
        query = query.gte("available_kg", filters.minKg);
    }
    if (filters?.maxPrice) {
        query = query.lte("price_per_kg", filters.maxPrice);
    }
    if (filters?.status) {
        query = query.eq("status", filters.status);
    } else {
        query = query.eq("status", "active");
    }
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    const { data, error, count } = await query;
    if (error) throw error;
    return {
        trips: data,
        total: count || 0
    };
}
async function getTrip(tripId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("trips").select(`*, user:profiles(${PUBLIC_USER_COLUMNS})`).eq("id", tripId).single();
    if (error) throw error;
    return data;
}
async function getUserTrips(userId, filters) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    let query = supabase.from("trips").select(`*, user:profiles(${PUBLIC_USER_COLUMNS})`).eq("user_id", userId).order("created_at", {
        ascending: false
    });
    if (filters?.status) {
        query = query.eq("status", filters.status);
    }
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
async function createTrip(trip) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("trips").insert(trip).select(`*, user:profiles(${PUBLIC_USER_COLUMNS})`).single();
    if (error) throw error;
    return data;
}
async function updateTrip(tripId, updates) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("trips").update({
        ...updates,
        updated_at: new Date().toISOString()
    }).eq("id", tripId).select(`*, user:profiles(${PUBLIC_USER_COLUMNS})`).single();
    if (error) throw error;
    return data;
}
async function deleteTrip(tripId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from("trips").delete().eq("id", tripId);
    if (error) throw error;
}
async function incrementTripViews(tripId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.rpc("increment_trip_views", {
        trip_id: tripId
    });
    if (error) {
        // Fallback si la fonction RPC n'existe pas
        const { data: trip } = await supabase.from("trips").select("views").eq("id", tripId).single();
        if (trip) {
            await supabase.from("trips").update({
                views: (trip.views || 0) + 1
            }).eq("id", tripId);
        }
    }
}
}),
];

//# sourceMappingURL=lib_db_trips_ts_58873563._.js.map