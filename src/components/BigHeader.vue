<script setup>
  import { defineProps } from "vue";

  const { text1, text2, changeLine } = defineProps([
    "text1",
    "text2",
    "changeLine",
  ]);
</script>

<template>
  <div class="big-header-spacing">
    <div v-if="changeLine">
      <p class="big-header-text">{{ text1 }}</p>
      <p class="big-header-text relative">{{ text2 }}</p>
    </div>
    <div v-else>
      <p class="big-header-text relative">{{ text1 }}</p>
    </div>
  </div>
</template>

<style scoped>
  .big-header-text::before {
    position: absolute;
    content: "";
    background: var(--primary-color);
    width: 100%;
    height: 1px;
    bottom: -10px;
    left: 0;
  }
</style>
