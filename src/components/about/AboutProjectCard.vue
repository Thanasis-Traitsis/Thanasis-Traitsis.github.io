<script setup>
  import { defineProps } from "vue";
  import FullWidthButton from "../FullWidthButton.vue";

  const { imageSrc, route } = defineProps(["imageSrc", "route"]);
</script>

<template>
  <div class="flex flex-col w-full">
    <div
      class="w-full border border-[var(--primary-color)] border-b-0 mt-10 about_projectcard-image xl:mt-0"
    >
      <img :src="`${imageSrc}`" alt="" />
    </div>
    <div>
      <FullWidthButton
        :text="'explore more'"
        :route="`${route}`"
        :isWhite="false"
      />
    </div>
  </div>
</template>
