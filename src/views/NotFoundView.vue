<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">Page not found</p>
      <p class="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
      <router-link 
        to="/" 
        class="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Go Home
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Simple 404 page
</script>
