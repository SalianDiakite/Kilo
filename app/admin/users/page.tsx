"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAdmin } from "@/lib/hooks/use-admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, Trash2, Shield, Ban} from "@/components/icons"
import type { User } from "@/lib/types"

export default function AdminUsersPage() {
  const { canManageUsers } = useAdmin()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchUsers()
  }, [page, search])

  const fetchUsers = async () => {
    setLoading(true)
    const supabase = createClient()
    
    // Construire la requête
    let query = supabase
      .from("profiles")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range((page - 1) * 10, page * 10 - 1)

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const { data, count, error } = await query

    if (error) {
      console.error("Error fetching users:", error)
    } else {
      setUsers(data?.map(p => ({
        id: p.id,
        name: p.name,
        email: p.email,
        role: p.role,
        verified: p.verified,
        createdAt: new Date(p.created_at),
        rating: p.rating || 0,
        reviewCount: p.review_count || 0
      })) || [])
      setTotalPages(Math.ceil((count || 0) / 10))
    }
    setLoading(false)
  }

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    if (!confirm(`Passer cet utilisateur en ${newRole} ?`)) return

    const supabase = createClient()
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId)

    if (error) {
      alert("Erreur lors de la mise à jour")
    } else {
      fetchUsers()
    }
  }

  if (!canManageUsers) return <div>Accès non autorisé</div>

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
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
          <CardTitle>Utilisateurs ({users.length})</CardTitle>
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
                      <th className="p-4 font-medium">Utilisateur</th>
                      <th className="p-4 font-medium">Rôle</th>
                      <th className="p-4 font-medium">Statut</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-t hover:bg-muted/50">
                        <td className="p-4">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </td>
                        <td className="p-4">
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {user.verified && <Badge variant="outline" className="border-green-500 text-green-500">Vérifié</Badge>}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {user.createdAt.toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          {user.role !== 'admin' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRoleUpdate(user.id, 'admin')}
                            >
                              <Shield className="h-4 w-4 mr-1" /> Admin
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Ban className="h-4 w-4" />
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
