import { notFound } from "next/navigation"
import { fetchPublicProfile } from "@/lib/services/data-service"
import { ProfileClient } from "./profile-client"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const user = await fetchPublicProfile(id)

  if (!user) {
    return {
      title: "Profil non trouvé",
    }
  }

  const title = `Profil de ${user.name} - Voyageur KiloShare`
  const description = `Découvrez le profil de ${user.name} sur KiloShare. ${user.reviewCount} avis, note moyenne de ${user.rating}/5. Contactez ${user.name} pour vos envois de colis.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      images: [
        {
          url: user.avatar || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Profil de ${user.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [user.avatar || "/og-image.jpg"],
    },
  }
}

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await fetchPublicProfile(id)

  if (!user) {
    notFound()
  }

  return <ProfileClient initialUser={user} />
}
