<script setup>
  import SectionHeader from "./../../SectionHeader.vue";
  import HomeSelectedProjectsContent from "./HomeSelectedProjectsContent.vue";
  import HomeSelectedProjectsList from "./HomeSelectedProjectsList.vue";
  import PrimaryButton from "./../../PrimaryButton.vue";
</script>

<template>
  <div class="bg-[var(--primary-color)]">
    <div class="home_projects-section">
      <SectionHeader
        :alignEnd="true"
        :text="'selected projects'"
        :isWhite="true"
        class="col-start-1 col-end-2"
      />
      <div class="home_projects-content col-start-1 col-end-3 ">
        <HomeSelectedProjectsContent class="xl:w-[30%]"/>
        <HomeSelectedProjectsList />
        <PrimaryButton
          class="white-border-button mt-10"
          :text="'more projects'"
          :route="'/projects'"
          :isWhite="true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .home_projects-section {
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: var(--section-margin) 0 calc(var(--section-margin) * 2);
  }

  .home_projects-content {
    padding: 0 var(--screen-padding);
  }

  @media (min-width: 768px) {
    .home_projects-section {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 1280px) {
    .home_projects-section {
      grid-template-columns: 1fr 2fr;
    }
  }
</style>
