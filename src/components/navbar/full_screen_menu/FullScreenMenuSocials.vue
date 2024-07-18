<script setup>
  import socialIcons from "../../../../public/assets/json/social-icons.json";
</script>

<template>
  <div class="flex flex-col">
    <div class="text-above-line">
      <p>socials.</p>
    </div>
    <div class="menu-line"></div>
    <div class="flex flex-row gap-4 mt-2">
      <div v-for="icon in socialIcons" :key="icon.id" class="social-icon hover-icon">
        <a :href="icon.iconLink" target="_blank">
          <img :src="icon.iconUrl" :alt="icon.iconText" />
        </a>
      </div>
    </div>
  </div>
</template>
