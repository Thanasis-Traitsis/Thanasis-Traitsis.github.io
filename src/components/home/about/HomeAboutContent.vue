<script setup>
  import aboutText from "../../../../public/assets/json/about-content.json";
  import PrimaryButton from "./../../PrimaryButton.vue";
</script>

<template>
  <div class="home_about-content md:!pl-0">
    <p class="paragraph-text">{{ aboutText.homeAbout }}</p>
    <PrimaryButton
      class="mt-10 "
      :text="'view more'"
      :route="'/about'"
      :isWhite="false"
    />
  </div>
</template>

<style scoped>
  .home_about-content {
    padding: 0 var(--screen-padding);
  }
</style>
