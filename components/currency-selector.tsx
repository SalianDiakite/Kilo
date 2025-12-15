"use client"

import { useCurrency } from "@/lib/hooks/use-currency"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Coins } from "lucide-react"

export function CurrencySelector() {
  const { currentCurrency, currencies, setCurrency } = useCurrency()

  if (!currencies.length) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 px-2">
          <span className="text-muted-foreground">{currentCurrency.symbol}</span>
          <span className="font-medium">{currentCurrency.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto">
        {currencies.map((currency) => (
          <DropdownMenuItem 
            key={currency.code}
            onClick={() => setCurrency(currency.code)}
            className="flex justify-between gap-4 cursor-pointer"
          >
            <span>{currency.name}</span>
            <span className="text-muted-foreground font-mono">{currency.code}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
