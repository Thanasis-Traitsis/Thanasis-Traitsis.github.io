<script setup>
  import { defineProps } from "vue";

  const { bannerImage, bannerImageBig } = defineProps([
    "bannerImage",
    "bannerImageBig",
  ]);
</script>

<template>
  <div class="section bg-[var(--primary-color)]">
    <div
      class="w-full pt-[var(--section-margin)] pb-[var(--section-margin)] md:max-w-[600px] md:m-auto xl:max-w-[100%]"
    >
      <img class="w-full xl:hidden" :src="`${bannerImage}`" alt="" />
      <img class="w-full hidden xl:block" :src="`${bannerImageBig}`" alt="" />
    </div>
  </div>
</template>
