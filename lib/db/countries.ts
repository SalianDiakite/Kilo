import { createClient } from "@/lib/supabase/client"

// =============================================
// TYPES
// =============================================

export interface DbCountry {
  id: string
  code: string
  name: string
  name_en: string | null
  flag: string
  phone_code: string | null
  currency_code: string | null
  continent: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface DbRegion {
  id: string
  country_id: string
  code: string | null
  name: string
  name_en: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  country?: DbCountry
}

export interface DbCity {
  id: string
  country_id: string
  region_id: string | null
  name: string
  name_en: string | null
  latitude: number | null
  longitude: number | null
  population: number | null
  is_capital: boolean
  is_regional_capital: boolean
  timezone: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  country?: DbCountry
  region?: DbRegion
}

export interface Country {
  id: string
  code: string
  name: string
  nameEn?: string
  flag: string
  phoneCode?: string
  currencyCode?: string
  continent?: string
}

export interface Region {
  id: string
  countryId: string
  code?: string
  name: string
  nameEn?: string
}

export interface City {
  id: string
  countryId: string
  regionId?: string
  name: string
  nameEn?: string
  population?: number
  isCapital: boolean
  isRegionalCapital: boolean
  country?: Country
  region?: Region
}

// =============================================
// CONVERTERS
// =============================================

function dbCountryToCountry(db: DbCountry): Country {
  return {
    id: db.id,
    code: db.code,
    name: db.name,
    nameEn: db.name_en || undefined,
    flag: db.flag,
    phoneCode: db.phone_code || undefined,
    currencyCode: db.currency_code || undefined,
    continent: db.continent || undefined,
  }
}

function dbRegionToRegion(db: DbRegion): Region {
  return {
    id: db.id,
    countryId: db.country_id,
    code: db.code || undefined,
    name: db.name,
    nameEn: db.name_en || undefined,
  }
}

function dbCityToCity(db: DbCity): City {
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
    region: db.region ? dbRegionToRegion(db.region) : undefined,
  }
}

// =============================================
// COUNTRIES
// =============================================

export async function getCountries(activeOnly = true): Promise<Country[]> {
  const supabase = createClient()
  
  let query = supabase
    .from("countries")
    .select("*")
    .order("name")
  
  if (activeOnly) {
    query = query.eq("is_active", true)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error("Error fetching countries:", error)
    throw error
  }
  
  return (data || []).map(dbCountryToCountry)
}

export async function getCountry(code: string): Promise<Country | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("code", code)
    .single()
  
  if (error) {
    if (error.code === "PGRST116") return null
    console.error("Error fetching country:", error)
    throw error
  }
  
  return dbCountryToCountry(data)
}

// =============================================
// REGIONS
// =============================================

export async function getRegionsByCountry(countryId: string): Promise<Region[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("regions")
    .select("*")
    .eq("country_id", countryId)
    .eq("is_active", true)
    .order("name")
  
  if (error) {
    console.error("Error fetching regions:", error)
    throw error
  }
  
  return (data || []).map(dbRegionToRegion)
}

export async function getRegionsByCountryCode(countryCode: string): Promise<Region[]> {
  const supabase = createClient()
  
  const { data: country } = await supabase
    .from("countries")
    .select("id")
    .eq("code", countryCode)
    .single()
  
  if (!country) return []
  
  return getRegionsByCountry(country.id)
}

// =============================================
// CITIES
// =============================================

export async function getCitiesByCountry(countryId: string): Promise<City[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("cities")
    .select("*, country:countries(*), region:regions(*)")
    .eq("country_id", countryId)
    .eq("is_active", true)
    .order("population", { ascending: false, nullsFirst: false })
  
  if (error) {
    console.error("Error fetching cities:", error)
    throw error
  }
  
  return (data || []).map(dbCityToCity)
}

export async function getCitiesByCountryCode(countryCode: string): Promise<City[]> {
  const supabase = createClient()
  
  const { data: country } = await supabase
    .from("countries")
    .select("id")
    .eq("code", countryCode)
    .single()
  
  if (!country) return []
  
  return getCitiesByCountry(country.id)
}

export async function getCitiesByRegion(regionId: string): Promise<City[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("cities")
    .select("*, country:countries(*), region:regions(*)")
    .eq("region_id", regionId)
    .eq("is_active", true)
    .order("population", { ascending: false, nullsFirst: false })
  
  if (error) {
    console.error("Error fetching cities:", error)
    throw error
  }
  
  return (data || []).map(dbCityToCity)
}

export async function searchCities(query: string, limit = 10): Promise<City[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("cities")
    .select("*, country:countries(*), region:regions(*)")
    .ilike("name", `%${query}%`)
    .eq("is_active", true)
    .order("population", { ascending: false, nullsFirst: false })
    .limit(limit)
  
  if (error) {
    console.error("Error searching cities:", error)
    throw error
  }
  
  return (data || []).map(dbCityToCity)
}

export async function getCity(cityId: string): Promise<City | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("cities")
    .select("*, country:countries(*), region:regions(*)")
    .eq("id", cityId)
    .single()
  
  if (error) {
    if (error.code === "PGRST116") return null
    console.error("Error fetching city:", error)
    throw error
  }
  
  return dbCityToCity(data)
}
