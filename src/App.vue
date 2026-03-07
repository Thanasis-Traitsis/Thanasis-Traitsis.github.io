<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useSanityData } from '@/composables/useSanityData'
import { socialLinksQuery } from '@/sanity/queries'

const mobileMenuOpen = ref(false)
const { data: socialLinks } = useSanityData(socialLinksQuery)
</script>

<template>
  <div id="app" class="min-h-screen">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <RouterLink to="/" class="flex items-center">
            <img 
              src="/images/light_logo.png" 
              alt="Thanasis Traitsis Logo" 
              class="h-10 w-auto"
            />
          </RouterLink>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-8">
            <RouterLink 
              to="/" 
              class="text-gray-700 hover:text-gray-900 font-medium transition-colors border-b-2 border-transparent pb-1"
            >
              Home
            </RouterLink>
            <RouterLink 
              to="/about" 
              class="text-gray-700 hover:text-gray-900 font-medium transition-colors border-b-2 border-transparent pb-1"
            >
              About
            </RouterLink>
            <RouterLink 
              to="/projects" 
              class="text-gray-700 hover:text-gray-900 font-medium transition-colors border-b-2 border-transparent pb-1"
            >
              Projects
            </RouterLink>
            <RouterLink 
              to="/contact" 
              class="px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-200"
              active-class="bg-gray-800"
            >
              Contact
            </RouterLink>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 text-gray-700 hover:text-gray-900 hover:scale-110 active:scale-95 transition-all duration-200"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden pt-4 pb-2 space-y-2">
          <RouterLink 
            to="/" 
            @click="mobileMenuOpen = false"
            class="block py-2 text-gray-700 hover:text-gray-900 font-medium border-l-2 border-transparent pl-3"
          >
            Home
          </RouterLink>
          <RouterLink 
            to="/about" 
            @click="mobileMenuOpen = false"
            class="block py-2 text-gray-700 hover:text-gray-900 font-medium border-l-2 border-transparent pl-3"
          >
            About
          </RouterLink>
          <RouterLink 
            to="/projects" 
            @click="mobileMenuOpen = false"
            class="block py-2 text-gray-700 hover:text-gray-900 font-medium border-l-2 border-transparent pl-3"
          >
            Projects
          </RouterLink>
          <RouterLink 
            to="/contact" 
            @click="mobileMenuOpen = false"
            class="block py-2 text-gray-700 hover:text-gray-900 font-medium border-l-2 border-transparent pl-3"
          >
            Contact
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="pt-16">
      <RouterView />
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <!-- Left: Copyright -->
          <p class="text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} Thanasis Traitsis. All rights reserved.
          </p>

          <!-- Center: Email -->
          <a 
            v-if="socialLinks?.email"
            :href="`mailto:${socialLinks.email}`" 
            class="text-gray-400 hover:text-white transition-colors text-sm"
          >
            {{ socialLinks.email }}
          </a>

          <!-- Right: Social Links -->
          <div v-if="socialLinks" class="flex items-center gap-4">
            <a 
              v-if="socialLinks.github"
              :href="socialLinks.github" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              v-if="socialLinks.linkedin"
              :href="socialLinks.linkedin" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              v-if="socialLinks.devto"
              :href="socialLinks.devto" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-white transition-colors"
              aria-label="Dev.to"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/>
              </svg>
            </a>
            <a 
              v-if="socialLinks.twitter"
              :href="socialLinks.twitter" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter/X"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Active navigation link indicator - bottom border only, no bold to prevent layout shift */
a.router-link-active {
  @apply border-gray-900 text-gray-900;
}
</style>
