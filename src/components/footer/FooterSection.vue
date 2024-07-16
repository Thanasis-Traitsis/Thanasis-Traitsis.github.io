<script setup>
  import FooterSocialsContainer from "./FooterSocialsContainer.vue";
  import FooterCopyrightText from "./FooterCopyrightText.vue";
</script>

<template>
  <div
    class="footer-section xl:pt-[calc(var(--screen-padding)/3)] xl:pb-[calc(var(--screen-padding)/3)]"
  >
    <div
      class="flex flex-col justify-center items-center gap-4 md:flex-row md:justify-between"
    >
      <FooterSocialsContainer />
      <div class="footer-line md:hidden"></div>
      <FooterCopyrightText />
    </div>
  </div>
</template>

<style scoped>
  .footer-line {
    width: 100%;
    height: 1px;
    background: var(--white-color);
  }
</style>
