"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAdmin } from "@/lib/hooks/use-admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, Trash2, Eye, Plane, AlertTriangle } from "@/components/icons"
import type { Trip } from "@/lib/types"

// Étendre le type Trip pour inclure l'utilisateur (jointure)
interface AdminTrip extends Trip {
  user_email?: string
  user_name?: string
}

export default function AdminTripsPage() {
  const { canManageTrips } = useAdmin()
  const [trips, setTrips] = useState<AdminTrip[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchTrips()
  }, [page, search])

  const fetchTrips = async () => {
    setLoading(true)
    const supabase = createClient()
    
    // Requête avec jointure sur profiles
    let query = supabase
      .from("trips")
      .select(`
        *,
        user:profiles(name, email)
      `, { count: "exact" })
      .order("created_at", { ascending: false })
      .range((page - 1) * 10, page * 10 - 1)

    if (search) {
      query = query.or(`departure.ilike.%${search}%,arrival.ilike.%${search}%`)
    }

    const { data, count, error } = await query

    if (error) {
      console.error("Error fetching trips:", error)
    } else {
      // Mapper les données pour aplatir la structure user
      const mappedTrips = (data || []).map((t: any) => ({
        ...t,
        departureDate: new Date(t.departure_date),
        createdAt: new Date(t.created_at),
        departureCountry: t.departure_country,
        arrivalCountry: t.arrival_country,
        availableKg: t.available_kg,
        totalKg: t.total_kg,
        pricePerKg: t.price_per_kg,
        user_name: t.user?.name,
        user_email: t.user?.email,
        acceptedItems: t.accepted_items || [],
        rejectedItems: t.rejected_items || []
      }))
      setTrips(mappedTrips)
      setTotalPages(Math.ceil((count || 0) / 10))
    }
    setLoading(false)
  }

  const handleDeleteTrip = async (tripId: string) => {
    if (!confirm("Supprimer définitivement ce trajet ?")) return

    const supabase = createClient()
    const { error } = await supabase
      .from("trips")
      .delete()
      .eq("id", tripId)

    if (error) {
      alert("Erreur lors de la suppression")
    } else {
      fetchTrips()
    }
  }

  if (!canManageTrips) return <div>Accès non autorisé</div>

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des Trajets</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ville de départ ou d'arrivée..."
              className="pl-8"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trajets publiés ({trips.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="p-4 font-medium">Itinéraire</th>
                      <th className="p-4 font-medium">Utilisateur</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Statut</th>
                      <th className="p-4 font-medium">Kilos</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trips.map((trip) => (
                      <tr key={trip.id} className="border-t hover:bg-muted/50">
                        <td className="p-4">
                          <div className="font-medium flex items-center gap-2">
                            {trip.departure} <span className="text-muted-foreground">→</span> {trip.arrival}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {trip.departureCountry} - {trip.arrivalCountry}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium">{trip.user_name}</div>
                          <div className="text-xs text-muted-foreground">{trip.user_email}</div>
                        </td>
                        <td className="p-4">
                          {trip.departureDate.toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <Badge variant={trip.status === 'active' ? 'default' : 'secondary'}>
                            {trip.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {trip.availableKg} / {trip.totalKg} kg
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <Button size="sm" variant="ghost" onClick={() => window.open(`/trips/${trip.id}`, '_blank')}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteTrip(trip.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
              <Button 
                variant="outline" 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                Précédent
              </Button>
              <span className="flex items-center px-4 text-sm text-muted-foreground">
                Page {page} / {totalPages}
              </span>
              <Button 
                variant="outline" 
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                Suivant
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
