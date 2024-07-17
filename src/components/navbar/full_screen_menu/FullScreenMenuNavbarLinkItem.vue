<script setup>
  import { defineProps, defineEmits } from "vue";
  import { RouterLink, useRoute } from "vue-router";

  const { text, route } = defineProps(["text", "route"]);
  const currentRoute = useRoute();

  const emit = defineEmits(["clickFullScreenLink"]);

  const handleLinkClick = () => {
    if (currentRoute.path !== route) {
      emit("clickFullScreenLink");
    }
  };
</script>

<template>
  <div>
    <RouterLink
      class="full-nav-item"
      active-class="active"
      :to="route"
      @click="handleLinkClick"
      >{{ text }}</RouterLink
    >
  </div>
</template>

<style scoped>
  .full-nav-item {
    text-transform: uppercase;
    position: relative;
    color: var(--white-color);
    font-size: var(--fullscreen-link);
    letter-spacing: 1px;
  }

  .full-nav-item::before {
    position: absolute;
    content: "";
    left: 0;
    bottom: -2px;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    background: var(--background-color);
    transition: all 300ms ease-in-out;
    transform-origin: bottom left;
  }

  .full-nav-item:hover::before {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  .active::before {
    position: absolute;
    content: "";
    left: 0;
    bottom: -2px;
    width: 100%;
    transform: scaleX(1);
    height: 2px;
    background: var(--background-color);
  }
</style>
