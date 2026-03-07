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
        :to="`/projects/${projectSlug}`"
        class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to {{ project.title }}
      </router-link>

      <!-- Page Header -->
      <div class="mb-12">
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-serif">Privacy Policy</h1>
        <p class="text-xl text-gray-600">{{ project.title }}</p>
      </div>

      <!-- Privacy Policy Content -->
      <div v-if="project.privacyPolicy && project.privacyPolicy.length > 0" class="space-y-6">
        <PortableText :blocks="project.privacyPolicy" />
      </div>

      <!-- No Content Message -->
      <div v-else class="text-center py-12">
        <p class="text-gray-500 text-lg">No privacy policy content available for this project.</p>
      </div>

      <!-- Last Updated -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <p class="text-sm text-gray-500">
          For questions about this privacy policy, please contact us through our 
          <router-link to="/contact" class="text-gray-900 hover:text-gray-600 underline">contact page</router-link>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSanityData } from '@/composables/useSanityData'
import { projectPrivacyPolicyQuery } from '@/sanity/queries'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import PortableText from '@/components/common/PortableText.vue'

const route = useRoute()
const projectSlug = computed(() => route.params.projectId)

const { data: project, loading, error, refetch } = useSanityData(
  projectPrivacyPolicyQuery,
  { slug: projectSlug.value }
)

</script>
