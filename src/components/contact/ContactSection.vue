<script setup>
  import SectionHeader from "./../SectionHeader.vue";
  import ContactContent from "./ContactContent.vue";
  import EmailWithButtonContainer from "./EmailWithButtonContainer.vue";

</script>

<template>
  <div class="section">
    <div
      class="grid grid-cols-3 md:grid-cols-4 gap-x-10 xl:grid-cols-3 xl:gap-x-0"
    >
      <SectionHeader
        :alignEnd="true"
        :text="'contact'"
        :isWhite="false"
        class="col-start-1 col-end-3 row-start-1 row-end-2 xl:col-start-1 xl:col-end-2"
      />
      <div
        class="contact-content col-start-1 col-end-4 flex flex-col gap-10 md:col-end-5 md:grid md:grid-cols-2 md:items-start xl:grid-cols-3"
      >
        <ContactContent />
        <EmailWithButtonContainer />
        <div
          class="italic-headline-text md:col-span-2 md:-mt-20 md:-ml-10 xl:col-start-2 xl:col-end-3 xl:row-start-1 xl:ml-0 xl:mt-0"
        >
          <p class="hidden xl:block xl:leading-none">Let's work</p>
          <p class="hidden xl:block xl:leading-none xl:ml-20">together.</p>
          <p class="xl:hidden">Let's work together.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .section {
    padding: 0 !important;
  }

  .contact-content {
    padding: 0 var(--screen-padding);
  }
</style>
