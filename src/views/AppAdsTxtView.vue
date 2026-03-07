<script setup>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()

onMounted(async () => {
  const projectId = route.params.projectId
  
  try {
    // Fetch the app-ads.txt file from public folder
    const response = await fetch(`/app-ads/${projectId}.txt`)
    
    if (response.ok) {
      const content = await response.text()
      
      // Set content type to plain text
      document.body.innerHTML = `<pre>${content}</pre>`
      document.body.style.fontFamily = 'monospace'
      document.body.style.padding = '20px'
    } else {
      document.body.innerHTML = 'app-ads.txt not found for this project'
    }
  } catch (error) {
    document.body.innerHTML = 'Error loading app-ads.txt'
  }
})
</script>

<template>
  <div></div>
</template>
