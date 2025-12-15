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
"[project]/lib/db/countries.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCitiesByCountry",
    ()=>getCitiesByCountry,
    "getCitiesByCountryCode",
    ()=>getCitiesByCountryCode,
    "getCitiesByRegion",
    ()=>getCitiesByRegion,
    "getCity",
    ()=>getCity,
    "getCountries",
    ()=>getCountries,
    "getCountry",
    ()=>getCountry,
    "getRegionsByCountry",
    ()=>getRegionsByCountry,
    "getRegionsByCountryCode",
    ()=>getRegionsByCountryCode,
    "searchCities",
    ()=>searchCities
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-rsc] (ecmascript)");
;
// =============================================
// CONVERTERS
// =============================================
function dbCountryToCountry(db) {
    return {
        id: db.id,
        code: db.code,
        name: db.name,
        nameEn: db.name_en || undefined,
        flag: db.flag,
        phoneCode: db.phone_code || undefined,
        currencyCode: db.currency_code || undefined,
        continent: db.continent || undefined
    };
}
function dbRegionToRegion(db) {
    return {
        id: db.id,
        countryId: db.country_id,
        code: db.code || undefined,
        name: db.name,
        nameEn: db.name_en || undefined
    };
}
function dbCityToCity(db) {
    return {
        id: db.id,
        countryId: db.country_id,
        regionId: db.region_id || undefined,
        name: db.name,
        nameEn: db.name_en || undefined,
        population: db.population || undefined,
        isCapital: db.is_capital,
        isRegionalCapital: db.is_regional_capital,
        country: db.country ? dbCountryToCountry(db.country) : undefined,
        region: db.region ? dbRegionToRegion(db.region) : undefined
    };
}
async function getCountries(activeOnly = true) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    let query = supabase.from("countries").select("*").order("name");
    if (activeOnly) {
        query = query.eq("is_active", true);
    }
    const { data, error } = await query;
    if (error) {
        console.error("Error fetching countries:", error);
        throw error;
    }
    return (data || []).map(dbCountryToCountry);
}
async function getCountry(code) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("countries").select("*").eq("code", code).single();
    if (error) {
        if (error.code === "PGRST116") return null;
        console.error("Error fetching country:", error);
        throw error;
    }
    return dbCountryToCountry(data);
}
async function getRegionsByCountry(countryId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("regions").select("*").eq("country_id", countryId).eq("is_active", true).order("name");
    if (error) {
        console.error("Error fetching regions:", error);
        throw error;
    }
    return (data || []).map(dbRegionToRegion);
}
async function getRegionsByCountryCode(countryCode) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: country } = await supabase.from("countries").select("id").eq("code", countryCode).single();
    if (!country) return [];
    return getRegionsByCountry(country.id);
}
async function getCitiesByCountry(countryId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("cities").select("*, country:countries(*), region:regions(*)").eq("country_id", countryId).eq("is_active", true).order("population", {
        ascending: false,
        nullsFirst: false
    });
    if (error) {
        console.error("Error fetching cities:", error);
        throw error;
    }
    return (data || []).map(dbCityToCity);
}
async function getCitiesByCountryCode(countryCode) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: country } = await supabase.from("countries").select("id").eq("code", countryCode).single();
    if (!country) return [];
    return getCitiesByCountry(country.id);
}
async function getCitiesByRegion(regionId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("cities").select("*, country:countries(*), region:regions(*)").eq("region_id", regionId).eq("is_active", true).order("population", {
        ascending: false,
        nullsFirst: false
    });
    if (error) {
        console.error("Error fetching cities:", error);
        throw error;
    }
    return (data || []).map(dbCityToCity);
}
async function searchCities(query, limit = 10) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("cities").select("*, country:countries(*), region:regions(*)").ilike("name", `%${query}%`).eq("is_active", true).order("population", {
        ascending: false,
        nullsFirst: false
    }).limit(limit);
    if (error) {
        console.error("Error searching cities:", error);
        throw error;
    }
    return (data || []).map(dbCityToCity);
}
async function getCity(cityId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("cities").select("*, country:countries(*), region:regions(*)").eq("id", cityId).single();
    if (error) {
        if (error.code === "PGRST116") return null;
        console.error("Error fetching city:", error);
        throw error;
    }
    return dbCityToCity(data);
}
}),
];

//# sourceMappingURL=lib_a4a03c4f._.js.map