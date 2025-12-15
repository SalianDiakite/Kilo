import { createClient } from "@/lib/supabase/client"

export interface DbCurrency {
  code: string
  name: string
  symbol: string
  rate_to_eur: number
  updated_at: string
}

export interface Currency {
  code: string
  name: string
  symbol: string
  rateToEur: number
  updatedAt: Date
}

function dbCurrencyToCurrency(db: DbCurrency): Currency {
  return {
    code: db.code,
    name: db.name,
    symbol: db.symbol,
    rateToEur: db.rate_to_eur,
    updatedAt: new Date(db.updated_at),
  }
}

/**
 * Récupère toutes les devises
 */
export async function getCurrencies(): Promise<Currency[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("currencies")
    .select("*")
    .order("code")
  
  if (error) {
    console.error("Error fetching currencies:", error)
    throw error
  }
  
  return (data || []).map(dbCurrencyToCurrency)
}

/**
 * Récupère une devise par son code
 */
export async function getCurrency(code: string): Promise<Currency | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("currencies")
    .select("*")
    .eq("code", code)
    .single()
  
  if (error) {
    if (error.code === "PGRST116") return null
    console.error("Error fetching currency:", error)
    throw error
  }
  
  return dbCurrencyToCurrency(data)
}

/**
 * Convertit un prix en EUR vers une autre devise
 */
export function convertFromEur(priceInEur: number, currency: Currency): number {
  return priceInEur * currency.rateToEur
}

/**
 * Convertit un prix d'une devise vers EUR
 */
export function convertToEur(price: number, currency: Currency): number {
  return price / currency.rateToEur
}

/**
 * Formate un prix dans une devise donnée
 */
export function formatPrice(priceInEur: number, currency: Currency): string {
  const converted = convertFromEur(priceInEur, currency)
  
  // Pour les grandes valeurs (CFA, etc.), pas de décimales
  if (currency.rateToEur > 100) {
    return `${Math.round(converted).toLocaleString('fr-FR')} ${currency.symbol}`
  }
  
  return `${converted.toFixed(2)} ${currency.symbol}`
}

/**
 * Met à jour le taux d'une devise (admin seulement)
 */
export async function updateCurrencyRate(code: string, rateToEur: number): Promise<Currency> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("currencies")
    .update({ rate_to_eur: rateToEur })
    .eq("code", code)
    .select()
    .single()
  
  if (error) {
    console.error("Error updating currency rate:", error)
    throw error
  }
  
  return dbCurrencyToCurrency(data)
}
