import { Metadata } from "next"
import { FAQClient } from "./faq-client"

export const metadata: Metadata = {
  title: "Foire aux questions - KiloShare",
  description: "Toutes les réponses à vos questions sur le fonctionnement de KiloShare, la sécurité, les paiements et le transport de colis.",
}

export default function FAQPage() {
  return <FAQClient />
}
