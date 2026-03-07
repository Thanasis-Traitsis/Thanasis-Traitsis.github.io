<template>
  <section class="py-32 px-6 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <p class="text-2xl md:text-3xl italic text-gray-400 -ml-2 font-serif">Any cool ideas?</p>
          <h2 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-serif">
            Let's Work Together
          </h2>
          <p class="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
            Have a project in mind or just want to chat about mobile development? I'd love to hear from you.
          </p>
        </div>
        <router-link 
          to="/contact"
          class="inline-block px-12 py-5 bg-gray-900 text-white text-lg font-bold uppercase tracking-wider hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap self-start lg:self-center"
        >
          Get In Touch
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
