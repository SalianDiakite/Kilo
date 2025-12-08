"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type Language, getTranslation, type TranslationKey } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const defaultContext: LanguageContextType = {
  language: "fr",
  setLanguage: () => {},
  t: (key: TranslationKey) => getTranslation(key, "fr"),
}

const LanguageContext = createContext<LanguageContextType>(defaultContext)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("kiloshare-language") as Language | null
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("kiloshare-language", lang)
    document.documentElement.lang = lang
  }

  const t = (key: TranslationKey): string => {
    return getTranslation(key, language)
  }

  if (!mounted) {
    return <LanguageContext.Provider value={defaultContext}>{children}</LanguageContext.Provider>
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
