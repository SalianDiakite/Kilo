"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAdmin } from "@/lib/hooks/use-admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, RefreshCw, Save } from "@/components/icons"
import type { Currency } from "@/lib/db/currencies"

export default function AdminCurrenciesPage() {
  const { canManageCurrencies } = useAdmin()
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [rates, setRates] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchCurrencies()
  }, [])

  const fetchCurrencies = async () => {
    setLoading(true)
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("currencies")
      .select("*")
      .order("code")

    if (error) {
      console.error("Error fetching currencies:", error)
    } else {
      const mapped = (data || []).map((c: any) => ({
        code: c.code,
        name: c.name,
        symbol: c.symbol,
        rateToEur: c.rate_to_eur,
        updatedAt: new Date(c.updated_at)
      }))
      setCurrencies(mapped)
      // Initialiser le state local des taux pour l'édition
      const ratesMap: Record<string, string> = {}
      mapped.forEach((c: Currency) => {
        ratesMap[c.code] = c.rateToEur.toString()
      })
      setRates(ratesMap)
    }
    setLoading(false)
  }

  const handleRateUpdate = async (code: string) => {
    setUpdating(code)
    const newRate = parseFloat(rates[code])
    
    if (isNaN(newRate) || newRate <= 0) {
      alert("Taux invalide")
      setUpdating(null)
      return
    }

    const supabase = createClient()
    const { error } = await supabase
      .from("currencies")
      .update({ rate_to_eur: newRate })
      .eq("code", code)

    if (error) {
      alert("Erreur lors de la mise à jour")
    } else {
      await fetchCurrencies()
    }
    setUpdating(null)
  }

  const handleFetchLatestRates = async () => {
    // TODO: Implémenter appel Edge Function
    alert("Fonctionnalité à venir : synchronisation automatique via API externe")
  }

  if (!canManageCurrencies) return <div>Accès non autorisé</div>

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des Devises</h1>
        <Button onClick={handleFetchLatestRates} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Sync Taux (API)
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Taux de change (Base: 1 EUR)</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="p-4 font-medium">Devise</th>
                    <th className="p-4 font-medium">Symbole</th>
                    <th className="p-4 font-medium">Taux (1 EUR =)</th>
                    <th className="p-4 font-medium">Dernière MAJ</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currencies.map((currency) => (
                    <tr key={currency.code} className="border-t hover:bg-muted/50">
                      <td className="p-4 font-medium">
                        {currency.name} <Badge variant="outline" className="ml-2">{currency.code}</Badge>
                      </td>
                      <td className="p-4">{currency.symbol}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number" 
                            step="0.0001"
                            value={rates[currency.code] || ''}
                            onChange={(e) => setRates(prev => ({ ...prev, [currency.code]: e.target.value }))}
                            className="w-32 h-8"
                          />
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground text-xs">
                        {currency.updatedAt.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <Button 
                          size="sm" 
                          onClick={() => handleRateUpdate(currency.code)}
                          disabled={updating === currency.code || parseFloat(rates[currency.code]) === currency.rateToEur}
                        >
                          {updating === currency.code ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
