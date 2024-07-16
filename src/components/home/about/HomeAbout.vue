<script setup>
  import AboutTitles from "./AboutTitles.vue";
  import SectionHeader from "./../../SectionHeader.vue";
  import HomeAboutContent from "./HomeAboutContent.vue";
</script>

<template>
  <div class="section">
    <div class="home_about-section">
      <AboutTitles />
      <SectionHeader
        :alignEnd="false"
        :text="'about'"
        :isWhite="false"
        class="col-start-2 col-end-3 row-start-2 row-end-3 md:row-start-1 md:row-end-2"
      />
      <HomeAboutContent
        class="col-start-1 col-end-3 row-start-3 row-end-4 md:row-start-2 md:row-end-3 md:col-start-2"
      />
    </div>
  </div>
</template>

<style scoped>
  .section {
    padding: 0 !important;
  }

  .home_about-section {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto 1fr;
  }

  @media (min-width: 768px) {
    .home_about-section {
      grid-column-gap: var(--screen-padding);
    }
  }

  @media (min-width: 1280px) {
    .home_about-section {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
