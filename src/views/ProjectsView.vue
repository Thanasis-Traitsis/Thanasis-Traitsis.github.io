<template>
  <div class="min-h-screen bg-white">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
    
    <!-- Error State -->
    <ErrorMessage v-else-if="error" :error="error" :on-retry="refetch" />
    
    <!-- Content -->
    <div v-else-if="projects" class="max-w-7xl mx-auto px-6 py-20">
      <!-- Page Header -->
      <div class="mb-16">
        <h1 class="text-6xl md:text-7xl font-bold text-gray-900 mb-4 font-serif">My Work</h1>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent leading-none"
                style="-webkit-text-stroke: 2px #e5e7eb; text-stroke: 2px #B7B8BC;">
              <span class="font-serif">JOURNEY THROUGH MY PROJECTS</span>
        </h2>
      </div>

      <!-- Filter and View Toggle -->
      <div class="mb-12">
        <!-- Mobile: Filter Button + View Toggle -->
        <div class="flex sm:hidden justify-between items-center gap-4 mb-4">
          <!-- Filter Button -->
          <button
            @click="mobileFiltersOpen = !mobileFiltersOpen"
            class="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>

          <!-- View Toggle -->
          <div class="flex gap-2 bg-white border border-gray-300 rounded-full p-1">
            <button
              @click="viewMode = 'grid'"
              :class="[
                'p-2 rounded-full transition-colors',
                viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
              ]"
              aria-label="Grid view"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'p-2 rounded-full transition-colors',
                viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
              ]"
              aria-label="List view"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile: Collapsible Filters -->
        <div v-if="mobileFiltersOpen" class="flex sm:hidden flex-wrap gap-2 mb-4">
          <button
            @click="selectedCategory = 'all'; mobileFiltersOpen = false"
            :class="[
              'px-6 py-2 rounded-full text-sm font-medium transition-colors',
              selectedCategory === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-900'
            ]"
          >
            All
          </button>
          <button
            v-for="cat in categories"
            :key="cat.value"
            @click="selectedCategory = cat.value; mobileFiltersOpen = false"
            :class="[
              'px-6 py-2 rounded-full text-sm font-medium transition-colors',
              selectedCategory === cat.value
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-900'
            ]"
          >
            {{ cat.label }}
            <span class="ml-1 text-xs opacity-70">{{ getCategoryCount(cat.value) }}</span>
          </button>
        </div>

        <!-- Desktop: Always Visible -->
        <div class="hidden sm:flex justify-between items-center gap-4">
          <!-- Category Filters -->
          <div class="flex flex-wrap gap-2">
            <button
              @click="selectedCategory = 'all'"
              :class="[
                'px-6 py-2 rounded-full text-sm font-medium transition-colors',
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-900'
              ]"
            >
              All
            </button>
            <button
              v-for="cat in categories"
              :key="cat.value"
              @click="selectedCategory = cat.value"
              :class="[
                'px-6 py-2 rounded-full text-sm font-medium transition-colors',
                selectedCategory === cat.value
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-900'
              ]"
            >
              {{ cat.label }}
              <span class="ml-1 text-xs opacity-70">{{ getCategoryCount(cat.value) }}</span>
            </button>
          </div>

          <!-- View Toggle -->
          <div class="flex gap-2 bg-white border border-gray-300 rounded-full p-1">
            <button
              @click="viewMode = 'grid'"
              :class="[
                'p-2 rounded-full transition-colors',
                viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
              ]"
              aria-label="Grid view"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'p-2 rounded-full transition-colors',
                viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
              ]"
              aria-label="List view"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
     

      <!-- Grid View -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <router-link
          v-for="project in filteredProjects"
          :key="project._id"
          :to="`/projects/${project.slug.current}`"
          class="group"
        >
          <div class="bg-white p-6 overflow-hidden border-2 border-gray-200 hover:border-gray-900 transition-all duration-300">
            <div class="aspect-video overflow-hidden mb-4">
              <img
                :src="getImageUrl(project.mainImage, 800)"
                :alt="project.mainImageAlt || project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div class="space-y-3">
              <!-- Date and Category -->
              <div class="flex items-center gap-3 text-sm text-gray-500">
                <span>{{ formatDate(project.date) }}</span>
                <span>•</span>
                <span>{{ getCategoryLabel(project.category) }}</span>
              </div>

              <!-- Title -->
              <h3 class="text-2xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                {{ project.title }}
              </h3>

              <!-- Description -->
              <p class="text-gray-600 line-clamp-2">
                {{ project.shortDescription }}
              </p>

              <!-- Tech Stack -->
              <div v-if="project.techStack && project.techStack.length > 0" class="flex flex-wrap gap-2 pt-2">
                <span
                  v-for="(tech, index) in project.techStack.slice(0, 4)"
                  :key="index"
                  class="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs text-gray-700"
                >
                  {{ tech.name }}
                </span>
                <span
                  v-if="project.techStack.length > 4"
                  class="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs text-gray-500"
                >
                  +{{ project.techStack.length - 4 }}
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <!-- List View -->
      <div v-else class="space-y-0 border border-gray-300 overflow-hidden">
        <!-- Table Header -->
        <div class="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-300 text-sm font-medium text-gray-500 uppercase tracking-wide">
          <div class="col-span-6">Title</div>
          <div class="col-span-4">Category</div>
          <div class="col-span-2">Year</div>
        </div>

        <!-- Table Rows -->
        <router-link
          v-for="project in filteredProjects"
          :key="project._id"
          :to="`/projects/${project.slug.current}`"
          class="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-6 hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0"
        >
          <!-- Title -->
          <div class="col-span-1 md:col-span-6">
            <div class="text-sm text-gray-500 uppercase tracking-wide mb-1 md:hidden">Title</div>
            <h3 class="text-xl md:text-2xl font-bold text-gray-900">{{ project.title }}</h3>
          </div>

          <!-- Category -->
          <div class="col-span-1 md:col-span-4">
            <div class="text-sm text-gray-500 uppercase tracking-wide mb-1 md:hidden">Category</div>
            <p class="text-gray-600">{{ getCategoryLabel(project.category) }}</p>
          </div>

          <!-- Year -->
          <div class="col-span-1 md:col-span-2">
            <div class="text-sm text-gray-500 uppercase tracking-wide mb-1 md:hidden">Year</div>
            <p class="text-gray-600">{{ formatYear(project.date) }}</p>
          </div>
        </router-link>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="text-center py-20">
        <p class="text-gray-500 text-lg">No projects found in this category.</p>
      </div>
    </div>

    <!-- Contact Section -->
    <ContactSection />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useSanityData } from '@/composables/useSanityData'
import { projectsQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/imageBuilder'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import ContactSection from '@/components/ContactSection.vue'

const { data: projects, loading, error, refetch } = useSanityData(projectsQuery)

// Load saved preferences from localStorage
const viewMode = ref('grid')
const selectedCategory = ref('all')
const mobileFiltersOpen = ref(false)

onMounted(() => {
  // Load saved view mode
  const savedViewMode = localStorage.getItem('projectsViewMode')
  if (savedViewMode) {
    viewMode.value = savedViewMode
  }

  // Load saved category
  const savedCategory = localStorage.getItem('projectsCategory')
  if (savedCategory) {
    selectedCategory.value = savedCategory
  }
})

// Watch for changes and save to localStorage
watch(viewMode, (newValue) => {
  localStorage.setItem('projectsViewMode', newValue)
})

watch(selectedCategory, (newValue) => {
  localStorage.setItem('projectsCategory', newValue)
})

const categories = [
  { label: 'Cross-Platform', value: 'cross-platform' },
  { label: 'Native', value: 'native' }
]

const filteredProjects = computed(() => {
  if (!projects.value) return []
  
  if (selectedCategory.value === 'all') {
    return projects.value
  }
  
  return projects.value.filter(project => project.category === selectedCategory.value)
})

function getCategoryCount(category) {
  if (!projects.value) return 0
  return projects.value.filter(p => p.category === category).length
}

function getCategoryLabel(category) {
  const categoryMap = {
    'cross-platform': 'Cross-Platform',
    'native': 'Native'
  }
  return categoryMap[category] || category
}

function getImageUrl(image, width = 800) {
  if (!image) return ''
  return urlFor(image).width(width).auto('format').quality(85).url()
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatYear(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.getFullYear()
}
</script>
