<template>
  <div class="min-h-screen bg-white">
    <!-- Loading State -->
    <LoadingSpinner v-if="loading" />
    
    <!-- Error State -->
    <ErrorMessage v-else-if="error" :error="error" :on-retry="refetch" />
    
    <!-- Content -->
    <div v-else-if="data">
      <!-- Combined Hero & About Section -->
      <section class="min-h-screen flex flex-col justify-center px-6 py-20">
        <div class="max-w-7xl w-full mx-auto">
          <!-- Large Title -->
          <div class="mb-32">
            <h1 class="text-7xl md:text-8xl lg:text-9xl font-bold text-gray-900 leading-none mb-4">
              <span class="font-serif">{{ data.heroHeading }}</span>
            </h1>
            <h2 class="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent leading-none"
                style="-webkit-text-stroke: 2px #e5e7eb; text-stroke: 2px #B7B8BC;">
              <span class="font-serif">@DESQUARED</span>
            </h2>
          </div>

          <!-- Image and About Content -->
          <div class="grid md:grid-cols-2 gap-12 items-end">
            <!-- Image -->
            <div class="flex justify-center md:justify-end relative">
              <img 
                v-if="data.heroImage"
                :src="getImageUrl(data.heroImage.image, 600)"
                :alt="data.heroImage.alt"
                class="w-full max-w-md"
              />
              <!-- Location Tag -->
              <div class="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200 flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm text-gray-500">Located in: <span class="font-medium text-gray-700">Greece</span></span>
              </div>
            </div>
            
            <!-- About Text -->
            <div>
              <p class="text-2xl md:text-3xl italic text-gray-400 -ml-2 font-serif">Hello,</p>
              <p v-if="formattedSubheading" class="text-lg md:text-xl text-gray-700 leading-relaxed -mb-12">
                {{ formattedSubheading }}
              </p>
              <div v-if="data.content" class="text-base md:text-lg text-gray-600 leading-relaxed">
                <p>{{ data.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Latest Blog Posts -->
      <section class="py-20 px-6 bg-white">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-5xl md:text-6xl font-bold text-gray-900 mb-16 font-serif">Latest Articles</h2>
          
          <!-- Loading State -->
          <div v-if="blogLoading" class="text-center py-12">
            <p class="text-gray-500">Loading articles...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="blogError" class="text-center py-12">
            <p class="text-gray-500">{{ blogError.message }}</p>
          </div>

          <!-- Articles Grid -->
          <div v-else-if="articles && articles.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              v-for="article in articles"
              :key="article.id"
              :href="article.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group block bg-gray-50 border-2 border-gray-200 p-6 hover:border-gray-900 transition-all duration-300"
            >
              <p class="text-xs text-gray-500 uppercase tracking-widest mb-3">
                {{ new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
              </p>
              <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors line-clamp-2">
                {{ article.title }}
              </h3>
              <p class="text-gray-600 text-sm line-clamp-3 mb-4">
                {{ article.description }}
              </p>
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <span>{{ article.reading_time_minutes }} min read</span>
                <span class="text-gray-300">•</span>
                <span>{{ article.public_reactions_count }} reactions</span>
              </div>
            </a>
          </div>

          <!-- No Articles -->
          <div v-else class="text-center py-12">
            <p class="text-gray-500">No articles found.</p>
          </div>
        </div>
      </section>

      <!-- Featured Projects -->
      <section v-if="data.featuredProjects && data.featuredProjects.length > 0" class="py-20 px-6 bg-white">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-5xl md:text-6xl font-bold text-gray-900 mb-16 font-serif">Featured Work</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <router-link
              v-for="project in data.featuredProjects"
              :key="project._id"
              :to="`/projects/${project.slug.current}`"
              class="group block bg-white border-2 border-gray-200 hover:border-gray-900 transition-all duration-300"
            >
              <div class="p-6">
                <div class="aspect-[4/3] bg-gray-100 overflow-hidden mb-6">
                  <img 
                    v-if="project.mainImage"
                    :src="getImageUrl(project.mainImage, 800)"
                    :alt="project.mainImageAlt || project.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <p class="text-sm text-gray-500 uppercase tracking-widest mb-3 font-medium">
                    {{ project.category }}
                  </p>
                  <h3 class="text-3xl font-bold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors font-serif">
                    {{ project.title }}
                  </h3>
                  <p class="text-gray-600 leading-relaxed">
                    {{ project.shortDescription }}
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <ContactSection />
    </div>
  </div>
</template>

<script setup>
import { useSanityData } from '@/composables/useSanityData'
import { useDevToArticles } from '@/composables/useDevToArticles'
import { homePageQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/imageBuilder'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import ContactSection from '@/components/ContactSection.vue'
import { computed } from 'vue'

const { data, loading, error, refetch } = useSanityData(homePageQuery)

// Fetch dev.to articles - replace 'your-username' with your actual dev.to username
const { articles, loading: blogLoading, error: blogError } = useDevToArticles('thanasistraitsis', 3)

// Calculate years of experience
const yearsOfExperience = computed(() => {
  if (!data.value?.careerStartDate) return null
  
  const startDate = new Date(data.value.careerStartDate)
  const now = new Date()
  const diffInMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth())
  const years = diffInMonths / 12
  
  // Round to nearest 0.5
  return Math.round(years * 2) / 2
})

// Format the subheading with years of experience
const formattedSubheading = computed(() => {
  if (!data.value?.heroSubheading || !yearsOfExperience.value) {
    return data.value?.heroSubheading || ''
  }
  
  // Replace {years} placeholder with calculated years
  return data.value.heroSubheading.replace('{years}', yearsOfExperience.value)
})

function getImageUrl(image, width = 1200) {
  if (!image) return ''
  return urlFor(image).width(width).auto('format').quality(85).url()
}
</script>
