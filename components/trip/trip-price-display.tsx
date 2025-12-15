"use client"

import { useCurrency } from "@/lib/hooks/use-currency"
import { cn } from "@/lib/utils"

interface TripPriceDisplayProps {
  amount: number
  currencyCode: string // La devise d'origine du trajet
  perKg?: boolean
  className?: string
  showCurrencyCode?: boolean
}

export function TripPriceDisplay({ 
  amount, 
  currencyCode, 
  perKg = true, 
  className,
  showCurrencyCode = false
}: TripPriceDisplayProps) {
  const { formatPrice, convert, currentCurrency } = useCurrency()

  // Convertir et formatter
  // Note: formatPrice fait déjà la conversion en interne si on lui passe le fromCode
  const formattedPrice = formatPrice(amount, currencyCode)

  return (
    <span className={cn("font-bold text-accent", className)}>
      {formattedPrice}
      {perKg && <span className="text-sm font-normal text-muted-foreground ml-1">/kg</span>}
      {showCurrencyCode && currentCurrency.code !== currencyCode && (
        <span className="text-xs text-muted-foreground ml-1">
          (Original: {amount} {currencyCode})
        </span>
      )}
    </span>
  )
}
