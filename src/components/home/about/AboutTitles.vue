<script setup>
  import { computed } from "vue";
  import aboutTitles from "../../../../public/assets/json/about-titles.json";

  const allAboutTitles = computed(() => {
    return aboutTitles
      .map((title, index) => {
        return title.aboutTitle + ". ";
      })
      .join("");
  });
</script>

<template>
  <div class="overflow-hidden md:hidden">
    <div class="italic-headline-text">
      <p class="scroll-text">
        <span>{{ allAboutTitles }} {{ allAboutTitles }}</span>
      </p>
      <p class="scroll-text scroll-text2">
        <span>{{ allAboutTitles }} {{ allAboutTitles }}</span>
      </p>
      <p id="hidden-letter">s</p>
    </div>
  </div>
  <div
    class="hidden md:block md:row-start-1 md:row-end-3 md:m-auto md:pl-[var(--screen-padding)]"
  >
    <div
      v-for="(title, index) in aboutTitles"
      :key="title.id"
      class="italic-headline-text"
    >
      <p>{{ title.aboutTitle }}.</p>
    </div>
  </div>
</template>

<style scoped>
  .italic-headline-text p {
    text-transform: capitalize !important;
  }

  #hidden-letter {
    z-index: -10;
    color: var(--background-color);
    opacity: 0;
  }

  .scroll-text {
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
  }

  .scroll-text span {
    display: inline-block;
    padding-left: 100%;
    animation: scroll-text 10s linear infinite;
    padding-right: 10px;
  }

  .scroll-text2 span {
    animation-delay: 5s;
  }

  @keyframes scroll-text {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
    }
  }
</style>
