"use client"

import { useCallback, useMemo } from "react"
import { useData } from "@/lib/data-provider"

// Devise par défaut si aucune sélectionnée
const DEFAULT_CURRENCY = "EUR"

export function useCurrency() {
  const { currencies } = useData()
  
  // Dans une vraie implémentation, on lirait ceci depuis les préférences utilisateur (DB ou LocalStorage)
  // Pour l'instant, on fixe en dur ou on pourrait utiliser un état local via un Context dédié
  // Je vais simuler une lecture locale simple pour la démo
  const userCurrencyCode = typeof window !== 'undefined' 
    ? localStorage.getItem('kilo_currency') || DEFAULT_CURRENCY
    : DEFAULT_CURRENCY

  const currentCurrency = useMemo(() => {
    return currencies.find(c => c.code === userCurrencyCode) || 
           currencies.find(c => c.code === "EUR") || 
           { code: "EUR", symbol: "€", rateToEur: 1, name: "Euro" }
  }, [currencies, userCurrencyCode])

  /**
   * Convertit un montant d'une devise source vers la devise cible
   */
  const convert = useCallback((amount: number, fromCode: string, toCode: string): number => {
    if (fromCode === toCode) return amount
    
    const fromCurrency = currencies.find(c => c.code === fromCode)
    const toCurrency = currencies.find(c => c.code === toCode)
    
    if (!fromCurrency || !toCurrency) {
      console.warn(`Currency conversion warning: ${fromCode} or ${toCode} not found`)
      return amount
    }

    // Conversion: Montant * (Taux Cible / Taux Source)
    // Ex: 100 USD -> XOF
    // 1 USD = 0.92 EUR
    // 1 XOF = 0.0015 EUR (ou 1 EUR = 655 XOF)
    // Dans notre DB, rate_to_eur est le montant en EUR pour 1 unité de la devise ? 
    // NON, dans le script SQL: rate_to_eur DECIMAL(12,6) DEFAULT 1.0 
    // et les valeurs sont: USD=1.05, XOF=655.957 -> C'est l'inverse : 1 EUR = X Devise
    
    // Donc: 
    // Montant en EUR = Montant Source / Taux Source (Combien de devise pour 1 EUR)
    // Montant Cible = Montant en EUR * Taux Cible
    
    const amountInEur = amount / fromCurrency.rateToEur
    return amountInEur * toCurrency.rateToEur
  }, [currencies])

  /**
   * Formate un prix pour l'affichage dans la devise préférée de l'utilisateur
   * @param amount Montant dans la devise source
   * @param fromCode Code de la devise source (par défaut EUR)
   */
  const formatPrice = useCallback((amount: number, fromCode = "EUR"): string => {
    const convertedAmount = convert(amount, fromCode, currentCurrency.code)
    
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currentCurrency.code,
      minimumFractionDigits: currentCurrency.code === 'XOF' || currentCurrency.code === 'XAF' || currentCurrency.code === 'GNF' ? 0 : 2,
      maximumFractionDigits: 2
    }).format(convertedAmount)
  }, [convert, currentCurrency])

  /**
   * Change la devise de l'utilisateur
   */
  const setCurrency = useCallback((code: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kilo_currency', code)
      // Force reload pour appliquer partout (simple & radical)
      // Idéalement on utiliserait un Context React pour la réactivité sans reload
      window.location.reload()
    }
  }, [])

  return {
    currencies,
    currentCurrency,
    convert,
    formatPrice,
    setCurrency
  }
}
