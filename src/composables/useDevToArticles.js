import { ref, onMounted } from 'vue'

export function useDevToArticles(username, limit = 3) {
  const articles = ref([])
  const loading = ref(true)
  const error = ref(null)

  const fetchArticles = async () => {
    try {
      loading.value = true
      error.value = null
      
      const response = await fetch(`https://dev.to/api/articles?username=${username}&per_page=${limit}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }
      
      const data = await response.json()
      articles.value = data
    } catch (err) {
      error.value = {
        message: 'Unable to load blog posts.',
        details: err.message
      }
      console.error('Dev.to fetch error:', err)
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchArticles)

  return { articles, loading, error, refetch: fetchArticles }
}
