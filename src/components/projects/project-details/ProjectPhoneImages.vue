<script setup>
  import { defineProps, onMounted, watch } from "vue";

  const { phoneImages } = defineProps(["phoneImages"]);
</script>

<template>
  <div
    class="flex flex-col gap-10 section md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-20 xl:max-w-[1300px] xl:content-between xl:m-auto xl:!mb-[calc(var(--section-margin)*2)]"
  >
    <div v-for="img in phoneImages" class="project_images">
      <div class="w-full">
        <img class="w-full" :src="img" alt="" />
      </div>
    </div>
  </div>
</template>
