import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: false, // Disable CDN for development to avoid caching issues
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  // Remove perspective to fetch all documents (including drafts)
})
