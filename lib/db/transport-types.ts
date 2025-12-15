import { createClient } from "@/lib/supabase/client"

// =============================================
// TYPES
// =============================================

export interface DbTransportType {
  id: string
  code: string
  name: string
  name_en: string | null
  icon: string | null
  description: string | null
  max_kg_default: number
  is_international: boolean
  is_active: boolean
  display_order: number
  created_at: string
}

export interface TransportType {
  id: string
  code: string
  name: string
  nameEn?: string
  icon?: string
  description?: string
  maxKgDefault: number
  isInternational: boolean
  displayOrder: number
}

// =============================================
// CONVERTER
// =============================================

function dbTransportTypeToTransportType(db: DbTransportType): TransportType {
  return {
    id: db.id,
    code: db.code,
    name: db.name,
    nameEn: db.name_en || undefined,
    icon: db.icon || undefined,
    description: db.description || undefined,
    maxKgDefault: db.max_kg_default,
    isInternational: db.is_international,
    displayOrder: db.display_order,
  }
}

// =============================================
// FUNCTIONS
// =============================================

/**
 * Récupère tous les types de transport actifs
 */
export async function getTransportTypes(): Promise<TransportType[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("transport_types")
    .select("*")
    .eq("is_active", true)
    .order("display_order")
  
  if (error) {
    console.error("Error fetching transport types:", error)
    throw error
  }
  
  return (data || []).map(dbTransportTypeToTransportType)
}

/**
 * Récupère un type de transport par son code
 */
export async function getTransportTypeByCode(code: string): Promise<TransportType | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("transport_types")
    .select("*")
    .eq("code", code)
    .single()
  
  if (error) {
    if (error.code === "PGRST116") return null
    console.error("Error fetching transport type:", error)
    throw error
  }
  
  return dbTransportTypeToTransportType(data)
}

/**
 * Récupère un type de transport par son ID
 */
export async function getTransportType(id: string): Promise<TransportType | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("transport_types")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    if (error.code === "PGRST116") return null
    console.error("Error fetching transport type:", error)
    throw error
  }
  
  return dbTransportTypeToTransportType(data)
}
