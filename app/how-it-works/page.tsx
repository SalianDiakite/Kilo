import { Metadata } from "next"
import { HowItWorksClient } from "./how-it-works-client"

export const metadata: Metadata = {
  title: "Comment ça marche - KiloShare",
  description: "Découvrez comment envoyer vos colis ou rentabiliser vos voyages avec KiloShare. Un guide simple pour l'expédition collaboratve.",
}

export default function HowItWorksPage() {
  return <HowItWorksClient />
}
