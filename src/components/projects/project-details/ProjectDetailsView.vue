<template>
  <div class="min-h-screen bg-white">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
    
    <!-- Error State -->
    <ErrorMessage v-else-if="error" :error="error" :on-retry="refetch" />
    
    <!-- Content -->
    <div v-else-if="project" class="max-w-7xl mx-auto px-6 py-20">
      <!-- Back Button -->
      <router-link 
        to="/projects"
        class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </router-link>

      <!-- Project Header -->
      <div class="mb-12">
        <div class="flex flex-wrap items-center gap-4 mb-4">
          <span class="px-4 py-1 bg-gray-900 text-white text-sm uppercase tracking-wide">
            {{ getCategoryLabel(project.category) }}
          </span>
          <span class="text-gray-500">{{ formatDate(project.date) }}</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-serif">
          {{ project.title }}
        </h1>
        <p class="text-xl text-gray-600 leading-relaxed max-w-3xl">
          {{ project.shortDescription }}
        </p>
      </div>

      <!-- Main Image -->
      <div v-if="project.images && project.images.length > 0" class="mb-16">
        <img
          :src="getImageUrl(project.images[0].image, 1400)"
          :alt="project.images[0].alt || project.title"
          class="w-full aspect-video object-cover  border-2 border-gray-700"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-12">
          <!-- Full Description -->
          <div v-if="project.fullDescription">
            <PortableText :blocks="project.fullDescription" />
          </div>

          <!-- Credits -->
          <div v-if="project.credits" class="border-t border-gray-200 pt-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4 font-serif">Credits</h2>
            <p class="text-gray-600 whitespace-pre-line">{{ project.credits }}</p>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Tech Stack -->
          <div v-if="project.techStack && project.techStack.length > 0">
            <h3 class="text-xl font-bold text-gray-900 mb-4 font-serif">Tech Stack</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tech, index) in project.techStack"
                :key="index"
                class="px-3 py-1 bg-white border border-gray-300 rounded-full text-s text-gray-700"
              >
                {{ tech.name }}
              </span>
            </div>
          </div>

          <!-- Platform Availability -->
          <div v-if="project.platformAvailability && project.platformAvailability.length > 0">
            <h3 class="text-xl font-bold text-gray-900 mb-4 font-serif">Available On</h3>
            <div class="space-y-3">
              <a
                v-for="(platform, index) in project.platformAvailability"
                :key="index"
                :href="platform.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 p-3 border border-gray-300 hover:border-gray-900 transition-colors"
              >
                <!-- Platform Icon -->
                <div class="w-8 h-8 flex items-center justify-center">
                  <svg v-if="platform.platform.toLowerCase().includes('android') || platform.platform.toLowerCase().includes('play')" class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.4396"/>
                  </svg>
                  <svg v-else-if="platform.platform.toLowerCase().includes('ios') || platform.platform.toLowerCase().includes('app store')" class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <svg v-else-if="platform.platform.toLowerCase().includes('github')" class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <img
                    v-else-if="platform.icon"
                    :src="getImageUrl(platform.icon, 100)"
                    :alt="platform.platform"
                    class="w-8 h-8 object-contain"
                  />
                </div>
                <span class="text-gray-900 font-medium">{{ platform.platform }}</span>
                <svg class="w-4 h-4 ml-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Project Info -->
          <div class="border-t border-gray-200 pt-8">
            <h3 class="text-xl font-bold text-gray-900 mb-4 font-serif">Project Info</h3>
            <dl class="space-y-3">
              <div>
                <dt class="text-sm text-gray-500 uppercase tracking-wide mb-1">Category</dt>
                <dd class="text-gray-900">{{ getCategoryLabel(project.category) }}</dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500 uppercase tracking-wide mb-1">Completed</dt>
                <dd class="text-gray-900">{{ formatDate(project.date) }}</dd>
              </div>
              <div v-if="project.privacyPolicy && project.privacyPolicy.length > 0">
                <dt class="text-sm text-gray-500 uppercase tracking-wide mb-1">Privacy Policy</dt>
                <dd>
                  <router-link 
                    :to="`/projects/${project.slug.current}/privacy-policy`"
                    class="text-gray-900 hover:text-gray-600 underline transition-colors inline-flex items-center gap-1"
                  >
                    View Policy
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </router-link>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <!-- Content Sections -->
      <div v-if="project.contentSections && project.contentSections.length > 0" class="mt-20 space-y-20">
        <div
          v-for="(section, sectionIndex) in project.contentSections"
          :key="sectionIndex"
          class="space-y-8"
        >
          <!-- Section Header -->
          <div class="space-y-4">
            <p v-if="section.subheading" class="text-l md:text-xl italic text-gray-400 -ml-2 -mb-4 font-serif">
              {{ section.subheading }}
            </p>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 font-serif">
              {{ section.heading }}
            </h2>
            <p v-if="section.description" class="text-lg text-gray-600 max-w-7xl">
              {{ section.description }}
            </p>
          </div>

          <!-- Section Cards -->
          <div 
            v-if="section.cards && section.cards.length > 0" 
            class="grid grid-cols-1 gap-6"
            :class="{
              'md:grid-cols-2': section.cards.length === 2,
              'md:grid-cols-2 lg:grid-cols-3': section.cards.length > 2
            }"
          >
            <div
              v-for="(card, cardIndex) in section.cards"
              :key="cardIndex"
              class="bg-gray-50 border border-gray-200 p-6 space-y-4"
            >
              <!-- Card Icon -->
              <div v-if="card.icon" class="w-8 h-8">
                <img
                  :src="getImageUrl(card.icon, 100)"
                  :alt="card.title"
                  class="w-full h-full object-contain"
                />
              </div>

              <!-- Card Title -->
              <h3 class="text-xl font-bold text-gray-900">
                {{ card.title }}
              </h3>

              <!-- Card Description -->
              <p class="text-gray-600 leading-relaxed">
                {{ card.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Gallery Section - Full Width -->
      <div v-if="project.images && project.images.length > 1" class="mt-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div
            v-for="(image, index) in project.images.slice(1)"
            :key="index"
            class="aspect-[9/19.5] overflow-hidden"
          >
            <img
              :src="getImageUrl(image.image, 800)"
              :alt="image.alt || `${project.title} screenshot ${index + 2}`"
              class="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <!-- Navigation to Next Project -->
      <div class="mt-20 pt-12 border-t border-gray-200">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-serif">Want to keep exploring?</h2>
        
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Next Project Button -->
          <router-link 
            v-if="nextProject"
            :to="`/projects/${nextProject.slug.current}`"
            class="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Next Project
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>

          <!-- View All Projects Button -->
          <router-link 
            to="/projects"
            class="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
          >
            View All Projects
          </router-link>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <ContactSection />
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { projectBySlugQuery, projectsQuery } from '@/sanity/queries'
import { sanityClient } from '@/sanity/client'
import { urlFor } from '@/sanity/imageBuilder'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import PortableText from '@/components/common/PortableText.vue'
import ContactSection from '@/components/ContactSection.vue'

const route = useRoute()
const projectSlug = computed(() => route.params.projectId)

// Manual state management for project data
const project = ref(null)
const loading = ref(true)
const error = ref(null)

// Fetch all projects to find the next one (this can use cache)
const allProjects = ref(null)

// Fetch project data
const fetchProject = async (slug) => {
  loading.value = true
  error.value = null
  try {
    const result = await sanityClient.fetch(projectBySlugQuery, { slug })
    project.value = result
  } catch (err) {
    error.value = {
      message: 'Unable to load project. Please check your connection and try again.',
      details: err.message
    }
    console.error('Error fetching project:', err)
  } finally {
    loading.value = false
  }
}

// Fetch all projects
const fetchAllProjects = async () => {
  try {
    const result = await sanityClient.fetch(projectsQuery)
    allProjects.value = result
  } catch (err) {
    console.error('Error fetching all projects:', err)
  }
}

// Initial fetch
fetchProject(projectSlug.value)
fetchAllProjects()

// Watch for route changes and refetch
watch(projectSlug, (newSlug) => {
  if (newSlug) {
    fetchProject(newSlug)
  }
})

// Refetch function for error retry
const refetch = () => fetchProject(projectSlug.value)

// Find the next project
const nextProject = computed(() => {
  if (!allProjects.value || !project.value) return null
  
  const currentIndex = allProjects.value.findIndex(p => p.slug.current === project.value.slug.current)
  
  if (currentIndex === -1) return null
  
  // Get next project, or loop back to first if at the end
  const nextIndex = (currentIndex + 1) % allProjects.value.length
  
  // Don't show next project if it's the same as current (only one project)
  if (allProjects.value.length === 1) return null
  
  return allProjects.value[nextIndex]
})


function getCategoryLabel(category) {
  const categoryMap = {
    'cross-platform': 'Cross-Platform',
    'native': 'Native'
  }
  return categoryMap[category] || category
}

function getImageUrl(image, width = 1200) {
  if (!image) return ''
  return urlFor(image).width(width).auto('format').quality(85).url()
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}
</script>
