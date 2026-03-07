<template>
  <div class="flex items-center justify-center min-h-[400px] px-4">
    <div class="text-center max-w-md">
      <p class="text-red-600 text-lg mb-4">{{ error.message }}</p>
      <button 
        v-if="onRetry"
        @click="onRetry"
        class="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        Try Again
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    required: true
  },
  onRetry: {
    type: Function,
    default: null
  }
})
</script>
