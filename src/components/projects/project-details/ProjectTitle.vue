<script setup>
  import { defineProps } from "vue";
  import { onMounted } from "vue";
  import gsap from "gsap";
  import ScrollTrigger from "gsap/ScrollTrigger";
  gsap.registerPlugin(ScrollTrigger);

  const { title } = defineProps(["title"]);

  onMounted(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".title-container",
          start: "top 100%", // Adjusted start position
          end: "bottom -100%", // Adjusted end position
          scrub: true,
        },
      })
      .to(".title-container", { x: -200,}); // Added duration for smooth animation
  });
</script>

<template>
  <div class="title-container big-header-spacing">
    <p class="big-header-text !uppercase">
      {{ title }} - {{ title }} - {{ title }} - {{ title }} - {{ title }} -
      {{ title }} - {{ title }}
    </p>
  </div>
</template>

<style scoped>
  .title-container {
    padding: 0 !important;
    white-space: nowrap;
  }
</style>
