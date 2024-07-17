<script setup>
  import { defineProps, defineEmits } from "vue";
  import FullScreenMenuLinks from "./FullScreenMenuLinks.vue";
  import FullScreenMenuSocials from "./FullScreenMenuSocials.vue";

  let { showMenu } = defineProps(["showMenu"]);

  const emit = defineEmits(["clickFullScreenLink"]);

  const handleLinkClick = () => {
    emit("clickFullScreenLink");
  };
</script>

<template>
  <!-- <div :class="showMenu ? 'right-[0]' : 'right-[-100%]'" class="menu"> -->
  <div class="menu right-[-100%]">
    <FullScreenMenuLinks @clickFullScreenLink="handleLinkClick" />
    <FullScreenMenuSocials />
  </div>
</template>

<style scoped>
  .menu {
    position: absolute;
    background: var(--primary-color);
    width: 100%;
    height: 100vh;
    top: 0;
    padding: calc(2rem + var(--screen-padding)) var(--screen-padding)
      var(--screen-padding);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 9;
  }
</style>
