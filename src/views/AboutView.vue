<template>
  <div class="min-h-screen bg-white">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
    
    <!-- Error State -->
    <ErrorMessage v-else-if="error" :error="error" :on-retry="refetch" />
    
    <!-- Content -->
    <div v-else-if="data" class="max-w-7xl mx-auto px-6 py-20">
      <!-- Page Header -->
      <div class="mb-16">
        <h1 class="text-6xl md:text-7xl font-bold text-gray-900 mb-4 font-serif">About Me</h1>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent leading-none"
                style="-webkit-text-stroke: 2px #e5e7eb; text-stroke: 2px #B7B8BC;">
              <span class="font-serif">SKILLS / WORK / EDUCATION / BLOGS</span>
        </h2>
      </div>

      <!-- Bio Section -->
      <div class="max-w-7xl mb-20">
        <p class="text-2xl md:text-3xl italic text-gray-400 -ml-2 font-serif">A few words about me...</p>
        <PortableText v-if="processedBio" :blocks="processedBio" />
      </div>

      <!-- Work Experience Timeline -->
      <div v-if="data.workExperience && data.workExperience.length > 0" class="max-w-4xl">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-12 font-serif">Work Experience</h2>
        
        <div class="relative">
          <!-- Vertical Dotted Line -->
          <div class="absolute left-0 top-0 bottom-0 w-0.5 border-l-2 border-dotted border-gray-300"></div>
          
          <!-- Experience Items (reversed to show oldest first) -->
          <div
            v-for="(exp, index) in sortedWorkExperience"
            :key="index"
            class="relative pl-8 pb-12 last:pb-0"
          >
            <!-- Dot -->
            <div class="absolute left-0 top-1 w-3 h-3 bg-gray-900 rounded-full -translate-x-[5px]"></div>
            
            <!-- Content -->
            <div>
              <p class="text-sm text-gray-500 uppercase tracking-wide mb-1">
                {{ formatDate(exp.startDate) }} - {{ exp.current ? 'Present' : formatDate(exp.endDate) }}
              </p>
              <h3 class="text-2xl font-bold text-gray-900 mb-1">{{ exp.role }}</h3>
              <p class="text-lg text-gray-600">{{ exp.company }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <ContactSection />
  </div>
</template>

<script setup>
import { useSanityData } from '@/composables/useSanityData'
import { aboutPageQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/imageBuilder'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import PortableText from '@/components/common/PortableText.vue'
import ContactSection from '@/components/ContactSection.vue'
import { computed } from 'vue'

const { data, loading, error, refetch } = useSanityData(aboutPageQuery)

// Calculate age from birth date
const age = computed(() => {
  if (!data.value?.birthDate) return null
  
  const birthDate = new Date(data.value.birthDate)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
})

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

// Get current job info
const currentJob = computed(() => {
  if (!data.value?.workExperience) return null
  
  return data.value.workExperience.find(exp => exp.current === true)
})

// Process bio blocks with dynamic replacements
const processedBio = computed(() => {
  if (!data.value?.bio) return []
  
  return data.value.bio.map(block => {
    if (block._type !== 'block') return block
    
    return {
      ...block,
      children: block.children.map(child => {
        let text = child.text
        
        // Replace {age} with calculated age
        if (age.value) {
          text = text.replace('{age}', age.value.toString())
        }
        
        // Replace {years} with years of experience
        if (yearsOfExperience.value) {
          text = text.replace('{years}', yearsOfExperience.value.toString())
        }
        
        // Replace {currentRole} and {currentCompany}
        if (currentJob.value) {
          text = text.replace('{currentRole}', currentJob.value.role)
          text = text.replace('{currentCompany}', currentJob.value.company)
        } else {
          // Remove the sentence if no current job
          if (text.includes('{currentRole}') || text.includes('{currentCompany}')) {
            // Find and remove the sentence containing these placeholders
            const sentences = text.split('. ')
            text = sentences.filter(s => 
              !s.includes('{currentRole}') && !s.includes('{currentCompany}')
            ).join('. ')
          }
        }
        
        return {
          ...child,
          text
        }
      })
    }
  })
})

// Sort work experience from newest to oldest
const sortedWorkExperience = computed(() => {
  if (!data.value?.workExperience) return []
  
  return [...data.value.workExperience].sort((a, b) => {
    const dateA = new Date(a.startDate)
    const dateB = new Date(b.startDate)
    return dateB - dateA // Newest first
  })
})

function getImageUrl(image, width = 1200) {
  if (!image) return ''
  return urlFor(image).width(width).auto('format').quality(85).url()
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
</script>
