<script setup>
  import socialIcons from "./../../../public/assets/json/social-icons.json";
</script>

<template>
  <div class="flex flex-row items-center">
    <div>
      <p class="paragraph-text-white">Find me on social media:</p>
    </div>
    <div class="flex flex-row gap-4 ml-4">
      <div
        v-for="icon in socialIcons"
        :key="icon.id"
        class="footer-social-icon hover-icon"
      >
        <a :href="icon.iconLink">
          <img :src="icon.iconUrl" :alt="icon.iconText" />
        </a>
      </div>
    </div>
  </div>
</template>
