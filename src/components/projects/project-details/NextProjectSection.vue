<script setup>
  import { defineProps } from "vue";
  import PrimaryButton from "@/components/PrimaryButton.vue";

  const { route } = defineProps(["route"]);
</script>

<template>
  <div class="next-project-section grid">
    <div class="next-project-header row-start-1 row-end-2">
      <p>View more.</p>
    </div>
    <div class="full-width-line row-start-2 row-end-3"></div>
    <div class="row-start-3 row-end-4 ml-auto">
      <PrimaryButton
        class="white-border-button mt-4"
        :text="'next project'"
        :route="`${route}`"
        :isWhite="true"
      />
    </div>
  </div>
</template>

<style scoped>
  .next-project-section {
    padding: var(--section-margin);
    background: var(--primary-color);
  }

  .full-width-line {
    height: 1px;
    width: 100%;
    background: var(--white-color);
  }

  .next-project-header p {
    font-family: var(--highlight-font);
    font-size: var(--welcome-text);
    font-weight: bold;
    color: var(--white-color);
  }
</style>
