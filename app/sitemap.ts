import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { fetchTrips } from '@/lib/services/data-service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL

  // Static routes
  const staticRoutes = [
    '',
    '/trips',
    '/how-it-works',
    '/publish',
    '/auth/login',
    '/auth/register',
    '/faq',
    '/contact',
    '/terms',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic trips
  let trips: any[] = []
  try {
    trips = await fetchTrips()
  } catch (error) {
    console.error('Sitemap: Failed to fetch trips', error)
  }

  const tripRoutes = trips.map((trip) => ({
    url: `${baseUrl}/trips/${trip.id}`,
    lastModified: new Date(trip.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Dynamic profiles (fetching some recent ones or all if manageable)
  // For now, let's just use the trip owners as a proxy for active users to index
  const userIds = Array.from(new Set(trips.map((t) => t.userId)))
  const profileRoutes = userIds.map((id) => ({
    url: `${baseUrl}/public-profile/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticRoutes, ...tripRoutes, ...profileRoutes]
}
