import { ref, onMounted } from 'vue'
import { sanityClient } from '@/sanity/client'

// Simple in-memory cache
const cache = new Map()

export function useSanityData(query, params = {}) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  // Create a cache key based on query and params
  const cacheKey = JSON.stringify({ query, params })

  const fetchData = async () => {
    try {
      loading.value = true
      error.value = null
      
      const result = await sanityClient.fetch(query, params)
      data.value = result
      
      if (result === null || result === undefined) {
        throw new Error('No content found')
      }

      // Store in cache
      cache.set(cacheKey, result)
    } catch (err) {
      error.value = {
        message: 'Unable to load content. Please check your connection and try again.',
        details: err.message
      }
      console.error('Sanity fetch error:', err)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    // Check if data is in cache
    if (cache.has(cacheKey)) {
      data.value = cache.get(cacheKey)
      loading.value = false
    } else {
      fetchData()
    }
  })

  return { data, loading, error, refetch: fetchData }
}

