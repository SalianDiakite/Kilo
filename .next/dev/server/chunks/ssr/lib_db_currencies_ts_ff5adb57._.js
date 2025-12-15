module.exports = [
"[project]/lib/db/currencies.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "convertFromEur",
    ()=>convertFromEur,
    "convertToEur",
    ()=>convertToEur,
    "formatPrice",
    ()=>formatPrice,
    "getCurrencies",
    ()=>getCurrencies,
    "getCurrency",
    ()=>getCurrency,
    "updateCurrencyRate",
    ()=>updateCurrencyRate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
function dbCurrencyToCurrency(db) {
    return {
        code: db.code,
        name: db.name,
        symbol: db.symbol,
        rateToEur: db.rate_to_eur,
        updatedAt: new Date(db.updated_at)
    };
}
async function getCurrencies() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("currencies").select("*").order("code");
    if (error) {
        console.error("Error fetching currencies:", error);
        throw error;
    }
    return (data || []).map(dbCurrencyToCurrency);
}
async function getCurrency(code) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("currencies").select("*").eq("code", code).single();
    if (error) {
        if (error.code === "PGRST116") return null;
        console.error("Error fetching currency:", error);
        throw error;
    }
    return dbCurrencyToCurrency(data);
}
function convertFromEur(priceInEur, currency) {
    return priceInEur * currency.rateToEur;
}
function convertToEur(price, currency) {
    return price / currency.rateToEur;
}
function formatPrice(priceInEur, currency) {
    const converted = convertFromEur(priceInEur, currency);
    // Pour les grandes valeurs (CFA, etc.), pas de décimales
    if (currency.rateToEur > 100) {
        return `${Math.round(converted).toLocaleString('fr-FR')} ${currency.symbol}`;
    }
    return `${converted.toFixed(2)} ${currency.symbol}`;
}
async function updateCurrencyRate(code, rateToEur) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("currencies").update({
        rate_to_eur: rateToEur
    }).eq("code", code).select().single();
    if (error) {
        console.error("Error updating currency rate:", error);
        throw error;
    }
    return dbCurrencyToCurrency(data);
}
}),
];

//# sourceMappingURL=lib_db_currencies_ts_ff5adb57._.js.map